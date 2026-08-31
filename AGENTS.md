# Eaxy — Guía para agentes de Cursor

## Qué es Eaxy

Plataforma interactiva de aprendizaje de matemáticas (estilo Brilliant.org). Los estudiantes aprenden haciendo con lecciones cortas, widgets visuales y feedback inmediato. Interfaz y contenido en **español**.

## Estado actual (MVP)

- Next.js 16 + TypeScript + Tailwind CSS (App Router)
- Lecciones en JSON bajo `content/math/`
- Motor de lecciones con validación Zod
- 3 widgets: `tap_select`, `slider_explore`, `fraction_bar`
- 1 lección demo: fracciones (`content/math/fracciones-intro.json`)
- Progreso en localStorage (sin auth)

## Estructura clave

```
content/math/           → Lecciones JSON + index.json
src/lib/lesson-schema.ts → Esquema Zod (fuente de verdad)
src/lib/lesson-engine.ts → Comprobación de respuestas
src/components/widgets/  → Widgets interactivos
src/components/lesson/   → LessonPlayer, FeedbackPanel
docs/notes/             → Apuntes pedagógicos (contexto, no copiar literal)
docs/architecture.md    → Arquitectura técnica detallada
```

## Convenciones

- **Idioma:** Todo el contenido visible al usuario en español.
- **Público:** ESO / bachillerato inicial.
- **Fórmulas:** KaTeX con `$...$` (inline) y `$$...$$` (bloque).
- **Validar lecciones:** `npm run validate:lessons` antes de commitear contenido nuevo.
- **No implementar aún:** auth, pagos, física, tecnología.

## Diseño responsive

Usa siempre los componentes de layout para nuevas pantallas:

- `PageShell` — envoltorio de página (`min-h-dvh`, columna flex).
- `PageContainer` — ancho y padding fluido (`width`: `lesson` | `content` | `wide`).
- `SiteHeader` / `SiteFooter` — cabecera y pie reutilizables.
- `LessonActionBar` — acciones pegadas abajo en móvil (safe area incluida).
- `Button` — botones con objetivo táctil mínimo (44px).

Tokens en `globals.css`: `--page-padding-x/y`, safe areas, `.page-container`, `.touch-target`, `.prose-math`. En widgets y UI, prioriza clases `sm:` / `lg:` y apila en columna en móvil cuando haya filas densas.

## Cómo añadir una lección

1. Crear JSON en `content/math/` siguiendo `lesson-schema.ts`.
2. Registrar en `content/math/index.json`.
3. Ejecutar `npm run validate:lessons`.
4. Probar en `/leccion/[slug]`.

## Cómo añadir un widget

1. Definir esquema Zod en `lesson-schema.ts`.
2. Añadir al discriminated union `widgetSchema`.
3. Implementar componente en `src/components/widgets/`.
4. Registrar en `LessonPlayer.tsx` (render + estado inicial).
5. Añadir lógica de comprobación en `lesson-engine.ts`.

## Apuntes pedagógicos

Los archivos en `docs/notes/` son contexto para diseñar lecciones. Adapta el contenido al formato interactivo; no copies texto literal sin revisar.

## Comandos útiles

```bash
npm install
npm run dev          # http://localhost:3000
npm run build
npm run validate:lessons
npm run lint
```

## Próximos pasos sugeridos

- Importar apuntes reales a `docs/notes/` y crear más lecciones
- Nuevos widgets: drag_and_drop, graph_plot, number_input
- Mejorar accesibilidad (ARIA, teclado)
- Tests unitarios del motor de lecciones
- CI con validación de lecciones

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
