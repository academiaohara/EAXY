import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_4_SUBTITLE } from "@/data/lessons/shared";

export const tiposCorrosionProteccionLesson: InteractiveLesson = {
  slug: "tipos-corrosion-proteccion",
  title: "7. Tipos de corrosión y protección",
  subtitle: TEMA_TI2_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "ocho-tipos",
      type: "slide",
      help: [
        {
          label: "¿Cuál es la más frecuente?",
          message: "La corrosión uniforme, que es también la más predecible: la herrumbre del acero. Se previene con recubrimientos o barnices.",
        },
      ],
      title: "Ocho tipos de corrosión",
      blocks: [
        {
          kind: "steps",
          items: [
            "**Uniforme**: zonas que actúan al azar de ánodo y cátodo; herrumbre del acero.",
            "**Galvánica**: dos metales distintos en contacto con un electrolito; se corroe el menos noble.",
            "**Aireación diferencial**: rendijas y uniones donde el oxígeno no se renueva.",
            "**Picaduras**: corrosión localizada que penetra desde la superficie.",
            "**Intergranular**: en los límites de grano ha precipitado una segunda fase.",
            "**Selectiva**: se disuelve uno de los componentes de la aleación (descincado del latón).",
            "**Erosión**: se elimina la capa protectora por la acción mecánica de un fluido.",
            "**Bajo tensiones**: esfuerzos o tensiones internas abren grietas que hacen de ánodo.",
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "aireacion",
      type: "slide",
      help: [
        {
          label: "¿Por qué la soldadura mejora?",
          message: "Una unión soldada no deja hendiduras ni rendijas donde se estanque la humedad sin renovar el oxígeno.",
        },
      ],
      title: "Aireación diferencial",
      blocks: [
        {
          kind: "text",
          text: "Aparece en un mismo metal con zonas **más aireadas** (exteriores) y zonas **empobrecidas en oxígeno** (rendijas). Las zonas interiores se convierten en ánodo y se corroen.",
        },
      ],
      visual: { kind: "anim", scene: "aireacion-diferencial", beatMs: 4200 },
    },
    {
      id: "clasifica-tipos",
      type: "classify",
      help: [{ label: "Pista", message: "Piensa en la causa: dos metales, un solo metal con rendijas, una segunda fase en el grano…" }],
      title: "Reconoce el tipo",
      question: "Relaciona cada situación con el tipo de corrosión.",
      groups: [
        { id: "galvanica", label: "Galvánica", tone: "cobalt" },
        { id: "aireacion", label: "Aireación diferencial", tone: "emerald" },
        { id: "intergranular", label: "Intergranular", tone: "amber" },
        { id: "selectiva", label: "Selectiva", tone: "rose" },
      ],
      items: [
        { id: "a", text: "Tubo de acero unido a un racor de cobre", group: "galvanica" },
        { id: "b", text: "Herrumbre en el interior de una unión remachada con humedad", group: "aireacion" },
        { id: "c", text: "En el acero, la ferrita es anódica respecto a la cementita", group: "intergranular" },
        { id: "d", text: "El cinc del latón se disuelve y solo queda cobre poroso rojizo", group: "selectiva" },
        { id: "e", text: "Dos metales distintos separados en la serie galvánica", group: "galvanica" },
        { id: "f", text: "Zonas estancas sin renovación de oxígeno", group: "aireacion" },
      ],
      hint: "Busca qué componente actúa de ánodo.",
      explanation: "Galvánica: dos metales; aireación: rendijas; intergranular: fases en el límite de grano; selectiva: se disuelve un componente de la aleación.",
    },
    {
      id: "galvanizado",
      type: "slide",
      help: [
        {
          label: "¿Qué es un recubrimiento anódico?",
          message: "Uno cuyo metal tiene menor potencial que el del metal que protege: si se rompe, se corroe él y el protegido se queda de cátodo.",
        },
      ],
      title: "Recubrimientos metálicos: ¿cinc o estaño?",
      blocks: [
        {
          kind: "text",
          text: "Un recubrimiento puede proteger el acero aunque se raye… o empeorar las cosas. Elige distintos metales de recubrimiento y mira quién pierde electrones en la rayadura.",
        },
      ],
      visual: { kind: "tool", tool: "recubrimiento-rayado", params: { a: 2 } },
    },
    {
      id: "check-galvanizado",
      type: "predict",
      help: [{ label: "Potenciales", message: "Zn: $-0{,}76$ V (anódico respecto al hierro, $-0{,}44$ V). Sn: $-0{,}14$ V (catódico)." }],
      title: "Chapa galvanizada o chapa estañada",
      question: "Una chapa de acero recubierta de cinc y otra recubierta de estaño sufren una rayadura profunda. ¿Qué ocurre?",
      mode: "choice",
      choices: [
        { id: "zn", label: "En la galvanizada se corroe el cinc y el acero queda protegido; en la estañada se corroe el acero" },
        { id: "al", label: "En las dos se corroe el acero", incorrectFeedback: "El cinc tiene menor potencial que el hierro: protege al acero." },
        { id: "inverso", label: "En la estañada se corroe el estaño y el acero queda protegido", incorrectFeedback: "Es al revés: el estaño es más noble que el hierro." },
      ],
      correctChoiceId: "zn",
      shuffleChoices: true,
      explanation: "El cinc actúa de ánodo y cede electrones al hierro. El estaño, con mayor potencial, hace de cátodo y el acero se corroe más deprisa.",
    },
    {
      id: "check-arandela",
      type: "predict",
      help: [{ label: "Relación de áreas", message: "Si el ánodo es pequeño y el cátodo grande, el ánodo cede muchos electrones y se corroe muy rápido." }],
      title: "Arandelas",
      question: "Una arandela de cobre sobre una chapa de acero, o una arandela de acero sobre una chapa de cobre. ¿Cuál es peor para la corrosión del acero?",
      mode: "choice",
      choices: [
        { id: "arandela-acero", label: "Arandela de acero sobre chapa de cobre: ánodo pequeño, cátodo grande" },
        { id: "arandela-cobre", label: "Arandela de cobre sobre chapa de acero", incorrectFeedback: "Aquí el cobre (cátodo) es pequeño: toma pocos electrones y el acero se corroe despacio." },
        { id: "igual", label: "Da igual: depende solo de los metales", incorrectFeedback: "También importa la relación de áreas entre ánodo y cátodo." },
      ],
      correctChoiceId: "arandela-acero",
      shuffleChoices: true,
      explanation: "El ánodo de acero, muy pequeño frente al cátodo de cobre, debe ceder muchos electrones: la corrosión del acero es muy rápida.",
    },
    {
      id: "proteccion-catodica",
      type: "slide",
      help: [
        {
          label: "¿Y si el metal protegido es el cátodo?",
          message: "Exacto: el cátodo no se corroe. Toda la protección catódica consiste en obligar a la pieza a hacer de cátodo.",
        },
      ],
      title: "Protección catódica",
      blocks: [
        {
          kind: "text",
          text: "Es un medio efectivo, aunque caro: se trata de que el metal que se va a proteger **deje de ser ánodo** y se fuerce a ser **cátodo**. Hay dos variantes.",
        },
      ],
      visual: { kind: "anim", scene: "proteccion-catodica", beatMs: 4200 },
    },
    {
      id: "metodos",
      type: "slide",
      help: [
        {
          label: "¿Qué es anodizar?",
          message: "Formar una película de óxido adherente e impermeable en el aluminio; así se evita que se formen celdas galvánicas.",
        },
      ],
      title: "Métodos de protección",
      blocks: [
        {
          kind: "steps",
          items: [
            "**Diseño**: elegir bien el material, evitar células galvánicas, ánodo de mayor superficie que el cátodo, recipientes cerrados y con fondo cónico.",
            "**Inhibidores**: sustancias (sales de cromo) que forman un recubrimiento protector; en poca cantidad dejan zonas sin recubrir.",
            "**Recubrimientos**: metálicos, orgánicos (pinturas) o por reacción superficial (pavonado, fosfatos).",
            "**Pasivación o anodizado**: película de óxido adherente e impermeable.",
            "**Protección catódica**: ánodo de sacrificio o voltaje impuesto.",
            "**Selección del material**: aceros inoxidables (Ni y Cr), tratamientos de homogeneización, sustitución por aluminio o PVC.",
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-cobre-acero",
      type: "predict",
      help: [{ label: "Menor potencial", message: "Entre el acero (Fe) y el cobre, el de menor potencial es el ánodo." }],
      title: "Tubo de cobre soldado a tubo de acero",
      question: "El tubo de cobre de un calentador se une directamente con el tubo de acero del agua. ¿Qué ocurre?",
      mode: "choice",
      choices: [
        { id: "acero", label: "El acero se corroe en las proximidades de la unión: forma una celda galvánica y es más anódico que el cobre" },
        { id: "nada", label: "Nada: el cobre y el acero conducen la electricidad y no se corroe ninguno", incorrectFeedback: "Justamente por conducir electrones se forma la pila." },
        { id: "cobre", label: "El cobre se corroe más rápido por ser mejor conductor", incorrectFeedback: "El que se corroe es el de menor potencial: el acero." },
      ],
      correctChoiceId: "acero",
      shuffleChoices: true,
      explanation: "Fe ($-0{,}44$ V) tiene menor potencial que Cu ($+0{,}34$ V): es el ánodo y se corroe.",
    },
  ],
};
