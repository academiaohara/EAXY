import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_7_SUBTITLE } from "@/data/lessons/shared";

export const motorTrifasicoConexionBalanceLesson: InteractiveLesson = {
  slug: "motor-trifasico-conexion-balance",
  title: "11. Conexión, curvas y balance del motor trifásico",
  subtitle: TEMA_TI2_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "conexion",
      type: "slide",
      help: [
        {
          label: "¿Por qué mirar la tensión menor de la placa?",
          message: "Porque es la tensión que debe soportar cada devanado. Con una red de 230 V hay que dejar los devanados a 230 V (triángulo); con una de 400 V, también a 230 V, y eso se consigue con la estrella.",
        },
      ],
      title: "Estrella y triángulo",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Estrella (Y)",
            text: "Se unen los **finales** de los devanados en un punto común.",
            math: ["U_L = \\sqrt{3}\\,U_f", "I_L = I_f"],
            tone: "info",
          },
          right: {
            title: "Triángulo (Δ)",
            text: "Se une el **final** de cada devanado con el **principio** del siguiente.",
            math: ["U_L = U_f", "I_L = \\sqrt{3}\\,I_f"],
            tone: "key",
          },
        },
        {
          kind: "text",
          text: "La placa da **dos tensiones**, por ejemplo $230/400$ V: el devanado soporta la menor ($230$ V). Con una línea de $230$ V → **triángulo**; con una de $400$ V → **estrella**.",
        },
      ],
      visual: { kind: "tool", tool: "trifasico-conexion-explorador", params: { a: 18 } },
    },
    {
      id: "check-230",
      type: "predict",
      help: [{ label: "Pista", message: "Cada devanado debe recibir 230 V, y la tensión de línea de la red es 230 V." }],
      title: "Motor 230/400 V en una red de 230 V",
      question: "Un motor trifásico de $230/400$ V se conecta a una red de $230$ V. La conexión correcta será:",
      mode: "choice",
      choices: [
        { id: "tri", label: "Triángulo" },
        { id: "est", label: "Estrella", incorrectFeedback: "En estrella cada devanado recibiría $230/\\sqrt{3} = 133$ V: poca tensión." },
        { id: "et", label: "Estrella-triángulo", incorrectFeedback: "Es un método de arranque, no una conexión permanente." },
        { id: "serie", label: "Serie", incorrectFeedback: "No es una conexión trifásica." },
      ],
      correctChoiceId: "tri",
      shuffleChoices: true,
      explanation: "$U_f = U_L = 230$ V: triángulo.",
    },
    {
      id: "check-380",
      type: "predict",
      help: [{ label: "Pista", message: "$380/\\sqrt{3} \\approx 220$ V." }],
      title: "Devanados de 220 V en una red de 380 V",
      question: "Un motor trifásico cuyas fases soportan $220$ V, ¿se puede conectar a una red trifásica de $380$ V?",
      mode: "choice",
      choices: [
        { id: "si", label: "Sí, conectándolo en estrella: cada fase recibe $380/\\sqrt{3} = 220$ V" },
        { id: "tri", label: "Sí, en triángulo: cada fase recibe 380 V", incorrectFeedback: "En triángulo cada devanado recibiría $380$ V y se quemaría." },
        { id: "no", label: "No, de ninguna manera", incorrectFeedback: "La estrella lo permite." },
      ],
      correctChoiceId: "si",
      shuffleChoices: true,
      explanation: "Ver la estrella: $U_f = U_L/\\sqrt{3}$.",
    },
    {
      id: "check-if",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Triángulo", message: "$I_L = \\sqrt{3}\\,I_f$." }],
      title: "Intensidad de fase",
      question: "Un motor $230/400$ V se conecta en triángulo a una línea de $230$ V y absorbe $18$ A de línea. ¿Qué intensidad circula por cada devanado? (en A, dos decimales)",
      correctAnswers: ["10,39", "10.39", "10,4", "10.4"],
      explanation: "$I_f = 18/\\sqrt{3} = 10{,}39$ A.",
    },
    {
      id: "balance",
      type: "slide",
      help: [
        {
          label: "¿Qué es el factor de potencia?",
          message: "El $\\cos\\varphi$, que dice qué parte de la potencia aparente se convierte en potencia activa. A plena carga es máximo y en vacío es muy bajo (≈ 0,2).",
        },
      ],
      title: "Balance de potencias",
      blocks: [
        {
          kind: "rule",
          title: "Potencia absorbida",
          formula: "P = \\sqrt{3}\\,U_L\\,I_L\\cos\\varphi\\qquad Q = \\sqrt{3}\\,U_L\\,I_L\\operatorname{sen}\\varphi",
          text: "$P$ es la potencia activa y $Q$ la reactiva. $\\cos\\varphi = P/S$ es el factor de potencia.",
        },
        {
          kind: "steps",
          title: "Pérdidas",
          items: [
            "**Cobre del estator**: $P_{Cu1} = 3\\,R_1\\,I_1^2$.",
            "**Cobre del rotor**: $P_{Cu2} = 3\\,R_2\\,I_2^2$.",
            "**Hierro** ($P_{Fe}$, histéresis y Foucault) y **mecánicas** ($P_m$).",
            "$\\eta = P_u/P \\cdot 100$.",
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-ex10p",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Pasos", message: "$P_{Cu1} = 3\\cdot 1{,}5\\cdot(10{,}39)^2 = 486$ W. Las del rotor son iguales." }],
      title: "Pérdidas en el cobre del estator",
      question: "En el motor $230/400$ V (conexión en triángulo, $R_1 = 1{,}5\\ \\Omega$ por fase, $I_f = 10{,}39$ A), ¿cuántos vatios se pierden en el cobre del estator?",
      correctAnswers: ["486", "485", "486,7"],
      explanation: "$P_{Cu1} = 3\\cdot 1{,}5\\cdot 10{,}39^2 = 486$ W.",
    },
    {
      id: "check-ex10eta",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Pasos", message: "$P = \\sqrt{3}\\cdot 230\\cdot 18\\cdot 0{,}78 = 5\\,593$ W; pérdidas: $486 + 486 + 243 = 1\\,215$ W." }],
      title: "Rendimiento del motor",
      question: "Con $I_L = 18$ A, $\\cos\\varphi = 0{,}78$ a $230$ V, pérdidas del rotor iguales a las del estator ($486$ W) y pérdidas en hierro más mecánicas la mitad de las del cobre del estator ($243$ W), ¿qué rendimiento tiene? (en %, dos decimales)",
      correctAnswers: ["78,27", "78.27", "78,3", "78.3"],
      explanation: "$P_u = 5\\,593 - 1\\,215 = 4\\,378$ W y $\\eta = 4\\,378/5\\,593 = 0{,}7827$: $78{,}27\\,\\%$.",
    },
    {
      id: "curvas",
      type: "slide",
      help: [
        {
          label: "¿Qué ocurre en vacío?",
          message: "El motor gira casi a la velocidad de sincronismo y solo desarrolla el par para vencer sus pérdidas. La corriente en vacío es del 25 % al 50 % de la nominal.",
        },
      ],
      title: "La característica mecánica",
      blocks: [
        {
          kind: "text",
          text: "El punto de funcionamiento está donde se cruzan la curva $M(n)$ del motor y la de la **carga**: $M_{motor} = M_{carga}$. Tres puntos críticos: el **arranque** (debe cumplirse $M_a > M_{ra}$), el **vacío** (cerca de $n_1$) y el funcionamiento **estable** en carga.",
        },
        {
          kind: "text",
          text: "Aumenta el par de la carga y baja la tensión: ¿cuándo deja de arrancar o se «cala» el motor?",
        },
      ],
      visual: { kind: "tool", tool: "curva-par-asincrono-explorador", params: { a: 60, b: 100 } },
    },
    {
      id: "check-curva",
      type: "predict",
      help: [{ label: "Pista", message: "$M \\propto U^2$: con el $70\\,\\%$ de la tensión, el par es $0{,}7^2 \\approx 49\\,\\%$." }],
      title: "Menos tensión, menos par",
      question: "Si la tensión aplicada a un motor asíncrono baja al $70\\,\\%$ de la nominal, el par que desarrolla:",
      mode: "choice",
      choices: [
        { id: "mitad", label: "Baja aproximadamente a la mitad ($0{,}7^2 \\approx 0{,}49$)" },
        { id: "70", label: "Baja al 70 %", incorrectFeedback: "El par depende del **cuadrado** de la tensión." },
        { id: "igual", label: "No cambia", incorrectFeedback: "Cambia mucho: $M = K_1\\,U^2$." },
      ],
      correctChoiceId: "mitad",
      shuffleChoices: true,
      explanation: "Por eso bajar la tensión reduce el par de arranque más que la corriente.",
    },
  ],
};
