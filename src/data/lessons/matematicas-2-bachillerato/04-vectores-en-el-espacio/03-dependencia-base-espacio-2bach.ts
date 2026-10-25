import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_4_SUBTITLE } from "@/data/lessons/shared";

export const dependenciaBaseEspacio2bachLesson: InteractiveLesson = {
  slug: "dependencia-base-espacio-2bach",
  title: "3. Dependencia lineal, bases y coordenadas",
  subtitle: TEMA_2BACH_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "base",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Tres vectores: ¿forman una base?"
        }
      ],
      "title": "Tres vectores: ¿forman una base?",
      "blocks": [
        {
          "kind": "definition",
          "text": "Tres vectores forman una **base** de $\\mathbb{R}^3$ si son **linealmente independientes**: ninguno es combinación de los otros. Entonces todo vector se escribe de forma única como $a\\vec{u} + b\\vec{v} + c\\vec{w}$."
        },
        {
          "kind": "rule",
          "title": "Criterio",
          "text": "Con las componentes en filas:",
          "formula": "\\begin{vmatrix} u_1 & u_2 & u_3 \\\\ v_1 & v_2 & v_3 \\\\ w_1 & w_2 & w_3 \\end{vmatrix} \\neq 0 \\iff \\text{base}"
        },
        {
          "kind": "text",
          "text": "Si el determinante vale $0$, los vectores son **coplanares** (están en un mismo plano) o alineados."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "vectores-dependencia-explorador",
        "initial": [
          1,
          0,
          1,
          0,
          1,
          1,
          1,
          1,
          0
        ],
        "hint": "Comprueba que el determinante es −2 y son una base. Cambia el último vector a (1, 1, 2): pasa a ser coplanar."
      }
    },
    {
      "id": "check-det",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Desarrolla por la primera fila."
        }
      ],
      "title": "Determinante",
      "question": "Calcula $\\begin{vmatrix} 1 & 0 & 1 \\\\ 0 & 1 & 1 \\\\ 1 & 1 & 0 \\end{vmatrix}$. (solo el número)",
      "correctAnswers": [
        "-2",
        "−2"
      ],
      "explanation": "$1\\cdot(0 - 1) - 0 + 1\\cdot(0 - 1) = -2 \\neq 0$: son independientes."
    },
    {
      "id": "check-m",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Plantea el determinante igual a $0$."
        }
      ],
      "title": "Valor que los hace dependientes",
      "question": "¿Qué valor de $m$ hace dependientes a $(1, 2, m)$, $(0, 1, 1)$ y $(1, 3, 2)$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "El determinante vale $1 - m$ (desarrollo por la primera fila), que se anula si $m = 1$."
    },
    {
      "id": "check-clasifica",
      "type": "classify",
      "help": [
        {
          "label": "Pista",
          "message": "Calcula el determinante o busca proporcionalidad."
        }
      ],
      "title": "¿Base o no?",
      "question": "Clasifica cada terna de vectores.",
      "groups": [
        {
          "id": "base",
          "label": "Forman una base",
          "tone": "emerald"
        },
        {
          "id": "dep",
          "label": "Son dependientes",
          "tone": "rose"
        }
      ],
      "items": [
        {
          "id": "a",
          "text": "$(1,0,0),\\ (0,1,0),\\ (0,0,1)$",
          "group": "base"
        },
        {
          "id": "b",
          "text": "$(1,2,3),\\ (2,4,6),\\ (0,1,0)$",
          "group": "dep"
        },
        {
          "id": "c",
          "text": "$(1,1,0),\\ (0,1,1),\\ (1,0,1)$",
          "group": "base"
        },
        {
          "id": "d",
          "text": "$(1,2,3),\\ (4,5,6),\\ (7,8,9)$",
          "group": "dep"
        },
        {
          "id": "e",
          "text": "$(2,0,0),\\ (0,3,0),\\ (0,0,4)$",
          "group": "base"
        },
        {
          "id": "f",
          "text": "$(1,0,0),\\ (0,1,0),\\ (1,1,0)$",
          "group": "dep"
        }
      ],
      "hint": "Si hay dos proporcionales o uno es combinación de los otros, determinante $0$. El tercero es una combinación: $(7,8,9) = 2(4,5,6) - (1,2,3)$."
    },
    {
      "id": "check-rango",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "El rango es el número máximo de vectores independientes."
        }
      ],
      "title": "Rango de tres vectores",
      "question": "Los vectores $(1,2,3)$, $(4,5,6)$ y $(7,8,9)$ tienen determinante $0$ y no son proporcionales dos a dos. ¿Cuántos son linealmente independientes como máximo? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "Rango $2$: el tercero es combinación de los otros dos, que sí son independientes. Generan un plano."
    }
  ],
};
