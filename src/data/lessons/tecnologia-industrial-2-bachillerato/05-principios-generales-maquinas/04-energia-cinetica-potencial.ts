import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_5_SUBTITLE } from "@/data/lessons/shared";

export const energiaCineticaPotencialLesson: InteractiveLesson = {
  slug: "energia-cinetica-potencial",
  title: "4. Energía cinética, potencial y conservación",
  subtitle: TEMA_TI2_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definiciones",
      type: "slide",
      help: [
        {
          label: "¿Qué significa «capacidad de producir trabajo»?",
          message: "Un cuerpo con energía puede, al transformarla, mover algo o deformarlo: el agua de un pantano mueve una turbina; un resorte comprimido lanza un objeto.",
        },
      ],
      title: "Energía: capacidad de producir trabajo",
      blocks: [
        {
          kind: "text",
          text: "Si una fuerza sube un cuerpo y además lo **acelera**, $F - m g\\sin\\theta = m a$. Al multiplicar por el espacio recorrido y sustituir la velocidad media, el trabajo queda:",
        },
        {
          kind: "formula",
          tex: "W = (m g h - m g h_0) + \\left(\\tfrac{1}{2} m v^2 - \\tfrac{1}{2} m v_0^2\\right)",
        },
        {
          kind: "facts",
          items: [
            { tex: "E_c = \\tfrac{1}{2}\\,m\\,v^2", label: "energía cinética: por el movimiento" },
            { tex: "E_p = m\\,g\\,h", label: "energía potencial gravitatoria: por la posición" },
          ],
        },
        {
          kind: "rule",
          formula: "W = \\Delta E_p + \\Delta E_c",
          text: "El trabajo de la fuerza resultante es la variación de energía potencial más la de energía cinética.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "rampa",
      type: "slide",
      help: [
        {
          label: "¿Y la altura de referencia?",
          message: "En la energía potencial interesa la diferencia de alturas (aprovechable), no el valor absoluto: se toma como referencia el nivel de las turbinas, por ejemplo.",
        },
      ],
      title: "Explora la conversión de energía",
      blocks: [
        {
          kind: "text",
          text: "Desliza el cuerpo por la rampa. Primero sin rozamiento: la energía potencial se convierte en cinética y su suma no cambia. Luego añade rozamiento y mira dónde va la energía que falta.",
        },
      ],
      visual: { kind: "tool", tool: "energia-rampa", params: { a: 5, b: 30, c: 0 } },
    },
    {
      id: "check-energia-ep",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "E_p = m g h", message: "$m = 10$ kg, $g = 9{,}8$ m/s², $h = 5$ m." }],
      title: "Energía potencial",
      question: "Un cuerpo de $10$ kg está a $5$ m de altura sobre el suelo. ¿Cuál es su energía potencial, en julios, respecto al suelo?",
      correctAnswers: ["490"],
      explanation: "$E_p = m\\,g\\,h = 10\\cdot 9{,}8\\cdot 5 = 490$ J.",
    },
    {
      id: "check-velocidad",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Conservación", message: "Sin rozamiento, toda la energía potencial pasa a cinética: $m\\,g\\,h = \\tfrac{1}{2}m\\,v^2$, luego $v = \\sqrt{2\\,g\\,h}$." }],
      title: "Velocidad al llegar abajo",
      question: "Ese cuerpo se deja deslizar sin rozamiento desde $5$ m de altura. ¿Con qué velocidad llega al suelo? (en m/s, con una decimal)",
      correctAnswers: ["9,9", "9.9"],
      explanation: "$v = \\sqrt{2\\cdot 9{,}8\\cdot 5} = \\sqrt{98} = 9{,}9$ m/s. La masa no influye.",
    },
    {
      id: "conservacion",
      type: "slide",
      help: [
        {
          label: "¿Y si hay rozamiento?",
          message: "La energía no desaparece: se disipa en forma de calor. Por eso el balance incluye el trabajo de rozamiento $W_r$, energía no utilizable para producir trabajo útil.",
        },
      ],
      title: "Conservación de la energía",
      blocks: [
        {
          kind: "definition",
          text: "**La energía no se crea ni se destruye, solamente se transforma.** Con la equivalencia masa–energía de Einstein, $E = m\\,c^2$ ($c$ es la velocidad de la luz).",
        },
        {
          kind: "rule",
          title: "Para no equivocarse con los signos",
          formula: "\\sum E_{\\text{entra}} = \\sum E_{\\text{sale}}",
          text: "Cuando salen valores negativos al desarrollar las fórmulas, la energía o el trabajo van en sentido contrario al supuesto.",
        },
        {
          kind: "text",
          text: "Existen otras formas de energía potencial: la de un **resorte** comprimido, y la **interna**, almacenada en los enlaces del interior de los cuerpos (combustible, gas). Interesan sobre todo las diferencias.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "clasifica-energia",
      type: "classify",
      help: [{ label: "Pista", message: "Potencial: posición o configuración. Cinética: movimiento. Interna: enlaces internos." }],
      title: "Tipo de energía",
      question: "Clasifica cada situación según la energía que se almacena o se manifiesta.",
      groups: [
        { id: "potencial", label: "Potencial", tone: "emerald" },
        { id: "cinetica", label: "Cinética", tone: "cobalt" },
        { id: "interna", label: "Interna", tone: "amber" },
      ],
      items: [
        { id: "a", text: "El agua en un pantano con las compuertas cerradas", group: "potencial" },
        { id: "b", text: "Un resorte comprimido", group: "potencial" },
        { id: "c", text: "Un coche circulando por la autopista", group: "cinetica" },
        { id: "d", text: "El agua que fluye hacia las turbinas", group: "cinetica" },
        { id: "e", text: "Un depósito de combustible", group: "interna" },
        { id: "f", text: "El gas del interior de un cilindro caliente", group: "interna" },
      ],
      hint: "Pregúntate si la energía está en la posición, en el movimiento o en el interior de la materia.",
      explanation: "La del pantano y la del resorte se deben a la posición o configuración; la del coche y la del agua que fluye, al movimiento; la del combustible y la del gas caliente, a la energía interna.",
    },
    {
      id: "check-cadena",
      type: "predict",
      help: [{ label: "Sigue el agua", message: "Del pantano a la red eléctrica la energía pasa por varias formas." }],
      title: "Del pantano a la red",
      question: "¿En qué orden se transforma la energía en una central hidroeléctrica?",
      mode: "choice",
      choices: [
        { id: "orden", label: "Potencial del agua → cinética → trabajo en la turbina → energía eléctrica" },
        { id: "inverso", label: "Eléctrica → cinética → potencial → trabajo", incorrectFeedback: "Está invertido: la central produce electricidad, no la consume." },
        { id: "termica", label: "Térmica → potencial → cinética → eléctrica", incorrectFeedback: "En una hidroeléctrica no interviene el calor." },
      ],
      correctChoiceId: "orden",
      shuffleChoices: true,
      explanation: "Al abrir las compuertas, la energía potencial se transforma en cinética; al entrar en las turbinas, en trabajo, y este, en energía eléctrica.",
    },
  ],
};
