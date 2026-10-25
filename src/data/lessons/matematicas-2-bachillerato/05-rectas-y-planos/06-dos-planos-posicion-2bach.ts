import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_5_SUBTITLE } from "@/data/lessons/shared";

export const dosPlanosPosicion2bachLesson: InteractiveLesson = {
  slug: "dos-planos-posicion-2bach",
  title: "6. Posición relativa de dos planos",
  subtitle: TEMA_2BACH_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "rangos",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Un sistema de dos ecuaciones"
        }
      ],
      "title": "Un sistema de dos ecuaciones",
      "blocks": [
        {
          "kind": "text",
          "text": "Con $M$ la matriz de coeficientes y $M^*$ la ampliada del sistema de los dos planos:"
        },
        {
          "kind": "facts",
          "items": [
            {
              "tex": "\\operatorname{rg}(M) = \\operatorname{rg}(M^*) = 1",
              "label": "coincidentes"
            },
            {
              "tex": "\\operatorname{rg}(M) = 1,\\ \\operatorname{rg}(M^*) = 2",
              "label": "paralelos"
            },
            {
              "tex": "\\operatorname{rg}(M) = \\operatorname{rg}(M^*) = 2",
              "label": "secantes (se cortan en una recta)"
            }
          ]
        },
        {
          "kind": "text",
          "text": "Si son secantes, la recta de corte tiene como dirección $\\vec{n}_1\\times\\vec{n}_2$."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "posicion-planos-explorador",
        "initial": [
          1,
          1,
          1,
          -3,
          1,
          -1,
          0,
          1,
          0,
          0,
          0,
          0
        ],
        "hint": "El tercer plano es nulo: mira solo π1 y π2. Se cortan en una recta de dirección (1, 1, −2)."
      }
    },
    {
      "id": "check-clasifica",
      "type": "classify",
      "help": [
        {
          "label": "Pista",
          "message": "Compara coeficientes."
        }
      ],
      "title": "¿Cómo son?",
      "question": "Clasifica cada pareja de planos.",
      "groups": [
        {
          "id": "c",
          "label": "Coincidentes",
          "tone": "amber"
        },
        {
          "id": "p",
          "label": "Paralelos",
          "tone": "cobalt"
        },
        {
          "id": "s",
          "label": "Secantes",
          "tone": "emerald"
        }
      ],
      "items": [
        {
          "id": "a",
          "text": "$x + y + z = 1$ y $2x + 2y + 2z = 2$",
          "group": "c"
        },
        {
          "id": "b",
          "text": "$x + y + z = 1$ y $2x + 2y + 2z = 5$",
          "group": "p"
        },
        {
          "id": "c",
          "text": "$x + y + z = 1$ y $x - y = 0$",
          "group": "s"
        },
        {
          "id": "d",
          "text": "$x - 2y = 3$ y $-3x + 6y = -9$",
          "group": "c"
        },
        {
          "id": "e",
          "text": "$x - 2y = 3$ y $-3x + 6y = 4$",
          "group": "p"
        },
        {
          "id": "f",
          "text": "$x + z = 0$ y $y + z = 0$",
          "group": "s"
        }
      ],
      "hint": "Si los coeficientes son proporcionales: coincidentes si el término independiente también, paralelos si no. Si no son proporcionales: secantes."
    },
    {
      "id": "check-k",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Razón $2$ en $x$ e $y$."
        }
      ],
      "title": "Paralelos",
      "question": "¿Para qué valor de $k$ son paralelos y distintos los planos $x + 2y - z = 1$ y $2x + 4y + kz = 3$? (solo el número)",
      "correctAnswers": [
        "-2",
        "−2"
      ],
      "explanation": "Coeficientes proporcionales con razón $2$: $k = -2$. Como $3 \\neq 2\\cdot 1$, no coinciden."
    },
    {
      "id": "check-tipo",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Compara los dos rangos."
        }
      ],
      "title": "Rangos de dos planos",
      "question": "Si $\\operatorname{rg}(M) = 1$ y $\\operatorname{rg}(M^*) = 2$, los dos planos son…",
      "choices": [
        {
          "id": "a",
          "label": "paralelos y distintos"
        },
        {
          "id": "b",
          "label": "coincidentes",
          "incorrectFeedback": "Coincidirían si $\\operatorname{rg}(M^*)$ también fuera $1$."
        },
        {
          "id": "c",
          "label": "secantes",
          "incorrectFeedback": "Secantes exige $\\operatorname{rg}(M) = 2$."
        },
        {
          "id": "d",
          "label": "perpendiculares",
          "incorrectFeedback": "Los rangos no dicen nada sobre perpendicularidad."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Normales proporcionales, pero términos independientes no proporcionales."
    },
    {
      "id": "check-dir",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$1\\cdot(-1) - 1\\cdot 1$."
        }
      ],
      "title": "Recta de corte",
      "question": "Los planos $x + y + z = 3$ y $x - y = -1$ se cortan en una recta. La tercera componente de su vector director $(1, 1, 1)\\times(1, -1, 0)$ es… (solo el número)",
      "correctAnswers": [
        "-2",
        "−2"
      ],
      "explanation": "$(1,1,1)\\times(1,-1,0) = (1, 1, -2)$."
    }
  ],
};
