import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_5_SUBTITLE } from "@/data/lessons/shared";

export const potenciaElectricaHidraulicaLesson: InteractiveLesson = {
  slug: "potencia-electrica-hidraulica",
  title: "10. Potencia eléctrica e hidráulica",
  subtitle: TEMA_TI2_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "electrica",
      type: "slide",
      help: [
        {
          label: "¿Qué es una superficie equipotencial?",
          message: "Una superficie cuyos puntos están al mismo potencial. Mover una carga entre dos de sus puntos no requiere trabajo.",
        },
      ],
      title: "Energía y potencia eléctrica",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "I = \\dfrac{\\Delta q}{t}", label: "intensidad: carga por unidad de tiempo (amperio)" },
            { tex: "\\Delta U = \\dfrac{W}{q}", label: "diferencia de potencial: trabajo por unidad de carga (voltio = J/C)" },
          ],
        },
        {
          kind: "text",
          text: "El trabajo de las cargas que se mueven con una diferencia de potencial $U$ es $W = U\\,q$. Como $q = I\\,\\Delta t$, resulta $W = U\\,I\\,\\Delta t$.",
        },
        {
          kind: "rule",
          formula: "P = U\\,I",
          text: "La potencia eléctrica, en vatios, es el producto de la tensión por la intensidad.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "hidraulica",
      type: "slide",
      help: [
        {
          label: "¿Por qué P = p Q?",
          message: "La fuerza sobre la sección es $F = p\\,S$ y el fluido avanza a $v = Q/S$. La potencia $P = F\\,v = p\\,S\\,Q/S = p\\,Q$.",
        },
      ],
      title: "Potencia hidráulica: presión por caudal",
      blocks: [
        {
          kind: "rule",
          formula: "P = p\\,Q",
          text: "$p$ es la presión del fluido (Pa) y $Q$ el caudal (m³/s). La presión de una columna de fluido es $p = d\\,g\\,h$.",
        },
        {
          kind: "text",
          text: "En una presa, la energía potencial del agua se transforma en cinética y, en las turbinas, en trabajo y, después, en energía eléctrica.",
        },
      ],
      visual: { kind: "anim", scene: "presa-turbina", beatMs: 4800 },
    },
    {
      id: "explora",
      type: "slide",
      help: [
        {
          label: "¿Cómo comparar las dos?",
          message: "Las dos son potencias: se miden en vatios. La eléctrica es tensión por intensidad; la hidráulica, presión por caudal.",
        },
      ],
      title: "Calcula la potencia",
      blocks: [
        {
          kind: "text",
          text: "Cambia entre la potencia eléctrica de una instalación (con su coste en kWh) y la hidráulica de una presa. Comprueba el ejemplo de $80$ m y $1$ m³/s.",
        },
      ],
      visual: { kind: "tool", tool: "potencia-electrica-hidraulica", params: { a: 220, b: 20 } },
    },
    {
      id: "check-presa",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Presión", message: "$p = d\\,g\\,h = 1\\,000\\cdot 9{,}8\\cdot 80 = 784\\,000$ N/m². Multiplica por el caudal." }],
      title: "Presa de 80 m",
      question: "Una tubería baja $80$ m desde una presa a las turbinas con un caudal de $1$ m³/s. ¿Qué potencia puede suministrar, en kW, si no hay pérdidas? (solo el número)",
      correctAnswers: ["784"],
      explanation: "$p = 1\\,000\\cdot 9{,}8\\cdot 80 = 784\\,000$ N/m² y $P = p\\,Q = 784\\,000\\cdot 1 = 784\\,000$ W $= 784$ kW.",
    },
    {
      id: "check-presa-100",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Presión", message: "$p = 1\\,000\\cdot 9{,}8\\cdot 100 = 980\\,000$ Pa; $P = p\\cdot 1{,}5$." }],
      title: "Presa de 100 m",
      question: "Una presa de $100$ m de altura sobre las turbinas con caudal de $1{,}5$ m³/s. ¿Qué potencia, en kW, sin pérdidas? (solo el número)",
      correctAnswers: ["1470", "1.470", "1 470"],
      explanation: "$P = 980\\,000\\cdot 1{,}5 = 1\\,470\\,000$ W $= 1\\,470$ kW.",
    },
    {
      id: "check-electrica",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "P = U I", message: "$220\\cdot 20$ vatios." }],
      title: "Instalación de motores",
      question: "Un voltímetro marca $220$ V y el amperímetro, $20$ A. ¿Qué potencia consume la instalación en ese instante, en kW? (con una decimal)",
      correctAnswers: ["4,4", "4.4"],
      explanation: "$P = U\\,I = 220\\cdot 20 = 4\\,400$ W $= 4{,}4$ kW.",
    },
    {
      id: "check-energia-electrica",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Energía por tramos", message: "$W = P\\,t$: $4{,}4\\ \\text{kW}\\cdot 5\\ \\text{h}$ más $220\\cdot 5\\ \\text{W}\\cdot 3\\ \\text{h}$." }],
      title: "Trabajo realizado en 8 horas",
      question: "Con $220$ V, la intensidad es $20$ A durante $5$ h y después $5$ A durante $3$ h. ¿Qué trabajo, en kWh, realiza la instalación en esas ocho horas? (con una decimal)",
      correctAnswers: ["25,3", "25.3"],
      explanation: "$W = 4{,}4\\cdot 5 + 1{,}1\\cdot 3 = 22 + 3{,}3 = 25{,}3$ kWh.",
    },
    {
      id: "check-potencia-ui",
      type: "predict",
      help: [{ label: "Producto", message: "Voltios por amperios son vatios." }],
      title: "Potencia de la corriente eléctrica",
      question: "La potencia de la corriente eléctrica viene dada por:",
      mode: "choice",
      choices: [
        { id: "ui", label: "El producto de la tensión por la intensidad" },
        { id: "ir", label: "El producto de la intensidad por la resistencia", incorrectFeedback: "Eso da una tensión (ley de Ohm), no una potencia." },
        { id: "qt", label: "El producto de la carga por el tiempo", incorrectFeedback: "Eso no da potencia: $I = q/t$." },
      ],
      correctChoiceId: "ui",
      shuffleChoices: true,
      explanation: "$P = U\\,I$ (vatios).",
    },
  ],
};
