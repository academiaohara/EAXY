import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_7_SUBTITLE } from "@/data/lessons/shared";

export const problemasBayesDiagnosticoCcss2Lesson: InteractiveLesson = {
  slug: "problemas-bayes-diagnostico-ccss2",
  title: "10. Problemas de Bayes: pruebas diagnósticas",
  subtitle: TEMA_CCSS2_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "prueba",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Un test que no es perfecto"
        }
      ],
      "title": "Un test que no es perfecto",
      "blocks": [
        {
          "kind": "text",
          "text": "Una enfermedad afecta al $1\\,\\%$ de la población. Un test da positivo en el $95\\,\\%$ de los enfermos (**sensibilidad**) y también en el $4\\,\\%$ de los sanos (**falsos positivos**). Si una persona da positivo, ¿cuál es la probabilidad de que esté enferma?"
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "P(+) = 0{,}01\\cdot0{,}95 + 0{,}99\\cdot0{,}04 = 0{,}0095 + 0{,}0396 = 0{,}0491"
            },
            {
              "math": "P(\\text{enfermo} \\mid +) = \\dfrac{0{,}0095}{0{,}0491} \\approx 0{,}193"
            }
          ]
        },
        {
          "kind": "text",
          "text": "Aunque el test parezca fiable, **solo cerca de un $19\\,\\%$ de los positivos están enfermos**, porque la enfermedad es poco frecuente y hay muchos sanos."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "arbol-tabla-explorador",
        "initial": [
          1,
          95,
          4
        ],
        "hint": "A = enfermo y B = positivo: P(A) = 1 %, P(B | A) = 95 % y P(B | no A) = 4 %. La tabla da P(B) = 4,91 % y el árbol desde B da P(A | B) = 19,35 %."
      }
    },
    {
      "id": "frecuencias",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Con frecuencias naturales"
        }
      ],
      "title": "Con frecuencias naturales",
      "blocks": [
        {
          "kind": "text",
          "text": "Imagina $10\\,000$ personas: $100$ enfermas y $9\\,900$ sanas. Dan positivo $95$ enfermas y $396$ sanas. En total hay $491$ positivos y solo $95$ están enfermos: $\\dfrac{95}{491} \\approx 0{,}193$."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "bayes-frecuencias"
      }
    },
    {
      "id": "check-pos",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Probabilidad total."
        }
      ],
      "title": "Probabilidad de positivo",
      "question": "¿Cuánto vale $P(+)$? (decimal)",
      "correctAnswers": [
        "0.0491",
        "0,0491"
      ],
      "explanation": "$0{,}0095 + 0{,}0396 = 0{,}0491$."
    },
    {
      "id": "check-bayes",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Camino por «enfermo» entre $P(+)$."
        }
      ],
      "title": "Enfermo dado positivo",
      "question": "¿Qué porcentaje de los positivos está realmente enfermo? (una cifra decimal)",
      "correctAnswers": [
        "19.3",
        "19,3"
      ],
      "explanation": "$\\dfrac{0{,}0095}{0{,}0491} = 0{,}1935 \\approx 19{,}3\\,\\%$."
    },
    {
      "id": "check-falsos",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$99\\,\\%$ de $10\\,000$ por $0{,}04$."
        }
      ],
      "title": "Falsos positivos",
      "question": "De $10\\,000$ personas, ¿cuántos sanos dan positivo? (solo el número)",
      "correctAnswers": [
        "396"
      ],
      "explanation": "$9\\,900\\cdot0{,}04 = 396$."
    },
    {
      "id": "check-conclusion",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Compara $95$ con $396$."
        }
      ],
      "title": "Interpretar",
      "question": "¿Por qué la probabilidad de estar enfermo tras un positivo es tan baja?",
      "choices": [
        {
          "id": "a",
          "label": "Porque la enfermedad es poco frecuente: hay muchos más sanos que enfermos"
        },
        {
          "id": "b",
          "label": "Porque el test no detecta a los enfermos",
          "incorrectFeedback": "Detecta al $95\\,\\%$ de los enfermos."
        },
        {
          "id": "c",
          "label": "Porque $P(+)$ es muy pequeña",
          "incorrectFeedback": "Es $0{,}0491$; no es lo que explica el resultado."
        },
        {
          "id": "d",
          "label": "Porque los falsos positivos no existen",
          "incorrectFeedback": "Son el $4\\,\\%$ de los sanos."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Un $4\\,\\%$ de falsos positivos sobre muchos sanos supera a los verdaderos positivos."
    }
  ],
};
