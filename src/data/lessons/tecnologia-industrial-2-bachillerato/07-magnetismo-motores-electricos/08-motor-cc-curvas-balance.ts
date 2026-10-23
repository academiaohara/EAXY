import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_7_SUBTITLE } from "@/data/lessons/shared";

export const motorCcCurvasBalanceLesson: InteractiveLesson = {
  slug: "motor-cc-curvas-balance",
  title: "8. Curvas características y balance de potencias",
  subtitle: TEMA_TI2_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "curvas",
      type: "slide",
      help: [
        {
          label: "¿Qué son las características?",
          message: "Gráficas que relacionan magnitudes del motor (velocidad, par, intensidad) para ver cómo se comporta en distintas condiciones de carga. La más importante es la mecánica, $M = f(n)$.",
        },
      ],
      title: "Cómo se comportan: derivación y serie",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Derivación",
            text: "Flujo constante: $n = \\dfrac{U - r_i I_i}{K''}$ baja **poco** con la carga (≈ 4 %). $M_i = K_1 I_i$ es una **recta**. Muy estable.",
            tone: "key",
          },
          right: {
            title: "Serie",
            text: "El flujo crece con $I$: $n$ es una **hipérbola** y $M_i = K_1 I_i^2$ una **parábola**. Gran par de arranque, pero **se embala en vacío**.",
            tone: "warn",
          },
        },
      ],
      visual: { kind: "tool", tool: "curvas-cc-explorador", params: { a: 10 } },
    },
    {
      id: "check-ex5",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Pasos", message: "$E' = U - r_i I_i = 230 - 2\\cdot 15 = 200$ V; $E'$ es proporcional a $n$: $n = 1\\,500\\cdot 200/226$." }],
      title: "Velocidad a 15 A",
      question: "Un motor derivación tiene $U = 230$ V, $E'_0 = 226$ V a $n_0 = 1\\,500$ rpm y $r_i = 2\\ \\Omega$. ¿A qué velocidad gira con $I_i = 15$ A? (rpm, redondea a la unidad)",
      correctAnswers: ["1327", "1 327", "1327,4", "1327.4"],
      explanation: "$E' = 230 - 30 = 200$ V; $n = 1\\,500\\cdot 200/226 = 1\\,327$ rpm.",
    },
    {
      id: "check-par",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Proporcional", message: "Con flujo constante $M = K_1 I_i$; a $20$ A el par es $100$ N·m, así que $K_1 = 5$ N·m/A." }],
      title: "Par a 15 A",
      question: "Con $M_n = 100$ N·m a $I_n = 20$ A y flujo constante, ¿qué par desarrolla a $15$ A? (en N·m)",
      correctAnswers: ["75"],
      explanation: "$K_1 = 100/20 = 5$ N·m/A; $M = 5\\cdot 15 = 75$ N·m.",
    },
    {
      id: "check-vacio",
      type: "predict",
      help: [{ label: "Pista", message: "Mira $n \\propto 1/I_i$ en el serie." }],
      title: "Un motor serie en vacío",
      question: "¿Por qué un motor de excitación serie no debe funcionar nunca en vacío?",
      mode: "choice",
      choices: [
        { id: "embala", label: "Porque al bajar la corriente baja el flujo y la velocidad crece sin límite hasta destruir el inducido" },
        { id: "para", label: "Porque se para y se calienta", incorrectFeedback: "Es al contrario: se acelera." },
        { id: "par", label: "Porque no tiene par de arranque", incorrectFeedback: "Tiene un par de arranque muy alto." },
      ],
      correctChoiceId: "embala",
      shuffleChoices: true,
      explanation: "Con cargas reducidas alcanza velocidades muy altas que pueden destruir el inducido.",
    },
    {
      id: "balance",
      type: "slide",
      help: [
        {
          label: "¿Qué son las pérdidas en el hierro?",
          message: "Las que se producen en las masas metálicas al estar sometidas a flujos variables (histéresis y corrientes de Foucault). Se calientan sin dar trabajo útil.",
        },
      ],
      title: "Balance de potencias",
      blocks: [
        {
          kind: "steps",
          items: [
            "La red entrega $P_{ab} = U\\,I$.",
            "Se pierde calor en el **cobre del inductor**, $P_{Cu1} = R_{ex}\\,I_{ex}^2$, y en el **cobre del inducido**, $P_{Cu2} = r_i\\,I_i^2$.",
            "Queda la **potencia eléctrica interna** $P_{ei} = E'\\,I_i$.",
            "Se restan las pérdidas en el **hierro** ($P_{Fe}$) y las **mecánicas** ($P_m$): lo que queda es la **potencia útil** $P_u$.",
          ],
        },
        {
          kind: "rule",
          title: "Rendimiento",
          formula: "\\eta = \\dfrac{P_u}{P_{ab}}\\cdot 100\\qquad(\\text{aproximadamente } \\eta \\approx \\dfrac{E'}{U})",
        },
      ],
      visual: { kind: "tool", tool: "balance-cc-explorador", params: { a: 150, b: 20 } },
    },
    {
      id: "check-pu",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Pasos", message: "$I_{ex} = 1$ A, $I_i = 19$ A, $P_{Cu2} = 361$ W; en vacío $P = U\\,I_0 = 300$ W, de los que $P_{Cu1} = 150$ W; entonces $P_{Fe}+P_m = 150$ W." }],
      title: "Potencia útil",
      question: "Un motor derivación a $150$ V absorbe $20$ A en carga ($r_i = 1\\ \\Omega$, $R_d = 150\\ \\Omega$); en vacío, a la tensión nominal, absorbe $2$ A. ¿Qué potencia útil entrega? (en W)",
      correctAnswers: ["2339", "2 339"],
      explanation: "$P_{ab} = 3\\,000$ W. Pérdidas: $150 + 361 + 150 = 661$ W. $P_u = 3\\,000 - 661 = 2\\,339$ W.",
    },
    {
      id: "check-eta",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Cociente", message: "$\\eta = P_u/P_{ab}$." }],
      title: "Rendimiento",
      question: "¿Cuál es el rendimiento del motor anterior? (en %, un decimal)",
      correctAnswers: ["77,9", "77.9", "78", "77,97", "77.97", "78,0"],
      explanation: "$\\eta = 2\\,339/3\\,000 = 0{,}78$: aproximadamente $78\\,\\%$ (el libro lo da como $77{,}9\\,\\%$ al truncar).",
    },
    {
      id: "check-perdidas",
      type: "predict",
      help: [{ label: "Pista", message: "Piensa en el calor y en el rozamiento." }],
      title: "Las pérdidas de un motor",
      question: "Las pérdidas de potencia de un motor eléctrico se deben a:",
      mode: "choice",
      choices: [
        { id: "todas", label: "Pérdidas en el cobre, en el hierro y mecánicas" },
        { id: "solo", label: "Solo a pérdidas mecánicas y en el cobre, pues el flujo es constante", incorrectFeedback: "Aun con flujo constante hay pérdidas en el hierro (corrientes de Foucault e histéresis en partes que ven flujo variable)." },
        { id: "mec", label: "Solo a pérdidas mecánicas y en el hierro, porque las resistencias son despreciables", incorrectFeedback: "Las resistencias no son despreciables: $r_i\\,I_i^2$ es una pérdida importante." },
        { id: "ninguna", label: "Los motores eléctricos no tienen pérdidas", incorrectFeedback: "Todo motor real tiene pérdidas." },
      ],
      correctChoiceId: "todas",
      shuffleChoices: true,
      explanation: "Cobre ($P_{Cu1}$ y $P_{Cu2}$), hierro ($P_{Fe}$) y mecánicas ($P_m$).",
    },
  ],
};
