import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_7_SUBTITLE } from "@/data/lessons/shared";

export const problemasLimitesContinuidad2bachLesson: InteractiveLesson = {
  slug: "problemas-limites-continuidad-2bach",
  title: "12. Problemas de límites y continuidad",
  subtitle: TEMA_2BACH_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "param",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Parámetros que dan continuidad"
        }
      ],
      "title": "Parámetros que dan continuidad",
      "blocks": [
        {
          "kind": "text",
          "text": "Para que una función a trozos sea continua en el punto de empalme se **igualan los dos laterales** (y el valor): queda una ecuación para el parámetro."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "f(x) = \\begin{cases} x^2 & x < 3 \\\\ x + k & x \\geq 3 \\end{cases}"
            },
            {
              "math": "9 = 3 + k \\Rightarrow k = 6"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "continuidad-k-explorador",
        "initial": [
          3,
          6
        ],
        "hint": "Con a = 3 la función es continua cuando k = 6."
      }
    },
    {
      "id": "check-k",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Iguala $1^2 + k$ con $3\\cdot 1 - 1$."
        }
      ],
      "title": "Hallar k",
      "question": "$f(x) = x^2 + k$ si $x < 1$ y $f(x) = 3x - 1$ si $x \\geq 1$. ¿Qué valor de $k$ la hace continua en $x = 1$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$1 + k = 2 \\Rightarrow k = 1$."
    },
    {
      "id": "check-3",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Usa $\\dfrac{\\sin u}{u} \\to 1$."
        }
      ],
      "title": "Un límite notable",
      "question": "Calcula $\\lim_{x \\to 0}\\dfrac{\\sin 3x}{x}$. (solo el número)",
      "correctAnswers": [
        "3"
      ],
      "explanation": "$\\dfrac{\\sin 3x}{x} = 3\\cdot\\dfrac{\\sin 3x}{3x} \\to 3\\cdot 1 = 3$."
    },
    {
      "id": "check-raiz",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Conjugado."
        }
      ],
      "title": "Con raíz e infinito",
      "question": "Calcula $\\lim_{x \\to +\\infty}\\left(\\sqrt{x^2 + 3x} - x\\right)$. (decimal o fracción)",
      "correctAnswers": [
        "3/2",
        "1.5",
        "1,5"
      ],
      "explanation": "$\\dfrac{3x}{\\sqrt{x^2 + 3x} + x} \\to \\dfrac{3}{2}$."
    },
    {
      "id": "check-metodo",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Mira si hay raíces o no."
        }
      ],
      "title": "Elegir la técnica",
      "question": "El límite $\\lim_{x \\to 2}\\dfrac{x^2 - 5x + 6}{x - 2}$ es una indeterminación $0/0$. Se resuelve…",
      "choices": [
        {
          "id": "a",
          "label": "factorizando el numerador: $(x - 2)(x - 3)$"
        },
        {
          "id": "b",
          "label": "multiplicando por el conjugado",
          "incorrectFeedback": "No hay raíces."
        },
        {
          "id": "c",
          "label": "dividiendo por la mayor potencia",
          "incorrectFeedback": "Eso es para $x \\to \\infty$."
        },
        {
          "id": "d",
          "label": "con el número $e$",
          "incorrectFeedback": "No es una indeterminación $1^\\infty$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "El límite vale $\\lim(x - 3) = -1$."
    }
  ],
};
