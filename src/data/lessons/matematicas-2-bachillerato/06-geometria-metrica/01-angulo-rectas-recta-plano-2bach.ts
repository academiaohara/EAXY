import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_6_SUBTITLE } from "@/data/lessons/shared";

export const anguloRectasRectaPlano2bachLesson: InteractiveLesson = {
  slug: "angulo-rectas-recta-plano-2bach",
  title: "1. Ángulo entre dos rectas y entre recta y plano",
  subtitle: TEMA_2BACH_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "rectas",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Ángulo entre dos rectas"
        }
      ],
      "title": "Ángulo entre dos rectas",
      "blocks": [
        {
          "kind": "definition",
          "text": "El **ángulo entre dos rectas** es el ángulo **agudo** que forman sus vectores directores $\\vec{u}$ y $\\vec{v}$."
        },
        {
          "kind": "rule",
          "formula": "\\cos\\alpha = \\dfrac{|\\vec{u}\\cdot\\vec{v}|}{|\\vec{u}|\\,|\\vec{v}|}"
        },
        {
          "kind": "text",
          "text": "El valor absoluto del numerador garantiza que se obtenga el ángulo agudo (un mismo par de rectas forma dos ángulos suplementarios)."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "angulos-espacio-explorador",
        "initial": [
          0,
          1,
          1,
          0,
          1,
          0,
          0
        ],
        "hint": "Rectas con direcciones (1, 1, 0) y (1, 0, 0): forman 45°."
      }
    },
    {
      "id": "check-45",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Aplica la fórmula del coseno."
        }
      ],
      "title": "Un ángulo",
      "question": "Halla el ángulo (en grados) entre las rectas de vectores directores $(1, 1, 0)$ y $(1, 0, 0)$. (solo el número)",
      "correctAnswers": [
        "45"
      ],
      "explanation": "$\\cos\\alpha = \\dfrac{1}{\\sqrt2\\cdot 1} = \\dfrac{\\sqrt2}{2} \\Rightarrow \\alpha = 45^\\circ$."
    },
    {
      "id": "recta-plano",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Ángulo entre una recta y un plano"
        }
      ],
      "title": "Ángulo entre una recta y un plano",
      "blocks": [
        {
          "kind": "definition",
          "text": "El ángulo entre una recta $r$ y un plano $\\pi$ es el que forma $r$ con su **proyección** sobre $\\pi$. Es el complementario del que forma $r$ con la normal $\\vec{n}$."
        },
        {
          "kind": "rule",
          "text": "Con $\\vec{v}$ el vector director y $\\vec{n}$ la normal:",
          "formula": "\\sin\\alpha = \\dfrac{|\\vec{v}\\cdot\\vec{n}|}{|\\vec{v}|\\,|\\vec{n}|}"
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "angulos-espacio-explorador",
        "initial": [
          1,
          1,
          1,
          1,
          0,
          0,
          1
        ],
        "hint": "Recta (1, 1, 1) y plano con normal (0, 0, 1): sen α = 1/√3."
      }
    },
    {
      "id": "check-rp",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Usa $\\arcsin$."
        }
      ],
      "title": "Recta y plano",
      "question": "Una recta de vector director $(1, 1, 0)$ y un plano de normal $(0, 1, 0)$ forman un ángulo $\\alpha$ con $\\sin\\alpha = \\dfrac{1}{\\sqrt2}$. ¿Cuántos grados mide? (solo el número)",
      "correctAnswers": [
        "45"
      ],
      "explanation": "$\\sin\\alpha = \\tfrac{\\sqrt2}{2} \\Rightarrow \\alpha = 45^\\circ$."
    },
    {
      "id": "check-limites",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Compara $\\vec{v}$ con $\\vec{n} = (0,0,1)$."
        }
      ],
      "title": "Casos límite",
      "question": "Una recta de dirección $(0, 0, 1)$ y el plano $z = 0$ forman un ángulo de…",
      "choices": [
        {
          "id": "a",
          "label": "$90^\\circ$, porque la recta es perpendicular al plano"
        },
        {
          "id": "b",
          "label": "$0^\\circ$",
          "incorrectFeedback": "Eso sería una recta paralela al plano."
        },
        {
          "id": "c",
          "label": "$45^\\circ$",
          "incorrectFeedback": "No hay nada que sugiera $45^\\circ$."
        },
        {
          "id": "d",
          "label": "No se puede calcular",
          "incorrectFeedback": "Con $\\vec{v}\\parallel\\vec{n}$ se obtiene $\\sin\\alpha = 1$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$\\vec{v}\\parallel\\vec{n}$: $\\sin\\alpha = 1$, $\\alpha = 90^\\circ$."
    }
  ],
};
