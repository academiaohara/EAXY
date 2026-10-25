import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_2_SUBTITLE } from "@/data/lessons/shared";

export const detParametros2bachLesson: InteractiveLesson = {
  slug: "det-parametros-2bach",
  title: "8. Determinantes con parámetros y ecuaciones",
  subtitle: TEMA_2BACH_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "idea",
      type: "slide",
      help: [{ label: "Estrategia", message: "Un determinante con parámetro es un polinomio en el parámetro. Se factoriza para ver para qué valores se anula." }],
      title: "El determinante como polinomio",
      blocks: [
        { kind: "text", text: "Cuando una matriz depende de un parámetro $a$, su determinante es un **polinomio en $a$**. Interesa sobre todo **cuándo vale $0$**: para esos valores la matriz es singular y su rango baja." },
        { kind: "example", title: "Con propiedades, sin desarrollar", lines: [
          { math: "\\begin{vmatrix} a & a & a \\\\ a + b & a & a \\\\ a & a + c & a \\end{vmatrix} \\xrightarrow{\\ F_2 - F_1,\\ F_3 - F_1\\ } \\begin{vmatrix} a & a & a \\\\ b & 0 & 0 \\\\ 0 & c & 0 \\end{vmatrix} = a\\cdot(0 - 0) - a\\cdot(0 - 0) + a\\cdot bc = abc" },
        ] },
        { kind: "text", text: "Primero se hacen ceros con la propiedad 9, y después se desarrolla por la línea más sencilla." },
      ],
      visual: { kind: "tool", tool: "determinante-parametro-explorador", initial: [0, 2], hint: "Con «Tres iguales» el determinante es (a − 1)²·(a + 2): se anula en a = 1 y en a = −2. Observa la curva." },
    },
    {
      id: "check-valor",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$(a - 1)^2(a + 2)$ con $a = 3$: $4\\cdot 5$." }],
      title: "Sustituir el parámetro",
      question: "El determinante de $\\begin{pmatrix} a & 1 & 1 \\\\ 1 & a & 1 \\\\ 1 & 1 & a \\end{pmatrix}$ es $(a - 1)^2(a + 2)$. ¿Cuánto vale si $a = 3$? (solo el número)",
      correctAnswers: ["20"],
      explanation: "$(3 - 1)^2\\cdot(3 + 2) = 4\\cdot 5 = 20$.",
    },
    {
      id: "check-raices",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Un producto es $0$ si algún factor es $0$: iguala cada factor a $0$." }],
      title: "¿Cuándo es singular?",
      question: "La matriz $\\begin{pmatrix} a & 1 & 1 \\\\ 0 & a & 1 \\\\ 0 & 0 & a - 2 \\end{pmatrix}$ es triangular. ¿Para qué valores de $a$ **no** tiene inversa?",
      choices: [
        { id: "a", label: "$a = 0$ y $a = 2$" },
        { id: "b", label: "Solo $a = 2$", incorrectFeedback: "El determinante es $a\\cdot a\\cdot(a - 2) = a^2(a - 2)$: también se anula en $a = 0$." },
        { id: "c", label: "$a = 1$ y $a = 2$", incorrectFeedback: "El elemento $1$ no es un valor de la diagonal: $|A| = a^2(a - 2)$." },
        { id: "d", label: "Para ningún valor", incorrectFeedback: "Cuando $a = 0$ o $a = 2$ hay un cero en la diagonal y el determinante vale $0$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Triangular: $|A| = a\\cdot a\\cdot(a - 2) = a^2(a - 2)$, que vale $0$ para $a = 0$ y $a = 2$. Solo entonces $A$ es singular.",
    },
    {
      id: "ecuaciones",
      type: "slide",
      help: [{ label: "Despejar", message: "Al desarrollar el determinante aparece una ecuación en $x$ (de primer o segundo grado normalmente)." }],
      title: "Ecuaciones con determinantes",
      blocks: [
        { kind: "example", title: "Hallar $x$", lines: [
          { math: "\\begin{vmatrix} x & 2 \\\\ 3 & x \\end{vmatrix} = 10 \\iff x^2 - 6 = 10 \\iff x^2 = 16 \\iff x = \\pm 4" },
        ] },
        { kind: "text", text: "En la práctica se desarrolla, se llega a una ecuación y se resuelve. Recuerda comprobar **todas** las soluciones: aquí hay dos." },
      ],
    },
    {
      id: "check-ecuacion",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Desarrolla: $x\\cdot x - 2\\cdot 3 = 10$, es decir $x^2 = 16$." }],
      title: "Resolver",
      question: "Resuelve $\\begin{vmatrix} x & 2 \\\\ 3 & x \\end{vmatrix} = 10$ y escribe la solución **positiva**. (solo el número)",
      correctAnswers: ["4"],
      explanation: "$x^2 - 6 = 10 \\Rightarrow x^2 = 16 \\Rightarrow x = 4$ o $x = -4$.",
    },
    {
      id: "check-k-ecuacion",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Plantea $k(k + 1) - 2\\cdot 3 = 0$, es decir $k^2 + k - 6 = 0$." }],
      title: "Matriz singular",
      question: "¿Para qué valor **positivo** de $k$ la matriz $\\begin{pmatrix} k & 2 \\\\ 3 & k + 1 \\end{pmatrix}$ no tiene inversa? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$|A| = k(k + 1) - 6 = k^2 + k - 6 = (k - 2)(k + 3)$, que se anula en $k = 2$ y $k = -3$.",
    },
  ],
};
