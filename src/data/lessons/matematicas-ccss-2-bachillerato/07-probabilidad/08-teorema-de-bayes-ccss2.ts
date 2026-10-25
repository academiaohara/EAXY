import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_7_SUBTITLE } from "@/data/lessons/shared";

export const teoremaDeBayesCcss2Lesson: InteractiveLesson = {
  slug: "teorema-de-bayes-ccss2",
  title: "8. Teorema de Bayes",
  subtitle: TEMA_CCSS2_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "bayes",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Dar la vuelta a la condicional"
        }
      ],
      "title": "Dar la vuelta a la condicional",
      "blocks": [
        {
          "kind": "rule",
          "title": "Bayes",
          "text": "Conocidas $P(A_i)$ y $P(B \\mid A_i)$, se obtiene la probabilidad «a posteriori»:",
          "formula": "P(A_j \\mid B) = \\dfrac{P(A_j)\\,P(B \\mid A_j)}{\\displaystyle\\sum_i P(A_i)\\,P(B \\mid A_i)}"
        },
        {
          "kind": "text",
          "text": "El denominador es $P(B)$, la probabilidad total. En la práctica basta con **dividir el camino que nos interesa entre la suma de todos los caminos que llevan a $B$**."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "bayes-frecuencias"
      }
    },
    {
      "id": "moviles",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Un detector que se equivoca"
        }
      ],
      "title": "Un detector que se equivoca",
      "blocks": [
        {
          "kind": "text",
          "text": "El $2\\,\\%$ de los móviles es defectuoso. El detector marca como defectuoso al $90\\,\\%$ de los defectuosos y al $1\\,\\%$ de los correctos."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "P(\\text{marca}) = 0{,}02\\cdot0{,}9 + 0{,}98\\cdot0{,}01 = 0{,}0278"
            },
            {
              "math": "P(\\text{defectuoso} \\mid \\text{marca}) = \\dfrac{0{,}018}{0{,}0278} \\approx 0{,}647"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "prob-total-explorador",
        "initial": [
          2,
          0
        ],
        "hint": "Móviles defectuosos: a pesar de un detector fiable, solo el 64,7 % de los marcados son realmente defectuosos."
      }
    },
    {
      "id": "check-urna",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Camino por B entre la probabilidad total."
        }
      ],
      "title": "Urnas",
      "question": "Urna A: $2$ negras de $10$. Urna B: $6$ negras de $10$. La bola extraída es negra; ¿cuánto vale $P(\\text{urna B} \\mid \\text{negra})$? (decimal)",
      "correctAnswers": [
        "0.75",
        "0,75",
        "3/4"
      ],
      "explanation": "$\\dfrac{0{,}5\\cdot 0{,}6}{0{,}4} = \\dfrac{0{,}3}{0{,}4} = \\dfrac34$."
    },
    {
      "id": "check-pct",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Divide $0{,}018$ entre $0{,}0278$."
        }
      ],
      "title": "Móviles",
      "question": "Con los datos del detector, ¿qué porcentaje de móviles marcados son defectuosos? (redondea a una cifra decimal)",
      "correctAnswers": [
        "64.7",
        "64,7"
      ],
      "explanation": "$\\dfrac{0{,}018}{0{,}0278} = 0{,}6475 \\approx 64{,}7\\,\\%$."
    },
    {
      "id": "check-sastre",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Camino por A entre $0{,}0665$."
        }
      ],
      "title": "Sastre A",
      "question": "Con los sastres de la lección anterior, ¿qué porcentaje de los arreglos fallidos son de A? (redondea a una cifra decimal)",
      "correctAnswers": [
        "41.4",
        "41,4"
      ],
      "explanation": "$\\dfrac{0{,}0275}{0{,}0665} = 0{,}4135 \\approx 41{,}4\\,\\%$."
    },
    {
      "id": "check-no",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en el ejemplo del detector."
        }
      ],
      "title": "Cuidado con el orden",
      "question": "¿Cuál de estas igualdades es **falsa** en general?",
      "choices": [
        {
          "id": "a",
          "label": "$P(A \\mid B) = P(B \\mid A)$"
        },
        {
          "id": "b",
          "label": "$P(A \\cap B) = P(A)P(B \\mid A)$",
          "incorrectFeedback": "Es la regla del producto."
        },
        {
          "id": "c",
          "label": "$P(A \\mid B) = \\dfrac{P(A \\cap B)}{P(B)}$",
          "incorrectFeedback": "Es la definición."
        },
        {
          "id": "d",
          "label": "$P(B \\mid A)P(A) = P(A \\mid B)P(B)$",
          "incorrectFeedback": "Ambos lados valen $P(A \\cap B)$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Casi nunca coinciden: la probabilidad de dar positivo estando enfermo no es la de estar enfermo dando positivo."
    }
  ],
};
