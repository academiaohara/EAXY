import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_5_SUBTITLE } from "@/data/lessons/shared";

export const rectaPlanoPosicion2bachLesson: InteractiveLesson = {
  slug: "recta-plano-posicion-2bach",
  title: "8. Posición relativa de una recta y un plano",
  subtitle: TEMA_2BACH_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "metodo",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Sustituir la recta en el plano"
        }
      ],
      "title": "Sustituir la recta en el plano",
      "blocks": [
        {
          "kind": "text",
          "text": "Con $r: P + t\\vec{v}$ y $\\pi: Ax + By + Cz + D = 0$ se sustituye la recta en el plano y queda una ecuación en $t$:"
        },
        {
          "kind": "steps",
          "items": [
            "$\\vec{n}\\cdot\\vec{v} \\neq 0$: una solución para $t$. **Secantes** (se cortan en un punto).",
            "$\\vec{n}\\cdot\\vec{v} = 0$ y $P \\notin \\pi$: $0 = c$. **Paralelos**.",
            "$\\vec{n}\\cdot\\vec{v} = 0$ y $P \\in \\pi$: $0 = 0$. La recta está **contenida** en el plano."
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "posicion-recta-plano-explorador",
        "initial": [
          1,
          0,
          0,
          1,
          1,
          1,
          1,
          1,
          1,
          -4
        ],
        "hint": "La recta corta al plano en (2, 1, 1). Cambia el vector director a (1, −1, 0): ¿qué pasa?"
      }
    },
    {
      "id": "check-corte",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $x = 1 + t$, $y = t$, $z = t$."
        }
      ],
      "title": "Punto de corte",
      "question": "La recta $(1, 0, 0) + t\\,(1, 1, 1)$ y el plano $x + y + z - 4 = 0$ se cortan en un punto. ¿Cuánto vale $x$ en ese punto? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$(1 + t) + t + t - 4 = 0 \\Rightarrow t = 1$ y el punto es $(2, 1, 1)$."
    },
    {
      "id": "check-paralela",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\vec{n} = (1, 1, 1)$."
        }
      ],
      "title": "Paralela al plano",
      "question": "¿Qué valor de $m$ hace que la recta de vector director $(1, 1, m)$ sea paralela al plano $x + y + z = 5$? (solo el número)",
      "correctAnswers": [
        "-2",
        "−2"
      ],
      "explanation": "$\\vec{n}\\cdot\\vec{v} = 1 + 1 + m = 0 \\Rightarrow m = -2$."
    },
    {
      "id": "check-tipo",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Evalúa el punto en el plano."
        }
      ],
      "title": "Contenida o paralela",
      "question": "Una recta con $\\vec{n}\\cdot\\vec{v} = 0$ pasa por un punto $P$ con $Ax_0 + By_0 + Cz_0 + D = 5$. La recta es…",
      "choices": [
        {
          "id": "a",
          "label": "paralela al plano (no contenida)"
        },
        {
          "id": "b",
          "label": "contenida en el plano",
          "incorrectFeedback": "Contenida exigiría que el punto $P$ cumpliera la ecuación: debería dar $0$."
        },
        {
          "id": "c",
          "label": "secante al plano",
          "incorrectFeedback": "Es perpendicular a la normal: no corta al plano."
        },
        {
          "id": "d",
          "label": "perpendicular al plano",
          "incorrectFeedback": "Perpendicular sería $\\vec{v}\\parallel\\vec{n}$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Dirección paralela al plano, pero el punto no está en él: paralela."
    },
    {
      "id": "check-cont",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Producto escalar."
        }
      ],
      "title": "Recta contenida",
      "question": "La recta $(0, 0, 0) + t\\,(1, -1, 0)$ y el plano $x + y + z = 0$: ¿cuánto vale $\\vec{n}\\cdot\\vec{v}$? (solo el número)",
      "correctAnswers": [
        "0"
      ],
      "explanation": "$1\\cdot 1 + 1\\cdot(-1) + 1\\cdot 0 = 0$ y $P = O$ cumple el plano: la recta está contenida."
    }
  ],
};
