import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_2_SUBTITLE } from "@/data/lessons/shared";

export const sistemasEquivalentesCcss2Lesson: InteractiveLesson = {
  slug: "sistemas-equivalentes-ccss2",
  title: "4. Sistemas equivalentes",
  subtitle: TEMA_CCSS2_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "equivalentes",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Mismas soluciones, otra forma"
        }
      ],
      "title": "Mismas soluciones, otra forma",
      "blocks": [
        {
          "kind": "definition",
          "text": "Dos sistemas son **equivalentes** si tienen exactamente las mismas soluciones."
        },
        {
          "kind": "steps",
          "items": [
            "Multiplicar una ecuación por un número **distinto de cero**.",
            "**Sumar** a una ecuación un múltiplo de otra.",
            "**Intercambiar** el orden de dos ecuaciones.",
            "Eliminar una ecuación que sea combinación de las otras (o repetida)."
          ]
        },
        {
          "kind": "warning",
          "text": "Multiplicar una ecuación por $0$ la convierte en $0 = 0$ y se pierde información: no es una operación permitida."
        }
      ]
    },
    {
      "id": "ejemplo",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Un sistema y su equivalente"
        }
      ],
      "title": "Un sistema y su equivalente",
      "blocks": [
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\begin{cases} 2x + y = 7 \\\\ x - y = 2 \\end{cases}\\ \\xrightarrow{E_1 + E_2}\\ \\begin{cases} 2x + y = 7 \\\\ 3x = 9 \\end{cases}"
            },
            {
              "math": "x = 3,\\ y = 1 \\text{ en ambos sistemas}"
            }
          ]
        },
        {
          "kind": "text",
          "text": "Este es el principio del **método de Gauss**: transformar el sistema en otro equivalente cada vez más sencillo, hasta que se pueda resolver de abajo hacia arriba."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "sistema-grafico-explorador",
        "initial": [
          2,
          1,
          7,
          3,
          0,
          9
        ],
        "hint": "Después de sumar las dos ecuaciones, 3x = 9 es una recta vertical que sigue pasando por el mismo punto (3, 1)."
      }
    },
    {
      "id": "check-suma",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Suma los coeficientes de $x$."
        }
      ],
      "title": "Sumar ecuaciones",
      "question": "En $\\begin{cases} 2x + y = 7 \\\\ x - y = 2 \\end{cases}$, al sustituir $E_2$ por $E_1 + E_2$ aparece $a\\,x = 9$. ¿Cuánto vale $a$? (solo el número)",
      "correctAnswers": [
        "3"
      ],
      "explanation": "$(2x + x) + (y - y) = 7 + 2 \\Rightarrow 3x = 9$."
    },
    {
      "id": "check-no",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en qué se pierde."
        }
      ],
      "title": "Operación no permitida",
      "question": "¿Cuál de estas operaciones **no** da un sistema equivalente?",
      "choices": [
        {
          "id": "a",
          "label": "Multiplicar una ecuación por $0$"
        },
        {
          "id": "b",
          "label": "Multiplicar una ecuación por $-2$",
          "incorrectFeedback": "Un factor distinto de cero conserva las soluciones."
        },
        {
          "id": "c",
          "label": "Intercambiar dos ecuaciones",
          "incorrectFeedback": "El orden de las ecuaciones no importa."
        },
        {
          "id": "d",
          "label": "Sumar a una ecuación el doble de otra",
          "incorrectFeedback": "Es una transformación de Gauss válida."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Con $0$ la ecuación se destruye."
    },
    {
      "id": "check-equiv",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Resta las dos ecuaciones."
        }
      ],
      "title": "¿Equivalentes?",
      "question": "El sistema $\\begin{cases} x + y = 4 \\\\ x - y = 2 \\end{cases}$ tiene como solución $x = 3$, $y = 1$. Al restar ($E_1 - E_2$) aparece $b\\,y = 2$. ¿Cuánto vale $b$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$(x - x) + (y + y) = 4 - 2 \\Rightarrow 2y = 2$, luego $y = 1$."
    }
  ],
};
