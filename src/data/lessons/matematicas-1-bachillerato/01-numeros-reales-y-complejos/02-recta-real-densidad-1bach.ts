import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_1_SUBTITLE } from "@/data/lessons/shared";

export const rectaRealDensidad1bachLesson: InteractiveLesson = {
  slug: "recta-real-densidad-1bach",
  title: "2. La recta real y la densidad",
  subtitle: TEMA_1BACH_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "recta",
      type: "slide",
      help: [
        { label: "Origen y unidad", message: "Basta con elegir dónde va el $0$ y dónde va el $1$: la distancia entre ambos fija la escala de toda la recta." },
      ],
      title: "Un punto para cada número real",
      blocks: [
        { kind: "definition", text: "Elegidos el $0$ y el $1$, **cada número real ocupa un único punto** de la recta y **cada punto de la recta es un número real**. Por eso se habla de la **recta real**." },
        { kind: "text", text: "Las fracciones se colocan dividiendo cada unidad en partes iguales; las raíces, trasladando con el compás la hipotenusa de un triángulo rectángulo." },
      ],
      visual: { kind: "anim", scene: "raiz-en-recta", params: { a: 10 } },
    },
    {
      id: "raices",
      type: "slide",
      help: [
        { label: "¿Y √6?", message: "$6$ no es suma de dos cuadrados enteros, pero sí $6 = 5 + 1$: se construye $\\sqrt{5}$ (catetos $2$ y $1$) y con ella y un cateto $1$ sale $\\sqrt{6}$." },
      ],
      title: "Situar una raíz con Pitágoras",
      blocks: [
        { kind: "rule", title: "Si $n = a^2 + b^2$", text: "La hipotenusa de un triángulo rectángulo de catetos $a$ y $b$ mide $\\sqrt{n}$. Se lleva sobre la recta con el compás centrado en el $0$." },
        { kind: "example", lines: [
          { math: "\\sqrt{10} = \\sqrt{3^2 + 1^2}" },
          { math: "\\sqrt{13} = \\sqrt{3^2 + 2^2}" },
          { math: "\\sqrt{5} = \\sqrt{2^2 + 1^2}" },
        ] },
      ],
      visual: { kind: "anim", scene: "raiz-en-recta", params: { a: 13 } },
    },
    {
      id: "check-catetos",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Busca dos cuadrados perfectos que sumen 13: 1, 4, 9, 16…" }],
      title: "Catetos para √13",
      question: "Para situar $\\sqrt{13}$ en la recta con regla y compás, ¿qué catetos usarías?",
      choices: [
        { id: "a", label: "$3$ y $2$" },
        { id: "b", label: "$4$ y $1$", incorrectFeedback: "$4^2 + 1^2 = 17$, no $13$." },
        { id: "c", label: "$2$ y $2$", incorrectFeedback: "$2^2 + 2^2 = 8$. Eso daría $\\sqrt{8}$." },
        { id: "d", label: "$6$ y $7$", incorrectFeedback: "$6 + 7 = 13$ es una suma de números, no de cuadrados." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$3^2 + 2^2 = 9 + 4 = 13$, así que la hipotenusa mide $\\sqrt{13}$.",
    },
    {
      id: "densidad",
      type: "slide",
      help: [
        { label: "Y los irracionales", message: "También entre dos números cualesquiera hay infinitos irracionales: por ejemplo, a cualquier racional se le puede sumar $\\frac{\\sqrt{2}}{n}$ con $n$ grande." },
      ],
      title: "Los reales son densos",
      blocks: [
        { kind: "definition", text: "**Densidad:** entre dos números reales distintos siempre hay **infinitos** números reales más. No existe «el siguiente» de ningún número." },
        { kind: "rule", title: "Basta con la media", formula: "a < b \\ \\Rightarrow\\ a < \\dfrac{a+b}{2} < b" },
        { kind: "text", text: "La media está entre los dos, y se puede repetir entre ella y cualquiera de los extremos, sin fin. Lo mismo ocurre con los racionales y con los irracionales por separado." },
      ],
      visual: { kind: "anim", scene: "racionales-zoom" },
    },
    {
      id: "check-media",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "La media de $a$ y $b$ es $\\frac{a+b}{2}$." }],
      title: "Un número entre dos",
      question: "¿Qué número está justo en medio de $1{,}5$ y $2$? (con coma decimal)",
      correctAnswers: ["1,75", "1.75"],
      explanation: "$\\dfrac{1{,}5 + 2}{2} = \\dfrac{3{,}5}{2} = 1{,}75$.",
    },
    {
      id: "check-infinitos",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Piensa en la media: se puede aplicar una y otra vez." }],
      title: "¿Cuántos hay?",
      question: "Entre $3{,}14$ y $\\pi$ hay…",
      choices: [
        { id: "a", label: "infinitos números reales, racionales e irracionales" },
        { id: "b", label: "ninguno, porque están muy pegados", incorrectFeedback: "Da igual lo cerca que estén: la media de ambos está entre los dos." },
        { id: "c", label: "solo números irracionales", incorrectFeedback: "También hay infinitos racionales, como $3{,}141$ o $3{,}1415$." },
        { id: "d", label: "un número finito de decimales", incorrectFeedback: "Siempre se pueden añadir más cifras: nunca se acaban." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$3{,}14 < \\pi = 3{,}14159\\ldots$ y entre ambos caben infinitos reales: $3{,}141$, $3{,}1415$, $3{,}14159\\ldots$ y cualquiera de sus medias.",
    },
  ],
};
