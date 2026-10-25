import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_2_SUBTITLE } from "@/data/lessons/shared";

export const rangoMenores2bachLesson: InteractiveLesson = {
  slug: "rango-menores-2bach",
  title: "11. Rango por menores",
  subtitle: TEMA_2BACH_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [{ label: "Menor", message: "Un menor de orden $k$ se forma con $k$ filas y $k$ columnas cualesquiera (no tienen que ser seguidas)." }],
      title: "Menores y rango",
      blocks: [
        { kind: "definition", text: "Un **menor de orden $k$** de una matriz $m\\times n$ es el determinante de la submatriz formada por la intersección de $k$ filas y $k$ columnas." },
        { kind: "rule", title: "Rango", text: "El **rango** es el orden del mayor menor **distinto de cero**:", formula: "\\operatorname{rg}(A) = k \\iff \\text{hay un menor de orden } k \\text{ no nulo y todos los de orden } k + 1 \\text{ son nulos}" },
        { kind: "text", text: "Si todos los menores de un orden son nulos, también lo son los de órdenes superiores." },
      ],
      visual: { kind: "tool", tool: "rango-menores-explorador", initial: [1, 3, 1, -2, 1, 4, 3, -1, 2, 3, -4, -7], hint: "Esta matriz tiene todos los menores de orden 3 nulos y alguno de orden 2 no nulo: rango 2. Cambia un elemento y mira cómo aparece algún menor de orden 3 no nulo." },
    },
    {
      id: "check-rango-2",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "El menor $\\begin{vmatrix} 1 & 3 \\\\ 0 & -2 \\end{vmatrix} = -2 \\neq 0$ ya da rango $2$, y una matriz con solo $2$ columnas no puede tener más." }],
      title: "Una matriz 4×2",
      question: "¿Cuál es el rango de $\\begin{pmatrix} 1 & 3 \\\\ 0 & -2 \\\\ 5 & -1 \\\\ -2 & 3 \\end{pmatrix}$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "Tiene un menor de orden $2$ no nulo, $\\begin{vmatrix} 1 & 3 \\\\ 0 & -2 \\end{vmatrix} = -2$, y no puede haber menores de orden $3$ (solo tiene $2$ columnas).",
    },
    {
      id: "metodo",
      type: "slide",
      help: [{ label: "Orlar", message: "«Orlar» un menor es añadirle una fila y una columna para obtener un menor de orden mayor." }],
      title: "Método de los menores orlados",
      blocks: [
        { kind: "steps", items: [
          "Busca un elemento no nulo: el rango es al menos $1$.",
          "Con él, forma menores de orden $2$ **orlándolo** con otra fila y otra columna. Si encuentras uno no nulo, $\\operatorname{rg} \\geq 2$.",
          "Con ese menor, forma menores de orden $3$ añadiendo una fila y una columna, y así sucesivamente.",
          "Si **todos** los menores orlados de orden $k + 1$ son nulos, el rango es $k$.",
        ] },
        { kind: "example", title: "$B = \\begin{pmatrix} 1 & 2 & -3 \\\\ 2 & 1 & 0 \\\\ -2 & -1 & 3 \\\\ -1 & 4 & -2 \\end{pmatrix}$", lines: [
          { math: "\\begin{vmatrix} 1 & 2 \\\\ 2 & 1 \\end{vmatrix} = -3 \\neq 0 \\Rightarrow \\operatorname{rg} \\geq 2" },
          { math: "\\begin{vmatrix} 1 & 2 & -3 \\\\ 2 & 1 & 0 \\\\ -2 & -1 & 3 \\end{vmatrix} = -9 \\neq 0 \\Rightarrow \\operatorname{rg}(B) = 3", note: "máximo posible: solo tiene 3 columnas" },
        ] },
      ],
    },
    {
      id: "check-rango-3",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Calcula el menor de orden 3 formado por las tres primeras filas. Si da $0$, prueba con otras filas." }],
      title: "Rango de una 4×3",
      question: "¿Cuál es el rango de $\\begin{pmatrix} 1 & 2 & -3 \\\\ 2 & 1 & 0 \\\\ -2 & -1 & 3 \\\\ -1 & 4 & -2 \\end{pmatrix}$? (solo el número)",
      correctAnswers: ["3"],
      explanation: "El menor de las tres primeras filas vale $-9$, luego el rango es $3$ (el máximo, pues tiene $3$ columnas).",
    },
    {
      id: "check-menores",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Si todos los menores de orden 3 son $0$, ¿puede haber uno de orden 4 distinto de $0$?" }],
      title: "Cuando todos los menores se anulan",
      question: "En una matriz $4\\times 4$, todos los menores de orden $3$ valen $0$ y uno de orden $2$ no vale $0$. Su rango es…",
      choices: [
        { id: "a", label: "$2$" },
        { id: "b", label: "$3$", incorrectFeedback: "Rango $3$ exigiría algún menor de orden $3$ no nulo." },
        { id: "c", label: "$4$", incorrectFeedback: "Si los menores de orden $3$ son nulos, el de orden $4$ (que se desarrolla con ellos) también." },
        { id: "d", label: "$1$", incorrectFeedback: "Un menor de orden $2$ no nulo implica rango al menos $2$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "El mayor menor no nulo es de orden $2$, así que $\\operatorname{rg} = 2$.",
    },
    {
      id: "check-cota",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "La tercera columna es $C_1 + C_2$; el rango no sube de $2$." }],
      title: "Combinando columnas",
      question: "¿Cuál es el rango de $\\begin{pmatrix} 1 & 0 & 1 \\\\ 0 & 1 & 1 \\\\ 2 & 3 & 5 \\end{pmatrix}$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "Su determinante es $0$ (la tercera columna es $C_1 + C_2$) pero $\\begin{vmatrix} 1 & 0 \\\\ 0 & 1 \\end{vmatrix} = 1 \\neq 0$: rango $2$.",
    },
  ],
};
