import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_1_SUBTITLE } from "@/data/lessons/shared";

export const matrizInversa2bachLesson: InteractiveLesson = {
  slug: "matriz-inversa-2bach",
  title: "8. La matriz inversa",
  subtitle: TEMA_2BACH_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [{ label: "Analogía", message: "Con números, el inverso de $a$ es $1/a$ y $a\\cdot\\frac{1}{a} = 1$. Con matrices, la «unidad» es la identidad $I$." }],
      title: "Regular y singular",
      blocks: [
        { kind: "definition", text: "Una matriz cuadrada $A$ es **regular** (o inversible) si existe otra matriz $A^{-1}$, también cuadrada, tal que $A\\cdot A^{-1} = A^{-1}\\cdot A = I$. Si no existe, $A$ es **singular**." },
        { kind: "facts", items: [
          { tex: "(A^{-1})^{-1} = A" },
          { tex: "(A\\cdot B)^{-1} = B^{-1}\\cdot A^{-1}", label: "se invierte el orden" },
          { tex: "(A^t)^{-1} = (A^{-1})^t" },
        ] },
        { kind: "warning", text: "Solo las matrices **cuadradas** pueden tener inversa, y no todas: una matriz no nula puede ser singular." },
      ],
    },
    {
      id: "por-sistema",
      type: "slide",
      help: [{ label: "Método", message: "Funciona, pero es laborioso: para una matriz de orden $n$ hay que resolver $n^2$ incógnitas. En la lección siguiente se verá Gauss–Jordan." }],
      title: "Calcularla planteando un sistema",
      blocks: [
        { kind: "example", title: "$A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$", lines: [
          { math: "A\\cdot\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = \\begin{pmatrix} a + 2c & b + 2d \\\\ 3a + 4c & 3b + 4d \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}" },
          { math: "\\begin{cases} a + 2c = 1 \\\\ 3a + 4c = 0 \\end{cases} \\Rightarrow a = -2,\\ c = \\tfrac32 \\qquad \\begin{cases} b + 2d = 0 \\\\ 3b + 4d = 1 \\end{cases} \\Rightarrow b = 1,\\ d = -\\tfrac12" },
          { math: "A^{-1} = \\begin{pmatrix} -2 & 1 \\\\ \\tfrac32 & -\\tfrac12 \\end{pmatrix}" },
        ] },
        { kind: "example", title: "Una singular: $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 6 \\end{pmatrix}$", lines: [
          { math: "a + 2c = 1 \\quad\\text{y}\\quad 3a + 6c = 0" },
          { math: "3a + 6c = 3 \\neq 0", note: "multiplicando la primera por 3: contradicción, el sistema no tiene solución" },
        ] },
      ],
    },
    {
      id: "check-inversa-2x2",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$A\\cdot A^{-1} = I$ con $A = \\begin{pmatrix} 0 & 1 \\\\ 2 & 0 \\end{pmatrix}$ y $A^{-1} = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$ da $c = 1$, $d = 0$, $2a = 0$, $2b = 1$." }],
      title: "Inversa de una 2×2",
      question: "Para $A = \\begin{pmatrix} 0 & 1 \\\\ 2 & 0 \\end{pmatrix}$, ¿cuánto vale el elemento $(1, 2)$ de $A^{-1}$? (decimal con punto o fracción)",
      correctAnswers: ["1/2", "0.5", "0,5"],
      explanation: "$A^{-1} = \\begin{pmatrix} 0 & \\tfrac12 \\\\ 1 & 0 \\end{pmatrix}$. Se comprueba: $A\\cdot A^{-1} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix}$.",
    },
    {
      id: "explorar",
      type: "slide",
      help: [{ label: "Singular", message: "Cuando una fila es múltiplo de otra, la matriz es singular. Pruébalo con 1 2 / 3 6." }],
      title: "Explora: ¿cuándo existe la inversa?",
      blocks: [
        { kind: "text", text: "Prueba con distintas matrices $2\\times 2$ y $3\\times 3$. El **determinante** (que se estudia en el tema siguiente) anticipa el resultado: la matriz es regular cuando es distinto de cero." },
      ],
      visual: { kind: "tool", tool: "matriz-inversa-explorador", initial: [2, 1, 2, 0, 3, 4, 0, 0, 0, 1], hint: "Cambia a 6 el elemento de abajo a la derecha de (1 2 / 3 4): la matriz pasa a ser singular." },
    },
    {
      id: "check-singular",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "La segunda fila debe ser múltiplo de la primera: $(3,\\ k) = 3\\cdot(1,\\ 2)$." }],
      title: "Valor que hace singular",
      question: "¿Para qué valor de $k$ la matriz $\\begin{pmatrix} 1 & 2 \\\\ 3 & k \\end{pmatrix}$ es singular? (solo el número)",
      correctAnswers: ["6"],
      explanation: "Es singular si la segunda fila es proporcional a la primera: $3\\cdot(1, 2) = (3, 6)$, luego $k = 6$. (Es el ejemplo sin inversa de arriba.)",
    },
    {
      id: "check-producto-inversa",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Piensa en ponerte los calcetines y luego los zapatos: para deshacerlo, primero quitas los zapatos." }],
      title: "La inversa de un producto",
      question: "Si $A$ y $B$ son regulares del mismo orden, $(A\\cdot B)^{-1}$ es…",
      choices: [
        { id: "a", label: "$B^{-1}\\cdot A^{-1}$" },
        { id: "b", label: "$A^{-1}\\cdot B^{-1}$", incorrectFeedback: "El producto de matrices no conmuta: hay que invertir el orden." },
        { id: "c", label: "$A\\cdot B$", incorrectFeedback: "Eso no es la inversa del producto, en general." },
        { id: "d", label: "$A^{-1} + B^{-1}$", incorrectFeedback: "La inversa del producto no se calcula sumando inversas." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(AB)(B^{-1}A^{-1}) = A(BB^{-1})A^{-1} = AA^{-1} = I$.",
    },
  ],
};
