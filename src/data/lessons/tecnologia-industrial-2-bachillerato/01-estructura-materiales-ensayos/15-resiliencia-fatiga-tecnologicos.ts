import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_1_SUBTITLE } from "@/data/lessons/shared";

export const resilienciaFatigaTecnologicosLesson: InteractiveLesson = {
  slug: "resiliencia-fatiga-tecnologicos",
  title: "15. Resiliencia, fatiga y ensayos tecnológicos",
  subtitle: TEMA_TI2_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "charpy",
      type: "slide",
      help: [
        {
          label: "¿Por qué una entalla?",
          message: "Concentra la tensión en un punto y favorece la rotura frágil, de modo que se mide el comportamiento más desfavorable del material ante un golpe.",
        },
      ],
      title: "Resiliencia: el péndulo de Charpy",
      blocks: [
        {
          kind: "text",
          text: "Algunas piezas de máquinas soportan esfuerzos **dinámicos** (golpes). El ensayo de **choque** (UNE 7-475-92) mide la **energía absorbida** al romper de un solo golpe una probeta de $55$ mm de longitud y $10$ mm de lado, con una **entalla** en V o en U en el centro.",
        },
        {
          kind: "rule",
          title: "Resiliencia",
          formula: "\\rho = \\dfrac{E_p}{S}",
          text: "$E_p$ es la energía absorbida en la rotura y $S$ la sección de la probeta. Se expresa en **J/cm²**. Aproxima la **tenacidad**.",
        },
      ],
      visual: { kind: "anim", scene: "pendulo-charpy", beatMs: 5600 },
    },
    {
      id: "explora-charpy",
      type: "slide",
      help: [
        {
          label: "¿De dónde sale la energía?",
          message: "El péndulo sube a una altura $h = L(1 - \\cos\\alpha)$ y tiene $m\\,g\\,h$ de energía potencial. Lo que no recupera al otro lado lo ha absorbido la probeta.",
        },
      ],
      title: "Menos altura al otro lado, más energía absorbida",
      blocks: [
        {
          kind: "text",
          text: "Cambia los ángulos. Si el péndulo sube casi tanto como bajó, la probeta apenas ha frenado: es **frágil**. Si apenas sube, es **tenaz**.",
        },
      ],
      visual: { kind: "tool", tool: "charpy-explorador", params: { a: 120, b: 75 } },
    },
    {
      id: "check-energia-charpy",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Alturas", message: "$h_0 = 0{,}8(1 - \\cos 120°)$ y $h_1 = 0{,}8(1 - \\cos 75°)$; $E_p = m\\,g\\,(h_0 - h_1)$." }],
      title: "Energía absorbida",
      question: "Un péndulo de $20$ kg y brazo de $0{,}8$ m se suelta desde $120°$ y, tras romper la probeta, sube hasta $75°$. ¿Qué energía absorbe la probeta, en julios? (redondea a la unidad)",
      correctAnswers: ["119", "118,98", "118.98", "119,0"],
      explanation: "$E_0 = 20\\cdot 9{,}8\\cdot 1{,}2 = 235{,}2$ J; $E_1 = 20\\cdot 9{,}8\\cdot 0{,}593 = 116{,}2$ J. $E_p = 235{,}2 - 116{,}2 \\approx 119$ J.",
    },
    {
      id: "check-resiliencia",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Divide", message: "$\\rho = E_p/S$ con $S = 0{,}8$ cm²." }],
      title: "Resiliencia",
      question: "Si la sección bajo la entalla es de $0{,}8$ cm² y la energía absorbida es $119$ J, ¿cuál es la resiliencia en J/cm²? (redondea a la unidad)",
      correctAnswers: ["149", "148,7", "148.7", "148,75", "148.75"],
      explanation: "$\\rho = 119/0{,}8 \\approx 149$ J/cm².",
    },
    {
      id: "fatiga",
      type: "slide",
      help: [
        {
          label: "¿Qué es el límite de fatiga?",
          message: "La máxima tensión a la que se puede someter un material sin romperse, independientemente del número de veces que se repita la acción que la provoca.",
        },
      ],
      title: "Fatiga: romper sin pasar el límite",
      blocks: [
        {
          kind: "text",
          text: "Una pieza sometida a esfuerzos **variables** puede romperse con cargas inferiores a la de rotura, incluso por debajo del límite elástico, si actúan durante suficientes ciclos.",
        },
        {
          kind: "steps",
          title: "Leyes fundamentales",
          items: [
            "Las piezas pueden romperse bajo esfuerzos **inferiores a su carga de rotura** si el esfuerzo se repite un número suficiente de veces.",
            "No hay rotura, sea cual sea el número de ciclos, si la diferencia entre la carga máxima y la mínima es inferior al **límite de fatiga**.",
          ],
        },
        {
          kind: "text",
          text: "Los ensayos más habituales son de **flexión rotatoria** y **torsión**. La rotura tiene tres fases: **incubación**, **maduración** y **rotura** instantánea.",
        },
      ],
      visual: { kind: "anim", scene: "fatiga-ciclos", beatMs: 5600 },
    },
    {
      id: "explora-fatiga",
      type: "slide",
      help: [
        {
          label: "¿Son datos reales?",
          message: "No: es un modelo esquemático de la curva de Wöhler para ver la tendencia. Cada material tiene sus valores.",
        },
      ],
      title: "Por debajo del límite de fatiga",
      blocks: [
        {
          kind: "text",
          text: "Baja la tensión alterna hasta que la probeta deje de romper. Fíjate en que la curva se aplana: ese valor es el **límite de fatiga**.",
        },
      ],
      visual: { kind: "tool", tool: "fatiga-explorador", params: { a: 70 } },
    },
    {
      id: "check-fatiga",
      type: "predict",
      help: [{ label: "Pista", message: "Piensa en esfuerzos que se repiten." }],
      title: "Objetivo del ensayo de fatiga",
      question: "Los ensayos de fatiga tienen como objetivo determinar:",
      mode: "choice",
      choices: [
        { id: "repetidos", label: "La resistencia del material a esfuerzos repetidos" },
        { id: "bruscos", label: "La resistencia del material a esfuerzos bruscos", incorrectFeedback: "Eso lo mide el ensayo de choque (resiliencia)." },
        { id: "micro", label: "La resistencia del material a microesfuerzos", incorrectFeedback: "No existe ese tipo de ensayo: los esfuerzos de fatiga pueden ser grandes, pero se repiten." },
      ],
      correctChoiceId: "repetidos",
      shuffleChoices: true,
      explanation: "La fatiga es el efecto de cargas repetidas, no de un único golpe.",
    },
    {
      id: "tecnologicos",
      type: "slide",
      help: [
        {
          label: "¿Qué grietas se ven con rayos X?",
          message: "Las **internas**. Para las **externas** se usan líquidos penetrantes. Ninguno de los dos métodos destruye la pieza.",
        },
      ],
      title: "Ensayos tecnológicos y no destructivos",
      blocks: [
        {
          kind: "text",
          text: "Los **ensayos tecnológicos** no dan valores para cálculos: reproducen, a escala conveniente, las condiciones en las que se usará el material y sirven para ver si es **apto** para un fin.",
        },
        {
          kind: "compare",
          left: { title: "Plegado", text: "Se dobla la probeta y se observa si salen **grietas en la cara exterior**, donde la tracción es mayor. Estudia la plasticidad.", tone: "info" },
          right: { title: "Embutición", text: "Un punzón presiona la chapa hasta la **primera grieta**; se mide cuántos mm ha penetrado (grado de embutido).", tone: "key" },
        },
        {
          kind: "steps",
          title: "Líquidos penetrantes (ensayo no destructivo)",
          items: [
            "**Limpiador**: limpia la pieza antes y después retira el exceso.",
            "**Penetrante**: se aplica tras la limpieza y entra en las grietas.",
            "**Revelador**: tras limpiar el exceso de penetrante, hace visible el que ha quedado en la grieta.",
          ],
        },
        {
          kind: "text",
          text: "Para grietas **internas** se usan **rayos X** y **ultrasonidos**. Estos métodos no destruyen la pieza (END).",
        },
      ],
      arrange: "stack",
    },
    {
      id: "clasifica-ensayos-final",
      type: "classify",
      help: [{ label: "Pista", message: "Piensa qué mide cada uno: golpe, ciclos, forma o inspección sin dañar." }],
      title: "¿Qué ensayo es?",
      question: "Asigna cada descripción a su ensayo.",
      groups: [
        { id: "resiliencia", label: "Resiliencia (Charpy)", tone: "amber" },
        { id: "fatiga", label: "Fatiga", tone: "rose" },
        { id: "tecnologico", label: "Plegado o embutición", tone: "cobalt" },
        { id: "end", label: "No destructivo", tone: "emerald" },
      ],
      items: [
        { id: "a", text: "Un péndulo golpea una probeta entallada", group: "resiliencia" },
        { id: "b", text: "Mide la energía absorbida en un solo golpe", group: "resiliencia" },
        { id: "c", text: "Una probeta gira con carga: tracción y compresión alternas", group: "fatiga" },
        { id: "d", text: "Esfuerzos repetidos por debajo del límite elástico", group: "fatiga" },
        { id: "e", text: "Se dobla una chapa hasta ver la primera grieta", group: "tecnologico" },
        { id: "f", text: "Un punzón presiona una chapa y se mide la penetración", group: "tecnologico" },
        { id: "g", text: "Líquidos penetrantes para ver grietas externas", group: "end" },
        { id: "h", text: "Rayos X y ultrasonidos para ver grietas internas", group: "end" },
      ],
      hint: "Resiliencia: golpe. Fatiga: ciclos. Tecnológicos: aptitud. END: sin dañar.",
      explanation: "Cada ensayo responde a una pregunta distinta; los END permiten seguir usando la pieza.",
    },
    {
      id: "check-resiliencia-def",
      type: "predict",
      help: [{ label: "Pista", message: "Se obtiene con el péndulo de Charpy." }],
      title: "¿Qué es la resiliencia?",
      question: "La resiliencia de un material es:",
      mode: "choice",
      choices: [
        { id: "energia", label: "La energía consumida en la rotura de la probeta por un choque, que aproxima la capacidad de resistencia al impacto (tenacidad)" },
        { id: "fuerza", label: "La fuerza máxima que soporta en un ensayo de tracción", incorrectFeedback: "Esa es la tensión de rotura, de un ensayo estático." },
        { id: "dureza", label: "La resistencia a ser rayado", incorrectFeedback: "Eso es la dureza." },
      ],
      correctChoiceId: "energia",
      shuffleChoices: true,
      explanation: "$\\rho = E_p/S$ en J/cm²: cuanto mayor, más tenaz es el material ante un golpe.",
    },
  ],
};
