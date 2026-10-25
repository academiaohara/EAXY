import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_9_SUBTITLE } from "@/data/lessons/shared";

export const simetriasPeriodicidad2bachLesson: InteractiveLesson = {
  slug: "simetrias-periodicidad-2bach",
  title: "2. Simetrías y periodicidad",
  subtitle: TEMA_2BACH_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "simetrias",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Par e impar"
        }
      ],
      "title": "Par e impar",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "f(-x) = f(x)",
              "label": "par: simétrica respecto del eje Y"
            },
            {
              "tex": "f(-x) = -f(x)",
              "label": "impar: simétrica respecto del origen"
            },
            {
              "tex": "f(x + T) = f(x)",
              "label": "periódica de periodo $T$"
            }
          ]
        },
        {
          "kind": "text",
          "text": "Si una función es par o impar, basta estudiarla para $x \\geq 0$ y completar la gráfica por simetría."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "estudio-funcion-explorador",
        "initial": [
          1,
          3
        ],
        "hint": "x/(x² + 1) es impar: simétrica respecto del origen."
      }
    },
    {
      "id": "check-clasifica",
      "type": "classify",
      "help": [
        {
          "label": "Pista",
          "message": "Calcula $f(-x)$."
        }
      ],
      "title": "¿Par, impar o ninguna?",
      "question": "Clasifica cada función.",
      "groups": [
        {
          "id": "par",
          "label": "Par",
          "tone": "emerald"
        },
        {
          "id": "imp",
          "label": "Impar",
          "tone": "amber"
        },
        {
          "id": "nin",
          "label": "Ninguna",
          "tone": "rose"
        }
      ],
      "items": [
        {
          "id": "a",
          "text": "$x^2$",
          "group": "par"
        },
        {
          "id": "b",
          "text": "$x^3$",
          "group": "imp"
        },
        {
          "id": "c",
          "text": "$x^2 + x$",
          "group": "nin"
        },
        {
          "id": "d",
          "text": "$\\cos x$",
          "group": "par"
        },
        {
          "id": "e",
          "text": "$\\sin x$",
          "group": "imp"
        },
        {
          "id": "f",
          "text": "$\\dfrac{x}{x^2 + 1}$",
          "group": "imp"
        }
      ],
      "hint": "$x^2 + x$: $f(-x) = x^2 - x$, que no es ni $f(x)$ ni $-f(x)$."
    },
    {
      "id": "check-valor",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Impar: cambia el signo."
        }
      ],
      "title": "Usar la simetría",
      "question": "Una función impar cumple $f(2) = 5$. ¿Cuánto vale $f(-2)$? (solo el número)",
      "correctAnswers": [
        "-5",
        "−5"
      ],
      "explanation": "$f(-2) = -f(2) = -5$."
    },
    {
      "id": "check-periodo",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$T = 2\\pi/\\omega$."
        }
      ],
      "title": "Periodo",
      "question": "El periodo de $f(x) = \\sin\\dfrac{x}{2}$ es $T = k\\pi$. ¿Cuánto vale $k$? (solo el número)",
      "correctAnswers": [
        "4"
      ],
      "explanation": "$T = \\dfrac{2\\pi}{1/2} = 4\\pi$."
    },
    {
      "id": "check-polinomio",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Calcula $f(-x)$."
        }
      ],
      "title": "Polinomios simétricos",
      "question": "Un polinomio que solo tiene potencias **pares** de $x$ (por ejemplo $x^4 - 2x^2 + 3$) es…",
      "choices": [
        {
          "id": "a",
          "label": "una función par"
        },
        {
          "id": "b",
          "label": "una función impar",
          "incorrectFeedback": "Las potencias impares dan funciones impares."
        },
        {
          "id": "c",
          "label": "periódica",
          "incorrectFeedback": "Los polinomios no son periódicos."
        },
        {
          "id": "d",
          "label": "ni par ni impar",
          "incorrectFeedback": "$f(-x) = f(x)$ en este caso."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$(-x)^{2k} = x^{2k}$."
    }
  ],
};
