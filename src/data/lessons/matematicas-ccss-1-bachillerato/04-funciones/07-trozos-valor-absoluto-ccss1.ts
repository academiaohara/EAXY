import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_4_SUBTITLE } from "@/data/lessons/shared";

export const trozosValorAbsolutoCcss1Lesson: InteractiveLesson = {
  slug: "trozos-valor-absoluto-ccss1",
  title: "7. Funciones a trozos y valor absoluto",
  subtitle: TEMA_CCSS1_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "trozos",
      type: "slide",
      help: [{ label: "Extremos", message: "Cada punto del dominio debe pertenecer a **un solo** trozo. En los extremos se pone el signo $\\leq$ en uno solo de los dos trozos." }],
      title: "Una fórmula distinta en cada tramo",
      blocks: [
        { kind: "definition", text: "Una función **definida a trozos** tiene una expresión distinta según el intervalo en el que esté $x$. La gráfica se construye tramo a tramo, con **punto relleno** donde el extremo pertenece al trozo y **vacío** donde no." },
        { kind: "example", lines: [
          { math: "f(x) = \\begin{cases} x + 1 & \\text{si } x < 1 \\\\ 3 - x & \\text{si } x \\geq 1 \\end{cases}" },
          { math: "f(0) = 1,\\quad f(1) = 3 - 1 = 2,\\quad f(4) = -1" },
        ] },
      ],
      visual: { kind: "tool", tool: "trozos-explorador", params: { a: 0, b: 1 }, hint: "Recorre x por las cuatro funciones: mira qué tramo se usa en cada punto y si en los cortes los tramos empalman o dan un salto." },
    },
    {
      id: "check-evaluar",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$x = 1$ cumple $x \\geq 1$: se usa la segunda fórmula, $3 - x$." }],
      title: "Evaluar a trozos",
      question: "Con $f(x) = x + 1$ si $x < 1$ y $f(x) = 3 - x$ si $x \\geq 1$, ¿cuánto vale $f(1)$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$x = 1$ pertenece al segundo trozo ($x \\geq 1$): $f(1) = 3 - 1 = 2$. (Con el primero habría dado $2$ también: los tramos **empalman**.)",
    },
    {
      id: "abs",
      type: "slide",
      help: [{ label: "Reflejar", message: "$|f(x)|$ es siempre $\\geq 0$: donde $f$ es negativa, su gráfica se refleja respecto del eje $X$ y donde es positiva, se queda igual." }],
      title: "El valor absoluto de una función",
      blocks: [
        { kind: "rule", title: "Definición a trozos", formula: "|f(x)| = \\begin{cases} f(x) & \\text{si } f(x) \\geq 0 \\\\ -f(x) & \\text{si } f(x) < 0 \\end{cases}" },
        { kind: "example", title: "|x − 2|", lines: [
          { math: "|x - 2| = \\begin{cases} x - 2 & x \\geq 2 \\\\ -x + 2 & x < 2 \\end{cases}" },
        ] },
        { kind: "text", text: "Para escribirla a trozos se estudia **el signo** de lo que hay dentro del valor absoluto." },
      ],
      visual: { kind: "tool", tool: "abs-funcion-explorador", initial: [0, 1, -2, 4], hint: "La línea discontinua es f; la continua, |f|. Pasa a x² − c y observa que se refleja la parte negativa." },
    },
    {
      id: "check-abs",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$|0 - 2| = |-2|$." }],
      title: "Evaluar |x − 2|",
      question: "¿Cuánto vale $f(x) = |x - 2|$ en $x = 0$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$f(0) = |0 - 2| = |-2| = 2$.",
    },
    {
      id: "check-expresion",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "$x - 2 \\geq 0$ para $x \\geq 2$; en el otro tramo se cambia el signo." }],
      title: "Escribir a trozos",
      question: "¿Cómo se escribe $|x - 2|$ a trozos?",
      choices: [
        { id: "a", label: "$x - 2$ si $x \\geq 2$;   $-x + 2$ si $x < 2$" },
        { id: "b", label: "$x - 2$ si $x < 2$;   $-x + 2$ si $x \\geq 2$", incorrectFeedback: "Has invertido los tramos: para $x < 2$, $x - 2$ es negativo y hay que cambiarle el signo." },
        { id: "c", label: "$x + 2$ si $x \\geq -2$;   $-x - 2$ si $x < -2$", incorrectFeedback: "Esa es $|x + 2|$." },
        { id: "d", label: "$x - 2$ para todo $x$", incorrectFeedback: "El valor absoluto nunca da resultados negativos." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Cuando $x \\geq 2$ lo de dentro es positivo y se deja; cuando $x < 2$ es negativo y se cambia de signo: $-(x - 2) = -x + 2$.",
    },
    {
      id: "check-recorrido",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Un valor absoluto nunca es negativo y $|x - 2|$ vale $0$ en $x = 2$." }],
      title: "Recorrido del valor absoluto",
      question: "El recorrido de $f(x) = |x - 2|$ es…",
      choices: [
        { id: "a", label: "$[0,\\ +\\infty)$" },
        { id: "b", label: "$\\mathbb{R}$", incorrectFeedback: "Un valor absoluto no toma valores negativos." },
        { id: "c", label: "$(0,\\ +\\infty)$", incorrectFeedback: "En $x = 2$ vale $0$: el $0$ sí está en el recorrido." },
        { id: "d", label: "$[2,\\ +\\infty)$", incorrectFeedback: "El mínimo es $0$ (en $x = 2$), no $2$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Toma todos los valores $\\geq 0$: Im $f = [0, +\\infty)$.",
    },
  ],
};
