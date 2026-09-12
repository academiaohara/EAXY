# Seguridad, autenticación y autorización

## Modelo de autenticación (decisión aprobada)

Eaxy distingue **dos vías de autenticación** según el tipo de cuenta:

| Vía | Quién | Credenciales | Registro |
|---|---|---|---|
| **Autoregistro** | Adultos (estudiante personal y/o profesor) | Email + contraseña | Público en `/registro` |
| **Provisionado por profesor** | Estudiantes en aula | Usuario + contraseña (generados por el sistema) | Alta masiva por lista de nombres |

### Menores: sin registro público ni datos de contacto

En el MVP:

- **No existe** registro público para menores de edad.
- Las cuentas de alumnos las crea **siempre un profesor** mediante alta masiva en un aula.
- Eaxy **no recoge** email, teléfono ni otros datos de contacto del menor.
- El profesor comunica username y contraseña al alumno **fuera de la plataforma** (pizarra, tarjeta impresa, verbal).

## Autenticación (Supabase Auth)

### Proveedores (MVP)

| Proveedor | Uso | Notas |
|---|---|---|
| Email + contraseña | Autoregistro de adultos | Flujo estándar Supabase Auth |
| Google OAuth | Autoregistro de adultos | `account_origin = self_registered`; ver restricciones abajo |
| Usuario + contraseña (provisionado) | Alumnos creados por profesor | Único método de login para alumnos de aula |
| Magic link | — | No en MVP (requiere email del usuario) |

### Flujo de autoregistro (adultos: email o Google)

**Email + contraseña:**

1. Usuario se registra en `/registro` → `auth.users`.
2. Trigger `on_auth_user_created` → INSERT en `profiles` con `account_origin = 'self_registered'`.
3. Onboarding: elegir rol (`student` para modo personal, `teacher`, o ambos).
4. Acceso a aprendizaje personal y/o creación de aulas.

**Google OAuth:**

1. Usuario inicia sesión con Google → `auth.users` (email del proveedor).
2. Mismo trigger → `profiles` con `account_origin = 'self_registered'`.
3. Mismas capacidades que autoregistro por email: modo personal y rol de profesor.

### Google OAuth: restricciones (decisión aprobada)

Un usuario autenticado con Google **nunca** accede como **alumno** de un aula existente con esa cuenta. Concretamente:

| Permitido | No permitido |
|---|---|
| Modo de aprendizaje personal | Unirse a un aula como `student` vía OAuth |
| Crear y gestionar aulas como profesor | Sustituir credenciales provisionadas con cuenta Google |
| Dar de alta alumnos provisionados en sus aulas | Auto-inscribirse como alumno con «Continuar con Google» |

El acceso de **alumno** a un aula es **exclusivamente** mediante username + contraseña provisionados por el profesor.

### Flujo de alta masiva (estudiantes en aula)

1. Profesor autenticado abre `/aulas/[id]/alumnos` (creación o edición del aula).
2. Pega o escribe una **lista de nombres** (uno por línea).
3. Server Action `provisionStudents` (service role + verificación de teacher):
   - Por cada nombre:
     - Genera `username` (normalizado, sin acentos; sufijo numérico si colisión en el aula).
     - Genera `password` aleatoria (alfabeto sin `0`/`O`, `1`/`l`/`I`; longitud ~10–12).
     - Crea `auth.users` con email sintético interno (`{uuid}@students.internal.eaxy`).
     - Establece contraseña en Supabase Auth.
     - Cifra contraseña → `student_credentials.password_encrypted`.
     - INSERT en `profiles`, `student_profiles`, `student_credentials`, `classroom_members`.
4. Respuesta: tabla con `display_name`, `username`, `password` (en claro, solo en esta respuesta HTTP).
5. La tabla de credenciales queda **persistente** en el aula: el profesor puede consultarla, exportarla o imprimir tarjetas **en cualquier momento** (no solo al crear).

### Flujo de login provisionado (único método)

```
Alumno en /entrar → introduce username + password
  → Server Action resuelve username (por aula o global) → email sintético interno
  → supabase.auth.signInWithPassword({ email: sintético, password })
  → sesión establecida (account_origin = teacher_provisioned)
```

No existe login por código de acceso ni OAuth para alumnos provisionados.

### Cifrado reversible de contraseñas (`password_encrypted`)

El profesor debe poder **recuperar** la contraseña de un alumno en cualquier momento (p. ej. reimprimir tarjetas). Por eso, además del hash en Supabase Auth, se guarda una copia cifrada de forma reversible.

| Aspecto | Decisión |
|---|---|
| **Algoritmo** | AES-256-GCM |
| **Clave** | Variable de entorno `CREDENTIALS_ENCRYPTION_KEY` (32 bytes, base64) en el servidor Next.js |
| **Ubicación de la clave** | Solo backend; nunca en cliente, nunca en BD, nunca en `NEXT_PUBLIC_*` |
| **Formato almacenado** | `{version}:{iv}:{ciphertext}:{authTag}` (base64) en `password_encrypted` |
| **Quién descifra** | Server Action `revealStudentPassword` o `exportClassroomCredentials` |
| **Comprobación previa** | `is_classroom_teacher(classroom_id)` del aula del alumno; sesión del requestante |
| **RLS** | `student_credentials` no expone `password_encrypted` al cliente; lectura solo vía Server Action |

**Flujo de regeneración** (solo profesor):

```
Profesor solicita regenerar contraseña de alumno X
  → Server Action verifica is_classroom_teacher
  → genera nueva contraseña (mismo alfabeto)
  → actualiza Supabase Auth (invalida la anterior)
  → cifra y guarda nuevo password_encrypted
  → devuelve contraseña en claro al profesor (una vez)
```

El alumno **no puede** cambiar ni regenerar su contraseña.

### Gestión de credenciales por el profesor

| Acción | Permitido |
|---|---|
| Alta masiva por lista de nombres | Sí |
| Consultar tabla de credenciales del aula | Sí (cualquier momento) |
| Exportar / imprimir tarjetas de acceso | Sí |
| Ver contraseña en claro (descifrada) | Sí, vía Server Action autorizada |
| Regenerar contraseña | Sí (invalida la anterior) |
| Editar nombre para mostrar | Sí |
| Alumno cambia su contraseña | **No** |
| Añadir email del menor | **No en MVP** |
| Eliminar alumno del aula | Sí (soft-delete; datos de aprendizaje se conservan) |

### Co-docencia

Varios profesores (`classroom_members` con rol `teacher`) comparten los mismos permisos en el aula, incluida la gestión de alumnos provisionados.

### Sesión en Next.js

- `@supabase/ssr` con cookies httpOnly.
- Middleware en `src/middleware.ts` refresca sesión y protege rutas.
- Cliente servidor (`createServerClient`) en Server Components y Actions.
- Cliente navegador (`createBrowserClient`) solo para Realtime y auth UI.

### Rutas protegidas

| Prefijo | Requiere | Rol / cuenta |
|---|---|---|
| `/registro` | Público | Solo autoregistro adulto |
| `/entrar` | Público | Login adultos (email/Google) o alumnos (username+password) |
| `/curso`, `/practicar`, `/progreso` | Auth | `self_registered` únicamente |
| `/aulas` (gestión) | Auth | teacher (`self_registered`, incl. Google OAuth) |
| `/aulas/[id]` (como alumno) | Auth + membership | `teacher_provisioned` únicamente |
| `/aulas/[id]/alumnos` | Auth + membership | teacher (alta masiva, ver/exportar credenciales) |
| `/sesion`, `/unirse` | Auth + membership | según contexto |

Las rutas de aprendizaje personal (`/curso`, etc.) redirigen a alumnos provisionados hacia su aula si no tienen permiso de modo personal.

## Autorización: modelo de permisos

### Principio

> **RLS (Row Level Security) en PostgreSQL es la fuente de verdad.** La app no debe confiar solo en comprobaciones de UI.

### Funciones helper SQL

```sql
-- ¿Es miembro del aula con rol X?
is_classroom_member(classroom_id uuid, role text) → boolean

-- ¿Es el profesor titular o co-docente?
is_classroom_teacher(classroom_id uuid) → boolean

-- ¿Es el propio estudiante?
is_self(profile_id uuid) → boolean
```

Definidas como `SECURITY DEFINER` con `SET search_path = public`.

## Políticas RLS por tabla

### `profiles`

| Operación | Política |
|---|---|
| SELECT | Propio perfil; profesores ven perfiles de alumnos de sus aulas |
| UPDATE | Solo propio perfil |

### `attempts`

| Operación | Política |
|---|---|
| SELECT | Estudiante ve los suyos; profesor ve los de alumnos de sus aulas |
| INSERT | Estudiante inserta los suyos; profesor inserta en modo manual de sesión viva para alumnos del aula |
| UPDATE | **Denegado** (append-only) |
| DELETE | **Denegado** |

### `concept_mastery`

| Operación | Política |
|---|---|
| SELECT | Estudiante ve el suyo; profesor ve el de alumnos de sus aulas |
| INSERT/UPDATE | Solo vía función `SECURITY DEFINER` del motor de mastery (no directo desde cliente) |

### `classrooms`

| Operación | Política |
|---|---|
| SELECT | Miembros del aula |
| INSERT | Cualquier usuario autenticado (se convierte en teacher) |
| UPDATE | Solo teachers del aula |
| DELETE | Solo teacher titular; soft-delete preferido (`archived_at`) |

### `classroom_members`

| Operación | Política |
|---|---|
| SELECT | Miembros del aula |
| INSERT (student) | Teacher crea alumno provisionado (alta masiva); no vía OAuth ni autoregistro |
| INSERT (teacher) | Teacher titular añade co-docente |
| DELETE | Teacher elimina miembro; alumnos provisionados: solo teacher |

### `student_credentials`

| Operación | Política |
|---|---|
| SELECT | Profesores del aula: solo `username`, `display_name` vía join; **no** `password_encrypted` directo |
| SELECT `password_encrypted` | Denegado vía RLS; descifrado solo en Server Action con `is_classroom_teacher` |
| INSERT/UPDATE | Solo teachers del aula vía Server Action (service role) |
| DELETE | Denegado (regenerar en lugar de borrar) |

### `assignments` / `assignment_targets`

| Operación | Política |
|---|---|
| SELECT | Teachers del aula ven todo; estudiantes ven los suyos (`assignment_targets`) |
| INSERT/UPDATE | Solo teachers; excepción: sistema vía `rule_engine` role |
| DELETE | Solo teachers; preferir `cancelled` |

### `assignment_rules` / `assignment_rule_runs`

| Operación | Política |
|---|---|
| SELECT | Teachers del aula |
| INSERT/UPDATE/DELETE | Solo teachers |

### `live_sessions` y relacionadas

| Operación | Política |
|---|---|
| SELECT | Miembros del aula |
| INSERT/UPDATE estado | Solo `host_id` (profesor) |
| `live_session_responses` INSERT | Alumno: propias; profesor: cualquier alumno del aula en modo manual |

### Catálogo (`courses`, `exercises`, `concepts`)

| Operación | Política |
|---|---|
| SELECT | Cualquier usuario autenticado |
| INSERT/UPDATE/DELETE | Solo rol `admin` (fase posterior) o service role en migraciones |

## Rol de servicio

- **Service role key** solo en servidor (Server Actions, cron, migraciones).
- Nunca exponer en cliente ni en variables `NEXT_PUBLIC_*`.
- El motor de mastery y assignment-rules puede usar funciones `SECURITY DEFINER` en lugar del service role cuando sea posible.

## Validación de entrada

- Zod en todos los Server Actions.
- IDs validados como UUID; slugs con regex estricto.
- Rate limiting en acciones sensibles (unirse a aula, enviar respuesta en vivo) — fase 2 con Upstash o middleware.

## Datos sensibles y menores

- Contraseñas de login validadas por Supabase Auth (hash unidireccional).
- Copia recuperable en `password_encrypted` (AES-256-GCM); **nunca** en texto plano en BD.
- La clave `CREDENTIALS_ENCRYPTION_KEY` solo en servidor; rotación implica re-cifrado (fase posterior).
- **Alumnos provisionados:** solo `display_name` y datos de aprendizaje (intentos, mastery). Sin email, teléfono ni dirección.
- El email en `auth.users` para provisionados es **sintético e interno**; no es dato personal del menor.
- `attempts.response` puede contener respuestas de ejercicios; no PII adicional.
- Logs de servidor: no registrar contraseñas ni `password_encrypted` descifrado.
- Exportaciones del profesor incluyen credenciales descifradas solo en el acto de exportar (respuesta HTTPS al teacher autenticado).

## Entornos Supabase (decisión aprobada)

| Entorno | Cuándo | Notas |
|---|---|---|
| **Local** | Desarrollo | Supabase CLI (`supabase start`) |
| **Remoto dev** | Integración y pruebas | Un proyecto Supabase compartido del equipo |
| **Producción** | Pre-lanzamiento | Proyecto separado; no se crea en MVP |

## CSRF y Server Actions

- Next.js Server Actions incluyen protección CSRF por defecto.
- Mutaciones críticas (aprobar asignación, cerrar sesión) requieren revalidación de rol en servidor.

## Auditoría

- `assignment_rule_runs` — trazabilidad de automatización.
- `recommendation_logs` — trazabilidad de sugerencias (opcional).
- Supabase logs + errores en Sentry (fase 2).

## Checklist de seguridad pre-lanzamiento

- [ ] RLS habilitado en todas las tablas con datos de usuario
- [ ] Tests de integración que verifican que alumno A no lee datos de alumno B
- [ ] Service role key solo en entorno servidor
- [ ] Intentos append-only enforced en BD (trigger que bloquea UPDATE)
- [ ] CORS y headers de seguridad en `next.config.ts`
- [ ] Dependabot / auditoría `npm audit` en CI
- [ ] Registro público bloqueado para cuentas provisionadas (`account_origin` check)
- [ ] Verificar que formularios de alta de alumno no permiten introducir email/teléfono
- [ ] Emails sintéticos de provisionados no accesibles ni enumerables desde cliente
- [ ] `password_encrypted` no legible vía RLS ni API cliente; solo Server Actions con check de teacher
- [ ] Google OAuth no puede crear `classroom_members` con rol `student`
- [ ] Alumno provisionado no tiene UI de cambio de contraseña

## Documentos relacionados

- `database.md` — esquema
- `architecture.md` — capa de datos
- `live-sessions.md` — permisos de sesión
- `classrooms.md` — membresía
