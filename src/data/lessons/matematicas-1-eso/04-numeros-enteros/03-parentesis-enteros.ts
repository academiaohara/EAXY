import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4_SUBTITLE } from "@/data/lessons/shared";

export const parentesisEnterosLesson: InteractiveLesson = {
  slug: "parentesis-enteros",
  title: "3. Paréntesis en sumas y restas",
  subtitle: TEMA_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "un-numero",
      type: "slide",
      title: "Un número entre paréntesis: sumar o restar",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Sumar un entero",
            text: "Añadir una **ganancia** sube; añadir una **deuda** baja. Se quita el paréntesis y el número **conserva su signo**.",
            math: ["8 + (+5) = 8 + 5 = 13", "8 + (-2) = 8 - 2 = 6"],
            tone: "ok",
          },
          right: {
            title: "Restar un entero",
            text: "Quitar una **ganancia** baja; quitar una **deuda** sube. Se quita el paréntesis y el número **cambia de signo**.",
            math: ["8 - (+5) = 8 - 5 = 3", "8 - (-2) = 8 + 2 = 10"],
            tone: "warn",
          },
        },
        {
          kind: "rule",
          title: "Restar es sumar el opuesto",
          formula: "a - b = a + (-b)",
        },
      ],
      visual: { kind: "anim", scene: "resta-opuesto", params: { a: 8, b: -2 } },
    },
    {
      id: "check-resta",
      type: "predict",
      title: "Anular un cargo",
      question:
        "La caja de un local tiene $+120$ € y se **anula** (se resta) un cargo de $-35$ € que estaba registrado. ¿Qué operación y resultado son correctos?",
      mode: "choice",
      choices: [
        { id: "ok", label: "$120 - (-35) = 120 + 35 = 155$" },
        {
          id: "deja",
          label: "$120 - (-35) = 120 - 35 = 85$",
          incorrectFeedback:
            "Has dejado el signo del $35$. Al **restar** un entero, su signo se cambia: restar $-35$ es sumar $+35$.",
        },
        {
          id: "suma",
          label: "$120 + (-35) = 85$",
          incorrectFeedback: "Eso es **sumar** $-35$, es decir, añadir el cargo. El enunciado lo anula: se resta.",
        },
        {
          id: "neg",
          label: "$120 - (-35) = -155$",
          incorrectFeedback:
            "Anular un cargo no puede dejar la caja en negativo: restar una deuda hace que la caja **suba**.",
        },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation:
        "$120 - (-35) = 120 + 35 = 155$: retirar una deuda equivale a ganar ese importe.",
    },
    {
      id: "mas-delante",
      type: "slide",
      title: "Con + delante, los signos se quedan",
      blocks: [
        {
          kind: "story",
          text: "Un paquete de movimientos bancarios (**un ingreso de 3 €, un pago de 6 € y un ingreso de 5 €**) se abona a tu cuenta tal cual.",
          src: "/lesson/enteros/caja-movimientos.png",
          alt: "Caja de cartón con billetes y recibos asomando",
        },
        {
          kind: "definition",
          text: "El paréntesis **empaqueta** varios términos en un solo bloque. Con un $+$ delante, el bloque entra entero: cada término **conserva su signo**.",
        },
        {
          kind: "example",
          lines: [
            { math: "+(+3 - 6 + 5) = 3 - 6 + 5", note: "se quita el paréntesis sin cambiar nada" },
            { math: "3 - 6 + 5 = 2", note: "y se calcula como siempre" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "parentesis-signos", params: { sign: "+", nums: [3, -6, 5] } },
    },
    {
      id: "menos-delante",
      type: "slide",
      title: "Con − delante, todos los signos cambian",
      blocks: [
        {
          kind: "definition",
          text: "Con un $-$ delante, **quitas el bloque entero**: cada término de dentro se cambia por su **opuesto**.",
        },
        {
          kind: "example",
          lines: [
            { math: "-(8 - 6 - 5) = -8 + 6 + 5", note: "los tres signos cambian" },
            { math: "-8 + 6 + 5 = 3", note: "y se calcula como siempre" },
          ],
        },
        {
          kind: "warning",
          title: "El error típico",
          text: "Cambiar solo el primer signo. $-(8 - 6)$ es $-8 + 6$, **no** $-8 - 6$: el signo de delante afecta a **todo** lo de dentro.",
        },
      ],
      visual: { kind: "anim", scene: "parentesis-signos", params: { sign: "-", nums: [8, -6, -5] } },
    },
    {
      id: "check-grupo",
      type: "predict",
      title: "Quitar un grupo",
      question:
        "El saldo es $20$ € y se anula un movimiento formado por un ingreso de $7$ € y un pago de $12$ €. Es decir: $20 - (7 - 12)$. ¿Cuál es el saldo?",
      mode: "choice",
      choices: [
        { id: "25", label: "$25$ €" },
        {
          id: "1",
          label: "$1$ €",
          incorrectFeedback:
            "Has quitado el paréntesis sin cambiar los signos: $20 - 7 - 12$. Con un $-$ delante, **cada** signo de dentro se invierte.",
        },
        {
          id: "15",
          label: "$15$ €",
          incorrectFeedback:
            "Has calculado bien el paréntesis ($7 - 12 = -5$), pero después has hecho $20 - 5$. Restar $-5$ es **sumar** $5$.",
        },
        {
          id: "39",
          label: "$39$ €",
          incorrectFeedback:
            "Has pasado los dos términos a positivo. El $+7$ pasa a $-7$ y el $-12$ pasa a $+12$: $20 - 7 + 12$.",
        },
      ],
      correctChoiceId: "25",
      shuffleChoices: true,
      explanation:
        "$20 - (7 - 12) = 20 - 7 + 12 = 25$. También: $20 - (-5) = 20 + 5 = 25$.",
    },
    {
      id: "anidados",
      type: "slide",
      title: "Paréntesis dentro de paréntesis",
      blocks: [
        {
          kind: "steps",
          title: "Siempre de dentro hacia fuera",
          items: [
            "Localiza el paréntesis **más interno**.",
            "Opera dentro de él, **o bien** quítalo aplicando la regla del signo de delante.",
            "Repite con el siguiente nivel hasta que no quede ninguno.",
          ],
        },
        {
          kind: "warning",
          title: "Corchetes",
          text: "Los corchetes $\\left[\\;\\right]$ son paréntesis más grandes: se tratan exactamente igual.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          titles: ["Operar dentro", "Quitar paréntesis"],
          expr: [
            { tokens: ["12", "−", "[8", "−", "(7", "−", "10)", "+", "(2", "−", "6)]"], active: [4, 6], note: "lo más interno: $7 - 10 = -3$." },
            { tokens: ["12", "−", "[8", "−", "(−3)", "+", "(2", "−", "6)]"], active: [6, 8], fresh: [4, 4], note: "el otro: $2 - 6 = -4$." },
            { tokens: ["12", "−", "[8", "−", "(−3)", "+", "(−4)]"], active: [2, 6], fresh: [6, 6], note: "quitamos paréntesis y calculamos dentro: $8 + 3 - 4 = 7$." },
            { tokens: ["12", "−", "7"], active: [0, 2], fresh: [2, 2], note: "$12 - 7 = 5$." },
            { tokens: ["5"], fresh: [0, 0], note: "resultado: $5$." },
          ],
          expr2: [
            { tokens: ["12", "−", "[8", "−", "(7", "−", "10)", "+", "(2", "−", "6)]"], active: [4, 6], note: "$-(7 - 10)$: cambian los signos de dentro." },
            { tokens: ["12", "−", "[8", "−", "7", "+", "10", "+", "2", "−", "6]"], active: [2, 10], note: "el corchete lleva $-$ delante: cambia todo." },
            { tokens: ["12", "−", "8", "+", "7", "−", "10", "−", "2", "+", "6"], active: [0, 10], note: "agrupamos: $12 + 7 + 6 = 25$ y $8 + 10 + 2 = 20$." },
            { tokens: ["25", "−", "20"], active: [0, 2], fresh: [0, 0], note: "$25 - 20 = 5$." },
            { tokens: ["5"], fresh: [0, 0], note: "resultado: $5$." },
          ],
        },
      },
      arrange: "visual-top",
    },
    {
      id: "check-anidado",
      type: "predict",
      title: "Dos niveles",
      question:
        "Calcula $10 - [3 - (5 - 9)]$ quitando los paréntesis de dentro hacia fuera. ¿Qué resultado sale?",
      mode: "choice",
      choices: [
        { id: "3", label: "$3$" },
        {
          id: "21",
          label: "$21$",
          incorrectFeedback:
            "No has cambiado los signos del paréntesis interior: $3 - (5 - 9)$ es $3 - 5 + 9$, no $3 - 5 - 9$.",
        },
        {
          id: "17",
          label: "$17$",
          incorrectFeedback:
            "El corchete lleva un $-$ delante ($10 - [\\dots]$), así que sus signos también cambian. Has hecho $10 + [3 - 5 + 9]$.",
        },
        {
          id: "11",
          label: "$11$",
          incorrectFeedback:
            "Has cambiado solo el primer signo del corchete ($10 - 3$) y has dejado el resto. El $-$ de delante afecta a **todos** los términos.",
        },
      ],
      correctChoiceId: "3",
      shuffleChoices: true,
      explanation:
        "$10 - [3 - (5 - 9)] = 10 - [3 - 5 + 9] = 10 - 3 + 5 - 9 = 3$. Con la otra vía: $5 - 9 = -4$; $3 - (-4) = 7$; $10 - 7 = 3$.",
    },
  ],
};
