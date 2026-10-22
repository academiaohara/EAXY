import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_5_SUBTITLE } from "@/data/lessons/shared";

export const potenciaRendimientoLesson: InteractiveLesson = {
  slug: "potencia-rendimiento",
  title: "7. Potencia, resistencias pasivas y rendimiento",
  subtitle: TEMA_TI2_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "potencia",
      type: "slide",
      help: [
        {
          label: "¿Por qué hace falta la potencia?",
          message: "El trabajo no incluye el tiempo. Subir una carga con una grúa en un minuto o en una hora requiere el mismo trabajo, pero no el mismo motor.",
        },
      ],
      title: "Potencia: trabajo en la unidad de tiempo",
      blocks: [
        {
          kind: "rule",
          formula: "P = \\dfrac{\\Delta W}{\\Delta t} = \\dfrac{F\\,\\Delta x}{\\Delta t} = F\\,v",
          text: "Unidad: el **vatio** ($1$ W $= 1$ J/s). Múltiplos: kW y MW. El caballo de vapor: $1$ CV $\\approx 735$ W.",
        },
        {
          kind: "rule",
          title: "Y el trabajo en kWh",
          formula: "W = P\\,t,\\qquad 1\\ \\text{kWh} = 1\\,000\\ \\text{J/s}\\cdot 3\\,600\\ \\text{s} = 3{,}6\\cdot 10^6\\ \\text{J}",
          text: "Es un trabajo (o una energía), no una potencia. Es la unidad que cobra la compañía eléctrica.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-escalera",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Trabajo y tiempo", message: "En una hora suben $9\\,000$ personas de $75$ kg a $5$ m: $W = 9\\,000\\cdot 75\\cdot 9{,}8\\cdot 5$ J. Divide entre $3\\,600$ s." }],
      title: "Escalera mecánica",
      question: "Una escalera mecánica sube $9\\,000$ personas por hora (de $75$ kg de media) salvando $5$ m de desnivel. ¿Qué potencia media debe suministrar el motor? (en kW, con una decimal)",
      correctAnswers: ["9,2", "9.2"],
      explanation: "$W = 9\\,000\\cdot 75\\cdot 9{,}8\\cdot 5 = 33\\,075\\,000$ J y $P = 33\\,075\\,000/3\\,600 = 9\\,187{,}5$ W $\\approx 9{,}2$ kW $\\approx 12{,}5$ CV.",
    },
    {
      id: "check-kwh",
      type: "predict",
      help: [{ label: "kW · h", message: "Potencia por tiempo es trabajo." }],
      title: "¿Qué unidad no es de potencia?",
      question: "Indica qué unidad **no** se corresponde con una potencia:",
      mode: "choice",
      choices: [
        { id: "kwh", label: "Kilovatios por hora (kW·h)" },
        { id: "va", label: "Voltio por amperio (V·A)", incorrectFeedback: "$P = U\\,I$: es una potencia, en vatios." },
        { id: "js", label: "Julios entre segundos (J/s)", incorrectFeedback: "Es la definición del vatio." },
        { id: "cv", label: "Caballo de vapor (CV)", incorrectFeedback: "Es una unidad de potencia del Sistema Técnico." },
      ],
      correctChoiceId: "kwh",
      shuffleChoices: true,
      explanation: "El kW·h es potencia por tiempo: una unidad de **trabajo o energía**.",
    },
    {
      id: "rendimiento",
      type: "slide",
      help: [
        {
          label: "¿Qué son las resistencias pasivas?",
          message: "Esfuerzos no útiles: rozamiento, rigidez de cuerdas y cables, choques y vibraciones, resistencia de los fluidos. Consumen parte del trabajo motor.",
        },
      ],
      title: "Resistencias pasivas y rendimiento",
      blocks: [
        {
          kind: "rule",
          title: "Balance con rozamiento",
          formula: "W = \\Delta E_p + \\Delta E_c + W_r,\\qquad F_r = N\\,\\mu",
          text: "El trabajo de rozamiento $W_r$ se disipa en forma de calor. El rozamiento es proporcional a la normal, independiente de la velocidad y de la superficie de contacto, y es mayor al comenzar a moverse (estático) que en marcha (dinámico).",
        },
        {
          kind: "rule",
          title: "Rendimiento mecánico",
          formula: "\\eta = \\dfrac{W_u}{W_m} = \\dfrac{W_m - W_r}{W_m} = 1 - \\dfrac{W_r}{W_m}",
          text: "Es siempre menor que 1. También se puede expresar con potencias: $\\eta = P_u/P_m$.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "cadena",
      type: "slide",
      help: [
        {
          label: "¿Por qué se multiplican?",
          message: "Porque cada máquina recibe solo la fracción que le entrega la anterior. Si una da el $30\\,\\%$ y la siguiente el $95\\,\\%$, al final queda $0{,}30\\cdot 0{,}95$ de la entrada.",
        },
      ],
      title: "Varias máquinas en serie",
      blocks: [
        {
          kind: "text",
          text: "En un conjunto de máquinas (térmica, eléctrica, de transmisión), el rendimiento total es el **producto** de los rendimientos parciales: $\\eta_t = \\eta_1\\,\\eta_2\\cdots\\eta_n$.",
        },
        {
          kind: "text",
          text: "Ejemplo del libro: motor térmico $30\\,\\%$, alternador $95\\,\\%$, transformador $90\\,\\%$, motor eléctrico $80\\,\\%$ y reductor $96\\,\\%$. Modifica cada uno.",
        },
      ],
      visual: { kind: "tool", tool: "rendimiento-cadena", params: { a: 10 } },
    },
    {
      id: "check-eta-total",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Producto", message: "$0{,}30\\cdot 0{,}95\\cdot 0{,}90\\cdot 0{,}80\\cdot 0{,}96$." }],
      title: "Rendimiento de la instalación",
      question: "¿Cuál es el rendimiento total (en %) de la instalación con $\\eta = 30\\,\\%$, $95\\,\\%$, $90\\,\\%$, $80\\,\\%$ y $96\\,\\%$? (con una decimal)",
      correctAnswers: ["19,7", "19.7"],
      explanation: "$\\eta = 0{,}3\\cdot 0{,}95\\cdot 0{,}90\\cdot 0{,}80\\cdot 0{,}96 = 0{,}197$, es decir, el $19{,}7\\,\\%$.",
    },
    {
      id: "check-eta-def",
      type: "predict",
      help: [{ label: "Útil entre motor", message: "El rendimiento compara lo que aprovechas con lo que entra." }],
      title: "Definición de rendimiento",
      question: "El rendimiento mecánico es:",
      mode: "choice",
      choices: [
        { id: "ok", label: "El cociente entre el trabajo útil y el trabajo motor" },
        { id: "perdido", label: "El cociente entre el trabajo útil y el trabajo que se pierde", incorrectFeedback: "El trabajo que se pierde es el de rozamiento; el rendimiento lo compara con el motor." },
        { id: "mitad", label: "La mitad del trabajo motor", incorrectFeedback: "No hay un factor fijo: depende de las pérdidas." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "$\\eta = W_u/W_m = P_u/P_m$.",
    },
    {
      id: "vehiculo",
      type: "slide",
      help: [
        {
          label: "¿Por qué crece tanto con la velocidad?",
          message: "La resistencia del aire es proporcional a $v^2$ y la potencia es $F\\,v$: crece con $v^3$. Doblar la velocidad multiplica por 8 la potencia que gasta el aire.",
        },
      ],
      title: "Potencia de un automóvil a velocidad constante",
      blocks: [
        {
          kind: "text",
          text: "Un coche de $1$ t va por autopista en llano a $120$ km/h. Debe vencer la **resistencia del aire** y la de **rodadura**: $R_a = \\tfrac{1}{16}C_x S v^2$ (kp, con $v$ en m/s) y $R_r = Q\\,\\mu$. Después, $P = F\\,v/\\eta$.",
        },
        {
          kind: "text",
          text: "Sube y baja la velocidad: ¿cuál de las dos resistencias domina?",
        },
      ],
      visual: { kind: "tool", tool: "potencia-vehiculo", params: { a: 120, b: 0.5 } },
    },
    {
      id: "check-v3",
      type: "predict",
      help: [{ label: "Potencia", message: "$P = F\\,v$ y $F_a \\propto v^2$." }],
      title: "Doblar la velocidad",
      question: "Si la resistencia del aire es proporcional a $v^2$, ¿por cuánto se multiplica la potencia necesaria para vencerla al **doblar** la velocidad?",
      mode: "choice",
      choices: [
        { id: "ocho", label: "Por 8" },
        { id: "dos", label: "Por 2", incorrectFeedback: "Eso sería con una resistencia constante." },
        { id: "cuatro", label: "Por 4", incorrectFeedback: "Se multiplica por 4 la fuerza, pero además la velocidad se duplica: $P = F\\,v$." },
      ],
      correctChoiceId: "ocho",
      shuffleChoices: true,
      explanation: "$P = F\\,v \\propto v^2\\cdot v = v^3$: $2^3 = 8$.",
    },
  ],
};
