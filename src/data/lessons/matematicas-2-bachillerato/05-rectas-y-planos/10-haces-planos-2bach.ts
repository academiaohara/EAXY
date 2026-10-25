import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_5_SUBTITLE } from "@/data/lessons/shared";

export const hacesPlanos2bachLesson: InteractiveLesson = {
  slug: "haces-planos-2bach",
  title: "10. Haces de planos",
  subtitle: TEMA_2BACH_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "haces",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Planos que comparten una recta o son paralelos"
        }
      ],
      "title": "Planos que comparten una recta o son paralelos",
      "blocks": [
        {
          "kind": "definition",
          "text": "Un **haz de planos secantes** es el conjunto de planos que contienen a una misma recta $r$. Si $r$ es la intersección de $\\pi_1$ y $\\pi_2$, el haz es $\\alpha\\,\\pi_1 + \\beta\\,\\pi_2 = 0$."
        },
        {
          "kind": "definition",
          "text": "Un **haz de planos paralelos** al plano $Ax + By + Cz + D = 0$ es $Ax + By + Cz + k = 0$, con $k$ variable."
        },
        {
          "kind": "text",
          "text": "Para elegir un plano del haz se impone una condición (pasar por un punto, ser paralelo a una recta…) y queda la razón $\\alpha : \\beta$."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "posicion-planos-explorador",
        "initial": [
          1,
          1,
          0,
          -2,
          0,
          1,
          -1,
          0,
          1,
          2,
          -1,
          -2
        ],
        "hint": "π3 es combinación de π1 y π2 (π1 + π2): los tres planos pertenecen al mismo haz y se cortan en una recta."
      }
    },
    {
      "id": "check-haz",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Suma los coeficientes de $y$."
        }
      ],
      "title": "Plano del haz por un punto",
      "question": "El haz de la recta $x + y - 2 = 0$, $y - z = 0$ es $\\alpha(x + y - 2) + \\beta(y - z) = 0$. El plano que pasa por $(0, 1, 0)$ cumple $\\alpha(-1) + \\beta(1) = 0$; con $\\alpha = \\beta = 1$ es $x + 2y - z - 2 = 0$. ¿Cuánto vale el coeficiente de $y$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$\\alpha(x + y - 2) + \\beta(y - z)$ con $\\alpha = \\beta = 1$ da $x + 2y - z - 2 = 0$."
    },
    {
      "id": "check-par",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye el punto."
        }
      ],
      "title": "Plano paralelo por un punto",
      "question": "El plano paralelo a $2x - y + z + 5 = 0$ que pasa por $(1, 1, 1)$ es $2x - y + z + k = 0$. ¿Cuánto vale $k$? (solo el número)",
      "correctAnswers": [
        "-2",
        "−2"
      ],
      "explanation": "$2 - 1 + 1 + k = 0 \\Rightarrow k = -2$."
    },
    {
      "id": "check-cond",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en las páginas de un libro."
        }
      ],
      "title": "¿Qué haz?",
      "question": "Todos los planos que contienen una recta dada forman…",
      "choices": [
        {
          "id": "a",
          "label": "un haz de planos secantes"
        },
        {
          "id": "b",
          "label": "un haz de planos paralelos",
          "incorrectFeedback": "Los paralelos no comparten ningún punto."
        },
        {
          "id": "c",
          "label": "un solo plano",
          "incorrectFeedback": "Hay infinitos planos por una recta."
        },
        {
          "id": "d",
          "label": "el espacio entero",
          "incorrectFeedback": "Cada plano del haz contiene la recta, pero no todos los puntos."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Es el haz de planos secantes de eje $r$."
    },
    {
      "id": "check-parametros",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Es un único parámetro."
        }
      ],
      "title": "Cuántos parámetros",
      "question": "Un haz de planos secantes depende de la razón $\\alpha : \\beta$. ¿Cuántas condiciones independientes hacen falta para fijar un plano del haz? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "Una sola, por ejemplo que pase por un punto exterior a la recta: queda determinada la razón $\\alpha : \\beta$."
    }
  ],
};
