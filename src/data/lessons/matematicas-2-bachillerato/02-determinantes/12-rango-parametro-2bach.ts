import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_2_SUBTITLE } from "@/data/lessons/shared";

export const rangoParametro2bachLesson: InteractiveLesson = {
  slug: "rango-parametro-2bach",
  title: "12. Rango según un parámetro",
  subtitle: TEMA_2BACH_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "metodo",
      type: "slide",
      help: [{ label: "Por qué", message: "El rango baja justo cuando el menor de mayor orden se anula. Hay que estudiar esos valores del parámetro por separado." }],
      title: "Un caso general y casos especiales",
      blocks: [
        { kind: "steps", title: "Método", items: [
          "Calcula el determinante (o los menores del mayor orden) en función del parámetro $a$.",
          "Resuelve $|A| = 0$: esos son los valores **especiales**.",
          "Para el resto de valores, el rango es el máximo posible.",
          "Para cada valor especial, sustituye en la matriz y calcula su rango a mano.",
        ] },
        { kind: "example", title: "$A = \\begin{pmatrix} a & 1 & 1 \\\\ 1 & a & 1 \\\\ 1 & 1 & a \\end{pmatrix}$, $|A| = (a - 1)^2(a + 2)$", lines: [
          { math: "a \\neq 1,\\ a \\neq -2 \\Rightarrow \\operatorname{rg}(A) = 3" },
          { math: "a = 1: \\begin{pmatrix} 1 & 1 & 1 \\\\ 1 & 1 & 1 \\\\ 1 & 1 & 1 \\end{pmatrix} \\Rightarrow \\operatorname{rg}(A) = 1" },
          { math: "a = -2: \\begin{pmatrix} -2 & 1 & 1 \\\\ 1 & -2 & 1 \\\\ 1 & 1 & -2 \\end{pmatrix},\\ \\begin{vmatrix} -2 & 1 \\\\ 1 & -2 \\end{vmatrix} = 3 \\neq 0 \\Rightarrow \\operatorname{rg}(A) = 2" },
        ] },
      ],
      visual: { kind: "tool", tool: "determinante-parametro-explorador", initial: [0, 1], hint: "Recorre a de −5 a 5: el rango es 3 salvo en a = 1 (rango 1) y a = −2 (rango 2)." },
    },
    {
      id: "check-especial",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Con $a = 1$ todas las filas son $(1, 1, 1)$." }],
      title: "Un valor especial",
      question: "Para $A = \\begin{pmatrix} a & 1 & 1 \\\\ 1 & a & 1 \\\\ 1 & 1 & a \\end{pmatrix}$ y $a = 1$, ¿cuál es el rango? (solo el número)",
      correctAnswers: ["1"],
      explanation: "Con $a = 1$ las tres filas son iguales a $(1, 1, 1)$: solo una es independiente, rango $1$.",
    },
    {
      id: "check-segundo-especial",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "El menor $\\begin{vmatrix} -2 & 1 \\\\ 1 & -2 \\end{vmatrix} = 3$ no es nulo, pero el determinante completo sí." }],
      title: "El otro valor especial",
      question: "Con la misma matriz y $a = -2$, ¿cuál es el rango? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$|A| = 0$ para $a = -2$ pero hay un menor de orden $2$ no nulo ($3$): rango $2$. Las tres filas suman $(0, 0, 0)$, luego una es combinación de las otras.",
    },
    {
      id: "otro",
      type: "slide",
      help: [{ label: "Triangular", message: "En una matriz triangular el determinante es el producto de la diagonal: los valores especiales se leen directamente." }],
      title: "Otro ejemplo: una matriz triangular",
      blocks: [
        { kind: "example", title: "$M = \\begin{pmatrix} a & 1 & 1 \\\\ 0 & a & 1 \\\\ 0 & 0 & a - 2 \\end{pmatrix}$, $|M| = a^2(a - 2)$", lines: [
          { math: "a \\neq 0,\\ a \\neq 2 \\Rightarrow \\operatorname{rg}(M) = 3" },
          { math: "a = 0: \\begin{pmatrix} 0 & 1 & 1 \\\\ 0 & 0 & 1 \\\\ 0 & 0 & -2 \\end{pmatrix}",  note: "la primera columna es nula; el menor $\\begin{vmatrix} 1 & 1 \\\\ 0 & 1 \\end{vmatrix} = 1 \\neq 0$, rango $2$" },
          { math: "a = 2: \\begin{pmatrix} 2 & 1 & 1 \\\\ 0 & 2 & 1 \\\\ 0 & 0 & 0 \\end{pmatrix}", note: "fila de ceros; $\\begin{vmatrix} 2 & 1 \\\\ 0 & 2 \\end{vmatrix} = 4 \\neq 0$, rango $2$" },
        ] },
      ],
      visual: { kind: "tool", tool: "determinante-parametro-explorador", initial: [1, 2], hint: "Cambia a la familia «Fila proporcional» y busca el valor de a en el que el rango baja a 2." },
    },
    {
      id: "check-proporcional",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$|N| = 6 - 2a$ para $N = \\begin{pmatrix} 1 & 2 & a \\\\ 2 & 4 & 6 \\\\ 1 & 1 & 1 \\end{pmatrix}$. Iguala a $0$." }],
      title: "¿Cuándo baja el rango?",
      question: "Para $N = \\begin{pmatrix} 1 & 2 & a \\\\ 2 & 4 & 6 \\\\ 1 & 1 & 1 \\end{pmatrix}$, ¿para qué valor de $a$ el rango es menor que $3$? (solo el número)",
      correctAnswers: ["3"],
      explanation: "$|N| = 6 - 2a = 0 \\Rightarrow a = 3$. Con $a = 3$ las dos primeras filas, $(1, 2, 3)$ y $(2, 4, 6)$, son proporcionales: rango $2$.",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Usa las conclusiones de las diapositivas anteriores." }],
      title: "¿Qué rango tiene?",
      question: "Clasifica cada caso (con las matrices de esta lección).",
      groups: [
        { id: "r1", label: "Rango 1", tone: "rose" },
        { id: "r2", label: "Rango 2", tone: "amber" },
        { id: "r3", label: "Rango 3", tone: "emerald" },
      ],
      items: [
        { id: "a", text: "$\\begin{pmatrix} a & 1 & 1 \\\\ 1 & a & 1 \\\\ 1 & 1 & a \\end{pmatrix}$ con $a = 1$", group: "r1" },
        { id: "b", text: "$\\begin{pmatrix} a & 1 & 1 \\\\ 1 & a & 1 \\\\ 1 & 1 & a \\end{pmatrix}$ con $a = -2$", group: "r2" },
        { id: "c", text: "$\\begin{pmatrix} a & 1 & 1 \\\\ 1 & a & 1 \\\\ 1 & 1 & a \\end{pmatrix}$ con $a = 3$", group: "r3" },
        { id: "d", text: "$\\begin{pmatrix} a & 1 & 1 \\\\ 0 & a & 1 \\\\ 0 & 0 & a - 2 \\end{pmatrix}$ con $a = 0$", group: "r2" },
        { id: "e", text: "$\\begin{pmatrix} a & 1 & 1 \\\\ 0 & a & 1 \\\\ 0 & 0 & a - 2 \\end{pmatrix}$ con $a = 5$", group: "r3" },
      ],
      hint: "Compara cada valor con las raíces del determinante: $a = 1$ y $a = -2$ para la primera matriz; $a = 0$ y $a = 2$ para la triangular.",
    },
  ],
};
