-- Slugs legibles para rutas /aprender/curso/:slug/tema/:slug

alter table public.courses
  add column slug text;

alter table public.modules
  add column slug text;

comment on column public.courses.slug is
  'Segmento de URL único del curso (p. ej. matematicas-1-eso).';
comment on column public.modules.slug is
  'Segmento de URL del tema, único dentro del curso.';

create unique index courses_slug_unique on public.courses (slug)
  where slug is not null;

create unique index modules_course_slug_unique on public.modules (course_id, slug)
  where slug is not null;
