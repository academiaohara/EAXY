import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_6_SUBTITLE } from "@/data/lessons/shared";

export const proyeccionRectaPlano2bachLesson: InteractiveLesson = {
  slug: "proyeccion-recta-plano-2bach",
  title: "4. Proyección ortogonal de una recta sobre un plano",
  subtitle: TEMA_2BACH_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "metodo",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Un plano auxiliar"
        }
      ],
      "title": "Un plano auxiliar",
      "blocks": [
        {
          "kind": "steps",
          "items": [
            "Se halla el plano $\\pi'$ que **contiene a la recta** y es **perpendicular** a $\\pi$: su normal es $\\vec{v}\\times\\vec{n}$ y pasa por un punto de $r$.",
            "La proyección es la **intersección** $\\pi\\cap\\pi'$ (una recta)."
          ]
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "r: (1, 0, 2) + t\\,(1, 1, 1),\\quad \\pi: z = 0"
            },
            {
              "math": "\\vec{n}' = \\vec{v}\\times\\vec{n} = (1, -1, 0) \\Rightarrow \\pi': x - y - 1 = 0"
            },
            {
              "math": "\\text{Proyección: } z = 0,\\ x - y = 1"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "angulos-espacio-explorador",
        "initial": [
          1,
          1,
          1,
          1,
          0,
          0,
          1
        ],
        "hint": "Ángulo entre la recta y su proyección = ángulo recta-plano."
      }
    },
    {
      "id": "check-n",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$v_2n_3 - v_3n_2$."
        }
      ],
      "title": "Normal del plano auxiliar",
      "question": "Para $\\vec{v} = (1, 1, 1)$ y $\\vec{n} = (0, 0, 1)$, ¿cuánto vale la primera componente de $\\vec{v}\\times\\vec{n}$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$\\vec{v}\\times\\vec{n} = (1\\cdot 1 - 1\\cdot 0,\\ 1\\cdot 0 - 1\\cdot 1,\\ 0) = (1, -1, 0)$."
    },
    {
      "id": "check-dir",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Está en un plano horizontal."
        }
      ],
      "title": "Dirección de la proyección",
      "question": "La proyección de esa recta sobre $z = 0$ es $z = 0$, $x - y = 1$. ¿Cuánto vale la tercera componente de su vector director? (solo el número)",
      "correctAnswers": [
        "0"
      ],
      "explanation": "Está contenida en el plano $z = 0$: su dirección $(1, 1, 0)$ tiene tercera componente $0$."
    },
    {
      "id": "check-ang",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Recuerda la definición."
        }
      ],
      "title": "Ángulo con su proyección",
      "question": "El ángulo que forma una recta con un plano es…",
      "choices": [
        {
          "id": "a",
          "label": "el ángulo entre la recta y su proyección sobre el plano"
        },
        {
          "id": "b",
          "label": "el ángulo entre la recta y la normal del plano",
          "incorrectFeedback": "Ese es el complementario."
        },
        {
          "id": "c",
          "label": "siempre $90^\\\\circ$",
          "incorrectFeedback": "Solo si es perpendicular."
        },
        {
          "id": "d",
          "label": "el ángulo entre la normal y la proyección",
          "incorrectFeedback": "No tiene sentido geométrico."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Por definición. Es el complementario del ángulo con la normal."
    },
    {
      "id": "check-sen",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Eleva al cuadrado."
        }
      ],
      "title": "Un seno",
      "question": "Una recta de dirección $(1, 1, 1)$ y el plano $z = 0$ forman un ángulo con $\\sin\\alpha = \\dfrac{1}{\\sqrt3}$. Calcula $\\sin^2\\alpha\\cdot 3$. (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$\\sin^2\\alpha = \\tfrac13$, así que $3\\sin^2\\alpha = 1$ ($\\alpha \\approx 35{,}26^\\circ$)."
    }
  ],
};
