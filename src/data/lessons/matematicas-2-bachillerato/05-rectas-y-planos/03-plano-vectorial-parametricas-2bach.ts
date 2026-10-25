import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_5_SUBTITLE } from "@/data/lessons/shared";

export const planoVectorialParametricas2bachLesson: InteractiveLesson = {
  slug: "plano-vectorial-parametricas-2bach",
  title: "3. El plano: ecuación vectorial y paramétricas",
  subtitle: TEMA_2BACH_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "def",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Un punto y dos vectores"
        }
      ],
      "title": "Un punto y dos vectores",
      "blocks": [
        {
          "kind": "definition",
          "text": "Un plano $\\pi$ queda determinado por un **punto** $P$ y **dos vectores** $\\vec{u}, \\vec{v}$ no paralelos contenidos en él."
        },
        {
          "kind": "rule",
          "title": "Vectorial",
          "formula": "(x, y, z) = P + s\\,\\vec{u} + t\\,\\vec{v},\\quad s, t \\in \\mathbb{R}"
        },
        {
          "kind": "rule",
          "title": "Paramétricas",
          "formula": "\\begin{cases} x = p_1 + s\\,u_1 + t\\,v_1 \\\\ y = p_2 + s\\,u_2 + t\\,v_2 \\\\ z = p_3 + s\\,u_3 + t\\,v_3 \\end{cases}"
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "plano-tres-puntos-3d",
        "params": {
          "nums": [
            3,
            0,
            0,
            0,
            4,
            0,
            0,
            0,
            2
          ]
        }
      }
    },
    {
      "id": "check-punto",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$y = s + t$."
        }
      ],
      "title": "Un punto del plano",
      "question": "Sea $\\pi: (1, 0, 2) + s\\,(1, 1, 0) + t\\,(0, 1, 1)$. ¿Cuánto vale $y$ si $s = 1$ y $t = 2$? (solo el número)",
      "correctAnswers": [
        "3"
      ],
      "explanation": "$(1 + 1,\\ 0 + 1 + 2,\\ 2 + 2) = (2, 3, 4)$."
    },
    {
      "id": "check-D",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye el punto $P(1, 0, 2)$."
        }
      ],
      "title": "De paramétricas a general",
      "question": "Para ese plano, $\\vec{n} = (1, 1, 0)\\times(0, 1, 1) = (1, -1, 1)$. Su ecuación general es $x - y + z + D = 0$. ¿Cuánto vale $D$? (solo el número)",
      "correctAnswers": [
        "-3",
        "−3"
      ],
      "explanation": "Pasa por $(1, 0, 2)$: $1 - 0 + 2 + D = 0 \\Rightarrow D = -3$."
    },
    {
      "id": "check-dos",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en un libro abierto."
        }
      ],
      "title": "¿Qué determina un plano?",
      "question": "¿Cuál de estos datos **no** basta para determinar un plano?",
      "choices": [
        {
          "id": "a",
          "label": "Dos puntos distintos"
        },
        {
          "id": "b",
          "label": "Tres puntos no alineados",
          "incorrectFeedback": "Sí: es el caso más habitual."
        },
        {
          "id": "c",
          "label": "Un punto y dos vectores no paralelos",
          "incorrectFeedback": "Sí: es la forma vectorial."
        },
        {
          "id": "d",
          "label": "Un punto y un vector normal",
          "incorrectFeedback": "Sí: es la ecuación general."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Por dos puntos pasan infinitos planos (los de un haz)."
    },
    {
      "id": "explorar",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Explora tres puntos"
        }
      ],
      "title": "Explora tres puntos",
      "blocks": [
        {
          "kind": "text",
          "text": "Cambia los puntos $A$, $B$ y $C$: se muestran el plano y su vector normal. Si los alineas, no hay plano único."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "plano-espacio-explorador",
        "initial": [
          3,
          0,
          0,
          0,
          4,
          0,
          0,
          0,
          2
        ],
        "hint": "Con A, B y C sobre los ejes el plano se llama «segmentario»: x/3 + y/4 + z/2 = 1."
      }
    }
  ],
};
