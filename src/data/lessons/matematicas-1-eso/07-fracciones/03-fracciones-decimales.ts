import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_7_SUBTITLE } from "@/data/lessons/shared";

export const fraccionesDecimalesLesson: InteractiveLesson = {
  slug: "fracciones-decimales",
  title: "3. Fracciones y números decimales",
  subtitle: TEMA_1ESO_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "division",
      type: "slide",
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
      title: "Una fracción es una división",
      blocks: [
        {
          kind: "definition",
          text: "Toda fracción equivale al **cociente** de su numerador entre su denominador: $\\frac{a}{b} = a : b$.",
        },
        {
          kind: "compare",
          left: {
            title: "Dividiendo",
            math: ["\\frac{2}{5} = 2 : 5 = 0{,}4"],
            tone: "info",
          },
          right: {
            title: "Ampliando a décimas",
            math: ["\\frac{2}{5} = \\frac{4}{10} = 0{,}4"],
            tone: "key",
          },
        },
        {
          kind: "text",
          text: "Para pasar una fracción a decimal, **divide el numerador entre el denominador**. El resultado se lee como siempre: $0{,}4$ son cuatro décimas.",
        },
      ],
      visual: { kind: "anim", scene: "division-decimal", params: { terms: ["2", "5"], places: 1 } },
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
      type: "slide",
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
      title: "Cuando la división no termina",
      blocks: [
        {
          kind: "definition",
          text: "Algunas divisiones **no terminan nunca**: el mismo resto vuelve a aparecer y las cifras se repiten. Es un decimal **periódico**: $\\frac{1}{3} = 0{,}333\\ldots = 0{,}\\overline{3}$.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\frac{1}{3} = 0{,}\\overline{3}", note: "se repite el 3" },
            { math: "\\frac{5}{12} = 0{,}41\\overline{6}", note: "se repite el 6" },
          ],
        },
        {
          kind: "warning",
          title: "Exacta o aproximada",
          text: "Si el decimal es infinito, la **fracción es el valor exacto** y el decimal solo una aproximación: $0{,}33$ no es $\\frac{1}{3}$, se le parece.",
        },
      ],
      visual: { kind: "anim", scene: "division-decimal", params: { terms: ["1", "3"], places: 3 } },
    },
    {
      id: "check-leche",
      type: "predict",
      help: [
        {
          label: "Pasa las dos cantidades a la misma forma",
          message: "Para comparar una fracción con un decimal conviene escribir las dos igual. Divide el numerador entre el denominador.",
        },
        {
          label: "¿Qué comparación hago?",
          message: "Lo que necesita la receta es una cantidad; lo que hay en la nevera, otra. Basta si lo que hay es mayor o igual que lo que hace falta.",
        },
      ],
      title: "¿Llega la leche?",
      question:
        "Una receta necesita $\\frac{3}{8}$ de litro de leche y en la nevera quedan 0,4 litros. ¿Hay leche suficiente?",
      mode: "choice",
      choices: [
        { id: "a", label: "Sí: $\\frac{3}{8} = 0{,}375$ y $0{,}375 < 0{,}4$" },
        {
          id: "b",
          label: "No: $\\frac{3}{8} = 0{,}38$ y $0{,}38$ es mayor que $0{,}4$ porque tiene más cifras",
          incorrectFeedback:
            "Tener más cifras no hace mayor a un decimal: $0{,}38 < 0{,}40$. (Y además $3 : 8$ es $0{,}375$.)",
        },
        {
          id: "c",
          label: "No: $\\frac{3}{8}$ es mayor porque $8$ es mayor que $4$",
          incorrectFeedback:
            "Comparas el denominador de una fracción con la cifra de un decimal, que no son lo mismo. Hay que pasar $\\frac{3}{8}$ a decimal, $3 : 8$.",
        },
        {
          id: "d",
          label: "No se puede saber: una es una fracción y la otra un decimal",
          incorrectFeedback:
            "Se puede: toda fracción es una división, y al hacerla sale un decimal comparable.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$3 : 8 = 0{,}375$, que es menor que $0{,}4$: sobran $0{,}025$ litros.",
    },
    {
      id: "check-calculadora",
      type: "predict",
      help: [
        {
          label: "Mira la cuenta",
          message: "Divide $1$ entre $3$ a mano: ¿qué resto aparece una y otra vez?",
        },
        {
          label: "¿Qué es más exacto?",
          message: "Un valor que no se recorta, o uno cortado tras unas pocas cifras.",
        },
      ],
      title: "Lo que muestra la calculadora",
      question:
        "Al dividir 1 entre 3 con la calculadora aparece 0,3333333, y al multiplicar ese resultado por 3 sale 0,9999999. ¿Qué explica que no salga 1?",
      mode: "choice",
      choices: [
        { id: "a", label: "El decimal es periódico y la calculadora lo corta: $\\frac{1}{3}$ exacto, multiplicado por $3$, sí da $1$" },
        {
          id: "b",
          label: "$\\frac{1}{3}$ no puede multiplicarse por $3$",
          incorrectFeedback: "Sí puede: $\\frac{1}{3}\\cdot 3 = \\frac{3}{3} = 1$. El fallo está en el decimal, no en la operación.",
        },
        {
          id: "c",
          label: "La calculadora se ha equivocado al dividir",
          incorrectFeedback:
            "La división está bien hecha; lo que ocurre es que $0{,}\\overline{3}$ tiene infinitas cifras y la pantalla solo muestra unas pocas.",
        },
        {
          id: "d",
          label: "$0{,}3333333$ es mayor que $\\frac{1}{3}$",
          incorrectFeedback:
            "Es **menor**: le faltan todas las cifras $3$ que vienen después. Por eso al triplicarlo no llega a $1$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$0{,}3333333$ es solo una aproximación de $\\frac{1}{3}$. La fracción exacta, multiplicada por $3$, es $\\frac{3}{3} = 1$.",
    },
    {
      id: "check-euros",
      type: "classify",
      help: [
        {
          label: "Un euro es la unidad",
          message: "«La cuarta parte de un euro» es $\\frac{1}{4}$ de $1$ €. Pásalo a decimal dividiendo.",
        },
        {
          label: "Empieza por los fáciles",
          message: "«Un céntimo» y «la mitad de un euro» salen sin hacer cuentas; con los demás, divide el denominador entre $100$ o usa monedas.",
        },
      ],
      title: "Fracciones de euro",
      question: "Asocia cada fracción de euro con su cantidad en euros.",
      groups: [
        { id: "075", label: "$0{,}75$ €", tone: "cobalt" },
        { id: "025", label: "$0{,}25$ €", tone: "emerald" },
        { id: "020", label: "$0{,}20$ €", tone: "amber" },
        { id: "005", label: "$0{,}05$ €", tone: "violet" },
        { id: "001", label: "$0{,}01$ €", tone: "rose" },
      ],
      items: [
        { id: "a", text: "Tres cuartos de euro", group: "075" },
        { id: "b", text: "La cuarta parte de un euro", group: "025" },
        { id: "c", text: "La quinta parte de un euro", group: "020" },
        { id: "d", text: "Un veinteavo de euro", group: "005" },
        { id: "e", text: "Un céntimo de euro", group: "001" },
      ],
      hint: "Divide $1$ € entre el denominador: $1 : 4$, $1 : 5$, $1 : 20$…",
      explanation:
        "$\\frac{3}{4} = 0{,}75$, $\\frac{1}{4} = 0{,}25$, $\\frac{1}{5} = 0{,}20$, $\\frac{1}{20} = 0{,}05$ y $\\frac{1}{100} = 0{,}01$.",
    },
    {
      id: "check-decimal",
      type: "predict",
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
      title: "Repartir bizcochos",
      question:
        "Se reparten 3 bizcochos iguales entre 8 personas, y cada una recibe $\\frac{3}{8}$ de bizcocho. ¿Cuántos bizcochos recibe cada persona, en forma decimal?",
      mode: "choice",
      calculator: true,
      choices: [
        { id: "a", label: "$0{,}375$" },
        {
          id: "b",
          label: "$2{,}666\\ldots$",
          incorrectFeedback:
            "Has dividido $8 : 3$, al revés. Se divide el numerador entre el denominador, y debe salir menos que $1$.",
        },
        {
          label: "$0{,}38$",
          id: "c",
          incorrectFeedback:
            "Es una aproximación a las centésimas, no el valor exacto: $3 : 8$ termina en las milésimas, $0{,}375$.",
        },
        {
          label: "$0{,}\\overline{3}$",
          id: "d",
          incorrectFeedback:
            "Eso es $\\frac{1}{3}$. En $\\frac{3}{8}$ el resto llega a $0$ y la división termina.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$3 : 8 = 0{,}375$: trescientas setenta y cinco milésimas.",
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
