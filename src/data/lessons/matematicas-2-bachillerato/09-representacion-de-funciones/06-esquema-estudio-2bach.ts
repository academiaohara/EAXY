import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_9_SUBTITLE } from "@/data/lessons/shared";

export const esquemaEstudio2bachLesson: InteractiveLesson = {
  slug: "esquema-estudio-2bach",
  title: "6. Esquema para representar una función",
  subtitle: TEMA_2BACH_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "esquema",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Seis pasos ordenados"
        }
      ],
      "title": "Seis pasos ordenados",
      "blocks": [
        {
          "kind": "steps",
          "items": [
            "**Dominio** y discontinuidades.",
            "**Cortes** con los ejes y signo.",
            "**Simetría** y periodicidad.",
            "**Asíntotas** y ramas del infinito.",
            "**Monotonía** y extremos ($f'$).",
            "**Curvatura** e inflexiones ($f''$). Después, una **tabla** de valores y la gráfica."
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "estudio-funcion-explorador",
        "initial": [
          2,
          0
        ],
        "hint": "Avanza paso a paso con x + 1/x: cada dato aparece en la gráfica."
      }
    },
    {
      "id": "check-ext",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye."
        }
      ],
      "title": "Un estudio completo",
      "question": "En el estudio de $f(x) = x^3 - 3x^2 + 2$, el mínimo relativo está en $x = 2$. ¿Cuánto vale $f(2)$? (solo el número)",
      "correctAnswers": [
        "-2",
        "−2"
      ],
      "explanation": "$8 - 12 + 2 = -2$."
    },
    {
      "id": "check-infl",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye."
        }
      ],
      "title": "Y la inflexión",
      "question": "La inflexión de esa función está en $x = 1$. ¿Cuánto vale $f(1)$? (solo el número)",
      "correctAnswers": [
        "0"
      ],
      "explanation": "$1 - 3 + 2 = 0$: pasa justo por $(1, 0)$."
    },
    {
      "id": "check-orden",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Empieza por lo más sencillo."
        }
      ],
      "title": "El orden importa",
      "question": "Antes de calcular asíntotas y extremos, conviene estudiar siempre…",
      "choices": [
        {
          "id": "a",
          "label": "el dominio y la simetría, que reducen el trabajo"
        },
        {
          "id": "b",
          "label": "la segunda derivada",
          "incorrectFeedback": "Se usa al final."
        },
        {
          "id": "c",
          "label": "el área bajo la curva",
          "incorrectFeedback": "No es de este capítulo."
        },
        {
          "id": "d",
          "label": "el límite en $+\\infty$ solo",
          "incorrectFeedback": "Hay que mirar también $-\\infty$ y los puntos excluidos."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Saber dónde existe $f$ y si es par o impar ahorra cálculos."
    },
    {
      "id": "check-simetria",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Par: $f(-x) = f(x)$."
        }
      ],
      "title": "Aprovechar la simetría",
      "question": "$f(x) = x^4 - 2x^2$ es par y tiene mínimos en $x = \\pm 1$ con $f(1) = -1$. ¿Cuánto vale $f(-1)$? (solo el número)",
      "correctAnswers": [
        "-1",
        "−1"
      ],
      "explanation": "Par: $f(-1) = f(1) = -1$."
    }
  ],
};
