<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# EAXY — flujo Git (Cloud Agents)

- Al iniciar tarea: `npm run git:sync-main`, luego rama nueva `cursor/<descripcion>-3464` desde `main` actualizado.
- No reutilizar ramas `cursor/*` viejas salvo continuar una PR explícita; en ese caso, `git:sync-main` antes de editar.
- Antes de push/PR: otra vez `git:sync-main` con working tree limpio.
- Detalle completo: `.cursor/rules/git-workflow.mdc` y `scripts/git-sync-main.sh`.

