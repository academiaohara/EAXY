import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_12_SUBTITLE } from "@/data/lessons/shared";

export const poblacionVariables2esoLesson: InteractiveLesson = {
  slug: "poblacion-variables-2eso",
  title: "1. Población, muestra y variables estadísticas",
  subtitle: TEMA_2ESO_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "poblacion",
      type: "slide",
      help: [
        {
          label: "¿Por qué una muestra?",
          message: "Estudiar a toda la población suele ser caro o imposible: se estudia una parte y se extraen conclusiones sobre el total.",
        },
        {
          label: "Representativa",
          message: "La muestra debe parecerse a la población. Preguntar solo a quienes salen de un gimnasio no representa los hábitos deportivos de toda la ciudad.",
        },
      ],
      title: "Población y muestra",
      blocks: [
        {
          kind: "definition",
          text: "La **población** es el conjunto de **individuos** que se quiere estudiar. La **muestra** es una **parte** de la población que se estudia realmente.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\text{Población: todos los alumnos de un instituto}" },
            { math: "\\text{Muestra: }40\\text{ alumnos elegidos al azar}" },
          ],
        },
        {
          kind: "warning",
          text: "Una muestra debe ser **representativa**: tiene que reflejar cómo es la población, o las conclusiones serán engañosas.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "variables",
      type: "slide",
      help: [
        {
          label: "Contar o medir",
          message: "Si los valores se cuentan ($0, 1, 2, 3\\dots$), la variable es discreta. Si se miden y pueden tomar cualquier valor de un intervalo, es continua.",
        },
        {
          label: "Palabras o números",
          message: "Si los valores son cualidades (palabras), es cualitativa; si son números, cuantitativa.",
        },
      ],
      title: "Tipos de variables",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Cualitativa",
            text: "Sus valores son **cualidades**.",
            math: ["\\text{color de pelo, deporte favorito}"],
            tone: "ok",
          },
          right: {
            title: "Cuantitativa",
            text: "Sus valores son **números**.",
            tone: "info",
          },
        },
        {
          kind: "compare",
          left: {
            title: "Discreta",
            text: "Se **cuenta**: valores aislados.",
            math: ["\\text{número de hermanos}"],
            tone: "key",
          },
          right: {
            title: "Continua",
            text: "Se **mide**: cualquier valor de un intervalo.",
            math: ["\\text{estatura, peso}"],
            tone: "warn",
          },
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-clasificar",
      type: "classify",
      help: [
        {
          label: "Primero: ¿número?",
          message: "Si no es un número, es cualitativa. Si es un número, pregunta si se cuenta (discreta) o se mide (continua).",
        },
      ],
      title: "Clasifica las variables",
      question: "Clasifica cada variable estadística.",
      groups: [
        { id: "cualitativa", label: "Cualitativa", tone: "violet" },
        { id: "discreta", label: "Cuantitativa discreta", tone: "cobalt" },
        { id: "continua", label: "Cuantitativa continua", tone: "emerald" },
      ],
      items: [
        { id: "a", text: "Deporte favorito", group: "cualitativa" },
        { id: "b", text: "Número de hermanos", group: "discreta" },
        { id: "c", text: "Estatura", group: "continua" },
        { id: "d", text: "Goles marcados en un partido", group: "discreta" },
        { id: "e", text: "Peso de una mochila", group: "continua" },
        { id: "f", text: "Color de ojos", group: "cualitativa" },
      ],
      explanation: "Deporte y color de ojos son cualidades. Los hermanos y los goles se cuentan. La estatura y el peso se miden.",
    },
    {
      id: "tabla",
      type: "slide",
      help: [
        {
          label: "Frecuencia absoluta",
          message: "Es el número de veces que aparece un valor. La suma de todas es el total de datos $N$.",
        },
        {
          label: "Frecuencia relativa",
          message: "Es la absoluta dividida entre el total: $f_r = \\frac{f_a}{N}$. Todas suman $1$. Multiplicada por $100$ es el porcentaje.",
        },
      ],
      title: "Tabla de frecuencias",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "f_a", label: "frecuencia absoluta: cuántas veces" },
            { tex: "f_r = \\dfrac{f_a}{N}", label: "frecuencia relativa" },
          ],
        },
        {
          kind: "text",
          text: "Una **tabla de frecuencias** organiza los datos: cada valor con las veces que aparece.",
        },
      ],
      visual: { kind: "anim", scene: "tabla-frecuencias", beatMs: 3500 },
    },
    {
      id: "check-relativa",
      type: "fill_in_blank",
      help: [
        {
          label: "Divide",
          message: "$f_r = 12 : 40$.",
        },
      ],
      title: "Frecuencia relativa",
      question: "En una muestra de $40$ alumnos, $12$ van en bici. ¿Cuál es la frecuencia relativa? (escribe el número con coma)",
      correctAnswers: ["0,3", "0.3"],
      explanation: "$f_r = \\frac{12}{40} = 0{,}3$, es decir, el $30\\,\\%$.",
    },
    {
      id: "check-muestra",
      type: "predict",
      help: [
        {
          label: "¿Reflejan a todos?",
          message: "Una muestra buena incluye a distintos tipos de personas de la población, elegidas sin favorecer a un grupo.",
        },
      ],
      title: "Una muestra representativa",
      question: "Se quiere saber cuántos alumnos de un instituto desayunan en casa. ¿Qué muestra es más adecuada?",
      mode: "choice",
      choices: [
        { id: "azar", label: "$50$ alumnos de todos los cursos, elegidos al azar" },
        { id: "amigos", label: "Los $10$ amigos de quien hace la encuesta", incorrectFeedback: "Los amigos suelen parecerse entre sí y son pocos: no representan a todo el instituto." },
        { id: "cafeteria", label: "Los alumnos que están en la cafetería a las 11 h", incorrectFeedback: "Quienes están en la cafetería probablemente desayunan fuera de casa: la muestra está sesgada." },
        { id: "uno", label: "Un solo curso completo", incorrectFeedback: "Un solo curso no representa a los demás (edades distintas)." },
      ],
      correctChoiceId: "azar",
      shuffleChoices: true,
      explanation: "Elegir al azar y de todos los cursos da una muestra que se parece a la población.",
    },
  ],
};
