import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_3_SUBTITLE } from "@/data/lessons/shared";

export const problemaProduccionCcss2Lesson: InteractiveLesson = {
  slug: "problema-produccion-ccss2",
  title: "8. Problema de producción",
  subtitle: TEMA_CCSS2_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "enunciado",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Dos productos y tres recursos"
        }
      ],
      "title": "Dos productos y tres recursos",
      "blocks": [
        {
          "kind": "text",
          "text": "Una empresa fabrica dos productos, $A$ ($x$ unidades) y $B$ ($y$ unidades). Cada unidad de $A$ da $5$ € de beneficio y cada una de $B$, $4$ €. Condiciones:"
        },
        {
          "kind": "steps",
          "items": [
            "Materia prima: $6x + 4y \\leq 24$.",
            "Horas de trabajo: $x + 2y \\leq 6$.",
            "Demanda: $B$ no supera en más de $1$ a $A$: $-x + y \\leq 1$.",
            "Almacén: $y \\leq 2$."
          ]
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "Z = 5x + 4y\\ \\ (\\max)"
            },
            {
              "math": "\\text{Vértices: } (0,0),\\ (4,0),\\ \\left(3, \\tfrac32\\right),\\ (2,2),\\ (1,2),\\ (0,1)"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "programacion-lineal-explorador",
        "initial": [
          6,
          21
        ],
        "hint": "El máximo, 21, se alcanza en el vértice (3; 1,5). Los vértices (2, 2) y (1, 2) dan 18 y 13."
      }
    },
    {
      "id": "check-max",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Compara el valor en todos los vértices."
        }
      ],
      "title": "Beneficio máximo",
      "question": "¿Cuál es el beneficio máximo? (€, solo el número)",
      "correctAnswers": [
        "21"
      ],
      "explanation": "$Z\\left(3, \\tfrac32\\right) = 15 + 6 = 21$."
    },
    {
      "id": "check-x",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Resuelve $6x + 4y = 24$ con $x + 2y = 6$."
        }
      ],
      "title": "Producción óptima de A",
      "question": "¿Cuántas unidades de $A$ se deben fabricar? (solo el número)",
      "correctAnswers": [
        "3"
      ],
      "explanation": "El vértice óptimo es $\\left(3, \\tfrac32\\right)$."
    },
    {
      "id": "check-y",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $x = 3$ en $x + 2y = 6$."
        }
      ],
      "title": "Producción óptima de B",
      "question": "¿Cuántas unidades de $B$? (decimal)",
      "correctAnswers": [
        "1.5",
        "1,5",
        "3/2"
      ],
      "explanation": "$y = \\dfrac{6 - 3}{2} = 1{,}5$."
    },
    {
      "id": "check-22",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Evalúa $Z$."
        }
      ],
      "title": "Otro vértice",
      "question": "¿Qué beneficio da fabricar $x = 2$ e $y = 2$? (solo el número)",
      "correctAnswers": [
        "18"
      ],
      "explanation": "$10 + 8 = 18 < 21$."
    },
    {
      "id": "check-ent",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en $(3, 1)$ y $(3, 2)$."
        }
      ],
      "title": "¿Y si hace falta un número entero?",
      "question": "El óptimo $y = 1{,}5$ no es entero. Si las unidades fueran indivisibles, el problema…",
      "choices": [
        {
          "id": "a",
          "label": "ya no sería de programación lineal ordinaria (requeriría programación entera)"
        },
        {
          "id": "b",
          "label": "sigue resolviéndose igual con los vértices",
          "incorrectFeedback": "El óptimo entero puede no estar en un vértice."
        },
        {
          "id": "c",
          "label": "no tendría solución",
          "incorrectFeedback": "Tiene solución, pero hay que buscarla de otra forma."
        },
        {
          "id": "d",
          "label": "se resuelve redondeando siempre hacia arriba",
          "incorrectFeedback": "Redondear puede violar una restricción."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "En el nivel de este curso se asume que las variables pueden ser decimales."
    }
  ],
};
