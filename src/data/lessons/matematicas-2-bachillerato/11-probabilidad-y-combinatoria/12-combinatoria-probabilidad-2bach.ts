import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_11_SUBTITLE } from "@/data/lessons/shared";

export const combinatoriaProbabilidad2bachLesson: InteractiveLesson = {
  slug: "combinatoria-probabilidad-2bach",
  title: "12. Combinatoria aplicada a la probabilidad",
  subtitle: TEMA_2BACH_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "contar",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Casos favorables entre casos posibles"
        }
      ],
      "title": "Casos favorables entre casos posibles",
      "blocks": [
        {
          "kind": "text",
          "text": "Con Laplace, la combinatoria cuenta los casos. Se eligen con o sin orden según el enunciado: si el orden no importa (cartas en la mano, bolas que se sacan a la vez), se usan combinaciones."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\text{Lotería primitiva: } \\dbinom{49}{6} = 13\\,983\\,816 \\text{ combinaciones} \\Rightarrow P(\\text{acertar}) = \\dfrac{1}{13\\,983\\,816}"
            },
            {
              "math": "\\text{4 oros en 4 cartas de la baraja: } \\dfrac{\\binom{10}{4}}{\\binom{40}{4}} = \\dfrac{210}{91\\,390} \\approx 0{,}0023"
            }
          ]
        }
      ]
    },
    {
      "id": "binomial",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Un primer vistazo a la binomial"
        }
      ],
      "title": "Un primer vistazo a la binomial",
      "blocks": [
        {
          "kind": "text",
          "text": "Si repetimos $n$ veces un experimento con solo dos resultados (éxito con probabilidad $p$ y fracaso con $q = 1-p$), la probabilidad de $k$ éxitos es"
        },
        {
          "kind": "formula",
          "tex": "P(X = k) = \\dbinom{n}{k}\\,p^k\\,q^{n-k}"
        },
        {
          "kind": "text",
          "text": "El $\\dbinom{n}{k}$ cuenta en cuántos órdenes pueden aparecer los $k$ éxitos."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "binomial-explorador",
        "initial": [
          4,
          17,
          2,
          0
        ],
        "hint": "Con p = 17 % (≈ 1/6) y n = 4: P(exactamente 2) ≈ 0,1195; con p = 1/6 exacto sale 0,1157."
      }
    },
    {
      "id": "check-loteria",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Combinaciones: no importa el orden."
        }
      ],
      "title": "Lotería",
      "question": "¿Cuántas apuestas distintas hay si se eligen $6$ números de $49$? (solo el número, sin espacios)",
      "correctAnswers": [
        "13983816"
      ],
      "explanation": "$\\dbinom{49}{6} = 13\\,983\\,816$."
    },
    {
      "id": "check-moneda",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\dbinom{5}{3} = 10$."
        }
      ],
      "title": "Moneda",
      "question": "Lanzamos $5$ monedas. ¿Cuál es la probabilidad de obtener exactamente $3$ caras? (decimal)",
      "correctAnswers": [
        "0.3125",
        "0,3125",
        "5/16",
        "10/32"
      ],
      "explanation": "$\\dbinom{5}{3}\\cdot\\dfrac1{32} = \\dfrac{10}{32} = \\dfrac{5}{16} = 0{,}3125$."
    },
    {
      "id": "check-dados",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$p = \\tfrac16$, $q = \\tfrac56$."
        }
      ],
      "title": "Dos seises",
      "question": "Lanzamos un dado $4$ veces. ¿Cuál es la probabilidad de sacar exactamente dos seises? (decimal, redondea a $4$ cifras)",
      "correctAnswers": [
        "0.1157",
        "0,1157"
      ],
      "explanation": "$\\dbinom42\\left(\\tfrac16\\right)^2\\left(\\tfrac56\\right)^2 = \\dfrac{6\\cdot25}{1296} = \\dfrac{150}{1296} \\approx 0{,}1157$."
    },
    {
      "id": "check-binom",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Comprueba las tres condiciones."
        }
      ],
      "title": "¿Binomial?",
      "question": "¿Cuál de estas situaciones se modela con una binomial?",
      "choices": [
        {
          "id": "a",
          "label": "Número de caras en $10$ lanzamientos de una moneda"
        },
        {
          "id": "b",
          "label": "Altura de un alumno",
          "incorrectFeedback": "Es continua, no cuenta éxitos."
        },
        {
          "id": "c",
          "label": "Número de cartas hasta sacar un as sin reponer",
          "incorrectFeedback": "Las pruebas no son independientes."
        },
        {
          "id": "d",
          "label": "Tiempo de espera de un autobús",
          "incorrectFeedback": "Es una variable continua."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Pruebas independientes, dos resultados y $p$ constante."
    }
  ],
};
