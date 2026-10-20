import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_11_SUBTITLE } from "@/data/lessons/shared";

export const crecimientoExtremos2esoLesson: InteractiveLesson = {
  slug: "crecimiento-extremos-2eso",
  title: "2. Crecimiento, decrecimiento, máximos y mínimos",
  subtitle: TEMA_2ESO_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "tramos",
      type: "slide",
      help: [
        {
          label: "De izquierda a derecha",
          message: "Para interpretar una función se mira la gráfica avanzando en el sentido en que crece $x$.",
        },
        {
          label: "Tramo",
          message: "Una función puede ser creciente en un tramo y decreciente en otro: se describe cada tramo por separado.",
        },
      ],
      title: "Funciones crecientes, decrecientes y constantes",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Creciente",
            text: "Al **aumentar $x$**, **aumenta $y$**: la gráfica sube.",
            tone: "ok",
          },
          right: {
            title: "Decreciente",
            text: "Al **aumentar $x$**, **disminuye $y$**: la gráfica baja.",
            tone: "warn",
          },
        },
        {
          kind: "text",
          text: "Si la función **mantiene el mismo valor** en todo un tramo, es **constante** en ese tramo.",
        },
      ],
      visual: { kind: "anim", scene: "funcion-tramos-extremos", beatMs: 3600 },
    },
    {
      id: "extremos",
      type: "slide",
      help: [
        {
          label: "Máximo y mínimo",
          message: "No son solo «los puntos más altos y más bajos de un tramo»: se refieren a toda la función (o al intervalo que se estudia).",
        },
        {
          label: "Y si es constante",
          message: "En un tramo constante todos los puntos del tramo tienen el mismo valor máximo: el máximo se alcanza en todo ese tramo.",
        },
      ],
      title: "Máximos y mínimos",
      blocks: [
        {
          kind: "definition",
          text: "El **máximo** es el punto en que la ordenada toma el **mayor valor**; el **mínimo**, aquel en que toma el **menor valor**.",
        },
        {
          kind: "text",
          text: "En la gráfica de la temperatura: mínimo $6\\,°\\text{C}$ (a las $5$ h) y máximo $20\\,°\\text{C}$ (de las $14$ a las $17$ h).",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-minimo",
      type: "predict",
      help: [
        {
          label: "Punto más bajo",
          message: "Busca el punto más bajo de la gráfica y lee su valor de $x$.",
        },
      ],
      title: "Cuándo hizo más frío",
      question: "En la gráfica de la temperatura, ¿a qué hora se dio la temperatura mínima?",
      mode: "choice",
      choices: [
        { id: "5", label: "A las $5$ h" },
        { id: "0", label: "A las $0$ h", incorrectFeedback: "A las $0$ h hacía $12\\,°\\text{C}$; luego la temperatura bajó aún más." },
        { id: "9", label: "A las $9$ h", incorrectFeedback: "A las $9$ h ya había subido hasta $10\\,°\\text{C}$." },
        { id: "24", label: "A las $24$ h", incorrectFeedback: "A las $24$ h hacía $12\\,°\\text{C}$." },
      ],
      correctChoiceId: "5",
      shuffleChoices: true,
      explanation: "El punto más bajo de la gráfica es $(5, 6)$: el mínimo, $6\\,°\\text{C}$, a las $5$ h.",
    },
    {
      id: "check-tramo",
      type: "classify",
      help: [
        {
          label: "Mira si sube o baja",
          message: "Entre las $5$ h y las $14$ h sube; de $14$ a $17$ h se mantiene; después baja.",
        },
      ],
      title: "Tramos de la gráfica",
      question: "Clasifica cada tramo de la gráfica de la temperatura.",
      groups: [
        { id: "creciente", label: "Creciente", tone: "emerald" },
        { id: "decreciente", label: "Decreciente", tone: "rose" },
        { id: "constante", label: "Constante", tone: "amber" },
      ],
      items: [
        { id: "a", text: "De las $5$ h a las $9$ h", group: "creciente" },
        { id: "b", text: "De las $0$ h a las $5$ h", group: "decreciente" },
        { id: "c", text: "De las $14$ h a las $17$ h", group: "constante" },
        { id: "d", text: "De las $17$ h a las $24$ h", group: "decreciente" },
        { id: "e", text: "De las $9$ h a las $14$ h", group: "creciente" },
      ],
      explanation: "La temperatura baja hasta las $5$ h, sube hasta las $14$ h, se mantiene hasta las $17$ h y vuelve a bajar.",
    },
    {
      id: "check-duracion",
      type: "fill_in_blank",
      help: [
        {
          label: "Resta las horas",
          message: "El tramo constante empieza a las $14$ h y termina a las $17$ h.",
        },
      ],
      title: "Una temperatura estable",
      question: "¿Durante cuántas horas se mantuvo constante la temperatura máxima? (solo el número)",
      correctAnswers: ["3"],
      explanation: "De las $14$ h a las $17$ h: $17 - 14 = 3$ horas.",
    },
  ],
};
