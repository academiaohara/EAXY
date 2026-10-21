import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_2_SUBTITLE } from "@/data/lessons/shared";

export const diagramaHierroCarbonoLesson: InteractiveLesson = {
  slug: "diagrama-hierro-carbono",
  title: "7. El diagrama hierro-carbono",
  subtitle: TEMA_TI2_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "constituyentes",
      type: "slide",
      help: [
        {
          label: "¿Por qué hierro-carburo de hierro?",
          message: "A temperatura ambiente casi todo el carbono está combinado con el hierro como carburo de hierro, Fe₃C (cementita), que tiene un 6,67 % de C.",
        },
      ],
      title: "Los constituyentes de las aleaciones Fe-C",
      blocks: [
        {
          kind: "compare",
          left: { title: "Ferrita (hierro α)", text: "Solución de C en hierro α (máx. $0{,}008\\,\\%$). **Blanda y dúctil**: unos $90$ HB, alargamiento del $30$–$40\\,\\%$. Red BCC.", tone: "ok" },
          right: { title: "Cementita (Fe₃C)", text: "**El constituyente más duro y frágil**: hasta $800$ HB. Pierde el magnetismo por encima de $210$ °C.", tone: "warn" },
        },
        {
          kind: "facts",
          items: [
            { tex: "\\text{Perlita} = 86{,}5\\,\\%\\ \\text{ferrita} + 13{,}5\\,\\%\\ \\text{cementita}", label: "láminas alternas, unos 200 HB" },
            { tex: "\\text{Austenita} = \\gamma\\text{-Fe} + \\text{C}", label: "solución de inserción, de 0 a 1,76 % de C; no magnética" },
            { tex: "\\text{Martensita}", label: "se obtiene por temple: la más dura tras la cementita" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "enfriamiento-05",
      type: "slide",
      help: [
        {
          label: "¿Qué pasa en A₃?",
          message: "El hierro γ (FCC) no puede mantener tanto carbono disuelto cuando se enfría: empieza a transformarse en hierro α (BCC), que casi no admite carbono, y el carbono sobrante enriquece la austenita restante.",
        },
      ],
      title: "Un acero hipoeutectoide: 0,5 % de C",
      blocks: [
        {
          kind: "text",
          text: "Sigue el enfriamiento desde el estado líquido hasta temperatura ambiente. Cada paso cambia la fase y el aspecto de los granos.",
        },
        {
          kind: "warning",
          title: "Dos convenios",
          text: "El libro usa el **eutectoide en 0,89 % de C** y **1,76 %** como máximo de C en la austenita. Otros textos y diagramas dan $0{,}77\\,\\%$ y $2{,}11\\,\\%$. Aquí seguimos los valores del libro.",
        },
      ],
      visual: { kind: "anim", scene: "fec-enfriamiento", params: { a: 0.5 }, beatMs: 4200 },
    },
    {
      id: "check-perlita",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Regla de la palanca", message: "A temperatura ambiente solo hay ferrita (≈ $0\\,\\%$ C) y perlita ($0{,}89\\,\\%$ C). La fracción de perlita es $\\dfrac{C - 0}{0{,}89 - 0}$." }],
      title: "Cuánta perlita",
      question: "Un acero con el $0{,}5\\,\\%$ de C, enfriado lentamente hasta temperatura ambiente, ¿qué porcentaje de perlita contiene? (redondea a la unidad, solo el número)",
      correctAnswers: ["56"],
      explanation: "$W_{perlita} = \\dfrac{0{,}5}{0{,}89} = 0{,}562$, o sea, un $56\\,\\%$. El resto ($44\\,\\%$) es ferrita proeutectoide.",
    },
    {
      id: "enfriamiento-12",
      type: "slide",
      help: [
        {
          label: "¿Por qué ahora aparece cementita?",
          message: "Con más del 0,89 % de C, al enfriarse la austenita ya no puede disolver todo el carbono y el exceso se separa como cementita desde la línea A_cm.",
        },
      ],
      title: "Un acero hipereutectoide: 1,2 % de C",
      blocks: [
        {
          kind: "rule",
          title: "Acero hipoeutectoide frente a hipereutectoide",
          text: "**Hipoeutectoide** ($< 0{,}89\\,\\%$ C): ferrita + perlita. **Eutectoide** ($0{,}89\\,\\%$ C): solo perlita. **Hipereutectoide** ($> 0{,}89\\,\\%$ C): cementita + perlita.",
        },
      ],
      visual: { kind: "anim", scene: "fec-enfriamiento", params: { a: 1.2 }, beatMs: 4200 },
    },
    {
      id: "check-cementita",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Palanca", message: "Justo por encima de $A_1$ la austenita tiene $0{,}89\\,\\%$ de C y la cementita $6{,}67\\,\\%$. La aleación tiene $1{,}2\\,\\%$." }],
      title: "Cementita proeutectoide",
      question: "En el acero con el $1{,}2\\,\\%$ de C, justo por encima de $A_1$ ¿qué porcentaje de cementita hay? (una decimal, solo el número)",
      correctAnswers: ["5,4", "5.4"],
      explanation: "$W_{Fe_3C} = \\dfrac{1{,}2 - 0{,}89}{6{,}67 - 0{,}89} = \\dfrac{0{,}31}{5{,}78} = 0{,}054$, es decir, el $5{,}4\\,\\%$.",
    },
    {
      id: "explora",
      type: "slide",
      help: [
        {
          label: "¿Qué observar?",
          message: "Fija una composición y baja la temperatura: ves cada cambio de fase. Después fija 20 °C y mueve el carbono: cambia el reparto entre perlita y el otro constituyente.",
        },
      ],
      title: "Explora el diagrama",
      blocks: [
        {
          kind: "text",
          text: "Mueve el porcentaje de carbono y la temperatura. Comprueba en qué región cae cada punto y cuánto hay de cada constituyente.",
        },
      ],
      visual: { kind: "tool", tool: "fe-c-explorador", params: { a: 0.4, b: 600 } },
    },
    {
      id: "check-duro",
      type: "predict",
      help: [{ label: "800 HB", message: "Uno de los constituyentes llega a 800 HB: es mucho más duro que la ferrita (90 HB) o la perlita (200 HB)." }],
      title: "El más duro",
      question: "El constituyente **más duro** de los aceros es:",
      mode: "choice",
      choices: [
        { id: "cem", label: "La cementita o carburo de hierro" },
        { id: "perl", label: "La perlita, por tener cementita y ferrita", incorrectFeedback: "La perlita es una mezcla: más dura que la ferrita, pero mucho más blanda que la cementita." },
        { id: "mart", label: "La martensita", incorrectFeedback: "La martensita es muy dura, pero la cementita lo es todavía más." },
      ],
      correctChoiceId: "cem",
      shuffleChoices: true,
      explanation: "La cementita llega a 800 HB. Después viene la martensita (50–68 HRC).",
    },
    {
      id: "check-tipo",
      type: "predict",
      help: [{ label: "Compara con 0,89", message: "El punto eutectoide está en $0{,}89\\,\\%$ de C." }],
      title: "Hipo o hiper",
      question: "Un acero con el $0{,}3\\,\\%$ de C es:",
      mode: "choice",
      choices: [
        { id: "hipo", label: "Hipoeutectoide: ferrita + perlita" },
        { id: "eut", label: "Eutectoide", incorrectFeedback: "Eutectoide es exactamente el 0,89 % de C." },
        { id: "hiper", label: "Hipereutectoide", incorrectFeedback: "Hipereutectoide es más del 0,89 % de C." },
      ],
      correctChoiceId: "hipo",
      shuffleChoices: true,
      explanation: "$0{,}3 < 0{,}89$, así que está a la izquierda del eutectoide: ferrita proeutectoide + perlita.",
    },
  ],
};
