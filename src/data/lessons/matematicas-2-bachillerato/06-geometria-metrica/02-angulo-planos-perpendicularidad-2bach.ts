import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_6_SUBTITLE } from "@/data/lessons/shared";

export const anguloPlanosPerpendicularidad2bachLesson: InteractiveLesson = {
  slug: "angulo-planos-perpendicularidad-2bach",
  title: "2. Ángulo entre planos, paralelismo y perpendicularidad",
  subtitle: TEMA_2BACH_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "planos",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Ángulo entre dos planos"
        }
      ],
      "title": "Ángulo entre dos planos",
      "blocks": [
        {
          "kind": "definition",
          "text": "El ángulo entre dos planos es el ángulo agudo entre sus **vectores normales**."
        },
        {
          "kind": "rule",
          "formula": "\\cos\\alpha = \\dfrac{|\\vec{n}_1\\cdot\\vec{n}_2|}{|\\vec{n}_1|\\,|\\vec{n}_2|}"
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "angulos-espacio-explorador",
        "initial": [
          2,
          1,
          0,
          0,
          1,
          1,
          0
        ],
        "hint": "Planos x = 0 e x + y = 0: normales (1, 0, 0) y (1, 1, 0): 45°."
      }
    },
    {
      "id": "check-planos",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Fórmula con los vectores normales."
        }
      ],
      "title": "Planos a 45°",
      "question": "Los planos $x = 0$ y $x + y = 0$ tienen normales $(1, 0, 0)$ y $(1, 1, 0)$. ¿Qué ángulo (en grados) forman? (solo el número)",
      "correctAnswers": [
        "45"
      ],
      "explanation": "$\\cos\\alpha = \\dfrac{1}{\\sqrt2}$, luego $\\alpha = 45^\\circ$."
    },
    {
      "id": "relaciones",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Paralelismo y perpendicularidad"
        }
      ],
      "title": "Paralelismo y perpendicularidad",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "r\\parallel s \\iff \\vec{u}\\parallel\\vec{v}",
              "label": "rectas paralelas"
            },
            {
              "tex": "r\\perp s \\iff \\vec{u}\\cdot\\vec{v} = 0",
              "label": "rectas perpendiculares"
            },
            {
              "tex": "\\pi\\parallel\\pi' \\iff \\vec{n}\\parallel\\vec{n}'",
              "label": "planos paralelos"
            },
            {
              "tex": "\\pi\\perp\\pi' \\iff \\vec{n}\\cdot\\vec{n}' = 0",
              "label": "planos perpendiculares"
            },
            {
              "tex": "r\\perp\\pi \\iff \\vec{v}\\parallel\\vec{n}",
              "label": "recta perpendicular a un plano"
            },
            {
              "tex": "r\\parallel\\pi \\iff \\vec{v}\\cdot\\vec{n} = 0",
              "label": "recta paralela a un plano"
            }
          ]
        }
      ]
    },
    {
      "id": "check-perp",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Producto escalar igual a $0$."
        }
      ],
      "title": "Planos perpendiculares",
      "question": "¿Qué valor de $k$ hace perpendiculares a los planos con normales $(1, k, 2)$ y $(3, -1, 1)$? (solo el número)",
      "correctAnswers": [
        "5"
      ],
      "explanation": "$3 - k + 2 = 0 \\Rightarrow k = 5$."
    },
    {
      "id": "check-recta-plano",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Vectores proporcionales."
        }
      ],
      "title": "Recta perpendicular a un plano",
      "question": "¿Qué valor de $m$ hace que la recta de vector director $(2, 4, m)$ sea perpendicular al plano $x + 2y + 3z = 0$? (solo el número)",
      "correctAnswers": [
        "6"
      ],
      "explanation": "Debe ser $\\vec{v} \\parallel \\vec{n} = (1, 2, 3)$: $\\vec{v} = 2\\vec{n}$, luego $m = 6$."
    }
  ],
};
