# Calidad, Git y reglas inviolables

## Comprobaciones antes de dar por bueno un cambio

```bash
npm run lint
npm run test:run
npm run build        # antes de PRs grandes
npm run test:e2e     # si tocaste flujos de usuario críticos
```

Formato: `npm run format:check` / `npm run format`.

## Git (humans y agentes)

Detalle en `.cursor/rules/git-workflow.mdc` y `AGENTS.md`:

1. `npm run git:sync-main` antes de crear rama o antes de push.
2. Rama feature: `cursor/<descripcion>-<id>` (en Cloud Agents puede ser `-6b8a`, en Cursor local `-3464`).
3. Diff acotado: evita `package-lock.json` sin motivo.
4. Si `next dev` reescribe el bloque Next en `AGENTS.md`, commitea ese cambio **junto** con tu trabajo.

## Solo escritorio (obligatorio)

Reglas completas: `.cursor/rules/desktop-only.mdc`.

Resumen para Claude:

- No navegación móvil, no `safe-area-inset`, no features «desde el móvil».
- No breakpoints `max-sm` / `max-md` para layout móvil.
- No ocultar nav principal para pantallas estrechas.
- Gate: `DesktopOnlyGate` en `src/app/layout.tsx`.

## Archivos sensibles a conflictos

Toca lo mínimo:

- `src/components/lesson/LessonContainer.tsx`
- `src/app/globals.css`
- Árbol `src/app/aprender/**` y rutas de lección

## Estilo de código

- ESLint + Prettier del repo; no desactives reglas en bloque.
- Imports ordenados como en archivos vecinos (`@/components`, `@/lib`).
- Commits en español o inglés descriptivos; un commit lógico por cambio.

## Seguridad

- No commitear `.env.local` ni secretos.
- No exponer service role en cliente.
- Ver [`docs/security.md`](../security.md) para RLS y menores.

## Definition of done (web)

1. Código sigue patrones de `02-nextjs-y-react.md` y `03-ui-estilos.md`.
2. Lint y tests unitarios pasan.
3. UI probada en viewport ≥ 768px.
4. Copy en español coherente con pantallas cercanas.
