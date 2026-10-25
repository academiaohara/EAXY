import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_4_SUBTITLE } from "@/data/lessons/shared";

export const operacionesVectoresEspacio2bachLesson: InteractiveLesson = {
  slug: "operaciones-vectores-espacio-2bach",
  title: "2. Operaciones con vectores y combinaciones lineales",
  subtitle: TEMA_2BACH_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "suma",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Suma, resta y producto por un número"
        }
      ],
      "title": "Suma, resta y producto por un número",
      "blocks": [
        {
          "kind": "text",
          "text": "Se opera **componente a componente**: $\\vec{u} + \\vec{v} = (u_1 + v_1,\\ u_2 + v_2,\\ u_3 + v_3)$ y $k\\,\\vec{u} = (k u_1,\\ k u_2,\\ k u_3)$."
        },
        {
          "kind": "text",
          "text": "Geométricamente, la suma es la **diagonal del paralelogramo** (o la poligonal: un vector a continuación del otro). El producto por $k$ alarga, acorta o invierte el vector."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "vectores-suma-3d",
        "params": {
          "nums": [
            3,
            0,
            1,
            0,
            3,
            2
          ]
        }
      }
    },
    {
      "id": "check-comb",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$2\\cdot 2 - 0$."
        }
      ],
      "title": "Combinación lineal",
      "question": "Con $\\vec{u} = (1, 2, -1)$ y $\\vec{v} = (3, 0, 2)$, calcula la segunda componente de $2\\vec{u} - \\vec{v}$. (solo el número)",
      "correctAnswers": [
        "4"
      ],
      "explanation": "$2\\vec{u} - \\vec{v} = (2 - 3,\\ 4 - 0,\\ -2 - 2) = (-1, 4, -4)$."
    },
    {
      "id": "paralelos",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Vectores paralelos y combinaciones"
        }
      ],
      "title": "Vectores paralelos y combinaciones",
      "blocks": [
        {
          "kind": "rule",
          "text": "Dos vectores son **paralelos** (linealmente dependientes) si uno es múltiplo del otro, es decir, sus componentes son **proporcionales**:",
          "formula": "\\dfrac{u_1}{v_1} = \\dfrac{u_2}{v_2} = \\dfrac{u_3}{v_3}"
        },
        {
          "kind": "text",
          "text": "Un vector $\\vec{w}$ es **combinación lineal** de $\\vec{u}$ y $\\vec{v}$ si $\\vec{w} = a\\vec{u} + b\\vec{v}$."
        }
      ]
    },
    {
      "id": "check-par",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Calcula la razón con las segundas componentes."
        }
      ],
      "title": "Vectores paralelos",
      "question": "¿Qué valor de $m$ hace paralelos a $(m, 6, -9)$ y $(2, -4, 6)$? (solo el número)",
      "correctAnswers": [
        "-3",
        "−3"
      ],
      "explanation": "Razón: $\\dfrac{6}{-4} = -\\dfrac{3}{2}$. Entonces $m = 2\\cdot\\left(-\\dfrac{3}{2}\\right) = -3$ y $-9 = 6\\cdot\\left(-\\dfrac{3}{2}\\right)$ ✓."
    },
    {
      "id": "check-a",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Empieza por la componente donde $v$ vale $0$."
        }
      ],
      "title": "Escribir un vector como combinación",
      "question": "$\\vec{w} = (5, 4, 0)$ se escribe como $a\\,(1, 2, -1) + b\\,(3, 0, 2)$. ¿Cuánto vale $a$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "Segunda componente: $2a = 4$, $a = 2$. Tercera: $-2 + 2b = 0$, $b = 1$. Primera: $2 + 3 = 5$ ✓."
    }
  ],
};
