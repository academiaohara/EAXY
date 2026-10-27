# Tecnología e Ingeniería II (2.º Bachillerato) — plan

**Borrador pendiente de confirmar con el usuario** (puede que no haga falta un curso nuevo). Curso propuesto `tecnologia-ingenieria-2-bachillerato`. Fuente: `temp/tecnologia/LOMLOE.txt`, sección «2.º de Bachillerato — Tecnología e Ingeniería II» (8 temas); Asturias lo regula en el Decreto 60/2022 (solo como documentación de mapeo). Continúa `tecnologia-ingenieria-1-bachillerato` (69 lecciones, ya completo: cubre los 7 temas de la LOMLOE de 1.º).

## Qué hay ya y qué falta

`tecnologia-industrial-2-bachillerato` (13 temas, 136 lecciones) está construido a partir de los capítulos de un libro de texto de McGraw-Hill (`temp/tecnologia/2-bachillerato-industrial-II/`), que el usuario indica que es de la LOMLOE (no se ha podido comprobar la edición: los PDF son escaneados). Es un curso **profundo** y se solapa mucho con los temas de TI II de la LOMLOE (el esquema de `LOMLOE.txt` es orientativo y no coincide tema a tema con ese libro):

| Tema LOMLOE (TI II) | Ya cubierto por Tecnología Industrial II | Falta |
|---|---|---|
| 1. Proyectos de I+D | — | todo (metodologías ágiles, I+D, informes de impacto, emprendimiento) |
| 2. Materiales | temas 1–4 (estructura, ensayos, aleaciones, no férreos, tratamientos, corrosión) | resumen alineado con la LOMLOE: selección, control de calidad, sostenibilidad |
| 3. Estructuras | — | todo (cargas, equilibrio, reacciones, esfuerzos, flexión, torsión, estabilidad) |
| 4. Sistemas mecánicos | temas 5–9 (máquinas, motores térmicos, frigoríficos, neumática, oleohidráulica) | cinemática con aceleración, bomba de calor, simulación y montaje |
| 5. Eléctricos y electrónicos | temas 7, 12 y 13 (motores, combinacionales, Karnaugh, secuenciales) | corriente alterna: impedancia, potencias activa/reactiva/aparente, factor de potencia |
| 6. Sistemas informáticos emergentes | — | todo (bases de datos, big data, IA, sistemas distribuidos, ciberseguridad, ética) |
| 7. Control automático | temas 10–11 (Laplace, función de transferencia, bloques, Routh, PID, sensores) | respuesta temporal, simulación, aplicaciones |
| 8. Tecnología sostenible | — (parcial en reciclaje) | evaluación de impacto, alternativas tecnológicas, optimización de procesos |

## Decisión de diseño (recomendada)

- **No se reutilizan lecciones de Industrial II**: el índice de lecciones se indexa por `interactiveSlug` y cada lección vive en su carpeta de curso, de modo que reutilizarlas obligaría a duplicar ficheros. Tampoco se copian.
- **Tecnología e Ingeniería II se escribe como curso propio, completo y más conciso**, con ids `-ti2` y prefijo `ti2-` en herramientas y animaciones. En los temas ya cubiertos a fondo por Industrial II (2, 4, 7 y la parte digital del 5) se hacen lecciones de **núcleo** (menos lecciones, enfocadas en lo que pide la LOMLOE) y se **remite a Industrial II** para ampliar.
- **Se mantiene `tecnologia-industrial-2-bachillerato` sin cambios** como curso complementario de ampliación (su descripción ya lo identifica).

## Propuesta de temas y lecciones

| Tema | Lecciones | Contenido nuevo |
|---|---|---|
| 1. Proyectos de I+D | 7 | I+D e innovación, metodologías ágiles (Scrum/Kanban), modelado y simulación, prototipos, informe de impacto ambiental, emprendimiento y difusión |
| 2. Materiales | 6 | estructura y propiedades, ensayos (tracción, dureza, resiliencia), tratamientos, selección con criterios, control de calidad, sostenibilidad |
| 3. Estructuras | 8 | tipos y elementos, cargas, equilibrio estático, reacciones en apoyos, esfuerzos (tracción, compresión, cortadura), flexión, torsión, estabilidad y simulación |
| 4. Sistemas mecánicos y fluídicos | 9 | cinemática (velocidad y aceleración), engranajes y trenes, rendimiento, motores térmicos, máquinas frigoríficas y bomba de calor, neumática, hidráulica, esquemas y simulación |
| 5. Sistemas eléctricos y electrónicos | 9 | corriente alterna y valores eficaces, impedancia (R, L, C), potencias, factor de potencia, álgebra de Boole, Karnaugh, circuitos integrados, biestables y memorias, simulación |
| 6. Sistemas informáticos emergentes | 8 | arquitectura y sistemas distribuidos, bases de datos, big data, inteligencia artificial, limitaciones y sesgos, ciberseguridad, protección de datos, ética |
| 7. Sistemas automáticos y control | 6 | diagramas de bloques, álgebra de bloques, respuesta y estabilidad, controladores PID, controladores programables, aplicaciones |
| 8. Tecnología sostenible | 6 | impacto social y ambiental, evaluación de impacto, eficiencia energética, sostenibilidad de materiales, optimización de procesos, economía circular y alternativas |

Total previsto: 59 lecciones. Orden de construcción: 3 → 6 → 5 → 1 → 4 → 7 → 2 → 8 (primero lo que Industrial II no cubre). Mismo flujo por tema que en 4.º ESO: lecciones, herramientas, animaciones, tests, revisión visual, build y commit; `moduleId(180 + n)` y subtítulos en `TECTI2_SUBTITLES`.

## Estado

**Decisión final del usuario («Añade los que faltan»): no se hace el curso completo, sino un curso corto de ampliación `tecnologia-ingenieria-2-bachillerato` con solo los temas que Industrial II no cubre.** Temas: 1 Proyectos de I+D (5), 2 Estructuras (8), 3 Corriente alterna (5), 4 Sistemas informáticos emergentes (8), 5 Impacto y sostenibilidad en ingeniería (5): unas 31 lecciones, `moduleId(180 + n)`, subtítulos `TECTI2_SUBTITLES`, ids `-ti2` y `ti2-`. Orden de construcción: 2 → 4 → 3 → 1 → 5.

| Tema | Estado |
|---|---|
| 2. Estructuras | Hecho (8 lecciones, `02-estructuras/`; herramientas `TecTi2EstructurasTools.tsx`, animación `tecti2-estructuras.tsx`) |
