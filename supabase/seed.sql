-- ARCHIVO GENERADO. No editar a mano: ejecuta `npm run seed:generate`.
-- Fuente: src/content/curriculum.ts

insert into public.courses (id, title, description) values
  ('a1000000-0000-4000-8000-000000000001', 'Matemáticas 1º ESO', 'Primer curso de matemáticas de la ESO.'),
  ('a1000000-0000-4000-8000-000000000002', 'Matemáticas 2º ESO', 'Segundo curso de matemáticas de la ESO.'),
  ('a1000000-0000-4000-8000-000000000003', 'Matemáticas 3º ESO', 'Tercer curso de matemáticas de la ESO.'),
  ('a1000000-0000-4000-8000-000000000004', 'Matemáticas 4º ESO', 'Cuarto curso de matemáticas de la ESO.'),
  ('a1000000-0000-4000-8000-000000000005', 'Matemáticas 1º Bachillerato', 'Primer curso de matemáticas de Bachillerato.'),
  ('a1000000-0000-4000-8000-000000000006', 'Matemáticas 2º Bachillerato', 'Segundo curso de matemáticas de Bachillerato.');

insert into public.modules (id, course_id, title, order_index) values
  ('a2000000-0000-4000-8000-000000000007', 'a1000000-0000-4000-8000-000000000004', 'Sistemas de ecuaciones', 1);

insert into public.lessons (id, module_id, title, summary, order_index, video_url) values
  ('a3000000-0000-4000-8000-000000000701', 'a2000000-0000-4000-8000-000000000007', 'Sistemas de ecuaciones no lineales', 'Identifica sistemas no lineales, aplica sustitución paso a paso y comprueba las soluciones.', 1, null);
