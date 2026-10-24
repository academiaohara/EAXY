import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_1_SUBTITLE } from "@/data/lessons/shared";

export const complejosRaices1bachLesson: InteractiveLesson = {
  slug: "complejos-raices-1bach",
  title: "13. Raíces de un complejo",
  subtitle: TEMA_1BACH_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "formula",
      type: "slide",
      help: [
        { label: "Por qué n valores", message: "Para $k = n$ el ángulo es $\\frac{\\theta}{n} + 360^\\circ$, el mismo que para $k = 0$: a partir de ahí se repiten." },
      ],
      title: "Un complejo tiene n raíces n-ésimas",
      blocks: [
        { kind: "rule", title: "Raíces n-ésimas de r con argumento θ", formula: "\\sqrt[n]{r_\\theta} = \\left(\\sqrt[n]{r}\\right)_{\\frac{\\theta + 360^\\circ k}{n}},\\quad k = 0, 1, \\ldots, n-1" },
        { kind: "text", text: "Todas tienen el **mismo módulo** y sus ángulos están separados $\\frac{360^\\circ}{n}$: son los vértices de un **polígono regular** de $n$ lados." },
      ],
      visual: { kind: "anim", scene: "complejo-raices", params: { a: 1, b: 180, c: 3 } },
    },
    {
      id: "explora",
      type: "slide",
      help: [{ label: "Qué mirar", message: "Mira cómo cambia el polígono al variar el índice, y cómo se mueve al cambiar el argumento del radicando." }],
      title: "Mueve el radicando y el índice",
      blocks: [{ kind: "text", text: "Para $\\sqrt[3]{8}$ pon módulo $8$, argumento $0^\\circ$ e índice $3$: salen $2$ y $-1 \\pm \\sqrt{3}\\,i$." }],
      visual: { kind: "tool", tool: "raices-complejas-explorador", initial: [8, 0, 3], hint: "Sube el índice: siempre hay tantas raíces como indica n y forman un polígono regular." },
    },
    {
      id: "check-cuantas",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Hay tantas raíces como el índice." }],
      title: "Cuántas raíces",
      question: "¿Cuántas raíces quintas distintas tiene un número complejo no nulo? (solo el número)",
      correctAnswers: ["5"],
      explanation: "Una raíz de índice $n$ tiene $n$ valores distintos ($k = 0, \\ldots, n-1$), uno por cada vértice de un pentágono regular.",
    },
    {
      id: "ejemplo",
      type: "slide",
      help: [{ label: "Comprobación", message: "Eleva una raíz al cubo: $\\left(1_{60^\\circ}\\right)^3 = 1_{180^\\circ} = -1$ ✓." }],
      title: "Ejemplo: la raíz cúbica de −1",
      blocks: [
        { kind: "example", title: "−1 = 1 con argumento 180°", lines: [
          { math: "k = 0:\\ 1_{60^\\circ} = \\dfrac{1}{2} + \\dfrac{\\sqrt{3}}{2}\\,i" },
          { math: "k = 1:\\ 1_{180^\\circ} = -1" },
          { math: "k = 2:\\ 1_{300^\\circ} = \\dfrac{1}{2} - \\dfrac{\\sqrt{3}}{2}\\,i" },
        ] },
        { kind: "text", text: "Por tanto $z^3 = -1$ tiene **tres** soluciones: la real $-1$ y un par de conjugadas." },
      ],
      arrange: "stack",
    },
    {
      id: "ecuaciones",
      type: "slide",
      help: [{ label: "Idea", message: "Resolver $x^n = w$ es calcular las raíces $n$-ésimas de $w$. Se pasa $w$ a forma polar y se aplica la fórmula." }],
      title: "Resolver ecuaciones: x⁴ + 16 = 0",
      blocks: [
        { kind: "steps", title: "Del polinomio a las raíces", items: [
          "Se despeja: $x^4 = -16$, con $-16 = 16_{180^\\circ}$.",
          "Módulo de las raíces: $\\sqrt[4]{16} = 2$.",
          "Argumentos: $\\dfrac{180^\\circ + 360^\\circ k}{4} = 45^\\circ, 135^\\circ, 225^\\circ, 315^\\circ$.",
        ] },
        { kind: "example", lines: [
          { math: "x = 2_{45^\\circ} = \\sqrt{2} + \\sqrt{2}\\,i,\\ \\ \\sqrt{2} - \\sqrt{2}\\,i,\\ \\ -\\sqrt{2} + \\sqrt{2}\\,i,\\ \\ -\\sqrt{2} - \\sqrt{2}\\,i" },
        ] },
        { kind: "text", text: "Las cuatro raíces forman un cuadrado: dos pares de conjugadas, como siempre con coeficientes reales." },
      ],
      arrange: "stack",
    },
    {
      id: "check-raiz",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Eleva cada opción a la cuarta potencia y comprueba si da $-16$." }],
      title: "¿Cuál es raíz de x⁴ + 16 = 0?",
      question: "Una de estas es solución de $x^4 + 16 = 0$. ¿Cuál?",
      choices: [
        { id: "a", label: "$\\sqrt{2} + \\sqrt{2}\\,i$" },
        { id: "b", label: "$2$", incorrectFeedback: "$2^4 = 16$, que da $16 + 16 = 32 \\neq 0$." },
        { id: "c", label: "$2i$", incorrectFeedback: "$(2i)^4 = 16\\,i^4 = 16$: no es $-16$." },
        { id: "d", label: "$4i$", incorrectFeedback: "$(4i)^4 = 256$. Tiene módulo $4$, no $2$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(\\sqrt{2} + \\sqrt{2}\\,i)^2 = 2(1+i)^2 = 2\\cdot 2i = 4i$ y $(4i)^2 = -16$. Por tanto $x^4 = -16$.",
    },
    {
      id: "unidad",
      type: "slide",
      help: [{ label: "Polígonos", message: "Las raíces $n$-ésimas de la unidad dibujan un polígono regular de $n$ lados con un vértice en $1$. Con números complejos se pueden construir polígonos regulares." }],
      title: "Las raíces de la unidad",
      blocks: [
        { kind: "example", lines: [
          { math: "n = 2:\\ \\ \\pm 1" },
          { math: "n = 3:\\ \\ 1,\\ -\\dfrac{1}{2} \\pm \\dfrac{\\sqrt{3}}{2}\\,i\\quad\\text{(triángulo)}" },
          { math: "n = 4:\\ \\ 1,\\ i,\\ -1,\\ -i\\quad\\text{(cuadrado)}" },
        ] },
        { kind: "text", text: "Todas están sobre la circunferencia de radio $1$, porque $\\sqrt[n]{1} = 1$." },
      ],
      arrange: "stack",
    },
    {
      id: "check-real",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Busca el real cuyo cubo sea $-8$." }],
      title: "La raíz real de x³ = −8",
      question: "La ecuación $x^3 = -8$ tiene una solución real. ¿Cuál es? (solo el número)",
      correctAnswers: ["-2", "−2"],
      explanation: "$(-2)^3 = -8$. Las otras dos raíces son complejas conjugadas: $1 \\pm \\sqrt{3}\\,i$.",
    },
  ],
};
