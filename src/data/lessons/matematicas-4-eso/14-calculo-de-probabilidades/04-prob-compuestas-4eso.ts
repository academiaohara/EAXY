import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_14_SUBTITLE } from "@/data/lessons/shared";

export const probCompuestas4esoLesson: InteractiveLesson = {
  slug: "prob-compuestas-4eso",
  title: "4. Experiencias compuestas",
  subtitle: TEMA_4ESO_14_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "idea",
      type: "slide",
      help: [
        { label: "Ejemplos", message: "Lanzar tres dados es componer tres experiencias simples (un dado, otro, otro). Extraer tres cartas, también." },
        { label: "Clave", message: "Pregúntate: ¿lo que pasa en la primera cambia las probabilidades de la segunda? Si sí, son dependientes." },
      ],
      title: "Independientes o dependientes",
      blocks: [
        { kind: "compare", left: { title: "Independientes", text: "El resultado de cada una **no influye** en las demás. Ej.: lanzar dos dados; extraer con **reemplazamiento**.", tone: "ok" }, right: { title: "Dependientes", text: "El resultado de cada una **influye** en las probabilidades de las siguientes. Ej.: extraer cartas **sin reemplazamiento**.", tone: "warn" } },
      ],
      visual: { kind: "anim", scene: "arbol-urna", params: { nums: [3, 2, 1] } },
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pregúntate", message: "¿Cambia la composición de lo que se extrae o lo que se lanza?" }],
      title: "¿Dependientes o independientes?",
      question: "Clasifica cada experiencia compuesta.",
      groups: [
        { id: "ind", label: "Independientes", tone: "emerald" },
        { id: "dep", label: "Dependientes", tone: "rose" },
      ],
      items: [
        { id: "a", text: "Lanzar un dado y después sacar una bola de una bolsa", group: "ind" },
        { id: "b", text: "Extraer dos cartas de una baraja, sin devolver la primera", group: "dep" },
        { id: "c", text: "Lanzar tres monedas", group: "ind" },
        { id: "d", text: "Sacar una bola, devolverla y volver a sacar", group: "ind" },
        { id: "e", text: "Lanzar un dado: si sale par, sacar de la urna A; si impar, de la B", group: "dep" },
        { id: "f", text: "Sacar dos bolas de una urna a la vez", group: "dep" },
      ],
      hint: "Con reemplazamiento: independientes. Sin reemplazamiento: dependientes.",
    },
    {
      id: "check-reemp",
      type: "predict",
      mode: "choice",
      help: [{ label: "Reemplazamiento", message: "Si se devuelve la bola y se remueve, la composición de la urna es la misma en la 2.ª extracción." }],
      title: "Con reemplazamiento",
      question: "«Saco una bola, la miro, la devuelvo, remuevo y saco otra»: las dos extracciones son...",
      choices: [
        { id: "ind", label: "independientes" },
        { id: "dep", label: "dependientes", incorrectFeedback: "Al devolver la bola, la urna vuelve a ser igual: la 1.ª no influye en la 2.ª." },
        { id: "nose", label: "No se puede decidir", incorrectFeedback: "Sí: «con reemplazamiento» da pruebas independientes." },
      ],
      correctChoiceId: "ind",
      shuffleChoices: true,
      explanation: "«Con reemplazamiento» $\\Rightarrow$ independientes. «Sin reemplazamiento» $\\Rightarrow$ dependientes.",
    },
    {
      id: "baraja",
      type: "slide",
      help: [{ label: "Dependencia", message: "Si la 1.ª es as quedan $3$ ases en $39$ cartas; si no lo es, quedan $4$ ases en $39$." }],
      title: "Dos cartas seguidas",
      blocks: [{ kind: "text", text: "Extraer dos cartas de una baraja de $40$, sin devolver la primera. Si la 1.ª es **as**, la 2.ª es as con probabilidad $\\frac{3}{39}$; si **no** lo era, con $\\frac{4}{39}$. La 2.ª depende de la 1.ª." }],
    },
    {
      id: "check-3-39",
      type: "predict",
      mode: "choice",
      help: [{ label: "Cuenta", message: "La 1.ª fue as: quedan $39$ cartas, de las cuales $3$ son ases." }],
      title: "La segunda carta",
      question: "Si la 1.ª carta fue un as y no se devuelve, $P[\\text{as en la 2.ª}] =$",
      choices: [
        { id: "339", label: "$\\dfrac{3}{39}$" },
        { id: "440", label: "$\\dfrac{4}{40}$", incorrectFeedback: "Eso sería con reemplazamiento (o sin conocer la 1.ª). Ahora quedan $39$ cartas y $3$ ases." },
        { id: "439", label: "$\\dfrac{4}{39}$", incorrectFeedback: "$4$ ases solo quedarían si la 1.ª **no** hubiera sido as." },
      ],
      correctChoiceId: "339",
      shuffleChoices: true,
      explanation: "Quedan $39$ cartas y $3$ ases: $\\frac{3}{39}$.",
    },
    {
      id: "check-moneda-dado",
      type: "predict",
      mode: "choice",
      help: [{ label: "Dos dados", message: "El resultado de un dado no cambia las probabilidades del otro." }],
      title: "Dos dados",
      question: "Lanzar un dado rojo y otro verde son experiencias...",
      choices: [
        { id: "ind", label: "independientes" },
        { id: "dep", label: "dependientes", incorrectFeedback: "El número que sale en uno no cambia las caras posibles del otro." },
        { id: "unos", label: "dependientes si caen juntos", incorrectFeedback: "Aunque caigan a la vez, un dado no influye en el otro." },
      ],
      correctChoiceId: "ind",
      shuffleChoices: true,
      explanation: "Cada dado tiene sus $6$ caras con probabilidad $\\frac{1}{6}$ sin importar el otro.",
    },
  ],
};
