import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_12_SUBTITLE } from "@/data/lessons/shared";

export const desigualdadChebychev2bachLesson: InteractiveLesson = {
  slug: "desigualdad-chebychev-2bach",
  title: "5. Desigualdad de Chebychev",
  subtitle: TEMA_2BACH_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "cheby",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Una cota que vale para cualquier distribución"
        }
      ],
      "title": "Una cota que vale para cualquier distribución",
      "blocks": [
        {
          "kind": "rule",
          "title": "Chebychev",
          "text": "Para cualquier variable con media $\\mu$ y desviación típica $\\sigma$, y cualquier $k > 1$:",
          "formula": "P\\left(|X - \\mu| < k\\sigma\\right) \\geq 1 - \\dfrac{1}{k^2}"
        },
        {
          "kind": "text",
          "text": "Garantiza que al menos el $75\\,\\%$ de los datos está a menos de $2\\sigma$ de la media, el $88{,}9\\,\\%$ a menos de $3\\sigma$… sin conocer la forma de la distribución. Por eso suele ser **pesimista**."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\mu = 50,\\ \\sigma = 5:\\ P(40 < X < 60) \\geq 1 - \\tfrac14 = 0{,}75"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "chebychev-explorador",
        "initial": [
          20
        ],
        "hint": "Con k = 2, la binomial B(20; 0,5) tiene un 95,86 % dentro, pero Chebychev solo garantiza el 75 %."
      }
    },
    {
      "id": "check-k2",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$(60 - 50)/5 = 2$."
        }
      ],
      "title": "Cota con k = 2",
      "question": "Para $\\mu = 50$ y $\\sigma = 5$, ¿cuál es la cota inferior de $P(40 < X < 60)$? (decimal)",
      "correctAnswers": [
        "0.75",
        "0,75",
        "3/4"
      ],
      "explanation": "$k = 2$: $1 - \\tfrac14 = 0{,}75$."
    },
    {
      "id": "check-k3",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$(65 - 50)/5 = 3$."
        }
      ],
      "title": "Cota con k = 3",
      "question": "Con los mismos datos, ¿cuál es la cota inferior de $P(35 < X < 65)$? (4 decimales)",
      "correctAnswers": [
        "0.8889",
        "0,8889",
        "8/9"
      ],
      "explanation": "$k = 3$: $1 - \\tfrac19 = \\tfrac89 \\approx 0{,}8889$."
    },
    {
      "id": "check-k",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\tfrac1{k^2} = 0{,}04$."
        }
      ],
      "title": "Despejar k",
      "question": "¿Qué valor de $k$ garantiza una probabilidad mínima de $0{,}96$? (solo el número)",
      "correctAnswers": [
        "5"
      ],
      "explanation": "$1 - \\tfrac1{k^2} = 0{,}96 \\Rightarrow k^2 = 25$, luego $k = 5$."
    },
    {
      "id": "check-sirve",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Compara con el valor exacto del explorador."
        }
      ],
      "title": "¿Cuándo sirve?",
      "question": "¿Cuál es la gran ventaja de la desigualdad de Chebychev?",
      "choices": [
        {
          "id": "a",
          "label": "Se cumple para cualquier distribución con media y varianza finitas"
        },
        {
          "id": "b",
          "label": "Da el valor exacto de la probabilidad",
          "incorrectFeedback": "Solo da una cota inferior."
        },
        {
          "id": "c",
          "label": "Solo funciona con la normal",
          "incorrectFeedback": "Precisamente no exige ninguna forma."
        },
        {
          "id": "d",
          "label": "Sirve para cualquier $k$, incluso $k < 1$",
          "incorrectFeedback": "Para $k \\leq 1$ la cota es negativa o nula: no informa."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Es una cota universal, aunque a menudo poco ajustada."
    }
  ],
};
