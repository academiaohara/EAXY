import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_8_SUBTITLE } from "@/data/lessons/shared";

export const problemasFamososCcss1Lesson: InteractiveLesson = {
  slug: "problemas-famosos-ccss1",
  title: "12. Problemas famosos de probabilidad",
  subtitle: TEMA_CCSS1_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "galileo",
      type: "slide",
      help: [{ label: "Resultados ordenados", message: "(3, 3, 3) es un único resultado, pero 6 + 2 + 2 puede salir como (6, 2, 2), (2, 6, 2) o (2, 2, 6): tres resultados distintos." }],
      title: "Galileo y los tres dados",
      blocks: [
        { kind: "text", text: "Galileo se preguntó por qué al tirar **tres dados** la suma $10$ sale más que la suma $9$, si las dos tienen $6$ descomposiciones. La clave es que las descomposiciones **no son igual de probables**: hay que contar los resultados ordenados." },
        { kind: "text", text: "Suma $9$: $25$ casos de $216$. Suma $10$: $27$ casos de $216$." },
      ],
      visual: { kind: "tool", tool: "azar-famoso-explorador", initial: [2, 0, 0, 10], hint: "Cambia la suma de los tres dados: cada descomposición cuenta tantos resultados como órdenes distintos tiene." },
    },
    {
      id: "check-galileo",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$(4, 3, 3)$: 3 órdenes; $(4, 4, 2)$: 3; $(5, 3, 2)$: 6; $(5, 4, 1)$: 6; $(6, 2, 2)$: 3; $(6, 3, 1)$: 6." }],
      title: "Casos de la suma 10",
      question: "¿De cuántos resultados ordenados (de $216$) se obtiene suma $10$ con tres dados? (solo el número)",
      correctAnswers: ["27"],
      explanation: "$3 + 3 + 6 + 6 + 3 + 6 = 27$, frente a los $25$ de la suma $9$. Por eso $P(10) = \\frac{27}{216}$ es algo mayor que $P(9) = \\frac{25}{216}$.",
    },
    {
      id: "mere",
      type: "slide",
      help: [{ label: "Suceso contrario", message: "«Al menos una vez» es difícil de contar directamente; «ninguna vez» es un producto de probabilidades independientes." }],
      title: "El Caballero de la Meré",
      blocks: [
        { kind: "text", text: "Apostar a sacar **al menos un 6 en 4 tiradas** de un dado era favorable, pero **al menos un 6 doble en 24 tiradas** de dos dados no lo era. No es una proporcionalidad ($6 : 4 \\neq 36 : 24$ en probabilidad)." },
        { kind: "example", title: "Con el suceso contrario", lines: [
          { math: "P(\\text{al menos un } 6\\text{ en } 4) = 1 - \\left(\\dfrac{5}{6}\\right)^4 \\approx 0{,}5177 > 0{,}5" },
          { math: "P(\\text{al menos un 6 doble en } 24) = 1 - \\left(\\dfrac{35}{36}\\right)^{24} \\approx 0{,}4914 < 0{,}5" },
        ] },
      ],
      visual: { kind: "tool", tool: "azar-famoso-explorador", initial: [1, 24, 1], hint: "La curva azul es el dado (un 6) y la naranja los dos dados (6 doble). La línea discontinua marca el 50 %." },
    },
    {
      id: "check-mere",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Compara $0{,}4914$ con $0{,}5$." }],
      title: "¿Apuesta favorable?",
      question: "Apostar a sacar al menos un 6 doble en $24$ tiradas de dos dados es…",
      choices: [
        { id: "a", label: "desfavorable: la probabilidad es $\\approx 0{,}4914 < 0{,}5$" },
        { id: "b", label: "favorable: $\\frac{24}{36} > \\frac{1}{2}$", incorrectFeedback: "La probabilidad no crece proporcionalmente con el número de tiradas." },
        { id: "c", label: "segura: con $24$ tiradas siempre sale", incorrectFeedback: "Nunca es segura: $\\left(\\frac{35}{36}\\right)^{24} \\approx 0{,}509$ de no sacarlo." },
        { id: "d", label: "exactamente $\\frac{1}{2}$", incorrectFeedback: "Se queda ligeramente por debajo: $0{,}4914$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$1 - \\left(\\frac{35}{36}\\right)^{24} \\approx 0{,}4914$: la apuesta es ligeramente desfavorable. Hacen falta $25$ tiradas para que pase del $50\\,\\%$.",
    },
    {
      id: "cumple",
      type: "slide",
      help: [{ label: "Por qué tantas", message: "Aunque cada persona tenga pocas posibilidades de coincidir con otra concreta, hay muchísimas parejas: con 23 personas hay 253 parejas." }],
      title: "La paradoja del cumpleaños",
      blocks: [
        { kind: "text", text: "¿Cuántas personas hacen falta para que sea más probable que no que haya dos que cumplan años el mismo día? Se calcula con el suceso contrario: que **todos** sean distintos." },
        { kind: "formula", tex: "P(\\text{todos distintos}) = \\dfrac{365}{365}\\cdot\\dfrac{364}{365}\\cdots\\dfrac{365 - n + 1}{365}" },
      ],
      visual: { kind: "tool", tool: "azar-famoso-explorador", initial: [0, 23], hint: "Con 23 personas la probabilidad de coincidencia ya supera el 50 %; con 60 es casi segura." },
    },
    {
      id: "check-cumple",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Prueba con la herramienta: sube el número de personas hasta que la probabilidad supere el $50\\,\\%$." }],
      title: "¿Cuántas personas?",
      question: "¿A partir de cuántas personas es más probable que sí a que no que dos cumplan años el mismo día?",
      choices: [
        { id: "a", label: "$23$" },
        { id: "b", label: "$183$ (la mitad de $365$)", incorrectFeedback: "La intuición engaña: con solo $23$ personas ya hay $253$ parejas posibles." },
        { id: "c", label: "$100$", incorrectFeedback: "Con $100$ personas la probabilidad ya es de $99{,}99997\\,\\%$." },
        { id: "d", label: "$365$", incorrectFeedback: "Con $365$ personas es prácticamente seguro. Con $366$ lo sería del todo." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Con $23$ personas $P \\approx 0{,}5073$; con $22$ es $0{,}4757$. Un resultado contraintuitivo que se entiende contando parejas.",
    },
  ],
};
