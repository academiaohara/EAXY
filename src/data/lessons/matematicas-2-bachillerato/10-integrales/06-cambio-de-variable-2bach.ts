import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_10_SUBTITLE } from "@/data/lessons/shared";

export const cambioDeVariable2bachLesson: InteractiveLesson = {
  slug: "cambio-de-variable-2bach",
  title: "6. Integración por cambio de variable",
  subtitle: TEMA_2BACH_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "metodo",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Sustituir para simplificar"
        }
      ],
      "title": "Sustituir para simplificar",
      "blocks": [
        {
          "kind": "steps",
          "items": [
            "Elige $u = g(x)$ (lo que molesta: un radical, un exponente, un denominador).",
            "Calcula $du = g'(x)\\,dx$ y despeja $x$ o $dx$ si hace falta.",
            "Sustituye todo por $u$ y $du$, e integra en $u$.",
            "**Deshaz el cambio**: vuelve a escribir el resultado en $x$."
          ]
        }
      ]
    },
    {
      "id": "ejemplo",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Un ejemplo completo"
        }
      ],
      "title": "Un ejemplo completo",
      "blocks": [
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\int x\\sqrt{x+1}\\,dx \\quad u = x+1,\\ x = u-1,\\ dx = du",
              "note": "cambio $u = x + 1$"
            },
            {
              "math": "= \\int (u-1)\\sqrt{u}\\,du = \\int \\left(u^{3/2} - u^{1/2}\\right)du"
            },
            {
              "math": "= \\tfrac25 u^{5/2} - \\tfrac23 u^{3/2} + C"
            },
            {
              "math": "= \\tfrac25 (x+1)^{5/2} - \\tfrac23 (x+1)^{3/2} + C"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "integral-metodos-explorador",
        "initial": [
          5,
          3
        ],
        "hint": "Cambio u = x + 1 y comprobación por derivación."
      }
    },
    {
      "id": "check-du",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Deriva $3x^2 + 1$."
        }
      ],
      "title": "La diferencial",
      "question": "Si $u = 3x^2 + 1$, entonces $du = k\\,x\\,dx$. ¿Cuánto vale $k$? (solo el número)",
      "correctAnswers": [
        "6"
      ],
      "explanation": "$du = 6x\\,dx$."
    },
    {
      "id": "check-f0",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$(0+1)^{n} = 1$."
        }
      ],
      "title": "Valor del ejemplo",
      "question": "Con $C = 0$, ¿cuánto vale $F(0)$ en $F(x) = \\tfrac25 (x+1)^{5/2} - \\tfrac23 (x+1)^{3/2}$? (fracción)",
      "correctAnswers": [
        "-4/15",
        "−4/15"
      ],
      "explanation": "$\\tfrac25 - \\tfrac23 = \\dfrac{6 - 10}{15} = -\\dfrac{4}{15}$."
    },
    {
      "id": "check-u",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Busca la función cuya derivada ya aparece."
        }
      ],
      "title": "¿Qué cambio?",
      "question": "Para calcular $\\int x\\,e^{x^2}\\,dx$, ¿qué cambio de variable conviene?",
      "choices": [
        {
          "id": "a",
          "label": "$u = x^2$"
        },
        {
          "id": "b",
          "label": "$u = x$",
          "incorrectFeedback": "Deja $e^{x^2}$ sin simplificar."
        },
        {
          "id": "c",
          "label": "$u = e^x$",
          "incorrectFeedback": "No simplifica el exponente $x^2$."
        },
        {
          "id": "d",
          "label": "$u = x e^{x^2}$",
          "incorrectFeedback": "No hay forma de integrar $du$ así."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$du = 2x\\,dx$ y queda $\\tfrac12\\int e^u\\,du = \\tfrac12 e^{x^2} + C$."
    },
    {
      "id": "check-raiz",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Calcula $du$."
        }
      ],
      "title": "Con una raíz",
      "question": "$\\int \\dfrac{e^{\\sqrt{x}}}{\\sqrt{x}}\\,dx = k\\,e^{\\sqrt{x}} + C$. ¿Cuánto vale $k$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "Con $u = \\sqrt{x}$, $du = \\dfrac{dx}{2\\sqrt{x}}$, luego $\\dfrac{dx}{\\sqrt{x}} = 2\\,du$."
    }
  ],
};
