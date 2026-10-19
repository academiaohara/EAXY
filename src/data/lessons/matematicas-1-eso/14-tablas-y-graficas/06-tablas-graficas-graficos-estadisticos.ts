import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_14_SUBTITLE } from "@/data/lessons/shared";

export const tablasGraficasGraficosEstadisticosLesson: InteractiveLesson = {
  slug: "tablas-graficas-graficos-estadisticos",
  title: "6. Gráficos estadísticos",
  subtitle: TEMA_14_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "barras-histograma",
      type: "slide",
      help: [
        {
          label: "Antes de concluir",
          message: "Lee títulos y ejes. Un gráfico puede engañar si no sabes qué mide cada eje.",
        },
        {
          label: "Barras pegadas",
          message: "No hay huecos porque los intervalos son continuos: $155$–$160$, $160$–$165$…",
        },
        {
          label: "¿Qué indica la altura?",
          message: "La frecuencia: cuántas veces ocurre cada valor.",
        },
      ],
      title: "Diagrama de barras e histograma",
      blocks: [
        {
          kind: "compare",
          left: { title: "Diagrama de barras", text: "Barras finas y separadas. Variables cualitativas o con pocos valores.", tone: "info" },
          right: { title: "Histograma", text: "Rectángulos pegados. Muchos valores numéricos agrupados en intervalos.", tone: "ok" },
        },
        {
          kind: "text",
          text: "En ambos, la altura es proporcional a la **frecuencia**. Uniendo los puntos medios del histograma se obtiene el **polígono de frecuencias**.",
        },
      ],
      visual: { kind: "anim", scene: "grafico-barras-histograma", beatMs: 3500 },
    },
    {
      id: "check-histograma",
      type: "classify",
      help: [
        {
          label: "¿Qué quiero mostrar?",
          message: "¿Comparar categorías? ¿Mostrar cómo se reparten muchos valores numéricos en intervalos? ¿Mostrar partes de un todo? Cada objetivo tiene su gráfico.",
        },
        {
          label: "Tipo de dato y gráfico",
          message: "Barras: categorías o pocos valores. Histograma: números agrupados en intervalos. Sectores: reparto de un total.",
        },
      ],
      title: "Elegir el gráfico",
      question: "¿Qué gráfico conviene para cada conjunto de datos de una clase?",
      groups: [
        { id: "barras", label: "Diagrama de barras", tone: "cobalt" },
        { id: "histograma", label: "Histograma", tone: "emerald" },
        { id: "sectores", label: "Diagrama de sectores", tone: "violet" },
      ],
      items: [
        { id: "estaturas", text: "Estaturas agrupadas en intervalos de $5$ cm", group: "histograma" },
        { id: "tiempos", text: "Tiempos en una carrera agrupados en intervalos de $10$ s", group: "histograma" },
        { id: "hermanos", text: "Número de hermanos ($0$ a $5$) de cada alumno", group: "barras" },
        { id: "marcas", text: "Número de coches de cada marca en el aparcamiento", group: "barras" },
        { id: "deportes", text: "Qué parte del total prefiere cada deporte", group: "sectores" },
        { id: "gastos", text: "Reparto del presupuesto de la excursión entre transporte, comida y entradas", group: "sectores" },
      ],
      hint: "Intervalos con muchos datos numéricos → rectángulos adosados. Pocos valores → barras finas. Partes de un todo → sectores.",
      explanation:
        "Muchos valores numéricos en clases → histograma (rectángulos adosados). Pocos valores o categorías → barras. Para comparar partes de un total ($360°$) → sectores.",
    },
    {
      id: "sectores",
      type: "slide",
      help: [
        {
          label: "¿Por qué $9°$ por persona?",
          message: "El círculo tiene $360°$ y hay $40$ personas: $360 : 40 = 9$.",
        },
        {
          label: "Del ángulo a la frecuencia",
          message: "Si un sector mide $180°$, son $180 : 9 = 20$ personas.",
        },
      ],
      title: "Diagrama de sectores",
      blocks: [
        {
          kind: "definition",
          text: "En un **diagrama de sectores** cada valor ocupa un trozo del círculo, con un **ángulo proporcional a su frecuencia**.",
        },
        {
          kind: "rule",
          title: "Ángulo de un sector",
          formula: "\\text{ángulo} = f \\cdot \\dfrac{360^\\circ}{N}",
          text: "Los ángulos de todos los sectores suman $360^\\circ$.",
        },
      ],
      visual: { kind: "anim", scene: "diagrama-sectores", beatMs: 3500 },
    },
    {
      id: "explora-sectores",
      type: "slide",
      help: [
        {
          label: "¿Qué debo observar?",
          message: "Al aumentar el total, cada persona «vale» menos grados. Lo que importa es la proporción de cada categoría.",
        },
      ],
      title: "Explora: ángulos de un diagrama",
      blocks: [
        {
          kind: "text",
          text: "Cambia las frecuencias. ¿Qué ocurre con los grados por persona cuando aumenta el total? ¿Y con la suma de los ángulos?",
        },
      ],
      visual: { kind: "tool", tool: "sectores-explorador" },
    },
    {
      id: "check-sectores",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué representa todo el diagrama?",
          message: "Un círculo completo, que es el total de los datos. ¿Cuántos grados tiene una vuelta entera?",
        },
        {
          label: "Compruébalo con fracciones",
          message: "Medio círculo son $180°$ y un cuarto son $90°$. ¿Cuántos grados tienen todos los cuartos juntos?",
        },
      ],
      title: "Grados totales",
      question: "En un diagrama de sectores, ¿cuántos grados suman todos los sectores? (solo el número)",
      correctAnswers: ["360"],
      explanation: "Un círculo completo son $360°$.",
    },
    {
      id: "angulo-tenis",
      type: "fill_in_blank",
      help: [
        {
          label: "Grados por persona",
          message: "Con $40$ personas, cada una ocupa $360 : 40 = 9$ grados.",
        },
        {
          label: "Del ángulo a las personas",
          message: "Divide el ángulo del sector entre los grados que corresponden a cada persona.",
        },
      ],
      title: "Del sector a las personas",
      question:
        "En un diagrama de sectores de 40 personas, el sector de tenis mide 54°. ¿Cuántas personas prefieren el tenis? (solo el número)",
      correctAnswers: ["6"],
      hint: "Cada persona son $9^\\circ$.",
      explanation: "$54^\\circ : 9^\\circ = 6$ personas.",
    },
  ],
};
