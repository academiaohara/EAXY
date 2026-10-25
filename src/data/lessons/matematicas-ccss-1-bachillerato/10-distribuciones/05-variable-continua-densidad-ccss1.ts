import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_10_SUBTITLE } from "@/data/lessons/shared";

export const variableContinuaDensidadCcss1Lesson: InteractiveLesson = {
  slug: "variable-continua-densidad-ccss1",
  title: "5. Variables continuas y función de densidad",
  subtitle: TEMA_CCSS1_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "densidad",
      type: "slide",
      help: [{ label: "Idea", message: "En una variable continua la probabilidad de un intervalo es el área bajo la curva de densidad en ese intervalo." }],
      title: "Cuando los valores forman un continuo",
      blocks: [
        { kind: "text", text: "La estatura, el tiempo de espera o la longitud de una pieza pueden tomar **cualquier valor** de un intervalo. No tiene sentido listar sus valores: se describe con una **función de densidad** $f(x)$." },
        { kind: "rule", title: "Propiedades de la función de densidad", text: "**1.** $f(x) \\geq 0$.  **2.** El área total bajo la curva vale $1$.  **3.** $P(a \\leq X \\leq b)$ es el **área** bajo $f$ entre $a$ y $b$." },
        { kind: "warning", title: "Un punto no tiene área", text: "$P(X = a) = 0$ para cualquier valor concreto. Que algo sea posible no implica probabilidad positiva: por eso $P(a \\leq X \\leq b) = P(a < X < b)$." },
      ],
      visual: { kind: "tool", tool: "normal-explorador", initial: [100, 15, 85, 115, 0], hint: "La probabilidad es el área sombreada. Estrecha el intervalo hasta que a y b coincidan: el área (y la probabilidad) tiende a 0." },
    },
    {
      id: "check-uniforme",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "El rectángulo de base $[0, 10]$ tiene altura $0{,}1$ para que el área sea $1$. El área entre $2$ y $5$ es $3\\cdot 0{,}1$." }],
      title: "El autobús que no llega",
      question: "El tiempo de espera (en minutos) de un autobús es uniforme en $[0, 10]$, con densidad $f(x) = 0{,}1$. ¿Cuál es la probabilidad de esperar entre $2$ y $5$ minutos? (como decimal)",
      correctAnswers: ["0,3", "0.3"],
      explanation: "El área es la de un rectángulo de base $5 - 2 = 3$ y altura $0{,}1$: $3\\cdot 0{,}1 = 0{,}3$.",
    },
    {
      id: "check-puntual",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "El área de un segmento de base cero es cero." }],
      title: "Un instante exacto",
      question: "En ese mismo autobús, ¿cuánto vale la probabilidad de esperar **exactamente** $3$ minutos, $P(X = 3)$? (solo el número)",
      correctAnswers: ["0"],
      explanation: "$P(X = 3) = 0$: el área bajo la curva en un solo punto es nula. Solo tienen probabilidad los intervalos.",
    },
    {
      id: "check-valida",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "El área del rectángulo de base $4$ y altura $h$ es $4h$, y debe valer $1$." }],
      title: "Una densidad válida",
      question: "Una variable toma valores en $[0, 4]$ con densidad constante $f(x) = h$. ¿Cuánto debe valer $h$?",
      choices: [
        { id: "a", label: "$h = 0{,}25$" },
        { id: "b", label: "$h = 4$", incorrectFeedback: "El área sería $4\\cdot 4 = 16$, no $1$." },
        { id: "c", label: "$h = 1$", incorrectFeedback: "El área sería $4\\cdot 1 = 4$, no $1$." },
        { id: "d", label: "$h = 0{,}5$", incorrectFeedback: "El área sería $4\\cdot 0{,}5 = 2$, no $1$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "El área total debe ser $1$: $4h = 1$, luego $h = 0{,}25$.",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Se puede contar (0, 1, 2…) → discreta; se mide en un continuo (cualquier valor con decimales) → continua." }],
      title: "¿Discreta o continua?",
      question: "Clasifica cada variable aleatoria.",
      groups: [
        { id: "disc", label: "Discreta", tone: "cobalt" },
        { id: "cont", label: "Continua", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Número de caras en $10$ lanzamientos", group: "disc" },
        { id: "b", text: "Estatura de una persona", group: "cont" },
        { id: "c", text: "Tiempo que tarda un coche en alcanzar los $100$ km/h", group: "cont" },
        { id: "d", text: "Número de clientes que entran en una tienda en una hora", group: "disc" },
        { id: "e", text: "Consumo diario de electricidad de un hogar (kWh)", group: "cont" },
      ],
      hint: "¿Se cuenta o se mide?",
    },
  ],
};
