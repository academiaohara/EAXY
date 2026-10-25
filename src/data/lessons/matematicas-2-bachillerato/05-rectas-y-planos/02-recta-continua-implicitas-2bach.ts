import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_5_SUBTITLE } from "@/data/lessons/shared";

export const rectaContinuaImplicitas2bachLesson: InteractiveLesson = {
  slug: "recta-continua-implicitas-2bach",
  title: "2. Ecuación continua e implícitas de la recta",
  subtitle: TEMA_2BACH_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "continua",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Despejar t"
        }
      ],
      "title": "Despejar t",
      "blocks": [
        {
          "kind": "rule",
          "title": "Ecuación continua",
          "text": "Si ninguna componente de $\\vec{v}$ es $0$, se despeja $t$ en las tres paramétricas:",
          "formula": "\\dfrac{x - p_1}{v_1} = \\dfrac{y - p_2}{v_2} = \\dfrac{z - p_3}{v_3}"
        },
        {
          "kind": "text",
          "text": "Si una componente vale $0$ (por ejemplo $v_2 = 0$), la coordenada correspondiente es constante: $y = p_2$."
        },
        {
          "kind": "rule",
          "title": "Ecuaciones implícitas",
          "text": "Cada igualdad de la continua es un plano: la recta es la **intersección de dos planos**:",
          "formula": "\\begin{cases} Ax + By + Cz + D = 0 \\\\ A'x + B'y + C'z + D' = 0 \\end{cases}"
        }
      ]
    },
    {
      "id": "ejemplo",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "De paramétricas a implícitas"
        }
      ],
      "title": "De paramétricas a implícitas",
      "blocks": [
        {
          "kind": "example",
          "lines": [
            {
              "math": "x = 1 + 2t,\\ \\ y = -t,\\ \\ z = 3t"
            },
            {
              "math": "\\dfrac{x - 1}{2} = \\dfrac{y}{-1} = \\dfrac{z}{3}"
            },
            {
              "math": "\\begin{cases} x + 2y - 1 = 0 \\\\ 3y + z = 0 \\end{cases}"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "posicion-planos-explorador",
        "initial": [
          1,
          2,
          0,
          -1,
          0,
          3,
          1,
          0,
          0,
          0,
          0,
          0
        ],
        "hint": "Aquí los dos primeros planos son los de la recta; con el tercero de ceros se ve que se cortan en una recta."
      }
    },
    {
      "id": "check-dir",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$1\\cdot 3 - 2\\cdot 0$."
        }
      ],
      "title": "Dirección desde las implícitas",
      "question": "Una recta viene dada por $x + 2y - 1 = 0$ y $3y + z = 0$. El vector director es el producto vectorial de las normales $(1, 2, 0)\\times(0, 3, 1)$. ¿Cuánto vale su tercera componente? (solo el número)",
      "correctAnswers": [
        "3"
      ],
      "explanation": "$(1,2,0)\\times(0,3,1) = (2, -1, 3)$."
    },
    {
      "id": "check-continua",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "No se divide entre cero."
        }
      ],
      "title": "Con una componente nula",
      "question": "La recta que pasa por $A(1, 2, 3)$ y $B(3, 2, -1)$ tiene $\\overrightarrow{AB} = (2, 0, -4)$. Su ecuación continua es…",
      "choices": [
        {
          "id": "a",
          "label": "$\\dfrac{x - 1}{2} = \\dfrac{z - 3}{-4},\\ \\ y = 2$"
        },
        {
          "id": "b",
          "label": "$\\dfrac{x - 1}{2} = \\dfrac{y - 2}{0} = \\dfrac{z - 3}{-4}$",
          "incorrectFeedback": "No se puede dividir entre $0$: se escribe $y = 2$."
        },
        {
          "id": "c",
          "label": "$\\dfrac{x - 1}{2} = \\dfrac{y - 2}{2} = \\dfrac{z - 3}{-1}$",
          "incorrectFeedback": "Esas no son las componentes de $\\overrightarrow{AB}$."
        },
        {
          "id": "d",
          "label": "$x = 1,\\ y = 2,\\ z = 3$",
          "incorrectFeedback": "Eso es solo el punto $A$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Como $v_2 = 0$, la coordenada $y$ es constante e igual a $2$."
    },
    {
      "id": "check-punto2",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Calcula primero $t$ con la primera coordenada."
        }
      ],
      "title": "¿Está en la recta?",
      "question": "¿Para qué valor de $a$ pertenece $(5, a, -6)$ a la recta $(1, 0, 2) + t\\,(2, 4, -4)$? (solo el número)",
      "correctAnswers": [
        "8"
      ],
      "explanation": "$x = 1 + 2t = 5 \\Rightarrow t = 2$; entonces $y = 4\\cdot 2 = 8$ y $z = 2 - 8 = -6$ ✓."
    }
  ],
};
