import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_3_SUBTITLE } from "@/data/lessons/shared";

export const progresionesGeometricas1bachLesson: InteractiveLesson = {
  slug: "progresiones-geometricas-1bach",
  title: "3. Progresiones geométricas",
  subtitle: TEMA_1BACH_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [{ label: "Razón negativa", message: "Si $r < 0$ los términos alternan de signo. Si $|r| < 1$ se acercan a $0$ y si $|r| > 1$ crecen en valor absoluto." }],
      title: "Multiplicar siempre por lo mismo",
      blocks: [
        { kind: "definition", text: "Una **progresión geométrica** es una sucesión en la que el **cociente** entre cada término y el anterior es constante, la **razón** $r$: $a_{n+1} = a_n\\cdot r$." },
        { kind: "rule", title: "Término general", formula: "a_n = a_1\\cdot r^{\\,n-1}" },
        { kind: "example", title: "La hucha", lines: [
          { math: "1\\ \\text{€ el primer año y se duplica cada año: } 1, 2, 4, 8, 16, \\ldots" },
          { math: "a_5 = 1\\cdot 2^{4} = 16\\ \\text{€}" },
        ] },
      ],
      visual: { kind: "anim", scene: "progresion-pasos", params: { a: 1, b: 2, c: 5, d: 6, prog: "geometrica" } },
    },
    {
      id: "comparar",
      type: "slide",
      help: [{ label: "Explosión", message: "Una progresión geométrica con $r > 1$ acaba superando a cualquier aritmética, por rápida que sea al principio." }],
      title: "Aritmética frente a geométrica",
      blocks: [
        { kind: "text", text: "Sumar cantidades iguales crece de forma **lineal**; multiplicar por la misma razón crece (o decrece) de forma **exponencial**. Observa cuándo la geométrica adelanta a la aritmética." },
      ],
      visual: { kind: "anim", scene: "progresion-comparar", params: { a: 2, b: 3, c: 2 } },
      arrange: "text-top",
    },
    {
      id: "check-termino",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "La razón es $6 : 3 = 2$. $a_6 = 3\\cdot 2^5$." }],
      title: "Un término",
      question: "En la progresión geométrica $3, 6, 12, 24, \\ldots$, ¿cuánto vale $a_6$? (solo el número)",
      correctAnswers: ["96"],
      explanation: "$r = 2$ y $a_6 = 3\\cdot 2^{5} = 96$.",
    },
    {
      id: "suma",
      type: "slide",
      help: [{ label: "Demostración", message: "$S_n - r\\,S_n = a_1 - a_1 r^n$, luego $S_n = \\frac{a_1(1 - r^n)}{1 - r}$: casi todos los sumandos se cancelan." }],
      title: "Suma y producto de n términos",
      blocks: [
        { kind: "rule", title: "Suma (si r ≠ 1)", formula: "S_n = \\dfrac{a_1\\,(r^n - 1)}{r - 1} = \\dfrac{r\\,a_n - a_1}{r - 1}" },
        { kind: "rule", title: "Producto", formula: "P_n = \\sqrt{(a_1\\cdot a_n)^n}" },
        { kind: "example", title: "1, 2, 4, 8, 16", lines: [
          { math: "S_5 = \\dfrac{2\\cdot 16 - 1}{2 - 1} = 31" },
          { math: "P_5 = \\sqrt{(1\\cdot 16)^5} = \\sqrt{16^5} = 1024" },
        ] },
      ],
      visual: { kind: "tool", tool: "progresion-explorador", initial: [1, 1, 4, 6], hint: "Con a₁ = 1, r = 2 y n = 6 sale S₆ = 63. Pon r = 1 y comprueba que todos los términos coinciden." },
    },
    {
      id: "check-suma",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$S_6 = \\frac{3\\,(2^6 - 1)}{2 - 1}$." }],
      title: "Suma de seis términos",
      question: "Calcula la suma de los $6$ primeros términos de $3, 6, 12, 24, \\ldots$ (solo el número)",
      correctAnswers: ["189"],
      explanation: "$S_6 = \\frac{3\\,(2^6 - 1)}{2 - 1} = 3\\cdot 63 = 189$. (Comprobación: $3 + 6 + 12 + 24 + 48 + 96 = 189$.)",
    },
    {
      id: "check-razon",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "La razón es el cociente de dos términos consecutivos, por ejemplo $27 : 81$." }],
      title: "La razón",
      question: "¿Cuál es la razón de la progresión geométrica $81, 27, 9, 3, \\ldots$?",
      choices: [
        { id: "a", label: "$\\dfrac{1}{3}$" },
        { id: "b", label: "$-54$", incorrectFeedback: "$-54$ es la diferencia $27 - 81$, no el cociente." },
        { id: "c", label: "$3$", incorrectFeedback: "Los términos **decrecen**: la razón es menor que $1$." },
        { id: "d", label: "$-3$", incorrectFeedback: "Todos los términos son positivos: la razón no puede ser negativa." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$27 : 81 = \\frac{1}{3}$ y $9 : 27 = \\frac{1}{3}$: la razón es $\\frac{1}{3}$.",
    },
  ],
};
