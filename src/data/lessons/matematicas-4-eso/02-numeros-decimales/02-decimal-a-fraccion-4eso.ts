import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_2_SUBTITLE } from "@/data/lessons/shared";

export const decimalAFraccion4esoLesson: InteractiveLesson = {
  slug: "decimal-a-fraccion-4eso",
  title: "2. De decimal a fracción: exactos y periódicos puros",
  subtitle: TEMA_4ESO_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "exactos",
      type: "slide",
      help: [
        {
          label: "Leer el decimal",
          message: "$0{,}008$ se lee «ocho milésimas»: $\\frac{8}{1\\,000}$. El denominador es $1$ seguido de tantos ceros como cifras decimales.",
        },
        {
          label: "Simplificar",
          message: "Después de escribir la fracción, simplifícala hasta que sea irreducible.",
        },
      ],
      title: "Decimales exactos: basta leerlos",
      blocks: [
        {
          kind: "rule",
          title: "Decimal exacto → fracción",
          text: "El numerador son **todas las cifras sin la coma** y el denominador es $1$ seguido de **tantos ceros como cifras decimales**. Después, se simplifica.",
        },
        {
          kind: "example",
          lines: [
            { math: "1{,}4 = \\dfrac{14}{10} = \\dfrac{7}{5}" },
            { math: "7{,}395 = \\dfrac{7\\,395}{1\\,000} = \\dfrac{1\\,479}{200}" },
            { math: "0{,}008 = \\dfrac{8}{1\\,000} = \\dfrac{1}{125}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "tabla-decimal", params: { dec: "7,395" } },
    },
    {
      id: "check-exacto",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Tres decimales",
          message: "$0{,}036 = \\frac{36}{1\\,000}$. Simplifica entre $4$.",
        },
      ],
      title: "Un decimal exacto",
      question: "Escribe $0{,}036$ como fracción irreducible.",
      correctAnswers: ["9/250"],
      explanation: "$0{,}036 = \\frac{36}{1\\,000} = \\frac{9}{250}$.",
    },
    {
      id: "periodico-puro",
      type: "slide",
      help: [
        {
          label: "Por qué se multiplica por 100",
          message: "El periodo tiene $2$ cifras, así que multiplicamos por $10^2 = 100$: la coma salta un periodo completo, y la cola decimal queda idéntica a la de $N$.",
        },
        {
          label: "Qué se consigue",
          message: "Al restar dos números con **la misma cola decimal infinita**, esa cola desaparece y queda un número entero: ya se puede despejar $N$.",
        },
      ],
      title: "Periódicos puros: restar para cancelar la cola",
      blocks: [
        {
          kind: "text",
          text: "Un periódico tiene **infinitas cifras**, así que no se puede leer. El truco: multiplicar por una potencia de $10$ para que la **cola decimal sea idéntica** y restar; la cola se cancela.",
        },
        {
          kind: "steps",
          title: "Método (periodo de $p$ cifras)",
          items: [
            "Escribe $N$ con su desarrollo.",
            "Multiplica por $10^p$: la coma salta **un periodo**.",
            "Resta: $10^p N - N$. Desaparece la cola.",
            "Despeja $N$ y simplifica.",
          ],
        },
      ],
      visual: { kind: "anim", scene: "generatriz-periodico", params: { dec: "3", per: "84" } },
    },
    {
      id: "explora-puros",
      type: "slide",
      help: [
        {
          label: "Con periodo 9",
          message: "$0{,}\\overline{9} = \\frac{9}{9} = 1$. Sí, son el mismo número: $0{,}999\\ldots$ y $1$ coinciden.",
        },
      ],
      title: "Explora: periodos y fracciones",
      blocks: [
        {
          kind: "text",
          text: "Fija las cifras sin repetir en $0$ y cambia el periodo. Con una cifra, el denominador es $9$; con dos, $99$; con tres, $999$.",
        },
        {
          kind: "rule",
          title: "Atajo para puros",
          text: "Un periódico puro sin parte entera se escribe como **periodo sobre tantos nueves como cifras tiene el periodo**: $0{,}\\overline{27} = \\frac{27}{99} = \\frac{3}{11}$.",
        },
      ],
      visual: { kind: "tool", tool: "generatriz-explorador", params: { a: 0, c: 27 }, initial: [0, 2], hint: "Prueba el periodo 9. ¿Qué fracción sale? ¿Y con 99 y 999?" },
    },
    {
      id: "check-puro-1",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Un solo dígito",
          message: "$N = 5{,}888\\ldots$ y $10N = 58{,}888\\ldots$. Resta: $9N = 58 - 5 = 53$.",
        },
      ],
      title: "Periódico de una cifra",
      question: "Halla la fracción generatriz de $5{,}\\overline{8}$.",
      correctAnswers: ["53/9"],
      explanation: "$10N - N = 58{,}\\overline{8} - 5{,}\\overline{8} = 53$, luego $9N = 53$ y $N = \\frac{53}{9}$.",
    },
    {
      id: "check-puro-2",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Dos cifras",
          message: "Multiplica por $100$: $100N = 678{,}\\overline{78}$. Resta $N = 6{,}\\overline{78}$: $99N = 672$.",
        },
      ],
      title: "Periodo de dos cifras",
      question: "Halla la fracción generatriz de $6{,}\\overline{78}$ y simplifícala.",
      correctAnswers: ["224/33"],
      explanation: "$99N = 678 - 6 = 672$, $N = \\frac{672}{99} = \\frac{224}{33}$.",
    },
    {
      id: "check-error",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Cuántos nueves",
          message: "El denominador tiene tantos nueves como cifras tiene el **periodo** (no como cifras tiene el número).",
        },
      ],
      title: "¿Qué denominador sale?",
      question: "Para $2{,}\\overline{5}$, un alumno multiplica por $10$ y resta, y para $0{,}\\overline{123}$ multiplica por $1000$ y resta. ¿Qué denominadores obtienen, antes de simplificar?",
      choices: [
        { id: "a", label: "$9$ y $999$" },
        { id: "b", label: "$10$ y $1\\,000$", incorrectFeedback: "$10N - N = 9N$ y $1000N - N = 999N$: el denominador es esa resta, no la potencia de 10." },
        { id: "c", label: "$9$ y $99$", incorrectFeedback: "El periodo $123$ tiene tres cifras: tres nueves." },
        { id: "d", label: "$1$ y $1$", incorrectFeedback: "Al restar $N$ queda $9N$ y $999N$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$10N - N = 9N$ y $1\\,000N - N = 999N$: nueves según las cifras del periodo.",
    },
  ],
};
