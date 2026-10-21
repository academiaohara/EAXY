import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_4_SUBTITLE } from "@/data/lessons/shared";

export const nernstFaradayCorrosionLesson: InteractiveLesson = {
  slug: "nernst-faraday-corrosion",
  title: "6. Ley de Nernst y ley de Faraday",
  subtitle: TEMA_TI2_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "nernst",
      type: "slide",
      help: [
        {
          label: "¿Por qué cambia la tensión?",
          message: "Los potenciales de la tabla corresponden a concentración 1 M. Sin membrana, las concentraciones cambian con el tiempo (una aumenta y otra disminuye) y la tensión va disminuyendo.",
        },
      ],
      title: "Ley de Nernst: la concentración también cuenta",
      blocks: [
        {
          kind: "rule",
          title: "A temperatura próxima a 25 °C",
          formula: "\\Delta U = (U_2 - U_1) - \\dfrac{0{,}0592}{n}\\log\\dfrac{[M_1^{n+}]}{[M_2^{n+}]}",
          text: "$n$ es el número de electrones de la reacción y $[M^{n+}]$ la concentración molar de los iones metálicos.",
        },
        {
          kind: "text",
          text: "Cambia la concentración de los iones de cada electrodo. Con diferencias muy grandes de concentración, ¿puede invertirse el sentido de la corrosión?",
        },
      ],
      visual: { kind: "tool", tool: "nernst-explorador", params: { a: 6, b: 7, c: -0.3 } },
    },
    {
      id: "check-nernst",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Sustituye", message: "$\\Delta U = 0{,}01 - \\dfrac{0{,}0592}{2}\\log\\dfrac{0{,}5}{0{,}001}$. El logaritmo de $500$ es $2{,}70$." }],
      title: "Estaño y plomo",
      question: "Un electrodo de Sn en una disolución $0{,}5$ M de $Sn^{2+}$ y otro de Pb en $0{,}001$ M de $Pb^{2+}$. Con $U_{Sn} = -0{,}14$ V, $U_{Pb} = -0{,}13$ V y $n = 2$, ¿cuánto vale $\\Delta U$ en V? (con dos decimales; usa el signo)",
      correctAnswers: ["-0,07", "-0.07", "−0,07", "−0.07"],
      explanation: "$\\Delta U = 0{,}01 - 0{,}0296\\cdot \\log 500 = 0{,}01 - 0{,}080 = -0{,}07$ V. Es **negativo**: el sentido de la reacción se invierte y ahora se corroe el plomo.",
    },
    {
      id: "check-nernst-sentido",
      type: "predict",
      help: [{ label: "Interpretar el signo", message: "$\\Delta U$ negativo significa que la reacción espontánea va en el sentido contrario al supuesto." }],
      title: "Efecto de la concentración",
      question: "Con concentraciones estándar el Sn es el ánodo ($\\Delta U_0 = +0{,}01$ V). Con $[Sn^{2+}] = 0{,}5$ M y $[Pb^{2+}] = 0{,}001$ M, $\\Delta U < 0$. ¿Qué significa?",
      mode: "choice",
      choices: [
        { id: "invierte", label: "Que el sentido de la reacción se invierte: pasa a corroerse el plomo" },
        { id: "igual", label: "Que sigue corroyéndose el estaño, pero más despacio", incorrectFeedback: "Un valor negativo no es «más despacio»: indica el sentido contrario." },
        { id: "nada", label: "Que la pila deja de funcionar y no se corroe ninguno", incorrectFeedback: "Funciona, pero en sentido contrario." },
      ],
      correctChoiceId: "invierte",
      shuffleChoices: true,
      explanation: "La concentración de iones decide a veces qué metal es el ánodo: con potenciales tan próximos, basta una diferencia grande de concentraciones.",
    },
    {
      id: "faraday",
      type: "slide",
      help: [
        {
          label: "¿Qué es la constante de Faraday?",
          message: "La carga de un mol de electrones: $96\\,500$ culombios/mol. Dividir $I\\,t$ entre $F$ da los moles de electrones, y entre $n$, los moles de metal.",
        },
      ],
      title: "Ley de Faraday: cuánto metal se deposita",
      blocks: [
        {
          kind: "rule",
          formula: "m = \\dfrac{I\\,t\\,M}{n\\,F}",
          text: "$m$ masa (g), $I$ intensidad (A), $t$ tiempo (s), $M$ masa molecular, $n$ valencia del ion y $F = 96\\,500$ C/mol.",
        },
        {
          kind: "text",
          text: "Sirve igual para la masa de metal **corroído** que para la **depositada** en un recubrimiento electrolítico. Elige el metal y calcula el espesor de la capa.",
        },
      ],
      visual: { kind: "tool", tool: "faraday-explorador", params: { a: 0, b: 10, c: 60 } },
    },
    {
      id: "check-faraday-masa",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Unidades", message: "$t = 3\\,600$ s; $M = 65{,}38$ g/mol; $n = 2$; $F = 96\\,500$ C/mol." }],
      title: "Cinc depositado en una hora",
      question: "Se deposita Zn sobre un cátodo de acero con una corriente de $10$ A durante $1$ h. ($M = 65{,}38$; $n = 2$). ¿Qué masa de Zn se deposita? (en g, con una decimal)",
      correctAnswers: ["12,2", "12.2"],
      explanation: "$m = \\dfrac{10\\cdot 3\\,600\\cdot 65{,}38}{2\\cdot 96\\,500} = 12{,}2$ g.",
    },
    {
      id: "check-faraday-tiempo",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Volumen y masa", message: "Volumen de la capa: $20\\ \\text{mm}^3 = 0{,}02\\ \\text{cm}^3$. Masa $= 0{,}02\\cdot 7{,}13 = 0{,}1426$ g. A $12{,}2$ g por hora, ¿cuántos segundos hacen falta?" }],
      title: "Tiempo para una capa de 0,05 mm",
      question: "El cátodo mide $2\\times 1$ cm, con dos caras, y se quiere una capa de $0{,}05$ mm de Zn (densidad $7{,}13$ g/cm³; $12{,}2$ g por hora). ¿Cuántos segundos hacen falta? (redondea a la unidad)",
      correctAnswers: ["42"],
      explanation: "$m = 0{,}02\\cdot 7{,}13 = 0{,}1426$ g y $t = \\dfrac{0{,}1426}{12{,}2/3\\,600} = 42$ s.",
    },
    {
      id: "check-faraday-proporcion",
      type: "predict",
      help: [{ label: "Fórmula", message: "La masa es proporcional a $I\\cdot t$ (carga que circula)." }],
      title: "Doblar la intensidad",
      question: "Si en el mismo recubrimiento se duplica la intensidad de corriente y se mantiene el tiempo, la masa depositada:",
      mode: "choice",
      choices: [
        { id: "doble", label: "Se duplica" },
        { id: "mitad", label: "Se reduce a la mitad", incorrectFeedback: "La masa es proporcional a la carga $I\\,t$: más corriente, más metal." },
        { id: "igual", label: "No cambia", incorrectFeedback: "Depende directamente de la intensidad." },
      ],
      correctChoiceId: "doble",
      shuffleChoices: true,
      explanation: "$m = \\dfrac{I\\,t\\,M}{n\\,F}$ es directamente proporcional a $I$ y a $t$.",
    },
  ],
};
