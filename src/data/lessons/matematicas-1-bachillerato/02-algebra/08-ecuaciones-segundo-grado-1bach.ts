import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_2_SUBTITLE } from "@/data/lessons/shared";

export const ecuacionesSegundoGrado1bachLesson: InteractiveLesson = {
  slug: "ecuaciones-segundo-grado-1bach",
  title: "8. Ecuaciones de segundo grado",
  subtitle: TEMA_1BACH_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "formula",
      type: "slide",
      help: [{ label: "Discriminante", message: "$\\Delta = b^2 - 4ac$ es lo que va dentro de la raíz. Su signo decide cuántas soluciones reales hay." }],
      title: "La fórmula y el discriminante",
      blocks: [
        { kind: "rule", title: "ax² + bx + c = 0", formula: "x = \\dfrac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}" },
        { kind: "facts", items: [
          { tex: "\\Delta > 0", label: "dos soluciones reales distintas" },
          { tex: "\\Delta = 0", label: "una solución doble" },
          { tex: "\\Delta < 0", label: "ninguna solución real" },
        ] },
      ],
      visual: { kind: "anim", scene: "parabola-raices", params: { a: 1, b: -2, c: -3 } },
    },
    {
      id: "explora",
      type: "slide",
      help: [{ label: "Qué mirar", message: "Las soluciones son los puntos donde la parábola corta el eje horizontal." }],
      title: "Mueve los coeficientes",
      blocks: [{ kind: "text", text: "Cambia $a$, $b$ y $c$ y observa cómo el discriminante controla cuántos cortes con el eje hay." }],
      visual: { kind: "tool", tool: "cuadratica-explorador", params: { a: 1, b: 1, c: -2 }, hint: "Mueve c hasta que Δ valga 0 y luego hasta que sea negativo." },
    },
    {
      id: "ejemplos",
      type: "slide",
      help: [{ label: "Incompletas", message: "Si falta $b$ o $c$ no hace falta la fórmula: $ax^2 + c = 0$ se despeja y $ax^2 + bx = 0$ se resuelve sacando factor común $x$." }],
      title: "Ejemplos y ecuaciones incompletas",
      blocks: [
        { kind: "example", title: "2x² − x − 3 = 0", lines: [
          { math: "\\Delta = 1 + 24 = 25" },
          { math: "x = \\dfrac{1 \\pm 5}{4} \\Rightarrow x = \\dfrac{3}{2},\\ x = -1" },
        ] },
        { kind: "example", title: "Incompletas", lines: [
          { math: "x^2 - 9 = 0 \\Rightarrow x = \\pm 3" },
          { math: "x^2 + 3x = 0 \\Rightarrow x(x + 3) = 0 \\Rightarrow x = 0,\\ x = -3" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-disc",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$\\Delta = b^2 - 4ac = 16 - 20$." }],
      title: "¿Cuántas soluciones?",
      question: "¿Cuántas soluciones reales tiene $x^2 - 4x + 5 = 0$? (solo el número)",
      correctAnswers: ["0"],
      explanation: "$\\Delta = 16 - 20 = -4 < 0$: no hay soluciones reales (son complejas: $2 \\pm i$).",
    },
    {
      id: "vieta",
      type: "slide",
      help: [{ label: "De dónde sale", message: "Con $x_{1,2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$: al sumar se anulan las raíces cuadradas y queda $\\frac{-2b}{2a}$; al multiplicar queda $\\frac{b^2 - \\Delta}{4a^2} = \\frac{c}{a}$." }],
      title: "Suma y producto de las soluciones",
      blocks: [
        { kind: "rule", title: "Relaciones de Cardano-Vieta", formula: "x_1 + x_2 = -\\dfrac{b}{a}\\qquad x_1\\cdot x_2 = \\dfrac{c}{a}" },
        { kind: "example", title: "Ecuación con raíces 2 y −5", lines: [
          { math: "S = 2 + (-5) = -3,\\qquad P = 2\\cdot(-5) = -10" },
          { math: "x^2 - Sx + P = x^2 + 3x - 10 = 0" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-vieta",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Calcula $S = 3 + (-1) = 2$ y $P = 3\\cdot(-1) = -3$, y escribe $x^2 - Sx + P$." }],
      title: "Construir la ecuación",
      question: "¿Qué ecuación de segundo grado tiene por soluciones $3$ y $-1$?",
      choices: [
        { id: "a", label: "$x^2 - 2x - 3 = 0$" },
        { id: "b", label: "$x^2 + 2x - 3 = 0$", incorrectFeedback: "El coeficiente de $x$ es $-S = -2$, no $+2$ (esa tiene raíces $1$ y $-3$)." },
        { id: "c", label: "$x^2 - 2x + 3 = 0$", incorrectFeedback: "El término independiente es el producto, $3\\cdot(-1) = -3$." },
        { id: "d", label: "$x^2 - 3x - 1 = 0$", incorrectFeedback: "Has usado los números como coeficientes. Hay que usar suma y producto." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$S = 2$ y $P = -3$, luego $x^2 - 2x - 3 = 0$, que es $(x - 3)(x + 1)$.",
    },
    {
      id: "check-producto",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "El producto de las soluciones es $\\frac{c}{a}$." }],
      title: "Producto sin resolver",
      question: "Sin resolver, ¿cuánto vale el **producto** de las soluciones de $2x^2 - 7x + 6 = 0$? (solo el número)",
      correctAnswers: ["3"],
      explanation: "$x_1 x_2 = \\frac{c}{a} = \\frac{6}{2} = 3$. (Las soluciones son $\\frac{3}{2}$ y $2$.)",
    },
    {
      id: "problema",
      type: "slide",
      help: [{ label: "Dos soluciones", message: "Al plantear un problema, la ecuación puede dar dos soluciones y hay que decidir si ambas valen. Aquí valen las dos, porque describen el mismo rectángulo." }],
      title: "Un problema: el rectángulo",
      blocks: [
        { kind: "text", text: "Un rectángulo tiene perímetro $20$ m y área $24$ m². Si un lado mide $x$, el otro mide $10 - x$." },
        { kind: "example", lines: [
          { math: "x(10 - x) = 24 \\Rightarrow x^2 - 10x + 24 = 0" },
          { math: "x = \\dfrac{10 \\pm 2}{2} \\Rightarrow x = 6\\ \\text{o}\\ x = 4" },
        ] },
        { kind: "text", text: "Los lados miden $4$ m y $6$ m: las dos soluciones describen el mismo rectángulo." },
      ],
      arrange: "stack",
    },
  ],
};
