import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_6_SUBTITLE } from "@/data/lessons/shared";

export const distanciaPuntoPlano2bachLesson: InteractiveLesson = {
  slug: "distancia-punto-plano-2bach",
  title: "7. Distancia entre dos puntos y de un punto a un plano",
  subtitle: TEMA_2BACH_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "puntos",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Entre dos puntos"
        }
      ],
      "title": "Entre dos puntos",
      "blocks": [
        {
          "kind": "rule",
          "formula": "d(A, B) = |\\overrightarrow{AB}| = \\sqrt{(b_1 - a_1)^2 + (b_2 - a_2)^2 + (b_3 - a_3)^2}"
        }
      ]
    },
    {
      "id": "check-ab",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Solo cambia la tercera coordenada."
        }
      ],
      "title": "Distancia entre puntos",
      "question": "¿Qué distancia hay entre $A(1, 1, 3)$ y $B(1, 1, 2)$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$\\sqrt{0 + 0 + 1} = 1$."
    },
    {
      "id": "plano",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "De un punto a un plano"
        }
      ],
      "title": "De un punto a un plano",
      "blocks": [
        {
          "kind": "rule",
          "text": "Con $\\pi: Ax + By + Cz + D = 0$ y $P(x_0, y_0, z_0)$:",
          "formula": "d(P, \\pi) = \\dfrac{|Ax_0 + By_0 + Cz_0 + D|}{\\sqrt{A^2 + B^2 + C^2}}"
        },
        {
          "kind": "text",
          "text": "Es la longitud del segmento $PF$ de la proyección ortogonal: la menor distancia de $P$ a un punto del plano."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "proyeccion-punto-plano-3d",
        "params": {
          "nums": [
            2,
            1,
            4,
            0,
            0,
            1,
            -1
          ]
        }
      }
    },
    {
      "id": "check-pp",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye en el numerador y el módulo es $3$."
        }
      ],
      "title": "Punto y plano",
      "question": "Calcula la distancia de $P(1, 2, 3)$ al plano $2x + 2y - z - 6 = 0$. (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$\\dfrac{|2 + 4 - 3 - 6|}{\\sqrt{4 + 4 + 1}} = \\dfrac{3}{3} = 1$."
    },
    {
      "id": "check-origen",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Con $P = O$ solo queda el término $D$."
        }
      ],
      "title": "Distancia del origen",
      "question": "¿A qué distancia del origen está el plano $x + 2y + 2z - 6 = 0$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$\\dfrac{|-6|}{\\sqrt{1 + 4 + 4}} = \\dfrac{6}{3} = 2$."
    }
  ],
};
