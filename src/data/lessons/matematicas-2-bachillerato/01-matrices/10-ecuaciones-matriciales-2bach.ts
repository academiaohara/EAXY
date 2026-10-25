import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_1_SUBTITLE } from "@/data/lessons/shared";

export const ecuacionesMatriciales2bachLesson: InteractiveLesson = {
  slug: "ecuaciones-matriciales-2bach",
  title: "10. Ecuaciones matriciales",
  subtitle: TEMA_2BACH_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "despejar",
      type: "slide",
      help: [{ label: "Cuidado", message: "Como el producto no conmuta, hay que multiplicar por la inversa **por el mismo lado** en los dos miembros." }],
      title: "Despejar X: multiplicar por la inversa",
      blocks: [
        { kind: "compare",
          left: { title: "$A\\,X = B$", text: "Se multiplica **por la izquierda** por $A^{-1}$:", math: ["A^{-1}A\\,X = A^{-1}B", "X = A^{-1}\\,B"] },
          right: { title: "$X\\,A = B$", text: "Se multiplica **por la derecha** por $A^{-1}$:", math: ["X\\,A\\,A^{-1} = B\\,A^{-1}", "X = B\\,A^{-1}"] } },
        { kind: "warning", text: "$A^{-1}B \\neq B\\,A^{-1}$ en general. Mira de qué lado está $A$ junto a la incógnita y multiplica por ese mismo lado." },
      ],
    },
    {
      id: "check-lado",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "$A$ está a la derecha de $X$: hay que multiplicar por $A^{-1}$ también a la derecha." }],
      title: "¿De qué lado?",
      question: "Si $X\\cdot A = B$ con $A$ regular, ¿cuánto vale $X$?",
      choices: [
        { id: "a", label: "$X = B\\cdot A^{-1}$" },
        { id: "b", label: "$X = A^{-1}\\cdot B$", incorrectFeedback: "Eso resuelve $A\\cdot X = B$. Aquí $A$ está a la derecha de $X$." },
        { id: "c", label: "$X = B - A$", incorrectFeedback: "Las matrices no se despejan restando cuando están multiplicando." },
        { id: "d", label: "$X = B / A$", incorrectFeedback: "No existe la división de matrices: se multiplica por la inversa." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$X\\,A\\,A^{-1} = B\\,A^{-1}$ y como $A\\,A^{-1} = I$, queda $X = B\\,A^{-1}$.",
    },
    {
      id: "ejemplo",
      type: "slide",
      help: [{ label: "Pasos", message: "1) comprobar que $A$ es regular; 2) calcular $A^{-1}$; 3) hacer el producto en el orden correcto." }],
      title: "Un ejemplo completo",
      blocks: [
        { kind: "example", title: "Hallar $X$ tal que $A\\,X = B$", lines: [
          { math: "A = \\begin{pmatrix} 2 & -1 \\\\ 1 & 1 \\end{pmatrix},\\qquad B = \\begin{pmatrix} 4 & 2 \\\\ 0 & -2 \\end{pmatrix}" },
          { math: "A^{-1} = \\dfrac13\\begin{pmatrix} 1 & 1 \\\\ -1 & 2 \\end{pmatrix}", note: "por Gauss–Jordan" },
          { math: "X = A^{-1}B = \\dfrac13\\begin{pmatrix} 4 & 0 \\\\ -4 & -6 \\end{pmatrix} = \\begin{pmatrix} \\tfrac43 & 0 \\\\ -\\tfrac43 & -2 \\end{pmatrix}" },
        ] },
      ],
      visual: { kind: "tool", tool: "ecuacion-matricial-explorador", initial: [0, 2, -1, 1, 1, 4, 2, 0, -2], hint: "Cambia a «X · A = B» y compara: la solución es distinta porque el producto no conmuta." },
    },
    {
      id: "check-x22",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "La segunda fila de $A^{-1}$ es $\\frac13(-1,\\ 2)$ y la segunda columna de $B$ es $(2,\\ -2)$." }],
      title: "Un elemento de la solución",
      question: "En el ejemplo anterior, ¿cuánto vale el elemento $x_{22}$ de $X = A^{-1}B$? (solo el número)",
      correctAnswers: ["-2", "−2"],
      explanation: "$x_{22} = \\frac13\\,\\big((-1)\\cdot 2 + 2\\cdot(-2)\\big) = \\frac13(-6) = -2$.",
    },
    {
      id: "con-suma",
      type: "slide",
      help: [{ label: "Orden", message: "Primero se pasa a la derecha lo que **suma** y después se multiplica por la inversa." }],
      title: "Con una suma: A·X + N = P",
      blocks: [
        { kind: "steps", items: [
          "Aísla el término con $X$: $A\\,X = P - N$.",
          "Multiplica por $A^{-1}$ por la izquierda: $X = A^{-1}(P - N)$.",
        ] },
        { kind: "example", title: "$A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 1 \\end{pmatrix}$, $N = I$, $P = \\begin{pmatrix} 5 & 3 \\\\ 2 & 3 \\end{pmatrix}$", lines: [
          { math: "P - N = \\begin{pmatrix} 4 & 3 \\\\ 2 & 2 \\end{pmatrix},\\qquad A^{-1} = \\begin{pmatrix} 1 & -1 \\\\ -1 & 2 \\end{pmatrix}" },
          { math: "X = A^{-1}(P - N) = \\begin{pmatrix} 2 & 1 \\\\ 0 & 1 \\end{pmatrix}" },
        ] },
      ],
    },
    {
      id: "check-suma",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Primera fila de $A^{-1}$ por primera columna de $P - N$: $1\\cdot 4 + (-1)\\cdot 2$." }],
      title: "Con la suma",
      question: "En el ejemplo, ¿cuánto vale el elemento $x_{11}$ de la solución $X$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$x_{11} = 1\\cdot 4 + (-1)\\cdot 2 = 2$.",
    },
    {
      id: "check-orden",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Primero hay que pasar $N$ al otro miembro; después $M^{-1}$ multiplica por la izquierda." }],
      title: "MX + N = P",
      question: "Si $M\\,X + N = P$ con $M$ regular, ¿cuánto vale $X$?",
      choices: [
        { id: "a", label: "$X = M^{-1}\\,(P - N)$" },
        { id: "b", label: "$X = (P - N)\\,M^{-1}$", incorrectFeedback: "$M$ está a la izquierda de $X$, así que $M^{-1}$ va a la izquierda." },
        { id: "c", label: "$X = M^{-1}P - N$", incorrectFeedback: "$M^{-1}$ debe multiplicar a todo el miembro $P - N$, no solo a $P$." },
        { id: "d", label: "$X = M\\,(P - N)$", incorrectFeedback: "Hay que multiplicar por la **inversa** de $M$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$M\\,X = P - N$ y, multiplicando por $M^{-1}$ por la izquierda, $X = M^{-1}(P - N)$.",
    },
  ],
};
