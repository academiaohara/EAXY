import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_6_SUBTITLE } from "@/data/lessons/shared";

export const areasEntreCurvasCcss2Lesson: InteractiveLesson = {
  slug: "areas-entre-curvas-ccss2",
  title: "11. Área entre dos curvas",
  subtitle: TEMA_CCSS2_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "areas",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Área entre dos curvas"
        }
      ],
      "title": "Área entre dos curvas",
      "blocks": [
        {
          "kind": "rule",
          "title": "Área",
          "text": "Si $f(x) \\geq g(x)$ en $[a,b]$:",
          "formula": "\\text{Área} = \\int_a^b \\left[f(x) - g(x)\\right]dx"
        },
        {
          "kind": "text",
          "text": "Primero se hallan los **puntos de corte** (igualando las dos funciones); entre ellos se integra la función de arriba menos la de abajo."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "y = 2x,\\ y = x^2:\\ \\ 2x = x^2 \\Rightarrow x = 0,\\ 2"
            },
            {
              "math": "\\int_0^2 (2x - x^2)\\,dx = \\left[x^2 - \\dfrac{x^3}{3}\\right]_0^2 = \\dfrac43"
            }
          ]
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "area-entre-curvas"
      }
    },
    {
      "id": "areas-herr",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Explora el área"
        }
      ],
      "title": "Explora el área",
      "blocks": [
        {
          "kind": "text",
          "text": "Cambia la pendiente $m$ de la recta $y = mx$ y observa el área que encierra con la parábola $y = x^2$."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "area-curvas-explorador",
        "initial": [
          2
        ],
        "hint": "El área vale m³/6: con m = 3 son 9/2."
      }
    },
    {
      "id": "check-area",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Arriba está $y = x$."
        }
      ],
      "title": "Área entre dos curvas",
      "question": "Calcula el área entre $y = x$ e $y = x^2$ en $[0,1]$. (fracción o decimal)",
      "correctAnswers": [
        "1/6",
        "0.1667",
        "0,1667",
        "0.167",
        "0,167"
      ],
      "explanation": "$\\int_0^1 (x - x^2)\\,dx = \\tfrac12 - \\tfrac13 = \\tfrac16$."
    },
    {
      "id": "check-area3",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$m^3 = 27$."
        }
      ],
      "title": "Con m = 3",
      "question": "Área entre $y = 3x$ e $y = x^2$ (fórmula $m^3/6$). (decimal)",
      "correctAnswers": [
        "9/2",
        "4.5",
        "4,5"
      ],
      "explanation": "$27/6 = 9/2$."
    },
    {
      "id": "check-restar",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Mira la franja de la animación."
        }
      ],
      "title": "¿Arriba menos abajo?",
      "question": "Para calcular el área entre dos curvas se integra…",
      "choices": [
        {
          "id": "a",
          "label": "la función de arriba menos la de abajo, entre los puntos de corte"
        },
        {
          "id": "b",
          "label": "la suma de las dos funciones",
          "incorrectFeedback": "Eso no mide el área entre ellas."
        },
        {
          "id": "c",
          "label": "solo la función de arriba",
          "incorrectFeedback": "Incluiría el área bajo la curva de abajo."
        },
        {
          "id": "d",
          "label": "el producto de las dos funciones",
          "incorrectFeedback": "El producto no tiene significado de área."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "La altura de cada franja es $f(x) - g(x)$."
    }
  ],
};
