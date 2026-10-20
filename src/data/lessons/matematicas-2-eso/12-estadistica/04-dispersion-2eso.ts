import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_12_SUBTITLE } from "@/data/lessons/shared";

export const dispersion2esoLesson: InteractiveLesson = {
  slug: "dispersion-2eso",
  title: "4. Parámetros de dispersión",
  subtitle: TEMA_2ESO_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "por-que",
      type: "slide",
      help: [
        {
          label: "Mismo promedio, distinta historia",
          message: "Dos grupos pueden tener la misma media y datos muy distintos: uno muy agrupado y otro muy disperso.",
        },
        {
          label: "Un ejemplo",
          message: "Notas $5, 5, 5, 5$ y notas $0, 10, 0, 10$ tienen media $5$, pero el segundo grupo es mucho más desigual.",
        },
      ],
      title: "Cuánto se separan los datos",
      blocks: [
        {
          kind: "text",
          text: "La media no cuenta toda la historia. Los **parámetros de dispersión** informan del **grado de separación** de los datos.",
        },
        {
          kind: "compare",
          left: { title: "Recorrido", text: "Diferencia entre el **mayor** y el **menor** valor.", math: ["R = \\text{máx} - \\text{mín}"], tone: "ok" },
          right: { title: "Desviación media", text: "**Promedio de las distancias** de los datos a la media.", math: ["DM = \\dfrac{\\sum |x_i - \\bar{x}|}{N}"], tone: "info" },
        },
      ],
      visual: { kind: "anim", scene: "dispersion-puntos", beatMs: 3800 },
    },
    {
      id: "pasos-dm",
      type: "slide",
      help: [
        {
          label: "Distancia",
          message: "La distancia a la media es siempre positiva: $|x - \\bar{x}|$. Se ignora si el dato está por encima o por debajo.",
        },
        {
          label: "Comprueba",
          message: "La desviación media no puede ser mayor que el recorrido.",
        },
      ],
      title: "Calcular la desviación media",
      blocks: [
        {
          kind: "steps",
          items: [
            "Calcula la **media** $\\bar{x}$.",
            "Halla la **distancia** de cada dato a la media, $|x_i - \\bar{x}|$.",
            "**Suma** las distancias y **divide** entre el número de datos.",
          ],
        },
        {
          kind: "example",
          title: "Notas 3, 5, 7 y 9",
          lines: [
            { math: "\\bar{x} = \\dfrac{24}{4} = 6" },
            { math: "|3 - 6| = 3,\\ |5 - 6| = 1,\\ |7 - 6| = 1,\\ |9 - 6| = 3" },
            { math: "DM = \\dfrac{3 + 1 + 1 + 3}{4} = 2" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-recorrido",
      type: "fill_in_blank",
      help: [
        {
          label: "Mayor menos menor",
          message: "El mayor es $10$ y el menor $4$.",
        },
      ],
      title: "Recorrido",
      question: "Las notas de un examen son $4, 7, 5, 9, 10, 6$. ¿Cuál es el recorrido? (solo el número)",
      correctAnswers: ["6"],
      explanation: "$R = 10 - 4 = 6$.",
    },
    {
      id: "check-dm",
      type: "fill_in_blank",
      help: [
        {
          label: "Media",
          message: "La media de $2, 4, 6, 8$ es $\\frac{20}{4} = 5$. Las distancias son $3, 1, 1, 3$.",
        },
      ],
      title: "Desviación media",
      question: "Calcula la desviación media de $2, 4, 6, 8$. (solo el número)",
      correctAnswers: ["2"],
      explanation: "$\\bar{x} = 5$; distancias $3, 1, 1, 3$; $DM = \\frac{8}{4} = 2$.",
    },
    {
      id: "check-comparar",
      type: "predict",
      help: [
        {
          label: "Compara los datos",
          message: "En el grupo A todos están cerca de $5$; en el B hay valores muy alejados.",
        },
      ],
      title: "Comparar dos grupos",
      question: "El grupo A tiene notas $5, 5, 5, 5$ y el grupo B, $0, 10, 0, 10$. Ambos tienen media $5$. ¿Qué se puede decir?",
      mode: "choice",
      choices: [
        { id: "B", label: "El grupo B tiene mayor dispersión" },
        { id: "A", label: "El grupo A tiene mayor dispersión", incorrectFeedback: "En A todos los datos coinciden con la media: dispersión $0$." },
        { id: "igual", label: "Los dos tienen la misma dispersión", incorrectFeedback: "Aunque coincidan las medias, B se separa mucho más de la media." },
        { id: "no", label: "No se puede comparar", incorrectFeedback: "Se pueden comparar con el recorrido ($0$ frente a $10$) o con la desviación media ($0$ frente a $5$)." },
      ],
      correctChoiceId: "B",
      shuffleChoices: true,
      explanation: "Recorrido: A $= 0$ y B $= 10$. Desviación media: A $= 0$ y B $= 5$.",
    },
  ],
};
