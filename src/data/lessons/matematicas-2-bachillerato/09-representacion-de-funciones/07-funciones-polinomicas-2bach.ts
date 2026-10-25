import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_9_SUBTITLE } from "@/data/lessons/shared";

export const funcionesPolinomicas2bachLesson: InteractiveLesson = {
  slug: "funciones-polinomicas-2bach",
  title: "7. Funciones polinómicas",
  subtitle: TEMA_2BACH_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "poli",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Estudio de un polinomio"
        }
      ],
      "title": "Estudio de un polinomio",
      "blocks": [
        {
          "kind": "text",
          "text": "Un polinomio tiene dominio $\\mathbb{R}$, no tiene asíntotas y su comportamiento en $\\pm\\infty$ lo da el término de mayor grado. Los extremos salen de $f' = 0$ y las inflexiones de $f'' = 0$."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "f(x) = x^4 - 2x^3,\\quad f' = 2x^2(2x - 3),\\quad f'' = 12x(x - 1)"
            },
            {
              "math": "\\text{Mínimo en } x = \\tfrac32:\\ f\\left(\\tfrac32\\right) = -\\tfrac{27}{16};\\ \\ x = 0 \\text{ no es extremo}"
            },
            {
              "math": "\\text{Inflexiones en } x = 0 \\text{ y } x = 1"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "estudio-funcion-explorador",
        "initial": [
          6,
          6
        ],
        "hint": "x⁴ − 2x²: par, con tres extremos y dos inflexiones."
      }
    },
    {
      "id": "check-valor",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$(3/2)^4 = 81/16$."
        }
      ],
      "title": "Valor del mínimo",
      "question": "Para $f(x) = x^4 - 2x^3$, ¿cuánto vale $f\\left(\\tfrac32\\right)$? (decimal o fracción)",
      "correctAnswers": [
        "-27/16",
        "−27/16",
        "-1.6875",
        "-1,6875",
        "−1,6875",
        "−1.6875"
      ],
      "explanation": "$\\dfrac{81}{16} - 2\\cdot\\dfrac{27}{8} = \\dfrac{81 - 108}{16} = -\\dfrac{27}{16}$."
    },
    {
      "id": "check-n",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Raíz doble."
        }
      ],
      "title": "Puntos críticos sin extremo",
      "question": "En $f(x) = x^4 - 2x^3$, $f'(x) = 2x^2(2x - 3)$ no cambia de signo en $x = a$ ($f'(a) = 0$). ¿Cuánto vale $a$? (solo el número)",
      "correctAnswers": [
        "0"
      ],
      "explanation": "$2x^2 \\geq 0$: el signo de $f'$ solo lo marca $(2x - 3)$; en $x = 0$ no cambia: no es extremo (es inflexión)."
    },
    {
      "id": "check-cuarto",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Factoriza $x^2$."
        }
      ],
      "title": "Grado cuatro",
      "question": "El polinomio $x^4 - 2x^2$ corta al eje $X$ en $x = 0$ y en $x = \\pm a$. ¿Cuánto vale $a^2$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$x^2(x^2 - 2) = 0 \\Rightarrow x^2 = 2$."
    },
    {
      "id": "check-infinito",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en $x^2$."
        }
      ],
      "title": "Comportamiento global",
      "question": "Un polinomio de grado par con coeficiente principal positivo, cuando $x \\to \\pm\\infty$, tiende a…",
      "choices": [
        {
          "id": "a",
          "label": "$+\\infty$ en los dos lados"
        },
        {
          "id": "b",
          "label": "$-\\\\infty$ en los dos lados",
          "incorrectFeedback": "Eso ocurre con coeficiente principal negativo."
        },
        {
          "id": "c",
          "label": "$+\\\\infty$ en un lado y $-\\\\infty$ en el otro",
          "incorrectFeedback": "Eso es propio del grado impar."
        },
        {
          "id": "d",
          "label": "un valor finito",
          "incorrectFeedback": "Solo las constantes lo hacen."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Domina el término $a_n x^n$."
    }
  ],
};
