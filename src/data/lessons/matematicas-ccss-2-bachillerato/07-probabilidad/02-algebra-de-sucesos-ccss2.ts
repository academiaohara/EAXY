import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_7_SUBTITLE } from "@/data/lessons/shared";

export const algebraDeSucesosCcss2Lesson: InteractiveLesson = {
  slug: "algebra-de-sucesos-ccss2",
  title: "2. Álgebra de sucesos",
  subtitle: TEMA_CCSS2_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "operaciones",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Operaciones con sucesos"
        }
      ],
      "title": "Operaciones con sucesos",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "A \\cup B",
              "label": "unión: ocurre $A$ o $B$ (o ambos)"
            },
            {
              "tex": "A \\cap B",
              "label": "intersección: ocurren $A$ y $B$ a la vez"
            },
            {
              "tex": "A^c",
              "label": "contrario: no ocurre $A$"
            },
            {
              "tex": "A - B = A \\cap B^c",
              "label": "diferencia: ocurre $A$ y no $B$"
            }
          ]
        },
        {
          "kind": "text",
          "text": "Dos sucesos son **incompatibles** si $A \\cap B = \\varnothing$. Un suceso y su contrario siempre lo son, y $A \\cup A^c = E$."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "sucesos-venn-explorador",
        "initial": [
          0,
          2,
          0
        ],
        "hint": "Con A = par y B = múltiplo de 3: A ∪ B = {2, 3, 4, 6}, A ∩ B = {6} y A − B = {2, 4}."
      }
    },
    {
      "id": "morgan",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Leyes de De Morgan"
        }
      ],
      "title": "Leyes de De Morgan",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "(A \\cup B)^c = A^c \\cap B^c",
              "label": "el contrario de una unión es la intersección de los contrarios"
            },
            {
              "tex": "(A \\cap B)^c = A^c \\cup B^c",
              "label": "el contrario de una intersección es la unión de los contrarios"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "sucesos-venn-explorador",
        "initial": [
          0,
          2,
          4
        ],
        "hint": "Compara (A ∪ B)ᶜ con Aᶜ ∩ Bᶜ: dan el mismo conjunto."
      }
    },
    {
      "id": "check-union",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "No cuentes el $6$ dos veces."
        }
      ],
      "title": "Una unión",
      "question": "Con $A = \\{2, 4, 6\\}$ y $B = \\{3, 6\\}$, ¿cuántos elementos tiene $A \\cup B$? (solo el número)",
      "correctAnswers": [
        "4"
      ],
      "explanation": "$A \\cup B = \\{2, 3, 4, 6\\}$."
    },
    {
      "id": "check-diff",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Quita de $A$ lo que está en $B$."
        }
      ],
      "title": "Una diferencia",
      "question": "Con los mismos sucesos, ¿cuántos elementos tiene $A - B$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$A - B = \\{2, 4\\}$: pares que no son múltiplo de $3$."
    },
    {
      "id": "check-morgan",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Elementos de $E$ que no están en $A \\cup B$."
        }
      ],
      "title": "De Morgan",
      "question": "Con los mismos sucesos, ¿cuántos elementos tiene $(A \\cup B)^c$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$(A \\cup B)^c = \\{1, 5\\}$ (y coincide con $A^c \\cap B^c$)."
    },
    {
      "id": "check-incomp",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Busca si comparten algún resultado."
        }
      ],
      "title": "Incompatibles",
      "question": "Al lanzar un dado, ¿qué pareja de sucesos es incompatible?",
      "choices": [
        {
          "id": "a",
          "label": "«sale par» y «sale impar»"
        },
        {
          "id": "b",
          "label": "«sale par» y «sale múltiplo de 3»",
          "incorrectFeedback": "Ambos ocurren si sale $6$."
        },
        {
          "id": "c",
          "label": "«sale mayor que 2» y «sale par»",
          "incorrectFeedback": "Ambos ocurren si sale $4$ o $6$."
        },
        {
          "id": "d",
          "label": "«sale primo» y «sale impar»",
          "incorrectFeedback": "Ambos ocurren si sale $3$ o $5$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Un número no puede ser par e impar a la vez."
    }
  ],
};
