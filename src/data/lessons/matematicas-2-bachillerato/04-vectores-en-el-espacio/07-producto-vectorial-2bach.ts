import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_4_SUBTITLE } from "@/data/lessons/shared";

export const productoVectorial2bachLesson: InteractiveLesson = {
  slug: "producto-vectorial-2bach",
  title: "7. Producto vectorial: definición y cálculo",
  subtitle: TEMA_2BACH_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "definicion",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Un vector perpendicular a los dos"
        }
      ],
      "title": "Un vector perpendicular a los dos",
      "blocks": [
        {
          "kind": "definition",
          "text": "El **producto vectorial** $\\vec{u}\\times\\vec{v}$ es un vector con: dirección **perpendicular** a $\\vec{u}$ y $\\vec{v}$; sentido dado por la regla de la mano derecha; y módulo $|\\vec{u}||\\vec{v}|\\sin\\alpha$."
        },
        {
          "kind": "rule",
          "title": "Cálculo",
          "text": "Con determinantes (con $\\vec{i}, \\vec{j}, \\vec{k}$ en la primera fila):",
          "formula": "\\vec{u}\\times\\vec{v} = \\begin{vmatrix} \\vec{i} & \\vec{j} & \\vec{k} \\\\ u_1 & u_2 & u_3 \\\\ v_1 & v_2 & v_3 \\end{vmatrix}"
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "producto-vectorial-3d",
        "params": {
          "nums": [
            3,
            0,
            0,
            1,
            3,
            0
          ]
        }
      }
    },
    {
      "id": "check-cruz",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "La segunda lleva signo cambiado: $-(u_1v_3 - u_3v_1)$."
        }
      ],
      "title": "Calcular uno",
      "question": "Si $\\vec{u} = (1, 2, 3)$ y $\\vec{v} = (1, 1, 1)$, ¿cuánto vale la segunda componente de $\\vec{u}\\times\\vec{v}$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$\\vec{u}\\times\\vec{v} = (2 - 3,\\ 3 - 1,\\ 1 - 2) = (-1, 2, -1)$."
    },
    {
      "id": "check-ij",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$u_1v_2 - u_2v_1$."
        }
      ],
      "title": "Los vectores de la base",
      "question": "Si $\\vec{u} = (2, 0, 0)$ y $\\vec{v} = (0, 3, 0)$, ¿cuánto vale la tercera componente de $\\vec{u}\\times\\vec{v}$? (solo el número)",
      "correctAnswers": [
        "6"
      ],
      "explanation": "$\\vec{u}\\times\\vec{v} = (0, 0, 6)$: $2\\cdot 3 - 0 = 6$."
    },
    {
      "id": "propiedades",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Propiedades"
        }
      ],
      "title": "Propiedades",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "\\vec{u}\\times\\vec{v} = -\\,\\vec{v}\\times\\vec{u}",
              "label": "anticonmutativo"
            },
            {
              "tex": "\\vec{u}\\times\\vec{v} = \\vec{0} \\iff \\vec{u}\\parallel\\vec{v}",
              "label": "paralelos"
            },
            {
              "tex": "(\\vec{u}\\times\\vec{v})\\cdot\\vec{u} = 0",
              "label": "perpendicular a u y a v"
            }
          ]
        },
        {
          "kind": "warning",
          "text": "El producto vectorial **no es conmutativo**: cambiar el orden cambia el sentido del vector resultante."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "producto-vectorial-explorador",
        "initial": [
          1,
          2,
          3,
          1,
          1,
          1
        ],
        "hint": "Comprueba que (u×v)·u y (u×v)·v valen 0. Pon dos vectores proporcionales: el producto es el vector nulo."
      }
    },
    {
      "id": "check-anti",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en la regla de la mano derecha."
        }
      ],
      "title": "Cambiar el orden",
      "question": "Si $\\vec{u}\\times\\vec{v} = (1, -2, 1)$, entonces $\\vec{v}\\times\\vec{u}$ es…",
      "choices": [
        {
          "id": "a",
          "label": "$(-1, 2, -1)$"
        },
        {
          "id": "b",
          "label": "$(1, -2, 1)$",
          "incorrectFeedback": "Cambiar el orden invierte el sentido."
        },
        {
          "id": "c",
          "label": "$(0, 0, 0)$",
          "incorrectFeedback": "Solo vale $\\vec{0}$ si son paralelos."
        },
        {
          "id": "d",
          "label": "$(1, 2, 1)$",
          "incorrectFeedback": "Se cambian los signos de todas las componentes."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Es anticonmutativo: $\\vec{v}\\times\\vec{u} = -\\vec{u}\\times\\vec{v}$."
    }
  ],
};
