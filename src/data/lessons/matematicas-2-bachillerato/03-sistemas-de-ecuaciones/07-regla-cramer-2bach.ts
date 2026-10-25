import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_3_SUBTITLE } from "@/data/lessons/shared";

export const reglaCramer2bachLesson: InteractiveLesson = {
  slug: "regla-cramer-2bach",
  title: "7. Regla de Cramer",
  subtitle: TEMA_2BACH_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "regla",
      type: "slide",
      help: [{ label: "Sistema de Cramer", message: "Un sistema es de Cramer si tiene tantas ecuaciones como incógnitas y $|A| \\neq 0$." }],
      title: "Cada incógnita es un cociente de determinantes",
      blocks: [
        { kind: "rule", title: "Regla de Cramer", text: "En un sistema con $n$ ecuaciones, $n$ incógnitas y $|A| \\neq 0$, la incógnita $x_i$ es:", formula: "x_i = \\dfrac{|A_i|}{|A|}" },
        { kind: "text", text: "$A_i$ es la matriz $A$ en la que se ha **sustituido la columna $i$ por la columna $B$** de términos independientes." },
        { kind: "example", title: "$2x + 3y = 7$, $\\ x - y = 1$", lines: [
          { math: "|A| = \\begin{vmatrix} 2 & 3 \\\\ 1 & -1 \\end{vmatrix} = -5" },
          { math: "x = \\dfrac{\\begin{vmatrix} 7 & 3 \\\\ 1 & -1 \\end{vmatrix}}{-5} = \\dfrac{-10}{-5} = 2,\\qquad y = \\dfrac{\\begin{vmatrix} 2 & 7 \\\\ 1 & 1 \\end{vmatrix}}{-5} = \\dfrac{-5}{-5} = 1" },
        ] },
      ],
    },
    {
      id: "check-y",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$|A| = 3\\cdot(-1) - 2\\cdot 1 = -5$. Para $y$, sustituye la 2.ª columna por $(8, 1)$." }],
      title: "Cramer en orden 2",
      question: "Resuelve $3x + 2y = 8$, $\\ x - y = 1$ con la regla de Cramer. ¿Cuánto vale $y$? (solo el número)",
      correctAnswers: ["1"],
      explanation: "$|A| = -3 - 2 = -5$ y $|A_y| = \\begin{vmatrix} 3 & 8 \\\\ 1 & 1 \\end{vmatrix} = 3 - 8 = -5$, luego $y = \\dfrac{-5}{-5} = 1$ (y $x = 2$).",
    },
    {
      id: "tres",
      type: "slide",
      help: [{ label: "Coste", message: "En orden 3 hay que calcular cuatro determinantes; por eso Gauss suele ser más rápido." }],
      title: "Un sistema 3 × 3",
      blocks: [
        { kind: "text", text: "Se calculan $|A|$, $|A_x|$, $|A_y|$ y $|A_z|$. Si $|A| = 0$, **no se puede aplicar la regla**: el sistema es incompatible o indeterminado y hay que discutirlo con Rouché–Frobenius." },
      ],
      visual: { kind: "tool", tool: "cramer-explorador", initial: [3, 2, 3, -1, 3, -1, 5, 1, 2, 4, -2, 22, 12], hint: "Cambia el tamaño o algún coeficiente. Cuando |A| = 0, la regla de Cramer deja de funcionar." },
    },
    {
      id: "check-x",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$|A| = -56$ y $|A_x| = -112$." }],
      title: "Dividir determinantes",
      question: "En el sistema $2x + 3y - z = -2$, $\\ 3x - y + 5z = 22$, $\\ x + 2y + 4z = 12$ se tiene $|A| = -56$ y $|A_x| = -112$. ¿Cuánto vale $x$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$x = \\dfrac{|A_x|}{|A|} = \\dfrac{-112}{-56} = 2$. La solución completa es $(2,\\ -1,\\ 3)$.",
    },
    {
      id: "check-cuando",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "La regla divide entre $|A|$: no se puede dividir entre $0$." }],
      title: "¿Cuándo no vale?",
      question: "No se puede aplicar la regla de Cramer a un sistema cuando…",
      choices: [
        { id: "a", label: "$|A| = 0$ (o no hay tantas ecuaciones como incógnitas)" },
        { id: "b", label: "algún término independiente es $0$", incorrectFeedback: "Los términos independientes pueden ser $0$ (homogéneos): lo que importa es $|A|$." },
        { id: "c", label: "los coeficientes son negativos", incorrectFeedback: "El signo de los coeficientes no importa." },
        { id: "d", label: "el sistema tiene solución", incorrectFeedback: "La regla sirve precisamente cuando hay una única solución." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Hace falta una matriz cuadrada con $|A| \\neq 0$. Con $|A| = 0$ o con matriz no cuadrada hay que usar Gauss o Rouché–Frobenius.",
    },
  ],
};
