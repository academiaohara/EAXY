import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_7_SUBTITLE } from "@/data/lessons/shared";

export const continuidad3esoLesson: InteractiveLesson = {
  slug: "continuidad-3eso",
  title: "3. Continuidad y discontinuidades",
  subtitle: TEMA_3ESO_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "continua-discontinua",
      type: "slide",
      help: [
        {
          label: "Lápiz",
          message: "Si puedes dibujar la gráfica entera sin levantar el lápiz, es continua.",
        },
        {
          label: "Dos causas",
          message: "La gráfica puede ser discontinua porque la variable independiente solo toma valores sueltos (vender $0, 1, 2$ aparatos) o porque la dependiente da saltos (tarifas por tramos).",
        },
      ],
      title: "Funciones continuas y discontinuas",
      blocks: [
        {
          kind: "definition",
          text: "Una función es **continua** cuando no presenta discontinuidades: su gráfica se traza **sin levantar el lápiz** del papel. Los **saltos bruscos** son discontinuidades.",
        },
        {
          kind: "text",
          text: "Una función puede ser continua en un tramo y tener discontinuidades en otros lugares.",
        },
      ],
      visual: { kind: "anim", scene: "funcion-continuidad" },
    },
    {
      id: "tarifas",
      type: "slide",
      help: [
        {
          label: "Por tramos",
          message: "El precio no cambia hasta que cruzas un umbral (por ejemplo, empezar un minuto nuevo): entonces salta.",
        },
        {
          label: "Puntos unidos",
          message: "No se pueden unir los puntos si los valores intermedios no tienen sentido: no existen $2{,}5$ fotocopias.",
        },
      ],
      title: "Cuándo no se pueden unir los puntos",
      blocks: [
        {
          kind: "example",
          title: "Fotocopias a 0,10 € cada una",
          lines: [
            { math: "\\text{1 copia} \\to 0{,}10;\\ \\text{2 copias} \\to 0{,}20;\\ \\text{3 copias} \\to 0{,}30" },
            { math: "\\text{No existen } 2{,}5 \\text{ copias: los puntos no se unen}" },
          ],
        },
        {
          kind: "example",
          title: "Aparcamiento por horas",
          lines: [
            { math: "\\text{El precio cambia a saltos al empezar cada nueva hora}" },
            { math: "\\text{→ función discontinua}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-continua",
      type: "predict",
      help: [
        {
          label: "Valores intermedios",
          message: "Piensa si entre dos valores consecutivos de la variable independiente tienen sentido los intermedios.",
        },
      ],
      title: "¿Continua?",
      question: "La estatura de una persona entre los $10$ y los $16$ años, en función de la edad, ¿es continua o discontinua?",
      mode: "choice",
      choices: [
        { id: "con", label: "Continua: crece suavemente, sin saltos" },
        { id: "dis", label: "Discontinua: crece a saltos", incorrectFeedback: "La estatura varía de forma suave con el tiempo, sin saltos bruscos." },
      ],
      correctChoiceId: "con",
      shuffleChoices: true,
      explanation: "Se puede trazar la gráfica sin levantar el lápiz: es continua.",
    },
    {
      id: "check-discontinua",
      type: "predict",
      help: [
        {
          label: "Número entero",
          message: "No se pueden comprar $2{,}7$ entradas: la variable independiente solo toma valores enteros.",
        },
      ],
      title: "¿Discontinua?",
      question: "El coste de comprar entradas de cine a $8$ € en función del número de entradas, ¿es continua o discontinua?",
      mode: "choice",
      choices: [
        { id: "dis", label: "Discontinua: solo tiene sentido un número entero de entradas" },
        { id: "con", label: "Continua: la gráfica es una recta", incorrectFeedback: "Los puntos están alineados, pero entre ellos no hay nada: son puntos aislados." },
      ],
      correctChoiceId: "dis",
      shuffleChoices: true,
      explanation: "La gráfica son puntos aislados $(1, 8), (2, 16), \\dots$: es discontinua.",
    },
    {
      id: "check-aparcamiento",
      type: "predict",
      help: [
        {
          label: "Tarifa por tramos",
          message: "Si la tarifa es la misma durante toda una hora y salta al empezar la siguiente, la gráfica tiene escalones.",
        },
      ],
      title: "Escalones",
      question: "Un aparcamiento cobra $2$ € por cada hora o fracción. ¿Cómo es la gráfica del precio según el tiempo?",
      mode: "choice",
      choices: [
        { id: "esc", label: "Una escalera: tramos horizontales con saltos" },
        { id: "rec", label: "Una recta inclinada", incorrectFeedback: "El precio no sube de forma continua: se mantiene dentro de cada hora y salta al empezar la siguiente." },
        { id: "cte", label: "Una recta horizontal", incorrectFeedback: "El precio sube con el tiempo." },
      ],
      correctChoiceId: "esc",
      shuffleChoices: true,
      explanation: "El precio es constante en cada hora y salta al comenzar la siguiente: función escalonada, discontinua.",
    },
  ],
};
