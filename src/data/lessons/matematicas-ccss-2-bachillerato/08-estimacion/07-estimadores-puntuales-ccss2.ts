import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_8_SUBTITLE } from "@/data/lessons/shared";

export const estimadoresPuntualesCcss2Lesson: InteractiveLesson = {
  slug: "estimadores-puntuales-ccss2",
  title: "7. Estimadores y concepto de intervalo de confianza",
  subtitle: TEMA_CCSS2_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "estimador",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Estimar un parámetro"
        }
      ],
      "title": "Estimar un parámetro",
      "blocks": [
        {
          "kind": "text",
          "text": "Un **estimador puntual** es un estadístico que da un único valor para el parámetro (la media muestral para $\\mu$, la proporción muestral para $p$). Es **insesgado** si su media coincide con el parámetro, y su **eficiencia** mide cuánto varía: la inversa de la varianza."
        },
        {
          "kind": "facts",
          "items": [
            {
              "tex": "\\text{Eficiencia de }\\bar{x} = \\dfrac{n}{\\sigma^2}",
              "label": "crece con $n$"
            },
            {
              "tex": "\\text{Eficiencia de }\\hat p = \\dfrac{n}{p(1-p)}",
              "label": "crece con $n$"
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
          25,
          8,
          12
        ],
        "hint": "Con n = 25 la campana de x̄ es más ancha (σ/√n = 4). Sube n y verás que se estrecha: el estimador es más eficiente."
      }
    },
    {
      "id": "intervalo",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Un intervalo en lugar de un valor"
        }
      ],
      "title": "Un intervalo en lugar de un valor",
      "blocks": [
        {
          "kind": "text",
          "text": "Un **intervalo de confianza** da un rango en el que se espera que esté el parámetro. Su **nivel de confianza** es $1 - \\alpha$ (por ejemplo $0{,}95$); $\\alpha$ es el **nivel de significación**. Los **valores críticos** $\\pm z_{\\alpha/2}$ dejan $\\alpha/2$ en cada cola: para $95\\,\\%$, $z = 1{,}96$."
        },
        {
          "kind": "facts",
          "items": [
            {
              "tex": "90\\,\\%\\ \\to\\ z = 1{,}645",
              "label": "$\\alpha = 0{,}10$"
            },
            {
              "tex": "95\\,\\%\\ \\to\\ z = 1{,}96",
              "label": "$\\alpha = 0{,}05$"
            },
            {
              "tex": "99\\,\\%\\ \\to\\ z = 2{,}575",
              "label": "$\\alpha = 0{,}01$"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "tabla-normal-explorador",
        "initial": [
          196
        ],
        "hint": "Con z = 1,96 el intervalo simétrico (−1,96; 1,96) contiene el 95 % del área."
      }
    },
    {
      "id": "check-efm",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\sigma^2 = 4$."
        }
      ],
      "title": "Eficiencia de la media",
      "question": "Con $n = 100$ y $\\sigma = 2$, ¿cuánto vale la eficiencia $n/\\sigma^2$ de la media muestral? (solo el número)",
      "correctAnswers": [
        "25"
      ],
      "explanation": "$\\dfrac{100}{4} = 25$."
    },
    {
      "id": "check-efp",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$p(1-p) = 0{,}25$."
        }
      ],
      "title": "Eficiencia de la proporción",
      "question": "Con $n = 100$ y $p = 0{,}5$, ¿cuánto vale $n/(p(1-p))$? (solo el número)",
      "correctAnswers": [
        "400"
      ],
      "explanation": "$\\dfrac{100}{0{,}25} = 400$."
    },
    {
      "id": "check-amp",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Amplitud $= 2\\cdot z\\cdot\\sigma$."
        }
      ],
      "title": "Amplitud",
      "question": "Un intervalo del $99\\,\\%$ para una $N(100;\\ 4)$ es $100 \\pm 2{,}575\\cdot 4$. ¿Cuál es su amplitud? (decimal)",
      "correctAnswers": [
        "20.6",
        "20,6"
      ],
      "explanation": "$2\\cdot2{,}575\\cdot4 = 20{,}6$ (de $89{,}7$ a $110{,}3$)."
    },
    {
      "id": "check-interp",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Recuerda la simulación de intervalos."
        }
      ],
      "title": "Interpretar",
      "question": "Un intervalo de confianza del $95\\,\\%$ significa que…",
      "choices": [
        {
          "id": "a",
          "label": "si se repitiera el muestreo muchas veces, el $95\\,\\%$ de los intervalos contendría al parámetro"
        },
        {
          "id": "b",
          "label": "el parámetro está en este intervalo con probabilidad $0{,}95$",
          "incorrectFeedback": "El parámetro es fijo: está o no está; la probabilidad se refiere al método."
        },
        {
          "id": "c",
          "label": "el $95\\,\\%$ de los individuos está dentro",
          "incorrectFeedback": "Se estima el parámetro, no los individuos."
        },
        {
          "id": "d",
          "label": "la muestra es del $95\\,\\%$ de la población",
          "incorrectFeedback": "El nivel de confianza no es la fracción muestreada."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "La confianza describe la fiabilidad del procedimiento."
    }
  ],
};
