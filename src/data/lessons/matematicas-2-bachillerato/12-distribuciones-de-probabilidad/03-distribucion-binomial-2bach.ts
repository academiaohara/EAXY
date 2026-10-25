import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_12_SUBTITLE } from "@/data/lessons/shared";

export const distribucionBinomial2bachLesson: InteractiveLesson = {
  slug: "distribucion-binomial-2bach",
  title: "3. Distribución binomial",
  subtitle: TEMA_2BACH_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "binomial",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Éxitos en n pruebas"
        }
      ],
      "title": "Éxitos en n pruebas",
      "blocks": [
        {
          "kind": "definition",
          "text": "Una variable sigue una **binomial** $B(n, p)$ si cuenta los éxitos en $n$ pruebas independientes, cada una con la misma probabilidad de éxito $p$ ($q = 1 - p$)."
        },
        {
          "kind": "formula",
          "tex": "P(X = k) = \\dbinom{n}{k}\\,p^k\\,q^{n-k}\\qquad k = 0, 1, \\dots, n"
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "X \\sim B(6;\\ 0{,}3):\\ P(X = 2) = \\dbinom62\\,0{,}3^2\\cdot 0{,}7^4 = 15\\cdot0{,}09\\cdot0{,}2401 \\approx 0{,}3241"
            }
          ]
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "binomial-forma"
      }
    },
    {
      "id": "explora",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Explora la binomial"
        }
      ],
      "title": "Explora la binomial",
      "blocks": [
        {
          "kind": "text",
          "text": "Cambia $n$, $p$ y $k$ y mira la distribución completa. Las probabilidades acumuladas se obtienen sumando las de cada valor."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "binomial-explorador",
        "initial": [
          6,
          30,
          2,
          0
        ],
        "hint": "Con n = 6 y p = 30 %: P(X = 2) ≈ 0,3241."
      }
    },
    {
      "id": "check-p2",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\dbinom62 = 15$."
        }
      ],
      "title": "Una probabilidad",
      "question": "Si $X \\sim B(6;\\ 0{,}3)$, ¿cuánto vale $P(X = 2)$? (4 decimales)",
      "correctAnswers": [
        "0.3241",
        "0,3241"
      ],
      "explanation": "$15\\cdot 0{,}09\\cdot 0{,}2401 = 0{,}324135 \\approx 0{,}3241$."
    },
    {
      "id": "check-p0",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Seis fracasos seguidos."
        }
      ],
      "title": "Ningún éxito",
      "question": "Con la misma $X$, ¿cuánto vale $P(X = 0)$? (4 decimales)",
      "correctAnswers": [
        "0.1176",
        "0,1176"
      ],
      "explanation": "$0{,}7^6 = 0{,}117649 \\approx 0{,}1176$."
    },
    {
      "id": "check-comb",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Cuántas formas hay de colocar $3$ éxitos."
        }
      ],
      "title": "El número de órdenes",
      "question": "En $B(5;\\ 0{,}4)$, $P(X = 3) = a\\cdot0{,}4^3\\cdot0{,}6^2$. ¿Cuánto vale $a$? (solo el número)",
      "correctAnswers": [
        "10"
      ],
      "explanation": "$a = \\dbinom53 = 10$."
    },
    {
      "id": "check-cond",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en un dado: $p = \\tfrac16$ para sacar un 6."
        }
      ],
      "title": "Condiciones",
      "question": "¿Qué condición **no** es necesaria para una binomial?",
      "choices": [
        {
          "id": "a",
          "label": "Que $p = \\tfrac12$"
        },
        {
          "id": "b",
          "label": "Que las pruebas sean independientes",
          "incorrectFeedback": "Sí es necesaria."
        },
        {
          "id": "c",
          "label": "Que haya solo dos resultados por prueba",
          "incorrectFeedback": "Sí es necesaria."
        },
        {
          "id": "d",
          "label": "Que $p$ sea constante en todas las pruebas",
          "incorrectFeedback": "Sí es necesaria."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$p$ puede tomar cualquier valor entre $0$ y $1$."
    }
  ],
};
