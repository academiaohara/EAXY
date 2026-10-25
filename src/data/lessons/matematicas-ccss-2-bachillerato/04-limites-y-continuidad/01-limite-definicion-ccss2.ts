import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_4_SUBTITLE } from "@/data/lessons/shared";

export const limiteDefinicionCcss2Lesson: InteractiveLesson = {
  slug: "limite-definicion-ccss2",
  title: "1. Idea y definición de límite",
  subtitle: TEMA_CCSS2_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "idea",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Acercarse sin llegar"
        }
      ],
      "title": "Acercarse sin llegar",
      "blocks": [
        {
          "kind": "text",
          "text": "$\\lim_{x \\to a} f(x) = L$ significa que **al acercarse $x$ a $a$**, los valores de $f(x)$ se acercan a $L$ tanto como se quiera. Lo importante es el **comportamiento cerca de $a$**, no el valor $f(a)$ (que puede no existir)."
        },
        {
          "kind": "definition",
          "text": "**Definición:** para todo $\\varepsilon > 0$ existe un $\\delta > 0$ tal que si $0 < |x - a| < \\delta$ entonces $|f(x) - L| < \\varepsilon$."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "limite-aproximacion"
      }
    },
    {
      "id": "check-limite",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $x = 2$."
        }
      ],
      "title": "Un límite por sustitución",
      "question": "Calcula $\\lim_{x \\to 2}(x^2 - 3)$. (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "La función es continua: $2^2 - 3 = 1$."
    },
    {
      "id": "laterales",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Límites laterales"
        }
      ],
      "title": "Límites laterales",
      "blocks": [
        {
          "kind": "rule",
          "text": "El límite existe si y solo si coinciden los dos laterales:",
          "formula": "\\lim_{x\\to a} f(x) = L \\iff \\lim_{x\\to a^-} f(x) = \\lim_{x\\to a^+} f(x) = L"
        },
        {
          "kind": "text",
          "text": "$x \\to a^-$ significa acercarse por valores menores que $a$ (izquierda); $x \\to a^+$, por valores mayores (derecha)."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "limite-lateral-explorador",
        "initial": [
          0,
          2
        ],
        "hint": "Función a trozos: ambos laterales valen 1 y el límite existe, aunque la imagen sea distinta en otras funciones."
      }
    },
    {
      "id": "check-lateral",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Usa la fórmula para $x > 1$."
        }
      ],
      "title": "Un lateral",
      "question": "Sea $f(x) = x^3$ si $x < 1$ y $f(x) = 3x - 2$ si $x \\geq 1$. ¿Cuánto vale $\\lim_{x \\to 1^+} f(x)$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "Por la derecha se usa $3x - 2$: $3\\cdot 1 - 2 = 1$. Por la izquierda, $1^3 = 1$: el límite existe y vale $1$."
    },
    {
      "id": "check-nolimite",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Calcula los dos laterales."
        }
      ],
      "title": "¿Existe el límite?",
      "question": "Para $f(x) = \\dfrac{|x|}{x}$, el límite en $x = 0$…",
      "choices": [
        {
          "id": "a",
          "label": "no existe: por la derecha vale $1$ y por la izquierda $-1$"
        },
        {
          "id": "b",
          "label": "vale $1$",
          "incorrectFeedback": "Eso solo ocurre por la derecha."
        },
        {
          "id": "c",
          "label": "vale $0$",
          "incorrectFeedback": "El valor $0$ no se alcanza."
        },
        {
          "id": "d",
          "label": "vale $-1$",
          "incorrectFeedback": "Eso solo ocurre por la izquierda."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Los laterales son distintos, luego no existe el límite."
    }
  ],
};
