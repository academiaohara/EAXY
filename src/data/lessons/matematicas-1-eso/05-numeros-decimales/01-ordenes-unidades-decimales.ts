import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_5_SUBTITLE } from "@/data/lessons/shared";

export const ordenesUnidadesDecimalesLesson: InteractiveLesson = {
  slug: "ordenes-unidades-decimales",
  title: "1. Los órdenes de unidades decimales",
  subtitle: TEMA_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "subdivision",
      type: "slide",
      title: "Décimas, centésimas, milésimas: dividir en diez, y otra vez en diez",
      blocks: [
        {
          kind: "story",
          text: "Una báscula de cocina marca **2,375 kg**. Dos kilos y «pico»: para nombrar ese pico hacen falta partes más pequeñas que la unidad.",
          src: "/lesson/decimales/bascula.png",
          alt: "Báscula de cocina con una pesa encima",
          side: "right",
        },
        {
          kind: "definition",
          text: "Una unidad dividida en diez partes iguales da **décimas**; cada décima dividida en diez, **centésimas**; cada centésima en diez, **milésimas**…",
        },
        {
          kind: "example",
          title: "Lo que ya usas",
          lines: [
            { math: "37{,}8\\,°\\mathrm{C}", note: "37 grados y 8 décimas" },
            { math: "2{,}54\\,€", note: "2 euros y 54 centésimas (los céntimos)" },
            { math: "2{,}375\\,\\mathrm{kg}", note: "2 kilos y 375 milésimas (los gramos)" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "decimal-zoom", params: { dec: "2,375" } },
    },
    {
      id: "lectura",
      type: "slide",
      title: "Leer un decimal: la última cifra da nombre a la parte decimal",
      blocks: [
        {
          kind: "steps",
          title: "Cómo se lee",
          items: [
            "Se nombra la **parte entera**, en unidades.",
            "Se lee la **parte decimal** como un número entero y se añade el orden de su **última cifra**.",
          ],
        },
        {
          kind: "example",
          lines: [
            { math: "0{,}5", note: "cinco décimas" },
            { math: "0{,}05", note: "cinco centésimas" },
            { math: "13{,}0574", note: "trece unidades y quinientas setenta y cuatro diezmilésimas" },
          ],
        },
        {
          kind: "warning",
          title: "Ceros",
          text: "Los ceros a la **derecha** de la última cifra no cambian el valor: $2{,}5 = 2{,}50 = 2{,}500$. Los que hay **entre la coma y otra cifra** sí: $0{,}05 \\neq 0{,}5$.",
        },
      ],
      visual: { kind: "anim", scene: "tabla-decimal", params: { dec: "13,0574" } },
    },
    {
      id: "check-escribir",
      type: "predict",
      title: "De palabras a cifras",
      question:
        "Una balanza digital indica «dos unidades y trece milésimas» de kilo. ¿Qué número aparece en la pantalla?",
      mode: "choice",
      choices: [
        { id: "a", label: "$2{,}013$" },
        {
          id: "b",
          label: "$2{,}13$",
          incorrectFeedback:
            "$0{,}13$ son trece **centésimas**. Las milésimas ocupan el **tercer** lugar tras la coma, así que hace falta un cero antes del $13$.",
        },
        {
          id: "c",
          label: "$2{,}0013$",
          incorrectFeedback: "Aquí el $13$ acaba en el cuarto lugar: serían trece **diezmilésimas**.",
        },
        {
          id: "d",
          label: "$2{,}130$",
          incorrectFeedback:
            "Es lo mismo que $2{,}13$ (el cero final no cambia nada): ciento treinta milésimas, no trece.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "La última cifra debe quedar en las milésimas (tercer lugar), así que $13$ se escribe como $013$: $2{,}013$.",
    },
    {
      id: "comparar",
      type: "slide",
      title: "Comparar decimales: primero la parte entera, luego cifra a cifra",
      blocks: [
        {
          kind: "steps",
          items: [
            "Se compara la **parte entera**: si son distintas, decide ella.",
            "Si coinciden, se **igualan** las cifras decimales con ceros a la derecha.",
            "Se comparan las cifras decimales de izquierda a derecha: decide la **primera distinta**.",
          ],
        },
        {
          kind: "example",
          lines: [
            { math: "2{,}895 < 3{,}1", note: "decide la parte entera: $2 < 3$" },
            { math: "0{,}12 > 0{,}099", note: "$0{,}120$ frente a $0{,}099$: 120 milésimas son más que 99" },
          ],
        },
        {
          kind: "warning",
          text: "Más cifras no significa más valor: $5{,}4 > 5{,}04$, aunque $5{,}04$ se escriba más largo.",
        },
      ],
      visual: { kind: "anim", scene: "comparar-decimales", params: { terms: ["5,04", "5,4"] } },
    },
    {
      id: "check-comparar",
      type: "predict",
      title: "Quién llega antes",
      question:
        "En una final de 100 m, dos corredores marcan 9,85 s y 9,9 s. ¿Quién ha llegado antes a la meta?",
      mode: "choice",
      choices: [
        { id: "a", label: "El de $9{,}85$ s, porque $9{,}85 < 9{,}90$" },
        {
          id: "b",
          label: "El de $9{,}9$ s, porque $9{,}85$ tiene más cifras y por tanto es mayor",
          incorrectFeedback:
            "Tener más cifras no hace mayor a un decimal: $9{,}9 = 9{,}90$ y $9{,}90 > 9{,}85$. Además, llega antes el que **menos tiempo** tarda.",
        },
        {
          id: "c",
          label: "Llegan a la vez: los dos han hecho «9 segundos y pico»",
          incorrectFeedback:
            "Importan también las décimas y las centésimas: $9{,}85$ s y $9{,}90$ s son tiempos distintos.",
        },
        {
          id: "d",
          label: "No se puede saber, porque no tienen el mismo número de cifras decimales",
          incorrectFeedback:
            "Sí se puede: se igualan las cifras con un cero ($9{,}9 = 9{,}90$) y se comparan.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "Igualando cifras: $9{,}85$ frente a $9{,}90$. Es menor $9{,}85$, y en una carrera gana el menor tiempo.",
    },
    {
      id: "entre-dos",
      type: "slide",
      title: "Entre dos decimales siempre hay otro",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Naturales",
            text: "Entre $5$ y $6$ no hay ningún natural.",
            tone: "info",
          },
          right: {
            title: "Decimales",
            text: "Entre $5{,}2$ y $5{,}3$ hay otros: $5{,}21$, $5{,}22$, $5{,}23$…",
            math: ["5{,}2 < 5{,}23 < 5{,}3"],
            tone: "key",
          },
        },
        {
          kind: "rule",
          text: "Entre dos decimales cualesquiera siempre se pueden encontrar otros: basta dividir el tramo en diez partes más pequeñas. El proceso **no se agota**.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "decimal-zoom",
        params: { dec: "5,23" },
        captions: [
          "En la recta entre $5$ y $6$, las marcas $5{,}2$ y $5{,}3$ son **consecutivas**. ¿Queda algo entre ellas?",
          "Marcamos $5{,}2$.",
          "El tramo entre $5{,}2$ y $5{,}3$ se puede **volver a dividir en diez** partes: las centésimas.",
          "$5{,}23$ cae entre $5{,}2$ y $5{,}3$. Y se podría repetir con milésimas, sin fin.",
        ],
      },
    },
    {
      id: "check-entre",
      type: "predict",
      title: "Entre dos marcas",
      question:
        "Una regla graduada en décimas tiene dos marcas consecutivas en 3,4 cm y 3,5 cm. ¿Cuál de estos números queda entre ellas?",
      mode: "choice",
      choices: [
        { id: "a", label: "$3{,}45$" },
        {
          id: "b",
          label: "$3{,}5$",
          incorrectFeedback: "Es uno de los extremos, no un valor intermedio.",
        },
        {
          id: "c",
          label: "$3{,}39$",
          incorrectFeedback: "$3{,}39 < 3{,}40$: queda **antes** de la primera marca.",
        },
        {
          id: "d",
          label: "$3{,}05$",
          incorrectFeedback:
            "Igualando cifras es $3{,}05$ frente a $3{,}40$: las décimas ($0$ frente a $4$) lo dejan muy por debajo de $3{,}4$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$3{,}40 < 3{,}45 < 3{,}50$: $3{,}45$ está a media décima de cada marca, justo entre las dos.",
    },
    {
      id: "redondeo",
      type: "slide",
      title: "Aproximar por redondeo: el extremo más cercano",
      blocks: [
        {
          kind: "story",
          text: "Siete amigos se reparten **30 €**. La calculadora da $4{,}2857142\\ldots$ y nadie paga con tantas cifras: hay que **aproximar**.",
        },
        {
          kind: "rule",
          title: "Aproximar a un orden",
          text: "Se suprimen las cifras a la derecha de ese orden. Si la **primera cifra suprimida es 5 o más**, la última cifra que se conserva **sube una unidad**; si no, se queda igual.",
        },
        {
          kind: "warning",
          text: "Se redondea siempre **desde el número original**, no en cadena: $4{,}449$ a las décimas es $4{,}4$, no $4{,}5$ (que saldría pasando por $4{,}45$). En dinero se redondea a centésimas: $7{,}586\\,€ \\approx 7{,}59\\,€$.",
        },
      ],
      visual: { kind: "anim", scene: "redondeo-decimal", params: { dec: "4,2857" } },
    },
    {
      id: "check-redondeo",
      type: "predict",
      title: "El recibo del taxi",
      question:
        "El taxímetro marca 12,745 €. El recibo se redondea a céntimos (centésimas). ¿Qué importe se imprime?",
      mode: "choice",
      choices: [
        { id: "a", label: "$12{,}75\\,€$" },
        {
          id: "b",
          label: "$12{,}74\\,€$",
          incorrectFeedback:
            "Has cortado sin redondear. La primera cifra suprimida es $5$, y con $5$ o más la anterior sube una unidad.",
        },
        {
          id: "c",
          label: "$12{,}7\\,€$",
          incorrectFeedback:
            "Eso es aproximar a las décimas. A céntimos hay que conservar **dos** cifras decimales.",
        },
        {
          id: "d",
          label: "$13\\,€$",
          incorrectFeedback: "Eso es aproximar a las unidades; se pedían los céntimos.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$12{,}74|5$: la primera cifra suprimida es $5 \\geq 5$, así que la última centésima pasa de $4$ a $5$: $12{,}75\\,€$.",
    },
    {
      id: "check-cadena",
      type: "predict",
      title: "Redondear por partes",
      question:
        "Un laboratorio mide 4,449 g y debe anotarlo con una sola cifra decimal. Un ayudante redondea por partes: 4,449 → 4,45 → 4,5. ¿Cuál es el valor correcto?",
      mode: "choice",
      choices: [
        { id: "a", label: "$4{,}4$ g" },
        {
          id: "b",
          label: "$4{,}5$ g",
          incorrectFeedback:
            "Es el resultado de la cadena de redondeos: el segundo paso parte de $4{,}45$, que ya es un número **redondeado**, no la medida real.",
        },
        {
          id: "c",
          label: "$4{,}45$ g",
          incorrectFeedback: "Tiene dos cifras decimales; el laboratorio pide una sola.",
        },
        {
          id: "d",
          label: "$5$ g",
          incorrectFeedback: "Eso es aproximar a las unidades, y se pedían las décimas.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "Se mira solo la primera cifra que se suprime del número original: $4{,}4|49$ → es $4 < 5$, la décima no sube: $4{,}4$ g.",
    },
  ],
};
