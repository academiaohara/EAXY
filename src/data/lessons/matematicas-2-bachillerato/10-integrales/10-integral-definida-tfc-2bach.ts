import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_10_SUBTITLE } from "@/data/lessons/shared";

export const integralDefinidaTfc2bachLesson: InteractiveLesson = {
  slug: "integral-definida-tfc-2bach",
  title: "10. Integral definida y teorema fundamental",
  subtitle: TEMA_2BACH_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "definida",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "La integral definida"
        }
      ],
      "title": "La integral definida",
      "blocks": [
        {
          "kind": "definition",
          "text": "La **integral definida** de $f$ entre $a$ y $b$, $\\displaystyle\\int_a^b f(x)\\,dx$, es el límite de las sumas de Riemann. Si $f \\geq 0$ es el área bajo la curva."
        },
        {
          "kind": "facts",
          "items": [
            {
              "tex": "\\int_a^a f = 0",
              "label": "intervalo vacío"
            },
            {
              "tex": "\\int_b^a f = -\\int_a^b f",
              "label": "cambia el sentido"
            },
            {
              "tex": "\\int_a^b f = \\int_a^c f + \\int_c^b f",
              "label": "aditividad"
            }
          ]
        },
        {
          "kind": "text",
          "text": "**Valor medio:** si $f$ es continua en $[a,b]$ existe $c$ con $f(c)\\,(b-a) = \\int_a^b f(x)\\,dx$. Ejemplo: $f(x) = 2x$ en $[0,4]$ tiene $\\int_0^4 2x\\,dx = 16$, media $4$ y $c = 2$."
        }
      ]
    },
    {
      "id": "tfc",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Teorema fundamental del cálculo"
        }
      ],
      "title": "Teorema fundamental del cálculo",
      "blocks": [
        {
          "kind": "text",
          "text": "La **función integral** $F(x) = \\displaystyle\\int_a^x f(t)\\,dt$ acumula el área desde $a$ hasta $x$. El teorema fundamental dice que $F$ es derivable y"
        },
        {
          "kind": "formula",
          "tex": "F'(x) = f(x)"
        },
        {
          "kind": "text",
          "text": "Derivar e integrar son operaciones inversas: la derivada del área acumulada es la altura."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "teorema-fundamental"
      }
    },
    {
      "id": "check-tfc",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Aplica $F' = f$."
        }
      ],
      "title": "Derivar una función integral",
      "question": "Si $F(x) = \\displaystyle\\int_1^x (t^2 + 1)\\,dt$, ¿cuánto vale $F'(2)$? (solo el número)",
      "correctAnswers": [
        "5"
      ],
      "explanation": "$F'(x) = x^2 + 1$, luego $F'(2) = 5$."
    },
    {
      "id": "check-ad",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Suma los dos tramos."
        }
      ],
      "title": "Aditividad",
      "question": "Si $\\int_0^2 f = 5$ y $\\int_2^6 f = 3$, ¿cuánto vale $\\int_0^6 f$? (solo el número)",
      "correctAnswers": [
        "8"
      ],
      "explanation": "$5 + 3 = 8$."
    },
    {
      "id": "check-c",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Resuelve $2c = 4$."
        }
      ],
      "title": "El punto del valor medio",
      "question": "Para $f(x) = 2x$ en $[0,4]$, ¿en qué punto $c$ se alcanza el valor medio? (solo el número)",
      "correctAnswers": [
        "2"
      ],
      "explanation": "Valor medio $= 16/4 = 4 = f(c) = 2c \\Rightarrow c = 2$."
    },
    {
      "id": "check-signo",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Recuerda la propiedad."
        }
      ],
      "title": "Invertir los límites",
      "question": "Si $\\int_1^3 f(x)\\,dx = 7$, entonces $\\int_3^1 f(x)\\,dx$ vale…",
      "choices": [
        {
          "id": "a",
          "label": "$-7$"
        },
        {
          "id": "b",
          "label": "$7$",
          "incorrectFeedback": "Al invertir los límites cambia el signo."
        },
        {
          "id": "c",
          "label": "$0$",
          "incorrectFeedback": "Solo vale $0$ si los dos límites son iguales."
        },
        {
          "id": "d",
          "label": "$\\tfrac17$",
          "incorrectFeedback": "La integral no se invierte como un inverso."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "$\\int_b^a f = -\\int_a^b f$."
    }
  ],
};
