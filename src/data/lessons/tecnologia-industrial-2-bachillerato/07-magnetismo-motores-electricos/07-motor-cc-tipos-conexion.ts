import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_7_SUBTITLE } from "@/data/lessons/shared";

export const motorCcTiposConexionLesson: InteractiveLesson = {
  slug: "motor-cc-tipos-conexion",
  title: "7. Tipos de motores de corriente continua",
  subtitle: TEMA_TI2_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "tipos",
      type: "slide",
      help: [
        {
          label: "¿Qué es la excitación?",
          message: "La corriente que circula por el inductor para crear el campo. Según cómo se conecte el inductor al inducido, se obtienen los distintos tipos de motor.",
        },
      ],
      title: "Tres formas de conectar inductor e inducido",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Excitación independiente",
            text: "Inducido (A, B) e inductor (J, K) con **fuentes distintas**. El flujo es constante porque $I_{ex}$ es constante.",
            math: ["I = I_i = \\dfrac{U - E'}{r_i}"],
            tone: "info",
          },
          right: {
            title: "Derivación",
            text: "Inductor (C, D) en **paralelo** con el inducido, a la **misma tensión**. El flujo es prácticamente constante.",
            math: ["I_{ex} = \\dfrac{U}{R_d}", "I = I_i + I_{ex}"],
            tone: "key",
          },
        },
        {
          kind: "compare",
          left: {
            title: "Serie",
            text: "Inductor (E, F) en **serie** con el inducido: **el flujo depende de la carga**. Pasa la misma corriente por los dos.",
            math: ["I = I_i = I_{ex} = \\dfrac{U - E'}{r_i + r_s}"],
            tone: "ok",
          },
          right: {
            title: "Compuesto",
            text: "Mezcla las características de los dos anteriores. No se estudia en este curso.",
            tone: "warn",
          },
        },
      ],
      arrange: "stack",
    },
    {
      id: "explora-tipos",
      type: "slide",
      help: [
        {
          label: "¿Por qué la corriente de arranque es distinta en el serie?",
          message: "Porque las dos resistencias ($r_i$ y $r_s$) están en serie en el arranque, mientras que en el derivación solo limita $r_i$ al inducido.",
        },
      ],
      title: "Las corrientes en cada conexión",
      blocks: [
        {
          kind: "text",
          text: "Elige el tipo de excitación, cambia $E'$ y comprueba qué intensidad pasa por cada circuito. Esta herramienta resuelve los ejemplos del libro.",
        },
      ],
      visual: { kind: "tool", tool: "motor-cc-explorador", params: { a: 200, b: 160 } },
    },
    {
      id: "check-ex3",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Pasos", message: "$I_{ex} = U/R_d$; $I_i = (U - E')/r_i$; $I = I_i + I_{ex}$." }],
      title: "Un motor derivación",
      question: "Un motor derivación está conectado a $200$ V; $R_d = 200\\ \\Omega$, $r_i = 4\\ \\Omega$ y $E' = 160$ V. ¿Qué intensidad absorbe de la red? (en A)",
      correctAnswers: ["11"],
      explanation: "$I_{ex} = 200/200 = 1$ A; $I_i = 40/4 = 10$ A; $I = 10 + 1 = 11$ A.",
    },
    {
      id: "check-ex4",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "En serie", message: "La corriente es la misma en inductor e inducido: $I = (U - E')/(r_i + r_s)$." }],
      title: "Un motor serie",
      question: "Un motor serie conectado a $200$ V tiene $r_i = 2\\ \\Omega$, $r_s = 4\\ \\Omega$ y $E' = 170$ V. ¿Cuál es la intensidad de carga? (en A)",
      correctAnswers: ["5"],
      explanation: "$I = 30/6 = 5$ A, la misma en el inducido y en el inductor.",
    },
    {
      id: "check-indep-deriv",
      type: "predict",
      help: [{ label: "Pista", message: "Fíjate en de dónde se alimenta el devanado de excitación." }],
      title: "Independiente frente a derivación",
      question: "El motor de excitación independiente se diferencia del motor derivación en que:",
      mode: "choice",
      choices: [
        { id: "fuente", label: "El circuito de excitación del primero se alimenta de una fuente distinta a la del inducido; en el derivación, de la misma" },
        { id: "serie", label: "En el independiente el inductor está en serie con el inducido", incorrectFeedback: "Eso describe el motor serie." },
        { id: "sin", label: "El independiente no tiene circuito inductor", incorrectFeedback: "Tiene inductor, alimentado por otra fuente." },
        { id: "resis", label: "El inductor del independiente tiene poca resistencia y el del derivación mucha", incorrectFeedback: "No es la diferencia: es el modo de alimentación." },
      ],
      correctChoiceId: "fuente",
      shuffleChoices: true,
      explanation: "Con la misma fuente (derivación) o con otra (independiente), el flujo es constante en ambos.",
    },
    {
      id: "clasifica-conexion",
      type: "classify",
      help: [{ label: "Pista", message: "Serie: misma corriente por inductor e inducido. Derivación: inductor en paralelo." }],
      title: "¿Qué motor es?",
      question: "Asigna cada característica a su motor.",
      groups: [
        { id: "indep", label: "Independiente", tone: "cobalt" },
        { id: "deriv", label: "Derivación", tone: "emerald" },
        { id: "serie", label: "Serie", tone: "amber" },
      ],
      items: [
        { id: "a", text: "El inductor tiene su propia fuente de tensión", group: "indep" },
        { id: "b", text: "El inductor está en paralelo con el inducido", group: "deriv" },
        { id: "c", text: "La misma corriente atraviesa inductor e inducido", group: "serie" },
        { id: "d", text: "El flujo depende de la carga", group: "serie" },
        { id: "e", text: "I = I_i + I_ex", group: "deriv" },
        { id: "f", text: "I = I_i", group: "indep" },
      ],
      hint: "Piensa en cómo se conectan los dos devanados.",
      explanation: "El libro estudia estos tres; el compuesto mezcla las características de serie y derivación.",
    },
  ],
};
