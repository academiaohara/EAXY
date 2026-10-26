# Tecnología 2.º ESO (Tecnología y Digitalización) — plan

Curso `tecnologia-2-eso`. Fuente: `temp/tecnologia/LOMLOE.txt`, sección «2.º de ESO — Tecnología y Digitalización» (8 temas). Repite el esqueleto de 1.º ESO a mayor profundidad: **cada tema parte de lo ya visto en `tecnologia-1-eso` (sin repetirlo) y añade cálculo, normalización y proyecto.** Es la materia que Asturias imparte en 2.º (Decreto 59/2022).

| Tema | Lecciones | Qué añade respecto a 1.º ESO |
|---|---|---|
| 1. Proyecto tecnológico | 6 | Requisitos y especificaciones, matriz de decisión, diagrama de Gantt, tabla de pruebas, memoria y presentación, trabajo en equipo y seguridad en el taller |
| 2. Dibujo técnico y diseño digital | 7 | Vistas normalizadas, acotación y escalas normalizadas, perspectivas, interpretación de planos y simbología, CAD 2D, modelado 3D, documentación gráfica |
| 3. Materiales y fabricación | 9 | Propiedades y ensayos sencillos, madera, metales, plásticos y compuestos, elección ponderada, corte/unión/acabado y medición, impresión 3D (capas, relleno, tiempo), seguridad y reciclaje |
| 4. Estructuras y mecanismos | 8 | Esfuerzos y resistencia, triangulación, estabilidad, ley de la palanca y poleas, engranajes y fricción (relación de transmisión), poleas y correas, transformación del movimiento (leva, biela-manivela, cremallera, tornillo sin fin), cálculo en máquinas cotidianas |
| 5. Electricidad | 8 | Magnitudes, ley de Ohm, potencia y energía (factura en kWh), serie, paralelo y mixto, esquemas y simbología, polímetro, simulación y seguridad |
| 6. Programación | 8 | Algoritmos y diagramas, variables y tipos, operadores, condiciones, bucles, funciones, depuración, mini proyecto de juego |
| 7. Digitalización del entorno personal | 6 | Hardware y sistemas operativos, archivos, productividad (hoja de cálculo), búsqueda y creación de contenidos, nube, seguridad y bienestar digital |
| 8. Tecnología sostenible | 5 | Ciclo de vida, eficiencia energética (etiqueta), fabricación y reciclaje, diseño accesible, responsabilidad digital |

Total previsto: 57 lecciones. Se construye por temas en el orden 5 → 4 → 6 → 2 → 3 → 1 → 7 → 8 (primero los que más ganan con herramientas de cálculo e interactividad), con el mismo flujo que `docs/tecnologia-1-eso.md`: lecciones, herramientas, animaciones, tests, docs y commit por tema. Se reutilizan herramientas y animaciones de 1.º ESO cuando encajen y se crean nuevas para lo que sea nuevo (cálculo, Gantt, matriz de decisión, relación de transmisión, circuitos mixtos…).

## Estado

| Tema | Estado |
|---|---|
| 2. Dibujo técnico y diseño digital | Hecho (7 lecciones, `02-dibujo-tecnico-diseno-digital/`; herramientas `TecEso2DibujoTools.tsx`, animación `teceso2-dibujo.tsx`) |
| 3. Materiales y fabricación | Hecho (9 lecciones, `03-materiales-fabricacion/`; herramientas `TecEso2MaterialesTools.tsx`, animación `teceso2-materiales.tsx`) |
| 4. Estructuras y mecanismos | Hecho (8 lecciones, `04-estructuras-mecanismos/`; herramientas `TecEso2MecanicaTools.tsx`, animación `teceso2-mecanica.tsx`) |
| 5. Electricidad | Hecho (8 lecciones, `src/data/lessons/tecnologia-2-eso/05-electricidad/`; herramientas `TecEso2ElectricidadTools.tsx`, animaciones `teceso2-electricidad.tsx`; ids con prefijo `eso2-`) |
| 6. Programación | Hecho (8 lecciones, `06-programacion/`; herramientas `TecEso2ProgramacionTools.tsx`, animación `teceso2-programacion.tsx`) |

Convenciones: slugs de lección con sufijo `-2eso`; `moduleId(150 + n)` y `lessonId((150 + n) * 100 + k)`; subtítulos en `TECESO2_SUBTITLES` (`src/data/lessons/shared.ts`); test del curso en `src/tests/unit/data/tecnologia-2-eso-lessons.test.tsx` (añadir el tema a `TEMAS`).
