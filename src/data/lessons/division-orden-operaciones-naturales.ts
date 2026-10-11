import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1_SUBTITLE } from "@/data/lessons/shared";

export const divisionOrdenOperacionesNaturalesLesson: InteractiveLesson = {
  slug: "division-orden-operaciones-naturales",
  title: "4. Orden de operaciones",
  subtitle: TEMA_1_SUBTITLE,
  stage: { theme: "paper" },
  steps: [
    {
      id: "exploracion-quien",
      type: "predict",
      title: "¿Quién tiene razón?",
      question:
        "Ana calcula $4 + 3 \\times 2$ y obtiene $14$. Leo obtiene $10$. ¿Quién aplica correctamente la prioridad de operaciones y por qué?",
      mode: "choice",
      choices: [
        { id: "a", label: "Ana" },
        { id: "l", label: "Leo" },
        {
          id: "b",
          label: "Las dos",
          incorrectFeedback:
            "No pueden las dos: solo hay un total correcto en la caja.",
        },
      ],
      correctChoiceId: "l",
      module: "jerarquia-operaciones",
      scene: "exploracion-ana-leo",
      explanation: "Primero $3 \\times 2 = 6$; luego $4 + 6 = 10$.",
    },
    {
      id: "explicacion-niveles",
      type: "narrate",
      title: "El orden de las operaciones",
      module: "jerarquia-operaciones",
      scene: "niveles-reglas",
    },
    {
      id: "practica-mul-primero",
      type: "explore",
      title: "Pulsa lo primero",
      question: "Pulsa la operación que harías primero en $4 + 3 − 2 × 3$.",
      module: "jerarquia-operaciones",
      scene: "practica-reducir",
      goal: {
        kind: "hierarchy-reduce",
        tokens: ["4", "+", "3", "−", "2", "×", "3"],
      },
      explanation: "Primero $2 \\times 3 = 6$; al final queda $1$.",
    },
    {
      id: "practica-parentesis",
      type: "explore",
      title: "Pulsa lo primero",
      question: "Ahora con paréntesis: $4 + ( 3 − 2 ) × 3$.",
      module: "jerarquia-operaciones",
      scene: "practica-reducir",
      goal: {
        kind: "hierarchy-reduce",
        tokens: ["4", "+", "(", "3", "−", "2", ")", "×", "3"],
      },
      explanation: "$(3 - 2) = 1$, luego $1 \\times 3 = 3$ y $4 + 3 = 7$.",
    },
    {
      id: "resumen-niveles",
      type: "narrate",
      title: "¡Lección completada!",
      module: "jerarquia-operaciones",
      scene: "resumen-niveles",
    },
  ],
};
