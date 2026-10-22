import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_2_SUBTITLE } from "@/data/lessons/shared";

export const notacionCientifica4esoLesson: InteractiveLesson = {
  slug: "notacion-cientifica-4eso",
  title: "6. Notación científica",
  subtitle: TEMA_4ESO_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "para-que",
      type: "slide",
      help: [
        {
          label: "Contar ceros",
          message: "Comparar $A = 63\\,400\\,000\\,000$ con $B = 9\\,280\\,000\\,000$ exige contar cifras y ceros. Con potencias de $10$, basta comparar exponentes.",
        },
        {
          label: "Qué es la mantisa",
          message: "El factor decimal (entre $1$ y $10$) se llama a veces **mantisa**; el exponente da el orden de magnitud.",
        },
      ],
      title: "Escribir lo muy grande y lo muy pequeño",
      blocks: [
        {
          kind: "text",
          text: "Para comparar números con muchísimas cifras, contar ceros es lento y propenso a errores. La **notación científica** lo resuelve con una potencia de $10$.",
        },
        {
          kind: "definition",
          text: "Un número en **notación científica** es $\;a \\cdot 10^{n}\;$ con $1 \\le a < 10$ y $n$ un **entero**.",
        },
        {
          kind: "facts",
          items: [
            { tex: "A = 6{,}34 \\cdot 10^{10}" },
            { tex: "B = 9{,}28 \\cdot 10^{9}" },
            { tex: "M = 9{,}8 \\cdot 10^{-11}" },
          ],
        },
        {
          kind: "text",
          text: "Ahora se ve que $A > B$: tiene un exponente mayor. Y el exponente **negativo** indica que el número es **pequeño**.",
        },
      ],
      visual: { kind: "anim", scene: "notacion-cientifica", params: { dec: "63400000000" } },
    },
    {
      id: "explora-notacion",
      type: "slide",
      help: [
        {
          label: "El exponente cuenta lugares",
          message: "Un exponente $n > 0$ mueve la coma $n$ lugares a la derecha; con $n < 0$, la mueve $|n|$ lugares a la izquierda.",
        },
      ],
      title: "Explora: mantisa y exponente",
      blocks: [
        {
          kind: "text",
          text: "Mueve la **mantisa** (entre $1$ y $10$) y el **exponente**. Fíjate en cuántas cifras tiene el número y dónde queda en la escala de potencias de $10$.",
        },
        {
          kind: "rule",
          text: "El exponente indica **cuántas cifras tiene el número** menos una (para los grandes) o cuántos ceros lo preceden (para los pequeños).",
        },
      ],
      visual: { kind: "tool", tool: "notacion-explorador", params: { a: 634, b: 10 }, hint: "Con el exponente en −11, ¿cuántos ceros hay tras la coma? ¿Y en −3?" },
    },
    {
      id: "check-expandir",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Mueve la coma",
          message: "$2{,}63 \\cdot 10^8$: la coma salta $8$ lugares a la derecha. $2{,}63$ solo tiene dos decimales: se completan con ceros.",
        },
      ],
      title: "Con todas las cifras",
      question: "Escribe $2{,}63 \\cdot 10^{8}$ con todas sus cifras (sin espacios).",
      correctAnswers: ["263000000"],
      explanation: "La coma salta $8$ lugares: $2{,}63 \\to 263\\,000\\,000$.",
    },
    {
      id: "check-pequeno",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Cuenta lugares",
          message: "$0{,}000000001586$: cuenta cuántos lugares hay que mover la coma hasta dejarla tras el primer dígito distinto de cero ($1$).",
        },
      ],
      title: "Un número pequeño",
      question: "Expresa $0{,}000000001586$ en notación científica con tres cifras significativas.",
      choices: [
        { id: "a", label: "$1{,}59 \\cdot 10^{-9}$" },
        { id: "b", label: "$1{,}59 \\cdot 10^{9}$", incorrectFeedback: "Es un número muy pequeño: el exponente es **negativo**." },
        { id: "c", label: "$1{,}586 \\cdot 10^{-9}$", incorrectFeedback: "Piden tres cifras significativas: $1{,}586$ tiene cuatro. Redondea a $1{,}59$." },
        { id: "d", label: "$15{,}9 \\cdot 10^{-10}$", incorrectFeedback: "La mantisa debe estar entre $1$ y $10$: $15{,}9$ no vale." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "La coma salta $9$ lugares a la derecha: $1{,}586 \\cdot 10^{-9}$. A tres cifras significativas: $1{,}59 \\cdot 10^{-9}$.",
    },
    {
      id: "comparar",
      type: "slide",
      help: [
        {
          label: "Primero el exponente",
          message: "Con mantisas entre $1$ y $10$, el número con mayor exponente es el mayor. Solo si los exponentes coinciden hay que mirar la mantisa.",
        },
      ],
      title: "Comparar: primero el exponente",
      blocks: [
        {
          kind: "rule",
          text: "Con la mantisa entre $1$ y $10$: **mayor exponente → mayor número**. Si el exponente coincide, gana la mayor mantisa.",
        },
        {
          kind: "example",
          lines: [
            { math: "6{,}34 \\cdot 10^{10} > 9{,}28 \\cdot 10^{9}", note: "10 > 9" },
            { math: "3{,}1 \\cdot 10^{-5} > 8{,}9 \\cdot 10^{-6}", note: "−5 > −6" },
          ],
        },
        {
          kind: "warning",
          text: "Con exponentes **negativos**, $-5 > -6$: cuanto más cerca del $0$ el exponente, más grande el número.",
        },
      ],
      visual: { kind: "anim", scene: "escala-longitudes" },
    },
    {
      id: "check-comparar",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Mira los exponentes",
          message: "$-9$ está a la izquierda de $-8$ en la recta de enteros, así que $10^{-9} < 10^{-8}$.",
        },
      ],
      title: "¿Cuál es mayor?",
      question: "¿Cuál de estos números es el mayor?",
      choices: [
        { id: "a", label: "$7{,}5 \\cdot 10^{-8}$" },
        { id: "b", label: "$9{,}9 \\cdot 10^{-9}$", incorrectFeedback: "$-9 < -8$: tiene un exponente menor, así que es más pequeño aunque su mantisa sea mayor." },
        { id: "c", label: "$1{,}2 \\cdot 10^{-10}$", incorrectFeedback: "$-10$ es el exponente menor de los tres: es el más pequeño." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Los exponentes mandan: $-8 > -9 > -10$.",
    },
    {
      id: "prefijos",
      type: "slide",
      help: [
        {
          label: "Prefijos",
          message: "Un prefijo es una potencia de $10$ abreviada: $1$ km $= 10^3$ m, $1$ mm $= 10^{-3}$ m.",
        },
        {
          label: "Para qué sirven",
          message: "Los prefijos del sistema métrico son las potencias de $10$ de múltiplo de $3$ con nombre: así se habla de megapíxeles o nanómetros.",
        },
      ],
      title: "Órdenes de magnitud y prefijos",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "\\text{giga} = 10^{9}" },
            { tex: "\\text{mega} = 10^{6}" },
            { tex: "\\text{kilo} = 10^{3}" },
            { tex: "\\text{mili} = 10^{-3}" },
            { tex: "\\text{micro} = 10^{-6}" },
            { tex: "\\text{nano} = 10^{-9}" },
          ],
        },
        {
          kind: "text",
          text: "El exponente da el **orden de magnitud**: cuántas cifras tiene un número grande o cuántos ceros precede a un número pequeño.",
        },
      ],
      visual: { kind: "tool", tool: "notacion-explorador", params: { a: 150, b: 3 }, hint: "Fija el exponente en 6 y en −6. ¿Qué prefijo marca la herramienta?" },
    },
    {
      id: "check-gramos",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "De kilos a gramos",
          message: "$1$ kg $= 10^3$ g. $9{,}10 \\cdot 10^{-31}$ kg $= 9{,}10 \\cdot 10^{-31} \\cdot 10^{3}$ g.",
        },
      ],
      title: "La masa de un electrón",
      question: "La masa de un electrón es $9{,}10 \\cdot 10^{-31}$ kg. Escrita en gramos queda $9{,}10 \\cdot 10^{n}$ g. ¿Cuánto vale $n$? (escribe el número con su signo)",
      correctAnswers: ["-28", "−28"],
      explanation: "$1$ kg $= 10^3$ g, así que $10^{-31} \\cdot 10^3 = 10^{-28}$: $9{,}10 \\cdot 10^{-28}$ g.",
    },
    {
      id: "check-tierra",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Un trillón",
          message: "Un trillón es $10^{18}$. Y una tonelada son $10^6$ g. Así $5\\,974$ trillones de toneladas $= 5{,}974 \\cdot 10^{3} \\cdot 10^{18} \\cdot 10^{6}$ g.",
        },
      ],
      title: "La masa de la Tierra",
      question: "La masa de la Tierra es de $5\\,974$ trillones de toneladas (un trillón es $10^{18}$). En gramos es $5{,}974 \\cdot 10^{n}$ g. ¿Cuánto vale $n$? (solo el número)",
      correctAnswers: ["27"],
      explanation: "$5\\,974 = 5{,}974 \\cdot 10^3$. Trillón: $10^{18}$. Tonelada a gramos: $10^6$. Total: $10^{3 + 18 + 6} = 10^{27}$.",
    },
  ],
};
