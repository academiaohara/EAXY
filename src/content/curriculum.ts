import type { Curriculum } from "@/content/types";
import { sistemasEcuacionesTopicExercises } from "@/data/topic-exercises/sistemas-ecuaciones";

/**
 * Fuente única de verdad del contenido curricular de desarrollo.
 *
 * - `supabase/seed.sql` se genera desde aquí con `npm run seed:generate`.
 * - El modo mock E2E lee este catálogo directamente, sin base de datos.
 *
 * Los UUID son fijos para que las referencias sean estables entre entornos.
 */

function courseId(n: number) {
  return `a1000000-0000-4000-8000-${n.toString().padStart(12, "0")}`;
}
function moduleId(n: number) {
  return `a2000000-0000-4000-8000-${n.toString().padStart(12, "0")}`;
}
function lessonId(n: number) {
  return `a3000000-0000-4000-8000-${n.toString().padStart(12, "0")}`;
}

export const curriculum: Curriculum = {
  courses: [
    {
      id: courseId(1),
      title: "Matemáticas 1º ESO",
      description: "Primer curso de matemáticas de la ESO.",
      orderIndex: 1,
      modules: [
        {
          id: moduleId(1),
          title: "Los números naturales",
          orderIndex: 1,
          lessons: [
            {
              id: lessonId(101),
              title: "1. Origen y sistemas de numeración",
              summary: "Sistemas aditivos y posicionales: egipcio, romano y decimal.",
              orderIndex: 1,
              kind: "interactive",
              interactiveSlug: "sistemas-numeracion-naturales",
              conceptSlugs: [],
            },
            {
              id: lessonId(102),
              title: "2. Aproximación por redondeo",
              summary: "Regla del redondeo y aproximaciones a distintos órdenes.",
              orderIndex: 2,
              kind: "interactive",
              interactiveSlug: "aproximacion-redondeo-naturales",
              conceptSlugs: [],
            },
            {
              id: lessonId(103),
              title: "3. Suma y resta",
              summary: "Paréntesis, propiedades conmutativa y asociativa, problemas.",
              orderIndex: 3,
              kind: "interactive",
              interactiveSlug: "suma-resta-naturales",
              conceptSlugs: [],
            },
            {
              id: lessonId(104),
              title: "4. Multiplicación",
              summary: "Propiedades, distributiva y trucos de cálculo mental.",
              orderIndex: 4,
              kind: "interactive",
              interactiveSlug: "multiplicacion-naturales",
              conceptSlugs: [],
            },
            {
              id: lessonId(105),
              title: "5. División y orden de operaciones",
              summary: "Divisiones exactas y enteras; prioridad de operaciones.",
              orderIndex: 5,
              kind: "interactive",
              interactiveSlug: "division-orden-operaciones-naturales",
              conceptSlugs: [],
            },
          ],
        },
        {
          id: moduleId(2),
          title: "Potencias y raíces",
          orderIndex: 2,
          lessons: [
            {
              id: lessonId(201),
              title: "1. Potencias: base y exponente",
              summary: "Base, exponente, cuadrado, cubo, exponente cero y cálculo.",
              orderIndex: 1,
              kind: "interactive",
              interactiveSlug: "potencias-base-exponente",
              conceptSlugs: [],
            },
            {
              id: lessonId(202),
              title: "2. Potencias de base 10",
              summary: "Ceros y exponente; leer números grandes con potencias de 10.",
              orderIndex: 2,
              kind: "interactive",
              interactiveSlug: "potencias-base-10",
              conceptSlugs: [],
            },
            {
              id: lessonId(203),
              title: "3. Números grandes abreviados",
              summary: "Forma a · 10^n; ejemplo del año luz y cantidades reales.",
              orderIndex: 3,
              kind: "interactive",
              interactiveSlug: "numeros-grandes-abreviados",
              conceptSlugs: [],
            },
            {
              id: lessonId(204),
              title: "4. Raíz cuadrada",
              summary: "Raíz exacta, raíz entera, cuadrados perfectos y problemas.",
              orderIndex: 4,
              kind: "interactive",
              interactiveSlug: "raiz-cuadrada-naturales",
              conceptSlugs: [],
            },
          ],
        },
      ],
    },
    {
      id: courseId(2),
      title: "Matemáticas 2º ESO",
      description: "Segundo curso de matemáticas de la ESO.",
      orderIndex: 2,
      modules: [],
    },
    {
      id: courseId(3),
      title: "Matemáticas 3º ESO",
      description: "Tercer curso de matemáticas de la ESO.",
      orderIndex: 3,
      modules: [],
    },
    {
      id: courseId(4),
      title: "Matemáticas 4º ESO",
      description: "Cuarto curso de matemáticas de la ESO.",
      orderIndex: 4,
      modules: [
        {
          id: moduleId(7),
          title: "Sistemas de ecuaciones",
          orderIndex: 1,
          topicExercises: sistemasEcuacionesTopicExercises,
          lessons: [
            {
              id: lessonId(701),
              title: "1. Ecuaciones lineales con dos incógnitas",
              summary: "Soluciones, representación gráfica y rectas horizontales/verticales.",
              orderIndex: 1,
              kind: "interactive",
              interactiveSlug: "ecuaciones-lineales-dos-incognitas",
              conceptSlugs: [],
            },
            {
              id: lessonId(702),
              title: "2. Sistemas de ecuaciones lineales",
              summary: "Solución gráfica, sistemas compatibles, incompatibles e indeterminados.",
              orderIndex: 2,
              kind: "interactive",
              interactiveSlug: "sistemas-lineales-grafica",
              conceptSlugs: [],
            },
            {
              id: lessonId(703),
              title: "3. Resolución de sistemas lineales",
              summary: "Métodos de sustitución, igualación y reducción con ejemplos animados.",
              orderIndex: 3,
              kind: "interactive",
              interactiveSlug: "resolucion-sistemas-lineales",
              conceptSlugs: [],
            },
            {
              id: lessonId(704),
              title: "4. Sistemas no lineales",
              summary: "Identificación, sustitución paso a paso y comprobación de soluciones.",
              orderIndex: 4,
              kind: "interactive",
              interactiveSlug: "sistemas-no-lineales",
              conceptSlugs: [],
            },
            {
              id: lessonId(705),
              title: "5. Problemas con sistemas de ecuaciones",
              summary: "Traducir enunciados a sistemas y resolver problemas contextualizados.",
              orderIndex: 5,
              kind: "interactive",
              interactiveSlug: "problemas-con-sistemas",
              conceptSlugs: [],
            },
          ],
        },
      ],
    },
    {
      id: courseId(5),
      title: "Matemáticas 1º Bachillerato",
      description: "Primer curso de matemáticas de Bachillerato.",
      orderIndex: 5,
      modules: [],
    },
    {
      id: courseId(6),
      title: "Matemáticas 2º Bachillerato",
      description: "Segundo curso de matemáticas de Bachillerato.",
      orderIndex: 6,
      modules: [],
    },
  ],

  concepts: [],
  exercises: [],
};
