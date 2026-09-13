-- Migration 003: username único global en student_credentials
-- Permite login con usuario+contraseña sin seleccionar aula.

alter table public.student_credentials
  drop constraint student_credentials_classroom_username_unique;

alter table public.student_credentials
  add constraint student_credentials_username_unique unique (username);

comment on column public.student_credentials.username is
  'Único en toda la plataforma. El login provisionado resuelve username → auth_email_internal sin ambigüedad.';
comment on column public.student_credentials.classroom_scope_id is
  'Aula de alta inicial. Usado para autorización y regeneración de contraseña; no define unicidad del username.';
