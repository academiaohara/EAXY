import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_12_SUBTITLE } from "@/data/lessons/shared";

export const graficosEstadisticos2esoLesson: InteractiveLesson = {
  slug: "graficos-estadisticos-2eso",
  title: "2. Gráficas estadísticas",
  subtitle: TEMA_2ESO_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "barras-histograma",
      type: "slide",
      help: [
        {
          label: "Barras separadas",
          message: "En un diagrama de barras las barras están separadas porque los valores son aislados (discretos o cualitativos).",
        },
        {
          label: "Rectángulos juntos",
          message: "En un histograma, los rectángulos van pegados porque los intervalos son consecutivos.",
        },
      ],
      title: "Diagrama de barras e histograma",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Diagrama de barras",
            text: "Para variables **cualitativas** o **cuantitativas discretas**. Barras separadas; la altura es la frecuencia.",
            tone: "ok",
          },
          right: {
            title: "Histograma",
            text: "Para variables **continuas** agrupadas en **intervalos**. Rectángulos adosados.",
            tone: "info",
          },
        },
        {
          kind: "text",
          text: "Uniendo los puntos medios de las barras se obtiene el **polígono de frecuencias**.",
        },
      ],
      visual: { kind: "anim", scene: "grafico-barras-histograma", beatMs: 3500 },
    },
    {
      id: "sectores",
      type: "slide",
      help: [
        {
          label: "Partes de un todo",
          message: "Un diagrama de sectores muestra qué fracción del total representa cada valor.",
        },
        {
          label: "Ángulo",
          message: "El ángulo de cada sector es $360^\\circ$ por la frecuencia relativa, o $\\frac{360^\\circ}{N}$ por cada dato.",
        },
      ],
      title: "Diagrama de sectores",
      blocks: [
        {
          kind: "rule",
          text: "Cada valor ocupa un sector con un **ángulo proporcional a su frecuencia**.",
          formula: "\\text{ángulo} = \\dfrac{360^\\circ}{N} \\cdot f_a",
        },
        {
          kind: "example",
          lines: [{ math: "N = 40:\\ \\dfrac{360^\\circ}{40} = 9^\\circ \\text{ por persona}" }],
        },
      ],
      visual: { kind: "anim", scene: "diagrama-sectores", beatMs: 3500 },
    },
    {
      id: "explora-sectores",
      type: "slide",
      help: [
        {
          label: "Suman 360°",
          message: "Los ángulos de todos los sectores siempre suman una vuelta completa.",
        },
      ],
      title: "Explora un diagrama de sectores",
      blocks: [
        {
          kind: "text",
          text: "Cambia las frecuencias y observa los grados por persona y el ángulo de cada sector.",
        },
      ],
      visual: { kind: "tool", tool: "sectores-explorador", hint: "Cambia el total de datos: ¿qué le pasa a los grados que corresponden a cada persona?" },
    },
    {
      id: "check-grafico",
      type: "classify",
      help: [
        {
          label: "Tipo de dato",
          message: "Valores aislados o cualidades → barras. Intervalos de una variable continua → histograma. Partes de un todo → sectores.",
        },
      ],
      title: "¿Qué gráfica conviene?",
      question: "Elige el gráfico más adecuado para cada conjunto de datos.",
      groups: [
        { id: "barras", label: "Diagrama de barras", tone: "cobalt" },
        { id: "histograma", label: "Histograma", tone: "emerald" },
        { id: "sectores", label: "Diagrama de sectores", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Número de hermanos de los alumnos de la clase", group: "barras" },
        { id: "b", text: "Estaturas de la clase agrupadas en intervalos", group: "histograma" },
        { id: "c", text: "Qué parte de los alumnos prefiere cada deporte", group: "sectores" },
        { id: "d", text: "Número de goles por partido", group: "barras" },
        { id: "e", text: "Peso de los alumnos agrupado en intervalos de 5 kg", group: "histograma" },
      ],
      explanation: "Barras para valores aislados; histograma para variables continuas en intervalos; sectores para ver la proporción de un total.",
    },
    {
      id: "check-angulo",
      type: "fill_in_blank",
      help: [
        {
          label: "Grados por persona",
          message: "$360^\\circ : 40 = 9^\\circ$ por persona. Multiplica por $5$.",
        },
      ],
      title: "Un sector",
      question: "En una encuesta a $40$ personas, $5$ eligen el rojo. ¿Qué ángulo, en grados, ocupa su sector? (solo el número)",
      correctAnswers: ["45"],
      explanation: "$9^\\circ \\cdot 5 = 45^\\circ$.",
    },
  ],
};
