import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_8_SUBTITLE } from "@/data/lessons/shared";

export const algebraResolucionPrimerGradoLesson: InteractiveLesson = {
  slug: "algebra-resolucion-primer-grado",
  title: "5. Ecuaciones de primer grado",
  subtitle: TEMA_1ESO_8_SUBTITLE,
  steps: [
    {
      id: "metodo",
      type: "concept",
      title: "Reducir y transponer",
      content: [
        "Para resolver una ecuación la transformamos en otras **equivalentes** más sencillas hasta **despejar** la incógnita.",
        "Dos recursos: **reducir** términos semejantes en cada miembro y **transponer** términos de un miembro al otro (cambiando el signo).",
        "Ejemplo: $7x - 2x + 4 = 8 + 3x + 2$. Reducimos → $5x + 4 = 10 + 3x$. Transponemos $3x$ → $2x + 4 = 10$. Transponemos $4$ → $2x = 6$. Dividimos → $x = 3$.",
      ],
    },
    {
      id: "comprobacion",
      type: "concept",
      title: "Comprobar la solución",
      content: [
        "Sustituye el valor hallado en la ecuación **original** y verifica que ambos miembros coinciden.",
        "Con $x = 3$: $7 \\cdot 3 - 2 \\cdot 3 + 4 = 19$ y $8 + 3 \\cdot 3 + 2 = 19$.",
        "La comprobación detecta errores de cálculo al transponer o reducir.",
      ],
      visuals: [
        {
          kind: "stack",
          title: "Comprobación con $x = 3$",
          rows: ["7 \\cdot 3 - 2 \\cdot 3 + 4", "8 + 3 \\cdot 3 + 2"],
          operator: "=",
          result: "19",
          caption: "La igualdad se cumple.",
        },
      ],
    },
    {
      id: "ejemplo-animado",
      type: "animated_solution",
      title: "Ecuación con términos en ambos miembros",
      content: ["Resuelve: $5 - 4x = 7 + 8x - 6$."],
      frames: [
        {
          caption: "Reducimos el segundo miembro:",
          math: "5 - 4x = 1 + 8x",
        },
        {
          caption: "Transponemos $8x$ y el $1$:",
          math: "5 - 1 = 12x \\Rightarrow 4 = 12x",
        },
        {
          caption: "Dividimos entre $12$:",
          math: "x = \\frac{1}{3}",
        },
      ],
    },
    {
      id: "check",
      type: "multiple_choice",
      title: "Comprueba lo aprendido",
      question: "Tras reducir, ¿cuál es el siguiente paso sensato en $5x + 4 = 10 + 3x$?",
      options: [
        { id: "a", text: "Dividir todo entre $5$." },
        { id: "b", text: "Restar $3x$ en ambos miembros." },
        { id: "c", text: "Sustituir $x = 0$." },
      ],
      correctOptionId: "b",
      explanation: "Conviene agrupar las $x$ en un solo miembro: $5x - 3x + 4 = 10$.",
    },
  ],
};
