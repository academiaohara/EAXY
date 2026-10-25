import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_5_SUBTITLE } from "@/data/lessons/shared";

export const tresPlanosPosicion2bachLesson: InteractiveLesson = {
  slug: "tres-planos-posicion-2bach",
  title: "7. Posición relativa de tres planos",
  subtitle: TEMA_2BACH_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "casos",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Rouché–Frobenius con tres ecuaciones"
        }
      ],
      "title": "Rouché–Frobenius con tres ecuaciones",
      "blocks": [
        {
          "kind": "text",
          "text": "Los tres planos forman un sistema $3\\times 3$. El tipo de sistema da la posición:"
        },
        {
          "kind": "steps",
          "items": [
            "$\\operatorname{rg}(M) = 3$: **se cortan en un punto**.",
            "$\\operatorname{rg}(M) = \\operatorname{rg}(M^*) = 2$: **se cortan en una recta** (haz) o dos coinciden.",
            "$\\operatorname{rg}(M) = 2 < \\operatorname{rg}(M^*)$: **no hay punto común**: prisma triangular, o dos paralelos y el tercero secante.",
            "$\\operatorname{rg}(M) = 1$: tres planos coincidentes, paralelos o dos coincidentes y uno paralelo."
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "posicion-planos-explorador",
        "initial": [
          1,
          0,
          0,
          -1,
          0,
          1,
          0,
          -2,
          0,
          0,
          1,
          -3
        ],
        "hint": "Los tres planos x = 1, y = 2, z = 3 se cortan en un punto. Haz el tercer plano igual a x + y = 3: ¿qué ocurre?"
      }
    },
    {
      "id": "check-clasifica",
      "type": "classify",
      "help": [
        {
          "label": "Pista",
          "message": "Calcula los rangos de $M$ y $M^*$."
        }
      ],
      "title": "¿Qué forman?",
      "question": "Clasifica cada trío de planos.",
      "groups": [
        {
          "id": "p",
          "label": "Se cortan en un punto",
          "tone": "emerald"
        },
        {
          "id": "r",
          "label": "Se cortan en una recta",
          "tone": "amber"
        },
        {
          "id": "n",
          "label": "No tienen puntos comunes",
          "tone": "rose"
        }
      ],
      "items": [
        {
          "id": "a",
          "text": "$x = 1,\\ y = 2,\\ z = 3$",
          "group": "p"
        },
        {
          "id": "b",
          "text": "$x + y = 0,\\ y + z = 0,\\ x - z = 0$",
          "group": "r"
        },
        {
          "id": "c",
          "text": "$x + y = 0,\\ y + z = 0,\\ x + 2y + z = 1$",
          "group": "n"
        },
        {
          "id": "d",
          "text": "$x + y + z = 0,\\ x + y + z = 1,\\ y = 0$",
          "group": "n"
        },
        {
          "id": "e",
          "text": "$x + y + z = 0,\\ x + y + z = 1,\\ x + y + z = 2$",
          "group": "n"
        },
        {
          "id": "f",
          "text": "$x + y + z = 1,\\ x - y = 0,\\ y - z = 0$",
          "group": "p"
        }
      ],
      "hint": "En $x + y = 0$, $y + z = 0$, $x - z = 0$ la tercera ecuación es la primera menos la segunda: rango $2$ y sistema compatible (haz). En el cuarto hay dos planos paralelos."
    },
    {
      "id": "check-rango",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Mira la parte izquierda de las ecuaciones."
        }
      ],
      "title": "Rango",
      "question": "Para los planos $x + y = 0$, $y + z = 0$, $x + 2y + z = 1$, ¿cuánto vale $\\operatorname{rg}(M)$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "La tercera ecuación es la suma de las dos primeras en la parte izquierda, pero el término independiente es $1 \\neq 0$: $\\operatorname{rg}(M) = 2$ y $\\operatorname{rg}(M^*) = 3$. No hay punto común (prisma)."
    },
    {
      "id": "check-prisma",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Dibuja un prisma triangular."
        }
      ],
      "title": "Prisma triangular",
      "question": "Tres planos que se cortan dos a dos en rectas paralelas, sin punto común, tienen…",
      "choices": [
        {
          "id": "a",
          "label": "$\\operatorname{rg}(M) = 2$ y $\\operatorname{rg}(M^*) = 3$"
        },
        {
          "id": "b",
          "label": "$\\operatorname{rg}(M) = 3$",
          "incorrectFeedback": "Con rango $3$ se cortan en un punto."
        },
        {
          "id": "c",
          "label": "$\\operatorname{rg}(M) = \\operatorname{rg}(M^*) = 2$",
          "incorrectFeedback": "Con esos rangos hay una recta común."
        },
        {
          "id": "d",
          "label": "$\\operatorname{rg}(M) = 1$",
          "incorrectFeedback": "Con rango $1$ los planos son paralelos o coincidentes."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Sistema incompatible con las tres normales coplanares (rango 2)."
    },
    {
      "id": "check-punto",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Las dos últimas dicen $x = y = z$."
        }
      ],
      "title": "Punto de corte",
      "question": "Los planos $x + y + z = 1$, $x - y = 0$ e $y - z = 0$ se cortan en un punto. ¿Cuánto vale su coordenada $x$? (decimal o fracción)",
      "correctAnswers": [
        "1/3",
        "0.33",
        "0,33",
        "0.333",
        "0,333"
      ],
      "explanation": "$x = y = z$ y $3x = 1$, luego $x = \\tfrac13$."
    }
  ],
};
