import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_9_SUBTITLE } from "@/data/lessons/shared";

export const proporcionalidadMagnitudesLesson: InteractiveLesson = {
  slug: "proporcionalidad-magnitudes",
  title: "1. Relación de proporcionalidad entre magnitudes",
  subtitle: TEMA_1ESO_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "magnitudes",
      type: "slide",
      help: [
        {
          label: "¿Qué es una magnitud?",
          message: "Cualquier cosa a la que le puedas poner un número con su unidad: $3\\,\\text{kg}$, $12\\,€$, $45\\,\\text{min}$.",
        },
        {
          label: "¿Para qué sirve la tabla?",
          message: "Para ver cómo cambia una cantidad cuando cambia la otra y comprobar si hay una regla que se repite.",
        },
      ],
      title: "Magnitudes: lo que se puede medir y relacionar",
      blocks: [
        {
          kind: "definition",
          text: "Una **magnitud** es cualquier cualidad que se pueda medir: longitud, peso, precio, tiempo, capacidad…",
        },
        {
          kind: "text",
          text: "Muchos problemas cotidianos enlazan **dos magnitudes**: lo que pagas depende de lo que compras, lo que tardas depende de la velocidad. Se ordenan en una **tabla de valores**, una columna por cada pareja de datos.",
        },
        {
          kind: "example",
          title: "Dos magnitudes, una tabla",
          lines: [
            { math: "\\text{balones} \;\\to\; 1,\\ 2,\\ 3,\\ 4", note: "primera magnitud" },
            { math: "\\text{precio} \;\\to\; 5\\,€,\\ 10\\,€,\\ 15\\,€,\\ 20\\,€", note: "segunda magnitud" },
          ],
        },
        {
          kind: "text",
          text: "Hay dos formas de relacionarse con regla fija: **directa** e **inversa**. Las dos siguientes diapositivas las distinguen.",
        },
      ],
    },
    {
      id: "directa",
      type: "slide",
      help: [
        {
          label: "Un test rápido",
          message: "Duplica una de las dos magnitudes: si la otra también se duplica, es directa.",
        },
        {
          label: "¿Qué se mantiene?",
          message: "El precio de **un** balón: dividir el precio entre los balones da siempre $5$.",
        },
      ],
      title: "Proporcionalidad directa: crecen y decrecen a la vez",
      blocks: [
        {
          kind: "definition",
          text: "Dos magnitudes son **directamente proporcionales** cuando, al multiplicar o dividir una por un número, la otra se multiplica o divide **por el mismo número**.",
        },
        {
          kind: "rule",
          title: "Lo que se mantiene",
          text: "El **cociente** entre las dos magnitudes es constante (aquí, el precio de un balón).",
          formula: "\\dfrac{\\text{precio}}{\\text{balones}} = \\dfrac{5}{1} = \\dfrac{10}{2} = \\dfrac{15}{3} = 5",
        },
      ],
      visual: {
        kind: "anim",
        scene: "tabla-razon",
        params: { rel: "directa", a: 1, b: 5, nums: [1, 2, 3, 8], titles: ["Balones", "Precio (€)"] },
      },
    },
    {
      id: "predict-directa",
      type: "predict",
      title: "La gasolinera",
      question:
        "En una gasolinera, $20$ litros de gasolina cuestan $32\\,€$. Con el mismo precio por litro, ¿cuánto pagarás por $60$ litros?",
      mode: "choice",
      calculator: true,
      choices: [
        { id: "a", label: "$96\\,€$" },
        {
          id: "b",
          label: "$52\\,€$",
          incorrectFeedback:
            "Has sumado los $40$ litros que faltan a los $32\\,€$: litros y euros no se suman. $60$ L es el **triple** de $20$ L, así que el precio también se triplica.",
        },
        {
          id: "c",
          label: "$64\\,€$",
          incorrectFeedback:
            "Eso es el doble de $32$. Pero $60$ no es el doble de $20$, es el triple: $20 \\cdot 3 = 60$.",
        },
        {
          id: "d",
          label: "$32\\,€$",
          incorrectFeedback:
            "El precio solo se queda igual si no cambian los litros. Al comprar más litros, se paga más.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      help: [
        {
          label: "¿Por cuánto se multiplica?",
          message: "Compara los litros: pasas de $20$ a $60$. ¿Cuántas veces cabe $20$ en $60$?",
          detail: ["Esa misma cantidad de veces tiene que cambiar el precio, porque es una relación directa."],
        },
        {
          label: "Quiero saber si es razonable",
          message: "Con $60$ litros pagas más que con $20$. Descarta lo que sea menor o igual a $32\\,€$.",
        },
      ],
      explanation: "$60 : 20 = 3$, así que el precio se multiplica por $3$: $32 \\cdot 3 = 96\\,€$.",
    },
    {
      id: "inversa",
      type: "slide",
      help: [
        {
          label: "Un test rápido",
          message: "Duplica una de las magnitudes: si la otra se reduce a la mitad, es inversa.",
        },
        {
          label: "¿Qué se mantiene?",
          message: "El heno total: caballos por días da siempre el mismo número.",
        },
      ],
      title: "Proporcionalidad inversa: una sube, la otra baja",
      blocks: [
        {
          kind: "story",
          text: "Un granjero tiene una carga de heno. Con **más caballos**, el heno dura **menos días**; con menos caballos, dura más.",
          src: "/lesson/proporcionalidad/caballos-heno.png",
          alt: "Dos caballos junto a un carro cargado de heno",
        },
        {
          kind: "definition",
          text: "Dos magnitudes son **inversamente proporcionales** cuando, al multiplicar una por un número, la otra se **divide** entre ese número (y al dividir una, la otra se multiplica).",
        },
        {
          kind: "rule",
          title: "Lo que se mantiene",
          text: "El **producto** de las dos magnitudes es constante (aquí, el heno total).",
          formula: "2 \\cdot 30 = 4 \\cdot 15 = 6 \\cdot 10 = 60",
        },
      ],
      visual: {
        kind: "anim",
        scene: "tabla-razon",
        params: { rel: "inversa", a: 2, b: 30, nums: [2, 4, 6, 12], titles: ["Caballos", "Días"] },
      },
    },
    {
      id: "reconocer",
      type: "slide",
      help: [
        {
          label: "Cuando no sé",
          message: "Calcula el cociente y el producto de dos parejas de la tabla. Si ninguno de los dos coincide, no son proporcionales.",
        },
      ],
      title: "Cómo reconocer cada relación",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Directa",
            text: "Una se duplica y la otra **también**.",
            math: ["\\dfrac{y}{x} = \\text{constante}"],
            tone: "ok",
          },
          right: {
            title: "Inversa",
            text: "Una se duplica y la otra se reduce a **la mitad**.",
            math: ["x \\cdot y = \\text{constante}"],
            tone: "key",
          },
        },
        {
          kind: "warning",
          title: "No basta con que «vayan juntas»",
          text: "La edad y la altura crecen a la vez, pero no son proporcionales: a los $10$ años no mides el doble que a los $5$. Debe haber un cociente o un producto **fijo**.",
        },
      ],
    },
    {
      id: "predict-inversa",
      type: "predict",
      title: "Limpiando el polideportivo",
      question:
        "Una cuadrilla de $5$ operarios limpia el polideportivo en $6$ horas. Si se incorporan otros $5$ y trabajan $10$ personas al mismo ritmo, ¿cuánto tardarán?",
      mode: "choice",
      choices: [
        { id: "a", label: "$3$ horas" },
        {
          id: "b",
          label: "$12$ horas",
          incorrectFeedback:
            "Has duplicado las horas, como en una directa. Pero con el doble de gente el trabajo se termina antes, no después.",
        },
        {
          id: "c",
          label: "$6$ horas",
          incorrectFeedback:
            "El tiempo no puede quedarse igual si se duplica la plantilla: el mismo trabajo lo reparten entre más manos.",
        },
        {
          id: "d",
          label: "$1$ hora",
          incorrectFeedback:
            "Has restado ($6 - 5$). La relación es multiplicativa: el doble de operarios, la **mitad** de tiempo.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      help: [
        {
          label: "¿Directa o inversa?",
          message: "Más operarios, menos horas. Cuando una sube y la otra baja con regla fija, es inversa.",
        },
        {
          label: "¿Qué se mantiene?",
          message: "El trabajo total, medido como operarios por horas.",
          math: ["5 \\cdot 6 = 30"],
        },
      ],
      explanation: "El doble de operarios tarda la mitad: $6 : 2 = 3$ horas. Comprobación: $5 \\cdot 6 = 10 \\cdot 3 = 30$.",
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
      title: "Directa, inversa o ninguna",
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
    {
      id: "cromos",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Directa o inversa?",
          message: "Más cromos, más dinero: directa.",
        },
        {
          label: "Un truco",
          message: "Pasa de $5$ cromos a $10$: ¿por cuánto se multiplica? Haz lo mismo con el precio.",
        },
      ],
      title: "Los cromos",
      question: "Cinco cromos cuestan $0{,}40\\,€$. ¿Cuánto cuestan diez cromos del mismo tipo? (en euros, con coma)",
      correctAnswers: ["0,8", "0,80", "0.8", "0.80", "0,8 €", "0,80 €", "0,80€", "0,8€"],
      explanation: "$10$ es el doble de $5$, así que el precio se duplica: $0{,}40 \\cdot 2 = 0{,}80\\,€$.",
    },
  ],
};
