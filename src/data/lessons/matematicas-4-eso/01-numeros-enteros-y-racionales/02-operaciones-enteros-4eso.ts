import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_1_SUBTITLE } from "@/data/lessons/shared";

export const operacionesEnteros4esoLesson: InteractiveLesson = {
  slug: "operaciones-enteros-4eso",
  title: "2. Operaciones con números enteros",
  subtitle: TEMA_4ESO_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "suma-recta",
      type: "slide",
      help: [
        {
          label: "Mismo signo",
          message: "Si los dos tienen el mismo signo, las distancias se acumulan: $(-3) + (-8) = -11$.",
        },
        {
          label: "Signo distinto",
          message: "Si tienen distinto signo, una parte «deshace» la otra y queda la diferencia de valores absolutos, con el signo del que tenga mayor valor absoluto.",
        },
      ],
      title: "Sumar: dos saltos en la recta",
      blocks: [
        {
          kind: "rule",
          title: "Suma de enteros",
          text: "Mismo signo: **se suman** los valores absolutos y se conserva el signo. Signo distinto: **se restan** y se pone el signo del que tenga **mayor valor absoluto**.",
        },
        {
          kind: "example",
          lines: [
            { math: "(-3) + (-8) = -11" },
            { math: "(-3) + (+8) = +5" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "suma-recta", params: { a: -3, b: 8 } },
    },
    {
      id: "fichas",
      type: "slide",
      help: [
        {
          label: "Anular parejas",
          message: "Cada ficha $+1$ con una $-1$ suma $0$. Lo que queda sin pareja es el resultado.",
        },
      ],
      title: "Otra mirada: fichas que se anulan",
      blocks: [
        {
          kind: "text",
          text: "Piensa en fichas $+1$ (ingresos) y $-1$ (deudas). Cada pareja $+1$ y $-1$ **se anula**. Lo que sobra es el resultado.",
        },
        {
          kind: "example",
          lines: [
            { math: "(+7) + (-5) = +2", note: "5 parejas se anulan y sobran 2 fichas positivas" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "fichas-opuestos", params: { a: 7, b: -5 } },
    },
    {
      id: "check-suma-larga",
      type: "fill_in_blank",
      help: [
        {
          label: "Agrupa por signos",
          message: "Suma por un lado los positivos ($7 + 15 + 3$) y por otro los negativos ($5 + 11 + 17$), y resta.",
        },
      ],
      title: "Una suma larga",
      question: "Calcula $7 - 5 - 11 + 15 - 17 + 3$ (escribe el número con su signo).",
      correctAnswers: ["-8", "−8"],
      explanation: "$(7 + 15 + 3) - (5 + 11 + 17) = 25 - 33 = -8$.",
    },
    {
      id: "resta-opuesto",
      type: "slide",
      help: [
        {
          label: "Restar es sumar el opuesto",
          message: "$a - b = a + (-b)$. Así, $3 - (-5) = 3 + 5 = 8$.",
        },
      ],
      title: "Restar es sumar el opuesto",
      blocks: [
        {
          kind: "definition",
          text: "Restar un entero equivale a **sumar su opuesto**: $a - b = a + (-b)$.",
        },
        {
          kind: "example",
          lines: [
            { math: "3 - (+5) = 3 + (-5) = -2" },
            { math: "3 - (-5) = 3 + (+5) = 8", note: "quitar una deuda es ganar" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "resta-opuesto", params: { a: 3, b: -5 } },
    },
    {
      id: "parentesis-menos",
      type: "slide",
      help: [
        {
          label: "Cambian todos",
          message: "El signo menos delante del paréntesis afecta a **todos** los términos de dentro, no solo al primero.",
        },
      ],
      title: "Quitar paréntesis",
      blocks: [
        {
          kind: "rule",
          title: "Paréntesis precedido de signo",
          text: "Con **+** delante, los términos se quedan igual. Con **−** delante, **cambian todos de signo**.",
        },
        {
          kind: "example",
          lines: [
            { math: "3 - 5 + 8 - (4 - 13 + 6 - 11)" },
            { math: "= 3 - 5 + 8 - 4 + 13 - 6 + 11" },
            { math: "= (3 + 8 + 13 + 11) - (5 + 4 + 6) = 35 - 15 = 20" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "parentesis-signos", params: { sign: "-", nums: [4, -13, 6, -11] } },
    },
    {
      id: "check-parentesis",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Cambia todos los signos",
          message: "$-(4 - 13 + 6 - 11) = -4 + 13 - 6 + 11$. Suma después por grupos.",
        },
      ],
      title: "¿Qué resulta al quitar el paréntesis?",
      question: "Al quitar el paréntesis en $10 - (6 - 9 + 2)$, ¿qué expresión se obtiene?",
      choices: [
        { id: "a", label: "$10 - 6 + 9 - 2$" },
        { id: "b", label: "$10 - 6 - 9 + 2$", incorrectFeedback: "El menos solo ha cambiado el signo del primer término. Debe cambiar los tres." },
        { id: "c", label: "$10 + 6 - 9 + 2$", incorrectFeedback: "Se han dejado los signos igual, como si delante hubiera un $+$." },
        { id: "d", label: "$10 - 6 + 9 + 2$", incorrectFeedback: "El $+2$ también debe cambiar a $-2$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "El signo $-$ delante invierte los tres términos: $+6 \\to -6$, $-9 \\to +9$, $+2 \\to -2$. Resultado: $10 - 6 + 9 - 2 = 11$.",
    },
    {
      id: "producto",
      type: "slide",
      help: [
        {
          label: "Contar negativos",
          message: "Con varios factores, cuenta los negativos: cantidad par → positivo; impar → negativo.",
        },
      ],
      title: "Multiplicar: la regla de los signos",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "(+)\\cdot(+) = +" },
            { tex: "(-)\\cdot(-) = +" },
            { tex: "(+)\\cdot(-) = -" },
            { tex: "(-)\\cdot(+) = -" },
          ],
        },
        {
          kind: "text",
          text: "Misma regla para **dividir**: signos iguales dan positivo, signos distintos dan negativo.",
        },
      ],
      visual: { kind: "anim", scene: "producto-signos", params: { a: 3, b: 5 } },
    },
    {
      id: "combinada",
      type: "slide",
      help: [
        {
          label: "Orden",
          message: "Primero los paréntesis (de dentro hacia fuera), después multiplicaciones y divisiones, al final sumas y restas.",
        },
      ],
      title: "Operaciones combinadas",
      blocks: [
        {
          kind: "steps",
          title: "Orden de las operaciones",
          items: [
            "Paréntesis y corchetes, de dentro hacia fuera.",
            "Potencias.",
            "Multiplicaciones y divisiones, de izquierda a derecha.",
            "Sumas y restas.",
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["[(1−4)", "−", "(5−3)", "−", "(−6)]", "·", "[−3+(−7)]"], active: [0, 4], note: "dentro del primer corchete, primero los paréntesis." },
            { tokens: ["[(−3)", "−", "2", "+", "6]", "·", "[−3+(−7)]"], active: [0, 4], note: "$-3 - 2 + 6 = 1$." },
            { tokens: ["1", "·", "[−3+(−7)]"], active: [2, 2], note: "ahora el segundo corchete: $-3 + (-7) = -10$." },
            { tokens: ["1", "·", "(−10)"], active: [0, 2], note: "signos distintos: negativo." },
            { tokens: ["−10"], fresh: [0, 0], note: "resultado final." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-combinada",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Por partes",
          message: "$-3(4-2) = -6$; $-4(3-8) = +20$; $[4 \\cdot (-5)] \\cdot [(-3) \\cdot 11] = (-20)(-33) = 660$, que se resta.",
        },
      ],
      title: "Una combinada con corchetes",
      question: "Calcula $-3(4 - 2) - 4(3 - 8) - [4 \\cdot (-5)] \\cdot [(-3) \\cdot 11]$. (escribe el número con su signo)",
      correctAnswers: ["-646", "−646"],
      explanation: "$-6 + 20 - (-20)(-33) = 14 - 660 = -646$.",
    },
    {
      id: "check-congelador",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [
        {
          label: "Cuánto debe bajar",
          message: "De $16$ a $-12$ la temperatura baja $16 - (-12) = 28$ grados. Cada $3$ minutos baja $2$ grados.",
        },
      ],
      title: "Un congelador",
      question: "La temperatura de un congelador baja $2\\,°\\text{C}$ cada $3$ minutos hasta llegar a $-18\\,°\\text{C}$. Al encenderlo, estaba a $16\\,°\\text{C}$. ¿Cuántos minutos tarda en llegar a $-12\\,°\\text{C}$? (solo el número)",
      correctAnswers: ["42"],
      explanation: "Debe bajar $16 - (-12) = 28$ grados. Son $28 : 2 = 14$ bajadas de $2$ grados, de $3$ minutos cada una: $14 \\cdot 3 = 42$ minutos.",
    },
    {
      id: "check-absoluto-combinado",
      type: "fill_in_blank",
      help: [
        {
          label: "De dentro hacia fuera",
          message: "$5 \\cdot (-8) = -40$ y su valor absoluto es $40$. Después $3 - 3\\cdot(-7) = 24$ y resta $40$.",
        },
      ],
      title: "Valor absoluto y combinada",
      question: "Calcula $|3 - 3 \\cdot (-7) - |5 \\cdot (-8)||$.",
      correctAnswers: ["16", "+16"],
      explanation: "$|5 \\cdot (-8)| = 40$; $3 + 21 - 40 = -16$; $|-16| = 16$.",
    },
  ],
};
