-- Migration 006: prerrequisitos de conceptos y log de recomendaciones
-- RLS en recommendation_logs desde el primer momento.

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
  'Aristas del grafo de conceptos: B requiere dominio mínimo en A.';

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
  content_item_id uuid,
  created_at timestamptz not null default now(),
  dismissed_at timestamptz
);

comment on table public.recommendation_logs is
  'Historial de recomendaciones generadas on-demand para trazabilidad.';

create index recommendation_logs_student_id_created_idx
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
