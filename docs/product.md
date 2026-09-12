# Producto

## Visión

Eaxy es una plataforma web de aprendizaje adaptativo de matemáticas para ESO y bachillerato inicial. El estudiante aprende haciendo: lecciones cortas, vídeos, ejercicios interactivos y feedback inmediato. El sistema adapta el recorrido según el dominio de cada concepto, sin depender de IA en las primeras fases.

## Dos modos de uso

La plataforma no obliga a elegir un modo único, pero **el tipo de cuenta determina qué modos están disponibles** (ver sección «Tipos de cuenta y menores de edad»).

### 1. Aprendizaje personal

Dirigido a **usuarios adultos con registro público** (email + contraseña). Acceden sin profesor a un **curso completo de matemáticas**:

- Vídeos y lecciones estructuradas por unidades y temas.
- Ejercicios interactivos con validación inmediata.
- Progreso y dominio (**mastery**) propios del estudiante.
- Recomendaciones automáticas de qué practicar, reforzar o avanzar.
- Navegación **libre** por el curso, con bloqueo opcional por unidad (configurable por curso).

El progreso **pertenece al estudiante** y persiste aunque no pertenezca a ninguna aula.

### 2. Aprendizaje en aulas (con profesor)

Un estudiante puede pertenecer a **una o varias aulas**. Las aulas no reemplazan el progreso personal; lo **contextualizan** con la capa docente:

| Capacidad docente | Descripción |
|---|---|
| Tareas | Asignaciones explícitas de contenido o ejercicios |
| Refuerzo | Práctica dirigida sobre conceptos débiles |
| Recuperación | Recorrido para recuperar conceptos no dominados |
| Avance | Propuesta de avanzar cuando el dominio lo permite |
| Material recomendado | Contenido sugerido por el profesor |
| Seguimiento | Vista agregada del progreso por alumno y por aula |

El profesor puede trabajar en tres niveles de automatización para las asignaciones automáticas (ver `assignment-rules.md`):

1. **Automático** — las reglas generan asignaciones sin intervención.
2. **Requiere aprobación** — las reglas proponen; el profesor confirma o rechaza.
3. **Manual** — el profesor asigna todo a mano; las reglas están desactivadas.

## Sesiones en vivo

Complemento del aula, no un producto aparte. El profesor lanza una sesión en tiempo real (estilo Kahoot) sobre un concepto; los alumnos responden desde el móvil o el profesor marca aciertos/errores manualmente. Todas las respuestas alimentan el mismo historial de intentos y mastery que el resto de la plataforma (ver `live-sessions.md`).

## Tipos de cuenta y menores de edad

Decisión aprobada para el MVP:

| Tipo de cuenta | Cómo se crea | Modos disponibles | Datos de contacto |
|---|---|---|---|
| **Adulto (autoregistro)** | Registro público con email + contraseña u OAuth (Google) | Modo personal; puede ser profesor y gestionar aulas | Email del proveedor OAuth o email propio |
| **Estudiante provisionado** | Siempre por un profesor dentro de un aula (alta masiva por lista de nombres) | Solo aulas (y progreso personal asociado a su cuenta) | **Ninguno** — sin email, teléfono ni datos de contacto del menor |

### Estudiantes menores: sin registro público

En el MVP, **los estudiantes menores de edad no se registran públicamente**. Sus cuentas las crea el profesor al dar de alta alumnos en un aula. Eaxy **no recoge datos de contacto del menor** (ni email, ni teléfono, ni dirección).

El acceso del alumno provisionado no depende de un email propio. El **único método de login** es **usuario + contraseña**, generados automáticamente por el sistema cuando el profesor da de alta alumnos (ver flujo de alta masiva abajo).

### Alta masiva de alumnos

Al crear o editar un aula, el profesor introduce una **lista de nombres** (pegado o escritura manual). Para cada nombre, Eaxy genera automáticamente:

- **Username** — derivado del nombre (normalizado, sin acentos; sufijo numérico si hay colisión: `laura.garcia`, `laura.garcia2`).
- **Contraseña** — aleatoria, con alfabeto apto para transcribir a mano en el aula (sin caracteres ambiguos como `0`/`O`, `1`/`l`).

El profesor consulta las credenciales en una **tabla persistente** del aula (exportar/imprimir tarjetas de acceso en cualquier momento, no solo al crear). Solo el profesor puede **regenerar** una contraseña (invalida la anterior). El alumno **no puede cambiar** su contraseña.

Detalle técnico del flujo de auth y cifrado en `security.md`; modelo de datos en `database.md`.

### Google OAuth (adultos)

Un usuario que entra con **Google** se trata como adulto autoregistrado (`account_origin = self_registered`). Puede:

- Acceder al modo de aprendizaje personal.
- Convertirse en profesor y crear/gestionar aulas y alumnos provisionados.

**No puede** usar su cuenta de Google para entrar como **alumno** de un aula existente. El rol de alumno en un aula es **exclusivamente** mediante las credenciales provisionadas (username + contraseña) que genera el profesor.

### Implicaciones de producto

- El registro público (`/registro`) y OAuth Google quedan reservados para **adultos** (aprendizaje personal y/o rol de profesor).
- Un menor solo entra a Eaxy si un profesor le ha creado cuenta en un aula.
- El progreso (mastery, intentos) sigue siendo **del estudiante**, aunque la cuenta haya sido creada por un profesor.
- Las recomendaciones personales están disponibles para cuentas provisionadas, pero el recorrido principal en MVP será el contexto del aula.

## Principios de producto

1. **Progreso del estudiante primero** — el mastery es atributo del alumno, no del aula.
2. **Historial inmutable** — los intentos no se sobrescriben; solo se añaden.
3. **Trazabilidad** — cada recomendación y asignación automática debe poder explicarse.
4. **Sin IA en MVP** — recomendaciones y reglas deterministas basadas en umbrales y condiciones explícitas.
5. **Móvil usable** — especialmente en sesiones en vivo y ejercicios táctiles.
6. **Español** — interfaz y contenido visible al usuario en español.
7. **Privacidad de menores** — cuentas provisionadas sin recogida de datos de contacto; el profesor actúa como responsable del alta en el aula.

## Personas

| Persona | Tipo de cuenta | Objetivo principal |
|---|---|---|
| Estudiante adulto (solo) | Autoregistro | Aprender a su ritmo con el curso completo en modo personal |
| Estudiante (en aula) | Provisionado por profesor | Cumplir tareas del aula, practicar y ver su progreso |
| Profesor | Autoregistro u OAuth Google | Gestionar aulas, alta masiva de alumnos, asignar tareas, seguir mastery, sesiones en vivo |
| Admin (futuro) | Autoregistro / invitación | Gestionar catálogo de cursos, conceptos y usuarios de centro |

## Fuera de alcance inicial

- IA generativa o modelos de recomendación opacos.
- Pagos y suscripciones.
- Otras materias distintas de matemáticas.
- Apps nativas (web responsive primero).
- Integración con LMS externos (fase posterior).
- Registro público de menores de edad.
- Recogida de email, teléfono u otros datos de contacto de alumnos provisionados.

## Documentos relacionados

- `architecture.md` — diseño técnico global
- `security.md` — autenticación, menores y RLS
- `database.md` — modelo de datos (`student_credentials`, etc.)
- `learning-model.md` — conceptos y mastery
- `classrooms.md` — aulas y asignaciones
- `assignment-rules.md` — motor de reglas automáticas
- `live-sessions.md` — sesiones en vivo
- `roadmap.md` — fases de implementación
