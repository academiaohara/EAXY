import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_9_SUBTITLE } from "@/data/lessons/shared";

export const proporcionalidadMagnitudesLesson: InteractiveLesson = {
  slug: "proporcionalidad-magnitudes",
  title: "1. Relación de proporcionalidad entre magnitudes",
  subtitle: TEMA_1ESO_9_SUBTITLE,
  steps: [
    {
      id: "intro",
      type: "concept",
      title: "Magnitudes y tablas de valores",
      content: [
        "Llamamos **magnitud** a cualquier cualidad medible: longitud, peso, precio, tiempo…",
        "A veces dos magnitudes se relacionan de forma que podemos completar una **tabla de valores** y resolver problemas.",
        "Estudiaremos la **proporcionalidad directa** y la **proporcionalidad inversa**.",
      ],
    },
    {
      id: "directa",
      type: "concept",
      title: "Proporcionalidad directa",
      content: [
        "Ejemplo: balones y euros — $1$ balón $5\\,€$, $2$ balones $10\\,€$, $3$ balones $15\\,€$…",
        "Dos magnitudes son **directamente proporcionales** cuando:",
        "• Al multiplicar una (doble, triple…), la otra se multiplica igual.",
        "• Al dividir una (mitad, tercio…), la otra se divide igual.",
        "Si el precio es constante, **n.º de cromos** y **coste** también son directamente proporcionales.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Ejemplos habituales (directa)",
          items: [
            {
              title: "Compras",
              math: "\\text{peso} \\leftrightarrow \\text{precio}",
              caption: "Mismo precio por kilo.",
              tone: "cobalt",
            },
            {
              title: "Trabajo a tarifa fija",
              math: "\\text{horas} \\leftrightarrow \\text{pago}",
              caption: "Mismo euros por hora.",
              tone: "emerald",
            },
          ],
        },
      ],
    },
    {
      id: "inversa",
      type: "concept",
      title: "Proporcionalidad inversa",
      content: [
        "Ejemplo: **caballos** y **días** que dura una carga de heno — a más caballos, **menos** días dura; a menos caballos, **más** días.",
        "Dos magnitudes son **inversamente proporcionales** cuando:",
        "• Al multiplicar una (doble, triple…), la otra se **divide** (mitad, tercio…).",
        "• Al dividir una, la otra se **multiplica**.",
        "También ocurre con **operarios** y **tiempo** para un mismo trabajo, o **velocidad** y **tiempo** para la misma distancia.",
      ],
    },
    {
      id: "check-directa",
      type: "multiple_choice",
      title: "Identificar proporcionalidad directa (act. 3)",
      question:
        "¿Cuál de estos pares de magnitudes es directamente proporcional?",
      options: [
        { id: "a", text: "Peso de una sandía y su precio (mismo precio por kilo)" },
        { id: "b", text: "Edad de una persona y su altura" },
        { id: "c", text: "Talla de un pantalón y su precio" },
      ],
      correctOptionId: "a",
      explanation:
        "A doble peso (misma tarifa), doble precio. Edad/altura y talla/precio no siguen una razón constante.",
    },
    {
      id: "check-inversa",
      type: "multiple_choice",
      title: "Identificar proporcionalidad inversa (act. 4)",
      question: "¿Cuál es un ejemplo de magnitudes inversamente proporcionales?",
      options: [
        {
          id: "a",
          text: "Número de operarios que descargan un camión y tiempo empleado",
        },
        { id: "b", text: "Precio de las manzanas y kilos que compro con 10 €" },
        { id: "c", text: "Número de páginas de un libro y su precio" },
      ],
      correctOptionId: "a",
      explanation:
        "A más operarios, menos tiempo. Con más precio/kg compras menos kilos (también inversa); la opción (a) es el caso clásico del temario.",
    },
    {
      id: "operarios",
      type: "animated_solution",
      title: "Cuadrilla de operarios (act. 5)",
      content: [
        "Cinco operarios limpian un polideportivo en $6$ horas. ¿Cuánto tardarían $10$ operarios en el mismo trabajo? (proporcionalidad inversa)",
      ],
      frames: [
        {
          caption: "Producto constante (operarios · horas):",
          math: "5 \\cdot 6 = 30",
        },
        {
          caption: "Con $10$ operarios:",
          math: "10 \\cdot t = 30 \\Rightarrow t = 3 \\text{ horas}",
        },
      ],
    },
    {
      id: "caballos",
      type: "fill_in_blank",
      title: "Caballos y heno",
      question:
        "Con $4$ caballos el heno dura $15$ días. ¿Cuántos días durará con $6$ caballos? (solo el número)",
      correctAnswers: ["10"],
      explanation: "$4 \\cdot 15 = 60$. Con $6$ caballos: $60 : 6 = 10$ días.",
    },
  ],
};
