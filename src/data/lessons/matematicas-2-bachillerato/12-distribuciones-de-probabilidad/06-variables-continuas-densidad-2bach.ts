import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_12_SUBTITLE } from "@/data/lessons/shared";

export const variablesContinuasDensidad2bachLesson: InteractiveLesson = {
  slug: "variables-continuas-densidad-2bach",
  title: "6. Variables continuas y función de densidad",
  subtitle: TEMA_2BACH_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "densidad",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "El área es la probabilidad"
        }
      ],
      "title": "El área es la probabilidad",
      "blocks": [
        {
          "kind": "text",
          "text": "Una variable **continua** toma valores en un intervalo. No se asignan probabilidades a valores sueltos: se usa una **función de densidad** $f(x) \\geq 0$ con área total $1$, y"
        },
        {
          "kind": "formula",
          "tex": "P(a \\leq X \\leq b) = \\int_a^b f(x)\\,dx"
        },
        {
          "kind": "text",
          "text": "Como un punto no tiene área, $P(X = a) = 0$ y da igual usar $<$ o $\\leq$."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "f(x) = \\dfrac{x}{50},\\ 0 \\leq x \\leq 10:\\quad \\int_0^{10}\\dfrac{x}{50}\\,dx = \\dfrac{100}{100} = 1"
            },
            {
              "math": "P(2 \\leq X \\leq 6) = \\dfrac{6^2 - 2^2}{100} = 0{,}32"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "densidad-explorador",
        "initial": [
          2,
          6
        ],
        "hint": "P(2 ≤ X ≤ 6) = 0,32: el área bajo f(x) = x/50 entre 2 y 6."
      }
    },
    {
      "id": "check-p",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\int_5^{10}\\frac{x}{50}\\,dx$."
        }
      ],
      "title": "Un intervalo",
      "question": "Con $f(x) = x/50$ en $[0, 10]$, ¿cuánto vale $P(5 \\leq X \\leq 10)$? (decimal)",
      "correctAnswers": [
        "0.75",
        "0,75",
        "3/4"
      ],
      "explanation": "$\\dfrac{100 - 25}{100} = 0{,}75$."
    },
    {
      "id": "check-cola",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\int_0^5\\frac{x}{50}\\,dx$."
        }
      ],
      "title": "Una cola",
      "question": "¿Cuánto vale $P(X \\leq 5)$ con esa densidad? (decimal)",
      "correctAnswers": [
        "0.25",
        "0,25",
        "1/4"
      ],
      "explanation": "$\\dfrac{25}{100} = 0{,}25$."
    },
    {
      "id": "check-punto",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Un punto no tiene anchura."
        }
      ],
      "title": "Un punto",
      "question": "¿Cuánto vale $P(X = 3)$ en una variable continua? (solo el número)",
      "correctAnswers": [
        "0"
      ],
      "explanation": "El área de un segmento es nula."
    },
    {
      "id": "check-media",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa dónde se acumula el área."
        }
      ],
      "title": "Dónde está la media",
      "question": "La densidad $f(x) = x/50$ crece de $0$ a $10$. Su media $\\frac{20}{3} \\approx 6{,}67$ es…",
      "choices": [
        {
          "id": "a",
          "label": "mayor que $5$, el punto medio del intervalo, porque hay más masa a la derecha"
        },
        {
          "id": "b",
          "label": "exactamente $5$",
          "incorrectFeedback": "Eso ocurriría con una densidad simétrica."
        },
        {
          "id": "c",
          "label": "menor que $5$",
          "incorrectFeedback": "La densidad crece hacia la derecha: la media se desplaza a ese lado."
        },
        {
          "id": "d",
          "label": "imposible de calcular",
          "incorrectFeedback": "$E(X) = \\int x\\,f(x)\\,dx = \\frac{20}{3}$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$\\int_0^{10} x\\cdot\\tfrac{x}{50}\\,dx = \\tfrac{1000}{150} = \\tfrac{20}{3}$."
    }
  ],
};
