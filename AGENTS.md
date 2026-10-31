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

# EAXY — solo escritorio (sin móvil)

- La plataforma **no** se usa en móvil: bloqueo en `DesktopOnlyGate` (layout raíz), mínimo 768px.
- **No** añadir navegación móvil, modos «desde el móvil», layouts `max-*` para pantallas estrechas ni features solo móvil.
- Reglas completas: `.cursor/rules/desktop-only.mdc`.

# EAXY — entorno de desarrollo

- El arranque del Cloud Agent ejecuta `scripts/agent-bootstrap.sh`: sincroniza `origin/main` y deja `next dev` en http://localhost:3000.
- Sin `.env.local` ni secretos de Supabase, ese script exporta claves locales de relleno y `CONTENT_PREVIEW_MODE=true`. El cliente de Supabase exige URL y clave; el catálogo de `/aprender` sigue siendo el embebido y el progreso queda en el navegador.
- `npx supabase start` necesita Docker y no forma parte de este entorno. Con la salida del CLI, crea `.env.local` para usar Auth y aulas reales.
- Comprobaciones: `npm run lint`, `npm run test:run`, `npm run test:e2e`, `npm run build`.

# EAXY — ilustraciones de lecciones

- Elegir el realismo según la edad, la asignatura y la tarea: documentos e interfaces fieles, fotografías o ilustraciones cuando ayuden a observar; geometría precisa para construir. El estilo «libro 1.º ESO» solo corresponde a los recursos que lo especifiquen.
- Flujo: `Assets/` → `public/lesson/<carpeta>/`; detalle, prompts y tamaños en **`docs/lesson-illustrations.md`** (regla Cursor: `.cursor/rules/lesson-illustrations.mdc`).


# EAXY — diapositivas de lección

- Antes de crear o revisar lecciones, leer **`docs/lesson-quality-standard.md`** y completar la ficha breve de **`docs/templates/lesson-design.md`** con el contexto ya disponible. Este estándar sustituye recetas antiguas de formato y cuotas de ejercicios.
- Elegir el medio según el aprendizaje: documento interactivo, simulación de interfaz, manipulable, imagen, comparación o animación. `slide` y `storyboard` son opciones; Manim acompaña cuando hace visible una relación o construcción. Catálogo técnico: **`docs/lessons-slides.md`**.
- Animaciones nuevas: `src/components/lesson/anim/` (registro en `registry.tsx`); el test `slide-anim.test.tsx` dibuja todos sus pasos.

# EAXY — al añadir lecciones nuevas

- Revisar primero el tema completo: objetivo observable, conocimientos previos y reparto de conceptos sin explicaciones duplicadas.
- La práctica principal debe permitir construir, inspeccionar, experimentar, diagnosticar, reparar o producir algo propio de la materia, con consecuencias visibles y reintentos. Tests y clasificaciones son comprobaciones puntuales; no deben ser la única práctica ni la dominante salvo justificación pedagógica explícita.
- Elegir o crear la interacción mínima que necesita el objetivo; no adaptar el aprendizaje al módulo disponible. Integrar explicación y acción, usar el ancho útil y sincronizar texto y visual sin imponer tarjetas con borde.
- Aceptar con evidencia pedagógica, conceptual, visual y funcional según **`docs/lesson-quality-standard.md`**. Respetar el presupuesto del usuario, sin agentes adicionales ni verificaciones repetidas por rutina.

# EAXY — convertir un PDF de libro en un tema

- Receta completa y ejemplo de referencia (unidad 10 de Tecnología Industrial II): **`docs/pdf-a-tema.md`** (regla Cursor: `.cursor/rules/pdf-a-tema.mdc`).
- Revisar un tema hecho por otro agente: **`docs/revision-tema.md`** (`scripts/review-tema.ts` y `scripts/review-visual.mjs`).
