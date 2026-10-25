import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_12_SUBTITLE } from "@/data/lessons/shared";

export const parametrosBinomial2bachLesson: InteractiveLesson = {
  slug: "parametros-binomial-2bach",
  title: "4. Media y desviación típica de la binomial",
  subtitle: TEMA_2BACH_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "parametros",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Fórmulas directas"
        }
      ],
      "title": "Fórmulas directas",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "\\mu = n\\,p",
              "label": "media"
            },
            {
              "tex": "\\sigma^2 = n\\,p\\,q",
              "label": "varianza"
            },
            {
              "tex": "\\sigma = \\sqrt{n\\,p\\,q}",
              "label": "desviación típica"
            }
          ]
        },
        {
          "kind": "text",
          "text": "No hace falta construir la tabla: una binomial es la suma de $n$ pruebas de Bernoulli, cada una con media $p$ y varianza $pq$."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "X \\sim B(100;\\ 0{,}2):\\ \\mu = 100\\cdot 0{,}2 = 20,\\quad \\sigma = \\sqrt{100\\cdot0{,}2\\cdot0{,}8} = \\sqrt{16} = 4"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "binomial-explorador",
        "initial": [
          100,
          20,
          20,
          0
        ],
        "hint": "B(100; 0,2): media 20 y desviación típica 4."
      }
    },
    {
      "id": "check-mu",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\mu = np$."
        }
      ],
      "title": "Media",
      "question": "Si $X \\sim B(50;\\ 0{,}1)$, ¿cuánto vale su media? (solo el número)",
      "correctAnswers": [
        "5"
      ],
      "explanation": "$50\\cdot0{,}1 = 5$."
    },
    {
      "id": "check-var",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\sigma^2 = npq$."
        }
      ],
      "title": "Varianza",
      "question": "En $B(50;\\ 0{,}1)$, ¿cuánto vale la varianza? (decimal)",
      "correctAnswers": [
        "4.5",
        "4,5",
        "9/2"
      ],
      "explanation": "$50\\cdot0{,}1\\cdot0{,}9 = 4{,}5$."
    },
    {
      "id": "check-sigma",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Raíz de la varianza."
        }
      ],
      "title": "Desviación",
      "question": "En $B(100;\\ 0{,}2)$, ¿cuánto vale $\\sigma$? (solo el número)",
      "correctAnswers": [
        "4"
      ],
      "explanation": "$\\sqrt{100\\cdot 0{,}2\\cdot 0{,}8} = \\sqrt{16} = 4$."
    },
    {
      "id": "check-n",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\mu = np$."
        }
      ],
      "title": "Despejar n",
      "question": "Una binomial de $p = 0{,}25$ tiene media $12$. ¿Cuánto vale $n$? (solo el número)",
      "correctAnswers": [
        "48"
      ],
      "explanation": "$n = \\dfrac{12}{0{,}25} = 48$."
    }
  ],
};
