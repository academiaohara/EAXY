import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_4_SUBTITLE } from "@/data/lessons/shared";

export const corrosionPilaElectroquimicaLesson: InteractiveLesson = {
  slug: "corrosion-pila-electroquimica",
  title: "5. Corrosión y pila electroquímica",
  subtitle: TEMA_TI2_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "que-es-corrosion",
      type: "slide",
      help: [
        {
          label: "¿Corrosión es siempre oxidación con oxígeno?",
          message: "No. Oxidar es perder electrones, y eso puede ocurrir sin oxígeno: por ejemplo, en una disolución ácida el metal pasa a ion y el $H^+$ se reduce a hidrógeno.",
        },
      ],
      title: "Qué es la corrosión",
      blocks: [
        {
          kind: "definition",
          text: "La **corrosión** es el paso de un metal de estado libre a **estado combinado**: es la tendencia de los metales a volver a su estado natural. Esencialmente, es una **oxidación**.",
        },
        {
          kind: "facts",
          items: [
            { tex: "\\approx 5\\,\\%\\ \\text{del PIB}", label: "se gasta en prevenir o reponer elementos corroídos" },
          ],
        },
        {
          kind: "compare",
          left: { title: "Oxidación (ánodo)", text: "El metal pierde electrones y pasa a ion: $M \\rightarrow M^{v+} + v\\,e^-$. Ejemplos: $Fe \\rightarrow Fe^{2+} + 2e^-$ y $Al \\rightarrow Al^{3+} + 3e^-$.", tone: "warn" },
          right: { title: "Reducción (cátodo)", text: "Se toman electrones. En ácido: $2H^+ + 2e^- \\rightarrow H_2$. En agua aireada: $O_2 + 2H_2O + 4e^- \\rightarrow 4OH^-$.", tone: "ok" },
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-anodo",
      type: "predict",
      help: [{ label: "Pierde electrones", message: "La oxidación es la pérdida de electrones, y se produce en el ánodo." }],
      title: "El ánodo",
      question: "En una pila electroquímica, el metal que cede electrones y se corroe se denomina:",
      mode: "choice",
      choices: [
        { id: "anodo", label: "Ánodo" },
        { id: "catodo", label: "Cátodo", incorrectFeedback: "El cátodo recibe los electrones: allí ocurre la reducción." },
        { id: "electrolito", label: "Electrolito", incorrectFeedback: "El electrolito es el líquido conductor entre los electrodos." },
      ],
      correctChoiceId: "anodo",
      shuffleChoices: true,
      explanation: "Ánodo: cede electrones al circuito y se corroe al abandonar iones positivos su superficie.",
    },
    {
      id: "celda",
      type: "slide",
      help: [
        {
          label: "¿Qué hace la membrana?",
          message: "Deja pasar el disolvente pero no los solutos, de modo que las concentraciones de las dos disoluciones se mantienen en 1 M mientras funciona la pila.",
        },
      ],
      title: "La celda electroquímica",
      blocks: [
        {
          kind: "steps",
          title: "Componentes",
          items: [
            "**Cátodo**: recibe los electrones del circuito externo.",
            "**Ánodo**: cede electrones y se corroe.",
            "**Circuito externo**: ánodo y cátodo en contacto para que circulen los electrones.",
            "**Electrolito**: líquido conductor que permite a los iones desplazarse hacia el cátodo.",
          ],
        },
      ],
      visual: { kind: "anim", scene: "pila-corrosion", beatMs: 4200 },
    },
    {
      id: "serie",
      type: "slide",
      help: [
        {
          label: "¿De dónde sale el potencial?",
          message: "Cada metal tiene un potencial respecto al hidrógeno (que vale 0). El que tiene el potencial menor cede electrones al de potencial mayor.",
        },
      ],
      title: "Serie electroquímica: ¿quién se corroe?",
      blocks: [
        {
          kind: "rule",
          title: "Regla",
          text: "En una pila, el metal de **menor potencial** es el ánodo y se corroe. La tensión que marca el voltímetro es la diferencia de potenciales.",
          formula: "\\Delta U = U_{\\text{cátodo}} - U_{\\text{ánodo}}",
        },
        {
          kind: "text",
          text: "Combina dos metales. Prueba Fe + Cu (hierro y cobre, la pila del libro) y Fe + Zn.",
        },
      ],
      visual: { kind: "tool", tool: "pila-electroquimica", params: { a: 4, b: 8 } },
    },
    {
      id: "check-fe-cu",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Potenciales", message: "Fe: $-0{,}44$ V; Cu: $+0{,}34$ V." }],
      title: "Pila hierro-cobre",
      question: "Una pila con electrodos de hierro ($-0{,}44$ V) y cobre ($+0{,}34$ V) en disoluciones $1$ M de sus iones. ¿Qué diferencia de potencial marcaría el voltímetro? (en V, con dos decimales)",
      correctAnswers: ["0,78", "0.78"],
      explanation: "$\\Delta U = 0{,}34 - (-0{,}44) = 0{,}78$ V. El hierro se corroe y el cobre se electrodeposita.",
    },
    {
      id: "check-fe-zn",
      type: "predict",
      help: [{ label: "Potencial menor", message: "El Zn ($-0{,}76$ V) tiene menor potencial que el Fe ($-0{,}44$ V)." }],
      title: "Pila hierro-cinc",
      question: "En una pila de hierro y cinc con disoluciones $1$ M, ¿qué metal se corroe?",
      mode: "choice",
      choices: [
        { id: "zn", label: "El cinc, que cede electrones al hierro ($\\Delta U = 0{,}32$ V)" },
        { id: "fe", label: "El hierro, que cede electrones al cinc", incorrectFeedback: "Tiene mayor potencial que el cinc: es el cátodo." },
        { id: "ninguno", label: "Ninguno: los dos son metales y no reaccionan", incorrectFeedback: "Sí hay pila: la diferencia de potencial es de 0,32 V." },
      ],
      correctChoiceId: "zn",
      shuffleChoices: true,
      explanation: "El de menor potencial es el ánodo. El mismo hierro se corroe con el cobre pero no con el cinc: depende de la pareja.",
    },
    {
      id: "check-al-cu",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Potenciales", message: "Al: $-1{,}66$ V; Cu: $+0{,}34$ V." }],
      title: "Aluminio y cobre",
      question: "¿Qué diferencia de potencial se obtiene al unir aluminio ($-1{,}66$ V) y cobre ($+0{,}34$ V)? (en V, con dos decimales)",
      correctAnswers: ["2,00", "2.00", "2,0", "2.0", "2"],
      explanation: "$\\Delta U = 0{,}34 - (-1{,}66) = 2{,}00$ V. Cuanto más separados están en la serie, mayor es la tendencia del ánodo a corroerse.",
    },
  ],
};
