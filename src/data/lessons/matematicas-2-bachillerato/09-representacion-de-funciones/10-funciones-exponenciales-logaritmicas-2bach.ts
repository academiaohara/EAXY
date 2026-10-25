import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_9_SUBTITLE } from "@/data/lessons/shared";

export const funcionesExponencialesLogaritmicas2bachLesson: InteractiveLesson = {
  slug: "funciones-exponenciales-logaritmicas-2bach",
  title: "10. Funciones exponenciales y logarítmicas",
  subtitle: TEMA_2BACH_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "exp",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Combinar potencias con eˣ y ln x"
        }
      ],
      "title": "Combinar potencias con eˣ y ln x",
      "blocks": [
        {
          "kind": "text",
          "text": "Con exponenciales hay que recordar: $e^x > 0$ siempre y $\\lim_{x\\to\\infty} x^k e^{-x} = 0$ (la exponencial gana). Con logaritmos el dominio es $x > 0$ y $\\ln x$ crece más despacio que cualquier potencia."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "f(x) = x^2 e^{-x}:\\ f' = (2x - x^2)e^{-x} = 0 \\iff x = 0,\\ 2"
            },
            {
              "math": "\\text{Mínimo } (0, 0),\\ \\text{máximo } \\left(2,\\ 4e^{-2}\\right) \\approx (2;\\ 0{,}54)"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "estudio-funcion-explorador",
        "initial": [
          4,
          6
        ],
        "hint": "x² e⁻ˣ: asíntota horizontal y = 0 en +∞, mínimo en el origen y máximo en x = 2."
      }
    },
    {
      "id": "check-x",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Resuelve $f' = 0$."
        }
      ],
      "title": "Dónde está el máximo",
      "question": "¿En qué valor de $x$ tiene $f(x) = x^2 e^{-x}$ su máximo relativo? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$2x - x^2 = x(2 - x) = 0$: $x = 0$ (mínimo) y $x = 2$ (máximo)."
    },
    {
      "id": "check-lim",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Compara velocidades."
        }
      ],
      "title": "Una asíntota",
      "question": "Calcula $\\lim_{x \\to +\\infty} x^2 e^{-x}$. (solo el número)",
      "correctAnswers": [
        "0"
      ],
      "explanation": "La exponencial crece más rápido que cualquier potencia: $\\dfrac{x^2}{e^x} \\to 0$."
    },
    {
      "id": "ln",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Un logaritmo dividido entre x"
        }
      ],
      "title": "Un logaritmo dividido entre x",
      "blocks": [
        {
          "kind": "example",
          "lines": [
            {
              "math": "f(x) = \\dfrac{\\ln x}{x},\\quad f' = \\dfrac{1 - \\ln x}{x^2} = 0 \\iff x = e"
            },
            {
              "math": "\\text{Máximo } \\left(e,\\ \\tfrac1e\\right),\\quad \\text{asíntotas } x = 0 \\text{ e } y = 0"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "estudio-funcion-explorador",
        "initial": [
          5,
          6
        ],
        "hint": "ln x / x: dominio (0, +∞), un solo corte en x = 1 y un máximo en x = e."
      }
    },
    {
      "id": "check-e",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\ln e = 1$."
        }
      ],
      "title": "Valor en el máximo",
      "question": "Para $f(x) = \\dfrac{\\ln x}{x}$, calcula $e\\cdot f(e)$. (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$f(e) = \\dfrac{1}{e}$, luego $e\\cdot f(e) = 1$."
    }
  ],
};
