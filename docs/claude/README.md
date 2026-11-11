# Contexto para Claude (desarrollo web en Eaxy)

Esta carpeta reúne **instrucciones y contexto** para que Claude (Claude Code, Claude.ai con archivos del proyecto, o cualquier sesión con el repo) sepa **cómo programar la web** en este repositorio sin adivinar convenciones.

## Cómo usar estos archivos

### Opción A — Claude Code (recomendada)

1. Abre el repositorio Eaxy en Claude Code.
2. `CLAUDE.md` en la raíz ya enlaza este índice; Claude lo lee al iniciar.
3. Para una tarea concreta, pide explícitamente: *«Lee `docs/claude/02-nextjs-y-react.md` antes de tocar rutas»* (o el doc que aplique).

### Opción B — Proyecto en Claude.ai (Knowledge)

Sube o sincroniza estos archivos (como mínimo):

| Prioridad | Archivo |
| --------- | ------- |
| Obligatorio | `CLAUDE.md`, `AGENTS.md` |
| Obligatorio | `docs/claude/01-contexto-eaxy.md`, `docs/claude/02-nextjs-y-react.md` |
| Muy recomendable | `docs/claude/03-ui-estilos.md`, `docs/claude/05-calidad-git.md` |
| Según tarea | Resto de `docs/*.md` (dominio, ejercicios, seguridad, etc.) |

### Opción C — Pegar un prompt inicial

Copia el contenido de [`prompt-inicial.md`](./prompt-inicial.md) al inicio de la conversación y adjunta el diff o la ruta que quieres cambiar.

## Índice de guías

| Archivo | Para qué sirve |
| ------- | -------------- |
| [00-como-usar-con-claude.md](./00-como-usar-con-claude.md) | Flujo de trabajo con el asistente, qué leer primero, anti-patrones |
| [01-contexto-eaxy.md](./01-contexto-eaxy.md) | Producto, stack, rutas principales, carpetas del código |
| [02-nextjs-y-react.md](./02-nextjs-y-react.md) | App Router, RSC vs Client, Server Actions, patrones del repo |
| [03-ui-estilos.md](./03-ui-estilos.md) | Tailwind v4, shadcn/ui, tipografía, tokens de marca |
| [04-datos-auth-supabase.md](./04-datos-auth-supabase.md) | Supabase, sesión, entorno local, dónde va la lógica |
| [05-calidad-git.md](./05-calidad-git.md) | Lint, tests, Git, reglas solo-escritorio |
| [prompt-inicial.md](./prompt-inicial.md) | Bloque listo para copiar como instrucciones de sistema |

## Documentación de diseño (dominio de negocio)

No sustituye las guías anteriores; complétalas cuando implementes mastery, ejercicios, aulas, etc.:

- Índice: [`docs/README.md`](../README.md)
- Arquitectura: [`docs/architecture.md`](../architecture.md)

## Reglas duplicadas a propósito

Cursor usa `.cursor/rules/*.mdc` y `AGENTS.md`. Claude debe respetar **las mismas reglas**; aquí están explicadas en prosa en `05-calidad-git.md` y enlazadas desde `CLAUDE.md`.
