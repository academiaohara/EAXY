#!/usr/bin/env bash
# Cloud Agent start: refresh origin/main, then keep the Next.js dev server in the foreground.
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

if [[ -x "$repo_root/scripts/git-sync-main.sh" ]]; then
  bash "$repo_root/scripts/git-sync-main.sh" || echo "agent-bootstrap: git sync failed; continuing." >&2
else
  echo "agent-bootstrap: git-sync-main.sh missing; skipping main sync." >&2
fi

port="${PORT:-3000}"
if (echo >/dev/tcp/127.0.0.1/"$port") >/dev/null 2>&1; then
  echo "agent-bootstrap: dev server already listening on port ${port}."
  exit 0
fi

exec npm run dev -- --hostname 0.0.0.0 --port "$port"
