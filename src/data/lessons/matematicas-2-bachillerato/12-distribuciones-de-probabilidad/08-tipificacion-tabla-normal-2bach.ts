import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_12_SUBTITLE } from "@/data/lessons/shared";

export const tipificacionTablaNormal2bachLesson: InteractiveLesson = {
  slug: "tipificacion-tabla-normal-2bach",
  title: "8. Tipificación y tabla de la N(0, 1)",
  subtitle: TEMA_2BACH_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "tipificar",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Reducir toda normal a una"
        }
      ],
      "title": "Reducir toda normal a una",
      "blocks": [
        {
          "kind": "rule",
          "title": "Tipificación",
          "text": "Si $X \\sim N(\\mu, \\sigma)$, la variable $Z$ sigue una $N(0, 1)$:",
          "formula": "Z = \\dfrac{X - \\mu}{\\sigma}"
        },
        {
          "kind": "text",
          "text": "La **tabla de la $N(0,1)$** da $P(Z \\leq z)$ para $z \\geq 0$. Para $z < 0$ se usa la simetría: $P(Z \\leq -z) = 1 - P(Z \\leq z)$."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "X \\sim N(5{,}7;\\ 1{,}1):\\ P(5 < X < 6) = P(-0{,}64 < Z < 0{,}27)"
            },
            {
              "math": "= 0{,}6064 - 0{,}2611 = 0{,}3453"
            }
          ]
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "tipificacion-normal"
      }
    },
    {
      "id": "tabla",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Leer la tabla"
        }
      ],
      "title": "Leer la tabla",
      "blocks": [
        {
          "kind": "text",
          "text": "Selecciona $z$ y mira la celda resaltada, la cola derecha y el intervalo simétrico."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "tabla-normal-explorador",
        "initial": [
          27
        ],
        "hint": "Con z = 0,27 la tabla da P(Z ≤ 0,27) = 0,6064."
      }
    },
    {
      "id": "check-z",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Resta la media y divide entre $\\sigma$."
        }
      ],
      "title": "Calcular z",
      "question": "Si $X \\sim N(5{,}7;\\ 1{,}1)$, ¿qué $z$ corresponde a $x = 7{,}9$? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "$\\dfrac{7{,}9 - 5{,}7}{1{,}1} = \\dfrac{2{,}2}{1{,}1} = 2$."
    },
    {
      "id": "check-cola",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Contrario."
        }
      ],
      "title": "Cola derecha",
      "question": "Sabiendo que $P(Z \\leq 1{,}25) = 0{,}8944$, ¿cuánto vale $P(Z > 1{,}25)$? (4 decimales)",
      "correctAnswers": [
        "0.1056",
        "0,1056"
      ],
      "explanation": "$1 - 0{,}8944 = 0{,}1056$."
    },
    {
      "id": "check-neg",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Simetría."
        }
      ],
      "title": "z negativo",
      "question": "Sabiendo que $P(Z \\leq 1) = 0{,}8413$, ¿cuánto vale $P(Z \\leq -1)$? (4 decimales)",
      "correctAnswers": [
        "0.1587",
        "0,1587"
      ],
      "explanation": "$1 - 0{,}8413 = 0{,}1587$."
    },
    {
      "id": "check-entre",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$P(Z<1) - P(Z<-1)$."
        }
      ],
      "title": "Entre dos valores",
      "question": "¿Cuánto vale $P(-1 < Z < 1)$ con $P(Z \\leq 1) = 0{,}8413$? (4 decimales)",
      "correctAnswers": [
        "0.6826",
        "0,6826"
      ],
      "explanation": "$0{,}8413 - 0{,}1587 = 0{,}6826$."
    }
  ],
};
