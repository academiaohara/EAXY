import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_2_SUBTITLE } from "@/data/lessons/shared";

export const detOrdenSuperior2bachLesson: InteractiveLesson = {
  slug: "det-orden-superior-2bach",
  title: "7. Determinantes triangulares y de orden superior",
  subtitle: TEMA_2BACH_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "triangular",
      type: "slide",
      help: [{ label: "Por qué", message: "Desarrollando por la primera columna solo sobrevive $a_{11}$, y el menor que queda vuelve a ser triangular: se repite el proceso." }],
      title: "Matriz triangular: producto de la diagonal",
      blocks: [
        { kind: "rule", text: "El determinante de una matriz **triangular** (o diagonal) es el producto de los elementos de la diagonal principal:", formula: "\\begin{vmatrix} a_{11} & * & * \\\\ 0 & a_{22} & * \\\\ 0 & 0 & a_{33} \\end{vmatrix} = a_{11}\\,a_{22}\\,a_{33}" },
        { kind: "example", lines: [
          { math: "\\begin{vmatrix} 1 & 2 & 3 \\\\ 0 & 4 & 5 \\\\ 0 & 0 & 6 \\end{vmatrix} = 1\\cdot 4\\cdot 6 = 24" },
        ] },
        { kind: "text", text: "Consecuencia: $|I| = 1$, y el determinante de una matriz diagonal es el producto de su diagonal." },
      ],
    },
    {
      id: "check-triangular",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Producto de la diagonal: $1\\cdot(-1)\\cdot 2\\cdot(-2)$." }],
      title: "Triangular de orden 4",
      question: "Calcula $\\begin{vmatrix} 1 & 2 & 3 & 4 \\\\ 0 & -1 & -2 & -3 \\\\ 0 & 0 & 2 & 3 \\\\ 0 & 0 & 0 & -2 \\end{vmatrix}$. (solo el número)",
      correctAnswers: ["4"],
      explanation: "Es triangular superior: $1\\cdot(-1)\\cdot 2\\cdot(-2) = 4$.",
    },
    {
      id: "check-incognita",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "El determinante es $1\\cdot(-4)\\cdot a\\cdot(-2) = 8a$." }],
      title: "Una incógnita en la diagonal",
      question: "Halla $a$ para que $\\begin{vmatrix} 1 & -38 & 53 & -78 \\\\ 0 & -4 & 87 & -39 \\\\ 0 & 0 & a & 93 \\\\ 0 & 0 & 0 & -2 \\end{vmatrix} = 24$. (solo el número)",
      correctAnswers: ["3"],
      explanation: "Triangular: $1\\cdot(-4)\\cdot a\\cdot(-2) = 8a = 24$, luego $a = 3$.",
    },
    {
      id: "gauss",
      type: "slide",
      help: [{ label: "Cuidado", message: "No se puede multiplicar una fila por un número para «simplificar» sin compensar: eso cambia el determinante (propiedad 2)." }],
      title: "Cualquier determinante: hacerlo triangular",
      blocks: [
        { kind: "steps", title: "Con operaciones por filas (como Gauss)", items: [
          "Sumar a una fila un múltiplo de otra: **no cambia** el determinante.",
          "Intercambiar dos filas: **cambia el signo**.",
          "Cuando la matriz es triangular, multiplica la diagonal (y el signo acumulado).",
        ] },
        { kind: "text", text: "Es el método más cómodo para órdenes $4$ o mayores: son unas pocas operaciones frente a los $4! = 24$ productos de la definición." },
      ],
      visual: { kind: "anim", scene: "determinante-gauss", params: { nums: [1, 2, 3, 4, 2, 3, 4, 1, 3, 4, 1, 2, 4, 1, 2, 3] } },
    },
    {
      id: "check-gauss",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Producto de la diagonal: $1\\cdot(-1)\\cdot(-4)\\cdot 40$." }],
      title: "Leer el resultado",
      question: "Al hacer ceros en $\\begin{vmatrix} 1 & 2 & 3 & 4 \\\\ 2 & 3 & 4 & 1 \\\\ 3 & 4 & 1 & 2 \\\\ 4 & 1 & 2 & 3 \\end{vmatrix}$ queda una matriz triangular con diagonal $1,\\ -1,\\ -4,\\ 40$ (sin intercambiar filas). ¿Cuánto vale el determinante? (solo el número)",
      correctAnswers: ["160"],
      explanation: "$1\\cdot(-1)\\cdot(-4)\\cdot 40 = 160$.",
    },
    {
      id: "check-intercambio",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Hubo un intercambio de filas: cambia el signo una vez." }],
      title: "Con un intercambio de filas",
      question: "Al hacer ceros, tuviste que intercambiar dos filas una vez y la matriz triangular final tiene diagonal $2,\\ 3,\\ 5$. ¿Cuánto vale el determinante original?",
      choices: [
        { id: "a", label: "$-30$" },
        { id: "b", label: "$30$", incorrectFeedback: "Falta el cambio de signo del intercambio de filas." },
        { id: "c", label: "$10$", incorrectFeedback: "Es la suma de la diagonal; se debe multiplicar." },
        { id: "d", label: "$-10$", incorrectFeedback: "Es la suma con signo; se debe multiplicar: $2\\cdot 3\\cdot 5 = 30$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$2\\cdot 3\\cdot 5 = 30$ y, como se intercambió un par de filas, el determinante original es $-30$.",
    },
  ],
};
