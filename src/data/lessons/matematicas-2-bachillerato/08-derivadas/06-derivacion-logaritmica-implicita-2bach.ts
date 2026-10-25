import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_8_SUBTITLE } from "@/data/lessons/shared";

export const derivacionLogaritmicaImplicita2bachLesson: InteractiveLesson = {
  slug: "derivacion-logaritmica-implicita-2bach",
  title: "6. Derivación logarítmica e implícita",
  subtitle: TEMA_2BACH_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "log",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Potencias con variable en la base y el exponente"
        }
      ],
      "title": "Potencias con variable en la base y el exponente",
      "blocks": [
        {
          "kind": "steps",
          "items": [
            "Se toman logaritmos: $\\ln y = g(x)\\ln f(x)$.",
            "Se deriva en los dos miembros: $\\dfrac{y'}{y} = \\dots$",
            "Se despeja $y' = y\\cdot(\\dots)$."
          ]
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "y = x^x \\Rightarrow \\ln y = x\\ln x \\Rightarrow \\dfrac{y'}{y} = \\ln x + 1 \\Rightarrow y' = x^x(\\ln x + 1)"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "funcion-derivada-explorador",
        "initial": [
          6,
          10
        ],
        "hint": "Comprueba la derivada de ln x con la tangente: pendiente 1/x."
      }
    },
    {
      "id": "check-xx",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\ln 1 = 0$."
        }
      ],
      "title": "La derivada de x^x",
      "question": "Si $y = x^x$, ¿cuánto vale $y'(1)$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$y' = x^x(\\ln x + 1)$ y $y'(1) = 1\\cdot(0 + 1) = 1$."
    },
    {
      "id": "implicita",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Derivación implícita"
        }
      ],
      "title": "Derivación implícita",
      "blocks": [
        {
          "kind": "text",
          "text": "Cuando $y$ está dada por una ecuación $F(x, y) = 0$ se deriva respecto de $x$ considerando $y = y(x)$ (regla de la cadena) y se despeja $y'$."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "x^2 + y^2 = 25 \\Rightarrow 2x + 2y\\,y' = 0 \\Rightarrow y' = -\\dfrac{x}{y}"
            }
          ]
        }
      ]
    },
    {
      "id": "check-circ",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$y' = -x/y$."
        }
      ],
      "title": "Pendiente en una circunferencia",
      "question": "En la circunferencia $x^2 + y^2 = 25$, ¿cuánto vale la pendiente de la tangente en $(3, 4)$? (decimal o fracción)",
      "correctAnswers": [
        "-3/4",
        "−3/4",
        "-0.75",
        "-0,75",
        "−0,75",
        "−0.75"
      ],
      "explanation": "$y' = -\\dfrac{x}{y} = -\\dfrac{3}{4}$."
    },
    {
      "id": "check-xy",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Deriva el producto."
        }
      ],
      "title": "Otra implícita",
      "question": "En la curva $x\\,y = 1$, ¿cuánto vale $y'$ en $(1, 1)$? (solo el número)",
      "correctAnswers": [
        "-1",
        "−1"
      ],
      "explanation": "$y + x y' = 0 \\Rightarrow y' = -\\dfrac{y}{x} = -1$."
    }
  ],
};
