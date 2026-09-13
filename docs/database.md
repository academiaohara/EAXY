# Modelo de datos

Esquema lógico para PostgreSQL (Supabase). Los nombres de tablas y columnas son propuesta inicial; pueden ajustarse en migraciones.

## Principios

1. **Intentos append-only** — `attempts` solo admite INSERT; nunca UPDATE del resultado.
2. **Progreso del estudiante** — `concept_mastery` pertenece a `student_id`, no a `classroom_id`.
3. **Contexto de aula** — tablas de aula referencian progreso del estudiante, no lo duplican.
4. **Auditoría** — ejecuciones de reglas, propuestas y cambios de estado quedan registrados.
5. **RLS en todas las tablas** con datos de usuario (ver `security.md`).

## Diagrama entidad-relación (simplificado)

```
auth.users ──< profiles
profiles ──< student_profiles ──< student_credentials
profiles ──< teacher_profiles

concepts ──< concept_prerequisites (grafo)
courses ──< units ──< lessons ──< content_items
content_items ──> exercises (1:N o embebido según tipo)

profiles (student) ──< attempts ──> exercises
profiles (student) ──< concept_mastery ──> concepts

classrooms ──< classroom_members ──> profiles
classrooms ──< assignments ──> content_items / exercises
classrooms ──< assignment_rules
assignment_rules ──< assignment_rule_runs ──> assignments (propuestas)

classrooms ──< live_sessions ──< live_session_questions
live_sessions ──< live_session_participants
live_session_questions ──< live_session_responses ──> attempts
```

## Identidad y perfiles

### Tipos de cuenta (decisión aprobada)

| `account_origin`      | Creado por                                    | Auth                                            | Datos de contacto                          |
| --------------------- | --------------------------------------------- | ----------------------------------------------- | ------------------------------------------ |
| `self_registered`     | El propio usuario (adulto)                    | Email + contraseña                              | Email en `auth.users`                      |
| `teacher_provisioned` | Profesor en un aula (alta masiva por nombres) | Usuario + contraseña (generados por el sistema) | **Ninguno** — sin email/teléfono del menor |

Los alumnos menores usan siempre `teacher_provisioned`. El registro público solo crea cuentas `self_registered`.

### `profiles`

Extiende `auth.users`. Un usuario puede tener rol de estudiante y/o profesor.

| Columna        | Tipo               | Notas                                             |
| -------------- | ------------------ | ------------------------------------------------- |
| id             | uuid PK            | = `auth.users.id`                                 |
| display_name   | text               | Para provisionados: nombre corto («Ana M.»)       |
| avatar_url     | text               | nullable                                          |
| locale         | text               | default `'es'`                                    |
| account_origin | enum               | `self_registered`, `teacher_provisioned`          |
| is_minor       | boolean            | `true` para provisionados en MVP; default `false` |
| created_at     | timestamptz        |                                                   |
| created_by     | uuid FK → profiles | nullable; profesor que provisionó la cuenta       |

### `student_profiles`

Datos específicos de estudiante. Un adulto autoregistrado y un alumno provisionado tienen fila aquí.

| Columna                     | Tipo                  | Notas                                               |
| --------------------------- | --------------------- | --------------------------------------------------- |
| profile_id                  | uuid PK FK → profiles |                                                     |
| provisioned_in_classroom_id | uuid FK → classrooms  | nullable; aula de alta inicial                      |
| provisioned_at              | timestamptz           | nullable                                            |
| can_use_personal_mode       | boolean               | default `false`; `true` solo para `self_registered` |

### `teacher_profiles`

Datos específicos de profesor. Un usuario puede tener fila aquí además de `student_profiles`.

| Columna    | Tipo                  | Notas |
| ---------- | --------------------- | ----- |
| profile_id | uuid PK FK → profiles |       |

### `student_credentials`

Credenciales de acceso para alumnos provisionados. El login es **exclusivamente username + contraseña**. La contraseña existe en dos sitios con propósitos distintos:

1. **Supabase Auth** — hash unidireccional para validar el login (`signInWithPassword`).
2. **`password_encrypted`** — copia cifrada de forma **reversible** para que el profesor pueda recuperarla e imprimir tarjetas de acceso.

| Columna                    | Tipo                  | Notas                                                     |
| -------------------------- | --------------------- | --------------------------------------------------------- |
| student_id                 | uuid PK FK → profiles |                                                           |
| username                   | text                  | Secuencial global (`XY000001`…); **único en toda la plataforma** |
| classroom_scope_id         | uuid FK → classrooms  | Aula de alta inicial; autorización y regeneración         |
| password_encrypted         | text                  | Contraseña cifrada con AES-256-GCM (ver `security.md`)    |
| password_encrypted_version | smallint              | Versión del esquema de cifrado; permite rotación de clave |
| auth_email_internal        | text                  | Email sintético en `auth.users`; no es dato del menor     |
| last_password_reset_by     | uuid FK → profiles    | Profesor que regeneró la contraseña                       |
| last_password_reset_at     | timestamptz           |                                                           |
| created_at                 | timestamptz           |                                                           |
| updated_at                 | timestamptz           |                                                           |

**Índices:** `UNIQUE (username)` (global; permite login sin seleccionar aula).

**Generación automática (alta masiva):**

| Campo                               | Regla                                                                                                                       |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `username`                          | Secuencial global: `XY000001`, `XY000002`, … (prefijo `XY` + 6 dígitos) |
| Contraseña (plano, antes de cifrar) | Aleatoria; alfabeto sin caracteres ambiguos (`0`/`O`, `1`/`l`/`I`); longitud ~10–12 caracteres                              |

**Notas de implementación:**

- `auth_email_internal` replica el email sintético (`{uuid}@students.internal.eaxy`) para resolución username → auth sin exponerlo al cliente.
- El login: alumno introduce `username` + `password` → Server Action resuelve username → email interno → `signInWithPassword`.
- `password_encrypted` **nunca** es legible vía RLS ni desde el cliente; solo Server Actions autorizadas descifran (ver `security.md`).
- El alumno **no puede** cambiar su contraseña. Solo el profesor regenera (actualiza Supabase Auth + `password_encrypted`).
- Regenerar invalida la contraseña anterior en Supabase Auth de inmediato.

## Catálogo curricular

### `concepts`

Nodo del grafo de conocimiento. Unidad atómica para mastery y recomendaciones.

| Columna     | Tipo               | Notas                            |
| ----------- | ------------------ | -------------------------------- |
| id          | uuid PK            |                                  |
| slug        | text UNIQUE        | p. ej. `fracciones-equivalentes` |
| title       | text               |                                  |
| description | text               |                                  |
| parent_id   | uuid FK → concepts | nullable; jerarquía opcional     |
| sort_order  | int                |                                  |
| metadata    | jsonb              | tags, nivel ESO, etc.            |

### `concept_prerequisites`

Aristas del grafo: concepto B requiere dominio mínimo en A.

| Columna         | Tipo         |
| --------------- | ------------ |
| concept_id      | uuid FK      |
| prerequisite_id | uuid FK      |
| min_mastery     | numeric(4,3) | umbral 0–1 |

### `courses`, `units`, `lessons`

Jerarquía de contenido publicado. En **producción** el catálogo vive en BD; JSON en repo solo para seeds y CI.

```
course (Matemáticas 1º ESO)
  └── unit (Números naturales)
        └── lesson (Introducción)
              └── content_items[]
```

Campos relevantes en `courses` y `units`:

| Tabla                 | Columna             | Notas                                                                         |
| --------------------- | ------------------- | ----------------------------------------------------------------------------- |
| `courses`             | `unit_lock_enabled` | boolean; si `true`, las unidades exigen completar la anterior (modo personal) |
| `units`               | `lock_override`     | nullable; permite desbloquear/bloquear unidad concreta                        |
| `classrooms.settings` | `unit_lock_enabled` | override por aula; hereda del curso si no se define                           |

### `content_items`

Pieza de contenido polimórfica.

| Columna     | Tipo    | Notas                                       |
| ----------- | ------- | ------------------------------------------- |
| id          | uuid PK |                                             |
| lesson_id   | uuid FK |                                             |
| type        | enum    | `video`, `reading`, `exercise_set`, `mixed` |
| title       | text    |                                             |
| payload     | jsonb   | URL vídeo, markdown, referencia a exercises |
| concept_ids | uuid[]  | conceptos que cubre                         |
| sort_order  | int     |                                             |

### `exercises`

Definición de un ejercicio interactivo (esquema validado por Zod en app).

| Columna         | Tipo     | Notas                                             |
| --------------- | -------- | ------------------------------------------------- |
| id              | uuid PK  |                                                   |
| content_item_id | uuid FK  | nullable si ejercicio suelto                      |
| concept_ids     | uuid[]   | conceptos evaluados                               |
| type            | text     | `tap_select`, `number_input`, etc.                |
| schema_version  | int      |                                                   |
| definition      | jsonb    | enunciado, opciones, respuesta correcta, feedback |
| difficulty      | smallint | 1–5                                               |
| points          | numeric  | peso para mastery                                 |

## Aprendizaje y progreso

### `attempts` (append-only)

Cada interacción evaluable genera un intento. **Nunca se actualiza el resultado.**

| Columna       | Tipo               | Notas                                                      |
| ------------- | ------------------ | ---------------------------------------------------------- |
| id            | uuid PK            |                                                            |
| student_id    | uuid FK → profiles |                                                            |
| exercise_id   | uuid FK            |                                                            |
| source        | enum               | `personal`, `assignment`, `live_session`, `recommendation` |
| source_id     | uuid               | ID de assignment, live_session_question, etc.              |
| classroom_id  | uuid FK            | nullable; contexto si aplica                               |
| response      | jsonb              | respuesta del alumno                                       |
| is_correct    | boolean            |                                                            |
| score         | numeric            | 0–1 normalizado                                            |
| time_spent_ms | int                | nullable                                                   |
| metadata      | jsonb              | explicación, versión del ejercicio                         |
| created_at    | timestamptz        |                                                            |

Índices: `(student_id, exercise_id, created_at)`, `(student_id, created_at)`, `(source, source_id)`.

### `concept_mastery`

Estado derivado del dominio por estudiante y concepto. Se actualiza tras cada intento relevante.

| Columna         | Tipo         | Notas                                   |
| --------------- | ------------ | --------------------------------------- |
| student_id      | uuid FK      | PK compuesta                            |
| concept_id      | uuid FK      | PK compuesta                            |
| mastery         | numeric(4,3) | 0–1                                     |
| confidence      | numeric(4,3) | basado en nº y consistencia de intentos |
| attempt_count   | int          |                                         |
| correct_count   | int          |                                         |
| last_attempt_at | timestamptz  |                                         |
| updated_at      | timestamptz  |                                         |

> El historial detallado vive en `attempts`; esta tabla es la vista materializada para consultas rápidas.

### `learning_paths` (opcional, fase 2)

Registro de qué lecciones ha completado un estudiante (además del mastery por concepto).

| Columna      | Tipo                         |
| ------------ | ---------------------------- |
| student_id   | uuid FK                      |
| lesson_id    | uuid FK                      |
| status       | enum: `started`, `completed` |
| completed_at | timestamptz                  |

## Aulas

### `classrooms`

| Columna             | Tipo               | Notas                                                                               |
| ------------------- | ------------------ | ----------------------------------------------------------------------------------- |
| id                  | uuid PK            |                                                                                     |
| teacher_id          | uuid FK → profiles | creador / titular                                                                   |
| name                | text               |                                                                                     |
| slug                | text               | Identificador corto del aula (referencia interna; no es método de login de alumnos) |
| assignment_mode     | enum               | `auto`, `approval`, `manual` (default del aula)                                     |
| settings            | jsonb              | preferencias; incl. `unit_lock_enabled` (bloqueo por unidad)                        |
| reference_course_id | uuid FK → courses  | nullable; curso de referencia del aula                                              |
| archived_at         | timestamptz        | nullable                                                                            |

### `classroom_members`

| Columna      | Tipo               | Notas                                  |
| ------------ | ------------------ | -------------------------------------- |
| classroom_id | uuid FK            | PK compuesta                           |
| profile_id   | uuid FK            | PK compuesta                           |
| role         | enum               | `teacher`, `student`                   |
| joined_at    | timestamptz        |                                        |
| added_by     | uuid FK → profiles | nullable; quién dio de alta al miembro |

Un estudiante puede estar en N aulas. **Co-docencia aprobada:** un aula puede tener varios `teacher` con los mismos permisos.

## Asignaciones

### `assignments`

Tarea concreta para uno o varios alumnos de un aula.

| Columna         | Tipo               | Notas                                                           |
| --------------- | ------------------ | --------------------------------------------------------------- |
| id              | uuid PK            |                                                                 |
| classroom_id    | uuid FK            |                                                                 |
| created_by      | uuid FK → profiles | profesor o sistema (`rule_engine`)                              |
| type            | enum               | `task`, `reinforcement`, `recovery`, `advance`, `recommended`   |
| title           | text               |                                                                 |
| content_item_id | uuid FK            | nullable                                                        |
| exercise_ids    | uuid[]             | nullable; subconjunto                                           |
| concept_ids     | uuid[]             | conceptos objetivo                                              |
| status          | enum               | `draft`, `pending_approval`, `active`, `completed`, `cancelled` |
| due_at          | timestamptz        | nullable                                                        |
| origin          | enum               | `manual`, `rule`                                                |
| rule_run_id     | uuid FK            | nullable                                                        |
| metadata        | jsonb              |                                                                 |

### `assignment_targets`

Quién debe completar la asignación.

| Columna       | Tipo                                   |
| ------------- | -------------------------------------- |
| assignment_id | uuid FK                                |
| student_id    | uuid FK                                |
| status        | enum: `pending`, `in_progress`, `done` |
| completed_at  | timestamptz                            |

## Reglas de asignación

### `assignment_rules`

| Columna       | Tipo    | Notas                                             |
| ------------- | ------- | ------------------------------------------------- |
| id            | uuid PK |                                                   |
| classroom_id  | uuid FK |                                                   |
| name          | text    |                                                   |
| enabled       | boolean |                                                   |
| priority      | int     | orden de evaluación                               |
| trigger       | enum    | `after_attempt`, `scheduled`, `on_mastery_change` |
| conditions    | jsonb   | ver `assignment-rules.md`                         |
| action        | jsonb   | tipo + contenido a asignar                        |
| mode_override | enum    | nullable; hereda del aula si null                 |
| created_by    | uuid FK |                                                   |

### `assignment_rule_runs`

Auditoría de cada evaluación.

| Columna        | Tipo        |
| -------------- | ----------- |
| id             | uuid PK     |
| rule_id        | uuid FK     |
| student_id     | uuid FK     |
| evaluated_at   | timestamptz |
| conditions_met | boolean     |
| result         | jsonb       | propuesta generada o motivo de skip |
| assignment_id  | uuid FK     | nullable                            |

## Sesiones en vivo

### `live_sessions`

| Columna      | Tipo               | Notas                                                                             |
| ------------ | ------------------ | --------------------------------------------------------------------------------- |
| id           | uuid PK            |                                                                                   |
| classroom_id | uuid FK            |                                                                                   |
| host_id      | uuid FK → profiles | profesor                                                                          |
| concept_id   | uuid FK            | foco principal                                                                    |
| mode         | enum               | `mobile`, `manual`                                                                |
| status       | enum               | `lobby`, `active`, `question`, `results`, `ended`                                 |
| join_code    | text               | 6 caracteres                                                                      |
| settings     | jsonb              | `feedback_timing`: `on_close` (default) \| `immediate`; tiempo por pregunta, etc. |
| started_at   | timestamptz        |                                                                                   |
| ended_at     | timestamptz        |                                                                                   |

### `live_session_questions`

| Columna         | Tipo                                |
| --------------- | ----------------------------------- |
| id              | uuid PK                             |
| live_session_id | uuid FK                             |
| exercise_id     | uuid FK                             |
| sort_order      | int                                 |
| status          | enum: `pending`, `active`, `closed` |
| opened_at       | timestamptz                         |
| closed_at       | timestamptz                         |

### `live_session_participants`

| Columna         | Tipo                                   |
| --------------- | -------------------------------------- |
| live_session_id | uuid FK                                |
| student_id      | uuid FK                                |
| joined_at       | timestamptz                            |
| device_mode     | enum: `mobile`, `absent` (modo manual) |

### `live_session_responses`

Puente entre sesión en vivo e intentos.

| Columna      | Tipo               | Notas                |
| ------------ | ------------------ | -------------------- |
| id           | uuid PK            |                      |
| question_id  | uuid FK            |                      |
| student_id   | uuid FK            |                      |
| attempt_id   | uuid FK → attempts | siempre vinculado    |
| response     | jsonb              |                      |
| is_correct   | boolean            |                      |
| submitted_by | enum               | `student`, `teacher` |
| created_at   | timestamptz        |                      |

## Recomendaciones (log opcional)

Las recomendaciones se calculan on-demand, pero conviene persistir explicaciones para el estudiante.

### `recommendation_logs`

| Columna         | Tipo                                                        |
| --------------- | ----------------------------------------------------------- |
| id              | uuid PK                                                     |
| student_id      | uuid FK                                                     |
| rule_id         | text                                                        | identificador de regla determinista  |
| concept_id      | uuid FK                                                     |
| action          | enum: `practice`, `reinforce`, `recover`, `advance`, `rest` |
| explanation     | jsonb                                                       | texto + datos que motivaron la regla |
| content_item_id | uuid FK                                                     | nullable                             |
| created_at      | timestamptz                                                 |
| dismissed_at    | timestamptz                                                 | nullable                             |

## Enumeraciones resumidas

```sql
-- account_origin
'self_registered' | 'teacher_provisioned'

-- attempt_source
'personal' | 'assignment' | 'live_session' | 'recommendation'

-- assignment_type
'task' | 'reinforcement' | 'recovery' | 'advance' | 'recommended'

-- assignment_mode (aula / regla)
'auto' | 'approval' | 'manual'

-- live_session_mode
'mobile' | 'manual'
```

## Migraciones y seeds

- Migraciones en `supabase/migrations/` con numeración secuencial.
- Seed de desarrollo: curso demo, ~20 conceptos, 5 tipos de ejercicio, 1 aula de prueba.
- Tipos TypeScript generados con `supabase gen types typescript`.

## Documentos relacionados

- `learning-model.md` — semántica de mastery
- `classrooms.md` — uso de tablas de aula
- `assignment-rules.md` — formato de `conditions` y `action`
- `live-sessions.md` — ciclo de vida de sesión
- `security.md` — políticas RLS por tabla
