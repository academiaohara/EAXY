import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_1_SUBTITLE } from "@/data/lessons/shared";

export const propiedadesProducto2bachLesson: InteractiveLesson = {
  slug: "propiedades-producto-2bach",
  title: "5. Propiedades del producto: no conmuta",
  subtitle: TEMA_2BACH_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "propiedades",
      type: "slide",
      help: [{ label: "Matrices cuadradas", message: "Estas propiedades valen para matrices cuando los productos y sumas existen; en cuadradas del mismo orden siempre existen." }],
      title: "Lo que sí cumple y lo que no",
      blocks: [
        { kind: "compare",
          left: { title: "Sí se cumple", text: "(cuando las operaciones están definidas)", math: ["A(BC) = (AB)C", "A(B + C) = AB + AC", "(A + B)C = AC + BC", "AI = IA = A"] },
          right: { title: "No se cumple en general", math: ["AB \\neq BA", "AB = O \\not\\Rightarrow A = O \\text{ o } B = O", "AB = AC \\not\\Rightarrow B = C"], tone: "warn" } },
        { kind: "text", text: "Consecuencia: los productos notables se estropean. $(A + B)^2 = A^2 + AB + BA + B^2$, que **no** es $A^2 + 2AB + B^2$ salvo que $AB = BA$." },
      ],
      visual: { kind: "tool", tool: "matriz-conmuta-explorador", initial: [1, 2, 0, 1, 0, 1, 1, 0], hint: "Con estos valores AB y BA son distintas. Cambia B a (3 5 / 0 3): ahora sí conmutan." },
    },
    {
      id: "ejemplo",
      type: "slide",
      help: [{ label: "Dimensiones", message: "Aquí $A\\cdot B$ es $3\\times 3$ y $B\\cdot A$ es $2\\times 2$: ni siquiera pueden ser iguales." }],
      title: "AB y BA pueden ser muy distintos",
      blocks: [
        { kind: "example", title: "$A$ de $3\\times 2$ y $B$ de $2\\times 3$", lines: [
          { math: "A = \\begin{pmatrix} 1 & -1 \\\\ 2 & 3 \\\\ 0 & 4 \\end{pmatrix},\\quad B = \\begin{pmatrix} 4 & -1 & 2 \\\\ 0 & 5 & 3 \\end{pmatrix}" },
          { math: "AB = \\begin{pmatrix} 4 & -6 & -1 \\\\ 8 & 13 & 13 \\\\ 0 & 20 & 12 \\end{pmatrix}", note: "$3\\times 3$" },
          { math: "BA = \\begin{pmatrix} 2 & 1 \\\\ 10 & 27 \\end{pmatrix}", note: "$2\\times 2$" },
        ] },
      ],
    },
    {
      id: "check-ab",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "El elemento $(3,3)$ de $AB$ es la fila $3$ de $A$, $(0\\ 4)$, por la columna $3$ de $B$, $(2\\ 3)$." }],
      title: "Elemento de AB",
      question: "Con las matrices de la diapositiva anterior, ¿cuánto vale el elemento $(3, 3)$ de $A\\cdot B$? (solo el número)",
      correctAnswers: ["12"],
      explanation: "$0\\cdot 2 + 4\\cdot 3 = 12$.",
    },
    {
      id: "check-ba",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Fila $2$ de $B$: $(0\\ 5\\ 3)$; columna $2$ de $A$: $(-1\\ 3\\ 4)$." }],
      title: "Elemento de BA",
      question: "¿Cuánto vale el elemento $(2, 2)$ de $B\\cdot A$? (solo el número)",
      correctAnswers: ["27"],
      explanation: "$0\\cdot(-1) + 5\\cdot 3 + 3\\cdot 4 = 0 + 15 + 12 = 27$.",
    },
    {
      id: "check-verdadero-falso",
      type: "classify",
      help: [{ label: "Pista", message: "Una igualdad es «siempre cierta» si se deduce de las propiedades del producto; si hay que usar $AB = BA$, es falsa en general." }],
      title: "¿Siempre cierto?",
      question: "Con $A$, $B$ y $C$ cuadradas del mismo orden, clasifica cada afirmación.",
      groups: [
        { id: "si", label: "Siempre cierta", tone: "emerald" },
        { id: "no", label: "Falsa en general", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$A\\,(B + C) = AB + AC$", group: "si" },
        { id: "b", text: "$AB = BA$", group: "no" },
        { id: "c", text: "$(A + B)^2 = A^2 + 2AB + B^2$", group: "no" },
        { id: "d", text: "$A\\,I = I\\,A = A$", group: "si" },
        { id: "e", text: "$AB = O \\Rightarrow A = O$ o $B = O$", group: "no" },
        { id: "f", text: "$(AB)\\,C = A\\,(BC)$", group: "si" },
      ],
      hint: "Todo lo que cambie el orden de dos matrices (conmutar) es peligroso. Ejemplo para $AB = O$ con $A, B \\neq O$: $\\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\end{pmatrix}\\begin{pmatrix} 0 & 0 \\\\ 0 & 1 \\end{pmatrix} = O$.",
    },
    {
      id: "check-conmuta",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Si $B = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$, calcula $AB$ y $BA$ con $A = \\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}$ e iguala: salen $c = 0$ y $d = a$." }],
      title: "Matrices que conmutan",
      question: "Sea $A = \\begin{pmatrix} 1 & 2 \\\\ 0 & 1 \\end{pmatrix}$. ¿Cuál de estas matrices $B$ cumple $AB = BA$?",
      choices: [
        { id: "a", label: "$B = \\begin{pmatrix} 3 & 5 \\\\ 0 & 3 \\end{pmatrix}$" },
        { id: "b", label: "$B = \\begin{pmatrix} 1 & 0 \\\\ 2 & 1 \\end{pmatrix}$", incorrectFeedback: "$AB = \\begin{pmatrix} 5 & 2 \\\\ 2 & 1 \\end{pmatrix}$ pero $BA = \\begin{pmatrix} 1 & 2 \\\\ 2 & 5 \\end{pmatrix}$: no conmutan." },
        { id: "c", label: "$B = \\begin{pmatrix} 3 & 5 \\\\ 1 & 3 \\end{pmatrix}$", incorrectFeedback: "Para conmutar hace falta que el elemento $b_{21}$ sea $0$." },
        { id: "d", label: "$B = \\begin{pmatrix} 1 & 2 \\\\ 2 & 1 \\end{pmatrix}$", incorrectFeedback: "Tampoco: el elemento $b_{21}$ debe ser $0$ y $b_{22} = b_{11}$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Las matrices que conmutan con $A$ son $\\begin{pmatrix} a & b \\\\ 0 & a \\end{pmatrix}$. La de la opción A es de esa forma con $a = 3$, $b = 5$.",
    },
  ],
};
