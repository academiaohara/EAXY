import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_10_SUBTITLE } from "@/data/lessons/shared";

export const dispersion1bachLesson: InteractiveLesson = {
  slug: "dispersion-1bach",
  title: "7. Rango, varianza y desviación típica",
  subtitle: TEMA_1BACH_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "idea",
      type: "slide",
      help: [{ label: "Misma media", message: "Dos clases pueden tener la misma nota media y estar muy distintas: una con todos cerca de la media y otra con notas muy repartidas." }],
      title: "La media no lo cuenta todo",
      blocks: [
        { kind: "text", text: "Clase A: $4, 3, 5, 6, 4, 5, 5, 7, 5, 6$. Clase B: $1, 4, 3, 5, 6, 8, 2, 7, 5, 9$. **Las dos tienen media $5$**, pero en B las notas están mucho más repartidas. (La animación usa las ocho primeras notas de A para ver cómo se calculan las desviaciones.)" },
        { kind: "rule", title: "Rango", formula: "R = x_{\\max} - x_{\\min}\\qquad R_A = 7 - 3 = 4\\quad R_B = 9 - 1 = 8" },
      ],
      visual: { kind: "anim", scene: "varianza-desviaciones", params: { nums: [4, 3, 5, 6, 4, 5, 5, 7] } },
    },
    {
      id: "varianza",
      type: "slide",
      help: [{ label: "Por qué al cuadrado", message: "La media de las desviaciones siempre vale $0$ (unas compensan a otras). Al elevarlas al cuadrado todas son positivas." }],
      title: "Varianza y desviación típica",
      blocks: [
        { kind: "facts", items: [
          { tex: "s^2 = \\dfrac{\\sum (x_i - \\bar{x})^2\\, n_i}{n} = \\dfrac{\\sum x_i^2 n_i}{n} - \\bar{x}^{\\,2}", label: "varianza" },
          { tex: "s = \\sqrt{s^2}", label: "desviación típica (mismas unidades que los datos)" },
        ] },
        { kind: "example", title: "Notas de las dos clases", lines: [
          { math: "\\sum d_i^2 = 12\\ (A),\\quad 60\\ (B)\\ \\Rightarrow\\ s_A^2 = \\dfrac{12}{10} = 1{,}2,\\quad s_B^2 = \\dfrac{60}{10} = 6" },
          { math: "s_A = \\sqrt{1{,}2} \\approx 1{,}10\\qquad s_B = \\sqrt{6} \\approx 2{,}45" },
        ] },
        { kind: "text", text: "En este curso dividimos entre $n$. (Si se divide entre $n - 1$, como en la varianza muestral, sale $\\frac{12}{9} = 1{,}33$ y $\\frac{60}{9} = 6{,}67$.)" },
      ],
      visual: { kind: "tool", tool: "tabla-parametros-explorador", params: { a: 0 }, hint: "La columna fx² permite calcular la varianza como Σfx²/n − media²." },
    },
    {
      id: "check-rango",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Mayor menos menor." }],
      title: "Rango de la clase B",
      question: "Notas de la clase B: $1, 4, 3, 5, 6, 8, 2, 7, 5, 9$. ¿Cuánto vale el rango? (solo el número)",
      correctAnswers: ["8"],
      explanation: "$R = 9 - 1 = 8$, el doble que en la clase A.",
    },
    {
      id: "check-varianza",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Las desviaciones al cuadrado de A suman $12$ y hay $10$ datos." }],
      title: "Varianza de la clase A",
      question: "La suma de los cuadrados de las desviaciones de la clase A es $12$ y hay $10$ alumnos. ¿Cuánto vale la varianza $s^2$ (dividiendo entre $n$)? (decimal)",
      correctAnswers: ["1,2", "1.2"],
      explanation: "$s^2 = \\dfrac{12}{10} = 1{,}2$ y $s = \\sqrt{1{,}2} \\approx 1{,}10$.",
    },
    {
      id: "check-sd",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$s = \\sqrt{s^2}$ con $s^2 = 6$." }],
      title: "Desviación típica de la clase B",
      question: "La varianza de la clase B es $s^2 = 6$. ¿Cuánto vale la desviación típica? (decimal con 2 cifras)",
      correctAnswers: ["2,45", "2.45", "2,449", "2.449"],
      explanation: "$s = \\sqrt{6} \\approx 2{,}45$: mayor que $s_A \\approx 1{,}10$, lo que refleja la mayor dispersión.",
    },
    {
      id: "check-cero",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Prueba con $2, 4, 6$: media $4$, desviaciones $-2, 0, 2$." }],
      title: "Suma de desviaciones",
      question: "La suma $\\sum (x_i - \\bar{x})$ de las desviaciones respecto de la media vale siempre…",
      choices: [
        { id: "a", label: "$0$" },
        { id: "b", label: "la varianza", incorrectFeedback: "La varianza es la media de las desviaciones **al cuadrado**." },
        { id: "c", label: "$n$", incorrectFeedback: "No depende del tamaño muestral." },
        { id: "d", label: "un número positivo", incorrectFeedback: "Las desviaciones negativas compensan exactamente a las positivas." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Por eso se elevan al cuadrado: $\\sum (x_i - \\bar{x}) = 0$ para cualquier conjunto de datos.",
    },
  ],
};
