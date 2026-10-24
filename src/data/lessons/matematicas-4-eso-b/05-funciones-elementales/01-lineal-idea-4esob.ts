import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_9_SUBTITLE } from "@/data/lessons/shared";

export const linealIdea4esobLesson: InteractiveLesson = {
  slug: "lineal-idea-4esob",
  title: "1. Idea de función lineal",
  subtitle: TEMA_4ESO_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "muelle",
      type: "slide",
      help: [
        { label: "Proporcional", message: "«Variaciones proporcionales»: si el peso aumenta el doble, el **alargamiento** también aumenta el doble. La longitud total es $30$ cm más ese alargamiento." },
        { label: "Dominio", message: "El muelle solo se estudia para $x \\in [0, 6]$ kg: más peso lo deteriora. El dominio de una función real puede limitarse por el problema." },
      ],
      title: "Un muelle que se alarga",
      blocks: [
        { kind: "text", text: "Un muelle sin estirar mide $30$ cm y se alarga $15$ cm por cada kilo que colgamos. La longitud $y$ (cm) según el peso $x$ (kg) es $y = 30 + 15x$, con dominio $[0, 6]$." },
        { kind: "definition", text: "Cuando las variaciones de la causa influyen **proporcionalmente** en las del efecto, la función es **lineal** y su gráfica es una **recta**." },
      ],
      visual: { kind: "tool", tool: "funcion-explorador", params: { a: 5 }, hint: "Cada kilo más (x avanza 1) añade 15 cm: es la pendiente. La ordenada en el origen es la longitud sin peso." },
    },
    {
      id: "check-4kg",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Sustituye", message: "$y = 30 + 15\\cdot4$." }],
      title: "Con 4 kg",
      question: "¿Cuánto mide el muelle (en cm) con un peso de $4$ kg?",
      correctAnswers: ["90"],
      explanation: "$y = 30 + 15\\cdot4 = 90$ cm.",
    },
    {
      id: "check-peso",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Despeja", message: "$30 + 15x = 75 \\Rightarrow 15x = 45$." }],
      title: "¿Qué peso?",
      question: "¿Qué peso (en kg) hace que el muelle mida $75$ cm?",
      correctAnswers: ["3"],
      explanation: "$30 + 15x = 75 \\Rightarrow x = 3$ kg.",
    },
    {
      id: "check-dominio",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Extremo del dominio", message: "El mayor peso estudiado es $6$ kg." }],
      title: "Longitud máxima",
      question: "Con el dominio $[0, 6]$, ¿cuál es la longitud máxima que alcanza el muelle (en cm)?",
      correctAnswers: ["120"],
      explanation: "$y(6) = 30 + 90 = 120$ cm. El recorrido es $[30, 120]$.",
    },
    {
      id: "check-aumenta",
      type: "predict",
      mode: "choice",
      help: [{ label: "Compara", message: "Cada kilo extra añade siempre lo mismo: $15$ cm." }],
      title: "Variaciones proporcionales",
      question: "Si pasamos de $1$ kg a $3$ kg, el muelle se alarga $30$ cm más. ¿Y de $3$ kg a $5$ kg?",
      choices: [
        { id: "30", label: "$30$ cm más, igual" },
        { id: "mas", label: "Más de $30$ cm", incorrectFeedback: "Cada kilo aporta siempre $15$ cm, sea cual sea el peso: eso es lo que hace lineal la función." },
        { id: "menos", label: "Menos de $30$ cm", incorrectFeedback: "El ritmo es constante: $15$ cm por kilo." },
      ],
      correctChoiceId: "30",
      shuffleChoices: true,
      explanation: "En una función lineal, el mismo aumento de $x$ produce siempre el mismo aumento de $y$ ($2\\cdot15 = 30$).",
    },
  ],
};
