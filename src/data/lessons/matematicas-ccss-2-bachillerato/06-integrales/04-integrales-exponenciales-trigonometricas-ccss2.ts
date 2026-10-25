import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_6_SUBTITLE } from "@/data/lessons/shared";

export const integralesExponencialesTrigonometricasCcss2Lesson: InteractiveLesson = {
  slug: "integrales-exponenciales-trigonometricas-ccss2",
  title: "4. Exponenciales y trigonométricas",
  subtitle: TEMA_CCSS2_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "tabla",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Tabla de integrales inmediatas"
        }
      ],
      "title": "Tabla de integrales inmediatas",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "\\int e^x\\,dx = e^x + C",
              "label": "exponencial"
            },
            {
              "tex": "\\int a^x\\,dx = \\dfrac{a^x}{\\ln a} + C",
              "label": "$a>0$, $a \neq 1$"
            },
            {
              "tex": "\\int \\sin x\\,dx = -\\cos x + C",
              "label": "seno"
            },
            {
              "tex": "\\int \\cos x\\,dx = \\sin x + C",
              "label": "coseno"
            },
            {
              "tex": "\\int \\dfrac{dx}{\\cos^2 x} = \\tan x + C",
              "label": "$=\\int (1+\\tan^2 x)\\,dx$"
            }
          ]
        },
        {
          "kind": "text",
          "text": "Todas salen de **invertir una derivada conocida**: aprenderlas es aprender la tabla de derivadas al revés."
        }
      ]
    },
    {
      "id": "ejemplos",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Combinaciones"
        }
      ],
      "title": "Combinaciones",
      "blocks": [
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\int (3e^x - 2\\sin x)\\,dx = 3e^x + 2\\cos x + C"
            },
            {
              "math": "\\int 3\\cos x\\,dx = 3\\sin x + C"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "integral-metodos-explorador",
        "initial": [
          3,
          3
        ],
        "hint": "Avanza los pasos y comprueba que F′ = f."
      }
    },
    {
      "id": "check-asocia",
      "type": "classify",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en la tabla de derivadas."
        }
      ],
      "title": "Asocia cada integral con su resultado",
      "question": "Elige el resultado de cada integral.",
      "groups": [
        {
          "id": "s",
          "label": "sen x + C",
          "tone": "emerald"
        },
        {
          "id": "c",
          "label": "−cos x + C",
          "tone": "amber"
        },
        {
          "id": "t",
          "label": "tg x + C",
          "tone": "violet"
        }
      ],
      "items": [
        {
          "id": "a",
          "text": "$\\int \\cos x\\,dx$",
          "group": "s"
        },
        {
          "id": "b",
          "text": "$\\int \\sin x\\,dx$",
          "group": "c"
        },
        {
          "id": "c",
          "text": "$\\int \\dfrac{dx}{\\cos^2 x}$",
          "group": "t"
        },
        {
          "id": "e",
          "text": "$\\int (1+\\tan^2 x)\\,dx$",
          "group": "t"
        }
      ],
      "hint": "$1+\\tan^2 x = \\dfrac{1}{\\cos^2 x}$."
    },
    {
      "id": "check-3e",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$e^0 = 1$ y $\\cos 0 = 1$."
        }
      ],
      "title": "Con constante cero",
      "question": "Con $C=0$, el valor en $x=0$ de $\\int (3e^x - 2\\sin x)\\,dx = 3e^x + 2\\cos x$ es… (solo el número)",
      "correctAnswers": [
        "5"
      ],
      "explanation": "$3\\cdot 1 + 2\\cdot 1 = 5$."
    },
    {
      "id": "check-cos",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\sin(\\pi/2) = 1$."
        }
      ],
      "title": "Una condición inicial",
      "question": "$F$ es la primitiva de $f(x) = 3\\cos x$ con $F(0) = 1$. ¿Cuánto vale $F(\\pi/2)$? (solo el número)",
      "correctAnswers": [
        "4"
      ],
      "explanation": "$F(x) = 3\\sin x + 1$, luego $F(\\pi/2) = 3 + 1 = 4$."
    },
    {
      "id": "check-a",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Deriva $5^x$."
        }
      ],
      "title": "Base distinta de e",
      "question": "$\\int 5^x\\,dx$ es…",
      "choices": [
        {
          "id": "a",
          "label": "$\\dfrac{5^x}{\\ln 5} + C$"
        },
        {
          "id": "b",
          "label": "$5^x + C$",
          "incorrectFeedback": "Falta dividir entre $\\ln 5$: la derivada de $5^x$ es $5^x \\ln 5$."
        },
        {
          "id": "c",
          "label": "$5^x \\ln 5 + C$",
          "incorrectFeedback": "Eso es la derivada, no la primitiva."
        },
        {
          "id": "d",
          "label": "$\\dfrac{5^{x+1}}{x+1} + C$",
          "incorrectFeedback": "Esa es la regla de la potencia, aquí la variable está en el exponente."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Se divide entre $\\ln a$ para compensar el factor que aparece al derivar."
    }
  ],
};
