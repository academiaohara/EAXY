import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_3_SUBTITLE } from "@/data/lessons/shared";

export const problemaDietasCcss2Lesson: InteractiveLesson = {
  slug: "problema-dietas-ccss2",
  title: "9. Problema de dietas",
  subtitle: TEMA_CCSS2_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "enunciado",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Cubrir mínimos al menor coste"
        }
      ],
      "title": "Cubrir mínimos al menor coste",
      "blocks": [
        {
          "kind": "text",
          "text": "Una dieta debe aportar **al menos** $8$ unidades de proteínas y $10$ de calcio. Cada ración de alimento $X$ aporta $2$ de proteínas y $1$ de calcio y cuesta $3$ €; cada ración de $Y$ aporta $1$ y $2$ y cuesta $2$ €."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "Z = 3x + 2y\\ \\ (\\min)"
            },
            {
              "math": "2x + y \\geq 8,\\quad x + 2y \\geq 10,\\quad x, y \\geq 0"
            },
            {
              "math": "\\text{Vértices: } (0, 8),\\ (2, 4),\\ (10, 0)"
            },
            {
              "math": "Z(0,8) = 16,\\quad Z(2,4) = 14,\\quad Z(10,0) = 30"
            }
          ]
        },
        {
          "kind": "text",
          "text": "Las restricciones con $\\geq$ dan una región **no acotada**, pero al minimizar un coste positivo sí existe mínimo: $14$ € con $2$ raciones de $X$ y $4$ de $Y$."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "programacion-lineal-explorador",
        "initial": [
          1,
          14
        ],
        "hint": "Mínimo: Z = 14 en (2, 4). La recta de nivel Z = 14 apenas toca la región."
      }
    },
    {
      "id": "check-min",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Compara los tres vértices."
        }
      ],
      "title": "Coste mínimo",
      "question": "¿Cuál es el coste mínimo de la dieta? (€, solo el número)",
      "correctAnswers": [
        "14"
      ],
      "explanation": "$Z(2, 4) = 6 + 8 = 14$."
    },
    {
      "id": "check-x",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Resta o sustituye."
        }
      ],
      "title": "Raciones de X",
      "question": "¿Cuántas raciones de $X$ tiene la dieta de coste mínimo? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "Resolviendo $2x + y = 8$, $x + 2y = 10$: $x = 2$, $y = 4$."
    },
    {
      "id": "check-v",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$Z = 3\\cdot0 + 2\\cdot8$."
        }
      ],
      "title": "Un vértice",
      "question": "¿Cuánto cuesta la dieta formada solo por $8$ raciones de $Y$ (vértice $(0, 8)$)? (€, solo el número)",
      "correctAnswers": [
        "16"
      ],
      "explanation": "$2\\cdot8 = 16$."
    },
    {
      "id": "check-sentido",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en Z decreciente."
        }
      ],
      "title": "Sentido del desplazamiento",
      "question": "En un problema de dietas, para minimizar el coste, la recta de nivel se desplaza…",
      "choices": [
        {
          "id": "a",
          "label": "hacia el origen hasta el último punto de contacto con la región"
        },
        {
          "id": "b",
          "label": "alejándose del origen hasta el infinito",
          "incorrectFeedback": "Eso aumenta el coste."
        },
        {
          "id": "c",
          "label": "paralela al eje $X$",
          "incorrectFeedback": "Las rectas de nivel tienen la pendiente de $Z$."
        },
        {
          "id": "d",
          "label": "hasta cortar el eje $Y$ únicamente",
          "incorrectFeedback": "El óptimo puede estar en cualquier vértice."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Se baja el coste hasta tocar el último punto de la región."
    }
  ],
};
