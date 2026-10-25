import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_8_SUBTITLE } from "@/data/lessons/shared";

export const contrasteProporcionErroresCcss2Lesson: InteractiveLesson = {
  slug: "contraste-proporcion-errores-ccss2",
  title: "12. Contraste de una proporción y errores",
  subtitle: TEMA_CCSS2_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "proporcion",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Contraste para una proporción"
        }
      ],
      "title": "Contraste para una proporción",
      "blocks": [
        {
          "kind": "text",
          "text": "Para contrastar $H_0: p = p_0$ se usa que $\\hat p \\approx N\\!\\left(p_0, \\sqrt{\\dfrac{p_0 q_0}{n}}\\right)$ y se procede igual: zona de aceptación $p_0 \\pm z_{\\alpha/2}\\sqrt{\\dfrac{p_0 q_0}{n}}$, calcular $\\hat p$ y decidir."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\text{Moneda: } H_0: p = 0{,}5;\\quad n = 100,\\ 65 \\text{ caras} \\Rightarrow \\hat p = 0{,}65"
            },
            {
              "math": "\\text{Zona al 5 \\%: } 0{,}5 \\pm 1{,}96\\cdot0{,}05 = (0{,}402;\\ 0{,}598) \\Rightarrow \\text{se rechaza } H_0"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "contraste-proporcion-explorador",
        "initial": [
          0,
          50,
          100,
          65,
          1
        ],
        "hint": "Con 65 caras en 100 lanzamientos se rechaza que la moneda sea equilibrada al 5 %. Prueba con 55 caras."
      }
    },
    {
      "id": "errores",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Los dos errores posibles"
        }
      ],
      "title": "Los dos errores posibles",
      "blocks": [
        {
          "kind": "definition",
          "text": "**Error de tipo I:** rechazar $H_0$ siendo verdadera. Su probabilidad es el nivel de significación $\\alpha$. **Error de tipo II:** aceptar $H_0$ siendo falsa."
        },
        {
          "kind": "text",
          "text": "Hay relación con los intervalos de confianza: si el estimador muestral queda fuera del intervalo, se rechaza la hipótesis nula con $\\alpha = 1 - \\text{nivel de confianza}$."
        }
      ]
    },
    {
      "id": "check-ph",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Caras entre lanzamientos."
        }
      ],
      "title": "Proporción muestral",
      "question": "En el ejemplo de la moneda, ¿cuánto vale $\\hat p$? (decimal)",
      "correctAnswers": [
        "0.65",
        "0,65",
        "65/100",
        "13/20"
      ],
      "explanation": "$\\dfrac{65}{100} = 0{,}65$."
    },
    {
      "id": "check-sd",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$\\sqrt{0{,}0025}$."
        }
      ],
      "title": "Desviación típica",
      "question": "Con $p_0 = 0{,}5$ y $n = 100$, ¿cuánto vale $\\sqrt{p_0q_0/n}$? (decimal)",
      "correctAnswers": [
        "0.05",
        "0,05"
      ],
      "explanation": "$\\sqrt{0{,}25/100} = 0{,}05$."
    },
    {
      "id": "check-sup",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "$1{,}96\\cdot0{,}05 = 0{,}098$."
        }
      ],
      "title": "Extremo superior",
      "question": "¿Cuál es el extremo superior de la zona de aceptación al $5\\,\\%$? (3 decimales)",
      "correctAnswers": [
        "0.598",
        "0,598"
      ],
      "explanation": "$0{,}5 + 1{,}96\\cdot0{,}05 = 0{,}598$."
    },
    {
      "id": "check-error",
      "type": "classify",
      "help": [
        {
          "label": "Pista",
          "message": "Fíjate en si se rechaza o se acepta."
        }
      ],
      "title": "¿Error de tipo I o II?",
      "question": "Clasifica cada situación.",
      "groups": [
        {
          "id": "t1",
          "label": "Error de tipo I",
          "tone": "rose"
        },
        {
          "id": "t2",
          "label": "Error de tipo II",
          "tone": "amber"
        }
      ],
      "items": [
        {
          "id": "a",
          "text": "Rechazar $H_0$ cuando es verdadera",
          "group": "t1"
        },
        {
          "id": "b",
          "text": "Aceptar $H_0$ cuando es falsa",
          "group": "t2"
        },
        {
          "id": "c",
          "text": "Declarar trucada una moneda que en realidad es equilibrada",
          "group": "t1"
        },
        {
          "id": "d",
          "text": "Decir que una moneda es equilibrada cuando está trucada",
          "group": "t2"
        }
      ],
      "hint": "Tipo I: falsa alarma. Tipo II: no detectar el cambio."
    },
    {
      "id": "check-alfa",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Recuerda la definición de $\\alpha$."
        }
      ],
      "title": "La probabilidad del error de tipo I",
      "question": "La probabilidad de cometer un error de tipo I es…",
      "choices": [
        {
          "id": "a",
          "label": "el nivel de significación $\\alpha$"
        },
        {
          "id": "b",
          "label": "$1 - \\alpha$",
          "incorrectFeedback": "Esa es la confianza."
        },
        {
          "id": "c",
          "label": "siempre $0{,}5$",
          "incorrectFeedback": "No tiene valor fijo."
        },
        {
          "id": "d",
          "label": "la probabilidad de $H_1$",
          "incorrectFeedback": "No se define así."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Con $\\alpha = 0{,}05$ se rechaza por error en el $5\\,\\%$ de los casos en que $H_0$ es cierta."
    }
  ],
};
