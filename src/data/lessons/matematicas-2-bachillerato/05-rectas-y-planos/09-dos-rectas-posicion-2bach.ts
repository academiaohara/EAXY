import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_5_SUBTITLE } from "@/data/lessons/shared";

export const dosRectasPosicion2bachLesson: InteractiveLesson = {
  slug: "dos-rectas-posicion-2bach",
  title: "9. Posición relativa de dos rectas",
  subtitle: TEMA_2BACH_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "rangos",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Cuatro posiciones"
        }
      ],
      "title": "Cuatro posiciones",
      "blocks": [
        {
          "kind": "text",
          "text": "Con $r: P + t\\vec{u}$ y $s: Q + s\\vec{v}$, se miran los rangos de $\\{\\vec{u}, \\vec{v}\\}$ y de $\\{\\vec{u}, \\vec{v}, \\overrightarrow{PQ}\\}$:"
        },
        {
          "kind": "facts",
          "items": [
            {
              "tex": "(1,\\ 1)",
              "label": "coincidentes"
            },
            {
              "tex": "(1,\\ 2)",
              "label": "paralelas"
            },
            {
              "tex": "(2,\\ 2)",
              "label": "secantes"
            },
            {
              "tex": "(2,\\ 3)",
              "label": "se cruzan"
            }
          ]
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "rectas-posiciones-3d"
      }
    },
    {
      "id": "check-cruzan",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Desarrolla por la tercera columna."
        }
      ],
      "title": "Se cruzan",
      "question": "Las rectas $(0,0,0) + t\\,(1,1,0)$ y $(0,0,2) + s\\,(1,-1,0)$ tienen $\\overrightarrow{PQ} = (0, 0, 2)$. ¿Cuánto vale $\\begin{vmatrix} 1 & 1 & 0 \\\\ 1 & -1 & 0 \\\\ 0 & 0 & 2 \\end{vmatrix}$? (solo el número)",
      "correctAnswers": [
        "-4",
        "−4"
      ],
      "explanation": "$2\\cdot(-1 - 1) = -4 \\neq 0$: los tres vectores no son coplanares, las rectas **se cruzan**."
    },
    {
      "id": "explorar",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Explora dos rectas"
        }
      ],
      "title": "Explora dos rectas",
      "blocks": [
        {
          "kind": "text",
          "text": "Cambia los puntos y los vectores directores y observa los rangos. Si son secantes, se calcula el punto de corte."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "posicion-rectas-explorador",
        "initial": [
          0,
          0,
          1,
          1,
          1,
          0,
          2,
          0,
          1,
          -1,
          1,
          0
        ],
        "hint": "Estas rectas se cortan en (1, 1, 1). Cambia Q a (2, 0, 2): ahora se cruzan."
      }
    },
    {
      "id": "check-corte",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Iguala componente a componente."
        }
      ],
      "title": "Punto de corte",
      "question": "Las rectas $(0,0,1) + t\\,(1,1,0)$ y $(2,0,1) + s\\,(-1,1,0)$ se cortan en un punto. ¿Cuánto vale su coordenada $x$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$t = 2 - s$ y $t = s$ dan $s = t = 1$; el punto es $(1, 1, 1)$."
    },
    {
      "id": "check-par",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Mira los rangos."
        }
      ],
      "title": "Paralelas o coincidentes",
      "question": "Dos rectas con vectores directores proporcionales y $\\overrightarrow{PQ}$ **no** proporcional a ellos son…",
      "choices": [
        {
          "id": "a",
          "label": "paralelas distintas"
        },
        {
          "id": "b",
          "label": "coincidentes",
          "incorrectFeedback": "Si coincidieran, $\\overrightarrow{PQ}$ también sería paralelo."
        },
        {
          "id": "c",
          "label": "secantes",
          "incorrectFeedback": "Con la misma dirección no pueden cortarse en un solo punto."
        },
        {
          "id": "d",
          "label": "que se cruzan",
          "incorrectFeedback": "Las rectas que se cruzan tienen direcciones distintas."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$\\operatorname{rg}\\{\\vec{u}, \\vec{v}\\} = 1$ y $\\operatorname{rg}\\{\\vec{u}, \\vec{v}, \\overrightarrow{PQ}\\} = 2$: paralelas."
    }
  ],
};
