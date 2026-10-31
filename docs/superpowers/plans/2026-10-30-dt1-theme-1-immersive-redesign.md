# Rediseño inmersivo del tema 1 de Dibujo Técnico I — Plan de implementación

> **Para trabajadores agénticos:** SUBHABILIDAD OBLIGATORIA: usar `superpowers:subagent-driven-development` (recomendado) o `superpowers:executing-plans` para ejecutar este plan tarea por tarea. Los pasos usan casillas (`- [ ]`) para registrar el avance.

**Objetivo:** Convertir las cuatro lecciones del tema 1 en una secuencia visual, didáctica e interactiva, con narración sincronizada y sin solapamientos conceptuales.

**Arquitectura:** Se añadirá un paso declarativo `storyboard` que compone una escena registrada con fases narrativas, resaltados y controles accesibles dentro del presentador. Las cuatro lecciones usarán este formato junto con `predict`, `explore` y actividades visuales existentes; las escenas nuevas se concentrarán en un módulo propio del tema para no alterar el resto del curso.

**Tecnologías:** Next.js 16, React 19, TypeScript, Tailwind CSS, Vitest, Testing Library y Playwright.

**Especificación:** `docs/superpowers/specs/2026-10-30-dt1-theme-1-immersive-redesign.md`

## Restricciones globales

- Mantener sin cambios las rutas, el progreso guardado, la barra lateral, el tutor y las lecciones de otros temas.
- El formato inmersivo es opcional y solo se activa mediante pasos `storyboard`.
- Conservar retroceso, avance, pausa, reproducción, reinicio, teclado, texto accesible y `prefers-reduced-motion`.
- Cada lección tendrá entre 6 y 8 pasos, una pregunta central clara y al menos dos actividades de aplicación.
- No incluir listas expositivas aisladas ni tres cálculos repetitivos consecutivos.
- El texto sincronizado debe vivir fuera del SVG y compartir el color de las partes resaltadas en la escena.
- En escritorio, el storyboard ocupará todo el ancho útil con una proporción aproximada 2/3 visual y 1/3 explicación, sin la tarjeta interior con borde del reproductor actual.
- No añadir dependencias.

## Foco de revisión

- Una escena con una sola fase debe conservar controles válidos y permitir continuar; queda cubierta en la tarea 1.
- Una fase con palabras resaltadas ausentes del texto no debe romper el renderizado; queda cubierta en la tarea 1.
- `prefers-reduced-motion` debe impedir el avance automático sin ocultar fases ni controles; queda cubierta en la tarea 1.
- Un identificador de escena inexistente debe detectarse en pruebas de datos antes de llegar al alumno; queda cubierto en la tarea 2.
- Al volver a un paso superado, la presentación debe poder recorrerse y continuar sin bloqueo; queda cubierta en la tarea 1.

---

### Tarea 1: Formato narrativo inmersivo reutilizable

**Archivos:**
- Modificar: `src/lib/lesson/types.ts`
- Crear: `src/components/lesson/storyboard/StoryboardStepView.tsx`
- Crear: `src/components/lesson/storyboard/StoryboardNarration.tsx`
- Modificar: `src/components/lesson/InteractiveQuestion.tsx`
- Modificar: `src/components/lesson/anim/registry.tsx`
- Probar: `src/tests/unit/lesson/storyboard-step.test.tsx`

**Interfaces:**
- Consume: `buildSlideAnim(scene, params, captions)`, `StageStepControls`, `useReducedMotion` y `useRegisterLessonStepControl`.
- Produce: `StoryboardStep` con `type: "storyboard"`, `scene: SlideAnimId`, `phases: StoryboardPhase[]`, `params?: Record<string, unknown>`, `beatMs?: number`; `StoryboardPhase` con `text`, `highlights?: { text: string; tone: VisualTone }[]` y `eyebrow?: string`; `StoryboardStepView` conectado a `InteractiveQuestion`.

- [ ] **Paso 1: Escribir la prueba fallida del contrato y el diseño inmersivo**

  Añadir casos que monten un storyboard de varias fases y otro de una sola fase; comprobar `data-testid="lesson-storyboard"`, ausencia de las clases de tarjeta `rounded-2xl border`, texto de fase con `aria-live`, resaltado por tono, cambio manual de fase, registro de Continuar y tolerancia a un resaltado que no aparezca en el texto.

- [ ] **Paso 2: Ejecutar la prueba para confirmar que falla**

  Ejecutar: `npm run test:run -- src/tests/unit/lesson/storyboard-step.test.tsx`

  Esperado: fallo porque el tipo y el componente todavía no existen.

- [ ] **Paso 3: Implementar los tipos y la vista**

  Crear `StoryboardStepView({ step, onContinue, presentationUnlocked })`, construir la escena mediante el registro actual y disponerla en `lg:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]`. Reutilizar los controles existentes, detener el autoplay con movimiento reducido y registrar el botón Continuar al completar o cuando `presentationUnlocked` sea verdadero.

- [ ] **Paso 4: Ejecutar las pruebas del storyboard y del reproductor existente**

  Ejecutar: `npm run test:run -- src/tests/unit/lesson/storyboard-step.test.tsx src/tests/unit/lesson/slide-anim.test.tsx src/tests/unit/lesson/step-control-registration.test.tsx`

  Esperado: todas pasan.

- [ ] **Paso 5: Confirmar tipos y guardar el incremento**

  Ejecutar: `npx tsc --noEmit`

  Commit: `feat(lessons): add immersive storyboard steps`

### Tarea 2: Escenas visuales del tema 1

**Archivos:**
- Crear: `src/components/lesson/anim/scenes/industrial/dt1-fundamentos.tsx`
- Modificar: `src/components/lesson/anim/scenes/industrial/dt1-geometria.tsx`
- Modificar: `src/components/lesson/anim/registry.tsx`
- Probar: `src/tests/unit/lesson/slide-tool-dt1-geometria.test.tsx`

**Interfaces:**
- Consume: interfaz `AnimBuild` del registro y las primitivas SVG/CSS ya usadas por las escenas industriales.
- Produce: escenas registradas para `plano-informacion`, `geometria-medida-demostracion`, `pitagoras-areas`, `lugares-condiciones`, `interseccion-lugares`, `arco-capaz-invariancia` y `arco-capaz-construccion`.

- [ ] **Paso 1: Escribir pruebas fallidas para todas las escenas y fases**

  Extender la prueba para exigir que cada identificador exista, tenga al menos tres captions, dibuje todas sus fases sin lanzar errores y exponga en el marcado las etiquetas conceptuales decisivas de cada escena.

- [ ] **Paso 2: Ejecutar la prueba para confirmar que falla**

  Ejecutar: `npm run test:run -- src/tests/unit/lesson/slide-tool-dt1-geometria.test.tsx`

  Esperado: fallo por escenas aún no registradas.

- [ ] **Paso 3: Implementar escenas progresivas**

  Construir escenas responsivas con un único sistema de color por concepto y estados acumulativos por fase. Mantener todo texto explicativo largo fuera del SVG; dentro solo habrá rótulos breves, medidas, símbolos y nombres geométricos.

- [ ] **Paso 4: Ejecutar pruebas de escenas y registro completo**

  Ejecutar: `npm run test:run -- src/tests/unit/lesson/slide-tool-dt1-geometria.test.tsx src/tests/unit/lesson/slide-anim.test.tsx`

  Esperado: todas pasan y ningún identificador del registro deja de dibujarse.

- [ ] **Paso 5: Guardar el incremento**

  Commit: `feat(dt1): add visual scenes for geometry foundations`

### Tarea 3: Reescritura didáctica de las cuatro lecciones

**Archivos:**
- Modificar: `src/data/lessons/dibujo-tecnico-1-bachillerato/01-historia-fundamentos-geometricos/01-historia-dibujo-tecnico-campos-dt1.ts`
- Modificar: `src/data/lessons/dibujo-tecnico-1-bachillerato/01-historia-fundamentos-geometricos/02-geometria-griega-pitagoras-dt1.ts`
- Modificar: `src/data/lessons/dibujo-tecnico-1-bachillerato/01-historia-fundamentos-geometricos/03-lugares-geometricos-dt1.ts`
- Modificar: `src/data/lessons/dibujo-tecnico-1-bachillerato/01-historia-fundamentos-geometricos/04-arco-capaz-dt1.ts`
- Modificar: `src/tests/unit/data/dibujo-tecnico-1-lessons.test.tsx`

**Interfaces:**
- Consume: `StoryboardStep`, las escenas de la tarea 2 y los pasos `predict`, `explore`, `classify` y `slide` existentes.
- Produce: cuatro lecciones de 6–8 pasos con ámbitos exclusivos y una progresión pregunta → predicción → explicación/acción → aplicación → transferencia.

- [ ] **Paso 1: Escribir pruebas curriculares fallidas para el tema 1**

  Comprobar títulos y preguntas centrales, 6–8 pasos, presencia de storyboard, dos actividades aplicadas por lección, máximo dos pasos pasivos consecutivos, vocabulario exclusivo (`cronología/autores` fuera de L1, `arco capaz` desarrollado solo en L4) y ausencia de bloques de lista aislados.

- [ ] **Paso 2: Ejecutar la prueba para confirmar que falla con el contenido actual**

  Ejecutar: `npm run test:run -- src/tests/unit/data/dibujo-tecnico-1-lessons.test.tsx`

  Esperado: fallos en estructura, solapamientos y formato narrativo.

- [ ] **Paso 3: Reescribir L1 — «Un lenguaje para construir»**

  Limitarla a dibujo artístico/técnico, información del plano, normalización, ámbitos profesionales y manual/CAD. Usar diagnóstico de información ausente, galería visual de documentos y decisión de transferencia.

- [ ] **Paso 4: Reescribir L2 — «De medir a demostrar»**

  Limitarla a medición antigua, Tales, Pitágoras, Euclides e Hipatia. Introducir demostración por áreas, construcción guiada y ordenación razonada; la semicircunferencia de Tales será un ejemplo sin definir todavía el arco capaz.

- [ ] **Paso 5: Reescribir L3 — «Encontrar puntos mediante condiciones»**

  Trabajar circunferencia, mediatriz, bisectriz, paralelas e intersecciones mediante predicción, explorador, construcción y casos con cero, una o dos soluciones. Cerrar con un avance breve hacia L4.

- [ ] **Paso 6: Reescribir L4 — «Ver un segmento bajo el mismo ángulo»**

  Partir de una predicción visual, comprobar la invariancia, conectar el caso de 90° con Tales, construir el arco y resolver una localización auténtica mediante dos arcos. Dejar la fórmula del radio como ampliación opcional.

- [ ] **Paso 7: Ejecutar pruebas curriculares, de escenas y tipos**

  Ejecutar: `npm run test:run -- src/tests/unit/data/dibujo-tecnico-1-lessons.test.tsx src/tests/unit/lesson/storyboard-step.test.tsx src/tests/unit/lesson/slide-anim.test.tsx && npx tsc --noEmit`

  Esperado: todo pasa.

- [ ] **Paso 8: Guardar el incremento**

  Commit: `feat(dt1): rewrite geometry foundations theme`

### Tarea 4: Validación funcional y visual del recorrido completo

**Archivos:**
- Modificar si descubre regresiones: archivos de las tareas 1–3
- Crear: `e2e/dt1-theme-one-storyboard.spec.ts`

**Interfaces:**
- Consume: las cuatro lecciones terminadas y la ruta pública del presentador.
- Produce: evidencia automatizada y visual de navegación, accesibilidad básica y composición en escritorio.

- [ ] **Paso 1: Escribir el recorrido E2E del tema**

  Abrir cada lección desde su ruta real, comprobar la pregunta central, avanzar y retroceder fases del storyboard, verificar que el texto sincronizado cambia, recorrer los pasos y confirmar que los controles nunca quedan bloqueados.

- [ ] **Paso 2: Ejecutar el recorrido y corregir solo regresiones observadas**

  Ejecutar: `npx playwright test e2e/dt1-theme-one-storyboard.spec.ts --project=chromium`

  Esperado: cuatro lecciones recorridas sin errores de consola ni bloqueos.

- [ ] **Paso 3: Revisar visualmente a 1440 × 1000**

  Capturar al menos un storyboard y una actividad por lección. Confirmar ancho aprovechado, proporción visual/texto, legibilidad, ausencia de tarjeta interior, resaltados sincronizados y ausencia de huecos propios de listas cortas.

- [ ] **Paso 4: Ejecutar la verificación final del repositorio**

  Ejecutar: `npm run test:run`, `npx tsc --noEmit`, `npm run lint` y `npm run format:check`.

  Esperado: sin fallos introducidos por la rama; cualquier fallo previo ajeno se documentará con su salida exacta.

- [ ] **Paso 5: Revisar el diff y guardar la validación**

  Ejecutar: `git diff --check` y revisar `git diff origin/main...HEAD` para detectar texto repetido, escenas sin uso o cambios fuera del tema.

  Commit: `test(dt1): cover immersive theme one journey`

- [ ] **Paso 6: Preparar la entrega**

  Sincronizar con `origin/main`, resolver conflictos si aparecen, subir `cursor/redesign-dt1-theme-3464` y crear una PR con el problema, el nuevo comportamiento y la validación. No fusionar ni publicar la aplicación.
