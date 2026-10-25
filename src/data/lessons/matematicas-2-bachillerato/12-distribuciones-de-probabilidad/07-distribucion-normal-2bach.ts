import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_12_SUBTITLE } from "@/data/lessons/shared";

export const distribucionNormal2bachLesson: InteractiveLesson = {
  slug: "distribucion-normal-2bach",
  title: "7. La distribución normal",
  subtitle: TEMA_2BACH_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "normal",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "La campana de Gauss"
        }
      ],
      "title": "La campana de Gauss",
      "blocks": [
        {
          "kind": "text",
          "text": "La **normal** $N(\\mu, \\sigma)$ tiene densidad en forma de campana: es **simétrica** respecto de $\\mu$, tiene su máximo en $\\mu$, puntos de inflexión en $\\mu \\pm \\sigma$ y el área total vale $1$."
        },
        {
          "kind": "facts",
          "items": [
            {
              "tex": "P(\\mu - \\sigma < X < \\mu + \\sigma) \\approx 0{,}683",
              "label": "68,3 %"
            },
            {
              "tex": "P(\\mu - 2\\sigma < X < \\mu + 2\\sigma) \\approx 0{,}954",
              "label": "95,4 %"
            },
            {
              "tex": "P(\\mu - 3\\sigma < X < \\mu + 3\\sigma) \\approx 0{,}997",
              "label": "99,7 %"
            }
          ]
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "campana-normal"
      }
    },
    {
      "id": "explora",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Explora la normal"
        }
      ],
      "title": "Explora la normal",
      "blocks": [
        {
          "kind": "text",
          "text": "Mueve $\\mu$ y $\\sigma$ y selecciona un intervalo: el área sombreada es la probabilidad."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "normal-explorador",
        "initial": [
          100,
          15,
          85,
          115,
          0
        ],
        "hint": "En N(100, 15) el intervalo (85, 115) está a una desviación de la media: probabilidad ≈ 68,3 %."
      }
    },
    {
      "id": "check-p68",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$100 \\pm 15$."
        }
      ],
      "title": "Regla 68-95-99,7",
      "question": "Las puntuaciones siguen $N(100,\\ 15)$. ¿Qué porcentaje está entre $85$ y $115$? (una cifra decimal)",
      "correctAnswers": [
        "68.3",
        "68,3"
      ],
      "explanation": "$85$ y $115$ son $\\mu \\pm \\sigma$: $68{,}3\\,\\%$."
    },
    {
      "id": "check-p95",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$100 \\pm 30$."
        }
      ],
      "title": "Dos desviaciones",
      "question": "En la misma distribución, ¿qué porcentaje está entre $70$ y $130$? (una cifra decimal)",
      "correctAnswers": [
        "95.4",
        "95,4"
      ],
      "explanation": "$\\mu \\pm 2\\sigma$: $95{,}4\\,\\%$."
    },
    {
      "id": "check-mitad",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "La mitad del área."
        }
      ],
      "title": "Simetría",
      "question": "En una normal, ¿cuánto vale $P(X < \\mu)$? (decimal)",
      "correctAnswers": [
        "0.5",
        "0,5",
        "1/2"
      ],
      "explanation": "La campana es simétrica respecto de $\\mu$."
    },
    {
      "id": "check-sigma",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Mira el explorador."
        }
      ],
      "title": "Efecto de σ",
      "question": "Si aumentamos $\\sigma$ manteniendo $\\mu$, la campana…",
      "choices": [
        {
          "id": "a",
          "label": "se ensancha y se hace más baja"
        },
        {
          "id": "b",
          "label": "se estrecha y se hace más alta",
          "incorrectFeedback": "Eso ocurre al disminuir $\\sigma$."
        },
        {
          "id": "c",
          "label": "se desplaza a la derecha",
          "incorrectFeedback": "El centro lo marca $\\mu$."
        },
        {
          "id": "d",
          "label": "no cambia",
          "incorrectFeedback": "El área total sigue siendo $1$, pero la forma sí cambia."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "El área total es $1$: más ancha obliga a ser más baja."
    }
  ],
};
