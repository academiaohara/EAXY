import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_14_SUBTITLE } from "@/data/lessons/shared";

export const tablasGraficasDistribucionesEstadisticasLesson: InteractiveLesson = {
  slug: "tablas-graficas-distribuciones-estadisticas",
  title: "4. Distribuciones estadísticas",
  subtitle: TEMA_14_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "proceso-estadistico",
      type: "slide",
      help: [
        {
          label: "Tres pasos",
          message: "Recoger datos, organizarlos y sacar conclusiones.",
        },
        {
          label: "¿Qué es una distribución?",
          message: "La lista de todos los valores observados, sin resumir todavía.",
        },
      ],
      title: "Del dato a la tabla",
      blocks: [
        {
          kind: "steps",
          title: "El proceso estadístico",
          items: ["**Recoger** datos (encuesta, medición…).", "**Organizarlos** en una tabla de frecuencias.", "**Resumirlos** con gráficos y parámetros para sacar conclusiones."],
        },
        {
          kind: "text",
          text: "Las respuestas a una pregunta forman una **distribución estadística**: la lista de valores observados.",
        },
      ],
    },
    {
      id: "tipos-variable",
      type: "slide",
      help: [
        {
          label: "Un test rápido",
          message: "Si tiene sentido calcular la media, es cuantitativa. Si la respuesta es una etiqueta, cualitativa.",
        },
        {
          label: "Ejemplos de cada una",
          message: "Número de hermanos (cuantitativa) y estación del cumpleaños (cualitativa).",
        },
      ],
      title: "Cualitativa y cuantitativa",
      blocks: [
        {
          kind: "compare",
          left: { title: "Cuantitativa", text: "Valores numéricos: número de hermanos, estatura, nota de un examen.", tone: "info" },
          right: { title: "Cualitativa", text: "Valores no numéricos: estación del cumpleaños, deporte favorito, color.", tone: "ok" },
        },
        {
          kind: "warning",
          text: "Una variable cualitativa no tiene media ni mediana: no se puede sumar «primavera» y «verano».",
        },
      ],
    },
    {
      id: "check-cualitativa",
      type: "classify",
      help: [
        {
          label: "¿Número o categoría?",
          message: "Si la respuesta es un número que se mide o cuenta, la variable es cuantitativa. Si es una cualidad con nombre, cualitativa.",
        },
        {
          label: "Un test rápido",
          message: "Si tiene sentido calcular la **media** de los valores, es cuantitativa. No tiene sentido hacer la media de colores o de deportes.",
        },
      ],
      title: "Tipo de variable",
      question: "Clasifica cada variable estadística según el tipo de valores que toma.",
      groups: [
        { id: "cualitativa", label: "Cualitativa", tone: "violet" },
        { id: "cuantitativa", label: "Cuantitativa", tone: "cobalt" },
      ],
      items: [
        { id: "deporte", text: "Deporte preferido", group: "cualitativa" },
        { id: "ojos", text: "Color de ojos", group: "cualitativa" },
        { id: "mes", text: "Mes de nacimiento", group: "cualitativa" },
        { id: "transporte", text: "Medio de transporte para ir al instituto", group: "cualitativa" },
        { id: "calzado", text: "Número de calzado", group: "cuantitativa" },
        { id: "nota", text: "Nota de un examen", group: "cuantitativa" },
        { id: "peso", text: "Peso (kg)", group: "cuantitativa" },
        { id: "mascotas", text: "Número de mascotas en casa", group: "cuantitativa" },
      ],
      hint: "Pregúntate si la respuesta es un **número** que se puede medir o contar, o una **categoría** con nombre.",
      explanation:
        "Deportes, colores, meses y medios de transporte son categorías, no números: cualitativas. Calzado, nota, peso y mascotas toman valores numéricos: cuantitativas.",
    },
    {
      id: "tabla-frecuencias",
      type: "slide",
      help: [
        {
          label: "Cómo se lee una tabla",
          message: "Cada columna es un valor con cuántas veces apareció. Es contar y apuntar.",
        },
        {
          label: "Absoluta frente a relativa",
          message: "$f(3) = 6$ dice «seis veces». $fr(3) = \\frac{6}{N}$ dice «qué proporción del total».",
        },
        {
          label: "Una comprobación",
          message: "Todas las absolutas deben sumar $N$ y todas las relativas, $1$.",
        },
      ],
      title: "Tablas de frecuencias",
      blocks: [
        {
          kind: "definition",
          text: "La **frecuencia absoluta** de un valor es cuántas veces aparece. Se escribe $f(3) = 6$: «el $3$ aparece $6$ veces».",
        },
        {
          kind: "rule",
          title: "Frecuencia relativa",
          formula: "fr(x) = \\dfrac{f(x)}{N}",
          text: "$N$ es el total de datos. Las frecuencias relativas suman $1$.",
        },
      ],
      visual: { kind: "anim", scene: "tabla-frecuencias", beatMs: 3500 },
    },
    {
      id: "check-fr",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué es la frecuencia relativa?",
          message: "La parte del total que supone un valor: su frecuencia entre el número de datos.",
        },
        {
          label: "¿Qué va arriba y qué abajo?",
          message: "Arriba la frecuencia absoluta del valor; abajo, el total de datos.",
          math: ["fr = \\frac{f}{N}"],
        },
      ],
      title: "Frecuencia relativa",
      question: "Si $f(2) = 9$ y hay $N = 36$ datos, ¿cuánto vale $fr(2)$ como fracción?",
      answerFormat: "fraction",
      correctAnswers: ["9/36", "1/4"],
      explanation: "$fr(2) = \\dfrac{9}{36} = \\dfrac{1}{4}$.",
    },
    {
      id: "encuesta-mascotas",
      type: "predict",
      help: [
        {
          label: "Qué suman las relativas",
          message: "Todas las frecuencias relativas de una distribución suman $1$, porque entre todas reparten el total.",
        },
        {
          label: "Falta una",
          message: "Suma las que te dan y resta el resultado a $1$.",
        },
      ],
      title: "Mascotas en casa",
      question:
        "En una encuesta sobre cuántas mascotas tiene cada alumno, las frecuencias relativas de $0$, $1$ y $2$ mascotas son $0{,}40$, $0{,}35$ y $0{,}20$. Nadie tiene más de $3$. ¿Qué frecuencia relativa tiene el valor $3$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$0{,}05$" },
        {
          id: "b",
          label: "$0{,}95$",
          incorrectFeedback: "$0{,}95$ es lo que suman las otras tres. Para que el total sea $1$ falta lo que queda: $1 - 0{,}95$.",
        },
        {
          id: "c",
          label: "$0{,}50$",
          incorrectFeedback: "Con $0{,}50$ el total sería $1{,}45$, y las frecuencias relativas siempre suman exactamente $1$.",
        },
        {
          id: "d",
          label: "$5$",
          incorrectFeedback: "Una frecuencia relativa nunca pasa de $1$. Ese $5$ parece la cifra de $0{,}05$ sin la coma.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$0{,}40 + 0{,}35 + 0{,}20 = 0{,}95$ y $1 - 0{,}95 = 0{,}05$.",
    },
  ],
};
