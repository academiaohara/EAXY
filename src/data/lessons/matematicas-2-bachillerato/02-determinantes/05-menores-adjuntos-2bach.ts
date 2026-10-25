import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_2_SUBTITLE } from "@/data/lessons/shared";

export const menoresAdjuntos2bachLesson: InteractiveLesson = {
  slug: "menores-adjuntos-2bach",
  title: "5. Menor complementario y adjunto",
  subtitle: TEMA_2BACH_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definiciones",
      type: "slide",
      help: [{ label: "Signo", message: "$(-1)^{i+j}$ vale $+1$ si $i + j$ es par y $-1$ si es impar." }],
      title: "Tachar una fila y una columna",
      blocks: [
        { kind: "definition", text: "El **menor complementario** $\\alpha_{ij}$ de un elemento $a_{ij}$ es el determinante de orden $n - 1$ que queda al **eliminar la fila $i$ y la columna $j$**." },
        { kind: "rule", title: "Adjunto", text: "El **adjunto** $A_{ij}$ es el menor complementario con un signo que depende de la posición:", formula: "A_{ij} = (-1)^{i+j}\\,\\alpha_{ij}" },
      ],
      visual: { kind: "anim", scene: "matriz-menor-adjunto", params: { a: 1, b: 2 } },
    },
    {
      id: "check-menor",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "En $B = \\begin{pmatrix} 1 & 2 & 3 \\\\ -1 & 5 & 1 \\\\ 3 & 6 & -2 \\end{pmatrix}$, tacha la fila 2 y la columna 2: queda $\\begin{pmatrix} 1 & 3 \\\\ 3 & -2 \\end{pmatrix}$." }],
      title: "Menor complementario",
      question: "Para $B = \\begin{pmatrix} 1 & 2 & 3 \\\\ -1 & 5 & 1 \\\\ 3 & 6 & -2 \\end{pmatrix}$, ¿cuánto vale el menor complementario $\\alpha_{22}$? (solo el número)",
      correctAnswers: ["-11", "−11"],
      explanation: "$\\alpha_{22} = \\begin{vmatrix} 1 & 3 \\\\ 3 & -2 \\end{vmatrix} = -2 - 9 = -11$.",
    },
    {
      id: "check-signo",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Mira la suma de los subíndices: $3 + 2 = 5$." }],
      title: "Signo del adjunto",
      question: "El adjunto $A_{32}$ de un elemento de una matriz de orden $3$ es…",
      choices: [
        { id: "a", label: "el menor $\\alpha_{32}$ con el signo cambiado" },
        { id: "b", label: "igual al menor $\\alpha_{32}$", incorrectFeedback: "$3 + 2 = 5$ es impar: el signo es $-$." },
        { id: "c", label: "igual al menor $\\alpha_{23}$", incorrectFeedback: "No se intercambian los subíndices: se elimina la fila 3 y la columna 2." },
        { id: "d", label: "siempre positivo", incorrectFeedback: "El signo depende de la posición: $(-1)^{3+2} = -1$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$A_{32} = (-1)^{3+2}\\,\\alpha_{32} = -\\alpha_{32}$.",
    },
    {
      id: "check-adjunto",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Tacha la fila 2 y la columna 1 de $B$: queda $\\begin{pmatrix} 2 & 3 \\\\ 6 & -2 \\end{pmatrix}$. Después aplica el signo $(-1)^{2+1}$." }],
      title: "Calcular un adjunto",
      question: "Con la misma $B$, ¿cuánto vale el adjunto $A_{21}$? (solo el número)",
      correctAnswers: ["22"],
      explanation: "$\\alpha_{21} = \\begin{vmatrix} 2 & 3 \\\\ 6 & -2 \\end{vmatrix} = -4 - 18 = -22$ y $A_{21} = (-1)^{3}\\cdot(-22) = 22$.",
    },
    {
      id: "tablero",
      type: "slide",
      help: [{ label: "Truco", message: "No hace falta calcular el exponente: basta alternar los signos empezando por $+$ en la esquina superior izquierda." }],
      title: "Los signos forman un tablero de ajedrez",
      blocks: [
        { kind: "formula", tex: "\\begin{pmatrix} + & - & + & - \\\\ - & + & - & + \\\\ + & - & + & - \\\\ - & + & - & + \\end{pmatrix}" },
        { kind: "text", text: "El signo del adjunto de $a_{ij}$ es el que ocupa esa casilla del tablero. Así, $A_{12} = -\\alpha_{12}$ y $A_{33} = +\\alpha_{33}$." },
      ],
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Suma los subíndices: par ⟹ $A_{ij} = \\alpha_{ij}$; impar ⟹ $A_{ij} = -\\alpha_{ij}$." }],
      title: "Mismo signo o signo cambiado",
      question: "Para cada elemento de una matriz de orden $4$, indica cómo es su adjunto respecto del menor complementario.",
      groups: [
        { id: "igual", label: "$A_{ij} = \\alpha_{ij}$", tone: "emerald" },
        { id: "opuesto", label: "$A_{ij} = -\\alpha_{ij}$", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$a_{11}$", group: "igual" },
        { id: "b", text: "$a_{14}$", group: "opuesto" },
        { id: "c", text: "$a_{23}$", group: "opuesto" },
        { id: "d", text: "$a_{22}$", group: "igual" },
        { id: "e", text: "$a_{42}$", group: "opuesto" },
        { id: "f", text: "$a_{44}$", group: "igual" },
      ],
      hint: "$1 + 4 = 5$, $2 + 3 = 5$ y $4 + 2 = 6$: la paridad de $i + j$ decide el signo.",
    },
  ],
};
