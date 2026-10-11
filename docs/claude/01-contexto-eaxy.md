# Contexto del proyecto Eaxy

## Qué es

**Eaxy** es una plataforma web de **matemáticas adaptativas** (ESO): aprendizaje personalizado, práctica por conceptos, progreso (mastery), aulas para profesores y contenido curricular (cursos → temas → lecciones → ejercicios).

## Stack (no negociable)

| Capa | Tecnología |
| ---- | ---------- |
| Framework | Next.js **16** (App Router) |
| UI | React **19**, TypeScript |
| Estilos | Tailwind CSS **v4** (`src/app/globals.css`, `@import "tailwindcss"`) |
| Componentes base | shadcn/ui (estilo `base-nova`, RSC activado en `components.json`) |
| Iconos | `lucide-react` |
| Validación | Zod v4 |
| Backend / DB | Supabase (PostgreSQL, Auth, RLS) |
| Tests | Vitest (unit), Playwright (e2e) |

Alias de imports: `@/*` → `src/*` (ver `tsconfig.json`).

## Restricción de producto: solo escritorio

La app **no** está pensada para móvil. Viewport mínimo **768px**; gate en layout raíz. Ver `05-calidad-git.md` y `.cursor/rules/desktop-only.mdc`.

## Rutas principales (App Router)

Rutas reales bajo `src/app/` (evolucionan; confirma en el árbol si dudas):

| Ruta | Uso |
| ---- | --- |
| `/` | Marketing / landing |
| `/login`, `/registro`, `/entrar` | Auth |
| `/aprender` | Hub del estudiante, catálogo de cursos |
| `/aprender/curso/[courseId]/…` | Navegación curricular |
| `/aprender/leccion/[lessonId]` | Lección |
| `/aprender/leccion-interactiva/[slug]` | Lecciones interactivas (stage modules) |
| `/aprender/ejercicio/[exerciseId]` | Ejercicio suelto |
| `/practicar`, `/practicar/[conceptSlug]` | Práctica adaptativa |
| `/progreso` | Mapa de dominio |
| `/aulas`, `/aulas/[id]/…` | Profesor: aulas y alumnos |
| `/tutor` | Vista tutor (si aplica en tu rama) |

## Estructura de código (resumen)

```
src/
  app/              # Rutas, layouts, metadata (RSC por defecto)
  components/
    ui/             # shadcn (Button, Card, Dialog…)
    exercises/      # Widgets por tipo de ejercicio
    learning/       # Catálogo, recomendaciones, progreso
    lesson/         # Contenedor y pasos de lección interactiva
    layout/         # Nav, desktop gate
    marketing/      # Landing
  lib/              # Dominio, Supabase, auth, queries (sin React salvo hooks puntuales)
  hooks/            # Hooks de cliente
  types/            # Tipos compartidos, database
  tests/unit/       # Vitest
e2e/                # Playwright
docs/               # Diseño de producto y arquitectura
supabase/           # Migraciones y config local
```

La arquitectura objetivo (capas, flujos) está detallada en [`docs/architecture.md`](../architecture.md).

## Entorno de desarrollo

```bash
npm install
npm run dev          # http://localhost:3000
npm run lint
npm run test:run
npm run test:e2e
npm run build
```

- Sin `.env.local`: el bootstrap del agente puede usar claves de relleno y `CONTENT_PREVIEW_MODE=true`; catálogo embebido y progreso en navegador.
- Con Supabase local (`npx supabase start`, requiere Docker): crea `.env.local` con URL y keys del CLI para auth y aulas reales.

## Principio de implementación

**Primero el patrón del repo, luego el tutorial genérico de React/Next.** El código ya mezcla Server Components para lecturas y Client Components para interactividad (ejercicios, lecciones, nav).
