import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_4_SUBTITLE } from "@/data/lessons/shared";

export const discontinuidadesCcss2Lesson: InteractiveLesson = {
  slug: "discontinuidades-ccss2",
  title: "11. Tipos de discontinuidad",
  subtitle: TEMA_CCSS2_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "tipos",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Cuatro formas de romperse"
        }
      ],
      "title": "Cuatro formas de romperse",
      "blocks": [
        {
          "kind": "steps",
          "items": [
            "**Evitable:** existe el límite pero no coincide con $f(a)$ (o $f(a)$ no existe).",
            "**De salto finito:** los laterales existen, son finitos y distintos.",
            "**De salto infinito (asintótica):** algún lateral es $\\pm\\infty$.",
            "**Esencial (sin límite):** algún lateral no existe, por ejemplo $\\sin\\frac1x$."
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "limite-lateral-explorador",
        "initial": [
          2,
          0
        ],
        "hint": "En la función 3 el hueco en x = 1 se puede tapar: discontinuidad evitable."
      }
    },
    {
      "id": "check-clasifica",
      "type": "classify",
      "help": [
        {
          "label": "Pista",
          "message": "Calcula los laterales."
        }
      ],
      "title": "Clasifica la discontinuidad",
      "question": "Indica el tipo de discontinuidad en el punto señalado.",
      "groups": [
        {
          "id": "ev",
          "label": "Evitable",
          "tone": "emerald"
        },
        {
          "id": "sf",
          "label": "Salto finito",
          "tone": "amber"
        },
        {
          "id": "si",
          "label": "Salto infinito",
          "tone": "rose"
        },
        {
          "id": "es",
          "label": "Esencial",
          "tone": "violet"
        }
      ],
      "items": [
        {
          "id": "a",
          "text": "$\\dfrac{x^2 - 1}{x - 1}$ en $x = 1$",
          "group": "ev"
        },
        {
          "id": "b",
          "text": "$f(x) = x^3$ si $x < 1$, $x + 2$ si $x \\geq 1$, en $x = 1$",
          "group": "sf"
        },
        {
          "id": "c",
          "text": "$\\dfrac{1}{x}$ en $x = 0$",
          "group": "si"
        },
        {
          "id": "d",
          "text": "$\\sin\\dfrac{1}{x}$ en $x = 0$",
          "group": "es"
        },
        {
          "id": "e",
          "text": "$\\dfrac{|x|}{x}$ en $x = 0$",
          "group": "sf"
        },
        {
          "id": "f",
          "text": "$\\dfrac{1}{(x - 2)^2}$ en $x = 2$",
          "group": "si"
        }
      ],
      "hint": "En el segundo caso los laterales son $1$ y $3$ (salto de $2$). En $\\dfrac{|x|}{x}$ son $-1$ y $1$."
    },
    {
      "id": "check-salto",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Resta los dos límites laterales."
        }
      ],
      "title": "Tamaño del salto",
      "question": "$f(x) = x^3$ si $x < 1$ y $f(x) = x + 2$ si $x \\geq 1$. ¿Cuánto vale el salto $\\lim_{x\\to 1^+} f - \\lim_{x\\to 1^-} f$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$3 - 1 = 2$."
    },
    {
      "id": "check-evitable",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Mira el nombre."
        }
      ],
      "title": "Evitable",
      "question": "¿Qué hay que hacer para «arreglar» una discontinuidad evitable?",
      "choices": [
        {
          "id": "a",
          "label": "redefinir $f(a)$ como el valor del límite"
        },
        {
          "id": "b",
          "label": "cambiar el límite",
          "incorrectFeedback": "El límite no se puede cambiar: es el comportamiento cerca de $a$."
        },
        {
          "id": "c",
          "label": "nada: no se puede arreglar",
          "incorrectFeedback": "Sí se puede: es lo que significa «evitable»."
        },
        {
          "id": "d",
          "label": "añadir una asíntota",
          "incorrectFeedback": "Eso corresponde a un salto infinito."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Se define $f(a) = \\lim_{x \\to a} f(x)$."
    },
    {
      "id": "check-ext",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Simplifica."
        }
      ],
      "title": "Un valor que la evita",
      "question": "$f(x) = \\dfrac{x^2 - 4}{x - 2}$ ($x \\neq 2$). ¿Qué valor de $f(2)$ evita la discontinuidad? (solo el número)",
      "correctAnswers": [
        "4"
      ],
      "explanation": "$\\lim_{x \\to 2}(x + 2) = 4$."
    }
  ],
};
