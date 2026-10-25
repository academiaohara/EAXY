import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_2_SUBTITLE } from "@/data/lessons/shared";

export const matrizAdjunta2bachLesson: InteractiveLesson = {
  slug: "matriz-adjunta-2bach",
  title: "9. La matriz adjunta",
  subtitle: TEMA_2BACH_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [{ label: "Pasos", message: "Cada posición de $\\mathrm{Adj}(A)$ lleva el adjunto del elemento que ocupa esa posición en $A$." }],
      title: "La matriz de los adjuntos",
      blocks: [
        { kind: "definition", text: "La **matriz adjunta** $\\mathrm{Adj}(A)$ es la matriz formada por los **adjuntos** de todos los elementos de $A$." },
        { kind: "example", title: "$A = \\begin{pmatrix} 2 & 5 \\\\ 1 & 4 \\end{pmatrix}$", lines: [
          { math: "\\mathrm{Adj}(A) = \\begin{pmatrix} +4 & -1 \\\\ -5 & +2 \\end{pmatrix}" },
          { math: "A\\cdot[\\mathrm{Adj}(A)]^t = \\begin{pmatrix} 2 & 5 \\\\ 1 & 4 \\end{pmatrix}\\begin{pmatrix} 4 & -5 \\\\ -1 & 2 \\end{pmatrix} = \\begin{pmatrix} 3 & 0 \\\\ 0 & 3 \\end{pmatrix} = |A|\\cdot I", note: "$|A| = 3$" },
        ] },
        { kind: "text", text: "Ocurre siempre: al multiplicar $A$ por la traspuesta de su adjunta, en la diagonal aparece $|A|$ (desarrollo por adjuntos) y fuera de ella $0$ (una fila por adjuntos de otra fila repite líneas)." },
      ],
      visual: { kind: "tool", tool: "adjunta-explorador", initial: [3, 1, 2, 3, -1, 5, 1, 3, 6, -2], hint: "Cambia cualquier elemento: el producto A·Adj(A)ᵗ siempre tiene |A| en la diagonal y ceros fuera." },
    },
    {
      id: "check-adj-2x2",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "El adjunto de $a_{11} = 1$ es $+4$; el de $a_{12} = 2$ es $-3$." }],
      title: "Adjunta de una 2×2",
      question: "Para $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$, ¿cuánto vale el elemento $(1, 2)$ de $\\mathrm{Adj}(A)$? (solo el número)",
      correctAnswers: ["-3", "−3"],
      explanation: "$A_{12} = (-1)^{1+2}\\cdot a_{21} = -3$. La adjunta es $\\begin{pmatrix} 4 & -3 \\\\ -2 & 1 \\end{pmatrix}$.",
    },
    {
      id: "check-adj-3x3",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Tacha la fila 2 y la columna 2 de $C = \\begin{pmatrix} 2 & -1 & 0 \\\\ -1 & 0 & 2 \\\\ 1 & 1 & 1 \\end{pmatrix}$: queda $\\begin{pmatrix} 2 & 0 \\\\ 1 & 1 \\end{pmatrix}$." }],
      title: "Un adjunto de una 3×3",
      question: "Para $C = \\begin{pmatrix} 2 & -1 & 0 \\\\ -1 & 0 & 2 \\\\ 1 & 1 & 1 \\end{pmatrix}$, ¿cuánto vale $A_{22}$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$A_{22} = (+)\\begin{vmatrix} 2 & 0 \\\\ 1 & 1 \\end{vmatrix} = 2$.",
    },
    {
      id: "check-producto",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "El determinante de $C$ es $-7$: $C\\cdot[\\mathrm{Adj}(C)]^t = |C|\\cdot I$." }],
      title: "El producto con la traspuesta de la adjunta",
      question: "Para la matriz $C$ anterior, $|C| = -7$. ¿Cuánto vale el elemento $(2, 2)$ de $C\\cdot[\\mathrm{Adj}(C)]^t$? (solo el número)",
      correctAnswers: ["-7", "−7"],
      explanation: "$C\\cdot[\\mathrm{Adj}(C)]^t = |C|\\cdot I = -7\\cdot I$: el elemento $(2, 2)$ vale $-7$ y los de fuera de la diagonal valen $0$.",
    },
    {
      id: "check-signos",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "En la adjunta cada elemento lleva su signo del tablero." }],
      title: "Adjunta de una 2×2 en general",
      question: "Si $A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$, entonces $\\mathrm{Adj}(A)$ es…",
      choices: [
        { id: "a", label: "$\\begin{pmatrix} d & -c \\\\ -b & a \\end{pmatrix}$" },
        { id: "b", label: "$\\begin{pmatrix} d & c \\\\ b & a \\end{pmatrix}$", incorrectFeedback: "Falta cambiar el signo de los elementos de la diagonal secundaria, que tienen $i + j$ impar." },
        { id: "c", label: "$\\begin{pmatrix} a & -b \\\\ -c & d \\end{pmatrix}$", incorrectFeedback: "El adjunto de $a$ es el menor que queda al tachar su fila y columna, es decir $d$." },
        { id: "d", label: "$\\begin{pmatrix} -d & c \\\\ b & -a \\end{pmatrix}$", incorrectFeedback: "El adjunto de $a_{11}$ lleva signo $+$ y vale $d$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$A_{11} = d$, $A_{12} = -c$, $A_{21} = -b$ y $A_{22} = a$. La traspuesta $\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$ será clave para la inversa.",
    },
  ],
};
