import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_6_SUBTITLE } from "@/data/lessons/shared";

export const primitivaIntegralIndefinidaCcss2Lesson: InteractiveLesson = {
  slug: "primitiva-integral-indefinida-ccss2",
  title: "1. Primitiva e integral indefinida",
  subtitle: TEMA_CCSS2_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "primitiva",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Hacer la derivada al revés"
        }
      ],
      "title": "Hacer la derivada al revés",
      "blocks": [
        {
          "kind": "definition",
          "text": "Una **primitiva** de $f(x)$ es una función $F(x)$ tal que $F'(x) = f(x)$."
        },
        {
          "kind": "text",
          "text": "Si $F$ es una primitiva de $f$, también lo es $F + C$ para cualquier constante $C$, porque la derivada de una constante es $0$. Por eso hay **infinitas** primitivas, todas trasladadas en vertical."
        },
        {
          "kind": "rule",
          "title": "Integral indefinida",
          "text": "Es el conjunto de todas las primitivas de $f$:",
          "formula": "\\int f(x)\\,dx = F(x) + C"
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "primitiva-familia"
      }
    },
    {
      "id": "ejemplo",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Comprobar una primitiva"
        }
      ],
      "title": "Comprobar una primitiva",
      "blocks": [
        {
          "kind": "text",
          "text": "Para comprobar si $F$ es primitiva de $f$ basta **derivar $F$** y ver si sale $f$."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "F(x) = x^3 - \\tfrac12 x^2 + 3x \\ \\Rightarrow\\ F'(x) = 3x^2 - x + 3"
            },
            {
              "math": "\\text{Es una primitiva de } f(x) = 3x^2 - x + 3"
            }
          ]
        },
        {
          "kind": "warning",
          "text": "En $\\int f(x)\\,dx$ el $dx$ indica la variable respecto a la que se integra; no se puede omitir."
        }
      ]
    },
    {
      "id": "check-primitiva",
      "type": "classify",
      "help": [
        {
          "label": "Pista",
          "message": "Deriva cada $F$."
        }
      ],
      "title": "¿Es una primitiva?",
      "question": "Decide si $F$ es una primitiva de $f$.",
      "groups": [
        {
          "id": "si",
          "label": "Sí lo es",
          "tone": "emerald"
        },
        {
          "id": "no",
          "label": "No lo es",
          "tone": "rose"
        }
      ],
      "items": [
        {
          "id": "a",
          "text": "$F = x^3$ de $f = 3x^2$",
          "group": "si"
        },
        {
          "id": "b",
          "text": "$F = x^3 + 7$ de $f = 3x^2$",
          "group": "si"
        },
        {
          "id": "c",
          "text": "$F = \\dfrac{x^3}{3}$ de $f = 3x^2$",
          "group": "no"
        },
        {
          "id": "d",
          "text": "$F = \\ln|x|$ de $f = \\dfrac1x$",
          "group": "si"
        },
        {
          "id": "e",
          "text": "$F = \\cos x$ de $f = \\sin x$",
          "group": "no"
        },
        {
          "id": "f",
          "text": "$F = e^x + 1$ de $f = e^x$",
          "group": "si"
        }
      ],
      "hint": "Derivando $\\cos x$ sale $-\\sin x$, y $\\left(\\tfrac{x^3}{3}\\right)' = x^2$."
    },
    {
      "id": "check-valor",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Una primitiva de $4x^3$ es $x^4$."
        }
      ],
      "title": "Una primitiva concreta",
      "question": "Calcula la primitiva $F$ de $f(x) = 4x^3$ con $F(0) = 0$ y da el valor $F(2)$. (solo el número)",
      "correctAnswers": [
        "16"
      ],
      "explanation": "$F(x) = x^4 + C$ y $F(0) = 0 \\Rightarrow C = 0$. Entonces $F(2) = 2^4 = 16$."
    },
    {
      "id": "check-valor2",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $x = 2$."
        }
      ],
      "title": "Con dos términos",
      "question": "Una primitiva de $f(x) = 3x^2 + 2x$ con $F(0) = 0$ es $F(x) = x^3 + x^2$. ¿Cuánto vale $F(2)$? (solo el número)",
      "correctAnswers": [
        "12"
      ],
      "explanation": "$F(2) = 8 + 4 = 12$."
    },
    {
      "id": "check-c",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en la derivada de una constante."
        }
      ],
      "title": "¿Por qué +C?",
      "question": "¿Por qué escribimos $+\\,C$ en una integral indefinida?",
      "choices": [
        {
          "id": "a",
          "label": "Porque todas las funciones $F + C$ tienen la misma derivada $f$"
        },
        {
          "id": "b",
          "label": "Porque la integral siempre vale $C$",
          "incorrectFeedback": "$C$ es una constante arbitraria, no un resultado fijo."
        },
        {
          "id": "c",
          "label": "Porque así se simplifican los cálculos",
          "incorrectFeedback": "No es una convención de cálculo, sino de matemáticas: describe todas las primitivas."
        },
        {
          "id": "d",
          "label": "Porque $C$ es la derivada de $F$",
          "incorrectFeedback": "La derivada de $F$ es $f$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Sumar una constante no cambia la derivada, así que hay infinitas primitivas."
    }
  ],
};
