import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_6_SUBTITLE } from "@/data/lessons/shared";

export const refrigeracionCarnotEficienciaLesson: InteractiveLesson = {
  slug: "refrigeracion-carnot-eficiencia",
  title: "9. Refrigeración: ciclo de Carnot y eficiencia",
  subtitle: TEMA_TI2_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "por-que",
      type: "slide",
      help: [
        {
          label: "¿Por qué no basta con abrir la puerta?",
          message: "Porque el calor fluye espontáneamente del caliente al frío, nunca al revés. Enfriar por debajo del ambiente exige gastar energía.",
        },
      ],
      title: "Enfriar cuesta trabajo",
      blocks: [
        {
          kind: "text",
          text: "**Refrigerar** es mantener un objeto o lugar a una temperatura inferior a la del entorno. Como el calor no se transfiere de forma espontánea de un cuerpo frío a otro caliente, **una máquina frigorífica necesita consumir trabajo**. Hasta el siglo XX no hubo sistemas efectivos.",
        },
        {
          kind: "text",
          text: "Es el ciclo de Carnot **recorrido al revés**: se extrae calor $Q_f$ del foco frío y se cede $Q_c$ al caliente, a costa de un trabajo $W$ exterior.",
        },
      ],
      visual: { kind: "anim", scene: "carnot-frigorifico", beatMs: 5800 },
    },
    {
      id: "eficiencia",
      type: "slide",
      help: [
        {
          label: "¿Por qué se llama eficiencia y no rendimiento?",
          message: "Porque puede valer más que $1$: no es «lo útil entre lo gastado» en el mismo tipo de energía. Se la llama también coeficiente de operación (COP).",
        },
      ],
      title: "Eficiencia o coeficiente de operación",
      blocks: [
        {
          kind: "rule",
          title: "Eficiencia de una máquina frigorífica",
          formula: "\\text{Eficiencia} = \\dfrac{Q_f}{W} = \\dfrac{Q_f}{Q_c - Q_f} = \\dfrac{T_f}{T_c - T_f}",
          text: "La igualdad con las temperaturas vale para el ciclo de Carnot, el mejor posible. Cuanto **menor** sea el salto de temperatura, mayor es la eficiencia.",
        },
        {
          kind: "example",
          title: "Habitación a 23 °C con la calle a 35 °C (Carnot)",
          lines: [
            { math: "T_f = 23 + 273 = 296\\ \\text{K},\\quad T_c = 35 + 273 = 308\\ \\text{K}" },
            { math: "\\text{Eficiencia} = \\dfrac{296}{308 - 296} = 24{,}7" },
          ],
        },
      ],
      visual: { kind: "tool", tool: "frigorifica-explorador", params: { a: 23, b: 35 } },
    },
    {
      id: "check-eficiencia-ejemplo",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Kelvin", message: "Pasa las dos temperaturas a kelvin." }],
      title: "Eficiencia de Carnot",
      question: "Una nevera ideal (Carnot) mantiene su interior a $-10$ °C con el ambiente a $28$ °C. ¿Qué eficiencia tiene? (un decimal)",
      correctAnswers: ["6,9", "6.9", "6,92", "6.92"],
      explanation: "$T_f = 263$ K y $T_c = 301$ K: $263/(301 - 263) = 263/38 = 6{,}92$.",
    },
    {
      id: "check-unidad",
      type: "predict",
      help: [{ label: "Pista", message: "No es un rendimiento." }],
      title: "¿Puede superar la unidad?",
      question: "La eficiencia de una máquina frigorífica es:",
      mode: "choice",
      choices: [
        { id: "mayor", label: "Normalmente mayor que la unidad" },
        { id: "igual", label: "Igual a la unidad", incorrectFeedback: "Eso significaría que $W = Q_f$, y solo ocurre en casos concretos." },
        { id: "menor", label: "Menor que la unidad", incorrectFeedback: "Un rendimiento sí es menor que 1, pero la eficiencia frigorífica no es un rendimiento." },
      ],
      correctChoiceId: "mayor",
      shuffleChoices: true,
      explanation: "Con un trabajo $W$ se transporta un calor $Q_f$ que suele ser varias veces mayor.",
    },
    {
      id: "check-qc-real",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Carnot", message: "Eficiencia de Carnot $= 200/(350 - 200) = 1{,}33$; la real es la mitad." }],
      title: "Una máquina real",
      question: "Una máquina frigorífica funciona entre $200$ K y $350$ K con la mitad de la eficiencia de Carnot. Absorbe $1\\,200$ J del foco frío. ¿Cuántos julios cede al foco caliente?",
      correctAnswers: ["3000", "3 000"],
      explanation: "$\\text{COP}_{real} = 0{,}667$. $W = Q_f/\\text{COP} = 1\\,800$ J y $Q_c = Q_f + W = 3\\,000$ J.",
    },
    {
      id: "check-potencia-nevera",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Pasa a vatios", message: "$700$ kJ/h $= 194{,}4$ W. Luego $W = Q_f/\\text{COP}$." }],
      title: "Potencia de una nevera",
      question: "Una nevera ideal (Carnot) mantiene $-10$ °C con el ambiente a $28$ °C y extrae $700$ kJ/h. ¿Qué potencia necesita el motor, en vatios? (un decimal)",
      correctAnswers: ["28,1", "28.1", "28"],
      explanation: "$Q_f = 700\\,000/3\\,600 = 194{,}4$ W; $\\text{COP} = 6{,}92$; $W = 194{,}4/6{,}92 = 28{,}1$ W.",
    },
    {
      id: "check-nevera-real",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Rendimiento real", message: "Si solo alcanza el $60\\,\\%$ del ideal, necesita más trabajo: $W_{real} = W_{ideal}/0{,}6$." }],
      title: "La nevera de verdad",
      question: "Si la nevera anterior solo alcanza el $60\\,\\%$ del rendimiento ideal de Carnot, ¿qué potencia debe tener el motor, en vatios? (un decimal)",
      correctAnswers: ["46,8", "46.8", "47"],
      explanation: "$W_{real} = 28{,}1/0{,}6 = 46{,}8$ W.",
    },
    {
      id: "check-polideportivo",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Pasos", message: "COP de Carnot entre $-4$ °C y $42$ °C; la máquina real gasta el doble de trabajo; $Q_c = Q_f + W$." }],
      title: "Un polideportivo",
      question: "En un polideportivo, una máquina frigorífica extrae $100$ kW de la pista de hielo a $-4$ °C y cede calor a $42$ °C consumiendo el doble de trabajo que una de Carnot. Entrega $130$ kW a la piscina. ¿Cuántos kW llegan a las duchas y la calefacción? (un decimal)",
      correctAnswers: ["4,2", "4.2"],
      explanation: "$\\text{COP}_C = 269/46 = 5{,}85$; $W_C = 17{,}1$ kW y $W = 34{,}2$ kW. $Q_c = 100 + 34{,}2 = 134{,}2$ kW; $134{,}2 - 130 = 4{,}2$ kW.",
    },
  ],
};
