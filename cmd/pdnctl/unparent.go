// PodNest - Self-hosted site management platform
// Copyright (c) 2026 Kevin Pirnie <iam@kevinpirnie.com>
// Licensed under the MIT License. See LICENSE file in the project root for full license text.

package main

// This file defines the unparent subcommand — drops the node's parent link and
// its synced users from the host, for a parent that can no longer unpair it.
import (
	"github.com/spf13/cobra"
)

// unparentCmd removes this node's parent link
var unparentCmd = &cobra.Command{
	Use:   "unparent",
	Short: "Drop this node's parent link and every user synced from it",
	RunE: func(cmd *cobra.Command, args []string) error {
		s, err := loadState()
		if err != nil {
			return err
		}
		return userRun(s.User, s.UID, "podman", "exec", "podnest",
			"podnest", "unparent", "--app-path", "/opt/podnest",
		)
	},
}

// wire up the unparent subcommand
func init() {
	rootCmd.AddCommand(unparentCmd)
}
