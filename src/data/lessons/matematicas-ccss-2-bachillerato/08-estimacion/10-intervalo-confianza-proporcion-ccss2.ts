import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_8_SUBTITLE } from "@/data/lessons/shared";

export const intervaloConfianzaProporcionCcss2Lesson: InteractiveLesson = {
  slug: "intervalo-confianza-proporcion-ccss2",
  title: "10. Intervalo de confianza para una proporción",
  subtitle: TEMA_CCSS2_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "construccion",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Fórmula y ejemplo"
        }
      ],
      "title": "Fórmula y ejemplo",
      "blocks": [
        {
          "kind": "rule",
          "title": "Intervalo para la proporción",
          "text": "Con muestras grandes, al nivel $1 - \\alpha$:",
          "formula": "\\left(\\hat p - z_{\\alpha/2}\\sqrt{\\dfrac{\\hat p\\,\\hat q}{n}},\\ \\ \\hat p + z_{\\alpha/2}\\sqrt{\\dfrac{\\hat p\\,\\hat q}{n}}\\right)"
        },
        {
          "kind": "text",
          "text": "El **tamaño mínimo** para un error máximo $E$ es $n \\geq \\dfrac{z_{\\alpha/2}^2\\,p\\,q}{E^2}$. Si no se conoce $p$, se toma $p = 0{,}5$, que hace máximo el producto $pq$ y da la muestra más prudente."
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
          "message": "Explóralo"
        }
      ],
      "title": "Explóralo",
      "blocks": [
        {
          "kind": "text",
          "text": "Cambia $\\hat p$, el tamaño de la muestra y la confianza, y activa la simulación para ver cuántos intervalos contienen el valor real."
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
        "hint": "p̂ = 0,35 y n = 2000 al 95 %: (0,329; 0,371)."
      }
    },
    {
      "id": "check-e",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\sqrt{0{,}2275/2000}$."
        }
      ],
      "title": "Error máximo",
      "question": "Con $\\hat p = 0{,}35$, $n = 2000$ y $z = 1{,}96$, ¿cuánto vale $E$? (3 decimales)",
      "correctAnswers": [
        "0.021",
        "0,021"
      ],
      "explanation": "$1{,}96\\sqrt{\\dfrac{0{,}35\\cdot0{,}65}{2000}} = 0{,}0209 \\approx 0{,}021$."
    },
    {
      "id": "check-n",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Usa $p = q = 0{,}5$."
        }
      ],
      "title": "Tamaño mínimo",
      "question": "¿Qué tamaño mínimo asegura un error de $0{,}03$ al $95\\,\\%$ si no se conoce $p$? (entero)",
      "correctAnswers": [
        "1068"
      ],
      "explanation": "$n \\geq \\dfrac{1{,}96^2\\cdot0{,}25}{0{,}03^2} = 1067{,}11 \\Rightarrow 1\\,068$."
    },
    {
      "id": "check-n99",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Redondea hacia arriba."
        }
      ],
      "title": "Más exigente",
      "question": "¿Y con error $0{,}02$ al $99\\,\\%$ ($z = 2{,}575$)? (entero)",
      "correctAnswers": [
        "4145"
      ],
      "explanation": "$\\dfrac{2{,}575^2\\cdot0{,}25}{0{,}02^2} = 4144{,}14 \\Rightarrow 4\\,145$."
    },
    {
      "id": "check-p05",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en la parábola $p(1-p)$."
        }
      ],
      "title": "¿Por qué p = 0,5?",
      "question": "Si no se conoce $p$, se usa $p = 0{,}5$ en el cálculo del tamaño porque…",
      "choices": [
        {
          "id": "a",
          "label": "es el valor que hace máximo $pq$, así la muestra será suficiente sea cual sea $p$"
        },
        {
          "id": "b",
          "label": "es el valor más probable de $p$",
          "incorrectFeedback": "No hay motivo para que sea el más probable."
        },
        {
          "id": "c",
          "label": "hace mínimo el error",
          "incorrectFeedback": "Hace máximo el error, por eso es prudente."
        },
        {
          "id": "d",
          "label": "es obligatorio por el teorema central del límite",
          "incorrectFeedback": "Es una elección de prudencia."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$p(1-p)$ es máximo en $p = 0{,}5$."
    }
  ],
};
