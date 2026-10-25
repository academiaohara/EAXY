import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_7_SUBTITLE } from "@/data/lessons/shared";

export const arbolesTablasCcss2Lesson: InteractiveLesson = {
  slug: "arboles-tablas-ccss2",
  title: "6. Diagramas de árbol y tablas de contingencia",
  subtitle: TEMA_CCSS2_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "arbol",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "El árbol: multiplicar y sumar"
        }
      ],
      "title": "El árbol: multiplicar y sumar",
      "blocks": [
        {
          "kind": "steps",
          "items": [
            "Cada **rama** lleva su probabilidad (condicionada a lo anterior).",
            "Para un camino completo se **multiplican** las probabilidades de sus ramas.",
            "Si un suceso se logra por varios caminos, se **suman** los resultados de cada camino."
          ]
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "arbol-urna",
        "params": {
          "nums": [
            3,
            2,
            0
          ]
        }
      }
    },
    {
      "id": "tabla",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "La tabla de contingencia"
        }
      ],
      "title": "La tabla de contingencia",
      "blocks": [
        {
          "kind": "text",
          "text": "Una tabla $2\\times2$ recoge los casos de $A$, $A^c$, $B$, $B^c$ y sus intersecciones. Con ella se leen directamente las probabilidades marginales, de intersección y condicionadas."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\text{200 alumnos: gafas y chica } 40,\\ \\text{gafas y chico } 30,\\ \\text{sin gafas y chica } 70,\\ \\text{sin gafas y chico } 60"
            },
            {
              "math": "P(\\text{gafas}) = \\dfrac{70}{200} = 0{,}35,\\quad P(\\text{chica} \\mid \\text{gafas}) = \\dfrac{40}{70} = \\dfrac47"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "arbol-tabla-explorador",
        "initial": [
          30,
          50,
          80
        ],
        "hint": "Cambia las tres probabilidades del árbol: se rellena la tabla y se obtiene el árbol que empieza en B."
      }
    },
    {
      "id": "check-gafas",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Suma la columna de las chicas."
        }
      ],
      "title": "Marginal",
      "question": "En la tabla de $200$ alumnos, ¿cuál es $P(\\text{chica})$? (decimal)",
      "correctAnswers": [
        "0.55",
        "0,55",
        "11/20"
      ],
      "explanation": "Chicas $= 40 + 70 = 110$; $\\dfrac{110}{200} = 0{,}55$."
    },
    {
      "id": "check-cond",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Restringe la tabla a los chicos."
        }
      ],
      "title": "Condicionada en la tabla",
      "question": "¿Cuál es $P(\\text{gafas} \\mid \\text{chico})$? (fracción o decimal)",
      "correctAnswers": [
        "30/90",
        "1/3",
        "0.3333",
        "0,3333",
        "0.333",
        "0,333"
      ],
      "explanation": "Chicos $= 30 + 60 = 90$; con gafas $30$: $\\dfrac{30}{90} = \\dfrac13$."
    },
    {
      "id": "check-arbol",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Suma las dos ramas que llevan a $B$."
        }
      ],
      "title": "Probabilidad de B",
      "question": "Del árbol con $P(A) = 0{,}3$, $P(B \\mid A) = 0{,}5$ y $P(B \\mid A^c) = 0{,}8$, calcula $P(B)$. (decimal)",
      "correctAnswers": [
        "0.71",
        "0,71"
      ],
      "explanation": "$0{,}3\\cdot 0{,}5 + 0{,}7\\cdot 0{,}8 = 0{,}15 + 0{,}56 = 0{,}71$."
    },
    {
      "id": "check-ind",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Compara los dos números."
        }
      ],
      "title": "¿Independientes?",
      "question": "En la tabla de alumnos, $P(\\text{chica})\\,P(\\text{gafas}) = 0{,}1925$ y $P(\\text{chica y gafas}) = 0{,}2$. Entonces…",
      "choices": [
        {
          "id": "a",
          "label": "ser chica y llevar gafas son sucesos dependientes"
        },
        {
          "id": "b",
          "label": "son independientes",
          "incorrectFeedback": "Los productos no coinciden."
        },
        {
          "id": "c",
          "label": "son incompatibles",
          "incorrectFeedback": "Hay $40$ chicas con gafas: la intersección no es vacía."
        },
        {
          "id": "d",
          "label": "son el mismo suceso",
          "incorrectFeedback": "Tienen distinta probabilidad."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$P(A \\cap B) \\neq P(A)P(B)$."
    }
  ],
};
