# Motor de reglas de asignación automática

Sistema configurable que **asigna automáticamente** refuerzo, recuperación o avance según el dominio de conceptos del alumno, sin intervención manual constante del profesor.

## Objetivo

El profesor define reglas del tipo:

> «Si un alumno tiene mastery < 40% en «Fracciones equivalentes», asígnale el set de ejercicios de refuerzo X.»

El motor evalúa estas reglas tras eventos relevantes y crea asignaciones según el modo del aula.

## Modos de ejecución

Heredados de `classrooms.assignment_mode`, sobreescribibles por regla:

| Modo       | Resultado de una regla que aplica                                             |
| ---------- | ----------------------------------------------------------------------------- |
| `auto`     | Crea `assignment` en estado `active` directamente                             |
| `approval` | Crea `assignment` en estado `pending_approval`; el profesor aprueba o rechaza |
| `manual`   | Las reglas no se evalúan (solo asignación manual)                             |

### Flujo con aprobación

```
Regla se cumple
  → assignment (pending_approval)
  → notificación al profesor
  → profesor: Aprobar → active | Rechazar → cancelled
  → assignment_rule_run registrado con resultado
```

## Triggers (cuándo evaluar)

| Trigger             | Momento                                                                            |
| ------------------- | ---------------------------------------------------------------------------------- |
| `after_attempt`     | Tras cada intento del alumno en contexto del aula (o global si la regla lo indica) |
| `on_mastery_change` | Cuando el mastery de un concepto cruza un umbral                                   |
| `scheduled`         | Cron diario (p. ej. 07:00) para repasos programados                                |

En MVP se implementan `after_attempt` y `scheduled`. `on_mastery_change` puede ser un alias de `after_attempt` con filtro de umbral.

## Formato de condiciones (`conditions` JSON)

```json
{
  "all": [
    {
      "field": "concept_mastery",
      "conceptId": "uuid-o-slug",
      "operator": "lt",
      "value": 0.4
    },
    {
      "field": "attempt_count",
      "conceptId": "uuid-o-slug",
      "operator": "gte",
      "value": 3
    }
  ],
  "any": [],
  "none": [
    {
      "field": "active_assignment",
      "conceptId": "uuid-o-slug",
      "type": "reinforcement"
    }
  ]
}
```

### Campos soportados (MVP)

| Campo                     | Descripción                                                |
| ------------------------- | ---------------------------------------------------------- |
| `concept_mastery`         | Valor 0–1 del concepto                                     |
| `mastery_state`           | `struggling`, `developing`, `proficient`, `mastered`       |
| `attempt_count`           | Nº de intentos en el concepto (ventana opcional)           |
| `recent_score_avg`        | Media de scores en últimos N intentos                      |
| `active_assignment`       | ¿Ya existe asignación activa de tipo X para este concepto? |
| `days_since_last_attempt` | Días desde último intento en el concepto                   |

### Operadores

`eq`, `neq`, `lt`, `lte`, `gt`, `gte`, `in`, `not_in`

## Formato de acción (`action` JSON)

```json
{
  "type": "reinforcement",
  "title": "Refuerzo: fracciones equivalentes",
  "contentItemId": "uuid",
  "conceptIds": ["uuid"],
  "dueInDays": 7,
  "target": "matching_student"
}
```

| Campo           | Valores                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------ |
| `type`          | `reinforcement`, `recovery`, `advance`, `task`, `recommended`                                    |
| `target`        | `matching_student` (quien cumple condición), `classroom` (todos), `explicit` (lista en metadata) |
| `contentItemId` | Contenido a asignar (selección manual en MVP)                                                    |
| `exerciseIds`   | Alternativa: ejercicios sueltos elegidos por el profesor                                         |
| `conceptIds`    | Solo en fase 4: el sistema auto-selecciona ejercicios del banco                                  |
| `dueInDays`     | Plazo opcional                                                                                   |

## Evaluación

```ts
// src/lib/assignment-rules/evaluator.ts

function evaluateRulesForStudent(
  classroomId: string,
  studentId: string,
  trigger: RuleTrigger,
  context?: { attemptId?: string; conceptIds?: string[] },
): RuleEvaluationResult[];
```

### Algoritmo

1. Cargar reglas activas del aula ordenadas por `priority` ASC.
2. Si `classroom.assignment_mode === 'manual'`, salir.
3. Para cada regla con `trigger` compatible:
   a. Cargar snapshot de mastery e intentos del alumno.
   b. Evaluar `conditions` (all/any/none).
   c. Si aplica y `none` no bloquea (p. ej. ya hay asignación activa duplicada) → generar acción.
   d. Crear `assignment` según modo.
   e. Insertar `assignment_rule_run`.
4. Devolver resultados para logging/UI.

### Prevención de duplicados

La condición `none: [{ field: "active_assignment", ... }]` evita asignar el mismo refuerzo dos veces. Además, el evaluador comprueba si ya existe una asignación `active` o `pending_approval` con el mismo `concept_id` + `type` en los últimos X días.

## Ejemplos de reglas predefinidas (plantillas)

El profesor puede partir de plantillas al crear una regla:

| Plantilla                    | Condición                                    | Acción                                   |
| ---------------------------- | -------------------------------------------- | ---------------------------------------- |
| Refuerzo básico              | mastery < 0.4, ≥ 3 intentos                  | `reinforcement` con set del concepto     |
| Recuperación post-evaluación | mastery < 0.5 tras sesión en vivo            | `recovery`                               |
| Avance automático            | mastery ≥ 0.85 en concepto actual            | `advance` a siguiente concepto del curso |
| Repaso semanal               | mastery en [0.7, 0.85), 7 días sin practicar | `recommended` (trigger `scheduled`)      |

## UI del profesor

### Lista de reglas (`/aulas/[id]/reglas`)

- Tabla: nombre, trigger, condición resumida, acción, modo, activa/inactiva.
- Toggle activar/desactivar sin borrar.
- Botón «Probar con alumno» → simulación dry-run (muestra qué se asignaría sin persistir).

### Historial de ejecuciones

- Por regla: cuándo se evaluó, para quién, resultado, enlace a asignación creada.
- Filtro por alumno y fecha.

### Cola de aprobación

- Lista de `assignments` en `pending_approval` con explicación de la regla que los generó.
- Acciones: Aprobar, Rechazar, Editar antes de aprobar.

## Auditoría

Cada ejecución persiste en `assignment_rule_runs`:

```json
{
  "ruleId": "...",
  "studentId": "...",
  "evaluatedAt": "...",
  "conditionsMet": true,
  "result": {
    "assignmentId": "...",
    "explanation": "mastery(fracciones-equivalentes) = 0.32 < 0.4"
  }
}
```

## Testing

- Vitest: casos de condiciones compuestas (all/any/none).
- Vitest: modo auto vs approval vs manual.
- Vitest: no duplicar asignaciones activas.
- Integración: intento → evaluación → assignment creada.

## Documentos relacionados

- `classrooms.md` — asignaciones y modos del aula
- `learning-model.md` — mastery como input
- `recommendations.md` — diferencias con recomendaciones al estudiante
- `database.md` — tablas `assignment_rules`, `assignment_rule_runs`
