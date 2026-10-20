import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_1_SUBTITLE } from "@/data/lessons/shared";

export const factoresPrimos2esoLesson: InteractiveLesson = {
  slug: "factores-primos-2eso",
  title: "3. Descomposición en factores primos",
  subtitle: TEMA_2ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "primos-compuestos",
      type: "slide",
      help: [
        {
          label: "Primo o compuesto",
          message: "Busca algún divisor aparte del $1$ y del propio número. Con uno solo ya es compuesto.",
        },
        {
          label: "El $1$ no es primo",
          message: "Tiene un único divisor. Un primo necesita exactamente dos: él mismo y la unidad.",
        },
      ],
      title: "Números primos y compuestos",
      blocks: [
        {
          kind: "definition",
          text: "Un número es **primo** si solo tiene dos divisores: el $1$ y él mismo. Los que tienen más son **compuestos**.",
        },
        {
          kind: "compare",
          left: {
            title: "Primo",
            text: "No se descompone en factores menores.",
            math: ["13 = 13 \\cdot 1"],
            tone: "ok",
          },
          right: {
            title: "Compuesto",
            text: "Se escribe como producto de factores más simples.",
            math: ["40 = 8 \\cdot 5 = 2 \\cdot 2 \\cdot 2 \\cdot 5"],
            tone: "info",
          },
        },
        {
          kind: "warning",
          text: "El $1$ no se considera primo (solo tiene un divisor). El $2$ es el único primo par.",
        },
      ],
      visual: { kind: "anim", scene: "criba-eratostenes", params: { n: 100 } },
    },
    {
      id: "factores-primos-idea",
      type: "slide",
      help: [
        {
          label: "Primos como ladrillos",
          message: "Un primo no se puede romper en factores más pequeños; por eso la descomposición no puede ir más lejos.",
        },
        {
          label: "¿Por qué potencias?",
          message: "Para abreviar factores repetidos: $2 \\cdot 2 \\cdot 2 = 2^3$.",
        },
      ],
      title: "Descomponer en factores primos",
      blocks: [
        {
          kind: "text",
          text: "La descomposición más completa de un número se alcanza cuando **todos los factores son primos**: ya no se pueden descomponer más.",
        },
        {
          kind: "example",
          lines: [
            { math: "72 = 8 \\cdot 9 = 2 \\cdot 2 \\cdot 2 \\cdot 3 \\cdot 3 = 2^3 \\cdot 3^2" },
            { math: "630 = 9 \\cdot 7 \\cdot 10 = 2 \\cdot 3^2 \\cdot 5 \\cdot 7" },
          ],
        },
        {
          kind: "rule",
          text: "Los factores repetidos se escriben como **potencias**. Los criterios de divisibilidad te ayudan a elegir por qué primo dividir.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "metodo-division",
      type: "slide",
      help: [
        {
          label: "¿Por qué empezar por el menor?",
          message: "Para ir en orden y no dejar ningún factor: primero todos los $2$, después los $3$, los $5$…",
        },
        {
          label: "¿Cuándo termino?",
          message: "Cuando el cociente es $1$. Los primos de la columna derecha forman la descomposición.",
        },
      ],
      title: "El método de la línea vertical",
      blocks: [
        {
          kind: "steps",
          items: [
            "Escribe el número y traza una **línea vertical** a su derecha.",
            "Divide entre los primos **de menor a mayor** ($2, 3, 5, 7\\dots$), todas las veces que se pueda.",
            "Escribe cada cociente debajo del número anterior.",
            "Termina cuando el resultado es **1**.",
          ],
        },
        {
          kind: "example",
          title: "Descomponer 24",
          lines: [{ math: "24 = 2 \\cdot 2 \\cdot 2 \\cdot 3 = 2^3 \\cdot 3" }],
        },
      ],
      visual: { kind: "anim", scene: "descomposicion-primos", params: { n: 24 } },
    },
    {
      id: "check-descomposicion",
      type: "predict",
      help: [
        {
          label: "Divide en orden",
          message: "$180 : 2 = 90$, $90 : 2 = 45$, y el $45$ ya no se puede dividir entre $2$.",
        },
        {
          label: "Descarta opciones",
          message: "Calcula cada producto y compara con $180$, o comprueba que todos los factores sean primos.",
        },
      ],
      title: "¿Cuál es la descomposición?",
      question: "¿Cuál es la descomposición de $180$ en factores primos?",
      mode: "choice",
      choices: [
        { id: "ok", label: "$2^2 \\cdot 3^2 \\cdot 5$" },
        {
          id: "no-primo",
          label: "$2 \\cdot 9 \\cdot 10$",
          incorrectFeedback: "El producto es $180$, pero $9$ y $10$ no son primos: hay que seguir descomponiendo.",
        },
        {
          id: "mal-exp",
          label: "$2^3 \\cdot 3^2 \\cdot 5$",
          incorrectFeedback: "Eso es $360$: sobra un factor $2$.",
        },
        {
          id: "falta-5",
          label: "$2^2 \\cdot 3^2$",
          incorrectFeedback: "Eso es $36$. Falta el factor $5$.",
        },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "$180 = 2 \\cdot 90 = 2^2 \\cdot 45 = 2^2 \\cdot 3^2 \\cdot 5$.",
    },
    {
      id: "multiplos-divisores-factorizados",
      type: "slide",
      help: [
        {
          label: "Un múltiplo contiene todo",
          message: "Si multiplicas $150$ por algo, sus factores primos siguen ahí: solo se añaden más.",
        },
        {
          label: "Un divisor solo coge algunos",
          message: "Para que $a$ divida a $150$, debe estar hecho con factores de $150$, no con otros.",
        },
      ],
      title: "Múltiplos y divisores, vistos con primos",
      blocks: [
        {
          kind: "example",
          title: "150 = 2 · 3 · 5²",
          lines: [
            { math: "300 = 150 \\cdot 2 = 2^2 \\cdot 3 \\cdot 5^2", note: "múltiplo: contiene todos los de $150$" },
            { math: "30 = 2 \\cdot 3 \\cdot 5", note: "divisor: usa algunos de $150$" },
          ],
        },
        {
          kind: "compare",
          left: {
            title: "Múltiplo de un número",
            text: "Contiene **al menos todos** sus factores primos.",
            tone: "ok",
          },
          right: {
            title: "Divisor de un número",
            text: "Se forma con **algunos** de sus factores primos.",
            tone: "info",
          },
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-factor",
      type: "fill_in_blank",
      help: [
        {
          label: "Desarrolla la potencia",
          message: "$2^3 \\cdot 3^2 \\cdot 7 = 8 \\cdot 9 \\cdot 7$. Multiplica de dos en dos.",
        },
      ],
      title: "De la descomposición al número",
      question: "¿Qué número es $2^2 \\cdot 3 \\cdot 7$? (solo el número)",
      correctAnswers: ["84"],
      hint: "$2^2 = 4$; luego $4 \\cdot 3 = 12$ y $12 \\cdot 7$.",
      explanation: "$2^2 \\cdot 3 \\cdot 7 = 4 \\cdot 3 \\cdot 7 = 84$.",
    },
    {
      id: "check-divisor",
      type: "predict",
      help: [
        {
          label: "Mira los factores",
          message: "$m = 2^2 \\cdot 3$ solo tiene primos $2$ y $3$. Un divisor suyo no puede llevar otros.",
        },
        {
          label: "Y los exponentes",
          message: "Tampoco puede tener más $2$ que $m$: como mucho dos, y como mucho un $3$.",
        },
      ],
      title: "¿Divisor o no?",
      question: "Sabiendo que $m = 2^2 \\cdot 3$, ¿cuál de estos números es **divisor** de $m$?",
      mode: "choice",
      choices: [
        { id: "2-3", label: "$2 \\cdot 3$" },
        {
          id: "2-5",
          label: "$2 \\cdot 5$",
          incorrectFeedback: "El $5$ no es factor de $m$.",
        },
        {
          id: "2cubo",
          label: "$2^3$",
          incorrectFeedback: "$m$ solo tiene dos factores $2$.",
        },
        {
          id: "3-2",
          label: "$3^2$",
          incorrectFeedback: "$m$ solo tiene un factor $3$.",
        },
      ],
      correctChoiceId: "2-3",
      shuffleChoices: true,
      explanation: "$m = 12$. El divisor $2 \\cdot 3 = 6$ usa factores de $m$; los demás necesitan algún factor que $12$ no tiene.",
    },
  ],
};
