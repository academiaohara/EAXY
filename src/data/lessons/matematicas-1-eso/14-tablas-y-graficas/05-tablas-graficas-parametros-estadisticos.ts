import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_14_SUBTITLE } from "@/data/lessons/shared";

export const tablasGraficasParametrosEstadisticosLesson: InteractiveLesson = {
  slug: "tablas-graficas-parametros-estadisticos",
  title: "5. Media, mediana y moda",
  subtitle: TEMA_14_SUBTITLE,
  steps: [
    {
      id: "media",
      type: "concept",
      title: "Media (promedio)",
      content: [
        "La **media** resume un conjunto de datos **numéricos**.",
        "Se calcula **sumando** todos los valores y **dividiendo** entre cuántos hay.",
        "Ejemplo (9 amigos): hermanos $1, 3, 2, 0, 1, 3, 4, 2, 3$ → media $= \\dfrac{19}{9} \\approx 2{,}11$.",
      ],
      math: ["\\text{media} = \\dfrac{x_1 + x_2 + \\cdots + x_n}{n}"],
    },
    {
      id: "mediana",
      type: "concept",
      title: "Mediana",
      content: [
        "Ordena los datos de **menor a mayor**. La **mediana** es el valor **central**.",
        "Si hay **número impar** de datos, es el del medio: $0, 1, 1, 2, 2, 3, 3, 3, 4$ → mediana $= 2$.",
        "Si hay **número par**, es el **promedio de los dos centrales**: $4, 6, 8, 8, 9, 10, 10, 10$ → centrales 8 y 9 → mediana $= 8{,}5$.",
      ],
    },
    {
      id: "moda",
      type: "concept",
      title: "Moda",
      content: [
        "La **moda** es el valor con **mayor frecuencia** (el que más se repite).",
        "En $1, 3, 2, 0, 1, 3, 4, 2, 3$ la moda es **3** (tres veces).",
        "Con variables **cualitativas** solo tiene sentido la moda: en P, V, V, I, V, P, O, I, O la moda es **V** (verano).",
        "Una distribución **cualitativa** no tiene media ni mediana (no puedes sumar «primavera» y «verano»).",
      ],
    },
    {
      id: "ejemplo-resuelto",
      type: "animated_solution",
      title: "Ejemplo resuelto",
      frames: [
        {
          math: "4,\\ 6,\\ 8,\\ 8,\\ 9,\\ 10,\\ 10,\\ 10",
          caption: "Ocho datos numéricos.",
        },
        {
          math: "\\text{media} = \\dfrac{65}{8} = 8{,}125",
          caption: "Suma 65, dividimos entre 8.",
        },
        {
          math: "\\text{mediana} = \\dfrac{8 + 9}{2} = 8{,}5",
          caption: "Dos centrales: 8 y 9.",
        },
        {
          math: "\\text{moda} = 10",
          caption: "El 10 aparece tres veces.",
        },
      ],
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
  ],
};
