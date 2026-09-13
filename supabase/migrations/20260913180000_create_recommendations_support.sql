-- Migration 006: prerrequisitos de conceptos y logs de recomendaciones
-- Soporta reglas R4 (grafo) y persistencia de recommendation_logs (fase 2).

-- ---------------------------------------------------------------------------
-- concept_prerequisites
-- ---------------------------------------------------------------------------

create table public.concept_prerequisites (
  concept_id uuid not null references public.concepts (id) on delete cascade,
  prerequisite_id uuid not null references public.concepts (id) on delete cascade,
  min_mastery numeric(4, 3) not null default 0.4,

  primary key (concept_id, prerequisite_id),

  constraint concept_prerequisites_no_self_reference
    check (concept_id <> prerequisite_id),
  constraint concept_prerequisites_min_mastery_range
    check (min_mastery >= 0 and min_mastery <= 1)
);

comment on table public.concept_prerequisites is
  'Aristas del grafo de conocimiento: concepto requiere dominio mínimo en prerrequisito.';

create index concept_prerequisites_prerequisite_id_idx
  on public.concept_prerequisites (prerequisite_id);

alter table public.concept_prerequisites enable row level security;

create policy "concept_prerequisites_select_authenticated"
  on public.concept_prerequisites
  for select
  to authenticated
  using (true);

-- ---------------------------------------------------------------------------
-- recommendation_logs
-- ---------------------------------------------------------------------------

create type public.recommendation_action as enum (
  'practice',
  'reinforce',
  'recover',
  'advance',
  'rest'
);

create table public.recommendation_logs (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles (id) on delete cascade,
  rule_id text not null,
  concept_id uuid references public.concepts (id) on delete set null,
  action public.recommendation_action not null,
  explanation jsonb not null,
  exercise_id uuid references public.exercises (id) on delete set null,
  created_at timestamptz not null default now(),
  dismissed_at timestamptz,

  constraint recommendation_logs_explanation_is_object
    check (jsonb_typeof(explanation) = 'object')
);

comment on table public.recommendation_logs is
  'Historial de recomendaciones mostradas al estudiante. Cálculo on-demand; log para trazabilidad.';
comment on column public.recommendation_logs.exercise_id is
  'Ejercicio sugerido (sustituto de content_item_id en el esquema actual sin content_items).';

create index recommendation_logs_student_created_idx
  on public.recommendation_logs (student_id, created_at desc);

alter table public.recommendation_logs enable row level security;

create policy "recommendation_logs_select_own"
  on public.recommendation_logs
  for select
  to authenticated
  using (student_id = auth.uid());

create policy "recommendation_logs_insert_own"
  on public.recommendation_logs
  for insert
  to authenticated
  with check (student_id = auth.uid());

create policy "recommendation_logs_update_own"
  on public.recommendation_logs
  for update
  to authenticated
  using (student_id = auth.uid())
  with check (student_id = auth.uid());
