import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_4_SUBTITLE } from "@/data/lessons/shared";

export const otrasIndeterminacionesCcss2Lesson: InteractiveLesson = {
  slug: "otras-indeterminaciones-ccss2",
  title: "9. Otras indeterminaciones: 0·∞, 0⁰ e ∞⁰",
  subtitle: TEMA_CCSS2_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "cero-inf",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "0 · ∞: convertir en cociente"
        }
      ],
      "title": "0 · ∞: convertir en cociente",
      "blocks": [
        {
          "kind": "text",
          "text": "Un producto $0\\cdot\\infty$ se transforma en un cociente $\\dfrac00$ o $\\dfrac\\infty\\infty$, o se multiplica por el conjugado."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\lim_{x\\to\\infty} x\\left(\\sqrt{x^2 + 1} - x\\right) = \\lim \\dfrac{x}{\\sqrt{x^2 + 1} + x} = \\dfrac12"
            },
            {
              "math": "\\lim_{x\\to 0}\\dfrac1x\\,(x^2 + x) = \\lim (x + 1) = 1"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "operaciones-limite-explorador",
        "initial": [
          2,
          3,
          2,
          1
        ],
        "hint": "f = 2x y g = 1/x en 0⁺: producto de formas 0·∞ que da 2."
      }
    },
    {
      "id": "check-prod",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Multiplica por el conjugado."
        }
      ],
      "title": "Un producto",
      "question": "Calcula $\\lim_{x \\to \\infty} x\\left(\\sqrt{x^2 + 1} - x\\right)$. (decimal o fracción)",
      "correctAnswers": [
        "1/2",
        "0.5",
        "0,5"
      ],
      "explanation": "$\\dfrac{x}{\\sqrt{x^2 + 1} + x} \\to \\dfrac{1}{2}$."
    },
    {
      "id": "potencias",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "0⁰, ∞⁰ y los órdenes de infinito"
        }
      ],
      "title": "0⁰, ∞⁰ y los órdenes de infinito",
      "blocks": [
        {
          "kind": "text",
          "text": "Las potencias indeterminadas se resuelven tomando **logaritmos**: $f^g = e^{g\\ln f}$. Se usa que, cuando $x \\to \\infty$: **logaritmos** $\\ll$ **potencias** $\\ll$ **exponenciales**."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\lim_{x\\to\\infty} x^{1/x} = e^{\\lim \\frac{\\ln x}{x}} = e^{0} = 1"
            }
          ]
        }
      ]
    },
    {
      "id": "check-orden",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Compara velocidades de crecimiento."
        }
      ],
      "title": "Quién gana",
      "question": "$\\lim_{x \\to \\infty}\\dfrac{\\ln x}{x}$ vale…",
      "choices": [
        {
          "id": "a",
          "label": "$0$, porque $x$ crece mucho más rápido que $\\ln x$"
        },
        {
          "id": "b",
          "label": "$+\\infty$",
          "incorrectFeedback": "Es al revés: el numerador crece más despacio."
        },
        {
          "id": "c",
          "label": "$1$",
          "incorrectFeedback": "No hay razón para que coincidan."
        },
        {
          "id": "d",
          "label": "No existe",
          "incorrectFeedback": "Existe y vale $0$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Los logaritmos crecen más despacio que cualquier potencia de $x$."
    },
    {
      "id": "check-x1x",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Toma logaritmos."
        }
      ],
      "title": "Potencia",
      "question": "Calcula $\\lim_{x \\to \\infty} x^{1/x}$. (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$e^{\\ln x/x} \\to e^{0} = 1$."
    }
  ],
};
