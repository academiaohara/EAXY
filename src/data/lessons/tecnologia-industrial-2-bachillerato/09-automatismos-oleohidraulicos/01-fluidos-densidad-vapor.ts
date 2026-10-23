import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_9_SUBTITLE } from "@/data/lessons/shared";

export const fluidosDensidadVaporLesson: InteractiveLesson = {
  slug: "fluidos-densidad-vapor",
  title: "1. Fluidos hidráulicos: densidad y presión de vapor",
  subtitle: TEMA_TI2_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "intro",
      type: "slide",
      help: [{ label: "¿Quién fue Pascal?", message: "Blaise Pascal (siglo XVII) descubrió que un fluido confinado transmite la presión en todas las direcciones: de ahí nace la hidráulica moderna, desde los frenos hasta las excavadoras." }],
      title: "Del agua al aceite: por qué hidráulica",
      blocks: [
        { kind: "text", text: "En neumática el fluido es un gas **compresible**; en oleohidráulica es un **aceite** que se considera **incompresible**: un aceite se comprime solo un $0{,}5\\,\\%$ a $70$ bar. Esa diferencia, y la necesidad de un **circuito de retorno** para recoger el aceite, marcan las diferencias entre ambas." },
        { kind: "compare",
          left: { title: "Ventajas", text: "Sustituye palancas, engranajes y husillos: menos desgaste y mantenimiento, sin vibraciones y con **regulación de velocidad muy fácil**. Frenos y dirección de los coches son hidráulicos.", tone: "ok" },
          right: { title: "Precaución", text: "Aunque la bomba esté parada puede quedar **presión residual** en las conducciones: un manguito roto a alta presión puede segar un brazo.", tone: "warn" } },
      ],
      arrange: "stack",
    },
    {
      id: "densidad",
      type: "slide",
      help: [{ label: "¿Y el volumen específico?", message: "Es el inverso de la densidad: el volumen que ocupa la unidad de masa. El peso específico es el peso por unidad de volumen (depende de $g$)." }],
      title: "Densidad",
      blocks: [
        { kind: "rule", title: "Densidad", formula: "d = \\dfrac{m}{V}", text: "Masa por unidad de volumen. La **densidad relativa** es el cociente con la del agua (1 kg/dm³ a 4 °C): coincide numéricamente con la absoluta pero **sin unidades**." },
        { kind: "example", title: "Llenar un depósito", lines: [
          { math: "V = 1\\,100\\ \\text{l} = 1{,}1\\ \\text{m}^3,\\quad d = 900\\ \\text{kg/m}^3" },
          { math: "m = d\\,V = 900\\cdot 1{,}1 = 990\\ \\text{kg}" },
        ] },
        { kind: "text", text: "Como el aceite es incompresible, su densidad **permanece constante** aunque cambie la presión." },
      ],
      arrange: "stack",
    },
    {
      id: "check-masa",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Fórmula", message: "$m = d\\,V$ con $V = 1\\,100$ l $= 1{,}1$ m³ y $d = 900$ kg/m³." }],
      title: "Masa de aceite de un depósito",
      question: "Un depósito de una instalación oleohidráulica se llena con $1\\,100$ l de aceite de densidad $0{,}9$ kg/dm³. ¿Cuál es la masa de aceite, en kg?",
      correctAnswers: ["990"],
      explanation: "$m = 0{,}9\\ \\text{kg/dm}^3\\cdot 1\\,100\\ \\text{dm}^3 = 990$ kg.",
    },
    {
      id: "check-incompresible",
      type: "predict",
      help: [{ label: "Pista", message: "El aceite se comprime solo un 0,5 % a 70 bar." }],
      title: "Aceite frente a aire",
      question: "Al elevar la presión de $1$ a $70$ bar, la densidad del aceite hidráulico:",
      mode: "choice",
      choices: [
        { id: "cte", label: "Casi no cambia: el aceite se considera incompresible" },
        { id: "70", label: "Se multiplica por 70, como la del aire", incorrectFeedback: "Eso ocurre con un gas, no con un líquido." },
        { id: "mitad", label: "Se reduce a la mitad", incorrectFeedback: "Un líquido se comprime muy poco." },
      ],
      correctChoiceId: "cte",
      shuffleChoices: true,
      explanation: "Solo se comprime un $0{,}5\\,\\%$ a $70$ bar: puede despreciarse y la densidad se toma constante.",
    },
    {
      id: "vapor",
      type: "slide",
      help: [{ label: "¿Por qué hierve el agua en frío con poca presión?", message: "Porque hierve cuando la presión alrededor iguala a su presión de vapor. A 0,0238 bar (presión de vapor del agua a ambiente), basta con bajar mucho la presión." }],
      title: "Presión de vapor y cavitación",
      blocks: [
        { kind: "definition", text: "**Presión de vapor**: la presión parcial que ejercen sus propias moléculas de vapor cuando el líquido está en equilibrio en un espacio cerrado. Depende solo de la **temperatura**." },
        { kind: "text", text: "Si la presión del líquido baja hasta la de vapor, **hierve**. En un estrechamiento o una válvula la presión puede bajar mucho: se forman **burbujas de vapor** que luego **implosionan** al llegar a zonas de más presión. Es la **cavitación**, que erosiona bombas y turbinas." },
        { kind: "text", text: "El **golpe de ariete** aparece al cortar bruscamente el flujo: el líquido se comprime y la tubería se estira, como un muelle, y puede romper la instalación." },
      ],
      visual: { kind: "tool", tool: "continuidad-bernoulli-explorador", params: { a: 30, b: 4, c: 200 } },
    },
    {
      id: "check-cavitacion",
      type: "predict",
      help: [{ label: "Pista", message: "Burbujas que se forman y colapsan." }],
      title: "¿Qué es la cavitación?",
      question: "La cavitación en una bomba o válvula es:",
      mode: "choice",
      choices: [
        { id: "burbujas", label: "La formación de burbujas de vapor donde la presión baja a la de vapor, y su implosión posterior, que erosiona el metal" },
        { id: "aire", label: "La entrada de aire del exterior en la instalación", incorrectFeedback: "Eso es aireación; la cavitación es vapor del propio líquido." },
        { id: "calor", label: "El calentamiento excesivo del aceite", incorrectFeedback: "Puede ser consecuencia, pero no es la definición." },
      ],
      correctChoiceId: "burbujas",
      shuffleChoices: true,
      explanation: "Aparece donde la presión es muy baja (estrechamientos, aspiración de la bomba) y daña las piezas metálicas.",
    },
  ],
};
