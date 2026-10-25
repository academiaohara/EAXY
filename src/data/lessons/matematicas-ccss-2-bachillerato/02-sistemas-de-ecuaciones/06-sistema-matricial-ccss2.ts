import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_2_SUBTITLE } from "@/data/lessons/shared";

export const sistemaMatricialCcss2Lesson: InteractiveLesson = {
  slug: "sistema-matricial-ccss2",
  title: "6. Expresión matricial, equivalentes y homogéneos",
  subtitle: TEMA_CCSS2_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "matricial",
      type: "slide",
      help: [{ label: "Dimensiones", message: "$A$ es $m\\times n$, $X$ es $n\\times 1$ y $B$ es $m\\times 1$: el producto $A\\cdot X$ es $m\\times 1$, como $B$." }],
      title: "Un sistema es un producto de matrices",
      blocks: [
        { kind: "rule", title: "Forma matricial", text: "Todo sistema lineal se escribe $A\\cdot X = B$, con la matriz de **coeficientes** $A$, la columna de **incógnitas** $X$ y la columna de **términos independientes** $B$:", formula: "\\begin{pmatrix} a_{11} & a_{12} \\\\ a_{21} & a_{22} \\end{pmatrix}\\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} b_1 \\\\ b_2 \\end{pmatrix}" },
        { kind: "definition", text: "La **matriz ampliada** $A^* = (A\\,|\\,B)$ añade a $A$ la columna de términos independientes. Contiene toda la información del sistema." },
      ],
      visual: { kind: "anim", scene: "sistema-forma-matricial" },
    },
    {
      id: "check-dimension",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "$m$ ecuaciones son $m$ filas; $n$ incógnitas son $n$ columnas." }],
      title: "Dimensión de la matriz de coeficientes",
      question: "El sistema $2x + 3y - z = 1$, $\\ x - y + 4z = 7$ tiene $2$ ecuaciones y $3$ incógnitas. ¿Qué dimensión tiene su matriz de coeficientes $A$?",
      choices: [
        { id: "a", label: "$2\\times 3$" },
        { id: "b", label: "$3\\times 2$", incorrectFeedback: "Las filas son las ecuaciones (2) y las columnas las incógnitas (3)." },
        { id: "c", label: "$2\\times 4$", incorrectFeedback: "Esa es la dimensión de la matriz ampliada $A^*$, que tiene una columna más." },
        { id: "d", label: "$3\\times 3$", incorrectFeedback: "Solo habría matriz cuadrada si hubiera tantas ecuaciones como incógnitas." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$A = \\begin{pmatrix} 2 & 3 & -1 \\\\ 1 & -1 & 4 \\end{pmatrix}$ es $2\\times 3$; la ampliada $A^* = \\left(\\begin{array}{ccc|c} 2 & 3 & -1 & 1 \\\\ 1 & -1 & 4 & 7 \\end{array}\\right)$ es $2\\times 4$.",
    },
    {
      id: "check-ampliada",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "El elemento $(2, 4)$ está en la 2.ª fila y en la última columna, la de los términos independientes." }],
      title: "Leer la matriz ampliada",
      question: "En la matriz ampliada del sistema anterior, ¿cuánto vale el elemento $(2, 4)$? (solo el número)",
      correctAnswers: ["7"],
      explanation: "La columna $4$ es la de los términos independientes; en la fila $2$ está el $7$.",
    },
    {
      id: "equivalentes",
      type: "slide",
      help: [{ label: "Idea", message: "Resolver un sistema suele consistir en transformarlo en otro equivalente cada vez más sencillo." }],
      title: "Sistemas equivalentes y homogéneos",
      blocks: [
        { kind: "definition", text: "Dos sistemas son **equivalentes** si tienen **las mismas soluciones**. Se obtiene un sistema equivalente al intercambiar dos ecuaciones, multiplicar una por un número **distinto de cero**, sumarle un múltiplo de otra, o suprimir una ecuación que sea combinación de las demás." },
        { kind: "definition", text: "Un sistema es **homogéneo** si todos sus términos independientes son $0$ ($B = O$). Siempre es compatible: admite la **solución trivial** $x_1 = x_2 = \\dots = x_n = 0$." },
      ],
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Una operación conserva las soluciones si se puede deshacer: multiplicar por $0$ o elevar al cuadrado no se puede deshacer." }],
      title: "¿Conserva las soluciones?",
      question: "Clasifica cada operación sobre las ecuaciones de un sistema.",
      groups: [
        { id: "si", label: "Da un sistema equivalente", tone: "emerald" },
        { id: "no", label: "Puede cambiar las soluciones", tone: "rose" },
      ],
      items: [
        { id: "a", text: "Intercambiar dos ecuaciones", group: "si" },
        { id: "b", text: "Multiplicar una ecuación por $-3$", group: "si" },
        { id: "c", text: "Sumar a una ecuación el doble de otra", group: "si" },
        { id: "d", text: "Multiplicar una ecuación por $0$", group: "no" },
        { id: "e", text: "Elevar al cuadrado los dos miembros de una ecuación", group: "no" },
        { id: "f", text: "Suprimir una ecuación que es suma de otras dos", group: "si" },
      ],
      hint: "Si la operación se puede invertir sin perder información, las soluciones son las mismas. Multiplicar por $0$ destruye la ecuación.",
    },
  ],
};
