import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_1_SUBTITLE } from "@/data/lessons/shared";

export const rangoMatriz2bachLesson: InteractiveLesson = {
  slug: "rango-matriz-2bach",
  title: "11. Rango de una matriz",
  subtitle: TEMA_2BACH_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [{ label: "Independiente", message: "Una fila es **dependiente** si se obtiene sumando múltiplos de otras filas; si no, es independiente." }],
      title: "Cuántas filas aportan información",
      blocks: [
        { kind: "definition", text: "El **rango** de una matriz es el número de filas (o de columnas) **linealmente independientes**, es decir, que no se pueden obtener a partir de las demás." },
        { kind: "example", title: "$A = \\begin{pmatrix} 0 & 1 & -3 \\\\ -1 & 0 & -4 \\\\ -1 & 1 & -7 \\end{pmatrix}$", lines: [
          { math: "F_3 = F_1 + F_2", note: "la 3.ª fila depende de las otras dos" },
          { math: "\\operatorname{rg}(A) = 2", note: "$F_1$ y $F_2$ son independientes" },
        ] },
        { kind: "rule", title: "Cota", text: "El rango de una matriz $m\\times n$ nunca supera el menor de $m$ y $n$:", formula: "\\operatorname{rg}(A) \\leq \\min(m, n)" },
      ],
    },
    {
      id: "gauss",
      type: "slide",
      help: [{ label: "Por qué", message: "Las operaciones elementales no cambian el rango: solo combinan filas de forma reversible." }],
      title: "Calcular el rango escalonando",
      blocks: [
        { kind: "text", text: "Se hacen **ceros** con operaciones elementales hasta obtener una matriz escalonada: el rango es el número de **filas no nulas**." },
      ],
      visual: { kind: "anim", scene: "matriz-rango-gauss", params: { nums: [0, 1, -3, -1, 0, -4, -1, 1, -7] } },
    },
    {
      id: "check-rango",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Fíjate en la relación entre filas: $F_2 = 2F_1$ y $F_3 = 3F_1$." }],
      title: "Filas proporcionales",
      question: "¿Cuál es el rango de $\\begin{pmatrix} 1 & 1 & 1 \\\\ 2 & 2 & 2 \\\\ 3 & 3 & 3 \\end{pmatrix}$? (solo el número)",
      correctAnswers: ["1"],
      explanation: "Las tres filas son múltiplos de $(1, 1, 1)$: solo una es independiente. El rango es $1$.",
    },
    {
      id: "check-rango-dos",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Compara la tercera fila con la primera." }],
      title: "Una fila dependiente",
      question: "¿Cuál es el rango de $\\begin{pmatrix} 2 & 1 & 0 \\\\ 9 & 0 & -3 \\\\ -2 & -1 & 0 \\end{pmatrix}$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$F_3 = -F_1$, así que sobra. $F_1$ y $F_2$ no son proporcionales: rango $2$.",
    },
    {
      id: "parametro",
      type: "slide",
      help: [{ label: "Idea", message: "Se busca para qué valores del parámetro aparece una fila de ceros al escalonar." }],
      title: "Rango según un parámetro",
      blocks: [
        { kind: "example", title: "$A = \\begin{pmatrix} a - 2 & a + 2 \\\\ 1 & 2 \\end{pmatrix}$", lines: [
          { math: "F_1 \\leftrightarrow F_2 \\Rightarrow \\begin{pmatrix} 1 & 2 \\\\ a - 2 & a + 2 \\end{pmatrix}" },
          { math: "F_2 \\to F_2 - (a - 2)F_1 \\Rightarrow \\begin{pmatrix} 1 & 2 \\\\ 0 & 6 - a \\end{pmatrix}" },
          { math: "6 - a = 0 \\iff a = 6", note: "solo entonces la segunda fila es nula" },
        ] },
        { kind: "rule", title: "Conclusión", text: "$\\operatorname{rg}(A) = 1$ si $a = 6$ y $\\operatorname{rg}(A) = 2$ si $a \\neq 6$." },
      ],
    },
    {
      id: "check-parametro",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Las dos filas deben ser proporcionales: $(1, 2)$ y $(a, 6)$, luego $a/1 = 6/2$." }],
      title: "Parámetro que baja el rango",
      question: "¿Para qué valor de $a$ la matriz $\\begin{pmatrix} 1 & 2 \\\\ a & 6 \\end{pmatrix}$ tiene rango $1$? (solo el número)",
      correctAnswers: ["3"],
      explanation: "Rango $1$ si $(a, 6)$ es múltiplo de $(1, 2)$: $a = 3$. Con escalonado: $F_2 \\to F_2 - aF_1 = (0,\\ 6 - 2a)$, que es nula si $a = 3$.",
    },
    {
      id: "check-cota",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "El rango no puede superar ni el número de filas ni el de columnas." }],
      title: "¿Cuál es imposible?",
      question: "Una matriz de dimensión $3\\times 5$ **no** puede tener rango…",
      choices: [
        { id: "a", label: "$4$" },
        { id: "b", label: "$0$", incorrectFeedback: "El rango $0$ es posible: es la matriz nula." },
        { id: "c", label: "$3$", incorrectFeedback: "Es el máximo posible: $\\min(3, 5) = 3$." },
        { id: "d", label: "$1$", incorrectFeedback: "Es posible, por ejemplo con tres filas proporcionales." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\operatorname{rg}(A) \\leq \\min(3, 5) = 3$: con solo $3$ filas no puede haber $4$ independientes.",
    },
  ],
};
