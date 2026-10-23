import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_6_SUBTITLE } from "@/data/lessons/shared";

export const cicloCarnotLesson: InteractiveLesson = {
  slug: "ciclo-carnot",
  title: "2. El ciclo de Carnot",
  subtitle: TEMA_TI2_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "idea",
      type: "slide",
      help: [
        {
          label: "¿Por qué una turbina no llega al 30 %?",
          message: "Quemar 1 kg de carbón libera unas $7\\,000$ kcal, pero una turbina de vapor rara vez pasa del $30\\,\\%$. Las pérdidas por rozamiento no lo explican: la causa está en el calor que se llevan los gases de escape.",
        },
      ],
      title: "¿Cuánto calor se puede convertir en trabajo?",
      blocks: [
        {
          kind: "text",
          text: "Nicolas Léonard Sadi Carnot estudió el rendimiento máximo de un motor térmico **prescindiendo de los detalles de funcionamiento**. Se fijó en tres hechos:",
        },
        {
          kind: "steps",
          items: [
            "Al motor se le suministra energía en forma de **calor a temperatura elevada**.",
            "El calor realiza **trabajo mecánico**.",
            "El motor **cede calor a temperatura inferior**.",
          ],
        },
        {
          kind: "text",
          text: "Propuso en $1824$ un ciclo **reversible** de un gas ideal en un cilindro entre dos focos. Su rendimiento es el máximo posible entre esas dos temperaturas.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "ciclo",
      type: "slide",
      help: [
        {
          label: "¿Qué es una adiabática?",
          message: "Un proceso sin intercambio de calor con el exterior. El gas se enfría al expandirse y se calienta al comprimirse solo por el trabajo que intercambia.",
        },
      ],
      title: "Cuatro tiempos: dos isotermas y dos adiabáticas",
      blocks: [
        {
          kind: "text",
          text: "El gas se pone en contacto sucesivamente con el foco caliente, con una base aislante, con el foco frío y de nuevo con la base aislante. Recorre el ciclo en el sentido de las agujas del reloj.",
        },
        {
          kind: "text",
          text: "Las **isotermas** son hipérbolas ($pV$ constante) y las **adiabáticas** son más inclinadas ($pV^\\gamma$ constante). El área encerrada es el **trabajo neto**.",
        },
      ],
      visual: { kind: "anim", scene: "carnot-ciclo", beatMs: 5800 },
    },
    {
      id: "rendimiento",
      type: "slide",
      help: [
        {
          label: "¿De dónde sale 1 − T_f/T_c?",
          message: "Se divide $Q_f = R\\,T_f\\ln(V_3/V_4)$ entre $Q_c = R\\,T_c\\ln(V_2/V_1)$. Por las adiabáticas, $V_3/V_4 = V_2/V_1$ y los logaritmos se cancelan.",
        },
      ],
      title: "Un rendimiento que solo depende de las temperaturas",
      blocks: [
        {
          kind: "rule",
          title: "Rendimiento de Carnot",
          formula: "\\eta = 1 - \\dfrac{T_f}{T_c}",
          text: "Con $T_c$ y $T_f$ **en kelvin**. Cualquier ciclo reversible entre los mismos focos tiene el mismo rendimiento, y ninguna otra máquina lo supera.",
        },
        {
          kind: "warning",
          title: "Ojo con los kelvin",
          text: "Las **diferencias** de temperatura son iguales en °C y K, pero los **cocientes** no: $60/20 = 3$ frente a $333/293 = 1{,}14$.",
        },
      ],
      visual: { kind: "tool", tool: "carnot-explorador", params: { a: 900, b: 20 } },
    },
    {
      id: "check-ejemplo1",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Kelvin", message: "$T_c = 900 + 273$ y $T_f = 20 + 273$." }],
      title: "Carnot entre 20 y 900 °C",
      question: "¿Qué rendimiento tiene un ciclo de Carnot que trabaja entre $20$ °C y $900$ °C? (en %, redondea a la unidad)",
      correctAnswers: ["75", "75 %", "75%", "74,9", "74.9"],
      explanation: "$T_c = 1\\,173$ K, $T_f = 293$ K: $\\eta = 1 - 293/1\\,173 = 0{,}75$, es decir, $75\\,\\%$.",
    },
    {
      id: "check-kelvin",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Cociente", message: "$\\eta = 1 - T_f/T_c = 1 - 300/600$." }],
      title: "En kelvin",
      question: "Un motor ideal toma calor a $600$ K y lo cede a $300$ K. ¿Qué rendimiento máximo tiene? (en %)",
      correctAnswers: ["50", "50 %", "50%"],
      explanation: "$\\eta = 1 - 300/600 = 0{,}5$: $50\\,\\%$.",
    },
    {
      id: "check-mejora",
      type: "predict",
      help: [{ label: "Pista", message: "$\\eta = 1 - T_f/T_c$: para que $\\eta$ sea grande, $T_f/T_c$ debe ser pequeño." }],
      title: "¿Cómo mejorar el rendimiento?",
      question: "En un ciclo de Carnot, ¿qué conviene para aumentar el rendimiento?",
      mode: "choice",
      choices: [
        { id: "ok", label: "Aumentar la temperatura del foco caliente o disminuir la del frío" },
        { id: "mismo", label: "Aumentar las dos temperaturas la misma cantidad de grados", incorrectFeedback: "El cociente $T_f/T_c$ se acerca a 1 y el rendimiento baja." },
        { id: "gas", label: "Cambiar el gas del cilindro", incorrectFeedback: "Para el ciclo reversible el rendimiento no depende de la sustancia." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "Cuanto mayor es la diferencia relativa de temperaturas, mayor rendimiento.",
    },
    {
      id: "check-autoeval-carnot",
      type: "predict",
      help: [{ label: "Pista", message: "Si $\\eta = 100\\,\\%$ hará falta $T_f = 0$ K, que es inalcanzable." }],
      title: "El máximo posible",
      question: "El rendimiento de una máquina térmica que funciona según un ciclo de Carnot es:",
      mode: "choice",
      choices: [
        { id: "max", label: "El mayor posible entre dos focos dados; ninguna máquina puede superarlo" },
        { id: "cien", label: "La unidad (100 %), pues es la máquina ideal", incorrectFeedback: "Haría falta un foco frío a $0$ K, que no existe." },
        { id: "mejorar", label: "No es el máximo: ahora se pueden construir mejores máquinas", incorrectFeedback: "Es un límite de la naturaleza, no de la tecnología." },
      ],
      correctChoiceId: "max",
      shuffleChoices: true,
      explanation: "Una máquina más eficiente que la de Carnot permitiría, acoplada a ella funcionando al revés, trasladar calor de frío a caliente sin gastar trabajo, y eso contradice el segundo principio.",
    },
  ],
};
