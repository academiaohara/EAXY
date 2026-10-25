import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_7_SUBTITLE } from "@/data/lessons/shared";

export const limitesInfinito2bachLesson: InteractiveLesson = {
  slug: "limites-infinito-2bach",
  title: "4. Límites en el infinito",
  subtitle: TEMA_2BACH_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "racionales",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Comparar grados"
        }
      ],
      "title": "Comparar grados",
      "blocks": [
        {
          "kind": "rule",
          "title": "Cociente de polinomios",
          "text": "Con $P$ de grado $p$ (coeficiente principal $a$) y $Q$ de grado $q$ (coeficiente principal $b$):",
          "formula": "\\lim_{x\\to\\infty}\\dfrac{P(x)}{Q(x)} = \\begin{cases} \\pm\\infty & p > q \\\\ \\dfrac{a}{b} & p = q \\\\ 0 & p < q \\end{cases}"
        },
        {
          "kind": "text",
          "text": "Los límites en $\\pm\\infty$ finitos dan **asíntotas horizontales** $y = L$."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "limite-grados-explorador",
        "initial": [
          2,
          3,
          2,
          1,
          0
        ],
        "hint": "Con grados iguales el límite es el cociente de los coeficientes principales: 3/1 = 3."
      }
    },
    {
      "id": "check-igual",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Mira los términos de mayor grado."
        }
      ],
      "title": "Grados iguales",
      "question": "Calcula $\\lim_{x \\to +\\infty}\\dfrac{5x^3 - 2}{2x^3 + 1}$. (decimal o fracción)",
      "correctAnswers": [
        "5/2",
        "2.5",
        "2,5"
      ],
      "explanation": "Mismo grado: cociente de coeficientes principales, $\\dfrac{5}{2}$."
    },
    {
      "id": "check-menor",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Compara $x^2$ con $x^3$."
        }
      ],
      "title": "Grado menor",
      "question": "Calcula $\\lim_{x \\to +\\infty}\\dfrac{x^2 + 1}{x^3}$. (solo el número)",
      "correctAnswers": [
        "0"
      ],
      "explanation": "El denominador tiene mayor grado: el límite es $0$."
    },
    {
      "id": "check-mayor",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Compara los grados."
        }
      ],
      "title": "Grado mayor",
      "question": "$\\lim_{x \\to +\\infty}\\dfrac{x^3}{x^2 + 1}$ vale…",
      "choices": [
        {
          "id": "a",
          "label": "$+\\infty$"
        },
        {
          "id": "b",
          "label": "$0$",
          "incorrectFeedback": "El numerador crece más rápido."
        },
        {
          "id": "c",
          "label": "$1$",
          "incorrectFeedback": "Los grados no son iguales."
        },
        {
          "id": "d",
          "label": "$-\\infty$",
          "incorrectFeedback": "Para $x$ positivo es positivo."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Grado del numerador mayor: infinito, con signo $+$."
    },
    {
      "id": "check-menos",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Coeficientes principales."
        }
      ],
      "title": "Hacia menos infinito",
      "question": "Calcula $\\lim_{x \\to -\\infty}\\dfrac{x^3 + 1}{x^3 - 1}$. (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "Mismo grado: $\\dfrac{1}{1} = 1$, también cuando $x \\to -\\infty$."
    }
  ],
};
