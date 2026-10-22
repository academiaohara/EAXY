import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_1_SUBTITLE } from "@/data/lessons/shared";

export const numerosRacionales4esoLesson: InteractiveLesson = {
  slug: "numeros-racionales-4eso",
  title: "4. Números racionales y la recta",
  subtitle: TEMA_4ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "medir",
      type: "slide",
      help: [
        {
          label: "Propia o impropia",
          message: "Si el numerador es menor que el denominador, la fracción es **propia** (menor que $1$). Si no, es **impropia** (mayor o igual que $1$).",
        },
        {
          label: "Qué es Q",
          message: "$\\mathbb{Q}$ es el conjunto de los números que se pueden escribir como fracción de dos enteros (denominador distinto de $0$).",
        },
      ],
      title: "Medir obliga a partir la unidad",
      blocks: [
        {
          kind: "text",
          text: "Para medir hay que **fraccionar la unidad**: la mitad, la quinta parte, la milésima parte… Las fracciones son las expresiones de esos números fraccionarios.",
        },
        {
          kind: "definition",
          text: "Los **números racionales** $\\mathbb{Q}$ son todos los que se pueden escribir como fracción $\\dfrac{a}{b}$ con $a, b$ enteros y $b \\neq 0$. Incluyen a los enteros ($7 = \\frac{7}{1}$).",
        },
        {
          kind: "facts",
          items: [
            { tex: "\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q}" },
          ],
        },
        {
          kind: "text",
          text: "Se colocan en la recta junto a los enteros: la unidad se parte en $b$ trozos y se cuentan $a$.",
        },
      ],
      visual: { kind: "anim", scene: "fraccion-recta", params: { a: 2, b: 5, c: 7 } },
    },
    {
      id: "mixtos",
      type: "slide",
      help: [
        {
          label: "Cómo se pasa a mixto",
          message: "Se divide el numerador entre el denominador: el cociente son las unidades enteras y el resto es el numerador de la parte fraccionaria.",
        },
        {
          label: "Y a la inversa",
          message: "$4 + \\frac{3}{5} = \\frac{4 \\cdot 5 + 3}{5} = \\frac{23}{5}$: se multiplica la parte entera por el denominador y se suma el resto.",
        },
      ],
      title: "Números mixtos: enteros más fracción",
      blocks: [
        {
          kind: "definition",
          text: "Un **número mixto** es la suma de un entero y una fracción propia: $\\dfrac{23}{5} = 4 + \\dfrac{3}{5}$.",
        },
        {
          kind: "steps",
          title: "De fracción impropia a mixto",
          items: [
            "Divide el numerador entre el denominador: $23 : 5 = 4$, resto $3$.",
            "El cociente son las unidades enteras: $4$.",
            "El resto va sobre el mismo denominador: $\\frac{3}{5}$.",
          ],
        },
        {
          kind: "example",
          lines: [{ math: "\\dfrac{86}{5} = 17 + \\dfrac{1}{5} \\qquad \\dfrac{127}{10} = 12 + \\dfrac{7}{10}" }],
        },
      ],
      visual: { kind: "anim", scene: "fraccion-mixta", params: { a: 23, b: 5 } },
    },
    {
      id: "check-mixto",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Divide",
          message: "$127 : 10 = 12$ con resto $7$.",
        },
      ],
      title: "Pasar a mixto",
      question: "¿Cuál es el número mixto igual a $\\dfrac{127}{10}$?",
      choices: [
        { id: "a", label: "$12 + \\dfrac{7}{10}$" },
        { id: "b", label: "$12 + \\dfrac{1}{10}$", incorrectFeedback: "El resto de $127 : 10$ es $7$, no $1$." },
        { id: "c", label: "$7 + \\dfrac{12}{10}$", incorrectFeedback: "El cociente son las unidades enteras ($12$) y el resto va sobre el denominador ($\\frac{7}{10}$)." },
        { id: "d", label: "$127 + \\dfrac{1}{10}$", incorrectFeedback: "Las unidades enteras son $127 : 10 = 12$, no $127$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$127 = 10 \\cdot 12 + 7$, luego $\\frac{127}{10} = 12 + \\frac{7}{10}$.",
    },
    {
      id: "negativos",
      type: "slide",
      help: [
        {
          label: "Signo",
          message: "El signo menos afecta a todo el número: $-\\frac{23}{5} = -4 - \\frac{3}{5}$, no $-4 + \\frac{3}{5}$.",
        },
        {
          label: "Dónde cae",
          message: "$-\\frac{23}{5}$ vale $-4{,}6$: está entre $-5$ y $-4$, a seis décimas del $-4$ hacia la izquierda.",
        },
      ],
      title: "Racionales negativos",
      blocks: [
        {
          kind: "text",
          text: "Un racional negativo es el **opuesto** de uno positivo: se coloca simétrico respecto del $0$. Las fracciones $-\\frac{3}{5}$, $\\frac{-3}{5}$ y $\\frac{3}{-5}$ son el mismo número.",
        },
        {
          kind: "warning",
          text: "En un mixto negativo el signo afecta a las dos partes: $-\\dfrac{23}{5} = -4 - \\dfrac{3}{5}$, **no** $-4 + \\frac{3}{5}$.",
        },
        {
          kind: "text",
          text: "Mueve el numerador y el denominador y observa dónde cae el número, su forma mixta y su decimal.",
        },
      ],
      visual: { kind: "tool", tool: "racional-explorador", params: { n: -13, d: 5 }, hint: "Con denominador 4, ¿qué numeradores dan un decimal exacto? ¿y con denominador 3?" },
    },
    {
      id: "check-entre-enteros",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Pasa a mixto",
          message: "$17 : 5 = 3$ con resto $2$, luego $\\frac{17}{5} = 3{,}4$. Con el signo menos, queda entre $-4$ y $-3$.",
        },
      ],
      title: "¿Entre qué enteros?",
      question: "El número $-\\dfrac{17}{5}$ está en la recta entre dos enteros consecutivos. ¿Entre cuáles?",
      choices: [
        { id: "a", label: "Entre $-4$ y $-3$" },
        { id: "b", label: "Entre $-3$ y $-2$", incorrectFeedback: "$\\frac{17}{5}$ es mayor que $3$, así que $-\\frac{17}{5}$ es menor que $-3$." },
        { id: "c", label: "Entre $3$ y $4$", incorrectFeedback: "Es negativo: está a la izquierda del $0$." },
        { id: "d", label: "Entre $-5$ y $-4$", incorrectFeedback: "$\\frac{17}{5} = 3{,}4$ es menor que $4$, así que $-\\frac{17}{5}$ es mayor que $-4$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\frac{17}{5} = 3 + \\frac{2}{5}$, así que $-\\frac{17}{5} = -3{,}4$, entre $-4$ y $-3$.",
    },
    {
      id: "densidad",
      type: "slide",
      help: [
        {
          label: "Siempre otro",
          message: "Entre dos racionales siempre cabe su media: $\\frac{a + b}{2}$ es racional y está justo en medio.",
        },
        {
          label: "No son todos",
          message: "Aunque los racionales se amontonan, en la recta quedan huecos: puntos que no son racionales. Los verás en el tema 3.",
        },
      ],
      title: "Entre dos racionales siempre hay otro",
      blocks: [
        {
          kind: "text",
          text: "Los enteros están separados: entre $2$ y $3$ no hay ninguno. Con los racionales **no hay huecos que se puedan vaciar**: entre dos cualesquiera siempre cabe otro, y entre esos, otro más.",
        },
        {
          kind: "rule",
          title: "El punto medio",
          formula: "\\dfrac{a + b}{2} \\text{ está entre } a \\text{ y } b",
        },
        {
          kind: "text",
          text: "Por eso entre dos racionales hay **infinitos** racionales. Aun así, la recta tiene puntos que no son racionales.",
        },
      ],
      visual: { kind: "anim", scene: "racionales-zoom" },
    },
    {
      id: "orden-fracciones",
      type: "slide",
      help: [
        {
          label: "Común denominador",
          message: "Con el mismo denominador, es mayor la fracción de mayor numerador.",
        },
        {
          label: "Con decimales",
          message: "También vale pasar a decimal: $\\frac{2}{5} = 0{,}4 > 0{,}33\\ldots = \\frac{1}{3}$.",
        },
      ],
      title: "Comparar fracciones",
      blocks: [
        {
          kind: "steps",
          title: "Para ordenar fracciones",
          items: [
            "Calcula un denominador común (el m.c.m. de los denominadores).",
            "Pasa cada fracción a ese denominador.",
            "Compara solo los numeradores.",
          ],
        },
        {
          kind: "warning",
          text: "Con negativos, el orden se invierte: $\\dfrac{1}{3} > \\dfrac{1}{5}$ pero $-\\dfrac{1}{3} < -\\dfrac{1}{5}$.",
        },
      ],
      visual: { kind: "anim", scene: "fracciones-orden" },
    },
    {
      id: "check-terreno",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Denominador común",
          message: "$\\text{m.c.m.}(5, 3) = 15$: $\\frac{2}{5} = \\frac{6}{15}$ y $\\frac{1}{3} = \\frac{5}{15}$.",
        },
      ],
      title: "¿Qué parte es mayor?",
      question: "Un terreno se divide en tres partes. Dos de ellas son $\\dfrac{2}{5}$ y $\\dfrac{1}{3}$ del total. ¿Cuál de las dos es mayor?",
      choices: [
        { id: "a", label: "$\\dfrac{2}{5}$" },
        { id: "b", label: "$\\dfrac{1}{3}$", incorrectFeedback: "En quinceavos: $\\frac{1}{3} = \\frac{5}{15}$ y $\\frac{2}{5} = \\frac{6}{15}$." },
        { id: "c", label: "Son iguales", incorrectFeedback: "No lo son: $\\frac{6}{15} \\neq \\frac{5}{15}$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\frac{2}{5} = \\frac{6}{15}$ y $\\frac{1}{3} = \\frac{5}{15}$, y $6 > 5$.",
    },
    {
      id: "recta-1",
      type: "number_line_pick",
      help: [
        {
          label: "Pasa a mixto",
          message: "$\\frac{13}{5} = 2 + \\frac{3}{5}$: dos unidades y tres quintos más.",
        },
      ],
      title: "Colócala en la recta",
      question: "Marca en la recta el número $\\dfrac{13}{5}$.",
      min: 0,
      max: 4,
      subdivisions: 5,
      target: 2.6,
      readout: "fraction",
    },
    {
      id: "recta-2",
      type: "number_line_pick",
      help: [
        {
          label: "Negativo",
          message: "$-\\frac{7}{5} = -1 - \\frac{2}{5}$: pasa del $-1$ hacia la izquierda dos quintos.",
        },
      ],
      title: "Un racional negativo",
      question: "Marca en la recta el número $-\\dfrac{7}{5}$.",
      min: -3,
      max: 1,
      subdivisions: 5,
      target: -1.4,
      readout: "fraction",
    },
  ],
};
