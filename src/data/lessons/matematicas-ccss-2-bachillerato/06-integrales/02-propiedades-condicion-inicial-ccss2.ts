import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_6_SUBTITLE } from "@/data/lessons/shared";

export const propiedadesCondicionInicialCcss2Lesson: InteractiveLesson = {
  slug: "propiedades-condicion-inicial-ccss2",
  title: "2. Propiedades y condición inicial",
  subtitle: TEMA_CCSS2_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "props",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Linealidad de la integral"
        }
      ],
      "title": "Linealidad de la integral",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "\\int [f(x) + g(x)]\\,dx = \\int f\\,dx + \\int g\\,dx",
              "label": "la integral de una suma es la suma de las integrales"
            },
            {
              "tex": "\\int k\\,f(x)\\,dx = k \\int f(x)\\,dx",
              "label": "un número que multiplica sale fuera"
            }
          ]
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\int (5x^4 + 2x)\\,dx = x^5 + x^2 + C"
            },
            {
              "math": "\\int 7\\cos x\\,dx = 7\\sin x + C"
            }
          ]
        }
      ]
    },
    {
      "id": "condicion",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Fijar la constante C"
        }
      ],
      "title": "Fijar la constante C",
      "blocks": [
        {
          "kind": "text",
          "text": "Con una **condición inicial** $F(x_0) = y_0$ se elige entre todas las primitivas la que pasa por un punto. Es el caso de un coste marginal: se conoce $f$ y el coste fijo $F(0)$."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "f(x) = 3 + 8x + 15x^2 \\ \\Rightarrow\\ F(x) = 3x + 4x^2 + 5x^3 + C"
            },
            {
              "math": "F(0) = 100 \\Rightarrow C = 100"
            },
            {
              "math": "F(x) = 5x^3 + 4x^2 + 3x + 100"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "integral-polinomio-explorador",
        "initial": [
          3,
          0,
          1,
          0
        ],
        "hint": "Cambia a, b, c y C: la derivada de F coincide siempre con f, y C sube o baja la gráfica."
      }
    },
    {
      "id": "check-coste",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $x = 2$."
        }
      ],
      "title": "Coste total",
      "question": "Con $F(x) = 5x^3 + 4x^2 + 3x + 100$, ¿cuánto vale el coste $F(2)$? (solo el número)",
      "correctAnswers": [
        "162"
      ],
      "explanation": "$5\\cdot 8 + 4\\cdot 4 + 6 + 100 = 40 + 16 + 6 + 100 = 162$."
    },
    {
      "id": "check-b",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Deriva $F$ e iguala término a término."
        }
      ],
      "title": "Coeficiente de la exponencial",
      "question": "$F(x) = a x^3 + b e^x + c x$ es primitiva de $f(x) = 7x^2 - 5e^x + 3$. ¿Cuánto vale $b$? (solo el número)",
      "correctAnswers": [
        "-5",
        "−5"
      ],
      "explanation": "$F' = 3a x^2 + b e^x + c = 7x^2 - 5e^x + 3 \\Rightarrow b = -5$ (y $a = \\tfrac73$, $c = 3$)."
    },
    {
      "id": "check-suma",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Integra cada término."
        }
      ],
      "title": "Valor de una primitiva",
      "question": "Calcula la primitiva de $f(x) = 5x^4 + 2x$ con $F(0) = 0$ y da $F(1)$. (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$F(x) = x^5 + x^2$, luego $F(1) = 1 + 1 = 2$."
    },
    {
      "id": "check-const",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Despeja $C$."
        }
      ],
      "title": "Una condición, una solución",
      "question": "Si conocemos $F(0) = 100$, ¿cuántas primitivas de $f$ cumplen esa condición?",
      "choices": [
        {
          "id": "a",
          "label": "Solo una"
        },
        {
          "id": "b",
          "label": "Infinitas",
          "incorrectFeedback": "Cada valor de $C$ da un $F(0)$ distinto; la condición fija $C$."
        },
        {
          "id": "c",
          "label": "Ninguna",
          "incorrectFeedback": "Siempre existe un valor de $C$ que la cumple."
        },
        {
          "id": "d",
          "label": "Dos",
          "incorrectFeedback": "La constante se despeja de forma única."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$F(0)$ depende de $C$ de forma directa."
    }
  ],
};
