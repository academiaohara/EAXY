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
  ('a3000000-0000-4000-8000-000000000701', 'a2000000-0000-4000-8000-000000000007', '1. Ecuaciones lineales con dos incógnitas', 'Soluciones, representación gráfica y rectas horizontales/verticales.', 1, null),
  ('a3000000-0000-4000-8000-000000000702', 'a2000000-0000-4000-8000-000000000007', '2. Sistemas de ecuaciones lineales', 'Solución gráfica, sistemas compatibles, incompatibles e indeterminados.', 2, null),
  ('a3000000-0000-4000-8000-000000000703', 'a2000000-0000-4000-8000-000000000007', '3. Resolución de sistemas lineales', 'Métodos de sustitución, igualación y reducción con ejemplos animados.', 3, null),
  ('a3000000-0000-4000-8000-000000000704', 'a2000000-0000-4000-8000-000000000007', '4. Sistemas no lineales', 'Identificación, sustitución paso a paso y comprobación de soluciones.', 4, null),
  ('a3000000-0000-4000-8000-000000000705', 'a2000000-0000-4000-8000-000000000007', '5. Problemas con sistemas de ecuaciones', 'Traducir enunciados a sistemas y resolver problemas contextualizados.', 5, null);
