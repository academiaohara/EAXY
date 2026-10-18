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
      help: [
        {
          label: "¿Qué es una magnitud?",
          message: "Cualquier cosa que se pueda medir: la longitud, el peso, el precio, el tiempo.",
        },
        {
          label: "¿Para qué la tabla?",
          message: "Para ver cómo cambian a la vez dos magnitudes y detectar si hay una regla.",
        },
      ],
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
      help: [
        {
          label: "Un test fácil",
          message: "Duplica una magnitud: si la otra también se duplica, es directa.",
        },
        {
          label: "Sentido común",
          message: "Más balones, más euros. Más cromos, más coste: si el precio unitario no cambia, es directa.",
        },
      ],
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
      help: [
        {
          label: "Un test fácil",
          message: "Duplica una magnitud: si la otra se reduce a la mitad, es inversa.",
        },
        {
          label: "Situaciones típicas",
          message: "Más caballos, menos días de heno. Más obreros, menos horas. Más velocidad, menos tiempo.",
        },
        {
          label: "¿Qué se mantiene?",
          message: "El producto de las dos magnitudes: caballos por días, obreros por horas.",
        },
      ],
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
      type: "classify",
      help: [
        {
          label: "Prueba de la mitad y el doble",
          message: "Duplica una magnitud mentalmente: si la otra se duplica es directa; si se reduce a la mitad, inversa; si no hay regla fija, ninguna.",
        },
        {
          label: "Cociente o producto constante",
          message: "En la directa, el **cociente** entre las dos no cambia. En la inversa, el **producto**. Si ninguno se mantiene, no son proporcionales.",
        },
        {
          label: "Cuidado con las que «van juntas»",
          message: "Que dos cosas crezcan a la vez (edad y altura) no basta: tiene que haber una razón fija entre ellas.",
        },
      ],
      title: "Directa, inversa o ninguna (act. 3 y 4)",
      question: "Clasifica cada par de magnitudes según el tipo de proporcionalidad.",
      groups: [
        { id: "directa", label: "Directamente proporcionales", tone: "emerald" },
        { id: "inversa", label: "Inversamente proporcionales", tone: "violet" },
        { id: "ninguna", label: "No proporcionales", tone: "rose" },
      ],
      items: [
        { id: "sandia", text: "Peso de una sandía y su precio (mismo precio por kilo)", group: "directa" },
        { id: "gasolina", text: "Litros de gasolina y lo que pagas por ellos", group: "directa" },
        { id: "operarios", text: "Operarios que descargan un camión y tiempo empleado", group: "inversa" },
        { id: "manzanas", text: "Precio del kilo de manzanas y kilos que compro con $10\\,€$", group: "inversa" },
        { id: "velocidad", text: "Velocidad de un coche y tiempo en recorrer el mismo trayecto", group: "inversa" },
        { id: "edad", text: "Edad de una persona y su altura", group: "ninguna" },
        { id: "talla", text: "Talla de un pantalón y su precio", group: "ninguna" },
        { id: "paginas", text: "Número de páginas de un libro y su precio", group: "ninguna" },
      ],
      hint: "Pregúntate: si una magnitud se duplica, ¿la otra se duplica, se reduce a la mitad o no sigue ninguna regla fija?",
      explanation:
        "Directa: a doble peso o doble de litros, doble precio. Inversa: a doble de operarios, de precio por kilo o de velocidad, la mitad de tiempo o de kilos. Edad/altura, talla/precio y páginas/precio no siguen una razón ni un producto constante.",
    },
    {
      id: "operarios",
      type: "animated_solution",
      help: [
        {
          label: "¿Por qué el producto?",
          message: "Porque el trabajo total es el mismo: operarios por horas no cambia.",
        },
        {
          label: "Comprueba con sentido común",
          message: "El doble de operarios debe tardar la mitad: $3$ horas en vez de $6$.",
        },
      ],
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
      help: [
        {
          label: "¿Directa o inversa?",
          message: "Con más caballos el heno se acaba antes: al subir los caballos bajan los días. Es inversa.",
        },
        {
          label: "¿Qué permanece constante?",
          message: "La cantidad total de heno: caballos por días no cambia.",
          math: ["\\text{caballos} \\cdot \\text{días} = \\text{constante}"],
        },
        {
          label: "Quiero saber si es razonable",
          message: "Con más caballos durará **menos** de $15$ días.",
        },
      ],
      title: "Caballos y heno",
      question:
        "Con $4$ caballos el heno dura $15$ días. ¿Cuántos días durará con $6$ caballos? (solo el número)",
      correctAnswers: ["10"],
      explanation: "$4 \\cdot 15 = 60$. Con $6$ caballos: $60 : 6 = 10$ días.",
    },
  ],
};
