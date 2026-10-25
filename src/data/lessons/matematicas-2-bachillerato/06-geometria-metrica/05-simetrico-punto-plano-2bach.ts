import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_6_SUBTITLE } from "@/data/lessons/shared";

export const simetricoPuntoPlano2bachLesson: InteractiveLesson = {
  slug: "simetrico-punto-plano-2bach",
  title: "5. Simétrico de un punto respecto de otro punto y de un plano",
  subtitle: TEMA_2BACH_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "punto",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Respecto de un punto"
        }
      ],
      "title": "Respecto de un punto",
      "blocks": [
        {
          "kind": "definition",
          "text": "El **simétrico** $P'$ de $P$ respecto de $M$ es el punto tal que $M$ es el **punto medio** de $PP'$."
        },
        {
          "kind": "rule",
          "formula": "P' = 2M - P"
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "proyeccion-simetrico-explorador",
        "initial": [
          2,
          1,
          -1,
          1,
          0,
          -1,
          2
        ],
        "hint": "El simétrico de P(1, −1, 1) respecto de M(0, −1, 2) es (−1, −1, 3)."
      }
    },
    {
      "id": "check-punto",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$2\\cdot 0 - 1$."
        }
      ],
      "title": "Simétrico de un punto",
      "question": "Halla la primera coordenada del simétrico de $P(1, -1, 1)$ respecto de $M(0, -1, 2)$. (solo el número)",
      "correctAnswers": [
        "-1",
        "−1"
      ],
      "explanation": "$P' = 2M - P = (0 - 1,\\ -2 + 1,\\ 4 - 1) = (-1, -1, 3)$."
    },
    {
      "id": "plano",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Respecto de un plano"
        }
      ],
      "title": "Respecto de un plano",
      "blocks": [
        {
          "kind": "steps",
          "items": [
            "Se halla la **proyección** $F$ de $P$ sobre el plano.",
            "$F$ es el punto medio de $PP'$, luego $P' = 2F - P$."
          ]
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "proyeccion-punto-plano-3d",
        "params": {
          "nums": [
            3,
            1,
            2,
            1,
            1,
            1,
            -3
          ]
        }
      }
    },
    {
      "id": "check-plano",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$2\\cdot 2 - 3$."
        }
      ],
      "title": "Simétrico respecto de un plano",
      "question": "El simétrico de $P(3, 1, 2)$ respecto del plano $x + y + z - 3 = 0$ tiene como proyección $F = (2, 0, 1)$. ¿Cuánto vale su coordenada $x$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$P' = 2F - P = (4 - 3,\\ 0 - 1,\\ 2 - 2) = (1, -1, 0)$."
    },
    {
      "id": "check-eje",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$c = 2\\cdot 1 - 4$."
        }
      ],
      "title": "Respecto de un plano de coordenadas",
      "question": "El simétrico de $P(2, 1, 4)$ respecto del plano $z = 1$ es $(2, 1, c)$. ¿Cuánto vale $c$? (solo el número)",
      "correctAnswers": [
        "-2",
        "−2"
      ],
      "explanation": "$F = (2, 1, 1)$ y $P' = (2, 1, 2 - 4) = (2, 1, -2)$."
    }
  ],
};
