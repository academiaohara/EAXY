import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_9_SUBTITLE } from "@/data/lessons/shared";

export const funcionesRadicalesValorAbsoluto2bachLesson: InteractiveLesson = {
  slug: "funciones-radicales-valor-absoluto-2bach",
  title: "9. Radicales, valores absolutos y funciones a trozos",
  subtitle: TEMA_2BACH_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "abs",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Quitar el valor absoluto"
        }
      ],
      "title": "Quitar el valor absoluto",
      "blocks": [
        {
          "kind": "text",
          "text": "Una función con $|\\cdot|$ o a trozos se estudia **por tramos**: se resuelve el signo de lo que hay dentro del valor absoluto y se representa cada trozo. En los puntos de empalme se estudia la continuidad y la derivabilidad."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "f(x) = |x - 2| = \\begin{cases} 2 - x & x < 2 \\\\ x - 2 & x \\geq 2 \\end{cases}\\ \\ \\text{(vértice en } (2, 0)\\text{, no derivable)}"
            }
          ]
        },
        {
          "kind": "text",
          "text": "En los radicales, el **dominio** se obtiene de $\\text{radicando} \\geq 0$; por ejemplo $\\sqrt{4 - x^2}$ está definida en $[-2, 2]$ (media circunferencia)."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "trozos-explorador",
        "hint": "Cambia de función y de x para ver qué tramo se usa en cada punto y si los tramos empalman."
      }
    },
    {
      "id": "check-abs",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "El valor absoluto del resultado."
        }
      ],
      "title": "Evaluar",
      "question": "Calcula $f(0)$ para $f(x) = |x^2 - 4|$. (solo el número)",
      "correctAnswers": [
        "4"
      ],
      "explanation": "$|0 - 4| = 4$."
    },
    {
      "id": "check-dom",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Resuelve $4 - x^2 \\geq 0$."
        }
      ],
      "title": "Longitud del dominio",
      "question": "El dominio de $f(x) = \\sqrt{4 - x^2}$ es un intervalo $[-a, a]$. ¿Cuánto vale $a$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$4 - x^2 \\geq 0 \\iff |x| \\leq 2$."
    },
    {
      "id": "check-trozos",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Elige el tramo correcto."
        }
      ],
      "title": "Una función a trozos",
      "question": "$f(x) = x^2$ si $x \\leq 1$ y $f(x) = 2 - x$ si $x > 1$. ¿Cuánto vale $f(3)$? (solo el número)",
      "correctAnswers": [
        "-1",
        "−1"
      ],
      "explanation": "Para $x > 1$: $2 - 3 = -1$."
    },
    {
      "id": "check-deriv",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Mira las pendientes de las dos rectas."
        }
      ],
      "title": "Derivabilidad en el empalme",
      "question": "La función $f(x) = |x - 2|$ en $x = 2$ es…",
      "choices": [
        {
          "id": "a",
          "label": "continua pero no derivable (las derivadas laterales son $-1$ y $1$)"
        },
        {
          "id": "b",
          "label": "derivable con $f'(2) = 0$",
          "incorrectFeedback": "Las pendientes laterales son $\\pm 1$."
        },
        {
          "id": "c",
          "label": "discontinua",
          "incorrectFeedback": "Es continua: vale $0$ por los dos lados."
        },
        {
          "id": "d",
          "label": "derivable con $f'(2) = 1$",
          "incorrectFeedback": "Solo por la derecha."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Tiene un «pico» en el vértice."
    }
  ],
};
