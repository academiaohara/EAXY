import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_4_SUBTITLE } from "@/data/lessons/shared";

export const problemasVectores22bachLesson: InteractiveLesson = {
  slug: "problemas-vectores-2-2bach",
  title: "12. Problemas con vectores: áreas, volúmenes y perpendicularidad",
  subtitle: TEMA_2BACH_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "estrategia",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Qué producto uso"
        }
      ],
      "title": "Qué producto uso",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "\\vec{u}\\cdot\\vec{v}",
              "label": "ángulo, perpendicularidad, proyección"
            },
            {
              "tex": "\\vec{u}\\times\\vec{v}",
              "label": "área, vector perpendicular a un plano"
            },
            {
              "tex": "[\\vec{u},\\vec{v},\\vec{w}]",
              "label": "volumen, coplanaridad"
            }
          ]
        },
        {
          "kind": "text",
          "text": "Elegir el producto adecuado resuelve la mitad del problema. Después, todo son cálculos con determinantes."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "producto-vectorial-explorador",
        "initial": [
          2,
          0,
          1,
          0,
          3,
          2
        ],
        "hint": "Triángulo A(1,2,0), B(3,2,1), C(1,5,2): AB = (2,0,1), AC = (0,3,2)."
      }
    },
    {
      "id": "check-cuadrado",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Suma los cuadrados."
        }
      ],
      "title": "Área de un triángulo",
      "question": "Con $A(1,2,0)$, $B(3,2,1)$ y $C(1,5,2)$ se tiene $\\overrightarrow{AB}\\times\\overrightarrow{AC} = (-3, -4, 6)$. ¿Cuánto vale $|\\overrightarrow{AB}\\times\\overrightarrow{AC}|^2$? (solo el número)",
      "correctAnswers": [
        "61"
      ],
      "explanation": "$9 + 16 + 36 = 61$, y el área del triángulo es $\\dfrac{\\sqrt{61}}{2}$."
    },
    {
      "id": "check-uni",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Producto escalar $0$."
        }
      ],
      "title": "Ángulo recto",
      "question": "¿Qué valor de $a$ hace que $(1, a, 1)$ sea perpendicular a $(2, 1, -3)$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$2 + a - 3 = 0 \\Rightarrow a = 1$."
    },
    {
      "id": "check-vol",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\tfrac16$ del producto mixto."
        }
      ],
      "title": "Volumen de un tetraedro",
      "question": "Un tetraedro tiene $\\overrightarrow{AB} = (2, 0, 0)$, $\\overrightarrow{AC} = (0, 3, 0)$ y $\\overrightarrow{AD} = (0, 0, 5)$. ¿Cuánto vale su volumen? (solo el número)",
      "correctAnswers": [
        "5"
      ],
      "explanation": "$\\tfrac16\\cdot 30 = 5$."
    },
    {
      "id": "check-prod",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "El volumen del tetraedro debe ser $0$."
        }
      ],
      "title": "¿Qué producto?",
      "question": "Para saber si cuatro puntos del espacio están en un mismo plano se usa…",
      "choices": [
        {
          "id": "a",
          "label": "el producto mixto de tres vectores que parten de uno de ellos"
        },
        {
          "id": "b",
          "label": "el producto escalar de dos vectores",
          "incorrectFeedback": "Solo informa de ángulos."
        },
        {
          "id": "c",
          "label": "el módulo de un vector",
          "incorrectFeedback": "No sirve para coplanaridad."
        },
        {
          "id": "d",
          "label": "el producto vectorial de dos vectores",
          "incorrectFeedback": "Da un vector perpendicular, pero no decide con un tercero."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Si $[\\overrightarrow{AB}, \\overrightarrow{AC}, \\overrightarrow{AD}] = 0$, los cuatro puntos son coplanares."
    }
  ],
};
