import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_3_SUBTITLE } from "@/data/lessons/shared";

export const aplicacionesProgresiones1bachLesson: InteractiveLesson = {
  slug: "aplicaciones-progresiones-1bach",
  title: "6. Aplicaciones de las progresiones geométricas",
  subtitle: TEMA_1BACH_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "generatriz",
      type: "slide",
      help: [{ label: "Qué ilustra", message: "Es la misma fracción generatriz que conoces, vista como suma de una serie geométrica. En la práctica sigue siendo más rápido el método de multiplicar por potencias de $10$." }],
      title: "Decimales periódicos como suma infinita",
      blocks: [
        { kind: "text", text: "Un decimal periódico es una suma infinita de trozos cada vez más pequeños:" },
        { kind: "example", title: "2,373737…", lines: [
          { math: "2{,}\\overline{37} = 2 + 0{,}37 + 0{,}0037 + 0{,}000037 + \\cdots" },
          { math: "\\text{a partir del 2.º sumando: } a_1 = \\tfrac{37}{100},\\ r = \\tfrac{1}{100}" },
          { math: "2 + \\dfrac{37/100}{1 - 1/100} = 2 + \\dfrac{37}{99} = \\dfrac{235}{99}" },
        ] },
      ],
      visual: { kind: "anim", scene: "generatriz-periodico", params: { dec: "2", per: "37" } },
    },
    {
      id: "check-generatriz",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "$0{,}\\overline{7} = 0{,}7 + 0{,}07 + 0{,}007 + \\cdots$: $a_1 = 0{,}7$ y $r = 0{,}1$." }],
      title: "Una generatriz",
      question: "¿Qué fracción es $0{,}\\overline{7} = 0{,}777\\ldots$?",
      choices: [
        { id: "a", label: "$\\dfrac{7}{9}$" },
        { id: "b", label: "$\\dfrac{7}{10}$", incorrectFeedback: "$\\frac{7}{10} = 0{,}7$ es solo el primer sumando de la serie." },
        { id: "c", label: "$\\dfrac{7}{99}$", incorrectFeedback: "Con un periodo de una cifra, el denominador lleva **un** nueve: $9$." },
        { id: "d", label: "$\\dfrac{77}{100}$", incorrectFeedback: "$\\frac{77}{100} = 0{,}77$ termina; el periodo se repite sin fin." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$S = \\dfrac{0{,}7}{1 - 0{,}1} = \\dfrac{0{,}7}{0{,}9} = \\dfrac{7}{9}$.",
    },
    {
      id: "interes",
      type: "slide",
      help: [{ label: "Compuesto frente a simple", message: "En el interés simple los intereses no generan intereses: el capital crece una cantidad fija al año (progresión aritmética). En el compuesto, sí: crece un porcentaje del total (progresión geométrica)." }],
      title: "Capitalización compuesta",
      blocks: [
        { kind: "text", text: "En la **capitalización compuesta** los intereses de cada año se suman al capital y generan intereses al año siguiente. Los capitales $C_1, C_2, \\ldots$ forman una progresión geométrica de razón $1 + r$." },
        { kind: "rule", title: "Capital tras n años", formula: "C_n = C_0\\,(1 + r)^n" },
        { kind: "example", title: "1 500 € al 4 % durante 3 años", lines: [
          { math: "C_3 = 1500\\cdot 1{,}04^3 \\approx 1\\,687{,}30\\ \\text{€}" },
        ] },
      ],
      visual: { kind: "tool", tool: "compuesto-explorador", initial: [1500, 4, 3], hint: "Sube los años y observa que la curva crece cada vez más deprisa. Cambia el rédito a negativo." },
    },
    {
      id: "check-interes",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$C_2 = 1000\\cdot 1{,}05^2$." }],
      title: "Dos años al 5 %",
      question: "Depositas $1\\,000$ € al $5\\,\\%$ con capitalización compuesta. ¿Cuántos euros tendrás tras $2$ años? (con coma decimal)",
      correctAnswers: ["1102,5", "1102.5", "1102,50", "1102.50"],
      explanation: "$C_2 = 1000\\cdot 1{,}05^2 = 1000\\cdot 1{,}1025 = 1\\,102{,}50$ €.",
    },
    {
      id: "check-modelo",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Aumentar un $5\\,\\%$ es multiplicar por $1{,}05$ cada año." }],
      title: "¿Qué tipo de progresión?",
      question: "Una población crece un $5\\,\\%$ cada año. Sus valores año a año forman una progresión…",
      choices: [
        { id: "a", label: "geométrica de razón $1{,}05$" },
        { id: "b", label: "aritmética de diferencia $5$", incorrectFeedback: "La cantidad que se suma cada año no es fija: es el $5\\,\\%$ del valor actual, que va cambiando." },
        { id: "c", label: "geométrica de razón $0{,}05$", incorrectFeedback: "La razón es el factor por el que se multiplica: $1 + 0{,}05 = 1{,}05$." },
        { id: "d", label: "ni aritmética ni geométrica", incorrectFeedback: "Cada término es el anterior por $1{,}05$: es geométrica." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Un aumento del $5\\,\\%$ multiplica por $1{,}05$: $P_{n+1} = 1{,}05\\,P_n$.",
    },
    {
      id: "check-final",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$6000\\cdot 1{,}035^5$. Redondea a euros, sin decimales." }],
      title: "Cinco años al 3,5 %",
      question: "Un empresario invierte $6\\,000$ € cinco años al $3{,}5\\,\\%$ anual compuesto. ¿Cuántos euros tiene al final, redondeados a la unidad? (solo el número)",
      correctAnswers: ["7126"],
      explanation: "$6000\\cdot 1{,}035^5 = 6000\\cdot 1{,}18769 \\approx 7\\,126{,}12$ €, que redondeado es $7\\,126$.",
    },
  ],
};
