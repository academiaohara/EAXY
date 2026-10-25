import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_12_SUBTITLE } from "@/data/lessons/shared";

export const mediaVarianza2bachLesson: InteractiveLesson = {
  slug: "media-varianza-2bach",
  title: "2. Media, varianza y desviación típica",
  subtitle: TEMA_2BACH_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "media",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Los parámetros"
        }
      ],
      "title": "Los parámetros",
      "blocks": [
        {
          "kind": "facts",
          "items": [
            {
              "tex": "\\mu = E(X) = \\sum x_i\\,p_i",
              "label": "media o esperanza"
            },
            {
              "tex": "\\sigma^2 = \\sum (x_i - \\mu)^2\\,p_i = \\sum x_i^2\\,p_i - \\mu^2",
              "label": "varianza"
            },
            {
              "tex": "\\sigma = \\sqrt{\\sigma^2}",
              "label": "desviación típica"
            }
          ]
        },
        {
          "kind": "text",
          "text": "La **media** es el valor al que tiende el promedio de muchas repeticiones; en un juego, la ganancia media por partida. Un juego es **justo** si $E = 0$."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\text{Pagas 1 € y ganas 1 € por cara en 3 monedas: } g = -1, 0, 1, 2"
            },
            {
              "math": "E = \\tfrac{-1 + 0 + 3 + 2}{8} = 0{,}5,\\quad \\sigma^2 = 1 - 0{,}5^2 = 0{,}75"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "distribucion-discreta-explorador",
        "initial": [
          3,
          1,
          1
        ],
        "hint": "Mueve el precio y el premio: la media sube o baja y el juego es justo cuando E = 0."
      }
    },
    {
      "id": "juego",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Una apuesta con dos dados"
        }
      ],
      "title": "Una apuesta con dos dados",
      "blocks": [
        {
          "kind": "text",
          "text": "Cada resultado multiplica una ganancia por su probabilidad. En el juego de los dos dados del dibujo, la ganancia media es $-\\tfrac{10}{36}\\,€ \\approx -0{,}28\\,€$: a la larga se pierde."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "esperanza-juego"
      }
    },
    {
      "id": "check-justo",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Calcula la media del premio."
        }
      ],
      "title": "Juego justo",
      "question": "En el juego de las $3$ monedas con premio de $2$ € por cada cara, ¿cuánto debe costar jugar para que sea justo? (€, solo el número)",
      "correctAnswers": [
        "3"
      ],
      "explanation": "$E(\\text{premio}) = 2\\cdot 1{,}5 = 3$: con precio $3$ la media es $0$."
    },
    {
      "id": "check-var2",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\sum p_i\\,(x_i - \\mu)^2$."
        }
      ],
      "title": "Varianza con 2 monedas",
      "question": "$X$ = número de caras en $2$ monedas, con $P = (0{,}25;\\ 0{,}5;\\ 0{,}25)$ y $\\mu = 1$. ¿Cuánto vale $\\sigma^2$? (decimal)",
      "correctAnswers": [
        "0.5",
        "0,5",
        "1/2"
      ],
      "explanation": "$0{,}25(0-1)^2 + 0{,}5\\cdot 0 + 0{,}25(2-1)^2 = 0{,}5$."
    },
    {
      "id": "check-e",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Promedio de $1, \\dots, 6$."
        }
      ],
      "title": "Media de un dado",
      "question": "La media del número que sale al lanzar un dado equilibrado es… (decimal)",
      "correctAnswers": [
        "3.5",
        "3,5",
        "7/2"
      ],
      "explanation": "$\\tfrac{1+2+3+4+5+6}{6} = \\tfrac{21}{6} = 3{,}5$."
    },
    {
      "id": "check-lineal",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Distingue desplazar de escalar."
        }
      ],
      "title": "Cambiar la escala",
      "question": "Si $X$ tiene media $\\mu$ y varianza $\\sigma^2$, la variable $2X + 3$ tiene…",
      "choices": [
        {
          "id": "a",
          "label": "media $2\\mu + 3$ y varianza $4\\sigma^2$"
        },
        {
          "id": "b",
          "label": "media $2\\mu + 3$ y varianza $2\\sigma^2 + 3$",
          "incorrectFeedback": "Sumar una constante no cambia la dispersión y el factor $2$ se eleva al cuadrado."
        },
        {
          "id": "c",
          "label": "media $2\\mu$ y varianza $4\\sigma^2$",
          "incorrectFeedback": "La constante $3$ también desplaza la media."
        },
        {
          "id": "d",
          "label": "media $\\mu + 3$ y varianza $\\sigma^2$",
          "incorrectFeedback": "El factor $2$ también multiplica la media."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$E(aX + b) = aE(X) + b$ y $\\mathrm{Var}(aX + b) = a^2\\,\\mathrm{Var}(X)$."
    }
  ],
};
