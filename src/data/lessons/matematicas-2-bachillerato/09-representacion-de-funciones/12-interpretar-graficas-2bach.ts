import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_9_SUBTITLE } from "@/data/lessons/shared";

export const interpretarGraficas2bachLesson: InteractiveLesson = {
  slug: "interpretar-graficas-2bach",
  title: "12. Interpretar la gráfica de una función y de sus derivadas",
  subtitle: TEMA_2BACH_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "lectura",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Qué dice cada derivada"
        }
      ],
      "title": "Qué dice cada derivada",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "f'(a) = 0 \\text{ y } f' \\text{ pasa de } + \\text{ a } -",
              "label": "máximo relativo"
            },
            {
              "tex": "f'(a) = 0 \\text{ y } f' \\text{ pasa de } - \\text{ a } +",
              "label": "mínimo relativo"
            },
            {
              "tex": "f''(a) = 0 \\text{ y } f'' \\text{ cambia de signo}",
              "label": "punto de inflexión"
            }
          ]
        },
        {
          "kind": "text",
          "text": "Si la gráfica de $f'$ está por encima del eje $X$, $f$ crece; donde $f'$ crece, $f$ es convexa."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "estudio-funcion-explorador",
        "initial": [
          1,
          6
        ],
        "hint": "Sigue los pasos: el signo de f′ explica por qué la gráfica sube y baja."
      }
    },
    {
      "id": "check-clasifica",
      "type": "classify",
      "help": [
        {
          "label": "Pista",
          "message": "Aplica los criterios."
        }
      ],
      "title": "¿Qué ocurre en a?",
      "question": "Clasifica cada situación en $x = a$.",
      "groups": [
        {
          "id": "max",
          "label": "Máximo relativo",
          "tone": "rose"
        },
        {
          "id": "min",
          "label": "Mínimo relativo",
          "tone": "emerald"
        },
        {
          "id": "inf",
          "label": "Punto de inflexión",
          "tone": "amber"
        }
      ],
      "items": [
        {
          "id": "a",
          "text": "$f'(a) = 0$ y $f''(a) = -4$",
          "group": "max"
        },
        {
          "id": "b",
          "text": "$f'(a) = 0$ y $f''(a) = 6$",
          "group": "min"
        },
        {
          "id": "c",
          "text": "$f''(a) = 0$ y $f''$ cambia de $-$ a $+$",
          "group": "inf"
        },
        {
          "id": "d",
          "text": "$f'$ pasa de $+$ a $-$ en $a$",
          "group": "max"
        },
        {
          "id": "e",
          "text": "$f'$ pasa de $-$ a $+$ en $a$",
          "group": "min"
        },
        {
          "id": "f",
          "text": "$f'' = 0$ y $f'''(a) \\neq 0$",
          "group": "inf"
        }
      ],
      "hint": "El criterio de la segunda derivada decide si $f'(a) = 0$: $f'' < 0$ máximo, $f'' > 0$ mínimo."
    },
    {
      "id": "check-ext",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Usa la simetría."
        }
      ],
      "title": "Valor en el máximo",
      "question": "$f(x) = \\dfrac{x}{x^2 + 1}$ tiene un máximo en $x = 1$ y su gráfica es simétrica respecto del origen. ¿Cuánto vale su mínimo relativo? (decimal o fracción)",
      "correctAnswers": [
        "-1/2",
        "−1/2",
        "-0.5",
        "-0,5",
        "−0,5",
        "−0.5"
      ],
      "explanation": "Impar: $f(-1) = -f(1) = -\\dfrac12$."
    },
    {
      "id": "check-deriv",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Imagina subir y luego bajar."
        }
      ],
      "title": "Leer f′",
      "question": "Si la gráfica de $f'$ corta al eje $X$ en $x = a$ pasando de positiva a negativa, $f$ tiene en $a$…",
      "choices": [
        {
          "id": "a",
          "label": "un máximo relativo"
        },
        {
          "id": "b",
          "label": "un mínimo relativo",
          "incorrectFeedback": "Eso sería de negativa a positiva."
        },
        {
          "id": "c",
          "label": "un punto de inflexión",
          "incorrectFeedback": "La inflexión aparece en los extremos de $f'$, no en sus ceros."
        },
        {
          "id": "d",
          "label": "una asíntota",
          "incorrectFeedback": "No tiene relación."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$f$ pasa de crecer a decrecer."
    },
    {
      "id": "check-cortes",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Resuelve $f' = 0$."
        }
      ],
      "title": "Ceros de f′",
      "question": "Si $f'(x) = 3x^2 - 12$, ¿para qué valor positivo de $x$ se anula? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$3x^2 = 12 \\Rightarrow x = \\pm 2$."
    }
  ],
};
