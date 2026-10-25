import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_4_SUBTITLE } from "@/data/lessons/shared";

export const limitesOperacionesCcss2Lesson: InteractiveLesson = {
  slug: "limites-operaciones-ccss2",
  title: "3. Operaciones con límites y límites sencillos",
  subtitle: TEMA_CCSS2_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "reglas",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Límite de una operación"
        }
      ],
      "title": "Límite de una operación",
      "blocks": [
        {
          "kind": "text",
          "text": "Si $\\lim f = A$ y $\\lim g = B$ (finitos), se cumple:"
        },
        {
          "kind": "facts",
          "items": [
            {
              "tex": "\\lim(f \\pm g) = A \\pm B",
              "label": "suma y resta"
            },
            {
              "tex": "\\lim(f\\cdot g) = A\\cdot B",
              "label": "producto"
            },
            {
              "tex": "\\lim \\dfrac{f}{g} = \\dfrac{A}{B}\\ (B \\neq 0)",
              "label": "cociente"
            },
            {
              "tex": "\\lim f^{g} = A^{B}\\ (A > 0)",
              "label": "potencia"
            }
          ]
        },
        {
          "kind": "text",
          "text": "En las funciones elementales continuas el límite en un punto del dominio es **el valor de la función**: basta **sustituir**."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "operaciones-limite-explorador",
        "initial": [
          0,
          1,
          0,
          0
        ],
        "hint": "Con infinitos hay que tener cuidado: algunas combinaciones son indeterminadas."
      }
    },
    {
      "id": "check-cociente",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "El denominador no se anula."
        }
      ],
      "title": "Sustituir",
      "question": "Calcula $\\lim_{x \\to 3}\\dfrac{x^2 - 2x}{x - 1}$. (decimal o fracción)",
      "correctAnswers": [
        "3/2",
        "1.5",
        "1,5"
      ],
      "explanation": "$\\dfrac{9 - 6}{3 - 1} = \\dfrac{3}{2}$."
    },
    {
      "id": "check-raiz",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye."
        }
      ],
      "title": "Una raíz",
      "question": "Calcula $\\lim_{x \\to 2}\\sqrt{x + 7}$. (solo el número)",
      "correctAnswers": [
        "3"
      ],
      "explanation": "$\\sqrt{9} = 3$."
    },
    {
      "id": "check-5",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $x = 0$."
        }
      ],
      "title": "Con un cociente",
      "question": "Calcula $\\lim_{x \\to 0}\\dfrac{x^3 + 5}{2x + 1}$. (solo el número)",
      "correctAnswers": [
        "5"
      ],
      "explanation": "$\\dfrac{0 + 5}{0 + 1} = 5$."
    },
    {
      "id": "check-cero",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en $3/0{,}001$."
        }
      ],
      "title": "Dividir entre cero",
      "question": "Si $\\lim f = 3$ y $\\lim g = 0$, entonces $\\lim \\dfrac{f}{g}$…",
      "choices": [
        {
          "id": "a",
          "label": "es infinito (o no existe): hay que estudiar el signo de $g$ por cada lado"
        },
        {
          "id": "b",
          "label": "vale $0$",
          "incorrectFeedback": "Un número distinto de cero entre algo muy pequeño es muy grande."
        },
        {
          "id": "c",
          "label": "vale $3$",
          "incorrectFeedback": "No tiene relación."
        },
        {
          "id": "d",
          "label": "es una indeterminación $0/0$",
          "incorrectFeedback": "Solo sería $0/0$ si también $\\lim f = 0$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Forma $\\dfrac{3}{0}$: no es indeterminación, es $\\pm\\infty$ según los signos."
    }
  ],
};
