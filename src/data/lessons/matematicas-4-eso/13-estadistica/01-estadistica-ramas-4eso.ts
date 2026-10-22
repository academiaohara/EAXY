import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_13_SUBTITLE } from "@/data/lessons/shared";

export const estadisticaRamas4esoLesson: InteractiveLesson = {
  slug: "estadistica-ramas-4eso",
  title: "1. Descriptiva e inferencial",
  subtitle: TEMA_4ESO_13_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "conceptos",
      type: "slide",
      help: [
        { label: "Población y muestra", message: "La **población** es todo el colectivo que te interesa; la **muestra** es un subconjunto del que se estudia para sacar conclusiones sobre la población." },
        { label: "Variable estadística", message: "Una **variable** recorre los valores de un carácter. Si son números, es cuantitativa; si son cualidades (color, sexo…), cualitativa." },
      ],
      title: "El lenguaje de la estadística",
      blocks: [
        { kind: "facts", items: [{ tex: "\\text{Población}", label: "todos los elementos que interesan" }, { tex: "\\text{Muestra}", label: "subconjunto estudiado de la población" }, { tex: "\\text{Individuo}", label: "cada elemento de la población o muestra" }, { tex: "\\text{Carácter}", label: "aspecto que se estudia; sus valores son las modalidades" }] },
      ],
    },
    {
      id: "check-variable",
      type: "classify",
      help: [{ label: "¿Número?", message: "Cuantitativa: valores numéricos. Discreta si son aislados (contar); continua si puede tomar cualquier valor de un intervalo (medir)." }],
      title: "Tipo de variable",
      question: "Clasifica cada variable.",
      groups: [
        { id: "cualitativa", label: "Cualitativa", tone: "amber" },
        { id: "discreta", label: "Cuantitativa discreta", tone: "cobalt" },
        { id: "continua", label: "Cuantitativa continua", tone: "emerald" },
      ],
      items: [
        { id: "a", text: "Color del pelo", group: "cualitativa" },
        { id: "b", text: "Número de hermanos", group: "discreta" },
        { id: "c", text: "Estatura", group: "continua" },
        { id: "d", text: "Peso de un recién nacido", group: "continua" },
        { id: "e", text: "Pulsaciones por minuto", group: "discreta" },
        { id: "f", text: "Deporte favorito", group: "cualitativa" },
      ],
      hint: "Contar da discretas; medir da continuas.",
    },
    {
      id: "ramas",
      type: "slide",
      help: [
        { label: "Cautela", message: "En la inferencial hay que preguntarse cómo se eligió la muestra y qué confianza se puede tener en el resultado." },
        { label: "Descriptiva", message: "Describe a todos los individuos del grupo estudiado, sin salir de él: no hay «salto» a un colectivo mayor." },
      ],
      title: "Dos ramas",
      blocks: [
        { kind: "compare", left: { title: "Descriptiva", text: "Describe y analiza **la población dada**, sin extraer conclusiones para un grupo mayor: recoge datos, hace tablas, gráficos y **parámetros**.", tone: "ok" }, right: { title: "Inferencial", text: "Estudia una **muestra** e **infiere** características de **toda la población**. Exige cautela: elección de la muestra y grado de confianza.", tone: "warn" } },
      ],
    },
    {
      id: "check-rama",
      type: "classify",
      help: [{ label: "¿Toda la población o una muestra?", message: "Si el estudio abarca a todos los individuos y solo los describe, es descriptiva. Si de unos pocos se concluye para muchos, inferencial." }],
      title: "¿Qué rama es?",
      question: "Clasifica cada estudio.",
      groups: [
        { id: "descriptiva", label: "Descriptiva", tone: "emerald" },
        { id: "inferencial", label: "Inferencial", tone: "rose" },
      ],
      items: [
        { id: "a", text: "Un funcionario tabula las edades de **todos** los alumnos de su universidad", group: "descriptiva" },
        { id: "b", text: "Una editorial pregunta a 387 alumnos para generalizar a todos los universitarios", group: "inferencial" },
        { id: "c", text: "El profesor calcula la nota media de **su** clase", group: "descriptiva" },
        { id: "d", text: "Una encuesta a 1 000 votantes predice el resultado de unas elecciones", group: "inferencial" },
      ],
      hint: "La inferencial «salta» de la muestra a la población.",
    },
    {
      id: "pasos",
      type: "slide",
      help: [{ label: "Parámetros", message: "Un **parámetro** es un número que resume la información: media, mediana, desviación típica…" }],
      title: "Los pasos de la descriptiva",
      blocks: [
        { kind: "steps", title: "Estadística descriptiva", items: ["**Seleccionar** los caracteres que interesan.", "**Recoger los datos** (encuesta o experimento).", "**Organizarlos** en tablas de frecuencias.", "Hacer **gráficos** si conviene.", "Obtener **parámetros** que resumen la información."] },
      ],
    },
    {
      id: "check-muestra",
      type: "predict",
      mode: "choice",
      help: [{ label: "Muestra", message: "Una muestra es una parte de la población, no toda." }],
      title: "¿Qué es la muestra?",
      question: "Una editorial encuesta a $387$ alumnos de entre todos los de una universidad. Esos $387$ alumnos son...",
      choices: [
        { id: "m", label: "la muestra" },
        { id: "p", label: "la población", incorrectFeedback: "La población son **todos** los universitarios (o todos los alumnos de esa universidad); los 387 son solo una parte." },
        { id: "i", label: "un individuo", incorrectFeedback: "Un individuo es cada alumno; los 387 forman el conjunto estudiado: la muestra." },
      ],
      correctChoiceId: "m",
      shuffleChoices: true,
      explanation: "Los $387$ alumnos son la **muestra**; cada alumno es un **individuo**; todos los universitarios, la **población**.",
    },
  ],
};
