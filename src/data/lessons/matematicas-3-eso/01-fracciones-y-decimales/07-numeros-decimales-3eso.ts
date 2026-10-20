import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_1_SUBTITLE } from "@/data/lessons/shared";

export const numerosDecimales3esoLesson: InteractiveLesson = {
  slug: "numeros-decimales-3eso",
  title: "7. Números decimales y fracciones",
  subtitle: TEMA_3ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "decimal-a-fraccion",
      type: "slide",
      help: [
        {
          label: "Lee el decimal",
          message: "$1{,}6$ se lee «dieciséis décimas»: $\\frac{16}{10}$. La última cifra dice el denominador.",
        },
        {
          label: "Cuenta los ceros",
          message: "Tantas cifras decimales como ceros tiene el denominador: dos cifras, $100$; tres cifras, $1\\,000$.",
        },
      ],
      title: "De decimal exacto a fracción",
      blocks: [
        {
          kind: "text",
          text: "Un número decimal expresa **partes de la unidad** y puede escribirse como fracción.",
        },
        {
          kind: "steps",
          items: [
            "El **numerador** es el número sin la coma.",
            "El **denominador** es $1$ seguido de tantos ceros como cifras hay detrás de la coma.",
            "**Simplifica** si se puede.",
          ],
        },
        {
          kind: "example",
          lines: [
            { math: "1{,}6 = \\dfrac{16}{10} = \\dfrac{8}{5}" },
            { math: "0{,}375 = \\dfrac{375}{1\\,000} = \\dfrac{3}{8}" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "tabla-decimal", params: { dec: "1,6" } },
    },
    {
      id: "tipos",
      type: "slide",
      help: [
        {
          label: "Periodo",
          message: "El periodo es el grupo de cifras que se repite sin fin. Se marca con un arco encima o con puntos suspensivos.",
        },
        {
          label: "Un caso no racional",
          message: "$\\sqrt{2} = 1{,}4142135\\dots$ no tiene periodo: no se puede escribir como fracción, así que no es racional.",
        },
      ],
      title: "Tipos de números decimales",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "5{,}4\\quad 0{,}97\\quad -0{,}0725", label: "exactos: número limitado de cifras" },
            { tex: "7{,}\\overline{81}\\quad 0{,}\\overline{735}", label: "periódicos puros: el periodo empieza tras la coma" },
            { tex: "18{,}3\\overline{52}\\quad 0{,}0\\overline{45}", label: "periódicos mixtos: hay cifras antes del periodo" },
            { tex: "\\sqrt{2}\\quad \\pi", label: "infinitas cifras sin periodo: no son racionales" },
          ],
        },
        {
          kind: "rule",
          text: "Los **racionales** son exactamente los decimales **exactos** y los **periódicos**.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "fraccion-a-decimal",
      type: "slide",
      help: [
        {
          label: "Divide",
          message: "Una fracción es una división indicada: $\\frac{3}{8} = 3 : 8$.",
        },
        {
          label: "Cuándo termina",
          message: "Una fracción irreducible da un decimal exacto solo si su denominador tiene únicamente los factores $2$ y $5$.",
        },
      ],
      title: "De fracción a decimal",
      blocks: [
        {
          kind: "text",
          text: "Se **divide el numerador entre el denominador**. El resultado es entero, decimal exacto o decimal periódico.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{3}{8} = 0{,}375", note: "exacto" },
            { math: "\\dfrac{11}{3} = 3{,}666\\dots = 3{,}\\overline{6}", note: "periódico puro" },
            { math: "\\dfrac{7}{30} = 0{,}2333\\dots = 0{,}2\\overline{3}", note: "periódico mixto" },
          ],
        },
        {
          kind: "rule",
          title: "Denominador de la fracción irreducible",
          text: "Solo factores **2 y 5** → decimal exacto. Cualquier otro factor → decimal periódico.",
        },
      ],
      visual: { kind: "anim", scene: "division-decimal", params: { terms: ["3", "8"], places: 3 } },
    },
    {
      id: "check-a-fraccion",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Numerador y denominador",
          message: "$0{,}35$ tiene dos cifras decimales: $\\frac{35}{100}$. Después simplifica.",
        },
      ],
      title: "Decimal a fracción",
      question: "Escribe $0{,}35$ como fracción irreducible.",
      correctAnswers: ["7/20"],
      explanation: "$\\frac{35}{100} = \\frac{7}{20}$.",
    },
    {
      id: "check-exacto",
      type: "predict",
      help: [
        {
          label: "Mira el denominador",
          message: "Descompón: $20 = 2^2 \\cdot 5$, $12 = 2^2 \\cdot 3$, $15 = 3 \\cdot 5$ y $7$ es primo.",
        },
      ],
      title: "¿Decimal exacto?",
      question: "¿Cuál de estas fracciones irreducibles da un decimal exacto?",
      mode: "choice",
      choices: [
        { id: "a", label: "$\\dfrac{9}{20}$" },
        { id: "b", label: "$\\dfrac{5}{12}$", incorrectFeedback: "$12 = 2^2 \\cdot 3$: el factor $3$ produce un periodo." },
        { id: "c", label: "$\\dfrac{4}{15}$", incorrectFeedback: "$15 = 3 \\cdot 5$: el factor $3$ produce un periodo." },
        { id: "d", label: "$\\dfrac{2}{7}$", incorrectFeedback: "$7$ no es $2$ ni $5$: sale periódico." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\frac{9}{20} = 0{,}45$. Es el único cuyo denominador solo tiene los factores $2$ y $5$.",
    },
    {
      id: "check-decimal",
      type: "fill_in_blank",
      help: [
        {
          label: "Divide",
          message: "$7 : 8$: $70 : 8 = 8$ resto $6$; $60 : 8 = 7$ resto $4$; $40 : 8 = 5$.",
        },
      ],
      title: "Fracción a decimal",
      question: "Escribe $\\dfrac{7}{8}$ como número decimal.",
      correctAnswers: ["0,875", "0.875"],
      explanation: "$7 : 8 = 0{,}875$.",
    },
    {
      id: "check-tipo",
      type: "predict",
      help: [
        {
          label: "Observa tras la coma",
          message: "En $2{,}3555\\dots$ hay una cifra ($3$) antes de que empiece a repetirse el $5$.",
        },
      ],
      title: "Tipo de decimal",
      question: "El número $2{,}3555555\\dots$ (con el $5$ repetido sin fin), ¿qué tipo de decimal es?",
      mode: "choice",
      choices: [
        { id: "mixto", label: "Periódico mixto" },
        { id: "puro", label: "Periódico puro", incorrectFeedback: "En un periódico puro el periodo empieza justo tras la coma; aquí hay un $3$ antes." },
        { id: "exacto", label: "Exacto", incorrectFeedback: "Tiene infinitas cifras decimales." },
        { id: "irracional", label: "No racional", incorrectFeedback: "Se repite un grupo de cifras: tiene periodo, así que sí es racional." },
      ],
      correctChoiceId: "mixto",
      shuffleChoices: true,
      explanation: "Tiene cifras sin repetir ($3$) y después un periodo ($5$): es periódico mixto.",
    },
  ],
};
