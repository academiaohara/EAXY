import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_7_SUBTITLE } from "@/data/lessons/shared";

export const tablasFrecuenciasCcss1Lesson: InteractiveLesson = {
  slug: "tablas-frecuencias-ccss1",
  title: "2. Tablas de frecuencias",
  subtitle: TEMA_CCSS1_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "frecuencias",
      type: "slide",
      help: [{ label: "Propiedades", message: "$\\sum n_i = n$, $\\sum f_i = 1$, la última $N_i$ es $n$ y la última $F_i$ es $1$." }],
      title: "Cuatro tipos de frecuencia",
      blocks: [
        { kind: "facts", items: [
          { tex: "n_i", label: "absoluta: veces que aparece el valor xᵢ" },
          { tex: "f_i = \\dfrac{n_i}{n}", label: "relativa (suma 1)" },
          { tex: "N_i = n_1 + \\cdots + n_i", label: "absoluta acumulada: datos ≤ xᵢ" },
          { tex: "F_i = \\dfrac{N_i}{n}", label: "relativa acumulada (la última vale 1)" },
        ] },
      ],
      visual: { kind: "anim", scene: "tabla-frecuencias" },
    },
    {
      id: "hijos",
      type: "slide",
      help: [{ label: "Cómo se lee", message: "Cada fila es un valor de la variable. $N_i$ responde a «¿cuántos datos hay como máximo así de grandes?»." }],
      title: "El número de hijos de 50 familias",
      blocks: [
        { kind: "example", title: "Tabla de frecuencias", lines: [
          { math: "x_i:\\ 0,\\ 1,\\ 2,\\ 3,\\ 4,\\ 5,\\ 6" },
          { math: "n_i:\\ 2,\\ 4,\\ 21,\\ 15,\\ 6,\\ 1,\\ 1\\qquad (n = 50)" },
          { math: "N_i:\\ 2,\\ 6,\\ 27,\\ 42,\\ 48,\\ 49,\\ 50\\qquad F_i:\\ 0{,}04,\\ 0{,}12,\\ 0{,}54,\\ 0{,}84,\\ 0{,}96,\\ 0{,}98,\\ 1" },
        ] },
      ],
      visual: { kind: "tool", tool: "tabla-parametros-explorador", params: { a: 0 }, hint: "Edita las frecuencias y observa Σf, Σfx, la media y la varianza. La estructura de la tabla es la misma." },
    },
    {
      id: "check-maximo-dos",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Mira la frecuencia acumulada de $x = 2$: $2 + 4 + 21$." }],
      title: "Como máximo dos hijos",
      question: "¿Cuántas de las $50$ familias tienen como máximo dos hijos? (solo el número)",
      correctAnswers: ["27"],
      explanation: "$N_3 = 2 + 4 + 21 = 27$ familias.",
    },
    {
      id: "check-entre",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Más de $1$ y como máximo $3$: valores $2$ y $3$. O bien $N(3) - N(1) = 42 - 6$." }],
      title: "Más de uno, como máximo tres",
      question: "¿Cuántas familias tienen más de un hijo pero como máximo tres? (solo el número)",
      correctAnswers: ["36"],
      explanation: "$21 + 15 = 36$, o con acumuladas: $N(3) - N(1) = 42 - 6 = 36$.",
    },
    {
      id: "check-porcentaje",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Más de $3$ hijos: valores $4$, $5$ y $6$. O bien $1 - F(3) = 1 - 0{,}84$." }],
      title: "Porcentaje con más de tres hijos",
      question: "¿Qué porcentaje de familias tiene más de $3$ hijos? (solo el número, en %)",
      correctAnswers: ["16"],
      explanation: "$f_4 + f_5 + f_6 = 0{,}12 + 0{,}02 + 0{,}02 = 0{,}16$, o $1 - F_4 = 1 - 0{,}84 = 0{,}16$: el $16\\,\\%$.",
    },
    {
      id: "check-relativa",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "$f_i = \\frac{n_i}{n}$." }],
      title: "Frecuencia relativa",
      question: "Con $n_4 = 15$ familias de $3$ hijos entre $50$, ¿cuál es la frecuencia relativa $f_4$?",
      choices: [
        { id: "a", label: "$0{,}3$" },
        { id: "b", label: "$0{,}84$", incorrectFeedback: "$0{,}84$ es la frecuencia relativa **acumulada** $F_4$." },
        { id: "c", label: "$15$", incorrectFeedback: "$15$ es la frecuencia absoluta." },
        { id: "d", label: "$3{,}33$", incorrectFeedback: "Has dividido $50$ entre $15$; hay que hacer $15 : 50$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$f_4 = \\dfrac{15}{50} = 0{,}3$: el $30\\,\\%$ de las familias tiene tres hijos.",
    },
  ],
};
