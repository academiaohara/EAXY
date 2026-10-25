import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_6_SUBTITLE } from "@/data/lessons/shared";

export const problemasMetricos12bachLesson: InteractiveLesson = {
  slug: "problemas-metricos-1-2bach",
  title: "11. Problemas métricos: planos a distancia dada y puntos",
  subtitle: TEMA_2BACH_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "estrategia",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Ecuaciones con una incógnita"
        }
      ],
      "title": "Ecuaciones con una incógnita",
      "blocks": [
        {
          "kind": "text",
          "text": "Muchos problemas piden un punto o un plano con una **condición de distancia o ángulo**: se escribe la fórmula con la incógnita y se resuelve la ecuación, que suele tener **dos soluciones** (valor absoluto)."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\text{Puntos } (a, 0, 0) \\text{ a distancia } 2 \\text{ de } x + 2y + 2z - 6 = 0"
            },
            {
              "math": "\\dfrac{|a - 6|}{3} = 2 \\Rightarrow a = 0 \\ \\text{o}\\ a = 12"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "distancias-espacio-explorador",
        "initial": [
          0,
          12,
          0,
          0,
          1,
          2,
          2,
          -6
        ],
        "hint": "El punto (12, 0, 0) está a distancia 2 del plano x + 2y + 2z − 6 = 0; el (0, 0, 0) también."
      }
    },
    {
      "id": "check-a",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Resuelve $|a - 6| = 6$."
        }
      ],
      "title": "Punto en el eje X",
      "question": "¿Cuál es el mayor valor de $a$ para que $(a, 0, 0)$ esté a distancia $2$ del plano $x + 2y + 2z - 6 = 0$? (solo el número)",
      "correctAnswers": [
        "12"
      ],
      "explanation": "$\\dfrac{|a - 6|}{3} = 2 \\Rightarrow a - 6 = \\pm 6 \\Rightarrow a = 12$ o $a = 0$."
    },
    {
      "id": "check-D",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$|\\vec{n}| = 3$."
        }
      ],
      "title": "Planos a distancia 4",
      "question": "Los planos $x + 2y + 2z + D = 0$ que distan $4$ del origen cumplen $|D| = 12$. ¿Cuánto vale el mayor $D$? (solo el número)",
      "correctAnswers": [
        "12"
      ],
      "explanation": "$\\dfrac{|D|}{3} = 4 \\Rightarrow D = \\pm 12$."
    },
    {
      "id": "check-m",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Eleva al cuadrado."
        }
      ],
      "title": "Un parámetro",
      "question": "¿Para qué valor positivo de $m$ el plano $mx + 3y + 4z = 0$ está a distancia $\\sqrt{2}$ del punto $(2, 0, 0)$? Pista: $\\dfrac{|2m|}{\\sqrt{m^2 + 25}} = \\sqrt2$. (solo el número)",
      "correctAnswers": [
        "5"
      ],
      "explanation": "$4m^2 = 2(m^2 + 25) \\Rightarrow 2m^2 = 50 \\Rightarrow m = 5$."
    },
    {
      "id": "check-dos",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Hay dos planos paralelos, uno a cada lado."
        }
      ],
      "title": "¿Cuántas soluciones?",
      "question": "Al imponer una distancia $d > 0$ a un plano variable $x + 2y + 2z + k = 0$ respecto de un punto fijo, aparecen…",
      "choices": [
        {
          "id": "a",
          "label": "dos soluciones para $k$, una a cada lado del punto"
        },
        {
          "id": "b",
          "label": "una sola solución",
          "incorrectFeedback": "El valor absoluto da dos valores."
        },
        {
          "id": "c",
          "label": "infinitas soluciones",
          "incorrectFeedback": "Solo hay dos planos paralelos a esa distancia."
        },
        {
          "id": "d",
          "label": "ninguna",
          "incorrectFeedback": "Siempre existen."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$|{\\cdots}| = d\\,|\\vec{n}|$ da dos signos."
    }
  ],
};
