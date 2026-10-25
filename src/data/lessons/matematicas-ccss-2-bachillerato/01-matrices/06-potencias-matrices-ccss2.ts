import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_1_SUBTITLE } from "@/data/lessons/shared";

export const potenciasMatricesCcss2Lesson: InteractiveLesson = {
  slug: "potencias-matrices-ccss2",
  title: "6. Potencias de una matriz",
  subtitle: TEMA_CCSS2_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "idea",
      type: "slide",
      help: [{ label: "Solo cuadradas", message: "$A^2 = A\\cdot A$ solo existe si $A$ es cuadrada: las columnas de la primera deben ser las filas de la segunda." }],
      title: "Calcular Aⁿ: buscar el patrón",
      blocks: [
        { kind: "definition", text: "Para una matriz **cuadrada**, $A^n = A\\cdot A\\cdots A$ ($n$ factores). Para $n$ grande no se multiplica $n$ veces: se calculan $A^2, A^3, A^4\\dots$ hasta **ver el patrón**." },
        { kind: "steps", title: "Método", items: [
          "Calcula las primeras potencias.",
          "Observa si se **repiten** (periodo) o siguen una **fórmula** en $n$.",
          "Enuncia la fórmula y compruébala por **inducción** (si el curso lo pide).",
        ] },
      ],
      visual: { kind: "tool", tool: "matriz-potencias-explorador", hint: "Mueve n con cada matriz. En el giro de 90° la secuencia se repite; en la cizalla el elemento superior derecho es n." },
    },
    {
      id: "check-periodo",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Con $A = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$: $A^2 = -I$, $A^3 = -A$, $A^4 = I$. Luego se repite cada $4$ potencias; $50 = 4\\cdot 12 + 2$." }],
      title: "Una potencia grande que se repite",
      question: "Sea $A = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}$. ¿Cuánto vale el elemento $(1, 1)$ de $A^{50}$? (solo el número)",
      correctAnswers: ["-1", "−1"],
      explanation: "$A^4 = I$, así que $A^{50} = (A^4)^{12}\\cdot A^2 = A^2 = -I$. El elemento $(1,1)$ es $-1$. (Y $A^{97} = A$, porque $97 = 4\\cdot 24 + 1$.)",
    },
    {
      id: "formulas",
      type: "slide",
      help: [{ label: "Inducción", message: "Se comprueba $n = 1$ y se prueba que, si vale para $n$, vale para $n + 1$ multiplicando por $A$." }],
      title: "Tres fórmulas que conviene recordar",
      blocks: [
        { kind: "facts", items: [
          { tex: "\\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}^{n} = \\begin{pmatrix} 1 & n \\\\ 0 & 1 \\end{pmatrix}" },
          { tex: "\\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}^{n} = 2^{\\,n-1}\\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}" },
          { tex: "\\begin{pmatrix} 1 & 0 & 1 \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}^{n} = \\begin{pmatrix} 1 & 0 & n \\\\ 0 & 1 & 0 \\\\ 0 & 0 & 1 \\end{pmatrix}" },
        ] },
        { kind: "text", text: "Para una matriz **diagonal**, $\\mathrm{diag}(d_1, d_2)^n = \\mathrm{diag}(d_1^n, d_2^n)$: se eleva cada elemento de la diagonal." },
      ],
    },
    {
      id: "check-cizalla",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Es la cizalla $\\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}^{n}$." }],
      title: "Cizalla elevada a 30",
      question: "Si $A = \\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$, ¿cuánto vale el elemento $(1, 2)$ de $A^{30}$? (solo el número)",
      correctAnswers: ["30"],
      explanation: "$A^n = \\begin{pmatrix} 1 & n \\\\ 0 & 1 \\end{pmatrix}$, luego el elemento $(1,2)$ vale $n = 30$.",
    },
    {
      id: "check-unos",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$A^n = 2^{n-1}A$; con $n = 5$, $2^4 = 16$." }],
      title: "Todo unos",
      question: "Si $A = \\begin{pmatrix} 1 & 1 \\\\ 1 & 1 \\end{pmatrix}$, ¿cuánto vale el elemento $(1, 1)$ de $A^5$? (solo el número)",
      correctAnswers: ["16"],
      explanation: "$A^2 = \\begin{pmatrix} 2 & 2 \\\\ 2 & 2 \\end{pmatrix} = 2A$, $A^3 = 4A$, $A^n = 2^{n-1}A$. Con $n = 5$: $2^4 = 16$.",
    },
    {
      id: "check-diagonal",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "En una matriz diagonal basta con elevar cada elemento de la diagonal." }],
      title: "Una diagonal",
      question: "Si $D = \\begin{pmatrix} 2 & 0 \\\\ 0 & 3 \\end{pmatrix}$, ¿cuánto vale el elemento $(2, 2)$ de $D^4$? (solo el número)",
      correctAnswers: ["81"],
      explanation: "$D^4 = \\begin{pmatrix} 2^4 & 0 \\\\ 0 & 3^4 \\end{pmatrix} = \\begin{pmatrix} 16 & 0 \\\\ 0 & 81 \\end{pmatrix}$.",
    },
  ],
};
