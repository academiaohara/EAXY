import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_6_SUBTITLE } from "@/data/lessons/shared";

export const distanciaPuntoRecta2bachLesson: InteractiveLesson = {
  slug: "distancia-punto-recta-2bach",
  title: "8. Distancia de un punto a una recta",
  subtitle: TEMA_2BACH_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "formula",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Con el producto vectorial"
        }
      ],
      "title": "Con el producto vectorial",
      "blocks": [
        {
          "kind": "rule",
          "text": "Si $r$ pasa por $A$ con vector director $\\vec{v}$:",
          "formula": "d(P, r) = \\dfrac{|\\overrightarrow{AP}\\times\\vec{v}|}{|\\vec{v}|}"
        },
        {
          "kind": "text",
          "text": "Es área del paralelogramo (base $|\\vec{v}|$) dividida entre la base. También puede calcularse proyectando $P$ sobre la recta y midiendo $|PF|$."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "distancia-punto-recta-3d",
        "params": {
          "nums": [
            1,
            3,
            1,
            0,
            0,
            0,
            3,
            0,
            0
          ]
        }
      }
    },
    {
      "id": "check-d2",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$|AP\\times v|^2 = 90$ y $|v|^2 = 9$."
        }
      ],
      "title": "Cuadrado de la distancia",
      "question": "Con $P(1, 3, 1)$ y la recta $x$-axis ($A = O$, $\\vec{v} = (3, 0, 0)$): $\\overrightarrow{AP}\\times\\vec{v} = (0, 3, -9)$. ¿Cuánto vale $d^2$? (solo el número)",
      "correctAnswers": [
        "10"
      ],
      "explanation": "$d^2 = \\dfrac{0 + 9 + 81}{9} = 10$; $d = \\sqrt{10}$."
    },
    {
      "id": "check-d",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en el dibujo."
        }
      ],
      "title": "Otra distancia",
      "question": "¿Cuánto dista $O(0,0,0)$ de la recta $(0, 0, 3) + t\\,(1, 0, 0)$? (solo el número)",
      "correctAnswers": [
        "3"
      ],
      "explanation": "La recta es paralela al eje $X$ a altura $3$: la distancia es $3$."
    },
    {
      "id": "check-metodo",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Proyección ortogonal."
        }
      ],
      "title": "Dos formas",
      "question": "Además de la fórmula con el producto vectorial, la distancia de $P$ a una recta se puede obtener…",
      "choices": [
        {
          "id": "a",
          "label": "hallando la proyección $F$ de $P$ sobre la recta y calculando $|\\overrightarrow{PF}|$"
        },
        {
          "id": "b",
          "label": "con la distancia a un plano cualquiera",
          "incorrectFeedback": "No tiene relación."
        },
        {
          "id": "c",
          "label": "sumando los módulos de $\\vec{v}$ y $\\overrightarrow{AP}$",
          "incorrectFeedback": "No es una distancia."
        },
        {
          "id": "d",
          "label": "restando las coordenadas",
          "incorrectFeedback": "Eso da el vector, no la distancia."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$F$ es el punto más cercano a $P$ de la recta."
    },
    {
      "id": "check-area",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Eleva al cuadrado."
        }
      ],
      "title": "Área del paralelogramo",
      "question": "Con $\\overrightarrow{AP} = (1, 3, 1)$ y $\\vec{v} = (3, 0, 0)$, el área del paralelogramo es $|\\overrightarrow{AP}\\times\\vec{v}| = \\sqrt{90}$. ¿Cuánto vale $\\dfrac{\\sqrt{90}}{3}$ al cuadrado? (solo el número)",
      "correctAnswers": [
        "10"
      ],
      "explanation": "$\\dfrac{90}{9} = 10$."
    }
  ],
};
