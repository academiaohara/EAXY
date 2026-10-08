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

# The Supabase client throws when URL and key are missing, including on pages
# that otherwise use the embedded catalog. Without .env.local or injected
# secrets, export local placeholders and keep content preview on.
if [[ -z "${NEXT_PUBLIC_SUPABASE_URL:-}" || -z "${NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:-}" ]]; then
  if [[ ! -f "$repo_root/.env.local" ]]; then
    export CONTENT_PREVIEW_MODE="${CONTENT_PREVIEW_MODE:-true}"
    export NEXT_PUBLIC_SUPABASE_URL="${NEXT_PUBLIC_SUPABASE_URL:-http://127.0.0.1:54321}"
    export NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="${NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:-local-preview-publishable-key}"
    export SUPABASE_SECRET_KEY="${SUPABASE_SECRET_KEY:-local-preview-secret-key}"
    export CREDENTIALS_ENCRYPTION_KEY="${CREDENTIALS_ENCRYPTION_KEY:-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=}"
    echo "agent-bootstrap: no Supabase env; using content preview placeholders."
  fi
fi

port="${PORT:-3000}"
if (echo >/dev/tcp/127.0.0.1/"$port") >/dev/null 2>&1; then
  echo "agent-bootstrap: dev server already listening on port ${port}."
  exit 0
fi

exec npm run dev -- --hostname 0.0.0.0 --port "$port"
