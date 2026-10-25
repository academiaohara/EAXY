import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_5_SUBTITLE } from "@/data/lessons/shared";

export const rectaVectorialParametricas2bachLesson: InteractiveLesson = {
  slug: "recta-vectorial-parametricas-2bach",
  title: "1. La recta en el espacio: ecuación vectorial y paramétricas",
  subtitle: TEMA_2BACH_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "vectorial",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Un punto y un vector director"
        }
      ],
      "title": "Un punto y un vector director",
      "blocks": [
        {
          "kind": "definition",
          "text": "Una recta $r$ queda determinada por un **punto** $P(p_1, p_2, p_3)$ y un **vector director** $\\vec{v} = (v_1, v_2, v_3)$ paralelo a ella."
        },
        {
          "kind": "rule",
          "title": "Ecuación vectorial",
          "formula": "(x, y, z) = (p_1, p_2, p_3) + t\\,(v_1, v_2, v_3),\\quad t \\in \\mathbb{R}"
        },
        {
          "kind": "rule",
          "title": "Ecuaciones paramétricas",
          "formula": "\\begin{cases} x = p_1 + t\\,v_1 \\\\ y = p_2 + t\\,v_2 \\\\ z = p_3 + t\\,v_3 \\end{cases}"
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "recta-espacio-3d",
        "params": {
          "nums": [
            1,
            1,
            0,
            2,
            1,
            2
          ]
        }
      }
    },
    {
      "id": "check-punto",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $t = 2$ en $x = 1 + 2t$."
        }
      ],
      "title": "Un punto de la recta",
      "question": "La recta $r$ pasa por $P(1, 2, 3)$ con vector director $(2, -1, 4)$. ¿Cuánto vale la coordenada $x$ del punto que corresponde a $t = 2$? (solo el número)",
      "correctAnswers": [
        "5"
      ],
      "explanation": "$x = 1 + 2\\cdot 2 = 5$. El punto es $(5, 0, 11)$."
    },
    {
      "id": "check-director",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Extremo menos origen."
        }
      ],
      "title": "Recta por dos puntos",
      "question": "Una recta pasa por $A(1, 0, 2)$ y $B(3, 4, -2)$. ¿Cuánto vale la tercera componente del vector director $\\overrightarrow{AB}$? (solo el número)",
      "correctAnswers": [
        "-4",
        "−4"
      ],
      "explanation": "$\\overrightarrow{AB} = (2, 4, -4)$."
    },
    {
      "id": "explorar",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Explora una recta"
        }
      ],
      "title": "Explora una recta",
      "blocks": [
        {
          "kind": "text",
          "text": "Cambia el punto, el vector director y el parámetro: observa cómo se mueve el punto $X = P + t\\vec{v}$ y cómo cambian las ecuaciones."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "recta-espacio-explorador",
        "initial": [
          1,
          1,
          0,
          2,
          1,
          2,
          1
        ],
        "hint": "Mueve t y comprueba que X recorre la recta. Cambia v por un múltiplo (por ejemplo 4, 2, 4): la recta es la misma."
      }
    },
    {
      "id": "check-t",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Mira solo la tercera ecuación."
        }
      ],
      "title": "Hallar el parámetro",
      "question": "¿Para qué valor de $t$ el punto de $r: (1, 1, 0) + t\\,(2, 1, 2)$ tiene $z = 6$? (solo el número)",
      "correctAnswers": [
        "3"
      ],
      "explanation": "$z = 2t = 6 \\Rightarrow t = 3$; el punto es $(7, 4, 6)$."
    }
  ],
};
