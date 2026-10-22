import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_4_SUBTITLE } from "@/data/lessons/shared";

export const repartosProporcionales4esoLesson: InteractiveLesson = {
  slug: "repartos-proporcionales-4eso",
  title: "3. Repartos proporcionales",
  subtitle: TEMA_4ESO_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "partes",
      type: "slide",
      help: [
        {
          label: "Qué se reparte",
          message: "El total se divide en tantas partes **iguales** como suman los valores. Cada persona se lleva tantas partes como valor tenga.",
        },
        {
          label: "Comprobación",
          message: "Las fracciones de cada uno deben **sumar 1** y los importes, el total.",
        },
      ],
      title: "Repartir en partes iguales a los valores",
      blocks: [
        {
          kind: "text",
          text: "Tres socios invierten $1$, $2$ y $5$ millones de euros y el negocio rinde $600\\,000$ €. Lo justo es repartir **proporcionalmente a lo invertido**.",
        },
        {
          kind: "steps",
          title: "Método",
          items: [
            "Suma los valores: $1 + 2 + 5 = 8$ partes.",
            "Valor de una parte: $600\\,000 : 8 = 75\\,000$ €.",
            "Cada uno, tantas partes como su valor.",
          ],
        },
      ],
      visual: { kind: "anim", scene: "reparto-partes", params: { nums: [1, 2, 5], a: 600000, titles: ["Socio 1", "Socio 2", "Socio 3"], unit: "€" } },
    },
    {
      id: "explora",
      type: "slide",
      help: [
        {
          label: "Fracciones",
          message: "El reparto también se ve como fracciones del total: $\\frac{1}{8}$, $\\frac{2}{8}$ y $\\frac{5}{8}$, que suman $\\frac{8}{8} = 1$.",
        },
      ],
      title: "Explora: cómo cambia el reparto",
      blocks: [
        {
          kind: "rule",
          title: "Reparto proporcional",
          formula: "\\text{parte de } a = \\dfrac{a}{a + b + c + \\cdots} \\cdot \\text{total}",
        },
        {
          kind: "text",
          text: "Cambia lo que aporta cada uno y el total. Fíjate en que **solo importa la proporción** entre los valores: $1, 2, 5$ y $2, 4, 10$ dan el mismo reparto.",
        },
      ],
      visual: { kind: "tool", tool: "reparto-explorador", initial: [1, 2, 5, 600000], hint: "Duplica los tres valores a la vez: ¿cambian los importes?" },
    },
    {
      id: "check-toallas",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Partes",
          message: "Son $3 + 2 = 5$ juegos y $175 : 5 = 35$ € cada uno. La que se queda tres paga $3 \\cdot 35$.",
        },
      ],
      title: "Dos hermanas",
      question: "Dos hermanas compran cinco juegos de toallas por $175$ €. Una se queda con tres y la otra con dos. ¿Cuánto paga la que se queda con tres? (solo el número)",
      correctAnswers: ["105"],
      explanation: "$175 : 5 = 35$ € por juego. $3 \\cdot 35 = 105$ €; la otra paga $70$ €.",
    },
    {
      id: "tiempo",
      type: "slide",
      help: [
        {
          label: "El tiempo como valor",
          message: "Cuando se reparte un gasto compartido, lo que se usa como «valor» de cada uno es el **tiempo de uso**. Quien lo usa más días, paga más.",
        },
      ],
      title: "Repartir según el tiempo de uso",
      blocks: [
        {
          kind: "text",
          text: "Tres vecinos alquilan una motosierra durante $12$ días: Juan la usa $2$, Pedro $3$ y Rufino $7$. El alquiler total es de $264$ €.",
        },
        {
          kind: "example",
          lines: [
            { math: "2 + 3 + 7 = 12 \\ \\text{partes} \\qquad 264 : 12 = 22\\ €/\\text{día}" },
            { math: "\\text{Juan } 44\\ € \\quad \\text{Pedro } 66\\ € \\quad \\text{Rufino } 154\\ €" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "reparto-partes", params: { nums: [2, 3, 7], a: 264, titles: ["Juan", "Pedro", "Rufino"], unit: "€" } },
    },
    {
      id: "check-rufino",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Euros por día",
          message: "$264 : 12 = 22$ €/día. Rufino la usa $7$ días.",
        },
      ],
      title: "Lo que paga Rufino",
      question: "Con las cifras anteriores ($12$ días; Juan $2$, Pedro $3$, Rufino $7$; total $264$ €), ¿cuánto paga Rufino? (solo el número)",
      correctAnswers: ["154"],
      explanation: "$22 \\cdot 7 = 154$ €.",
    },
    {
      id: "check-porcentajes",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Rentabilidad y reparto",
          message: "Beneficio total: $8\\,\\%$ de $272\\,000 = 21\\,760$ €. El tercero puso $100 - 65 - 20 = 15\\,\\%$, así que recibe el $15\\,\\%$ del beneficio.",
        },
      ],
      title: "Tres socios con porcentajes",
      question: "Tres socios invierten $272\\,000$ €: el primero el $65\\,\\%$, el segundo el $20\\,\\%$ y el tercero el resto. La rentabilidad total es del $8\\,\\%$. ¿Cuántos euros recibe el tercero? (solo el número)",
      correctAnswers: ["3264"],
      explanation: "Beneficio: $0{,}08 \\cdot 272\\,000 = 21\\,760$ €. El tercero puso el $15\\,\\%$: $0{,}15 \\cdot 21\\,760 = 3\\,264$ €.",
    },
    {
      id: "check-segundo",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Mismo reparto",
          message: "Multiplicar todos los valores por el mismo número no cambia las fracciones: $\\frac{2}{16} = \\frac{1}{8}$.",
        },
      ],
      title: "Solo importa la proporción",
      question: "Dos socios reparten un beneficio. Si el primero invirtió $3$ y el segundo $5$ (en miles de euros), ¿qué cambia si hubieran invertido $30$ y $50$?",
      choices: [
        { id: "nada", label: "Nada: el reparto es el mismo" },
        { id: "mas", label: "El primero recibe más", incorrectFeedback: "Las fracciones son $\\frac{3}{8}$ y $\\frac{5}{8}$ en los dos casos. Solo importa la proporción." },
        { id: "menos", label: "El segundo recibe menos", incorrectFeedback: "Las fracciones son $\\frac{3}{8}$ y $\\frac{5}{8}$ en los dos casos." },
      ],
      correctChoiceId: "nada",
      shuffleChoices: true,
      explanation: "$\\frac{30}{80} = \\frac{3}{8}$ y $\\frac{50}{80} = \\frac{5}{8}$: las mismas fracciones, el mismo reparto.",
    },
  ],
};
