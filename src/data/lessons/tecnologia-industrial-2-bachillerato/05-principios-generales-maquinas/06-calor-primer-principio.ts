import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_5_SUBTITLE } from "@/data/lessons/shared";

export const calorPrimerPrincipioLesson: InteractiveLesson = {
  slug: "calor-primer-principio",
  title: "6. Calor y primer principio de la termodinámica",
  subtitle: TEMA_TI2_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "calor",
      type: "slide",
      help: [
        {
          label: "¿Calor y temperatura son lo mismo?",
          message: "No. La temperatura es lo que tienen en común dos cuerpos en equilibrio térmico. El calor es la energía que se transfiere de un cuerpo a otro por su diferencia de temperatura.",
        },
      ],
      title: "Calor, temperatura y calor específico",
      blocks: [
        {
          kind: "text",
          text: "El **calor** es la forma de energía que se transfiere del cuerpo con más temperatura al de menos hasta alcanzar el **equilibrio térmico**. Dos cuerpos a la misma temperatura no han necesitado la misma cantidad de calor.",
        },
        {
          kind: "rule",
          title: "Calor absorbido o cedido",
          formula: "Q = m\\,c\\,\\Delta T",
          text: "$c$ es el **calor específico** (J/kg·K o cal/kg·°C). Para el agua: $1$ kcal/kg·°C. Las unidades del calor son las del trabajo: el julio ($1$ cal $= 4{,}1868$ J).",
        },
        {
          kind: "text",
          text: "En los gases hay dos calores específicos, a volumen constante ($c_v$) y a presión constante ($c_p$): $c_p - c_v = R = 2$ cal/K·mol.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "equilibrio",
      type: "slide",
      help: [
        {
          label: "¿Por qué suman los calores?",
          message: "Sin pérdidas, todo el calor que cede un cuerpo lo absorbe el otro: $m_1 c_1 (T_1 - T_f) = m_2 c_2 (T_f - T_2)$. De ahí sale la temperatura final.",
        },
      ],
      title: "Equilibrio térmico",
      blocks: [
        {
          kind: "text",
          text: "Mezcla un cuerpo caliente con agua. Con el acero de $23$ kg a unos $817$ °C en $400$ kg de agua a $25$ °C, el agua sube unos $5$ °C. Cambia las masas y observa cómo se desplaza la temperatura final.",
        },
      ],
      visual: { kind: "tool", tool: "equilibrio-termico", params: { a: 0, b: 23, c: 817 } },
    },
    {
      id: "check-horno",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Plantea el balance", message: "$m_{ac} c_{ac}\\,\\Delta T_{ac} = m_{ag} c_{ag}\\,\\Delta T_{ag}$, con $\\Delta T_{ag} = 5$ °C y $c_{agua} = 4\\,186$ J/kg·°C." }],
      title: "Temperatura del horno",
      question: "Una pieza de acero de $23$ kg ($c = 460$ J/kg·°C) se saca de un horno y se sumerge en $400$ l de agua. El agua sube $5$ °C. Sin pérdidas, ¿a qué temperatura estaba el horno si el ambiente está a $25$ °C? (redondea a la unidad, en °C)",
      correctAnswers: ["816", "817"],
      explanation: "El agua absorbe $400\\cdot 4\\,186\\cdot 5 \\approx 8{,}4\\cdot 10^6$ J. Eso da $\\Delta T = \\dfrac{8{,}4\\cdot 10^6}{23\\cdot 460} \\approx 792$ °C y el horno estaba a unos $792 + 25 \\approx 817$ °C.",
    },
    {
      id: "check-calor-q",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Fórmula", message: "$Q = m\\,c\\,\\Delta T = 100\\cdot 4\\,186\\cdot 15$." }],
      title: "Calentar agua",
      question: "¿Cuántos megajulios (MJ) hacen falta para calentar $100$ kg de agua de $20$ °C a $35$ °C? ($c = 4\\,186$ J/kg·°C; con dos decimales)",
      correctAnswers: ["6,28", "6.28"],
      explanation: "$Q = 100\\cdot 4\\,186\\cdot 15 = 6\\,279\\,000$ J $\\approx 6{,}28$ MJ.",
    },
    {
      id: "primer-principio",
      type: "slide",
      help: [
        {
          label: "¿Por qué el motor tiene Q = ΔU + W?",
          message: "Porque el calor que entra se reparte entre aumentar la energía interna del gas (se calienta) y producir trabajo útil. En la frigorífica, al revés: el trabajo del compresor aumenta la energía interna y sale calor.",
        },
      ],
      title: "Primer principio de la termodinámica",
      blocks: [
        {
          kind: "definition",
          text: "Es el **principio de conservación de la energía** aplicado a las máquinas térmicas: $\\sum E_{\\text{entra}} = \\sum E_{\\text{sale}}$.",
        },
        {
          kind: "compare",
          left: { title: "Motor térmico", text: "Se aprovecha el calor para producir trabajo.", math: ["Q = \\Delta U + W"], tone: "ok" },
          right: { title: "Máquina frigorífica", text: "Se extrae calor a costa de un trabajo exterior.", math: ["W = \\Delta U + Q"], tone: "info" },
        },
      ],
      visual: { kind: "anim", scene: "primer-principio-flujos", beatMs: 4500 },
    },
    {
      id: "explora-primer-principio",
      type: "slide",
      help: [
        {
          label: "¿Qué pasa si ΔU es negativo?",
          message: "Que el sistema pierde energía interna: se enfría. Esto pasa, por ejemplo, si el motor entrega más trabajo del calor que recibe.",
        },
      ],
      title: "Balance de energía",
      blocks: [
        {
          kind: "text",
          text: "Cambia el calor y el trabajo y fíjate en la energía interna. El rendimiento del motor es $W/Q$.",
        },
      ],
      visual: { kind: "tool", tool: "primer-principio-explorador", params: { a: 100, b: 35 } },
    },
    {
      id: "check-motor",
      type: "predict",
      mode: "numeric",
      help: [{ label: "ΔU", message: "$\\Delta U = Q - W$." }],
      title: "Energía interna del motor",
      question: "Un motor térmico recibe $100$ kJ de calor y realiza $35$ kJ de trabajo. ¿Cuánto vale $\\Delta U$ en kJ? (solo el número)",
      correctAnswers: ["65"],
      explanation: "$Q = \\Delta U + W \\Rightarrow \\Delta U = 100 - 35 = 65$ kJ. El gas aumenta su energía interna y se calienta.",
    },
    {
      id: "check-frigorifica",
      type: "predict",
      help: [{ label: "Frigorífica", message: "El trabajo exterior del compresor entra, y sale calor." }],
      title: "Principio de conservación en una frigorífica",
      question: "El principio de conservación de la energía en una máquina frigorífica es:",
      mode: "choice",
      choices: [
        { id: "ok", label: "$W = \\Delta U + Q$" },
        { id: "motor", label: "$Q = \\Delta U + W$", incorrectFeedback: "Esa es la ecuación del motor térmico." },
        { id: "otra", label: "$W = \\Delta U - Q$", incorrectFeedback: "Los términos tienen que reflejar que entra trabajo y sale calor: $W = \\Delta U + Q$." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "En la frigorífica entra trabajo $W$, aumenta la energía interna del gas y sale el calor $Q$.",
    },
  ],
};
