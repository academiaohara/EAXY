import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_4_SUBTITLE } from "@/data/lessons/shared";

export const angulosCosenos2bachLesson: InteractiveLesson = {
  slug: "angulos-cosenos-2bach",
  title: "5. Ángulo entre vectores y cosenos directores",
  subtitle: TEMA_2BACH_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "angulo",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Despejar el coseno"
        }
      ],
      "title": "Despejar el coseno",
      "blocks": [
        {
          "kind": "rule",
          "formula": "\\cos\\alpha = \\dfrac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|\\,|\\vec{v}|}"
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\vec{u} = (1, 1, 0),\\ \\vec{v} = (0, 1, 1)"
            },
            {
              "math": "\\vec{u}\\cdot\\vec{v} = 1,\\quad |\\vec{u}||\\vec{v}| = \\sqrt{2}\\sqrt{2} = 2"
            },
            {
              "math": "\\cos\\alpha = \\tfrac12 \\Rightarrow \\alpha = 60^\\circ"
            }
          ]
        },
        {
          "kind": "text",
          "text": "Con el coseno: positivo ⟹ ángulo agudo; negativo ⟹ obtuso; $0$ ⟹ perpendiculares."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "producto-escalar-3d-explorador",
        "initial": [
          1,
          1,
          0,
          0,
          1,
          1
        ],
        "hint": "Comprueba que el ángulo entre (1,1,0) y (0,1,1) es 60°."
      }
    },
    {
      "id": "check-ang",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Aplica la fórmula del coseno."
        }
      ],
      "title": "Un ángulo",
      "question": "Halla el ángulo (en grados) entre $\\vec{u} = (1, 1, 0)$ y $\\vec{v} = (0, 1, 1)$. (solo el número)",
      "correctAnswers": [
        "60"
      ],
      "explanation": "$\\cos\\alpha = \\tfrac{1}{2}$, luego $\\alpha = 60^\\circ$."
    },
    {
      "id": "directores",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Cosenos directores"
        }
      ],
      "title": "Cosenos directores",
      "blocks": [
        {
          "kind": "definition",
          "text": "Los **cosenos directores** de $\\vec{v}$ son los cosenos de los ángulos que forma con los ejes: $\\cos\\alpha = \\dfrac{v_1}{|\\vec{v}|}$, $\\cos\\beta = \\dfrac{v_2}{|\\vec{v}|}$, $\\cos\\gamma = \\dfrac{v_3}{|\\vec{v}|}$."
        },
        {
          "kind": "rule",
          "text": "Siempre se cumple:",
          "formula": "\\cos^2\\alpha + \\cos^2\\beta + \\cos^2\\gamma = 1"
        },
        {
          "kind": "text",
          "text": "El vector $(\\cos\\alpha, \\cos\\beta, \\cos\\gamma)$ es el **vector unitario** de la misma dirección."
        }
      ]
    },
    {
      "id": "check-cos",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "La tercera componente entre el módulo."
        }
      ],
      "title": "Cosenos directores",
      "question": "Para $\\vec{v} = (2, 3, 6)$ ($|\\vec{v}| = 7$), $\\cos\\gamma = \\dfrac{x}{7}$. ¿Cuánto vale $x$? (solo el número)",
      "correctAnswers": [
        "6"
      ],
      "explanation": "$\\cos\\gamma = \\dfrac{6}{7}$. Comprobación: $\\dfrac{4 + 9 + 36}{49} = 1$ ✓."
    },
    {
      "id": "check-ort",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Calcula el producto escalar."
        }
      ],
      "title": "¿Perpendiculares?",
      "question": "El ángulo entre $(1, -1, 0)$ y $(1, 1, 0)$ es…",
      "choices": [
        {
          "id": "a",
          "label": "$90^\\circ$, porque su producto escalar es $0$"
        },
        {
          "id": "b",
          "label": "$0^\\circ$",
          "incorrectFeedback": "Eso sería el caso de vectores paralelos del mismo sentido."
        },
        {
          "id": "c",
          "label": "$45^\\circ$",
          "incorrectFeedback": "$\\vec{u}\\cdot\\vec{v} = 1 - 1 = 0$, luego $\\cos\\alpha = 0$."
        },
        {
          "id": "d",
          "label": "$180^\\circ$",
          "incorrectFeedback": "Eso es para vectores opuestos."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$\\vec{u}\\cdot\\vec{v} = 1 - 1 + 0 = 0$: ángulo de $90^\\circ$."
    }
  ],
};
