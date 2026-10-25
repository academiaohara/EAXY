import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_8_SUBTITLE } from "@/data/lessons/shared";

export const errorConfianzaTamanoCcss2Lesson: InteractiveLesson = {
  slug: "error-confianza-tamano-ccss2",
  title: "9. Error máximo, nivel de confianza y tamaño",
  subtitle: TEMA_CCSS2_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "relacion",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Tres magnitudes ligadas"
        }
      ],
      "title": "Tres magnitudes ligadas",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "E = z_{\\alpha/2}\\,\\dfrac{\\sigma}{\\sqrt{n}}",
              "label": "error máximo admisible"
            },
            {
              "tex": "n \\geq \\left(\\dfrac{z_{\\alpha/2}\\,\\sigma}{E}\\right)^2",
              "label": "tamaño mínimo de la muestra (se redondea hacia arriba)"
            },
            {
              "tex": "z = \\dfrac{E\\sqrt{n}}{\\sigma}",
              "label": "con este $z$, el nivel de confianza es $2P(Z \\leq z) - 1$"
            }
          ]
        },
        {
          "kind": "text",
          "text": "Menos error o más confianza exigen **más muestra**. Con el mismo $n$, más confianza implica más error."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "intervalo-media-explorador",
        "initial": [
          100,
          15,
          7,
          0
        ],
        "hint": "Cambia el nivel de confianza: al 90 % el error es menor (2,468); al 99 %, mayor."
      }
    },
    {
      "id": "check-n",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Redondea hacia arriba."
        }
      ],
      "title": "Tamaño mínimo",
      "question": "$\\sigma = 2$, $E = 0{,}1$ y $95\\,\\%$. ¿Cuál es el tamaño mínimo de la muestra? (entero)",
      "correctAnswers": [
        "1537"
      ],
      "explanation": "$n \\geq \\left(\\dfrac{1{,}96\\cdot2}{0{,}1}\\right)^2 = 39{,}2^2 = 1536{,}64 \\Rightarrow 1\\,537$."
    },
    {
      "id": "check-n2",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\dfrac{1{,}96\\cdot4}{0{,}1} = 78{,}4$."
        }
      ],
      "title": "Con σ = 4",
      "question": "Con $\\sigma = 4$, $E = 0{,}1$ y $95\\,\\%$, ¿qué tamaño mínimo hace falta? (entero)",
      "correctAnswers": [
        "6147"
      ],
      "explanation": "$(1{,}96\\cdot40)^2 = 78{,}4^2 = 6146{,}56 \\Rightarrow 6\\,147$."
    },
    {
      "id": "check-conf",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Con $z = 1$: $2P(Z \\leq z) - 1$."
        }
      ],
      "title": "Nivel de confianza",
      "question": "$\\sigma = 1$, $E = 0{,}1$ y $n = 100$. ¿Qué nivel de confianza se obtiene? (porcentaje con 2 decimales)",
      "correctAnswers": [
        "68.26",
        "68,26",
        "68.3",
        "68,3"
      ],
      "explanation": "$z = \\dfrac{E\\sqrt{n}}{\\sigma} = 1$ y $1 - \\alpha = P(-1 < Z < 1) = 2\\cdot0{,}8413 - 1 = 0{,}6826$: confianza del $68{,}26\\,\\%$."
    },
    {
      "id": "check-mitad",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Fíjate en $\\sqrt n$."
        }
      ],
      "title": "Mitad de error",
      "question": "Para reducir a la mitad el error máximo, manteniendo el nivel de confianza, hay que…",
      "choices": [
        {
          "id": "a",
          "label": "multiplicar por $4$ el tamaño de la muestra"
        },
        {
          "id": "b",
          "label": "duplicar el tamaño de la muestra",
          "incorrectFeedback": "El error depende de $1/\\sqrt{n}$."
        },
        {
          "id": "c",
          "label": "dividir por $2$ la desviación típica poblacional",
          "incorrectFeedback": "$\\sigma$ no se puede elegir."
        },
        {
          "id": "d",
          "label": "aumentar el nivel de confianza",
          "incorrectFeedback": "Eso aumenta el error."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$n \\to 4n$ divide $E$ entre $2$."
    }
  ],
};
