import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_8_SUBTITLE } from "@/data/lessons/shared";

export const intervaloConfianzaMediaCcss2Lesson: InteractiveLesson = {
  slug: "intervalo-confianza-media-ccss2",
  title: "8. Intervalo de confianza para la media",
  subtitle: TEMA_CCSS2_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "formula",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "La fórmula"
        }
      ],
      "title": "La fórmula",
      "blocks": [
        {
          "kind": "rule",
          "title": "Intervalo para la media",
          "text": "Con $\\sigma$ conocida y $n \\geq 30$ (o población normal), al nivel $1 - \\alpha$:",
          "formula": "\\left(\\bar{x} - z_{\\alpha/2}\\dfrac{\\sigma}{\\sqrt{n}},\\ \\ \\bar{x} + z_{\\alpha/2}\\dfrac{\\sigma}{\\sqrt{n}}\\right)"
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\sigma = 0{,}4,\\ n = 100,\\ \\bar{x} = 1{,}5,\\ 95\\,\\%:\\quad E = 1{,}96\\cdot\\dfrac{0{,}4}{10} = 0{,}0784"
            },
            {
              "math": "\\text{Intervalo } (1{,}4216;\\ 1{,}5784)"
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
        "hint": "x̄ = 100, σ = 15 y n = 100 al 95 %: error 2,94 e intervalo (97,06; 102,94)."
      }
    },
    {
      "id": "check-e",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\sigma/\\sqrt n = 0{,}04$."
        }
      ],
      "title": "El error",
      "question": "Con $\\bar{x} = 1{,}5$, $\\sigma = 0{,}4$, $n = 100$ y $95\\,\\%$, ¿cuánto vale $E = z\\,\\sigma/\\sqrt n$? (4 decimales)",
      "correctAnswers": [
        "0.0784",
        "0,0784"
      ],
      "explanation": "$1{,}96\\cdot0{,}04 = 0{,}0784$."
    },
    {
      "id": "check-inf",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Resta el error."
        }
      ],
      "title": "Extremo inferior",
      "question": "¿Cuál es el extremo inferior del intervalo? (4 decimales)",
      "correctAnswers": [
        "1.4216",
        "1,4216"
      ],
      "explanation": "$1{,}5 - 0{,}0784 = 1{,}4216$."
    },
    {
      "id": "check-sup",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\sqrt{400} = 20$."
        }
      ],
      "title": "Otra muestra",
      "question": "$\\sigma = 2$, $n = 400$ y $\\bar{x} = 50{,}5$ al $95\\,\\%$. ¿Cuál es el extremo superior? (3 decimales)",
      "correctAnswers": [
        "50.696",
        "50,696"
      ],
      "explanation": "$E = 1{,}96\\cdot\\dfrac{2}{20} = 0{,}196$ y $50{,}5 + 0{,}196 = 50{,}696$."
    },
    {
      "id": "check-98",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\sigma/\\sqrt n = 0{,}1$."
        }
      ],
      "title": "Más confianza",
      "question": "Con los mismos datos y un nivel del $98\\,\\%$ ($z = 2{,}33$), ¿cuánto vale el error máximo? (3 decimales)",
      "correctAnswers": [
        "0.233",
        "0,233"
      ],
      "explanation": "$2{,}33\\cdot0{,}1 = 0{,}233$: mayor que $0{,}196$."
    }
  ],
};
