import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_2_SUBTITLE } from "@/data/lessons/shared";

export const desarrolloAdjuntos2bachLesson: InteractiveLesson = {
  slug: "desarrollo-adjuntos-2bach",
  title: "6. Desarrollo por los adjuntos de una línea",
  subtitle: TEMA_2BACH_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "regla",
      type: "slide",
      help: [{ label: "Cualquier línea", message: "Vale una fila o una columna cualquiera: en orden 3 hay seis formas de calcular el mismo número." }],
      title: "Sumar elemento por adjunto",
      blocks: [
        { kind: "rule", title: "Desarrollo por la fila $i$", text: "El determinante es la suma de los productos de los elementos de **una línea** por sus adjuntos:", formula: "|A| = a_{i1}A_{i1} + a_{i2}A_{i2} + \\dots + a_{in}A_{in}" },
        { kind: "text", text: "Esto reduce un determinante de orden $n$ a $n$ determinantes de orden $n - 1$. Conviene elegir la línea con **más ceros**: cada cero evita calcular un adjunto." },
      ],
      visual: { kind: "anim", scene: "determinante-adjuntos", params: { nums: [3, 1, 5, 2, 0, 3, 5, 7, 2], a: 2 } },
    },
    {
      id: "check-desarrollo",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Por la columna 2: $a_{32} = 4$ con signo $(-1)^{3+2} = -$, y su menor es $\\begin{vmatrix} 1 & 2 \\\\ 3 & 1 \\end{vmatrix}$." }],
      title: "Elegir la línea con ceros",
      question: "Calcula $\\begin{vmatrix} 1 & 0 & 2 \\\\ 3 & 0 & 1 \\\\ 2 & 4 & 5 \\end{vmatrix}$ desarrollando por la segunda columna. (solo el número)",
      correctAnswers: ["20"],
      explanation: "Solo sobrevive $a_{32} = 4$: $4\\cdot A_{32} = 4\\cdot(-1)^{5}\\begin{vmatrix} 1 & 2 \\\\ 3 & 1 \\end{vmatrix} = -4\\cdot(1 - 6) = 20$.",
    },
    {
      id: "check-linea",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Cuantos más ceros haya en la línea elegida, menos adjuntos hay que calcular." }],
      title: "¿Qué línea conviene?",
      question: "Para calcular $\\begin{vmatrix} 3 & 0 & 5 \\\\ 2 & 7 & 0 \\\\ 4 & 0 & 1 \\end{vmatrix}$ por adjuntos, ¿qué línea es la más cómoda?",
      choices: [
        { id: "a", label: "La columna $2$: solo tiene un elemento distinto de cero" },
        { id: "b", label: "La fila $1$", incorrectFeedback: "Tiene un cero, pero la columna 2 tiene dos." },
        { id: "c", label: "La columna $1$", incorrectFeedback: "No tiene ningún cero: obliga a calcular tres adjuntos." },
        { id: "d", label: "Da igual: salen los mismos cálculos", incorrectFeedback: "El resultado es el mismo, pero la cantidad de cálculo no." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "En la columna $2$, $(0, 7, 0)$, solo hay que calcular $7\\cdot A_{22} = 7\\cdot\\begin{vmatrix} 3 & 5 \\\\ 4 & 1 \\end{vmatrix} = 7\\cdot(-17) = -119$.",
    },
    {
      id: "ceros",
      type: "slide",
      help: [{ label: "Método mixto", message: "Es lo que se hace en la práctica: propiedades para crear ceros y adjuntos para bajar de orden." }],
      title: "Hacer ceros y desarrollar",
      blocks: [
        { kind: "text", text: "Si la línea no tiene ceros, se **crean** con la propiedad 9 (sumar a una fila un múltiplo de otra no cambia el valor) y se desarrolla por esa línea." },
        { kind: "example", title: "Hacer ceros en la primera columna", lines: [
          { math: "\\begin{vmatrix} 1 & 2 & 3 \\\\ -2 & 1 & 5 \\\\ 1 & 4 & 2 \\end{vmatrix} \\xrightarrow{\\ F_2 + 2F_1,\\ F_3 - F_1\\ } \\begin{vmatrix} 1 & 2 & 3 \\\\ 0 & 5 & 11 \\\\ 0 & 2 & -1 \\end{vmatrix}" },
          { math: "= 1\\cdot\\begin{vmatrix} 5 & 11 \\\\ 2 & -1 \\end{vmatrix} = -5 - 22 = -27" },
        ] },
      ],
      visual: { kind: "anim", scene: "determinante-gauss", params: { nums: [1, 2, 3, -2, 1, 5, 1, 4, 2] } },
    },
    {
      id: "check-ceros",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Haz $F_2 \\to F_2 - 2F_1$ para anular el $2$ de la primera columna y desarrolla por esa columna." }],
      title: "Un ejemplo completo",
      question: "Calcula $\\begin{vmatrix} 1 & 3 & 0 \\\\ 2 & 5 & 4 \\\\ 0 & 1 & 2 \\end{vmatrix}$. (solo el número)",
      correctAnswers: ["-6", "−6"],
      explanation: "Con $F_2 - 2F_1$ queda $\\begin{vmatrix} 1 & 3 & 0 \\\\ 0 & -1 & 4 \\\\ 0 & 1 & 2 \\end{vmatrix} = 1\\cdot\\begin{vmatrix} -1 & 4 \\\\ 1 & 2 \\end{vmatrix} = -2 - 4 = -6$. Con Sarrus: $(10 + 0 + 0) - (0 + 4 + 12) = -6$.",
    },
  ],
};
