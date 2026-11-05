# Tema 10 Curvas Cónicas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Align the web lesson for Dibujo Técnico I, Tema 10, with the reference PDF and make its canvas constructions geometrically explicit and verifiable.

**Architecture:** Keep the existing lesson model. Improve theory in the Tema 10 lesson data and geometry diagrams, and improve construction behavior/copy in the centralized conics construction registry. Extend focused unit tests for the invariants and lesson coverage.

**Tech Stack:** TypeScript, React, Vitest, existing lesson/bench construction components.

**Spec:** `docs/superpowers/specs/2026-11-05-tema-10-curvas-conicas-design.md`

## Global Constraints

- Mantener la arquitectura actual de lecciones, diagramas y herramientas.
- Mantener las explicaciones en español claro, con notación consistente.
- No modificar el currículo de Dibujo Técnico II ni construcciones de otros temas.
- La validación final incluirá typecheck/tests y comprobación visual de las diapositivas modificadas.

## Review Focus

- Datos degenerados o incompletos: la teoría no debe presentar una construcción imposible como válida; cubrir con una prueba de contenido.
- Invariantes métricas: los puntos generados deben cumplir suma/diferencia constante o equidistancia; cubrir con `conicas-datos.test.ts`.
- Herramientas auxiliares: focos, directriz, circunferencia principal y asíntotas deben aparecer en la capa correcta; cubrir con tests de capas/elementos.
- Copia matemática: los símbolos (a,b,c), ejes y radios deben ser consistentes entre teoría y práctica; cubrir con tests de lección.
- Regresión de navegación: las tres lecciones deben seguir registradas y tener pasos de teoría, animación y práctica.

### Task 1: Mejorar la teoría de las cónicas y sus elementos

**Files:**
- Modify: `src/components/lesson/anim/diagramas/geometria.ts` (diagramas `d10-conicas`, `d10-elipse`, `d10-hiperbola`, `d10-parabola`)
- Modify: `src/data/lessons/dibujo-tecnico-1-bachillerato/10-curvas-conicas-dt1/*.ts` si hace falta ajustar títulos/subtítulos
- Test: `src/tests/unit/data/dibujo-tecnico-1-lessons.test.tsx`

**Interfaces:**
- Consumes: existing `diagrama()` lesson step and geometry diagram schema.
- Produces: concise theory that states definitions, elements, key relations, section types and degeneracy without changing public lesson IDs.

- [ ] Add failing assertions for the missing PDF concepts and the three lesson headings.
- [ ] Run the focused test and confirm the assertions fail against current copy.
- [ ] Update the four existing diagram definitions, preserving IDs and visual structure while adding the missing concepts in readable chunks.
- [ ] Run the focused test and confirm it passes.

### Task 2: Correct and clarify the conic construction animations

**Files:**
- Modify: `src/components/lesson/bench/construcciones-conicas.ts`
- Modify: `src/components/lesson/bench/construcciones-notas.ts` if the construction explanations need matching notes
- Test: `src/tests/unit/conicas-datos.test.ts`

**Interfaces:**
- Consumes: existing `Construccion` registry, construction tool primitives and conic invariant helpers.
- Produces: the existing IDs `elipse-puntos`, `elipse-haces`, `elipse-envolventes`, `elipse-circunferencias`, `hiperbola-puntos`, `hiperbola-envolventes`, `parabola-puntos`, `parabola-vertice-punto`, and `parabola-envolventes` with correct layers, labels, order and explanatory notes.

- [ ] Add focused assertions for construction layer contents, key labels and geometric invariant metadata where absent.
- [ ] Run `npx vitest run src/tests/unit/conicas-datos.test.ts` and confirm any new assertions fail.
- [ ] Adjust the construction steps so each procedure exposes its given data, auxiliary geometry, result and verification; preserve tool IDs and public construction IDs.
- [ ] Run the conic data tests and confirm they pass.

### Task 3: Validate lesson integration and user-visible rendering

**Files:**
- Modify: only regression fixes discovered in Tasks 1–2.
- Test: `src/tests/unit/data/dibujo-tecnico-1-lessons.test.tsx`, `src/tests/unit/conicas-datos.test.ts`, relevant lesson/slide tests.

**Interfaces:**
- Consumes: completed theory diagrams and construction registry.
- Produces: a verified Tema 10 with unchanged navigation and usable practice steps.

- [ ] Run the complete focused unit-test set for Dibujo Técnico I and conics.
- [ ] Run the project typecheck/build command defined in `package.json`.
- [ ] Start the preview and inspect the three Tema 10 lessons, checking that construction stages visibly match their written steps.
- [ ] Fix only regressions found by those checks, rerun all verification, and record the evidence before preparing the PR.

