import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_12_SUBTITLE } from "@/data/lessons/shared";

export const variableAleatoriaDiscreta2bachLesson: InteractiveLesson = {
  slug: "variable-aleatoria-discreta-2bach",
  title: "1. Variable aleatoria y distribución de probabilidad",
  subtitle: TEMA_2BACH_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "variable",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "De los resultados a los números"
        }
      ],
      "title": "De los resultados a los números",
      "blocks": [
        {
          "kind": "definition",
          "text": "Una **variable aleatoria** $X$ asigna un número a cada resultado de un experimento aleatorio. Es **discreta** si toma un número finito (o numerable) de valores."
        },
        {
          "kind": "text",
          "text": "Su **distribución de probabilidad** es la tabla de los valores $x_i$ con sus probabilidades $p_i = P(X = x_i)$. Debe cumplir $p_i \\geq 0$ y $\\sum p_i = 1$."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "X = \\text{número de caras al lanzar 3 monedas}"
            },
            {
              "math": "P(0) = \\tfrac18,\\ P(1) = \\tfrac38,\\ P(2) = \\tfrac38,\\ P(3) = \\tfrac18"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "distribucion-discreta-explorador",
        "initial": [
          3,
          1,
          1
        ],
        "hint": "Con 3 monedas la probabilidad de 0, 1, 2 y 3 caras es 1/8, 3/8, 3/8 y 1/8."
      }
    },
    {
      "id": "check-p2",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Suma $P(2)$ y $P(3)$."
        }
      ],
      "title": "Al menos dos caras",
      "question": "Con la distribución de arriba, ¿cuánto vale $P(X \\geq 2)$? (decimal o fracción)",
      "correctAnswers": [
        "1/2",
        "0.5",
        "0,5",
        "4/8"
      ],
      "explanation": "$\\tfrac38 + \\tfrac18 = \\tfrac48 = \\tfrac12$."
    },
    {
      "id": "check-p0",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Todas cruces."
        }
      ],
      "title": "Ninguna cara",
      "question": "¿Cuánto vale $P(X = 0)$? (decimal)",
      "correctAnswers": [
        "0.125",
        "0,125",
        "1/8"
      ],
      "explanation": "Solo un caso de $8$: $\\tfrac18 = 0{,}125$."
    },
    {
      "id": "check-falta",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Las probabilidades suman $1$."
        }
      ],
      "title": "Completar una distribución",
      "question": "$P(1) = 0{,}2$, $P(2) = 0{,}5$ y $P(3) = a$. ¿Cuánto vale $a$? (decimal)",
      "correctAnswers": [
        "0.3",
        "0,3",
        "3/10"
      ],
      "explanation": "$0{,}2 + 0{,}5 + a = 1 \\Rightarrow a = 0{,}3$."
    },
    {
      "id": "check-valida",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Suma las probabilidades."
        }
      ],
      "title": "¿Es una distribución?",
      "question": "¿Cuál de estas tablas **no** es una distribución de probabilidad?",
      "choices": [
        {
          "id": "a",
          "label": "$P = (0{,}2;\\ 0{,}3;\\ 0{,}4)$"
        },
        {
          "id": "b",
          "label": "$P = (0{,}5;\\ 0{,}25;\\ 0{,}25)$",
          "incorrectFeedback": "Suma $1$ y no hay negativos."
        },
        {
          "id": "c",
          "label": "$P = (0{,}1;\\ 0{,}9)$",
          "incorrectFeedback": "Suma $1$."
        },
        {
          "id": "d",
          "label": "$P = (\\tfrac14;\\ \\tfrac14;\\ \\tfrac12)$",
          "incorrectFeedback": "Suma $1$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$0{,}2 + 0{,}3 + 0{,}4 = 0{,}9 \\neq 1$."
    }
  ],
};
