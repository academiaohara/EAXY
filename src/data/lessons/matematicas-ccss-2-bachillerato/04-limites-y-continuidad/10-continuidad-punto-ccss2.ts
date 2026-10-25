import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_4_SUBTITLE } from "@/data/lessons/shared";

export const continuidadPuntoCcss2Lesson: InteractiveLesson = {
  slug: "continuidad-punto-ccss2",
  title: "10. Continuidad en un punto y en un intervalo",
  subtitle: TEMA_CCSS2_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "def",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Tres condiciones"
        }
      ],
      "title": "Tres condiciones",
      "blocks": [
        {
          "kind": "rule",
          "title": "Continuidad en $a$",
          "text": "$f$ es continua en $a$ si se cumplen las tres a la vez:",
          "formula": "\\exists f(a),\\quad \\exists \\lim_{x\\to a} f(x),\\quad \\lim_{x\\to a} f(x) = f(a)"
        },
        {
          "kind": "text",
          "text": "Si solo coincide por un lado: **continuidad lateral**. Es **continua en un intervalo abierto** si lo es en todos sus puntos; en $[a, b]$, además, continua por la derecha en $a$ y por la izquierda en $b$."
        },
        {
          "kind": "text",
          "text": "Polinomios, exponenciales, senos y cosenos son continuas en todo $\\mathbb{R}$; las racionales, en su dominio; $\\ln x$, en $(0, \\infty)$."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "funcion-continuidad"
      }
    },
    {
      "id": "check-valor",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Usa la segunda fórmula."
        }
      ],
      "title": "Continua en un punto",
      "question": "$f(x) = x^2$ si $x < 2$ y $f(x) = 3x - 2$ si $x \\geq 2$. ¿Cuánto vale $f(2)$? (solo el número)",
      "correctAnswers": [
        "4"
      ],
      "explanation": "$3\\cdot 2 - 2 = 4$; los dos laterales también valen $4$: es continua en $x = 2$."
    },
    {
      "id": "check-def",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Calcula el límite."
        }
      ],
      "title": "Definir en un punto",
      "question": "$f(x) = \\dfrac{x^2 - 1}{x - 1}$ si $x \\neq 1$. ¿Qué valor debe tomar $f(1)$ para que sea continua en $x = 1$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$\\lim_{x \\to 1}(x + 1) = 2$: se define $f(1) = 2$."
    },
    {
      "id": "check-una",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "¿Dónde está definida?"
        }
      ],
      "title": "¿Continua?",
      "question": "$f(x) = \\dfrac{1}{x}$ es continua…",
      "choices": [
        {
          "id": "a",
          "label": "en todo su dominio, $\\mathbb{R}\\setminus\\{0\\}$, pero no en $x = 0$"
        },
        {
          "id": "b",
          "label": "en todo $\\mathbb{R}$",
          "incorrectFeedback": "No está definida en $0$."
        },
        {
          "id": "c",
          "label": "en ningún punto",
          "incorrectFeedback": "Es continua en cada punto distinto de $0$."
        },
        {
          "id": "d",
          "label": "solo en $x > 0$",
          "incorrectFeedback": "También es continua para $x < 0$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Una función racional es continua en su dominio."
    },
    {
      "id": "explorar",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Explorar laterales y valor"
        }
      ],
      "title": "Explorar laterales y valor",
      "blocks": [
        {
          "kind": "text",
          "text": "Compara en cada función a trozos los límites laterales y el valor $f(a)$."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "limite-lateral-explorador",
        "initial": [
          3,
          0
        ],
        "hint": "En la función 4 el límite es 4, pero f(2) = 1: no es continua (discontinuidad evitable)."
      }
    }
  ],
};
