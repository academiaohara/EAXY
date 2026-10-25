import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_3_SUBTITLE } from "@/data/lessons/shared";

export const planteamientoPlCcss2Lesson: InteractiveLesson = {
  slug: "planteamiento-pl-ccss2",
  title: "4. Programación lineal: modelizar un problema",
  subtitle: TEMA_CCSS2_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "modelo",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Qué es la programación lineal"
        }
      ],
      "title": "Qué es la programación lineal",
      "blocks": [
        {
          "kind": "text",
          "text": "La **programación lineal** busca el **máximo** o el **mínimo** de una función lineal (la **función objetivo**) cuando las variables deben cumplir un sistema de inecuaciones lineales (las **restricciones**). Se usa para repartir recursos, mezclar productos, planificar transporte…"
        },
        {
          "kind": "steps",
          "items": [
            "Elige las **variables de decisión** ($x$, $y$) y di qué representan.",
            "Escribe la **función objetivo** $Z = ax + by$ (beneficio, coste…).",
            "Traduce cada condición a una **restricción** lineal, sin olvidar $x \\geq 0$, $y \\geq 0$.",
            "Dibuja la región factible y busca el óptimo."
          ]
        }
      ]
    },
    {
      "id": "ejemplo",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Ejemplo: mesas y sillas"
        }
      ],
      "title": "Ejemplo: mesas y sillas",
      "blocks": [
        {
          "kind": "text",
          "text": "Un taller fabrica **mesas** ($x$) y **sillas** ($y$). Cada pieza necesita un tablón y hay $6$ al día. Una mesa requiere $2$ h de carpintería y una silla $1$ h, con $8$ h disponibles. Cada mesa deja $30$ € de beneficio y cada silla $20$ €."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "Z = 30x + 20y\\ \\ (\\max)"
            },
            {
              "math": "x + y \\leq 6,\\quad 2x + y \\leq 8,\\quad x \\geq 0,\\ y \\geq 0"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "programacion-lineal-explorador",
        "initial": [
          0,
          120
        ],
        "hint": "Modelo del taller: la recta Z = 120 pasa por (4, 0) y (0, 6). Cambia Z y observa cuándo deja de tocar la región."
      }
    },
    {
      "id": "check-elementos",
      "type": "classify",
      "help": [
        {
          "label": "Pista",
          "message": "Pregúntate qué se decide, qué se optimiza y qué limita."
        }
      ],
      "title": "Elementos del modelo",
      "question": "Clasifica cada elemento del problema de las mesas y las sillas.",
      "groups": [
        {
          "id": "var",
          "label": "Variable de decisión",
          "tone": "amber"
        },
        {
          "id": "obj",
          "label": "Función objetivo",
          "tone": "emerald"
        },
        {
          "id": "res",
          "label": "Restricción",
          "tone": "rose"
        }
      ],
      "items": [
        {
          "id": "a",
          "text": "$x$ = número de mesas",
          "group": "var"
        },
        {
          "id": "b",
          "text": "$y$ = número de sillas",
          "group": "var"
        },
        {
          "id": "c",
          "text": "$Z = 30x + 20y$",
          "group": "obj"
        },
        {
          "id": "d",
          "text": "$x + y \\leq 6$",
          "group": "res"
        },
        {
          "id": "e",
          "text": "$2x + y \\leq 8$",
          "group": "res"
        },
        {
          "id": "f",
          "text": "$y \\geq 0$",
          "group": "res"
        }
      ],
      "hint": "Las variables se definen, la función objetivo se optimiza y las restricciones limitan los valores."
    },
    {
      "id": "check-beneficio",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Evalúa $Z = 30x + 20y$."
        }
      ],
      "title": "Beneficio de un plan",
      "question": "Si se fabrican $2$ mesas y $3$ sillas, ¿qué beneficio se obtiene? (€, solo el número)",
      "correctAnswers": [
        "120"
      ],
      "explanation": "$30\\cdot2 + 20\\cdot3 = 60 + 60 = 120$."
    },
    {
      "id": "check-horas",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Mesa: $2$ h, silla: $1$ h."
        }
      ],
      "title": "Horas usadas",
      "question": "Con $2$ mesas y $3$ sillas, ¿cuántas horas de carpintería se emplean? (solo el número)",
      "correctAnswers": [
        "7"
      ],
      "explanation": "$2\\cdot2 + 1\\cdot3 = 7 \\leq 8$: el plan es factible."
    }
  ],
};
