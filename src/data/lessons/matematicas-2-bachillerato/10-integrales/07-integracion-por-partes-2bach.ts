import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_10_SUBTITLE } from "@/data/lessons/shared";

export const integracionPorPartes2bachLesson: InteractiveLesson = {
  slug: "integracion-por-partes-2bach",
  title: "7. Integración por partes",
  subtitle: TEMA_2BACH_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "formula",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Derivar uno, integrar el otro"
        }
      ],
      "title": "Derivar uno, integrar el otro",
      "blocks": [
        {
          "kind": "rule",
          "title": "Fórmula",
          "text": "Sale de la derivada de un producto:",
          "formula": "\\int u\\,dv = u\\,v - \\int v\\,du"
        },
        {
          "kind": "text",
          "text": "Se elige $u$ la parte que **se simplifica al derivar** (polinomio, logaritmo) y $dv$ la que se integra con facilidad (exponencial, seno, coseno). Regla práctica del orden: logaritmo, polinomio, exponencial, trigonométrica."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\int x\\,e^x\\,dx \\quad u = x,\\ dv = e^x\\,dx \\Rightarrow du = dx,\\ v = e^x",
              "note": "elección"
            },
            {
              "math": "= x\\,e^x - \\int e^x\\,dx = (x-1)\\,e^x + C"
            }
          ]
        }
      ]
    },
    {
      "id": "mas",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Dos más"
        }
      ],
      "title": "Dos más",
      "blocks": [
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\int x\\cos x\\,dx = x\\sin x - \\int \\sin x\\,dx = x\\sin x + \\cos x + C",
              "note": "$u=x$"
            },
            {
              "math": "\\int \\ln x\\,dx = x\\ln x - \\int 1\\,dx = x\\ln x - x + C",
              "note": "$u=\\ln x$, $dv=dx$"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "integral-metodos-explorador",
        "initial": [
          6,
          3
        ],
        "hint": "Partes con u = x y dv = eˣ dx."
      }
    },
    {
      "id": "check-u",
      "type": "classify",
      "help": [
        {
          "label": "Pista",
          "message": "Mira qué se simplifica al derivar."
        }
      ],
      "title": "¿Qué eliges como u?",
      "question": "Decide cómo abordar cada integral.",
      "groups": [
        {
          "id": "pol",
          "label": "u = polinomio",
          "tone": "emerald"
        },
        {
          "id": "ln",
          "label": "u = ln x",
          "tone": "amber"
        },
        {
          "id": "ninguna",
          "label": "No hace falta partes",
          "tone": "rose"
        }
      ],
      "items": [
        {
          "id": "a",
          "text": "$\\int x\\,e^x\\,dx$",
          "group": "pol"
        },
        {
          "id": "b",
          "text": "$\\int x\\cos x\\,dx$",
          "group": "pol"
        },
        {
          "id": "c",
          "text": "$\\int \\ln x\\,dx$",
          "group": "ln"
        },
        {
          "id": "d",
          "text": "$\\int x\\ln x\\,dx$",
          "group": "ln"
        },
        {
          "id": "e",
          "text": "$\\int x^2\\sin x\\,dx$",
          "group": "pol"
        },
        {
          "id": "f",
          "text": "$\\int 2x\\,e^{x^2}\\,dx$",
          "group": "ninguna"
        }
      ],
      "hint": "La última es casi inmediata: $e^{x^2}\\cdot (x^2)'$."
    },
    {
      "id": "check-xex",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$e^0 = 1$."
        }
      ],
      "title": "Valor de la primitiva",
      "question": "Con $C=0$, ¿cuánto vale $F(0)$ en $F(x) = (x-1)e^x$? (solo el número)",
      "correctAnswers": [
        "-1",
        "−1"
      ],
      "explanation": "$(0-1)\\cdot 1 = -1$."
    },
    {
      "id": "check-xcos",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\cos 0 = 1$."
        }
      ],
      "title": "Con coseno",
      "question": "Con $C=0$, ¿cuánto vale $F(0)$ en $F(x) = x\\sin x + \\cos x$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$0 + 1 = 1$."
    },
    {
      "id": "check-xlnx",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\ln 1 = 0$."
        }
      ],
      "title": "Otra",
      "question": "$\\int x\\ln x\\,dx = \\dfrac{x^2}{2}\\ln x - \\dfrac{x^2}{4} + C$. Con $C=0$, ¿cuánto vale $F(1)$? (fracción o decimal)",
      "correctAnswers": [
        "-1/4",
        "−1/4",
        "-0.25",
        "-0,25",
        "−0,25",
        "−0.25"
      ],
      "explanation": "$\\dfrac12\\cdot 0 - \\dfrac14 = -\\dfrac14$."
    }
  ],
};
