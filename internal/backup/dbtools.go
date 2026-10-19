// PodNest - Self-hosted site management platform
// Copyright (c) 2026 Kevin Pirnie <iam@kevinpirnie.com>
// Licensed under the MIT License. See LICENSE file in the project root for full license text.

package backup

import (
	"bytes"
	"compress/gzip"
	"context"
	"fmt"
	"io"
	"os"
	"os/exec"
	"path/filepath"

	"podnest/internal/logger"
	"podnest/internal/models"
	"podnest/internal/podman"
)

// DumpDB streams a gzip-compressed dump of the site's database to w. Nothing
// reaches w until the dump produces output, so a dump that fails to start
// still leaves the caller free to send an error response.
func (m *Manager) DumpDB(ctx context.Context, site *models.Site, w io.Writer) error {

	// read DB credentials from the site's .env file
	envPath := filepath.Join(m.appPath, "sites", site.Name, ".env")
	dbName, err := readEnvValue(envPath, "DB_NAME")
	if err != nil {
		return fmt.Errorf("DumpDB: DB_NAME: %w", err)
	}
	rootPass, err := readEnvValue(envPath, "DB_ROOT_PASS")
	if err != nil {
		return fmt.Errorf("DumpDB: DB_ROOT_PASS: %w", err)
	}

	// stream mysqldump from the MariaDB container via podman exec CLI
	dbContainer := podman.ContainerName(site.Name, "db")
	dumpCmd := exec.CommandContext(ctx, "podman",
		"exec", "--user=mysql", "-e", "MYSQL_PWD", dbContainer,
		"sh", "-c",
		// the schema name is a positional arg, never interpolated into the script
		`mysqldump -uroot --single-transaction --quick --routines "$1" 2>/dev/null || `+
			`mariadb-dump -uroot --single-transaction --quick --routines "$1"`,
		"sh",
		dbName,
	)
	// MYSQL_PWD passed via -e (name only) so the password is in neither the host
	// nor the container process list
	dumpCmd.Env = append(os.Environ(), "CONTAINER_HOST=unix://"+m.podmanSock, "MYSQL_PWD="+rootPass)

	// capture dump stderr for error reporting
	var dumpStderr bytes.Buffer
	dumpCmd.Stderr = &dumpStderr

	stdout, err := dumpCmd.StdoutPipe()
	if err != nil {
		return fmt.Errorf("DumpDB: stdout pipe: %w", err)
	}
	if err := dumpCmd.Start(); err != nil {
		return fmt.Errorf("DumpDB: start mysqldump: %w", err)
	}

	// compress on the panel side so the DB container needs no compressor
	gz := gzip.NewWriter(w)
	if _, err := io.Copy(gz, stdout); err != nil {
		dumpCmd.Wait()
		return fmt.Errorf("DumpDB: stream: %w — dump_stderr: %s", err, dumpStderr.String())
	}

	// a failed dump leaves the gzip stream unterminated, so a truncated
	// download fails its integrity check instead of passing as complete
	if err := dumpCmd.Wait(); err != nil {
		return fmt.Errorf("DumpDB: mysqldump wait: %w — dump_stderr: %s", err, dumpStderr.String())
	}
	if err := gz.Close(); err != nil {
		return fmt.Errorf("DumpDB: gzip close: %w", err)
	}

	logger.Debug("DumpDB: dump streamed for site %s", site.Name)
	return nil
}
