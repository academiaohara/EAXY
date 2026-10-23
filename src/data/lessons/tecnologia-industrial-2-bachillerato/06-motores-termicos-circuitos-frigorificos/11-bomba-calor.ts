import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_6_SUBTITLE } from "@/data/lessons/shared";

export const bombaCalorLesson: InteractiveLesson = {
  slug: "bomba-calor",
  title: "11. La bomba de calor",
  subtitle: TEMA_TI2_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "idea",
      type: "slide",
      help: [
        {
          label: "¿Entonces una bomba de calor es un aire acondicionado?",
          message: "Un aire acondicionado reversible es una bomba de calor: en verano enfría la casa y en invierno la calienta. Funciona con el mismo circuito, invertido.",
        },
      ],
      title: "Una máquina frigorífica con otro objetivo",
      blocks: [
        {
          kind: "text",
          text: "Una **bomba de calor** es exactamente igual a una máquina frigorífica; solo cambia la **aplicación**: qué foco interesa.",
        },
        {
          kind: "compare",
          left: { title: "En invierno", text: "El foco frío es la **calle** y el caliente, la **vivienda**. Se gasta trabajo para pasar calor del exterior al interior.", tone: "key" },
          right: { title: "En verano", text: "El foco frío es el **interior** y el caliente, el **exterior**. Se gasta trabajo para sacar el calor de la casa.", tone: "info" },
        },
      ],
      visual: { kind: "anim", scene: "bomba-calor-inversion", beatMs: 5800 },
    },
    {
      id: "eficiencia",
      type: "slide",
      help: [
        {
          label: "¿Por qué ε siempre es mayor que 1?",
          message: "Porque $W = Q_c - Q_f$ y $Q_f > 0$: el calor cedido $Q_c$ siempre es mayor que el trabajo consumido $W$.",
        },
      ],
      title: "La bomba de calor siempre gana a la resistencia",
      blocks: [
        {
          kind: "rule",
          title: "Eficiencia de la bomba de calor",
          formula: "\\varepsilon = \\dfrac{Q_c}{W_{ciclo}} = \\text{COP} + 1",
          text: "Como $W_{ciclo} = Q_c - Q_f$, siempre $\\varepsilon > 1$.",
        },
        {
          kind: "compare",
          left: { title: "Calefactor eléctrico", text: "Por efecto Joule produce solo el calor $W$ que consume ($0{,}24\\,I^2 R\\,t$ cal).", tone: "warn" },
          right: { title: "Bomba de calor", text: "Con el mismo trabajo proporciona $W + Q_f$: además toma calor del exterior.", tone: "ok" },
        },
        {
          kind: "text",
          text: "Compara qué ocurre con distintos valores de las temperaturas.",
        },
      ],
      visual: { kind: "tool", tool: "frigorifica-explorador", params: { a: 0, b: 20 } },
    },
    {
      id: "valvula-cuatro",
      type: "slide",
      help: [
        {
          label: "¿Y cómo se invierte el circuito?",
          message: "La válvula de cuatro vías cruza los conductos: el que iba del compresor al condensador va ahora al evaporador. Los papeles de los dos intercambiadores se intercambian.",
        },
      ],
      title: "La válvula de cuatro vías y otras aplicaciones",
      blocks: [
        {
          kind: "text",
          text: "Para intercambiar los papeles del condensador y del evaporador se usa la **válvula de cuatro vías**, que cruza los circuitos. Así se puede **calentar en invierno y enfriar en verano**: el aire acondicionado reversible.",
        },
        {
          kind: "text",
          text: "Otra aplicación muy favorable: un local con **piscina climatizada y pista de patinaje sobre hielo**. El agua de la piscina se calienta con el condensador, y el evaporador produce el hielo de la pista.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-objetivo",
      type: "predict",
      help: [{ label: "Pista", message: "Calor del frío al caliente, a cambio de trabajo." }],
      title: "El objetivo de una bomba de calor",
      question: "El objetivo de una bomba de calor es:",
      mode: "choice",
      choices: [
        { id: "llevar", label: "Llevar calor de un recinto de menor temperatura a otro de mayor temperatura, aportando trabajo" },
        { id: "sin", label: "Lo mismo, pero sin aportar trabajo, porque el calor fluye espontáneamente", incorrectFeedback: "El calor no fluye espontáneamente del frío al caliente." },
        { id: "altas", label: "Proporcionar temperaturas muy elevadas", incorrectFeedback: "Se usa para calefacción moderada, no para temperaturas muy altas." },
      ],
      correctChoiceId: "llevar",
      shuffleChoices: true,
      explanation: "Es una máquina frigorífica cuyo efecto útil es el calor cedido al foco caliente.",
    },
    {
      id: "check-cuatro-vias",
      type: "predict",
      help: [{ label: "Pista", message: "Se invierten los papeles de los dos intercambiadores." }],
      title: "La válvula de cuatro vías",
      question: "La válvula de cuatro vías de una bomba de calor tiene la misión de:",
      mode: "choice",
      choices: [
        { id: "invertir", label: "Intercambiar los papeles del condensador y del evaporador según interese calentar o enfriar" },
        { id: "rendimiento", label: "Mejorar el rendimiento de la instalación", incorrectFeedback: "No mejora el rendimiento: cambia el sentido del funcionamiento." },
        { id: "seguridad", label: "Evitar explosiones al comprimir el fluido", incorrectFeedback: "No es un elemento de seguridad." },
      ],
      correctChoiceId: "invertir",
      shuffleChoices: true,
      explanation: "Cruza los conductos y el circuito pasa de calefacción a refrigeración.",
    },
    {
      id: "check-epsilon",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Fórmula", message: "$\\varepsilon = Q_c/W$." }],
      title: "Calor por unidad de trabajo",
      question: "Una bomba de calor cede $3\\,000$ J a la casa gastando $1\\,000$ J de trabajo. ¿Cuánto vale su eficiencia $\\varepsilon$?",
      correctAnswers: ["3"],
      explanation: "$\\varepsilon = Q_c/W = 3\\,000/1\\,000 = 3$. De ese calor, $2\\,000$ J proceden del exterior.",
    },
    {
      id: "check-resistencia",
      type: "predict",
      help: [{ label: "Pista", message: "Una resistencia convierte la energía eléctrica en calor con ε = 1." }],
      title: "Con $1$ kWh de electricidad",
      question: "Con la misma cantidad de electricidad, ¿qué calor entrega una bomba de calor con $\\varepsilon = 4$ frente a una resistencia eléctrica?",
      mode: "choice",
      choices: [
        { id: "cuatro", label: "La bomba entrega 4 veces más calor que la resistencia" },
        { id: "igual", label: "Lo mismo: por la energía se conserva", incorrectFeedback: "La bomba toma además calor del exterior: $Q_c = W + Q_f$." },
        { id: "menos", label: "Menos, porque tiene pérdidas", incorrectFeedback: "Aun con pérdidas, entrega más calor que el que consume." },
      ],
      correctChoiceId: "cuatro",
      shuffleChoices: true,
      explanation: "Con $W = 1$ kWh la resistencia da $1$ kWh y la bomba, $\\varepsilon\\cdot W = 4$ kWh: $1$ kWh eléctrico más $3$ kWh tomados del exterior.",
    },
  ],
};
