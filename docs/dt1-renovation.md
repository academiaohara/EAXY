# Renovación práctica de Dibujo Técnico I

## Fuentes y alcance

Currículo de referencia: RD 243/2022, BOE-A-2022-5521, sección Dibujo Técnico I, criterios 1.1–5.2 y saberes A–D (PDF local en `temp/`). Libro auxiliar: Rodríguez de Abajo y Álvarez Bengoa, Editorial Donostiarra, dividido en `temp/dibujo-tecnico/1-bachillerato/`. Es anterior a LOMLOE: no establece los contenidos exigibles ni sustituye normas vigentes.

Primera entrega: las cuatro lecciones del tema 1, conservando sus rutas. El resto del curso sigue pendiente de renovación; esta tabla define su dirección, no certifica que esté implementado.

## Reparto del curso

| Tema                      | Resultado observable y experiencia prevista                                      | Libro auxiliar                                         | Criterios estatales          |
| ------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------ | ---------------------------- |
| 1. Historia y fundamentos | Reparar documentación, comprobar una propiedad, localizar puntos por condiciones | 2 (trazados), 19 (arte y dibujo)                       | 1.1, 2.1; aproximación a 4.1 |
| 2. Proporcionalidad       | Construir una longitud, transformar una figura conservando razones o áreas       | 3, 6 y 7                                               | 2.1                          |
| 3. Polígonos              | Construir y verificar figuras con datos distintos, sin memorizar plantillas      | 4 y 5                                                  | 2.2                          |
| 4. Tangencias             | Reparar un enlace y comprobar radios perpendiculares en los contactos            | 8 y 9                                                  | 2.3                          |
| 5. Diédrico básico        | Situar elementos y vincular modelo espacial con proyecciones                     | 11 y 12                                                | 3.1, 3.5                     |
| 6. Relaciones en diédrico | Resolver pertenencia, intersección y distancia sobre planos manipulables         | 12                                                     | 3.1, 3.5                     |
| 7. Axonometría            | Reconstruir una pieza, orientar ejes y aplicar reducción                         | 14 y 15                                                | 3.2, 3.5                     |
| 8. Acotados y cónico      | Interpretar terreno y construir una perspectiva desde un punto de vista          | 13; cónico requiere fuente complementaria              | 3.3, 3.4, 3.5                |
| 9. Documentación          | Elaborar y corregir un plano con vistas, escalas y cotas suficientes             | 3, 16–18; contrastar convenciones con UNE/ISO vigentes | 4.1, 4.2                     |
| 10. CAD                   | Editar geometría y modelar piezas con operaciones funcionales                    | El libro no cubre el bloque digital actual             | 5.1, 5.2                     |

No trasladar automáticamente las cónicas del tema 10 del libro a DT I: el curso actual desarrolla ese contenido en DT II. Incorporar historia con diversidad cultural y de género, incluyendo Hipatia, que el índice antiguo no garantiza. La cobertura autonómica de Asturias requiere contraste adicional: este mapeo solo acredita el currículo estatal consultado.

## Primera entrega: fichas de diseño

| Lección                       | Introduce                                                                 | Acción principal                                               | Transferencia                              | Reserva                                           |
| ----------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------- | ------------------------------------------ | ------------------------------------------------- |
| 1. Un lenguaje para construir | Forma, dimensión y escala; evolución y aplicaciones del lenguaje gráfico  | Editar cotas y escala de un plano conforme a un encargo        | Reparar otra pieza con distinta escala     | Normalización detallada, tema 9                   |
| 2. De medir a demostrar       | Evidencia frente a prueba; legado de Tales, Pitágoras, Euclides e Hipatia | Ajustar una escuadra y comprobar longitudes y producto escalar | Otra proporción de lados                   | Semejanza y construcciones proporcionales, tema 2 |
| 3. Puntos por condiciones     | Mediatriz, circunferencia, bisectriz y paralelas                          | Situar una instalación con dos restricciones de distancia      | Otra distancia con dos posiciones posibles | Condición angular, lección 4                      |
| 4. Ver un segmento            | Ángulo visual y arco capaz; caso de Tales                                 | Mover una cámara hasta alcanzar un ángulo y una zona válida    | Otro ángulo y posición                     | Tangencias sistemáticas, tema 4                   |

Cada taller muestra medidas calculadas desde el mismo modelo que dibuja. Puede manipularse mediante clic en el plano y campos numéricos etiquetados; no exige arrastrar. Feedback describe la restricción que falta; reinicio y estado persistido por paso permiten reintentar y volver. Continuar solo acredita la tarea cuando sus condiciones se cumplen; Saltar conserva el comportamiento del presentador. El progreso de taller se registra como exploración completada, sin inventar puntuaciones de cuestionario.

Se conservan demostraciones geométricas donde ayudan y se añaden documentos claros en una superficie de trabajo de fondo claro. No se añaden dependencias ni se convierte todo el curso al mismo taller.

## Plan de ejecución y aceptación

1. Probar modelos de validación: cotas/escala coherentes, perpendicularidad y longitudes, distancias simultáneas, ángulo y puntos degenerados.
2. Integrar talleres con controles existentes y estado por paso; comprobar error, corrección, reinicio y reentrada.
3. Reescribir el tema sin tests y clasificaciones como práctica principal; mantener cobertura histórica estatal y límites entre lecciones.
4. Actualizar validadores que antes contaban únicamente cuestionarios. Recorrer en navegador los talleres y capturar estados representativos.
5. Ejecutar pruebas pertinentes, TypeScript, lint focalizado y comprobaciones generales justificadas; entregar PR con evidencia y límites.

Referencia inspeccionada para esta entrega: tema 2 del libro, páginas impresas 19–20 (propiedades como base del razonamiento); tema 19, página impresa 185 (boceto, definición y fabricación). No se afirma haber contrastado las 216 páginas ni actualizado todas las normas del libro.

## Evidencia de la primera entrega

- Implementados cuatro tipos de taller, cada uno con encargo inicial y variación: ocho actividades sustituyen tests y clasificaciones en las cuatro lecciones. Las explicaciones geométricas se conservan cuando son útiles.
- Validación de condiciones numéricas y soluciones alternativas; estados degenerados y valores no finitos rechazados. Tolerancias explícitas para evitar evaluar precisión de ratón.
- Ocho recorridos Playwright a 1440 × 1000: narración, corrección, reinicio, reentrada con estado conservado y transferencia. Capturas de los cuatro talleres inspeccionadas.
- Suite completa: 283 archivos, 16.882 pruebas superadas. Tras explicitar las tolerancias en el texto, las ocho pruebas del taller vuelven a pasar. TypeScript y ESLint de archivos cambiados sin errores.
- Producción: `npm run build -- --webpack` con `CONTENT_PREVIEW_MODE=true` y configuración local, correcto. El build Turbopack del entorno falla al resolver su módulo interno `@vercel/turbopack/postcss`; no se han cambiado dependencias ni scripts para ocultarlo.
- Revisión interna del autor, sin agentes adicionales. No equivale a una evaluación con alumnos. Temas 2–10 pendientes.
