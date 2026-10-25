import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_5_SUBTITLE } from "@/data/lessons/shared";

export const derivadaDefinicionCcss2Lesson: InteractiveLesson = {
  slug: "derivada-definicion-ccss2",
  title: "1. Derivada de una función en un punto",
  subtitle: TEMA_CCSS2_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "tvm",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "De la tasa media a la derivada"
        }
      ],
      "title": "De la tasa media a la derivada",
      "blocks": [
        {
          "kind": "definition",
          "text": "La **tasa de variación media** de $f$ en $[a, a + h]$ es $\\dfrac{f(a + h) - f(a)}{h}$: la pendiente de la **secante**."
        },
        {
          "kind": "rule",
          "title": "Derivada",
          "text": "Si existe y es finita, el límite de las tasas medias cuando $h \\to 0$ es la **derivada** en $a$ (pendiente de la tangente):",
          "formula": "f'(a) = \\lim_{h\\to 0}\\dfrac{f(a + h) - f(a)}{h} = \\lim_{x\\to a}\\dfrac{f(x) - f(a)}{x - a}"
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "secante-tangente"
      }
    },
    {
      "id": "check-tvm",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\dfrac{f(3) - f(1)}{3 - 1}$."
        }
      ],
      "title": "Tasa de variación media",
      "question": "Calcula la tasa de variación media de $f(x) = x^2$ en $[1, 3]$. (solo el número)",
      "correctAnswers": [
        "4"
      ],
      "explanation": "$\\dfrac{9 - 1}{3 - 1} = 4$."
    },
    {
      "id": "limite",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Derivar con la definición"
        }
      ],
      "title": "Derivar con la definición",
      "blocks": [
        {
          "kind": "example",
          "lines": [
            {
              "math": "f(x) = x^2,\\quad f'(3) = \\lim_{h\\to 0}\\dfrac{(3 + h)^2 - 9}{h} = \\lim_{h\\to 0}\\dfrac{6h + h^2}{h} = \\lim_{h\\to 0}(6 + h) = 6"
            }
          ]
        },
        {
          "kind": "text",
          "text": "En física, si $s(t)$ es la posición, $s'(t)$ es la **velocidad instantánea**."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "secante-explorador",
        "initial": [
          0,
          6,
          2,
          0
        ],
        "hint": "Con f(x) = x² en a = 3, las pendientes de las secantes se acercan a 6 al reducir h."
      }
    },
    {
      "id": "check-deriv",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Desarrolla $(3 + h)^2$."
        }
      ],
      "title": "Derivada en un punto",
      "question": "Calcula con la definición $f'(3)$ para $f(x) = x^2$. (solo el número)",
      "correctAnswers": [
        "6"
      ],
      "explanation": "$\\lim_{h \\to 0}(6 + h) = 6$."
    },
    {
      "id": "check-vel",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Es la derivada de la posición."
        }
      ],
      "title": "Velocidad instantánea",
      "question": "La posición de un móvil es $s(t) = t^2$ (en metros). ¿Cuál es su velocidad en $t = 3$ s, en m/s? (solo el número)",
      "correctAnswers": [
        "6"
      ],
      "explanation": "$s'(t) = 2t$ y $s'(3) = 6$."
    }
  ],
};
