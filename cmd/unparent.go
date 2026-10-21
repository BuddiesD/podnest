// PodNest - Self-hosted site management platform
// Copyright (c) 2026 Kevin Pirnie <iam@kevinpirnie.com>
// Licensed under the MIT License. See LICENSE file in the project root for full license text.

package cmd

import (
	"errors"
	"fmt"

	"podnest/internal/db"
	"podnest/internal/logger"
	"podnest/internal/nodelink"

	"github.com/spf13/cobra"
)

// setup the 'unparent' command
var unparentCmd = &cobra.Command{
	Use:   "unparent",
	Short: "Drop this node's parent link and every user synced from it",
	RunE:  runUnparent,
}

// add the 'unparent' command to the root command
func init() {
	rootCmd.AddCommand(unparentCmd)
}

// runUnparent removes the parent link locally — the recovery path for a parent
// that is dead or compromised and so cannot sign an unpair
func runUnparent(cmd *cobra.Command, args []string) error {

	// open the database
	database, err := db.Open(dbPath())
	if err != nil {
		return err
	}
	defer database.Close()

	parent, err := db.GetNodeParent(database)
	if err != nil {
		return err
	}
	if parent == nil {
		logger.Info("This node has no parent.\n")
		return nil
	}

	if err := nodelink.DropParent(database); err != nil {
		if errors.Is(err, db.ErrNoLocalAdmin) {
			return fmt.Errorf("synced users own sites and there is no local admin to reassign them to — create a local admin first")
		}
		return err
	}

	logger.Info("Parent link removed and synced users deleted.\n")
	return nil
}
