-- Migration 001: profiles + RLS base
-- Siguiente migración ampliará RLS cuando exista classroom_members
-- (profesores leyendo perfiles de alumnos provisionados de sus aulas).

create type public.account_origin as enum (
  'self_registered',
  'teacher_provisioned'
);

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  avatar_url text,
  locale text not null default 'es',
  account_origin public.account_origin not null default 'self_registered',
  is_minor boolean not null default false,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

comment on table public.profiles is
  'Perfil de usuario. Extiende auth.users. RLS de lectura por aula se añadirá con classroom_members.';

alter table public.profiles enable row level security;

-- Lectura: solo el propio perfil (ampliar en migración de classroom_members).
create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

-- Inserción: solo al crear el propio perfil (p. ej. tras sign-up).
create policy "profiles_insert_own"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

-- Actualización: solo el propio perfil.
create policy "profiles_update_own"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);
