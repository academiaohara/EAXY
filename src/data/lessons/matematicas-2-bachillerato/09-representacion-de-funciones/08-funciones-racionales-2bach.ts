import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_9_SUBTITLE } from "@/data/lessons/shared";

export const funcionesRacionales2bachLesson: InteractiveLesson = {
  slug: "funciones-racionales-2bach",
  title: "8. Funciones racionales",
  subtitle: TEMA_2BACH_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "racionales",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Asíntotas y extremos"
        }
      ],
      "title": "Asíntotas y extremos",
      "blocks": [
        {
          "kind": "text",
          "text": "En una racional $\\dfrac{P}{Q}$: dominio sin las raíces de $Q$; asíntotas verticales en las raíces de $Q$ que no anula $P$; horizontal u oblicua según los grados. Los extremos se obtienen de $f' = \\dfrac{P'Q - PQ'}{Q^2} = 0$."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "f(x) = \\dfrac{x}{x^2 + 1}:\\ \\ f' = \\dfrac{1 - x^2}{(x^2 + 1)^2} = 0 \\iff x = \\pm 1"
            },
            {
              "math": "\\text{Máximo } \\left(1, \\tfrac12\\right),\\ \\text{mínimo } \\left(-1, -\\tfrac12\\right),\\ \\text{asíntota } y = 0"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "estudio-funcion-explorador",
        "initial": [
          3,
          6
        ],
        "hint": "x²/(x² − 4): par, dos asíntotas verticales y una horizontal."
      }
    },
    {
      "id": "check-max",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $x = 1$."
        }
      ],
      "title": "Un máximo",
      "question": "Para $f(x) = \\dfrac{x}{x^2 + 1}$, ¿cuánto vale el máximo relativo? (decimal o fracción)",
      "correctAnswers": [
        "1/2",
        "0.5",
        "0,5"
      ],
      "explanation": "$f(1) = \\dfrac{1}{2}$."
    },
    {
      "id": "check-asint",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Anula el denominador y compara grados."
        }
      ],
      "title": "Contar asíntotas",
      "question": "¿Cuántas asíntotas (verticales y horizontales) tiene $f(x) = \\dfrac{x^2}{x^2 - 4}$? (solo el número)",
      "correctAnswers": [
        "3"
      ],
      "explanation": "Verticales $x = 2$ y $x = -2$, y horizontal $y = 1$."
    },
    {
      "id": "check-ob",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $x = 1$."
        }
      ],
      "title": "Con asíntota oblicua",
      "question": "$f(x) = x + \\dfrac{1}{x}$ tiene extremos en $x = \\pm 1$. ¿Cuánto vale el mínimo relativo (en $x = 1$)? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$f(1) = 1 + 1 = 2$; el máximo relativo es $f(-1) = -2$."
    },
    {
      "id": "check-simetria",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Calcula $f(-x)$."
        }
      ],
      "title": "Simetría",
      "question": "$f(x) = \\dfrac{x^2}{x^2 - 4}$ es…",
      "choices": [
        {
          "id": "a",
          "label": "par: simétrica respecto del eje $Y$"
        },
        {
          "id": "b",
          "label": "impar",
          "incorrectFeedback": "$f(-x) = f(x)$, no $-f(x)$."
        },
        {
          "id": "c",
          "label": "periódica",
          "incorrectFeedback": "Las racionales no son periódicas."
        },
        {
          "id": "d",
          "label": "ni par ni impar",
          "incorrectFeedback": "Cumple $f(-x) = f(x)$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$\\dfrac{(-x)^2}{(-x)^2 - 4} = \\dfrac{x^2}{x^2 - 4}$."
    }
  ],
};
