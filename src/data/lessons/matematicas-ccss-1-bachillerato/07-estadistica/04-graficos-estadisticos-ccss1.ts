import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_7_SUBTITLE } from "@/data/lessons/shared";

export const graficosEstadisticosCcss1Lesson: InteractiveLesson = {
  slug: "graficos-estadisticos-ccss1",
  title: "4. Gráficos estadísticos",
  subtitle: TEMA_CCSS1_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "tipos",
      type: "slide",
      help: [{ label: "Área", message: "En un histograma el **área** de cada rectángulo es proporcional a la frecuencia; si las amplitudes son distintas, la altura es $n_i/a_i$." }],
      title: "Cada dato, su gráfico",
      blocks: [
        { kind: "facts", items: [
          { tex: "\\text{Diagrama de barras}", label: "variables cuantitativas sin agrupar o cualitativas" },
          { tex: "\\text{Diagrama de sectores}", label: "variables cualitativas: ángulo = fᵢ · 360°" },
          { tex: "\\text{Histograma}", label: "datos agrupados: rectángulos unidos" },
          { tex: "\\text{Polígono de frecuencias}", label: "une los puntos (marca de clase, frecuencia)" },
        ] },
      ],
      visual: { kind: "anim", scene: "grafico-barras-histograma" },
    },
    {
      id: "sectores",
      type: "slide",
      help: [{ label: "Regla de tres", message: "$n_i$ datos de $n$ corresponden a $\\text{ángulo}_i$ grados de $360$: $\\text{ángulo}_i = \\frac{n_i}{n}\\cdot 360$." }],
      title: "Diagrama de sectores",
      blocks: [
        { kind: "example", title: "Votación de 50 vecinos: 25 a favor, 15 en contra, 10 abstenciones", lines: [
          { math: "\\text{a favor: } \\dfrac{25}{50}\\cdot 360 = 180^\\circ\\quad \\text{en contra: } 108^\\circ\\quad \\text{abstención: } 72^\\circ" },
        ] },
      ],
      visual: { kind: "tool", tool: "sectores-explorador", hint: "Cambia las frecuencias de las categorías: cada sector mide su frecuencia relativa por 360°." },
    },
    {
      id: "check-angulo",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$\\frac{15}{50}\\cdot 360$." }],
      title: "Ángulo de un sector",
      question: "En la votación, $15$ de $50$ vecinos votan en contra. ¿Qué ángulo tiene su sector? (grados, solo el número)",
      correctAnswers: ["108"],
      explanation: "$\\dfrac{15}{50}\\cdot 360 = 0{,}3\\cdot 360 = 108^\\circ$.",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Cualitativa → sectores o barras; discreta → barras; continua agrupada → histograma." }],
      title: "¿Qué gráfico usar?",
      question: "Elige el gráfico más adecuado.",
      groups: [
        { id: "ba", label: "Diagrama de barras", tone: "cobalt" },
        { id: "se", label: "Diagrama de sectores", tone: "amber" },
        { id: "hi", label: "Histograma", tone: "emerald" },
      ],
      items: [
        { id: "a", text: "Número de hijos de 50 familias", group: "ba" },
        { id: "b", text: "Reparto de votos entre a favor, en contra y abstención", group: "se" },
        { id: "c", text: "Precio de habitación de 40 hoteles agrupado en intervalos", group: "hi" },
        { id: "d", text: "Número de hermanos de los alumnos de una clase", group: "ba" },
        { id: "e", text: "Proporción de cada marca de cerveza en las ventas", group: "se" },
        { id: "f", text: "Pesos de 30 estudiantes agrupados en clases de 10 kg", group: "hi" },
      ],
      hint: "El histograma se reserva para datos agrupados en intervalos; los sectores muestran partes de un todo.",
    },
    {
      id: "check-histograma",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Si una clase es doble de ancha pero tiene los mismos datos, su densidad es la mitad." }],
      title: "Histograma con clases distintas",
      question: "Si las clases de un histograma tienen **distinta amplitud**, la altura del rectángulo debe ser…",
      choices: [
        { id: "a", label: "$\\dfrac{n_i}{a_i}$: así el área es proporcional a la frecuencia" },
        { id: "b", label: "$n_i$ en todos los casos", incorrectFeedback: "Entonces una clase muy ancha parecería más frecuente de lo que es." },
        { id: "c", label: "$a_i$", incorrectFeedback: "La altura debe depender de la frecuencia, no solo de la amplitud." },
        { id: "d", label: "$f_i\\cdot a_i$", incorrectFeedback: "Habría que dividir por la amplitud, no multiplicar." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "El área $= \\dfrac{n_i}{a_i}\\cdot a_i = n_i$: el área de cada rectángulo es proporcional a la frecuencia que representa.",
    },
  ],
};
