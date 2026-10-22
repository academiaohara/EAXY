import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_2_SUBTITLE } from "@/data/lessons/shared";

export const fraccionADecimal4esoLesson: InteractiveLesson = {
  slug: "fraccion-a-decimal-4eso",
  title: "1. De fracción a decimal: exactos y periódicos",
  subtitle: TEMA_4ESO_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "division-indicada",
      type: "slide",
      help: [
        {
          label: "Fracción = división",
          message: "$\\frac{13}{40}$ significa «13 dividido entre 40». Para pasar a decimal solo hay que hacer esa división.",
        },
        {
          label: "Ceros que se bajan",
          message: "Cuando el dividendo se acaba y queda resto, se añade un $0$ al resto y se sigue dividiendo: cada paso da una cifra decimal.",
        },
      ],
      title: "Una fracción es una división indicada",
      blocks: [
        {
          kind: "text",
          text: "Para pasar de fracción a decimal basta **dividir el numerador entre el denominador**. Según cómo acabe la división, hay tres casos.",
        },
        {
          kind: "facts",
          items: [
            { tex: "\\dfrac{13}{40} = 0{,}325" },
            { tex: "\\dfrac{41}{33} = 1{,}\\overline{24}" },
            { tex: "\\dfrac{32}{15} = 2{,}1\\overline{3}" },
          ],
        },
        {
          kind: "text",
          text: "**Exacto** (acaba), **periódico puro** (el periodo empieza tras la coma) y **periódico mixto** (hay cifras antes del periodo).",
        },
      ],
      visual: { kind: "anim", scene: "division-decimal", params: { terms: ["13", "40"], places: 3 } },
    },
    {
      id: "restos",
      type: "slide",
      help: [
        {
          label: "Por qué se repite",
          message: "Los restos de dividir entre $d$ son $0, 1, \\dots, d-1$: hay $d$ posibilidades. Tras como mucho $d$ pasos, un resto tiene que repetirse, y desde ahí las cifras se repiten también.",
        },
        {
          label: "El periodo",
          message: "El periodo son las cifras que se repiten. Se escribe con un arco encima: $1{,}\\overline{24} = 1{,}242424\\ldots$",
        },
      ],
      title: "Por qué siempre acaba o se repite",
      blocks: [
        {
          kind: "text",
          text: "En cada paso el resto es **menor que el divisor**. Solo hay $d$ restos posibles, así que, o llegamos a resto $0$, o **un resto se repite** y todo lo que sigue es una copia.",
        },
        {
          kind: "rule",
          text: "Toda fracción da un decimal **exacto** o **periódico**.",
        },
        {
          kind: "warning",
          text: "El periodo de una fracción de denominador $d$ tiene **como mucho $d - 1$ cifras**. Por ejemplo, $\\frac{3}{7} = 0{,}\\overline{428571}$ tiene $6$.",
        },
      ],
      visual: { kind: "anim", scene: "decimal-periodico-restos", params: { a: 41, b: 33 } },
    },
    {
      id: "mixto",
      type: "slide",
      help: [
        {
          label: "Dónde empieza el periodo",
          message: "Si el primer resto que se repite no es el de la parte entera, hay cifras iniciales que no forman parte del periodo.",
        },
      ],
      title: "Periódico mixto: cifras que no se repiten",
      blocks: [
        {
          kind: "text",
          text: "En $\\frac{32}{15}$ el resto $2$ sale pronto, pero la cadena vuelve a un resto **posterior**, no al primero. Las cifras antes del periodo son la parte **no periódica**.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{32}{15} = 2{,}1333\\ldots = 2{,}1\\overline{3}" },
            { math: "\\dfrac{59}{30} = 1{,}9666\\ldots = 1{,}9\\overline{6}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "decimal-periodico-restos", params: { a: 32, b: 15 } },
    },
    {
      id: "explora-decimal",
      type: "slide",
      help: [
        {
          label: "Regla de los factores",
          message: "Una fracción irreducible da decimal exacto si su denominador solo tiene los factores $2$ y $5$ (porque son los factores de $10$). Con cualquier otro factor, sale periódico.",
        },
      ],
      title: "Explora: ¿cuándo es exacto?",
      blocks: [
        {
          kind: "text",
          text: "Cambia numerador y denominador. Mira el tipo de decimal, la longitud del periodo y los **factores del denominador** de la fracción irreducible.",
        },
        {
          kind: "rule",
          title: "Cómo saber el tipo sin dividir",
          text: "Con la fracción **irreducible**: solo factores $2$ y $5$ en el denominador → **exacto**. Si tiene algún otro factor → **periódico**.",
        },
      ],
      visual: { kind: "tool", tool: "decimal-explorador", params: { n: 7, d: 12 }, hint: "Busca tres denominadores distintos que den decimal exacto. ¿Qué tienen en común?" },
    },
    {
      id: "check-tipo",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Factoriza el denominador",
          message: "$40 = 2^3 \\cdot 5$, $75 = 3 \\cdot 5^2$, $64 = 2^6$, $18 = 2 \\cdot 3^2$. Mira cuáles solo tienen $2$ y $5$ (después de simplificar).",
        },
      ],
      title: "¿Cuál es exacto?",
      question: "¿Cuál de estas fracciones da un decimal **exacto**, sin hacer la división?",
      choices: [
        { id: "a", label: "$\\dfrac{9}{40}$" },
        { id: "b", label: "$\\dfrac{4}{75}$", incorrectFeedback: "$75 = 3 \\cdot 5^2$ tiene un factor $3$ y la fracción no se simplifica: es periódica." },
        { id: "c", label: "$\\dfrac{5}{18}$", incorrectFeedback: "$18 = 2 \\cdot 3^2$: el factor $3$ la hace periódica." },
        { id: "d", label: "$\\dfrac{7}{30}$", incorrectFeedback: "$30 = 2 \\cdot 3 \\cdot 5$ tiene un $3$ y no se simplifica con el $7$: es periódica." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$40 = 2^3 \\cdot 5$ solo tiene factores $2$ y $5$: $\\frac{9}{40} = 0{,}225$.",
    },
    {
      id: "check-simplificada",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Simplifica primero",
          message: "$\\frac{27}{90} = \\frac{3}{10}$. Mira el denominador de la irreducible, no el de la fracción original.",
        },
      ],
      title: "Cuidado: simplifica antes",
      question: "La fracción $\\dfrac{27}{90}$ tiene un $3$ en el denominador ($90 = 2 \\cdot 3^2 \\cdot 5$). ¿Qué tipo de decimal da?",
      choices: [
        { id: "exacto", label: "Exacto" },
        { id: "puro", label: "Periódico puro", incorrectFeedback: "Antes hay que simplificar: $\\frac{27}{90} = \\frac{3}{10} = 0{,}3$." },
        { id: "mixto", label: "Periódico mixto", incorrectFeedback: "Antes hay que simplificar: $\\frac{27}{90} = \\frac{3}{10} = 0{,}3$." },
      ],
      correctChoiceId: "exacto",
      explanation: "$\\frac{27}{90} = \\frac{3}{10} = 0{,}3$: la irreducible solo tiene el factor $2$ y $5$ en el denominador, así que es exacta.",
    },
    {
      id: "check-periodo",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Divide",
          message: "$3 : 7 = 0{,}428571\\,428571\\ldots$ Cuenta las cifras que se repiten.",
        },
      ],
      title: "Longitud del periodo",
      question: "¿Cuántas cifras tiene el periodo de $\\dfrac{3}{7}$? (solo el número)",
      correctAnswers: ["6"],
      explanation: "$\\frac{3}{7} = 0{,}\\overline{428571}$: el periodo tiene $6$ cifras, el máximo posible, $7 - 1 = 6$.",
    },
    {
      id: "check-decimal",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Divide",
          message: "$313 : 500 = 0{,}626$ (el resto es $0$ al llegar a la milésima).",
        },
      ],
      title: "Una fracción exacta",
      question: "Pasa $\\dfrac{313}{500}$ a decimal. (escribe el número con coma)",
      correctAnswers: ["0,626", "0.626"],
      explanation: "$313 : 500 = 0{,}626$. Es exacto porque $500 = 2^2 \\cdot 5^3$.",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [
        {
          label: "Cómo clasificar",
          message: "Mira si hay cifras antes del periodo: $7{,}\\overline{81}$ es puro (el periodo empieza en la coma) y $1{,}9\\overline{6}$ es mixto ($9$ no se repite).",
        },
      ],
      title: "Clasifica los decimales",
      question: "Clasifica cada fracción según el decimal que da. Puedes usar la herramienta de arriba.",
      groups: [
        { id: "exacto", label: "Exacto", tone: "emerald" },
        { id: "puro", label: "Periódico puro", tone: "amber" },
        { id: "mixto", label: "Periódico mixto", tone: "violet" },
      ],
      items: [
        { id: "a", text: "$\\frac{313}{500} = 0{,}626$", group: "exacto" },
        { id: "b", text: "$\\frac{86}{11} = 7{,}\\overline{81}$", group: "puro" },
        { id: "c", text: "$\\frac{3}{7} = 0{,}\\overline{428571}$", group: "puro" },
        { id: "d", text: "$\\frac{59}{30} = 1{,}9\\overline{6}$", group: "mixto" },
        { id: "e", text: "$\\frac{1267}{300} = 4{,}22\\overline{3}$", group: "mixto" },
      ],
      hint: "Si la división acaba: exacto. Si se repiten cifras justo tras la coma: puro. Si hay cifras antes: mixto.",
    },
  ],
};
