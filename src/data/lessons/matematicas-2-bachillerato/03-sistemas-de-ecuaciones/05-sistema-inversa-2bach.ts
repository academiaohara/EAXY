import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_3_SUBTITLE } from "@/data/lessons/shared";

export const sistemaInversa2bachLesson: InteractiveLesson = {
  slug: "sistema-inversa-2bach",
  title: "5. Resolver con la matriz inversa",
  subtitle: TEMA_2BACH_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "formula",
      type: "slide",
      help: [{ label: "Orden", message: "$A^{-1}$ multiplica por la izquierda: $A^{-1}\\cdot(A\\,X) = A^{-1}\\cdot B$. No es lo mismo que $B\\cdot A^{-1}$." }],
      title: "X = A⁻¹ · B",
      blocks: [
        { kind: "rule", title: "Sistema con matriz cuadrada regular", text: "Si $A$ es cuadrada y $|A| \\neq 0$, el sistema $A\\,X = B$ tiene **una única solución**:", formula: "X = A^{-1}\\cdot B" },
        { kind: "example", title: "$2x + y = 4$, $\\ x + y = 3$", lines: [
          { math: "A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 1 \\end{pmatrix},\\quad |A| = 1,\\quad A^{-1} = \\begin{pmatrix} 1 & -1 \\\\ -1 & 2 \\end{pmatrix}" },
          { math: "X = A^{-1}B = \\begin{pmatrix} 1 & -1 \\\\ -1 & 2 \\end{pmatrix}\\begin{pmatrix} 4 \\\\ 3 \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 2 \\end{pmatrix}" },
        ] },
      ],
    },
    {
      id: "check-2x2",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$y$ es el segundo elemento: $-1\\cdot 4 + 2\\cdot 3$." }],
      title: "Aplicar la fórmula",
      question: "Con $A^{-1} = \\begin{pmatrix} 1 & -1 \\\\ -1 & 2 \\end{pmatrix}$ y $B = \\begin{pmatrix} 4 \\\\ 3 \\end{pmatrix}$, ¿cuánto vale $y$ en $X = A^{-1}B$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$y = (-1)\\cdot 4 + 2\\cdot 3 = 2$ (y $x = 1\\cdot 4 - 1\\cdot 3 = 1$).",
    },
    {
      id: "tres",
      type: "slide",
      help: [{ label: "Coste", message: "Para sistemas grandes conviene Gauss: calcular una inversa 3×3 o mayor es más trabajo que escalonar." }],
      title: "Con tres incógnitas",
      blocks: [
        { kind: "text", text: "El procedimiento es el mismo: se comprueba que $|A| \\neq 0$, se calcula $A^{-1}$ (adjuntos o Gauss–Jordan) y se multiplica por $B$. Cambia solo la cantidad de cuentas." },
        { kind: "example", title: "$x + y + z = 3$, $\\ 2x - y + z = 2$, $\\ x + 2y - 3z = 0$", lines: [
          { math: "|A| = 13 \\neq 0 \\Rightarrow \\text{solución única}" },
          { math: "X = A^{-1}B = (1,\\ 1,\\ 1)" },
        ] },
      ],
      visual: { kind: "tool", tool: "sistema-rouche-explorador", initial: [1, 1, 1, 3, 2, -1, 1, 2, 1, 2, -3, 0], hint: "Comprueba que el sistema es compatible determinado y que la solución es (1, 1, 1). Cambia un coeficiente y observa cómo cambia la solución." },
    },
    {
      id: "check-condicion",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Para existir $A^{-1}$ hace falta $|A| \\neq 0$; y $A$ debe ser cuadrada." }],
      title: "¿Cuándo se puede usar?",
      question: "¿En cuál de estos sistemas **no** se puede aplicar $X = A^{-1}B$?",
      choices: [
        { id: "a", label: "$x + y = 3$, $\\ 2x + 2y = 6$" },
        { id: "b", label: "$2x + y = 4$, $\\ x + y = 3$", incorrectFeedback: "$|A| = 1 \\neq 0$: sí se puede." },
        { id: "c", label: "$x - y = 1$, $\\ x + y = 5$", incorrectFeedback: "$|A| = 2 \\neq 0$: sí se puede." },
        { id: "d", label: "$3x = 6$, $\\ x + y = 4$", incorrectFeedback: "$|A| = 3 \\neq 0$: sí se puede." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "En $x + y = 3$, $2x + 2y = 6$ el determinante es $2 - 2 = 0$: $A$ no tiene inversa (y el sistema es indeterminado).",
    },
    {
      id: "check-x",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Calcula primero $|A|$ y después $A^{-1}$ con la fórmula de orden $2$: $\\dfrac{1}{|A|}\\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}$." }],
      title: "Un sistema completo",
      question: "Resuelve con la inversa $x + 2y = 7$, $\\ 3x - y = 7$. ¿Cuánto vale $x$? (solo el número)",
      correctAnswers: ["3"],
      explanation: "$|A| = -1 - 6 = -7$ y $A^{-1} = \\dfrac{1}{-7}\\begin{pmatrix} -1 & -2 \\\\ -3 & 1 \\end{pmatrix}$. $x = \\dfrac{-7 - 14}{-7} = 3$ y $y = \\dfrac{-21 + 7}{-7} = 2$.",
    },
  ],
};
