import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_3_SUBTITLE } from "@/data/lessons/shared";

export const sistemasInecuacionesCcss2Lesson: InteractiveLesson = {
  slug: "sistemas-inecuaciones-ccss2",
  title: "2. Sistemas de inecuaciones lineales",
  subtitle: TEMA_CCSS2_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "sistema",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Intersectar semiplanos"
        }
      ],
      "title": "Intersectar semiplanos",
      "blocks": [
        {
          "kind": "text",
          "text": "Un **sistema de inecuaciones** pide los puntos que cumplen todas las desigualdades a la vez: la solución es la **intersección** de los semiplanos de cada una. Puede ser una región acotada, no acotada, vacía o incluso un solo punto."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\begin{cases} x + y \\leq 4 \\\\ x - y \\geq 1 \\end{cases}\\quad \\text{Las rectas se cortan en } \\left(\\tfrac52,\\ \\tfrac32\\right)"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "region-inecuaciones-explorador",
        "initial": [
          1,
          1,
          4,
          0,
          1,
          -1,
          1,
          1
        ],
        "hint": "Verde: puntos que cumplen las dos. Prueba a hacer las rectas paralelas y cambia los signos: ¿puede quedar vacía?"
      }
    },
    {
      "id": "check-puntos",
      "type": "classify",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye en cada una."
        }
      ],
      "title": "¿Está en la región?",
      "question": "El sistema es $x + y \\leq 4$ y $x - y \\geq 1$. Decide para cada punto.",
      "groups": [
        {
          "id": "si",
          "label": "En la región",
          "tone": "emerald"
        },
        {
          "id": "no",
          "label": "Fuera",
          "tone": "rose"
        }
      ],
      "items": [
        {
          "id": "a",
          "text": "$(3, 0)$",
          "group": "si"
        },
        {
          "id": "b",
          "text": "$(2, 2)$",
          "group": "no"
        },
        {
          "id": "c",
          "text": "$(4, 1)$",
          "group": "no"
        },
        {
          "id": "d",
          "text": "$(2, 0)$",
          "group": "si"
        },
        {
          "id": "e",
          "text": "$(1, -1)$",
          "group": "si"
        },
        {
          "id": "f",
          "text": "$(0, 0)$",
          "group": "no"
        }
      ],
      "hint": "Un punto debe cumplir **las dos** desigualdades."
    },
    {
      "id": "check-corte",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Suma las dos ecuaciones."
        }
      ],
      "title": "Punto de corte",
      "question": "Las rectas $x + y = 4$ y $x - y = 1$ se cortan en $x = a$. ¿Cuánto vale $a$? (decimal)",
      "correctAnswers": [
        "2.5",
        "2,5",
        "5/2"
      ],
      "explanation": "Sumando: $2x = 5 \\Rightarrow x = 2{,}5$ (y $y = 1{,}5$)."
    },
    {
      "id": "check-vacia",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Compara los dos semiplanos."
        }
      ],
      "title": "Región vacía",
      "question": "El sistema $x + y \\leq 2$, $x + y \\geq 5$ tiene…",
      "choices": [
        {
          "id": "a",
          "label": "región solución vacía"
        },
        {
          "id": "b",
          "label": "una única solución",
          "incorrectFeedback": "Las rectas son paralelas."
        },
        {
          "id": "c",
          "label": "infinitas soluciones",
          "incorrectFeedback": "No hay puntos que cumplan las dos desigualdades."
        },
        {
          "id": "d",
          "label": "una región acotada",
          "incorrectFeedback": "No existe región."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Un punto no puede tener $x + y$ menor que $2$ y mayor que $5$ a la vez."
    },
    {
      "id": "check-vertice",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $y = 0$."
        }
      ],
      "title": "Un vértice",
      "question": "La recta $x + y = 4$ corta al eje $X$ ($y = 0$) en $x = b$. ¿Cuánto vale $b$? (solo el número)",
      "correctAnswers": [
        "4"
      ],
      "explanation": "$x + 0 = 4$."
    }
  ],
};
