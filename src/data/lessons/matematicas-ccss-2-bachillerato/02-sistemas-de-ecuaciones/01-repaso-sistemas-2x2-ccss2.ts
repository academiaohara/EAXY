import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_2_SUBTITLE } from "@/data/lessons/shared";

export const repasoSistemas2x2Ccss2Lesson: InteractiveLesson = {
  slug: "repaso-sistemas-2x2-ccss2",
  title: "1. Repaso: sistemas de dos ecuaciones",
  subtitle: TEMA_CCSS2_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "metodos",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Resolver y mirar"
        }
      ],
      "title": "Resolver y mirar",
      "blocks": [
        {
          "kind": "text",
          "text": "Una ecuación lineal con dos incógnitas, $ax + by = c$, es una **recta**. Resolver un sistema de dos ecuaciones es buscar los puntos que están en las dos rectas a la vez."
        },
        {
          "kind": "steps",
          "items": [
            "**Sustitución:** se despeja una incógnita y se sustituye en la otra ecuación.",
            "**Igualación:** se despeja la misma incógnita en las dos y se igualan.",
            "**Reducción:** se multiplican las ecuaciones por números para que al sumarlas desaparezca una incógnita."
          ]
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\begin{cases} x + y = 5 \\\\ x - y = 1 \\end{cases}\\ \\Rightarrow\\ 2x = 6,\\ x = 3,\\ y = 2"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "sistema-grafico-explorador",
        "initial": [
          1,
          1,
          5,
          1,
          -1,
          1
        ],
        "hint": "x + y = 5 y x − y = 1 se cortan en el punto (3, 2): la solución del sistema."
      }
    },
    {
      "id": "tipos",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Tres posibilidades"
        }
      ],
      "title": "Tres posibilidades",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "\\text{rectas que se cortan}",
              "label": "una solución: compatible determinado"
            },
            {
              "tex": "\\text{rectas coincidentes}",
              "label": "infinitas soluciones: compatible indeterminado"
            },
            {
              "tex": "\\text{rectas paralelas}",
              "label": "ninguna solución: incompatible"
            }
          ]
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "sistema-rectas",
        "params": {
          "sys": "unica"
        }
      }
    },
    {
      "id": "check-x",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Suma las dos ecuaciones."
        }
      ],
      "title": "Resolver",
      "question": "Resuelve $\\begin{cases} 2x + y = 7 \\\\ x - y = 2 \\end{cases}$. ¿Cuánto vale $x$? (solo el número)",
      "correctAnswers": [
        "3"
      ],
      "explanation": "Sumando: $3x = 9 \\Rightarrow x = 3$ y $y = 1$."
    },
    {
      "id": "check-y",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $x = 3$."
        }
      ],
      "title": "La otra incógnita",
      "question": "En el mismo sistema, ¿cuánto vale $y$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$2\\cdot3 + y = 7 \\Rightarrow y = 1$."
    },
    {
      "id": "check-tipo",
      "type": "classify",
      "help": [
        {
          "label": "Pista",
          "message": "Compara los coeficientes."
        }
      ],
      "title": "¿Cuántas soluciones?",
      "question": "Clasifica cada sistema por su número de soluciones.",
      "groups": [
        {
          "id": "u",
          "label": "Una solución",
          "tone": "emerald"
        },
        {
          "id": "i",
          "label": "Infinitas",
          "tone": "amber"
        },
        {
          "id": "n",
          "label": "Ninguna",
          "tone": "rose"
        }
      ],
      "items": [
        {
          "id": "a",
          "text": "$x + y = 3$ y $x - y = 1$",
          "group": "u"
        },
        {
          "id": "b",
          "text": "$x + y = 3$ y $2x + 2y = 6$",
          "group": "i"
        },
        {
          "id": "c",
          "text": "$x + y = 3$ y $x + y = 5$",
          "group": "n"
        },
        {
          "id": "d",
          "text": "$x + 2y = 4$ y $3x - y = 5$",
          "group": "u"
        },
        {
          "id": "e",
          "text": "$2x - y = 1$ y $4x - 2y = 2$",
          "group": "i"
        },
        {
          "id": "f",
          "text": "$x - y = 0$ y $x - y = 1$",
          "group": "n"
        }
      ],
      "hint": "Las rectas paralelas no se cortan; si son la misma recta, se cortan en todos sus puntos."
    }
  ],
};
