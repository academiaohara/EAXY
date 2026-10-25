import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_5_SUBTITLE } from "@/data/lessons/shared";

export const asintotasCcss2Lesson: InteractiveLesson = {
  slug: "asintotas-ccss2",
  title: "8. Asíntotas y ramas del infinito",
  subtitle: TEMA_CCSS2_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "tipos",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Tres clases de asíntotas"
        }
      ],
      "title": "Tres clases de asíntotas",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "\\lim_{x\\to a^\\pm} f(x) = \\pm\\infty",
              "label": "asíntota vertical $x = a$"
            },
            {
              "tex": "\\lim_{x\\to\\pm\\infty} f(x) = L",
              "label": "asíntota horizontal $y = L$"
            },
            {
              "tex": "m = \\lim\\dfrac{f(x)}{x},\\ n = \\lim\\,(f(x) - mx)",
              "label": "asíntota oblicua $y = mx + n$"
            }
          ]
        },
        {
          "kind": "text",
          "text": "Si $m = \\infty$ no hay oblicua: hay una **rama parabólica**. Una función racional tiene asíntota horizontal si $\\text{grado } P \\leq \\text{grado } Q$ y oblicua si $\\text{grado } P = \\text{grado } Q + 1$."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "asintotas-explorador",
        "initial": [
          1,
          1,
          1,
          1
        ],
        "hint": "f(x) = (x² + x + 1)/(x − 1) tiene asíntota vertical x = 1 y oblicua y = x + 2."
      }
    },
    {
      "id": "check-h",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Mismo grado: cociente de coeficientes principales."
        }
      ],
      "title": "Horizontal",
      "question": "¿Cuál es la asíntota horizontal de $f(x) = \\dfrac{2x + 1}{x - 1}$? Escribe el valor de $y$. (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$\\lim_{x \\to \\infty}\\dfrac{2x + 1}{x - 1} = 2$: $y = 2$."
    },
    {
      "id": "check-n",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Haz la división."
        }
      ],
      "title": "Oblicua",
      "question": "La asíntota oblicua de $f(x) = \\dfrac{x^2 + x + 1}{x - 1}$ es $y = x + n$. ¿Cuánto vale $n$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "Dividiendo, $f(x) = x + 2 + \\dfrac{3}{x - 1}$: $y = x + 2$."
    },
    {
      "id": "check-hueco",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Factoriza el numerador."
        }
      ],
      "title": "¿Asíntota o hueco?",
      "question": "En $f(x) = \\dfrac{x^2 - 1}{x - 1}$ la recta $x = 1$ es…",
      "choices": [
        {
          "id": "a",
          "label": "un hueco: el límite en $1$ es finito ($2$), no una asíntota"
        },
        {
          "id": "b",
          "label": "una asíntota vertical",
          "incorrectFeedback": "El límite es $2$, finito."
        },
        {
          "id": "c",
          "label": "una asíntota oblicua",
          "incorrectFeedback": "Eso no es una recta vertical."
        },
        {
          "id": "d",
          "label": "no hay nada especial",
          "incorrectFeedback": "Hay una discontinuidad evitable."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Simplificando, $f(x) = x + 1$ para $x \\neq 1$."
    },
    {
      "id": "check-vert",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Anula el denominador."
        }
      ],
      "title": "Asíntotas verticales",
      "question": "¿Cuántas asíntotas verticales tiene $f(x) = \\dfrac{1}{x^2 - 1}$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "En $x = 1$ y $x = -1$."
    }
  ],
};
