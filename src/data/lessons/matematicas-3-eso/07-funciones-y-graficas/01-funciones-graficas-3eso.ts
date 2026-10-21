import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_7_SUBTITLE } from "@/data/lessons/shared";

export const funcionesGraficas3esoLesson: InteractiveLesson = {
  slug: "funciones-graficas-3eso",
  title: "1. Las funciones y sus gráficas",
  subtitle: TEMA_3ESO_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "variables",
      type: "slide",
      help: [
        {
          label: "Quién depende de quién",
          message: "La variable independiente es la que eliges o la que avanza sola (el tiempo); la dependiente es la que cambia como consecuencia (la temperatura).",
        },
        {
          label: "Un punto",
          message: "Cada punto de la gráfica es un par: un valor de $x$ y el valor de $y$ que le corresponde.",
        },
      ],
      title: "Dos variables, dos ejes",
      blocks: [
        {
          kind: "text",
          text: "Una gráfica relaciona **dos variables**. En el eje horizontal (**abscisas**) va la variable $x$, **independiente**; en el vertical (**ordenadas**), la variable $y$, **dependiente**.",
        },
        {
          kind: "text",
          text: "Para interpretarla, se lee **de izquierda a derecha**: cómo varía $y$ cuando $x$ aumenta.",
        },
      ],
      visual: { kind: "anim", scene: "funcion-temperatura" },
    },
    {
      id: "unico-valor",
      type: "slide",
      help: [
        {
          label: "Una vertical",
          message: "Si una recta vertical corta a la gráfica en dos puntos, a ese $x$ le corresponden dos valores de $y$: no es función.",
        },
        {
          label: "Al revés sí puede repetirse",
          message: "Dos valores de $x$ distintos sí pueden tener el mismo $y$: lo que no puede haber es un $x$ con dos $y$.",
        },
      ],
      title: "Una función asocia un único valor",
      blocks: [
        {
          kind: "definition",
          text: "Una **función** es una relación entre dos variables que asocia a cada valor de $x$ **un único valor** de $y$. Decimos que $y$ es función de $x$.",
        },
        {
          kind: "rule",
          title: "Criterio de la vertical",
          text: "Una gráfica es una función si **cada recta vertical la corta una sola vez** como máximo.",
        },
      ],
      visual: { kind: "anim", scene: "funcion-es-no-es" },
    },
    {
      id: "dominio-recorrido",
      type: "slide",
      help: [
        {
          label: "Mira el eje x",
          message: "El dominio es el tramo del eje horizontal en el que la función está definida, es decir, para el que tenemos datos.",
        },
        {
          label: "Mira el eje y",
          message: "El recorrido es el tramo del eje vertical que alcanza la gráfica: del valor más bajo al más alto.",
        },
      ],
      title: "Escalas, dominio y recorrido",
      blocks: [
        {
          kind: "compare",
          left: { title: "Dominio de definición", text: "Valores de $x$ para los que existe la función.", math: ["\\text{Vuelo del águila: } 0\\text{–}18\\ \\text{min}"], tone: "ok" },
          right: { title: "Recorrido", text: "Valores de $y$ que toma la función.", math: ["\\text{Altura entre } 0 \\text{ y } 120\\ \\text{m}"], tone: "info" },
        },
        {
          kind: "text",
          text: "Las **escalas** de cada eje permiten pasar de describir («sube y baja») a **cuantificar** («sube $40$ m en $2$ minutos»).",
        },
        {
          kind: "warning",
          text: "Antes de leer un valor, mira la escala de cada eje: un cuadrito puede valer $1$ minuto en un eje y $10$ metros en el otro.",
        },
      ],
      visual: { kind: "anim", scene: "dominio-recorrido" },
    },
    {
      id: "check-variables",
      type: "predict",
      help: [
        {
          label: "Qué depende de qué",
          message: "El tiempo transcurre solo; la altura del águila cambia según el instante.",
        },
      ],
      title: "Variable independiente",
      question: "La gráfica del vuelo de un águila relaciona el tiempo transcurrido con su altura. ¿Cuál es la variable independiente?",
      mode: "choice",
      choices: [
        { id: "t", label: "El tiempo" },
        { id: "a", label: "La altura", incorrectFeedback: "La altura depende del instante en que miremos: es la variable dependiente." },
        { id: "ambas", label: "Ambas", incorrectFeedback: "En una función, una variable es independiente y la otra depende de ella." },
      ],
      correctChoiceId: "t",
      shuffleChoices: true,
      explanation: "La altura (variable dependiente) es función del tiempo (variable independiente).",
    },
    {
      id: "check-funcion",
      type: "predict",
      help: [
        {
          label: "Un único valor",
          message: "Si a un mismo valor de $x$ le corresponden dos valores de $y$, no es una función.",
        },
      ],
      title: "¿Es una función?",
      question: "Una relación asocia a cada persona su fecha de nacimiento. ¿Es una función de la persona a la fecha?",
      mode: "choice",
      choices: [
        { id: "si", label: "Sí: cada persona tiene una única fecha de nacimiento" },
        { id: "no", label: "No: hay personas con la misma fecha", incorrectFeedback: "Que dos personas coincidan en fecha no importa: lo que cuenta es que cada persona tenga un único valor." },
      ],
      correctChoiceId: "si",
      shuffleChoices: true,
      explanation: "A cada valor de la variable independiente (persona) le corresponde un único valor de la dependiente (fecha). La relación inversa no sería función.",
    },
    {
      id: "check-dominio",
      type: "predict",
      help: [
        {
          label: "Valores de y",
          message: "El recorrido recoge los valores del eje vertical, de la altura mínima a la máxima.",
        },
      ],
      title: "Dominio y recorrido",
      question: "La altura de un águila oscila entre $0$ m y $120$ m durante una observación de $18$ minutos. ¿Cuál es el recorrido de la función altura–tiempo?",
      mode: "choice",
      choices: [
        { id: "rec", label: "El tramo de $0$ a $120$ m" },
        { id: "dom", label: "El tramo de $0$ a $18$ min", incorrectFeedback: "Eso es el dominio (valores de la variable independiente)." },
        { id: "ambos", label: "El tramo de $0$ a $138$", incorrectFeedback: "No se suman: el recorrido son los valores que toma la altura, entre $0$ y $120$ m." },
      ],
      correctChoiceId: "rec",
      shuffleChoices: true,
      explanation: "Recorrido: $[0, 120]$ m (valores de $y$). Dominio: $[0, 18]$ min (valores de $x$).",
    },
  ],
};
