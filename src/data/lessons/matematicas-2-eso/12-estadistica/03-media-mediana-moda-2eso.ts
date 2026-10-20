import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_12_SUBTITLE } from "@/data/lessons/shared";

export const mediaMedianaModa2esoLesson: InteractiveLesson = {
  slug: "media-mediana-moda-2eso",
  title: "3. Media, mediana y moda",
  subtitle: TEMA_2ESO_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "tres",
      type: "slide",
      help: [
        {
          label: "Ordena primero",
          message: "La mediana se busca en los datos **ordenados** de menor a mayor.",
        },
        {
          label: "Para qué cada una",
          message: "La media usa todos los datos y se ve afectada por los extremos. La mediana es el centro. La moda es lo más frecuente (y sirve incluso con datos cualitativos).",
        },
      ],
      title: "Los tres promedios",
      blocks: [
        {
          kind: "text",
          text: "Número de hermanos de $9$ alumnos: $1, 3, 2, 0, 1, 3, 4, 2, 2$.",
        },
        {
          kind: "facts",
          items: [
            { tex: "\\bar{x} = \\dfrac{18}{9} = 2", label: "media: suma entre el número de datos" },
            { tex: "Me = 2", label: "mediana: el valor central ($0,1,1,2,2,2,3,3,4$)" },
            { tex: "Mo = 2", label: "moda: el que más se repite" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "media-mediana-moda", beatMs: 3500 },
    },
    {
      id: "par",
      type: "slide",
      help: [
        {
          label: "Promedio de los centrales",
          message: "Con un número par de datos, los dos centrales no coinciden: la mediana es su promedio.",
        },
      ],
      title: "Mediana con un número par de datos",
      blocks: [
        {
          kind: "rule",
          text: "Si hay un número **par** de datos, la mediana es el **promedio de los dos centrales**.",
        },
      ],
      visual: { kind: "anim", scene: "mediana-par", beatMs: 3500 },
    },
    {
      id: "frecuencias",
      type: "slide",
      help: [
        {
          label: "Cada valor, sus veces",
          message: "En lugar de sumar uno a uno, se multiplica cada valor por su frecuencia: así $5$ alumnos con $0$ hermanos aportan $0 \\cdot 5$.",
        },
        {
          label: "Mediana con tabla",
          message: "Con $N = 40$, los datos centrales son el $20.^\\circ$ y el $21.^\\circ$: se localizan con las frecuencias acumuladas.",
        },
      ],
      title: "Con una tabla de frecuencias",
      blocks: [
        {
          kind: "example",
          title: "Hermanos de 40 alumnos",
          lines: [
            { math: "x_i:\\ 0, 1, 2, 3, 4 \\qquad f_i:\\ 5, 12, 15, 6, 2" },
            { math: "\\bar{x} = \\dfrac{0 \\cdot 5 + 1 \\cdot 12 + 2 \\cdot 15 + 3 \\cdot 6 + 4 \\cdot 2}{40} = \\dfrac{68}{40} = 1{,}7" },
            { math: "Me = 2 \\quad (\\text{acumuladas } 5, 17, 32\\dots) \\qquad Mo = 2" },
          ],
        },
        {
          kind: "rule",
          formula: "\\bar{x} = \\dfrac{x_1 f_1 + x_2 f_2 + \\dots}{N}",
        },
      ],
      arrange: "stack",
    },
    {
      id: "explora",
      type: "slide",
      help: [
        {
          label: "Añade un valor extremo",
          message: "Prueba a añadir un dato muy grande: la media sube mucho; la mediana casi no cambia.",
        },
      ],
      title: "Explora los datos",
      blocks: [
        {
          kind: "text",
          text: "Añade o quita datos y observa cómo reaccionan la media, la mediana y la moda.",
        },
      ],
      visual: { kind: "tool", tool: "datos-explorador", hint: "Añade un valor muy alto: ¿qué parámetro cambia más?" },
    },
    {
      id: "check-media",
      type: "fill_in_blank",
      help: [
        {
          label: "Suma y divide",
          message: "$4 + 6 + 8 + 10 + 12 = 40$ entre $5$ datos.",
        },
      ],
      title: "Una media",
      question: "Calcula la media de $4, 6, 8, 10, 12$. (solo el número)",
      correctAnswers: ["8"],
      explanation: "$\\frac{4 + 6 + 8 + 10 + 12}{5} = \\frac{40}{5} = 8$.",
    },
    {
      id: "check-mediana",
      type: "predict",
      help: [
        {
          label: "Ordena",
          message: "$1, 3, 3, 5, 7, 9$: son seis datos, los centrales son $3$ y $5$.",
        },
      ],
      title: "Una mediana",
      question: "¿Cuál es la mediana de $7, 3, 9, 1, 5, 3$?",
      mode: "choice",
      choices: [
        { id: "4", label: "$4$" },
        { id: "3", label: "$3$", incorrectFeedback: "Es la moda. Con seis datos ordenados, la mediana es el promedio del tercero y el cuarto." },
        { id: "5", label: "$5$", incorrectFeedback: "Has tomado el cuarto dato; los centrales son el tercero ($3$) y el cuarto ($5$)." },
        { id: "4.7", label: "$4{,}7$", incorrectFeedback: "Es la media ($28 : 6 \\approx 4{,}7$), no la mediana." },
      ],
      correctChoiceId: "4",
      shuffleChoices: true,
      explanation: "Ordenados: $1, 3, 3, 5, 7, 9$. $Me = \\frac{3 + 5}{2} = 4$.",
    },
    {
      id: "check-tabla",
      type: "fill_in_blank",
      help: [
        {
          label: "Valor por frecuencia",
          message: "Suma $0 \\cdot 5 + 1 \\cdot 12 + 2 \\cdot 15 + 3 \\cdot 6 + 4 \\cdot 2$ y divide entre $40$.",
        },
      ],
      title: "Media con tabla",
      question: "En la tabla de hermanos ($f = 5, 12, 15, 6, 2$ para $0, 1, 2, 3, 4$ hermanos), ¿cuál es la media? (escribe el número con coma)",
      correctAnswers: ["1,7", "1.7"],
      explanation: "$\\frac{68}{40} = 1{,}7$ hermanos por alumno.",
    },
  ],
};
