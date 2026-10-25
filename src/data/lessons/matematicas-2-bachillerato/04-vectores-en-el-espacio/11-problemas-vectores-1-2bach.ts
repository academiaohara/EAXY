import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_4_SUBTITLE } from "@/data/lessons/shared";

export const problemasVectores12bachLesson: InteractiveLesson = {
  slug: "problemas-vectores-1-2bach",
  title: "11. Problemas con vectores: puntos y paralelogramos",
  subtitle: TEMA_2BACH_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "metodo",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Tres herramientas"
        }
      ],
      "title": "Tres herramientas",
      "blocks": [
        {
          "kind": "steps",
          "items": [
            "**Vector entre dos puntos:** extremo menos origen.",
            "**Paralelogramo $ABCD$:** $\\overrightarrow{AB} = \\overrightarrow{DC}$, de donde $D = A + C - B$.",
            "**Puntos alineados:** los vectores $\\overrightarrow{AB}$ y $\\overrightarrow{AC}$ son proporcionales."
          ]
        },
        {
          "kind": "text",
          "text": "El **baricentro** de un triángulo es la media de las coordenadas de los tres vértices."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "vectores-puntos-explorador",
        "initial": [
          1,
          2,
          3,
          2,
          0,
          1
        ],
        "hint": "Fíjate cómo se obtienen las componentes de AB y el punto medio."
      }
    },
    {
      "id": "check-D",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$D = A + (C - B)$."
        }
      ],
      "title": "Cuarto vértice",
      "question": "$A(1, 2, 3)$, $B(2, 0, 1)$ y $C(4, 1, 0)$ son vértices consecutivos de un paralelogramo $ABCD$. ¿Cuánto vale la tercera coordenada de $D$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$D = A + C - B = (3, 3, 2)$. Comprobación: $\\overrightarrow{AB} = (1, -2, -2) = \\overrightarrow{DC}$."
    },
    {
      "id": "check-bar",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Media de las terceras coordenadas."
        }
      ],
      "title": "Baricentro",
      "question": "Halla la tercera coordenada del baricentro del triángulo de vértices $(0,0,0)$, $(3,6,0)$ y $(3,0,9)$. (solo el número)",
      "correctAnswers": [
        "3"
      ],
      "explanation": "$G = (2, 2, 3)$: $\\dfrac{0 + 0 + 9}{3} = 3$."
    },
    {
      "id": "check-par",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Iguala los vectores opuestos del paralelogramo."
        }
      ],
      "title": "Dos puntos más el origen",
      "question": "El cuarto vértice $D$ de un paralelogramo $ABCD$ se obtiene con…",
      "choices": [
        {
          "id": "a",
          "label": "$D = A + C - B$"
        },
        {
          "id": "b",
          "label": "$D = A + B + C$",
          "incorrectFeedback": "Eso daría un punto sin relación con el paralelogramo."
        },
        {
          "id": "c",
          "label": "$D = B + C - A$",
          "incorrectFeedback": "Ese es el vértice opuesto a $A$ en otro paralelogramo (ABDC)."
        },
        {
          "id": "d",
          "label": "$D = A - B - C$",
          "incorrectFeedback": "No cumple $\\overrightarrow{AB} = \\overrightarrow{DC}$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$\\\\overrightarrow{AB} = \\\\overrightarrow{DC}$ da $B - A = C - D$, es decir, $D = A + C - B$."
    },
    {
      "id": "check-alin",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Calcula la razón con la primera componente."
        }
      ],
      "title": "Puntos alineados",
      "question": "¿Qué valor de $m$ hace que $A(1,1,1)$, $B(2,3,5)$ y $C(4,7,m)$ estén alineados? (solo el número)",
      "correctAnswers": [
        "13"
      ],
      "explanation": "$\\overrightarrow{AB} = (1, 2, 4)$ y $\\overrightarrow{AC} = (3, 6, m - 1)$ deben ser proporcionales: razón $3$, así que $m - 1 = 12$ y $m = 13$."
    }
  ],
};
