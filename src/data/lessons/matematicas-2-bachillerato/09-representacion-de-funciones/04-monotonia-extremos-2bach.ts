import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_9_SUBTITLE } from "@/data/lessons/shared";

export const monotoniaExtremos2bachLesson: InteractiveLesson = {
  slug: "monotonia-extremos-2bach",
  title: "4. Monotonía y extremos relativos",
  subtitle: TEMA_2BACH_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "procedimiento",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Estudiar f′"
        }
      ],
      "title": "Estudiar f′",
      "blocks": [
        {
          "kind": "steps",
          "items": [
            "Calcula $f'$ y resuelve $f'(x) = 0$ (y los puntos donde no existe).",
            "Estudia el **signo de $f'$** en los intervalos resultantes.",
            "$f'>0$: creciente; $f'<0$: decreciente. Cambio de $+$ a $-$: máximo; de $-$ a $+$: mínimo."
          ]
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "f(x) = 2x^3 - 9x^2 + 12x + 1,\\quad f'(x) = 6(x - 1)(x - 2)"
            },
            {
              "math": "f' > 0 \\text{ en } (-\\infty, 1) \\cup (2, +\\infty);\\ f' < 0 \\text{ en } (1, 2)"
            },
            {
              "math": "\\text{Máximo } (1, 6),\\quad \\text{mínimo } (2, 5)"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "estudio-funcion-explorador",
        "initial": [
          0,
          5
        ],
        "hint": "Hasta el paso 5 se ven el máximo y el mínimo de x³ − 3x² + 2."
      }
    },
    {
      "id": "check-max",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $x = 1$."
        }
      ],
      "title": "Valor del máximo",
      "question": "Para $f(x) = 2x^3 - 9x^2 + 12x + 1$, ¿cuánto vale $f(1)$ (máximo relativo)? (solo el número)",
      "correctAnswers": [
        "6"
      ],
      "explanation": "$2 - 9 + 12 + 1 = 6$."
    },
    {
      "id": "check-min",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $x = 2$."
        }
      ],
      "title": "Valor del mínimo",
      "question": "Con la misma función, ¿cuánto vale el mínimo relativo $f(2)$? (solo el número)",
      "correctAnswers": [
        "5"
      ],
      "explanation": "$16 - 36 + 24 + 1 = 5$."
    },
    {
      "id": "check-crece",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Signo de la parábola."
        }
      ],
      "title": "Intervalos",
      "question": "Esa función es decreciente en…",
      "choices": [
        {
          "id": "a",
          "label": "$(1, 2)$"
        },
        {
          "id": "b",
          "label": "$(-\\\\infty, 1)$",
          "incorrectFeedback": "Ahí $f' > 0$: es creciente."
        },
        {
          "id": "c",
          "label": "$(2, +\\\\infty)$",
          "incorrectFeedback": "Ahí también crece."
        },
        {
          "id": "d",
          "label": "todo $\\\\mathbb{R}$",
          "incorrectFeedback": "Tiene extremos relativos, luego no es monótona."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$f'(x) = 6(x - 1)(x - 2) < 0$ solo entre las raíces."
    },
    {
      "id": "check-nada",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Recuerda $x^3$."
        }
      ],
      "title": "Punto crítico sin extremo",
      "question": "Si $f'(a) = 0$ pero $f'$ **no** cambia de signo en $a$…",
      "choices": [
        {
          "id": "a",
          "label": "no hay extremo en $a$ (como en $f(x) = x^3$ en $0$)"
        },
        {
          "id": "b",
          "label": "hay un máximo",
          "incorrectFeedback": "Para un máximo $f'$ debe pasar de $+$ a $-$."
        },
        {
          "id": "c",
          "label": "hay un mínimo",
          "incorrectFeedback": "Para un mínimo debe pasar de $-$ a $+$."
        },
        {
          "id": "d",
          "label": "la función no es derivable",
          "incorrectFeedback": "Sí lo es: $f'(a) = 0$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Es un punto de tangente horizontal, no un extremo."
    }
  ],
};
