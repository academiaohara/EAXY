import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_2_SUBTITLE } from "@/data/lessons/shared";

export const propiedadesDet12bachLesson: InteractiveLesson = {
  slug: "propiedades-det-1-2bach",
  title: "2. Propiedades (I): traspuesta, factor común y suma de líneas",
  subtitle: TEMA_2BACH_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "traspuesta-factor",
      type: "slide",
      help: [{ label: "Línea", message: "«Línea» significa fila o columna. Gracias a la propiedad 1, todo lo que se diga de filas vale también para columnas." }],
      title: "Propiedades 1 y 2",
      blocks: [
        { kind: "rule", title: "Propiedad 1: traspuesta", text: "El determinante no cambia al trasponer:", formula: "|A| = |A^t|" },
        { kind: "rule", title: "Propiedad 2: multiplicar una línea", text: "Si todos los elementos de **una** línea se multiplican por $k$, el determinante queda multiplicado por $k$. Es decir, se puede **sacar factor común** de una línea:", formula: "\\begin{vmatrix} k\\,a & k\\,b \\\\ c & d \\end{vmatrix} = k\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}" },
      ],
      visual: { kind: "tool", tool: "determinante-propiedades-explorador", initial: [0, 2, 2, 3, 4, 1, 3, 2, 5, 1, 6], hint: "Multiplica la primera fila por k y compara con la columna «lo que predice la propiedad»." },
    },
    {
      id: "check-factor",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$|A| = -12$ y la primera fila se multiplica por $2$." }],
      title: "Multiplicar una fila",
      question: "Si $|A| = -12$ y se multiplica **una** fila de $A$ por $2$, ¿cuánto vale el determinante de la matriz nueva? (solo el número)",
      correctAnswers: ["-24", "−24"],
      explanation: "El determinante queda multiplicado por $2$: $2\\cdot(-12) = -24$.",
    },
    {
      id: "check-factor-comun",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "La primera fila de $\\begin{vmatrix} 2 & 4 & 6 \\\\ 1 & 3 & 2 \\\\ 5 & 1 & 6 \\end{vmatrix}$ es $2\\cdot(1, 2, 3)$. Saca el $2$ y calcula el determinante que queda." }],
      title: "Sacar factor común",
      question: "Sabiendo que $\\begin{vmatrix} 1 & 2 & 3 \\\\ 1 & 3 & 2 \\\\ 5 & 1 & 6 \\end{vmatrix} = -18$, calcula $\\begin{vmatrix} 2 & 4 & 6 \\\\ 1 & 3 & 2 \\\\ 5 & 1 & 6 \\end{vmatrix}$. (solo el número)",
      correctAnswers: ["-36", "−36"],
      explanation: "La primera fila tiene factor común $2$: queda $2\\cdot(-18) = -36$.",
    },
    {
      id: "suma-linea",
      type: "slide",
      help: [{ label: "Solo una línea", message: "La propiedad vale cuando solo **una** línea se descompone en suma; las demás deben ser idénticas en los dos sumandos." }],
      title: "Propiedad 3: una línea que es una suma",
      blocks: [
        { kind: "rule", text: "Si los elementos de una línea son suma de dos sumandos, el determinante es la suma de dos determinantes que tienen las demás líneas iguales:", formula: "\\begin{vmatrix} a + a' & b \\\\ c + c' & d \\end{vmatrix} = \\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} + \\begin{vmatrix} a' & b \\\\ c' & d \\end{vmatrix}" },
        { kind: "example", title: "Descomponer la 2.ª columna: $7 = 2 + 5$, $7 = 3 + 4$, $9 = 4 + 5$", lines: [
          { math: "\\begin{vmatrix} 1 & 7 & 3 \\\\ 4 & 7 & -1 \\\\ 3 & 9 & 5 \\end{vmatrix} = \\begin{vmatrix} 1 & 2 & 3 \\\\ 4 & 3 & -1 \\\\ 3 & 4 & 5 \\end{vmatrix} + \\begin{vmatrix} 1 & 5 & 3 \\\\ 4 & 4 & -1 \\\\ 3 & 5 & 5 \\end{vmatrix} = -6 + (-66) = -72" },
        ] },
        { kind: "warning", text: "$|A + B| \\neq |A| + |B|$ en general. La propiedad 3 **no** dice que el determinante sea aditivo: solo se puede separar cuando la suma afecta a **una sola línea**." },
      ],
    },
    {
      id: "check-suma",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "La 2.ª columna $(7, 7, 9)$ es $(2, 3, 4) + (5, 4, 5)$: suma los dos determinantes." }],
      title: "Sumar determinantes",
      question: "Sabiendo que $\\begin{vmatrix} 1 & 2 & 3 \\\\ 4 & 3 & -1 \\\\ 3 & 4 & 5 \\end{vmatrix} = -6$ y $\\begin{vmatrix} 1 & 5 & 3 \\\\ 4 & 4 & -1 \\\\ 3 & 5 & 5 \\end{vmatrix} = -66$, ¿cuánto vale $\\begin{vmatrix} 1 & 7 & 3 \\\\ 4 & 7 & -1 \\\\ 3 & 9 & 5 \\end{vmatrix}$? (solo el número)",
      correctAnswers: ["-72", "−72"],
      explanation: "La segunda columna $(7, 7, 9)$ es la suma de las dos columnas anteriores, y las otras dos columnas son iguales: $-6 + (-66) = -72$.",
    },
    {
      id: "check-cero",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Piensa en la propiedad 2 con $k = 0$: si una línea es toda ceros, es $0\\cdot(\\text{línea})$." }],
      title: "Una línea de ceros",
      question: "Si todos los elementos de una fila de una matriz cuadrada son $0$, su determinante…",
      choices: [
        { id: "a", label: "vale $0$" },
        { id: "b", label: "vale $1$", incorrectFeedback: "Eso ocurre con la identidad, no con una fila de ceros." },
        { id: "c", label: "depende de los demás elementos", incorrectFeedback: "Cada producto de la definición contiene un elemento de esa fila, que es $0$: todos los productos valen $0$." },
        { id: "d", label: "no se puede calcular", incorrectFeedback: "Se puede: es $0$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "En cada producto del desarrollo hay un elemento de esa fila, que es $0$. Por eso $|A| = 0$ (propiedad 4).",
    },
  ],
};
