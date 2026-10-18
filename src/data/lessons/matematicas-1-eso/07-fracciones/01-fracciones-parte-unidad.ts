import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_7_SUBTITLE } from "@/data/lessons/shared";

export const fraccionesParteUnidadLesson: InteractiveLesson = {
  slug: "fracciones-parte-unidad",
  title: "1. Parte de la unidad",
  subtitle: TEMA_1ESO_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "egipto",
      type: "slide",
      help: [
        {
          label: "¿Por qué sumaban?",
          message: "Con solo $\\frac{1}{2}, \\frac{1}{3}, \\frac{1}{4}\\ldots$ no se puede escribir $\\frac{4}{7}$ de un golpe. Había que construirlo juntando varias piezas de ese tipo.",
        },
        {
          label: "¿Qué ganamos hoy?",
          message: "Una fracción $\\frac{a}{b}$ guarda en un solo símbolo «cuántas partes» y «de cuántas»: lo que antes costaba una suma de varias fracciones.",
        },
      ],
      title: "Repartir exige fracciones",
      arrange: "stack",
      blocks: [
        {
          kind: "story",
          text: "Un escriba egipcio, hacia el siglo XVII a. C., tiene que repartir **4 panes entre 7 personas**. Cada una recibe menos de un pan, así que el resultado no es un número natural.",
          src: "/lesson/fracciones/panes-egipcios.png",
          alt: "Escriba egipcio con varios panes sobre una mesa",
          side: "right",
          maxWidth: 170,
        },
        {
          kind: "compare",
          left: {
            title: "Los egipcios",
            text: "Solo admitían fracciones con numerador $1$, sumadas entre sí:",
            math: ["\\frac{4}{7} = \\frac{1}{2} + \\frac{1}{14}", "\\frac{4}{7} = \\frac{1}{3} + \\frac{1}{6} + \\frac{1}{14}"],
            tone: "warn",
          },
          right: {
            title: "Hoy",
            text: "Un único símbolo con dos números: cuántas partes se toman y de cuántas iguales.",
            math: ["\\frac{4}{7}"],
            tone: "ok",
          },
        },
        {
          kind: "text",
          text: "Aquel método era tan engorroso que necesitaban tablas enormes para operar. Se usó en Grecia y llegó a la Europa del siglo XIII, junto a las fracciones que usamos ahora.",
        },
      ],
    },
    {
      id: "partes-iguales",
      type: "slide",
      help: [
        {
          label: "¿Por qué tienen que ser iguales?",
          message: "Si los trozos son distintos, «seis de ocho» ya no describe una cantidad concreta: depende de qué seis cojas.",
        },
        {
          label: "Cómo se lee",
          message: "En $\\frac{6}{8}$ el $8$ dice en cuántas partes iguales se divide la unidad y el $6$ cuántas coges.",
        },
      ],
      title: "Una fracción cuenta partes de una unidad",
      blocks: [
        {
          kind: "definition",
          text: "Una fracción $\\frac{a}{b}$ indica **cuántas partes** (numerador $a$) se toman de una unidad dividida en **$b$ partes iguales** (denominador $b$).",
        },
        {
          kind: "facts",
          items: [
            { tex: "a", label: "numerador: partes que se toman" },
            { tex: "b", label: "denominador: partes iguales de la unidad" },
          ],
        },
        {
          kind: "warning",
          title: "Partes iguales",
          text: "Si los trozos no tienen el mismo tamaño, la fracción no dice cuánta pizza es. Primero se parte en partes iguales; después se cuentan las que se cogen.",
        },
      ],
      visual: { kind: "anim", scene: "fraccion-partes", params: { a: 6, b: 8 } },
    },
    {
      id: "marca-pizza",
      type: "fraction_pick",
      help: [
        {
          label: "Léelo en voz alta",
          message: "«Tres octavos» son tres porciones de tamaño un octavo. El nombre del denominador te dice cuántas porciones tiene la tarta entera.",
        },
        {
          label: "¿Qué cuento y qué ignoro?",
          message: "Solo coloreas porciones: el total de la tarta no cambia, ya está partida.",
        },
      ],
      title: "Colorea la fracción",
      question: "Toca las porciones de la tarta hasta colorear $\\frac{3}{8}$.",
      shape: "circle",
      numerator: 3,
      denominator: 8,
      itemLabel: "porción",
      hint: "La tarta ya está partida en $8$ porciones iguales: el denominador. Colorea tantas como dice el numerador.",
      explanation: "$\\frac{3}{8}$ son $3$ porciones de las $8$ iguales en que se ha partido la tarta.",
    },
    {
      id: "check-reparto",
      type: "predict",
      help: [
        {
          label: "¿Cuál es el total?",
          message: "La pizza entera sigue siendo la misma después de comer: sus $8$ porciones no cambian aunque falten algunas en la caja.",
        },
        {
          label: "Primero cuenta lo que queda",
          message: "Resta de las $8$ porciones las que se han comido entre los dos. Después decide qué número va arriba y cuál abajo.",
        },
      ],
      title: "Lo que queda de la pizza",
      question:
        "Una pizza está partida en 8 porciones iguales. Marta se come 3 y Pablo se come 2. ¿Qué fracción de la pizza queda en la caja?",
      mode: "choice",
      choices: [
        { id: "a", label: "$\\frac{3}{8}$" },
        {
          id: "b",
          label: "$\\frac{5}{8}$",
          incorrectFeedback:
            "$\\frac{5}{8}$ es lo que **se han comido** entre los dos ($3 + 2 = 5$ porciones). La pregunta es por lo que queda.",
        },
        {
          id: "c",
          label: "$\\frac{3}{5}$",
          incorrectFeedback:
            "El denominador no cambia: la unidad sigue siendo la pizza entera, partida en $8$. No se cuentan solo las porciones comidas.",
        },
        {
          id: "d",
          label: "$\\frac{3}{2}$",
          incorrectFeedback:
            "Eso mezcla datos sueltos del enunciado. Una fracción de la pizza lleva abajo las porciones **totales**, $8$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Se han comido $3 + 2 = 5$ de las $8$ porciones; quedan $8 - 5 = 3$: $\\frac{3}{8}$ de la pizza.",
    },
    {
      id: "recta",
      type: "slide",
      help: [
        {
          label: "Una regla sencilla",
          message: "Compara los dos números de la fracción: si el de arriba es menor que el de abajo, no llega a $1$.",
        },
        {
          label: "¿Y si se pasa?",
          message: "$\\frac{7}{5}$ son cinco quintos (una unidad entera) más dos quintos de otra unidad.",
        },
      ],
      title: "Menor, igual o mayor que la unidad",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "\\frac{2}{5} < 1", label: "numerador menor que el denominador" },
            { tex: "\\frac{5}{5} = 1", label: "numerador igual al denominador" },
            { tex: "\\frac{7}{5} > 1", label: "numerador mayor que el denominador" },
          ],
        },
        {
          kind: "rule",
          title: "Cómo decidirlo",
          text: "Compara numerador y denominador: si coges **menos** partes de las que forman la unidad no la completas; si coges **todas**, la tienes entera; si coges **más**, hay que empezar otra.",
        },
      ],
      visual: { kind: "anim", scene: "fraccion-recta", params: { a: 2, b: 5, c: 7 } },
    },
    {
      id: "explora-fraccion",
      type: "slide",
      help: [
        {
          label: "Algo que probar",
          message: "Deja el denominador fijo y sube el numerador poco a poco. Fíjate en el momento exacto en que la etiqueta cambia.",
        },
        {
          label: "Y al revés",
          message: "Ahora deja el numerador y sube el denominador: las partes se hacen más pequeñas. ¿Qué le pasa al valor?",
        },
      ],
      title: "Pruébalo tú: ¿cuándo pasa de 1?",
      blocks: [
        {
          kind: "text",
          text: "Cambia el **numerador** y el **denominador** y observa la barra, el punto en la recta y el valor decimal.",
        },
        {
          kind: "warning",
          title: "Fíjate en",
          text: "Con el mismo numerador, **más partes** significa **trozos más pequeños**: $\\frac{3}{8}$ es menos que $\\frac{3}{4}$.",
        },
      ],
      visual: { kind: "tool", tool: "fraccion-explorador", params: { n: 3, d: 8 } },
    },
    {
      id: "divide-tu",
      type: "fraction_pick",
      help: [
        {
          label: "¿Por qué empiezo por el denominador?",
          message: "Sin partir la barra en partes iguales no se puede decir cuántas se colorean. El denominador marca el tamaño de cada parte.",
        },
        {
          label: "¿Qué pasa si parto en otro número?",
          message: "Si partes en otro número de trozos, la fracción coloreada sería otra. Todas las partes tienen que ser iguales.",
        },
      ],
      title: "Divide tú la unidad",
      question:
        "Ahora la barra está entera. Divídela en las partes que necesites y colorea $\\frac{2}{5}$.",
      shape: "bar",
      numerator: 2,
      denominator: 5,
      adjustableParts: true,
      exactParts: true,
      hint: "Primero el denominador: ¿en cuántas partes iguales hay que dividir la barra? Después colorea el numerador.",
      explanation: "El denominador $5$ dice en cuántas partes iguales se divide la barra; el numerador $2$, cuántas se colorean.",
    },
    {
      id: "check-mayor",
      type: "fraction_pick",
      help: [
        {
          label: "¿Se puede colorear más de una barra?",
          message: "Sí. Cuando el numerador es mayor que el denominador, la fracción vale más que $1$ y necesitas más de una unidad.",
        },
        {
          label: "Cuenta en quintos",
          message: "Llena primero una barra entera y mira cuántos quintos has usado. Lo que falta lo coloreas en la segunda barra.",
        },
      ],
      title: "Más de una unidad",
      question: "Tienes dos barras partidas en quintos. Colorea $\\frac{8}{5}$.",
      shape: "bar",
      numerator: 8,
      denominator: 5,
      wholes: 2,
      hint: "Una barra entera son $\\frac{5}{5}$. ¿Cuántos quintos te faltan para llegar a $8$?",
      explanation:
        "$\\frac{8}{5}$ es una barra entera ($\\frac{5}{5}$) y $3$ quintos más: como $8 > 5$, $\\frac{8}{5} > 1$.",
    },
    {
      id: "check-pizzas",
      type: "predict",
      help: [
        {
          label: "¿Cuántas porciones tiene una pizza?",
          message: "El denominador de $\\frac{5}{4}$ lo dice: cada pizza se parte en $4$ porciones iguales. ¿Cuántas porciones pide el cliente?",
        },
        {
          label: "Agrupa porciones",
          message: "Reparte las porciones pedidas en pizzas de cuatro. Cuando una pizza se completa, empieza otra.",
        },
      ],
      title: "Pedir más de una pizza",
      question:
        "Una pizzería parte cada pizza en 4 porciones iguales. Un cliente encarga 5/4 de pizza. ¿Cuántas pizzas tiene que sacar del horno la cocina?",
      mode: "choice",
      choices: [
        { id: "a", label: "Dos: una entera y otra de la que solo se usa una porción" },
        {
          id: "b",
          label: "Una, porque una pizza no puede llevar más de $4$ porciones",
          incorrectFeedback:
            "Precisamente por eso hacen falta dos: $\\frac{5}{4}$ es mayor que $1$, así que una sola pizza se queda corta.",
        },
        {
          id: "c",
          label: "Cinco, una por cada porción pedida",
          incorrectFeedback:
            "El $5$ cuenta porciones, no pizzas. Cada pizza trae cuatro, así que $5$ porciones caben en dos pizzas.",
        },
        {
          id: "d",
          label: "Cuatro, el denominador",
          incorrectFeedback:
            "El denominador dice cuántas porciones tiene **una** pizza, no cuántas pizzas hacen falta.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$\\frac{5}{4} = \\frac{4}{4} + \\frac{1}{4}$: una pizza entera y una porción de la siguiente, o sea, dos pizzas.",
    },
    {
      id: "check-finde",
      type: "predict",
      help: [
        {
          label: "¿Cuál es la unidad?",
          message: "La semana completa, con todos sus días. Ese total va siempre en el denominador, cuente lo que cuente la fracción.",
        },
        {
          label: "Una comprobación rápida",
          message: "La fracción de días hábiles y la del fin de semana deben sumar la semana entera, $\\frac{7}{7}$.",
        },
      ],
      title: "Fin de semana",
      question:
        "Los días hábiles (de lunes a viernes) son 5 de los 7 días de la semana, o sea, $\\frac{5}{7}$. ¿Qué fracción de la semana forma el fin de semana?",
      mode: "choice",
      choices: [
        { id: "a", label: "$\\frac{2}{7}$" },
        {
          id: "b",
          label: "$\\frac{2}{5}$",
          incorrectFeedback:
            "El total no es $5$: la unidad es la semana entera, de $7$ días. El fin de semana son $2$ de esos $7$.",
        },
        {
          id: "c",
          label: "$\\frac{5}{7}$",
          incorrectFeedback: "Esa es la fracción de los días **hábiles**, que ya te daba el enunciado.",
        },
        {
          id: "d",
          label: "$\\frac{7}{2}$",
          incorrectFeedback:
            "Está al revés: $\\frac{7}{2}$ es mayor que $1$, y un fin de semana no puede ser más que la semana completa.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "El fin de semana son $2$ días de $7$: $\\frac{2}{7}$. Y $\\frac{5}{7} + \\frac{2}{7} = \\frac{7}{7} = 1$.",
    },
  ],
};
