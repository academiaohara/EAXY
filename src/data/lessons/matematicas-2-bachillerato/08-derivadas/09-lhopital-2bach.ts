import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_8_SUBTITLE } from "@/data/lessons/shared";

export const lhopital2bachLesson: InteractiveLesson = {
  slug: "lhopital-2bach",
  title: "9. Regla de L’Hôpital",
  subtitle: TEMA_2BACH_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "regla",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Derivar numerador y denominador"
        }
      ],
      "title": "Derivar numerador y denominador",
      "blocks": [
        {
          "kind": "rule",
          "title": "L'Hôpital",
          "text": "Si $\\lim \\dfrac{f}{g}$ es $\\dfrac00$ o $\\dfrac\\infty\\infty$ y existe $\\lim\\dfrac{f'}{g'}$:",
          "formula": "\\lim\\dfrac{f(x)}{g(x)} = \\lim\\dfrac{f'(x)}{g'(x)}"
        },
        {
          "kind": "warning",
          "text": "Se derivan **numerador y denominador por separado** (no es la derivada del cociente). Se puede repetir mientras siga la indeterminación."
        },
        {
          "kind": "text",
          "text": "Otras formas ($0\\cdot\\infty$, $\\infty - \\infty$, $1^\\infty$…) se transforman primero en un cociente."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "lhopital-explorador",
        "initial": [
          2,
          3
        ],
        "hint": "(1 − cos x)/x² → 0/0 → sen x/2x → 0/0 → cos x/2 = 1/2. La tabla lo confirma."
      }
    },
    {
      "id": "check-uno",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Deriva arriba y abajo."
        }
      ],
      "title": "Un límite clásico",
      "question": "Calcula con L'Hôpital $\\lim_{x \\to 0}\\dfrac{e^x - 1}{x}$. (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$\\lim\\dfrac{e^x}{1} = 1$."
    },
    {
      "id": "check-dos",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Hay que aplicarla dos veces."
        }
      ],
      "title": "Dos veces",
      "question": "Calcula $\\lim_{x \\to 0}\\dfrac{1 - \\cos x}{x^2}$. (decimal o fracción)",
      "correctAnswers": [
        "1/2",
        "0.5",
        "0,5"
      ],
      "explanation": "$\\dfrac{\\sin x}{2x} \\to \\dfrac{\\cos x}{2} \\to \\dfrac12$."
    },
    {
      "id": "check-tres",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Tres derivaciones."
        }
      ],
      "title": "Tres veces",
      "question": "Calcula $\\lim_{x \\to 0}\\dfrac{x - \\sin x}{x^3}$. (decimal o fracción)",
      "correctAnswers": [
        "1/6",
        "0.1667",
        "0,1667",
        "0.167",
        "0,167"
      ],
      "explanation": "$\\dfrac{1 - \\cos x}{3x^2} \\to \\dfrac{\\sin x}{6x} \\to \\dfrac{\\cos x}{6} \\to \\dfrac16$."
    },
    {
      "id": "check-inf",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Aplica la regla."
        }
      ],
      "title": "Con infinito",
      "question": "$\\lim_{x \\to +\\infty}\\dfrac{\\ln x}{x}$ vale…",
      "choices": [
        {
          "id": "a",
          "label": "$0$ (con L'Hôpital: $\\dfrac{1/x}{1} \\to 0$)"
        },
        {
          "id": "b",
          "label": "$+\\infty$",
          "incorrectFeedback": "El denominador crece más rápido."
        },
        {
          "id": "c",
          "label": "$1$",
          "incorrectFeedback": "No son comparables así."
        },
        {
          "id": "d",
          "label": "No existe",
          "incorrectFeedback": "Existe y vale $0$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Los logaritmos crecen más despacio que $x$."
    }
  ],
};
