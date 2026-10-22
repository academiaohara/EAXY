import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_1_SUBTITLE } from "@/data/lessons/shared";

export const enterosRectaValorAbsoluto4esoLesson: InteractiveLesson = {
  slug: "enteros-recta-valor-absoluto-4eso",
  title: "1. Naturales y enteros: recta, orden y valor absoluto",
  subtitle: TEMA_4ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "naturales-resto",
      type: "slide",
      help: [
        {
          label: "Qué es el resto",
          message: "Al repartir en grupos completos, el resto es lo que no llega a formar otro grupo. Siempre es menor que el divisor.",
        },
        {
          label: "Fórmula",
          message: "Dividendo $= $ divisor $\\cdot$ cociente $+$ resto, con resto menor que el divisor.",
        },
      ],
      title: "Naturales: contar, numerar y repartir",
      blocks: [
        {
          kind: "text",
          text: "Los **números naturales** $\\mathbb{N} = \\{0, 1, 2, 3, \\dots\\}$ sirven para contar y para numerar (el 5.º planeta, el alumno 15.º de la lista). Se pueden sumar y multiplicar y el resultado sigue siendo natural.",
        },
        {
          kind: "rule",
          title: "División entera",
          formula: "D = d \\cdot c + r \\qquad \\text{con } 0 \\le r < d",
        },
        {
          kind: "example",
          title: "Repartir 100 entre 7",
          lines: [
            { math: "100 = 7 \\cdot 14 + 2", note: "a cada uno le tocan 14 y sobran 2" },
          ],
        },
        {
          kind: "text",
          text: "El resto es la clave de todo lo que **se repite cíclicamente**: los días de la semana, las horas del reloj, los turnos.",
        },
      ],
      visual: { kind: "anim", scene: "divisibilidad-grupos", params: { a: 21, b: 7, extra: 4 } },
    },
    {
      id: "check-semana",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Semanas completas",
          message: "La semana se repite cada $7$ días. Divide los días entre $7$ y mira solo el resto.",
        },
      ],
      title: "¿Qué día será?",
      question: "Hoy es lunes. ¿Qué día de la semana será dentro de $25$ días?",
      choices: [
        { id: "jueves", label: "Jueves", incorrectFeedback: "Eso sería un resto de $3$. Pero $25 = 7 \\cdot 3 + 4$: sobran $4$ días, no $3$." },
        { id: "viernes", label: "Viernes" },
        { id: "sabado", label: "Sábado", incorrectFeedback: "Eso correspondería a un resto de $5$. El resto de dividir $25$ entre $7$ es $4$." },
        { id: "lunes", label: "Lunes", incorrectFeedback: "Caería en lunes solo si el resto fuese $0$, es decir, con un múltiplo de $7$ como $21$ o $28$." },
      ],
      correctChoiceId: "viernes",
      shuffleChoices: true,
      explanation: "$25 = 7 \\cdot 3 + 4$: pasan $3$ semanas completas y $4$ días más. Lunes $+ 4$ días = viernes.",
    },
    {
      id: "check-semana-general",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Escribe 357 como 7·a",
          message: "$357 = 7 \\cdot 51$: es un múltiplo de $7$, así que no sobra ningún día.",
        },
      ],
      title: "Un salto largo",
      question: "Hoy es lunes. Dentro de $357$ días, ¿cuántos días sobran después de las semanas completas? (solo el número)",
      correctAnswers: ["0"],
      explanation: "$357 = 7 \\cdot 51 + 0$. Sobran $0$ días: será otra vez lunes. Lo mismo ocurre con $7a + 3$ días: el resto es $3$.",
    },
    {
      id: "enteros-negativos",
      type: "slide",
      help: [
        {
          label: "Por qué hacen falta",
          message: "Con naturales no se puede escribir una deuda ni una fecha anterior a Cristo. Los negativos amplían la recta hacia la izquierda.",
        },
        {
          label: "Z contiene a N",
          message: "Todo natural es entero: $5$ y $+5$ son el mismo número. Por eso $\\mathbb{N} \\subset \\mathbb{Z}$.",
        },
      ],
      title: "Los enteros: la recta se prolonga hacia la izquierda",
      blocks: [
        {
          kind: "definition",
          text: "Los **números enteros** $\\mathbb{Z}$ son los naturales y sus **opuestos** negativos. Con ellos, restar siempre tiene resultado.",
        },
        {
          kind: "compare",
          left: { title: "Una fecha", text: "Pitágoras murió en el año $-507$: es decir, $507$ años antes de Cristo." },
          right: { title: "Un saldo", text: "Una cuenta con $-234\\ €$ significa que se deben $234\\ €$ al banco." },
        },
        {
          kind: "text",
          text: "Dos números a la misma distancia del $0$ y en lados opuestos son **opuestos**.",
        },
      ],
      visual: { kind: "anim", scene: "recta-enteros" },
    },
    {
      id: "orden",
      type: "slide",
      help: [
        {
          label: "Mayor es más a la derecha",
          message: "En la recta, de dos números es mayor el que queda más a la derecha. Con negativos, el que tiene más magnitud es el menor.",
        },
        {
          label: "Truco",
          message: "Si $a < b$ son naturales, entonces $-a > -b$: el orden se invierte.",
        },
      ],
      title: "Ordenar enteros",
      blocks: [
        {
          kind: "rule",
          title: "Criterio de ordenación",
          text: "Cualquier natural es mayor que cualquier negativo. Entre dos negativos es **mayor el que está más cerca del $0$**.",
        },
        {
          kind: "example",
          lines: [
            { math: "-20 < -8 < 0 < 5", note: "de menor a mayor" },
            { math: "3 < 5 \\ \\Rightarrow\\ -3 > -5" },
          ],
        },
        {
          kind: "warning",
          text: "$-20$ **no** es mayor que $-8$ aunque $20$ sea mayor que $8$: está más a la izquierda, debes más dinero.",
        },
      ],
      visual: { kind: "anim", scene: "comparar-enteros", params: { a: -8, b: -20 } },
    },
    {
      id: "check-orden",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Coloca en la recta",
          message: "Los negativos van a la izquierda del $0$ y el más alejado es el menor.",
        },
      ],
      title: "Ordenar de menor a mayor",
      question: "Ordena de menor a mayor: $-4,\\ 19,\\ 7,\\ 0,\\ -6$.",
      choices: [
        { id: "a", label: "$-6,\\ -4,\\ 0,\\ 7,\\ 19$" },
        { id: "b", label: "$-4,\\ -6,\\ 0,\\ 7,\\ 19$", incorrectFeedback: "$-4$ está a la derecha de $-6$, así que es mayor: $-6 < -4$." },
        { id: "c", label: "$0,\\ -4,\\ -6,\\ 7,\\ 19$", incorrectFeedback: "El $0$ es mayor que cualquier número negativo." },
        { id: "d", label: "$19,\\ 7,\\ 0,\\ -4,\\ -6$", incorrectFeedback: "Esa lista está ordenada de mayor a menor." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "En la recta: $-6$ está más a la izquierda que $-4$; después el $0$, el $7$ y el $19$.",
    },
    {
      id: "valor-absoluto",
      type: "slide",
      help: [
        {
          label: "Distancia, no signo",
          message: "El valor absoluto responde a «¿cuánto se aleja del $0$?». Una distancia nunca es negativa.",
        },
        {
          label: "Barras anidadas",
          message: "Se resuelve de dentro hacia fuera: primero lo que hay entre las barras interiores.",
        },
      ],
      title: "Valor absoluto: la distancia al cero",
      blocks: [
        {
          kind: "definition",
          text: "El **valor absoluto** de $x$, $|x|$, es su **distancia al $0$** en la recta, sin importar el lado.",
        },
        {
          kind: "facts",
          items: [
            { tex: "|5| = 5" },
            { tex: "|0| = 0" },
            { tex: "|-27| = 27" },
          ],
        },
        {
          kind: "rule",
          formula: "|x| = \\begin{cases} x & \\text{si } x \\ge 0 \\\\ -x & \\text{si } x < 0 \\end{cases}",
        },
        {
          kind: "text",
          text: "Dos números opuestos tienen **el mismo valor absoluto**: $|-7| = |7|$.",
        },
      ],
      visual: { kind: "anim", scene: "valor-absoluto", params: { a: -7, b: 4 } },
    },
    {
      id: "explora-enteros",
      type: "slide",
      help: [
        {
          label: "Distancia entre dos enteros",
          message: "La distancia entre $a$ y $b$ es $|a - b|$: siempre positiva y la misma en los dos sentidos.",
        },
      ],
      title: "Explora: orden, opuestos y distancias",
      blocks: [
        {
          kind: "text",
          text: "Mueve $a$ y $b$ por la recta. Fíjate en tres cosas: el signo de la comparación, el valor absoluto de cada uno y la **distancia** entre ambos.",
        },
        {
          kind: "rule",
          title: "Distancia entre dos puntos",
          formula: "d(a, b) = |a - b|",
        },
        {
          kind: "warning",
          text: "Prueba con $a$ y $b$ de distinto signo. ¿Qué pasa con la distancia cuando $a$ y $b$ son opuestos?",
        },
      ],
      visual: { kind: "tool", tool: "enteros-explorador", params: { a: -4, b: 6 }, hint: "Coloca a y b en puntos opuestos y comprueba que la distancia es el doble del valor absoluto." },
    },
    {
      id: "check-edad",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Distancia entre dos años",
          message: "La edad es la distancia entre el año de nacimiento y el de muerte: $|{-347} - ({-428})|$.",
        },
      ],
      title: "¿Cuántos años vivió?",
      question: "Platón nació en el año $-428$ y murió en el $-347$. ¿Cuántos años vivió? (solo el número)",
      correctAnswers: ["81"],
      explanation: "$-347 - (-428) = -347 + 428 = 81$ años.",
    },
    {
      id: "check-aristoteles",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Retrocede en el tiempo",
          message: "Si murió en $-322$ y vivió $62$ años, nació $62$ años antes: $-322 - 62$.",
        },
      ],
      title: "¿En qué año nació?",
      question: "Aristóteles murió en el año $322$ a.C. y vivió $62$ años. ¿En qué año nació? (escribe el número con su signo)",
      correctAnswers: ["-384", "−384"],
      explanation: "$322$ a.C. es el año $-322$. Nació $62$ años antes: $-322 - 62 = -384$, es decir, $384$ a.C.",
    },
    {
      id: "check-absoluto-1",
      type: "fill_in_blank",
      help: [
        {
          label: "De dentro hacia fuera",
          message: "Primero el paréntesis: $3 - 11 = -8$. Después $5 + (-8) = -3$ y, por último, el valor absoluto.",
        },
      ],
      title: "Valor absoluto de una expresión",
      question: "Calcula $|5 + (3 - 11)|$.",
      correctAnswers: ["3", "+3"],
      explanation: "$3 - 11 = -8$; $5 + (-8) = -3$; $|-3| = 3$.",
    },
    {
      id: "check-absoluto-2",
      type: "fill_in_blank",
      help: [
        {
          label: "Barras interiores primero",
          message: "$|3 - 11| = |-8| = 8$. Sustitúyelo y suma $5 + 8$.",
        },
      ],
      title: "Barras dentro de barras",
      question: "Calcula $|5 + |3 - 11||$.",
      correctAnswers: ["13", "+13"],
      explanation: "$|3 - 11| = |-8| = 8$; $5 + 8 = 13$; $|13| = 13$. No es lo mismo que el ejercicio anterior: aquí lo de dentro **ya es positivo** antes de sumar.",
    },
    {
      id: "check-absoluto-3",
      type: "fill_in_blank",
      help: [
        {
          label: "Resta de un negativo",
          message: "$-20 - 9 = -29$ y $30 - (-29) = 30 + 29$.",
        },
      ],
      title: "Un cálculo largo",
      question: "Calcula $|30 - (-20 - 9)|$.",
      correctAnswers: ["59", "+59"],
      explanation: "$-20 - 9 = -29$; $30 - (-29) = 59$; $|59| = 59$.",
    },
  ],
};
