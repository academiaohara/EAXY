import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_7_SUBTITLE } from "@/data/lessons/shared";

export const motorCcArranqueRegulacionLesson: InteractiveLesson = {
  slug: "motor-cc-arranque-regulacion",
  title: "9. Arranque, regulación, inversión y frenado (CC)",
  subtitle: TEMA_TI2_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "arranque",
      type: "slide",
      help: [
        {
          label: "¿Qué dice el REBT?",
          message: "El Reglamento Electrotécnico para Baja Tensión (ITC-BT-47) limita la corriente de arranque de los motores de más de $0{,}75$ kW, para proteger la red.",
        },
      ],
      title: "El problema del arranque",
      blocks: [
        {
          kind: "text",
          text: "En el arranque la velocidad es cero y $E' = 0$: solo la resistencia $r_i$ limita la corriente, así que $I_{arranque} = \\dfrac{U}{r_i}$ puede ser **decenas de veces la nominal**. Además, el par de arranque debe ser mayor que el par resistente de la carga.",
        },
        {
          kind: "rule",
          title: "Reóstato de arranque",
          formula: "I_{ia} = \\dfrac{U}{r_i + R_a}\\quad\\Rightarrow\\quad R_a = \\dfrac{U - r_i\\,I_{ia}}{I_{ia}}",
          text: "Se intercala una resistencia entre la red y el inducido; se va eliminando poco a poco a medida que $E'$ aumenta. El inductor se alimenta a la tensión nominal para tener flujo nominal.",
        },
      ],
      visual: { kind: "tool", tool: "arranque-cc-explorador", params: { a: 250, b: 230 } },
    },
    {
      id: "check-ex7a",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Fórmula", message: "$I_i = (U - E')/r_i$." }],
      title: "Intensidad nominal del inducido",
      question: "Un motor derivación a $250$ V genera $E' = 230$ V; $r_i = 0{,}5\\ \\Omega$. ¿Qué intensidad circula por el inducido? (en A)",
      correctAnswers: ["40"],
      explanation: "$I_i = 20/0{,}5 = 40$ A.",
    },
    {
      id: "check-directo",
      type: "predict",
      mode: "numeric",
      help: [{ label: "En el arranque", message: "$E' = 0$: $I = U/r_i$." }],
      title: "Arranque directo",
      question: "Con ese motor, ¿qué intensidad absorbería el inducido si se conectara directamente a la red estando parado? (en A)",
      correctAnswers: ["500"],
      explanation: "$250/0{,}5 = 500$ A: $12{,}5$ veces la nominal. Inaceptable.",
    },
    {
      id: "check-ra",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Pasos", message: "$I_{ia} = 2\\cdot 40 = 80$ A. $R_a = (250 - 0{,}5\\cdot 80)/80$." }],
      title: "El reóstato",
      question: "¿Qué resistencia de arranque hay que colocar para que la intensidad en el arranque sea **el doble** de la nominal? (en Ω, dos decimales)",
      correctAnswers: ["2,62", "2.62", "2,63", "2.63", "2,625", "2.625"],
      explanation: "$R_a = \\dfrac{250 - 0{,}5\\cdot 80}{80} = 2{,}625\\ \\Omega$.",
    },
    {
      id: "regulacion",
      type: "slide",
      help: [
        {
          label: "¿Por qué la velocidad depende de U y del flujo?",
          message: "De $E' = K'\\,n\\,\\Phi$ y $E' = U - r_i I_i$ se obtiene $n = (U - r_i I_i)/(K'\\Phi)$.",
        },
      ],
      title: "Regulación de la velocidad",
      blocks: [
        {
          kind: "rule",
          title: "Velocidad de régimen",
          formula: "n = \\dfrac{E'}{K'\\,\\Phi} = \\dfrac{U - r_i\\,I_i}{K'\\,\\Phi}",
        },
        {
          kind: "steps",
          title: "Se puede actuar sobre…",
          items: [
            "**La tensión del inducido**: intercalando una resistencia en serie (regulación por resistencia) o variando la tensión de alimentación.",
            "**El flujo**: con un reóstato en el circuito de excitación (menos flujo, más velocidad).",
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-regulacion",
      type: "predict",
      help: [{ label: "Pista", message: "$n \\propto 1/\\Phi$ si $E'$ y $U$ son fijas." }],
      title: "Reducir el flujo",
      question: "Si en un motor derivación se reduce la corriente de excitación (menos flujo) manteniendo $U$, la velocidad:",
      mode: "choice",
      choices: [
        { id: "sube", label: "Aumenta" },
        { id: "baja", label: "Disminuye", incorrectFeedback: "$n = (U - r_i I_i)/(K'\\Phi)$: con menos flujo la velocidad sube." },
        { id: "igual", label: "No cambia", incorrectFeedback: "La velocidad depende directamente del flujo." },
      ],
      correctChoiceId: "sube",
      shuffleChoices: true,
      explanation: "Hay que tener cuidado: si el flujo cae casi a cero, el motor se embala.",
    },
    {
      id: "inversion",
      type: "slide",
      help: [
        {
          label: "¿Y si cambio las dos conexiones a la vez?",
          message: "El par no cambia de sentido: el sentido depende del producto del campo y de la corriente del inducido, y al invertir ambos el resultado es el mismo.",
        },
      ],
      title: "Inversión del sentido de giro",
      blocks: [
        {
          kind: "text",
          text: "El sentido del par depende del campo magnético y de la corriente en el inducido: basta con **invertir las conexiones del inducido o las del inductor**, pero no las dos.",
        },
        {
          kind: "steps",
          items: [
            "Con el motor **parado** da igual cuál se cambie, aunque se recomienda cambiar las del inducido.",
            "Si se invierte **en marcha**, hay que invertir el **inducido** y no el inductor: de lo contrario el motor se quedaría sin excitación.",
            "Antes de invertir, se intercala toda la resistencia del reóstato de arranque.",
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "frenado",
      type: "slide",
      help: [
        {
          label: "¿Dónde se usa?",
          message: "En la tracción eléctrica: un tren puede frenar devolviendo energía a la línea (regenerativo) o disipándola en resistencias a bordo (reostático).",
        },
      ],
      title: "Frenado eléctrico",
      blocks: [
        {
          kind: "text",
          text: "Las máquinas eléctricas son **reversibles**: al frenar, el motor pasa a funcionar como **generador**, con lo que se invierte el sentido del par.",
        },
        {
          kind: "compare",
          left: { title: "Frenado reostático", text: "La energía generada se **disipa en unas resistencias** de frenado (a menudo las del arranque).", tone: "info" },
          right: { title: "Frenado regenerativo", text: "La energía generada se **devuelve a la línea** de alimentación.", tone: "ok" },
        },
      ],
      arrange: "stack",
    },
    {
      id: "clasifica-frenado",
      type: "classify",
      help: [{ label: "Pista", message: "Reostático: se pierde en forma de calor. Regenerativo: vuelve a la red." }],
      title: "Reostático o regenerativo",
      question: "Asigna cada característica.",
      groups: [
        { id: "reostatico", label: "Frenado reostático", tone: "amber" },
        { id: "regenerativo", label: "Frenado regenerativo", tone: "emerald" },
      ],
      items: [
        { id: "a", text: "La energía se disipa en resistencias", group: "reostatico" },
        { id: "b", text: "Se devuelve energía a la línea de alimentación", group: "regenerativo" },
        { id: "c", text: "Calienta unas resistencias de frenado", group: "reostatico" },
        { id: "d", text: "Aprovecha la energía del tren que baja una pendiente", group: "regenerativo" },
      ],
      hint: "Fíjate en qué se hace con la energía generada.",
      explanation: "En ambos casos el motor actúa como generador.",
    },
  ],
};
