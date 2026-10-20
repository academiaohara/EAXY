import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_12_SUBTITLE } from "@/data/lessons/shared";

export const cuartiles2esoLesson: InteractiveLesson = {
  slug: "cuartiles-2eso",
  title: "5. Cuartiles y diagrama de caja",
  subtitle: TEMA_2ESO_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "cuartiles",
      type: "slide",
      help: [
        {
          label: "Cuatro partes",
          message: "Entre el mínimo y $Q_1$, entre $Q_1$ y la mediana, entre la mediana y $Q_3$, y entre $Q_3$ y el máximo: cada parte contiene un cuarto de los datos.",
        },
        {
          label: "Q2 es la mediana",
          message: "El cuartil central coincide con la mediana: $Q_2 = Me$.",
        },
      ],
      title: "Los cuartiles",
      blocks: [
        {
          kind: "definition",
          text: "Los **cuartiles** dividen los datos ordenados en **cuatro partes**: $Q_1$ (cuartil inferior), $Q_2 = Me$ y $Q_3$ (cuartil superior).",
        },
        {
          kind: "facts",
          items: [
            { tex: "Q_1", label: "deja a su izquierda el 25 % de los datos" },
            { tex: "Q_3", label: "deja a su izquierda el 75 % de los datos" },
          ],
        },
        {
          kind: "steps",
          title: "Con un número par de datos",
          items: [
            "Calcula la **mediana** $Q_2$: parte los datos en dos mitades.",
            "$Q_1$ es la mediana de la **mitad inferior**.",
            "$Q_3$ es la mediana de la **mitad superior**.",
          ],
        },
      ],
      visual: { kind: "anim", scene: "caja-bigotes", beatMs: 3800 },
    },
    {
      id: "ejemplo",
      type: "slide",
      help: [
        {
          label: "14 datos",
          message: "Cada mitad tiene $7$ datos: su mediana es el cuarto.",
        },
      ],
      title: "Un ejemplo",
      blocks: [
        {
          kind: "example",
          title: "1, 2, 2, 2, 3, 4, 5, 6, 6, 7, 8, 8, 8, 9",
          lines: [
            { math: "n = 14 \\ \\Rightarrow\\  Me = \\dfrac{5 + 6}{2} = 5{,}5" },
            { math: "\\text{mitad inferior: } 1, 2, 2, 2, 3, 4, 5 \\ \\Rightarrow\\  Q_1 = 2" },
            { math: "\\text{mitad superior: } 6, 6, 7, 8, 8, 8, 9 \\ \\Rightarrow\\  Q_3 = 8" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-q1",
      type: "fill_in_blank",
      help: [
        {
          label: "Mitad inferior",
          message: "Los $12$ datos se parten en dos mitades de $6$: $1, 3, 4, 5, 6, 8$. $Q_1$ es la mediana de esa mitad: el promedio de $4$ y $5$.",
        },
      ],
      title: "El cuartil inferior",
      question: "Para los datos $1, 3, 4, 5, 6, 8, 9, 10, 12, 13, 15, 16$, calcula $Q_1$. (escribe el número con coma)",
      correctAnswers: ["4,5", "4.5"],
      explanation: "Mitad inferior: $1, 3, 4, 5, 6, 8$. $Q_1 = \\frac{4 + 5}{2} = 4{,}5$.",
    },
    {
      id: "check-q3",
      type: "predict",
      help: [
        {
          label: "Mitad superior",
          message: "$9, 10, 12, 13, 15, 16$: la mediana es el promedio del tercero y cuarto.",
        },
      ],
      title: "El cuartil superior",
      question: "Con los mismos datos, ¿cuánto vale $Q_3$?",
      mode: "choice",
      choices: [
        { id: "12.5", label: "$12{,}5$" },
        { id: "12", label: "$12$", incorrectFeedback: "Es el tercer dato de la mitad superior: con $6$ datos hay que promediar el $3.^\\circ$ y el $4.^\\circ$." },
        { id: "8.5", label: "$8{,}5$", incorrectFeedback: "Es la mediana de todos los datos, $Q_2$." },
        { id: "13", label: "$13$", incorrectFeedback: "Es el cuarto dato; hay que promediar con el tercero ($12$)." },
      ],
      correctChoiceId: "12.5",
      shuffleChoices: true,
      explanation: "Mitad superior: $9, 10, 12, 13, 15, 16$. $Q_3 = \\frac{12 + 13}{2} = 12{,}5$.",
    },
    {
      id: "check-interpretar",
      type: "predict",
      help: [
        {
          label: "Cuartos de datos",
          message: "Entre $Q_1$ y $Q_3$ queda la mitad central de los datos.",
        },
      ],
      title: "Interpretar la caja",
      question: "En un diagrama de caja y bigotes, ¿qué porcentaje de los datos queda dentro de la caja (entre $Q_1$ y $Q_3$)?",
      mode: "choice",
      choices: [
        { id: "50", label: "El $50\\,\\%$" },
        { id: "25", label: "El $25\\,\\%$", incorrectFeedback: "Es lo que hay entre el mínimo y $Q_1$ (o entre $Q_3$ y el máximo)." },
        { id: "75", label: "El $75\\,\\%$", incorrectFeedback: "Hasta $Q_3$ hay un $75\\,\\%$ desde el mínimo; la caja solo es la parte central." },
        { id: "100", label: "El $100\\,\\%$", incorrectFeedback: "Todos los datos van desde el mínimo hasta el máximo (con los bigotes)." },
      ],
      correctChoiceId: "50",
      shuffleChoices: true,
      explanation: "De $Q_1$ a $Q_2$ hay un $25\\,\\%$ y de $Q_2$ a $Q_3$ otro $25\\,\\%$: la caja contiene el $50\\,\\%$ central.",
    },
  ],
};
