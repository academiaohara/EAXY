# Aulas y asignaciones

## Modelo mental

Un **aula** es un contenedor docente que agrupa estudiantes y profesores. No es un curso: es un **contexto** sobre el progreso personal de cada alumno.

```
Estudiante Ana
├── Progreso personal (global)
│     mastery: fracciones 0.72, enteros 0.55, ...
├── Aula «1º A Mates» (profesor: Luis)
│     asignaciones, reglas, sesiones en vivo
└── Aula «Refuerzo tardes» (profesor: María)
      asignaciones distintas, mismas mastery globales
```

## Roles

| Rol       | Permisos                                                                                                                         |
| --------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `teacher` | Crear/editar aula, invitar alumnos, asignar tareas, configurar reglas, lanzar sesiones en vivo, ver progreso de alumnos del aula |
| `student` | Ver asignaciones del aula, completar tareas, unirse a sesiones en vivo, ver su propio progreso                                   |

Un usuario puede ser profesor en unas aulas y estudiante en otras.

## Ciclo de vida del aula

1. **Creación** — el profesor crea el aula (nombre, curso de referencia opcional, bloqueo por unidad opcional).
2. **Alta de alumnos** — el profesor introduce una lista de nombres; el sistema genera username + contraseña para cada uno (alta masiva). Sin email del menor. Los alumnos acceden solo con esas credenciales provisionadas, no vía OAuth ni autoregistro. Ver `security.md`.
3. **Co-docencia** — el profesor titular puede añadir otros profesores con los mismos permisos.
4. **Actividad** — asignaciones manuales, automáticas o sesiones en vivo.
5. **Archivado** — el aula deja de aceptar nuevas actividades; datos históricos se conservan.

## Asignaciones (`assignments`)

### Tipos

| Tipo            | Propósito                                      | Origen típico  |
| --------------- | ---------------------------------------------- | -------------- |
| `task`          | Tarea explícita del profesor                   | Manual         |
| `reinforcement` | Practicar concepto con mastery bajo            | Regla o manual |
| `recovery`      | Recuperar concepto no dominado tras evaluación | Regla o manual |
| `advance`       | Avanzar a siguiente unidad/concepto            | Regla o manual |
| `recommended`   | Material sugerido, sin fecha límite estricta   | Manual o regla |

### Estados

```
draft → pending_approval → active → completed
                ↓
            cancelled
```

- `pending_approval`: generada por regla en modo `approval`; el profesor debe confirmar.
- `active`: visible para el alumno.
- `completed`: todos los `assignment_targets` en `done` o fecha vencida.

### Destinatarios

- **Aula completa** — todos los `classroom_members` con rol `student`.
- **Subconjunto** — lista explícita de `student_id` en `assignment_targets`.
- **Individual** — regla que apunta a un alumno que cumple condición.

### Relación con contenido

Una asignación referencia (decisión aprobada: **selección manual en MVP**):

- `content_item_id` (lección o set de ejercicios completo), o
- `exercise_ids[]` (ejercicios sueltos elegidos por el profesor).

La auto-selección de ejercicios por `concept_ids` (el sistema elige del banco) llega en **fase 4** junto con assignment rules avanzadas.

## Vista del profesor

### Dashboard del aula

- Lista de alumnos con mastery agregado por conceptos del curso de referencia.
- Asignaciones activas y pendientes de aprobación.
- Acceso rápido a «nueva tarea», «configurar reglas», «iniciar sesión en vivo».

### Seguimiento por alumno

- Mapa de conceptos (semáforo por estado cualitativo).
- Historial de intentos recientes (filtrable por concepto, asignación, sesión).
- Línea temporal de mastery (fase 2).

### Seguimiento por concepto

- Distribución del aula: cuántos alumnos en cada estado (`struggling`, `developing`, etc.).
- Lista de alumnos por debajo de umbral → acción rápida «asignar refuerzo».

## Vista del estudiante

- Pestaña **Mi curso** — aprendizaje personal (sin aula).
- Pestaña **Mis aulas** — lista de aulas; dentro de cada una:
  - Tareas pendientes y completadas.
  - Material recomendado.
  - Enlace a sesión en vivo activa.

El estudiante siempre ve **su** mastery global; en contexto de aula puede ver además qué tareas tiene pendientes.

## Modos de asignación del aula

Configuración a nivel de `classrooms.assignment_mode`:

| Modo       | Comportamiento                                                                     |
| ---------- | ---------------------------------------------------------------------------------- |
| `auto`     | Las reglas activas generan asignaciones directamente en estado `active`            |
| `approval` | Las reglas generan propuestas en `pending_approval`; el profesor aprueba o rechaza |
| `manual`   | Las reglas no se ejecutan; solo asignaciones manuales                              |

Cada regla puede sobreescribir el modo del aula con `mode_override`.

## Integración con otros módulos

| Módulo           | Integración                                                                |
| ---------------- | -------------------------------------------------------------------------- |
| Assignment Rules | Genera asignaciones según mastery (ver `assignment-rules.md`)              |
| Live Sessions    | Pertenece a un `classroom_id`; respuestas generan `attempts`               |
| Recommendations  | El profesor puede «fijar» una recomendación del sistema como `recommended` |
| Learning Model   | Mastery consultado, nunca duplicado por aula                               |

## Rutas de UI propuestas

```
/aulas                          → lista (profesor: sus aulas; alumno: inscritas)
/aulas/nueva                      → crear aula
/aulas/[id]                       → dashboard del aula
/aulas/[id]/alumnos               → gestión de miembros
/aulas/[id]/alumnos               → alta masiva, tabla de credenciales (exportar/imprimir)
/aulas/[id]/asignaciones          → lista + crear
/aulas/[id]/asignaciones/[aid]    → detalle
/aulas/[id]/reglas                → assignment rules
/aulas/[id]/sesiones              → live sessions
/unirse/[codigo]                  → unirse a aula o sesión
```

## Documentos relacionados

- `assignment-rules.md` — automatización
- `live-sessions.md` — sesiones en tiempo real
- `database.md` — tablas `classrooms`, `assignments`
- `security.md` — RLS por aula
