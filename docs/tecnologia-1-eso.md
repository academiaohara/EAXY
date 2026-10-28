# Tecnología 1.º ESO (Introducción a la Tecnología)

Curso `tecnologia-1-eso`: 10 temas y 69 lecciones, basadas en la propuesta de distribución de `temp/tecnologia/LOMLOE.txt` («1.º de ESO — Introducción a la Tecnología»). Esa organización es una propuesta didáctica, no una lista oficial obligatoria: contrastar con el decreto autonómico y la programación del centro.

| Tema | Carpeta (`src/data/lessons/tecnologia-1-eso/`) | Lecciones | Bloque de contenido |
|---|---|---|---|
| 1. La tecnología y el proceso tecnológico | `01-tecnologia-proceso-tecnologico` | 7 | Proyectos tecnológicos |
| 2. Expresión y comunicación gráfica | `02-expresion-comunicacion-grafica` | 7 | Expresión gráfica |
| 3. Materiales de uso técnico | `03-materiales-uso-tecnico` | 9 | Materiales |
| 4. Estructuras | `04-estructuras` | 7 | Estructuras |
| 5. Mecanismos básicos | `05-mecanismos-basicos` | 7 | Máquinas y motores |
| 6. Iniciación a la electricidad | `06-iniciacion-electricidad` | 7 | Circuitos eléctricos y electrónicos |
| 7. Pensamiento computacional | `07-pensamiento-computacional` | 7 | Informática y programación |
| 8. Tecnología sostenible | `08-tecnologia-sostenible` | 7 | Tecnología sostenible |
| 9. Digitalización del entorno personal de aprendizaje | `09-digitalizacion-entorno-personal` | 7 | Competencia digital |
| 10. Comunicación y difusión de ideas | `10-comunicacion-difusion-ideas` | 5 | Expresión gráfica |

## Dónde está cada cosa

- **Lecciones**: un fichero por lección (`NN-<slug>.ts`) que exporta `<camelCase del slug>Lesson`. Usan los ayudantes de `src/data/lessons/tec1-helpers.ts` (`slide`, `pick`, `calc`, `sort`, `tool`, `anim`). Subtítulos: `TECESO1_SUBTITLES` en `src/data/lessons/shared.ts`.
- **Herramientas** (`src/components/lesson/slide/tools/TecEso1<Tema>Tools.tsx`): Proceso, Gráfica, Materiales, Estructuras, Mecanismos, Electricidad, Computacional, Sostenible, Digital y Comunicación. Registro en `SlideTool.tsx` y tipos en `SlideToolId`; filas en `docs/lessons-slides.md`.
- **Animaciones** (`src/components/lesson/anim/scenes/industrial/teceso1-<tema>.tsx`): registro en `registry.tsx` y `SlideAnimId`. Se reutilizan algunas del curso de Tecnología e Ingeniería I (`polimero-cadenas`, `palanca-generos`, `engranajes-giro`, `correa-abierta-cruzada`, `transmision-flujo`, `economia-lineal-circular`).
- **Tests**: `src/tests/unit/data/tecnologia-1-eso-lessons.test.tsx` (estructura de las lecciones, animaciones y herramientas montadas) y `src/tests/unit/lesson/slide-tool-teceso1-*.test.tsx` (una comprobación numérica por herramienta).

## Añadir una lección o un tema

1. Añádelo con `moduleId(133…)` / `lessonId(133NN…)` en el curso `tecnologia-1-eso` de `src/content/curriculum.ts` y, si es un tema nuevo, su entrada en `src/content/blocks.ts` (`"tecnologia-1-eso/<tema>": "<bloque>"`).
2. Crea el fichero de la lección con prefijo numérico y slug **único en todo el currículo** (si coincide con el de otro curso, añade `-eso`).
3. `npx tsx scripts/generate-lessons-index.ts` y `npm run seed:generate`.
4. Registra herramientas y animaciones nuevas (import, `case`/entrada y unión de tipos) y documéntalas en `docs/lessons-slides.md`.
5. `npx tsx scripts/review-tema.ts tecnologia-1-eso <tema>`, `npx vitest run` y `npm run build`.

## Notas de contenido

- Tono para 12–13 años, sin infantilismos. Las herramientas son manipulables: el alumno cambia valores y ve el resultado al instante.
- Los datos de huella, consumo, tiempos de descomposición y ahorros son **orientativos** y así se indica en cada herramienta.
- La rampa accesible usa las pendientes del CTE DB SUA (10 % hasta 3 m, 8 % hasta 6 m, 6 % si es más larga).
- El robot de bloques (`programa-bloques-explorador`) es un pequeño intérprete propio (secuencias, `repetir` y `si hay pared`) con cuatro retos y un límite de pasos para detectar bucles que no terminan.

## Contraste con el currículo de Asturias (Decreto 59/2022)

Fuente: `temp/tecnologia/2022-06713_copia.pdf`. En Asturias **no hay Tecnología en 1.º ESO** como materia obligatoria: *Tecnología y Digitalización* se imparte en 2.º (3 h) y 3.º (2 h) y en 1.º solo existe la optativa *Digitalización Aplicada*. Este curso corresponde, por contenidos, sobre todo a *Tecnología y Digitalización* de 2.º ESO.

| Bloque asturiano | Cobertura |
|---|---|
| A. Proceso de resolución de problemas (proyectos, herramientas, seguridad, materiales, estructuras, mecanismos, electricidad) | Temas 1, 3, 4, 5 y 6 |
| B. Comunicación y difusión de ideas (acotación, escalas, CAD 2D/3D, herramientas digitales, netiqueta) | Temas 2 y 10 |
| C. Pensamiento computacional, programación y robótica (algoritmos, apps, intro a la IA) | Tema 7 y lecciones 4–5 del tema 10 |
| D. Digitalización del entorno personal de aprendizaje (dispositivos, copias, seguridad, licencias) | Tema 9 |
| E. Tecnología sostenible (impacto, ODS, entorno asturiano) | Tema 8 (lección 7 incluida) |

No incluidos por ser de 3.º ESO: robótica con placas, internet de las cosas y fabricación digital avanzada.
