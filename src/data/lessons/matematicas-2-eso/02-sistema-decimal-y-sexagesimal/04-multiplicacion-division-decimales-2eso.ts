import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_2_SUBTITLE } from "@/data/lessons/shared";

export const multiplicacionDivisionDecimales2esoLesson: InteractiveLesson = {
  slug: "multiplicacion-division-decimales-2eso",
  title: "4. Multiplicación y división",
  subtitle: TEMA_2ESO_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "producto",
      type: "slide",
      help: [
        {
          label: "Por qué se cuentan los decimales",
          message: "$3{,}52 = 352 : 100$ y $5{,}1 = 51 : 10$. El producto de los naturales queda dividido entre $100 \\cdot 10 = 1\\,000$: tres cifras decimales.",
        },
        {
          label: "Estima",
          message: "$3{,}5 \\cdot 5 \\approx 17$. El resultado debe quedar cerca de $18$.",
        },
      ],
      title: "Multiplicar decimales",
      blocks: [
        {
          kind: "steps",
          items: [
            "Multiplica como si fueran **naturales**, sin tener en cuenta la coma.",
            "En el resultado, cuenta **desde la derecha** tantos lugares como cifras decimales tengan **los dos factores juntos**, y coloca ahí la coma.",
          ],
        },
        {
          kind: "example",
          lines: [
            { math: "3{,}52 \\cdot 5{,}1", note: "$2 + 1 = 3$ cifras decimales" },
            { math: "352 \\cdot 51 = 17\\,952 \\ \\to\\  17{,}952" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "decimal-producto", params: { terms: ["3,52", "5,1"], places: 3 } },
    },
    {
      id: "producto-ceros",
      type: "slide",
      help: [
        {
          label: "Por qué se puede",
          message: "$3{,}52 \\cdot 500 = 3{,}52 \\cdot 5 \\cdot 100$. Multiplicar por $100$ mueve la coma dos lugares: $352 \\cdot 5$.",
        },
        {
          label: "Con menos ceros",
          message: "Con $50$ quitas un cero y mueves la coma un lugar: $35{,}2 \\cdot 5$.",
        },
      ],
      title: "Por un natural acabado en ceros",
      blocks: [
        {
          kind: "rule",
          text: "Quita los ceros del natural y **mueve la coma a la derecha** tantos lugares como ceros hayas quitado. Después multiplica.",
        },
        {
          kind: "example",
          lines: [
            { math: "3{,}52 \\cdot 500 = 352 \\cdot 5 = 1\\,760" },
            { math: "3{,}52 \\cdot 50 = 35{,}2 \\cdot 5 = 176" },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          titles: ["Por 500", "Por 50"],
          expr: [
            { tokens: ["3,52", "·", "500"], note: "$500 = 5 \\cdot 100$: quitamos los dos ceros." },
            { tokens: ["352", "·", "5"], active: [0, 2], fresh: [0, 0], note: "la coma se mueve dos lugares a la derecha." },
            { tokens: ["1760"], fresh: [0, 0], note: "$352 \\cdot 5 = 1\\,760$." },
          ],
          expr2: [
            { tokens: ["3,52", "·", "50"], note: "$50 = 5 \\cdot 10$: quitamos un cero." },
            { tokens: ["35,2", "·", "5"], active: [0, 2], fresh: [0, 0], note: "la coma se mueve un lugar a la derecha." },
            { tokens: ["176"], fresh: [0, 0], note: "$35{,}2 \\cdot 5 = 176$." },
          ],
        },
      },
    },
    {
      id: "check-producto",
      type: "fill_in_blank",
      help: [
        {
          label: "Sin coma",
          message: "$25 \\cdot 12 = 300$. Ahora cuenta las cifras decimales de los dos factores.",
        },
      ],
      title: "Colocar la coma",
      question: "Calcula $2{,}5 \\cdot 1{,}2$ (escribe el resultado con coma)",
      correctAnswers: ["3", "3,0", "3,00", "3.0"],
      hint: "$25 \\cdot 12 = 300$ y hay dos cifras decimales en total.",
      explanation: "$25 \\cdot 12 = 300$; con dos decimales, $3{,}00 = 3$.",
    },
    {
      id: "division-natural",
      type: "slide",
      help: [
        {
          label: "Resto menor que el divisor",
          message: "En cualquier división el resto es menor que el divisor. Si no es $0$, la división no es exacta.",
        },
        {
          label: "Seguir con decimales",
          message: "Si hay resto, puedes poner una coma en el cociente y seguir bajando ceros.",
        },
      ],
      title: "Dividir naturales",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "División exacta",
            text: "El resto es $0$.",
            math: ["246 : 6 = 41"],
            tone: "ok",
          },
          right: {
            title: "No exacta",
            text: "El resto es distinto de $0$ y menor que el divisor.",
            math: ["162 : 5 = 32 \\ \\text{(resto } 2)"],
            tone: "info",
          },
        },
        {
          kind: "text",
          text: "Con resto, se puede **seguir dividiendo**: se pone una coma en el cociente y se baja un $0$ al resto.",
        },
      ],
      visual: { kind: "anim", scene: "division-decimal", params: { terms: ["162", "5"], places: 1 } },
    },
    {
      id: "division-caso-1",
      type: "slide",
      help: [
        {
          label: "Cuándo pongo la coma",
          message: "Justo al bajar la primera cifra decimal del dividendo, y no antes.",
        },
      ],
      title: "Caso 1: dividendo decimal y divisor natural",
      blocks: [
        {
          kind: "rule",
          text: "Se divide como si fuera una división normal, pero **al bajar la primera cifra decimal** se pone la coma en el cociente.",
        },
        {
          kind: "example",
          lines: [{ math: "8{,}5 : 5 = 1{,}7" }],
        },
      ],
      visual: { kind: "anim", scene: "division-decimal", params: { terms: ["8,5", "5"], places: 1 } },
    },
    {
      id: "division-caso-2",
      type: "slide",
      help: [
        {
          label: "Por qué no cambia el cociente",
          message: "Multiplicar dividendo y divisor por el mismo número no cambia el cociente: $1{,}28 : 0{,}2 = 12{,}8 : 2$.",
        },
      ],
      title: "Caso 2: dividendo y divisor decimales",
      blocks: [
        {
          kind: "rule",
          text: "Se **suprime la coma del divisor** y se desplaza la del dividendo **tantos lugares a la derecha** como cifras decimales tenga el divisor. Si hace falta, se añaden ceros.",
        },
        {
          kind: "example",
          lines: [
            { math: "1{,}28 : 0{,}2 = 12{,}8 : 2 = 6{,}4" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "division-coma-divisor", params: { terms: ["1,28", "0,2"] } },
    },
    {
      id: "division-caso-3",
      type: "slide",
      help: [
        {
          label: "Los ceros",
          message: "Quitar la coma de $1{,}5$ equivale a multiplicar por $10$; para que el cociente no cambie, el dividendo también se multiplica por $10$: $45 \\to 450$.",
        },
      ],
      title: "Caso 3: dividendo natural y divisor decimal",
      blocks: [
        {
          kind: "rule",
          text: "Se suprime la coma del divisor y se **añaden al dividendo tantos ceros** como cifras decimales tenga el divisor.",
        },
        {
          kind: "example",
          lines: [{ math: "45 : 1{,}5 = 450 : 15 = 30" }],
        },
      ],
      visual: { kind: "anim", scene: "division-coma-divisor", params: { terms: ["45", "1,5"] } },
    },
    {
      id: "check-division",
      type: "fill_in_blank",
      help: [
        {
          label: "Pasa el divisor a natural",
          message: "$0{,}5$ tiene una cifra decimal: multiplica dividendo y divisor por $10$.",
        },
      ],
      title: "Divisor decimal",
      question: "Calcula $7{,}5 : 0{,}5$ (solo el número)",
      correctAnswers: ["15"],
      explanation: "$7{,}5 : 0{,}5 = 75 : 5 = 15$.",
    },
    {
      id: "check-problema",
      type: "predict",
      calculator: true,
      help: [
        {
          label: "¿Qué operación?",
          message: "Quieres saber cuántas veces cabe $0{,}75$ L en $12$ L: es una división.",
        },
        {
          label: "Estima",
          message: "Cuatro botellas de $0{,}75$ L son $3$ L. ¿Cuántos grupos de cuatro botellas hacen falta para llegar a $12$ L?",
        },
      ],
      title: "Botellas de aceite",
      question: "Se envasan $12$ L de aceite en botellas de $0{,}75$ L. ¿Cuántas botellas se llenan?",
      mode: "choice",
      choices: [
        { id: "9", label: "$9$", incorrectFeedback: "$9 \\cdot 0{,}75 = 6{,}75$ L: quedaría aceite sin envasar." },
        { id: "16", label: "$16$" },
        { id: "160", label: "$160$", incorrectFeedback: "La coma está mal colocada: $160 \\cdot 0{,}75 = 120$ L." },
        { id: "0.0625", label: "$0{,}0625$", incorrectFeedback: "Has dividido al revés: $0{,}75 : 12$." },
      ],
      correctChoiceId: "16",
      shuffleChoices: true,
      explanation: "$12 : 0{,}75 = 1\\,200 : 75 = 16$ botellas.",
    },
  ],
};
