import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_12_SUBTITLE } from "@/data/lessons/shared";

export const intervaloConfianzaProporcion2bachLesson: InteractiveLesson = {
  slug: "intervalo-confianza-proporcion-2bach",
  title: "11. Intervalos de confianza para una proporción",
  subtitle: TEMA_2BACH_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "construccion",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "De una muestra a la población"
        }
      ],
      "title": "De una muestra a la población",
      "blocks": [
        {
          "kind": "text",
          "text": "Con una muestra de tamaño $n$ en la que la proporción observada es $\\hat p$, la proporción real $p$ de la población se acota por"
        },
        {
          "kind": "formula",
          "tex": "\\left(\\hat p - z_{\\alpha/2}\\sqrt{\\dfrac{\\hat p\\,(1-\\hat p)}{n}},\\ \\ \\hat p + z_{\\alpha/2}\\sqrt{\\dfrac{\\hat p\\,(1-\\hat p)}{n}}\\right)"
        },
        {
          "kind": "facts",
          "items": [
            {
              "tex": "z = 1{,}645",
              "label": "90 % de confianza"
            },
            {
              "tex": "z = 1{,}96",
              "label": "95 % de confianza"
            },
            {
              "tex": "z = 2{,}575",
              "label": "99 % de confianza"
            }
          ]
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "intervalo-confianza-construccion"
      }
    },
    {
      "id": "explora",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Explora el intervalo"
        }
      ],
      "title": "Explora el intervalo",
      "blocks": [
        {
          "kind": "text",
          "text": "Cambia $n$ y el nivel de confianza: con más muestra el intervalo se estrecha; con más confianza, se ensancha. La simulación muestra que, de muchas muestras, un $95\\,\\%$ de los intervalos contiene la proporción real."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "intervalo-confianza-explorador",
        "initial": [
          350,
          2000,
          1,
          0
        ],
        "hint": "Con p̂ = 0,35 y n = 2000 al 95 %: intervalo (0,329; 0,371)."
      }
    },
    {
      "id": "check-error",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\sqrt{0{,}35\\cdot0{,}65/2000}$."
        }
      ],
      "title": "Error máximo",
      "question": "Con $\\hat p = 0{,}35$, $n = 2000$ y $z = 1{,}96$, ¿cuánto vale el error máximo $E$? (3 decimales)",
      "correctAnswers": [
        "0.021",
        "0,021"
      ],
      "explanation": "$E = 1{,}96\\sqrt{\\dfrac{0{,}35\\cdot0{,}65}{2000}} = 1{,}96\\cdot 0{,}01067 \\approx 0{,}0209 \\approx 0{,}021$."
    },
    {
      "id": "check-inf",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Resta el error a $\\hat p$."
        }
      ],
      "title": "Extremo inferior",
      "question": "Con los mismos datos, ¿cuál es el extremo inferior del intervalo? (3 decimales)",
      "correctAnswers": [
        "0.329",
        "0,329"
      ],
      "explanation": "$0{,}35 - 0{,}0209 = 0{,}3291 \\approx 0{,}329$."
    },
    {
      "id": "check-z99",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Mira la lista de valores críticos."
        }
      ],
      "title": "Más confianza",
      "question": "¿Qué valor de $z$ se usa para un nivel de confianza del $99\\,\\%$? (decimal)",
      "correctAnswers": [
        "2.575",
        "2,575"
      ],
      "explanation": "$z_{\\alpha/2} = 2{,}575$."
    },
    {
      "id": "check-n",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Fíjate en la raíz."
        }
      ],
      "title": "Más muestra",
      "question": "Si se multiplica por $4$ el tamaño de la muestra, el error máximo…",
      "choices": [
        {
          "id": "a",
          "label": "se reduce a la mitad"
        },
        {
          "id": "b",
          "label": "se reduce a la cuarta parte",
          "incorrectFeedback": "El error es proporcional a $1/\\sqrt{n}$."
        },
        {
          "id": "c",
          "label": "no cambia",
          "incorrectFeedback": "Depende del tamaño de la muestra."
        },
        {
          "id": "d",
          "label": "se duplica",
          "incorrectFeedback": "Aumentar la muestra disminuye el error."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$E \\propto \\dfrac{1}{\\sqrt{n}}$: con $4n$ queda $\\dfrac12 E$."
    }
  ],
};
