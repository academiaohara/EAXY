# Sesiones en vivo

Actividad en tiempo real tipo Kahoot integrada en el aula. Las respuestas alimentan el **mismo sistema de intentos y mastery** que el resto de la plataforma.

## Dos modos

| Modo | Quién responde | Caso de uso |
|---|---|---|
| `mobile` | Cada alumno desde su móvil | Aula con dispositivos |
| `manual` | El profesor marca acierto/fallo por alumno | Sin móviles, pizarra, oral |

En ambos modos se crea un `attempt` y un `live_session_response` vinculados.

## Ciclo de vida

```
lobby → active → question → results → question → ... → ended
```

| Estado | Descripción |
|---|---|
| `lobby` | Alumnos se unen con código; profesor espera |
| `active` | Sesión en curso; sin pregunta visible aún |
| `question` | Pregunta actual abierta; alumnos responden o profesor marca |
| `results` | Resultados agregados visibles; profesor decide siguiente paso |
| `ended` | Sesión cerrada; mastery ya actualizado |

## Flujo modo móvil

```
1. Profesor: «Iniciar sesión» → live_session (mode=mobile, join_code)
2. Alumnos: /unirse/[codigo] → live_session_participants
3. Profesor: selecciona ejercicios o banco por concepto → live_session_questions
4. Profesor: «Lanzar pregunta» → status=question, Realtime broadcast
5. Alumno: ve enunciado en móvil → responde → Server Action
     → checkAnswer → INSERT attempt + live_session_response
6. Profesor: dashboard con respuestas en tiempo real (conteo, % acierto)
7. Profesor: «Cerrar pregunta» → status=results, muestra ranking opcional
8. Repetir 4–7 o «Finalizar sesión»
```

### UI alumno (móvil)

- Pantalla mínima: enunciado + widget de ejercicio + botón enviar.
- Sin navegación del curso; solo la pregunta activa.
- Feedback al alumno **configurable por sesión**. **Default aprobado: al cerrar la pregunta** (no inmediato al enviar). El profesor puede activar feedback inmediato si lo prefiere.

### UI profesor

- Panel: lista de alumnos conectados, pregunta actual, barra de progreso de respuestas.
- Gráfico de distribución de respuestas (para `tap_select`: barras por opción).
- Temporizador opcional por pregunta.

## Flujo modo manual

```
1. Profesor: sesión (mode=manual)
2. No requiere que alumnos tengan dispositivo
3. Profesor: lanza pregunta (proyectable en pantalla grande)
4. Profesor: lista de alumnos del aula con toggle ✓ / ✗ por cada uno
5. Por cada marca:
     → genera response sintética → checkAnswer o override directo
     → INSERT attempt (submitted_by=teacher) + live_session_response
6. Resultados agregados igual que en modo móvil
```

### Respuesta sintética (modo manual)

Cuando el profesor marca manualmente, la `response` puede ser:

```json
{ "manual": true, "markedCorrect": true }
```

El `score` se toma del marcado (`1.0` o `0.0`). El `exercise_id` sigue vinculado para trazabilidad del concepto evaluado.

## Tiempo real

### Tecnología

**Supabase Realtime** en canal `live_session:{id}`.

### Eventos broadcast

| Evento | Payload | Quién emite |
|---|---|---|
| `session_state` | `{ status, currentQuestionId }` | Profesor (host) |
| `participant_joined` | `{ studentId, name }` | Sistema |
| `response_received` | `{ questionId, count, correctCount }` | Servidor (agregado, sin PII) |
| `question_closed` | `{ questionId, stats }` | Profesor |

Los alumnos **no** reciben las respuestas individuales de otros; solo el profesor ve el detalle.

## Vinculación con intentos

Cada respuesta (móvil o manual) ejecuta el mismo pipeline que un ejercicio normal:

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

## Códigos de unión

- `join_code`: 6 caracteres alfanuméricos (sin ambigüedad: sin O/0, I/1).
- Válido solo mientras `status != ended`.
- Un alumno puede unirse desde `/unirse/[codigo]` autenticado.

## Seguridad

- Solo miembros del aula (`classroom_members`) pueden unirse.
- Solo el `host_id` (profesor) puede cambiar estado y lanzar preguntas.
- RLS: alumnos solo insertan sus propias respuestas; profesor puede insertar en modo manual para cualquier alumno del aula.

## Post-sesión

- Resumen para el profesor: % acierto por pregunta, por alumno, por concepto.
- Opción «Asignar refuerzo» a alumnos bajo umbral → dispara assignment manual o regla.
- Los datos persisten; la sesión es reproducible en informe.

## Rutas de UI

```
/aulas/[id]/sesiones/nueva          → configurar y crear
/aulas/[id]/sesiones/[sid]          → panel profesor (host)
/unirse/[codigo]                    → lobby alumno / unión
/sesion/[sid]/pregunta              → vista alumno móvil
```

## Testing

| Capa | Qué |
|---|---|
| Vitest | Transiciones de estado, agregación de respuestas |
| Vitest | Modo manual → attempt con `submitted_by=teacher` |
| Integración | Realtime + Server Action (Supabase local) |
| E2E Playwright | Flujo completo: host lanza, alumno responde, resultados |

## Documentos relacionados

- `exercises.md` — widgets reutilizados
- `learning-model.md` — mastery tras sesión
- `classrooms.md` — contexto de aula
- `assignment-rules.md` — refuerzo post-sesión automático
- `security.md` — RLS de sesiones
