import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_2_SUBTITLE } from "@/data/lessons/shared";

export const periodicosMixtosRacionales4esoLesson: InteractiveLesson = {
  slug: "periodicos-mixtos-racionales-4eso",
  title: "3. Periódicos mixtos y números racionales",
  subtitle: TEMA_4ESO_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "mixtos",
      type: "slide",
      help: [
        {
          label: "Primer paso extra",
          message: "En un mixto el periodo no empieza tras la coma. Multiplicamos primero para **convertirlo en puro**: así volvemos al caso anterior.",
        },
        {
          label: "Los dos multiplicadores",
          message: "Uno desplaza la coma hasta justo antes del periodo ($10^a$, con $a$ cifras sin repetir) y otro hasta después de un periodo ($10^{a+p}$). Su resta cancela la cola.",
        },
      ],
      title: "Periódicos mixtos: dos multiplicaciones",
      blocks: [
        {
          kind: "text",
          text: "Con cifras antes del periodo hay que usar **dos** multiplicaciones: una para llevar la coma justo delante del periodo y otra para llevarla **un periodo más allá**. La resta cancela la cola.",
        },
        {
          kind: "rule",
          title: "Mixto con $a$ cifras sin repetir y periodo de $p$",
          text: "Denominador: $p$ nueves seguidos de $a$ ceros. Numerador: (todas las cifras hasta el final del periodo) $-$ (cifras hasta antes del periodo).",
        },
      ],
      visual: { kind: "anim", scene: "generatriz-periodico", params: { dec: "1,2", per: "34" } },
    },
    {
      id: "atajo",
      type: "slide",
      help: [
        {
          label: "Ejemplo del atajo",
          message: "$2{,}1\\overline{3}$: todas las cifras hasta el periodo $= 213$; hasta antes del periodo $= 21$. Numerador $213 - 21 = 192$. Denominador: un $9$ (periodo de una cifra) y un $0$ (una cifra sin repetir) $= 90$.",
        },
      ],
      title: "El atajo para mixtos",
      blocks: [
        {
          kind: "example",
          title: "$2{,}1\\overline{3}$",
          lines: [
            { math: "N = \\dfrac{213 - 21}{90} = \\dfrac{192}{90} = \\dfrac{32}{15}" },
          ],
        },
        {
          kind: "text",
          text: "Es el mismo resultado que sale de la fracción original del tema anterior: $\\frac{32}{15} = 2{,}1\\overline{3}$. Ida y vuelta.",
        },
      ],
      visual: { kind: "tool", tool: "generatriz-explorador", params: { a: 2, b: 1, c: 3 }, initial: [1, 1], hint: "Cambia el periodo y las cifras sin repetir: comprueba que el denominador cambia según la regla." },
    },
    {
      id: "check-mixto",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Cifras antes del periodo",
          message: "En $N = 0{,}13\\overline{5}$ hay dos cifras sin repetir ($13$) y un periodo de una cifra ($5$). Numerador $135 - 13 = 122$. Denominador $900$.",
        },
      ],
      title: "Un mixto",
      question: "Halla la fracción generatriz de $0{,}13\\overline{5}$ y simplifícala.",
      correctAnswers: ["61/450"],
      explanation: "$1000N - 100N = 135 - 13 = 122$, así que $900N = 122$ y $N = \\frac{122}{900} = \\frac{61}{450}$.",
    },
    {
      id: "check-mixto-2",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Atajo",
          message: "$0{,}0\\overline{5}$: una cifra sin repetir ($0$) y periodo $5$. Numerador $05 - 0 = 5$, denominador $90$.",
        },
      ],
      title: "Con un cero delante del periodo",
      question: "Halla la fracción de $0{,}0\\overline{5}$ y simplifícala.",
      correctAnswers: ["1/18"],
      explanation: "$100N - 10N = 5{,}\\overline{5} - 0{,}\\overline{5} = 5$, así que $90N = 5$ y $N = \\frac{5}{90} = \\frac{1}{18}$.",
    },
    {
      id: "racionales",
      type: "slide",
      help: [
        {
          label: "Infinitas cifras no basta",
          message: "Tener infinitas cifras decimales no es lo que impide ser racional: $0{,}333\\ldots$ tiene infinitas y es $\\frac{1}{3}$. Lo que cuenta es **que se repitan** de forma periódica.",
        },
        {
          label: "Ejemplos",
          message: "$3{,}101001000100001\\ldots$ tiene un patrón (cada vez un cero más entre dos unos), pero **no es periódico**: la parte que se repite no es siempre la misma.",
        },
      ],
      title: "Racionales: los que admiten fracción",
      blocks: [
        {
          kind: "definition",
          text: "Un número es **racional** si se puede escribir como fracción de enteros. Son exactamente los de **desarrollo decimal exacto o periódico**.",
        },
        {
          kind: "compare",
          left: { title: "Racionales", text: "Exactos y periódicos: $0{,}25$, $1{,}\\overline{3}$, $2{,}1\\overline{6}$.", tone: "ok" },
          right: { title: "No racionales", text: "Infinitas cifras **sin periodo**: $3{,}101001000\\ldots$ o $\\pi = 3{,}14159265\\ldots$", tone: "warn" },
        },
        {
          kind: "text",
          text: "Los no racionales son los **irracionales**; son el tema $3$.",
        },
      ],
      visual: { kind: "tool", tool: "decimal-explorador", params: { n: 1, d: 7 }, hint: "Busca una fracción cuyo decimal no acabe ni se repita. No la hay: todas son exactas o periódicas." },
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [
        {
          label: "Cómo decidir",
          message: "Si el decimal acaba o tiene un bloque que se repite siempre igual → racional. Si tiene infinitas cifras sin repetición regular → no racional.",
        },
        {
          label: "El número π",
          message: "$\\pi = 3{,}14159265\\ldots$ no es periódico. Aproximarlo por $3{,}1416$ o $\\frac{22}{7}$ da un número racional, pero **no es** $\\pi$.",
        },
      ],
      title: "¿Racional o no?",
      question: "Clasifica cada número según se pueda o no escribir como fracción.",
      groups: [
        { id: "si", label: "Racional (tiene fracción)", tone: "emerald" },
        { id: "no", label: "No racional", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$6{,}\\overline{78}$", group: "si" },
        { id: "b", text: "$5{,}983$", group: "si" },
        { id: "c", text: "$0{,}00\\overline{4}$", group: "si" },
        { id: "d", text: "$3{,}101001000100001\\ldots$ (un cero más cada vez)", group: "no" },
        { id: "e", text: "$\\pi = 3{,}14159265359\\ldots$", group: "no" },
        { id: "f", text: "$3{,}1416$ (como número, solo esas cifras)", group: "si" },
      ],
      hint: "Un decimal que acaba es siempre racional, aunque se parezca a un número irracional.",
    },
    {
      id: "check-gen",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Multiplica por 100",
          message: "$N = 0{,}\\overline{27}$, $100N = 27{,}\\overline{27}$. Resta: $99N = 27$.",
        },
      ],
      title: "La generatriz de 0,27",
      question: "Halla la fracción irreducible de $0{,}\\overline{27}$.",
      correctAnswers: ["3/11"],
      explanation: "$99N = 27$ y $N = \\frac{27}{99} = \\frac{3}{11}$.",
    },
  ],
};
