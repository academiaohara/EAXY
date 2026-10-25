import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_8_SUBTITLE } from "@/data/lessons/shared";

export const derivadasTrigInversas2bachLesson: InteractiveLesson = {
  slug: "derivadas-trig-inversas-2bach",
  title: "5. Derivadas de funciones trigonométricas e inversas",
  subtitle: TEMA_2BACH_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "tabla",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Trigonométricas y sus inversas"
        }
      ],
      "title": "Trigonométricas y sus inversas",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "(\\operatorname{tg} x)' = 1 + \\operatorname{tg}^2 x = \\dfrac{1}{\\cos^2 x}",
              "label": "tangente"
            },
            {
              "tex": "(\\arcsin x)' = \\dfrac{1}{\\sqrt{1 - x^2}}",
              "label": "arco seno"
            },
            {
              "tex": "(\\arccos x)' = \\dfrac{-1}{\\sqrt{1 - x^2}}",
              "label": "arco coseno"
            },
            {
              "tex": "(\\operatorname{arctg} x)' = \\dfrac{1}{1 + x^2}",
              "label": "arco tangente"
            }
          ]
        },
        {
          "kind": "text",
          "text": "Salen de la fórmula de la **función inversa**: $(f^{-1})'(b) = \\dfrac{1}{f'(f^{-1}(b))}$."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "derivada-inversa-explorador",
        "initial": [
          5,
          10
        ],
        "hint": "La derivada de arctg x en un punto es 1/(1 + x²)."
      }
    },
    {
      "id": "check-seno",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Regla de la cadena."
        }
      ],
      "title": "Seno con ángulo",
      "question": "Si $f(x) = \\sin 3x$, ¿cuánto vale $f'(0)$? (solo el número)",
      "correctAnswers": [
        "3"
      ],
      "explanation": "$f'(x) = 3\\cos 3x$ y $f'(0) = 3$."
    },
    {
      "id": "check-arctg",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\dfrac{1}{1 + 1^2}$."
        }
      ],
      "title": "Arco tangente",
      "question": "Si $f(x) = \\operatorname{arctg} x$, ¿cuánto vale $f'(1)$? (decimal o fracción)",
      "correctAnswers": [
        "1/2",
        "0.5",
        "0,5"
      ],
      "explanation": "$f'(x) = \\dfrac{1}{1 + x^2}$ y $f'(1) = \\dfrac12$."
    },
    {
      "id": "check-arcsen",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\dfrac{1}{\\sqrt{1 - x^2}}$."
        }
      ],
      "title": "Arco seno",
      "question": "Si $f(x) = \\arcsin x$, ¿cuánto vale $f'(0)$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$f'(0) = \\dfrac{1}{\\sqrt{1 - 0}} = 1$."
    },
    {
      "id": "check-tg",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$1 + \\operatorname{tg}^2 0$."
        }
      ],
      "title": "Tangente",
      "question": "Si $f(x) = \\operatorname{tg} x$, ¿cuánto vale $f'(0)$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$f'(x) = 1 + \\operatorname{tg}^2 x$ y $f'(0) = 1 + 0 = 1$."
    }
  ],
};
