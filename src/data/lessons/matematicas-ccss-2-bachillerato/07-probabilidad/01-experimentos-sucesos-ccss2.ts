import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_7_SUBTITLE } from "@/data/lessons/shared";

export const experimentosSucesosCcss2Lesson: InteractiveLesson = {
  slug: "experimentos-sucesos-ccss2",
  title: "1. Experimentos aleatorios y sucesos",
  subtitle: TEMA_CCSS2_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      "id": "exp",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Qué es un experimento aleatorio"
        }
      ],
      "title": "Qué es un experimento aleatorio",
      "blocks": [
        {
          "kind": "definition",
          "text": "Un experimento es **aleatorio** si, repitiéndolo en las mismas condiciones, no se puede predecir el resultado. Al conjunto de todos los resultados posibles se le llama **espacio muestral** $E$."
        },
        {
          "kind": "text",
          "text": "Cada resultado individual es un **suceso elemental**. Un **suceso** es cualquier subconjunto de $E$: puede contener varios resultados, uno solo (elemental), todos (**seguro**) o ninguno (**imposible**, $\\varnothing$)."
        },
        {
          "kind": "example",
          "lines": [
            {
              "math": "\\text{Lanzar un dado:}\\ E = \\{1, 2, 3, 4, 5, 6\\}"
            },
            {
              "math": "A = \\text{«sale par»} = \\{2, 4, 6\\},\\quad B = \\text{«sale un 5»} = \\{5\\}"
            }
          ]
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "espacio-muestral"
      }
    },
    {
      "id": "conteo",
      "type": "slide",
      "help": [
        {
          "label": "Idea",
          "message": "Cuántos sucesos hay"
        }
      ],
      "title": "Cuántos sucesos hay",
      "blocks": [
        {
          "kind": "text",
          "text": "Si $E$ tiene $n$ resultados, hay $2^n$ sucesos posibles (cada resultado está dentro o fuera del suceso). Con un dado son $2^6 = 64$, incluyendo $\\varnothing$ y $E$."
        },
        {
          "kind": "warning",
          "text": "Calcular el coste de una compra conociendo el peso y el precio **no** es aleatorio: el resultado es determinista."
        }
      ],
      "visual": {
        "kind": "anim",
        "scene": "sucesos-conjuntos"
      }
    },
    {
      "id": "check-e3",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Multiplica los resultados de cada moneda."
        }
      ],
      "title": "Tres monedas",
      "question": "Lanzamos tres monedas distintas. ¿Cuántos resultados tiene el espacio muestral? (solo el número)",
      "correctAnswers": [
        "8"
      ],
      "explanation": "Cada moneda tiene $2$ resultados: $2\\cdot 2\\cdot 2 = 8$."
    },
    {
      "id": "check-sucesos",
      "type": "predict",
      "mode": "numeric",
      "help": [
        {
          "label": "Pista",
          "message": "Cada resultado está dentro o fuera."
        }
      ],
      "title": "Número de sucesos",
      "question": "Si el espacio muestral tiene $3$ resultados, ¿cuántos sucesos distintos hay (contando el imposible y el seguro)? (solo el número)",
      "correctAnswers": [
        "8"
      ],
      "explanation": "$2^3 = 8$."
    },
    {
      "id": "check-seguro",
      "type": "predict",
      "mode": "choice",
      "help": [
        {
          "label": "Pista",
          "message": "Mira si algún resultado queda fuera."
        }
      ],
      "title": "Suceso seguro",
      "question": "Al lanzar un dado, el suceso «sale un número menor que $7$» es…",
      "choices": [
        {
          "id": "a",
          "label": "el suceso seguro, $E$"
        },
        {
          "id": "b",
          "label": "el suceso imposible",
          "incorrectFeedback": "Todos los resultados cumplen la condición."
        },
        {
          "id": "c",
          "label": "un suceso elemental",
          "incorrectFeedback": "Contiene seis resultados, no uno."
        },
        {
          "id": "d",
          "label": "el suceso contrario de $E$",
          "incorrectFeedback": "El contrario de $E$ es $\\varnothing$."
        }
      ],
      "correctChoiceId": "a",
      "shuffleChoices": true,
      "explanation": "Todos los resultados $1, \\dots, 6$ son menores que $7$."
    },
    {
      "id": "check-clasifica",
      "type": "classify",
      "help": [
        {
          "label": "Pista",
          "message": "Pregúntate si hay incertidumbre."
        }
      ],
      "title": "¿Es aleatorio?",
      "question": "Clasifica cada experimento.",
      "groups": [
        {
          "id": "si",
          "label": "Aleatorio",
          "tone": "emerald"
        },
        {
          "id": "no",
          "label": "No aleatorio",
          "tone": "rose"
        }
      ],
      "items": [
        {
          "id": "a",
          "text": "Lanzar una moneda y anotar el lado",
          "group": "si"
        },
        {
          "id": "b",
          "text": "Sacar una carta de una baraja sin mirar",
          "group": "si"
        },
        {
          "id": "c",
          "text": "Calcular el recibo de la luz con el gasto y la tarifa",
          "group": "no"
        },
        {
          "id": "d",
          "text": "Abrir un libro y anotar la página",
          "group": "si"
        },
        {
          "id": "e",
          "text": "Calcular el área de un cuadrado de lado $3$",
          "group": "no"
        }
      ],
      "hint": "Es aleatorio si no se puede predecir el resultado."
    }
  ],
};
