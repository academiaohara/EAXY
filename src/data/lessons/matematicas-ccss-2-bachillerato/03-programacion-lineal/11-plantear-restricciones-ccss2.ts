import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_3_SUBTITLE } from "@/data/lessons/shared";

export const plantearRestriccionesCcss2Lesson: InteractiveLesson = {
  slug: "plantear-restricciones-ccss2",
  title: "11. Traducir enunciados a restricciones",
  subtitle: TEMA_CCSS2_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "traducir",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Del lenguaje a las desigualdades"
        }
      ],
      "title": "Del lenguaje a las desigualdades",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "\\leq",
              "label": "como máximo, no más de, hasta, a lo sumo, disponible"
            },
            {
              "tex": "\\geq",
              "label": "al menos, como mínimo, no menos de, por lo menos, necesario"
            },
            {
              "tex": "=",
              "label": "exactamente, justo"
            }
          ]
        },
        {
          "kind": "text",
          "text": "Tras traducir, hay que comprobar que los coeficientes de cada restricción corresponden a las **mismas unidades** (horas con horas, kilos con kilos) y añadir siempre $x \\geq 0$, $y \\geq 0$."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "programacion-lineal-explorador",
        "initial": [
          6,
          18
        ],
        "hint": "Con 4 restricciones y Z = 5x + 4y: observa qué lados de la región son restricciones y cuáles son ejes."
      }
    },
    {
      "id": "check-signo",
      "type": "classify",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en un tope o en un mínimo."
        }
      ],
      "title": "¿≤ o ≥?",
      "question": "Elige el símbolo que corresponde a cada frase.",
      "groups": [
        {
          "id": "le",
          "label": "≤",
          "tone": "emerald"
        },
        {
          "id": "ge",
          "label": "≥",
          "tone": "rose"
        }
      ],
      "items": [
        {
          "id": "a",
          "text": "«como máximo 6 tablones»",
          "group": "le"
        },
        {
          "id": "b",
          "text": "«al menos 8 unidades de proteínas»",
          "group": "ge"
        },
        {
          "id": "c",
          "text": "«no más de 24 kg de materia prima»",
          "group": "le"
        },
        {
          "id": "d",
          "text": "«como mínimo 10 de calcio»",
          "group": "ge"
        },
        {
          "id": "e",
          "text": "«a lo sumo 8 horas»",
          "group": "le"
        },
        {
          "id": "f",
          "text": "«no menos de 3 pedidos»",
          "group": "ge"
        }
      ],
      "hint": "«Máximo, no más, a lo sumo» indican límite superior; «mínimo, al menos, no menos» indican límite inferior."
    },
    {
      "id": "check-coef",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Horas por mesa."
        }
      ],
      "title": "Coeficiente",
      "question": "Una mesa necesita $2$ h y una silla $1$ h, con $8$ h disponibles: $a\\,x + y \\leq 8$. ¿Cuánto vale $a$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "Cada mesa consume $2$ h, luego el coeficiente de $x$ es $2$."
    },
    {
      "id": "check-dif",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$y$ puede superar a $x$ hasta en $1$."
        }
      ],
      "title": "Diferencia",
      "question": "«El número de unidades de $B$ no supera en más de $1$ al de $A$» se escribe $y - x \\leq k$. ¿Cuánto vale $k$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$y \\leq x + 1 \\iff -x + y \\leq 1$."
    },
    {
      "id": "check-olvido",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en qué significan $x$ e $y$."
        }
      ],
      "title": "Un olvido frecuente",
      "question": "¿Qué restricción se olvida con más frecuencia al plantear un problema?",
      "choices": [
        {
          "id": "a",
          "label": "$x \\geq 0$ e $y \\geq 0$"
        },
        {
          "id": "b",
          "label": "la función objetivo",
          "incorrectFeedback": "No es una restricción."
        },
        {
          "id": "c",
          "label": "el signo de $Z$",
          "incorrectFeedback": "No es una restricción."
        },
        {
          "id": "d",
          "label": "el punto $(0, 0)$",
          "incorrectFeedback": "No es una condición."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Las cantidades fabricadas o enviadas no pueden ser negativas."
    }
  ],
};
