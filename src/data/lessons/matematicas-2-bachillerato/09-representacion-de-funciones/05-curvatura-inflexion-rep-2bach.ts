import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_9_SUBTITLE } from "@/data/lessons/shared";

export const curvaturaInflexionRep2bachLesson: InteractiveLesson = {
  slug: "curvatura-inflexion-rep-2bach",
  title: "5. Curvatura y puntos de inflexión",
  subtitle: TEMA_2BACH_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "f2",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "El signo de f″"
        }
      ],
      "title": "El signo de f″",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "f'' > 0",
              "label": "convexa ∪"
            },
            {
              "tex": "f'' < 0",
              "label": "cóncava ∩"
            },
            {
              "tex": "f''(a) = 0,\\ f'' \\text{ cambia de signo}",
              "label": "inflexión"
            }
          ]
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "f(x) = 2x^3 - 9x^2 + 12x + 1,\\quad f''(x) = 12x - 18"
            },
            {
              "math": "f'' = 0 \\iff x = \\tfrac32 \\Rightarrow \\text{inflexión en } \\left(\\tfrac32,\\ \\tfrac{11}{2}\\right)"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "estudio-funcion-explorador",
        "initial": [
          0,
          6
        ],
        "hint": "x³ − 3x² + 2: f″ = 6x − 6, inflexión en (1, 0)."
      }
    },
    {
      "id": "check-x",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Resuelve $f'' = 0$."
        }
      ],
      "title": "Dónde se anula",
      "question": "Para $f(x) = 2x^3 - 9x^2 + 12x + 1$, la inflexión está en $x = a$. ¿Cuánto vale $a$? (decimal o fracción)",
      "correctAnswers": [
        "3/2",
        "1.5",
        "1,5"
      ],
      "explanation": "$12x - 18 = 0 \\Rightarrow x = \\dfrac32$."
    },
    {
      "id": "check-y",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye con fracciones."
        }
      ],
      "title": "Ordenada de la inflexión",
      "question": "¿Cuánto vale $f\\left(\\tfrac32\\right)$ para esa función? (decimal o fracción)",
      "correctAnswers": [
        "11/2",
        "5.5",
        "5,5"
      ],
      "explanation": "$2\\cdot\\tfrac{27}{8} - 9\\cdot\\tfrac94 + 18 + 1 = 6{,}75 - 20{,}25 + 19 = 5{,}5$."
    },
    {
      "id": "check-convexa",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Signo de $f''$."
        }
      ],
      "title": "Convexa",
      "question": "La función de arriba es convexa (∪) cuando…",
      "choices": [
        {
          "id": "a",
          "label": "$x > \\tfrac32$"
        },
        {
          "id": "b",
          "label": "$x < \\tfrac32$",
          "incorrectFeedback": "Ahí $f'' < 0$: cóncava."
        },
        {
          "id": "c",
          "label": "$x > 1$",
          "incorrectFeedback": "Eso sale de $f'(x) = 0$, no de $f''$."
        },
        {
          "id": "d",
          "label": "siempre",
          "incorrectFeedback": "Cambia de curvatura en la inflexión."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$f''(x) = 12x - 18 > 0 \\iff x > \\tfrac32$."
    },
    {
      "id": "check-par",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Resuelve $12x^2 - 12 = 0$."
        }
      ],
      "title": "Cuántas inflexiones",
      "question": "$f(x) = x^4 - 6x^2$ tiene $f'' = 12x^2 - 12$. ¿Cuántos puntos de inflexión tiene? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$f''$ se anula en $x = \\pm 1$ y cambia de signo en ambos."
    }
  ],
};
