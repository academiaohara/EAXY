import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_10_SUBTITLE } from "@/data/lessons/shared";

export const integralesRacionales2bachLesson: InteractiveLesson = {
  slug: "integrales-racionales-2bach",
  title: "8. Integrales de funciones racionales",
  subtitle: TEMA_2BACH_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "metodo",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Descomponer en fracciones simples"
        }
      ],
      "title": "Descomponer en fracciones simples",
      "blocks": [
        {
          "kind": "steps",
          "items": [
            "Si el grado del numerador es $\\geq$ el del denominador, **divide** primero: $\\dfrac{P}{Q} = c(x) + \\dfrac{R}{Q}$.",
            "Factoriza el denominador.",
            "Descompón en fracciones simples $\\dfrac{A}{x-a} + \\dfrac{B}{x-b}$ y halla $A$, $B$ sustituyendo las raíces.",
            "Integra cada una: $\\int \\dfrac{A}{x-a}\\,dx = A\\ln|x-a|$."
          ]
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\dfrac{3x+5}{(x-1)(x+3)} = \\dfrac{A}{x-1} + \\dfrac{B}{x+3}",
              "note": "descomposición"
            },
            {
              "math": "3x + 5 = A(x+3) + B(x-1)",
              "note": "común denominador"
            },
            {
              "math": "x=1:\\ 8 = 4A \\Rightarrow A = 2 \\qquad x=-3:\\ -4 = -4B \\Rightarrow B = 1",
              "note": "sustituye las raíces"
            },
            {
              "math": "\\int \\dfrac{3x+5}{(x-1)(x+3)}\\,dx = 2\\ln|x-1| + \\ln|x+3| + C"
            }
          ]
        }
      ]
    },
    {
      "id": "division",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Cuando hay que dividir"
        }
      ],
      "title": "Cuando hay que dividir",
      "blocks": [
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\dfrac{x^2}{x+1} = x - 1 + \\dfrac{1}{x+1}"
            },
            {
              "math": "\\int \\dfrac{x^2}{x+1}\\,dx = \\dfrac{x^2}{2} - x + \\ln|x+1| + C"
            }
          ]
        },
        {
          "kind": "warning",
          "text": "$\\int \\dfrac{dx}{1+x^2}$ **no** es un logaritmo: es $\\arctan x$. El denominador $x^2+1$ no tiene raíces reales y no se descompone."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "integral-metodos-explorador",
        "initial": [
          7,
          3
        ],
        "hint": "Descomposición en fracciones simples."
      }
    },
    {
      "id": "check-A",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $x=1$."
        }
      ],
      "title": "Hallar A",
      "question": "En $\\dfrac{3x+5}{(x-1)(x+3)} = \\dfrac{A}{x-1} + \\dfrac{B}{x+3}$, ¿cuánto vale $A$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "Con $x=1$: $3+5 = 8 = A\\cdot 4$."
    },
    {
      "id": "check-B",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $x=-3$."
        }
      ],
      "title": "Hallar B",
      "question": "Con la misma descomposición, ¿cuánto vale $B$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "Con $x=-3$: $-9+5 = -4 = B\\cdot(-4)$."
    },
    {
      "id": "check-A2",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $x=2$."
        }
      ],
      "title": "Otra descomposición",
      "question": "$\\dfrac{4}{x^2-4} = \\dfrac{A}{x-2} + \\dfrac{B}{x+2}$. ¿Cuánto vale $A$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$4 = A(x+2) + B(x-2)$; con $x=2$: $4 = 4A$."
    },
    {
      "id": "check-tipo",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Busca el $x^2+1$ con numerador constante."
        }
      ],
      "title": "¿Logaritmo o arcotangente?",
      "question": "¿Cuál de estas integrales da un arcotangente?",
      "choices": [
        {
          "id": "a",
          "label": "$\\int \\dfrac{dx}{x^2+1}$"
        },
        {
          "id": "b",
          "label": "$\\int \\dfrac{dx}{x^2-1}$",
          "incorrectFeedback": "Se descompone y da logaritmos."
        },
        {
          "id": "c",
          "label": "$\\int \\dfrac{2x}{x^2+1}\\,dx$",
          "incorrectFeedback": "Es $\\ln(x^2+1)$: el numerador es la derivada del denominador."
        },
        {
          "id": "d",
          "label": "$\\int \\dfrac{dx}{x}$",
          "incorrectFeedback": "Da $\\ln|x|$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Un denominador sin raíces reales de la forma $x^2+1$ da arcotangente."
    }
  ],
};
