-- ARCHIVO GENERADO. No editar a mano: ejecuta `npm run seed:generate`.
-- Fuente: src/content/curriculum.ts

insert into public.courses (id, slug, title, description) values
  ('a1000000-0000-4000-8000-000000000001', 'matematicas-1-eso', 'Matemáticas 1º ESO', 'Primer curso de matemáticas de la ESO.'),
  ('a1000000-0000-4000-8000-000000000002', 'matematicas-2-eso', 'Matemáticas 2º ESO', 'Segundo curso de matemáticas de la ESO.'),
  ('a1000000-0000-4000-8000-000000000003', 'matematicas-3-eso', 'Matemáticas 3º ESO', 'Tercer curso de matemáticas de la ESO.'),
  ('a1000000-0000-4000-8000-000000000004', 'matematicas-4-eso', 'Matemáticas 4º ESO', 'Cuarto curso de matemáticas de la ESO.'),
  ('a1000000-0000-4000-8000-000000000005', 'matematicas-1-bachillerato', 'Matemáticas 1º Bachillerato', 'Primer curso de matemáticas de Bachillerato.'),
  ('a1000000-0000-4000-8000-000000000006', 'matematicas-2-bachillerato', 'Matemáticas 2º Bachillerato', 'Segundo curso de matemáticas de Bachillerato.'),
  ('a1000000-0000-4000-8000-000000000007', 'fisica-2-eso', 'Física 2º ESO', 'Segundo curso de Física y Química de la ESO.'),
  ('a1000000-0000-4000-8000-000000000008', 'fisica-3-eso', 'Física 3º ESO', 'Tercer curso de Física y Química de la ESO.'),
  ('a1000000-0000-4000-8000-000000000009', 'fisica-4-eso', 'Física 4º ESO', 'Cuarto curso de Física y Química de la ESO.'),
  ('a1000000-0000-4000-8000-000000000010', 'fisica-1-bachillerato', 'Física 1º Bachillerato', 'Primer curso de Física de Bachillerato.'),
  ('a1000000-0000-4000-8000-000000000011', 'fisica-2-bachillerato', 'Física 2º Bachillerato', 'Segundo curso de Física de Bachillerato.'),
  ('a1000000-0000-4000-8000-000000000012', 'tecnologia-1-eso', 'Tecnología 1º ESO', 'Primer curso de Tecnología y Digitalización de la ESO.'),
  ('a1000000-0000-4000-8000-000000000013', 'tecnologia-2-eso', 'Tecnología 2º ESO', 'Segundo curso de Tecnología y Digitalización de la ESO.'),
  ('a1000000-0000-4000-8000-000000000014', 'tecnologia-3-eso', 'Tecnología 3º ESO', 'Tercer curso de Tecnología y Digitalización de la ESO.'),
  ('a1000000-0000-4000-8000-000000000015', 'tecnologia-4-eso', 'Tecnología 4º ESO', 'Cuarto curso de Tecnología de la ESO.');

insert into public.modules (id, course_id, slug, title, order_index) values
  ('a2000000-0000-4000-8000-000000000001', 'a1000000-0000-4000-8000-000000000001', 'numeros-naturales', 'Los números naturales', 1),
  ('a2000000-0000-4000-8000-000000000002', 'a1000000-0000-4000-8000-000000000001', 'potencias-y-raices', 'Potencias y raíces', 2),
  ('a2000000-0000-4000-8000-000000000003', 'a1000000-0000-4000-8000-000000000001', 'divisibilidad', 'Divisibilidad', 3),
  ('a2000000-0000-4000-8000-000000000004', 'a1000000-0000-4000-8000-000000000001', 'numeros-enteros', 'Los números enteros', 4),
  ('a2000000-0000-4000-8000-000000000005', 'a1000000-0000-4000-8000-000000000001', 'numeros-decimales', 'Los números decimales', 5),
  ('a2000000-0000-4000-8000-000000000007', 'a1000000-0000-4000-8000-000000000004', 'sistemas-de-ecuaciones', 'Sistemas de ecuaciones', 1);

insert into public.lessons (id, module_id, title, summary, order_index, video_url) values
  ('a3000000-0000-4000-8000-000000000101', 'a2000000-0000-4000-8000-000000000001', '1. Origen de los números y aproximación por redondeo', 'Sistemas aditivos y posicional, decimal, y regla del redondeo con ejemplos del temario.', 1, null),
  ('a3000000-0000-4000-8000-000000000103', 'a2000000-0000-4000-8000-000000000001', '2. Suma y resta', 'Paréntesis, propiedades conmutativa y asociativa, problemas.', 2, null),
  ('a3000000-0000-4000-8000-000000000104', 'a2000000-0000-4000-8000-000000000001', '3. Multiplicación y división', 'Suma repetida, propiedades, reparto en partes iguales y divisiones exactas y con resto.', 3, null),
  ('a3000000-0000-4000-8000-000000000105', 'a2000000-0000-4000-8000-000000000001', '4. Orden de operaciones', 'Paréntesis, prioridad ×÷ frente a +− y orden de izquierda a derecha.', 4, null),
  ('a3000000-0000-4000-8000-000000000201', 'a2000000-0000-4000-8000-000000000002', '1. Potencias', 'Base, exponente, cuadrado, cubo, cálculo manual y con calculadora.', 1, null),
  ('a3000000-0000-4000-8000-000000000204', 'a2000000-0000-4000-8000-000000000002', '2. Raíz cuadrada', 'Inversa del cuadrado, cuadrados perfectos, raíz entera y calculadora.', 2, null),
  ('a3000000-0000-4000-8000-000000000301', 'a2000000-0000-4000-8000-000000000003', '1. Divisibilidad: múltiplos y divisores', 'División exacta, múltiplos infinitos y divisores por parejas.', 1, null),
  ('a3000000-0000-4000-8000-000000000303', 'a2000000-0000-4000-8000-000000000003', '2. Criterios de divisibilidad', 'Reglas para 2, 3, 4, 5, 6, 9, 10, 11 y 12 sin dividir.', 2, null),
  ('a3000000-0000-4000-8000-000000000304', 'a2000000-0000-4000-8000-000000000003', '3. Descomposición en factores primos', 'Primos y compuestos, criba de Eratóstenes y método de la línea vertical.', 3, null),
  ('a3000000-0000-4000-8000-000000000305', 'a2000000-0000-4000-8000-000000000003', '4. Mínimo común múltiplo', 'Múltiplos comunes, factores primos con mayor exponente y problemas de coincidencia.', 4, null),
  ('a3000000-0000-4000-8000-000000000306', 'a2000000-0000-4000-8000-000000000003', '5. Máximo común divisor', 'Divisores comunes, factores primos con menor exponente y problemas de reparto.', 5, null),
  ('a3000000-0000-4000-8000-000000000401', 'a2000000-0000-4000-8000-000000000004', '1. Los números enteros', 'Positivos y negativos, opuestos, recta numérica, valor absoluto y orden.', 1, null),
  ('a3000000-0000-4000-8000-000000000402', 'a2000000-0000-4000-8000-000000000004', '2. Sumas y restas de enteros', 'Mismo signo, distinto signo y expresiones con varios números.', 2, null),
  ('a3000000-0000-4000-8000-000000000403', 'a2000000-0000-4000-8000-000000000004', '3. Paréntesis en sumas y restas', 'Restar es sumar el opuesto; signo delante de un paréntesis y paréntesis anidados.', 3, null),
  ('a3000000-0000-4000-8000-000000000404', 'a2000000-0000-4000-8000-000000000004', '4. Multiplicación y división de enteros', 'Regla de los signos, división exacta y operaciones combinadas.', 4, null),
  ('a3000000-0000-4000-8000-000000000501', 'a2000000-0000-4000-8000-000000000005', '1. Los órdenes de unidades decimales', 'Décimas, centésimas y milésimas; lectura, orden en la recta y aproximación por redondeo.', 1, null),
  ('a3000000-0000-4000-8000-000000000502', 'a2000000-0000-4000-8000-000000000005', '2. Operaciones con números decimales', 'Suma y resta en columna, multiplicación y desplazamiento de la coma por 10, 100 y 1000.', 2, null),
  ('a3000000-0000-4000-8000-000000000503', 'a2000000-0000-4000-8000-000000000005', '3. División de números decimales', 'Divisor natural y decimal, cocientes periódicos y división entre 10, 100 y 1000.', 3, null),
  ('a3000000-0000-4000-8000-000000000701', 'a2000000-0000-4000-8000-000000000007', '1. Ecuaciones lineales con dos incógnitas', 'Soluciones, representación gráfica y rectas horizontales/verticales.', 1, null),
  ('a3000000-0000-4000-8000-000000000702', 'a2000000-0000-4000-8000-000000000007', '2. Sistemas de ecuaciones lineales', 'Solución gráfica, sistemas compatibles, incompatibles e indeterminados.', 2, null),
  ('a3000000-0000-4000-8000-000000000703', 'a2000000-0000-4000-8000-000000000007', '3. Resolución de sistemas lineales', 'Métodos de sustitución, igualación y reducción con ejemplos animados.', 3, null),
  ('a3000000-0000-4000-8000-000000000704', 'a2000000-0000-4000-8000-000000000007', '4. Sistemas no lineales', 'Identificación, sustitución paso a paso y comprobación de soluciones.', 4, null),
  ('a3000000-0000-4000-8000-000000000705', 'a2000000-0000-4000-8000-000000000007', '5. Problemas con sistemas de ecuaciones', 'Traducir enunciados a sistemas y resolver problemas contextualizados.', 5, null);
