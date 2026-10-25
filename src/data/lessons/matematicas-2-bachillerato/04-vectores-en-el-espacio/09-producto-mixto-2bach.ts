import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_4_SUBTITLE } from "@/data/lessons/shared";

export const productoMixto2bachLesson: InteractiveLesson = {
  slug: "producto-mixto-2bach",
  title: "9. Producto mixto",
  subtitle: TEMA_2BACH_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "definicion",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Escalar por vectorial"
        }
      ],
      "title": "Escalar por vectorial",
      "blocks": [
        {
          "kind": "definition",
          "text": "El **producto mixto** de tres vectores es el número $[\\vec{u}, \\vec{v}, \\vec{w}] = \\vec{u}\\cdot(\\vec{v}\\times\\vec{w})$."
        },
        {
          "kind": "rule",
          "title": "Cálculo",
          "text": "Es el determinante de las componentes (por filas):",
          "formula": "[\\vec{u}, \\vec{v}, \\vec{w}] = \\begin{vmatrix} u_1 & u_2 & u_3 \\\\ v_1 & v_2 & v_3 \\\\ w_1 & w_2 & w_3 \\end{vmatrix}"
        },
        {
          "kind": "text",
          "text": "Si cambia el orden de dos vectores, cambia el signo. Vale $0$ si los tres son **coplanares**."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "producto-mixto-explorador",
        "initial": [
          3,
          0,
          0,
          1,
          3,
          0,
          1,
          1,
          3
        ],
        "hint": "Mueve los vectores: el valor absoluto del producto mixto es el volumen del paralelepípedo."
      }
    },
    {
      "id": "check-mix",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Desarrolla por la primera fila."
        }
      ],
      "title": "Un producto mixto",
      "question": "Calcula $[(1,2,3),\\ (0,1,4),\\ (5,6,0)]$. (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$\\begin{vmatrix} 1 & 2 & 3 \\\\ 0 & 1 & 4 \\\\ 5 & 6 & 0 \\end{vmatrix} = 1(0 - 24) - 2(0 - 20) + 3(0 - 5) = -24 + 40 - 15 = 1$."
    },
    {
      "id": "check-diag",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Producto de la diagonal."
        }
      ],
      "title": "Vectores de los ejes",
      "question": "Calcula $[(1,0,0),\\ (0,2,0),\\ (0,0,3)]$. (solo el número)",
      "correctAnswers": [
        "6"
      ],
      "explanation": "Es una matriz diagonal: $1\\cdot 2\\cdot 3 = 6$."
    },
    {
      "id": "check-copl",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Plantea el determinante igual a $0$."
        }
      ],
      "title": "Coplanares",
      "question": "¿Qué valor de $m$ hace coplanares a $(1, 0, 1)$, $(0, 1, 1)$ y $(1, 1, m)$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "El determinante es $m - 2$ (desarrollo por la primera fila): $1\\cdot(m - 1) - 0 + 1\\cdot(0 - 1) = m - 2$. Se anula para $m = 2$."
    },
    {
      "id": "check-orden",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Propiedades de los determinantes."
        }
      ],
      "title": "Cambio de orden",
      "question": "Si $[\\vec{u}, \\vec{v}, \\vec{w}] = 5$, ¿cuánto vale $[\\vec{v}, \\vec{u}, \\vec{w}]$?",
      "choices": [
        {
          "id": "a",
          "label": "$-5$"
        },
        {
          "id": "b",
          "label": "$5$",
          "incorrectFeedback": "Al intercambiar dos filas el determinante cambia de signo."
        },
        {
          "id": "c",
          "label": "$0$",
          "incorrectFeedback": "Solo valdría $0$ si fueran coplanares."
        },
        {
          "id": "d",
          "label": "$\\tfrac15$",
          "incorrectFeedback": "No es el inverso."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Se intercambian dos filas: el signo cambia."
    }
  ],
};
