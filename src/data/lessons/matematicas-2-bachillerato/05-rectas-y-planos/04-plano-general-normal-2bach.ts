import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_5_SUBTITLE } from "@/data/lessons/shared";

export const planoGeneralNormal2bachLesson: InteractiveLesson = {
  slug: "plano-general-normal-2bach",
  title: "4. Ecuación general del plano y vector normal",
  subtitle: TEMA_2BACH_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "general",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Un vector perpendicular al plano"
        }
      ],
      "title": "Un vector perpendicular al plano",
      "blocks": [
        {
          "kind": "rule",
          "title": "Ecuación general",
          "formula": "\\pi:\\ Ax + By + Cz + D = 0"
        },
        {
          "kind": "definition",
          "text": "El vector $\\vec{n} = (A, B, C)$ es un **vector normal** del plano: perpendicular a todos los vectores contenidos en él."
        },
        {
          "kind": "rule",
          "title": "Plano por un punto y su normal",
          "text": "Si pasa por $P(p_1, p_2, p_3)$ con normal $\\vec{n}$:",
          "formula": "A(x - p_1) + B(y - p_2) + C(z - p_3) = 0"
        }
      ]
    },
    {
      "id": "check-D",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $P$."
        }
      ],
      "title": "Plano por un punto y su normal",
      "question": "El plano pasa por $P(1, 2, 3)$ y tiene normal $(2, -1, 4)$: $2x - y + 4z + D = 0$. ¿Cuánto vale $D$? (solo el número)",
      "correctAnswers": [
        "-12",
        "−12"
      ],
      "explanation": "$2 - 2 + 12 + D = 0 \\Rightarrow D = -12$."
    },
    {
      "id": "check-puntos",
      "type": "classify",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye las coordenadas."
        }
      ],
      "title": "¿Pertenece al plano?",
      "question": "Clasifica cada punto respecto al plano $x + 2y - z - 3 = 0$.",
      "groups": [
        {
          "id": "si",
          "label": "Está en el plano",
          "tone": "emerald"
        },
        {
          "id": "no",
          "label": "No está en el plano",
          "tone": "rose"
        }
      ],
      "items": [
        {
          "id": "a",
          "text": "$(1, 1, 0)$",
          "group": "si"
        },
        {
          "id": "b",
          "text": "$(3, 0, 0)$",
          "group": "si"
        },
        {
          "id": "c",
          "text": "$(0, 0, 3)$",
          "group": "no"
        },
        {
          "id": "d",
          "text": "$(1, 2, 2)$",
          "group": "si"
        },
        {
          "id": "e",
          "text": "$(0, 0, 0)$",
          "group": "no"
        },
        {
          "id": "f",
          "text": "$(2, 1, 1)$",
          "group": "si"
        }
      ],
      "hint": "Sustituye cada punto: si el resultado es $0$, pertenece al plano. $(0,0,3)$ da $-6$ y $(0,0,0)$ da $-3$."
    },
    {
      "id": "segmentaria",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Ecuación segmentaria"
        }
      ],
      "title": "Ecuación segmentaria",
      "blocks": [
        {
          "kind": "rule",
          "text": "Si el plano corta a los ejes en $(a, 0, 0)$, $(0, b, 0)$ y $(0, 0, c)$:",
          "formula": "\\dfrac{x}{a} + \\dfrac{y}{b} + \\dfrac{z}{c} = 1"
        },
        {
          "kind": "text",
          "text": "Por ejemplo, $\\dfrac{x}{2} + \\dfrac{y}{3} + \\dfrac{z}{6} = 1$ equivale a $3x + 2y + z - 6 = 0$ (se multiplica por $6$)."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "plano-espacio-explorador",
        "initial": [
          2,
          0,
          0,
          0,
          3,
          0,
          0,
          0,
          6
        ],
        "hint": "Con puntos en los ejes (2,0,0), (0,3,0) y (0,0,6) sale 3x + 2y + z − 6 = 0."
      }
    },
    {
      "id": "check-segm",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Haz $y = 0$ y $z = 0$."
        }
      ],
      "title": "Corte con el eje X",
      "question": "El plano $3x + 2y + z - 6 = 0$ corta al eje $X$ en el punto $(a, 0, 0)$. ¿Cuánto vale $a$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "Con $y = z = 0$: $3a = 6$, $a = 2$."
    }
  ],
};
