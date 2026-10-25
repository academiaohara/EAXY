import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_6_SUBTITLE } from "@/data/lessons/shared";

export const exponencialLogaritmica1bachLesson: InteractiveLesson = {
  slug: "exponencial-logaritmica-1bach",
  title: "6. Funciones exponencial y logarítmica",
  subtitle: TEMA_1BACH_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "exponencial",
      type: "slide",
      help: [{ label: "Crecimiento exponencial", message: "Cuando algo se multiplica por un factor constante en cada periodo (bacterias, capital con interés compuesto), su evolución es exponencial." }],
      title: "La función exponencial y = aˣ",
      blocks: [
        { kind: "rule", title: "Con a > 0 y a ≠ 1", formula: "\\text{Dom} f = \\mathbb{R}\\qquad \\text{Im} f = (0, +\\infty)\\qquad \\text{pasa por } (0, 1)\\qquad \\text{asíntota } y = 0" },
        { kind: "facts", items: [
          { tex: "a > 1", label: "creciente" },
          { tex: "0 < a < 1", label: "decreciente" },
        ] },
      ],
      visual: { kind: "tool", tool: "exponencial-explorador", params: { a: 2, b: 1 }, hint: "Recorre la base de 0,4 a 3: ¿a partir de qué valor crece?" },
    },
    {
      id: "logaritmica",
      type: "slide",
      help: [{ label: "Inversas", message: "$y = \\log_a x$ es la inversa de $y = a^x$: sus gráficas son simétricas respecto de la recta $y = x$." }],
      title: "La función logarítmica y = logₐ x",
      blocks: [
        { kind: "rule", title: "Con a > 0 y a ≠ 1", formula: "\\text{Dom} f = (0, +\\infty)\\qquad \\text{Im} f = \\mathbb{R}\\qquad \\text{pasa por } (1, 0)\\qquad \\text{asíntota } x = 0" },
        { kind: "text", text: "Es la **inversa** de la exponencial: $\\log_a x = y \\iff a^y = x$. Su gráfica es la de $a^x$ reflejada en la diagonal $y = x$." },
      ],
      visual: { kind: "tool", tool: "exp-log-explorador", initial: [1], hint: "Cambia de base: las dos curvas son simétricas respecto de la diagonal. Con base 0,5 ambas decrecen." },
    },
    {
      id: "check-dominio",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "El recorrido de $a^x$ es el dominio de $\\log_a x$, y al revés." }],
      title: "Dominio y recorrido",
      question: "¿Cuál es el recorrido de $f(x) = 3^x$?",
      choices: [
        { id: "a", label: "$(0,\\ +\\infty)$" },
        { id: "b", label: "$\\mathbb{R}$", incorrectFeedback: "Eso es el **dominio**. Una potencia de base positiva nunca es $0$ ni negativa." },
        { id: "c", label: "$[0,\\ +\\infty)$", incorrectFeedback: "$3^x$ nunca llega a valer $0$: el $0$ no está en el recorrido." },
        { id: "d", label: "$(1,\\ +\\infty)$", incorrectFeedback: "$3^x$ toma valores entre $0$ y $1$ para $x < 0$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$3^x > 0$ para todo $x$ y toma cualquier valor positivo: Im $f = (0, +\\infty)$.",
    },
    {
      id: "check-pot",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Cada hora se multiplica por $2$: $100\\cdot 2\\cdot 2\\cdot 2$." }],
      title: "Crecimiento exponencial",
      question: "Un cultivo tiene $100$ bacterias y se duplica cada hora. ¿Cuántas habrá tras $3$ horas? (solo el número)",
      correctAnswers: ["800"],
      explanation: "$N(t) = 100\\cdot 2^t$ y $N(3) = 100\\cdot 8 = 800$.",
    },
    {
      id: "check-decreciente",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Si $0 < a < 1$, al multiplicar por $a$ el valor disminuye." }],
      title: "Base menor que 1",
      question: "La función $f(x) = \\left(\\dfrac{1}{2}\\right)^x$ es…",
      choices: [
        { id: "a", label: "decreciente, con asíntota $y = 0$ hacia la derecha" },
        { id: "b", label: "creciente", incorrectFeedback: "Con base menor que $1$ cada paso multiplica por $\\frac{1}{2}$ y el valor baja." },
        { id: "c", label: "decreciente y con valores negativos", incorrectFeedback: "Una potencia de base positiva nunca es negativa." },
        { id: "d", label: "constante", incorrectFeedback: "Solo $1^x$ es constante." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Es decreciente: $f(0) = 1$, $f(1) = \\frac{1}{2}$, $f(2) = \\frac{1}{4}$… y se acerca a $0$ sin tocarlo.",
    },
    {
      id: "interes",
      type: "slide",
      help: [{ label: "Interés compuesto", message: "$C_t = C_0(1 + r)^t$ es una función exponencial de base $1 + r$ (mayor que $1$, así que crece)." }],
      title: "Aplicación: interés compuesto",
      blocks: [
        { kind: "example", title: "5 000 € al 2 % anual durante 10 años", lines: [
          { math: "C(t) = 5000\\cdot 1{,}02^t" },
          { math: "C(10) = 5000\\cdot 1{,}02^{10} \\approx 6\\,094{,}97\\ \\text{€}" },
        ] },
        { kind: "text", text: "Para saber **cuándo** se alcanza una cantidad se despeja $t$ con un **logaritmo**: $t = \\dfrac{\\log(C/C_0)}{\\log 1{,}02}$." },
      ],
      arrange: "stack",
    },
    {
      id: "check-interes",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$5000\\cdot 1{,}02^{10}$. Redondea a la unidad." }],
      title: "El capital final",
      question: "¿Cuántos euros hay tras $10$ años si se ingresan $5\\,000$ € al $2\\,\\%$ anual compuesto? (redondeado a la unidad)",
      correctAnswers: ["6095"],
      explanation: "$5000\\cdot 1{,}02^{10} \\approx 5000\\cdot 1{,}21899 = 6\\,094{,}97 \\approx 6\\,095$ €.",
    },
  ],
};
