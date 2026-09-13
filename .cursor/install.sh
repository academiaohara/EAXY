#!/usr/bin/env bash
# Cloud Agent install step for Eaxy.
# Idempotent: safe to run repeatedly and against cached/snapshot state.
set -euo pipefail

cd "$(dirname "$0")/.."

# Install locked dependencies (.npmrc sets legacy-peer-deps=true).
npm ci

# Install the Chromium browser + OS libs used by the Playwright E2E suite.
npx playwright install --with-deps chromium

# Provide default local env for the dev server / build when none is present.
# These are non-secret placeholders that enable the app's built-in mock
# classroom mode (E2E_MOCK_CLASSROOM), so the core flows run without a live
# Supabase / Docker. Replace with real Supabase values (and drop
# E2E_MOCK_CLASSROOM) for full database-backed features.
if [ ! -f .env.local ]; then
  cat > .env.local <<'EOF'
E2E_MOCK_CLASSROOM=true
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=dev-publishable-key
SUPABASE_SECRET_KEY=dev-secret-key
CREDENTIALS_ENCRYPTION_KEY=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=
EOF
  echo "Created default .env.local (mock mode)."
else
  echo ".env.local already present; leaving it unchanged."
fi
