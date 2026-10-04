# Modelo de aprendizaje

## Unidad central: el concepto

El seguimiento del aprendizaje se hace **a nivel de concepto** siempre que sea posible. Un concepto es una habilidad o idea matemática atómica (p. ej. «identificar fracciones equivalentes», «sumar números enteros con distinto signo»).

Los contenidos (lecciones, vídeos, ejercicios) **etiquetan** uno o varios conceptos. Un ejercicio puede evaluar varios conceptos con pesos distintos.

### Grafo de conceptos

- Jerarquía opcional (`parent_id`) para agrupación visual.
- Prerrequisitos explícitos (`concept_prerequisites`) con umbral mínimo de mastery.
- El motor de recomendaciones y de avance consulta el grafo antes de sugerir contenido.

## Mastery (dominio)

### Definición

`mastery` es un valor **0–1** que representa el dominio estimado de un estudiante sobre un concepto. No es una nota; es una señal para adaptar el recorrido.

### Cálculo (decisión aprobada: media ponderada con decaimiento)

Tras cada intento que afecta un concepto:

1. Filtrar intentos del estudiante para ejercicios etiquetados con ese concepto (ventana: últimos N o últimos 30 días).
2. Calcular **media ponderada** de `score` por dificultad y antigüedad (**decaimiento exponencial suave** — intentos recientes pesan más).
3. Aplicar factor de **consistencia**: más intentos con resultados estables → mayor `confidence`.
4. Actualizar `concept_mastery` (ver `database.md`).

```
mastery = weighted_mean(scores, decay_weights) * consistency_factor
confidence = f(attempt_count, variance)
```

La fórmula vive en `src/lib/mastery/calculator.ts`, configurable por constantes, sin ML.

### Estados cualitativos (derivados)

Para UI y reglas, se derivan etiquetas a partir de umbrales fijos:

| Estado        | Mastery      | Uso                                   |
| ------------- | ------------ | ------------------------------------- |
| `not_started` | sin intentos | Gris en mapa de conceptos             |
| `struggling`  | < 0.4        | Recuperación, refuerzo                |
| `developing`  | 0.4 – 0.7    | Práctica guiada                       |
| `proficient`  | 0.7 – 0.85   | Repaso espaciado                      |
| `mastered`    | ≥ 0.85       | Avance a prerrequisitos desbloqueados |

Los umbrales son **constantes globales en el MVP** (decisión aprobada). Configuración por aula o curso queda para fases posteriores.

## Progreso personal vs. contexto de aula

```
┌─────────────────────────────────────┐
│     Progreso del estudiante         │
│  attempts · concept_mastery         │
│  (global, independiente del aula)   │
└─────────────────┬───────────────────┘
                  │ se consulta
┌─────────────────▼───────────────────┐
│     Capa de aula (por classroom)      │
│  assignments · rules · live_sessions  │
│  (contexto docente, no duplica mastery)│
└─────────────────────────────────────┘
```

- El profesor **ve** el mastery global del alumno filtrado por los conceptos del aula.
- Las asignaciones del aula **apuntan** a contenido; al completarlo se generan `attempts` con `classroom_id` para trazabilidad, pero el mastery sigue siendo del estudiante.
- Un alumno en dos aulas comparte el mismo mastery; cada aula tiene sus propias tareas y reglas.

## Historial de intentos

### Regla de oro

> Los intentos **nunca se sobrescriben**. Solo se insertan.

Esto permite:

- Auditoría pedagógica (evolución en el tiempo).
- Recálculo de mastery si cambia la fórmula.
- Explicaciones de recomendaciones con datos históricos.

### Qué cuenta como intento

| Acción                              | ¿Genera attempt?                      |
| ----------------------------------- | ------------------------------------- |
| Ejercicio en modo personal          | Sí                                    |
| Ejercicio en asignación             | Sí (`source=assignment`)              |
| Respuesta en sesión en vivo (manual) | Sí (`source=live_session`)            |
| Marca manual del profesor en sesión | Sí (`submitted_by=teacher`)           |
| Ver un vídeo sin evaluación         | No (solo evento de progreso opcional) |
| Abrir una lección sin ejercicio     | No                                    |

## Recorrido de aprendizaje personal

Sin profesor, el estudiante sigue un **curso publicado** (árbol unidad → lección → contenido). El sistema:

1. Muestra progreso por unidad (lecciones completadas).
2. Calcula mastery por concepto.
3. Genera recomendaciones (ver `recommendations.md`).
4. Desbloquea lecciones según prerrequisitos de concepto.

**Navegación libre** por defecto (decisión aprobada). El bloqueo por unidad es **opcional y configurable** a nivel de curso (`courses.unit_lock_enabled`) o de aula (`classrooms.settings.unit_lock_enabled`). Cuando está activo, el alumno debe completar la unidad anterior antes de acceder a la siguiente; las recomendaciones siguen sugiriendo el camino óptimo aunque la navegación sea libre.

## Integración con el resto del sistema

| Sistema            | Cómo usa el modelo de aprendizaje                    |
| ------------------ | ---------------------------------------------------- |
| Exercise Engine    | Cada ejercicio declara `concept_ids` y pesos         |
| Recomendaciones    | Lee `concept_mastery` + grafo                        |
| Assignment Rules   | Condiciones sobre mastery y estados cualitativos     |
| Live Sessions      | Respuestas → `attempts` → recálculo de mastery       |
| Dashboard profesor | Agregación de mastery por alumno y concepto del aula |

## Eventos de dominio (futuro)

Para desacoplar módulos, cada intento procesado puede emitir:

```ts
AttemptRecorded {
  attemptId, studentId, conceptIds[], score, source, classroomId?
}
```

Los consumidores: mastery calculator, assignment-rules evaluator, recommendation logger.

## Documentos relacionados

- `database.md` — tablas `attempts`, `concept_mastery`
- `exercises.md` — vinculación ejercicio ↔ concepto
- `recommendations.md` — reglas de siguiente paso
- `assignment-rules.md` — automatización docente
