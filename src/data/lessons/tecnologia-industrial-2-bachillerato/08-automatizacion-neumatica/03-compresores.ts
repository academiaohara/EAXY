import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_8_SUBTITLE } from "@/data/lessons/shared";

export const compresoresLesson: InteractiveLesson = {
  slug: "compresores",
  title: "3. Producción de aire comprimido: compresores",
  subtitle: TEMA_TI2_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "compresor",
      type: "slide",
      help: [{ label: "¿Qué lleva alrededor?", message: "Un compresor suele tener filtro de aspiración, depósito o calderín, manómetro, contador horario, aislante acústico y carenado." }],
      title: "El corazón del circuito",
      blocks: [
        { kind: "definition", text: "**Compresor**: máquina que toma aire en unas condiciones y lo impulsa a una **presión superior** a la de entrada. Lo mueve un motor eléctrico o térmico." },
        { kind: "text", text: "Se diferencian por su **caudal** y por su **relación de compresión** (cociente adimensional entre las presiones absolutas de salida y de entrada). Los dos deben ser adecuados al consumo del circuito." },
      ],
      visual: { kind: "tool", tool: "relacion-compresion-explorador", params: { a: 6 } },
    },
    {
      id: "check-relacion",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Absolutas", message: "$r = p_{abs,sal}/p_{abs,ent} = (6 + 1)/1$." }],
      title: "Relación de compresión",
      question: "Un compresor aspira aire a presión atmosférica ($1$ bar) y lo entrega a $6$ bar manométricos. ¿Cuál es su relación de compresión?",
      correctAnswers: ["7"],
      explanation: "$r = 7/1 = 7$: el aire ocupa la séptima parte de su volumen.",
    },
    {
      id: "embolo",
      type: "slide",
      help: [{ label: "¿Por qué tan usados?", message: "Por su precio y su flexibilidad: admiten caudales muy distintos y un amplio rango de relaciones de compresión. Su desventaja es el ruido." }],
      title: "Compresores de émbolo",
      blocks: [
        { kind: "text", text: "Funcionan como un motor de automóvil: un eje con excéntrica y una **biela** mueven el pistón. Al bajar, entra aire por la válvula de aspiración; al llegar abajo se cierran las dos válvulas y empieza la compresión; cuando el aire está comprimido se abre la **válvula de cierre** y sale hacia el circuito." },
        { kind: "facts", items: [
          { tex: "6\\text{–}10\\ \\text{bar}", label: "una etapa" },
          { tex: "\\text{hasta }15\\ \\text{bar}", label: "dos etapas, refrigeradas por agua o aceite" },
          { tex: "\\text{hasta }500\\ \\text{m}^3/\\text{min}", label: "caudal máximo" },
        ] },
      ],
      visual: { kind: "anim", scene: "compresor-embolo", beatMs: 5800 },
    },
    {
      id: "rotativos",
      type: "slide",
      help: [{ label: "¿Cuál elijo para un taller silencioso?", message: "Uno rotativo: son silenciosos y su caudal es casi constante. El de émbolo es más barato pero hace bastante ruido." }],
      title: "Compresores rotativos",
      blocks: [
        { kind: "compare",
          left: { title: "De paletas", text: "Paletas radiales en un rotor que presionan la pared por la fuerza centrífuga. Entre dos paletas se forma una cámara que se va **comprimiendo**. Muy silenciosos y de caudal casi constante.", tone: "info" },
          right: { title: "De tornillo", text: "Dos **tornillos helicoidales** comprimen el aire. Nuevos y caros, pero de bajo desgaste: ventajosos a largo plazo. Hasta ≈ 8 m³/min y de 7 a 14 bar.", tone: "key" } },
      ],
      arrange: "stack",
    },
    {
      id: "clasifica-compresores",
      type: "classify",
      help: [{ label: "Pista", message: "Émbolo: biela y válvulas. Paletas: rotor con paletas. Tornillo: dos tornillos helicoidales." }],
      title: "¿Qué compresor es?",
      question: "Relaciona cada característica.",
      groups: [
        { id: "embolo", label: "De émbolo", tone: "amber" },
        { id: "paletas", label: "De paletas", tone: "cobalt" },
        { id: "tornillo", label: "De tornillo", tone: "emerald" },
      ],
      items: [
        { id: "a", text: "Barato y flexible, pero bastante ruidoso", group: "embolo" },
        { id: "b", text: "Pasa a dos etapas para llegar a 15 bar", group: "embolo" },
        { id: "c", text: "Las paletas se apoyan en la pared por la fuerza centrífuga", group: "paletas" },
        { id: "d", text: "Silencioso y con caudal prácticamente constante", group: "paletas" },
        { id: "e", text: "Dos tornillos helicoidales; caro pero de poco desgaste", group: "tornillo" },
      ],
      hint: "Relaciona cada nombre con su elemento principal.",
      explanation: "Los de émbolo son los más usados; los rotativos son más modernos y silenciosos.",
    },
    {
      id: "check-donde",
      type: "predict",
      help: [{ label: "Pista", message: "Los demás elementos almacenan o limpian el aire." }],
      title: "¿Dónde se produce el aire comprimido?",
      question: "¿En qué parte del circuito neumático se produce el aire comprimido?",
      mode: "choice",
      choices: [
        { id: "comp", label: "En el compresor" },
        { id: "dep", label: "En el depósito", incorrectFeedback: "El depósito solo almacena el aire ya comprimido." },
        { id: "acu", label: "En el acumulador", incorrectFeedback: "Igual que el depósito, almacena y compensa pérdidas." },
        { id: "fil", label: "En el filtro", incorrectFeedback: "El filtro limpia el aire, no lo comprime." },
      ],
      correctChoiceId: "comp",
      shuffleChoices: true,
      explanation: "El compresor toma aire y lo impulsa a mayor presión; el resto lo acondiciona, almacena o distribuye.",
    },
  ],
};
