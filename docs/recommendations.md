# Sistema de recomendaciones

Motor **determinista, basado en reglas**, sin IA. Cada recomendación incluye una **explicación legible** de por qué se sugiere.

## Principios

1. **Explicable** — el estudiante (y el profesor) puede ver el motivo.
2. **Determinista** — mismos datos de entrada → misma recomendación.
3. **No intrusivo** — sugerencias, no bloqueos (salvo prerrequisitos configurados).
4. **Priorizado** — una recomendación principal; alternativas secundarias opcionales.

## Entradas

| Dato                             | Fuente                                  |
| -------------------------------- | --------------------------------------- |
| `concept_mastery` del estudiante | `concept_mastery`                       |
| Grafo de prerrequisitos          | `concept_prerequisites`                 |
| Últimos intentos                 | `attempts` (recencia, racha de errores) |
| Progreso en lecciones            | `learning_paths` (fase 2)               |
| Asignaciones pendientes del aula | `assignments` + `assignment_targets`    |

## Salida

```ts
type Recommendation = {
  action: "practice" | "reinforce" | "recover" | "advance" | "rest";
  conceptId: string;
  contentItemId?: string;
  priority: number;
  explanation: {
    ruleId: string; // identificador estable de la regla
    summary: string; // texto en español para el usuario
    details: Record<string, unknown>; // datos que activaron la regla
  };
};
```

## Reglas (orden de evaluación)

Las reglas se evalúan en orden de prioridad; la primera que aplica genera la recomendación principal.

### R1 — Asignación pendiente del aula

```
SI el estudiante tiene assignment_target en estado pending/in_progress
ENTONCES action = "practice", contenido = la asignación
EXPLICACIÓN: "Tienes una tarea pendiente en el aula {nombre}."
```

### R2 — Recuperación (concepto en struggling)

```
SI existe concepto C con mastery < 0.4
   Y C tiene ejercicios disponibles
   Y no se ha practicado C en las últimas 24h
ENTONCES action = "recover", concepto = C (el de mastery más bajo con contenido)
EXPLICACIÓN: "Tu dominio de «{título}» es bajo ({mastery}%). Practiquemos para reforzarlo."
```

### R3 — Refuerzo (concepto en developing con errores recientes)

```
SI existe concepto C con mastery en [0.4, 0.7)
   Y últimos 3 intentos en C tienen score medio < 0.5
ENTONCES action = "reinforce"
EXPLICACIÓN: "Has tenido dificultades recientes con «{título}». Un poco más de práctica ayudará."
```

### R4 — Avance (prerrequisitos cumplidos)

```
SI existe concepto C sin empezar o en developing
   Y todos los prerrequisitos de C tienen mastery ≥ umbral
   Y existe lección siguiente no completada para C
ENTONCES action = "advance"
EXPLICACIÓN: "Ya dominas los conceptos previos. ¡Siguiente paso: «{título}»!"
```

### R5 — Repaso espaciado (proficient)

```
SI existe concepto C con mastery en [0.7, 0.85)
   Y last_attempt_at > 7 días
ENTONCES action = "practice" (repaso)
EXPLICACIÓN: "Hace tiempo que no practicas «{título}». Un repaso rápido lo mantendrá fresco."
```

### R6 — Descanso

```
SI el estudiante ha completado ≥ 5 ejercicios en la última hora
ENTONCES action = "rest"
EXPLICACIÓN: "¡Buen trabajo! Tómate un descanso o repasa lo aprendido mañana."
```

### R7 — Por defecto (continuar curso)

```
SI ninguna regla anterior aplica
ENTONCES action = "practice", contenido = siguiente lección lineal del curso
EXPLICACIÓN: "Continúa con la siguiente lección del curso."
```

## Selección de contenido

Dada una acción y un `conceptId`:

1. Buscar `content_items` etiquetados con ese concepto.
2. Preferir ejercicios no intentados recientemente (evitar repetición inmediata).
3. Si `action = recover`, preferir dificultad baja.
4. Si `action = advance`, preferir lección introductoria del concepto.

## API interna

```ts
// src/lib/recommendations/engine.ts
function getRecommendations(
  studentId: string,
  options?: { classroomId?: string; limit?: number },
): Recommendation[];
```

- Sin `classroomId`: modo personal.
- Con `classroomId`: prioriza asignaciones de esa aula (R1).

## Persistencia

- Cálculo **on-demand** en cada visita a «Practicar» o dashboard.
- Log opcional en `recommendation_logs` para historial y A/B de reglas (fase 2).
- No se cachea entre requests en MVP; si hay problemas de rendimiento, cache de 5 min por estudiante.

## UI

- Tarjeta principal con explicación en lenguaje natural.
- Enlace «¿Por qué me recomiendas esto?» expande `explanation.details`.
- El profesor puede ver las mismas reglas activadas para un alumno (modo diagnóstico).

## Diferencia con Assignment Rules

|                 | Recomendaciones            | Assignment Rules         |
| --------------- | -------------------------- | ------------------------ |
| Destinatario    | El estudiante (sugerencia) | El aula (tarea formal)   |
| Obligatoriedad  | Opcional                   | Puede tener fecha límite |
| Quién configura | Sistema (global)           | Profesor (por aula)      |
| Modo aprobación | No aplica                  | Sí (`approval`)          |

Un profesor puede convertir una recomendación en asignación con un clic.

## Testing

- Vitest: tabla de casos con mastery/attempts de entrada → recomendación esperada.
- Cada regla en archivo separado (`rules/r1-pending-assignment.ts`, etc.).
- Snapshot de `explanation.summary` para detectar cambios accidentales.

## Documentos relacionados

- `learning-model.md` — mastery y estados
- `assignment-rules.md` — automatización docente
- `classrooms.md` — asignaciones del aula
