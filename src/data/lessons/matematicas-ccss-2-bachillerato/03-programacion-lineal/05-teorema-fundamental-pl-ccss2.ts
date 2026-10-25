import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_3_SUBTITLE } from "@/data/lessons/shared";

export const teoremaFundamentalPlCcss2Lesson: InteractiveLesson = {
  slug: "teorema-fundamental-pl-ccss2",
  title: "5. Teorema fundamental y método algebraico",
  subtitle: TEMA_CCSS2_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "teorema",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "El óptimo está en un vértice"
        }
      ],
      "title": "El óptimo está en un vértice",
      "blocks": [
        {
          "kind": "rule",
          "title": "Teorema fundamental",
          "text": "Si la región factible es un polígono **acotado**, la función objetivo $Z = ax + by$ alcanza su máximo y su mínimo en **vértices** de la región."
        },
        {
          "kind": "steps",
          "items": [
            "Calcula los vértices de la región factible.",
            "Sustituye cada vértice en $Z$.",
            "El mayor valor es el máximo y el menor, el mínimo."
          ]
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "Z = 30x + 20y:\\ \\ Z(0,0) = 0,\\ Z(4,0) = 120,\\ Z(2,4) = 140,\\ Z(0,6) = 120"
            },
            {
              "math": "\\max Z = 140 \\text{ en } (2, 4),\\qquad \\min Z = 0 \\text{ en } (0, 0)"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "programacion-lineal-explorador",
        "initial": [
          0,
          140
        ],
        "hint": "En la tabla de vértices, el mayor Z es 140 y se alcanza en (2, 4): es el punto rojo."
      }
    },
    {
      "id": "check-vertice",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye."
        }
      ],
      "title": "Valor en un vértice",
      "question": "¿Cuánto vale $Z = 30x + 20y$ en el vértice $(2, 4)$? (solo el número)",
      "correctAnswers": [
        "140"
      ],
      "explanation": "$60 + 80 = 140$."
    },
    {
      "id": "check-otro",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$20\\cdot6$."
        }
      ],
      "title": "Otro vértice",
      "question": "¿Cuánto vale $Z$ en $(0, 6)$? (solo el número)",
      "correctAnswers": [
        "120"
      ],
      "explanation": "$0 + 120 = 120$."
    },
    {
      "id": "check-min",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Mira todos los vértices."
        }
      ],
      "title": "El mínimo",
      "question": "¿Cuál es el valor mínimo de $Z$ en la región? (solo el número)",
      "correctAnswers": [
        "0"
      ],
      "explanation": "En el origen $Z = 0$: no se fabrica nada y no hay beneficio."
    },
    {
      "id": "check-donde",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en una función lineal sobre un segmento."
        }
      ],
      "title": "¿Dónde buscar?",
      "question": "Para encontrar el máximo de $Z$ en una región factible acotada, basta con evaluar $Z$ en…",
      "choices": [
        {
          "id": "a",
          "label": "los vértices de la región"
        },
        {
          "id": "b",
          "label": "el centro de la región",
          "incorrectFeedback": "El óptimo nunca está en el interior (salvo que $Z$ sea constante)."
        },
        {
          "id": "c",
          "label": "todos los puntos con coordenadas enteras",
          "incorrectFeedback": "No hace falta probar tantos puntos."
        },
        {
          "id": "d",
          "label": "un solo punto de cada lado",
          "incorrectFeedback": "El óptimo está en los extremos del lado, no en un punto cualquiera."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Es el teorema fundamental de la programación lineal."
    }
  ],
};
