# Dibujo Técnico I Technical Drawing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sustituir las representaciones simplificadas de escala, vistas y acotación por una lámina técnica coherente y comprobable.

**Architecture:** Un módulo puro calcula proyecciones, transformaciones de escala y geometría de cotas. Componentes SVG pequeños dibujan esas primitivas y las tres herramientas del tema 9 consumen el mismo modelo.

**Tech Stack:** TypeScript, React 19, SVG, Vitest, Testing Library.

**Spec:** `docs/superpowers/specs/2026-10-31-dt1-technical-drawing-design.md`

## Global Constraints

- Método europeo: planta debajo del alzado y perfil izquierdo a la derecha.
- Toda la geometría se calcula en milímetros y se transforma una sola vez a coordenadas de pantalla.
- Las cotas muestran la dimensión real, independientemente de la escala.
- No se añade una dependencia de CAD ni renderizado 3D.

## Review Focus

- Una pieza cúbica debe producir tres cuadrados iguales, sin invertir largo, fondo o altura.
- Una pieza asimétrica debe conservar la correspondencia entre vistas.
- Las escalas de ampliación, natural y reducción deben aplicar el mismo factor a cada segmento.
- Las flechas de cota deben apuntar hacia el interior y las auxiliares sobrepasar la línea de cota.
- Los valores nulos o negativos no deben producir `NaN` ni geometría SVG inválida.

---

### Task 1: Modelo geométrico de lámina

**Files:**

- Create: `src/components/lesson/technical-drawing/model.ts`
- Test: `src/tests/unit/lesson/technical-drawing-model.test.ts`

**Interfaces:**

- Produces: `projectSteppedBlock`, `drawingLength`, `linearDimensionGeometry`.

- [ ] Escribir pruebas fallidas para cubo, pieza escalonada, tres tipos de escala y geometría de cota.
- [ ] Ejecutar las pruebas y comprobar que fallan por ausencia del módulo.
- [ ] Implementar las funciones puras con validación de entradas.
- [ ] Ejecutar las pruebas y comprobar que pasan.

### Task 2: Primitivas SVG y herramientas visuales

**Files:**

- Create: `src/components/lesson/technical-drawing/TechnicalSheet.tsx`
- Modify: `src/components/lesson/slide/tools/DtNormalizacionTools.tsx`
- Test: `src/tests/unit/lesson/slide-tool-dt1-normalizacion.test.tsx`

**Interfaces:**

- Consumes: modelo de Task 1.
- Produces: marco, cajetín, vistas enlazadas y cotas normativas en las herramientas existentes.

- [ ] Escribir pruebas de DOM fallidas para tres vistas de cubo, factor de escala, líneas auxiliares, flechas y cifra real.
- [ ] Ejecutarlas y verificar el fallo esperado.
- [ ] Implementar las primitivas y migrar las tres herramientas.
- [ ] Ejecutar las pruebas y verificar que pasan.

### Task 3: Lecciones y validación visual

**Files:**

- Modify: `src/data/lessons/dibujo-tecnico-1-bachillerato/09-normalizacion-documentacion-grafica/03-escalas-numericas-graficas-dt1.ts`
- Modify: `src/data/lessons/dibujo-tecnico-1-bachillerato/09-normalizacion-documentacion-grafica/04-vistas-normalizadas-dt1.ts`
- Modify: `src/data/lessons/dibujo-tecnico-1-bachillerato/09-normalizacion-documentacion-grafica/05-acotacion-normalizada-dt1.ts`
- Test: `src/tests/unit/data/dibujo-tecnico-1-lessons.test.tsx`

**Interfaces:**

- Consumes: herramientas migradas de Task 2.
- Produces: secuencia que parte del encargo, permite construir y termina justificando el resultado.

- [ ] Escribir pruebas fallidas que impidan clasificación/test como cierre principal de estas tres lecciones.
- [ ] Reescribir la secuencia alrededor de la lámina y la toma de decisiones técnicas.
- [ ] Ejecutar pruebas unitarias, TypeScript, recorrido de navegador y captura a 1440 px.
- [ ] Ejecutar la suite completa y build con Webpack antes de actualizar la PR.
