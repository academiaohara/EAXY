import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_1_SUBTITLE } from "@/data/lessons/shared";

export const criteriosDivisibilidad2esoLesson: InteractiveLesson = {
  slug: "criterios-divisibilidad-2eso",
  title: "2. Criterios de divisibilidad",
  subtitle: TEMA_2ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "criterio-2",
      type: "slide",
      help: [
        {
          label: "¿Por qué solo la última cifra?",
          message: "Un número se descompone en un múltiplo de $2$ más la cifra de las unidades: $176 = 170 + 6$. El $170$ ya es múltiplo, así que decide el $6$.",
        },
        {
          label: "Dos ejemplos",
          message: "$232$ acaba en $2$: divisible. $135$ acaba en $5$: no lo es.",
        },
      ],
      title: "Entre 2: la última cifra es par",
      blocks: [
        {
          kind: "definition",
          text: "Los **criterios de divisibilidad** son reglas que permiten saber si un número es divisible entre otro **sin hacer la división**.",
        },
        {
          kind: "rule",
          text: "Un número es divisible entre $2$ si su última cifra es **par**: $0, 2, 4, 6$ u $8$.",
        },
        {
          kind: "example",
          lines: [{ math: "176 = 170 + 6", note: "múltiplo de $2$ + unidades" }],
        },
      ],
      visual: { kind: "anim", scene: "criterio-ejemplos", params: { d: 2, nums: [135, 232, 418] } },
    },
    {
      id: "criterio-3-9",
      type: "slide",
      help: [
        {
          label: "¿Por qué suman las cifras?",
          message: "$9, 99, 999\\dots$ son múltiplos de $3$ y de $9$. Cada cifra aporta «tantos nueves» más ella misma, y solo esa parte sobrante, la suma de cifras, decide.",
        },
        {
          label: "Un ejemplo",
          message: "$234 = (99 + 99 + 9 + 9 + 9) + (2 + 3 + 4)$. El primer paréntesis es múltiplo de $3$; falta ver si $2 + 3 + 4 = 9$ lo es.",
        },
      ],
      title: "Entre 3 y entre 9: la suma de las cifras",
      blocks: [
        {
          kind: "rule",
          text: "Un número es divisible entre $3$ si la **suma de sus cifras** es múltiplo de $3$. Lo mismo vale para el $9$.",
        },
        {
          kind: "example",
          lines: [
            { math: "135 \\to 1 + 3 + 5 = 9", note: "múltiplo de $3$ y de $9$" },
            { math: "232 \\to 2 + 3 + 2 = 7", note: "no es múltiplo de $3$" },
          ],
        },
        {
          kind: "warning",
          text: "Múltiplo de $9$ implica múltiplo de $3$, pero no al revés: $12$ suma $3$ y no es múltiplo de $9$.",
        },
      ],
      visual: { kind: "anim", scene: "criterio-ejemplos", params: { d: 3, nums: [135, 232, 418] } },
    },
    {
      id: "criterio-4",
      type: "slide",
      help: [
        {
          label: "¿Por qué dos cifras?",
          message: "Porque $100$ es múltiplo de $4$: lo que hay antes de las dos últimas cifras ya es múltiplo.",
        },
        {
          label: "Un ejemplo",
          message: "$1\\,532$: $32 = 4 \\cdot 8$, sí. $1\\,518$: $18$ no es múltiplo de $4$, no.",
        },
      ],
      title: "Entre 4: las dos últimas cifras",
      blocks: [
        {
          kind: "rule",
          text: "Un número es divisible entre $4$ si el número formado por sus **dos últimas cifras** es múltiplo de $4$ (o son $00$).",
        },
        {
          kind: "example",
          lines: [
            { math: "232 \\to 32 = 4 \\cdot 8", note: "divisible" },
            { math: "418 \\to 18", note: "no es múltiplo de $4$" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "criterio-ejemplos", params: { d: 4, nums: [135, 232, 418] } },
    },
    {
      id: "criterio-5-10",
      type: "slide",
      help: [
        {
          label: "¿Por qué?",
          message: "Como con el $2$: un número es un múltiplo de $10$ (acaba en $0$) más su última cifra. Los múltiplos de $10$ lo son también de $5$ y de $10$.",
        },
        {
          label: "El 10 es más exigente",
          message: "Acabar en $5$ vale para el $5$ pero no para el $10$: $135$ es múltiplo de $5$ y no de $10$.",
        },
      ],
      title: "Entre 5 y entre 10: cómo acaba",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Entre 5",
            text: "Acaba en **0** o en **5**.",
            math: ["135,\\ 220,\\ 300"],
            tone: "ok",
          },
          right: {
            title: "Entre 10",
            text: "Acaba en **0**.",
            math: ["220,\\ 300"],
            tone: "info",
          },
        },
      ],
      visual: { kind: "anim", scene: "criterio-ejemplos", params: { d: 5, nums: [135, 220, 232] } },
    },
    {
      id: "criterio-6-12",
      type: "slide",
      help: [
        {
          label: "¿Por qué dos criterios a la vez?",
          message: "Porque $6 = 2 \\cdot 3$ y $12 = 3 \\cdot 4$, y esos factores no comparten divisores. Cumplir los dos criterios asegura cumplir el compuesto.",
        },
        {
          label: "Cuidado con el 12",
          message: "Se usa $3$ y $4$, no $2$ y $6$: un número puede ser divisible entre $2$ y entre $6$ y no serlo entre $12$ (por ejemplo $6$).",
        },
      ],
      title: "Entre 6 y entre 12: se combinan",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Entre 6",
            text: "Divisible entre **2 y** entre **3**.",
            math: ["300 \\to \\text{par},\\ 3 + 0 + 0 = 3"],
            tone: "ok",
          },
          right: {
            title: "Entre 12",
            text: "Divisible entre **3 y** entre **4**.",
            math: ["300 \\to 3,\\ 00"],
            tone: "info",
          },
        },
      ],
      visual: { kind: "anim", scene: "criterio-ejemplos", params: { d: 12, nums: [300, 232, 418] } },
    },
    {
      id: "criterio-11",
      type: "slide",
      help: [
        {
          label: "¿Qué son las posiciones?",
          message: "Se numeran de derecha a izquierda: la primera cifra es la de las unidades (posición impar), la siguiente la de las decenas (par), y así.",
        },
        {
          label: "Si sale 0",
          message: "El $0$ cuenta como múltiplo de $11$, así que el número es divisible.",
        },
      ],
      title: "Entre 11: impares menos pares",
      blocks: [
        {
          kind: "rule",
          text: "Un número es divisible entre $11$ si la suma de las cifras en **posición impar** menos la suma de las cifras en **posición par** es $0$ o múltiplo de $11$.",
        },
        {
          kind: "example",
          lines: [
            { math: "418 \\to (4 + 8) - 1 = 11", note: "divisible" },
            { math: "220 \\to (2 + 0) - 2 = 0", note: "divisible" },
            { math: "135 \\to (1 + 5) - 3 = 3", note: "no divisible" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "criterio-ejemplos", params: { d: 11, nums: [418, 220, 135] } },
    },
    {
      id: "check-grid",
      type: "divisibility_grid",
      help: [
        {
          label: "¿Cómo trabajo con la cuadrícula?",
          message: "Cada casilla pregunta si el número de la fila es divisible entre el de la columna. Ve columna por columna aplicando un solo criterio cada vez.",
        },
        {
          label: "Columnas compuestas",
          message: "Para el $6$ usa los ✓ del $2$ y del $3$. Para el $12$, los del $3$ y del $4$.",
        },
      ],
      title: "Cuadrícula de criterios",
      question:
        "Toca las casillas en las que el número de la fila es divisible entre el de la columna.",
      numbers: [135, 232, 418, 220, 300],
      divisors: [2, 3, 4, 5, 6, 10, 11, 12],
    },
    {
      id: "check-pedido",
      type: "predict",
      help: [
        {
          label: "Dos condiciones",
          message: "Quieres el número a la vez divisible entre $4$ y entre $9$. Aplica cada criterio por separado a cada opción.",
        },
        {
          label: "Con $4$ y $9$ basta",
          message: "Como $4$ y $9$ no comparten divisores, divisible entre ambos es lo mismo que divisible entre $36$.",
        },
      ],
      title: "Divisible entre 4 y entre 9",
      question: "¿Cuál de estos números es divisible entre $4$ y entre $9$ a la vez?",
      mode: "choice",
      choices: [
        {
          id: "1224",
          label: "$1\\,224$",
        },
        {
          id: "1236",
          label: "$1\\,236$",
          incorrectFeedback: "Es divisible entre $4$ ($36$), pero $1 + 2 + 3 + 6 = 12$ no es múltiplo de $9$.",
        },
        {
          id: "1215",
          label: "$1\\,215$",
          incorrectFeedback: "$1 + 2 + 1 + 5 = 9$ cumple el $9$, pero $15$ no es múltiplo de $4$.",
        },
        {
          id: "1230",
          label: "$1\\,230$",
          incorrectFeedback: "No cumple ni el $4$ ($30$ no es múltiplo de $4$) ni el $9$ (suma $6$).",
        },
      ],
      correctChoiceId: "1224",
      shuffleChoices: true,
      explanation: "$1\\,224$: las dos últimas cifras son $24 = 4 \\cdot 6$ y $1 + 2 + 2 + 4 = 9$. Cumple ambos criterios.",
    },
  ],
};
