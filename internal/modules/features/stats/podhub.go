// PodNest - Self-hosted site management platform
// Copyright (c) 2026 Kevin Pirnie <iam@kevinpirnie.com>
// Licensed under the MIT License. See LICENSE file in the project root for full license text.

package stats

import (
	"context"
	"encoding/json"
	"fmt"
	"net/url"
	"strings"
	"sync"
	"time"

	"podnest/internal/logger"
	"podnest/internal/podman"
)

// podStatsInterval is how often, in seconds, Podman pushes a sample on a
// site's stats stream.
const podStatsInterval = 2

// podStatsHub shares one Podman stats stream per site across every viewer of
// that site, so the sampling cost is per site rather than per open tab.
type podStatsHub struct {
	mu    sync.Mutex
	sites map[string]*podStatsFeed
}

// podStatsFeed is one site's live stream and the viewers subscribed to it.
type podStatsFeed struct {
	cancel context.CancelFunc
	subs   map[chan []byte]struct{}
}

// podHub is the package-level stats hub shared by all pod stats WebSockets.
var podHub = &podStatsHub{sites: make(map[string]*podStatsFeed)}

// subscribe registers a viewer for a site's pod stats, starting the shared
// stream on the first viewer. The channel is closed if the stream gives up;
// the returned func unsubscribes and stops the stream after the last viewer.
func (hub *podStatsHub) subscribe(pc *podman.Client, siteName string, names []string) (<-chan []byte, func()) {
	ch := make(chan []byte, 1)

	hub.mu.Lock()
	feed, ok := hub.sites[siteName]
	if !ok {
		ctx, cancel := context.WithCancel(context.Background())
		feed = &podStatsFeed{cancel: cancel, subs: make(map[chan []byte]struct{})}
		hub.sites[siteName] = feed
		go hub.run(ctx, pc, siteName, feed, names)
	}
	feed.subs[ch] = struct{}{}
	hub.mu.Unlock()

	return ch, func() {
		hub.mu.Lock()
		defer hub.mu.Unlock()
		if _, ok := feed.subs[ch]; !ok {
			return
		}
		delete(feed.subs, ch)
		if len(feed.subs) == 0 {
			hub.drop(siteName, feed)
		}
	}
}

// run holds the Podman stats stream open for a site and fans each sample out
// to its viewers. Failures while a pod is starting are retried; after three
// in a row (pod stopped or deleted) every viewer is closed out.
func (hub *podStatsHub) run(ctx context.Context, pc *podman.Client, siteName string, feed *podStatsFeed, names []string) {
	var path strings.Builder
	fmt.Fprintf(&path, "/v4.0.0/libpod/containers/stats?stream=true&interval=%d", podStatsInterval)
	for _, n := range names {
		path.WriteString("&containers=")
		path.WriteString(url.QueryEscape(n))
	}

	fails := 0
	for ctx.Err() == nil {
		if hub.stream(ctx, pc, path.String(), feed) {
			fails = 0
		} else {
			fails++
		}

		if fails >= 3 {
			logger.Debug("stats: pod stream for site %s gave up after %d consecutive failures", siteName, fails)
			hub.mu.Lock()
			for ch := range feed.subs {
				close(ch)
				delete(feed.subs, ch)
			}
			hub.drop(siteName, feed)
			hub.mu.Unlock()
			return
		}

		select {
		case <-ctx.Done():
			return
		case <-time.After(podStatsInterval * time.Second):
		}
	}
}

// stream reads one Podman stats stream until it ends, broadcasting each
// sample. It reports whether at least one sample was delivered.
func (hub *podStatsHub) stream(ctx context.Context, pc *podman.Client, path string, feed *podStatsFeed) bool {
	body, err := pc.StreamRaw(ctx, path)
	if err != nil {
		return false
	}
	defer body.Close()

	dec := json.NewDecoder(body)
	got := false
	for {
		var raw podmanStatsWrapper
		if err := dec.Decode(&raw); err != nil {
			return got
		}

		resp := podStatsResponse{Containers: make([]podStatEntry, 0, len(raw.Stats))}
		for _, e := range raw.Stats {
			resp.Containers = append(resp.Containers, podStatEntry{
				Name:       e.Name,
				CPUPercent: e.CPU,
				MemUsed:    e.MemUsage,
				MemLimit:   e.MemLimit,
			})
		}

		payload, err := json.Marshal(resp)
		if err != nil {
			logger.Error("stats: pod stream marshal failed: %v", err)
			continue
		}
		got = true
		hub.broadcast(feed, payload)
	}
}

// broadcast hands payload to every viewer, replacing any sample a slow viewer
// has not taken yet so a stalled tab never blocks the feed.
func (hub *podStatsHub) broadcast(feed *podStatsFeed, payload []byte) {
	hub.mu.Lock()
	defer hub.mu.Unlock()
	for ch := range feed.subs {
		select {
		case <-ch:
		default:
		}
		ch <- payload
	}
}

// drop stops a feed's stream and removes it from the hub. Callers hold hub.mu.
func (hub *podStatsHub) drop(siteName string, feed *podStatsFeed) {
	feed.cancel()
	if hub.sites[siteName] == feed {
		delete(hub.sites, siteName)
	}
}
