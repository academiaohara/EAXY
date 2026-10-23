import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_7_SUBTITLE } from "@/data/lessons/shared";

export const motorTrifasicoArranqueMonofasicoLesson: InteractiveLesson = {
  slug: "motor-trifasico-arranque-monofasico",
  title: "12. Arranque y regulación (CA) y motores monofásicos",
  subtitle: TEMA_TI2_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "arranque",
      type: "slide",
      help: [
        {
          label: "¿Qué es un relé térmico?",
          message: "Un dispositivo que protege al motor frente a sobrecargas: si circula demasiada corriente durante demasiado tiempo, abre el circuito. Los fusibles protegen frente a cortocircuitos.",
        },
      ],
      title: "Arranque directo",
      blocks: [
        {
          kind: "text",
          text: "Al conectar un motor de inducción, absorbe una corriente muy alta que puede producir anomalías en la red. El REBT (ITC-BT-47) obliga a poner dispositivos de arranque a los motores de **más de 0,75 kW**.",
        },
        {
          kind: "text",
          text: "**Arranque directo** (rotor en cortocircuito): se cierra el contactor $K_1$ y se aplica la tensión nominal de una vez. La corriente de arranque es de **3 a 8 veces** la nominal, y el par, de **1 a 1,5 veces** el nominal. Protegido por fusibles (cortocircuitos) y relé térmico (sobrecargas).",
        },
      ],
      arrange: "stack",
    },
    {
      id: "estrella-triangulo",
      type: "slide",
      help: [
        {
          label: "¿Para qué motores sirve?",
          message: "Para los que están **preparados para trabajar en triángulo** con la tensión de red: se arrancan primero en estrella y luego se pasa a triángulo.",
        },
      ],
      title: "Arranque estrella-triángulo",
      blocks: [
        {
          kind: "text",
          text: "Cualquier método que **reduce la tensión** reduce la corriente en la misma proporción ($I = K\\,U$) y el par con el cuadrado ($M = K_1\\,U^2$).",
        },
        {
          kind: "rule",
          title: "Estrella-triángulo",
          formula: "\\dfrac{I_{L\\Delta}}{I_{LY}} = 3\\qquad \\dfrac{M_{a\\Delta}}{M_{aY}} = 3",
          text: "En estrella la corriente de línea y el par de arranque son **la tercera parte** que en triángulo.",
        },
      ],
      visual: { kind: "anim", scene: "arranque-estrella-triangulo", beatMs: 5800 },
    },
    {
      id: "check-et",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Compara $U_f$ en estrella y en triángulo: $U_L/\\sqrt{3}$ frente a $U_L$." }],
      title: "Cuánto se reduce",
      question: "¿Por qué factor se divide la corriente de línea del arranque al conectar el motor en estrella en lugar de triángulo?",
      correctAnswers: ["3"],
      explanation: "$I_{L\\Delta}/I_{LY} = 3$ y también $M_{a\\Delta}/M_{aY} = 3$: se reduce la corriente, pero también el par disponible.",
    },
    {
      id: "otros",
      type: "slide",
      help: [
        {
          label: "¿Qué es un arrancador suave?",
          message: "Un equipo de electrónica de potencia con tiristores que sube la tensión poco a poco (rampa) y hace que el motor arranque de forma progresiva, sin tirones.",
        },
      ],
      title: "Otros métodos de arranque",
      blocks: [
        {
          kind: "steps",
          items: [
            "**Autotransformador**: reduce la tensión en el arranque y se aumenta al acelerar.",
            "**Resistencias estatóricas**: se intercala una resistencia en cada fase que se reduce con la velocidad.",
            "**Arranque electrónico** (arrancadores suaves): dos tiristores en antiparalelo por fase y una rampa de tensión.",
            "**Rotor bobinado**: se intercalan grupos de resistencias en el circuito del rotor y se van eliminando. Además de reducir la corriente, permite trabajar con **par máximo**.",
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "regulacion",
      type: "slide",
      help: [
        {
          label: "¿Por qué hay que bajar la tensión al bajar la frecuencia?",
          message: "Para que el flujo (y con él el par) no cambie: a menor frecuencia hace falta menor tensión (relación $U/f$ constante).",
        },
      ],
      title: "Regulación de la velocidad",
      blocks: [
        {
          kind: "rule",
          title: "Velocidad del rotor",
          formula: "n_2 = (1 - S)\\,n_1 = \\dfrac{(1 - S)\\,60\\,f_1}{p}",
          text: "Se puede variar el **sincronismo** (polos o frecuencia) o el **deslizamiento** (la tensión).",
        },
        {
          kind: "steps",
          items: [
            "**Cambio del número de polos**: en jaula de ardilla, con polos conmutables en relación 2:1 (**Dahlander**, triángulo-doble estrella). Es un control a saltos.",
            "**Variación de la frecuencia**: hoy es lo más usado, con electrónica de potencia (variadores). Hay que bajar la tensión con ella para mantener el par.",
            "**Tensión aplicada**: método muy limitado, solo en motores pequeños.",
          ],
        },
      ],
      visual: { kind: "tool", tool: "velocidad-trifasico-explorador", params: { a: 2, b: 4 } },
    },
    {
      id: "check-regula",
      type: "predict",
      help: [{ label: "Pista", message: "$n_1 = 60\\,f/p$ y $n_2 = (1 - S)\\,n_1$." }],
      title: "Cómo regular un trifásico",
      question: "Para regular la velocidad de un motor trifásico se puede actuar sobre:",
      mode: "choice",
      choices: [
        { id: "todas", label: "El número de polos, la frecuencia y la tensión (deslizamiento)" },
        { id: "polos", label: "Solo el número de polos del rotor", incorrectFeedback: "También la frecuencia y, con limitaciones, la tensión." },
        { id: "arranque", label: "Solo la intensidad de arranque", incorrectFeedback: "El arranque no regula la velocidad de régimen." },
      ],
      correctChoiceId: "todas",
      shuffleChoices: true,
      explanation: "Variar la frecuencia (variador) es el método más extendido hoy.",
    },
    {
      id: "clasifica-frenado-ac",
      type: "classify",
      help: [{ label: "Pista", message: "Regenerativo: el rotor supera el sincronismo y el motor devuelve energía. Dinámico: se desconecta de la red y se aplica corriente continua." }],
      title: "Frenado de un motor asíncrono",
      question: "Reparte las descripciones.",
      groups: [
        { id: "regenerativo", label: "Frenado regenerativo", tone: "emerald" },
        { id: "dinamico", label: "Frenado dinámico", tone: "amber" },
      ],
      items: [
        { id: "a", text: "El estator sigue conectado a la red y el rotor supera la velocidad de sincronismo", group: "regenerativo" },
        { id: "b", text: "Se desconecta de la red y se aplica corriente continua al devanado", group: "dinamico" },
        { id: "c", text: "Se usa en montacargas y grúas al descender", group: "regenerativo" },
        { id: "d", text: "El campo estacionario induce corrientes en el rotor que crean un par opuesto", group: "dinamico" },
      ],
      hint: "El regenerativo mantiene la conexión a la red; el dinámico, no.",
      explanation: "En el regenerativo el motor pasa a trabajar como generador.",
    },
    {
      id: "monofasico",
      type: "slide",
      help: [
        {
          label: "¿Y los de colector?",
          message: "Los motores monofásicos **de colector** se parecen a los de corriente continua con excitación serie; en este curso solo se estudian los de inducción.",
        },
      ],
      title: "Motores monofásicos: no arrancan solos",
      blocks: [
        {
          kind: "text",
          text: "Cuando solo hay red monofásica (doméstica o industrial) se usan motores **monofásicos**. En el estator hay un devanado principal (2/3 de las ranuras) y uno **auxiliar** (el tercio restante) para arrancar. Con corriente monofásica solo, el campo es **alternativo** y el **par de arranque es cero**.",
        },
        {
          kind: "compare",
          left: { title: "Fase partida", text: "Devanado auxiliar **desfasado 90° en el espacio** y con características eléctricas distintas: las corrientes quedan desfasadas y crean campo giratorio.", tone: "info" },
          right: { title: "Arranque por condensador", text: "Un **condensador en serie** con el devanado auxiliar desfasa las corrientes casi 90°: **mayor par de arranque**.", tone: "key" },
        },
        {
          kind: "text",
          text: "En ambos, un **interruptor centrífugo** desconecta el auxiliar al llegar cerca de la velocidad nominal.",
        },
      ],
      visual: { kind: "anim", scene: "monofasico-arranque", beatMs: 5800 },
    },
    {
      id: "check-mono",
      type: "predict",
      help: [{ label: "Pista", message: "Necesita un campo giratorio, y para eso hacen falta dos corrientes desfasadas." }],
      title: "¿Por qué no arranca solo?",
      question: "Un motor monofásico de inducción, con solo el devanado principal conectado, no arranca porque:",
      mode: "choice",
      choices: [
        { id: "alt", label: "Crea un campo alternativo de eje fijo (dos campos giratorios opuestos), con par de arranque nulo" },
        { id: "poca", label: "La corriente monofásica es demasiado pequeña", incorrectFeedback: "No es cuestión de cantidad, sino de que el campo no gira." },
        { id: "rotor", label: "El rotor está cortocircuitado", incorrectFeedback: "Es lo normal en los motores de inducción; no impide el arranque." },
      ],
      correctChoiceId: "alt",
      shuffleChoices: true,
      explanation: "Si se consigue un par inicial por algún sistema, el motor gira en el sentido de ese par.",
    },
    {
      id: "check-regulacion-autoeval",
      type: "predict",
      help: [{ label: "Pista", message: "Repasa los métodos de la lección." }],
      title: "Autoevaluación del libro",
      question: "Para regular la velocidad de un motor trifásico, ¿cuál de estas opciones es cierta?",
      mode: "choice",
      choices: [
        { id: "todas", label: "Puedo modificar el número de polos, modificar la frecuencia o actuar sobre la tensión: todas son ciertas" },
        { id: "solo", label: "Solo puedo modificar la frecuencia", incorrectFeedback: "También el número de polos (Dahlander) y la tensión." },
        { id: "ninguna", label: "No se puede regular la velocidad", incorrectFeedback: "Se puede, y los variadores son hoy muy comunes." },
      ],
      correctChoiceId: "todas",
      shuffleChoices: true,
      explanation: "Son tres vías: polos, frecuencia y tensión.",
    },
  ],
};
