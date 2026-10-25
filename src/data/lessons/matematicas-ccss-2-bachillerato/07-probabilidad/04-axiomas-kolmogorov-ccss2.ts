import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_7_SUBTITLE } from "@/data/lessons/shared";

export const axiomasKolmogorovCcss2Lesson: InteractiveLesson = {
  slug: "axiomas-kolmogorov-ccss2",
  title: "4. Axiomas de Kolmogorov y propiedades",
  subtitle: TEMA_CCSS2_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "axiomas",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Los axiomas"
        }
      ],
      "title": "Los axiomas",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "P(A) \\geq 0",
              "label": "la probabilidad nunca es negativa"
            },
            {
              "tex": "P(E) = 1",
              "label": "el suceso seguro tiene probabilidad $1$"
            },
            {
              "tex": "A \\cap B = \\varnothing \\Rightarrow P(A \\cup B) = P(A) + P(B)",
              "label": "aditividad para incompatibles"
            }
          ]
        },
        {
          "kind": "text",
          "text": "De ellos se deducen las propiedades de uso diario:"
        },
        {
          "kind": "facts",
          "items": [
            {
              "tex": "P(A^c) = 1 - P(A)",
              "label": "contrario"
            },
            {
              "tex": "P(\\varnothing) = 0",
              "label": "imposible"
            },
            {
              "tex": "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)",
              "label": "unión, en general"
            },
            {
              "tex": "A \\subset B \\Rightarrow P(A) \\leq P(B)",
              "label": "monotonía"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "prob-union-explorador",
        "initial": [
          40,
          25,
          10
        ],
        "hint": "Las columnas A y no A suman siempre 100 %. Mueve P(A ∩ B): cuanto más se solapan, menor es P(A ∪ B)."
      }
    },
    {
      "id": "check-union",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Resta la intersección una vez."
        }
      ],
      "title": "Probabilidad de la unión",
      "question": "$P(A) = 0{,}4$, $P(B) = 0{,}25$ y $P(A \\cap B) = 0{,}1$. ¿Cuánto vale $P(A \\cup B)$? (decimal)",
      "correctAnswers": [
        "0.55",
        "0,55",
        "11/20"
      ],
      "explanation": "$0{,}4 + 0{,}25 - 0{,}1 = 0{,}55$."
    },
    {
      "id": "check-nada",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Es el contrario de la unión."
        }
      ],
      "title": "Ninguno de los dos",
      "question": "Con esos mismos datos, ¿cuánto vale $P(A^c \\cap B^c)$? (decimal)",
      "correctAnswers": [
        "0.45",
        "0,45",
        "9/20"
      ],
      "explanation": "Por De Morgan, $P(A^c \\cap B^c) = 1 - P(A \\cup B) = 1 - 0{,}55 = 0{,}45$."
    },
    {
      "id": "check-contrario",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Resta de $1$."
        }
      ],
      "title": "Contrario",
      "question": "Si $P(A) = \\dfrac{3}{8}$, ¿cuánto vale $P(A^c)$? (fracción o decimal)",
      "correctAnswers": [
        "5/8",
        "0.625",
        "0,625"
      ],
      "explanation": "$1 - \\dfrac38 = \\dfrac58$."
    },
    {
      "id": "check-mal",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Suma las dos probabilidades."
        }
      ],
      "title": "Detecta el error",
      "question": "¿Cuál de estas asignaciones **no** puede ser una probabilidad?",
      "choices": [
        {
          "id": "a",
          "label": "$P(A) = 0{,}7$ y $P(A^c) = 0{,}5$"
        },
        {
          "id": "b",
          "label": "$P(A) = 0$",
          "incorrectFeedback": "Es el suceso imposible o casi imposible: permitido."
        },
        {
          "id": "c",
          "label": "$P(A) = 1$",
          "incorrectFeedback": "Es el suceso seguro o casi seguro: permitido."
        },
        {
          "id": "d",
          "label": "$P(A) = 0{,}3$ y $P(A^c) = 0{,}7$",
          "incorrectFeedback": "Suman $1$: correcto."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$P(A) + P(A^c)$ debe valer $1$."
    }
  ],
};
