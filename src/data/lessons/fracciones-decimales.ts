import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_7_SUBTITLE } from "@/data/lessons/shared";

export const fraccionesDecimalesLesson: InteractiveLesson = {
  slug: "fracciones-decimales",
  title: "3. Fracciones y números decimales",
  subtitle: TEMA_1ESO_7_SUBTITLE,
  steps: [
    {
      id: "division",
      type: "concept",
      title: "Fracción = división",
      content: [
        "Toda fracción equivale al **cociente** del numerador entre el denominador.",
        "$\\frac{2}{5} = 2 : 5 = 0{,}4$ (cuatro décimas).",
        "Para pasar una fracción a decimal, **divide** numerador entre denominador.",
      ],
      visuals: [
        {
          kind: "equation-anatomy",
          title: "Equivalencia",
          parts: [
            { tex: "\\frac{2}{5}", label: "Fracción", tone: "cobalt" },
            { tex: "=", label: "" },
            { tex: "2 : 5", label: "División", tone: "emerald" },
            { tex: "= 0{,}4", label: "Decimal", tone: "amber" },
          ],
        },
        {
          kind: "number-line",
          title: "En la recta entre $0$ y $1$",
          min: 0,
          max: 1,
          step: 0.1,
          points: [{ value: 0.4, label: "\\frac{2}{5}", tone: "cobalt" }],
          caption: "Cuatro décimas = dos quintos del segmento unidad.",
        },
      ],
    },
    {
      id: "marca-decimas",
      type: "fraction_pick",
      title: "Décimas en la cuadrícula",
      question:
        "La cuadrícula es la unidad, dividida en $10$ casillas iguales. Colorea $0{,}3$ de la unidad.",
      shape: "grid",
      numerator: 3,
      denominator: 10,
      columns: 5,
      itemLabel: "casilla",
      hint: "Cada casilla es una décima: $\\frac{1}{10} = 0{,}1$. ¿Cuántas décimas tiene $0{,}3$?",
      explanation: "$0{,}3$ son tres décimas: $0{,}3 = \\frac{3}{10}$, es decir, $3$ de las $10$ casillas.",
    },
    {
      id: "periodicos",
      type: "concept",
      title: "Decimales periódicos",
      content: [
        "Algunas divisiones **no terminan**: $\\frac{1}{3} = 0{,}333\\ldots = 0{,}\\overline{3}$.",
        "En esos casos la **fracción es más exacta** que el decimal truncado.",
        "$\\frac{5}{12} = 0{,}416666\\ldots$; si pides dos decimales, aproximas.",
      ],
      warning:
        "No confundas fracción exacta con decimal aproximado cuando el cociente es infinito.",
    },
    {
      id: "anim-25",
      type: "animated_solution",
      title: "Ejemplo — $\\frac{2}{5}$ en la recta",
      content: ["Representa $\\frac{2}{5}$ como decimal y compáralo con $\\frac{4}{10}$."],
      frames: [
        { caption: "División:", math: "2 : 5 = 0{,}4" },
        { caption: "Fracción equivalente:", math: "\\frac{2}{5} = \\frac{4}{10} = 0{,}4" },
      ],
    },
    {
      id: "check-decimal",
      type: "fill_in_blank",
      title: "Pasa a decimal",
      question: "Expresa $\\frac{3}{8}$ como número decimal (usa coma).",
      correctAnswers: ["0,375", "0.375"],
      explanation: "$3 : 8 = 0{,}375$.",
    },
    {
      id: "check-13",
      type: "classify",
      title: "¿Exacto o periódico?",
      question:
        "Haz mentalmente (o en papel) cada división y clasifica la fracción según su expresión decimal.",
      groups: [
        { id: "exacto", label: "Decimal exacto", tone: "emerald" },
        { id: "periodico", label: "Decimal periódico", tone: "violet" },
      ],
      items: [
        { id: "a", text: "$\\frac{1}{3}$", group: "periodico" },
        { id: "b", text: "$\\frac{2}{5}$", group: "exacto" },
        { id: "c", text: "$\\frac{3}{8}$", group: "exacto" },
        { id: "d", text: "$\\frac{5}{12}$", group: "periodico" },
        { id: "e", text: "$\\frac{1}{4}$", group: "exacto" },
        { id: "f", text: "$\\frac{2}{9}$", group: "periodico" },
      ],
      hint: "Divide numerador entre denominador: ¿la división llega a resto $0$ o una cifra se repite sin fin?",
      explanation:
        "$\\frac{2}{5} = 0{,}4$, $\\frac{3}{8} = 0{,}375$ y $\\frac{1}{4} = 0{,}25$ terminan. $\\frac{1}{3} = 0{,}\\overline{3}$, $\\frac{5}{12} = 0{,}41\\overline{6}$ y $\\frac{2}{9} = 0{,}\\overline{2}$ no terminan nunca.",
    },
  ],
};
