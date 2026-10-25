import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_8_SUBTITLE } from "@/data/lessons/shared";

export const curvaturaInflexion2bachLesson: InteractiveLesson = {
  slug: "curvatura-inflexion-2bach",
  title: "11. Curvatura y puntos de inflexión",
  subtitle: TEMA_2BACH_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "curvatura",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Segunda derivada"
        }
      ],
      "title": "Segunda derivada",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "f'' > 0",
              "label": "convexa (∪, cóncava hacia arriba)"
            },
            {
              "tex": "f'' < 0",
              "label": "cóncava (∩, hacia abajo)"
            },
            {
              "tex": "f''(a) = 0\\ \\text{y cambia de signo}",
              "label": "punto de inflexión"
            }
          ]
        },
        {
          "kind": "text",
          "text": "En un punto de inflexión la gráfica pasa de curvarse hacia un lado a curvarse hacia el otro, atravesando la tangente."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "extremos-explorador",
        "initial": [
          1,
          -3,
          3,
          0
        ],
        "hint": "x³ − 3x: f'' = 6x cambia de signo en x = 0 (inflexión)."
      }
    },
    {
      "id": "check-inflex",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Resuelve $f''(x) = 0$."
        }
      ],
      "title": "Punto de inflexión",
      "question": "Para $f(x) = x^4 - 6x^2$, $f''(x) = 12x^2 - 12$ se anula en $x = \\pm a$. ¿Cuánto vale $a > 0$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$12x^2 - 12 = 0 \\Rightarrow x = \\pm 1$, y $f''$ cambia de signo en ambos."
    },
    {
      "id": "check-seg",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$f'' = 6x$."
        }
      ],
      "title": "Criterio de la segunda derivada",
      "question": "Para $f(x) = x^3 - 3x$, ¿cuánto vale $f''(-1)$? (solo el número)",
      "correctAnswers": [
        "-6",
        "−6"
      ],
      "explanation": "$f''(x) = 6x$ y $f''(-1) = -6 < 0$: máximo relativo en $x = -1$."
    },
    {
      "id": "check-signo",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Imagina la parábola."
        }
      ],
      "title": "Qué indica",
      "question": "Si $f'(a) = 0$ y $f''(a) > 0$, en $x = a$ hay…",
      "choices": [
        {
          "id": "a",
          "label": "un mínimo relativo"
        },
        {
          "id": "b",
          "label": "un máximo relativo",
          "incorrectFeedback": "Con $f'' > 0$ la gráfica es convexa: mínimo."
        },
        {
          "id": "c",
          "label": "un punto de inflexión",
          "incorrectFeedback": "Un punto de inflexión necesita $f'' = 0$."
        },
        {
          "id": "d",
          "label": "nada concluyente",
          "incorrectFeedback": "El criterio sí decide en este caso."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Gráfica con forma de «U»."
    },
    {
      "id": "check-mas",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Signo de $6x$."
        }
      ],
      "title": "Intervalos de convexidad",
      "question": "$f(x) = x^3 - 3x$ es convexa (∪) para $x > a$. ¿Cuánto vale $a$? (solo el número)",
      "correctAnswers": [
        "0"
      ],
      "explanation": "$f''(x) = 6x > 0 \\iff x > 0$."
    }
  ],
};
