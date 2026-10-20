import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_1_SUBTITLE } from "@/data/lessons/shared";

export const multiplicacionDivisionEnteros2esoLesson: InteractiveLesson = {
  slug: "multiplicacion-division-enteros-2eso",
  title: "7. Multiplicación y división de números enteros",
  subtitle: TEMA_2ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "producto",
      type: "slide",
      help: [
        {
          label: "Suma repetida",
          message: "$(+3) \\cdot (-6)$ es sumar tres veces $-6$: $-18$. Con un primer factor negativo, se resta en lugar de sumar.",
        },
        {
          label: "Restar una deuda",
          message: "$(-3) \\cdot (-6)$ es restar tres veces $-6$: quitar tres deudas de $6$ equivale a ganar $18$.",
        },
      ],
      title: "Multiplicar: de dónde sale el signo",
      blocks: [
        {
          kind: "text",
          text: "Un producto es una **suma de sumandos iguales**. Si el primer factor es negativo, se **restan** en vez de sumarse.",
        },
        {
          kind: "example",
          lines: [
            { math: "(+3) \\cdot (-6) = (-6) + (-6) + (-6) = -18" },
            { math: "(-3) \\cdot (-6) = -(-6) - (-6) - (-6) = +18" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "producto-signos", params: { a: 3, b: 5 } },
    },
    {
      id: "regla-signos",
      type: "slide",
      help: [
        {
          label: "Memoriza dos casos",
          message: "Signos iguales → positivo. Signos distintos → negativo. Con eso se resuelven los cuatro casos.",
        },
        {
          label: "Varios factores",
          message: "Con más de dos factores, cuenta los negativos: número par → positivo; impar → negativo.",
        },
      ],
      title: "La regla de los signos",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "(+)\\cdot(+) = +" },
            { tex: "(-)\\cdot(-) = +" },
            { tex: "(+)\\cdot(-) = -" },
            { tex: "(-)\\cdot(+) = -" },
          ],
        },
        {
          kind: "rule",
          text: "El producto es **positivo** si los factores tienen **signos iguales** y **negativo** si los tienen **distintos**.",
        },
        {
          kind: "example",
          lines: [
            { math: "(-5) \\cdot (-4) = +20 \\qquad (+6) \\cdot (-4) = -24" },
            { math: "(-3) \\cdot (+2) \\cdot (-5) = +30", note: "dos negativos: positivo" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-producto",
      type: "fill_in_blank",
      help: [
        {
          label: "Signos",
          message: "Dos signos iguales dan $+$. Después multiplica los valores absolutos: $4 \\cdot 9$.",
        },
      ],
      title: "Un producto",
      question: "Calcula $(-4) \\cdot (-9)$ (escribe el número con su signo)",
      correctAnswers: ["36", "+36"],
      explanation: "Signos iguales: positivo. $4 \\cdot 9 = 36$.",
    },
    {
      id: "division",
      type: "slide",
      help: [
        {
          label: "Por qué es igual",
          message: "$(-24) : (+4) = -6$ porque $(+4) \\cdot (-6) = -24$: el cociente es el factor que falta.",
        },
        {
          label: "Con ceros",
          message: "$0$ dividido entre cualquier número distinto de $0$ da $0$; dividir entre $0$ no se puede.",
        },
      ],
      title: "Dividir: la operación inversa",
      blocks: [
        {
          kind: "text",
          text: "Cada producto da dos cocientes. La división de enteros sigue **la misma regla de los signos** que la multiplicación.",
        },
        {
          kind: "example",
          lines: [
            { math: "(+4) \\cdot (+6) = +24 \\ \\Rightarrow\\  (+24) : (+4) = +6" },
            { math: "(+4) \\cdot (-6) = -24 \\ \\Rightarrow\\  (-24) : (+4) = -6" },
            { math: "(-4) \\cdot (-6) = +24 \\ \\Rightarrow\\  (+24) : (-4) = -6" },
            { math: "(-24) : (-6) = +4" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "division-inversa", params: { a: 4, b: 5 } },
    },
    {
      id: "check-incognita",
      type: "fill_in_blank",
      help: [
        {
          label: "Divide",
          message: "$(+4) \\cdot x = -36$ → $x = (-36) : (+4)$.",
        },
      ],
      title: "El factor que falta",
      question: "Halla $x$ en $(+4) \\cdot x = -36$ (escribe el número con su signo)",
      correctAnswers: ["-9", "−9"],
      explanation: "$x = (-36) : (+4) = -9$, signos distintos: negativo.",
    },
    {
      id: "combinadas",
      type: "slide",
      help: [
        {
          label: "Orden",
          message: "Primero los paréntesis, después multiplicaciones y divisiones (de izquierda a derecha) y por último sumas y restas.",
        },
        {
          label: "Un truco",
          message: "Subraya cada producto o cociente y calcúlalos todos antes de sumar nada.",
        },
      ],
      title: "Operaciones combinadas",
      blocks: [
        {
          kind: "steps",
          items: [
            "**Paréntesis** (de dentro hacia fuera).",
            "**Multiplicaciones y divisiones**, de izquierda a derecha.",
            "**Sumas y restas**.",
          ],
        },
        {
          kind: "example",
          lines: [
            { math: "(-2) \\cdot (5 - 9) + 6 \\cdot (3 - 5)" },
            { math: "= (-2) \\cdot (-4) + 6 \\cdot (-2) = 8 - 12 = -4" },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["(−2)·(5−9)", "+", "6·(3−5)"], active: [0, 2], note: "primero los paréntesis." },
            { tokens: ["(−2)·(−4)", "+", "6·(−2)"], active: [0, 2], fresh: [0, 2], note: "después los productos, con la regla de los signos." },
            { tokens: ["+8", "+", "(−12)"], active: [0, 2], note: "por último la suma." },
            { tokens: ["−4"], fresh: [0, 0], note: "$8 - 12 = -4$." },
          ],
        },
      },
    },
    {
      id: "check-combinada",
      type: "predict",
      help: [
        {
          label: "Paréntesis",
          message: "$3 - 8 = -5$. Después $5 \\cdot (-5) = -25$.",
        },
        {
          label: "Resta de negativo",
          message: "$18 - (-25)$ es $18 + 25$.",
        },
      ],
      title: "Prioridades",
      question: "¿Cuánto vale $18 - 5 \\cdot (3 - 8)$?",
      mode: "choice",
      choices: [
        { id: "43", label: "$43$" },
        { id: "-7", label: "$-7$", incorrectFeedback: "$18 - 5 = 13$ no se hace primero: antes va el paréntesis y el producto." },
        { id: "-43", label: "$-43$", incorrectFeedback: "$18 - (-25) = 18 + 25$; el resultado es positivo." },
        { id: "7", label: "$7$", incorrectFeedback: "$5 \\cdot (-5) = -25$ y se resta: $18 - (-25)$." },
      ],
      correctChoiceId: "43",
      shuffleChoices: true,
      explanation: "$18 - 5 \\cdot (-5) = 18 - (-25) = 18 + 25 = 43$.",
    },
    {
      id: "check-division-combinada",
      type: "fill_in_blank",
      help: [
        {
          label: "Divide primero",
          message: "$40 : (-8) = -5$. Después $11 - (-5)$.",
        },
      ],
      title: "Con una división",
      question: "Calcula $11 - 40 : (-8)$ (escribe el número con su signo)",
      correctAnswers: ["16", "+16"],
      explanation: "$40 : (-8) = -5$ y $11 - (-5) = 16$.",
    },
  ],
};
