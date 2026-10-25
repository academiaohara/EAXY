import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_2_SUBTITLE } from "@/data/lessons/shared";

export const inversaDeterminantes2bachLesson: InteractiveLesson = {
  slug: "inversa-determinantes-2bach",
  title: "10. Inversa por determinantes",
  subtitle: TEMA_2BACH_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "formula",
      type: "slide",
      help: [{ label: "Condición", message: "Es una condición necesaria y suficiente: $A$ es regular si y solo si $|A| \\neq 0$." }],
      title: "La fórmula de la inversa",
      blocks: [
        { kind: "rule", title: "Matriz inversa", text: "Si $|A| \\neq 0$:", formula: "A^{-1} = \\dfrac{1}{|A|}\\,\\big[\\mathrm{Adj}(A)\\big]^t" },
        { kind: "steps", title: "Cuatro pasos", items: [
          "Calcula $|A|$. Si es $0$, no hay inversa.",
          "Calcula la matriz adjunta $\\mathrm{Adj}(A)$.",
          "Traspón la: $[\\mathrm{Adj}(A)]^t$.",
          "Divide entre $|A|$.",
        ] },
        { kind: "example", title: "En orden 2", lines: [
          { math: "A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\Rightarrow A^{-1} = \\dfrac{1}{ad - bc}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}" },
          { math: "\\begin{pmatrix} 1 & 1 \\\\ 2 & 1 \\end{pmatrix}^{-1} = \\dfrac{1}{-1}\\begin{pmatrix} 1 & -1 \\\\ -2 & 1 \\end{pmatrix} = \\begin{pmatrix} -1 & 1 \\\\ 2 & -1 \\end{pmatrix}" },
        ] },
      ],
    },
    {
      id: "check-2x2",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$|A| = 2\\cdot 3 - 1\\cdot 5 = 1$. Intercambia los elementos de la diagonal principal y cambia de signo los de la secundaria." }],
      title: "Inversa de una 2×2",
      question: "Calcula la inversa de $A = \\begin{pmatrix} 2 & 1 \\\\ 5 & 3 \\end{pmatrix}$. ¿Cuánto vale el elemento $(1, 2)$ de $A^{-1}$? (solo el número)",
      correctAnswers: ["-1", "−1"],
      explanation: "$|A| = 6 - 5 = 1$ y $A^{-1} = \\begin{pmatrix} 3 & -1 \\\\ -5 & 2 \\end{pmatrix}$: el elemento $(1, 2)$ es $-1$.",
    },
    {
      id: "tres",
      type: "slide",
      help: [{ label: "Resultado", message: "Compara con Gauss–Jordan: el resultado es el mismo, solo cambia el camino." }],
      title: "Una inversa de orden 3",
      blocks: [
        { kind: "example", title: "$B = \\begin{pmatrix} 1 & 2 & 3 \\\\ -1 & 5 & 1 \\\\ 3 & 6 & -2 \\end{pmatrix}$", lines: [
          { math: "|B| = -10 - 18 + 6 - 45 - 4 - 6 = -77 \\neq 0" },
          { math: "\\mathrm{Adj}(B) = \\begin{pmatrix} -16 & 1 & -21 \\\\ 22 & -11 & 0 \\\\ -13 & -4 & 7 \\end{pmatrix}" },
          { math: "B^{-1} = \\dfrac{1}{-77}\\begin{pmatrix} -16 & 22 & -13 \\\\ 1 & -11 & -4 \\\\ -21 & 0 & 7 \\end{pmatrix} = \\dfrac{1}{77}\\begin{pmatrix} 16 & -22 & 13 \\\\ -1 & 11 & 4 \\\\ 21 & 0 & -7 \\end{pmatrix}" },
        ] },
      ],
      visual: { kind: "tool", tool: "matriz-inversa-explorador", initial: [3, 1, 2, 3, -1, 5, 1, 3, 6, -2], hint: "Comprueba que el determinante es −77 y que A · A⁻¹ da la identidad." },
    },
    {
      id: "check-3x3",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "El elemento $(2, 2)$ de $[\\mathrm{Adj}(B)]^t$ es $-11$; divide entre $|B| = -77$." }],
      title: "Un elemento de la inversa",
      question: "En la inversa de $B$, el elemento $(2, 2)$ vale $\\dfrac{x}{77}$. ¿Cuánto vale $x$? (solo el número)",
      correctAnswers: ["11"],
      explanation: "$\\dfrac{-11}{-77} = \\dfrac{11}{77}$, luego $x = 11$.",
    },
    {
      id: "check-existe",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Calcula el determinante de cada una: si es $0$ no hay inversa." }],
      title: "¿Cuál tiene inversa?",
      question: "¿Cuál de estas matrices **no** tiene inversa?",
      choices: [
        { id: "a", label: "$\\begin{pmatrix} 1 & 2 \\\\ 2 & 4 \\end{pmatrix}$" },
        { id: "b", label: "$\\begin{pmatrix} 1 & 2 \\\\ 2 & 5 \\end{pmatrix}$", incorrectFeedback: "$|A| = 5 - 4 = 1 \\neq 0$: sí tiene inversa." },
        { id: "c", label: "$\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$", incorrectFeedback: "$|A| = -1 \\neq 0$: sí tiene inversa (ella misma)." },
        { id: "d", label: "$\\begin{pmatrix} 3 & 0 \\\\ 0 & 2 \\end{pmatrix}$", incorrectFeedback: "$|A| = 6 \\neq 0$: su inversa es $\\mathrm{diag}(\\tfrac13, \\tfrac12)$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\begin{vmatrix} 1 & 2 \\\\ 2 & 4 \\end{vmatrix} = 4 - 4 = 0$: es singular (filas proporcionales).",
    },
    {
      id: "check-inversa-det",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$|A^{-1}| = 1/|A|$ y $|A| = -77$ para $B$. Como sale una fracción, escribe $-1/77$." }],
      title: "El determinante de la inversa",
      question: "Si $|B| = -77$, ¿cuánto vale $|B^{-1}|$? (fracción)",
      correctAnswers: ["-1/77", "−1/77"],
      explanation: "$|B^{-1}| = \\dfrac{1}{|B|} = -\\dfrac{1}{77}$.",
    },
  ],
};
