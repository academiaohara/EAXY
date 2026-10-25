import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_8_SUBTITLE } from "@/data/lessons/shared";

export const teoremaCentralLimiteCcss2Lesson: InteractiveLesson = {
  slug: "teorema-central-limite-ccss2",
  title: "4. Teorema central del límite",
  subtitle: TEMA_CCSS2_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "tcl",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "El teorema"
        }
      ],
      "title": "El teorema",
      "blocks": [
        {
          "kind": "rule",
          "title": "Teorema central del límite",
          "text": "Si una población tiene media $\\mu$ y desviación típica $\\sigma$ finitas, la distribución de la media muestral $\\bar{x}$ de muestras de tamaño $n$ tiene media $\\mu$ y desviación típica $\\dfrac{\\sigma}{\\sqrt{n}}$, y se aproxima a una normal cuando $n$ crece:",
          "formula": "\\bar{x} \\approx N\\!\\left(\\mu,\\ \\dfrac{\\sigma}{\\sqrt{n}}\\right)"
        },
        {
          "kind": "text",
          "text": "Si la población ya es normal, $\\bar{x}$ es exactamente normal para cualquier $n$. Si no lo es, se considera suficiente $n \\geq 30$."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "tcl-medias"
      }
    },
    {
      "id": "check-sd",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\sqrt{100} = 10$."
        }
      ],
      "title": "Desviación de la media",
      "question": "$\\mu = 10$, $\\sigma = 20$ y $n = 100$. ¿Cuánto vale $\\dfrac{\\sigma}{\\sqrt{n}}$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$\\dfrac{20}{10} = 2$: $\\bar{x} \\approx N(10;\\ 2)$."
    },
    {
      "id": "check-sd36",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\sqrt{36} = 6$."
        }
      ],
      "title": "Otra muestra",
      "question": "Con $\\sigma = 6$ y $n = 36$, ¿cuánto vale $\\sigma/\\sqrt{n}$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$\\dfrac{6}{6} = 1$."
    },
    {
      "id": "check-x4",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "La raíz de $4$ es $2$."
        }
      ],
      "title": "Reducir a la mitad",
      "question": "¿Cuántas veces hay que multiplicar el tamaño de la muestra para reducir a la mitad la desviación típica de $\\bar{x}$? (solo el número)",
      "correctAnswers": [
        "4"
      ],
      "explanation": "$\\dfrac{\\sigma}{\\sqrt{4n}} = \\dfrac12\\cdot\\dfrac{\\sigma}{\\sqrt{n}}$."
    },
    {
      "id": "check-n30",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Recuerda la condición sobre $n$."
        }
      ],
      "title": "¿Cuándo vale?",
      "question": "Una población **no normal** y una muestra de $n = 8$. Entonces $\\bar{x}$…",
      "choices": [
        {
          "id": "a",
          "label": "no tiene por qué ser aproximadamente normal: el teorema pide $n$ grande ($n \\geq 30$)"
        },
        {
          "id": "b",
          "label": "siempre sigue una normal exacta",
          "incorrectFeedback": "Solo si la población es normal."
        },
        {
          "id": "c",
          "label": "siempre tiene desviación típica $\\sigma$",
          "incorrectFeedback": "Tiene $\\sigma/\\sqrt{n}$."
        },
        {
          "id": "d",
          "label": "no tiene media",
          "incorrectFeedback": "Tiene la misma media $\\mu$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Con población no normal hace falta una muestra grande."
    }
  ],
};
