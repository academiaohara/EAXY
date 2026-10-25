import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_9_SUBTITLE } from "@/data/lessons/shared";

export const dominioCortesSigno2bachLesson: InteractiveLesson = {
  slug: "dominio-cortes-signo-2bach",
  title: "1. Dominio, puntos de corte y signo",
  subtitle: TEMA_2BACH_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "dominio",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Dónde existe la función"
        }
      ],
      "title": "Dónde existe la función",
      "blocks": [
        {
          "kind": "steps",
          "items": [
            "**Polinomios, exponenciales, senos:** dominio $\\mathbb{R}$.",
            "**Cocientes:** se excluyen los $x$ que anulan el denominador.",
            "**Raíces de índice par:** el radicando debe ser $\\geq 0$.",
            "**Logaritmos:** el argumento debe ser $> 0$."
          ]
        },
        {
          "kind": "text",
          "text": "Los **puntos de corte** con el eje $Y$ son $(0, f(0))$ y con el eje $X$ se obtienen resolviendo $f(x) = 0$. El **signo** de $f$ se estudia en los intervalos que determinan los ceros y las discontinuidades."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "estudio-funcion-explorador",
        "initial": [
          0,
          2
        ],
        "hint": "Los dos primeros pasos del estudio: dominio y puntos de corte."
      }
    },
    {
      "id": "check-ord",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $x = 0$."
        }
      ],
      "title": "Corte con el eje Y",
      "question": "Para $f(x) = \\dfrac{x - 1}{x + 2}$, ¿cuánto vale la ordenada del corte con el eje $Y$? (decimal o fracción)",
      "correctAnswers": [
        "-1/2",
        "−1/2",
        "-0.5",
        "-0,5",
        "−0,5",
        "−0.5"
      ],
      "explanation": "$f(0) = \\dfrac{-1}{2}$. El dominio es $\\mathbb{R} - \\{-2\\}$ y el único corte con el eje $X$ es $x = 1$."
    },
    {
      "id": "check-raiz",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Resuelve $2x - 7 \\geq 0$."
        }
      ],
      "title": "Dominio con raíz",
      "question": "El dominio de $f(x) = \\sqrt{2x - 7}$ es $x \\geq 3{,}5$. ¿Cuál es el menor entero que pertenece a él? (solo el número)",
      "correctAnswers": [
        "4"
      ],
      "explanation": "$2x - 7 \\geq 0 \\iff x \\geq 3{,}5$: el menor entero es $4$."
    },
    {
      "id": "check-cortes",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Factoriza."
        }
      ],
      "title": "Cortes con el eje X",
      "question": "¿Cuántos puntos de corte con el eje $X$ tiene $f(x) = x^3 - x$? (solo el número)",
      "correctAnswers": [
        "3"
      ],
      "explanation": "$x(x - 1)(x + 1) = 0$: $x = 0, 1, -1$."
    },
    {
      "id": "check-ln",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "El argumento del logaritmo debe ser positivo."
        }
      ],
      "title": "Dominio de un logaritmo",
      "question": "El dominio de $f(x) = \\ln(x^2 - 1)$ es…",
      "choices": [
        {
          "id": "a",
          "label": "$(-\\infty, -1) \\cup (1, +\\infty)$"
        },
        {
          "id": "b",
          "label": "$(1, +\\infty)$",
          "incorrectFeedback": "Falta la rama $x < -1$: $x^2 - 1 > 0$ también se cumple ahí."
        },
        {
          "id": "c",
          "label": "$\\mathbb{R}$",
          "incorrectFeedback": "Para $|x| \\leq 1$ el argumento no es positivo."
        },
        {
          "id": "d",
          "label": "$[-1, 1]$",
          "incorrectFeedback": "Justo en ese intervalo el argumento es negativo o cero."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$x^2 > 1 \\iff |x| > 1$."
    }
  ],
};
