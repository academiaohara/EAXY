import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_8_SUBTITLE } from "@/data/lessons/shared";

export const operacionesFraccionesSumaRestaLesson: InteractiveLesson = {
  slug: "operaciones-fracciones-suma-resta",
  title: "2. Suma y resta de fracciones",
  subtitle: TEMA_1ESO_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "igual-denominador",
      type: "slide",
      help: [
        {
          label: "¿Por qué solo sumo arriba?",
          message: "Porque los trozos son del mismo tamaño: sumas cuántos hay, no cambias su tamaño.",
        },
        {
          label: "Con otro ejemplo",
          message: "$3$ novenos más $4$ novenos son $7$ novenos, igual que $3$ manzanas más $4$ manzanas son $7$ manzanas.",
        },
        {
          label: "No olvides simplificar",
          message: "Si el resultado se puede simplificar, hazlo para dar la fracción irreducible.",
        },
      ],
      title: "Mismo denominador: se cuentan trozos",
      blocks: [
        {
          kind: "rule",
          title: "Regla",
          text: "Se suman o restan los **numeradores**; el denominador se queda igual.",
          formula: "\\frac{a}{c} \\pm \\frac{b}{c} = \\frac{a \\pm b}{c}",
        },
        {
          kind: "example",
          lines: [
            {
              math: "\\frac{5}{9} + \\frac{8}{9} - \\frac{7}{9} = \\frac{5 + 8 - 7}{9} = \\frac{6}{9} = \\frac{2}{3}",
              note: "al final, se simplifica",
            },
          ],
        },
        {
          kind: "warning",
          text: "No se suman los denominadores: $\\frac{2}{4} + \\frac{3}{4}$ es $\\frac{5}{4}$, **no** $\\frac{5}{8}$. El tamaño del trozo no cambia.",
        },
      ],
      visual: { kind: "anim", scene: "fraccion-barras-suma", params: { a: 2, b: 4, c: 3, d: 4, op: "+" } },
    },
    {
      id: "distinto-denominador",
      type: "slide",
      help: [
        {
          label: "¿Por qué hace falta igualar?",
          message: "No puedes sumar medios con quintos, igual que no sumas metros con kilos: primero hay que expresarlos con el mismo tipo de trozo.",
        },
        {
          label: "¿Qué denominador elijo?",
          message: "El m.c.m. de los denominadores. Con otro múltiplo común también funciona, pero salen cifras mayores.",
        },
        {
          label: "Orden de los pasos",
          message: "Primero el m.c.m., luego las fracciones equivalentes, después operas los numeradores y por último simplificas.",
        },
      ],
      title: "Distinto denominador: primero se igualan los trozos",
      blocks: [
        {
          kind: "steps",
          items: [
            "Calcula el **m.c.m.** de los denominadores.",
            "Escribe cada fracción como equivalente con ese denominador.",
            "Opera los numeradores como en el caso anterior y **simplifica**.",
          ],
        },
        {
          kind: "example",
          title: "$\\frac{4}{3} - \\frac{3}{4}$",
          lines: [
            { math: "\\text{m.c.m.}(3, 4) = 12" },
            { math: "\\frac{4}{3} - \\frac{3}{4} = \\frac{16}{12} - \\frac{9}{12}", note: "$12 : 3 = 4$ y $12 : 4 = 3$" },
            { math: "= \\frac{16 - 9}{12} = \\frac{7}{12}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "fraccion-barras-suma", params: { a: 4, b: 3, c: 3, d: 4, op: "-" } },
    },
    {
      id: "gasto-manuel",
      type: "predict",
      help: [
        {
          label: "¿Qué operación hago?",
          message: "Las dos fracciones son partes del mismo dinero, y te piden lo que se ha gastado en total: se juntan, es decir, se suma.",
        },
        {
          label: "¿Puedo sumar medios y tercios tal cual?",
          message: "No: son trozos de distinto tamaño. Escríbelos con un denominador que sea múltiplo de $2$ y de $3$.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "Un medio y un tercio es más que la mitad pero menos que $1$. Compara con tus opciones.",
        },
      ],
      title: "Cine y hamburguesa",
      question:
        "Manuel gasta la mitad de su dinero en el cine y la tercera parte en una hamburguesa. ¿Qué fracción de su dinero ha gastado?",
      mode: "choice",
      choices: [
        { id: "a", label: "$\\dfrac{5}{6}$" },
        {
          id: "b",
          label: "$\\dfrac{2}{5}$",
          incorrectFeedback:
            "Has sumado numeradores con numeradores y denominadores con denominadores. Los denominadores no se suman: hay que igualar los trozos.",
        },
        {
          id: "c",
          label: "$\\dfrac{1}{6}$",
          incorrectFeedback:
            "Eso es lo que le **queda** ($1 - \\frac{5}{6}$), no lo que ha gastado.",
        },
        {
          id: "d",
          label: "$\\dfrac{2}{6}$",
          incorrectFeedback:
            "Has sumado los numeradores ($1 + 1$) sin convertir las fracciones. Medios y tercios no son trozos del mismo tamaño.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "m.c.m.$(2, 3) = 6$: $\\frac{1}{2} + \\frac{1}{3} = \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$. Le queda $1 - \\frac{5}{6} = \\frac{1}{6}$.",
    },
    {
      id: "tres-fracciones",
      type: "slide",
      help: [
        {
          label: "Con tres fracciones",
          message: "El m.c.m. se calcula con los tres denominadores a la vez, no de dos en dos.",
        },
        {
          label: "¿Cuándo resto y cuándo sumo?",
          message: "Después de reducir, respeta el signo de cada fracción: el denominador es común y los numeradores se operan en orden.",
        },
      ],
      title: "Tres fracciones, un solo m.c.m.",
      blocks: [
        {
          kind: "example",
          title: "$\\frac{1}{4} + \\frac{3}{5} - \\frac{1}{10}$",
          lines: [
            { math: "\\text{m.c.m.}(4, 5, 10) = 20" },
            { math: "\\frac{5}{20} + \\frac{12}{20} - \\frac{2}{20}", note: "fracciones equivalentes" },
            { math: "\\frac{5 + 12 - 2}{20} = \\frac{15}{20} = \\frac{3}{4}", note: "operamos y simplificamos" },
          ],
        },
        {
          kind: "warning",
          text: "Termina siempre simplificando: la respuesta es la fracción **irreducible**.",
        },
      ],
      visual: { kind: "anim", scene: "tabla-exponentes", params: { nums: [4, 5, 10], mode: "mcm" } },
    },
    {
      id: "enteros",
      type: "slide",
      help: [
        {
          label: "¿Por qué $2 = \\frac{2}{1}$?",
          message: "Porque dividir entre $1$ no cambia nada. Así el entero se puede igualar con las demás fracciones.",
        },
        {
          label: "Atajo mental",
          message: "Para pasar $2$ a sextos, multiplica $2 \\cdot 6$: $\\frac{12}{6}$.",
        },
      ],
      title: "Un número entero también es una fracción",
      blocks: [
        {
          kind: "definition",
          text: "Un entero se escribe como fracción con **denominador 1**: $2 = \\dfrac{2}{1}$. Después se reduce a común denominador como cualquier otra.",
        },
        {
          kind: "example",
          title: "$2 - \\frac{7}{3} + \\frac{5}{6}$",
          lines: [
            { math: "2 = \\frac{2}{1}\\ \\Rightarrow\\ \\text{m.c.m.}(1, 3, 6) = 6" },
            { math: "\\frac{12}{6} - \\frac{14}{6} + \\frac{5}{6} = \\frac{3}{6} = \\frac{1}{2}" },
          ],
        },
        {
          kind: "example",
          title: "Cálculo mental",
          lines: [{ math: "1 - \\frac{1}{4} = \\frac{4}{4} - \\frac{1}{4} = \\frac{3}{4}", note: "la unidad entera son $\\frac{4}{4}$" }],
        },
      ],
      visual: { kind: "anim", scene: "fraccion-equivalente", params: { a: 1, b: 1, c: 4 } },
    },
    {
      id: "mental",
      type: "fraction_pick",
      help: [
        {
          label: "¿Cuánto es la unidad en cuartos?",
          message: "La barra entera son $4$ cuartos. Escribe el $1$ como una fracción con ese denominador.",
        },
        {
          label: "Piénsalo como quitar un trozo",
          message: "Imagina una tableta de chocolate partida en $4$. Te comes un trozo: ¿cuántos quedan?",
        },
      ],
      title: "Cálculo mental",
      question:
        "La barra entera es $1$. Le quitamos $\\frac{1}{4}$: colorea lo que queda, $1 - \\frac{1}{4}$.",
      shape: "bar",
      numerator: 3,
      denominator: 4,
      hint: "La barra está partida en cuartos, así que la unidad son $\\frac{4}{4}$. ¿Cuántos cuartos quedan si quitas uno?",
      explanation: "$1 = \\dfrac{4}{4}$; $\\dfrac{4}{4} - \\dfrac{1}{4} = \\dfrac{3}{4}$: quedan $3$ de los $4$ cuartos.",
    },
    {
      id: "check-suma",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Por qué no sumo directamente?",
          message: "Medios y quintos son trozos de tamaños distintos. Antes de sumar hay que expresarlos con el mismo denominador.",
        },
        {
          label: "¿Qué denominador común uso?",
          message: "Uno que sea múltiplo de $2$ y de $5$. El más pequeño es el m.c.m.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "$\\frac{1}{2} + \\frac{1}{5}$ es más que $\\frac{1}{2}$ y menos que $1$: el resultado queda entre medio y uno.",
        },
      ],
      title: "Suma con distinto denominador",
      question: "Calcula $\\dfrac{1}{2} + \\dfrac{1}{5}$ (numerador del resultado, ya simplificado).",
      correctAnswers: ["7"],
      hint: "Denominador común $10$: $\\frac{5}{10} + \\frac{2}{10}$.",
      explanation: "$\\dfrac{5}{10} + \\dfrac{2}{10} = \\dfrac{7}{10}$.",
    },
    {
      id: "botella",
      type: "predict",
      help: [
        {
          label: "¿Qué operación hago?",
          message: "Lo que queda es lo que había menos todo lo que se ha servido: una resta con varias partes.",
        },
        {
          label: "¿Cuánto se ha servido?",
          message: "Dos vasos de $\\frac{1}{4}$ l hacen $\\frac{2}{4}$ l. Simplifica antes de seguir y luego añade el botellín.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "Se ha servido más de medio litro (los dos vasos) y algo más (el botellín): queda menos de medio litro.",
        },
      ],
      title: "Una botella de un litro",
      question:
        "Una botella tiene 1 litro de agua. Se llenan dos vasos de 1/4 de litro y un botellín de 1/3 de litro. ¿Qué fracción de litro queda en la botella?",
      mode: "choice",
      choices: [
        { id: "a", label: "$\\dfrac{1}{6}$ de litro" },
        {
          id: "b",
          label: "$\\dfrac{5}{6}$ de litro",
          incorrectFeedback:
            "Eso es lo que se ha **servido** ($\\frac{1}{2} + \\frac{1}{3}$), no lo que queda en la botella.",
        },
        {
          id: "c",
          label: "$\\dfrac{2}{3}$ de litro",
          incorrectFeedback:
            "Solo has quitado el botellín ($1 - \\frac{1}{3}$). Faltan los **dos** vasos de $\\frac{1}{4}$.",
        },
        {
          id: "d",
          label: "$\\dfrac{1}{2}$ de litro",
          incorrectFeedback:
            "Solo has quitado los dos vasos ($1 - \\frac{2}{4}$). Falta el botellín de $\\frac{1}{3}$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$1 - \\frac{2}{4} - \\frac{1}{3} = \\frac{12}{12} - \\frac{6}{12} - \\frac{4}{12} = \\frac{2}{12} = \\frac{1}{6}$ de litro.",
    },
  ],
};
