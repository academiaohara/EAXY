import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_6_SUBTITLE } from "@/data/lessons/shared";

export const motorAlternativoTiemposLesson: InteractiveLesson = {
  slug: "motor-alternativo-tiempos",
  title: "5. Motor alternativo: cuatro y dos tiempos",
  subtitle: TEMA_TI2_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "partes",
      type: "slide",
      help: [
        {
          label: "¿Qué son los segmentos?",
          message: "Dos o tres aros ranurados en el pistón que garantizan el cierre hermético entre el pistón y el cilindro.",
        },
      ],
      title: "Partes de un motor alternativo",
      blocks: [
        {
          kind: "text",
          text: "Transforma la energía térmica en mecánica mediante pistones que se deslizan con movimiento lineal en los cilindros. La estructura son la **bancada** y el **bloque**.",
        },
        {
          kind: "steps",
          items: [
            "El **pistón** (forma de vaso invertido) va unido a la **biela** por el **bulón** y lleva **segmentos** para cerrar herméticamente.",
            "La biela transmite el movimiento a la manivela del **cigüeñal**, que lo convierte en giro.",
            "Las **válvulas** de admisión y escape están en la **culata**. Las abre el **árbol de levas** (la distribución) y las cierra un muelle.",
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "cuatro-tiempos",
      type: "slide",
      help: [
        {
          label: "¿Qué son el PMS y el PMI?",
          message: "El punto muerto superior (PMS) es el punto más alto que alcanza el pistón; el inferior (PMI), el más bajo. En ellos el pistón se detiene un instante y solo se mueve por inercia.",
        },
      ],
      title: "Ciclo de cuatro tiempos",
      blocks: [
        {
          kind: "text",
          text: "El ciclo se realiza en **cuatro cambios de sentido** del pistón, es decir, **dos vueltas** del cigüeñal. De los cuatro tiempos **solo el tercero** realiza trabajo, que se almacena en el volante de inercia para hacer los otros tres.",
        },
        {
          kind: "steps",
          items: [
            "**Admisión**: el pistón baja y entra aire o mezcla por la válvula abierta.",
            "**Compresión**: sube con las válvulas cerradas.",
            "**Expansión**: la combustión empuja el pistón hacia abajo.",
            "**Escape**: el pistón sube y expulsa los gases.",
          ],
        },
      ],
      visual: { kind: "anim", scene: "motor-4-tiempos", beatMs: 5800 },
    },
    {
      id: "explora-cigueñal",
      type: "slide",
      help: [
        {
          label: "¿Y los avances y retrasos?",
          message: "En la práctica la válvula de admisión se abre antes del PMS (avance, AAA) y se cierra después del PMI (retraso, RCA); lo mismo con el escape. Así hay un solapamiento donde ambas están abiertas.",
        },
      ],
      title: "Gira el cigüeñal",
      blocks: [
        {
          kind: "text",
          text: "Mueve el cigüeñal por las dos vueltas completas y observa qué válvula está abierta y hacia dónde se mueve el pistón en cada momento.",
        },
      ],
      visual: { kind: "tool", tool: "motor-tiempos-explorador", params: { a: 0 } },
    },
    {
      id: "check-trabajo",
      type: "predict",
      help: [{ label: "Pista", message: "Piensa en cuándo empuja el gas al pistón." }],
      title: "¿Qué tiempo produce trabajo?",
      question: "En un motor de cuatro tiempos, ¿cuál de los tiempos realiza trabajo?",
      mode: "choice",
      choices: [
        { id: "tercero", label: "El tercero (expansión)" },
        { id: "primero", label: "El primero (admisión)", incorrectFeedback: "En la admisión el motor consume algo de energía para aspirar el aire." },
        { id: "segundo", label: "El segundo (compresión)", incorrectFeedback: "Comprimir consume trabajo, no lo produce." },
        { id: "cuarto", label: "El cuarto (escape)", incorrectFeedback: "En el escape el pistón expulsa los gases; no hay combustión." },
      ],
      correctChoiceId: "tercero",
      shuffleChoices: true,
      explanation: "Solo en la expansión el gas empuja el pistón. Los otros tres tiempos se mantienen con la energía almacenada en el volante.",
    },
    {
      id: "check-vueltas",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Cuenta", message: "El pistón hace cuatro carreras; cada carrera es media vuelta." }],
      title: "Vueltas por ciclo",
      question: "¿Cuántas vueltas completas da el cigüeñal en un ciclo completo de un motor de cuatro tiempos?",
      correctAnswers: ["2", "dos"],
      explanation: "Cuatro carreras $\\times$ media vuelta cada una $=$ dos vueltas. Por eso hay una sola explosión cada dos vueltas.",
    },
    {
      id: "clasifica-tiempos",
      type: "classify",
      help: [{ label: "Pista", message: "Ordena mentalmente: admisión, compresión, expansión, escape." }],
      title: "¿En qué tiempo ocurre?",
      question: "Asigna cada hecho al tiempo del motor.",
      groups: [
        { id: "admision", label: "Admisión", tone: "cobalt" },
        { id: "compresion", label: "Compresión", tone: "violet" },
        { id: "expansion", label: "Expansión", tone: "rose" },
        { id: "escape", label: "Escape", tone: "amber" },
      ],
      items: [
        { id: "a", text: "El pistón baja y aspira aire por la válvula de admisión", group: "admision" },
        { id: "b", text: "Las dos válvulas están cerradas y el pistón sube", group: "compresion" },
        { id: "c", text: "Salta la chispa y el pistón es empujado hacia abajo", group: "expansion" },
        { id: "d", text: "Se abre la válvula de escape y el pistón sube", group: "escape" },
        { id: "e", text: "Es el único tiempo que produce trabajo", group: "expansion" },
        { id: "f", text: "Aumentan la presión y la temperatura de la carga", group: "compresion" },
      ],
      hint: "Fíjate en el sentido del pistón y en las válvulas.",
      explanation: "Admisión (baja, entra aire), compresión (sube, válvulas cerradas), expansión (combustión, baja) y escape (sube, sale el gas).",
    },
    {
      id: "dos-tiempos",
      type: "slide",
      help: [
        {
          label: "¿Por qué se abandonan los de dos tiempos?",
          message: "Mezclan aceite con el combustible, que acaba saliendo con los gases de escape y contamina. Por eso las motos se pasan a motores de cuatro tiempos.",
        },
      ],
      title: "El motor de dos tiempos",
      blocks: [
        {
          kind: "text",
          text: "El ciclo se hace en **dos carreras** del pistón (una vuelta). Es **mucho más simple**: no tiene válvulas ni distribución, solo **lumbreras** (orificios) en la pared del cilindro que descubre y cierra el propio pistón. El cárter está cerrado y comunicado con el cilindro. Se usa en algunas motocicletas por su simplicidad y robustez.",
        },
        {
          kind: "compare",
          left: { title: "1.ª media vuelta", text: "Inflamación en el PMS, expansión; el pistón abre la lumbrera de escape y después la de admisión: los gases frescos barren los quemados.", tone: "info" },
          right: { title: "2.ª media vuelta", text: "El pistón sube completando barrido y admisión; cierra las lumbreras y comprime hasta el PMS, mientras entra mezcla en el cárter.", tone: "key" },
        },
      ],
      arrange: "stack",
    },
    {
      id: "encendido",
      type: "slide",
      help: [
        {
          label: "¿Qué es el avance del encendido?",
          message: "La chispa salta un instante antes de que el pistón llegue al PMS para que la presión máxima ocurra justo cuando empieza a bajar.",
        },
      ],
      title: "Cómo se enciende la mezcla",
      blocks: [
        {
          kind: "compare",
          left: { title: "Encendido provocado (MEP)", text: "Entra mezcla aire-combustible (carburador o inyección). Salta una **chispa** en la bujía. Gasolina.", tone: "info" },
          right: { title: "Encendido por compresión (MEC)", text: "Solo entra **aire**, que se comprime tanto que sube su temperatura; al inyectar el gasóleo **se inflama solo**. Más robusto. Gasóleo.", tone: "key" },
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-mec",
      type: "predict",
      help: [{ label: "Pista", message: "En el Diesel no hay bujía." }],
      title: "El tiempo de admisión de un Diesel",
      question: "En un motor de encendido por compresión, durante la admisión entra:",
      mode: "choice",
      choices: [
        { id: "aire", label: "Solo aire; el combustible se inyecta cerca del PMS" },
        { id: "mezcla", label: "Una mezcla de aire y gasóleo", incorrectFeedback: "Esa es la admisión de un motor de gasolina con carburador o inyección indirecta." },
        { id: "gases", label: "Aire y gases de escape", incorrectFeedback: "Los gases salen por el escape." },
      ],
      correctChoiceId: "aire",
      shuffleChoices: true,
      explanation: "El aire se comprime tanto que alcanza la temperatura de inflamación del gasóleo, que se inyecta al final de la compresión.",
    },
    {
      id: "lubricacion",
      type: "slide",
      help: [
        {
          label: "¿Qué pasa sin lubricación?",
          message: "Las piezas en contacto se desgastan, se recalientan y pueden llegar al agarrotamiento o gripaje.",
        },
      ],
      title: "Lubricación y refrigeración",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Lubricación",
            text: "Circuito de aceite **a presión**: el aceite está en el **cárter**; una bomba lo reparte a paredes del cilindro, bielas, cigüeñal, árbol de levas, válvulas y engranajes.",
            tone: "key",
          },
          right: {
            title: "Refrigeración",
            text: "**Por aire**: el bloque tiene aletas y una corriente de aire lo enfría (motos y motores pequeños). **Por agua**: cámaras en cilindros y culata; el agua se enfría en un radiador con ventilador.",
            tone: "info",
          },
        },
      ],
      arrange: "stack",
    },
  ],
};
