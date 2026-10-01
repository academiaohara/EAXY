import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_14_SUBTITLE } from "@/data/lessons/shared";

export const tablasGraficasGraficosEstadisticosLesson: InteractiveLesson = {
  slug: "tablas-graficas-graficos-estadisticos",
  title: "6. Gráficos estadísticos",
  subtitle: TEMA_14_SUBTITLE,
  steps: [
    {
      id: "por-que-graficos",
      type: "concept",
      title: "Tablas y gráficos",
      content: [
        "Las **tablas** y **gráficos** son formas muy eficaces de comunicar datos: «entran por los ojos».",
        "Elige el gráfico según el **tipo de variable** y cuántos **valores distintos** hay.",
        "Siempre mira con atención **títulos y ejes** antes de sacar conclusiones.",
      ],
    },
    {
      id: "barras",
      type: "concept",
      title: "Diagrama de barras",
      content: [
        "Formado por **barras finas** (una por valor o categoría).",
        "Sirve para variables **cualitativas** o cuantitativas con **pocos** valores (número de hermanos, marcas de coches…).",
        "La **altura** de cada barra es proporcional a la **frecuencia absoluta**.",
      ],
    },
    {
      id: "histograma",
      type: "concept",
      title: "Histograma",
      content: [
        "Rectángulos **anchos adosados** (sin huecos entre clases).",
        "Para variables **cuantitativas** con **muchos** valores o **intervalos** (estaturas 155–160 cm, 160–165 cm…).",
        "El **área** de cada barra es proporcional a la frecuencia (todos los alumnos entre 155 y 160 cm, por ejemplo).",
      ],
    },
    {
      id: "poligono-sectores",
      type: "concept",
      title: "Polígono y diagrama de sectores",
      content: [
        "**Polígono de frecuencias**: une los extremos superiores de barras o los **puntos medios** de clases de un histograma. Solo para variables cuantitativas.",
        "**Diagrama de sectores** (circular): cada sector es un valor; el **ángulo** es proporcional a la frecuencia ($360°$ repartidos según $N$).",
        "Los sectores ayudan a ver **evolución** o comparar partes de un todo (notas por evaluación, deportes preferidos…).",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Resumen rápido",
          items: [
            { title: "Barras", caption: "Pocos valores / cualitativas", tone: "cobalt" },
            { title: "Histograma", caption: "Intervalos, muchos datos", tone: "emerald" },
            { title: "Sectores", caption: "Partes de un total (360°)", tone: "violet" },
          ],
        },
      ],
    },
    {
      id: "sectores-ejemplo",
      type: "animated_solution",
      title: "Ángulos en un diagrama de sectores",
      content: ["Con 40 entrevistados repartimos $360°$ entre 40: a cada uno le corresponden $9°$."],
      frames: [
        {
          math: "360° : 40 = 9°\\ \\text{por persona}",
          caption: "Fútbol: 20 → $20 \\cdot 9° = 180°$.",
        },
        {
          math: "10 \\cdot 9° = 90°\\ \\text{(baloncesto)}",
          caption: "Cada frecuencia × 9° da el ángulo del sector.",
        },
      ],
    },
    {
      id: "check-histograma",
      type: "multiple_choice",
      title: "Elegir el gráfico",
      question: "¿Qué gráfico conviene para **estaturas agrupadas** en intervalos de 5 cm en una clase?",
      options: [
        { id: "a", text: "Diagrama de barras finas con 36 barras sueltas" },
        { id: "b", text: "Histograma" },
        { id: "c", text: "Solo la recta numérica" },
      ],
      correctOptionId: "b",
      explanation: "Muchos valores numéricos en clases → histograma (rectángulos adosados).",
    },
    {
      id: "check-sectores",
      type: "fill_in_blank",
      title: "Grados totales",
      question: "En un diagrama de sectores, ¿cuántos grados suman todos los sectores? (solo el número)",
      correctAnswers: ["360"],
      explanation: "Un círculo completo son $360°$.",
    },
  ],
};
