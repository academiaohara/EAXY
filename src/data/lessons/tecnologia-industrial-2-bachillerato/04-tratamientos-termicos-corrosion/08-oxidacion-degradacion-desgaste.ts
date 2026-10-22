import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_4_SUBTITLE } from "@/data/lessons/shared";

export const oxidacionDegradacionDesgasteLesson: InteractiveLesson = {
  slug: "oxidacion-degradacion-desgaste",
  title: "8. Oxidación, degradación y desgaste",
  subtitle: TEMA_TI2_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "oxidacion-seca",
      type: "slide",
      help: [
        {
          label: "¿Qué es la corrosión seca?",
          message: "La combinación directa de un metal con el oxígeno del aire, sin electrolito líquido.",
        },
      ],
      title: "Oxidación o corrosión seca",
      blocks: [
        {
          kind: "text",
          text: "La reacción de un metal divalente con el oxígeno del aire es $M + \\tfrac{1}{2}O_2 \\rightarrow MO$. Se descompone en una **oxidación** del metal, $M \\rightarrow M^{2+} + 2e^-$, y una **reducción** del oxígeno, $\\tfrac{1}{2}O_2 + 2e^- \\rightarrow O^{2-}$.",
        },
        {
          kind: "steps",
          title: "Según el volumen del óxido frente al del metal",
          items: [
            "**Menor** (Mg): la capa es porosa y la oxidación avanza.",
            "**Casi igual** (Al): capa muy adherente e impermeable; la oxidación se detiene.",
            "**Mayor** (Fe): tensiones, resquebrajamiento y desprendimiento; la oxidación continúa.",
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "pilling",
      type: "slide",
      help: [
        {
          label: "¿De dónde sale la fórmula?",
          message: "Compara el volumen molar del óxido ($M_{ox}/d_{ox}$) con el volumen del metal que se ha consumido para formarlo ($n\\,M_{met}/d_{met}$).",
        },
      ],
      title: "¿Protege el óxido? La relación de volúmenes",
      blocks: [
        {
          kind: "rule",
          formula: "R = \\dfrac{M_{\\text{óxido}}\\;d_{\\text{metal}}}{n\\;M_{\\text{metal}}\\;d_{\\text{óxido}}}",
          text: "Si $R$ es próxima a la unidad, la capa protege al metal de que siga oxidándose.",
        },
        {
          kind: "text",
          text: "Compara el magnesio, el aluminio, el cinc, el hierro y el vanadio.",
        },
      ],
      visual: { kind: "tool", tool: "pilling-bedworth", params: { a: 1 } },
    },
    {
      id: "check-al",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Datos del Al", message: "$M(Al_2O_3) = 101{,}96$; $d_{Al} = 2{,}7$; $n = 2$ átomos; $M_{Al} = 26{,}98$; $d_{Al_2O_3} = 4{,}0$." }],
      title: "Relación para el aluminio",
      question: "Calcula $R$ para el aluminio y su óxido $Al_2O_3$ (densidades $2{,}7$ y $4{,}0$ g/cm³; $M_{Al} = 26{,}98$; $M_{Al_2O_3} = 101{,}96$; $n = 2$). (con dos decimales)",
      correctAnswers: ["1,28", "1.28", "1,27", "1.27"],
      explanation: "$R = \\dfrac{101{,}96\\cdot 2{,}7}{2\\cdot 26{,}98\\cdot 4{,}0} = 1{,}28$. Próxima a la unidad: la capa de alúmina es protectora.",
    },
    {
      id: "check-clasif-oxidos",
      type: "predict",
      help: [{ label: "Usa la herramienta", message: "Mira el valor de $R$ del magnesio y del hierro en la herramienta." }],
      title: "Mg y Fe",
      question: "Comparando el magnesio ($R = 0{,}81$) y el hierro ($R = 2{,}12$), ¿cuál es el comportamiento de su capa de óxido?",
      mode: "choice",
      choices: [
        { id: "mgfe", label: "La de Mg es porosa (permite que siga la oxidación) y la de Fe se agrieta y se desprende" },
        { id: "ambas", label: "Las dos son protectoras", incorrectFeedback: "Solo es protectora la que tiene $R$ cercana a la unidad, como el aluminio." },
        { id: "inverso", label: "La de Mg se agrieta y la de Fe es porosa", incorrectFeedback: "Es al revés: $R < 1$ implica capa porosa; $R > 2$, tensiones que la rompen." },
      ],
      correctChoiceId: "mgfe",
      shuffleChoices: true,
      explanation: "El óxido de Mg ocupa menos volumen que el metal y no lo cubre. El de Fe ocupa más del doble y se resquebraja.",
    },
    {
      id: "degradacion",
      type: "slide",
      help: [
        {
          label: "¿Por qué no se llama corrosión?",
          message: "Porque en los polímeros no se trata de una oxidación electroquímica: la degradación se debe a fenómenos físico-químicos como el hinchamiento, la rotura de enlaces o la radiación.",
        },
      ],
      title: "Degradación de polímeros",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "\\text{Hinchamiento}", label: "el polímero absorbe un líquido parecido (caucho + gasolina)" },
            { tex: "\\text{Rotura de enlaces}", label: "UV, ozono o temperatura rompen subcadenas" },
            { tex: "\\text{Intemperie}", label: "la radiación ultravioleta facilita la oxidación (PVC, PE)" },
          ],
        },
        {
          kind: "text",
          text: "Los **fluorocarbonos**, con enlaces C–F, son los más resistentes a la temperatura y a la intemperie. Los polímeros son más resistentes que los metales a las disoluciones ácidas y básicas.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-uv",
      type: "predict",
      help: [{ label: "Radiación ultravioleta", message: "Es energía suficiente para ionizar átomos: rompe enlaces de la cadena." }],
      title: "Efecto de la radiación UV",
      question: "¿Qué efecto tiene la radiación ultravioleta sobre los polímeros?",
      mode: "choice",
      choices: [
        { id: "rotura", label: "Penetra en el polímero, ioniza los átomos y rompe la cadena polimérica" },
        { id: "refuerzo", label: "Refuerza los enlaces entre cadenas y mejora la resistencia", incorrectFeedback: "Lo contrario: degrada el material." },
        { id: "ninguno", label: "Ninguno: los plásticos son inertes a la luz", incorrectFeedback: "El PVC y el polietileno se deterioran con la intemperie." },
      ],
      correctChoiceId: "rotura",
      shuffleChoices: true,
      explanation: "La rotura de enlaces disminuye el peso molecular y, con él, la resistencia mecánica y química.",
    },
    {
      id: "desgaste",
      type: "slide",
      help: [
        {
          label: "¿Qué reduce el desgaste?",
          message: "Menos carga, superficies más lisas y de dureza parecida, lubricación y, en fundiciones, el grafito. Cuanto mayor es la dureza del metal, menor es su desgaste.",
        },
      ],
      title: "Desgaste: la pérdida por abrasión",
      blocks: [
        {
          kind: "text",
          text: "Dejando de lado la corrosión, el **desgaste** es el agente más importante en la reducción de la vida de una máquina. Produce pérdida de material por **abrasión**.",
        },
        {
          kind: "steps",
          title: "Cómo se reduce",
          items: [
            "Reducir las cargas.",
            "Que las durezas de las superficies sean parecidas.",
            "Superficies lisas.",
            "Lubricación (y grafito de las fundiciones).",
          ],
        },
      ],
      visual: { kind: "anim", scene: "desgaste-asperezas", beatMs: 4200 },
    },
    {
      id: "cavitacion",
      type: "slide",
      help: [
        {
          label: "¿Dónde se da?",
          message: "En hélices, rotores de turbinas y bombas hidráulicas, donde el líquido pasa por zonas de presión muy baja.",
        },
      ],
      title: "Erosión líquida y cavitación",
      blocks: [
        {
          kind: "definition",
          text: "La **cavitación** ocurre cuando un líquido con burbujas de gas entra en una región de **baja presión**: las burbujas crecen y, al volver a subir la presión, **colapsan** y su onda de choque ejerce presiones de cientos de atmósferas contra una zona localizada.",
        },
      ],
      visual: { kind: "anim", scene: "cavitacion", beatMs: 4200 },
    },
    {
      id: "check-cavitacion",
      type: "predict",
      help: [{ label: "Burbujas", message: "Piensa en lo que les pasa a las burbujas al pasar de baja a alta presión." }],
      title: "En qué consiste la cavitación",
      question: "¿En qué consiste el fenómeno de la cavitación?",
      mode: "choice",
      choices: [
        { id: "colapso", label: "En el colapso de burbujas de gas en un líquido al subir la presión, que desprende material de la pared" },
        { id: "oxidacion", label: "En la oxidación del metal por el oxígeno disuelto en el agua", incorrectFeedback: "Eso es corrosión; la cavitación es un fenómeno mecánico." },
        { id: "sedimentos", label: "En la acumulación de sedimentos que obstruyen la tubería", incorrectFeedback: "No tiene relación con sedimentos." },
      ],
      correctChoiceId: "colapso",
      shuffleChoices: true,
      explanation: "Las ondas de choque de las burbujas que colapsan arrancan material de la superficie. Se evita bajando la velocidad del fluido o con aceros duros y recubrimientos que amortigüen el impacto.",
    },
  ],
};
