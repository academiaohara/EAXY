import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_15_SUBTITLE } from "@/data/lessons/shared";

export const probabilidadLaplaceLesson: InteractiveLesson = {
  slug: "probabilidad-laplace",
  title: "5. Probabilidad y regla de Laplace",
  subtitle: TEMA_15_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [
        {
          label: "¿Cuándo vale la regla?",
          message: "Solo si todos los resultados elementales tienen la misma posibilidad. Con un dado trucado no se puede aplicar.",
        },
        {
          label: "Cuenta primero",
          message: "Lista el espacio muestral y marca los casos favorables. La probabilidad es la proporción de favorables.",
        },
        {
          label: "Siempre entre $0$ y $1$",
          message: "$0$ si nunca ocurre y $1$ si siempre ocurre. Si te sale algo fuera de ese rango, hay un error.",
        },
      ],
      title: "Regla de Laplace",
      blocks: [
        {
          kind: "text",
          text: "Si todos los sucesos elementales son **equiprobables**, la probabilidad de un suceso $A$ es el cociente entre los casos favorables y los casos posibles.",
        },
        {
          kind: "rule",
          title: "Regla de Laplace",
          formula: "P(A) = \\dfrac{\\text{casos favorables a } A}{\\text{casos posibles}}",
          text: "Se cumple siempre $0 \\leq P(A) \\leq 1$.",
        },
      ],
      visual: { kind: "anim", scene: "laplace-dado", beatMs: 3500 },
    },
    {
      id: "o-y",
      type: "slide",
      help: [
        {
          label: "Un truco con los conjuntos",
          message: "«O» une las dos listas de resultados, sin repetir ninguno. «Y» se queda solo con los que están en las dos.",
        },
        {
          label: "Antes de contar",
          message: "Escribe el espacio muestral completo y marca cada condición. Así no te saltas ni repites resultados.",
        },
      ],
      title: "«O» frente a «y»",
      blocks: [
        {
          kind: "compare",
          left: { title: "«A o B»: unión", text: "Basta cumplir **una** de las condiciones. Cada resultado se cuenta **una sola vez**.", tone: "info" },
          right: { title: "«A y B»: intersección", text: "Deben cumplirse **las dos** a la vez: solo cuentan los resultados comunes.", tone: "ok" },
        },
        {
          kind: "warning",
          text: "Si un resultado está en los dos sucesos, en la unión no se cuenta dos veces.",
        },
      ],
      visual: { kind: "anim", scene: "suceso-union-interseccion", beatMs: 3500 },
    },
    {
      id: "explora-laplace",
      type: "slide",
      help: [
        {
          label: "¿Qué debo observar?",
          message: "Marcando todas las caras la probabilidad es $1$ (suceso seguro); sin marcar ninguna, $0$ (imposible).",
        },
      ],
      title: "Explora: casos favorables y posibles",
      blocks: [
        {
          kind: "text",
          text: "Marca y desmarca caras, y prueba la bolsa. ¿Qué pasa con $P$ si añades bolas de otro color?",
        },
      ],
      visual: { kind: "tool", tool: "laplace-explorador", params: { a: 0, b: 2, c: 3 } },
    },
    {
      id: "check",
      type: "fraction_pick",
      help: [
        {
          label: "¿Qué son los casos favorables?",
          message: "Los resultados que cumplen lo que pide el suceso. Cuéntalos, no los inventes.",
        },
        {
          label: "¿Por qué el $4$ no cuenta?",
          message: "«Mayor que $4$» empieza en el $5$. El $4$ es igual, no mayor.",
        },
        {
          label: "Recuerda la regla",
          message: "$P = \\dfrac{\\text{casos favorables}}{\\text{casos posibles}}$. Aquí marcas los favorables sobre las $6$ caras.",
        },
      ],
      title: "Comprueba lo aprendido",
      question:
        "Lanzamos un dado equilibrado. Cada ficha es una de sus $6$ caras (casos posibles). Marca los casos favorables a «obtener un número mayor que $4$»: lo marcado será la probabilidad.",
      shape: "set",
      numerator: 2,
      denominator: 6,
      columns: 6,
      itemLabel: "cara",
      labels: ["1", "2", "3", "4", "5", "6"],
      correctPieces: [4, 5],
      hint: "Escribe $E = \\{1, 2, 3, 4, 5, 6\\}$ y señala qué resultados son **mayores** que $4$ (el $4$ no cuenta).",
      explanation: "Favorables: $\\{5, 6\\}$ → $2$ casos de $6$: $P = \\dfrac{2}{6} = \\dfrac{1}{3}$.",
    },
    {
      id: "bolsa-roja",
      type: "fill_in_blank",
      help: [
        {
          label: "Casos posibles",
          message: "Son todas las bolas de la bolsa, de cualquier color.",
        },
        {
          label: "Casos favorables",
          message: "Solo cuentan las bolas del color pedido.",
        },
      ],
      title: "Bola roja",
      question:
        "Una bolsa tiene 2 bolas rojas y 3 verdes. Sacamos una al azar. ¿Cuál es la probabilidad de que sea roja? Escríbela como fracción.",
      answerFormat: "fraction",
      correctAnswers: ["2/5"],
      explanation: "$2$ casos favorables (bolas rojas) entre $5$ posibles (todas las bolas): $P = \\dfrac{2}{5} = 0{,}4 = 40\\,\\%$.",
    },
    {
      id: "par-o-tres",
      type: "predict",
      help: [
        {
          label: "Lista los dos sucesos",
          message: "«Par» es $\\{2, 4, 6\\}$ y «múltiplo de $3$» es $\\{3, 6\\}$. ¿Qué resultados cumplen al menos una?",
        },
        {
          label: "No cuentes dos veces",
          message: "El $6$ está en las dos listas, pero es un único resultado del dado.",
        },
      ],
      title: "Par o múltiplo de 3",
      question:
        "Al lanzar un dado de seis caras, ¿cuál es la probabilidad de obtener un número par o un múltiplo de 3?",
      mode: "choice",
      choices: [
        { id: "a", label: "$\\dfrac{4}{6} = \\dfrac{2}{3}$" },
        {
          id: "b",
          label: "$\\dfrac{5}{6}$",
          incorrectFeedback: "Has contado el $6$ dos veces ($3$ pares $+$ $2$ múltiplos de $3$). En la unión cada resultado cuenta una sola vez: $\\{2, 3, 4, 6\\}$ son $4$.",
        },
        {
          id: "c",
          label: "$\\dfrac{1}{6}$",
          incorrectFeedback: "$\\dfrac{1}{6}$ sería «par **y** múltiplo de $3$» (solo el $6$). Con «o» basta cumplir una condición.",
        },
        {
          id: "d",
          label: "$\\dfrac{3}{6} = \\dfrac{1}{2}$",
          incorrectFeedback: "$\\dfrac{3}{6}$ es solo «par». Faltan los múltiplos de $3$ que no son pares: el $3$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "La unión es $\\{2, 3, 4, 6\\}$: $4$ casos favorables de $6$ posibles, $P = \\dfrac{4}{6} = \\dfrac{2}{3}$.",
    },
  ],
};
