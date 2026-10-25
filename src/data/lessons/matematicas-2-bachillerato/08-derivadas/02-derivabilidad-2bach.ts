import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_8_SUBTITLE } from "@/data/lessons/shared";

export const derivabilidad2bachLesson: InteractiveLesson = {
  slug: "derivabilidad-2bach",
  title: "2. Derivadas laterales y derivabilidad",
  subtitle: TEMA_2BACH_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "laterales",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Dos derivadas laterales"
        }
      ],
      "title": "Dos derivadas laterales",
      "blocks": [
        {
          "kind": "rule",
          "text": "Se definen con límites por cada lado. $f$ es **derivable** en $a$ si las dos derivadas laterales **existen y coinciden**:",
          "formula": "f'(a^+) = \\lim_{h\\to 0^+}\\dfrac{f(a + h) - f(a)}{h},\\qquad f'(a^-) = \\lim_{h\\to 0^-}\\dfrac{f(a + h) - f(a)}{h}"
        },
        {
          "kind": "rule",
          "title": "Derivable implica continua",
          "formula": "f \\text{ derivable en } a \\Rightarrow f \\text{ continua en } a"
        },
        {
          "kind": "warning",
          "text": "El recíproco es **falso**: $f(x) = |x|$ es continua en $0$ pero no derivable (tiene un «pico»)."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "derivabilidad-explorador",
        "initial": [
          0,
          2
        ],
        "hint": "|x| en 0: la derivada por la izquierda es −1 y por la derecha 1; no coinciden."
      }
    },
    {
      "id": "check-der",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Para $h > 0$, $|h| = h$."
        }
      ],
      "title": "Derivada lateral",
      "question": "Para $f(x) = |x|$, ¿cuánto vale $f'(0^+)$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "Para $h > 0$, $\\dfrac{|h| - 0}{h} = 1$."
    },
    {
      "id": "check-izq",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Para $h < 0$, $|h| = -h$."
        }
      ],
      "title": "Por la izquierda",
      "question": "Para $f(x) = |x|$, ¿cuánto vale $f'(0^-)$? (solo el número)",
      "correctAnswers": [
        "-1",
        "−1"
      ],
      "explanation": "Para $h < 0$, $\\dfrac{|h|}{h} = \\dfrac{-h}{h} = -1$."
    },
    {
      "id": "check-cont",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Recuerda la implicación."
        }
      ],
      "title": "Derivable y continua",
      "question": "Si $f$ es derivable en $a$, entonces…",
      "choices": [
        {
          "id": "a",
          "label": "$f$ es continua en $a$"
        },
        {
          "id": "b",
          "label": "$f$ tiene un máximo en $a$",
          "incorrectFeedback": "La derivada existe en puntos que no son extremos."
        },
        {
          "id": "c",
          "label": "$f'(a) = 0$",
          "incorrectFeedback": "Solo en los puntos de tangente horizontal."
        },
        {
          "id": "d",
          "label": "$f$ es derivable también en todos los puntos cercanos",
          "incorrectFeedback": "Puede fallar en puntos próximos."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Derivable ⟹ continua (no al revés)."
    },
    {
      "id": "check-clasifica",
      "type": "classify",
      "help": [
        {
          "label": "Pista",
          "message": "Busca picos, saltos o tangentes verticales."
        }
      ],
      "title": "¿Derivable en x = 0?",
      "question": "Clasifica cada función en $x = 0$.",
      "groups": [
        {
          "id": "si",
          "label": "Derivable",
          "tone": "emerald"
        },
        {
          "id": "no",
          "label": "No derivable",
          "tone": "rose"
        }
      ],
      "items": [
        {
          "id": "a",
          "text": "$x^2$",
          "group": "si"
        },
        {
          "id": "b",
          "text": "$|x|$",
          "group": "no"
        },
        {
          "id": "c",
          "text": "$x^3$",
          "group": "si"
        },
        {
          "id": "d",
          "text": "$\\sqrt[3]{x}$",
          "group": "no"
        },
        {
          "id": "e",
          "text": "$\\sin x$",
          "group": "si"
        },
        {
          "id": "f",
          "text": "$x|x|$",
          "group": "si"
        }
      ],
      "hint": "$\\sqrt[3]{x}$ tiene tangente vertical en $0$ (derivada infinita). $x|x|$ es derivable en $0$ con derivada $0$."
    }
  ],
};
