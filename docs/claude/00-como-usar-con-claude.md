# Cómo trabajar con Claude en este repo

## Objetivo

Que cada sesión produzca código **alineado con Eaxy**: Next.js 16 App Router, TypeScript estricto, dominio en `src/lib/`, UI con Tailwind v4 + shadcn, **solo escritorio**, textos en **español** en la UI.

## Orden de lectura según la tarea

| Tarea | Leer primero |
| ----- | -------------- |
| Nueva página o ruta | `02-nextjs-y-react.md`, luego mirar una página similar en `src/app/` |
| Componente visual / layout | `03-ui-estilos.md`, componentes en `src/components/ui/` |
| Formulario, login, aulas | `04-datos-auth-supabase.md`, archivos en `src/lib/auth/` y `src/lib/classrooms/` |
| Ejercicio interactivo | `docs/exercises.md`, `src/components/exercises/`, `src/lib/exercise-engine/` |
| Lección interactiva | `src/components/lesson/` (cambios mínimos; archivos muy compartidos) |
| Cualquier cambio | `05-calidad-git.md` |

## Flujo recomendado para Claude

1. **Entender el alcance** — Una feature o un bug; no mezclar refactors amplios.
2. **Localizar el patrón existente** — Buscar una ruta o componente parecido y copiar estructura (imports, nombres, fetching).
3. **Implementar el diff mínimo** — Sin tocar `package.json` salvo necesidad real.
4. **Verificar** — `npm run lint`, `npm run test:run`; si cambia flujo de usuario, `npm run test:e2e` o probar en `npm run dev`.
5. **Next.js 16** — Si la API no coincide con tu entrenamiento, lee `node_modules/next/dist/docs/` en el repo antes de inventar APIs.

## Qué pedirle explícitamente al usuario (si falta contexto)

- ¿La pantalla es para estudiante, profesor o marketing (home)?
- ¿Requiere usuario autenticado o funciona en modo preview (`CONTENT_PREVIEW_MODE`)?
- ¿Hay diseño (Figma, captura) o debe seguir páginas existentes?

## Anti-patrones (no hacer)

- Tratar la app como responsive móvil (`max-sm`, menú hamburguesa, ocultar nav con `hidden md:`).
- Poner lógica de negocio pesada dentro de componentes de página; va en `src/lib/`.
- Crear APIs REST nuevas cuando un **Server Action** en `src/lib/*/actions.ts` basta.
- Importar el cliente de Supabase en componentes servidor sin el helper correcto (`src/lib/supabase/`).
- Cambiar `LessonContainer.tsx`, `globals.css` o muchas rutas bajo `aprender/` sin necesidad.
- Asumir Next.js 14/15: este proyecto usa **Next.js 16** (ver bloque en `AGENTS.md`).

## Idioma

- **UI y copy visible al usuario:** español (España), tono claro y educativo.
- **Código:** identificadores en inglés (convención del repo); comentarios en español solo si aclaran reglas de negocio no obvias.

## Archivos de referencia rápida en el código

| Necesidad | Dónde mirar |
| --------- | ----------- |
| Página con datos en servidor | `src/app/aprender/page.tsx` |
| Layout raíz y fuentes | `src/app/layout.tsx` |
| Navegación app | `src/components/layout/app-nav.tsx` |
| Utilidad `cn()` | `src/lib/utils.ts` |
| Botón / Card shadcn | `src/components/ui/button.tsx`, `card.tsx` |
| Server Action de dominio | `src/lib/classrooms/actions.ts` |
| Bloqueo viewport | `src/components/layout/desktop-only-gate.tsx` |
