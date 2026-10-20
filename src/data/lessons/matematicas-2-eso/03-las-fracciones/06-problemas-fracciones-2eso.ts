import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_3_SUBTITLE } from "@/data/lessons/shared";

export const problemasFracciones2esoLesson: InteractiveLesson = {
  slug: "problemas-fracciones-2eso",
  title: "6. Problemas con fracciones",
  subtitle: TEMA_2ESO_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "fraccion-de-cantidad",
      type: "slide",
      help: [
        {
          label: "Dividir y multiplicar",
          message: "Para la fracción $\\frac{a}{b}$ de una cantidad: se divide entre $b$ y se multiplica por $a$.",
        },
        {
          label: "Lo que queda",
          message: "Lo que no se ha tomado es la fracción complementaria: si se toman $\\frac{11}{15}$, quedan $\\frac{4}{15}$.",
        },
      ],
      title: "Fracción de una cantidad y lo que queda",
      blocks: [
        {
          kind: "text",
          text: "Un quiosco recibe $225$ revistas. Vende $\\frac{1}{3}$ del total por la mañana y $\\frac{2}{5}$ del total por la tarde. ¿Cuántas le quedan?",
        },
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{1}{3} + \\dfrac{2}{5} = \\dfrac{5}{15} + \\dfrac{6}{15} = \\dfrac{11}{15}", note: "fracción vendida" },
            { math: "1 - \\dfrac{11}{15} = \\dfrac{4}{15}", note: "fracción que queda" },
            { math: "\\dfrac{4}{15} \\text{ de } 225 = 225 : 15 \\cdot 4 = 60" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "hallar-total",
      type: "slide",
      help: [
        {
          label: "Si $\\frac{3}{8}$ valen 120",
          message: "Una de las ocho partes vale $120 : 3 = 40$, y el total son $8$ partes: $8 \\cdot 40 = 320$.",
        },
        {
          label: "Con ecuación",
          message: "También: $\\frac{3}{8} x = 120 \\Rightarrow x = 120 : \\frac{3}{8} = 120 \\cdot \\frac{8}{3}$.",
        },
      ],
      title: "Hallar el total conociendo una parte",
      blocks: [
        {
          kind: "text",
          text: "En un congreso, los delegados americanos son $\\frac{3}{8}$ del total y hay $120$. ¿Cuántos delegados hay?",
        },
        {
          kind: "example",
          lines: [
            { math: "\\dfrac{3}{8} \\text{ del total} = 120" },
            { math: "\\dfrac{1}{8} = 120 : 3 = 40 \\ \\Rightarrow\\  \\text{total} = 8 \\cdot 40 = 320" },
          ],
        },
        {
          kind: "rule",
          text: "Si $\\frac{a}{b}$ del total son $P$ unidades, el total es $P : \\frac{a}{b} = P \\cdot \\frac{b}{a}$.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "del-resto",
      type: "slide",
      help: [
        {
          label: "La segunda fracción actúa sobre el resto",
          message: "«$\\frac{1}{3}$ de lo que le quedaba» es $\\frac{1}{3}$ de $\\frac{1}{2}$ del total, no $\\frac{1}{3}$ del total.",
        },
        {
          label: "Suma y resta",
          message: "Lo gastado en total es $\\frac{1}{2} + \\frac{1}{6} = \\frac{2}{3}$. Lo que queda es $1 - \\frac{2}{3} = \\frac{1}{3}$.",
        },
      ],
      title: "Una fracción del resto",
      blocks: [
        {
          kind: "text",
          text: "Ana gasta $\\frac{1}{2}$ de su dinero y después $\\frac{1}{3}$ de lo que le quedaba. Le sobran $20$ €. ¿Cuánto tenía?",
        },
        {
          kind: "example",
          lines: [
            { math: "\\text{queda tras el 1.º gasto: } 1 - \\dfrac{1}{2} = \\dfrac{1}{2}" },
            { math: "\\text{2.º gasto: } \\dfrac{1}{3} \\cdot \\dfrac{1}{2} = \\dfrac{1}{6}" },
            { math: "\\text{queda: } \\dfrac{1}{2} - \\dfrac{1}{6} = \\dfrac{1}{3} = 20\\,€ \\ \\Rightarrow\\  \\text{total } 60\\,€" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "fraccion-gasto-resto", params: { a: 1, b: 2, c: 1, d: 3 } },
    },
    {
      id: "check-caramelos",
      type: "fill_in_blank",
      help: [
        {
          label: "Fracciones de fruta",
          message: "Naranja y limón: $\\frac{2}{5} + \\frac{3}{10} = \\frac{7}{10}$. El resto son de fresa: $\\frac{3}{10}$ de $20$ kg.",
        },
      ],
      title: "Caramelos",
      question: "Un confitero fabrica $20$ kg de caramelos: $\\frac{2}{5}$ son de naranja y $\\frac{3}{10}$ de limón; el resto, de fresa. ¿Cuántos kilos son de fresa? (solo el número)",
      correctAnswers: ["6"],
      explanation: "$\\frac{2}{5} + \\frac{3}{10} = \\frac{7}{10}$; quedan $\\frac{3}{10}$. $20 : 10 \\cdot 3 = 6$ kg.",
    },
    {
      id: "check-total",
      type: "predict",
      help: [
        {
          label: "Una parte",
          message: "$\\frac{2}{3}$ del dinero son $400$ €. Un tercio vale $200$ €.",
        },
      ],
      title: "Dinero ahorrado",
      question: "Lucía ha gastado $\\dfrac{2}{3}$ de sus ahorros y le quedan $150$ €. ¿Cuánto tenía al principio?",
      mode: "choice",
      choices: [
        { id: "450", label: "$450$ €" },
        { id: "100", label: "$100$ €", incorrectFeedback: "Has calculado $\\frac{2}{3}$ de $150$. Los $150$ € son lo que **queda**: $\\frac{1}{3}$ del total." },
        { id: "225", label: "$225$ €", incorrectFeedback: "Has sumado $\\frac{1}{2}$ de $150$. Si queda $\\frac{1}{3}$, el total es el triple." },
        { id: "300", label: "$300$ €", incorrectFeedback: "Comprueba: $\\frac{2}{3}$ de $300$ es $200$ y quedarían $100$, no $150$." },
      ],
      correctChoiceId: "450",
      shuffleChoices: true,
      explanation: "Quedan $1 - \\frac{2}{3} = \\frac{1}{3}$ del total: $150$ €. El total es $3 \\cdot 150 = 450$ €.",
    },
    {
      id: "check-embalse",
      type: "fill_in_blank",
      answerFormat: "fraction",
      help: [
        {
          label: "Del resto",
          message: "En julio pierde $\\frac{3}{7}$: quedan $\\frac{4}{7}$. En agosto pierde $\\frac{3}{4}$ de ese resto: conserva $\\frac{1}{4}$ de $\\frac{4}{7}$.",
        },
      ],
      title: "Un embalse",
      question: "Un embalse está lleno. En julio pierde $\\frac{3}{7}$ de su contenido y en agosto $\\frac{3}{4}$ de lo que le quedaba. ¿Qué fracción conserva a principios de septiembre?",
      correctAnswers: ["1/7"],
      explanation: "Tras julio: $\\frac{4}{7}$. En agosto conserva $\\frac{1}{4}$ de eso: $\\frac{1}{4} \\cdot \\frac{4}{7} = \\frac{1}{7}$.",
    },
  ],
};
