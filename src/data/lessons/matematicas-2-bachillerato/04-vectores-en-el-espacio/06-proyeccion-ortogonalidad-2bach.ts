import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_4_SUBTITLE } from "@/data/lessons/shared";

export const proyeccionOrtogonalidad2bachLesson: InteractiveLesson = {
  slug: "proyeccion-ortogonalidad-2bach",
  title: "6. Proyección, vector unitario y perpendiculares",
  subtitle: TEMA_2BACH_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "proyeccion",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Proyección de un vector sobre otro"
        }
      ],
      "title": "Proyección de un vector sobre otro",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "\\operatorname{proy}_{\\vec{u}}\\vec{v} = \\dfrac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|}",
              "label": "proyección (número)"
            },
            {
              "tex": "\\text{vector proyección} = \\dfrac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|^2}\\,\\vec{u}",
              "label": "vector"
            }
          ]
        },
        {
          "kind": "text",
          "text": "Un **vector unitario** de la dirección de $\\vec{u}$ es $\\dfrac{\\vec{u}}{|\\vec{u}|}$. Dos vectores son **ortogonales** si su producto escalar es $0$."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "producto-escalar-proyeccion",
        "params": {
          "a": 35
        }
      }
    },
    {
      "id": "check-proy",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Producto escalar entre el módulo de $\\vec{u}$."
        }
      ],
      "title": "Proyección",
      "question": "Calcula la proyección (como número) de $\\vec{v} = (3, 0, 3)$ sobre $\\vec{u} = (1, 2, 2)$. (solo el número)",
      "correctAnswers": [
        "3"
      ],
      "explanation": "$\\vec{u}\\cdot\\vec{v} = 3 + 0 + 6 = 9$ y $|\\vec{u}| = 3$: $9/3 = 3$."
    },
    {
      "id": "check-vproy",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "El factor $9/9$ vale $1$."
        }
      ],
      "title": "Vector proyección",
      "question": "Con los mismos vectores, el vector proyección es $\\dfrac{9}{9}\\vec{u} = \\vec{u}$. ¿Cuánto vale su segunda componente? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$\\dfrac{\\vec{u}\\cdot\\vec{v}}{|\\vec{u}|^2} = \\dfrac{9}{9} = 1$, así que el vector proyección es $(1, 2, 2)$."
    },
    {
      "id": "check-perp2",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Producto escalar igual a $0$."
        }
      ],
      "title": "Un vector perpendicular",
      "question": "Un vector $(4, b, 0)$ es perpendicular a $(3, 4, 0)$. ¿Cuánto vale $b$? (solo el número)",
      "correctAnswers": [
        "-3",
        "−3"
      ],
      "explanation": "$12 + 4b = 0 \\Rightarrow b = -3$."
    },
    {
      "id": "check-unit",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Divide entre el módulo."
        }
      ],
      "title": "Vector unitario",
      "question": "Un vector unitario en la dirección de $(2, -1, 2)$, de módulo $3$, es…",
      "choices": [
        {
          "id": "a",
          "label": "$\\left(\\tfrac23, -\\tfrac13, \\tfrac23\\right)$"
        },
        {
          "id": "b",
          "label": "$(2, -1, 2)$",
          "incorrectFeedback": "Ese vector mide $3$, no $1$."
        },
        {
          "id": "c",
          "label": "$\\left(\\tfrac13, -\\tfrac13, \\tfrac13\\right)$",
          "incorrectFeedback": "No tiene la misma dirección."
        },
        {
          "id": "d",
          "label": "$(6, -3, 6)$",
          "incorrectFeedback": "Ese vector mide $9$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Se divide cada componente entre el módulo $3$."
    }
  ],
};
