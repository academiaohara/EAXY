# Dibujo Técnico I y II (Bachillerato) — plan

Plan para el contenido anterior (91 lecciones en formato antiguo): [migración al formato nuevo](./dt-migracion-formato.md).

## Mesa de dibujo (instrumentos realistas)

Para trazados con instrumentos las diapositivas usan `visual: { kind: "bench" }` (SVG realista y manipulable) en lugar de animaciones tipo Manim. Ver «Mesa de dibujo» en [`lessons-slides.md`](./lessons-slides.md).

## Renovación didáctica en curso

El catálogo de 50 lecciones de DT I tiene cobertura de contenido, pero eso no acredita el nuevo estándar de experiencia. Ver [renovación práctica de DT I](./dt1-renovation.md): mapeo estatal LOMLOE frente al libro antiguo, reparto del curso y primera entrega del tema 1 con ocho talleres aplicados. Los temas 2–10 siguen pendientes de renovación. Las tablas históricas de «Hecho» de este documento describen la implementación inicial, no la aceptación con el estándar actual.

Fuente: Real Decreto 243/2022 (`temp/BOE-A-2022-5521_copia.pdf`, materias «Dibujo Técnico I» y «Dibujo Técnico II», con criterios de evaluación y saberes básicos A–D). Asturias lo desarrolla en el Decreto 60/2022 (solo documentación de mapeo; no está subido). Cursos propuestos: `dibujo-tecnico-1-bachillerato` y `dibujo-tecnico-2-bachillerato`, ids `-dt1` / `-dt2`, herramientas `dt1-…` / `dt2-…`, animaciones `dt1-…` / `dt2-…`.

Ya existe material relacionado (instrumentos y trazados, escalas, acotación en Tecnología) pero no cubre el temario de estas materias; no se reutilizan lecciones.

## Dibujo Técnico I (saberes A–D)

> La numeración vigente de los temas es la del libro (tabla de `dt-migracion-formato.md`). La tabla de abajo es el plan curricular original y puede no coincidir en el número.

| Tema | Saber | Lecciones (previstas) |
|---|---|---|
| 0. Instrumentos y trazados fundamentales (nuevo, en pantalla «Tema 1»; el resto se numera +1) | A | Hecho (4 lecciones, `01-instrumentos-trazados-fundamentales/`, mesa de dibujo): instrumentos y paralelas; perpendiculares y transportador; mediatriz y bisectriz con compás; trasladar un ángulo con compás |
| 1. Historia y fundamentos geométricos | A | 4: historia del dibujo técnico y campos de acción, Thales, Pitágoras, Euclides, Hipatia; lugar geométrico y arco capaz |
| 2. Proporcionalidad, equivalencia y semejanza (**renovado con la mesa de dibujo**) | A | 4: Thales, cuarta/tercera/media proporcional, sección áurea, equivalencia, semejanza |
| 3. Triángulos, cuadriláteros y polígonos regulares | A | 6: puntos notables, construcción de triángulos y cuadriláteros, polígonos regulares (método general y por lado) |
| 3b. Transformaciones geométricas (nuevo, en pantalla «Tema 5»; Tangencias y siguientes pasan a numerarse +1) | A | **Tema completo, 4 lecciones** en `05-transformaciones-geometricas/` (cada una con un único ejercicio guiado: un paso práctico por vértice y un paso final «Une los puntos»): traslación (compás por paralelogramo y papel cuadriculado), giro (transportador + compás y papel cuadriculado), simetría axial y central (compás y papel cuadriculado) y homotecia (compás y papel cuadriculado, razones positivas y negativas). La **igualdad** de figuras no tiene lección propia: cada una de las tres primeras termina comprobando que la figura obtenida es igual a la original, y la homotecia la contrasta con la semejanza |
| 4. Tangencias y curvas técnicas | A | 5: tangencias básicas, enlaces, óvalo, ovoide, espiral, volutas |
| 5. Sistema diédrico: punto, recta y plano | B | 6: proyecciones, punto, recta, plano, trazas, pertenencia |
| 6. Diédrico: relaciones y distancias | B | 4: intersecciones, paralelismo, perpendicularidad, distancias |
| 7. Sistemas axonométricos | B | 5: ortogonal (iso, dimétrica, trimétrica), coeficientes de reducción, caballera, punto/recta/plano |
| 8. Planos acotados y sistema cónico | B | 6: recta y plano acotados, cubiertas, curvas de nivel; cónico frontal y oblicuo |
| 9. Normalización y documentación gráfica | C | 6: escalas, formatos y doblado, normas UNE/ISO, vistas, líneas, acotación, simbología |
| 10. Sistemas CAD | D | 4: vectorial 2D y curvas, modelado 3D con primitivas y booleanas, piezas compuestas y trabajo en grupo |

Total: 50 lecciones (el curso `dibujo-tecnico-1-bachillerato` está completo).

## Dibujo Técnico II (saberes A–D)

| Tema | Saber | Lecciones (previstas) |
|---|---|---|
| 1. Geometría en la arquitectura e ingeniería | A | 3: desde la revolución industrial, técnicas digitales |
| 2. Transformaciones: homología y afinidad | A | 5 |
| 3. Potencia, eje radical y tangencias | A | 4 |
| 4. Curvas cónicas | A | 5: elipse, hipérbola, parábola, tangentes |
| 5. Diédrico avanzado | B | 6: abatimientos, giros, cambios de plano, verdaderas magnitudes |
| 6. Cuerpos en diédrico | B | 5: prismas, pirámides, secciones, cilindro, cono, poliedros regulares |
| 7. Axonométrico y cónico de sólidos; planos acotados | B | 5 |
| 8. Normalización y proyecto | C | 6: piezas industriales, cortes, secciones y roturas, planos de taller y de montaje, diseño y sostenibilidad |
| 9. CAD | D | 2 |

Total: 41 lecciones (el curso `dibujo-tecnico-2-bachillerato` está completo).

## Enfoque

- Herramientas interactivas de **trazado**: el alumno mueve puntos/ deslizadores y ve la construcción (mediatriz, arco capaz, polígonos, tangencias, óvalo, trazas, abatimientos, cónicas…), con funciones puras de geometría comprobadas en tests.
- Animaciones paso a paso de las construcciones clave (estilo Manim).
- Mismo flujo por tema que en Tecnología: lecciones, herramientas, animaciones, tests, revisión visual, build, commit; `moduleId` propios y subtítulos en `shared.ts`.
- Orden: DT I completo (temas 1 → 10) y después DT II.

## Infraestructura

- Materia nueva **Dibujo Técnico** (`SubjectKey` `dibujo`; slug de curso `dibujo-…`): `src/lib/navigation/subjects.ts`, icono en `subject-icons.ts`, bloques `dibujo-*` en `src/content/blocks.ts` (los bloques se añaden cuando hay lecciones que los usan; el test de bloques prohíbe bloques vacíos).
- Cursos: `dibujo-tecnico-1-bachillerato` (`courseId(22)`, `moduleId(200 + n)`) y `dibujo-tecnico-2-bachillerato` (`courseId(23)`, `moduleId(210 + n)`); subtítulos en `DT1_SUBTITLES` de `src/data/lessons/shared.ts`.

## Fuente en el libro

La correspondencia de cada tema de la web con los temas y páginas del libro de Editorial Donostiarra está en [`dt-migracion-formato.md`](./dt-migracion-formato.md#fuente-en-el-libro-de-cada-tema). Se actualiza al migrar o añadir un tema.

## Estado

El estado de cada tema (con su número del libro) está en la tabla de [`dt-migracion-formato.md`](./dt-migracion-formato.md#fuente-en-el-libro-de-cada-tema). La web y el libro tienen los mismos temas con el mismo número.
