import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_1_SUBTITLE } from "@/data/lessons/shared";

export const problemasFracciones4esoLesson: InteractiveLesson = {
  slug: "problemas-fracciones-4eso",
  title: "8. Problemas con fracciones",
  subtitle: TEMA_4ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "estrategia",
      type: "slide",
      help: [
        {
          label: "Siempre sobre qué",
          message: "Una fracción siempre es **de algo**. Antes de operar, pregúntate: ¿de qué cantidad es esta fracción? ¿Del total o de lo que queda?",
        },
        {
          label: "La trampa",
          message: "«Gasta $\\frac{1}{2}$ y después $\\frac{1}{3}$» puede significar $\\frac{1}{3}$ **del total** o $\\frac{1}{3}$ **de lo que le quedaba**. El enunciado lo dice; léelo.",
        },
      ],
      title: "Fracciones encadenadas: ¿de qué es cada fracción?",
      blocks: [
        {
          kind: "text",
          text: "En los problemas con varias fracciones, la dificultad no es calcular: es **saber de qué cantidad es cada una**. Si una fracción es «de lo que quedaba», se multiplica por **lo que quedaba**, no por el total.",
        },
        {
          kind: "steps",
          title: "Método",
          items: [
            "Trabaja con fracciones **del total** (aunque el total no se conozca todavía).",
            "Para una fracción «de lo que queda»: multiplica esa fracción por lo que queda.",
            "Lo que no se ha usado es $1 - (\\text{lo usado})$.",
            "Si un dato es una cantidad concreta, se compara con la fracción que le corresponde para hallar el total.",
          ],
        },
      ],
      visual: { kind: "anim", scene: "fraccion-gasto-resto", params: { a: 3, b: 5, c: 1, d: 2 } },
    },
    {
      id: "explora-cadena",
      type: "slide",
      help: [
        {
          label: "Compara",
          message: "Con $\\frac{3}{5}$ y luego $\\frac{1}{2}$ de lo que queda, la segunda parte es $\\frac{1}{2} \\cdot \\frac{2}{5} = \\frac{1}{5}$ del total, no $\\frac{1}{2}$ del total.",
        },
      ],
      title: "Explora: la segunda fracción actúa sobre el resto",
      blocks: [
        {
          kind: "text",
          text: "Cambia las dos fracciones y el total. Observa que la segunda parte (naranja) **siempre es menor** que lo que quedaba, y que las tres partes suman el total.",
        },
        {
          kind: "warning",
          text: "Prueba a poner la segunda fracción igual a $\\frac{1}{2}$ y a variar la primera: la segunda parte cambia aunque la fracción sea la misma, porque el resto cambia.",
        },
      ],
      visual: { kind: "tool", tool: "gasto-resto-explorador", initial: [3, 5, 1, 2, 750], hint: "Sube la primera fracción y mira cómo se encoge la parte naranja." },
    },
    {
      id: "check-queda",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Lo que queda tras la mañana",
          message: "Si por la mañana se vende $\\frac{3}{5}$, quedan $1 - \\frac{3}{5} = \\frac{2}{5}$. Por la tarde se vende la mitad de eso.",
        },
      ],
      title: "Fruta sin vender",
      question: "Una frutería vende por la mañana $\\dfrac{3}{5}$ de la fruta y por la tarde la mitad de lo que quedaba. ¿Qué fracción del total queda sin vender?",
      correctAnswers: ["1/5"],
      explanation: "Tras la mañana quedan $\\frac{2}{5}$. Por la tarde se vende $\\frac{1}{2} \\cdot \\frac{2}{5} = \\frac{1}{5}$. Quedan $\\frac{2}{5} - \\frac{1}{5} = \\frac{1}{5}$.",
    },
    {
      id: "check-kilos",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Fracción vendida",
          message: "Se vendió $\\frac{3}{5} + \\frac{1}{5} = \\frac{4}{5}$ del total. Calcula $\\frac{4}{5}$ de $750$.",
        },
      ],
      title: "Kilos vendidos",
      question: "Si al empezar el día había $750$ kg de fruta, ¿cuántos kilos se vendieron en total? (solo el número)",
      correctAnswers: ["600"],
      explanation: "Se vendió $\\frac{4}{5}$ del total: $750 : 5 \\cdot 4 = 600$ kg.",
    },
    {
      id: "check-jardinero",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Cada día, del total",
          message: "Día 1: $\\frac{1}{3}$. Quedan $\\frac{2}{3}$. Día 2: $\\frac{3}{4}$ de $\\frac{2}{3}$. Día 3: lo que falte.",
        },
      ],
      title: "¿Qué día trabaja más?",
      question: "Un jardinero hace el primer día $\\dfrac{1}{3}$ del trabajo; el segundo, $\\dfrac{3}{4}$ del resto, y el tercero termina la tarea. ¿Qué día trabaja más?",
      choices: [
        { id: "d2", label: "El segundo día ($\\frac{1}{2}$ del trabajo)" },
        { id: "d1", label: "El primer día ($\\frac{1}{3}$ del trabajo)", incorrectFeedback: "El segundo día hace $\\frac{3}{4}$ del resto, que es $\\frac{3}{4} \\cdot \\frac{2}{3} = \\frac{1}{2}$ del total: más que $\\frac{1}{3}$." },
        { id: "d3", label: "El tercer día ($\\frac{1}{4}$ del trabajo)", incorrectFeedback: "El tercer día queda $1 - \\frac{1}{3} - \\frac{1}{2} = \\frac{1}{6}$ del total, la parte más pequeña." },
        { id: "igual", label: "Todos igual", incorrectFeedback: "Hace $\\frac{1}{3}$, $\\frac{1}{2}$ y $\\frac{1}{6}$ del total: distintos." },
      ],
      correctChoiceId: "d2",
      shuffleChoices: true,
      explanation: "Día 1: $\\frac{1}{3}$. Día 2: $\\frac{3}{4} \\cdot \\frac{2}{3} = \\frac{1}{2}$. Día 3: $1 - \\frac{1}{3} - \\frac{1}{2} = \\frac{1}{6}$. Trabaja más el segundo día.",
    },
    {
      id: "rebote",
      type: "slide",
      help: [
        {
          label: "Qué conserva",
          message: "Si pierde $\\frac{2}{5}$ de la altura, **conserva** $1 - \\frac{2}{5} = \\frac{3}{5}$. Cada bote multiplica por $\\frac{3}{5}$.",
        },
      ],
      title: "Cuando la fracción se repite: una potencia",
      blocks: [
        {
          kind: "text",
          text: "Una pelota pierde en cada bote $\\frac{2}{5}$ de la altura anterior, es decir, **conserva $\\frac{3}{5}$**. Tras $n$ botes, la altura es la inicial multiplicada $n$ veces por $\\frac{3}{5}$.",
        },
        {
          kind: "rule",
          formula: "h_n = h_0 \\cdot \\left(\\dfrac{3}{5}\\right)^{n}",
        },
        {
          kind: "text",
          text: "Aquí se juntan dos ideas del tema: **fracciones** y **potencias**.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["3/5", "·", "3/5", "·", "3/5", "·", "3/5"], active: [0, 6], note: "cada bote multiplica por $\\frac{3}{5}$; cuatro botes." },
            { tokens: ["(3/5)⁴"], active: [0, 0], note: "cuatro factores iguales forman una potencia." },
            { tokens: ["3⁴/5⁴"], active: [0, 0], note: "la potencia de una fracción se reparte: numerador y denominador." },
            { tokens: ["81/625"], fresh: [0, 0], note: "$3^4 = 81$ y $5^4 = 625$." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-pelota",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Potencia de una fracción",
          message: "$\\left(\\frac{3}{5}\\right)^4 = \\frac{3^4}{5^4}$.",
        },
      ],
      title: "La pelota que bota",
      question: "Una pelota pierde en cada bote $\\dfrac{2}{5}$ de la altura del bote anterior. ¿Qué fracción de la altura inicial alcanza cuatro botes después?",
      correctAnswers: ["81/625"],
      explanation: "Conserva $\\frac{3}{5}$ en cada bote: $\\left(\\frac{3}{5}\\right)^4 = \\frac{81}{625}$ de la altura inicial.",
    },
    {
      id: "poste",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Lo que queda para el rojo",
          message: "Blanco: $\\frac{3}{8}$. Resto: $\\frac{5}{8}$. Azul: $\\frac{3}{5}$ de $\\frac{5}{8} = \\frac{3}{8}$. Rojo: $\\frac{5}{8} - \\frac{3}{8} = \\frac{1}{4}$ del poste.",
        },
      ],
      title: "El poste pintado",
      question: "Los $\\dfrac{3}{8}$ de un poste están pintados de blanco, los $\\dfrac{3}{5}$ del resto de azul, y el resto, que mide $1{,}25$ m, de rojo. ¿Cuántos metros mide el poste? (solo el número)",
      correctAnswers: ["5"],
      explanation: "Blanco $\\frac{3}{8}$; azul $\\frac{3}{5} \\cdot \\frac{5}{8} = \\frac{3}{8}$; rojo $1 - \\frac{3}{8} - \\frac{3}{8} = \\frac{1}{4}$. Si $\\frac{1}{4}$ del poste son $1{,}25$ m, el poste mide $4 \\cdot 1{,}25 = 5$ m.",
    },
    {
      id: "reparto",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Sigue la cadena",
          message: "A y B: $\\frac{2}{7} + \\frac{13}{21} = \\frac{19}{21}$. Queda $\\frac{2}{21}$. C: $\\frac{7}{10} \\cdot \\frac{2}{21} = \\frac{1}{15}$. A D le queda $\\frac{2}{21} - \\frac{1}{15} = \\frac{1}{35}$.",
        },
      ],
      title: "Un reparto en cadena",
      question: "Se reparte dinero entre cuatro personas. A y B se llevan, respectivamente, $\\dfrac{2}{7}$ y $\\dfrac{13}{21}$ del total. C recibe $\\dfrac{7}{10}$ del resto y D, finalmente, $390$ €. ¿Cuánto dinero se repartió? (solo el número)",
      correctAnswers: ["13650", "13 650", "13.650"],
      explanation: "A y B: $\\frac{6}{21} + \\frac{13}{21} = \\frac{19}{21}$; resto $\\frac{2}{21}$. C: $\\frac{7}{10} \\cdot \\frac{2}{21} = \\frac{1}{15}$. D: $\\frac{2}{21} - \\frac{1}{15} = \\frac{1}{35}$. Si $\\frac{1}{35}$ del total son $390$ €, el total es $35 \\cdot 390 = 13\\,650$ €.",
    },
  ],
};
