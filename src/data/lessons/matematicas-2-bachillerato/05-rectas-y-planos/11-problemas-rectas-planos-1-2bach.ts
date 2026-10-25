import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_5_SUBTITLE } from "@/data/lessons/shared";

export const problemasRectasPlanos12bachLesson: InteractiveLesson = {
  slug: "problemas-rectas-planos-1-2bach",
  title: "11. Problemas: construir rectas y planos",
  subtitle: TEMA_2BACH_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "estrategias",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Datos y ecuaciones"
        }
      ],
      "title": "Datos y ecuaciones",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "\\text{recta por }P\\text{, paralela a }\\vec{v}",
              "label": "P + t·v"
            },
            {
              "tex": "\\text{recta por }P\\text{, perpendicular a }\\pi",
              "label": "P + t·n"
            },
            {
              "tex": "\\text{plano por }P\\text{, perpendicular a } r",
              "label": "normal = v"
            },
            {
              "tex": "\\text{plano por }P\\text{, paralelo a }\\pi",
              "label": "mismo n"
            }
          ]
        },
        {
          "kind": "text",
          "text": "Casi siempre se trata de elegir bien el **punto** y el **vector** (director o normal)."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "recta-espacio-explorador",
        "initial": [
          1,
          2,
          3,
          2,
          -1,
          1,
          2
        ],
        "hint": "Recta por P(1, 2, 3) perpendicular al plano 2x − y + z = 5: su vector director es la normal (2, −1, 1)."
      }
    },
    {
      "id": "check-perp",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$x = 1 + 2t$."
        }
      ],
      "title": "Recta perpendicular a un plano",
      "question": "La recta que pasa por $P(1, 2, 3)$ y es perpendicular al plano $2x - y + z = 5$ tiene vector director $(2, -1, 1)$. ¿Cuánto vale la coordenada $x$ del punto con $t = 2$? (solo el número)",
      "correctAnswers": [
        "5"
      ],
      "explanation": "$x = 1 + 2\\cdot 2 = 5$; el punto es $(5, 0, 5)$."
    },
    {
      "id": "check-plano",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Todos los puntos tienen $x = 1$."
        }
      ],
      "title": "Plano por una recta y un punto",
      "question": "El plano contiene a la recta $(1, 0, 0) + t\\,(0, 1, 1)$ y al punto $P(1, 2, 3)$. Es de la forma $x = k$. ¿Cuánto vale $k$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$\\overrightarrow{AP} = (0, 2, 3)$ y $\\vec{v} = (0, 1, 1)$ tienen primera componente $0$: el plano es $x = 1$."
    },
    {
      "id": "check-par",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $P$."
        }
      ],
      "title": "Plano paralelo",
      "question": "El plano paralelo a $2x - y + 3z = 4$ por $P(1, 1, 1)$ es $2x - y + 3z + D = 0$. ¿Cuánto vale $D$? (solo el número)",
      "correctAnswers": [
        "-4",
        "−4"
      ],
      "explanation": "$2 - 1 + 3 + D = 0 \\Rightarrow D = -4$."
    },
    {
      "id": "check-normal",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Normal = dirección de la recta."
        }
      ],
      "title": "Plano perpendicular a una recta",
      "question": "El plano que pasa por $P$ y es perpendicular a una recta de vector director $\\vec{v}$ tiene como vector normal…",
      "choices": [
        {
          "id": "a",
          "label": "el propio $\\vec{v}$"
        },
        {
          "id": "b",
          "label": "un vector perpendicular a $\\\\vec{v}$",
          "incorrectFeedback": "Eso daría un plano que contiene a la dirección de la recta."
        },
        {
          "id": "c",
          "label": "el vector $\\\\overrightarrow{OP}$",
          "incorrectFeedback": "Depende del punto, no de la recta."
        },
        {
          "id": "d",
          "label": "el vector nulo",
          "incorrectFeedback": "El vector normal no puede ser nulo."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "El plano es perpendicular a $r$ si su normal es paralela a $\\vec{v}$."
    }
  ],
};
