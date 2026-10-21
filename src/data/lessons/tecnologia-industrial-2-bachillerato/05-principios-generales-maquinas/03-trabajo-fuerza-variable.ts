import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_5_SUBTITLE } from "@/data/lessons/shared";

export const trabajoFuerzaVariableLesson: InteractiveLesson = {
  slug: "trabajo-fuerza-variable",
  title: "3. Trabajo de una fuerza variable",
  subtitle: TEMA_TI2_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "area",
      type: "slide",
      help: [
        {
          label: "¿Por qué rectángulos?",
          message: "Mientras el tramo es muy pequeño, la fuerza casi no cambia y se puede usar $\\Delta W = F\\,\\Delta x$. Sumar todos esos trabajos pequeños da el total.",
        },
      ],
      title: "El trabajo es el área bajo la curva F–x",
      blocks: [
        {
          kind: "text",
          text: "En muchos casos (un motor de explosión, un resorte) la fuerza **no es constante**: su módulo depende del desplazamiento. Se representa en unos ejes $F$–$x$.",
        },
        {
          kind: "rule",
          formula: "W_{1,2} = \\sum_{x_1}^{x_2} F(x)\\,\\Delta x",
          text: "Cuanto más pequeños los intervalos, más nos acercamos al valor real: es el **área encerrada bajo la curva** $F(x)$ entre los extremos del desplazamiento.",
        },
      ],
      visual: { kind: "anim", scene: "trabajo-area-curva", beatMs: 4500 },
    },
    {
      id: "check-area",
      type: "predict",
      help: [{ label: "Fuerza constante", message: "Si $F$ no cambia, la gráfica $F$–$x$ es una recta horizontal y el área bajo ella es un rectángulo." }],
      title: "Fuerza constante",
      question: "Con una fuerza constante, el área bajo la gráfica $F$–$x$ es un rectángulo. ¿A qué corresponde su área?",
      mode: "choice",
      choices: [
        { id: "fe", label: "Al trabajo $W = F\\,e$" },
        { id: "p", label: "A la potencia", incorrectFeedback: "La potencia incluye el tiempo; aquí solo hay fuerza y espacio." },
        { id: "m", label: "A la masa del cuerpo", incorrectFeedback: "El área $F\\cdot e$ no da masa." },
      ],
      correctChoiceId: "fe",
      shuffleChoices: true,
      explanation: "Es el caso particular más sencillo: base $e$, altura $F$, área $F\\,e = W$.",
    },
    {
      id: "hooke",
      type: "slide",
      help: [
        {
          label: "¿Qué indica el signo menos?",
          message: "Que la fuerza del resorte se opone al desplazamiento. La fuerza que hay que hacer para deformarlo es $F' = k\\,x$, de signo contrario.",
        },
      ],
      title: "Un resorte: ley de Hooke",
      blocks: [
        {
          kind: "rule",
          title: "Ley de Hooke",
          formula: "F = -k\\,x",
          text: "$k$ es la constante propia de cada resorte: la fuerza por cada unidad de alargamiento. Los muelles duros tienen $k$ grande.",
        },
        {
          kind: "text",
          text: "Para estirarlo (lentamente) hay que hacer una fuerza $F' = k\\,x$, que crece desde $0$. Su gráfica es una **recta**, y el área bajo ella, un **triángulo**.",
        },
      ],
      visual: { kind: "anim", scene: "resorte-trabajo", beatMs: 4500 },
    },
    {
      id: "explora-resorte",
      type: "slide",
      help: [
        {
          label: "¿Por qué x al cuadrado?",
          message: "Porque el trabajo es el área de un triángulo de base $x$ y altura $k\\,x$: $\\tfrac{1}{2}\\cdot x\\cdot k\\,x = \\tfrac{1}{2}k\\,x^2$.",
        },
      ],
      title: "Explora el resorte",
      blocks: [
        {
          kind: "rule",
          formula: "W = \\tfrac{1}{2}\\,F\\,x = \\tfrac{1}{2}\\,k\\,x^2",
        },
        {
          kind: "text",
          text: "Duplica el alargamiento y observa qué pasa con la fuerza y con el trabajo.",
        },
      ],
      visual: { kind: "tool", tool: "resorte-explorador", params: { a: 200, b: 0.1 } },
    },
    {
      id: "check-trabajo-resorte",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Calcula k", message: "Primero $k = F/x = 60/0{,}03 = 2\\,000$ N/m. Después $W = \\tfrac{1}{2}k\\,x^2$ con $x = 0{,}08$ m." }],
      title: "Comprimir un resorte",
      question: "Un resorte se comprime $3$ cm al aplicar una fuerza de $60$ N. ¿Qué trabajo, en julios, hay que hacer para comprimirlo $8$ cm? (con una decimal)",
      correctAnswers: ["6,4", "6.4"],
      explanation: "$k = 60/0{,}03 = 2\\,000$ N/m y $W = \\tfrac{1}{2}\\cdot 2\\,000\\cdot 0{,}08^2 = 6{,}4$ J.",
    },
    {
      id: "check-doble",
      type: "predict",
      help: [{ label: "x al cuadrado", message: "Si $x$ se multiplica por $2$, $x^2$ se multiplica por $4$." }],
      title: "Doblar el alargamiento",
      question: "Si el alargamiento de un resorte se duplica, el trabajo necesario:",
      mode: "choice",
      choices: [
        { id: "cuatro", label: "Se multiplica por 4" },
        { id: "dos", label: "Se multiplica por 2", incorrectFeedback: "Esa es la fuerza. El trabajo depende de $x^2$." },
        { id: "igual", label: "No cambia", incorrectFeedback: "Cambia y mucho: a más alargamiento, más fuerza y más recorrido." },
      ],
      correctChoiceId: "cuatro",
      shuffleChoices: true,
      explanation: "$W = \\tfrac{1}{2}k\\,x^2$: el factor al cuadrado hace que el trabajo crezca el cuádruple.",
    },
  ],
};
