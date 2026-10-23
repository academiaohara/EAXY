import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_6_SUBTITLE } from "@/data/lessons/shared";

export const ciclosOttoDieselLesson: InteractiveLesson = {
  slug: "ciclos-otto-diesel",
  title: "6. Ciclos Otto y Diesel",
  subtitle: TEMA_TI2_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "otto",
      type: "slide",
      help: [
        {
          label: "¿Por qué hay seis etapas si el motor tiene cuatro tiempos?",
          message: "El diagrama incluye admisión y expulsión (0-1 y 1-0), que se compensan. El ciclo termodinámico útil son cuatro procesos; el motor real los hace en dos vueltas.",
        },
      ],
      title: "Ciclo Otto: calor a volumen constante",
      blocks: [
        {
          kind: "steps",
          items: [
            "**1-2** Compresión adiabática (se consume trabajo).",
            "**2-3** Explosión instantánea a **volumen constante**: absorbe $q_{abs} = c_v\\,(T_3 - T_2)$.",
            "**3-4** Expansión adiabática: el trabajo cedido es el área bajo la curva.",
            "**4-1** Escape: baja la presión a volumen constante y se cede $q_{ced} = c_v\\,(T_4 - T_1)$.",
          ],
        },
        {
          kind: "text",
          text: "El **trabajo neto** es el área interior del ciclo. Se supone aire como gas perfecto.",
        },
      ],
      visual: { kind: "anim", scene: "otto-diesel-pv", beatMs: 5800 },
    },
    {
      id: "rendimiento-otto",
      type: "slide",
      help: [
        {
          label: "¿Qué es la relación de compresión?",
          message: "La razón entre el volumen libre del cilindro con el pistón en el PMI y en el PMS: $r = (V_u + V_c)/V_c$.",
        },
      ],
      title: "El rendimiento Otto depende solo de r",
      blocks: [
        {
          kind: "rule",
          title: "Rendimiento del ciclo Otto",
          formula: "\\eta_{Otto} = 1 - \\dfrac{1}{r^{\\gamma-1}}",
          text: "$r$ es la **relación de compresión volumétrica** $V_B/V_A$. A más $r$, más rendimiento; pero la gasolina **detona** si se comprime demasiado.",
        },
        {
          kind: "warning",
          title: "No es lo mismo r que r_p",
          text: "Solo coinciden en la isoterma (ley de Boyle). En una compresión adiabática $r_p = r^\\gamma$: con $r = 9{,}5$, $r_p = 9{,}5^{1{,}4} \\approx 23{,}4$.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-otto-r",
      type: "predict",
      help: [{ label: "Pista", message: "$\\eta = 1 - 1/r^{\\gamma-1}$." }],
      title: "¿Qué pasa con r?",
      question: "En el ciclo Otto ideal de los motores de cuatro tiempos, el rendimiento:",
      mode: "choice",
      choices: [
        { id: "aumenta", label: "Aumenta al aumentar la relación de compresión" },
        { id: "disminuye", label: "Disminuye al aumentar la relación de compresión", incorrectFeedback: "Es al revés: $1/r^{\\gamma-1}$ disminuye cuando $r$ crece." },
        { id: "indep", label: "Es independiente de la relación de compresión", incorrectFeedback: "Depende exclusivamente de ella (y de $\\gamma$)." },
      ],
      correctChoiceId: "aumenta",
      shuffleChoices: true,
      explanation: "$\\eta_{Otto} = 1 - r^{1-\\gamma}$ crece con $r$.",
    },
    {
      id: "check-otto-10",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Potencia", message: "$10^{0{,}4} = 2{,}512$, así que $\\eta = 1 - 1/2{,}512$." }],
      title: "Rendimiento con r = 10",
      question: "¿Qué rendimiento ideal tiene un motor Otto con relación de compresión $10$ ($\\gamma = 1{,}4$)? (en %, redondea a la unidad)",
      correctAnswers: ["60", "60 %", "60%", "60,2", "60.2"],
      explanation: "$\\eta = 1 - 1/10^{0{,}4} = 1 - 0{,}398 = 0{,}602$: $60\\,\\%$.",
    },
    {
      id: "check-rp",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Fórmula", message: "$r_p = r^\\gamma = 9{,}5^{1{,}4}$." }],
      title: "Relación de presiones",
      question: "En un motor con relación de compresión volumétrica $9{,}5$, ¿cuál es la relación de presiones $r_p = r^{\\gamma}$ ($\\gamma = 1{,}4$)? (un decimal)",
      correctAnswers: ["23,4", "23.4"],
      explanation: "$r_p = 9{,}5^{1{,}4} = 23{,}4$. La presión sube mucho más que el volumen baja.",
    },
    {
      id: "diesel",
      type: "slide",
      help: [
        {
          label: "¿Por qué hasta 900 K?",
          message: "El aire se comprime tanto (más del doble que en el Otto) que su temperatura (hasta unos $900$ K) basta para inflamar el gasóleo al inyectarlo.",
        },
      ],
      title: "Ciclo Diesel: calor a presión constante",
      blocks: [
        {
          kind: "text",
          text: "En el Diesel el calor se aporta mientras se inyecta el combustible, **a presión constante** (tramo 2-3). Aparece la **relación de combustión** $r_c = V_3/V_2$.",
        },
        {
          kind: "rule",
          title: "Rendimiento del ciclo Diesel",
          formula: "\\eta_{Diesel} = 1 - \\dfrac{1}{r^{\\gamma-1}}\\,\\dfrac{r_c^{\\gamma} - 1}{\\gamma\\,(r_c - 1)}",
          text: "La fracción de la derecha es mayor que $1$: con **la misma $r$**, el Otto es más eficiente. Pero el Diesel real comprime más del doble.",
        },
        {
          kind: "text",
          text: "Explora cómo cambian los dos ciclos con $r$ y $r_c$.",
        },
      ],
      visual: { kind: "tool", tool: "otto-diesel-explorador", params: { a: 10, b: 2 } },
    },
    {
      id: "check-diesel-mejor",
      type: "predict",
      help: [{ label: "Pista", message: "Mira qué relación de compresión admite cada motor." }],
      title: "¿Por qué el Diesel suele rendir más?",
      question: "En los motores reales, el Diesel suele tener mejor rendimiento que el de gasolina. La razón principal es que:",
      mode: "choice",
      choices: [
        { id: "compresion", label: "Su relación de compresión es más del doble, porque solo comprime aire y no detona" },
        { id: "cv", label: "El gasóleo tiene un poder calorífico mucho mayor", incorrectFeedback: "Es ligeramente menor ($43\\,200$ frente a $43\\,700$ kJ/kg)." },
        { id: "chispa", label: "Porque no necesita chispa", incorrectFeedback: "Eso simplifica el encendido, pero no explica el rendimiento." },
      ],
      correctChoiceId: "compresion",
      shuffleChoices: true,
      explanation: "A mayor $r$, mayor rendimiento. El Otto está limitado por la detonación de la gasolina.",
    },
    {
      id: "balance",
      type: "slide",
      help: [
        {
          label: "¿Qué es un diagrama indicado?",
          message: "El diagrama $pV$ **real** de un motor, obtenido con aparatos indicadores. Se parece al teórico, pero redondeado: el ciclo real difiere bastante del ideal.",
        },
      ],
      title: "De la teoría a la realidad: el balance energético",
      blocks: [
        {
          kind: "text",
          text: "En un motor de explosión solo se aprovecha alrededor del **25 %** de la energía del combustible. El resto se reparte, aproximadamente, así:",
        },
        {
          kind: "facts",
          items: [
            { tex: "25\\,\\%", label: "trabajo útil" },
            { tex: "25\\,\\%", label: "gases de escape" },
            { tex: "25\\,\\%", label: "agua de refrigeración" },
            { tex: "25\\,\\%", label: "radiación y rozamientos" },
          ],
        },
        {
          kind: "text",
          text: "De ahí la importancia de los avances en materiales, fabricación y gestión del motor: cuanta más energía se transforme en calor útil dentro del ciclo, menos se pierde.",
        },
      ],
      arrange: "stack",
    },
  ],
};
