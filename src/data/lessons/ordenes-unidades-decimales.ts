import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_5_SUBTITLE } from "@/data/lessons/shared";

export const ordenesUnidadesDecimalesLesson: InteractiveLesson = {
  slug: "ordenes-unidades-decimales",
  title: "1. Los órdenes de unidades decimales",
  subtitle: TEMA_5_SUBTITLE,
  steps: [
    {
      id: "intro",
      type: "concept",
      title: "Partes más pequeñas que la unidad",
      content: [
        "Para medir cantidades menores que $1$ (euros con céntimos, gramos, décimas de grado…) usamos **cifras decimales** a la derecha de la coma.",
        "Cada orden se obtiene dividiendo el anterior en **diez** partes iguales: $10\\,\\mathrm{U} = 10\\,\\mathrm{d} = 100\\,\\mathrm{c} = 1000\\,\\mathrm{m}$.",
        "Ejemplos del temario: $2{,}7$ son dos unidades y siete décimas; $2{,}74$, setenta y cuatro centésimas; $2{,}745$, setecientas cuarenta y cinco milésimas.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Lectura en la vida real",
          items: [
            {
              title: "Dinero",
              math: "2{,}54\\,€",
              caption: "Dos euros y cincuenta y cuatro céntimos.",
              tone: "cobalt",
            },
            {
              title: "Masa",
              math: "2{,}375\\,\\mathrm{kg}",
              caption: "Dos kilos y trescientas setenta y cinco milésimas.",
              tone: "emerald",
            },
          ],
        },
      ],
    },
    {
      id: "leer",
      type: "concept",
      title: "Cómo leer un decimal",
      content: [
        "1. Nombra la **parte entera** en unidades.",
        "2. Nombra la **parte decimal** según el orden de la última cifra a la derecha (décimas, centésimas, milésimas…).",
        "Ejemplo: $13{,}0574$ → «trece unidades y quinientas setenta y cuatro **diezmilésimas**».",
      ],
      warning:
        "Los ceros a la derecha no cambian el valor: $2{,}5 = 2{,}50 = 2{,}500$. Sirven para igualar cifras al comparar.",
    },
    {
      id: "orden",
      type: "concept",
      title: "Orden y recta numérica",
      content: [
        "En la recta, los decimales quedan ordenados de menor a mayor hacia la derecha.",
        "Para **comparar** sin dibujar: primero la parte entera; si coincide, iguala decimales con ceros a la derecha y compara cifra a cifra.",
        "Entre dos decimales distintos **siempre** hay otro decimal (por ejemplo entre $5{,}2$ y $5{,}3$ está $5{,}23$).",
      ],
    },
    {
      id: "redondeo",
      type: "animated_solution",
      title: "Aproximación por redondeo",
      content: [
        "Suprime cifras a la derecha del orden elegido; si la primera cifra suprimida es $5$ o mayor, suma $1$ a la cifra anterior.",
      ],
      frames: [
        {
          caption: "A las décimas ($13{,}8271$): primera cifra suprimida $2 < 5$ →",
          math: "13{,}8271 \\approx 13{,}8",
        },
        {
          caption: "A las centésimas ($13{,}8271$): primera suprimida $7 \\geq 5$ →",
          math: "13{,}8271 \\approx 13{,}83",
        },
        {
          caption: "Reparto de $30\\,€$ entre $7$ (aprox. a céntimos):",
          math: "30 : 7 \\approx 4{,}29\\,€",
        },
      ],
    },
    {
      id: "check-lectura",
      type: "classify",
      title: "Lectura de un decimal",
      question:
        "Para leer un decimal nombramos el orden de su última cifra. Coloca cada número según cómo se lee su parte decimal.",
      groups: [
        { id: "decimas", label: "… décimas", tone: "cobalt" },
        { id: "centesimas", label: "… centésimas", tone: "emerald" },
        { id: "milesimas", label: "… milésimas", tone: "violet" },
      ],
      items: [
        { id: "a", text: "$5{,}004$", group: "milesimas" },
        { id: "b", text: "$5{,}04$", group: "centesimas" },
        { id: "c", text: "$5{,}4$", group: "decimas" },
        { id: "d", text: "$2{,}745$", group: "milesimas" },
        { id: "e", text: "$0{,}07$", group: "centesimas" },
        { id: "f", text: "$13{,}8$", group: "decimas" },
      ],
      hint: "Cuenta cuántas cifras hay después de la coma: una, décimas; dos, centésimas; tres, milésimas.",
      explanation:
        "$5{,}004$ se lee «cinco unidades y cuatro **milésimas**»: el $4$ está en el tercer lugar tras la coma (los ceros también ocupan su lugar). $5{,}04$ son cuatro centésimas y $5{,}4$, cuatro décimas.",
    },
    {
      id: "check-redondeo",
      type: "number_line_pick",
      title: "Redondea y sitúa",
      question: "Redondea $4{,}76$ a las décimas y marca el resultado en la recta.",
      min: 4,
      max: 5,
      subdivisions: 10,
      target: 4.8,
      hint: "Fíjate en la primera cifra que suprimes (las centésimas): ¿es $5$ o mayor?",
      explanation:
        "La primera cifra suprimida es $6 \\geq 5$, así que sumamos $1$ a las décimas: $4{,}76 \\approx 4{,}8$. En la recta, $4{,}76$ está más cerca de $4{,}8$ que de $4{,}7$.",
    },
    {
      id: "check-orden",
      type: "fill_in_blank",
      title: "Comparar decimales",
      question:
        "Ordena de menor a mayor (separados por comas, sin espacios): $0{,}12$, $0{,}099$, $0{,}1$.",
      correctAnswers: ["0,099,0,1,0,12", "0.099,0.1,0.12"],
      hint: "Escribe $0{,}1$ como $0{,}100$.",
      explanation: "$0{,}099 < 0{,}100 < 0{,}120$.",
    },
  ],
};
