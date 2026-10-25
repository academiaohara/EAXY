import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_10_SUBTITLE } from "@/data/lessons/shared";

export const reglaDeBarrow2bachLesson: InteractiveLesson = {
  slug: "regla-de-barrow-2bach",
  title: "11. Regla de Barrow",
  subtitle: TEMA_2BACH_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "barrow",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Calcular con una primitiva"
        }
      ],
      "title": "Calcular con una primitiva",
      "blocks": [
        {
          "kind": "rule",
          "title": "Regla de Barrow",
          "text": "Si $F$ es una primitiva de $f$ en $[a,b]$:",
          "formula": "\\int_a^b f(x)\\,dx = F(b) - F(a) = \\Big[F(x)\\Big]_a^b"
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\int_0^3 x^2\\,dx = \\left[\\dfrac{x^3}{3}\\right]_0^3 = 9 - 0 = 9"
            },
            {
              "math": "\\int_1^e \\dfrac{dx}{x} = \\Big[\\ln x\\Big]_1^e = 1 - 0 = 1"
            },
            {
              "math": "\\int_0^{\\pi} \\sin x\\,dx = \\Big[-\\cos x\\Big]_0^{\\pi} = 1 + 1 = 2"
            }
          ]
        }
      ]
    },
    {
      "id": "signo",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Integral con signo y área"
        }
      ],
      "title": "Integral con signo y área",
      "blocks": [
        {
          "kind": "text",
          "text": "Donde $f$ es negativa la integral **resta**. Para calcular el **área geométrica** se separa en tramos según el signo de $f$ y se suman los valores absolutos. Ejemplo: $\\int_0^{2\\pi}\\sin x\\,dx = 0$, pero el área vale $4$."
        },
        {
          "kind": "text",
          "text": "Prueba con $f(x) = x^2 - 4$: cambia los límites y compara el valor de la integral con el área geométrica."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "barrow-explorador",
        "initial": [
          -3,
          3
        ],
        "hint": "Entre −3 y 3 la integral vale −6, pero el área geométrica es 46/3 ≈ 15,333."
      }
    },
    {
      "id": "check-barrow",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Una primitiva es $x^3 + x$."
        }
      ],
      "title": "Aplicar Barrow",
      "question": "Calcula $\\int_0^2 (3x^2 + 1)\\,dx$. (solo el número)",
      "correctAnswers": [
        "10"
      ],
      "explanation": "$\\Big[x^3 + x\\Big]_0^2 = 8 + 2 = 10$."
    },
    {
      "id": "check-signada",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Primitiva: $\\tfrac{x^2}{2} - 2x$."
        }
      ],
      "title": "Integral con signo",
      "question": "Calcula $\\int_0^4 (x-2)\\,dx$. (solo el número)",
      "correctAnswers": [
        "0"
      ],
      "explanation": "$\\left[\\tfrac{x^2}{2} - 2x\\right]_0^4 = 8 - 8 = 0$: el tramo negativo anula al positivo."
    },
    {
      "id": "check-area",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Separa en $[0,2]$ y $[2,4]$."
        }
      ],
      "title": "Área geométrica",
      "question": "El área entre $y = x-2$ y el eje $X$ en $[0, 4]$ es… (solo el número)",
      "correctAnswers": [
        "4"
      ],
      "explanation": "Dos triángulos de base $2$ y altura $2$: $2 + 2 = 4$."
    },
    {
      "id": "check-sen",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en la forma del seno."
        }
      ],
      "title": "Seno en un periodo",
      "question": "Para $f(x) = \\sin x$ en $[0, 2\\pi]$ se cumple que…",
      "choices": [
        {
          "id": "a",
          "label": "la integral es $0$ y el área geométrica es $4$"
        },
        {
          "id": "b",
          "label": "la integral y el área valen $4$",
          "incorrectFeedback": "La integral resta el tramo negativo."
        },
        {
          "id": "c",
          "label": "la integral y el área valen $0$",
          "incorrectFeedback": "El área no puede ser $0$: hay dos arcos de área $2$."
        },
        {
          "id": "d",
          "label": "la integral es $4$ y el área $0$",
          "incorrectFeedback": "Es al revés."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Dos arcos de área $2$, uno por encima y otro por debajo del eje."
    }
  ],
};
