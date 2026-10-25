import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_10_SUBTITLE } from "@/data/lessons/shared";

export const integralesCadena2bachLesson: InteractiveLesson = {
  slug: "integrales-cadena-2bach",
  title: "5. Integrales casi inmediatas",
  subtitle: TEMA_2BACH_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "cadena",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "La regla de la cadena al revés"
        }
      ],
      "title": "La regla de la cadena al revés",
      "blocks": [
        {
          "kind": "text",
          "text": "Si en el integrando aparece una función $f(x)$ **y su derivada** $f'(x)$, la integral es inmediata:"
        },
        {
          "kind": "facts",
          "items": [
            {
              "tex": "\\int [f(x)]^n f'(x)\\,dx = \\dfrac{[f(x)]^{n+1}}{n+1} + C",
              "label": "$n \\neq -1$"
            },
            {
              "tex": "\\int \\dfrac{f'(x)}{f(x)}\\,dx = \\ln|f(x)| + C",
              "label": "logaritmo"
            },
            {
              "tex": "\\int e^{f(x)} f'(x)\\,dx = e^{f(x)} + C",
              "label": "exponencial"
            },
            {
              "tex": "\\int \\cos f(x) \\cdot f'(x)\\,dx = \\sin f(x) + C",
              "label": "trigonométrica"
            }
          ]
        },
        {
          "kind": "warning",
          "text": "Solo se puede **multiplicar y dividir por un número** para completar la derivada, nunca por una expresión que dependa de $x$."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "integral-metodos-explorador",
        "initial": [
          4,
          3
        ],
        "hint": "Completar la derivada con un factor numérico."
      }
    },
    {
      "id": "ejemplos",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Completar la derivada"
        }
      ],
      "title": "Completar la derivada",
      "blocks": [
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\int (x^2+2)^5\\, x\\,dx = \\tfrac12\\int (x^2+2)^5\\, 2x\\,dx",
              "note": "la derivada de $x^2+2$ es $2x$: falta el $2$"
            },
            {
              "math": "= \\dfrac12 \\cdot \\dfrac{(x^2+2)^6}{6} + C = \\dfrac{(x^2+2)^6}{12} + C"
            },
            {
              "math": "\\int e^{5x}\\,dx = \\tfrac15\\int e^{5x}\\cdot 5\\,dx = \\dfrac{e^{5x}}{5} + C",
              "note": "la derivada de $5x$ es $5$"
            },
            {
              "math": "\\int \\dfrac{-4}{9-4x}\\,dx = \\ln|9-4x| + C",
              "note": "el numerador ya es la derivada"
            }
          ]
        }
      ]
    },
    {
      "id": "check-v",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$(1^2 + 1)^4 = 16$."
        }
      ],
      "title": "Valor de una primitiva",
      "question": "$F(x) = \\dfrac{(x^2+1)^4}{2}$ es primitiva de $4x(x^2+1)^3$. ¿Cuánto vale $F(1)$? (solo el número)",
      "correctAnswers": [
        "8"
      ],
      "explanation": "$\\dfrac{2^4}{2} = 8$."
    },
    {
      "id": "check-k",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Compara $6x^2$ con $3x^2$."
        }
      ],
      "title": "Coeficiente del logaritmo",
      "question": "$\\int \\dfrac{6x^2}{x^3+1}\\,dx = k\\ln|x^3+1| + C$. ¿Cuánto vale $k$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "La derivada de $x^3+1$ es $3x^2$, y $6x^2 = 2\\cdot 3x^2$."
    },
    {
      "id": "check-d",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Deriva $\\sin(3x)$."
        }
      ],
      "title": "Dividir entre el exponente",
      "question": "$\\int \\cos(3x)\\,dx = \\dfrac{1}{d}\\sin(3x) + C$. ¿Cuánto vale $d$? (solo el número)",
      "correctAnswers": [
        "3"
      ],
      "explanation": "La derivada de $3x$ es $3$: hay que dividir entre $3$."
    },
    {
      "id": "check-choice",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Compara con $x^2 e^{x^3}$."
        }
      ],
      "title": "¿Por qué no sirve?",
      "question": "¿Puedes calcular $\\int x\\,e^{x^3}\\,dx$ multiplicando y dividiendo por un número?",
      "choices": [
        {
          "id": "a",
          "label": "No: la derivada de $x^3$ es $3x^2$, no un múltiplo de $x$"
        },
        {
          "id": "b",
          "label": "Sí, dividiendo entre $3$",
          "incorrectFeedback": "Haría falta $x^2$, no $x$."
        },
        {
          "id": "c",
          "label": "Sí, siempre que haya una exponencial",
          "incorrectFeedback": "Hay que tener la derivada del exponente."
        },
        {
          "id": "d",
          "label": "Sí, con la regla de la potencia",
          "incorrectFeedback": "El exponente no es una potencia de $x$ en la base."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "No es casi inmediata: hay otras técnicas (partes, cambio)."
    }
  ],
};
