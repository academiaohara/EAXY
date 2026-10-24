import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESOB_11_SUBTITLE } from "@/data/lessons/shared";

export const combQueEs4esobLesson: InteractiveLesson = {
  slug: "comb-que-es-4esob",
  title: "1. En qué consiste la combinatoria",
  subtitle: TEMA_4ESOB_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "contar",
      type: "slide",
      help: [
        { label: "Contar sin listar", message: "Muchas veces no hace falta escribir todas las posibilidades: basta con entender cómo se forman y multiplicar." },
        { label: "Criterio", message: "Cada problema fija un criterio: si se pueden repetir elementos, si importa el orden, cuántos se eligen. El criterio decide el método." },
      ],
      title: "Contar agrupaciones",
      blocks: [
        { kind: "definition", text: "La **combinatoria** se ocupa de **contar** las agrupaciones que se pueden formar con los elementos de un conjunto según un criterio dado." },
        { kind: "example", title: "Irene tiene 3 camisetas y 2 pantalones", lines: [{ math: "3 \\cdot 2 = 6\\ \\text{indumentarias distintas}", note: "cada camiseta se combina con cada pantalón" }] },
      ],
      visual: { kind: "anim", scene: "arbol-conteo", params: { a: 3, b: 2, titles: ["Camiseta", "Pantalón"] } },
    },
    {
      id: "check-gorras",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Tres decisiones", message: "Cada indumentaria es una elección de pantalón, de camiseta y de gorra: se multiplican las tres cantidades." }],
      title: "Una decisión más",
      question: "Irene tiene $4$ pantalones, $6$ camisetas y $3$ gorras. ¿Cuántas indumentarias pantalón–camiseta–gorra distintas puede llevar? (solo el número)",
      correctAnswers: ["72"],
      explanation: "$4 \\cdot 6 \\cdot 3 = 72$.",
    },
    {
      id: "principio",
      type: "slide",
      help: [{ label: "Independientes", message: "El principio solo vale si lo que elijas en un paso no cambia cuántas opciones tienes en el siguiente (o al menos, que ese número sea siempre el mismo)." }],
      title: "El principio de multiplicación",
      blocks: [
        { kind: "rule", title: "Principio de multiplicación", text: "Si un proceso se hace en varios pasos y el paso 1 se puede hacer de $m$ formas, el paso 2 de $n$ formas, etc., el total de formas es el **producto**." },
        { kind: "example", lines: [{ math: "6 \\cdot 6 = 36", note: "resultados al lanzar un dado rojo y otro verde" }, { math: "6 \\cdot 40 = 240", note: "un dado y una carta de una baraja de 40" }] },
      ],
    },
    {
      id: "check-dado",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Dos decisiones", message: "El dado da $6$ resultados y la carta $40$; son independientes." }],
      title: "Dado y carta",
      question: "Lanzamos un dado y extraemos una carta de una baraja de $40$. ¿Cuántos resultados distintos podemos obtener? (solo el número)",
      correctAnswers: ["240"],
      explanation: "$6 \\cdot 40 = 240$.",
    },
    {
      id: "check-tres-amigos",
      type: "predict",
      mode: "choice",
      help: [{ label: "Orden", message: "Con $3$ amigos en $3$ sitios: el primero tiene $3$ opciones, el segundo $2$, el tercero $1$." }],
      title: "Un banco con tres sitios",
      question: "¿De cuántas formas se pueden sentar $3$ amigos en un banco de $3$ lugares?",
      choices: [
        { id: "a", label: "$6$" },
        { id: "b", label: "$3$", incorrectFeedback: "Eso es solo el número de amigos: cada uno se puede sentar en varios sitios." },
        { id: "c", label: "$9$", incorrectFeedback: "$3 \\cdot 3 = 9$ contaría que dos personas pueden ocupar el mismo sitio." },
        { id: "d", label: "$27$", incorrectFeedback: "Eso permitiría repetir personas en el banco." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$3\\cdot2\\cdot1 = 6$: PQR, PRQ, QPR, QRP, RPQ, RQP.",
    },
  ],
};
