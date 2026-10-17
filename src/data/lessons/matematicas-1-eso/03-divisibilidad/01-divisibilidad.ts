import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3_SUBTITLE } from "@/data/lessons/shared";

const DIVISORES_30 =
  "Los divisores de $30$ salen por parejas: $30 = 1 \\cdot 30 = 2 \\cdot 15 = 3 \\cdot 10 = 5 \\cdot 6$, es decir, $1, 2, 3, 5, 6, 10, 15, 30$. Quitando $1$ y $30$ quedan $2, 3, 5, 6, 10, 15$: seis tamaños de bolsa.";

export const divisibilidadLesson: InteractiveLesson = {
  slug: "divisibilidad",
  title: "1. Divisibilidad: múltiplos y divisores",
  subtitle: TEMA_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "divisible",
      type: "slide",
      title: "Divisible: la división exacta",
      blocks: [
        {
          kind: "text",
          text: "Una pizzería empaqueta las porciones en cajas de **6**. ¿Con cuántas porciones no sobra ninguna fuera de una caja?",
        },
        {
          kind: "definition",
          text: "Un número es **divisible** entre otro cuando la división es **exacta**: el resto es $0$.",
        },
        {
          kind: "example",
          lines: [
            { math: "24 : 6 = 4 \\quad (\\text{resto } 0)", note: "divisible" },
            {
              math: "26 : 6 = 4 \\quad (\\text{resto } 2)",
              note: "no divisible",
            },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "divisibilidad-grupos",
        params: { a: 24, b: 6, extra: 2 },
        captions: [
          "**24** porciones sueltas. ¿Caben en cajas de **6** sin que sobre ninguna?",
          "**4 cajas** llenas y nada suelto: la división es **exacta**, así que 24 es **divisible** entre 6.",
          "Con **26** porciones quedan **2** fuera de las cajas: el resto no es $0$ y 26 **no es divisible** entre 6.",
        ],
      },
    },
    {
      id: "multiplo-divisor",
      type: "slide",
      title: "Múltiplo y divisor: una misma igualdad",
      blocks: [
        {
          kind: "rule",
          text: "Cuando $a = b \\cdot k$ (con $k$ natural), $a$ es **múltiplo** de $b$ y $b$ es **divisor** de $a$.",
        },
        { kind: "formula", tex: "24 = 6 \\cdot 4" },
        {
          kind: "compare",
          left: {
            title: "Múltiplo",
            text: "El número **grande**: contiene al otro un número exacto de veces.",
            tone: "ok",
          },
          right: {
            title: "Divisor",
            text: "El factor **pequeño**: cabe en el otro un número exacto de veces.",
            tone: "info",
          },
        },
        {
          kind: "relations",
          items: [
            { left: "24", relation: "es múltiplo de", right: "6", tone: "ok" },
            { left: "6", relation: "es divisor de", right: "24", tone: "info" },
            { left: "24", relation: "es múltiplo de", right: "4", tone: "ok" },
            { left: "4", relation: "es divisor de", right: "24", tone: "info" },
          ],
        },
        {
          kind: "warning",
          title: "El orden importa",
          text: "Un divisor nunca supera al número ($24$ no divide a $6$) y un múltiplo nunca es menor que él. El $1$ y el propio número son siempre divisores.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-direccion",
      type: "predict",
      title: "Quién es múltiplo de quién",
      question:
        "Sabiendo que $56 = 8 \\cdot 7$, ¿cuál de estas afirmaciones es verdadera?",
      mode: "choice",
      choices: [
        {
          id: "56-divisor-8",
          label: "$56$ es divisor de $8$",
          incorrectFeedback:
            "Un divisor no puede ser mayor que el número: $56 > 8$.",
        },
        {
          id: "7-multiplo-56",
          label: "$7$ es múltiplo de $56$",
          incorrectFeedback:
            "Un múltiplo no puede ser menor que el número: es justo al revés, $56$ es múltiplo de $7$.",
        },
        { id: "divisores", label: "$8$ y $7$ son divisores de $56$" },
        {
          id: "56-no-7",
          label: "$56$ no es divisible entre $7$",
          incorrectFeedback: "$56 : 7 = 8$ es exacta, así que sí es divisible.",
        },
      ],
      correctChoiceId: "divisores",
      shuffleChoices: true,
      explanation:
        "De $56 = 8 \\cdot 7$ salen dos lecturas: $56$ es múltiplo de $8$ y de $7$; y $8$ y $7$ son divisores de $56$.",
    },
    {
      id: "multiplos",
      type: "slide",
      title: "Los múltiplos: la tabla del número, sin final",
      blocks: [
        {
          kind: "text",
          text: "Los múltiplos de $n$ salen de multiplicarlo por $1, 2, 3, \\dots$ Cada uno está a una distancia $n$ del anterior.",
        },
        {
          kind: "facts",
          items: [
            { tex: "7 \\cdot 1 = 7" },
            { tex: "7 \\cdot 2 = 14" },
            { tex: "7 \\cdot 3 = 21" },
            { tex: "7 \\cdot 4 = 28" },
            { tex: "7 \\cdot 5 = 35" },
          ],
        },
        {
          kind: "compare",
          left: {
            title: "Múltiplos de $n$",
            text: "**Infinitos**. Ninguno es menor que $n$.",
            tone: "ok",
          },
          right: {
            title: "Divisores de $n$",
            text: "**Finitos**. Ninguno es mayor que $n$.",
            tone: "info",
          },
        },
      ],
      visual: { kind: "anim", scene: "multiplos-saltos", params: { a: 7 } },
    },
    {
      id: "divisores",
      type: "slide",
      title: "Los divisores van por parejas",
      blocks: [
        {
          kind: "steps",
          title: "Cómo hallar todos los divisores de $n$",
          items: [
            "Divide $n$ entre $1, 2, 3, \\dots$ y quédate con las divisiones **exactas**.",
            "Cada división exacta da **dos divisores**: $d$ y $n : d$.",
            "Para cuando las parejas empiecen a repetirse.",
          ],
        },
        {
          kind: "example",
          title: "Divisores de 36",
          lines: [
            {
              math: "36 = 1 \\cdot 36 = 2 \\cdot 18 = 3 \\cdot 12 = 4 \\cdot 9 = 6 \\cdot 6",
              note: "las parejas",
            },
            {
              math: "\\{1, 2, 3, 4, 6, 9, 12, 18, 36\\}",
              note: "el $6$ solo cuenta una vez",
            },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "divisores-rectangulos",
        params: { n: 24 },
      },
    },
    {
      id: "check-sillas",
      type: "predict",
      title: "Sillas en filas iguales",
      question:
        "En un salón de actos hay **36** sillas y se quieren colocar en filas iguales, sin que sobre ninguna. ¿Con cuál de estos números de filas **no** se puede?",
      mode: "choice",
      choices: [
        {
          id: "3",
          label: "$3$ filas",
          incorrectFeedback:
            "$36 : 3 = 12$ es exacta: $3$ filas de $12$ sí valen.",
        },
        { id: "8", label: "$8$ filas" },
        {
          id: "9",
          label: "$9$ filas",
          incorrectFeedback:
            "$36 : 9 = 4$ es exacta: $9$ filas de $4$ sí valen.",
        },
        {
          id: "12",
          label: "$12$ filas",
          incorrectFeedback:
            "$36 : 12 = 3$ es exacta: $12$ filas de $3$ sí valen.",
        },
      ],
      correctChoiceId: "8",
      shuffleChoices: true,
      explanation:
        "$36 : 8 = 4$ con resto $4$: $8$ no es divisor de $36$, así que siempre sobrarían sillas o quedaría una fila incompleta.",
    },
    {
      id: "check-bolsas",
      type: "predict",
      title: "Bolsas de roscones",
      question:
        "Un panadero tiene **30** roscones y quiere empaquetarlos en bolsas iguales, de más de $1$ y de menos de $30$ roscones, sin que sobre ninguno. ¿Cuántos tamaños de bolsa distintos puede usar?",
      mode: "choice",
      choices: [
        {
          id: "8",
          label: "$8$",
          incorrectFeedback:
            "Los $8$ divisores de $30$ incluyen el $1$ y el $30$, que el enunciado excluye. " +
            DIVISORES_30,
        },
        { id: "6", label: "$6$" },
        {
          id: "5",
          label: "$5$",
          incorrectFeedback:
            "Te falta una pareja: $2 \\cdot 15 = 30$, así que el $15$ también vale. " +
            DIVISORES_30,
        },
        {
          id: "15",
          label: "$15$",
          incorrectFeedback:
            "$15$ es uno de los tamaños, pero no el número de tamaños distintos. " +
            DIVISORES_30,
        },
      ],
      correctChoiceId: "6",
      shuffleChoices: true,
      explanation: DIVISORES_30,
    },
  ],
};
