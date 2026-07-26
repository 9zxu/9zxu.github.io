#!/usr/bin/env bash
# Mirrors the Obsidian vault's blog/ folder into content/posts/ so it can be
# committed and built by GitHub Actions, which has no access to the vault.
# Run this, review the diff, commit, then push to publish.
set -euo pipefail

VAULT="$HOME/Vaults/CS/blog"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DEST="$REPO_ROOT/content/posts"

if [ ! -d "$VAULT" ]; then
  echo "error: vault folder not found at $VAULT" >&2
  exit 1
fi

mkdir -p "$DEST"
rsync -av --delete "$VAULT/" "$DEST/"

echo
echo "Synced. Review with: git -C \"$REPO_ROOT\" status content/posts"
