import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_12_SUBTITLE } from "@/data/lessons/shared";

export const intervaloConfianzaMedia2bachLesson: InteractiveLesson = {
  slug: "intervalo-confianza-media-2bach",
  title: "12. Intervalo de confianza para la media",
  subtitle: TEMA_2BACH_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "media",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Estimar una media"
        }
      ],
      "title": "Estimar una media",
      "blocks": [
        {
          "kind": "text",
          "text": "Si la población es $N(\\mu, \\sigma)$ y se toma una muestra de tamaño $n$ con media $\\bar x$, la media muestral sigue $N\\!\\left(\\mu, \\dfrac{\\sigma}{\\sqrt n}\\right)$. El **intervalo de confianza** para $\\mu$ es"
        },
        {
          "kind": "formula",
          "tex": "\\left(\\bar x - z\\,\\dfrac{\\sigma}{\\sqrt n},\\ \\ \\bar x + z\\,\\dfrac{\\sigma}{\\sqrt n}\\right)"
        },
        {
          "kind": "text",
          "text": "El **error máximo** es $E = z\\,\\dfrac{\\sigma}{\\sqrt n}$. Para garantizar un error menor que $E$: $n \\geq \\left(\\dfrac{z\\,\\sigma}{E}\\right)^2$."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\bar x = 100,\\ \\sigma = 15,\\ n = 100,\\ 95\\,\\%:\\quad E = 1{,}96\\cdot\\dfrac{15}{10} = 2{,}94"
            },
            {
              "math": "\\text{Intervalo } (97{,}06;\\ 102{,}94)"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "intervalo-media-explorador",
        "initial": [
          100,
          15,
          7,
          1
        ],
        "hint": "x̄ = 100, σ = 15, n = 100 y 95 %: error 2,94 e intervalo (97,06; 102,94)."
      }
    },
    {
      "id": "check-e",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\sqrt{100} = 10$."
        }
      ],
      "title": "Error máximo",
      "question": "Con $\\bar x = 100$, $\\sigma = 15$, $n = 100$ y $z = 1{,}96$, ¿cuánto vale $E$? (decimal)",
      "correctAnswers": [
        "2.94",
        "2,94"
      ],
      "explanation": "$1{,}96\\cdot\\dfrac{15}{\\sqrt{100}} = 1{,}96\\cdot1{,}5 = 2{,}94$."
    },
    {
      "id": "check-sup",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Suma el error a $\\bar x$."
        }
      ],
      "title": "Extremo superior",
      "question": "¿Cuál es el extremo superior del intervalo? (decimal)",
      "correctAnswers": [
        "102.94",
        "102,94"
      ],
      "explanation": "$100 + 2{,}94 = 102{,}94$."
    },
    {
      "id": "check-99",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "El error crece con la confianza."
        }
      ],
      "title": "Al 99 %",
      "question": "Con los mismos datos pero $z = 2{,}575$, ¿cuánto vale $E$? (dos decimales)",
      "correctAnswers": [
        "3.86",
        "3,86"
      ],
      "explanation": "$2{,}575\\cdot 1{,}5 = 3{,}8625 \\approx 3{,}86$."
    },
    {
      "id": "check-n",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Despeja $n$ y redondea hacia arriba."
        }
      ],
      "title": "Tamaño de la muestra",
      "question": "Con $\\sigma = 15$ y $z = 1{,}96$, ¿qué tamaño mínimo de muestra asegura un error máximo de $1$? (entero)",
      "correctAnswers": [
        "865"
      ],
      "explanation": "$n \\geq (1{,}96\\cdot15/1)^2 = 864{,}36$, luego $n = 865$."
    },
    {
      "id": "check-ancho",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Mira la fórmula del error."
        }
      ],
      "title": "Precisión",
      "question": "¿Qué hace que un intervalo de confianza sea **más estrecho**?",
      "choices": [
        {
          "id": "a",
          "label": "Aumentar el tamaño de la muestra o bajar el nivel de confianza"
        },
        {
          "id": "b",
          "label": "Aumentar $\\sigma$",
          "incorrectFeedback": "Una población más dispersa da más error."
        },
        {
          "id": "c",
          "label": "Aumentar el nivel de confianza",
          "incorrectFeedback": "$z$ crece y el intervalo se ensancha."
        },
        {
          "id": "d",
          "label": "Disminuir el tamaño de la muestra",
          "incorrectFeedback": "Más error: el intervalo se ensancha."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$E = z\\sigma/\\sqrt n$: menor $z$ o mayor $n$ reducen el error."
    }
  ],
};
