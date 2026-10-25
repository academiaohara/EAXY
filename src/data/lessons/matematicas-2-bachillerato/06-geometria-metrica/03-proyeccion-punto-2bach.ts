import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_6_SUBTITLE } from "@/data/lessons/shared";

export const proyeccionPunto2bachLesson: InteractiveLesson = {
  slug: "proyeccion-punto-2bach",
  title: "3. Proyección ortogonal de un punto sobre un plano y sobre una recta",
  subtitle: TEMA_2BACH_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "plano",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Sobre un plano"
        }
      ],
      "title": "Sobre un plano",
      "blocks": [
        {
          "kind": "steps",
          "items": [
            "Se traza por $P$ la **recta perpendicular** al plano: $X = P + t\\,\\vec{n}$.",
            "Se **corta** esa recta con el plano (sustituyendo y despejando $t$).",
            "El punto obtenido, $F$, es la **proyección ortogonal** de $P$ sobre $\\pi$."
          ]
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "proyeccion-punto-plano-3d",
        "params": {
          "nums": [
            2,
            1,
            4,
            0,
            0,
            1,
            -1
          ]
        }
      }
    },
    {
      "id": "check-plano",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $X = P + t\\,\\vec{n}$ en el plano."
        }
      ],
      "title": "Proyección sobre un plano",
      "question": "Proyecta $P(3, 1, 2)$ sobre el plano $x + y + z - 3 = 0$. ¿Cuánto vale la coordenada $x$ de la proyección? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$X = (3 + t, 1 + t, 2 + t)$ en el plano: $3t + 3 = 0$, $t = -1$ y $F = (2, 0, 1)$."
    },
    {
      "id": "recta",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Sobre una recta"
        }
      ],
      "title": "Sobre una recta",
      "blocks": [
        {
          "kind": "steps",
          "items": [
            "Un punto genérico de la recta es $X = A + \\lambda\\vec{v}$.",
            "Se impone $\\overrightarrow{PX}\\cdot\\vec{v} = 0$ (perpendicular a la recta).",
            "Se despeja $\\lambda$: $\\lambda = \\dfrac{\\overrightarrow{AP}\\cdot\\vec{v}}{|\\vec{v}|^2}$ y se obtiene $F = A + \\lambda\\vec{v}$."
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "proyeccion-simetrico-explorador",
        "initial": [
          1,
          2,
          3,
          4,
          1,
          1,
          1,
          1,
          1,
          0
        ],
        "hint": "Proyección del punto P(2, 3, 4) sobre la recta (1,1,1) + λ(1,1,0): F = (5/2, 5/2, 1)."
      }
    },
    {
      "id": "check-recta",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\vec{v}$ tiene tercera componente $0$."
        }
      ],
      "title": "Proyección sobre una recta",
      "question": "Proyecta $P(2, 3, 4)$ sobre la recta $(1, 1, 1) + \\lambda\\,(1, 1, 0)$. ¿Cuánto vale la tercera coordenada de la proyección? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$\\overrightarrow{AP} = (1, 2, 3)$ y $\\vec{v} = (1, 1, 0)$: $\\lambda = \\dfrac{3}{2}$ y $F = \\left(\\tfrac52, \\tfrac52, 1\\right)$. La tercera coordenada no cambia."
    },
    {
      "id": "check-per",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "La distancia mínima se alcanza en la perpendicular."
        }
      ],
      "title": "Qué se impone",
      "question": "Para proyectar un punto sobre una recta, el vector $\\overrightarrow{PF}$ debe ser…",
      "choices": [
        {
          "id": "a",
          "label": "perpendicular al vector director de la recta"
        },
        {
          "id": "b",
          "label": "paralelo al vector director",
          "incorrectFeedback": "Entonces $F$ no sería el pie de la perpendicular."
        },
        {
          "id": "c",
          "label": "igual al vector $\\overrightarrow{OP}$",
          "incorrectFeedback": "No tiene relación."
        },
        {
          "id": "d",
          "label": "nulo siempre",
          "incorrectFeedback": "Solo si $P$ está en la recta."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$\\overrightarrow{PF}\\cdot\\vec{v} = 0$."
    }
  ],
};
