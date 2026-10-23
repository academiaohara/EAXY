import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_7_SUBTITLE } from "@/data/lessons/shared";

export const induccionFaradayLenzLesson: InteractiveLesson = {
  slug: "induccion-faraday-lenz",
  title: "5. Fuerza electromotriz inducida: Faraday y Lenz",
  subtitle: TEMA_TI2_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "inverso",
      type: "slide",
      help: [
        {
          label: "¿Es lo mismo mover el imán que mover el conductor?",
          message: "Sí: lo que importa es el **movimiento relativo**. El efecto es el mismo si se mueve el imán dentro de la bobina o la bobina cerca del imán.",
        },
      ],
      title: "Si la corriente crea un campo, ¿el campo puede crear corriente?",
      blocks: [
        {
          kind: "text",
          text: "Un motor convierte electricidad en movimiento. El proceso inverso también existe: si **movemos un conductor en un campo magnético** aparece una diferencia de tensión entre sus extremos, que se detecta con un voltímetro. Es el fundamento de los **generadores**.",
        },
        {
          kind: "text",
          text: "Los electrones libres del conductor reciben la fuerza $\\mathbf{F} = q\\,\\mathbf{v}\\times\\mathbf{B}$ y se acumulan en un extremo. La barra se comporta como una **pila**.",
        },
      ],
      visual: { kind: "anim", scene: "faraday-varilla", beatMs: 5800 },
    },
    {
      id: "explora-fem",
      type: "slide",
      help: [
        {
          label: "¿Qué es la fuerza electromotriz?",
          message: "La diferencia de potencial que crea un generador entre sus bornes: es la «tensión» de la pila. Se mide en voltios.",
        },
      ],
      title: "La fem depende de la rapidez con que cambia el flujo",
      blocks: [
        {
          kind: "rule",
          title: "Ley de Faraday",
          formula: "\\varepsilon = -\\dfrac{\\Delta\\Phi}{\\Delta t}\\qquad \\varepsilon = -N\\,\\dfrac{\\Delta\\Phi}{\\Delta t}",
          text: "La fem inducida es la **variación del flujo magnético por unidad de tiempo**. Para una barra que se mueve: $\\varepsilon = B\\,l\\,v$.",
        },
      ],
      visual: { kind: "tool", tool: "fem-induccion-explorador", params: { a: 0.5, b: 3 } },
    },
    {
      id: "flujo",
      type: "slide",
      help: [
        {
          label: "¿Por qué el producto escalar?",
          message: "Solo cuenta la componente del campo perpendicular a la superficie: $B\\cos\\varphi$. Si el campo es paralelo a la superficie, el flujo es cero.",
        },
      ],
      title: "Flujo magnético",
      blocks: [
        {
          kind: "definition",
          text: "**Flujo magnético** $\\Phi$: el número total de líneas de campo que atraviesan una superficie. $\\Phi = B\\,S\\cos\\varphi$; en el SI, el **weber** (Wb $=$ T·m²).",
        },
        {
          kind: "text",
          text: "Se puede cambiar el flujo variando el campo, la superficie o el ángulo. Cualquiera de ellos produce fem; solo importa **cuánto cambia el flujo y en cuánto tiempo**.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-flujo",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Fórmula", message: "$\\Phi = B\\,S\\cos\\varphi$ con $\\varphi = 60°$ y $\\cos 60° = 0{,}5$." }],
      title: "Flujo a través de una espira",
      question: "Una espira de $0{,}05$ m² está en un campo de $0{,}2$ T que forma $60°$ con su vector superficie. ¿Qué flujo la atraviesa, en mWb?",
      correctAnswers: ["5"],
      explanation: "$\\Phi = 0{,}2\\cdot 0{,}05\\cdot\\cos 60° = 0{,}005$ Wb $= 5$ mWb.",
    },
    {
      id: "check-barra",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Fórmula", message: "$\\varepsilon = B\\,l\\,v$." }],
      title: "Barra que se mueve",
      question: "Una barra de $0{,}4$ m se mueve a $3$ m/s perpendicular a un campo de $0{,}5$ T. ¿Qué fem se induce, en voltios?",
      correctAnswers: ["0,6", "0.6"],
      explanation: "$\\varepsilon = 0{,}5\\cdot 0{,}4\\cdot 3 = 0{,}6$ V.",
    },
    {
      id: "check-bobina",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Fórmula", message: "$|\\varepsilon| = N\\,\\Delta\\Phi/\\Delta t$." }],
      title: "Una bobina de 200 espiras",
      question: "El flujo a través de una bobina de $200$ espiras varía $2$ mWb en $0{,}1$ s. ¿Cuánto vale el módulo de la fem inducida, en voltios?",
      correctAnswers: ["4"],
      explanation: "$|\\varepsilon| = 200\\cdot 0{,}002/0{,}1 = 4$ V.",
    },
    {
      id: "lenz",
      type: "slide",
      help: [
        {
          label: "¿Y el signo menos?",
          message: "El signo recoge la ley de Lenz: la fem inducida tiene un sentido tal que **se opone a la causa que la produce**. Si no fuera así se crearía energía de la nada.",
        },
      ],
      title: "Ley de Lenz",
      blocks: [
        {
          kind: "definition",
          text: "**Ley de Lenz**: el sentido de una fem inducida es tal que se **opone a la causa** que la produce.",
        },
        {
          kind: "text",
          text: "Por eso, en la barra, la corriente crea una fuerza que **frena** el movimiento: hay que hacer trabajo para generar energía eléctrica. Y por eso, cuando un motor gira, aparece una fuerza contraelectromotriz que se opone a la tensión aplicada.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-lenz",
      type: "predict",
      help: [{ label: "Pista", message: "Conservación de la energía." }],
      title: "¿Por qué hay que empujar la barra?",
      question: "En la barra que se mueve y está unida a un circuito cerrado, ¿por qué hay que hacer fuerza para que siga moviéndose?",
      mode: "choice",
      choices: [
        { id: "frena", label: "Porque la corriente inducida crea una fuerza magnética contraria al movimiento (Lenz)" },
        { id: "roz", label: "Porque el rozamiento con los carriles es muy grande", incorrectFeedback: "Aun sin rozamiento hay que hacer fuerza." },
        { id: "nada", label: "No hay que hacer fuerza: se mueve sola", incorrectFeedback: "Se produciría energía eléctrica de la nada." },
      ],
      correctChoiceId: "frena",
      shuffleChoices: true,
      explanation: "La potencia mecánica $F\\,v = I\\,l\\,B\\,v$ es la que se convierte en potencia eléctrica $\\varepsilon\\,I$.",
    },
    {
      id: "check-weber",
      type: "predict",
      help: [{ label: "Pista", message: "$\\Phi = B\\cdot S$." }],
      title: "La unidad del flujo",
      question: "El weber (Wb), unidad de flujo magnético, equivale a:",
      mode: "choice",
      choices: [
        { id: "tm2", label: "T·m²" },
        { id: "t", label: "T/m²", incorrectFeedback: "Eso dividiría la inducción entre el área; el flujo es inducción por superficie." },
        { id: "tm", label: "T·m", incorrectFeedback: "Falta la segunda potencia de la longitud: el flujo usa una superficie." },
      ],
      correctChoiceId: "tm2",
      shuffleChoices: true,
      explanation: "$1\\ \\text{Wb} = 1\\ \\text{T}\\cdot 1\\ \\text{m}^2$, así que $B = \\Phi/S$ también se expresa en Wb/m².",
    },
  ],
};
