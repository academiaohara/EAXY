-- ARCHIVO GENERADO. No editar a mano: ejecuta `npm run seed:generate`.
-- Fuente: src/content/curriculum.ts

insert into public.courses (id, title, description) values
  ('a1000000-0000-4000-8000-000000000001', 'Matemáticas 2º ESO', 'Números enteros, fracciones, ecuaciones de primer grado y proporcionalidad. Practica a tu ritmo con ejercicios que se adaptan a lo que ya dominas.');

insert into public.modules (id, course_id, title, order_index) values
  ('a2000000-0000-4000-8000-000000000002', 'a1000000-0000-4000-8000-000000000001', 'Números enteros', 0),
  ('a2000000-0000-4000-8000-000000000003', 'a1000000-0000-4000-8000-000000000001', 'Fracciones', 1),
  ('a2000000-0000-4000-8000-000000000001', 'a1000000-0000-4000-8000-000000000001', 'Ecuaciones', 2),
  ('a2000000-0000-4000-8000-000000000004', 'a1000000-0000-4000-8000-000000000001', 'Proporcionalidad y porcentajes', 3);

insert into public.lessons (id, module_id, title, summary, order_index, video_url) values
  ('a3000000-0000-4000-8000-000000000002', 'a2000000-0000-4000-8000-000000000002', 'Sumar y restar enteros', 'Los números enteros incluyen los negativos. Para sumar dos números del mismo signo, suma sus valores y conserva el signo. Si tienen signo distinto, resta el menor del mayor y pon el signo del mayor. Restar un número es lo mismo que sumar su opuesto: 5 − (−3) = 5 + 3.', 0, null),
  ('a3000000-0000-4000-8000-000000000003', 'a2000000-0000-4000-8000-000000000002', 'Multiplicar y dividir enteros', 'Regla de los signos: signos iguales dan positivo, signos distintos dan negativo. Así, (−6) · (−4) = 24 y 36 : (−9) = −4. Con tres o más factores, cuenta los negativos: un número impar de negativos da resultado negativo.', 1, null),
  ('a3000000-0000-4000-8000-000000000004', 'a2000000-0000-4000-8000-000000000002', 'Operaciones combinadas', 'Jerarquía de operaciones: primero paréntesis, después multiplicaciones y divisiones (de izquierda a derecha) y por último sumas y restas. Ejemplo: 3 + 4 · (−2) = 3 + (−8) = −5.', 2, null),
  ('a3000000-0000-4000-8000-000000000005', 'a2000000-0000-4000-8000-000000000003', 'Fracciones equivalentes', 'Dos fracciones son equivalentes si representan la misma cantidad: 3/4 = 6/8. Se obtienen multiplicando o dividiendo numerador y denominador por el mismo número. Simplificar es dividir hasta llegar a la fracción irreducible.', 0, null),
  ('a3000000-0000-4000-8000-000000000006', 'a2000000-0000-4000-8000-000000000003', 'Sumar y restar fracciones', 'Para sumar o restar fracciones con distinto denominador, redúcelas a común denominador (el mínimo común múltiplo) y opera los numeradores: 1/2 + 1/3 = 3/6 + 2/6 = 5/6.', 1, null),
  ('a3000000-0000-4000-8000-000000000007', 'a2000000-0000-4000-8000-000000000003', 'Multiplicar y dividir fracciones', 'Multiplicar fracciones es multiplicar en línea: 2/3 · 3/4 = 6/12 = 1/2. Dividir es multiplicar por la inversa de la segunda: (3/5) : (2/5) = 3/5 · 5/2 = 3/2.', 2, null),
  ('a3000000-0000-4000-8000-000000000001', 'a2000000-0000-4000-8000-000000000001', 'Ecuaciones de primer grado', 'Una ecuación es una igualdad con una incógnita. Para resolverla, aplica la misma operación a ambos lados hasta despejar x. Si hay paréntesis, primero aplica la propiedad distributiva: 2(x + 3) = 14 → 2x + 6 = 14 → 2x = 8 → x = 4.', 0, null),
  ('a3000000-0000-4000-8000-000000000008', 'a2000000-0000-4000-8000-000000000001', 'Ecuaciones con denominadores', 'Cuando la incógnita aparece dividida, multiplica toda la ecuación por el denominador (o por el mínimo común múltiplo) para eliminarlo: x/2 + 3 = 7 → x + 6 = 14 → x = 8.', 1, null),
  ('a3000000-0000-4000-8000-000000000009', 'a2000000-0000-4000-8000-000000000001', 'Problemas con ecuaciones', 'Lee el enunciado, elige la incógnita, traduce cada frase a lenguaje algebraico y resuelve. Comprueba siempre que la solución tiene sentido en el contexto del problema.', 2, null),
  ('a3000000-0000-4000-8000-000000000010', 'a2000000-0000-4000-8000-000000000004', 'Proporcionalidad directa', 'Dos magnitudes son directamente proporcionales si al multiplicar una, la otra se multiplica igual. La regla de tres resuelve estos problemas: si 3 cuadernos cuestan 4,50 €, uno cuesta 1,50 € y 7 cuestan 10,50 €.', 0, null),
  ('a3000000-0000-4000-8000-000000000011', 'a2000000-0000-4000-8000-000000000004', 'Porcentajes', 'Un porcentaje es una fracción de denominador 100. El 25 % de 80 es 80 · 25/100 = 20. Para aplicar un descuento del 15 %, pagas el 85 %: 40 · 0,85 = 34 €.', 1, null);

insert into public.concepts (id, slug, title, description) values
  ('b1000000-0000-4000-8000-000000000003', 'integers-add-subtract', 'Sumar y restar enteros', 'Operar con números positivos y negativos usando la regla de los signos.'),
  ('b1000000-0000-4000-8000-000000000004', 'integers-multiply-divide', 'Multiplicar y dividir enteros', 'Aplicar la regla de los signos en productos y cocientes de enteros.'),
  ('b1000000-0000-4000-8000-000000000005', 'integers-combined-operations', 'Operaciones combinadas con enteros', 'Respetar la jerarquía de operaciones y los paréntesis con números enteros.'),
  ('b1000000-0000-4000-8000-000000000006', 'fractions-equivalent', 'Fracciones equivalentes', 'Reconocer, simplificar y amplificar fracciones que representan la misma cantidad.'),
  ('b1000000-0000-4000-8000-000000000007', 'fractions-add-subtract', 'Sumar y restar fracciones', 'Reducir a común denominador para sumar y restar fracciones.'),
  ('b1000000-0000-4000-8000-000000000008', 'fractions-multiply-divide', 'Multiplicar y dividir fracciones', 'Multiplicar en línea y dividir multiplicando por la inversa.'),
  ('b1000000-0000-4000-8000-000000000001', 'linear-equations-basic', 'Ecuaciones lineales básicas', 'Resolver ecuaciones de la forma ax + b = c despejando la incógnita.'),
  ('b1000000-0000-4000-8000-000000000002', 'linear-equations-parentheses', 'Ecuaciones con paréntesis', 'Resolver ecuaciones que requieren aplicar la propiedad distributiva antes de despejar.'),
  ('b1000000-0000-4000-8000-000000000009', 'linear-equations-fractions', 'Ecuaciones con denominadores', 'Eliminar denominadores multiplicando por el mínimo común múltiplo.'),
  ('b1000000-0000-4000-8000-000000000010', 'linear-equations-word-problems', 'Problemas con ecuaciones', 'Traducir un enunciado a una ecuación y resolverla.'),
  ('b1000000-0000-4000-8000-000000000011', 'proportions-direct', 'Proporcionalidad directa', 'Resolver problemas con magnitudes directamente proporcionales y reglas de tres.'),
  ('b1000000-0000-4000-8000-000000000012', 'percentages-basic', 'Porcentajes', 'Calcular porcentajes, aumentos y descuentos.');

insert into public.concept_prerequisites (concept_id, prerequisite_id, min_mastery) values
  ('b1000000-0000-4000-8000-000000000004', 'b1000000-0000-4000-8000-000000000003', 0.5),
  ('b1000000-0000-4000-8000-000000000005', 'b1000000-0000-4000-8000-000000000003', 0.6),
  ('b1000000-0000-4000-8000-000000000005', 'b1000000-0000-4000-8000-000000000004', 0.6),
  ('b1000000-0000-4000-8000-000000000007', 'b1000000-0000-4000-8000-000000000006', 0.6),
  ('b1000000-0000-4000-8000-000000000008', 'b1000000-0000-4000-8000-000000000006', 0.5),
  ('b1000000-0000-4000-8000-000000000001', 'b1000000-0000-4000-8000-000000000005', 0.5),
  ('b1000000-0000-4000-8000-000000000002', 'b1000000-0000-4000-8000-000000000001', 0.6),
  ('b1000000-0000-4000-8000-000000000009', 'b1000000-0000-4000-8000-000000000001', 0.6),
  ('b1000000-0000-4000-8000-000000000009', 'b1000000-0000-4000-8000-000000000007', 0.5),
  ('b1000000-0000-4000-8000-000000000010', 'b1000000-0000-4000-8000-000000000001', 0.6),
  ('b1000000-0000-4000-8000-000000000011', 'b1000000-0000-4000-8000-000000000006', 0.5),
  ('b1000000-0000-4000-8000-000000000012', 'b1000000-0000-4000-8000-000000000006', 0.5),
  ('b1000000-0000-4000-8000-000000000012', 'b1000000-0000-4000-8000-000000000011', 0.5);

insert into public.lesson_concepts (lesson_id, concept_id) values
  ('a3000000-0000-4000-8000-000000000002', 'b1000000-0000-4000-8000-000000000003'),
  ('a3000000-0000-4000-8000-000000000003', 'b1000000-0000-4000-8000-000000000004'),
  ('a3000000-0000-4000-8000-000000000004', 'b1000000-0000-4000-8000-000000000005'),
  ('a3000000-0000-4000-8000-000000000005', 'b1000000-0000-4000-8000-000000000006'),
  ('a3000000-0000-4000-8000-000000000006', 'b1000000-0000-4000-8000-000000000007'),
  ('a3000000-0000-4000-8000-000000000007', 'b1000000-0000-4000-8000-000000000008'),
  ('a3000000-0000-4000-8000-000000000001', 'b1000000-0000-4000-8000-000000000001'),
  ('a3000000-0000-4000-8000-000000000001', 'b1000000-0000-4000-8000-000000000002'),
  ('a3000000-0000-4000-8000-000000000008', 'b1000000-0000-4000-8000-000000000009'),
  ('a3000000-0000-4000-8000-000000000009', 'b1000000-0000-4000-8000-000000000010'),
  ('a3000000-0000-4000-8000-000000000010', 'b1000000-0000-4000-8000-000000000011'),
  ('a3000000-0000-4000-8000-000000000011', 'b1000000-0000-4000-8000-000000000012');

insert into public.exercises (id, concept_id, type, difficulty, content) values
  ('c1000000-0000-4000-8000-000000000007', 'b1000000-0000-4000-8000-000000000003', 'multiple_choice', 1, '{"question":"Calcula: (−7) + 4","options":[{"id":"a","text":"−3"},{"id":"b","text":"3"},{"id":"c","text":"−11"},{"id":"d","text":"11"}],"correctOptionId":"a","explanation":"Tienen signo distinto: restamos 7 − 4 = 3 y ponemos el signo del mayor en valor absoluto (−7). Resultado: −3."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000008', 'b1000000-0000-4000-8000-000000000003', 'numeric', 1, '{"question":"Calcula: 5 − 12","correctAnswer":-7,"explanation":"5 − 12 es lo mismo que 5 + (−12). Como 12 > 5, el resultado es negativo: −7."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000009', 'b1000000-0000-4000-8000-000000000003', 'numeric', 2, '{"question":"Calcula: (−8) − (−3)","correctAnswer":-5,"explanation":"Restar un negativo es sumar su opuesto: (−8) − (−3) = −8 + 3 = −5."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000010', 'b1000000-0000-4000-8000-000000000004', 'multiple_choice', 1, '{"question":"Calcula: (−6) · (−4)","options":[{"id":"a","text":"24"},{"id":"b","text":"−24"},{"id":"c","text":"−10"},{"id":"d","text":"10"}],"correctOptionId":"a","explanation":"Signos iguales dan positivo: (−6) · (−4) = 24."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000011', 'b1000000-0000-4000-8000-000000000004', 'numeric', 2, '{"question":"Calcula: 36 : (−9)","correctAnswer":-4,"explanation":"Signos distintos dan negativo: 36 : 9 = 4, por tanto 36 : (−9) = −4."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000012', 'b1000000-0000-4000-8000-000000000004', 'multiple_choice', 3, '{"question":"Calcula: (−2) · (−3) · (−5)","options":[{"id":"a","text":"30"},{"id":"b","text":"−30"},{"id":"c","text":"10"},{"id":"d","text":"−10"}],"correctOptionId":"b","explanation":"Hay tres factores negativos (número impar), así que el resultado es negativo: 2 · 3 · 5 = 30 → −30."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000013', 'b1000000-0000-4000-8000-000000000005', 'numeric', 2, '{"question":"Calcula: 3 + 4 · (−2)","correctAnswer":-5,"explanation":"Primero la multiplicación: 4 · (−2) = −8. Después la suma: 3 + (−8) = −5."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000014', 'b1000000-0000-4000-8000-000000000005', 'numeric', 3, '{"question":"Calcula: (5 − 8) · 2 + 6","correctAnswer":0,"explanation":"Paréntesis primero: 5 − 8 = −3. Luego (−3) · 2 = −6. Finalmente −6 + 6 = 0."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000015', 'b1000000-0000-4000-8000-000000000005', 'multiple_choice', 3, '{"question":"Calcula: 12 : (−3) − 2 · (−4)","options":[{"id":"a","text":"4"},{"id":"b","text":"−12"},{"id":"c","text":"−4"},{"id":"d","text":"12"}],"correctOptionId":"a","explanation":"12 : (−3) = −4 y 2 · (−4) = −8. Entonces −4 − (−8) = −4 + 8 = 4."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000016', 'b1000000-0000-4000-8000-000000000006', 'multiple_choice', 1, '{"question":"¿Cuál de estas fracciones es equivalente a 3/4?","options":[{"id":"a","text":"6/8"},{"id":"b","text":"4/5"},{"id":"c","text":"9/16"},{"id":"d","text":"3/8"}],"correctOptionId":"a","explanation":"Multiplicando numerador y denominador por 2: 3/4 = 6/8."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000017', 'b1000000-0000-4000-8000-000000000006', 'numeric', 2, '{"question":"Simplifica 18/24 hasta la fracción irreducible. ¿Cuál es su numerador?","correctAnswer":3,"explanation":"El máximo común divisor de 18 y 24 es 6: 18/24 = 3/4. El numerador es 3."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000018', 'b1000000-0000-4000-8000-000000000006', 'multiple_choice', 2, '{"question":"Completa: 2/5 = x/20. ¿Cuánto vale x?","options":[{"id":"a","text":"8"},{"id":"b","text":"4"},{"id":"c","text":"10"},{"id":"d","text":"17"}],"correctOptionId":"a","explanation":"De 5 a 20 se multiplica por 4, así que el numerador también: 2 · 4 = 8."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000019', 'b1000000-0000-4000-8000-000000000007', 'multiple_choice', 2, '{"question":"Calcula: 1/2 + 1/3","options":[{"id":"a","text":"5/6"},{"id":"b","text":"2/5"},{"id":"c","text":"1/6"},{"id":"d","text":"2/6"}],"correctOptionId":"a","explanation":"Común denominador 6: 1/2 = 3/6 y 1/3 = 2/6. Sumamos: 3/6 + 2/6 = 5/6."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000020', 'b1000000-0000-4000-8000-000000000007', 'multiple_choice', 3, '{"question":"Calcula: 3/4 − 1/6","options":[{"id":"a","text":"7/12"},{"id":"b","text":"1/2"},{"id":"c","text":"2/12"},{"id":"d","text":"1"}],"correctOptionId":"a","explanation":"Común denominador 12: 3/4 = 9/12 y 1/6 = 2/12. Restamos: 9/12 − 2/12 = 7/12."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000021', 'b1000000-0000-4000-8000-000000000007', 'numeric', 3, '{"question":"Calcula 2/3 + 5/6 y expresa el resultado como número decimal.","correctAnswer":1.5,"tolerance":0.01,"explanation":"2/3 = 4/6, así que 4/6 + 5/6 = 9/6 = 3/2 = 1,5."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000022', 'b1000000-0000-4000-8000-000000000008', 'multiple_choice', 2, '{"question":"Calcula: 2/3 · 3/4","options":[{"id":"a","text":"1/2"},{"id":"b","text":"5/7"},{"id":"c","text":"6/7"},{"id":"d","text":"8/9"}],"correctOptionId":"a","explanation":"Multiplicamos en línea: (2 · 3)/(3 · 4) = 6/12 = 1/2."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000023', 'b1000000-0000-4000-8000-000000000008', 'multiple_choice', 3, '{"question":"Calcula: (3/5) : (2/5)","options":[{"id":"a","text":"3/2"},{"id":"b","text":"6/25"},{"id":"c","text":"2/3"},{"id":"d","text":"5/10"}],"correctOptionId":"a","explanation":"Dividir es multiplicar por la inversa: 3/5 · 5/2 = 15/10 = 3/2."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000024', 'b1000000-0000-4000-8000-000000000008', 'numeric', 2, '{"question":"Calcula los 3/4 de 20.","correctAnswer":15,"explanation":"3/4 de 20 = 20 : 4 · 3 = 5 · 3 = 15."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000001', 'b1000000-0000-4000-8000-000000000001', 'multiple_choice', 1, '{"question":"¿Cuál es el valor de x en la ecuación 2x + 4 = 10?","options":[{"id":"a","text":"x = 2"},{"id":"b","text":"x = 3"},{"id":"c","text":"x = 4"},{"id":"d","text":"x = 6"}],"correctOptionId":"b","explanation":"Restamos 4 a ambos lados: 2x = 6. Dividimos entre 2: x = 3."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000002', 'b1000000-0000-4000-8000-000000000001', 'numeric', 2, '{"question":"Resuelve: 3x − 5 = 10. ¿Cuánto vale x?","correctAnswer":5,"explanation":"Sumamos 5 a ambos lados: 3x = 15. Dividimos entre 3: x = 5."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000003', 'b1000000-0000-4000-8000-000000000001', 'multiple_choice', 2, '{"question":"¿Qué operación debes hacer primero para resolver 4x + 8 = 20?","options":[{"id":"a","text":"Dividir ambos lados entre 4"},{"id":"b","text":"Restar 8 a ambos lados"},{"id":"c","text":"Sumar 8 a ambos lados"},{"id":"d","text":"Multiplicar ambos lados por 4"}],"correctOptionId":"b","explanation":"Primero aislamos el término con x eliminando el 8: 4x = 12. Después dividimos entre 4: x = 3."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000004', 'b1000000-0000-4000-8000-000000000002', 'numeric', 3, '{"question":"Resuelve: 2(x + 3) = 14. ¿Cuánto vale x?","correctAnswer":4,"explanation":"Distribuimos: 2x + 6 = 14. Restamos 6: 2x = 8. Dividimos entre 2: x = 4."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000005', 'b1000000-0000-4000-8000-000000000002', 'multiple_choice', 3, '{"question":"Al resolver 3(x − 2) = 9, ¿cuál es el valor correcto de x?","options":[{"id":"a","text":"x = 1"},{"id":"b","text":"x = 3"},{"id":"c","text":"x = 5"},{"id":"d","text":"x = 7"}],"correctOptionId":"c","explanation":"Distribuimos: 3x − 6 = 9. Sumamos 6: 3x = 15. Dividimos entre 3: x = 5."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000006', 'b1000000-0000-4000-8000-000000000002', 'numeric', 4, '{"question":"Resuelve: 5(x + 1) − 2x = 14. ¿Cuánto vale x?","correctAnswer":3,"tolerance":0,"explanation":"Distribuimos: 5x + 5 − 2x = 14 → 3x + 5 = 14 → 3x = 9 → x = 3."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000025', 'b1000000-0000-4000-8000-000000000009', 'numeric', 2, '{"question":"Resuelve: x/2 + 3 = 7. ¿Cuánto vale x?","correctAnswer":8,"explanation":"Restamos 3: x/2 = 4. Multiplicamos por 2: x = 8."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000026', 'b1000000-0000-4000-8000-000000000009', 'multiple_choice', 3, '{"question":"Resuelve: x/3 − 1 = 2","options":[{"id":"a","text":"x = 9"},{"id":"b","text":"x = 3"},{"id":"c","text":"x = 1"},{"id":"d","text":"x = 6"}],"correctOptionId":"a","explanation":"Sumamos 1: x/3 = 3. Multiplicamos por 3: x = 9."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000027', 'b1000000-0000-4000-8000-000000000009', 'numeric', 3, '{"question":"Resuelve: (x + 1)/2 = 4. ¿Cuánto vale x?","correctAnswer":7,"explanation":"Multiplicamos por 2: x + 1 = 8. Restamos 1: x = 7."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000028', 'b1000000-0000-4000-8000-000000000010', 'numeric', 2, '{"question":"El doble de un número más 5 es 17. ¿Cuál es el número?","correctAnswer":6,"explanation":"Llamamos x al número: 2x + 5 = 17 → 2x = 12 → x = 6."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000029', 'b1000000-0000-4000-8000-000000000010', 'multiple_choice', 3, '{"question":"Ana tiene 3 años más que Luis y entre los dos suman 25 años. ¿Cuántos años tiene Luis?","options":[{"id":"a","text":"11"},{"id":"b","text":"14"},{"id":"c","text":"12"},{"id":"d","text":"8"}],"correctOptionId":"a","explanation":"Si Luis tiene x años, Ana tiene x + 3: x + (x + 3) = 25 → 2x = 22 → x = 11."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000030', 'b1000000-0000-4000-8000-000000000010', 'numeric', 4, '{"question":"Un rectángulo mide 4 cm más de largo que de ancho y su perímetro es 28 cm. ¿Cuánto mide el ancho?","correctAnswer":5,"unit":"cm","explanation":"Ancho x, largo x + 4. Perímetro: 2x + 2(x + 4) = 28 → 4x + 8 = 28 → 4x = 20 → x = 5 cm."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000031', 'b1000000-0000-4000-8000-000000000011', 'numeric', 2, '{"question":"Tres cuadernos cuestan 4,50 €. ¿Cuánto cuestan 7 cuadernos?","correctAnswer":10.5,"tolerance":0.01,"unit":"€","explanation":"Un cuaderno cuesta 4,50 : 3 = 1,50 €. Siete cuestan 1,50 · 7 = 10,50 €."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000032', 'b1000000-0000-4000-8000-000000000011', 'multiple_choice', 2, '{"question":"Si 5 kg de naranjas cuestan 8 €, ¿cuánto cuestan 15 kg?","options":[{"id":"a","text":"24 €"},{"id":"b","text":"18 €"},{"id":"c","text":"40 €"},{"id":"d","text":"13 €"}],"correctOptionId":"a","explanation":"15 kg es el triple de 5 kg, así que el precio también se triplica: 8 · 3 = 24 €."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000033', 'b1000000-0000-4000-8000-000000000011', 'numeric', 3, '{"question":"Halla x en la proporción x/12 = 5/4.","correctAnswer":15,"explanation":"Multiplicamos en cruz: 4x = 60 → x = 15."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000034', 'b1000000-0000-4000-8000-000000000012', 'numeric', 1, '{"question":"Calcula el 25 % de 80.","correctAnswer":20,"explanation":"25 % es la cuarta parte: 80 : 4 = 20. También: 80 · 25/100 = 20."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000035', 'b1000000-0000-4000-8000-000000000012', 'multiple_choice', 3, '{"question":"Una camiseta de 40 € tiene un 15 % de descuento. ¿Cuánto pagas?","options":[{"id":"a","text":"34 €"},{"id":"b","text":"6 €"},{"id":"c","text":"25 €"},{"id":"d","text":"36 €"}],"correctOptionId":"a","explanation":"El descuento es 40 · 0,15 = 6 €. Pagas 40 − 6 = 34 € (o directamente 40 · 0,85)."}'::jsonb),
  ('c1000000-0000-4000-8000-000000000036', 'b1000000-0000-4000-8000-000000000012', 'numeric', 3, '{"question":"¿Qué porcentaje de 50 es 12?","correctAnswer":24,"unit":"%","explanation":"12/50 = 0,24, es decir, el 24 %."}'::jsonb);
