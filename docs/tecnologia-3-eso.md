# Tecnología 3.º ESO (Tecnología y Digitalización) — plan

Curso `tecnologia-3-eso`. Fuente: `temp/tecnologia/LOMLOE.txt`, sección «3.º de ESO — Tecnología y Digitalización» (8 temas). Continúa `tecnologia-2-eso` (mismas convenciones: slugs `-3eso`, ids de herramientas y animaciones con prefijo `eso3-`, `moduleId(160 + n)`, subtítulos en `TECESO3_SUBTITLES`) y es la materia que Asturias imparte en 3.º (Decreto 59/2022). **Cada tema parte de lo visto en 1.º y 2.º ESO y añade lo que allí se dejó fuera: electrónica, control, robótica, redes e IoT.**

| Tema | Lecciones | Qué añade respecto a 2.º ESO |
|---|---|---|
| 1. Desarrollo de proyectos tecnológicos | 5 | Especificaciones técnicas, simulación digital de soluciones, gestión de recursos, documentación y difusión |
| 2. Materiales y procesos de fabricación | 7 | Conformado (moldeo, doblado, forja), mecanizado (torno, fresa), uniones, compuestos, impacto ambiental de los materiales |
| 3. Mecanismos y máquinas | 7 | Piñón y cadena, tornillo sin fin y corona, trenes de varias etapas, par, potencia y rendimiento mecánico |
| 4. Electricidad y electrónica | 9 | Resistencias (código de colores), diodos y LED, transistor como interruptor, sensores y actuadores, electrónica analógica, simulación de circuitos |
| 5. Sistemas de control y automatización | 7 | Lazo abierto y cerrado, señales analógicas y digitales, puertas lógicas, automatismos domésticos e industriales |
| 6. Programación y robótica | 8 | Programar una placa (entradas y salidas), leer sensores, controlar motores y servos, comportamiento de un robot |
| 7. Redes y dispositivos digitales | 7 | Redes (router, IP, Wi-Fi), configuración básica, internet de las cosas, seguridad y uso crítico |
| 8. Tecnología sostenible | 7 | Energías renovables, arquitectura bioclimática, transporte sostenible, proyectos de mejora del entorno (también asturiano) |

Total previsto: 57 lecciones. Orden de construcción propuesto: 4 → 5 → 6 → 7 → 3 → 2 → 1 → 8 (primero lo nuevo, donde más ganan las herramientas interactivas). Mismo flujo por tema que en 2.º ESO: lecciones, herramientas, animaciones, tests, revisión visual, build y commit.

## Estado

| Tema | Estado |
|---|---|
| 3. Mecanismos y máquinas | Hecho (7 lecciones, `03-mecanismos-maquinas/`; herramientas `TecEso3MecanismosTools.tsx`, animación `teceso3-mecanismos.tsx`) |
| 4. Electricidad y electrónica | Hecho (9 lecciones, `04-electricidad-electronica/`; herramientas `TecEso3ElectronicaTools.tsx`, animaciones `teceso3-electronica.tsx`) |
| 5. Sistemas de control y automatización | Hecho (7 lecciones, `05-control-automatizacion/`; herramientas `TecEso3ControlTools.tsx`, animación `teceso3-control.tsx`) |
| 6. Programación y robótica | Hecho (8 lecciones, `06-programacion-robotica/`; herramientas `TecEso3RoboticaTools.tsx`, animaciones `teceso3-robotica.tsx`) |
| 7. Redes y dispositivos digitales | Hecho (7 lecciones, `07-redes-dispositivos-digitales/`; herramientas `TecEso3RedesTools.tsx`, animación `teceso3-redes.tsx`) |

Test del curso: `src/tests/unit/data/tecnologia-3-eso-lessons.test.tsx` (añadir cada tema a `TEMAS`, en el orden del currículo).
