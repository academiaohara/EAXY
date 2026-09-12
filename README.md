# Eaxy

Proyecto Next.js con TypeScript, Tailwind CSS y shadcn/ui.

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **shadcn/ui**
- **ESLint + Prettier**
- **Vitest** (tests unitarios)
- **Playwright** (tests E2E)

## Comandos

```bash
npm install
npm run dev          # Servidor de desarrollo (http://localhost:3000)
npm run build        # Build de producción
npm run lint         # ESLint
npm run format       # Prettier
npm run test         # Vitest (watch)
npm run test:run     # Vitest (una pasada)
npm run test:e2e     # Playwright
```

## Estructura

```
src/
  app/              # App Router (páginas y layouts)
  components/ui/    # Componentes shadcn/ui
  lib/              # Utilidades compartidas
  tests/            # Tests unitarios (Vitest)
  types/            # Tipos TypeScript
e2e/                # Tests E2E (Playwright)
docs/               # Documentación
.cursor/rules/      # Reglas para Cursor
```
