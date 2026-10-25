import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_1_SUBTITLE } from "@/data/lessons/shared";

export const sumaEscalar2bachLesson: InteractiveLesson = {
  slug: "suma-escalar-2bach",
  title: "3. Suma de matrices y producto por un número",
  subtitle: TEMA_2BACH_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "suma",
      type: "slide",
      help: [{ label: "Condición", message: "Solo se pueden sumar matrices de la **misma dimensión**: cada elemento se suma con el que ocupa su misma posición." }],
      title: "Suma: elemento a elemento",
      blocks: [
        { kind: "rule", title: "Suma de matrices", text: "Si $A$ y $B$ son $m\\times n$, $C = A + B$ es $m\\times n$ y", formula: "c_{ij} = a_{ij} + b_{ij}" },
        { kind: "example", title: "Con números", lines: [
          { math: "\\begin{pmatrix} 1 & 2 & 4 \\\\ -1 & 3 & 2 \\end{pmatrix} + \\begin{pmatrix} 2 & -1 & 3 \\\\ -2 & 3 & 4 \\end{pmatrix} = \\begin{pmatrix} 3 & 1 & 7 \\\\ -3 & 6 & 6 \\end{pmatrix}" },
        ] },
        { kind: "text", text: "Hereda las propiedades de la suma de números: **asociativa**, **conmutativa**, con **elemento neutro** (la matriz nula $O$) y **opuesta** $-A$ tal que $A + (-A) = O$." },
      ],
    },
    {
      id: "escalar",
      type: "slide",
      help: [{ label: "Escalar", message: "«Escalar» significa simplemente «número real»." }],
      title: "Producto de un número por una matriz",
      blocks: [
        { kind: "rule", title: "Producto por un escalar", text: "El número $k$ multiplica a **todos** los elementos:", formula: "kA = (k\\,a_{ij})" },
        { kind: "facts", items: [
          { tex: "k(A + B) = kA + kB", label: "distributiva respecto de la suma de matrices" },
          { tex: "(k + l)A = kA + lA", label: "distributiva respecto de la suma de números" },
          { tex: "k(lA) = (kl)A", label: "asociativa mixta" },
          { tex: "1\\cdot A = A", label: "neutro" },
        ] },
      ],
      visual: { kind: "tool", tool: "matriz-operaciones-explorador", hint: "Cambia elementos de A y B, el número k y la operación: observa que cada elemento del resultado depende solo de los de su misma posición." },
    },
    {
      id: "check-suma",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Calcula solo la posición pedida: $2\\,a_{22} + b_{22} - 5\\,c_{22}$." }],
      title: "Combinar tres matrices",
      question: "Sean $A = \\begin{pmatrix} 2 & 1 & 0 \\\\ 9 & 0 & -3 \\\\ -2 & 0 & 7 \\end{pmatrix}$, $B = \\begin{pmatrix} 1 & 1 & 1 \\\\ 2 & 2 & -2 \\\\ -3 & 3 & 3 \\end{pmatrix}$ y $C = \\begin{pmatrix} 1 & 0 & 0 \\\\ 2 & 4 & -5 \\\\ 7 & 3 & -3 \\end{pmatrix}$. En $2A + B - 5C$, ¿cuánto vale el elemento de la fila $2$, columna $2$? (solo el número)",
      correctAnswers: ["-18", "−18"],
      explanation: "$2\\cdot 0 + 2 - 5\\cdot 4 = -18$.",
    },
    {
      id: "check-escalar",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "El elemento $(3,3)$ de $A + 3B$ es $a_{33} + 3\\,b_{33}$." }],
      title: "A + 3B",
      question: "Con las mismas $A$ y $B$, ¿cuánto vale el elemento $(3, 3)$ de $A + 3B$? (solo el número)",
      correctAnswers: ["16"],
      explanation: "$a_{33} + 3b_{33} = 7 + 3\\cdot 3 = 16$.",
    },
    {
      id: "check-condicion",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Mira las dimensiones: una es $2\\times 3$ y la otra, $3\\times 2$." }],
      title: "¿Se pueden sumar?",
      question: "¿Cuál de estas sumas **no** está definida?",
      choices: [
        { id: "a", label: "$\\begin{pmatrix} 1 & 2 & 3 \\\\ 4 & 5 & 6 \\end{pmatrix} + \\begin{pmatrix} 1 & 4 \\\\ 2 & 5 \\\\ 3 & 6 \\end{pmatrix}$" },
        { id: "b", label: "$\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix} + \\begin{pmatrix} 0 & 0 \\\\ 0 & 0 \\end{pmatrix}$", incorrectFeedback: "Ambas son $2\\times 2$: se puede sumar." },
        { id: "c", label: "$\\begin{pmatrix} 1 & 2 & 3 \\end{pmatrix} + \\begin{pmatrix} 4 & 5 & 6 \\end{pmatrix}$", incorrectFeedback: "Ambas son $1\\times 3$: se puede sumar." },
        { id: "d", label: "$3\\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$", incorrectFeedback: "Multiplicar por un número siempre se puede." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "La primera es $2\\times 3$ y la segunda $3\\times 2$: dimensiones distintas, no se suman (la segunda es la traspuesta de la primera, otra matriz).",
    },
    {
      id: "check-opuesta",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$A + (-A) = O$, luego $-A$ cambia el signo de todos los elementos." }],
      title: "La matriz opuesta",
      question: "Si $A = \\begin{pmatrix} 3 & -2 \\\\ 0 & 5 \\end{pmatrix}$, ¿cuánto vale el elemento $(1, 2)$ de $-A$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$-A$ cambia el signo de cada elemento: $-(-2) = 2$.",
    },
  ],
};
