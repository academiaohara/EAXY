import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_7_SUBTITLE } from "@/data/lessons/shared";

export const continuidadPunto1bachLesson: InteractiveLesson = {
  slug: "continuidad-punto-1bach",
  title: "12. Continuidad de una función en un punto",
  subtitle: TEMA_1BACH_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [{ label: "Intuición", message: "Una función es continua en un punto si se puede dibujar **sin levantar el lápiz** al pasar por él." }],
      title: "Tres condiciones",
      blocks: [
        { kind: "rule", title: "f es continua en x = a si…", text: "1) existe $f(a)$;  2) existe y es **finito** $\\displaystyle\\lim_{x\\to a} f(x)$ (los laterales existen y coinciden);  3) ambos valores **coinciden**." },
        { kind: "formula", tex: "\\lim_{x\\to a} f(x) = f(a)" },
        { kind: "text", text: "Una función es **continua en un intervalo** si lo es en todos sus puntos, y **continua** si lo es en todo su dominio." },
      ],
      visual: { kind: "tool", tool: "limite-lateral-explorador", initial: [0, 1], hint: "La función 1 cumple las tres condiciones en x = 1: los laterales valen 1 y f(1) = 1." },
    },
    {
      id: "check-continua",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Calcula $f(2)$ y los dos laterales en $x = 2$." }],
      title: "¿Es continua?",
      question: "Sea $f(x) = x^3$ si $x < 2$ y $f(x) = 3x + 2$ si $x \\geq 2$. En $x = 2$, la función…",
      choices: [
        { id: "a", label: "es continua: $f(2) = 8$ y los dos laterales valen $8$" },
        { id: "b", label: "tiene un salto, porque cambia de fórmula", incorrectFeedback: "Que cambie de fórmula no implica un salto: aquí $2^3 = 8 = 3\\cdot 2 + 2$." },
        { id: "c", label: "no está definida en $x = 2$", incorrectFeedback: "$f(2) = 3\\cdot 2 + 2 = 8$." },
        { id: "d", label: "tiene un hueco", incorrectFeedback: "Sí está definida en $x = 2$ y coincide con el límite." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\lim_{x\\to 2^-} x^3 = 8$, $\\lim_{x\\to 2^+}(3x + 2) = 8$ y $f(2) = 8$: se cumplen las tres condiciones.",
    },
    {
      id: "propiedades",
      type: "slide",
      help: [{ label: "Dominio", message: "Estas funciones son continuas **en su dominio**. Pueden fallar en los puntos que no pertenecen a él." }],
      title: "Funciones continuas conocidas",
      blocks: [
        { kind: "text", text: "Son continuas en todo su dominio los **polinomios**, las funciones **racionales**, con **raíces**, **exponenciales**, **logarítmicas** y **trigonométricas**." },
        { kind: "facts", items: [
          { tex: "f + g,\\ f - g,\\ f\\cdot g", label: "continuas si f y g lo son" },
          { tex: "\\dfrac{f}{g}", label: "continua donde g ≠ 0" },
          { tex: "f\\big(g(x)\\big)", label: "continua si g lo es y f lo es en g(a)" },
        ] },
        { kind: "example", title: "(x − 1)/(x² − 4)", lines: [
          { math: "x^2 - 4 = 0 \\iff x = \\pm 2\\ \\Rightarrow\\ \\text{continua en } \\mathbb{R} - \\{-2, 2\\}" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Una función es continua en todo $\\mathbb{R}$ si su dominio es $\\mathbb{R}$ y es de las conocidas." }],
      title: "¿Continua en todo ℝ?",
      question: "Clasifica cada función.",
      groups: [
        { id: "si", label: "Continua en todo ℝ", tone: "emerald" },
        { id: "no", label: "Tiene puntos de discontinuidad", tone: "amber" },
      ],
      items: [
        { id: "a", text: "$f(x) = x^3 - 4x + 1$", group: "si" },
        { id: "b", text: "$f(x) = e^x$", group: "si" },
        { id: "c", text: "$f(x) = \\dfrac{1}{x}$", group: "no" },
        { id: "d", text: "$f(x) = \\sin x$", group: "si" },
        { id: "e", text: "$f(x) = \\ln x$", group: "no" },
        { id: "f", text: "$f(x) = \\dfrac{x + 1}{x^2 - 9}$", group: "no" },
      ],
      hint: "$\\ln x$ no existe para $x \\leq 0$; $\\frac{1}{x}$ y $\\frac{x+1}{x^2-9}$ no existen donde se anula el denominador.",
    },
    {
      id: "parametro",
      type: "slide",
      help: [{ label: "Estrategia", message: "Se iguala el límite por un lado al límite por el otro (o al valor de la función en el punto) y se despeja el parámetro." }],
      title: "Elegir un parámetro para que sea continua",
      blocks: [
        { kind: "text", text: "Si una función depende de un parámetro $k$, se impone que los dos laterales coincidan con $f(a)$." },
        { kind: "example", title: "f(x) = x² si x < a; x + k si x ≥ a", lines: [
          { math: "\\lim_{x\\to a^-} f = a^2\\qquad \\lim_{x\\to a^+} f = f(a) = a + k" },
          { math: "a^2 = a + k\\ \\Rightarrow\\ k = a^2 - a" },
        ] },
      ],
      visual: { kind: "tool", tool: "continuidad-k-explorador", initial: [2, 0], hint: "Mueve k hasta que desaparezca el salto: con a = 2 hace falta k = 2." },
    },
    {
      id: "check-k",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Con $a = 3$: $3^2 = 3 + k$." }],
      title: "Valor de k",
      question: "¿Qué valor de $k$ hace continua en $x = 3$ a $f(x) = x^2$ si $x < 3$ y $f(x) = x + k$ si $x \\geq 3$?",
      correctAnswers: ["6"],
      explanation: "$3^2 = 3 + k \\Rightarrow k = 9 - 3 = 6$.",
    },
  ],
};
