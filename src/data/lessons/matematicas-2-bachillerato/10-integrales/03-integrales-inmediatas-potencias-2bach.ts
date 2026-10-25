import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_10_SUBTITLE } from "@/data/lessons/shared";

export const integralesInmediatasPotencias2bachLesson: InteractiveLesson = {
  slug: "integrales-inmediatas-potencias-2bach",
  title: "3. Integrales inmediatas: constantes, potencias y 1/x",
  subtitle: TEMA_2BACH_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "potencias",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "La regla de la potencia"
        }
      ],
      "title": "La regla de la potencia",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "\\int k\\,dx = kx + C",
              "label": "constante"
            },
            {
              "tex": "\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)",
              "label": "potencia"
            },
            {
              "tex": "\\int \\dfrac1x\\,dx = \\ln|x| + C",
              "label": "el caso $n = -1$"
            }
          ]
        },
        {
          "kind": "text",
          "text": "En la potencia se **suma 1 al exponente** y se **divide entre el nuevo exponente**. Las raíces y los denominadores se escriben antes como potencias."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\int x^5\\,dx = \\dfrac{x^6}{6} + C"
            },
            {
              "math": "\\int \\sqrt[3]{x}\\,dx = \\int x^{1/3}\\,dx = \\dfrac{3}{4}x^{4/3} + C"
            },
            {
              "math": "\\int \\dfrac{dx}{x^3} = \\int x^{-3}\\,dx = -\\dfrac{1}{2x^2} + C"
            }
          ]
        }
      ]
    },
    {
      "id": "abs",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "El valor absoluto del logaritmo"
        }
      ],
      "title": "El valor absoluto del logaritmo",
      "blocks": [
        {
          "kind": "text",
          "text": "La derivada de $\\ln x$ es $\\tfrac1x$ solo para $x>0$; para $x<0$ la derivada de $\\ln(-x)$ también es $\\tfrac1x$. Por eso la primitiva válida en todo el dominio es $\\ln|x|$."
        },
        {
          "kind": "warning",
          "text": "$\\int x^{-1}\\,dx$ **no** se calcula con la regla de la potencia: daría una división entre $0$."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "integral-metodos-explorador",
        "initial": [
          1,
          3
        ],
        "hint": "Escribe ∛x como potencia: la regla de la potencia sale en tres pasos."
      }
    },
    {
      "id": "check-formula",
      "type": "classify",
      "help": [
        {
          "label": "Pista",
          "message": "Mira el exponente."
        }
      ],
      "title": "¿Potencia o logaritmo?",
      "question": "¿Qué fórmula usas en cada integral?",
      "groups": [
        {
          "id": "pot",
          "label": "Regla de la potencia",
          "tone": "emerald"
        },
        {
          "id": "log",
          "label": "Logaritmo",
          "tone": "amber"
        }
      ],
      "items": [
        {
          "id": "a",
          "text": "$\\int x^7\\,dx$",
          "group": "pot"
        },
        {
          "id": "b",
          "text": "$\\int \\dfrac{1}{x}\\,dx$",
          "group": "log"
        },
        {
          "id": "c",
          "text": "$\\int x^{-2}\\,dx$",
          "group": "pot"
        },
        {
          "id": "d",
          "text": "$\\int \\dfrac{1}{x^3}\\,dx$",
          "group": "pot"
        },
        {
          "id": "e",
          "text": "$\\int \\dfrac{dx}{x}$",
          "group": "log"
        },
        {
          "id": "f",
          "text": "$\\int \\sqrt{x}\\,dx$",
          "group": "pot"
        }
      ],
      "hint": "Solo $x^{-1} = \\tfrac1x$ da un logaritmo."
    },
    {
      "id": "check-raiz",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$9^{3/2} = 27$."
        }
      ],
      "title": "Una raíz",
      "question": "Con $F(x) = \\dfrac23 x^{3/2}$ (primitiva de $\\sqrt{x}$ con $F(0) = 0$), ¿cuánto vale $F(9)$? (solo el número)",
      "correctAnswers": [
        "18"
      ],
      "explanation": "$\\dfrac23\\cdot 9^{3/2} = \\dfrac23 \\cdot 27 = 18$."
    },
    {
      "id": "check-neg",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $x = 1$."
        }
      ],
      "title": "Exponente negativo",
      "question": "Calcula $F(1)$ para la primitiva $F(x) = -\\dfrac{1}{2x^2}$ de $x^{-3}$. (decimal o fracción)",
      "correctAnswers": [
        "-1/2",
        "−1/2",
        "-0.5",
        "-0,5",
        "−0,5",
        "−0.5"
      ],
      "explanation": "$-\\dfrac{1}{2\\cdot 1} = -\\dfrac12$."
    },
    {
      "id": "check-ln",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Recuerda la derivada del logaritmo."
        }
      ],
      "title": "Primitiva de 1/x",
      "question": "Una primitiva de $f(x) = \\dfrac1x$ en todo su dominio es…",
      "choices": [
        {
          "id": "a",
          "label": "$\\ln|x|$"
        },
        {
          "id": "b",
          "label": "$\\dfrac{x^0}{0}$",
          "incorrectFeedback": "No se puede dividir entre $0$."
        },
        {
          "id": "c",
          "label": "$-\\dfrac{1}{x^2}$",
          "incorrectFeedback": "Esa es la derivada de $\\tfrac1x$."
        },
        {
          "id": "d",
          "label": "$\\ln x$ solo",
          "incorrectFeedback": "Está definida solo para $x>0$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Es la excepción de la regla de la potencia."
    }
  ],
};
