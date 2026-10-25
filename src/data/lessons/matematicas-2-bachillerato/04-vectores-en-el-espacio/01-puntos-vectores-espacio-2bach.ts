import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_4_SUBTITLE } from "@/data/lessons/shared";

export const puntosVectoresEspacio2bachLesson: InteractiveLesson = {
  slug: "puntos-vectores-espacio-2bach",
  title: "1. Puntos y vectores en el espacio",
  subtitle: TEMA_2BACH_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "coordenadas",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "El módulo sale de aplicar Pitágoras dos veces."
        }
      ],
      "title": "Coordenadas, componentes y módulo",
      "blocks": [
        {
          "kind": "definition",
          "text": "Un **vector fijo** $\\overrightarrow{AB}$ es un segmento orientado de origen $A$ y extremo $B$. Sus **componentes** son «extremo menos origen»: $\\overrightarrow{AB} = (b_1 - a_1,\\ b_2 - a_2,\\ b_3 - a_3)$."
        },
        {
          "kind": "rule",
          "title": "Módulo",
          "formula": "|\\vec{v}| = \\sqrt{v_1^2 + v_2^2 + v_3^2}"
        },
        {
          "kind": "rule",
          "title": "Punto medio",
          "formula": "M = \\left(\\dfrac{a_1 + b_1}{2},\\ \\dfrac{a_2 + b_2}{2},\\ \\dfrac{a_3 + b_3}{2}\\right)"
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "vector-componentes-3d",
        "params": {
          "a": 3,
          "b": 2,
          "c": 4
        }
      }
    },
    {
      "id": "check-modulo",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Suma los cuadrados de las componentes."
        }
      ],
      "title": "Módulo de un vector",
      "question": "Calcula el módulo del vector $\\vec{v} = (2, 3, 6)$. (solo el número)",
      "correctAnswers": [
        "7"
      ],
      "explanation": "$|\\vec{v}| = \\sqrt{4 + 9 + 36} = \\sqrt{49} = 7$."
    },
    {
      "id": "check-componentes",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Extremo menos origen."
        }
      ],
      "title": "Componentes de AB",
      "question": "Si $A(1, 0, 1)$ y $B(3, 2, 4)$, ¿cuánto vale la tercera componente de $\\overrightarrow{AB}$? (solo el número)",
      "correctAnswers": [
        "3"
      ],
      "explanation": "$\\overrightarrow{AB} = B - A = (2, 2, 3)$."
    },
    {
      "id": "explorar",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "El punto medio promedia las coordenadas."
        }
      ],
      "title": "Explora con dos puntos",
      "blocks": [
        {
          "kind": "text",
          "text": "Mueve $A$ y $B$ y observa el vector $\\overrightarrow{AB}$, su módulo y el punto medio $M$."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "vectores-puntos-explorador",
        "initial": [
          1,
          0,
          1,
          3,
          2,
          4
        ],
        "hint": "Comprueba que las componentes de AB coinciden con «B menos A» y que M está justo en la mitad."
      }
    },
    {
      "id": "check-medio",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Promedia las terceras coordenadas."
        }
      ],
      "title": "Punto medio",
      "question": "Halla la tercera coordenada del punto medio de $A(2, -4, 6)$ y $B(0, 2, 2)$. (solo el número)",
      "correctAnswers": [
        "4"
      ],
      "explanation": "$M = (1, -1, 4)$: $\\dfrac{6 + 2}{2} = 4$."
    }
  ],
};
