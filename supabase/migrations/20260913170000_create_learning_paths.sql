-- Migration 005: learning_paths — progreso de lecciones por estudiante
-- Estado derivado (no append-only). RLS desde el primer momento.

-- ---------------------------------------------------------------------------
-- Tipos
-- ---------------------------------------------------------------------------

create type public.learning_path_status as enum (
  'started',
  'completed'
);

-- ---------------------------------------------------------------------------
-- learning_paths
-- ---------------------------------------------------------------------------

create table public.learning_paths (
  student_id uuid not null references public.profiles (id) on delete cascade,
  lesson_id uuid not null references public.lessons (id) on delete cascade,
  status public.learning_path_status not null default 'started',
  started_at timestamptz not null default now(),
  completed_at timestamptz,

  primary key (student_id, lesson_id),

  constraint learning_paths_completed_at_when_completed
    check (
      (status = 'completed' and completed_at is not null)
      or (status = 'started' and completed_at is null)
    )
);

comment on table public.learning_paths is
  'Progreso del estudiante en lecciones del curso. Complementa mastery por concepto.';

create index learning_paths_lesson_id_idx
  on public.learning_paths (lesson_id);

create index learning_paths_student_status_idx
  on public.learning_paths (student_id, status);

alter table public.learning_paths enable row level security;

create policy "learning_paths_select_own"
  on public.learning_paths
  for select
  to authenticated
  using (student_id = auth.uid());

create policy "learning_paths_insert_own"
  on public.learning_paths
  for insert
  to authenticated
  with check (student_id = auth.uid());

create policy "learning_paths_update_own"
  on public.learning_paths
  for update
  to authenticated
  using (student_id = auth.uid())
  with check (student_id = auth.uid());

-- Sin políticas DELETE: el progreso no se borra desde cliente.
