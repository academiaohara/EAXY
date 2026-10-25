import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_12_SUBTITLE } from "@/data/lessons/shared";

export const problemasNormal2bachLesson: InteractiveLesson = {
  slug: "problemas-normal-2bach",
  title: "9. Problemas con la normal",
  subtitle: TEMA_2BACH_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "metodo",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Método"
        }
      ],
      "title": "Método",
      "blocks": [
        {
          "kind": "steps",
          "items": [
            "Identifica $\\mu$ y $\\sigma$ y escribe la probabilidad que piden.",
            "**Tipifica** los extremos: $z = (x - \\mu)/\\sigma$.",
            "Pasa a probabilidades de $Z$ con la simetría y el contrario.",
            "Lee la tabla y **traduce** el resultado al contexto."
          ]
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\text{Estatura } X \\sim N(170;\\ 8):\\quad P(X > 180) = P(Z > 1{,}25) = 1 - 0{,}8944 = 0{,}1056"
            },
            {
              "math": "\\text{En 1000 personas, } \\approx 106 \\text{ miden más de 180 cm}"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "normal-explorador",
        "initial": [
          170,
          8,
          180,
          200,
          2
        ],
        "hint": "N(170, 8): la cola derecha desde 180 cm tiene ≈ 10,6 % del área."
      }
    },
    {
      "id": "check-cola",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Multiplica por $0{,}1056$."
        }
      ],
      "title": "Una cola",
      "question": "Con $X \\sim N(170;\\ 8)$, ¿cuántas personas de $1000$ miden más de $180$ cm (redondea al entero)? (solo el número)",
      "correctAnswers": [
        "106"
      ],
      "explanation": "$1000\\cdot0{,}1056 = 105{,}6 \\approx 106$."
    },
    {
      "id": "check-entre",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$(162 - 170)/8 = -1$."
        }
      ],
      "title": "Un intervalo",
      "question": "Con la misma variable, ¿cuánto vale $P(162 < X < 178)$? (4 decimales)",
      "correctAnswers": [
        "0.6826",
        "0,6826"
      ],
      "explanation": "$z = \\pm 1$: $0{,}8413 - 0{,}1587 = 0{,}6826$."
    },
    {
      "id": "check-inversa",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Busca $0{,}975$ en el cuerpo de la tabla."
        }
      ],
      "title": "Valor de z",
      "question": "¿Qué $z$ cumple $P(Z \\leq z) = 0{,}975$? (solo el número)",
      "correctAnswers": [
        "1.96",
        "1,96"
      ],
      "explanation": "En la tabla, $P(Z \\leq 1{,}96) = 0{,}9750$."
    },
    {
      "id": "check-p90",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$z = 1{,}28$ deja $0{,}9$ a la izquierda."
        }
      ],
      "title": "Percentil 90",
      "question": "El percentil $90$ de $N(170;\\ 8)$ es $170 + 1{,}28\\cdot 8$. ¿Cuánto vale? (dos decimales)",
      "correctAnswers": [
        "180.24",
        "180,24"
      ],
      "explanation": "$170 + 10{,}24 = 180{,}24$ cm."
    }
  ],
};
