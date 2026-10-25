# Tecnología e Ingeniería I (1.º Bachillerato)

Curso `tecnologia-ingenieria-1-bachillerato`: 7 temas y 69 lecciones, basadas en la especificación didáctica de la asignatura (Asturias, LOMLOE). La organización es una propuesta didáctica: contrastar con el Decreto 60/2022 y la programación del centro.

| Tema | Carpeta (`src/data/lessons/tecnologia-ingenieria-1-bachillerato/`) | Lecciones |
|---|---|---|
| 1. Proyectos de investigación y desarrollo | `01-proyectos-investigacion-desarrollo` | 8 |
| 2. Materiales y fabricación | `02-materiales-fabricacion` | 12 |
| 3. Sistemas mecánicos | `03-sistemas-mecanicos` | 10 |
| 4. Sistemas eléctricos y electrónicos | `04-sistemas-electricos-electronicos` | 9 |
| 5. Sistemas informáticos y programación (Python) | `05-sistemas-informaticos-programacion` | 10 |
| 6. Sistemas automáticos | `06-sistemas-automaticos-control` | 10 |
| 7. Tecnología sostenible | `07-tecnologia-sostenible` | 10 |

## Dónde está cada cosa

- **Lecciones**: un fichero por lección (`NN-<slug>.ts`) que exporta `<camelCase del slug>Lesson`. Usan los ayudantes de `src/data/lessons/tec1-helpers.ts` (`slide`, `pick`, `calc`, `sort`, `tool`, `anim`), que añaden ayuda del tutor por defecto; escribe `help` propio cuando puedas.
- **Herramientas** (`src/components/lesson/slide/tools/Tec1*Tools.tsx`) y **animaciones** (`src/components/lesson/anim/scenes/industrial/tec1-*.tsx`): se registran como en `docs/pdf-a-tema.md` y se documentan en `docs/lessons-slides.md`.
- **Intérprete de Python**: `src/lib/lesson/mini-python.ts`, un subconjunto de Python (variables, operadores, f-strings, listas, `if`, `while`, `for`, `def`) con traza de líneas y variables y errores en español. No usa `eval`. Lo emplean `python-traza-explorador` y `tests-automaticos-explorador`.
- **Tests**: `src/tests/unit/data/tecnologia-ingenieria-1-lessons.test.tsx`, `src/tests/unit/lesson/slide-tool-tec1-*.test.tsx` y `mini-python.test.ts`.

## Añadir una lección o un tema

1. Añade la lección a `src/content/curriculum.ts` (módulos `moduleId(126…132)`, `kind: "interactive"`, `interactiveSlug`).
2. Crea el fichero de la lección con el prefijo numérico y el slug.
3. `npx tsx scripts/generate-lessons-index.ts` y `npm run seed:generate`.
4. Registra herramientas/animaciones nuevas, añade su fila a `docs/lessons-slides.md` y sus pruebas.
5. `npx tsx scripts/review-tema.ts tecnologia-ingenieria-1-bachillerato <tema>`, `npx vitest run` y `npm run build`.

## Notas de contenido

- Los datos numéricos de materiales, consumos, impactos y costes de las herramientas son **ilustrativos** (órdenes de magnitud) y así se indica en cada una; las simulaciones documentan sus simplificaciones.
- Las fórmulas son las estándar de Bachillerato (Ohm, Kirchhoff, relación de transmisión, flecha de una viga biapoyada, regla de mezclas, constante de tiempo RC…).
