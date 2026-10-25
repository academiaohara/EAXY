import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_6_SUBTITLE } from "@/data/lessons/shared";

export const simetricoRecta2bachLesson: InteractiveLesson = {
  slug: "simetrico-recta-2bach",
  title: "6. Simétrico de un punto respecto de una recta",
  subtitle: TEMA_2BACH_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "metodo",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Pie de la perpendicular y punto medio"
        }
      ],
      "title": "Pie de la perpendicular y punto medio",
      "blocks": [
        {
          "kind": "steps",
          "items": [
            "Se halla la **proyección** $F$ de $P$ sobre la recta (el pie de la perpendicular).",
            "Se aplica $P' = 2F - P$."
          ]
        },
        {
          "kind": "text",
          "text": "Es el mismo procedimiento que para el plano: lo único que cambia es cómo se calcula $F$."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "proyeccion-simetrico-explorador",
        "initial": [
          1,
          2,
          3,
          4,
          1,
          1,
          1,
          1,
          1,
          0
        ],
        "hint": "P(2, 3, 4) y la recta (1,1,1) + λ(1,1,0): F = (5/2, 5/2, 1) y P′ = (3, 2, −2)."
      }
    },
    {
      "id": "check-simetrico",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$2\\cdot 1 - 4$."
        }
      ],
      "title": "Simétrico respecto de una recta",
      "question": "El pie de la perpendicular desde $P(2, 3, 4)$ sobre la recta $(1,1,1) + \\lambda(1,1,0)$ es $F = \\left(\\tfrac52, \\tfrac52, 1\\right)$. ¿Cuánto vale la tercera coordenada de $P'$? (solo el número)",
      "correctAnswers": [
        "-2",
        "−2"
      ],
      "explanation": "$P' = 2F - P = (5 - 2,\\ 5 - 3,\\ 2 - 4) = (3, 2, -2)$."
    },
    {
      "id": "check-recta2",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "El eje $X$ conserva la coordenada $x$ y cambia el signo de las otras dos."
        }
      ],
      "title": "Un caso con la recta del eje",
      "question": "El simétrico de $P(1, 3, 1)$ respecto del eje $X$ es $(1, a, b)$. ¿Cuánto vale $a$? (solo el número)",
      "correctAnswers": [
        "-3",
        "−3"
      ],
      "explanation": "El pie de la perpendicular es $(1, 0, 0)$ y $P' = (1, -3, -1)$."
    },
    {
      "id": "check-F",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en un espejo."
        }
      ],
      "title": "Pie de la perpendicular",
      "question": "En el simétrico $P'$ de $P$ respecto de una recta, el punto $F$ (pie de la perpendicular) es…",
      "choices": [
        {
          "id": "a",
          "label": "el punto medio de $PP'$"
        },
        {
          "id": "b",
          "label": "el punto $P'$",
          "incorrectFeedback": "$F$ está en la recta; $P'$ no (salvo que $P$ esté en ella)."
        },
        {
          "id": "c",
          "label": "el origen",
          "incorrectFeedback": "No tiene que serlo."
        },
        {
          "id": "d",
          "label": "cualquier punto de la recta",
          "incorrectFeedback": "Debe ser el pie de la perpendicular."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Por la definición de simétrico."
    },
    {
      "id": "check-en-recta",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "El pie de la perpendicular es el propio $P$."
        }
      ],
      "title": "Si P está en la recta",
      "question": "Si $P$ pertenece a la recta, ¿qué distancia hay entre $P$ y su simétrico? (solo el número)",
      "correctAnswers": [
        "0"
      ],
      "explanation": "$F = P$ y $P' = P$: la distancia es $0$."
    }
  ],
};
