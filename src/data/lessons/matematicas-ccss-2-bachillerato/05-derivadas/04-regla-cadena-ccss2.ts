import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_5_SUBTITLE } from "@/data/lessons/shared";

export const reglaCadenaCcss2Lesson: InteractiveLesson = {
  slug: "regla-cadena-ccss2",
  title: "4. Regla de la cadena",
  subtitle: TEMA_CCSS2_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "cadena",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Derivar una composición"
        }
      ],
      "title": "Derivar una composición",
      "blocks": [
        {
          "kind": "rule",
          "text": "Si $h(x) = f(g(x))$:",
          "formula": "h'(x) = f'(g(x))\\cdot g'(x)"
        },
        {
          "kind": "text",
          "text": "Se deriva «de fuera hacia dentro»: la derivada de la función exterior (sin tocar lo de dentro) por la derivada de lo de dentro."
        },
        {
          "kind": "facts",
          "items": [
            {
              "tex": "(u^n)' = n\\,u^{n-1}\\,u'",
              "label": "potencia"
            },
            {
              "tex": "(e^u)' = e^u\\,u',\\quad (\\ln u)' = \\dfrac{u'}{u}",
              "label": "exponencial y logaritmo"
            },
            {
              "tex": "(\\sin u)' = u'\\cos u",
              "label": "seno"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "cadena-explorador",
        "initial": [
          1,
          1,
          10
        ],
        "hint": "Derivada de √(2x + 3): 2/(2√(2x + 3))."
      }
    },
    {
      "id": "check-pot",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "No olvides multiplicar por la derivada de $3x + 1$."
        }
      ],
      "title": "Una potencia",
      "question": "Si $f(x) = (3x + 1)^4$, ¿cuánto vale $f'(0)$? (solo el número)",
      "correctAnswers": [
        "12"
      ],
      "explanation": "$f'(x) = 4(3x + 1)^3\\cdot 3 = 12(3x + 1)^3$ y $f'(0) = 12$."
    },
    {
      "id": "check-exp",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$u = 2x$, $u' = 2$."
        }
      ],
      "title": "Una exponencial",
      "question": "Si $f(x) = e^{2x}$, ¿cuánto vale $f'(0)$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$f'(x) = 2e^{2x}$ y $f'(0) = 2$."
    },
    {
      "id": "check-ln",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\dfrac{u'}{u}$."
        }
      ],
      "title": "Un logaritmo",
      "question": "Si $f(x) = \\ln(x^2 + 1)$, ¿cuánto vale $f'(1)$? (solo el número)",
      "correctAnswers": [
        "1"
      ],
      "explanation": "$f'(x) = \\dfrac{2x}{x^2 + 1}$ y $f'(1) = \\dfrac22 = 1$."
    },
    {
      "id": "check-raiz",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$(\\sqrt{u})' = \\dfrac{u'}{2\\sqrt{u}}$."
        }
      ],
      "title": "Una raíz",
      "question": "Si $f(x) = \\sqrt{2x + 1}$, ¿cuánto vale $f'(4)$? (decimal o fracción)",
      "correctAnswers": [
        "1/3",
        "0.33",
        "0,33",
        "0.333",
        "0,333"
      ],
      "explanation": "$f'(x) = \\dfrac{2}{2\\sqrt{2x + 1}} = \\dfrac{1}{\\sqrt{2x + 1}}$ y $f'(4) = \\dfrac{1}{3}$."
    }
  ],
};
