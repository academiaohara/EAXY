import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_9_SUBTITLE } from "@/data/lessons/shared";

export const asignacionProbabilidades1bachLesson: InteractiveLesson = {
  slug: "asignacion-probabilidades-1bach",
  title: "3. Asignación de probabilidades",
  subtitle: TEMA_1BACH_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "laplace",
      type: "slide",
      help: [{ label: "Equiprobables", message: "La regla de Laplace solo vale si todos los sucesos elementales tienen la misma probabilidad (dado y moneda sin trucar, bolas iguales al tacto…)." }],
      title: "La regla de Laplace",
      blocks: [
        { kind: "rule", title: "Sucesos elementales equiprobables", formula: "P(A) = \\dfrac{\\text{casos favorables a } A}{\\text{casos posibles}}" },
        { kind: "text", text: "Se apoya en el **principio de razón insuficiente**: si no hay motivo para pensar que un resultado es más probable que otro, se les da la misma probabilidad." },
      ],
      visual: { kind: "anim", scene: "laplace-dado" },
    },
    {
      id: "bolsa",
      type: "slide",
      help: [{ label: "Compuestos", message: "Un suceso como «sacar un rey» está formado por varios sucesos elementales (los cuatro reyes), por eso su probabilidad es la suma." }],
      title: "Aplicar Laplace",
      blocks: [
        { kind: "example", title: "Baraja española (40 cartas)", lines: [
          { math: "P(\\text{rey de copas}) = \\dfrac{1}{40}\\qquad P(\\text{rey}) = \\dfrac{4}{40} = \\dfrac{1}{10}\\qquad P(\\text{copa}) = \\dfrac{10}{40} = \\dfrac{1}{4}" },
        ] },
        { kind: "example", title: "Bolsa con 7 bolas rojas y 3 blancas", lines: [
          { math: "P(\\text{roja}) = \\dfrac{7}{10}" },
        ] },
      ],
      visual: { kind: "tool", tool: "laplace-explorador", params: { a: 1, b: 7, c: 3 }, hint: "Cambia el número de bolas de cada color: los casos favorables y los posibles cambian la probabilidad." },
    },
    {
      id: "check-carta",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Hay $4$ ases en una baraja de $40$ cartas." }],
      title: "Ases",
      question: "Al sacar una carta de la baraja de $40$, ¿cuál es la probabilidad de sacar un as? (fracción simplificada)",
      correctAnswers: ["1/10", "0,1", "0.1", "4/40"],
      explanation: "Hay $4$ ases entre $40$ cartas: $\\dfrac{4}{40} = \\dfrac{1}{10}$.",
    },
    {
      id: "check-monedero",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Casos favorables: monedas de $10$ cts ($4$) y de $50$ cts ($2$). Casos posibles: $3 + 7 + 4 + 2$." }],
      title: "El monedero",
      question: "Un monedero tiene $3$ monedas de $1$ cts, $7$ de $5$ cts, $4$ de $10$ cts y $2$ de $50$ cts. ¿Cuál es la probabilidad de que una moneda al azar tenga un número **par** de céntimos? (fracción simplificada)",
      correctAnswers: ["3/8", "0,375", "0.375", "6/16"],
      explanation: "Son pares las de $10$ y $50$ cts: $4 + 2 = 6$ monedas de un total de $16$: $\\dfrac{6}{16} = \\dfrac{3}{8}$.",
    },
    {
      id: "frecuencias",
      type: "slide",
      help: [{ label: "A posteriori", message: "Cuando no se puede aplicar la simetría, se estima la probabilidad con las frecuencias relativas de muchas repeticiones del experimento." }],
      title: "Frecuencias relativas y ley de los grandes números",
      blocks: [
        { kind: "text", text: "Si los sucesos elementales **no** son equiprobables (¿cuál es la probabilidad de que un peatón sea atropellado al cruzar?) se recogen datos: la **frecuencia relativa** de un suceso tiende a estabilizarse al repetir muchas veces el experimento. Es la **ley de los grandes números** de Jakob Bernoulli." },
        { kind: "warning", text: "Que haya dos casos posibles no significa que cada uno tenga probabilidad $\\tfrac{1}{2}$: «te pilla un coche / no te pilla» no son equiprobables." },
      ],
      visual: { kind: "tool", tool: "dado-simulador", hint: "Lanza el dado muchas veces: las frecuencias relativas se acercan a 1/6 a medida que crece el número de lanzamientos." },
    },
    {
      id: "check-metodo",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Piensa si hay una simetría que haga igual de probables los resultados." }],
      title: "¿Laplace o frecuencias?",
      question: "Para saber la probabilidad de que un recién nacido sea **zurdo**, ¿cómo se asigna?",
      choices: [
        { id: "a", label: "Con frecuencias relativas: se estudia una muestra grande" },
        { id: "b", label: "Con Laplace: hay dos casos, zurdo o diestro, luego $\\tfrac{1}{2}$", incorrectFeedback: "No hay simetría que haga equiprobables los dos casos; la proporción real de zurdos es mucho menor." },
        { id: "c", label: "No se puede asignar", incorrectFeedback: "Sí: con datos de muchos nacimientos se estima la proporción." },
        { id: "d", label: "Con la regla de tres entre el número de hijos", incorrectFeedback: "No se trata de una proporcionalidad." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Cuando no hay simetría, la probabilidad se aproxima con las frecuencias relativas observadas.",
    },
    {
      id: "check-delegada",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Casos favorables: $14$ chicas. Casos posibles: $15 + 14$." }],
      title: "El sorteo del delegado",
      question: "En una clase hay $15$ chicos y $14$ chicas y se sortea el delegado. ¿Cuál es la probabilidad de que sea una chica? (fracción)",
      correctAnswers: ["14/29"],
      explanation: "$P = \\dfrac{14}{15 + 14} = \\dfrac{14}{29} \\approx 0{,}483$.",
    },
  ],
};
