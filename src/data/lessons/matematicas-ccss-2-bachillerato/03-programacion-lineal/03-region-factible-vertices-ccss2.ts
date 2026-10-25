import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_3_SUBTITLE } from "@/data/lessons/shared";

export const regionFactibleVerticesCcss2Lesson: InteractiveLesson = {
  slug: "region-factible-vertices-ccss2",
  title: "3. Región factible y vértices",
  subtitle: TEMA_CCSS2_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "region",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "La región de soluciones posibles"
        }
      ],
      "title": "La región de soluciones posibles",
      "blocks": [
        {
          "kind": "definition",
          "text": "En un problema de programación lineal, la **región factible** es el conjunto de puntos que cumplen **todas** las restricciones (incluidas $x \\geq 0$ e $y \\geq 0$). Si está acotada es un polígono convexo."
        },
        {
          "kind": "text",
          "text": "Sus **vértices** son puntos de corte de dos rectas de restricción (o de una restricción con un eje) que cumplen las demás desigualdades. Para hallarlos se resuelve un sistema $2\\times2$ por cada pareja de rectas."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\begin{cases} x + y \\leq 6 \\\\ 2x + y \\leq 8 \\\\ x, y \\geq 0 \\end{cases}\\ \\Rightarrow\\ (0,0),\\ (4,0),\\ (2,4),\\ (0,6)"
            },
            {
              "math": "(2, 4):\\ x + y = 6,\\ 2x + y = 8 \\Rightarrow x = 2,\\ y = 4"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "programacion-lineal-explorador",
        "initial": [
          0,
          0
        ],
        "hint": "Región de x + y ≤ 6, 2x + y ≤ 8, x ≥ 0, y ≥ 0: un cuadrilátero con cuatro vértices."
      }
    },
    {
      "id": "check-region",
      "type": "classify",
      "help": [
        {
          "label": "Pista",
          "message": "Comprueba las cuatro desigualdades."
        }
      ],
      "title": "¿Región factible?",
      "question": "Para las restricciones $x + y \\leq 6$, $2x + y \\leq 8$, $x \\geq 0$, $y \\geq 0$, decide si cada punto es factible.",
      "groups": [
        {
          "id": "si",
          "label": "Factible",
          "tone": "emerald"
        },
        {
          "id": "no",
          "label": "No factible",
          "tone": "rose"
        }
      ],
      "items": [
        {
          "id": "a",
          "text": "$(1, 1)$",
          "group": "si"
        },
        {
          "id": "b",
          "text": "$(2, 4)$ (vértice)",
          "group": "si"
        },
        {
          "id": "c",
          "text": "$(3, 3)$",
          "group": "no"
        },
        {
          "id": "d",
          "text": "$(0, 7)$",
          "group": "no"
        },
        {
          "id": "e",
          "text": "$(-1, 2)$",
          "group": "no"
        },
        {
          "id": "f",
          "text": "$(4, 0)$",
          "group": "si"
        }
      ],
      "hint": "$(3,3)$: $2\\cdot3 + 3 = 9 > 8$. $(0,7)$: $7 > 6$. $(-1,2)$ viola $x \\geq 0$."
    },
    {
      "id": "check-y",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Resta las dos ecuaciones."
        }
      ],
      "title": "Un vértice",
      "question": "El vértice donde se cortan $x + y = 6$ y $2x + y = 8$ es $(2, y)$. ¿Cuánto vale $y$? (solo el número)",
      "correctAnswers": [
        "4"
      ],
      "explanation": "Restando: $x = 2$ y $y = 6 - 2 = 4$."
    },
    {
      "id": "check-n",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Mira el dibujo."
        }
      ],
      "title": "Número de vértices",
      "question": "¿Cuántos vértices tiene esa región factible? (solo el número)",
      "correctAnswers": [
        "4"
      ],
      "explanation": "$(0,0),\\ (4,0),\\ (2,4),\\ (0,6)$."
    },
    {
      "id": "check-eje",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $y = 0$ en cada recta."
        }
      ],
      "title": "Vértices sobre los ejes",
      "question": "El vértice $(4, 0)$ es el corte de…",
      "choices": [
        {
          "id": "a",
          "label": "$2x + y = 8$ con el eje $X$"
        },
        {
          "id": "b",
          "label": "$x + y = 6$ con el eje $X$",
          "incorrectFeedback": "Esa recta corta al eje $X$ en $(6, 0)$, que no cumple $2x + y \\leq 8$."
        },
        {
          "id": "c",
          "label": "$x + y = 6$ con $2x + y = 8$",
          "incorrectFeedback": "Esas rectas se cortan en $(2, 4)$."
        },
        {
          "id": "d",
          "label": "los dos ejes",
          "incorrectFeedback": "Los ejes se cortan en $(0, 0)$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Con $y = 0$: $2x = 8$, $x = 4$; y $4 + 0 \\leq 6$ se cumple."
    }
  ],
};
