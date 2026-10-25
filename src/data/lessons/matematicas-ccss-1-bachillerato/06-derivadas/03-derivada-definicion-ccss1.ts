import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_6_SUBTITLE } from "@/data/lessons/shared";

export const derivadaDefinicionCcss1Lesson: InteractiveLesson = {
  slug: "derivada-definicion-ccss1",
  title: "3. Calcular derivadas con la definición",
  subtitle: TEMA_CCSS1_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "x2",
      type: "slide",
      help: [{ label: "Dos caminos", message: "Se puede usar $\\frac{f(x) - f(a)}{x - a}$ y factorizar, o $\\frac{f(a + h) - f(a)}{h}$ y desarrollar. Con polinomios suele ser más cómodo desarrollar." }],
      title: "La derivada de x² en cualquier punto",
      blocks: [
        { kind: "example", title: "Con f(a + h)", lines: [
          { math: "\\dfrac{f(a + h) - f(a)}{h} = \\dfrac{(a + h)^2 - a^2}{h} = \\dfrac{2ah + h^2}{h} = 2a + h" },
          { math: "f'(a) = \\lim_{h\\to 0}(2a + h) = 2a" },
        ] },
        { kind: "example", title: "Con x − a", lines: [
          { math: "\\dfrac{x^2 - a^2}{x - a} = \\dfrac{(x - a)(x + a)}{x - a} = x + a\\ \\to\\ 2a" },
        ] },
        { kind: "text", text: "Como $a$ es cualquier punto, queda $f'(x) = 2x$: una **nueva función**, la **función derivada**." },
      ],
      visual: { kind: "tool", tool: "funcion-derivada-explorador", initial: [0, 10], hint: "Mueve el punto: la pendiente de la tangente a x² vale siempre el doble de x. Eso dibuja la recta naranja f′(x) = 2x." },
    },
    {
      id: "otras",
      type: "slide",
      help: [{ label: "Cúbica", message: "$b^3 - x^3 = (b - x)(b^2 + bx + x^2)$, de ahí que el límite sea $3x^2$." }],
      title: "Más derivadas por la definición",
      blocks: [
        { kind: "facts", items: [
          { tex: "f(x) = k\\ \\Rightarrow\\ f'(x) = 0", label: "constante" },
          { tex: "f(x) = x\\ \\Rightarrow\\ f'(x) = 1", label: "identidad" },
          { tex: "f(x) = x^2\\ \\Rightarrow\\ f'(x) = 2x", label: "cuadrado" },
          { tex: "f(x) = x^3\\ \\Rightarrow\\ f'(x) = 3x^2", label: "cubo" },
        ] },
        { kind: "example", title: "x³", lines: [
          { math: "\\dfrac{b^3 - x^3}{b - x} = b^2 + bx + x^2\\ \\xrightarrow{\\,b\\to x\\,}\\ 3x^2" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-5",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Como $f'(x) = 2x$, basta sustituir $x = 5$." }],
      title: "Usar f′(x) = 2x",
      question: "Si $f(x) = x^2$, ¿cuánto vale $f'(5)$? (solo el número)",
      correctAnswers: ["10"],
      explanation: "$f'(x) = 2x \\Rightarrow f'(5) = 10$. Ya no hace falta repetir el límite para cada punto.",
    },
    {
      id: "check-limite",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$(2 + h)^2 - 4 = 4h + h^2$." }],
      title: "El límite de la definición",
      question: "Calcula $\\displaystyle\\lim_{h\\to 0}\\dfrac{(2 + h)^2 - 4}{h}$. (solo el número)",
      correctAnswers: ["4"],
      explanation: "$\\dfrac{4h + h^2}{h} = 4 + h \\to 4$. Es $f'(2)$ para $f(x) = x^2$.",
    },
    {
      id: "check-recta",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "La tangente a una recta es la propia recta." }],
      title: "Derivada de una función lineal",
      question: "Si $f(x) = 3x + 2$, ¿cuánto vale $f'(x)$ en cualquier punto?",
      choices: [
        { id: "a", label: "$3$, la pendiente de la recta" },
        { id: "b", label: "$2$", incorrectFeedback: "$2$ es la ordenada en el origen, que no afecta a la pendiente." },
        { id: "c", label: "$3x$", incorrectFeedback: "La derivada de una recta no depende de $x$: es constante." },
        { id: "d", label: "$0$", incorrectFeedback: "$0$ es la derivada de una función **constante**." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\dfrac{3(x + h) + 2 - (3x + 2)}{h} = 3$ siempre: la derivada de $mx + n$ es $m$.",
    },
    {
      id: "check-polinomio",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Para $f(x) = x^2 - x + 1$ se obtiene $f'(x) = 2x - 1$." }],
      title: "Un polinomio de grado 2",
      question: "Con $f(x) = x^2 - x + 1$, ¿cuánto vale $f'(1)$? (solo el número)",
      correctAnswers: ["1"],
      explanation: "$\\dfrac{f(1 + h) - f(1)}{h} = \\dfrac{(1 + h)^2 - (1 + h) + 1 - 1}{h} = \\dfrac{h + h^2}{h} = 1 + h \\to 1$.",
    },
    {
      id: "check-caida",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Si $d(t) = 5t^2$, la velocidad es $d'(t) = 10t$." }],
      title: "Caída libre",
      question: "Una persona se lanza a una lona y tarda $4$ s en llegar a ella. Con $d(t) = 5t^2$ (metros), ¿a qué velocidad llega, en m/s? (solo el número)",
      correctAnswers: ["40"],
      explanation: "$d'(t) = 10t \\Rightarrow d'(4) = 40$ m/s, es decir, $144$ km/h.",
    },
  ],
};
