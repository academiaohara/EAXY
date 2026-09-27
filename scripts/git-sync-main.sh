#!/usr/bin/env bash
# Keep local main and feature branches aligned with origin/main to avoid PR merge conflicts.
set -euo pipefail

REMOTE="${GIT_SYNC_REMOTE:-origin}"
BASE="${GIT_SYNC_BASE:-main}"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "git-sync-main: not inside a git repository" >&2
  exit 1
fi

if ! git remote get-url "$REMOTE" >/dev/null 2>&1; then
  echo "git-sync-main: remote '$REMOTE' not found" >&2
  exit 1
fi

echo "git-sync-main: fetching $REMOTE/$BASE..."
git fetch "$REMOTE" "$BASE"

if ! git show-ref --verify --quiet "refs/remotes/$REMOTE/$BASE"; then
  echo "git-sync-main: refs/remotes/$REMOTE/$BASE not found after fetch" >&2
  exit 1
fi

branch="$(git branch --show-current || true)"
if [[ -z "$branch" ]]; then
  echo "git-sync-main: detached HEAD; updated remote tracking ref only."
  exit 0
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "git-sync-main: working tree has uncommitted changes; skipping merge (fetch done)." >&2
  exit 0
fi

if [[ "$branch" == "$BASE" ]]; then
  echo "git-sync-main: fast-forwarding $BASE to $REMOTE/$BASE..."
  git merge --ff-only "$REMOTE/$BASE"
  echo "git-sync-main: $BASE is up to date with $REMOTE/$BASE."
  exit 0
fi

behind="$(git rev-list --count "HEAD..$REMOTE/$BASE" || echo 0)"
if [[ "$behind" == "0" ]]; then
  echo "git-sync-main: branch '$branch' already includes $REMOTE/$BASE."
  exit 0
fi

echo "git-sync-main: merging $REMOTE/$BASE into '$branch' ($behind commit(s) behind)..."
git merge "$REMOTE/$BASE" -m "merge: sync $REMOTE/$BASE into $branch"
