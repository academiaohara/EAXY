import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_3_SUBTITLE } from "@/data/lessons/shared";

export const problemaTransporteCcss2Lesson: InteractiveLesson = {
  slug: "problema-transporte-ccss2",
  title: "10. Problema de transporte",
  subtitle: TEMA_CCSS2_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "enunciado",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Reparto de mercancía"
        }
      ],
      "title": "Reparto de mercancía",
      "blocks": [
        {
          "kind": "text",
          "text": "El almacén $A$ tiene $50$ unidades y el $B$, $40$. Las tiendas $T_1$ y $T_2$ piden $30$ y $45$. Costes por unidad: $A \\to T_1$: $3$ €, $A \\to T_2$: $5$ €, $B \\to T_1$: $4$ €, $B \\to T_2$: $2$ €."
        },
        {
          "kind": "steps",
          "items": [
            "Sea $x$ = unidades $A \\to T_1$ e $y$ = unidades $A \\to T_2$. Entonces $B \\to T_1 = 30 - x$ y $B \\to T_2 = 45 - y$.",
            "Disponibilidad de $A$: $x + y \\leq 50$. De $B$: $(30 - x) + (45 - y) \\leq 40 \\Rightarrow x + y \\geq 35$.",
            "Cantidades no negativas: $0 \\leq x \\leq 30$, $0 \\leq y \\leq 45$.",
            "Coste: $Z = 3x + 5y + 4(30 - x) + 2(45 - y) = -x + 3y + 210$ (minimizar)."
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "programacion-lineal-explorador",
        "initial": [
          5,
          195
        ],
        "hint": "Mínimo: Z = 195 en (30, 5): A manda 30 a T1 y 5 a T2; B manda 0 a T1 y 40 a T2."
      }
    },
    {
      "id": "check-min",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Compara los vértices."
        }
      ],
      "title": "Coste mínimo",
      "question": "¿Cuál es el coste mínimo del reparto? (€, solo el número)",
      "correctAnswers": [
        "195"
      ],
      "explanation": "$Z(30, 5) = -30 + 15 + 210 = 195$."
    },
    {
      "id": "check-bt2",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$B \\to T_2 = 45 - y$."
        }
      ],
      "title": "Envío de B",
      "question": "En el plan óptimo, ¿cuántas unidades manda $B$ a $T_2$? (solo el número)",
      "correctAnswers": [
        "40"
      ],
      "explanation": "$45 - y = 45 - 5 = 40$."
    },
    {
      "id": "check-otro",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Evalúa $Z = -x + 3y + 210$."
        }
      ],
      "title": "Otro plan",
      "question": "El plan $(x, y) = (30, 20)$ es factible. ¿Cuánto cuesta? (€, solo el número)",
      "correctAnswers": [
        "240"
      ],
      "explanation": "$Z = -30 + 60 + 210 = 240$."
    },
    {
      "id": "check-comprob",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Suma los cuatro costes."
        }
      ],
      "title": "Comprobar",
      "question": "En el plan óptimo, el coste directo es $3\\cdot30 + 5\\cdot5 + 4\\cdot0 + 2\\cdot40$, que vale…",
      "choices": [
        {
          "id": "a",
          "label": "$195$ €, igual que $Z(30, 5)$"
        },
        {
          "id": "b",
          "label": "$180$ €",
          "incorrectFeedback": "$90 + 25 + 0 + 80 = 195$."
        },
        {
          "id": "c",
          "label": "$210$ €",
          "incorrectFeedback": "Ese es el término constante, no el coste del plan."
        },
        {
          "id": "d",
          "label": "$240$ €",
          "incorrectFeedback": "Ese es el coste del plan $(30, 20)$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$90 + 25 + 0 + 80 = 195$."
    }
  ],
};
