import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_7_SUBTITLE } from "@/data/lessons/shared";

export const teoremasContinuas2bachLesson: InteractiveLesson = {
  slug: "teoremas-continuas-2bach",
  title: "11. Teoremas de las funciones continuas",
  subtitle: TEMA_2BACH_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "bolzano",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Teorema de Bolzano"
        }
      ],
      "title": "Teorema de Bolzano",
      "blocks": [
        {
          "kind": "rule",
          "title": "Bolzano",
          "text": "Si $f$ es continua en $[a, b]$ y $f(a)\\cdot f(b) < 0$, entonces existe $c \\in (a, b)$ con $f(c) = 0$:",
          "formula": "f \\text{ continua en } [a,b],\\ f(a)f(b) < 0 \\Rightarrow \\exists\\, c \\in (a,b),\\ f(c) = 0"
        },
        {
          "kind": "text",
          "text": "Sirve para **demostrar que una ecuación tiene solución** y para localizarla por bisección."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "bolzano-biseccion"
      }
    },
    {
      "id": "check-signo",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye."
        }
      ],
      "title": "Cambio de signo",
      "question": "Para $f(x) = x^3 + x - 3$, calcula $f(1)$. (solo el número)",
      "correctAnswers": [
        "-1",
        "−1"
      ],
      "explanation": "$1 + 1 - 3 = -1$. Como $f(2) = 7 > 0$, hay una raíz en $(1, 2)$."
    },
    {
      "id": "otros",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Darboux y Weierstrass"
        }
      ],
      "title": "Darboux y Weierstrass",
      "blocks": [
        {
          "kind": "steps",
          "items": [
            "**Darboux (valor intermedio):** si $f$ es continua en $[a, b]$, toma **todos los valores** entre $f(a)$ y $f(b)$.",
            "**Weierstrass:** si $f$ es continua en $[a, b]$, alcanza un **máximo y un mínimo absolutos** en ese intervalo."
          ]
        },
        {
          "kind": "warning",
          "text": "La continuidad en un intervalo **cerrado** es imprescindible: $f(x) = \\dfrac{1}{x}$ en $[-1, 1]$ cambia de signo pero no tiene raíz (no es continua en $0$)."
        }
      ]
    },
    {
      "id": "check-aplica",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Comprueba continuidad y signos."
        }
      ],
      "title": "¿Se puede aplicar Bolzano?",
      "question": "¿En cuál de estos casos se puede aplicar el teorema de Bolzano para asegurar una raíz?",
      "choices": [
        {
          "id": "a",
          "label": "$f(x) = x^3 - 8x + 1$ en $[0, 1]$"
        },
        {
          "id": "b",
          "label": "$f(x) = \\\\dfrac{1}{x}$ en $[-1, 1]$",
          "incorrectFeedback": "No es continua en $0$."
        },
        {
          "id": "c",
          "label": "$f(x) = x^2 + 1$ en $[-2, 2]$",
          "incorrectFeedback": "No cambia de signo: $f > 0$ siempre."
        },
        {
          "id": "d",
          "label": "$f(x) = \\\\operatorname{sgn}(x)$ en $[-1, 1]$",
          "incorrectFeedback": "No es continua en $0$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Es continua (polinomio) y $f(0) = 1 > 0$, $f(1) = -6 < 0$: cambia de signo y Bolzano asegura una raíz en $(0, 1)$."
    },
    {
      "id": "check-entre",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Cambio de signo."
        }
      ],
      "title": "Entre dos enteros",
      "question": "La ecuación $x^3 + x - 3 = 0$ tiene una raíz entre $n$ y $n + 1$. ¿Cuánto vale $n$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$f(1) = -1 < 0$ y $f(2) = 7 > 0$: la raíz está entre $1$ y $2$."
    }
  ],
};
