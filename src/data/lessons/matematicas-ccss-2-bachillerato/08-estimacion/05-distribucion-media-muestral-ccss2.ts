import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_8_SUBTITLE } from "@/data/lessons/shared";

export const distribucionMediaMuestralCcss2Lesson: InteractiveLesson = {
  slug: "distribucion-media-muestral-ccss2",
  title: "5. Distribución de la media muestral",
  subtitle: TEMA_CCSS2_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "media",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Calcular probabilidades de x̄"
        }
      ],
      "title": "Calcular probabilidades de x̄",
      "blocks": [
        {
          "kind": "steps",
          "items": [
            "Identifica $\\mu$, $\\sigma$ y $n$ y escribe $\\bar{x} \\sim N\\!\\left(\\mu,\\dfrac{\\sigma}{\\sqrt n}\\right)$.",
            "**Tipifica**: $z = \\dfrac{\\bar{x} - \\mu}{\\sigma/\\sqrt n}$.",
            "Busca en la tabla de la $N(0,1)$ y usa la simetría y el contrario."
          ]
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\mu = 10,\\ \\sigma = 20,\\ n = 100 \\Rightarrow \\bar{x} \\sim N(10;\\ 2)"
            },
            {
              "math": "P(8 < \\bar{x} < 12) = P(-1 < z < 1) = 0{,}8413 - 0{,}1587 = 0{,}6826"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "media-muestral-explorador",
        "initial": [
          10,
          20,
          100,
          8,
          12
        ],
        "hint": "N(10; 2): el área entre 8 y 12 es 0,6826. Cambia n y observa cómo se estrecha la campana."
      }
    },
    {
      "id": "check-z",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Calcula primero $\\sigma/\\sqrt n$."
        }
      ],
      "title": "Tipificar",
      "question": "$\\mu = 4$, $\\sigma = 1{,}5$ y $n = 64$. ¿Cuánto vale $z$ para $\\bar{x} = 3{,}5$? (2 decimales)",
      "correctAnswers": [
        "-2.67",
        "−2.67",
        "-2,67",
        "−2,67"
      ],
      "explanation": "$\\dfrac{\\sigma}{\\sqrt n} = \\dfrac{1{,}5}{8} = 0{,}1875$ y $z = \\dfrac{3{,}5 - 4}{0{,}1875} = -2{,}67$."
    },
    {
      "id": "check-p",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Simetría de la normal."
        }
      ],
      "title": "Una cola",
      "question": "Con esos datos, ¿cuánto vale $P(\\bar{x} < 3{,}5)$? (4 decimales, con tabla)",
      "correctAnswers": [
        "0.0038",
        "0,0038"
      ],
      "explanation": "$P(z < -2{,}67) = 1 - 0{,}9962 = 0{,}0038$."
    },
    {
      "id": "check-sim",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$4{,}5$ está tan lejos de $4$ como $3{,}5$."
        }
      ],
      "title": "Simetría",
      "question": "En la misma distribución, ¿cuánto vale $P(\\bar{x} > 4{,}5)$? (4 decimales)",
      "correctAnswers": [
        "0.0038",
        "0,0038"
      ],
      "explanation": "Es simétrica: $z = +2{,}67$ y $P(z > 2{,}67) = 0{,}0038$."
    },
    {
      "id": "check-ent",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$z = \\pm1$."
        }
      ],
      "title": "Entre dos valores",
      "question": "Con $\\mu = 10$, $\\sigma = 20$ y $n = 100$, ¿cuánto vale $P(8 < \\bar{x} < 12)$? (4 decimales, con tabla)",
      "correctAnswers": [
        "0.6826",
        "0,6826",
        "0.6827",
        "0,6827"
      ],
      "explanation": "$P(-1 < z < 1) = 0{,}8413 - 0{,}1587 = 0{,}6826$."
    }
  ],
};
