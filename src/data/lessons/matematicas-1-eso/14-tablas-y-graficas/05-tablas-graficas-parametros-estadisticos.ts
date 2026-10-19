import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_14_SUBTITLE } from "@/data/lessons/shared";

export const tablasGraficasParametrosEstadisticosLesson: InteractiveLesson = {
  slug: "tablas-graficas-parametros-estadisticos",
  title: "5. Media, mediana y moda",
  subtitle: TEMA_14_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "media-mediana-moda",
      type: "slide",
      help: [
        {
          label: "El reparto equitativo",
          message: "La media es lo que le tocaría a cada uno si repartieras el total a partes iguales.",
        },
        {
          label: "El que queda en medio",
          message: "Ordena los datos y busca el central. Mitad de los datos son menores y mitad mayores.",
        },
        {
          label: "El más popular",
          message: "La moda es lo que más se repite, como el sabor de helado más pedido.",
        },
      ],
      title: "Media, mediana y moda",
      blocks: [
        {
          kind: "definition",
          text: "La **media** es la suma de todos los valores dividida entre el número de ellos.",
        },
        {
          kind: "definition",
          text: "La **mediana** es el valor central de los datos **ordenados**. Con un número par de datos, el promedio de los dos centrales.",
        },
        {
          kind: "definition",
          text: "La **moda** es el dato con mayor frecuencia: el que más se repite.",
        },
      ],
      visual: { kind: "anim", scene: "media-mediana-moda", beatMs: 3500 },
    },
    {
      id: "ejemplo-resuelto",
      type: "slide",
      help: [
        {
          label: "Tres resúmenes distintos",
          message: "Media: reparto. Mediana: centro. Moda: el más repetido. Cada uno cuenta algo diferente de los mismos datos.",
        },
        {
          label: "Comprueba la mediana",
          message: "Con ocho datos hay dos centrales (el cuarto y el quinto): $8$ y $9$.",
        },
      ],
      title: "Con un número par de datos",
      blocks: [
        {
          kind: "example",
          title: "Ocho datos: 4, 6, 8, 8, 9, 10, 10, 10",
          lines: [
            { math: "\\text{media} = \\dfrac{65}{8} = 8{,}125" },
            { math: "\\text{mediana} = \\dfrac{8 + 9}{2} = 8{,}5", note: "los dos centrales" },
            { math: "\\text{moda} = 10", note: "aparece tres veces" },
          ],
        },
        {
          kind: "warning",
          text: "Con variables **cualitativas** solo tiene sentido la moda.",
        },
      ],
      visual: { kind: "anim", scene: "mediana-par", beatMs: 3500 },
    },
    {
      id: "explora-datos",
      type: "slide",
      help: [
        {
          label: "¿Qué debo observar?",
          message: "Un dato muy alto sube mucho la media, pero apenas mueve la mediana. Por eso la mediana resiste mejor los valores extremos.",
        },
      ],
      title: "Explora: modifica los datos",
      blocks: [
        {
          kind: "text",
          text: "Sube un dato hasta $10$. ¿Cuál de los tres parámetros cambia más? ¿Puedes hacer que haya **dos modas**?",
        },
      ],
      visual: { kind: "tool", tool: "datos-explorador" },
    },
    {
      id: "check-moda-dado",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué es la moda?",
          message: "El valor que más veces aparece. No es el mayor, ni el del medio.",
        },
        {
          label: "Cuenta con orden",
          message: "Haz una tabla con las seis caras del dado y apunta cuántas veces sale cada una.",
        },
      ],
      title: "Moda del dado",
      question: "Al tirar un dado 10 veces: $1, 5, 3, 1, 2, 6, 4, 1, 4, 3$. ¿Cuál es la moda? (solo el número)",
      correctAnswers: ["1"],
      hint: "Cuenta cuántas veces sale cada cara: la moda es el valor que más se repite.",
      explanation: "El 1 sale 3 veces; el 3 y el 4 solo 2.",
    },
    {
      id: "check-media",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Cómo se calcula la media?",
          message: "Se suman los datos y se divide entre cuántos son. Aquí son tres.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "La media siempre queda entre el dato menor y el mayor.",
        },
      ],
      title: "Media simple",
      question: "Media de $2, 4, 6$ (escribe solo el número)",
      correctAnswers: ["4"],
      explanation: "$(2 + 4 + 6) / 3 = 4$.",
    },
    {
      id: "check-mediana",
      type: "fill_in_blank",
      help: [
        {
          label: "Primero, ordena",
          message: "La mediana se busca en los datos ordenados de menor a mayor.",
        },
        {
          label: "Siete datos",
          message: "Con siete datos el central es el cuarto: tres a cada lado.",
        },
      ],
      title: "Mediana de siete datos",
      question: "Mediana de los siete datos $9, 3, 7, 1, 5, 8, 2$ (escribe solo el número)",
      correctAnswers: ["5"],
      hint: "Ordénalos: $1, 2, 3, 5, 7, 8, 9$.",
      explanation: "Ordenados son $1, 2, 3, \\mathbf{5}, 7, 8, 9$: el cuarto, con tres datos a cada lado, es el $5$.",
    },
    {
      id: "sueldos",
      type: "predict",
      help: [
        {
          label: "Mira el dato raro",
          message: "Hay un sueldo mucho mayor que los demás. ¿Qué parámetro se deja arrastrar por un valor así?",
        },
        {
          label: "Calcula los dos",
          message: "Calcula la media sumando todo y la mediana ordenando. Compara con lo que gana la mayoría.",
        },
      ],
      title: "Los sueldos de una tienda",
      question:
        "En una tienda de 5 empleados los sueldos mensuales son 1 200, 1 250, 1 300, 1 350 y 6 000 euros. ¿Qué parámetro describe mejor lo que cobra una persona típica de la tienda?",
      mode: "choice",
      choices: [
        { id: "a", label: "La mediana, $1\\,300$ €" },
        {
          id: "b",
          label: "La media, $2\\,220$ €",
          incorrectFeedback: "La media ($2\\,220$) la sube un único sueldo muy alto: cuatro de los cinco empleados cobran menos de $1\\,400$.",
        },
        {
          id: "c",
          label: "La moda, porque es la más importante",
          incorrectFeedback: "Aquí todos los sueldos son distintos: ninguno se repite, así que no hay moda.",
        },
        {
          id: "d",
          label: "Ninguno sirve",
          incorrectFeedback: "La mediana sí sirve: no se deja arrastrar por el sueldo extremo y refleja lo que cobra la mayoría.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "La media es $\\dfrac{11\\,100}{5} = 2\\,220$ €, inflada por el $6\\,000$. La mediana es el tercer dato, $1\\,300$ €, más representativa.",
    },
  ],
};
