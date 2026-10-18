import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_11_SUBTITLE } from "@/data/lessons/shared";

export const rectasYAngulosParalelasLesson: InteractiveLesson = {
  slug: "rectas-y-angulos-paralelas",
  title: "4. Ángulos entre paralelas",
  subtitle: TEMA_1ESO_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "ocho-angulos",
      type: "slide",
      help: [
        {
          label: "¿Cómo reconozco cada pareja?",
          message: "Mira dos cosas: de qué lado de la secante están (alternos = lados distintos; correspondientes = el mismo) y si están dentro o fuera de las paralelas (internos o externos).",
        },
        {
          label: "¿Qué pareja suma $180^\\circ$?",
          message: "Los consecutivos, por ejemplo $\\hat{1}$ y $\\hat{2}$: son vecinos y forman un ángulo llano. Los demás pares nombrados son iguales.",
        },
      ],
      title: "Una secante corta a dos paralelas",
      blocks: [
        {
          kind: "text",
          text: "Cuando una recta corta a dos **paralelas**, se forman ocho ángulos, y muchos son **iguales** porque sus lados son paralelos.",
        },
        {
          kind: "relations",
          items: [
            { left: "$\\hat{1}$ y $\\hat{3}$", relation: "opuestos por el vértice:", right: "iguales", tone: "ok" },
            { left: "$\\hat{1}$ y $\\hat{5}$", relation: "correspondientes:", right: "iguales", tone: "ok" },
            { left: "$\\hat{3}$ y $\\hat{5}$", relation: "alternos internos:", right: "iguales", tone: "ok" },
            { left: "$\\hat{1}$ y $\\hat{7}$", relation: "alternos externos:", right: "iguales", tone: "ok" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "paralelas-secante", beatMs: 2800 },
    },
    {
      id: "explora-paralelas",
      type: "slide",
      help: [
        {
          label: "¿Qué debo observar?",
          message: "Aunque cambies la inclinación de la secante, cada pareja de ángulos sigue siendo igual (o, en consecutivos, suma $180^\\circ$).",
        },
      ],
      title: "Explora: ¿qué parejas son siempre iguales?",
      blocks: [
        {
          kind: "text",
          text: "Elige un tipo de pareja y cambia la inclinación de la secante. Comprueba cuáles son **siempre iguales** y cuáles **suman $180^\\circ$**.",
        },
        {
          kind: "rule",
          title: "Lados paralelos",
          text: "Dos ángulos cuyos lados son paralelos son **iguales** o **suplementarios**.",
        },
      ],
      visual: { kind: "tool", tool: "paralelas-explorador", params: { a: 65 } },
    },
    {
      id: "railes",
      type: "predict",
      help: [
        {
          label: "¿Qué pareja forman?",
          message: "El ángulo del primer raíl y el del segundo están en la misma posición respecto a cada raíl y a la secante: son **correspondientes**.",
        },
        {
          label: "¿Iguales o suplementarios?",
          message: "Los correspondientes entre paralelas son iguales; los suplementarios son ángulos pegados que forman un llano.",
        },
      ],
      title: "Una vía de tren",
      question:
        "Los dos raíles de una vía son paralelos. Un camino los cruza y forma con el primer raíl un ángulo de 70°. ¿Cuánto mide el ángulo correspondiente en el cruce con el segundo raíl?",
      mode: "choice",
      choices: [
        { id: "a", label: "$70^\\circ$" },
        {
          id: "b",
          label: "$110^\\circ$",
          incorrectFeedback:
            "$110^\\circ$ es el suplementario de $70^\\circ$, el del ángulo vecino. El correspondiente ocupa la misma posición y mide lo mismo que el original.",
        },
        {
          id: "c",
          label: "$20^\\circ$",
          incorrectFeedback:
            "Has restado $90 - 70$, como si fueran complementarios. Los raíles no forman ningún ángulo recto aquí.",
        },
        {
          id: "d",
          label: "$140^\\circ$",
          incorrectFeedback:
            "Has duplicado $70^\\circ$. Los ángulos correspondientes son iguales, no uno doble del otro.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "Los ángulos **correspondientes** entre paralelas son iguales: también mide $70^\\circ$.",
    },
    {
      id: "alternos-externos",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué relación hay?",
          message: "Los alternos externos entre paralelas son **iguales**. No hay que calcular nada más.",
        },
        {
          label: "Dibuja el esquema",
          message: "Con dos paralelas y una secante, marca el ángulo de $115^\\circ$ y busca el que está al otro lado de la secante y fuera de las paralelas.",
        },
      ],
      title: "Alternos externos",
      question:
        "Dos paralelas son cortadas por una secante. Un ángulo exterior mide 115°. ¿Cuánto mide su alterno externo? (escribe solo el número)",
      correctAnswers: ["115", "115º", "115°"],
      hint: "Los ángulos alternos externos entre paralelas son iguales.",
      explanation: "Son **iguales**: $115^\\circ$.",
    },
    {
      id: "consecutivo",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué ángulo piden?",
          message: "El que está pegado a uno de $65^\\circ$ en el mismo corte: son consecutivos y forman un ángulo llano.",
        },
        {
          label: "¿Qué cuenta hago?",
          message: "Resta a $180^\\circ$ el ángulo conocido.",
        },
      ],
      title: "El ángulo vecino",
      question:
        "En el cruce de una secante con una de dos paralelas, un ángulo mide 65°. ¿Cuánto mide el ángulo que está pegado a él, del mismo cruce y del mismo lado de la paralela? (escribe solo el número)",
      correctAnswers: ["115", "115º", "115°"],
      hint: "Los dos ángulos completan un ángulo llano.",
      explanation: "$180^\\circ - 65^\\circ = 115^\\circ$.",
    },
  ],
};
