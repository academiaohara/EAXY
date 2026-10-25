import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_7_SUBTITLE } from "@/data/lessons/shared";

export const indeterminacionUnoInfinito2bachLesson: InteractiveLesson = {
  slug: "indeterminacion-uno-infinito-2bach",
  title: "7. La indeterminación 1^∞ y el número e",
  subtitle: TEMA_2BACH_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "e",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "El número e como límite"
        }
      ],
      "title": "El número e como límite",
      "blocks": [
        {
          "kind": "definition",
          "text": "$e = \\lim_{n\\to\\infty}\\left(1 + \\dfrac1n\\right)^{n} \\approx 2{,}71828$"
        },
        {
          "kind": "rule",
          "title": "Caso general",
          "text": "Si $f \\to 1$ y $g \\to \\infty$:",
          "formula": "\\lim f^{g} = e^{\\lim g\\,(f - 1)}"
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\lim_{x\\to\\infty}\\left(1 + \\dfrac{3}{x}\\right)^{2x} = e^{\\lim 2x\\cdot\\frac3x} = e^{6}"
            },
            {
              "math": "\\lim_{x\\to\\infty}\\left(\\dfrac{x + 1}{x - 1}\\right)^{x} = e^{\\lim x\\cdot\\frac{2}{x - 1}} = e^{2}"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "uno-infinito-explorador",
        "initial": [
          3,
          2,
          3
        ],
        "hint": "Con a = 3 y b = 2 los valores se acercan a e⁶ ≈ 403,43."
      }
    },
    {
      "id": "check-exp",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$g\\,(f - 1)$."
        }
      ],
      "title": "Calcular el exponente",
      "question": "Calcula $\\lim_{x \\to \\infty}\\left(1 + \\dfrac{3}{x}\\right)^{2x} = e^{k}$. ¿Cuánto vale $k$? (solo el número)",
      "correctAnswers": [
        "6"
      ],
      "explanation": "$k = \\lim 2x\\cdot\\dfrac{3}{x} = 6$."
    },
    {
      "id": "check-cociente",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Resta $1$ a la base."
        }
      ],
      "title": "Con un cociente",
      "question": "Calcula $\\lim_{x \\to \\infty}\\left(\\dfrac{x + 1}{x - 1}\\right)^{x} = e^{k}$. ¿Cuánto vale $k$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$f - 1 = \\dfrac{2}{x - 1}$ y $x\\cdot\\dfrac{2}{x - 1} \\to 2$."
    },
    {
      "id": "check-cuadrado",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Misma idea."
        }
      ],
      "title": "Con x²",
      "question": "Calcula $\\lim_{x \\to \\infty}\\left(\\dfrac{x^2 + 1}{x^2 - 1}\\right)^{x^2} = e^{k}$. ¿Cuánto vale $k$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$f - 1 = \\dfrac{2}{x^2 - 1}$ y $x^2\\cdot\\dfrac{2}{x^2 - 1} \\to 2$."
    },
    {
      "id": "check-uno",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\dfrac{x}{2}\\cdot\\dfrac2x$."
        }
      ],
      "title": "Exponente 1",
      "question": "$\\lim_{x \\to \\infty}\\left(1 + \\dfrac{2}{x}\\right)^{x/2} = e^{k}$. ¿Cuánto vale $k$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$k = \\lim \\dfrac{x}{2}\\cdot\\dfrac{2}{x} = 1$."
    }
  ],
};
