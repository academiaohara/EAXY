import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_4_SUBTITLE } from "@/data/lessons/shared";

export const proporcionalidadInversa2esoLesson: InteractiveLesson = {
  slug: "proporcionalidad-inversa-2eso",
  title: "2. Proporcionalidad inversa",
  subtitle: TEMA_2ESO_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "inversa",
      type: "slide",
      help: [
        {
          label: "Más de uno, menos de otro",
          message: "Con más albañiles el muro se termina antes: una magnitud sube y la otra baja en la misma proporción.",
        },
        {
          label: "Un producto que no cambia",
          message: "El producto de cada pareja es constante: $1 \\cdot 60 = 2 \\cdot 30 = 3 \\cdot 20 = 60$ días de trabajo de un albañil.",
        },
      ],
      title: "Magnitudes inversamente proporcionales",
      blocks: [
        {
          kind: "definition",
          text: "Dos magnitudes son **inversamente proporcionales** cuando, al **multiplicar** una por un número, la otra queda **dividida** por ese mismo número (y al revés).",
        },
        {
          kind: "text",
          text: "Un albañil tarda $60$ días en hacer un muro. ¿Cuántos días tardan $2$, $3$ o $4$ albañiles?",
        },
        {
          kind: "rule",
          title: "Constante de proporcionalidad",
          text: "El **producto** de cada pareja de valores es siempre el mismo.",
          formula: "\\text{albañiles} \\cdot \\text{días} = 60",
        },
      ],
      visual: {
        kind: "anim",
        scene: "tabla-razon",
        params: { rel: "inversa", a: 1, b: 60, nums: [1, 2, 3, 4], titles: ["Albañiles", "Días"] },
      },
    },
    {
      id: "reduccion-unidad",
      type: "slide",
      help: [
        {
          label: "Con uno solo, más tiempo",
          message: "Si dos albañiles tardan $30$ días, uno solo tardaría el doble: $60$.",
        },
        {
          label: "Después, repartir",
          message: "Con cuatro albañiles el trabajo se reparte: los $60$ días de uno solo se dividen entre cuatro.",
        },
      ],
      title: "Reducción a la unidad en la inversa",
      blocks: [
        {
          kind: "text",
          text: "Dos albañiles tardan $30$ días. ¿Cuánto tardan cuatro?",
        },
        {
          kind: "example",
          lines: [
            { math: "30 \\cdot 2 = 60\\,\\text{días}", note: "un solo albañil: más tiempo" },
            { math: "60 : 4 = 15\\,\\text{días}", note: "cuatro albañiles: menos tiempo" },
          ],
        },
        {
          kind: "warning",
          text: "En la inversa se hace **al contrario** que en la directa: para llegar a la unidad se **multiplica** y para subir se **divide**.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "reduccion-unidad",
        params: { rel: "inversa", a: 2, b: 30, c: 4, titles: ["Albañiles", "Días"] },
      },
    },
    {
      id: "regla-tres-inversa",
      type: "slide",
      help: [
        {
          label: "Por qué el producto",
          message: "Si $2 \\cdot 30 = 60$ días de trabajo, con $x$ albañiles también $x \\cdot 20 = 60$ si quieres terminar en $20$ días.",
        },
        {
          label: "Despeja",
          message: "$2 \\cdot 30 = x \\cdot 20 \\Rightarrow x = \\frac{60}{20}$.",
        },
      ],
      title: "Regla de tres inversa",
      blocks: [
        {
          kind: "text",
          text: "Con dos pares de valores inversamente proporcionales, los **productos son iguales**. Se escribe como fracciones con una de ellas **invertida**.",
        },
        {
          kind: "example",
          title: "¿Cuántos albañiles para hacerlo en 20 días?",
          lines: [
            { math: "2 \\cdot 30 = x \\cdot 20" },
            { math: "x = \\dfrac{60}{20} = 3\\,\\text{albañiles}" },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "regla-tres-producto",
        params: { a: 2, b: 30, c: 4, titles: ["Albañiles", "Días"], unit: "días" },
      },
    },
    {
      id: "check-clasificar",
      type: "classify",
      help: [
        {
          label: "Prueba con el doble",
          message: "Imagina que una magnitud se duplica: ¿la otra también se duplica (directa) o se reduce a la mitad (inversa)?",
        },
      ],
      title: "Directa o inversa",
      question: "Clasifica cada pareja de magnitudes.",
      groups: [
        { id: "directa", label: "Directa", tone: "cobalt" },
        { id: "inversa", label: "Inversa", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Kilos de fruta comprados y precio total", group: "directa" },
        { id: "b", text: "Velocidad de un coche y tiempo que tarda en un trayecto fijo", group: "inversa" },
        { id: "c", text: "Número de grifos abiertos y tiempo en llenar un depósito", group: "inversa" },
        { id: "d", text: "Litros de gasolina y euros pagados", group: "directa" },
        { id: "e", text: "Operarios y días que tardan en limpiar un parque", group: "inversa" },
      ],
      explanation: "Si al duplicar una la otra se duplica, es directa. Si al duplicar una la otra se reduce a la mitad, es inversa.",
    },
    {
      id: "check-coche",
      type: "predict",
      help: [
        {
          label: "Velocidad y tiempo",
          message: "Más velocidad significa menos tiempo en el mismo trayecto: es inversa. El producto $v \\cdot t$ es la distancia.",
        },
      ],
      title: "A Barcelona",
      question: "Un coche a $80$ km/h tarda $2$ h en llegar a Barcelona. ¿Cuánto tarda un camión a $40$ km/h?",
      mode: "choice",
      choices: [
        { id: "4", label: "$4$ h" },
        { id: "1", label: "$1$ h", incorrectFeedback: "Si fuera más despacio no tardaría menos: es una proporcionalidad inversa." },
        { id: "2", label: "$2$ h", incorrectFeedback: "La velocidad ha cambiado, así que el tiempo cambia." },
        { id: "8", label: "$8$ h", incorrectFeedback: "Se duplica el tiempo, no se multiplica por cuatro: $80 : 40 = 2$." },
      ],
      correctChoiceId: "4",
      shuffleChoices: true,
      explanation: "$80 \\cdot 2 = 160$ km. A $40$ km/h: $160 : 40 = 4$ h.",
    },
    {
      id: "check-operarios",
      type: "fill_in_blank",
      help: [
        {
          label: "Trabajo total",
          message: "Tres operarios en $7$ h son $21$ horas de trabajo en total. Repártelas entre $7$ operarios.",
        },
      ],
      title: "Limpieza de un parque",
      question: "Tres operarios limpian un parque en $7$ h. ¿Cuántas horas tardarían $7$ operarios? (solo el número)",
      correctAnswers: ["3"],
      explanation: "$3 \\cdot 7 = 21$ horas de trabajo; $21 : 7 = 3$ h.",
    },
  ],
};
