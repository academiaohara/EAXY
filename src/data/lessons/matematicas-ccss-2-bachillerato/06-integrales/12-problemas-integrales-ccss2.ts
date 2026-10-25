import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_6_SUBTITLE } from "@/data/lessons/shared";

export const problemasIntegralesCcss2Lesson: InteractiveLesson = {
  slug: "problemas-integrales-ccss2",
  title: "12. Problemas de integrales",
  subtitle: TEMA_CCSS2_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "aplicaciones",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "La integral en contexto"
        }
      ],
      "title": "La integral en contexto",
      "blocks": [
        {
          "kind": "text",
          "text": "Cuando una magnitud se conoce por su **tasa de variación** (derivada), la integral recupera la magnitud total. Con una condición inicial se fija la constante $C$."
        },
        {
          "kind": "facts",
          "items": [
            {
              "tex": "I(x) = \\int I'(x)\\,dx,\\ I(0) = 0",
              "label": "ingreso total a partir del ingreso marginal"
            },
            {
              "tex": "s = \\int_a^b v(t)\\,dt",
              "label": "espacio recorrido a partir de la velocidad"
            },
            {
              "tex": "\\text{Área} = \\int_a^b |f(x)|\\,dx",
              "label": "área entre la curva y el eje $X$"
            }
          ]
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "I'(x) = 120 - 4x,\\ I(0) = 0 \\Rightarrow I(x) = 120x - 2x^2"
            },
            {
              "math": "I(10) = 1200 - 200 = 1000"
            }
          ]
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "integral-polinomio-explorador",
        "initial": [
          0,
          -4,
          120,
          0
        ],
        "hint": "f(x) = −4x + 120 y su primitiva F(x) = −2x² + 120x. Con C = 0 es el ingreso total."
      }
    },
    {
      "id": "check-ing",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Sustituye $x = 10$."
        }
      ],
      "title": "Ingreso total",
      "question": "Con $I(x) = 120x - 2x^2$, ¿cuánto vale $I(10)$? (solo el número)",
      "correctAnswers": [
        "1000"
      ],
      "explanation": "$1200 - 2\\cdot100 = 1000$."
    },
    {
      "id": "check-dist",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Una primitiva de $3t^2$ es $t^3$."
        }
      ],
      "title": "Espacio recorrido",
      "question": "Un móvil tiene velocidad $v(t) = 3t^2$ m/s. ¿Cuántos metros recorre entre $t = 0$ y $t = 4$? (solo el número)",
      "correctAnswers": [
        "64"
      ],
      "explanation": "$\\int_0^4 3t^2\\,dt = \\big[t^3\\big]_0^4 = 64$."
    },
    {
      "id": "check-area",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Los cortes con el eje $X$ son $x = \\pm 3$."
        }
      ],
      "title": "Área bajo una parábola",
      "question": "¿Cuál es el área encerrada entre $y = 9 - x^2$ y el eje $X$? (solo el número)",
      "correctAnswers": [
        "36"
      ],
      "explanation": "$\\int_{-3}^{3}(9 - x^2)\\,dx = \\left[9x - \\tfrac{x^3}{3}\\right]_{-3}^{3} = 18 + 18 = 36$."
    },
    {
      "id": "barrow",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Con signo"
        }
      ],
      "title": "Con signo",
      "blocks": [
        {
          "kind": "text",
          "text": "Con $f(x) = x^2 - 4$ la integral entre $0$ y $3$ mezcla un tramo negativo ($0$ a $2$) y uno positivo ($2$ a $3$): vale $-3$."
        }
      ],
      "visual": {
        "kind": "tool",
        "tool": "barrow-explorador",
        "initial": [
          0,
          3
        ],
        "hint": "∫₀³ (x² − 4) dx = −3: el tramo de 0 a 2 resta y el de 2 a 3 suma."
      }
    },
    {
      "id": "check-barrow",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Una primitiva es $\\tfrac{x^3}{3} - 4x$."
        }
      ],
      "title": "Integral con signo",
      "question": "Calcula $\\int_0^3 (x^2 - 4)\\,dx$. (solo el número)",
      "correctAnswers": [
        "-3",
        "−3"
      ],
      "explanation": "$\\left[\\tfrac{x^3}{3} - 4x\\right]_0^3 = 9 - 12 = -3$."
    },
    {
      "id": "check-sentido",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Piensa en las unidades."
        }
      ],
      "title": "Qué calcula la integral",
      "question": "Si $v(t)$ es la velocidad de un móvil, $\\int_a^b v(t)\\,dt$ es…",
      "choices": [
        {
          "id": "a",
          "label": "el cambio de posición entre $t = a$ y $t = b$"
        },
        {
          "id": "b",
          "label": "la aceleración media",
          "incorrectFeedback": "La aceleración es la derivada de $v$."
        },
        {
          "id": "c",
          "label": "la velocidad en $t = b$",
          "incorrectFeedback": "$v(b)$ es un valor, no un área."
        },
        {
          "id": "d",
          "label": "siempre el espacio recorrido",
          "incorrectFeedback": "Si $v$ cambia de signo, la integral es el desplazamiento, no el espacio."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "La integral de la tasa de variación da la variación total."
    }
  ],
};
