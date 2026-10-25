import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_3_SUBTITLE } from "@/data/lessons/shared";

export const tiposSolucionesPlCcss2Lesson: InteractiveLesson = {
  slug: "tipos-soluciones-pl-ccss2",
  title: "7. Tipos de soluciones",
  subtitle: TEMA_CCSS2_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "tipos",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Cuatro situaciones"
        }
      ],
      "title": "Cuatro situaciones",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "\\text{un vértice óptimo}",
              "label": "solución única"
            },
            {
              "tex": "\\text{recta de nivel paralela a un lado}",
              "label": "infinitas soluciones: todo el lado"
            },
            {
              "tex": "\\text{región no acotada}",
              "label": "puede no haber óptimo (no acotada)"
            },
            {
              "tex": "\\text{restricciones incompatibles}",
              "label": "región vacía: sin solución"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "programacion-lineal-explorador",
        "initial": [
          2,
          8
        ],
        "hint": "Con Z = 2x + y la recta de nivel es paralela al lado 2x + y = 8: el máximo 8 se alcanza en todo el segmento de (2, 4) a (4, 0)."
      }
    },
    {
      "id": "no-acotada",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "No acotada y vacía"
        }
      ],
      "title": "No acotada y vacía",
      "blocks": [
        {
          "kind": "text",
          "text": "En la región $x + y \\geq 2$, $y - x \\leq 2$ el valor $Z = x + y$ crece sin límite: **no hay máximo**, aunque sí un mínimo. Con $x + y \\leq 2$ y $x + y \\geq 5$ no existe ningún punto factible."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "programacion-lineal-explorador",
        "initial": [
          3,
          8
        ],
        "hint": "Región no acotada: Z = x + y puede hacerse tan grande como se quiera."
      }
    },
    {
      "id": "check-tipo",
      "type": "classify",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en la forma de la región y de la recta de nivel."
        }
      ],
      "title": "¿Qué tipo de solución?",
      "question": "Clasifica cada situación.",
      "groups": [
        {
          "id": "u",
          "label": "Solución única",
          "tone": "emerald"
        },
        {
          "id": "m",
          "label": "Infinitas soluciones",
          "tone": "amber"
        },
        {
          "id": "n",
          "label": "No acotada",
          "tone": "violet"
        },
        {
          "id": "v",
          "label": "Sin solución",
          "tone": "rose"
        }
      ],
      "items": [
        {
          "id": "a",
          "text": "El máximo se alcanza solo en el vértice $(2, 4)$",
          "group": "u"
        },
        {
          "id": "b",
          "text": "La recta de nivel es paralela a un lado de la región y toca todo ese lado en el óptimo",
          "group": "m"
        },
        {
          "id": "c",
          "text": "La región se extiende al infinito y $Z$ crece sin límite",
          "group": "n"
        },
        {
          "id": "d",
          "text": "Las restricciones son contradictorias",
          "group": "v"
        }
      ],
      "hint": "Observa si hay un punto, un segmento, un crecimiento sin fin o ningún punto."
    },
    {
      "id": "check-valor",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Evalúa los vértices."
        }
      ],
      "title": "Valor óptimo múltiple",
      "question": "Con $Z = 2x + y$ en la región de las mesas y las sillas, ¿cuál es el valor máximo? (solo el número)",
      "correctAnswers": [
        "8"
      ],
      "explanation": "$Z(4, 0) = 8$ y $Z(2, 4) = 8$; también en todo el segmento que los une."
    },
    {
      "id": "check-nvert",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Mira la tabla de $Z$."
        }
      ],
      "title": "Vértices óptimos",
      "question": "En ese caso, ¿cuántos **vértices** alcanzan el máximo? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$(4, 0)$ y $(2, 4)$."
    },
    {
      "id": "check-vacia",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Comprueba si los semiplanos se solapan."
        }
      ],
      "title": "Región vacía",
      "question": "Si las restricciones son $x + y \\leq 2$ y $x + y \\geq 5$, la solución es…",
      "choices": [
        {
          "id": "a",
          "label": "vacía: no existe ningún punto factible"
        },
        {
          "id": "b",
          "label": "única, en el origen",
          "incorrectFeedback": "El origen no cumple $x + y \\geq 5$."
        },
        {
          "id": "c",
          "label": "no acotada",
          "incorrectFeedback": "No hay región."
        },
        {
          "id": "d",
          "label": "múltiple",
          "incorrectFeedback": "No hay puntos que cumplan las condiciones."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Ningún punto cumple las dos desigualdades."
    }
  ],
};
