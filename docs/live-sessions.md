# Sesiones en vivo

Actividad en tiempo real tipo Kahoot integrada en el aula. Las respuestas alimentan el **mismo sistema de intentos y mastery** que el resto de la plataforma.

> **Plataforma solo escritorio:** Eaxy no se usa en móvil. Las sesiones en vivo se proyectan en pantalla y el profesor marca las respuestas por alumno (modo manual).

## Modo manual (único)

| Modo     | Quién responde                             | Caso de uso                |
| -------- | ------------------------------------------ | -------------------------- |
| `manual` | El profesor marca acierto/fallo por alumno | Pizarra, oral, proyector   |

Cada marca crea un `attempt` y un `live_session_response` vinculados.

## Ciclo de vida

```
lobby → active → question → results → question → ... → ended
```

| Estado     | Descripción                                                   |
| ---------- | ------------------------------------------------------------- |
| `lobby`    | Profesor prepara la sesión; alumnos no necesitan dispositivo |
| `active`   | Sesión en curso; sin pregunta visible aún                     |
| `question` | Pregunta actual abierta; profesor marca por alumno            |
| `results`  | Resultados agregados visibles; profesor decide siguiente paso |
| `ended`    | Sesión cerrada; mastery ya actualizado                        |

## Flujo modo manual

```
1. Profesor: sesión (mode=manual)
2. No requiere que alumnos tengan dispositivo
3. Profesor: lanza pregunta (proyectable en pantalla grande / ordenador)
4. Profesor: lista de alumnos del aula con toggle ✓ / ✗ por cada uno
5. Por cada marca:
     → genera response sintética → checkAnswer o override directo
     → INSERT attempt (submitted_by=teacher) + live_session_response
6. Resultados agregados en el panel del profesor
```

### Respuesta sintética (modo manual)

Cuando el profesor marca manualmente, la `response` puede ser:

```json
{ "manual": true, "markedCorrect": true }
```

El `score` se toma del marcado (`1.0` o `0.0`). El `exercise_id` sigue vinculado para trazabilidad del concepto evaluado.

### UI profesor

- Panel: lista de alumnos del aula, pregunta actual, barra de progreso de marcas.
- Gráfico de distribución de aciertos por pregunta.
- Temporizador opcional por pregunta.

## Tiempo real

### Tecnología

**Supabase Realtime** en canal `live_session:{id}`.

### Eventos broadcast

| Evento               | Payload                               | Quién emite                  |
| -------------------- | ------------------------------------- | ---------------------------- |
| `session_state`      | `{ status, currentQuestionId }`       | Profesor (host)              |
| `response_received`  | `{ questionId, count, correctCount }` | Servidor (agregado, sin PII) |
| `question_closed`    | `{ questionId, stats }`               | Profesor                     |

Solo el profesor ve el detalle por alumno.

## Vinculación con intentos

Cada respuesta manual ejecuta el mismo pipeline que un ejercicio normal:

```
live_session_response
  └── attempt_id → attempts
        ├── source = 'live_session'
        ├── source_id = live_session_question.id
        ├── classroom_id = live_session.classroom_id
        └── dispara recálculo de concept_mastery
```

Esto permite que una sesión en vivo en «Fracciones equivalentes» actualice el mastery igual que practicar en modo personal.

## Selección de preguntas

- **Manual**: el profesor elige ejercicios de un banco filtrado por `concept_id`.
- **Automática** (fase 2): el sistema propone N ejercicios de dificultad creciente para el concepto.
- Reutiliza definiciones de `exercises` y widgets del Exercise Engine.

## Seguridad

- Solo miembros del aula (`classroom_members`) aparecen en la lista de marcado.
- Solo el `host_id` (profesor) puede cambiar estado y lanzar preguntas.
- RLS: profesor inserta respuestas en modo manual para alumnos del aula.

## Post-sesión

- Resumen para el profesor: % acierto por pregunta, por alumno, por concepto.
- Opción «Asignar refuerzo» a alumnos bajo umbral → dispara assignment manual o regla.
- Los datos persisten; la sesión es reproducible en informe.

## Rutas de UI

```
/aulas/[id]/sesiones/nueva          → configurar y crear
/aulas/[id]/sesiones/[sid]          → panel profesor (host)
```

## Testing

| Capa           | Qué                                                     |
| -------------- | ------------------------------------------------------- |
| Vitest         | Transiciones de estado, agregación de respuestas        |
| Vitest         | Modo manual → attempt con `submitted_by=teacher`        |
| Integración    | Realtime + Server Action (Supabase local)               |
| E2E Playwright | Flujo completo: host lanza, profesor marca, resultados |

## Documentos relacionados

- `exercises.md` — widgets reutilizados
- `learning-model.md` — mastery tras sesión
- `classrooms.md` — contexto de aula
- `assignment-rules.md` — refuerzo post-sesión automático
- `security.md` — RLS de sesiones
