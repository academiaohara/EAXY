# Tecnología 4.º ESO — plan

Curso `tecnologia-4-eso` (ya declarado, vacío, en `src/content/curriculum.ts`). Fuente: `temp/tecnologia/LOMLOE.txt`, sección «4.º de ESO — Tecnología» (8 temas). Continúa `tecnologia-3-eso` con las mismas convenciones: slugs `-4eso`, ids de herramientas y animaciones con prefijo `eso4-`, `moduleId(170 + n)`, subtítulos en `TECESO4_SUBTITLES`, carpeta `src/data/lessons/tecnologia-4-eso/<NN-tema>/`. Es un curso **aplicado**: retoma lo visto en 1.º–3.º y añade cálculo, rigor técnico y proyectos más completos. Asturias imparte «Tecnología» en 4.º (Decreto 59/2022); se usa solo como documentación de mapeo.

| Tema | Lecciones | Qué añade respecto a 3.º ESO |
|---|---|---|
| 1. Proyectos de ingeniería | 6 | Análisis de necesidades y especificaciones, croquis, planos y modelado, planificación, ensayos, documentación y mejora iterativa |
| 1. Proyectos de ingeniería | Hecho (6 lecciones, `01-proyectos-ingenieria/`; herramientas `TecEso4ProyectosTools.tsx`, animación `teceso4-proyectos.tsx`) |
| 2. Materiales y fabricación | 7 | Propiedades mecánicas y ensayos, selección de materiales, control de calidad, procesos y tolerancias, ciclo de vida |
| 2. Materiales y fabricación | Hecho (7 lecciones, `02-materiales-fabricacion/`; herramientas `TecEso4MaterialesTools.tsx`, animación `teceso4-materiales.tsx`) |
| 3. Sistemas mecánicos | 7 | Relación de transmisión, velocidad angular y par, potencia y rendimiento, levas y bielas, simulación de mecanismos |
| 3. Sistemas mecánicos | Hecho (7 lecciones, `03-sistemas-mecanicos/`; herramientas `TecEso4MecanicaTools.tsx`, animación `teceso4-mecanica.tsx`) |
| 4. Electricidad y electrónica | 9 | Corriente alterna, leyes de Kirchhoff, potencia y energía, transistor, circuitos integrados (555), electrónica digital, simulación |
| 5. Pensamiento computacional | 8 | Descomposición, algoritmos y diagramas de flujo, variables y listas, condiciones y bucles, funciones, depuración, tratamiento de datos |
| 6. Automatización y robótica | 8 | Arquitectura de control, lazo cerrado y regulación, placas programables, control de motores, comunicación e IoT, robot simulado |
| 7. Tecnología sostenible | 7 | Eficiencia, consumo, economía circular, reparación, impacto social, accesibilidad, voluntariado tecnológico |
| 8. Taller, simulación y fabricación digital | 6 | Instrumentos de medida, seguridad y documentación, prototipado rápido, impresión 3D, montaje y pruebas |

Total previsto: 58 lecciones. Orden de construcción: 4 → 5 → 6 → 3 → 2 → 1 → 7 → 8 (primero lo nuevo, donde más ganan las herramientas interactivas). Mismo flujo por tema que en 3.º ESO: lecciones, herramientas, animaciones, tests, revisión visual, build y commit.

## Estado

| Tema | Estado |
|---|---|
| 4. Electricidad y electrónica | Hecho (9 lecciones, `04-electricidad-electronica/`; herramientas `TecEso4ElectronicaTools.tsx`, animación `teceso4-electronica.tsx`) |
| 5. Pensamiento computacional | Hecho (8 lecciones, `05-pensamiento-computacional/`; herramientas `TecEso4ComputacionalTools.tsx` y 8 programas nuevos en `python-traza-explorador`, animación `teceso4-computacional.tsx`) |
| 6. Automatización y robótica | Hecho (8 lecciones, `06-automatizacion-robotica/`; herramientas `TecEso4ControlTools.tsx`, animación `teceso4-control.tsx`) |
| 7. Tecnología sostenible | Hecho (7 lecciones, `07-tecnologia-sostenible/`; herramientas `TecEso4SostenibleTools.tsx`, animación `teceso4-sostenible.tsx`) |

Test del curso: `src/tests/unit/data/tecnologia-4-eso-lessons.test.tsx` (añadir cada tema a `TEMAS`, en el orden del currículo).
