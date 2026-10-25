import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_3_SUBTITLE } from "@/data/lessons/shared";

export const sistemasInecuacionesCcss1Lesson: InteractiveLesson = {
  slug: "sistemas-inecuaciones-ccss1",
  title: "18. Sistemas de inecuaciones con dos incógnitas",
  subtitle: TEMA_CCSS1_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "semiplano",
      type: "slide",
      help: [{ label: "Elegir el punto", message: "El origen $(0, 0)$ es el más cómodo de probar, salvo que la recta pase por él; entonces se usa otro, como $(1, 0)$." }],
      title: "Una inecuación es un semiplano",
      blocks: [
        { kind: "definition", text: "La recta $ax + by = c$ divide el plano en **dos semiplanos**. La inecuación $ax + by \\leq c$ (o $\\geq$) se cumple en uno de ellos; la recta forma parte si la desigualdad no es estricta." },
        { kind: "steps", title: "Cómo se dibuja", items: [
          "Se dibuja la recta $ax + by = c$.",
          "Se prueba un punto que no esté en la recta, por ejemplo el origen.",
          "Si cumple la desigualdad, se sombrea su lado; si no, el otro.",
        ] },
        { kind: "example", title: "x + y ≤ 4", lines: [
          { math: "(0, 0):\\ 0 + 0 = 0 \\leq 4\\ \\checkmark \\Rightarrow \\text{se sombrea el lado del origen}" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "sistema",
      type: "slide",
      help: [{ label: "Región convexa", message: "La intersección de semiplanos es siempre una región convexa; si está acotada es un polígono. Es la base de la programación lineal." }],
      title: "Un sistema es una intersección",
      blocks: [
        { kind: "text", text: "La solución de un sistema de inecuaciones es la **intersección de los semiplanos**: los puntos que cumplen todas las inecuaciones a la vez. Se llama **región factible**." },
        { kind: "text", text: "Prueba con $x + y \\leq 4$ y $x - y \\geq 1$. Después cambia los coeficientes y los signos." },
      ],
      visual: { kind: "tool", tool: "region-inecuaciones-explorador", initial: [1, 1, 4, 0, 1, -1, 1, 1], hint: "Verde: puntos que cumplen las dos. Haz las rectas paralelas y cambia los signos: ¿puede quedar la región vacía?" },
    },
    {
      id: "check-punto",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Sustituye cada punto en las dos inecuaciones: $x + y \\leq 4$ y $x - y \\geq 1$." }],
      title: "¿Qué punto está en la región?",
      question: "¿Cuál de estos puntos cumple a la vez $x + y \\leq 4$ y $x - y \\geq 1$?",
      choices: [
        { id: "a", label: "$(3, 1)$" },
        { id: "b", label: "$(0, 0)$", incorrectFeedback: "Cumple la primera ($0 \\leq 4$) pero no la segunda: $0 - 0 = 0$ no es $\\geq 1$." },
        { id: "c", label: "$(2, 3)$", incorrectFeedback: "$2 + 3 = 5$ no es $\\leq 4$." },
        { id: "d", label: "$(-1, 2)$", incorrectFeedback: "Cumple la primera ($1 \\leq 4$) pero $-1 - 2 = -3$ no es $\\geq 1$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(3, 1)$: $3 + 1 = 4 \\leq 4$ ✓ y $3 - 1 = 2 \\geq 1$ ✓.",
    },
    {
      id: "vertice",
      type: "slide",
      help: [{ label: "Vértices", message: "En problemas de optimización lineal, el máximo y el mínimo de una función lineal sobre una región factible acotada se alcanzan en un **vértice**." }],
      title: "Los vértices de la región",
      blocks: [
        { kind: "text", text: "Los **vértices** de la región son los cortes de las rectas frontera. Se hallan resolviendo el sistema de las dos ecuaciones." },
        { kind: "example", title: "x + y = 4 y x − y = 1", lines: [
          { math: "\\text{Sumando: } 2x = 5 \\Rightarrow x = 2{,}5" },
          { math: "y = 4 - 2{,}5 = 1{,}5 \\Rightarrow \\text{vértice } (2{,}5;\\ 1{,}5)" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-vertice",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Suma las dos ecuaciones para eliminar $y$." }],
      title: "Coordenada del vértice",
      question: "¿Cuál es la coordenada $x$ del punto donde se cortan las rectas $x + y = 4$ y $x - y = 1$? (con coma decimal)",
      correctAnswers: ["2,5", "2.5", "5/2"],
      explanation: "Sumando las ecuaciones, $2x = 5$, luego $x = 2{,}5$ (y $y = 1{,}5$).",
    },
    {
      id: "check-vacio",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "¿Puede una suma $x + y$ ser a la vez menor o igual que $1$ y mayor o igual que $3$?" }],
      title: "¿Región vacía?",
      question: "El sistema $x + y \\leq 1$ y $x + y \\geq 3$ …",
      choices: [
        { id: "a", label: "no tiene solución: los semiplanos no se solapan" },
        { id: "b", label: "tiene como solución la franja entre las dos rectas", incorrectFeedback: "Esa franja cumpliría $1 \\leq x + y \\leq 3$, que es lo contrario del sistema." },
        { id: "c", label: "tiene como solución una sola recta", incorrectFeedback: "Las rectas $x + y = 1$ y $x + y = 3$ son paralelas y distintas." },
        { id: "d", label: "tiene como solución todo el plano", incorrectFeedback: "Cada inecuación ya descarta medio plano." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Una misma suma no puede ser $\\leq 1$ y $\\geq 3$ a la vez: los dos semiplanos son opuestos y su intersección es vacía.",
    },
  ],
};
