import type { Curriculum } from "@/content/types";

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
      modules: [],
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
          lessons: [
            {
              id: lessonId(701),
              title: "Sistemas de ecuaciones no lineales",
              summary:
                "Identifica sistemas no lineales, aplica sustitución paso a paso y comprueba las soluciones.",
              orderIndex: 1,
              kind: "interactive",
              interactiveSlug: "sistemas-no-lineales",
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
