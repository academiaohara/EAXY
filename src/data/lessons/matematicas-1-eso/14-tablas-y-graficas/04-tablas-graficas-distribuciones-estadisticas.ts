import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_14_SUBTITLE } from "@/data/lessons/shared";

export const tablasGraficasDistribucionesEstadisticasLesson: InteractiveLesson = {
  slug: "tablas-graficas-distribuciones-estadisticas",
  title: "4. Distribuciones estadísticas",
  subtitle: TEMA_14_SUBTITLE,
  steps: [
    {
      id: "proceso-estadistico",
      type: "concept",
      title: "Del dato a la tabla",
      content: [
        "El **proceso estadístico** recoge datos (encuesta, medición…) y los organiza para sacar conclusiones.",
        "Las respuestas a una pregunta forman una **distribución estadística**: lista de valores observados.",
        "Luego puedes resumirlos en **tablas de frecuencias** y **gráficos**.",
      ],
    },
    {
      id: "tipos-variable",
      type: "concept",
      title: "Cualitativa y cuantitativa",
      content: [
        "Variable **cuantitativa**: toma **valores numéricos** (número de hermanos: 0, 1, 2…).",
        "Variable **cualitativa**: toma **valores no numéricos** (estación del cumpleaños: primavera, verano…).",
        "Ejemplos cuantitativos: estatura, nota de un examen, número de calzado.",
        "Ejemplos cualitativos: deporte preferido, color favorito, tipo de carrera.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Clasifica",
          items: [
            { title: "Deporte preferido", caption: "Cualitativa", tone: "violet" },
            { title: "N.º de hermanos", caption: "Cuantitativa", tone: "cobalt" },
            { title: "Estatura (cm)", caption: "Cuantitativa", tone: "emerald" },
            { title: "Estación cumpleaños", caption: "Cualitativa", tone: "amber" },
          ],
        },
      ],
    },
    {
      id: "tabla-frecuencias",
      type: "concept",
      title: "Tablas de frecuencias",
      content: [
        "En una tabla de frecuencias cada **valor** (o modalidad) va con su **frecuencia absoluta**: cuántas veces aparece.",
        "Notación: **$f(3) = 6$** se lee «la frecuencia del 3 es 6».",
        "**Frecuencia relativa** $fr(x)$: cociente $\\dfrac{f(x)}{N}$, donde $N$ es el total de datos (proporción entre 0 y 1).",
        "Ejemplo: si $f(0) = 4$ en una clase de $36$ alumnos, $fr(0) = \\dfrac{4}{36}$.",
      ],
      math: ["fr(x) = \\dfrac{f(x)}{N}"],
    },
    {
      id: "ejemplo-hermanos",
      type: "animated_solution",
      title: "Ejemplo: hermanos en una clase",
      frames: [
        {
          math: "f(0)=4,\\ f(1)=16,\\ f(2)=9,\\ f(3)=6,\\ f(4)=1,\\ f(5)=0",
          caption: "Frecuencias absolutas (36 alumnos en total).",
        },
        {
          math: "fr(0) = \\dfrac{4}{36},\\quad fr(1) = \\dfrac{16}{36}",
          caption: "4 hijos únicos; 16 con un solo hermano o hermana.",
        },
        {
          math: "4 + 16 + 9 + 6 + 1 + 0 = 36 = N",
          caption: "La suma de frecuencias absolutas es el número de individuos.",
        },
      ],
    },
    {
      id: "check-cualitativa",
      type: "classify",
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
      id: "check-fr",
      type: "fill_in_blank",
      title: "Frecuencia relativa",
      question:
        "Si $f(2) = 9$ y hay $N = 36$ datos, ¿cuánto vale $fr(2)$ como fracción? Escribe solo la fracción (ejemplo: 9/36)",
      correctAnswers: ["9/36", "1/4"],
      explanation: "$fr(2) = \\dfrac{9}{36} = \\dfrac{1}{4}$.",
    },
  ],
};
