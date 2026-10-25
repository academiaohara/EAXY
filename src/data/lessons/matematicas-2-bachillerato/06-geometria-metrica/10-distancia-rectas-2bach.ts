import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_6_SUBTITLE } from "@/data/lessons/shared";

export const distanciaRectas2bachLesson: InteractiveLesson = {
  slug: "distancia-rectas-2bach",
  title: "10. Distancia entre dos rectas",
  subtitle: TEMA_2BACH_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "cruzan",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Rectas que se cruzan"
        }
      ],
      "title": "Rectas que se cruzan",
      "blocks": [
        {
          "kind": "rule",
          "formula": "d(r, s) = \\dfrac{\\left|[\\vec{u}, \\vec{v}, \\overrightarrow{PQ}]\\right|}{|\\vec{u}\\times\\vec{v}|}"
        },
        {
          "kind": "text",
          "text": "Es la altura del paralelepípedo que forman $\\vec{u}$, $\\vec{v}$ y $\\overrightarrow{PQ}$ (volumen entre área de la base). Si son **paralelas**, se toma un punto de una y se calcula su distancia a la otra; si se cortan, $d = 0$."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "distancia-rectas-cruzan-3d",
        "params": {
          "nums": [
            0,
            0,
            0,
            3,
            0,
            0,
            0,
            0,
            3,
            0,
            3,
            0
          ]
        }
      }
    },
    {
      "id": "check-cruzan",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Una está en $z = 0$ y la otra en $z = 5$."
        }
      ],
      "title": "Dos rectas que se cruzan",
      "question": "Las rectas $(0,0,0) + t\\,(1,0,0)$ y $(0,0,5) + s\\,(0,1,0)$ se cruzan. ¿Qué distancia hay entre ellas? (solo el número)",
      "correctAnswers": [
        "5"
      ],
      "explanation": "$[\\vec{u}, \\vec{v}, \\overrightarrow{PQ}] = 5$ y $|\\vec{u}\\times\\vec{v}| = 1$: $d = 5$."
    },
    {
      "id": "check-2",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Divide entre el módulo $2$."
        }
      ],
      "title": "Otra pareja",
      "question": "Para $\\vec{u} = (1, 1, 0)$, $\\vec{v} = (1, -1, 0)$ y $\\overrightarrow{PQ} = (0, 0, 2)$, el producto mixto vale $-4$ y $\\vec{u}\\times\\vec{v} = (0, 0, -2)$. ¿Cuánto vale la distancia? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$d = \\dfrac{|-4|}{2} = 2$."
    },
    {
      "id": "check-par",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Pitágoras con $y$ y $z$."
        }
      ],
      "title": "Rectas paralelas",
      "question": "¿Qué distancia hay entre $(0,0,0) + t\\,(1,0,0)$ y $(0,3,4) + s\\,(1,0,0)$? (solo el número)",
      "correctAnswers": [
        "5"
      ],
      "explanation": "Son paralelas: distancia del punto $(0, 3, 4)$ a la primera: $\\sqrt{9 + 16} = 5$."
    },
    {
      "id": "check-mixto",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Coplanares."
        }
      ],
      "title": "Producto mixto cero",
      "question": "Si $[\\vec{u}, \\vec{v}, \\overrightarrow{PQ}] = 0$ y las rectas no son paralelas, entonces…",
      "choices": [
        {
          "id": "a",
          "label": "las rectas se cortan y su distancia es $0$"
        },
        {
          "id": "b",
          "label": "las rectas se cruzan",
          "incorrectFeedback": "Si se cruzaran, el producto mixto sería distinto de $0$."
        },
        {
          "id": "c",
          "label": "las rectas son paralelas",
          "incorrectFeedback": "Hemos supuesto que no lo son."
        },
        {
          "id": "d",
          "label": "la distancia es infinita",
          "incorrectFeedback": "Nunca ocurre."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Los tres vectores son coplanares: las rectas están en un mismo plano y, al no ser paralelas, se cortan."
    }
  ],
};
