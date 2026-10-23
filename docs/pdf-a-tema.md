# De un PDF del libro a un tema de lecciones

Receta usada para las unidades 1–10 de **Tecnología Industrial II** (curso `tecnologia-industrial-2-bachillerato`). Sirve para cualquier libro troceado en PDF. Ejemplo completo y reciente: unidad 10, módulo `10-sistemas-automaticos`.

## 0. Antes de empezar
- `npm run git:sync-main`; rama de trabajo la que indique la tarea. No crear PR salvo que se pida.
- Leer `docs/lessons-slides.md` y `node_modules/next/dist/docs/` si se toca Next. Solo escritorio: nada de móvil.
- Si falta `node_modules`: `npm ci --ignore-scripts`.

## 1. Leer el PDF y planificar
- Leer **todas** las páginas (≤20 por lectura). Anotar secciones, definiciones, fórmulas, ejemplos resueltos, autoevaluación y ejercicios.
- Una lección por sección o grupo de secciones (10–15 lecciones, cada una con ≥5 pasos). Orden del libro.
- Por unidad, elegir ~6–8 **animaciones** (procesos, curvas, esquemas que se construyen paso a paso) y ~5–9 **herramientas** (manipulables con sliders donde cambiar valores muestre la idea). Solo donde aporten.
- No copiar errores del libro (cifras que no cuadran, figuras ilegibles): usar el valor correcto y avisar al usuario en la respuesta final. Omitir ejercicios cuyo enunciado depende de una figura no legible.

## 2. Copiar el PDF
`temp/tecnologia/2-bachillerato-industrial-II/Unidad N - <Título>.pdf` y añadir fila en `temp/tecnologia/README.md` (y actualizar «(N temas, M lecciones)»).

## 3. Código (patrón por unidad)
| Qué | Dónde |
|---|---|
| Subtítulo | `src/data/lessons/shared.ts` → `TEMA_TI2_N_SUBTITLE` |
| Lecciones | `src/data/lessons/tecnologia-industrial-2-bachillerato/NN-slug-del-tema/MM-<interactiveSlug>.ts`, exporta `<camelCase del slug>Lesson` (el nombre de fichero **debe** terminar en el slug) |
| Animaciones | `src/components/lesson/anim/scenes/industrial/<tema>.tsx` (`AnimBuild`, paleta `MANIM`, reutiliza `Arrow`/`Box` de `termicos.tsx` y `Axes`/`DrawPath` de `common.tsx`). Registro: `registry.tsx` (import tras `// industrial-imports`, entradas antes de `/* industrial-end */`) y unión `SlideAnimId` en `src/lib/lesson/types.ts` (antes de `/* industrial-anim-end */`) |
| Herramientas | `src/components/lesson/slide/tools/<Tema>Tools.tsx` (`Frame`, `Slider`, `Readout`, `Stat` con `plain`, `num()` para acotar `params`, `fmtEs`). Registro: import tras `// industrial-imports` y `case` antes de `/* industrial-tools */` en `SlideTool.tsx`; unión `SlideToolId` antes de `/* industrial-tool-end */` |
| Currículo | `src/content/curriculum.ts`: módulo nuevo tras el último del curso (`moduleId(N)`, `lessonId(N·100+k)`, `orderIndex` correlativo, `kind: "interactive"`); actualizar `description` del curso |
| Índice y seed | `npx tsx scripts/generate-lessons-index.ts` y `npm run seed:generate` |

Tipos de paso: `slide` (bloques `text`, `definition`, `rule`, `example` (`lines:{math}`), `warning`, `compare`, `steps` (`items: string[]`), `formula`, `relations`, `facts` (`tex`), `visual` anim/tool), `predict` (`choice` con `incorrectFeedback`+`shuffleChoices`, o `numeric` con `correctAnswers`), `classify`. En `Note`/`hint` de herramientas **no** uses LaTeX (texto plano); en lecciones y captions sí (`$…$`).

## 4. Estilo didáctico
Tono para adolescentes, nunca infantil. Cada lección: idea → regla/fórmula → animación o herramienta → 2–4 comprobaciones (mezcla de elección, numérica y clasificar). Ejemplos numéricos del libro como ejercicios con `explanation` que muestre el cálculo. Cada animación: 3–5 beats con caption que explique qué cambia.

## 5. Tests y docs
- Actualizar `src/tests/unit/data/tecnologia-industrial-lessons.test.tsx` (lista de módulos y nº de lecciones).
- Test nuevo de herramientas `src/tests/unit/lesson/slide-tool-<tema>.test.tsx`: montaje con params extremos/nulos/ausentes + 1 comprobación numérica por herramienta (ojo con el formato `fmtEs`: coma decimal, sin ceros finales).
- Añadir una fila por animación y por herramienta en `docs/lessons-slides.md` (tablas de animaciones y de herramientas; los `params` que lee cada herramienta).

## 6. Verificación (obligatoria antes de commit)
```
npx tsc --noEmit -p .            # ignora ruido de e2e/playwright
npx eslint <ficheros nuevos>     # el lint global tiene errores previos ajenos
npx vitest run
CONTENT_PREVIEW_MODE=true NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321 \
 NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=local-preview-publishable-key \
 SUPABASE_SECRET_KEY=local-preview-secret-key \
 CREDENTIALS_ENCRYPTION_KEY=AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA= npm run build
```
Revisión visual: `npm run dev -- --hostname 127.0.0.1 --port 3000`, abrir `/aprender/curso/tecnologia-industrial-2-bachillerato/tema/<slug-tema>/leccion/<slug>` con Playwright (Chromium en `/opt/pw-browsers`), capturar cada beat de cada animación y cada herramienta, y corregir textos solapados o cortados, flechas mal orientadas y etiquetas que cruzan ejes.

Errores típicos: `<` literal en JSX (usa `&lt;`), `'` sin escapar (`&apos;`), variables sin usar, esperar en tests números sin el formato español.

## 7. Cierre
Commit con mensaje descriptivo y push a la rama indicada. En la respuesta final: qué se ha creado (lecciones, animaciones, herramientas), qué se ha omitido y las discrepancias del libro detectadas.

Antes del commit, pasa también `npx tsx scripts/review-tema.ts <curso> <tema>` (coherencia de registros, docs, seed y tests). La revisión posterior de otro agente sigue `docs/revision-tema.md`.
