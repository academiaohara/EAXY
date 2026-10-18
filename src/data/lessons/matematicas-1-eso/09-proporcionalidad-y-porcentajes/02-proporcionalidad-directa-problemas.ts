import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_9_SUBTITLE } from "@/data/lessons/shared";

export const proporcionalidadDirectaProblemasLesson: InteractiveLesson = {
  slug: "proporcionalidad-directa-problemas",
  title: "2. Problemas de proporcionalidad directa e inversa",
  subtitle: TEMA_1ESO_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "reduccion-directa",
      type: "slide",
      help: [
        {
          label: "¿Por qué divido entre $3$?",
          message: "Porque $3$ chocolatinas pesan $60$ g. Al repartir ese peso entre las $3$ obtienes lo que pesa una sola.",
        },
        {
          label: "Compruébalo",
          message: "Tres chocolatinas de $20$ g pesan $60$ g, como dice el enunciado.",
        },
      ],
      title: "Reducción a la unidad: primero, el valor de uno",
      blocks: [
        {
          kind: "story",
          text: "Tres chocolatinas pesan **60 g**. ¿Cuánto pesan **cuatro**?",
        },
        {
          kind: "steps",
          items: [
            "Se baja **a la unidad**: si 3 pesan 60 g, una pesa $60 : 3 = 20$ g.",
            "Se sube **a lo que piden**: cuatro pesan $20 \\cdot 4 = 80$ g.",
          ],
        },
        {
          kind: "text",
          text: "En una **directa**, lo que haces a una columna (dividir, multiplicar) se hace igual a la otra.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "reduccion-unidad",
        params: { rel: "directa", a: 3, b: 60, c: 4, titles: ["Chocolatinas", "Peso (g)"] },
      },
    },
    {
      id: "predict-reduccion",
      type: "predict",
      title: "El manantial",
      question:
        "Un manantial arroja $6$ litros por minuto. Para saber cuánto tarda en llenar una garrafa de $20$ litros, ¿qué cálculo te da el tiempo que necesita **un** litro?",
      mode: "choice",
      choices: [
        { id: "a", label: "$60\\,\\text{s} : 6 = 10\\,\\text{s}$" },
        {
          id: "b",
          label: "$6 : 60 = 0{,}1$",
          incorrectFeedback:
            "Así obtienes litros por segundo, no segundos por litro. Para la reducción a la unidad necesitas lo que cuesta **un** litro: reparte el minuto ($60$ s) entre los $6$ litros.",
        },
        {
          id: "c",
          label: "$60 \\cdot 6 = 360\\,\\text{s}$",
          incorrectFeedback:
            "Multiplicar daría el tiempo para $36$ litros, no para uno. Para bajar a la unidad se **divide**.",
        },
        {
          id: "d",
          label: "$20 : 6 \\approx 3{,}3\\,\\text{s}$",
          incorrectFeedback:
            "Mezclas litros con segundos. Primero se baja a un litro y luego se sube a $20$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      help: [
        {
          label: "¿Qué dos datos tengo?",
          message: "En $1$ minuto salen $6$ litros. El tiempo de un litro es lo que tarda en salir uno solo.",
        },
        {
          label: "Unidades",
          message: "Para no trabajar con decimales, pasa el minuto a segundos.",
        },
      ],
      explanation:
        "Un litro tarda $60 : 6 = 10$ s. Veinte litros: $10 \\cdot 20 = 200$ s $= 3$ min $20$ s.",
    },
    {
      id: "regla-tres-directa",
      type: "slide",
      help: [
        {
          label: "Cómo se monta",
          message: "Escribe las dos fracciones iguales con las chocolatinas arriba y los gramos abajo (o al revés, pero igual en las dos).",
        },
        {
          label: "Cómo se despeja",
          message: "Multiplica en cruz y divide entre el número que acompaña a la $x$ en la diagonal.",
        },
        {
          label: "Compruébalo",
          message: "Si cada chocolatina pesa $20$ g, ocho pesan $160$ g: el mismo resultado.",
        },
      ],
      title: "Regla de tres directa: una proporción con una incógnita",
      blocks: [
        {
          kind: "rule",
          title: "Fracciones equivalentes",
          text: "Con tres datos y la incógnita se forman dos fracciones iguales; se multiplica en cruz.",
          formula: "\\dfrac{a}{b} = \\dfrac{m}{x} \;\\Rightarrow\; x = \\dfrac{b \\cdot m}{a}",
        },
        {
          kind: "example",
          title: "3 chocolatinas pesan 60 g; ¿y 8?",
          lines: [
            { math: "\\dfrac{3}{8} = \\dfrac{60}{x}", note: "chocolatinas arriba, gramos abajo… en las dos" },
            { math: "3 \\cdot x = 8 \\cdot 60", note: "producto en cruz" },
            { math: "x = \\dfrac{60 \\cdot 8}{3} = 160\\,\\text{g}" },
          ],
        },
        {
          kind: "warning",
          text: "Cada magnitud ocupa **el mismo lugar** en las dos fracciones: si las chocolatinas van arriba a la izquierda, también van arriba a la derecha.",
        },
      ],
    },
    {
      id: "queso-regla",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Directa o inversa?",
          message: "Más queso cuesta más dinero: es directa. En la inversa, más cantidad costaría menos.",
        },
        {
          label: "Reducción a la unidad",
          message: "Calcula cuánto cuesta una cantidad pequeña, por ejemplo $100$ g, y multiplica.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "$320$ g es menos que $400$ g, así que cuesta menos de $4{,}60$ €, pero más de la mitad.",
        },
      ],
      title: "Regla de tres — queso",
      question:
        "Un trozo de $400$ g cuesta $4{,}60\\,€$. ¿Cuánto cuesta otro de $320$ g del mismo queso? (en euros, solo el número con coma decimal)",
      correctAnswers: ["3,68", "3.68", "3,68 €", "3.68 €", "3,68€", "3.68€"],
      hint: "Menos gramos, menos dinero: es directa. Plantea $\\frac{400}{320} = \\frac{4{,}60}{x}$.",
      explanation:
        "$\\frac{400}{320} = \\frac{4{,}60}{x}$ → $x = \\frac{320 \\cdot 4{,}60}{400} = 3{,}68\\,€$.",
    },
    {
      id: "reduccion-inversa",
      type: "slide",
      help: [
        {
          label: "¿Por qué multiplico al bajar a uno?",
          message: "Si una sola persona hace el trabajo, tarda **más**: tantas veces más como personas había.",
        },
        {
          label: "Compruébalo",
          message: "Con $4$ albañiles tardan menos que con $2$: el resultado debe ser menor que $30$ días.",
        },
      ],
      title: "Inversa: al bajar a uno, el otro valor sube",
      blocks: [
        {
          kind: "story",
          text: "**Dos albañiles** tardan **30 días** en levantar un muro. ¿Cuánto tardarían **cuatro**?",
          src: "/lesson/proporcionalidad/albanil-muro.png",
          alt: "Albañil con casco levantando un muro de ladrillo",
        },
        {
          kind: "steps",
          items: [
            "Se baja a **un albañil**: tarda el doble de tiempo, $30 \\cdot 2 = 60$ días.",
            "Se sube a **cuatro**: el trabajo se reparte, $60 : 4 = 15$ días.",
          ],
        },
        {
          kind: "warning",
          text: "En la inversa, al bajar a uno se **multiplica** y al subir se **divide**: al revés que en la directa.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "reduccion-unidad",
        params: { rel: "inversa", a: 2, b: 30, c: 4, titles: ["Albañiles", "Días"] },
      },
    },
    {
      id: "regla-tres-inversa",
      type: "slide",
      help: [
        {
          label: "¿Por qué no se cruza?",
          message: "Porque en la inversa lo que se mantiene es el **producto** de cada pareja: albañiles por días da siempre lo mismo.",
        },
        {
          label: "Mismo muro, mismo trabajo",
          message: "$2 \\cdot 30 = 60$ es «el trabajo del muro». Con $4$ albañiles, $4 \\cdot x$ tiene que ser también $60$.",
        },
      ],
      title: "Regla de tres inversa: el producto no cambia",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Directa",
            text: "Se **cruza** (mismo cociente).",
            math: ["\\dfrac{a}{b} = \\dfrac{m}{x}", "x = \\dfrac{b \\cdot m}{a}"],
            tone: "ok",
          },
          right: {
            title: "Inversa",
            text: "Cada fila se multiplica (mismo producto).",
            math: ["a \\cdot b = c \\cdot x", "x = \\dfrac{a \\cdot b}{c}"],
            tone: "key",
          },
        },
        {
          kind: "example",
          title: "2 albañiles tardan 30 días; ¿y 4?",
          lines: [
            { math: "2 \\cdot 30 = 4 \\cdot x", note: "el trabajo total es el mismo" },
            { math: "x = \\dfrac{60}{4} = 15\\ \\text{días}" },
          ],
        },
      ],
    },
    {
      id: "predict-inversa",
      type: "predict",
      title: "El muro de un albañil",
      question:
        "Un albañil tarda $60$ días en levantar un muro él solo. ¿Cuántos albañiles harán falta para terminarlo en $20$ días, trabajando todos al mismo ritmo?",
      mode: "choice",
      choices: [
        { id: "a", label: "$3$ albañiles" },
        {
          id: "b",
          label: "$40$ albañiles",
          incorrectFeedback:
            "Has restado $60 - 20$. Los días no se restan: para un tiempo tres veces menor, hace falta tres veces más gente.",
        },
        {
          id: "c",
          label: "$1\\,200$ albañiles",
          incorrectFeedback:
            "Has multiplicado $60 \\cdot 20$. Ese producto no tiene sentido aquí: el producto que se mantiene es albañiles por días, y vale $60$.",
        },
        {
          id: "d",
          label: "$20$ albañiles",
          incorrectFeedback:
            "Has copiado los días como si fueran albañiles. Comprueba: $20$ albañiles tardarían $60 : 20 = 3$ días, no $20$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      help: [
        {
          label: "¿Qué se mantiene?",
          message: "El trabajo del muro: albañiles por días.",
          math: ["1 \\cdot 60 = 60"],
        },
        {
          label: "Quiero saber si es razonable",
          message: "Si quieres tardar menos días, necesitas **más** albañiles que uno. Descarta lo que no cumpla eso.",
        },
      ],
      explanation: "$1 \\cdot 60 = n \\cdot 20 \\Rightarrow n = 60 : 20 = 3$ albañiles.",
    },
    {
      id: "predict-decide",
      type: "predict",
      title: "Un grifo y un depósito",
      question:
        "Un grifo de $12$ litros por minuto tarda $45$ minutos en llenar un depósito. ¿Qué caudal, en litros por minuto, hace falta para llenarlo en $20$ minutos?",
      mode: "choice",
      calculator: true,
      choices: [
        { id: "a", label: "$27$ litros por minuto" },
        {
          id: "b",
          label: "$5{,}3$ litros por minuto",
          incorrectFeedback:
            "Has resuelto como una directa ($12 \\cdot 20 : 45$). Pero para llenar en **menos** tiempo hace falta **más** caudal, no menos: es inversa.",
        },
        {
          id: "c",
          label: "$37$ litros por minuto",
          incorrectFeedback:
            "Has sumado los $25$ minutos que se ahorran a los $12$ litros. Caudal y tiempo no se suman: su producto (el volumen del depósito) es lo que se mantiene.",
        },
        {
          id: "d",
          label: "$12$ litros por minuto",
          incorrectFeedback: "Con el mismo caudal tardaría los mismos $45$ minutos. Para ir más rápido, hay que abrir más el grifo.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      help: [
        {
          label: "¿Directa o inversa?",
          message: "Quieres que tarde menos tiempo. ¿El caudal tiene que subir o bajar?",
        },
        {
          label: "¿Qué se mantiene?",
          message: "El volumen del depósito: caudal por tiempo.",
          math: ["12 \\cdot 45 = 540\\ \\text{litros}"],
        },
      ],
      explanation: "$12 \\cdot 45 = 540$ L. Para $20$ min: $540 : 20 = 27$ L/min.",
    },
    {
      id: "manzanas",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué hago primero?",
          message: "Calcula lo que cuesta $1$ kilo.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "Con $4$ kg pagas más que con $3$ kg ($3{,}75\\,€$), pero no el doble.",
        },
      ],
      title: "Reducción a la unidad — manzanas",
      question: "Tres kilos de manzanas cuestan $3{,}75\\,€$. ¿Cuánto cuestan cuatro kilos? (en euros, solo el número)",
      correctAnswers: ["5", "5,00", "5.00", "5 €", "5€"],
      explanation: "Un kilo cuesta $3{,}75 : 3 = 1{,}25\\,€$. Cuatro kilos: $1{,}25 \\cdot 4 = 5\\,€$.",
    },
    {
      id: "motorista",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Directa o inversa?",
          message: "A velocidad constante, más tiempo significa más distancia: directa.",
        },
        {
          label: "Un atajo",
          message: "Si en $3$ minutos recorre $4{,}8$ km, ¿cuánto recorre en $1$ minuto? Multiplica por $10$.",
        },
      ],
      title: "El motorista",
      question:
        "Un motorista recorre $4{,}8$ km en $3$ minutos a velocidad constante. ¿Cuántos kilómetros recorrerá en $10$ minutos? (solo el número)",
      correctAnswers: ["16", "16,0", "16.0"],
      explanation: "En $1$ minuto recorre $4{,}8 : 3 = 1{,}6$ km. En $10$ minutos: $1{,}6 \\cdot 10 = 16$ km.",
    },
  ],
};
