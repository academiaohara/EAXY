import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_11_SUBTITLE } from "@/data/lessons/shared";

export const asignacionProbabilidades2bachLesson: InteractiveLesson = {
  slug: "asignacion-probabilidades-2bach",
  title: "3. Asignación de probabilidades",
  subtitle: TEMA_2BACH_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "laplace",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Regla de Laplace"
        }
      ],
      "title": "Regla de Laplace",
      "blocks": [
        {
          "kind": "rule",
          "title": "Laplace",
          "text": "Si los resultados son **equiprobables**:",
          "formula": "P(A) = \\dfrac{\\text{casos favorables}}{\\text{casos posibles}}"
        },
        {
          "kind": "text",
          "text": "Cuando no son equiprobables, se asigna la **frecuencia relativa** observada en muchas repeticiones: por la **ley de los grandes números**, $\\dfrac{n_A}{n}$ se acerca a $P(A)$ al aumentar $n$."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\text{Dado: } P(\\text{par}) = \\dfrac36 = \\dfrac12"
            },
            {
              "math": "\\text{Dos dados, suma 7: } \\dfrac{6}{36} = \\dfrac16"
            },
            {
              "math": "\\text{Baraja de 40: } P(\\text{as}) = \\dfrac{4}{40} = \\dfrac1{10}"
            }
          ]
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "espacio-muestral"
      }
    },
    {
      "id": "check-oros",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Hay $10$ cartas de cada palo."
        }
      ],
      "title": "Una baraja española",
      "question": "Sacamos una carta de una baraja española de $40$ cartas. ¿Cuál es la probabilidad de que sea de oros? (decimal)",
      "correctAnswers": [
        "0.25",
        "0,25",
        "1/4"
      ],
      "explanation": "$\\dfrac{10}{40} = 0{,}25$."
    },
    {
      "id": "check-siete",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Cuenta las parejas ordenadas."
        }
      ],
      "title": "Suma 7",
      "question": "Lanzamos dos dados. ¿Cuántos resultados de los $36$ posibles suman $7$? (solo el número)",
      "correctAnswers": [
        "6"
      ],
      "explanation": "$(1,6), (2,5), (3,4), (4,3), (5,2), (6,1)$."
    },
    {
      "id": "check-suma12",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "¿Qué dados dan $12$?"
        }
      ],
      "title": "Suma 12",
      "question": "En el mismo experimento, ¿cuántos resultados suman $12$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "Solo $(6, 6)$, así $P = \\dfrac1{36}$."
    },
    {
      "id": "check-equi",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Busca el experimento sin simetría."
        }
      ],
      "title": "¿Se puede usar Laplace?",
      "question": "¿En qué caso **no** se puede usar la regla de Laplace directamente?",
      "choices": [
        {
          "id": "a",
          "label": "Una chincheta lanzada, con «punta arriba» y «punta abajo»"
        },
        {
          "id": "b",
          "label": "Lanzar una moneda equilibrada",
          "incorrectFeedback": "Las dos caras son equiprobables."
        },
        {
          "id": "c",
          "label": "Sacar una bola de una urna con bolas idénticas",
          "incorrectFeedback": "Todas las bolas son equiprobables."
        },
        {
          "id": "d",
          "label": "Lanzar un dado equilibrado",
          "incorrectFeedback": "Las seis caras son equiprobables."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "La chincheta no tiene dos resultados con la misma probabilidad: se estima por frecuencia relativa."
    }
  ],
};
