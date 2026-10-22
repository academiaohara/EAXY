import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_3_SUBTITLE } from "@/data/lessons/shared";

export const numerosIrracionales4esoLesson: InteractiveLesson = {
  slug: "numeros-irracionales-4eso",
  title: "1. Números irracionales",
  subtitle: TEMA_4ESO_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [
        {
          label: "Racional o no",
          message: "Racional: se puede escribir como $\\frac{a}{b}$ con $a, b$ enteros ($b \\neq 0$); su decimal acaba o se repite. Irracional: no se puede, y su decimal es infinito **sin periodo**.",
        },
        {
          label: "No es lo mismo que «infinitas cifras»",
          message: "$\\frac{1}{3} = 0{,}333\\ldots$ tiene infinitas cifras y es racional. Lo que define al irracional es que **no hay un bloque que se repita**.",
        },
      ],
      title: "Los que no son cociente de enteros",
      blocks: [
        {
          kind: "compare",
          left: { title: "Racionales", text: "Cociente de dos enteros. Decimal **exacto o periódico**.", tone: "ok" },
          right: { title: "Irracionales", text: "No se pueden escribir como cociente de enteros. Decimal **infinito no periódico**: $\\pi = 3{,}14159265359\\ldots$", tone: "warn" },
        },
        {
          kind: "text",
          text: "Hay **infinitos** irracionales. Veamos cómo se atrapa uno de ellos, $\\sqrt{2}$, entre decimales cada vez más cercanos: nunca llegamos a un valor exacto.",
        },
      ],
      visual: { kind: "anim", scene: "aproximacion-raiz", params: { a: 2 } },
    },
    {
      id: "diagonal",
      type: "slide",
      help: [
        {
          label: "Por Pitágoras",
          message: "La diagonal $d$ y los dos lados de longitud $1$ forman un triángulo rectángulo: $d^2 = 1^2 + 1^2 = 2$, luego $d = \\sqrt{2}$.",
        },
        {
          label: "Cuándo es irracional",
          message: "$\\sqrt[n]{p}$ es irracional si $p$ **no es una potencia $n$-ésima exacta**. $\\sqrt{9} = 3$ es racional; $\\sqrt{10}$ es irracional.",
        },
      ],
      title: "La diagonal del cuadrado: √2",
      blocks: [
        {
          kind: "text",
          text: "La diagonal de un cuadrado de lado $1$ mide $d = \\sqrt{1^2 + 1^2} = \\sqrt{2}$. Es el ejemplo clásico de **irracional**.",
        },
        {
          kind: "rule",
          title: "Cuándo una raíz es irracional",
          text: "$\\sqrt[n]{p}$ es **irracional** si $p$ **no es una potencia $n$-ésima** exacta; si lo es, el resultado es un entero.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\sqrt{3},\\ \\sqrt{5},\\ \\sqrt{8},\\ \\sqrt[3]{4},\\ \\sqrt[5]{10} \\quad \\text{irracionales}" },
            { math: "\\sqrt{49} = 7,\\ \\sqrt[3]{27} = 3 \\quad \\text{racionales}" },
          ],
        },
      ],
      visual: { kind: "tool", tool: "raiz-aprox-explorador", params: { a: 7, b: 3 }, hint: "Cambia el radicando: ¿para cuáles sale una raíz exacta? Entre 2 y 50 solo hay unos pocos." },
    },
    {
      id: "check-cuadrados",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Potencias exactas",
          message: "Mira si el radicando es una potencia exacta del índice: $27 = 3^3$, $12$ no es el cubo de ningún entero, $50$ no es un cuadrado, $10$ no es una cuarta potencia.",
        },
      ],
      title: "¿Cuál es racional?",
      question: "Una de estas raíces es un número **racional**. ¿Cuál?",
      choices: [
        { id: "a", label: "$\\sqrt[3]{27}$" },
        { id: "b", label: "$\\sqrt{12}$", incorrectFeedback: "$12$ no es un cuadrado perfecto ($3^2 = 9$ y $4^2 = 16$): $\\sqrt{12}$ es irracional." },
        { id: "c", label: "$\\sqrt{50}$", incorrectFeedback: "$50$ está entre $7^2 = 49$ y $8^2 = 64$, no es cuadrado perfecto: irracional." },
        { id: "d", label: "$\\sqrt[4]{10}$", incorrectFeedback: "$10$ no es la cuarta potencia de ningún entero: es irracional." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$27 = 3^3$, así que $\\sqrt[3]{27} = 3$, un entero y por tanto racional.",
    },
    {
      id: "oro",
      type: "slide",
      help: [
        {
          label: "Un irracional con historia",
          message: "Los pitagóricos descubrieron que la diagonal de un pentágono y su lado no guardan una proporción entre enteros. Lo llamaron *irracional*: «contrario a la razón».",
        },
        {
          label: "El nombre",
          message: "$\\Phi$ (fi) es la inicial de Fidias, el escultor griego que usó esa proporción de forma habitual.",
        },
      ],
      title: "El número áureo",
      blocks: [
        {
          kind: "rule",
          title: "El número de oro",
          formula: "\\Phi = \\dfrac{\\sqrt{5} + 1}{2} = 1{,}6180339\\ldots",
        },
        {
          kind: "text",
          text: "Es la razón entre la diagonal de un pentágono regular y su lado. Fue **el primer número del que se tuvo conciencia de su irracionalidad** (siglo V a. C.). Los griegos lo llamaron razón *áurea*.",
        },
      ],
      visual: { kind: "anim", scene: "numero-oro-construccion" },
    },
    {
      id: "pi",
      type: "slide",
      help: [
        {
          label: "Aproximaciones",
          message: "$3{,}14$ y $3{,}1416$ son aproximaciones **racionales** de $\\pi$. Útiles, pero ninguna es $\\pi$.",
        },
        {
          label: "El nombre",
          message: "$\\pi$ es la letra griega «p», de *perifereia*, «circunferencia» (periferia).",
        },
      ],
      title: "El número π",
      blocks: [
        {
          kind: "definition",
          text: "$\\pi$ es la **razón entre la longitud de una circunferencia y su diámetro**: vale lo mismo en todas las circunferencias.",
        },
        {
          kind: "text",
          text: "$\\pi = 3{,}14159265359\\ldots$ tiene infinitas cifras decimales **no periódicas**. Las aproximaciones $3{,}14$ o $3{,}1416$ son racionales; $\\pi$ no lo es.",
        },
      ],
      visual: { kind: "anim", scene: "pi-circunferencia" },
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [
        {
          label: "Mira el tipo de decimal",
          message: "Decimal exacto o periódico → racional. Si tiene raíz no exacta o $\\pi$ → irracional. Multiplicar un irracional por un racional no nulo sigue dando un irracional.",
        },
      ],
      title: "Racionales o irracionales",
      question: "Clasifica cada número según se pueda escribir o no como cociente de dos enteros.",
      groups: [
        { id: "racional", label: "Racional", tone: "emerald" },
        { id: "irracional", label: "Irracional", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$-2$", group: "racional" },
        { id: "b", text: "$1{,}\\overline{7}$", group: "racional" },
        { id: "c", text: "$\\sqrt{3}$", group: "irracional" },
        { id: "d", text: "$4{,}\\overline{2}$", group: "racional" },
        { id: "e", text: "$-3{,}75$", group: "racional" },
        { id: "f", text: "$3\\pi$", group: "irracional" },
        { id: "g", text: "$-2\\sqrt{5}$", group: "irracional" },
      ],
      hint: "Un múltiplo no nulo de un irracional sigue siendo irracional.",
    },
  ],
};
