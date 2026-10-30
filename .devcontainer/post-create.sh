#!/bin/sh
set -eu

cd "$(dirname "$0")/.."

git config --global core.autocrlf input

npm install --no-audit --no-fund

go install github.com/go-delve/delve/cmd/dlv@v1.27.2
go install golang.org/x/tools/gopls@v0.24.0

go mod download
go build ./...
