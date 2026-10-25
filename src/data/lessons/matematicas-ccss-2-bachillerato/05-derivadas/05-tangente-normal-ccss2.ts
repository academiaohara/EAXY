import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_5_SUBTITLE } from "@/data/lessons/shared";

export const tangenteNormalCcss2Lesson: InteractiveLesson = {
  slug: "tangente-normal-ccss2",
  title: "5. Recta tangente y recta normal",
  subtitle: TEMA_CCSS2_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "ecuaciones",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Tangente y normal en un punto"
        }
      ],
      "title": "Tangente y normal en un punto",
      "blocks": [
        {
          "kind": "rule",
          "title": "Tangente",
          "text": "En el punto $(a, f(a))$:",
          "formula": "y - f(a) = f'(a)\\,(x - a)"
        },
        {
          "kind": "rule",
          "title": "Normal",
          "text": "Perpendicular a la tangente (si $f'(a) \\neq 0$):",
          "formula": "y - f(a) = -\\dfrac{1}{f'(a)}\\,(x - a)"
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "funcion-derivada-explorador",
        "initial": [
          0,
          10
        ],
        "hint": "Para f(x) = x² en x = 1: tangente y = 2x − 1."
      }
    },
    {
      "id": "check-m",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Deriva y sustituye."
        }
      ],
      "title": "Pendiente",
      "question": "¿Cuánto vale la pendiente de la tangente a $f(x) = x^3 - 3x$ en $x = 2$? (solo el número)",
      "correctAnswers": [
        "9"
      ],
      "explanation": "$f'(x) = 3x^2 - 3$ y $f'(2) = 9$."
    },
    {
      "id": "check-n",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Despeja $y$."
        }
      ],
      "title": "Ordenada en el origen",
      "question": "La tangente a $f(x) = x^2$ en $x = 3$ es $y - 9 = 6(x - 3)$. ¿Cuál es su ordenada en el origen? (solo el número)",
      "correctAnswers": [
        "-9",
        "−9"
      ],
      "explanation": "$y = 6x - 18 + 9 = 6x - 9$."
    },
    {
      "id": "check-normal",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Inversa y opuesta."
        }
      ],
      "title": "Pendiente de la normal",
      "question": "La tangente a una curva tiene pendiente $4$. ¿Cuánto vale la pendiente de la normal? (decimal o fracción)",
      "correctAnswers": [
        "-1/4",
        "−1/4",
        "-0.25",
        "-0,25",
        "−0,25",
        "−0.25"
      ],
      "explanation": "$-\\dfrac{1}{4}$."
    },
    {
      "id": "check-horizontal",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Una recta horizontal tiene pendiente $0$."
        }
      ],
      "title": "Tangente horizontal",
      "question": "La tangente a $f$ en $a$ es horizontal cuando…",
      "choices": [
        {
          "id": "a",
          "label": "$f'(a) = 0$"
        },
        {
          "id": "b",
          "label": "$f(a) = 0$",
          "incorrectFeedback": "Eso es que la gráfica corta al eje."
        },
        {
          "id": "c",
          "label": "$f''(a) = 0$",
          "incorrectFeedback": "Eso es la segunda derivada."
        },
        {
          "id": "d",
          "label": "$f'(a)$ no existe",
          "incorrectFeedback": "Sería una tangente vertical o un pico."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Pendiente nula."
    }
  ],
};
