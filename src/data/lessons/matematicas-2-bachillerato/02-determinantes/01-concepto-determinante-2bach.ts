import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_2_SUBTITLE } from "@/data/lessons/shared";

export const conceptoDeterminante2bachLesson: InteractiveLesson = {
  slug: "concepto-determinante-2bach",
  title: "1. Determinantes de orden 2 y 3: regla de Sarrus",
  subtitle: TEMA_2BACH_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "orden-2",
      type: "slide",
      help: [{ label: "Notación", message: "El determinante de $A$ se escribe $\\det(A)$ o $|A|$, con barras verticales en lugar de paréntesis." }],
      title: "Un número asociado a una matriz cuadrada",
      blocks: [
        { kind: "definition", text: "El **determinante** de una matriz cuadrada $A$ es un número real, $|A|$, que se obtiene sumando todos los productos de $n$ elementos tomados **uno de cada fila y uno de cada columna**, con signo $+$ o $-$ según la permutación de las columnas." },
        { kind: "rule", title: "Orden 2", text: "Producto de la diagonal principal menos producto de la diagonal secundaria:", formula: "\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix} = ad - bc" },
        { kind: "example", lines: [
          { math: "\\begin{vmatrix} 2 & 5 \\\\ 1 & 4 \\end{vmatrix} = 2\\cdot 4 - 5\\cdot 1 = 3" },
          { math: "\\begin{vmatrix} -1 & -2 \\\\ -4 & 3 \\end{vmatrix} = -1\\cdot 3 - (-2)(-4) = -11" },
        ] },
      ],
      visual: { kind: "tool", tool: "determinante-area-explorador", initial: [3, 1, 0, 2], hint: "Las dos columnas son dos vectores. Mueve los deslizadores: cuando son paralelos, el paralelogramo se aplasta y el determinante vale 0." },
    },
    {
      id: "check-orden-2",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$ad - bc$ con $a = 3$, $b = 1$, $c = -1$, $d = 2$: cuidado con el signo del segundo producto." }],
      title: "Calcular un determinante de orden 2",
      question: "Calcula $\\begin{vmatrix} 3 & 1 \\\\ -1 & 2 \\end{vmatrix}$. (solo el número)",
      correctAnswers: ["7"],
      explanation: "$3\\cdot 2 - 1\\cdot(-1) = 6 + 1 = 7$.",
    },
    {
      id: "check-k",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Plantea $2\\cdot 6 - 3k = 0$." }],
      title: "¿Cuándo vale cero?",
      question: "¿Para qué valor de $k$ es nulo el determinante $\\begin{vmatrix} 2 & k \\\\ 3 & 6 \\end{vmatrix}$? (solo el número)",
      correctAnswers: ["4"],
      explanation: "$12 - 3k = 0 \\Rightarrow k = 4$. Las columnas $(2, 3)$ y $(4, 6)$ son proporcionales.",
    },
    {
      id: "sarrus",
      type: "slide",
      help: [{ label: "Regla", message: "Sarrus solo sirve para orden $3$. Para órdenes mayores se usan adjuntos o se hacen ceros." }],
      title: "Orden 3: la regla de Sarrus",
      blocks: [
        { kind: "rule", title: "Desarrollo con seis productos", formula: "\\begin{vmatrix} a_{11} & a_{12} & a_{13} \\\\ a_{21} & a_{22} & a_{23} \\\\ a_{31} & a_{32} & a_{33} \\end{vmatrix} = a_{11}a_{22}a_{33} + a_{12}a_{23}a_{31} + a_{13}a_{21}a_{32} - a_{13}a_{22}a_{31} - a_{11}a_{23}a_{32} - a_{12}a_{21}a_{33}" },
        { kind: "text", text: "Los tres primeros productos son las diagonales «hacia abajo» y llevan signo $+$; los tres últimos, las diagonales «hacia arriba», con signo $-$." },
      ],
      visual: { kind: "anim", scene: "determinante-sarrus", params: { nums: [1, 2, 3, -1, 5, 1, 3, 6, -2] } },
    },
    {
      id: "check-sarrus",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Sumas: $3\\cdot 1\\cdot(-2)$, $1\\cdot 2\\cdot 3$, $0$. Restas: $0$, $3\\cdot 2\\cdot(-2)$, $1\\cdot(-2)\\cdot(-2)$." }],
      title: "Sarrus con números",
      question: "Calcula $\\begin{vmatrix} 3 & 1 & 0 \\\\ -2 & 1 & 2 \\\\ 3 & -2 & -2 \\end{vmatrix}$. (solo el número)",
      correctAnswers: ["8"],
      explanation: "$(-6 + 6 + 0) - (0 - 12 + 4) = 0 - (-8) = 8$.",
    },
    {
      id: "check-sarrus-2",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Hay varios ceros: solo sobreviven dos productos." }],
      title: "Otro determinante de orden 3",
      question: "Calcula $\\begin{vmatrix} -1 & 0 & 2 \\\\ -2 & 0 & 5 \\\\ 4 & -2 & -2 \\end{vmatrix}$. (solo el número)",
      correctAnswers: ["-2", "−2"],
      explanation: "Suman: $0 + 0 + 2\\cdot(-2)\\cdot(-2) = 8$. Restan: $2\\cdot 0\\cdot 4 + (-1)\\cdot 5\\cdot(-2) + 0 = 10$. Resultado: $8 - 10 = -2$.",
    },
  ],
};
