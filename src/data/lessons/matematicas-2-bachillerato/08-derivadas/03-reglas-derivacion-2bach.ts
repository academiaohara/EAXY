import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_8_SUBTITLE } from "@/data/lessons/shared";

export const reglasDerivacion2bachLesson: InteractiveLesson = {
  slug: "reglas-derivacion-2bach",
  title: "3. Reglas de derivación: suma, producto y cociente",
  subtitle: TEMA_2BACH_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "tabla",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Derivadas básicas y operaciones"
        }
      ],
      "title": "Derivadas básicas y operaciones",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "(x^n)' = n x^{n-1}",
              "label": "potencia"
            },
            {
              "tex": "(e^x)' = e^x,\\quad (\\ln x)' = \\tfrac1x",
              "label": "exponencial y logaritmo"
            },
            {
              "tex": "(\\sin x)' = \\cos x,\\quad (\\cos x)' = -\\sin x",
              "label": "trigonométricas"
            }
          ]
        },
        {
          "kind": "facts",
          "items": [
            {
              "tex": "(f \\pm g)' = f' \\pm g'",
              "label": "suma"
            },
            {
              "tex": "(f\\cdot g)' = f'g + fg'",
              "label": "producto"
            },
            {
              "tex": "\\left(\\dfrac{f}{g}\\right)' = \\dfrac{f'g - fg'}{g^2}",
              "label": "cociente"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "producto-cociente-explorador",
        "initial": [
          0,
          5,
          0,
          2
        ],
        "hint": "Producto de x² por eˣ: (x² eˣ)′ = 2x eˣ + x² eˣ."
      }
    },
    {
      "id": "check-suma",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Deriva cada término."
        }
      ],
      "title": "Una suma",
      "question": "Si $f(x) = 5x^2 - 3x + 1$, ¿cuánto vale $f'(2)$? (solo el número)",
      "correctAnswers": [
        "17"
      ],
      "explanation": "$f'(x) = 10x - 3$ y $f'(2) = 17$."
    },
    {
      "id": "check-prod",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$(x)'e^x + x(e^x)'$."
        }
      ],
      "title": "Un producto",
      "question": "Si $f(x) = x\\,e^x$, ¿cuánto vale $f'(0)$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$f'(x) = e^x + x e^x$ y $f'(0) = 1$."
    },
    {
      "id": "check-coc",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Numerador: $f'g - fg'$."
        }
      ],
      "title": "Un cociente",
      "question": "Si $f(x) = \\dfrac{x^2}{x + 1}$, ¿cuánto vale $f'(1)$? (decimal o fracción)",
      "correctAnswers": [
        "3/4",
        "0.75",
        "0,75"
      ],
      "explanation": "$f'(x) = \\dfrac{2x(x + 1) - x^2}{(x + 1)^2} = \\dfrac{x^2 + 2x}{(x + 1)^2}$ y $f'(1) = \\dfrac{3}{4}$."
    },
    {
      "id": "check-error",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Recuerda la regla."
        }
      ],
      "title": "Error típico",
      "question": "La derivada de $f(x)\\cdot g(x)$ es…",
      "choices": [
        {
          "id": "a",
          "label": "$f'(x)g(x) + f(x)g'(x)$"
        },
        {
          "id": "b",
          "label": "$f'(x)\\\\,g'(x)$",
          "incorrectFeedback": "Eso sería derivar «cada factor y multiplicar», que no es correcto."
        },
        {
          "id": "c",
          "label": "$f'(x)g(x) - f(x)g'(x)$",
          "incorrectFeedback": "Esa es la forma del numerador del cociente."
        },
        {
          "id": "d",
          "label": "$f(x)g(x)$",
          "incorrectFeedback": "Eso no es una derivada."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Regla del producto: derivada del primero por el segundo más el primero por la derivada del segundo."
    }
  ],
};
