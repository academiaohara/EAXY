#!/usr/bin/env bash
# Cloud Agent environment start hook: refresh origin/main before the agent edits anything.
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

if [[ -x "$repo_root/scripts/git-sync-main.sh" ]]; then
  bash "$repo_root/scripts/git-sync-main.sh"
else
  echo "agent-bootstrap: git-sync-main.sh missing; skipping main sync." >&2
fi
