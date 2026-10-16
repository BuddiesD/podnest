// PodNest - Self-hosted site management platform
// Copyright (c) 2026 Kevin Pirnie <iam@kevinpirnie.com>
// Licensed under the MIT License. See LICENSE file in the project root for full license text.

package server

import (
	"sync"
	"time"

	"podnest/internal/models"
	"podnest/internal/podman"
)

// PodHealth holds health states for all containers in a pod.
type PodHealth struct {
	Containers []models.ContainerHealth
	UpdatedAt  time.Time
}

// statsCache is the shared in-memory store for container states and resource stats.
// States come from the pod state watcher and stats from the background poller;
// both are read by the WebSocket handler and resource watcher.
type statsCache struct {
	mu     sync.RWMutex
	health map[string]PodHealth              // keyed by pod name
	podOf  map[string]string                 // container name → pod name
	stats  map[string][]podman.ContainerStat // keyed by pod name
}

// newStatsCache returns an initialised statsCache.
func newStatsCache() *statsCache {
	return &statsCache{
		health: make(map[string]PodHealth),
		podOf:  make(map[string]string),
		stats:  make(map[string][]podman.ContainerStat),
	}
}

// setStates replaces every pod's container states in one swap, so pods that
// no longer exist drop out, and rebuilds the container-to-pod index.
func (c *statsCache) setStates(states map[string][]models.ContainerHealth) {
	health := make(map[string]PodHealth, len(states))
	podOf := make(map[string]string)
	now := time.Now()
	for pod, containers := range states {
		health[pod] = PodHealth{Containers: containers, UpdatedAt: now}
		for _, ct := range containers {
			podOf[ct.Name] = pod
		}
	}

	c.mu.Lock()
	c.health = health
	c.podOf = podOf
	c.mu.Unlock()
}

// podFor returns the pod a container belongs to.
func (c *statsCache) podFor(container string) (string, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()
	pod, ok := c.podOf[container]
	return pod, ok
}

// getHealth returns the last-known health state for a pod.
func (c *statsCache) getHealth(podName string) (PodHealth, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()
	h, ok := c.health[podName]
	return h, ok
}

// setAllStats replaces the stats for every pod in one swap, so stopped pods
// stop counting toward host usage.
func (c *statsCache) setAllStats(stats map[string][]podman.ContainerStat) {
	c.mu.Lock()
	c.stats = stats
	c.mu.Unlock()
}

// getStats returns the last-known resource stats for a pod.
func (c *statsCache) getStats(podName string) ([]podman.ContainerStat, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()
	s, ok := c.stats[podName]
	return s, ok
}

// allStats returns a snapshot of stats for all pods.
func (c *statsCache) allStats() map[string][]podman.ContainerStat {
	c.mu.RLock()
	defer c.mu.RUnlock()
	out := make(map[string][]podman.ContainerStat, len(c.stats))
	for k, v := range c.stats {
		out[k] = v
	}
	return out
}

// ContainerHealthFor returns the container health slice for a pod.
// Used to satisfy the health.HealthCache interface in the handler package.
func (c *statsCache) ContainerHealthFor(podName string) ([]models.ContainerHealth, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()
	h, ok := c.health[podName]
	if !ok {
		return nil, false
	}
	return h.Containers, ok
}
