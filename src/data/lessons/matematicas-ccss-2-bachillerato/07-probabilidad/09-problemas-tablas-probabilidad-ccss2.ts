import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_7_SUBTITLE } from "@/data/lessons/shared";

export const problemasTablasProbabilidadCcss2Lesson: InteractiveLesson = {
  slug: "problemas-tablas-probabilidad-ccss2",
  title: "9. Problemas con tablas de contingencia",
  subtitle: TEMA_CCSS2_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "enunciado",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Una encuesta de idiomas"
        }
      ],
      "title": "Una encuesta de idiomas",
      "blocks": [
        {
          "kind": "text",
          "text": "En un grupo de $200$ estudiantes, $120$ estudian inglés ($I$), $90$ estudian francés ($F$) y $40$ estudian los dos. Con la tabla de contingencia se contesta casi todo:"
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "I \\cap F = 40,\\quad I \\cap F^c = 80,\\quad I^c \\cap F = 50,\\quad I^c \\cap F^c = 30"
            },
            {
              "math": "P(I \\cup F) = \\dfrac{120 + 90 - 40}{200} = 0{,}85,\\quad P(I^c \\cap F^c) = 0{,}15"
            },
            {
              "math": "P(F \\mid I) = \\dfrac{40}{120} = \\dfrac13"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "tabla-contingencia-explorador",
        "initial": [
          2,
          40,
          50,
          80,
          30
        ],
        "hint": "Aquí A = estudia inglés y B = estudia francés. Mira marginales, condicionadas y si A y B son independientes."
      }
    },
    {
      "id": "check-union",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Suma las tres casillas que no son «ninguno»."
        }
      ],
      "title": "Inglés o francés",
      "question": "¿Cuál es la probabilidad de que un estudiante estudie inglés **o** francés? (decimal)",
      "correctAnswers": [
        "0.85",
        "0,85",
        "17/20"
      ],
      "explanation": "$\\dfrac{80 + 40 + 50}{200} = \\dfrac{170}{200} = 0{,}85$."
    },
    {
      "id": "check-ninguno",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Contrario de la unión."
        }
      ],
      "title": "Ninguno",
      "question": "¿Y de que no estudie ninguno de los dos? (decimal)",
      "correctAnswers": [
        "0.15",
        "0,15",
        "3/20"
      ],
      "explanation": "$1 - 0{,}85 = 0{,}15$, o $\\dfrac{30}{200}$."
    },
    {
      "id": "check-cond",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Restringe la tabla a los que estudian inglés."
        }
      ],
      "title": "Condicionada",
      "question": "Sabiendo que estudia inglés, ¿cuál es la probabilidad de que también estudie francés? (fracción o decimal)",
      "correctAnswers": [
        "1/3",
        "0.3333",
        "0,3333",
        "0.333",
        "0,333"
      ],
      "explanation": "$\\dfrac{40}{120} = \\dfrac13$."
    },
    {
      "id": "check-ind",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Compara con el producto."
        }
      ],
      "title": "¿Independientes?",
      "question": "$P(I) = 0{,}6$, $P(F) = 0{,}45$ y $P(I \\cap F) = 0{,}2$. Entonces $I$ y $F$ son…",
      "choices": [
        {
          "id": "a",
          "label": "dependientes, porque $0{,}6\\cdot0{,}45 = 0{,}27 \\neq 0{,}2$"
        },
        {
          "id": "b",
          "label": "independientes, porque $P(I\\cap F) < P(I)$",
          "incorrectFeedback": "Eso ocurre siempre; no prueba nada."
        },
        {
          "id": "c",
          "label": "incompatibles, porque $P(I\\cap F) \\neq 0$",
          "incorrectFeedback": "Si $P(I \\cap F) > 0$ no son incompatibles."
        },
        {
          "id": "d",
          "label": "independientes, porque $P(F) < P(I)$",
          "incorrectFeedback": "La independencia exige $P(I \\cap F) = P(I)P(F)$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Para ser independientes tendría que valer $0{,}27$."
    }
  ],
};
