import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_4_SUBTITLE } from "@/data/lessons/shared";

export const limitesInfinitosPuntoCcss2Lesson: InteractiveLesson = {
  slug: "limites-infinitos-punto-ccss2",
  title: "4. Límites infinitos en un punto y asíntotas verticales",
  subtitle: TEMA_CCSS2_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "def",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Cuando la función crece sin cota"
        }
      ],
      "title": "Cuando la función crece sin cota",
      "blocks": [
        {
          "kind": "definition",
          "text": "$\\lim_{x \\to a} f(x) = +\\infty$ si $f(x)$ se hace **mayor que cualquier número** al acercar $x$ a $a$. Análogamente $-\\infty$."
        },
        {
          "kind": "rule",
          "text": "Si algún límite lateral en $a$ es $\\pm\\infty$, la recta $x = a$ es **asíntota vertical**:",
          "formula": "\\lim_{x\\to a^\\pm} f(x) = \\pm\\infty \\Rightarrow x = a \\text{ asíntota vertical}"
        },
        {
          "kind": "text",
          "text": "Es típico cuando se anula el denominador sin anularse el numerador: $\\dfrac{c}{0}$ con $c \\neq 0$."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "limite-infinito-explorador",
        "initial": [
          0,
          0
        ],
        "hint": "1/x tiende a +∞ por la derecha de 0 y a −∞ por la izquierda: el eje Y es asíntota vertical."
      }
    },
    {
      "id": "check-lateral",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Mira el signo del denominador."
        }
      ],
      "title": "Signo",
      "question": "¿Cuánto vale $\\lim_{x \\to 2^-}\\dfrac{1}{x - 2}$?",
      "choices": [
        {
          "id": "a",
          "label": "$-\\infty$"
        },
        {
          "id": "b",
          "label": "$+\\infty$",
          "incorrectFeedback": "Por la izquierda $x - 2 < 0$ y es muy pequeño: el cociente es negativo y enorme."
        },
        {
          "id": "c",
          "label": "$0$",
          "incorrectFeedback": "El denominador se acerca a $0$, no el cociente."
        },
        {
          "id": "d",
          "label": "No existe ni siquiera por un lado",
          "incorrectFeedback": "Existe y es infinito."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$x - 2$ es negativo y tiende a $0$: $\\dfrac{1}{x - 2} \\to -\\infty$."
    },
    {
      "id": "check-par",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Un cuadrado es positivo."
        }
      ],
      "title": "Potencia par",
      "question": "Calcula $\\lim_{x \\to 3}\\dfrac{1}{(x - 3)^2}$: ¿vale $+\\infty$ (escribe 1), $-\\infty$ (escribe −1) o no existe (escribe 0)?",
      "correctAnswers": [
        "1"
      ],
      "explanation": "El denominador es siempre positivo y tiende a $0$: el límite es $+\\infty$ por los dos lados."
    },
    {
      "id": "check-vert",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Anula el denominador."
        }
      ],
      "title": "Asíntota vertical",
      "question": "¿Cuál es la asíntota vertical de $f(x) = \\dfrac{x + 1}{x - 4}$? Escribe el valor de $x$. (solo el número)",
      "correctAnswers": [
        "4"
      ],
      "explanation": "En $x = 4$ el denominador se anula y el numerador vale $5 \\neq 0$: asíntota vertical $x = 4$."
    },
    {
      "id": "check-ambos",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Compara con $1/x$."
        }
      ],
      "title": "Los dos lados",
      "question": "Para $f(x) = \\dfrac{1}{x^2}$, ¿a qué tiende cuando $x \\to 0$? Escribe 1 si $+\\infty$, −1 si $-\\infty$, 0 si no existe. (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$x^2 > 0$ siempre: $\\dfrac{1}{x^2} \\to +\\infty$ por ambos lados."
    }
  ],
};
