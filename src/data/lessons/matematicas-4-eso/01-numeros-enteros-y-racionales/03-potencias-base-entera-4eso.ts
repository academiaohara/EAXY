import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_1_SUBTITLE } from "@/data/lessons/shared";

export const potenciasBaseEntera4esoLesson: InteractiveLesson = {
  slug: "potencias-base-entera-4eso",
  title: "3. Potencias de base entera y exponente natural",
  subtitle: TEMA_4ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "signo",
      type: "slide",
      help: [
        {
          label: "Por qué alterna",
          message: "Cada factor $(-2)$ que se añade cambia el signo del resultado anterior: $-2$, $+4$, $-8$, $+16$…",
        },
        {
          label: "Base y exponente",
          message: "En $a^n$, $a$ es la base y $n$ el exponente: dice cuántas veces se multiplica la base por sí misma.",
        },
      ],
      title: "El signo de una potencia",
      blocks: [
        {
          kind: "definition",
          text: "$a^n = a \\cdot a \\cdots a$ ($n$ factores). $a$ es la **base** y $n$ el **exponente**.",
        },
        {
          kind: "rule",
          title: "Base negativa",
          text: "Exponente **par** → resultado **positivo**. Exponente **impar** → resultado **negativo**.",
        },
        {
          kind: "example",
          lines: [
            { math: "(-2)^4 = (-2)(-2)(-2)(-2) = 16" },
            { math: "(-2)^5 = -32" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "potencia-signo", params: { a: -2 } },
    },
    {
      id: "parentesis",
      type: "slide",
      help: [
        {
          label: "Qué es la base",
          message: "La base es lo que está pegado al exponente. Con paréntesis, la base incluye el signo; sin ellos, el signo menos queda fuera.",
        },
        {
          label: "Cómo se lee",
          message: "$-3^2$ se lee «el opuesto de $3^2$». $(-3)^2$ se lee «$-3$ al cuadrado».",
        },
      ],
      title: "Cuidado con el paréntesis",
      blocks: [
        {
          kind: "compare",
          left: { title: "Sin paréntesis", math: ["-3^2 = -(3 \\cdot 3) = -9", "-2^3 = -8"], tone: "warn" },
          right: { title: "Con paréntesis", math: ["(-3)^2 = (-3)(-3) = 9", "(-2)^3 = -8"], tone: "ok" },
        },
        {
          kind: "warning",
          text: "$-3^2$ y $(-3)^2$ **no** son lo mismo. Si no hay paréntesis, el exponente solo afecta a lo que tiene pegado.",
        },
      ],
      visual: { kind: "tool", tool: "potencia-explorador", params: { a: -3, b: 2 }, hint: "Prueba a cambiar solo el exponente de -3: ¿cuándo sale negativo?" },
    },
    {
      id: "check-signo",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Cuenta el exponente",
          message: "Mira si el exponente es par o impar y si el signo menos está dentro o fuera del paréntesis.",
        },
      ],
      title: "¿Cuál vale -16?",
      question: "¿Cuál de estas potencias vale $-16$?",
      choices: [
        { id: "a", label: "$(-2)^4$", incorrectFeedback: "Cuatro factores negativos se emparejan: $(-2)^4 = +16$." },
        { id: "b", label: "$-2^4$" },
        { id: "c", label: "$(-4)^2$", incorrectFeedback: "Es $(-4)(-4) = +16$." },
        { id: "d", label: "$-(-2)^3$", incorrectFeedback: "$(-2)^3 = -8$ y el menos de fuera lo cambia a $+8$." },
      ],
      correctChoiceId: "b",
      shuffleChoices: true,
      explanation: "$-2^4 = -(2 \\cdot 2 \\cdot 2 \\cdot 2) = -16$: la base es $2$, y el signo menos queda fuera del exponente.",
    },
    {
      id: "check-diez",
      type: "fill_in_blank",
      help: [
        {
          label: "Sin paréntesis",
          message: "$-10^5$ es el opuesto de $10^5 = 100\\,000$.",
        },
      ],
      title: "Potencias de 10",
      question: "Calcula $-(-10)^5$ (escribe el número con su signo, sin espacios).",
      correctAnswers: ["100000", "+100000", "100 000", "100.000"],
      explanation: "$(-10)^5 = -100\\,000$ (exponente impar) y el menos de fuera lo cambia: $+100\\,000$.",
    },
    {
      id: "propiedades",
      type: "slide",
      help: [
        {
          label: "Misma base",
          message: "Para multiplicar o dividir potencias, la base tiene que ser **la misma**. $2^3 \\cdot 3^4$ no se puede reducir.",
        },
      ],
      title: "Mismo factor: se suman o se restan los exponentes",
      blocks: [
        {
          kind: "rule",
          title: "Producto y cociente de la misma base",
          formula: "a^m \\cdot a^n = a^{m+n} \\qquad \\dfrac{a^m}{a^n} = a^{m-n}",
        },
        {
          kind: "text",
          text: "Es contar factores: $a^m$ aporta $m$ y $a^n$ aporta otros $n$. Al dividir, cada factor de abajo se **tacha** con uno de arriba.",
        },
        {
          kind: "example",
          lines: [
            { math: "(-2)^3 \\cdot (-2)^5 = (-2)^8" },
            { math: "\\dfrac{10^7}{10^4} = 10^3" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "potencias-factores", params: { a: 5, b: 2 } },
    },
    {
      id: "potencia-de-potencia",
      type: "slide",
      help: [
        {
          label: "No confundir",
          message: "$(a^m)^n = a^{m \\cdot n}$ (se multiplican) frente a $a^m \\cdot a^n = a^{m+n}$ (se suman). Piensa si hay grupos de factores o factores sueltos.",
        },
      ],
      title: "Potencia de una potencia",
      blocks: [
        {
          kind: "rule",
          formula: "(a^m)^n = a^{m \\cdot n}",
        },
        {
          kind: "text",
          text: "$(a^m)^n$ son $n$ grupos de $m$ factores cada uno. En total, $m \\cdot n$ factores.",
        },
        {
          kind: "example",
          lines: [{ math: "(5^3)^4 = 5^{3 \\cdot 4} = 5^{12}" }],
        },
      ],
      visual: { kind: "anim", scene: "potencia-de-potencia", params: { a: 3, b: 2 } },
    },
    {
      id: "potencia-de-producto",
      type: "slide",
      help: [
        {
          label: "Para qué sirve",
          message: "Sirve en las dos direcciones: $(2 \\cdot 5)^6 = 2^6 \\cdot 5^6$ o, al revés, $2^6 \\cdot 5^6 = 10^6$ (mismo exponente).",
        },
      ],
      title: "Potencia de un producto: se reparte",
      blocks: [
        {
          kind: "rule",
          formula: "(a \\cdot b)^m = a^m \\cdot b^m \\qquad a^m \\cdot b^m = (a \\cdot b)^m",
        },
        {
          kind: "example",
          lines: [
            { math: "6^4 = (2 \\cdot 3)^4 = 2^4 \\cdot 3^4" },
            { math: "3^5 \\cdot 2^5 = (3 \\cdot 2)^5 = 6^5" },
          ],
        },
        {
          kind: "warning",
          text: "Con **sumas** no funciona: $(a + b)^2 \\neq a^2 + b^2$. Por ejemplo, $(2 + 3)^2 = 25$ y $2^2 + 3^2 = 13$.",
        },
      ],
      visual: { kind: "anim", scene: "potencia-de-producto", params: { a: 3 } },
    },
    {
      id: "check-simplificar",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Todo a una base",
          message: "$(-3)^5 \\cdot (-3)^8 = (-3)^{13}$ y $[(-3)^3]^3 = (-3)^9$. Divide: $(-3)^4$. Después agrupa con $5^4$.",
        },
      ],
      title: "Simplificar y calcular",
      question: "Calcula $\\dfrac{(-3)^5 \\cdot (-3)^8 \\cdot 5^4}{[(-3)^3]^3}$. (solo el número)",
      correctAnswers: ["50625", "50 625"],
      explanation: "Numerador: $(-3)^{13} \\cdot 5^4$. Denominador: $(-3)^9$. Cociente: $(-3)^4 \\cdot 5^4 = (3 \\cdot 5)^4 = 15^4 = 50\\,625$.",
    },
    {
      id: "check-propiedad",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Suma o producto",
          message: "Cuando se multiplican potencias de la misma base, los exponentes se suman; cuando se eleva una potencia, se multiplican.",
        },
      ],
      title: "¿Qué propiedad aplico?",
      question: "Para simplificar $(2^3)^4 \\cdot 2^5$ lo primero es reducir $(2^3)^4$. ¿Qué potencia única resulta al final?",
      choices: [
        { id: "a", label: "$2^{17}$" },
        { id: "b", label: "$2^{12}$", incorrectFeedback: "Falta multiplicar por $2^5$: los exponentes $12$ y $5$ se suman." },
        { id: "c", label: "$2^{60}$", incorrectFeedback: "Los exponentes de $2^{12}$ y $2^5$ se **suman**, no se multiplican, porque es un producto de la misma base." },
        { id: "d", label: "$4^{17}$", incorrectFeedback: "La base no cambia al multiplicar potencias de la misma base." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(2^3)^4 = 2^{12}$ y $2^{12} \\cdot 2^5 = 2^{17}$.",
    },
    {
      id: "combinadas",
      type: "slide",
      help: [
        {
          label: "Potencias primero",
          message: "En una combinada, después de los paréntesis se resuelven las potencias, y solo entonces productos y sumas.",
        },
      ],
      title: "Combinadas con potencias",
      blocks: [
        {
          kind: "text",
          text: "Las potencias se resuelven **antes** que productos, cocientes, sumas y restas, pero **después** de los paréntesis.",
        },
        {
          kind: "warning",
          text: "$(-1)^n$ vale $+1$ si $n$ es par y $-1$ si es impar. Aparece muchísimo en este tipo de cálculos.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["(−3+1)³", "+", "(5−8)⁴·(−1)⁹", "−", "(−5)²·(−1)⁴"], active: [0, 4], note: "primero los paréntesis." },
            { tokens: ["(−2)³", "+", "(−3)⁴·(−1)⁹", "−", "(−5)²·(−1)⁴"], active: [0, 4], note: "ahora las potencias." },
            { tokens: ["−8", "+", "81·(−1)", "−", "25·1"], active: [0, 4], note: "los productos." },
            { tokens: ["−8", "−", "81", "−", "25"], active: [0, 4], note: "por último, sumar y restar." },
            { tokens: ["−114"], fresh: [0, 0], note: "resultado final." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-final",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Corchete primero",
          message: "$(1 - 7) - (8 - 3) - (-2)^5 = -6 - 5 + 32 = 21$. Después $[15 + (-11)]^2 = 4^2 = 16$.",
        },
      ],
      title: "Una combinada completa",
      question: "Calcula $[(1 - 7) - (8 - 3) - (-2)^5] \\cdot [15 + (-11)]^2$. (solo el número)",
      correctAnswers: ["336"],
      explanation: "Primer corchete: $-6 - 5 + 32 = 21$. Segundo: $4^2 = 16$. Producto: $21 \\cdot 16 = 336$.",
    },
  ],
};
