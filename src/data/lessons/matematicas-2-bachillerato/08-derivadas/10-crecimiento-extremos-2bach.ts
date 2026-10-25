import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_8_SUBTITLE } from "@/data/lessons/shared";

export const crecimientoExtremos2bachLesson: InteractiveLesson = {
  slug: "crecimiento-extremos-2bach",
  title: "10. Crecimiento y extremos relativos",
  subtitle: TEMA_2BACH_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "signo",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "El signo de la derivada"
        }
      ],
      "title": "El signo de la derivada",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "f' > 0 \\text{ en un intervalo}",
              "label": "f es creciente"
            },
            {
              "tex": "f' < 0 \\text{ en un intervalo}",
              "label": "f es decreciente"
            },
            {
              "tex": "f'(a) = 0",
              "label": "punto crítico (posible extremo)"
            }
          ]
        },
        {
          "kind": "text",
          "text": "Si $f'$ cambia de $+$ a $-$ en $a$, hay un **máximo relativo**; de $-$ a $+$, un **mínimo relativo**. También sirve la 2.ª derivada: $f'(a) = 0$ y $f''(a) < 0$ ⟹ máximo; $f''(a) > 0$ ⟹ mínimo."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "extremos-criterios"
      }
    },
    {
      "id": "check-min",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Evalúa en el punto con $f'' > 0$."
        }
      ],
      "title": "Mínimo relativo",
      "question": "Para $f(x) = x^3 - 3x$ (puntos críticos $x = \\pm 1$), ¿cuánto vale el mínimo relativo? (solo el número)",
      "correctAnswers": [
        "-2",
        "−2"
      ],
      "explanation": "$f(1) = 1 - 3 = -2$ (en $x = 1$, $f'' = 6 > 0$)."
    },
    {
      "id": "check-max",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "El máximo está en $x = -2$."
        }
      ],
      "title": "Máximo relativo",
      "question": "Para $f(x) = x^3 - 12x$, ¿cuánto vale el máximo relativo? (solo el número)",
      "correctAnswers": [
        "16"
      ],
      "explanation": "$f'(x) = 3x^2 - 12 = 0 \\Rightarrow x = \\pm 2$; $f(-2) = -8 + 24 = 16$ ($f''(-2) = -12 < 0$)."
    },
    {
      "id": "explorar",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Explora puntos críticos"
        }
      ],
      "title": "Explora puntos críticos",
      "blocks": [
        {
          "kind": "text",
          "text": "Elige una función y un intervalo: se señalan los puntos críticos, su tipo y los extremos absolutos en el intervalo cerrado."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "extremos-explorador",
        "initial": [
          1,
          -3,
          3,
          1
        ],
        "hint": "Extremos absolutos de x³ − 3x en [−3, 3]: se comparan los puntos críticos y los extremos del intervalo."
      }
    },
    {
      "id": "check-abs",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en una función creciente."
        }
      ],
      "title": "Extremos absolutos",
      "question": "Para hallar el máximo absoluto de una función continua en $[a, b]$ hay que comparar…",
      "choices": [
        {
          "id": "a",
          "label": "los valores en los puntos críticos y en los extremos $a$ y $b$"
        },
        {
          "id": "b",
          "label": "solo los puntos críticos",
          "incorrectFeedback": "El máximo puede estar en un extremo del intervalo."
        },
        {
          "id": "c",
          "label": "solo los extremos del intervalo",
          "incorrectFeedback": "Puede estar en el interior."
        },
        {
          "id": "d",
          "label": "las derivadas en $a$ y $b$",
          "incorrectFeedback": "No es lo que se compara."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Weierstrass asegura que existe; se busca entre candidatos."
    }
  ],
};
