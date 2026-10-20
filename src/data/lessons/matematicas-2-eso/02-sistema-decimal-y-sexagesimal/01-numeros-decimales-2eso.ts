import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_2_SUBTITLE } from "@/data/lessons/shared";

export const numerosDecimales2esoLesson: InteractiveLesson = {
  slug: "numeros-decimales-2eso",
  title: "1. Números decimales",
  subtitle: TEMA_2ESO_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "estructura",
      type: "slide",
      help: [
        {
          label: "Misma estructura",
          message: "A la derecha de la coma ocurre lo mismo que a la izquierda: cada unidad se divide en diez de la siguiente, más pequeña.",
        },
        {
          label: "Cómo se lee",
          message: "Se lee la parte entera y después la parte decimal con el nombre de su última cifra: $0{,}3758$ son tres mil setecientas cincuenta y ocho diezmilésimas.",
        },
      ],
      title: "El sistema de numeración decimal",
      blocks: [
        {
          kind: "text",
          text: "Para expresar cantidades **entre dos enteros** se usan los números decimales: una **parte entera** y una **parte decimal**, separadas por la coma.",
        },
        {
          kind: "rule",
          title: "Cada orden vale diez del siguiente",
          text: "Una unidad de cualquier orden se divide en **diez** unidades del orden inferior.",
          formula: "1 = 10 \\cdot 0{,}1 \\qquad 0{,}1 = 10 \\cdot 0{,}01 \\qquad 0{,}01 = 10 \\cdot 0{,}001",
        },
        {
          kind: "example",
          lines: [{ math: "28{,}3758 = 28 + \\dfrac{3\\,758}{10\\,000}", note: "veintiocho unidades y 3 758 diezmilésimas" }],
        },
      ],
      visual: { kind: "anim", scene: "tabla-decimal", params: { dec: "28,3758" } },
    },
    {
      id: "clases",
      type: "slide",
      help: [
        {
          label: "Mira el final",
          message: "Si las cifras se acaban, es exacto. Si se repite un bloque sin fin, es periódico. Si no hay patrón, no es exacto ni periódico.",
        },
        {
          label: "Puro o mixto",
          message: "En el puro el periodo empieza justo tras la coma; en el mixto hay antes cifras que no se repiten.",
        },
      ],
      title: "Clases de números decimales",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Exacto",
            text: "Número **limitado** de cifras decimales.",
            math: ["4{,}75"],
            tone: "ok",
          },
          right: {
            title: "No exacto y no periódico",
            text: "Infinitas cifras **sin patrón**.",
            math: ["\\sqrt{2} = 1{,}4142135\\dots"],
            tone: "warn",
          },
        },
        {
          kind: "compare",
          left: {
            title: "Periódico puro",
            text: "El periodo empieza tras la coma.",
            math: ["7{,}151515\\dots = 7{,}\\overset{\\frown}{15}"],
            tone: "info",
          },
          right: {
            title: "Periódico mixto",
            text: "Antes del periodo hay cifras que no se repiten.",
            math: ["8{,}24666\\dots = 8{,}24\\overset{\\frown}{6}"],
            tone: "key",
          },
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-clases",
      type: "classify",
      help: [
        {
          label: "¿Se acaba?",
          message: "Lo primero: ¿tiene un número limitado de cifras? Si sí, es exacto.",
        },
        {
          label: "¿Se repite?",
          message: "Si sigue sin fin pero las cifras se repiten en bloque, es periódico.",
        },
      ],
      title: "Clasifica los decimales",
      question: "Reparte cada número según el tipo de decimal.",
      groups: [
        { id: "exacto", label: "Exacto", tone: "cobalt" },
        { id: "periodico", label: "Periódico", tone: "amber" },
        { id: "noexacto", label: "No exacto ni periódico", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$0{,}125$", group: "exacto" },
        { id: "b", text: "$4{,}75$", group: "exacto" },
        { id: "c", text: "$3{,}2727\\dots$ (se repite $27$)", group: "periodico" },
        { id: "d", text: "$5{,}1666\\dots$ (se repite $6$)", group: "periodico" },
        { id: "e", text: "$\\sqrt{2} = 1{,}41421356\\dots$", group: "noexacto" },
      ],
      explanation: "Los exactos se acaban; los periódicos repiten un bloque sin fin; $\\sqrt{2}$ tiene infinitas cifras sin ningún patrón.",
    },
    {
      id: "fraccion",
      type: "slide",
      help: [
        {
          label: "Cuenta las cifras",
          message: "Tantas cifras como haya a la derecha de la coma, tantos ceros llevará el denominador.",
        },
        {
          label: "Simplifica",
          message: "$\\frac{16}{10}$ es correcta, pero puede simplificarse dividiendo entre $2$: $\\frac{8}{5}$.",
        },
      ],
      title: "De decimal a fracción",
      blocks: [
        {
          kind: "steps",
          items: [
            "En el **numerador**, el número **sin la coma**.",
            "En el **denominador**, un $1$ seguido de **tantos ceros** como cifras haya a la derecha de la coma.",
            "Si se puede, **simplifica**.",
          ],
        },
        {
          kind: "example",
          lines: [
            { math: "1{,}6 = \\dfrac{16}{10} = \\dfrac{8}{5}" },
            { math: "0{,}35 = \\dfrac{35}{100} = \\dfrac{7}{20}" },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["1,6", "€"], note: "un euro con sesenta céntimos: una cifra decimal." },
            { tokens: ["16", "/", "10"], fresh: [0, 2], note: "numerador: $16$ (sin coma). Denominador: $10$ (un cero)." },
            { tokens: ["8", "/", "5"], fresh: [0, 2], note: "simplificada, dividiendo entre $2$." },
          ],
        },
      },
    },
    {
      id: "orden",
      type: "slide",
      help: [
        {
          label: "Empieza por la izquierda",
          message: "Compara parte entera; si coincide, décimas; si coinciden, centésimas… La primera cifra distinta decide.",
        },
        {
          label: "Ojo con la longitud",
          message: "Tener más cifras no hace mayor un número: $4{,}35099 < 4{,}3512$.",
        },
      ],
      title: "Ordenar números decimales",
      blocks: [
        {
          kind: "text",
          text: "Cada decimal es un punto de la recta numérica: de dos números, el **menor queda a la izquierda**. Se comparan **cifra a cifra**, empezando por la izquierda.",
        },
        {
          kind: "example",
          lines: [
            { math: "4{,}35099 < 4{,}3512", note: "a la tercera cifra: $0 < 1$" },
            { math: "-1{,}263 < -0{,}4 < 0{,}6751 < 1{,}55" },
          ],
        },
        {
          kind: "warning",
          text: "Entre dos decimales siempre hay otro decimal: no existe «el siguiente».",
        },
      ],
      visual: { kind: "anim", scene: "comparar-decimales", params: { terms: ["4,35099", "4,3512"] } },
    },
    {
      id: "check-mayor",
      type: "predict",
      help: [
        {
          label: "Las primeras cifras",
          message: "Las cuatro tienen el mismo $4$ y el mismo $3$ en décimas. Mira la centésima.",
        },
      ],
      title: "¿Cuál es el mayor?",
      question: "¿Cuál de estos números es el mayor?",
      mode: "choice",
      choices: [
        { id: "a", label: "$4{,}3499$", incorrectFeedback: "En centésimas tiene un $4$; los otros tienen $5$." },
        { id: "b", label: "$4{,}35099$", incorrectFeedback: "A la tercera cifra tiene $0$, y $4{,}3512$ tiene $1$." },
        { id: "c", label: "$4{,}351$", incorrectFeedback: "Es $4{,}3510$, menor que $4{,}3512$." },
        { id: "d", label: "$4{,}3512$" },
      ],
      correctChoiceId: "d",
      shuffleChoices: true,
      explanation: "Hasta las centésimas coinciden tres de ellos ($4{,}35$); al comparar la milésima, $4{,}3512$ tiene $1$ y los otros $0$.",
    },
    {
      id: "check-centesimas",
      type: "fill_in_blank",
      help: [
        {
          label: "Una décima",
          message: "Una décima equivale a $10$ centésimas.",
        },
      ],
      title: "Cambio de orden",
      question: "¿Cuántas centésimas hay en $0{,}7$? (solo el número)",
      correctAnswers: ["70"],
      explanation: "$0{,}7 = 7$ décimas $= 70$ centésimas, porque $0{,}7 = 0{,}70$.",
    },
  ],
};
