import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_1_SUBTITLE } from "@/data/lessons/shared";

export const racionalesIrracionales1bachLesson: InteractiveLesson = {
  slug: "racionales-irracionales-1bach",
  title: "1. Racionales e irracionales",
  subtitle: TEMA_1BACH_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "conjuntos",
      type: "slide",
      help: [
        { label: "¿Por qué hacen falta tantos conjuntos?", message: "Cada conjunto resuelve ecuaciones que el anterior no podía: $x + 3 = 0$ pide los enteros, $2x = 1$ los racionales y $x^2 = 2$ los reales." },
      ],
      title: "De los naturales a los reales",
      blocks: [
        { kind: "rule", title: "Los conjuntos que ya conoces", formula: "\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}" },
        { kind: "definition", text: "Un número es **racional** si se escribe como $\\dfrac{a}{b}$ con $a, b \\in \\mathbb{Z}$ y $b \\neq 0$. Los que **no** se pueden escribir así son **irracionales** ($\\mathbb{I}$). Juntos forman los **reales**: $\\mathbb{R} = \\mathbb{Q} \\cup \\mathbb{I}$." },
        { kind: "text", text: "Ejemplos de irracionales: $\\sqrt{2}$, $\\sqrt{7}$, $\\pi$. Su expresión decimal tiene infinitas cifras **sin periodo**." },
      ],
      visual: { kind: "anim", scene: "conjuntos-numericos" },
    },
    {
      id: "exacto-periodico",
      type: "slide",
      help: [
        { label: "Fracción irreducible", message: "Hay que simplificar antes de mirar el denominador: $\\frac{6}{15} = \\frac{2}{5}$ tiene decimal exacto aunque $15 = 3 \\cdot 5$." },
      ],
      title: "¿Decimal exacto o periódico?",
      blocks: [
        { kind: "rule", title: "Se mira el denominador de la fracción irreducible", text: "Si solo tiene los factores primos $2$ y $5$, el decimal es **exacto**. Si aparece cualquier otro primo, es **periódico**." },
        { kind: "example", lines: [
          { math: "\\tfrac{3}{5},\\ \\tfrac{6}{25},\\ \\tfrac{7}{8}\\ (8 = 2^3)\\ \\to \\text{exactos}" },
          { math: "\\tfrac{2}{3},\\ \\tfrac{7}{30}\\ (30 = 2\\cdot 3\\cdot 5),\\ \\tfrac{9}{11}\\ \\to \\text{periódicos}" },
        ] },
        { kind: "text", text: "Toda fracción da un decimal exacto o periódico, y todo decimal exacto o periódico se puede escribir como fracción." },
      ],
      visual: { kind: "tool", tool: "racional-explorador", params: { n: 7, d: 30 }, hint: "Con denominador 8 o 20, ¿qué decimal sale? ¿Y con 3, 7 u 11?" },
    },
    {
      id: "check-exacta",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Descompón cada denominador en factores primos: solo vale si únicamente salen 2 y 5." }],
      title: "Decimal exacto",
      question: "Una de estas fracciones tiene una expresión decimal **exacta**. ¿Cuál?",
      choices: [
        { id: "a", label: "$\\dfrac{7}{8}$" },
        { id: "b", label: "$\\dfrac{2}{3}$", incorrectFeedback: "El denominador es $3$, que no es $2$ ni $5$: da $0{,}666\\ldots$ (periódico)." },
        { id: "c", label: "$\\dfrac{7}{30}$", incorrectFeedback: "$30 = 2\\cdot 3\\cdot 5$ contiene un $3$: es periódico ($0{,}2333\\ldots$)." },
        { id: "d", label: "$\\dfrac{9}{11}$", incorrectFeedback: "El $11$ es primo y distinto de $2$ y $5$: da $0{,}8181\\ldots$" },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$8 = 2^3$ solo tiene el factor $2$, así que $\\frac{7}{8} = 0{,}875$ es exacto.",
    },
    {
      id: "generatriz",
      type: "slide",
      help: [
        { label: "Ceros del denominador", message: "Tantos nueves como cifras tiene el periodo y, después, tantos ceros como cifras tiene la parte decimal que no se repite (el anteperiodo)." },
      ],
      title: "De decimal a fracción",
      blocks: [
        { kind: "steps", title: "Decimal exacto", items: [
          "Se quita la coma dividiendo entre una potencia de 10: $8{,}35 = \\dfrac{835}{100}$.",
          "Se simplifica: $\\dfrac{835}{100} = \\dfrac{167}{20}$.",
        ] },
        { kind: "rule", title: "Decimal periódico", text: "Numerador: el número entero hasta el final del primer periodo **menos** el que hay antes del periodo. Denominador: tantos $9$ como cifras del periodo, seguidos de tantos $0$ como cifras decimales sin repetir.", formula: "9{,}4646\\ldots = \\dfrac{946 - 9}{99} = \\dfrac{937}{99}" },
      ],
      visual: { kind: "anim", scene: "generatriz-periodico", params: { dec: "9", per: "46" } },
    },
    {
      id: "noventa-y-nueve",
      type: "slide",
      help: [
        { label: "¿No es solo «casi» 1?", message: "No: $0{,}999\\ldots$ no se acerca a $1$, **es** $1$. Dos números distintos tienen siempre otro número entre ambos (densidad), y entre $0{,}999\\ldots$ y $1$ no cabe ninguno." },
      ],
      title: "Una igualdad sorprendente: 0,999… = 1",
      blocks: [
        { kind: "steps", title: "Con la generatriz", items: [
          "Sea $x = 0{,}999\\ldots$ Entonces $10x = 9{,}999\\ldots$",
          "Se restan: $10x - x = 9{,}999\\ldots - 0{,}999\\ldots = 9$.",
          "Queda $9x = 9$, luego $x = 1$.",
        ] },
        { kind: "example", title: "Lo mismo con la regla", lines: [
          { math: "4{,}999\\ldots = 4 + \\tfrac{9}{9} = 5" },
          { math: "2{,}5999\\ldots = \\dfrac{259 - 25}{90} = \\dfrac{234}{90} = \\dfrac{13}{5} = 2{,}6" },
        ] },
        { kind: "warning", text: "Un periodo de $9$ nunca aparece al escribir un número «de forma normal»: siempre se redondea al decimal exacto siguiente." },
      ],
      arrange: "stack",
    },
    {
      id: "check-gen",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Periodo 6 (una cifra) y nada antes del periodo: el denominador es 9." }],
      title: "Generatriz de 0,666…",
      question: "¿Qué fracción irreducible es igual a $0{,}666\\ldots$?",
      choices: [
        { id: "a", label: "$\\dfrac{2}{3}$" },
        { id: "b", label: "$\\dfrac{6}{10}$", incorrectFeedback: "$\\frac{6}{10} = 0{,}6$ es exacto. El periodo hace que el denominador lleve nueves: $\\frac{6}{9}$." },
        { id: "c", label: "$\\dfrac{66}{100}$", incorrectFeedback: "$\\frac{66}{100} = 0{,}66$ termina; $0{,}666\\ldots$ no." },
        { id: "d", label: "$\\dfrac{1}{6}$", incorrectFeedback: "$\\frac{1}{6} = 0{,}1666\\ldots$ tiene el $1$ antes del periodo." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$0{,}666\\ldots = \\frac{6}{9} = \\frac{2}{3}$.",
    },
    {
      id: "check-periodo",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Restos posibles", message: "Al dividir entre 47 los restos solo pueden ser 1, 2, …, 46. En cuanto un resto se repite, las cifras se repiten." }],
      title: "Longitud del periodo",
      question: "¿Cuántas cifras puede tener, como máximo, el periodo de $\\dfrac{1}{47}$? (solo el número)",
      correctAnswers: ["46"],
      explanation: "Al dividir por $47$ el resto es uno de $1, 2, \\ldots, 46$ (el $0$ cerraría el decimal). Tras 46 pasos como mucho, un resto se repite y empieza el periodo.",
    },
    {
      id: "irracionales",
      type: "slide",
      help: [
        { label: "Raíces", message: "$\\sqrt[n]{p}$ es racional solo si $p$ es una potencia $n$-ésima exacta: $\\sqrt{49} = 7$, pero $\\sqrt{50}$ es irracional." },
        { label: "Demostración de que √2 no es racional", message: "Si $\\sqrt{2} = \\frac{a}{b}$ irreducible, entonces $a^2 = 2b^2$, así que $a$ es par; escribiendo $a = 2k$ sale $b^2 = 2k^2$ y $b$ también es par. Contradice que la fracción sea irreducible." },
      ],
      title: "Irracionales: decimales sin patrón",
      blocks: [
        { kind: "compare",
          left: { title: "Racionales", text: "Decimal exacto o periódico. Se pueden escribir como fracción.", math: ["\\tfrac{3}{8} = 0{,}375", "\\tfrac{1}{3} = 0{,}\\overline{3}", "\\sqrt{49} = 7"], tone: "ok" },
          right: { title: "Irracionales", text: "Infinitas cifras que **no** se repiten.", math: ["\\sqrt{2} = 1{,}41421\\ldots", "\\pi = 3{,}14159\\ldots", "3 + \\sqrt{7}"], tone: "warn" } },
        { kind: "text", text: "Si sumas un racional y un irracional, el resultado sigue siendo irracional. Por eso $3 + \\sqrt{7}$ no es racional." },
      ],
      arrange: "stack",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Una raíz exacta es un entero. Un decimal con periodo es racional aunque sea muy largo." }],
      title: "Racional o irracional",
      question: "Coloca cada número en su conjunto.",
      groups: [
        { id: "q", label: "Racional", tone: "emerald" },
        { id: "i", label: "Irracional", tone: "amber" },
      ],
      items: [
        { id: "a", text: "$\\dfrac{3}{8}$", group: "q" },
        { id: "b", text: "$\\sqrt{7}$", group: "i" },
        { id: "c", text: "$0{,}121212\\ldots$", group: "q" },
        { id: "d", text: "$\\pi$", group: "i" },
        { id: "e", text: "$\\sqrt{49}$", group: "q" },
        { id: "f", text: "$3 + \\sqrt{7}$", group: "i" },
      ],
      hint: "$\\sqrt{49} = 7$ y $0{,}1212\\ldots = \\frac{12}{99}$ son racionales.",
    },
  ],
};
