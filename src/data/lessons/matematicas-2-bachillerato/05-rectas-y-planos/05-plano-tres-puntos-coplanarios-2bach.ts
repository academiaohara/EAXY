import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_5_SUBTITLE } from "@/data/lessons/shared";

export const planoTresPuntosCoplanarios2bachLesson: InteractiveLesson = {
  slug: "plano-tres-puntos-coplanarios-2bach",
  title: "5. Plano por tres puntos y puntos coplanarios",
  subtitle: TEMA_2BACH_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "metodo",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Del punto a la ecuación"
        }
      ],
      "title": "Del punto a la ecuación",
      "blocks": [
        {
          "kind": "steps",
          "items": [
            "Calcula dos vectores del plano: $\\overrightarrow{AB}$ y $\\overrightarrow{AC}$.",
            "El vector normal es $\\vec{n} = \\overrightarrow{AB}\\times\\overrightarrow{AC}$.",
            "Con $\\vec{n}$ y el punto $A$ se obtiene $Ax + By + Cz + D = 0$."
          ]
        },
        {
          "kind": "text",
          "text": "En la animación, $A(3,0,0)$, $B(0,4,0)$ y $C(0,0,2)$ dan $4x + 3y + 6z - 12 = 0$. Otra forma: el punto $X(x, y, z)$ está en el plano si $\\overrightarrow{AX}$, $\\overrightarrow{AB}$ y $\\overrightarrow{AC}$ son coplanares, es decir, su determinante vale $0$."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "plano-tres-puntos-3d",
        "params": {
          "nums": [
            3,
            0,
            0,
            0,
            4,
            0,
            0,
            0,
            2
          ]
        }
      }
    },
    {
      "id": "check-eq",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye en la ecuación."
        }
      ],
      "title": "Un plano por tres puntos",
      "question": "El plano por $A(1,0,0)$, $B(0,2,0)$ y $C(0,0,3)$ es $6x + 3y + 2z - 6 = 0$. ¿Qué valor toma $6x + 3y + 2z - 6$ en el punto $(2, 0, 0)$? (solo el número)",
      "correctAnswers": [
        "6"
      ],
      "explanation": "$12 + 0 + 0 - 6 = 6 \\neq 0$: el punto no pertenece al plano."
    },
    {
      "id": "check-copl",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$D$ debe cumplir la ecuación del plano."
        }
      ],
      "title": "Cuatro puntos coplanarios",
      "question": "¿Qué valor de $m$ hace coplanares a $A(1,0,0)$, $B(0,2,0)$, $C(0,0,3)$ y $D(1,2,m)$? (solo el número)",
      "correctAnswers": [
        "-3",
        "−3"
      ],
      "explanation": "$6\\cdot 1 + 3\\cdot 2 + 2m - 6 = 0 \\Rightarrow 2m = -6 \\Rightarrow m = -3$."
    },
    {
      "id": "check-normal",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$2\\cdot 3 - 0\\cdot 0$."
        }
      ],
      "title": "Vector normal",
      "question": "Para $A(1,0,0)$, $B(0,2,0)$ y $C(0,0,3)$, ¿cuánto vale la primera componente de $\\overrightarrow{AB}\\times\\overrightarrow{AC}$, con $\\overrightarrow{AB} = (-1, 2, 0)$ y $\\overrightarrow{AC} = (-1, 0, 3)$? (solo el número)",
      "correctAnswers": [
        "6"
      ],
      "explanation": "$(2\\cdot 3 - 0\\cdot 0,\\ \\dots) = (6, 3, 2)$."
    },
    {
      "id": "check-alin",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Producto vectorial nulo = vectores paralelos."
        }
      ],
      "title": "Puntos alineados",
      "question": "Si $\\overrightarrow{AB}\\times\\overrightarrow{AC} = \\vec{0}$, los puntos $A$, $B$ y $C$…",
      "choices": [
        {
          "id": "a",
          "label": "están alineados y no determinan un plano único"
        },
        {
          "id": "b",
          "label": "forman un plano horizontal",
          "incorrectFeedback": "El producto vectorial nulo no indica orientación."
        },
        {
          "id": "c",
          "label": "son coplanares y determinan un único plano",
          "incorrectFeedback": "Si están alineados, hay infinitos planos que los contienen."
        },
        {
          "id": "d",
          "label": "no existen",
          "incorrectFeedback": "Existen, pero están en una recta."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Si $\\overrightarrow{AB}$ y $\\overrightarrow{AC}$ son paralelos, los tres puntos están en una recta."
    }
  ],
};
