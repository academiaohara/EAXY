import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_12_SUBTITLE } from "@/data/lessons/shared";

export const binomialANormal2bachLesson: InteractiveLesson = {
  slug: "binomial-a-normal-2bach",
  title: "10. Aproximación de la binomial a la normal",
  subtitle: TEMA_2BACH_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "aprox",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Cuando n es grande"
        }
      ],
      "title": "Cuando n es grande",
      "blocks": [
        {
          "kind": "text",
          "text": "Si $X \\sim B(n, p)$ con $np \\geq 5$ y $nq \\geq 5$ (o $npq \\geq 9$), $X$ se aproxima por una normal con la misma media y desviación típica:"
        },
        {
          "kind": "formula",
          "tex": "B(n, p) \\approx N\\left(np,\\ \\sqrt{npq}\\right)"
        },
        {
          "kind": "text",
          "text": "Como una binomial toma valores enteros, se hace la **corrección de continuidad**: se reemplaza cada entero $k$ por el intervalo $(k - 0{,}5,\\ k + 0{,}5)$."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "X \\sim B(100;\\ 0{,}5) \\approx N(50;\\ 5):\\ P(X \\geq 60) = P(X' \\geq 59{,}5) = P(Z \\geq 1{,}9) = 0{,}0287"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "binomial-normal-explorador",
        "initial": [
          100,
          50,
          60,
          100
        ],
        "hint": "B(100; 0,5): la exacta da 0,0284 y la normal con corrección 0,0287."
      }
    },
    {
      "id": "check-mu",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\sqrt{npq}$."
        }
      ],
      "title": "Parámetros",
      "question": "$X \\sim B(100;\\ 0{,}5)$ se aproxima por $N(\\mu, \\sigma)$. ¿Cuánto vale $\\sigma$? (solo el número)",
      "correctAnswers": [
        "5"
      ],
      "explanation": "$\\sqrt{100\\cdot0{,}5\\cdot0{,}5} = 5$."
    },
    {
      "id": "check-z",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$59{,}5 - 50 = 9{,}5$."
        }
      ],
      "title": "Tipificar con corrección",
      "question": "Para $P(X \\geq 60)$ se calcula $z = \\dfrac{59{,}5 - 50}{5}$. ¿Cuánto vale $z$? (decimal)",
      "correctAnswers": [
        "1.9",
        "1,9"
      ],
      "explanation": "$\\dfrac{9{,}5}{5} = 1{,}9$."
    },
    {
      "id": "check-p",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Contrario."
        }
      ],
      "title": "Probabilidad",
      "question": "Sabiendo que $P(Z \\leq 1{,}9) = 0{,}9713$, ¿cuánto vale $P(Z \\geq 1{,}9)$? (4 decimales)",
      "correctAnswers": [
        "0.0287",
        "0,0287"
      ],
      "explanation": "$1 - 0{,}9713 = 0{,}0287$."
    },
    {
      "id": "check-npq",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$64\\cdot\\tfrac14\\cdot\\tfrac34$."
        }
      ],
      "title": "Criterio",
      "question": "¿Cuánto vale $npq$ en $B(64;\\ 0{,}25)$? (solo el número)",
      "correctAnswers": [
        "12"
      ],
      "explanation": "$64\\cdot0{,}25\\cdot0{,}75 = 12 \\geq 9$: se puede aproximar."
    },
    {
      "id": "check-corr",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Incluye el último entero completo."
        }
      ],
      "title": "Corrección de continuidad",
      "question": "Para aproximar $P(X \\leq 7)$ de una binomial por una normal se calcula…",
      "choices": [
        {
          "id": "a",
          "label": "$P(X' \\leq 7{,}5)$"
        },
        {
          "id": "b",
          "label": "$P(X' \\leq 7)$",
          "incorrectFeedback": "Sin la corrección se pierde media columna de la binomial."
        },
        {
          "id": "c",
          "label": "$P(X' \\leq 6{,}5)$",
          "incorrectFeedback": "Eso sería $P(X \\leq 6)$."
        },
        {
          "id": "d",
          "label": "$P(X' \\leq 8)$",
          "incorrectFeedback": "Se pasaría de $7$ en media unidad."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "El valor $7$ ocupa de $6{,}5$ a $7{,}5$."
    }
  ],
};
