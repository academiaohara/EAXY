import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_11_SUBTITLE } from "@/data/lessons/shared";

export const binomioDeNewton2bachLesson: InteractiveLesson = {
  slug: "binomio-de-newton-2bach",
  title: "11. Binomio de Newton",
  subtitle: TEMA_2BACH_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "newton",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Potencias de un binomio"
        }
      ],
      "title": "Potencias de un binomio",
      "blocks": [
        {
          "kind": "rule",
          "title": "Binomio de Newton",
          "text": "Los coeficientes son los números combinatorios de la fila $n$ del triángulo de Pascal:",
          "formula": "(a + b)^n = \\sum_{k=0}^{n}\\dbinom{n}{k}\\,a^{n-k}\\,b^k"
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "(x + 2)^4 = x^4 + 8x^3 + 24x^2 + 32x + 16"
            },
            {
              "math": "1 + 8 + 24 + 32 + 16 = 81 = 3^4 \\quad (x = 1)"
            }
          ]
        },
        {
          "kind": "text",
          "text": "El término $k+1$ es $T_{k+1} = \\dbinom{n}{k}\\,a^{n-k}\\,b^k$. La suma de los coeficientes de $(ax + b)^n$ se obtiene haciendo $x = 1$."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "binomio-explorador",
        "initial": [
          4,
          1,
          2,
          2
        ],
        "hint": "Con (x + 2)⁴: los coeficientes son 1, 8, 24, 32 y 16 y suman 81."
      }
    },
    {
      "id": "check-T3",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$k = 2$: $\\dbinom{4}{2}\\,x^2\\,2^2$."
        }
      ],
      "title": "Un término",
      "question": "En $(x + 2)^4$, ¿cuál es el coeficiente del término en $x^2$? (solo el número)",
      "correctAnswers": [
        "24"
      ],
      "explanation": "$\\dbinom{4}{2}\\cdot 2^2 = 6\\cdot4 = 24$."
    },
    {
      "id": "check-suma",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $x = 1$."
        }
      ],
      "title": "Suma de coeficientes",
      "question": "¿Cuánto suman los coeficientes del desarrollo de $(2x - 1)^3$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "Con $x = 1$: $(2 - 1)^3 = 1$."
    },
    {
      "id": "check-x2",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "El término $x^2$ lleva $b^1 = -1$."
        }
      ],
      "title": "Con signo",
      "question": "En $(2x - 1)^3$, ¿cuál es el coeficiente de $x^2$? (solo el número)",
      "correctAnswers": [
        "-12",
        "−12"
      ],
      "explanation": "$\\dbinom{3}{1}(2x)^2(-1) = 3\\cdot4\\cdot(-1) = -12$."
    },
    {
      "id": "check-fila",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Mira la animación del triángulo."
        }
      ],
      "title": "La fila de Pascal",
      "question": "Los coeficientes de $(a + b)^5$ son…",
      "choices": [
        {
          "id": "a",
          "label": "$1,\\ 5,\\ 10,\\ 10,\\ 5,\\ 1$"
        },
        {
          "id": "b",
          "label": "$1,\\ 4,\\ 6,\\ 4,\\ 1$",
          "incorrectFeedback": "Esa es la fila de $(a+b)^4$."
        },
        {
          "id": "c",
          "label": "$1,\\ 5,\\ 5,\\ 5,\\ 1$",
          "incorrectFeedback": "El interior no son cincos."
        },
        {
          "id": "d",
          "label": "$1,\\ 6,\\ 15,\\ 20,\\ 15,\\ 6,\\ 1$",
          "incorrectFeedback": "Esa es la fila de $(a+b)^6$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$\\dbinom{5}{k}$ para $k = 0, \\dots, 5$."
    }
  ],
};
