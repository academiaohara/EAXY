import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_6_SUBTITLE } from "@/data/lessons/shared";

export const distanciaPlanosRectaPlano2bachLesson: InteractiveLesson = {
  slug: "distancia-planos-recta-plano-2bach",
  title: "9. Distancia entre planos y entre recta y plano",
  subtitle: TEMA_2BACH_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "metodo",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Se reduce a un punto"
        }
      ],
      "title": "Se reduce a un punto",
      "blocks": [
        {
          "kind": "steps",
          "items": [
            "**Dos planos paralelos:** se toma un punto de uno y se calcula su distancia al otro.",
            "**Recta paralela a un plano:** se toma un punto de la recta y se calcula su distancia al plano.",
            "Si se cortan o la recta está contenida, la distancia es $0$."
          ]
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\pi: x + 2y + 2z - 6 = 0,\\ \\ \\pi': x + 2y + 2z + 3 = 0"
            },
            {
              "math": "P(6, 0, 0) \\in \\pi \\Rightarrow d = \\dfrac{|6 + 3|}{3} = 3"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "distancias-espacio-explorador",
        "initial": [
          0,
          6,
          0,
          0,
          1,
          2,
          2,
          3
        ],
        "hint": "Distancia del punto P(6, 0, 0) del primer plano al segundo: 3."
      }
    },
    {
      "id": "check-planos",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\dfrac{|D - D'|}{|\\vec{n}|}$."
        }
      ],
      "title": "Dos planos paralelos",
      "question": "¿Qué distancia hay entre $x + 2y + 2z - 6 = 0$ y $x + 2y + 2z + 3 = 0$? (solo el número)",
      "correctAnswers": [
        "3"
      ],
      "explanation": "Con un punto de uno, $(6, 0, 0)$: $\\dfrac{|6 + 3|}{\\sqrt{9}} = 3$. Con coeficientes iguales: $\\dfrac{|D - D'|}{|\\vec{n}|} = \\dfrac{9}{3}$."
    },
    {
      "id": "check-rp",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Usa el origen, que está en la recta."
        }
      ],
      "title": "Recta y plano paralelos",
      "question": "La recta $(0, 0, 0) + t\\,(1, -1, 0)$ es paralela al plano $x + y + z - 3 = 0$. ¿Cuánto vale el cuadrado de su distancia al plano? (solo el número)",
      "correctAnswers": [
        "3"
      ],
      "explanation": "Con el punto $O$: $d = \\dfrac{3}{\\sqrt3} = \\sqrt3$ y $d^2 = 3$."
    },
    {
      "id": "check-cero",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en los puntos comunes."
        }
      ],
      "title": "Distancia cero",
      "question": "La distancia entre una recta y un plano es $0$ cuando…",
      "choices": [
        {
          "id": "a",
          "label": "se cortan o la recta está contenida en el plano"
        },
        {
          "id": "b",
          "label": "son paralelos",
          "incorrectFeedback": "Paralelos y sin puntos comunes dan distancia positiva."
        },
        {
          "id": "c",
          "label": "son perpendiculares siempre",
          "incorrectFeedback": "Perpendicular implica que se cortan: sí da $0$, pero no es la única posibilidad."
        },
        {
          "id": "d",
          "label": "el plano pasa por el origen",
          "incorrectFeedback": "No tiene que ver."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Si hay algún punto común, la distancia mínima es $0$."
    },
    {
      "id": "check-k",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Valor absoluto."
        }
      ],
      "title": "Distancia dada",
      "question": "El plano $x + 2y + 2z + k = 0$ está a distancia $2$ del origen. ¿Cuánto vale el mayor valor posible de $k$? (solo el número)",
      "correctAnswers": [
        "6"
      ],
      "explanation": "$\\dfrac{|k|}{3} = 2 \\Rightarrow k = \\pm 6$."
    }
  ],
};
