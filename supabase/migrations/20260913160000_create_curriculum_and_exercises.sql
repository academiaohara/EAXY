-- Migration 004: catálogo curricular, ejercicios, intentos y mastery
-- Contenido compartido (lectura autenticada). Intentos append-only.
-- Mastery se recalcula vía servidor (admin / SECURITY DEFINER), no desde cliente.

-- ---------------------------------------------------------------------------
-- courses
-- ---------------------------------------------------------------------------

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  created_at timestamptz not null default now()
);

comment on table public.courses is
  'Curso publicado del catálogo curricular.';

alter table public.courses enable row level security;

create policy "courses_select_authenticated"
  on public.courses
  for select
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- modules
-- ---------------------------------------------------------------------------

create table public.modules (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses (id) on delete cascade,
  title text not null,
  order_index integer not null,

  constraint modules_order_index_non_negative
    check (order_index >= 0),
  constraint modules_unique_order_per_course
    unique (course_id, order_index)
);

comment on table public.modules is
  'Módulo o unidad dentro de un curso.';

create index modules_course_id_idx on public.modules (course_id);

alter table public.modules enable row level security;

create policy "modules_select_authenticated"
  on public.modules
  for select
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- lessons
-- ---------------------------------------------------------------------------

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  module_id uuid not null references public.modules (id) on delete cascade,
  title text not null,
  order_index integer not null,
  video_url text,

  constraint lessons_order_index_non_negative
    check (order_index >= 0),
  constraint lessons_unique_order_per_module
    unique (module_id, order_index)
);

comment on table public.lessons is
  'Lección dentro de un módulo.';

create index lessons_module_id_idx on public.lessons (module_id);

alter table public.lessons enable row level security;

create policy "lessons_select_authenticated"
  on public.lessons
  for select
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- concepts
-- ---------------------------------------------------------------------------

create table public.concepts (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  title text not null,
  description text,

  constraint concepts_slug_unique unique (slug)
);

comment on table public.concepts is
  'Concepto atómico del grafo de conocimiento. Unidad de seguimiento de mastery.';

create index concepts_slug_idx on public.concepts (slug);

alter table public.concepts enable row level security;

create policy "concepts_select_authenticated"
  on public.concepts
  for select
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- lesson_concepts (puente)
-- ---------------------------------------------------------------------------

create table public.lesson_concepts (
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  concept_id uuid not null references public.concepts (id) on delete cascade,

  primary key (lesson_id, concept_id)
);

comment on table public.lesson_concepts is
  'Asocia lecciones con los conceptos que cubren.';

create index lesson_concepts_concept_id_idx on public.lesson_concepts (concept_id);

alter table public.lesson_concepts enable row level security;

create policy "lesson_concepts_select_authenticated"
  on public.lesson_concepts
  for select
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- exercises
-- ---------------------------------------------------------------------------

create table public.exercises (
  id uuid primary key default gen_random_uuid(),
  concept_id uuid not null references public.concepts (id) on delete restrict,
  type text not null,
  difficulty smallint not null,
  content jsonb not null,

  constraint exercises_difficulty_range
    check (difficulty between 1 and 5),
  constraint exercises_type_allowed
    check (type in ('multiple_choice', 'numeric'))
);

comment on table public.exercises is
  'Ejercicio interactivo. content validado con Zod en la capa de aplicación.';
comment on column public.exercises.content is
  'Definición del ejercicio (pregunta, opciones, respuesta). Validar en servidor antes de insertar.';

create index exercises_concept_id_idx on public.exercises (concept_id);
create index exercises_type_idx on public.exercises (type);

alter table public.exercises enable row level security;

create policy "exercises_select_authenticated"
  on public.exercises
  for select
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- exercise_attempts (APPEND ONLY)
-- ---------------------------------------------------------------------------

create table public.exercise_attempts (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles (id) on delete cascade,
  exercise_id uuid not null references public.exercises (id) on delete restrict,
  answer jsonb not null,
  correct boolean not null,
  time_spent_ms integer not null,
  hints_used smallint not null default 0,
  attempt_number integer not null,
  created_at timestamptz not null default now(),

  constraint exercise_attempts_time_spent_non_negative
    check (time_spent_ms >= 0),
  constraint exercise_attempts_hints_used_non_negative
    check (hints_used >= 0),
  constraint exercise_attempts_attempt_number_positive
    check (attempt_number >= 1)
);

comment on table public.exercise_attempts is
  'Intentos de ejercicio. APPEND ONLY: nunca UPDATE ni DELETE.';

create index exercise_attempts_student_id_idx
  on public.exercise_attempts (student_id);

create index exercise_attempts_exercise_id_idx
  on public.exercise_attempts (exercise_id);

create index exercise_attempts_student_exercise_created_idx
  on public.exercise_attempts (student_id, exercise_id, created_at desc);

create index exercise_attempts_student_created_idx
  on public.exercise_attempts (student_id, created_at desc);

alter table public.exercise_attempts enable row level security;

create policy "exercise_attempts_select_own"
  on public.exercise_attempts
  for select
  to authenticated
  using (student_id = auth.uid());

create policy "exercise_attempts_insert_own"
  on public.exercise_attempts
  for insert
  to authenticated
  with check (student_id = auth.uid());

-- Sin políticas UPDATE ni DELETE: append-only.

-- ---------------------------------------------------------------------------
-- student_concept_mastery
-- ---------------------------------------------------------------------------

create table public.student_concept_mastery (
  student_id uuid not null references public.profiles (id) on delete cascade,
  concept_id uuid not null references public.concepts (id) on delete cascade,
  mastery numeric(4, 3) not null default 0,
  updated_at timestamptz not null default now(),

  primary key (student_id, concept_id),

  constraint student_concept_mastery_range
    check (mastery >= 0 and mastery <= 1)
);

comment on table public.student_concept_mastery is
  'Mastery derivado por estudiante y concepto. Se recalcula en servidor tras cada intento.';

create index student_concept_mastery_concept_id_idx
  on public.student_concept_mastery (concept_id);

create trigger student_concept_mastery_set_updated_at
  before update on public.student_concept_mastery
  for each row
  execute function public.set_updated_at();

alter table public.student_concept_mastery enable row level security;

create policy "student_concept_mastery_select_own"
  on public.student_concept_mastery
  for select
  to authenticated
  using (student_id = auth.uid());

-- Sin políticas INSERT/UPDATE/DELETE para authenticated: solo vía servidor.

-- ---------------------------------------------------------------------------
-- Función SECURITY DEFINER para actualizar mastery desde servidor
-- ---------------------------------------------------------------------------

create or replace function public.upsert_student_concept_mastery(
  p_student_id uuid,
  p_concept_id uuid,
  p_mastery numeric(4, 3)
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_mastery < 0 or p_mastery > 1 then
    raise exception 'mastery must be between 0 and 1';
  end if;

  insert into public.student_concept_mastery (student_id, concept_id, mastery, updated_at)
  values (p_student_id, p_concept_id, p_mastery, now())
  on conflict (student_id, concept_id)
  do update
    set mastery = excluded.mastery,
        updated_at = excluded.updated_at;
end;
$$;

comment on function public.upsert_student_concept_mastery(uuid, uuid, numeric) is
  'Actualiza mastery derivado. Solo invocable con service_role o desde funciones de servidor.';

revoke all on function public.upsert_student_concept_mastery(uuid, uuid, numeric)
  from public, anon, authenticated;

grant execute on function public.upsert_student_concept_mastery(uuid, uuid, numeric)
  to service_role;

-- ---------------------------------------------------------------------------
-- FK pendiente: classrooms.reference_course_id → courses
-- ---------------------------------------------------------------------------

alter table public.classrooms
  add constraint classrooms_reference_course_id_fkey
  foreign key (reference_course_id)
  references public.courses (id)
  on delete set null;
