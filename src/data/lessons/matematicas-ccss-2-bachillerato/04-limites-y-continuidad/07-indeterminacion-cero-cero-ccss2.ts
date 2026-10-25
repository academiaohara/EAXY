import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_4_SUBTITLE } from "@/data/lessons/shared";

export const indeterminacionCeroCeroCcss2Lesson: InteractiveLesson = {
  slug: "indeterminacion-cero-cero-ccss2",
  title: "7. La indeterminación 0/0",
  subtitle: TEMA_CCSS2_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "factorizar",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Simplificar el factor que se anula"
        }
      ],
      "title": "Simplificar el factor que se anula",
      "blocks": [
        {
          "kind": "text",
          "text": "Si al sustituir queda $\\dfrac{0}{0}$, el numerador y el denominador tienen el **factor $(x - a)$** que se anula. Se **factoriza y se simplifica**."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\lim_{x\\to 2}\\dfrac{x^2 - 4}{x - 2} = \\lim_{x\\to 2}\\dfrac{(x - 2)(x + 2)}{x - 2} = \\lim_{x\\to 2}(x + 2) = 4"
            },
            {
              "math": "\\lim_{x\\to 1}\\dfrac{x^2 - 3x + 2}{x^2 - 1} = \\lim_{x\\to 1}\\dfrac{(x - 1)(x - 2)}{(x - 1)(x + 1)} = -\\dfrac12"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "cero-cero-explorador",
        "initial": [
          0,
          1,
          2,
          -1
        ],
        "hint": "Es el segundo ejemplo: (x − 1)(x − 2) entre (x − 1)(x + 1). La gráfica tiene un hueco en x = 1 y el límite es −1/2."
      }
    },
    {
      "id": "check-uno",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Diferencia de cuadrados."
        }
      ],
      "title": "Factorizar",
      "question": "Calcula $\\lim_{x \\to 3}\\dfrac{x^2 - 9}{x - 3}$. (solo el número)",
      "correctAnswers": [
        "6"
      ],
      "explanation": "$\\dfrac{(x - 3)(x + 3)}{x - 3} = x + 3 \\to 6$."
    },
    {
      "id": "check-segundo",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Factoriza ambos polinomios."
        }
      ],
      "title": "Un trinomio",
      "question": "Calcula $\\lim_{x \\to 1}\\dfrac{x^2 - 3x + 2}{x^2 - 1}$. (decimal o fracción)",
      "correctAnswers": [
        "-1/2",
        "−1/2",
        "-0.5",
        "-0,5",
        "−0,5",
        "−0.5"
      ],
      "explanation": "$\\dfrac{(x - 1)(x - 2)}{(x - 1)(x + 1)} = \\dfrac{x - 2}{x + 1} \\to \\dfrac{-1}{2}$."
    },
    {
      "id": "conjugado",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Con raíces: el conjugado"
        }
      ],
      "title": "Con raíces: el conjugado",
      "blocks": [
        {
          "kind": "text",
          "text": "Si hay una raíz, se multiplica numerador y denominador por el **conjugado** para usar $(a - b)(a + b) = a^2 - b^2$."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\lim_{x\\to 0}\\dfrac{\\sqrt{x + 1} - 1}{x} = \\lim_{x\\to 0}\\dfrac{(x + 1) - 1}{x(\\sqrt{x + 1} + 1)} = \\lim_{x\\to 0}\\dfrac{1}{\\sqrt{x + 1} + 1} = \\dfrac12"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "limite-tabla-explorador",
        "initial": [
          3,
          1,
          4
        ],
        "hint": "La tabla de valores confirma que (√(x+1) − 1)/x se acerca a 1/2."
      }
    },
    {
      "id": "check-conj",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Conjugado: $\\sqrt{x + 1} + 2$."
        }
      ],
      "title": "Conjugado",
      "question": "Calcula $\\lim_{x \\to 3}\\dfrac{\\sqrt{x + 1} - 2}{x - 3}$. (decimal o fracción)",
      "correctAnswers": [
        "1/4",
        "0.25",
        "0,25"
      ],
      "explanation": "Multiplicando por $\\sqrt{x + 1} + 2$: $\\dfrac{x - 3}{(x - 3)(\\sqrt{x + 1} + 2)} \\to \\dfrac{1}{4}$."
    }
  ],
};
