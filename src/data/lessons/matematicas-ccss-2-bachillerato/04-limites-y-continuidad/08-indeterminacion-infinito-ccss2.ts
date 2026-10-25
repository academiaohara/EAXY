import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_4_SUBTITLE } from "@/data/lessons/shared";

export const indeterminacionInfinitoCcss2Lesson: InteractiveLesson = {
  slug: "indeterminacion-infinito-ccss2",
  title: "8. Las indeterminaciones ∞/∞ y ∞ − ∞",
  subtitle: TEMA_CCSS2_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "cociente",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "∞/∞: dividir por la mayor potencia"
        }
      ],
      "title": "∞/∞: dividir por la mayor potencia",
      "blocks": [
        {
          "kind": "text",
          "text": "Se divide numerador y denominador entre la **mayor potencia de $x$**; los términos con $\\dfrac{1}{x^k}$ tienden a $0$."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\lim_{x\\to\\infty}\\dfrac{2x^2 + 3x}{x^2 - 1} = \\lim \\dfrac{2 + \\frac{3}{x}}{1 - \\frac{1}{x^2}} = 2"
            },
            {
              "math": "\\lim_{x\\to\\infty}\\dfrac{\\sqrt{4x^2 + 1}}{x} = \\lim\\sqrt{4 + \\dfrac{1}{x^2}} = 2"
            }
          ]
        }
      ]
    },
    {
      "id": "check-raiz",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Mete $x$ dentro de la raíz como $x^2$."
        }
      ],
      "title": "Con una raíz",
      "question": "Calcula $\\lim_{x \\to +\\infty}\\dfrac{\\sqrt{4x^2 + 1}}{x}$. (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$\\sqrt{4 + 1/x^2} \\to \\sqrt4 = 2$."
    },
    {
      "id": "resta",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "∞ − ∞"
        }
      ],
      "title": "∞ − ∞",
      "blocks": [
        {
          "kind": "steps",
          "items": [
            "Con **raíces**: se multiplica y divide por el conjugado.",
            "Con **fracciones**: se reduce a común denominador."
          ]
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\lim_{x\\to\\infty}\\left(\\sqrt{x^2 + x} - x\\right) = \\lim \\dfrac{x}{\\sqrt{x^2 + x} + x} = \\dfrac12"
            },
            {
              "math": "\\lim_{x\\to 1}\\left(\\dfrac{1}{x - 1} - \\dfrac{2}{x^2 - 1}\\right) = \\lim \\dfrac{x - 1}{(x - 1)(x + 1)} = \\dfrac12"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "resta-fracciones-explorador",
        "initial": [
          2,
          1
        ],
        "hint": "Para x → 1, 1/(x − 1) − 2/(x² − 1): el resultado es finito porque k = 2r."
      }
    },
    {
      "id": "check-raiz2",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Multiplica por $\\sqrt{x^2 + x} + x$."
        }
      ],
      "title": "Con conjugado",
      "question": "Calcula $\\lim_{x \\to +\\infty}\\left(\\sqrt{x^2 + x} - x\\right)$. (decimal o fracción)",
      "correctAnswers": [
        "1/2",
        "0.5",
        "0,5"
      ],
      "explanation": "$\\dfrac{x}{\\sqrt{x^2 + x} + x} \\to \\dfrac{1}{1 + 1} = \\dfrac12$."
    },
    {
      "id": "check-frac",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "El denominador común es $x^2 - 1$."
        }
      ],
      "title": "Resta de fracciones",
      "question": "Calcula $\\lim_{x \\to 1}\\left(\\dfrac{1}{x - 1} - \\dfrac{2}{x^2 - 1}\\right)$. (decimal o fracción)",
      "correctAnswers": [
        "1/2",
        "0.5",
        "0,5"
      ],
      "explanation": "Común denominador: $\\dfrac{(x + 1) - 2}{(x - 1)(x + 1)} = \\dfrac{1}{x + 1} \\to \\dfrac12$."
    }
  ],
};
