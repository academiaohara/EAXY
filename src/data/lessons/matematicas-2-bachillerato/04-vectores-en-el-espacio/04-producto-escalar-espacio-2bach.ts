import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_4_SUBTITLE } from "@/data/lessons/shared";

export const productoEscalarEspacio2bachLesson: InteractiveLesson = {
  slug: "producto-escalar-espacio-2bach",
  title: "4. Producto escalar: definición y expresión analítica",
  subtitle: TEMA_2BACH_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "definicion",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "El producto escalar es un número"
        }
      ],
      "title": "El producto escalar es un número",
      "blocks": [
        {
          "kind": "rule",
          "text": "Si $\\alpha$ es el ángulo entre $\\vec{u}$ y $\\vec{v}$:",
          "formula": "\\vec{u}\\cdot\\vec{v} = |\\vec{u}|\\,|\\vec{v}|\\cos\\alpha"
        },
        {
          "kind": "rule",
          "title": "Expresión analítica",
          "text": "Con componentes (base ortonormal):",
          "formula": "\\vec{u}\\cdot\\vec{v} = u_1v_1 + u_2v_2 + u_3v_3"
        },
        {
          "kind": "text",
          "text": "Geométricamente: módulo de $\\vec{u}$ por la **proyección** de $\\vec{v}$ sobre $\\vec{u}$."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "producto-escalar-proyeccion",
        "params": {
          "a": 50
        }
      }
    },
    {
      "id": "check-analitica",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Suma de productos."
        }
      ],
      "title": "Con componentes",
      "question": "Calcula $(2, -1, 3)\\cdot(1, 4, 2)$. (solo el número)",
      "correctAnswers": [
        "4"
      ],
      "explanation": "$2\\cdot 1 + (-1)\\cdot 4 + 3\\cdot 2 = 2 - 4 + 6 = 4$."
    },
    {
      "id": "check-geom",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\cos 60^\\circ = 1/2$."
        }
      ],
      "title": "Con módulos y ángulo",
      "question": "Si $|\\vec{u}| = 3$, $|\\vec{v}| = 4$ y el ángulo entre ellos es $60^\\circ$, ¿cuánto vale $\\vec{u}\\cdot\\vec{v}$? (solo el número)",
      "correctAnswers": [
        "6"
      ],
      "explanation": "$3\\cdot 4\\cdot\\cos 60^\\circ = 12\\cdot\\tfrac12 = 6$."
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
              "tex": "\\vec{u}\\cdot\\vec{v} = \\vec{v}\\cdot\\vec{u}",
              "label": "conmutativa"
            },
            {
              "tex": "\\vec{u}\\cdot(\\vec{v} + \\vec{w}) = \\vec{u}\\cdot\\vec{v} + \\vec{u}\\cdot\\vec{w}",
              "label": "distributiva"
            },
            {
              "tex": "\\vec{u}\\cdot\\vec{u} = |\\vec{u}|^2",
              "label": "el módulo al cuadrado"
            },
            {
              "tex": "\\vec{u}\\perp\\vec{v} \\iff \\vec{u}\\cdot\\vec{v} = 0",
              "label": "perpendiculares"
            }
          ]
        },
        {
          "kind": "warning",
          "text": "El producto escalar de dos vectores es un **número**, no un vector, y no se puede «dividir»: de $\\vec{u}\\cdot\\vec{v} = \\vec{u}\\cdot\\vec{w}$ **no** se deduce $\\vec{v} = \\vec{w}$."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "producto-escalar-3d-explorador",
        "initial": [
          1,
          2,
          2,
          2,
          0,
          -1
        ],
        "hint": "Estos vectores son perpendiculares (producto 0). Cambia un número y observa el signo del producto."
      }
    },
    {
      "id": "check-perp",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Iguala el producto escalar a $0$."
        }
      ],
      "title": "Perpendiculares",
      "question": "¿Para qué valor de $k$ son perpendiculares $(k, 2, 1)$ y $(2, 3, -8)$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$2k + 6 - 8 = 0 \\Rightarrow k = 1$."
    }
  ],
};
