import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_10_SUBTITLE } from "@/data/lessons/shared";

export const muestreoEstimacionCcss1Lesson: InteractiveLesson = {
  slug: "muestreo-estimacion-ccss1",
  title: "11. Muestreo y estimación puntual",
  subtitle: TEMA_CCSS1_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "muestreo",
      type: "slide",
      help: [{ label: "Idea", message: "Para que una muestra represente a la población debe elegirse al azar y evitar sesgos. La estimación puntual usa un valor de la muestra para aproximar un parámetro de la población." }],
      title: "De la muestra a la población",
      blocks: [
        { kind: "text", text: "Casi nunca se puede estudiar a toda la **población**. Se toma una **muestra** y, con ella, se **estima** un parámetro desconocido: la proporción $p$, la media $\\mu$…" },
        {
          kind: "facts",
          items: [
            { tex: "\\hat p = \\dfrac{x}{n}", label: "proporción muestral → estima p" },
            { tex: "\\bar x = \\dfrac{\\sum x_i}{n}", label: "media muestral → estima μ" },
          ],
        },
        { kind: "text", text: "Una estimación puntual es un solo número y no dice cuánto puede equivocarse: por eso se completa con un **intervalo de confianza**." },
      ],
      visual: { kind: "anim", scene: "estadistica-conceptos" },
    },
    {
      id: "tipos",
      type: "slide",
      help: [{ label: "Idea", message: "En el muestreo aleatorio simple todos los individuos tienen la misma probabilidad. En el estratificado se respeta la proporción de cada grupo; en el sistemático se elige uno de cada k." }],
      title: "Técnicas de muestreo",
      blocks: [
        {
          kind: "compare",
          left: { title: "Aleatorio simple", text: "Todos los individuos tienen la misma probabilidad de ser elegidos (sorteo, números aleatorios)." },
          right: { title: "Estratificado", text: "La población se divide en estratos (edad, sexo, barrio) y se sortea en cada uno, en proporción a su tamaño." },
        },
        { kind: "text", text: "En el **muestreo sistemático** se elige un punto de partida al azar y después uno de cada $k$ individuos de una lista. Si la muestra no se elige al azar (voluntarios, solo quien pasa por la calle…) aparece un **sesgo**." },
      ],
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Mira si hay sorteo, si se respeta la proporción de grupos, o si la muestra se elige por comodidad." }],
      title: "¿Qué muestreo es?",
      question: "Clasifica cada procedimiento.",
      groups: [
        { id: "simple", label: "Aleatorio simple", tone: "cobalt" },
        { id: "estrat", label: "Estratificado", tone: "emerald" },
        { id: "sesgo", label: "Con sesgo", tone: "rose" },
      ],
      items: [
        { id: "a", text: "Sortear $50$ alumnos de la lista del instituto", group: "simple" },
        { id: "b", text: "Elegir $30$ alumnos de cada curso en proporción al número de alumnos del curso", group: "estrat" },
        { id: "c", text: "Preguntar solo a los que salen primero del instituto", group: "sesgo" },
        { id: "d", text: "Publicar una encuesta en internet y analizar las respuestas de quien quiera contestar", group: "sesgo" },
      ],
      hint: "Una muestra es representativa si se elige al azar, no por comodidad.",
    },
    {
      id: "check-puntual",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$\\hat p = 700/2\\,000$. Con $8$ millones de votantes se espera $\\hat p\\cdot 8\\,000\\,000$." }],
      title: "Estimación puntual",
      question: "En una muestra de $2\\,000$ votantes de un total de $8$ millones, $700$ votarán a un partido. ¿Cuántos votos se estiman (estimación puntual) para el partido, en millones? (con dos decimales)",
      correctAnswers: ["2,8", "2.8", "2,80", "2.80"],
      explanation: "$\\hat p = 0{,}35$ y $0{,}35\\cdot 8\\,000\\,000 = 2\\,800\\,000$ votos, es decir, $2{,}8$ millones. Es una estimación puntual: sin un intervalo de confianza no sabemos cuánto puede fallar.",
    },
    {
      id: "check-tamano",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Pista", message: "Peor caso, $\\hat p = 0{,}5$: $E = 1{,}96\\sqrt{\\dfrac{0{,}25}{n}} \\leq 0{,}03 \\Rightarrow n \\geq \\left(\\dfrac{1{,}96}{0{,}03}\\right)^2\\cdot 0{,}25$." }],
      title: "¿Qué tamaño de muestra?",
      question: "Se quiere estimar una proporción con un error máximo del $3\\,\\%$ y una confianza del $95\\,\\%$. Sin información previa se toma $\\hat p = 0{,}5$ (el peor caso). ¿Cuál es el menor tamaño de muestra suficiente? (entero)",
      correctAnswers: ["1068"],
      explanation: "$n \\geq \\left(\\dfrac{1{,}96}{0{,}03}\\right)^2\\cdot 0{,}5\\cdot 0{,}5 = 1\\,067{,}1$, luego $n = 1\\,068$. Por eso muchas encuestas usan en torno a $1\\,000$ personas, sea cual sea el tamaño del país.",
    },
    {
      id: "check-sesgo",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Aumentar $n$ reduce el error aleatorio, pero no corrige un sesgo en la forma de elegir la muestra." }],
      title: "Más datos, ¿mejor?",
      question: "Una radio pregunta por internet a sus oyentes si les gusta la radio y obtiene $50\\,000$ respuestas. ¿Qué se puede decir de la estimación?",
      choices: [
        { id: "a", label: "Está sesgada: responden los oyentes motivados, y una muestra enorme no corrige ese sesgo" },
        { id: "b", label: "Es muy fiable porque la muestra es muy grande", incorrectFeedback: "Un tamaño grande reduce el error aleatorio, pero no el sesgo de selección." },
        { id: "c", label: "Es fiable si hay más de $1\\,000$ respuestas", incorrectFeedback: "El tamaño no arregla que la muestra no sea aleatoria." },
        { id: "d", label: "No se puede estimar nada", incorrectFeedback: "Se puede estimar el comportamiento de los oyentes que contestan, pero no el de toda la población." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Una muestra autoseleccionada no representa a la población. Lo importante no es solo el tamaño, sino **cómo** se elige.",
    },
  ],
};
