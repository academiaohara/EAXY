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
  ('a2000000-0000-4000-8000-000000000001', 'a1000000-0000-4000-8000-000000000001', 'Los números naturales', 1),
  ('a2000000-0000-4000-8000-000000000002', 'a1000000-0000-4000-8000-000000000001', 'Potencias y raíces', 2),
  ('a2000000-0000-4000-8000-000000000003', 'a1000000-0000-4000-8000-000000000001', 'Divisibilidad', 3),
  ('a2000000-0000-4000-8000-000000000007', 'a1000000-0000-4000-8000-000000000004', 'Sistemas de ecuaciones', 1);

insert into public.lessons (id, module_id, title, summary, order_index, video_url) values
  ('a3000000-0000-4000-8000-000000000101', 'a2000000-0000-4000-8000-000000000001', '1. Origen y sistemas de numeración', 'Sistemas aditivos y posicionales: egipcio, romano y decimal.', 1, null),
  ('a3000000-0000-4000-8000-000000000102', 'a2000000-0000-4000-8000-000000000001', '2. Aproximación por redondeo', 'Regla del redondeo y aproximaciones a distintos órdenes.', 2, null),
  ('a3000000-0000-4000-8000-000000000103', 'a2000000-0000-4000-8000-000000000001', '3. Suma y resta', 'Paréntesis, propiedades conmutativa y asociativa, problemas.', 3, null),
  ('a3000000-0000-4000-8000-000000000104', 'a2000000-0000-4000-8000-000000000001', '4. Multiplicación', 'Propiedades, distributiva y trucos de cálculo mental.', 4, null),
  ('a3000000-0000-4000-8000-000000000105', 'a2000000-0000-4000-8000-000000000001', '5. División y orden de operaciones', 'Divisiones exactas y enteras; prioridad de operaciones.', 5, null),
  ('a3000000-0000-4000-8000-000000000201', 'a2000000-0000-4000-8000-000000000002', '1. Potencias: base y exponente', 'Base, exponente, cuadrado, cubo, exponente cero y cálculo.', 1, null),
  ('a3000000-0000-4000-8000-000000000202', 'a2000000-0000-4000-8000-000000000002', '2. Potencias de base 10', 'Ceros y exponente; leer números grandes con potencias de 10.', 2, null),
  ('a3000000-0000-4000-8000-000000000203', 'a2000000-0000-4000-8000-000000000002', '3. Números grandes abreviados', 'Forma a · 10^n; ejemplo del año luz y cantidades reales.', 3, null),
  ('a3000000-0000-4000-8000-000000000204', 'a2000000-0000-4000-8000-000000000002', '4. Raíz cuadrada', 'Raíz exacta, raíz entera, cuadrados perfectos y problemas.', 4, null),
  ('a3000000-0000-4000-8000-000000000301', 'a2000000-0000-4000-8000-000000000003', '1. La relación de divisibilidad', 'División exacta, múltiplo y divisor; comprobar emparejamientos.', 1, null),
  ('a3000000-0000-4000-8000-000000000302', 'a2000000-0000-4000-8000-000000000003', '2. Múltiplos y divisores', 'Series de múltiplos, parejas de divisores y búsqueda sistemática.', 2, null),
  ('a3000000-0000-4000-8000-000000000303', 'a2000000-0000-4000-8000-000000000003', '3. Criterios de divisibilidad', 'Reglas para 2, 3, 5 y 10 sin dividir.', 3, null),
  ('a3000000-0000-4000-8000-000000000304', 'a2000000-0000-4000-8000-000000000003', '4. Números primos y compuestos', 'Factorización, primos menores que 30 y descomposición.', 4, null),
  ('a3000000-0000-4000-8000-000000000305', 'a2000000-0000-4000-8000-000000000003', '5. MCM y MCD', 'Método artesanal, problemas de coincidencia y reparto.', 5, null),
  ('a3000000-0000-4000-8000-000000000701', 'a2000000-0000-4000-8000-000000000007', '1. Ecuaciones lineales con dos incógnitas', 'Soluciones, representación gráfica y rectas horizontales/verticales.', 1, null),
  ('a3000000-0000-4000-8000-000000000702', 'a2000000-0000-4000-8000-000000000007', '2. Sistemas de ecuaciones lineales', 'Solución gráfica, sistemas compatibles, incompatibles e indeterminados.', 2, null),
  ('a3000000-0000-4000-8000-000000000703', 'a2000000-0000-4000-8000-000000000007', '3. Resolución de sistemas lineales', 'Métodos de sustitución, igualación y reducción con ejemplos animados.', 3, null),
  ('a3000000-0000-4000-8000-000000000704', 'a2000000-0000-4000-8000-000000000007', '4. Sistemas no lineales', 'Identificación, sustitución paso a paso y comprobación de soluciones.', 4, null),
  ('a3000000-0000-4000-8000-000000000705', 'a2000000-0000-4000-8000-000000000007', '5. Problemas con sistemas de ecuaciones', 'Traducir enunciados a sistemas y resolver problemas contextualizados.', 5, null);
