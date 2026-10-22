import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_3_SUBTITLE } from "@/data/lessons/shared";

export const materialesCeramicosLesson: InteractiveLesson = {
  slug: "materiales-ceramicos",
  title: "3. Materiales cerámicos",
  subtitle: TEMA_TI2_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "que-son",
      type: "slide",
      help: [
        {
          label: "¿Por qué son frágiles?",
          message: "Sus enlaces iónicos y covalentes son fuertes pero direccionales: casi no admiten deformación plástica y se rompen de golpe.",
        },
      ],
      title: "Qué son los cerámicos",
      blocks: [
        {
          kind: "definition",
          text: "Los **materiales cerámicos** son compuestos de metales y no metales unidos por enlaces **iónicos y covalentes**. Son generalmente duros y frágiles.",
        },
        {
          kind: "facts",
          items: [
            { tex: "\\uparrow\\ \\text{dureza}", label: "pero frágiles" },
            { tex: "\\uparrow\\ T_f", label: "alto punto de fusión" },
            { tex: "\\downarrow\\ \\text{conductividad}", label: "térmica y eléctrica baja" },
            { tex: "\\uparrow\\ \\text{compresión}", label: "alta resistencia a compresión" },
          ],
        },
        {
          kind: "text",
          text: "Tradicionales: ladrillos, tejas, porcelana, loza (arcilla, sílice y feldespato). Técnicos: alúmina ($Al_2O_3$), carburo de silicio ($SiC$), nitruro de silicio ($Si_3N_4$). El $SiC$ se usa en motores que trabajan a más temperatura para aumentar el rendimiento.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "vidrios",
      type: "slide",
      help: [
        {
          label: "¿Vidrio = líquido subenfriado?",
          message: "Es una forma de decirlo: al enfriarse no cristaliza y la estructura queda desordenada, como la de un líquido, pero rígida.",
        },
      ],
      title: "Vidrios: sólidos sin cristalizar",
      blocks: [
        {
          kind: "steps",
          items: [
            "La **sílice** ($SiO_2$) forma tetraedros que se unen por vértices. Es el **formador** de vidrio.",
            "Los óxidos **intermedios** (plomo, aluminio) no forman vidrio solos, pero se incorporan a la red.",
            "Los **modificadores** ($Na_2O$, $CaO$) rompen la red y bajan la viscosidad: se trabaja más fácil y con menos energía.",
          ],
        },
        {
          kind: "text",
          text: "Los vidrios **no silicatados** (BeF₂, GeO₂, fosfato de aluminio, óxido de boro) forman unidades triangulares. El vidrio pyrex lleva $B_2O_3$ mezclado con la sílice.",
        },
      ],
      visual: { kind: "anim", scene: "vidrio-red", beatMs: 4200 },
    },
    {
      id: "check-modificador",
      type: "predict",
      help: [{ label: "Qué hace el Na₂O", message: "Rompe la red de sílice y reduce la viscosidad del cristal líquido." }],
      title: "Óxidos modificadores",
      question: "¿Qué se busca al añadir óxido de sodio a la sílice fundida?",
      mode: "choice",
      choices: [
        { id: "visc", label: "Reducir la viscosidad y bajar la temperatura de fusión" },
        { id: "dureza", label: "Aumentar la dureza del vidrio", incorrectFeedback: "Los modificadores rompen la red; no la refuerzan." },
        { id: "cristal", label: "Que el vidrio cristalice más rápido", incorrectFeedback: "Al contrario: los iones de sodio y calcio pueden provocar desvitrificación, pero no es el objetivo." },
      ],
      correctChoiceId: "visc",
      shuffleChoices: true,
      explanation: "Con la composición eutéctica con $Na_2O$ la temperatura de fusión baja de $1\\,720$ a unos $800$ °C.",
    },
    {
      id: "conformado",
      type: "slide",
      help: [
        {
          label: "¿Por qué se calienta después?",
          message: "Para que las partículas se unan por difusión atómica y la pieza adquiera la fuerza y la microestructura deseadas.",
        },
      ],
      title: "Conformado: del polvo a la pieza",
      blocks: [
        {
          kind: "steps",
          title: "Tres etapas",
          items: [
            "**Preparación** del material (aglutinantes, lubricantes).",
            "**Moldeado** o fundido.",
            "**Tratamiento térmico**: secado o cocido a alta temperatura.",
          ],
        },
        {
          kind: "text",
          text: "Entre las técnicas están el prensado en seco, la compactación isostática, la compresión en caliente, el moldeo en barbotina y la extrusión. Mira cómo se pasa del polvo a la pieza densa.",
        },
      ],
      visual: { kind: "anim", scene: "prensado-sinterizado", beatMs: 4000 },
    },
    {
      id: "barbotina",
      type: "slide",
      help: [
        {
          label: "¿Y si se llena del todo el molde?",
          message: "Entonces se obtiene una pieza maciza. Ese método se llama fundición compacta.",
        },
      ],
      title: "Moldeo en barbotina",
      blocks: [
        {
          kind: "steps",
          items: [
            "Se prepara una **emulsión** de arcilla y agua: la barbotina.",
            "Se vierte en un **molde poroso** de yeso, que absorbe el agua.",
            "Se escurre el **exceso** cuando la pared tiene el grosor deseado.",
            "Se **seca** y se desmolda.",
            "Se calienta para lograr las propiedades finales.",
          ],
        },
      ],
      visual: { kind: "anim", scene: "barbotina", beatMs: 4000 },
    },
    {
      id: "check-barbotina",
      type: "predict",
      help: [{ label: "Qué hace el molde", message: "El yeso es poroso: absorbe el líquido de la barbotina junto a la pared." }],
      title: "En qué consiste",
      question: "El moldeo en barbotina para conformar materiales cerámicos consiste en:",
      mode: "choice",
      choices: [
        { id: "ok", label: "Verter una emulsión de arcilla y agua en un molde poroso que absorbe el líquido" },
        { id: "presion", label: "Comprimir polvo seco en un troquel", incorrectFeedback: "Eso es el prensado en seco." },
        { id: "extrusion", label: "Forzar una pasta plástica a través de una boquilla", incorrectFeedback: "Eso es la extrusión." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "Es un proceso de fundición por revestimiento: la capa que se forma en la pared del molde da la pieza.",
    },
    {
      id: "tratamientos-ceramica",
      type: "slide",
      help: [
        {
          label: "¿Qué es la sinterización?",
          message: "Un proceso en el que partículas sólidas se unen por difusión atómica a temperatura alta, sin llegar a fundirse. Convierte un producto poroso en otro compacto.",
        },
      ],
      title: "Tratamientos térmicos de las cerámicas",
      blocks: [
        {
          kind: "steps",
          items: [
            "**Secado** elimina el agua (100 °C) y los aglutinantes (200–300 °C).",
            "**Sinterización** une las partículas por difusión, sin llegar a fundir.",
            "**Vitrificación** rellena los poros con una fase vítrea que se licua (porcelana).",
          ],
        },
        {
          kind: "text",
          text: "Las piezas sinterizadas tienen una densidad de hasta un $25\\,\\%$ inferior a la del material base. El wolframio sinterizado puede llegar a un $70\\,\\%$ de la densidad del metal.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "rotura",
      type: "slide",
      help: [
        {
          label: "¿Por qué una grieta tan pequeña?",
          message: "En el vértice de la grieta la tensión se amplifica por el factor $2\\sqrt{a/r}$. Cuanto más afilado es el vértice (r pequeño) y más profunda la grieta, mayor es el factor.",
        },
      ],
      title: "Rotura frágil: el defecto de Griffith",
      blocks: [
        {
          kind: "rule",
          title: "Tensión máxima en el vértice de una grieta",
          formula: "\\sigma_{m\\acute{a}x} = 2\\,\\sigma \\sqrt{\\dfrac{a}{r}}",
          text: "$a$ es la profundidad de la grieta y $r$ el radio de curvatura de su vértice.",
        },
        {
          kind: "text",
          text: "Ejemplo del libro: un cerámico con grieta de $2$ mm y tensión teórica de rotura de $8\\,500$ kp/mm² se rompe con solo $70$ kp/mm². Para ello basta un radio de curvatura de unos $5\\cdot 10^{-4}$ mm.",
        },
      ],
      visual: { kind: "tool", tool: "grieta-griffith", params: { a: 2, b: 4 } },
    },
    {
      id: "check-griffith",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Despeja r", message: "De $\\sigma_{m\\acute{a}x} = 2\\sigma\\sqrt{a/r}$ sale $r = \\dfrac{4\\,\\sigma^2\\,a}{\\sigma_{m\\acute{a}x}^2}$." }],
      title: "Radio de curvatura de la grieta",
      question: "Un cerámico con una grieta de $2$ mm tiene una tensión máxima de rotura de $8\\,500$ kp/mm² y se rompe a $70$ kp/mm². Estima el radio de curvatura, en unidades de $10^{-4}$ mm (redondea a la unidad, solo el número).",
      correctAnswers: ["5"],
      explanation: "$r = \\dfrac{2\\cdot(2\\cdot 70)^2}{8\\,500^2}$ mm$ = 5{,}4\\cdot 10^{-4}$ mm, es decir, menos de una micra. Imposible de medir con métodos convencionales: de ahí la fragilidad.",
    },
    {
      id: "check-grieta-importante",
      type: "predict",
      help: [{ label: "Amplificación", message: "La grieta concentra la tensión justo en su punta." }],
      title: "Pequeñas grietas",
      question: "Las pequeñas grietas en los materiales cerámicos son:",
      mode: "choice",
      choices: [
        { id: "ampl", label: "Muy importantes, pues se amplifica la tensión en el vértice de la grieta" },
        { id: "poco", label: "Poco importantes, pues tienen un elevado límite elástico", incorrectFeedback: "No tienen límite elástico apreciable: rompen de forma frágil." },
        { id: "sellar", label: "Sin influencia si se sellan con un adhesivo especial", incorrectFeedback: "La grieta sigue siendo un defecto aunque se tape." },
      ],
      correctChoiceId: "ampl",
      shuffleChoices: true,
      explanation: "Es el fenómeno de la rotura frágil: la tensión en la punta es muchas veces la aplicada.",
    },
  ],
};
