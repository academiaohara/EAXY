import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_8_SUBTITLE } from "@/data/lessons/shared";

export const rolleValorMedio2bachLesson: InteractiveLesson = {
  slug: "rolle-valor-medio-2bach",
  title: "8. Teoremas de Rolle y del valor medio",
  subtitle: TEMA_2BACH_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "rolle",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Teorema de Rolle"
        }
      ],
      "title": "Teorema de Rolle",
      "blocks": [
        {
          "kind": "rule",
          "title": "Rolle",
          "text": "Si $f$ es continua en $[a, b]$, derivable en $(a, b)$ y $f(a) = f(b)$:",
          "formula": "\\exists\\, c \\in (a, b):\\ f'(c) = 0"
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "rolle-lagrange",
        "params": {
          "a": 0
        }
      }
    },
    {
      "id": "check-c",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Resuelve $f'(c) = 0$."
        }
      ],
      "title": "Hallar c",
      "question": "Aplica Rolle a $f(x) = x^2 - 4x + 3$ en $[1, 3]$. ¿Cuánto vale $c$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$f'(x) = 2x - 4 = 0 \\Rightarrow c = 2 \\in (1, 3)$."
    },
    {
      "id": "lagrange",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Teorema del valor medio (Lagrange)"
        }
      ],
      "title": "Teorema del valor medio (Lagrange)",
      "blocks": [
        {
          "kind": "rule",
          "title": "Lagrange",
          "text": "Si $f$ es continua en $[a, b]$ y derivable en $(a, b)$:",
          "formula": "\\exists\\, c \\in (a, b):\\ f'(c) = \\dfrac{f(b) - f(a)}{b - a}"
        },
        {
          "kind": "text",
          "text": "Interpretación: hay un punto con **tangente paralela a la secante**."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "rolle-lagrange",
        "params": {
          "a": 1
        }
      }
    },
    {
      "id": "check-lag",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Iguala $2c$ a la tasa media."
        }
      ],
      "title": "Lagrange",
      "question": "Aplica Lagrange a $f(x) = x^2$ en $[0, 3]$. ¿Cuánto vale $c$? (decimal o fracción)",
      "correctAnswers": [
        "3/2",
        "1.5",
        "1,5"
      ],
      "explanation": "$f'(c) = 2c = \\dfrac{9 - 0}{3 - 0} = 3 \\Rightarrow c = \\dfrac32$."
    },
    {
      "id": "check-cond",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Revisa las tres condiciones."
        }
      ],
      "title": "Condiciones",
      "question": "¿Se puede aplicar Rolle a $f(x) = |x|$ en $[-1, 1]$?",
      "choices": [
        {
          "id": "a",
          "label": "No: no es derivable en $x = 0$"
        },
        {
          "id": "b",
          "label": "Sí: $f(-1) = f(1)$",
          "incorrectFeedback": "Falta la derivabilidad en el interior."
        },
        {
          "id": "c",
          "label": "No: no es continua",
          "incorrectFeedback": "Es continua."
        },
        {
          "id": "d",
          "label": "Sí: es continua",
          "incorrectFeedback": "Hace falta también la derivabilidad."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "No hay ningún punto con $f'(c) = 0$."
    }
  ],
};
