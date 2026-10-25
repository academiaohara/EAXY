import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_5_SUBTITLE } from "@/data/lessons/shared";

export const problemasRectasPlanos22bachLesson: InteractiveLesson = {
  slug: "problemas-rectas-planos-2-2bach",
  title: "12. Problemas: intersecciones y paralelismo",
  subtitle: TEMA_2BACH_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "inter",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Intersecciones"
        }
      ],
      "title": "Intersecciones",
      "blocks": [
        {
          "kind": "steps",
          "items": [
            "**Recta y plano:** sustituye la recta en el plano y despeja $t$.",
            "**Dos planos:** la recta de corte tiene dirección $\\vec{n}_1\\times\\vec{n}_2$.",
            "**Dos rectas:** iguala las coordenadas y resuelve el sistema ($3$ ecuaciones, $2$ incógnitas)."
          ]
        },
        {
          "kind": "text",
          "text": "Antes de calcular, decide la **posición relativa** con rangos: si no hay punto de corte, no lo busques."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "posicion-recta-plano-explorador",
        "initial": [
          1,
          2,
          0,
          1,
          2,
          -1,
          1,
          1,
          1,
          -7
        ],
        "hint": "Recta x = 1 + t, y = 2 + 2t, z = −t y plano x + y + z = 7: el punto de corte es (4, 6, −3)."
      }
    },
    {
      "id": "check-y",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye y despeja $t$."
        }
      ],
      "title": "Recta y plano",
      "question": "La recta $x = 1 + t,\\ y = 2t,\\ z = -t$ corta al plano $x + y + z = 7$. ¿Cuánto vale la coordenada $y$ del punto de corte? (solo el número)",
      "correctAnswers": [
        "6"
      ],
      "explanation": "$1 + t + 2t - t = 7 \\Rightarrow t = 3$ y el punto es $(4, 6, -3)$."
    },
    {
      "id": "check-z",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$z = 2 + t\\cdot(-2)$."
        }
      ],
      "title": "Dos planos",
      "question": "La recta de corte de $x + y + z = 3$ y $x - y = -1$ pasa por $(0, 1, 2)$. ¿Cuánto vale su coordenada $z$ cuando $x = 1$ (es decir, en $t = 1$ con dirección $(1, 1, -2)$)? (solo el número)",
      "correctAnswers": [
        "0"
      ],
      "explanation": "$z = 2 - 2\\cdot 1 = 0$: el punto es $(1, 2, 0)$."
    },
    {
      "id": "check-par",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\vec{n} = (1, 1, -1)$."
        }
      ],
      "title": "Posición según un parámetro",
      "question": "La recta de vector director $(1, 2, m)$ es paralela al plano $x + y - z = 0$ si $\\vec{n}\\cdot\\vec{v} = 0$. ¿Cuánto vale $m$? (solo el número)",
      "correctAnswers": [
        "3"
      ],
      "explanation": "$1 + 2 - m = 0 \\Rightarrow m = 3$."
    },
    {
      "id": "check-metodo",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Mira la lista de posiciones."
        }
      ],
      "title": "¿Cómo lo resuelvo?",
      "question": "Para saber si dos rectas del espacio se cortan se…",
      "choices": [
        {
          "id": "a",
          "label": "estudian los rangos de $\\{\\vec{u}, \\vec{v}\\}$ y de $\\{\\vec{u}, \\vec{v}, \\overrightarrow{PQ}\\}$ y, si procede, se resuelve el sistema"
        },
        {
          "id": "b",
          "label": "comparan solo los vectores directores",
          "incorrectFeedback": "Con eso solo se sabe si son paralelas."
        },
        {
          "id": "c",
          "label": "calcula el producto escalar de los vectores directores",
          "incorrectFeedback": "Informa del ángulo, no de si se cortan."
        },
        {
          "id": "d",
          "label": "suman las ecuaciones",
          "incorrectFeedback": "No tiene sentido geométrico."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Los rangos dicen la posición; el sistema, el punto de corte."
    }
  ],
};
