import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_1_SUBTITLE } from "@/data/lessons/shared";

export const potenciasExponenteEntero4esoLesson: InteractiveLesson = {
  slug: "potencias-exponente-entero-4eso",
  title: "7. Potencias de exponente entero",
  subtitle: TEMA_4ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "cero-negativo",
      type: "slide",
      help: [
        {
          label: "Por qué a⁰ = 1",
          message: "$\\frac{a^n}{a^n} = 1$ siempre (algo dividido entre sí mismo). Pero con la regla del cociente, $\\frac{a^n}{a^n} = a^{n-n} = a^0$. Para que la regla siga valiendo, $a^0 = 1$.",
        },
        {
          label: "Por qué a⁻ⁿ es una fracción",
          message: "$\\frac{1}{a^n} = \\frac{a^0}{a^n} = a^{0-n} = a^{-n}$. Es la misma regla del cociente, aplicada hasta pasar del $0$.",
        },
      ],
      title: "Bajar el exponente: del cero a los negativos",
      blocks: [
        {
          kind: "text",
          text: "Con exponente natural, cada potencia vale **la base veces** la anterior. Si seguimos la secuencia hacia abajo, cada paso **divide** entre la base. Eso fuerza dos definiciones:",
        },
        {
          kind: "rule",
          title: "Exponente cero y exponente negativo",
          formula: "a^0 = 1 \\quad (a \\neq 0) \\qquad a^{-n} = \\dfrac{1}{a^n} \\quad (a \\neq 0)",
        },
        {
          kind: "example",
          lines: [
            { math: "10^{-1} = \\dfrac{1}{10} = 0{,}1" },
            { math: "10^{-4} = \\dfrac{1}{10\\,000} = 0{,}0001" },
          ],
        },
        {
          kind: "warning",
          text: "Un exponente negativo **no** cambia el signo del resultado: $2^{-3} = \\frac{1}{8}$, no $-8$.",
        },
      ],
      visual: { kind: "anim", scene: "potencias-exp-negativo", params: { a: 2 } },
    },
    {
      id: "explora-potencias",
      type: "slide",
      help: [
        {
          label: "Base cero",
          message: "$0^0$ no está definido y $0^{-n}$ implicaría dividir entre $0$. Por eso se excluye la base $0$ con exponente cero o negativo.",
        },
      ],
      title: "Explora: base y exponente",
      blocks: [
        {
          kind: "text",
          text: "Mueve la base y el exponente. Fíjate en tres cosas: qué pasa en el exponente $0$, qué hace el exponente negativo y cuándo el resultado es negativo.",
        },
        {
          kind: "warning",
          text: "Prueba la base $0$ con un exponente cero o negativo. ¿Por qué no está definido?",
        },
      ],
      visual: { kind: "tool", tool: "potencia-explorador", params: { a: 2, b: -3 }, hint: "Con base -2, ¿qué signo tiene el resultado con exponente -3? ¿y con -4?" },
    },
    {
      id: "check-negativo",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Invertir",
          message: "$a^{-n}$ es el inverso de $a^n$: $\\left(-2\\right)^{-3} = \\frac{1}{(-2)^3}$.",
        },
      ],
      title: "Exponente negativo",
      question: "¿Cuánto vale $(-2)^{-3}$?",
      choices: [
        { id: "a", label: "$-\\dfrac{1}{8}$" },
        { id: "b", label: "$\\dfrac{1}{8}$", incorrectFeedback: "El exponente $3$ es impar, así que el signo de la base se conserva: negativo." },
        { id: "c", label: "$8$", incorrectFeedback: "El exponente negativo invierte: da una fracción, no un entero." },
        { id: "d", label: "$-8$", incorrectFeedback: "Falta invertir: $(-2)^3 = -8$, y $(-2)^{-3}$ es su inverso, $-\\frac{1}{8}$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(-2)^{-3} = \\dfrac{1}{(-2)^3} = \\dfrac{1}{-8} = -\\dfrac{1}{8}$.",
    },
    {
      id: "fracciones",
      type: "slide",
      help: [
        {
          label: "Dar la vuelta",
          message: "El inverso de $\\frac{a}{b}$ es $\\frac{b}{a}$. Por eso, un exponente negativo en una fracción la invierte.",
        },
      ],
      title: "Una fracción con exponente negativo",
      blocks: [
        {
          kind: "rule",
          formula: "\\left(\\dfrac{a}{b}\\right)^{-n} = \\left(\\dfrac{b}{a}\\right)^{n}",
        },
        {
          kind: "text",
          text: "**Se da la vuelta a la fracción y el exponente pasa a positivo.** Sirve igual para enteros: $a^{-1} = \\frac{1}{a}$.",
        },
        {
          kind: "example",
          lines: [{ math: "\\left(\\dfrac{2}{3}\\right)^{-2} = \\left(\\dfrac{3}{2}\\right)^{2} = \\dfrac{9}{4}" }],
        },
      ],
      visual: { kind: "anim", scene: "potencia-fraccion-inversa", params: { a: 2, b: 3, c: 2 } },
    },
    {
      id: "check-fraccion",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Invierte",
          message: "$\\left(\\frac{2}{3}\\right)^{-3} = \\left(\\frac{3}{2}\\right)^{3}$.",
        },
      ],
      title: "Dar la vuelta",
      question: "Calcula $\\left(\\dfrac{2}{3}\\right)^{-3}$ y da la fracción.",
      correctAnswers: ["27/8"],
      explanation: "$\\left(\\frac{3}{2}\\right)^3 = \\frac{27}{8}$.",
    },
    {
      id: "check-fraccion-neg",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Con signo",
          message: "$\\left(-\\frac{1}{2}\\right)^{-3} = (-2)^3$.",
        },
      ],
      title: "Con base negativa",
      question: "Calcula $\\left(-\\dfrac{1}{2}\\right)^{-3}$. (escribe el número con su signo)",
      correctAnswers: ["-8", "−8"],
      explanation: "Se da la vuelta: $(-2)^3 = -8$.",
    },
    {
      id: "propiedades",
      type: "slide",
      help: [
        {
          label: "Mismas reglas",
          message: "Las propiedades de las potencias se escribieron pensando en exponentes naturales, pero las definiciones de $a^0$ y $a^{-n}$ se eligieron para que **sigan valiendo**.",
        },
      ],
      title: "Las propiedades no cambian",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "a^m \\cdot a^n = a^{m+n}" },
            { tex: "\\dfrac{a^m}{a^n} = a^{m-n}" },
            { tex: "(a^m)^n = a^{m \\cdot n}" },
            { tex: "(a \\cdot b)^n = a^n \\cdot b^n" },
          ],
        },
        {
          kind: "text",
          text: "Valen para **cualquier exponente entero**. Es la ventaja de definir bien el cero y los negativos.",
        },
        {
          kind: "example",
          lines: [
            { math: "2^5 \\cdot 2^{-3} = 2^{5 + (-3)} = 2^2 = 4" },
            { math: "\\dfrac{3^{-2}}{3^{-5}} = 3^{-2 - (-5)} = 3^3 = 27" },
            { math: "(5^{-2})^3 = 5^{-6} = \\dfrac{1}{15\\,625}" },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["3⁻²", "/", "3⁻⁵"], active: [0, 2], note: "misma base: restamos los exponentes." },
            { tokens: ["3^(−2 − (−5))"], active: [0, 0], note: "$-2 - (-5) = -2 + 5 = 3$." },
            { tokens: ["3³"], active: [0, 0], note: "$3^3 = 27$." },
            { tokens: ["27"], fresh: [0, 0], note: "resultado final." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-propiedades",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Una sola base",
          message: "$4 = 2^2$, así que $4^{-2} = 2^{-4}$. Entonces, $2^{-4} \\cdot 2^3 = 2^{-1}$.",
        },
      ],
      title: "Simplificar",
      question: "¿A qué potencia de $2$ es igual $4^{-2} \\cdot 2^{3}$?",
      choices: [
        { id: "a", label: "$2^{-1}$" },
        { id: "b", label: "$2^{-6}$", incorrectFeedback: "$4^{-2} = 2^{-4}$ (no $2^{-6}$), y al multiplicar por $2^3$ se suma el $3$." },
        { id: "c", label: "$2^{-7}$", incorrectFeedback: "Se han restado los exponentes en lugar de sumarlos: en un producto de la misma base se suman." },
        { id: "d", label: "$2^{1}$", incorrectFeedback: "$4^{-2}$ es una fracción pequeña, $\\frac{1}{16}$; el resultado final no puede ser $2$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$4^{-2} = (2^2)^{-2} = 2^{-4}$ y $2^{-4} \\cdot 2^{3} = 2^{-1} = \\frac{1}{2}$.",
    },
    {
      id: "diez",
      type: "slide",
      help: [
        {
          label: "Contar ceros",
          message: "Con $10^n$ ($n$ positivo) hay $n$ ceros detrás del $1$. Con $10^{-n}$ hay $n$ cifras decimales, la última es el $1$.",
        },
        {
          label: "Nombres",
          message: "$10^{-1}$ es una décima, $10^{-2}$ una centésima, $10^{-3}$ una milésima, $10^{-6}$ una millonésima.",
        },
      ],
      title: "Potencias de 10 y números muy pequeños",
      blocks: [
        {
          kind: "text",
          text: "Las potencias de $10$ con exponente negativo describen **cantidades muy pequeñas**: una milésima es $10^{-3}$, una millonésima $10^{-6}$. Cada salto de exponente mueve la **coma** una posición.",
        },
        {
          kind: "example",
          lines: [
            { math: "0{,}000042 = 4{,}2 \\cdot 10^{-5}" },
            { math: "\\text{cien millones} = 10^{8} \\qquad \\text{una milésima} = 10^{-3}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "notacion-cientifica", params: { dec: "0,000042" } },
    },
    {
      id: "check-milesima",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Decimal",
          message: "Una millonésima es $0{,}000001$: la cifra $1$ ocupa el sexto lugar decimal.",
        },
      ],
      title: "Una millonésima",
      question: "Una millonésima se escribe $10^{n}$. ¿Cuánto vale $n$? (escribe el número con su signo)",
      correctAnswers: ["-6", "−6"],
      explanation: "Una millonésima es $\\frac{1}{1\\,000\\,000} = \\frac{1}{10^6} = 10^{-6}$.",
    },
    {
      id: "check-garrafa",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Repartir",
          message: "Repartir en $25$ vasos es dividir: $\\frac{5}{2} : 25$.",
        },
      ],
      title: "Litros por vaso",
      question: "Con una garrafa de $\\dfrac{5}{2}$ de litro se llenan $25$ vasos. ¿Qué fracción de litro entra en cada vaso? Da la fracción irreducible.",
      correctAnswers: ["1/10"],
      explanation: "$\\frac{5}{2} : 25 = \\frac{5}{50} = \\frac{1}{10}$ de litro, que es $10^{-1}$ litros.",
    },
  ],
};
