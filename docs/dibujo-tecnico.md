# Dibujo Técnico I y II (Bachillerato) — plan

Fuente: Real Decreto 243/2022 (`temp/BOE-A-2022-5521_copia.pdf`, materias «Dibujo Técnico I» y «Dibujo Técnico II», con criterios de evaluación y saberes básicos A–D). Asturias lo desarrolla en el Decreto 60/2022 (solo documentación de mapeo; no está subido). Cursos propuestos: `dibujo-tecnico-1-bachillerato` y `dibujo-tecnico-2-bachillerato`, ids `-dt1` / `-dt2`, herramientas `dt1-…` / `dt2-…`, animaciones `dt1-…` / `dt2-…`.

Ya existe material relacionado (instrumentos y trazados, escalas, acotación en Tecnología) pero no cubre el temario de estas materias; no se reutilizan lecciones.

## Dibujo Técnico I (saberes A–D)

| Tema | Saber | Lecciones (previstas) |
|---|---|---|
| 1. Historia y fundamentos geométricos | A | 4: historia del dibujo técnico y campos de acción, Thales, Pitágoras, Euclides, Hipatia; lugar geométrico y arco capaz |
| 2. Proporcionalidad, equivalencia y semejanza | A | 4: Thales, cuarta/tercera/media proporcional, sección áurea, equivalencia, semejanza |
| 3. Triángulos, cuadriláteros y polígonos regulares | A | 6: puntos notables, construcción de triángulos y cuadriláteros, polígonos regulares (método general y por lado) |
| 4. Tangencias y curvas técnicas | A | 5: tangencias básicas, enlaces, óvalo, ovoide, espiral, volutas |
| 5. Sistema diédrico: punto, recta y plano | B | 6: proyecciones, punto, recta, plano, trazas, pertenencia |
| 6. Diédrico: relaciones y distancias | B | 4: intersecciones, paralelismo, perpendicularidad, distancias |
| 7. Sistemas axonométricos | B | 5: ortogonal (iso, dimétrica, trimétrica), coeficientes de reducción, caballera, punto/recta/plano |
| 8. Planos acotados y sistema cónico | B | 6: recta y plano acotados, cubiertas, curvas de nivel; cónico frontal y oblicuo |
| 9. Normalización y documentación gráfica | C | 6: escalas, formatos y doblado, normas UNE/ISO, vistas, líneas, acotación, simbología |
| 10. Sistemas CAD | D | 4: vectorial 2D, modelado 3D, primitivas y operaciones, trabajo en grupo |

Total previsto: 49 lecciones.

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

Total previsto: unas 41 lecciones.

## Enfoque

- Herramientas interactivas de **trazado**: el alumno mueve puntos/ deslizadores y ve la construcción (mediatriz, arco capaz, polígonos, tangencias, óvalo, trazas, abatimientos, cónicas…), con funciones puras de geometría comprobadas en tests.
- Animaciones paso a paso de las construcciones clave (estilo Manim).
- Mismo flujo por tema que en Tecnología: lecciones, herramientas, animaciones, tests, revisión visual, build, commit; `moduleId` propios y subtítulos en `shared.ts`.
- Orden: DT I completo (temas 1 → 10) y después DT II.

## Infraestructura

- Materia nueva **Dibujo Técnico** (`SubjectKey` `dibujo`; slug de curso `dibujo-…`): `src/lib/navigation/subjects.ts`, icono en `subject-icons.ts`, bloques `dibujo-*` en `src/content/blocks.ts` (los bloques se añaden cuando hay lecciones que los usan; el test de bloques prohíbe bloques vacíos).
- Cursos: `dibujo-tecnico-1-bachillerato` (`courseId(22)`, `moduleId(200 + n)`) y `dibujo-tecnico-2-bachillerato` (`courseId(23)`, `moduleId(210 + n)`); subtítulos en `DT1_SUBTITLES` de `src/data/lessons/shared.ts`.

## Estado

| Tema | Estado |
|---|---|
| Plan | Aprobado por el usuario |
| DT I · 1. Historia y fundamentos geométricos | Hecho (4 lecciones, `src/data/lessons/dibujo-tecnico-1-bachillerato/01-historia-fundamentos-geometricos/`; herramientas `DtGeometriaTools.tsx`, animaciones `dt1-geometria.tsx`) |
| DT I · 2. Proporcionalidad, equivalencia y semejanza | Hecho (4 lecciones, `02-proporcionalidad-equivalencia-semejanza/`; herramientas en `DtGeometriaTools.tsx`, animación `buildSeccionAurea` en `dt1-geometria.tsx`) |
| DT I · 3. Triángulos, cuadriláteros y polígonos regulares | Hecho (6 lecciones, `03-triangulos-cuadrilateros-poligonos/`; herramientas `DtPoligonosTools.tsx`, animación `dt1-poligonos.tsx`) |
| DT I · 4. Tangencias y curvas técnicas | Hecho (5 lecciones, `04-tangencias-curvas-tecnicas/`; herramientas `DtTangenciasTools.tsx`, animaciones `dt1-tangencias.tsx`) |
| DT I · 5. Sistema diédrico: punto, recta y plano | Hecho (6 lecciones, `05-sistema-diedrico-punto-recta-plano/`; herramientas `DtDiedricoTools.tsx`, animación `dt1-diedrico.tsx`; bloque `dibujo-sistemas-representacion`) |
| DT I · 6. Sistema diédrico: relaciones y distancias | Hecho (4 lecciones, `06-sistema-diedrico-relaciones-distancias/`; herramientas `DtDiedrico2Tools.tsx`) |
| DT I · 7. Sistemas axonométricos | Hecho (5 lecciones, `07-sistemas-axonometricos/`; herramientas `DtAxonometricoTools.tsx`, animación `dt1-axonometria.tsx`) |
| DT I · 8. Planos acotados y sistema cónico | Hecho (6 lecciones, `08-planos-acotados-conico/`; herramientas `DtAcotadosTools.tsx` y `DtConicoTools.tsx`, animación `dt1-conico.tsx`) |
