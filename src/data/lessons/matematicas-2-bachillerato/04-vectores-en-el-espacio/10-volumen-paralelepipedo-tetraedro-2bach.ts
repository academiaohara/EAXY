import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_4_SUBTITLE } from "@/data/lessons/shared";

export const volumenParalelepipedoTetraedro2bachLesson: InteractiveLesson = {
  slug: "volumen-paralelepipedo-tetraedro-2bach",
  title: "10. Volumen de un paralelepípedo y de un tetraedro",
  subtitle: TEMA_2BACH_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "volumen",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "El valor absoluto del producto mixto"
        }
      ],
      "title": "El valor absoluto del producto mixto",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "V_{\\text{paralelepípedo}} = \\left|[\\overrightarrow{AB}, \\overrightarrow{AC}, \\overrightarrow{AD}]\\right|",
              "label": "paralelepípedo"
            },
            {
              "tex": "V_{\\text{tetraedro}} = \\tfrac16\\left|[\\overrightarrow{AB}, \\overrightarrow{AC}, \\overrightarrow{AD}]\\right|",
              "label": "tetraedro"
            }
          ]
        },
        {
          "kind": "text",
          "text": "El producto mixto es (área de la base)·(altura): $|\\vec{u}\\times\\vec{v}|$ por la proyección de $\\vec{w}$ sobre la normal. Un tetraedro es $\\tfrac13$ de un prisma de su misma base y altura, que a su vez es $\\tfrac12$ del paralelepípedo: $\\tfrac13\\cdot\\tfrac12 = \\tfrac16$."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "paralelepipedo-volumen",
        "params": {
          "nums": [
            3,
            0,
            0,
            1,
            3,
            0,
            1,
            1,
            3
          ]
        }
      }
    },
    {
      "id": "check-par",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "El determinante es triangular inferior."
        }
      ],
      "title": "Volumen del paralelepípedo",
      "question": "Con $\\vec{u} = (3, 0, 0)$, $\\vec{v} = (1, 3, 0)$ y $\\vec{w} = (1, 1, 3)$, ¿cuánto vale el volumen del paralelepípedo? (solo el número)",
      "correctAnswers": [
        "27"
      ],
      "explanation": "$[\\vec{u}, \\vec{v}, \\vec{w}] = 3\\cdot 3\\cdot 3 = 27$ (matriz triangular)."
    },
    {
      "id": "check-tetra",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Un sexto del producto mixto."
        }
      ],
      "title": "Volumen de un tetraedro",
      "question": "Un tetraedro tiene vértices $A(0,0,0)$, $B(2,0,0)$, $C(0,3,0)$ y $D(0,0,4)$. ¿Cuánto vale su volumen? (solo el número)",
      "correctAnswers": [
        "4"
      ],
      "explanation": "$\\tfrac16\\cdot|2\\cdot 3\\cdot 4| = \\tfrac{24}{6} = 4$."
    },
    {
      "id": "check-h",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$V = \\tfrac13\\,\\text{base}\\cdot\\text{altura}$."
        }
      ],
      "title": "Altura",
      "question": "Un tetraedro de volumen $5$ tiene como base el triángulo $ABC$ de área $3$. ¿Cuánto mide la altura desde $D$? (solo el número)",
      "correctAnswers": [
        "5"
      ],
      "explanation": "$V = \\tfrac13\\cdot\\text{base}\\cdot h \\Rightarrow 5 = \\tfrac13\\cdot 3\\cdot h \\Rightarrow h = 5$."
    },
    {
      "id": "check-cero",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Producto mixto nulo."
        }
      ],
      "title": "Volumen cero",
      "question": "Si el volumen del tetraedro $ABCD$ es $0$, los cuatro puntos son…",
      "choices": [
        {
          "id": "a",
          "label": "coplanares"
        },
        {
          "id": "b",
          "label": "colineales siempre",
          "incorrectFeedback": "Colineales es un caso particular; en general basta que estén en un plano."
        },
        {
          "id": "c",
          "label": "vértices de un cubo",
          "incorrectFeedback": "Un cubo tiene volumen positivo."
        },
        {
          "id": "d",
          "label": "imposibles",
          "incorrectFeedback": "Es perfectamente posible: cuatro puntos en un mismo plano."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Volumen $0$ ⟺ producto mixto $0$ ⟺ vectores coplanares."
    }
  ],
};
