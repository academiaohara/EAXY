import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_1_SUBTITLE } from "@/data/lessons/shared";

export const operacionesPotencias2esoLesson: InteractiveLesson = {
  slug: "operaciones-potencias-2eso",
  title: "6. Operaciones con potencias",
  subtitle: TEMA_2ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "potencia-signo",
      type: "slide",
      help: [
        {
          label: "Alterna el signo",
          message: "Cada factor $(-3)$ que añades cambia el signo del resultado: $-3$, $+9$, $-27$, $+81$…",
        },
        {
          label: "Con paréntesis o sin ellos",
          message: "$(-3)^2 = 9$, pero $-3^2 = -9$: sin paréntesis el exponente solo afecta al $3$.",
        },
      ],
      title: "Potencias de números enteros",
      blocks: [
        {
          kind: "text",
          text: "Una potencia repite la base: $a^n = a \\cdot a \\cdots a$ ($n$ factores). Con una base **negativa**, el signo depende del exponente.",
        },
        {
          kind: "rule",
          title: "Signo de la potencia",
          text: "Exponente **par** → resultado positivo. Exponente **impar** → resultado negativo.",
        },
        {
          kind: "facts",
          items: [
            { tex: "(-3)^1 = -3" },
            { tex: "(-3)^2 = +9" },
            { tex: "(-3)^3 = -27" },
            { tex: "(-3)^4 = +81" },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          titles: ["Exponente par", "Exponente impar"],
          expr: [
            { tokens: ["(−3)⁴"], note: "cuatro factores iguales a $-3$." },
            { tokens: ["(−3)", "·", "(−3)", "·", "(−3)", "·", "(−3)"], active: [0, 2], note: "$(-3)\\cdot(-3) = +9$." },
            { tokens: ["9", "·", "(−3)", "·", "(−3)"], active: [0, 2], fresh: [0, 0], note: "$9 \\cdot (-3) = -27$." },
            { tokens: ["−27", "·", "(−3)"], active: [0, 2], fresh: [0, 0], note: "$-27 \\cdot (-3) = +81$." },
            { tokens: ["81"], fresh: [0, 0], note: "el resultado es positivo." },
          ],
          expr2: [
            { tokens: ["(−3)⁵"], note: "cinco factores iguales a $-3$." },
            { tokens: ["(−3)", "·", "(−3)", "·", "(−3)", "·", "(−3)", "·", "(−3)"], note: "los signos se emparejan." },
            { tokens: ["(+9)", "·", "(+9)", "·", "(−3)"], active: [0, 2], note: "dos parejas de negativos dan $+9$." },
            { tokens: ["81", "·", "(−3)"], active: [0, 2], fresh: [0, 0], note: "queda un factor negativo suelto." },
            { tokens: ["−243"], fresh: [0, 0], note: "el resultado es negativo." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-signo",
      type: "fill_in_blank",
      help: [
        {
          label: "Mira el exponente",
          message: "Si el exponente es par, el resultado es positivo. Si es impar, negativo. Después calcula el valor.",
        },
      ],
      title: "Signo y valor",
      question: "Calcula $(-2)^5$ (escribe el número con su signo)",
      correctAnswers: ["-32", "−32"],
      hint: "Cinco factores negativos: el signo es negativo.",
      explanation: "$(-2)^5 = (-2)\\cdot(-2)\\cdot(-2)\\cdot(-2)\\cdot(-2) = -32$.",
    },
    {
      id: "potencia-producto",
      type: "slide",
      help: [
        {
          label: "Por qué se puede repartir",
          message: "$(2 \\cdot 3)^3 = 6 \\cdot 6 \\cdot 6$, y reordenando los factores salen tres $2$ y tres $3$.",
        },
        {
          label: "Solo con productos",
          message: "Con una suma no vale: $(2 + 3)^2 = 25$, pero $2^2 + 3^2 = 13$.",
        },
      ],
      title: "Potencia de un producto",
      blocks: [
        {
          kind: "rule",
          text: "La potencia de un producto es el **producto de las potencias** de los factores.",
          formula: "(a \\cdot b)^n = a^n \\cdot b^n",
        },
        {
          kind: "example",
          title: "Por el camino más sencillo",
          lines: [{ math: "5^6 \\cdot 2^6 = (5 \\cdot 2)^6 = 10^6 = 1\\,000\\,000" }],
        },
        {
          kind: "warning",
          title: "No es lo mismo con sumas",
          text: "$(2 + 3)^4 = 5^4 = 625$, pero $2^4 + 3^4 = 97$. La potencia de una suma **no** se reparte.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          titles: ["Primero el producto", "Repartiendo la potencia"],
          expr: [
            { tokens: ["(2·3)³"], note: "calculamos primero lo de dentro." },
            { tokens: ["6³"], active: [0, 0], note: "$6^3 = 6\\cdot 6\\cdot 6$." },
            { tokens: ["216"], fresh: [0, 0], note: "el valor es $216$." },
          ],
          expr2: [
            { tokens: ["(2·3)³"], note: "repartimos el exponente." },
            { tokens: ["2³", "·", "3³"], fresh: [0, 2], note: "$2^3 = 8$ y $3^3 = 27$." },
            { tokens: ["8", "·", "27", "=", "216"], fresh: [4, 4], note: "el mismo resultado." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "potencia-cociente",
      type: "slide",
      help: [
        {
          label: "Mismo exponente",
          message: "Solo se puede agrupar cuando las dos potencias tienen el **mismo exponente**.",
        },
        {
          label: "Mejor dividir antes",
          message: "$12^3 : 4^3 = (12 : 4)^3 = 3^3 = 27$ evita calcular $1\\,728 : 64$.",
        },
      ],
      title: "Potencia de un cociente",
      blocks: [
        {
          kind: "rule",
          text: "La potencia de un cociente es el **cociente de las potencias** del dividendo y del divisor.",
          formula: "(a : b)^n = a^n : b^n",
        },
        {
          kind: "example",
          title: "Por el camino más sencillo",
          lines: [
            { math: "12^3 : 4^3 = (12 : 4)^3 = 3^3 = 27" },
            { math: "(6^4 \\cdot 5^4) : 15^4 = 30^4 : 15^4 = 2^4 = 16" },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          titles: ["Dividiendo antes", "Calculando cada potencia"],
          expr: [
            { tokens: ["(6:3)³"], note: "dividimos dentro." },
            { tokens: ["2³"], active: [0, 0], note: "$2^3 = 8$." },
            { tokens: ["8"], fresh: [0, 0], note: "el valor es $8$." },
          ],
          expr2: [
            { tokens: ["6³", ":", "3³"], note: "repartimos el exponente." },
            { tokens: ["216", ":", "27"], fresh: [0, 2], note: "$6^3 = 216$ y $3^3 = 27$." },
            { tokens: ["8"], fresh: [0, 0], note: "el mismo resultado." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-camino",
      type: "predict",
      help: [
        {
          label: "Busca el mismo exponente",
          message: "Las dos potencias tienen exponente $6$. Agrupa las bases: $5 \\cdot 2$.",
        },
        {
          label: "Apóyate en el 10",
          message: "Una potencia de $10$ es un $1$ seguido de tantos ceros como indique el exponente.",
        },
      ],
      title: "El camino más sencillo",
      question: "¿Cuánto vale $5^6 \\cdot 2^6$?",
      mode: "choice",
      choices: [
        {
          id: "10-6",
          label: "$10^6 = 1\\,000\\,000$",
        },
        {
          id: "10-12",
          label: "$10^{12}$",
          incorrectFeedback: "El exponente no se suma aquí: las bases son distintas, así que se agrupan las bases.",
        },
        {
          id: "7-6",
          label: "$7^6$",
          incorrectFeedback: "Las bases se multiplican, no se suman: $5 \\cdot 2 = 10$.",
        },
        {
          id: "10-36",
          label: "$10^{36}$",
          incorrectFeedback: "El exponente se queda en $6$: $(5 \\cdot 2)^6$.",
        },
      ],
      correctChoiceId: "10-6",
      shuffleChoices: true,
      explanation: "$5^6 \\cdot 2^6 = (5 \\cdot 2)^6 = 10^6 = 1\\,000\\,000$.",
    },
    {
      id: "misma-base",
      type: "slide",
      help: [
        {
          label: "Cuenta los factores",
          message: "$5^4 \\cdot 5^3$ son cuatro $5$ y otros tres $5$: siete $5$ en total.",
        },
        {
          label: "¿Y la potencia cero?",
          message: "$2^3 : 2^3 = 8 : 8 = 1$, y por la regla es $2^{3-3} = 2^0$. Por eso $a^0 = 1$.",
        },
      ],
      title: "Potencias de la misma base",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Producto",
            text: "Se deja la base y se **suman** los exponentes.",
            math: ["a^m \\cdot a^n = a^{m+n}", "5^4 \\cdot 5^3 = 5^7"],
            tone: "ok",
          },
          right: {
            title: "Cociente",
            text: "Se deja la base y se **restan** los exponentes.",
            math: ["a^m : a^n = a^{m-n}", "5^7 : 5^3 = 5^4"],
            tone: "info",
          },
        },
        {
          kind: "rule",
          title: "Potencia cero",
          text: "Todo número (distinto de $0$) elevado a $0$ vale $1$.",
          formula: "a^0 = 1",
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          titles: ["Producto", "Cociente"],
          expr: [
            { tokens: ["5⁴", "·", "5³"], note: "desarrollamos las dos potencias." },
            { tokens: ["5·5·5·5", "·", "5·5·5"], active: [0, 2], note: "contamos los factores: $4 + 3 = 7$." },
            { tokens: ["5⁷"], fresh: [0, 0], note: "se suman los exponentes." },
          ],
          expr2: [
            { tokens: ["5⁷", ":", "5³"], note: "es la operación inversa del producto." },
            { tokens: ["5·5·5·5·5·5·5", ":", "5·5·5"], active: [0, 2], note: "se tachan tres factores $5$." },
            { tokens: ["5⁴"], fresh: [0, 0], note: "se restan los exponentes: $7 - 3 = 4$." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-exponente",
      type: "fill_in_blank",
      help: [
        {
          label: "Reduce a una sola potencia",
          message: "Mismo base, producto: suma los exponentes. Después responde con el exponente.",
        },
      ],
      title: "Un solo exponente",
      question: "$3^4 \\cdot 3^2 = 3^{\\square}$. ¿Qué número va en el cuadrado?",
      correctAnswers: ["6"],
      explanation: "$3^4 \\cdot 3^2 = 3^{4+2} = 3^6$.",
    },
    {
      id: "check-cociente",
      type: "fill_in_blank",
      help: [
        {
          label: "Resta los exponentes",
          message: "Mismo base, cociente: se restan los exponentes, el del dividendo menos el del divisor.",
        },
      ],
      title: "Cociente de potencias",
      question: "$7^8 : 7^5 = 7^{\\square}$. ¿Qué número va en el cuadrado?",
      correctAnswers: ["3"],
      explanation: "$7^8 : 7^5 = 7^{8-5} = 7^3$.",
    },
    {
      id: "potencia-potencia",
      type: "slide",
      help: [
        {
          label: "Repite la potencia",
          message: "$(5^4)^3$ es $5^4$ multiplicada por sí misma tres veces: $5^{4+4+4}$.",
        },
        {
          label: "No confundir con $5^{4^3}$",
          message: "Con paréntesis, primero se calcula la potencia de dentro y después se eleva el resultado.",
        },
      ],
      title: "Potencia de otra potencia",
      blocks: [
        {
          kind: "rule",
          text: "Para elevar una potencia a otra potencia se deja la base y se **multiplican** los exponentes.",
          formula: "(a^m)^n = a^{m \\cdot n}",
        },
        {
          kind: "example",
          lines: [
            { math: "(5^4)^3 = 5^4 \\cdot 5^4 \\cdot 5^4 = 5^{4+4+4} = 5^{12}" },
            { math: "(a^2)^4 = a^{2 \\cdot 4} = a^8" },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["(5⁴)³"], note: "tres veces la potencia $5^4$." },
            { tokens: ["5⁴", "·", "5⁴", "·", "5⁴"], active: [0, 4], note: "producto de la misma base: se suman los exponentes." },
            { tokens: ["5⁴⁺⁴⁺⁴"], note: "$4 + 4 + 4 = 3 \\cdot 4$." },
            { tokens: ["5¹²"], fresh: [0, 0], note: "se multiplican los exponentes." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-potencia-potencia",
      type: "predict",
      help: [
        {
          label: "Multiplica exponentes",
          message: "$(2^3)^4$: potencia de una potencia → $3 \\cdot 4$.",
        },
        {
          label: "No sumes",
          message: "Sumar los exponentes es la regla del producto de potencias, no de la potencia de una potencia.",
        },
      ],
      title: "Reduce a una sola potencia",
      question: "¿A qué es igual $(2^3)^4$?",
      mode: "choice",
      choices: [
        { id: "2-12", label: "$2^{12}$" },
        {
          id: "2-7",
          label: "$2^{7}$",
          incorrectFeedback: "Has sumado los exponentes ($3 + 4$): esa regla es para $2^3 \\cdot 2^4$.",
        },
        {
          id: "2-81",
          label: "$2^{81}$",
          incorrectFeedback: "$3^4$ no interviene: los exponentes se multiplican, $3 \\cdot 4$.",
        },
        {
          id: "6-4",
          label: "$6^4$",
          incorrectFeedback: "La base no cambia: se queda en $2$.",
        },
      ],
      correctChoiceId: "2-12",
      shuffleChoices: true,
      explanation: "$(2^3)^4 = 2^{3 \\cdot 4} = 2^{12}$.",
    },
  ],
};
