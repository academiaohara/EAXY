-- Seed: curso demo "Matemáticas 2º ESO" — 3 lecciones, 10 ejercicios
-- UUIDs fijos para referencias estables en desarrollo y tests.

insert into public.courses (id, title, description)
values (
  'a1000000-0000-4000-8000-000000000001',
  'Matemáticas 2º ESO',
  'Curso de matemáticas de segundo de la ESO. Contenido inicial: ecuaciones de primer grado.'
);

insert into public.modules (id, course_id, title, order_index)
values (
  'a2000000-0000-4000-8000-000000000001',
  'a1000000-0000-4000-8000-000000000001',
  'Ecuaciones',
  0
);

insert into public.lessons (id, module_id, title, order_index, video_url)
values
  (
    'a3000000-0000-4000-8000-000000000001',
    'a2000000-0000-4000-8000-000000000001',
    'Ecuaciones de primer grado',
    0,
    'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
  ),
  (
    'a3000000-0000-4000-8000-000000000002',
    'a2000000-0000-4000-8000-000000000001',
    'Ecuaciones con la incógnita en ambos lados',
    1,
    null
  ),
  (
    'a3000000-0000-4000-8000-000000000003',
    'a2000000-0000-4000-8000-000000000001',
    'Ecuaciones con paréntesis',
    2,
    null
  );

insert into public.concepts (id, slug, title, description)
values
  (
    'b1000000-0000-4000-8000-000000000001',
    'linear-equations-basic',
    'Ecuaciones lineales básicas',
    'Resolver ecuaciones de la forma ax + b = c despejando la incógnita.'
  ),
  (
    'b1000000-0000-4000-8000-000000000002',
    'linear-equations-parentheses',
    'Ecuaciones con paréntesis',
    'Resolver ecuaciones que requieren aplicar la propiedad distributiva antes de despejar.'
  );

insert into public.concept_prerequisites (concept_id, prerequisite_id, min_mastery)
values (
  'b1000000-0000-4000-8000-000000000002',
  'b1000000-0000-4000-8000-000000000001',
  0.4
);

insert into public.lesson_concepts (lesson_id, concept_id)
values
  ('a3000000-0000-4000-8000-000000000001', 'b1000000-0000-4000-8000-000000000001'),
  ('a3000000-0000-4000-8000-000000000002', 'b1000000-0000-4000-8000-000000000001'),
  ('a3000000-0000-4000-8000-000000000003', 'b1000000-0000-4000-8000-000000000002');

insert into public.exercises (id, concept_id, type, difficulty, content)
values
  (
    'c1000000-0000-4000-8000-000000000001',
    'b1000000-0000-4000-8000-000000000001',
    'multiple_choice',
    1,
    '{
      "question": "¿Cuál es el valor de x en la ecuación 2x + 4 = 10?",
      "options": [
        { "id": "a", "text": "x = 2" },
        { "id": "b", "text": "x = 3" },
        { "id": "c", "text": "x = 4" },
        { "id": "d", "text": "x = 6" }
      ],
      "correctOptionId": "b"
    }'::jsonb
  ),
  (
    'c1000000-0000-4000-8000-000000000002',
    'b1000000-0000-4000-8000-000000000001',
    'numeric',
    2,
    '{
      "question": "Resuelve: 3x - 5 = 10. ¿Cuánto vale x?",
      "correctAnswer": 5
    }'::jsonb
  ),
  (
    'c1000000-0000-4000-8000-000000000003',
    'b1000000-0000-4000-8000-000000000001',
    'multiple_choice',
    2,
    '{
      "question": "¿Qué operación debes hacer primero para resolver 4x + 8 = 20?",
      "options": [
        { "id": "a", "text": "Dividir ambos lados entre 4" },
        { "id": "b", "text": "Restar 8 a ambos lados" },
        { "id": "c", "text": "Sumar 8 a ambos lados" },
        { "id": "d", "text": "Multiplicar ambos lados por 4" }
      ],
      "correctOptionId": "b"
    }'::jsonb
  ),
  (
    'c1000000-0000-4000-8000-000000000007',
    'b1000000-0000-4000-8000-000000000001',
    'numeric',
    3,
    '{
      "question": "Resuelve: 5x + 3 = 7x - 1. ¿Cuánto vale x?",
      "correctAnswer": 2
    }'::jsonb
  ),
  (
    'c1000000-0000-4000-8000-000000000004',
    'b1000000-0000-4000-8000-000000000002',
    'numeric',
    3,
    '{
      "question": "Resuelve: 2(x + 3) = 14. ¿Cuánto vale x?",
      "correctAnswer": 4
    }'::jsonb
  ),
  (
    'c1000000-0000-4000-8000-000000000005',
    'b1000000-0000-4000-8000-000000000002',
    'multiple_choice',
    3,
    '{
      "question": "Al resolver 3(x - 2) = 9, ¿cuál es el valor correcto de x?",
      "options": [
        { "id": "a", "text": "x = 1" },
        { "id": "b", "text": "x = 3" },
        { "id": "c", "text": "x = 5" },
        { "id": "d", "text": "x = 7" }
      ],
      "correctOptionId": "c"
    }'::jsonb
  ),
  (
    'c1000000-0000-4000-8000-000000000006',
    'b1000000-0000-4000-8000-000000000002',
    'numeric',
    4,
    '{
      "question": "Resuelve: 5(x + 1) - 2x = 14. ¿Cuánto vale x?",
      "correctAnswer": 3,
      "tolerance": 0
    }'::jsonb
  ),
  (
    'c1000000-0000-4000-8000-000000000008',
    'b1000000-0000-4000-8000-000000000001',
    'numeric',
    2,
    '{
      "question": "Resuelve: x + 7 = 15. ¿Cuánto vale x?",
      "correctAnswer": 8
    }'::jsonb
  ),
  (
    'c1000000-0000-4000-8000-000000000009',
    'b1000000-0000-4000-8000-000000000001',
    'multiple_choice',
    1,
    '{
      "question": "¿Cuál es el valor de x en x - 4 = 6?",
      "options": [
        { "id": "a", "text": "x = 2" },
        { "id": "b", "text": "x = 10" },
        { "id": "c", "text": "x = -10" },
        { "id": "d", "text": "x = 4" }
      ],
      "correctOptionId": "b"
    }'::jsonb
  ),
  (
    'c1000000-0000-4000-8000-000000000010',
    'b1000000-0000-4000-8000-000000000002',
    'numeric',
    2,
    '{
      "question": "Resuelve: 4(x - 1) = 12. ¿Cuánto vale x?",
      "correctAnswer": 4
    }'::jsonb
  );
