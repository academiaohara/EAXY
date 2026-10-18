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
      help: [
        {
          label: "Una fracción es una cuenta",
          message: "La raya de fracción significa «dividido entre»: $\\frac{2}{5}$ es $2 : 5$.",
        },
        {
          label: "Si el numerador es menor",
          message: "El resultado es menor que $1$: empieza por $0{,}$ y añades ceros al numerador para seguir dividiendo.",
        },
        {
          label: "Casos que ya conoces",
          message: "$\\frac{1}{2} = 0{,}5$ y $\\frac{1}{4} = 0{,}25$ son divisiones que se saben de memoria.",
        },
      ],
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
      help: [
        {
          label: "¿Cuánto vale cada casilla?",
          message: "La unidad está dividida en $10$ casillas iguales, así que cada una vale una décima.",
        },
        {
          label: "De decimal a fracción",
          message: "Lee el número en voz alta: «cero coma tres» son «tres décimas». La lectura te da la fracción.",
        },
      ],
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
      help: [
        {
          label: "¿Por qué el decimal no es exacto?",
          message: "Porque nunca acaba: al cortarlo pierdes lo que viene después.",
        },
        {
          label: "¿Cuándo uso la fracción?",
          message: "Cuando necesitas el valor exacto. El decimal se usa si una aproximación basta.",
        },
        {
          label: "¿Qué significa el arco?",
          message: "Que esas cifras se repiten sin fin: $0{,}\\overline{3} = 0{,}333\\ldots$",
        },
      ],
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
      help: [
        {
          label: "Dos caminos al mismo número",
          message: "Dividir $2 : 5$ y ampliar $\\frac{2}{5}$ a décimas dan el mismo resultado.",
        },
        {
          label: "¿Por qué décimas?",
          message: "Porque $5 \\cdot 2 = 10$: multiplicando por $2$ llegas a denominador $10$, y con denominador $10$ el decimal se lee directamente.",
        },
      ],
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
      help: [
        {
          label: "¿Qué es una fracción?",
          message: "Una división: el numerador entre el denominador.",
          math: ["\\frac{3}{8} = 3 : 8"],
        },
        {
          label: "Si el numerador es menor, ¿cómo divido?",
          message: "Pon $0$ en el cociente y la coma, y añade un cero al $3$ para dividir $30$ entre $8$. Sigue añadiendo ceros hasta que el resto sea $0$.",
        },
        {
          label: "Quiero saber si es razonable",
          message: "$\\frac{3}{8}$ es menos que la mitad ($\\frac{4}{8}$) y más que un cuarto ($\\frac{2}{8}$): el decimal queda entre $0{,}25$ y $0{,}5$.",
        },
      ],
      title: "Pasa a decimal",
      question: "Expresa $\\frac{3}{8}$ como número decimal (usa coma).",
      correctAnswers: ["0,375", "0.375"],
      explanation: "$3 : 8 = 0{,}375$.",
    },
    {
      id: "check-13",
      type: "classify",
      help: [
        {
          label: "¿Cómo sé si una división termina?",
          message: "Haz la división: si el resto llega a $0$, es exacta. Si un resto se repite, las cifras se repiten sin fin.",
        },
        {
          label: "Un truco con el denominador",
          message: "Simplifica la fracción y mira el denominador: si solo tiene factores $2$ y $5$, el decimal termina. Si tiene otro primo ($3$, $7$…), es periódico.",
          branches: [
            {
              label: "Ejemplos",
              message: "$\\frac{1}{4}$: $4 = 2^2$ → termina. $\\frac{1}{6}$: $6 = 2 \\cdot 3$ → periódico. Ojo: $\\frac{3}{6}$ se simplifica a $\\frac{1}{2}$ y termina.",
            },
          ],
        },
      ],
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
