import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_3_SUBTITLE } from "@/data/lessons/shared";

export const inecuacionesDosIncognitasCcss2Lesson: InteractiveLesson = {
  slug: "inecuaciones-dos-incognitas-ccss2",
  title: "1. Inecuaciones lineales con dos incógnitas",
  subtitle: TEMA_CCSS2_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "semiplano",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Una recta que divide el plano"
        }
      ],
      "title": "Una recta que divide el plano",
      "blocks": [
        {
          "kind": "text",
          "text": "Una inecuación lineal con dos incógnitas tiene la forma $ax + by \\leq c$ (o $<$, $\\geq$, $>$). La ecuación $ax + by = c$ es una recta que divide el plano en dos **semiplanos**; la solución es uno de ellos."
        },
        {
          "kind": "steps",
          "items": [
            "Dibuja la recta $ax + by = c$.",
            "Elige un **punto de prueba** que no esté en la recta (el origen si es posible).",
            "Si el punto cumple la desigualdad, la solución es su semiplano; si no, es el otro.",
            "Trazo **continuo** si la desigualdad es amplia ($\\leq$, $\\geq$) y **discontinuo** si es estricta ($<$, $>$)."
          ]
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "semiplano-prueba"
      }
    },
    {
      "id": "herramienta",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Pruébalo"
        }
      ],
      "title": "Pruébalo",
      "blocks": [
        {
          "kind": "text",
          "text": "Cambia los coeficientes y el sentido de la desigualdad y observa qué semiplano se colorea."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "region-inecuaciones-explorador",
        "initial": [
          2,
          1,
          8,
          0,
          0,
          0,
          10,
          0
        ],
        "hint": "2x + y ≤ 8: la solución es el semiplano que contiene al origen. La segunda desigualdad (0 ≤ 10) siempre se cumple."
      }
    },
    {
      "id": "check-puntos",
      "type": "classify",
      "help": [
        {
          "label": "Pista",
          "message": "Los puntos de la recta cumplen $\\leq$."
        }
      ],
      "title": "¿Cumple 2x + y ≤ 8?",
      "question": "Decide si cada punto es solución de $2x + y \\leq 8$.",
      "groups": [
        {
          "id": "si",
          "label": "Es solución",
          "tone": "emerald"
        },
        {
          "id": "no",
          "label": "No es solución",
          "tone": "rose"
        }
      ],
      "items": [
        {
          "id": "a",
          "text": "$(0, 0)$",
          "group": "si"
        },
        {
          "id": "b",
          "text": "$(1, 2)$",
          "group": "si"
        },
        {
          "id": "c",
          "text": "$(4, 0)$ (sobre la recta)",
          "group": "si"
        },
        {
          "id": "d",
          "text": "$(3, 3)$",
          "group": "no"
        },
        {
          "id": "e",
          "text": "$(5, 1)$",
          "group": "no"
        },
        {
          "id": "f",
          "text": "$(-2, 10)$",
          "group": "si"
        }
      ],
      "hint": "Sustituye cada punto en $2x + y$ y compara con $8$."
    },
    {
      "id": "check-valor",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $x = 3$ e $y = 3$."
        }
      ],
      "title": "Sustituir",
      "question": "¿Cuánto vale $2x + y$ en el punto $(3, 3)$? (solo el número)",
      "correctAnswers": [
        "9"
      ],
      "explanation": "$2\\cdot3 + 3 = 9 > 8$: no cumple $2x + y \\leq 8$."
    },
    {
      "id": "check-estricta",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Haz la prueba con el origen."
        }
      ],
      "title": "Estricta o amplia",
      "question": "La inecuación $x - y > 2$ se representa con…",
      "choices": [
        {
          "id": "a",
          "label": "el semiplano que **no** contiene al origen y la recta en trazo discontinuo"
        },
        {
          "id": "b",
          "label": "el semiplano que contiene al origen y la recta continua",
          "incorrectFeedback": "El origen da $0 > 2$, que es falso."
        },
        {
          "id": "c",
          "label": "el semiplano que contiene al origen y la recta discontinua",
          "incorrectFeedback": "El origen no cumple la desigualdad."
        },
        {
          "id": "d",
          "label": "el semiplano que no contiene al origen y la recta continua",
          "incorrectFeedback": "La desigualdad es estricta: la recta no pertenece."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$(0,0)$: $0 - 0 = 0 > 2$ es falso, así que el origen queda fuera; la desigualdad es estricta."
    }
  ],
};
