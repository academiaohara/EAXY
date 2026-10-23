import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_1_SUBTITLE } from "@/data/lessons/shared";

export const tensionDeformacionTraccionLesson: InteractiveLesson = {
  slug: "tension-deformacion-traccion",
  title: "10. Tensión, deformación y ensayo de tracción",
  subtitle: TEMA_TI2_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "tension-deformacion",
      type: "slide",
      help: [
        {
          label: "¿Qué es «uniaxial»?",
          message: "Que la fuerza actúa a lo largo de un solo eje: el de simetría de la probeta.",
        },
      ],
      title: "Tensión y deformación",
      blocks: [
        {
          kind: "rule",
          title: "Tensión de ingeniería",
          formula: "\\sigma = \\dfrac{F}{A_0}",
          text: "Fuerza uniaxial entre la sección **inicial**. En el SI: N/m² $=$ pascal (Pa). Con $F$ en N y $A_0$ en mm², sale en MPa.",
        },
        {
          kind: "rule",
          title: "Deformación de ingeniería",
          formula: "\\varepsilon = \\dfrac{l - l_0}{l_0} = \\dfrac{\\Delta l}{l_0}",
          text: "Cuánto se alarga cada unidad de longitud inicial. Es **adimensional** (m/m). En la práctica se da en porcentaje: $\\varepsilon\\cdot 100$.",
        },
      ],
      visual: { kind: "anim", scene: "varilla-traccion", beatMs: 5400 },
    },
    {
      id: "explora-tension",
      type: "slide",
      help: [
        {
          label: "¿Por qué dividir entre la sección?",
          message: "Porque dos barras del mismo material no se comportan igual con la misma fuerza: la más gruesa reparte la carga entre más material. La tensión elimina ese efecto.",
        },
      ],
      title: "Prueba con tu propia probeta",
      blocks: [
        {
          kind: "text",
          text: "La **tensión** depende de la fuerza y de la sección; la **deformación**, del alargamiento y de la longitud inicial. Cambia los cuatro valores y comprueba qué cambia.",
        },
      ],
      visual: { kind: "tool", tool: "tension-deformacion-explorador", params: { a: 30, b: 13.8, c: 0.1 } },
    },
    {
      id: "check-tension-pieza",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Pasos", message: "Pasa $F$ a newtons ($1$ kp $= 9{,}8$ N), calcula $A_0 = \\pi D^2/4$ en mm² y divide." }],
      title: "Pieza cilíndrica en tracción",
      question: "Una pieza cilíndrica de $1{,}5$ cm de diámetro soporta una carga de tracción de $2\\,500$ kp. ¿Qué tensión tiene, en MPa? (redondea a la unidad)",
      correctAnswers: ["139", "138,6", "138.6", "138,64", "138.64"],
      explanation: "$F = 2\\,500\\cdot 9{,}8 = 24\\,500$ N; $A_0 = \\pi\\cdot 15^2/4 = 176{,}7$ mm². $\\sigma = 24\\,500/176{,}7 \\approx 139$ MPa.",
    },
    {
      id: "check-tension-rotura",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Directo", message: "$\\sigma_R = F_{\\max}/A_0$ con $F_{\\max}$ en newtons y $A_0$ en mm²." }],
      title: "Tensión de rotura",
      question: "En un ensayo con una probeta normalizada de $150$ mm², la carga máxima aplicada es $50\\,000$ N. ¿Cuánto vale la tensión de rotura, en MPa? (redondea a la unidad)",
      correctAnswers: ["333", "333,3", "333.3", "333,33", "333.33"],
      explanation: "$\\sigma_R = 50\\,000\\ \\text{N}/150\\ \\text{mm}^2 = 333{,}3$ N/mm² $= 333$ MPa.",
    },
    {
      id: "check-fuerza-barras",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Despeja F", message: "$F = \\sigma\\cdot A_0$, con $A_0 = \\pi D^2/4$ en mm²." }],
      title: "Una barra de 150 mm",
      question: "¿Qué fuerza, en kN, hace falta para producir una tensión de $30$ MPa en una barra cilíndrica de $150$ mm de diámetro? (redondea a la unidad)",
      correctAnswers: ["530", "530,1", "530.1"],
      explanation: "$A_0 = \\pi\\cdot 150^2/4 = 17\\,671$ mm²; $F = 30\\cdot 17\\,671 = 530\\,144$ N $\\approx 530$ kN. Con $200$ mm de diámetro hacen falta $942$ kN: la fuerza crece con el cuadrado del diámetro.",
    },
    {
      id: "probeta",
      type: "slide",
      help: [
        {
          label: "¿Por qué normalizar?",
          message: "Para que resultados de laboratorios distintos sean comparables. Las normas UNE fijan preparación, tolerancias y dimensiones de las probetas.",
        },
      ],
      title: "La probeta y la máquina de tracción",
      blocks: [
        {
          kind: "text",
          text: "El **ensayo de tracción** (UNE 7-474) consiste en estirar una probeta de forma y dimensiones **normalizadas**, en la dirección de su eje, hasta romperla.",
        },
        {
          kind: "facts",
          items: [
            { tex: "S_0 = 150\\ \\text{mm}^2", label: "sección (UNE 7010)" },
            { tex: "D_0 = 13{,}8\\ \\text{mm}", label: "diámetro" },
            { tex: "l_0 = 100\\ \\text{mm}", label: "longitud de medida" },
          ],
        },
        {
          kind: "compare",
          left: { title: "Cilíndricas", text: "Para materiales forjados, fundidos, barras, redondos laminados y planchas de **espesor grueso**.", tone: "info" },
          right: { title: "Prismáticas o planas", text: "Para planchas de espesores **medios y pequeños**.", tone: "ok" },
        },
        {
          kind: "steps",
          title: "La máquina de tracción",
          items: [
            "Las **mordazas** sujetan los cabezales de la probeta.",
            "Se separan: la zona calibrada se **alarga** y soporta una tensión creciente.",
            "La máquina mide y relaciona las **fuerzas** con los **alargamientos**.",
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-tension-def",
      type: "predict",
      help: [{ label: "Pista", message: "Tensión $=$ fuerza entre superficie." }],
      title: "¿Qué es una tensión?",
      question: "La tensión que experimenta un material se puede expresar como:",
      mode: "choice",
      choices: [
        { id: "fs", label: "Fuerza / superficie (o energía / volumen)" },
        { id: "fd", label: "Fuerza / desplazamiento", incorrectFeedback: "Eso tiene unidades de rigidez (N/m), no de tensión." },
        { id: "pot", label: "Potencia / velocidad de deformación", incorrectFeedback: "Esa combinación no corresponde a una tensión." },
      ],
      correctChoiceId: "fs",
      shuffleChoices: true,
      explanation: "$\\sigma = F/A_0$ se mide en N/m² (pascales). Dimensionalmente coincide con energía/volumen: J/m³ $=$ N/m².",
    },
    {
      id: "check-deformacion",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Fórmula", message: "$\\varepsilon = \\Delta l / l_0$; para el porcentaje, multiplica por $100$." }],
      title: "Alargamiento unitario",
      question: "Una barra de $500$ mm se alarga $0{,}35$ mm. ¿Qué porcentaje de deformación sufre? (con dos decimales)",
      correctAnswers: ["0,07", "0.07"],
      explanation: "$\\varepsilon = 0{,}35/500 = 0{,}0007$, es decir, un $0{,}07\\,\\%$.",
    },
  ],
};
