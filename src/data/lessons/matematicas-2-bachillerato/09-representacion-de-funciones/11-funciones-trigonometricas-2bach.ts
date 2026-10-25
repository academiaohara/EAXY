import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_9_SUBTITLE } from "@/data/lessons/shared";

export const funcionesTrigonometricas2bachLesson: InteractiveLesson = {
  slug: "funciones-trigonometricas-2bach",
  title: "11. Funciones trigonométricas",
  subtitle: TEMA_2BACH_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "trig",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Periódicas: basta un periodo"
        }
      ],
      "title": "Periódicas: basta un periodo",
      "blocks": [
        {
          "kind": "text",
          "text": "Una función trigonométrica se estudia en **un periodo** y se repite. Los extremos salen de $f' = 0$ en ese periodo."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "f(x) = \\sin x + \\cos x,\\quad f' = \\cos x - \\sin x = 0 \\iff x = \\tfrac{\\pi}{4} + k\\pi"
            },
            {
              "math": "\\text{Máximo } \\sqrt2 \\text{ en } x = \\tfrac\\pi4;\\quad \\text{mínimo } -\\sqrt2 \\text{ en } x = \\tfrac{5\\pi}{4}"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "trig-funcion-explorador",
        "initial": [
          0,
          2,
          1,
          0,
          0
        ],
        "hint": "y = 2·sen x: amplitud 2, periodo 360°. Cambia A, B, C y D para ver cómo se transforma."
      }
    },
    {
      "id": "check-periodo",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Mismo periodo."
        }
      ],
      "title": "Periodo",
      "question": "El periodo de $f(x) = \\sin x + \\cos x$ es $T = k\\pi$. ¿Cuánto vale $k$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "Las dos funciones tienen periodo $2\\pi$, luego la suma también."
    },
    {
      "id": "check-max",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Evalúa en $\\pi/4$."
        }
      ],
      "title": "Valor del máximo",
      "question": "El máximo de $f(x) = \\sin x + \\cos x$ es $\\sqrt{a}$. ¿Cuánto vale $a$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$f\\left(\\tfrac\\pi4\\right) = \\dfrac{\\sqrt2}{2} + \\dfrac{\\sqrt2}{2} = \\sqrt2$."
    },
    {
      "id": "check-cortes",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Mira $\\sin x = 0$."
        }
      ],
      "title": "Ceros por periodo",
      "question": "¿Cuántos cortes con el eje $X$ tiene $y = \\sin x$ en $[0, 2\\pi)$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "En $x = 0$ y $x = \\pi$ (en $2\\pi$, el intervalo ya es abierto)."
    },
    {
      "id": "check-amp",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Distingue $A\\sin x$ de $\\sin(Bx)$."
        }
      ],
      "title": "Amplitud",
      "question": "La función $y = 3\\sin x$ tiene…",
      "choices": [
        {
          "id": "a",
          "label": "amplitud $3$ y periodo $2\\pi$"
        },
        {
          "id": "b",
          "label": "amplitud $1$ y periodo $6\\pi$",
          "incorrectFeedback": "El factor $3$ multiplica la función, no el ángulo."
        },
        {
          "id": "c",
          "label": "amplitud $3$ y periodo $\\tfrac{2\\pi}{3}$",
          "incorrectFeedback": "El periodo solo cambia si se multiplica la variable."
        },
        {
          "id": "d",
          "label": "amplitud $\\tfrac13$",
          "incorrectFeedback": "La amplitud es $|A| = 3$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$y = A\\sin x$: amplitud $|A|$."
    }
  ],
};
