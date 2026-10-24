import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_3_SUBTITLE } from "@/data/lessons/shared";

export const sucesionesDefinicion1bachLesson: InteractiveLesson = {
  slug: "sucesiones-definicion-1bach",
  title: "1. Sucesiones: definición y formas de darlas",
  subtitle: TEMA_1BACH_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [{ label: "Una función especial", message: "Una sucesión es una función cuyo dominio son los números naturales: a cada lugar $n$ le asigna un número real $a_n$. Su gráfica son puntos sueltos, no una curva continua." }],
      title: "Una lista ordenada de números",
      blocks: [
        { kind: "definition", text: "Una **sucesión** de números reales es una lista ordenada $a_1, a_2, a_3, \\ldots$ Formalmente, es una aplicación $f: \\mathbb{N} \\to \\mathbb{R}$ que a cada $n$ le hace corresponder $a_n$ (el **término $n$-ésimo**)." },
        { kind: "example", lines: [
          { math: "1, 2, 3, 4, 5, \\ldots\\qquad 2, 4, 6, 8, \\ldots\\qquad 1, \\tfrac{1}{2}, \\tfrac{1}{3}, \\tfrac{1}{4}, \\ldots" },
        ] },
        { kind: "text", text: "Importan dos cosas: **qué valor** toma cada término y **en qué lugar** está. $1, 2$ y $2, 1$ son sucesiones distintas." },
      ],
      visual: { kind: "tool", tool: "sucesion-explorador", initial: [0, 8], hint: "Mueve n y mira cómo cada lugar tiene su término. Cambia de sucesión y observa que la gráfica son puntos sueltos." },
    },
    {
      id: "formas",
      type: "slide",
      help: [{ label: "Fibonacci", message: "$1, 1, 2, 3, 5, 8, \\ldots$ se define por recurrencia: $a_1 = a_2 = 1$ y $a_{n+2} = a_n + a_{n+1}$. Aparece en la reproducción de los conejos, en las espirales de las plantas…" }],
      title: "Tres formas de definir una sucesión",
      blocks: [
        { kind: "facts", items: [
          { tex: "\\text{propiedad: «los números primos»}\\ \\to 2, 3, 5, 7, \\ldots", label: "una propiedad de los términos" },
          { tex: "a_n = 2n + 1\\ \\to 3, 5, 7, 9, \\ldots", label: "término general" },
          { tex: "a_1 = 5,\\ a_{n+1} = a_n + 3\\ \\to 5, 8, 11, 14, \\ldots", label: "ley de recurrencia" },
        ] },
        { kind: "text", text: "El **término general** permite calcular cualquier término sin los anteriores. La **recurrencia** obliga a ir de uno en uno. Hay sucesiones (como los decimales de $\\pi$ o los primos) que no tienen una fórmula sencilla." },
      ],
      arrange: "stack",
    },
    {
      id: "check-general",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Sustituye $n = 100$ en $3n - 2$." }],
      title: "Un término lejano",
      question: "Una sucesión tiene por término general $a_n = 3n - 2$. ¿Cuánto vale $a_{100}$? (solo el número)",
      correctAnswers: ["298"],
      explanation: "$a_{100} = 3\\cdot 100 - 2 = 298$. Con el término general no hace falta calcular los 99 anteriores.",
    },
    {
      id: "check-expresion",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Cada término supera al anterior en $2$ y el primero es $3$: comprueba $n = 1$." }],
      title: "Buscar el término general",
      question: "¿Cuál es un término general de la sucesión $3, 5, 7, 9, \\ldots$?",
      choices: [
        { id: "a", label: "$a_n = 2n + 1$" },
        { id: "b", label: "$a_n = n + 2$", incorrectFeedback: "Da $3, 4, 5, 6\\ldots$: crece de $1$ en $1$." },
        { id: "c", label: "$a_n = 2n$", incorrectFeedback: "Da $2, 4, 6, 8\\ldots$: faltaría sumar $1$." },
        { id: "d", label: "$a_n = 3n$", incorrectFeedback: "Da $3, 6, 9\\ldots$: crece de $3$ en $3$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$a_1 = 3,\\ a_2 = 5,\\ a_3 = 7$: crece de $2$ en $2$ desde $3$, es decir $a_n = 2n + 1$.",
    },
    {
      id: "check-recurrencia",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Suma $3$ al término anterior: $5, 8, 11, \\ldots$" }],
      title: "Una recurrencia",
      question: "El primer término es $5$ y cada uno se obtiene sumando $3$ al anterior. ¿Cuánto vale $a_5$? (solo el número)",
      correctAnswers: ["17"],
      explanation: "$a_1 = 5,\\ a_2 = 8,\\ a_3 = 11,\\ a_4 = 14,\\ a_5 = 17$.",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Si hay una fórmula en $n$: término general. Si aparece $a_{n+1}$ o $a_n$ ligado a anteriores: recurrencia. Si se describe con palabras: propiedad." }],
      title: "¿Cómo está definida?",
      question: "Relaciona cada sucesión con la forma en que está definida.",
      groups: [
        { id: "gen", label: "Término general", tone: "cobalt" },
        { id: "rec", label: "Recurrencia", tone: "emerald" },
        { id: "pro", label: "Propiedad", tone: "amber" },
      ],
      items: [
        { id: "a", text: "$a_n = n^2 - 1$", group: "gen" },
        { id: "b", text: "$a_1 = 2,\\ a_{n+1} = 2a_n$", group: "rec" },
        { id: "c", text: "Los múltiplos de $7$", group: "pro" },
        { id: "d", text: "$a_n = (-1)^n$", group: "gen" },
        { id: "e", text: "$a_1 = a_2 = 1,\\ a_{n+2} = a_n + a_{n+1}$", group: "rec" },
        { id: "f", text: "Los números primos", group: "pro" },
      ],
      hint: "La de los múltiplos de 7 y la de los primos no traen fórmula: describen una propiedad.",
    },
  ],
};
