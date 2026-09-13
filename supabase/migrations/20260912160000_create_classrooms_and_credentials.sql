-- Migration 002: classrooms, classroom_members, student_credentials + RLS
-- La función de descifrado de password_encrypted se añadirá en un paso posterior.

-- ---------------------------------------------------------------------------
-- Tipos
-- ---------------------------------------------------------------------------

create type public.classroom_member_role as enum (
  'teacher',
  'student'
);

-- ---------------------------------------------------------------------------
-- Utilidades
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- classrooms
-- ---------------------------------------------------------------------------

create table public.classrooms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  teacher_id uuid not null references public.profiles (id) on delete restrict,
  reference_course_id uuid,
  settings jsonb not null default '{"unit_lock_enabled": false}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint classrooms_settings_is_object
    check (jsonb_typeof(settings) = 'object')
);

comment on table public.classrooms is
  'Aula docente. reference_course_id enlazará con courses cuando exista esa tabla.';
comment on column public.classrooms.reference_course_id is
  'FK a courses (pendiente). Nullable hasta que exista el catálogo curricular.';
comment on column public.classrooms.settings is
  'Preferencias del aula. Incluye unit_lock_enabled (boolean, default false).';

create index classrooms_teacher_id_idx on public.classrooms (teacher_id);

create trigger classrooms_set_updated_at
  before update on public.classrooms
  for each row
  execute function public.set_updated_at();

alter table public.classrooms enable row level security;

-- ---------------------------------------------------------------------------
-- classroom_members
-- ---------------------------------------------------------------------------

create table public.classroom_members (
  id uuid primary key default gen_random_uuid(),
  classroom_id uuid not null references public.classrooms (id) on delete cascade,
  profile_id uuid not null references public.profiles (id) on delete cascade,
  role public.classroom_member_role not null,
  added_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),

  constraint classroom_members_unique_membership
    unique (classroom_id, profile_id)
);

comment on table public.classroom_members is
  'Membresía de aula. profile_id referencia profiles (alumnos y co-docentes con role teacher).';
comment on column public.classroom_members.profile_id is
  'Perfil del miembro (alumno o profesor co-docente).';

create index classroom_members_classroom_id_idx
  on public.classroom_members (classroom_id);

create index classroom_members_profile_id_idx
  on public.classroom_members (profile_id);

alter table public.classroom_members enable row level security;

-- ---------------------------------------------------------------------------
-- Helper RLS (después de classrooms y classroom_members)
-- ---------------------------------------------------------------------------

-- ¿Es profesor titular o co-docente del aula?
create or replace function public.is_classroom_teacher(target_classroom_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.classrooms c
    where c.id = target_classroom_id
      and c.teacher_id = auth.uid()
  )
  or exists (
    select 1
    from public.classroom_members cm
    where cm.classroom_id = target_classroom_id
      and cm.profile_id = auth.uid()
      and cm.role = 'teacher'
  );
$$;

comment on function public.is_classroom_teacher(uuid) is
  'Devuelve true si auth.uid() es teacher titular (classrooms.teacher_id) o co-docente (classroom_members.role = teacher).';

grant execute on function public.is_classroom_teacher(uuid) to authenticated;

-- ---------------------------------------------------------------------------
-- RLS: classrooms
-- ---------------------------------------------------------------------------

-- Profesores: ver y editar aulas donde son teacher (titular o co-docente).
-- Alumnos: solo SELECT del aula a la que pertenecen.
create policy "classrooms_select_members"
  on public.classrooms
  for select
  to authenticated
  using (
    public.is_classroom_teacher(id)
    or exists (
      select 1
      from public.classroom_members cm
      where cm.classroom_id = id
        and cm.profile_id = auth.uid()
    )
  );

create policy "classrooms_insert_as_teacher"
  on public.classrooms
  for insert
  to authenticated
  with check (teacher_id = auth.uid());

create policy "classrooms_update_teachers"
  on public.classrooms
  for update
  to authenticated
  using (public.is_classroom_teacher(id))
  with check (public.is_classroom_teacher(id));

-- ---------------------------------------------------------------------------
-- RLS: classroom_members
-- ---------------------------------------------------------------------------

-- Teachers ven todos los miembros de sus aulas; alumnos solo su propia fila.
create policy "classroom_members_select"
  on public.classroom_members
  for select
  to authenticated
  using (
    public.is_classroom_teacher(classroom_id)
    or profile_id = auth.uid()
  );

-- INSERT/UPDATE/DELETE: sin políticas en esta migración.
-- Alta masiva y co-docencia irán vía Server Action con secret key (bypass RLS).

-- ---------------------------------------------------------------------------
-- RLS: profiles (tabla creada en migración 001)
-- ---------------------------------------------------------------------------

-- Los profesores pueden leer perfiles de miembros de sus aulas (p. ej. nombres
-- de alumnos en el dashboard). Se combina en OR con profiles_select_own.
create policy "profiles_select_students_of_own_classrooms"
  on public.profiles
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.classroom_members cm
      where cm.profile_id = profiles.id
        and public.is_classroom_teacher(cm.classroom_id)
    )
  );

comment on policy "profiles_select_students_of_own_classrooms" on public.profiles is
  'Permite a teachers leer perfiles de miembros de sus aulas. Complementa profiles_select_own (OR en Postgres).';

-- ---------------------------------------------------------------------------
-- student_credentials
-- ---------------------------------------------------------------------------

create table public.student_credentials (
  student_id uuid primary key references public.profiles (id) on delete cascade,
  username text not null,
  classroom_scope_id uuid not null references public.classrooms (id) on delete cascade,
  password_encrypted text not null,
  password_encrypted_version smallint not null default 1,
  auth_email_internal text not null,
  last_password_reset_by uuid references public.profiles (id) on delete set null,
  last_password_reset_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint student_credentials_classroom_username_unique
    unique (classroom_scope_id, username),
  constraint student_credentials_auth_email_internal_unique
    unique (auth_email_internal)
);

comment on table public.student_credentials is
  'Credenciales de alumnos provisionados. password_encrypted nunca legible vía RLS; descifrado solo vía función SECURITY DEFINER (paso posterior).';
comment on column public.student_credentials.password_encrypted is
  'AES-256-GCM. Formato: {version}:{iv}:{ciphertext}:{authTag} (base64).';
comment on column public.student_credentials.auth_email_internal is
  'Email sintético en auth.users. Formato: {uuid}@students.internal.eaxy';

create index student_credentials_classroom_scope_id_idx
  on public.student_credentials (classroom_scope_id);

create trigger student_credentials_set_updated_at
  before update on public.student_credentials
  for each row
  execute function public.set_updated_at();

alter table public.student_credentials enable row level security;

-- Sin políticas: nadie (anon ni authenticated) puede leer ni escribir desde el cliente.
-- INSERT/UPDATE/SELECT de password_encrypted solo vía secret key (admin) o función
-- SECURITY DEFINER que verifique is_classroom_teacher (próximo paso).

revoke all on table public.student_credentials from anon, authenticated;
