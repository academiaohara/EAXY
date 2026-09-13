-- Migration 005: progreso por lección (learning_paths)
-- Registra qué lecciones ha empezado/completado cada estudiante.

create type public.learning_path_status as enum (
  'started',
  'completed'
);

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
  'Progreso del estudiante por lección: started al abrirla, completed cuando cumple criterios.';

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

create policy "learning_paths_select_students_of_own_classrooms"
  on public.learning_paths
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.classroom_members teacher_member
      join public.classroom_members student_member
        on student_member.classroom_id = teacher_member.classroom_id
      where teacher_member.profile_id = auth.uid()
        and teacher_member.role = 'teacher'
        and student_member.profile_id = learning_paths.student_id
        and student_member.role = 'student'
    )
  );

create policy "learning_paths_insert_own"
  on public.learning_paths
  for insert
  to authenticated
  with check (
    student_id = auth.uid()
    and status = 'started'
    and completed_at is null
  );

create policy "learning_paths_update_own"
  on public.learning_paths
  for update
  to authenticated
  using (student_id = auth.uid())
  with check (student_id = auth.uid());
