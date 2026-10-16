// PodNest - Self-hosted site management platform
// Copyright (c) 2026 Kevin Pirnie <iam@kevinpirnie.com>
// Licensed under the MIT License. See LICENSE file in the project root for full license text.

package stats

import (
	"bufio"
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"strconv"
	"strings"
	"sync"
	"syscall"
	"time"

	"podnest/internal/logger"

	"github.com/gorilla/websocket"
)

// hostStatsInterval is how often the shared host sampler takes a reading.
const hostStatsInterval = 2 * time.Second

// hostStatsResponse is the dashboard host-usage WebSocket push payload.
type hostStatsResponse struct {
	CPUPercent   float64 `json:"cpu_percent"`
	MemUsed      int64   `json:"mem_used"`
	MemTotal     int64   `json:"mem_total"`
	DiskUsed     int64   `json:"disk_used"`
	DiskTotal    int64   `json:"disk_total"`
	ProcsRunning int     `json:"procs_running"`
	ProcsTotal   int     `json:"procs_total"`
}

// hostStatsHub runs one host sampler for every dashboard viewer, started by
// the first viewer and stopped after the last one leaves.
type hostStatsHub struct {
	mu     sync.Mutex
	cancel context.CancelFunc
	subs   map[chan []byte]struct{}
}

// hostHub is the package-level sampler shared by all host stats WebSockets.
var hostHub = &hostStatsHub{subs: make(map[chan []byte]struct{})}

// subscribe registers a viewer for host stats, starting the sampler on the
// first viewer; the returned func unsubscribes and stops it after the last.
func (hub *hostStatsHub) subscribe(appPath string) (<-chan []byte, func()) {
	ch := make(chan []byte, 1)

	hub.mu.Lock()
	if hub.cancel == nil {
		ctx, cancel := context.WithCancel(context.Background())
		hub.cancel = cancel
		go hub.run(ctx, appPath)
	}
	hub.subs[ch] = struct{}{}
	hub.mu.Unlock()

	return ch, func() {
		hub.mu.Lock()
		defer hub.mu.Unlock()
		delete(hub.subs, ch)
		if len(hub.subs) == 0 && hub.cancel != nil {
			hub.cancel()
			hub.cancel = nil
		}
	}
}

// run samples host CPU, memory, disk, and process counts every interval and
// broadcasts each reading. /proc/stat, /proc/meminfo, and /proc/loadavg report
// host-wide figures even from inside the container's own PID namespace; disk
// is the filesystem holding the app path.
func (hub *hostStatsHub) run(ctx context.Context, appPath string) {

	// CPU percent is a delta between samples, so take the baseline up front
	prevTotal, prevIdle, err := readCPUTimes()
	if err != nil {
		logger.Debug("stats: host cpu baseline: %v", err)
	}

	ticker := time.NewTicker(hostStatsInterval)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
		}

		var resp hostStatsResponse

		if total, idle, err := readCPUTimes(); err != nil {
			logger.Debug("stats: host cpu: %v", err)
		} else {
			if dt := total - prevTotal; prevTotal > 0 && dt > 0 {
				resp.CPUPercent = float64(dt-(idle-prevIdle)) / float64(dt) * 100
			}
			prevTotal, prevIdle = total, idle
		}

		if used, total, err := readHostMem(); err != nil {
			logger.Debug("stats: host mem: %v", err)
		} else {
			resp.MemUsed, resp.MemTotal = used, total
		}

		var st syscall.Statfs_t
		if err := syscall.Statfs(appPath, &st); err != nil {
			logger.Debug("stats: host disk: %v", err)
		} else {
			bs := int64(st.Bsize)
			resp.DiskTotal = int64(st.Blocks) * bs
			resp.DiskUsed = int64(st.Blocks-st.Bfree) * bs
		}

		if running, total, err := readProcCounts(); err != nil {
			logger.Debug("stats: host procs: %v", err)
		} else {
			resp.ProcsRunning, resp.ProcsTotal = running, total
		}

		payload, err := json.Marshal(resp)
		if err != nil {
			logger.Error("stats: host stats marshal failed: %v", err)
			continue
		}
		hub.broadcast(ctx, payload)
	}
}

// broadcast hands payload to every viewer, replacing any reading a slow viewer
// has not taken yet so a stalled tab never blocks the sampler.
func (hub *hostStatsHub) broadcast(ctx context.Context, payload []byte) {
	hub.mu.Lock()
	defer hub.mu.Unlock()

	// a stopped sampler must not feed the viewers of its replacement
	if ctx.Err() != nil {
		return
	}
	for ch := range hub.subs {
		select {
		case <-ch:
		default:
		}
		ch <- payload
	}
}

// apiHostStats upgrades to WebSocket and relays the shared host sampler's
// CPU, memory, disk, and process counts every 2s.
func (h *Handler) apiHostStats(w http.ResponseWriter, r *http.Request) {
	conn, err := wsUpgrader.Upgrade(w, r, nil)
	if err != nil {
		logger.Error("stats: ws upgrade for host stats: %v", err)
		return
	}
	defer conn.Close()

	// the pong handler only runs inside a read, and a hijacked connection's
	// request context is not cancelled when the client goes away — this loop
	// does both, closing done on disconnect or a missed pong deadline
	conn.SetPongHandler(func(string) error {
		return conn.SetReadDeadline(time.Now().Add(60 * time.Second))
	})
	_ = conn.SetReadDeadline(time.Now().Add(60 * time.Second))
	done := make(chan struct{})
	go func() {
		defer close(done)
		for {
			if _, _, err := conn.NextReader(); err != nil {
				return
			}
		}
	}()

	pingTicker := time.NewTicker(30 * time.Second)
	defer pingTicker.Stop()

	feed, unsubscribe := hostHub.subscribe(h.AppPath)
	defer unsubscribe()

	for {
		select {
		case <-done:
			return
		case <-pingTicker.C:
			if err := conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		case payload := <-feed:
			if err := conn.WriteMessage(websocket.TextMessage, payload); err != nil {
				logger.Debug("stats: ws write failed for host stats: %v", err)
				return
			}
		}
	}
}

// readCPUTimes returns the aggregate jiffies from the first line of /proc/stat
// as a total and the idle portion (idle + iowait).
func readCPUTimes() (total, idle uint64, err error) {
	f, err := os.Open("/proc/stat")
	if err != nil {
		return 0, 0, err
	}
	defer f.Close()

	sc := bufio.NewScanner(f)
	if !sc.Scan() {
		return 0, 0, fmt.Errorf("empty /proc/stat")
	}
	fields := strings.Fields(sc.Text())
	if len(fields) < 9 || fields[0] != "cpu" {
		return 0, 0, fmt.Errorf("unexpected /proc/stat cpu line")
	}

	// user nice system idle iowait irq softirq steal — guest time is already
	// counted inside user, so summing it again would double count
	for i, s := range fields[1:9] {
		v, err := strconv.ParseUint(s, 10, 64)
		if err != nil {
			return 0, 0, fmt.Errorf("parse /proc/stat: %w", err)
		}
		total += v
		if i == 3 || i == 4 {
			idle += v
		}
	}
	return total, idle, nil
}

// readHostMem returns used (MemTotal - MemAvailable) and total memory in bytes
// from /proc/meminfo.
func readHostMem() (used, total int64, err error) {
	data, err := os.ReadFile("/proc/meminfo")
	if err != nil {
		return 0, 0, err
	}

	var avail int64
	for _, line := range strings.Split(string(data), "\n") {
		fields := strings.Fields(line)
		if len(fields) < 2 {
			continue
		}
		switch fields[0] {
		case "MemTotal:":
			total, _ = strconv.ParseInt(fields[1], 10, 64)
		case "MemAvailable:":
			avail, _ = strconv.ParseInt(fields[1], 10, 64)
		}
	}
	if total == 0 {
		return 0, 0, fmt.Errorf("MemTotal not found in /proc/meminfo")
	}
	return (total - avail) * 1024, total * 1024, nil
}

// readProcCounts returns the host-wide runnable and total scheduling entity
// counts from the fourth field of /proc/loadavg.
func readProcCounts() (running, total int, err error) {
	data, err := os.ReadFile("/proc/loadavg")
	if err != nil {
		return 0, 0, err
	}
	fields := strings.Fields(string(data))
	if len(fields) < 4 {
		return 0, 0, fmt.Errorf("unexpected /proc/loadavg format")
	}
	r, t, ok := strings.Cut(fields[3], "/")
	if !ok {
		return 0, 0, fmt.Errorf("unexpected /proc/loadavg running/total field")
	}
	if running, err = strconv.Atoi(r); err != nil {
		return 0, 0, fmt.Errorf("parse /proc/loadavg running: %w", err)
	}
	if total, err = strconv.Atoi(t); err != nil {
		return 0, 0, fmt.Errorf("parse /proc/loadavg total: %w", err)
	}
	return running, total, nil
}
