import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_4_SUBTITLE } from "@/data/lessons/shared";

export const aplicacionesProductoVectorial2bachLesson: InteractiveLesson = {
  slug: "aplicaciones-producto-vectorial-2bach",
  title: "8. Áreas y vector perpendicular a un plano",
  subtitle: TEMA_2BACH_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "areas",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "El módulo es un área"
        }
      ],
      "title": "El módulo es un área",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "\\text{Área paralelogramo} = |\\vec{u}\\times\\vec{v}|",
              "label": "paralelogramo"
            },
            {
              "tex": "\\text{Área triángulo} = \\tfrac12|\\vec{u}\\times\\vec{v}|",
              "label": "triángulo"
            }
          ]
        },
        {
          "kind": "text",
          "text": "Además, $\\vec{u}\\times\\vec{v}$ es un **vector normal** al plano que contienen $\\vec{u}$ y $\\vec{v}$: sirve para hallar vectores perpendiculares."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "A(1,0,0),\\ B(0,2,0),\\ C(0,0,3)"
            },
            {
              "math": "\\overrightarrow{AB} = (-1,2,0),\\ \\overrightarrow{AC} = (-1,0,3)"
            },
            {
              "math": "\\overrightarrow{AB}\\times\\overrightarrow{AC} = (6, 3, 2),\\ |\\cdot| = 7 \\Rightarrow \\text{Área} = \\tfrac72"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "producto-vectorial-explorador",
        "initial": [
          -1,
          2,
          0,
          -1,
          0,
          3
        ],
        "hint": "Es el triángulo del ejemplo: el módulo del producto vectorial es 7 y el área del triángulo, 3,5."
      }
    },
    {
      "id": "check-mod",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Calcula primero el vector."
        }
      ],
      "title": "Módulo del producto vectorial",
      "question": "Con $\\overrightarrow{AB} = (-1, 2, 0)$ y $\\overrightarrow{AC} = (-1, 0, 3)$, ¿cuánto vale $|\\overrightarrow{AB}\\times\\overrightarrow{AC}|$? (solo el número)",
      "correctAnswers": [
        "7"
      ],
      "explanation": "$\\overrightarrow{AB}\\times\\overrightarrow{AC} = (6, 3, 2)$ y $\\sqrt{36 + 9 + 4} = 7$."
    },
    {
      "id": "check-tri",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "La mitad del módulo."
        }
      ],
      "title": "Área de un triángulo",
      "question": "¿Cuánto vale el área del triángulo $ABC$ anterior? (decimal o fracción)",
      "correctAnswers": [
        "3.5",
        "3,5",
        "7/2"
      ],
      "explanation": "$\\tfrac12\\cdot 7 = 3{,}5$ unidades de área."
    },
    {
      "id": "check-cuad",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Calcula las tres componentes."
        }
      ],
      "title": "Cuadrado del módulo",
      "question": "Si $\\overrightarrow{AB} = (2, 1, 0)$ y $\\overrightarrow{AD} = (0, 1, 2)$, ¿cuánto vale $|\\overrightarrow{AB}\\times\\overrightarrow{AD}|^2$? (solo el número)",
      "correctAnswers": [
        "24"
      ],
      "explanation": "$\\overrightarrow{AB}\\times\\overrightarrow{AD} = (2, -4, 2)$ y $4 + 16 + 4 = 24$. El área del paralelogramo es $\\sqrt{24} = 2\\sqrt6$."
    },
    {
      "id": "check-norm",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Multiplica por un número para que la primera componente sea $1$."
        }
      ],
      "title": "Vector perpendicular a dos",
      "question": "Un vector perpendicular a $(1, 2, 3)$ y $(1, 1, 1)$ es $(-1, 2, -1)$. Si se pide uno con primera componente $1$, ¿cuánto vale su segunda componente? (solo el número)",
      "correctAnswers": [
        "-2",
        "−2"
      ],
      "explanation": "Los vectores perpendiculares a ambos son múltiplos de $(-1, 2, -1)$. Multiplicando por $-1$: $(1, -2, 1)$."
    }
  ],
};
