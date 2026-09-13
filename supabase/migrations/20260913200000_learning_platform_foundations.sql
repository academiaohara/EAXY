-- Migration 005: fundamentos de la plataforma de aprendizaje
--
-- 1. Perfil automático para adultos autoregistrados (email o Google OAuth).
-- 2. Resumen de lección (texto de la lección sin vídeo).
-- 3. Grafo de prerrequisitos entre conceptos (recomendaciones R4).
-- 4. Los profesores leen el mastery e intentos de los alumnos de sus aulas.
-- 5. Los alumnos ven las aulas a las que pertenecen (ya cubierto) y su membresía.

-- ---------------------------------------------------------------------------
-- 1. Trigger: auth.users → profiles para cuentas self_registered
-- ---------------------------------------------------------------------------
-- Las cuentas provisionadas por profesor insertan su perfil explícitamente
-- desde la Server Action (con created_by e is_minor). El trigger las ignora
-- leyendo `account_origin` de raw_user_meta_data.

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  origin text := coalesce(new.raw_user_meta_data ->> 'account_origin', 'self_registered');
  name text := coalesce(
    nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''),
    nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''),
    nullif(trim(new.raw_user_meta_data ->> 'name'), ''),
    split_part(coalesce(new.email, ''), '@', 1),
    'Estudiante'
  );
begin
  if origin = 'teacher_provisioned' then
    return new;
  end if;

  insert into public.profiles (id, display_name, avatar_url, account_origin, is_minor)
  values (new.id, name, new.raw_user_meta_data ->> 'avatar_url', 'self_registered', false)
  on conflict (id) do nothing;

  return new;
end;
$$;

comment on function public.handle_new_auth_user() is
  'Crea el perfil de un adulto autoregistrado al insertarse en auth.users. Ignora cuentas teacher_provisioned.';

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_auth_user();

-- ---------------------------------------------------------------------------
-- 2. lessons.summary
-- ---------------------------------------------------------------------------

alter table public.lessons
  add column if not exists summary text;

comment on column public.lessons.summary is
  'Texto breve de la lección. Se muestra cuando no hay vídeo o como repaso.';

-- ---------------------------------------------------------------------------
-- 3. concept_prerequisites
-- ---------------------------------------------------------------------------

create table public.concept_prerequisites (
  concept_id uuid not null references public.concepts (id) on delete cascade,
  prerequisite_id uuid not null references public.concepts (id) on delete cascade,
  min_mastery numeric(4, 3) not null default 0.6,

  primary key (concept_id, prerequisite_id),

  constraint concept_prerequisites_not_self
    check (concept_id <> prerequisite_id),
  constraint concept_prerequisites_min_mastery_range
    check (min_mastery >= 0 and min_mastery <= 1)
);

comment on table public.concept_prerequisites is
  'Arista del grafo de conocimiento: concept_id requiere min_mastery en prerequisite_id.';

create index concept_prerequisites_prerequisite_id_idx
  on public.concept_prerequisites (prerequisite_id);

alter table public.concept_prerequisites enable row level security;

create policy "concept_prerequisites_select_authenticated"
  on public.concept_prerequisites
  for select
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- 4. Profesores leen progreso de alumnos de sus aulas
-- ---------------------------------------------------------------------------

create policy "student_concept_mastery_select_teachers"
  on public.student_concept_mastery
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.classroom_members cm
      where cm.profile_id = student_concept_mastery.student_id
        and cm.role = 'student'
        and public.is_classroom_teacher(cm.classroom_id)
    )
  );

comment on policy "student_concept_mastery_select_teachers" on public.student_concept_mastery is
  'Teachers ven el mastery global de los alumnos de sus aulas. OR con student_concept_mastery_select_own.';

create policy "exercise_attempts_select_teachers"
  on public.exercise_attempts
  for select
  to authenticated
  using (
    exists (
      select 1
      from public.classroom_members cm
      where cm.profile_id = exercise_attempts.student_id
        and cm.role = 'student'
        and public.is_classroom_teacher(cm.classroom_id)
    )
  );

comment on policy "exercise_attempts_select_teachers" on public.exercise_attempts is
  'Teachers ven los intentos de los alumnos de sus aulas. OR con exercise_attempts_select_own.';
