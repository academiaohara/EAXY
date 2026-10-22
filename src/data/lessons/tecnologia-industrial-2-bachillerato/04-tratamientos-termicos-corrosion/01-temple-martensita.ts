import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_4_SUBTITLE } from "@/data/lessons/shared";

export const templeMartensitaLesson: InteractiveLesson = {
  slug: "temple-martensita",
  title: "1. Temple y martensita",
  subtitle: TEMA_TI2_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "que-son-tratamientos",
      type: "slide",
      help: [
        {
          label: "¿Se cambia la composición química?",
          message: "En los tratamientos térmicos, no: solo se cambia la temperatura. En los termoquímicos sí, pero únicamente en una capa superficial.",
        },
      ],
      title: "Tratamientos térmicos y termoquímicos",
      blocks: [
        {
          kind: "definition",
          text: "Los **tratamientos térmicos** son procesos en los que solo se usa la **temperatura** como magnitud variable para modificar la microestructura y la constitución de metales y aleaciones, **sin variar su composición química**.",
        },
        {
          kind: "compare",
          left: { title: "Térmicos", text: "Temple, recocido, revenido y normalizado.", tone: "info" },
          right: { title: "Termoquímicos o superficiales", text: "Cambian además la composición de una capa de la superficie: cementación, cianuración, nitruración, carbonitruración, sulfinización.", tone: "key" },
        },
        {
          kind: "text",
          text: "El objetivo es mejorar las propiedades mecánicas: unas veces aumentar la **dureza** y la resistencia; otras, la **ductilidad** para facilitar el conformado.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "clasifica-tratamientos",
      type: "classify",
      help: [{ label: "Pista", message: "Si se aporta otro elemento (carbono, nitrógeno, azufre…) a la superficie, es termoquímico." }],
      title: "¿Térmico o termoquímico?",
      question: "Clasifica cada tratamiento.",
      groups: [
        { id: "termico", label: "Térmico", tone: "cobalt" },
        { id: "termoquimico", label: "Termoquímico", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Temple", group: "termico" },
        { id: "b", text: "Cementación", group: "termoquimico" },
        { id: "c", text: "Recocido", group: "termico" },
        { id: "d", text: "Nitruración", group: "termoquimico" },
        { id: "e", text: "Normalizado", group: "termico" },
        { id: "f", text: "Carbonitruración", group: "termoquimico" },
      ],
      hint: "Fíjate si se añade algún elemento a la superficie.",
      explanation: "Los térmicos no cambian la composición; los termoquímicos enriquecen la capa superficial con otro elemento.",
    },
    {
      id: "martensita",
      type: "slide",
      help: [
        {
          label: "¿Qué es el temple?",
          message: "El tratamiento térmico convencional para obtener aceros martensíticos: se calienta hasta austenizar y se enfría rápido en agua, aceite o aire.",
        },
      ],
      title: "Temple: cómo nace la martensita",
      blocks: [
        {
          kind: "text",
          text: "El **temple** consiste en un enfriamiento **rápido y continuo** en un medio adecuado (agua, aceite o aire) desde la temperatura de austenización. Las propiedades óptimas se logran con un alto contenido de martensita.",
        },
        {
          kind: "definition",
          text: "La **martensita** es una solución sobresaturada de carbono en hierro $\\alpha$ con red **tetragonal centrada en el cuerpo (BCT)**: el carbono atrapado en las aristas las alarga.",
        },
      ],
      visual: { kind: "anim", scene: "austenita-martensita", beatMs: 4200 },
    },
    {
      id: "intersticios",
      type: "slide",
      help: [
        {
          label: "¿De dónde sale 0,414?",
          message: "Del teorema de Pitágoras en el hueco de la arista de la FCC: $(R + r)^2 + (R + r)^2 = (2R)^2$, de donde $r = (\\sqrt{2}-1)R \\approx 0{,}414\\,R$.",
        },
      ],
      title: "Por qué la austenita admite tanto carbono",
      blocks: [
        {
          kind: "text",
          text: "Compara el mayor hueco de la red FCC y de la BCC con el átomo de carbono ($0{,}075$ nm). Con la FCC, el carbono casi cabe; en la BCC no, y deforma la red.",
        },
        {
          kind: "rule",
          title: "Hueco de la arista de la FCC",
          formula: "r = (\\sqrt{2} - 1)\\,R \\approx 0{,}414\\,R",
          text: "Con $R_{Fe} = 0{,}129$ nm: $r = 0{,}053$ nm. Más pequeño que el carbono: por eso solo se disuelve un $2{,}08\\,\\%$ de C.",
        },
      ],
      visual: { kind: "tool", tool: "intersticio-red", params: { a: 129, b: 0.4 } },
    },
    {
      id: "check-hueco",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Aplica la fórmula", message: "$r = 0{,}414 \\cdot R$ con $R = 0{,}129$ nm." }],
      title: "Radio del hueco",
      question: "Con $R_{Fe} = 0{,}129$ nm, ¿cuál es el radio máximo $r$ del átomo que cabe en el hueco de la arista de la red FCC? (en nm, con tres decimales)",
      correctAnswers: ["0,053", "0.053", "0,0534", "0.0534"],
      explanation: "$r = 0{,}414 \\cdot 0{,}129 = 0{,}0534 \\approx 0{,}053$ nm. El carbono ($0{,}075$ nm) es mayor: de ahí que la solubilidad máxima sea solo del $2{,}08\\,\\%$.",
    },
    {
      id: "check-red-martensita",
      type: "predict",
      help: [{ label: "Pista", message: "El carbono queda atrapado en las aristas, que se alargan en una dirección." }],
      title: "Estructura de la martensita",
      question: "La martensita de los aceros templados tiene una estructura cristalina:",
      mode: "choice",
      choices: [
        { id: "bct", label: "Tetragonal centrada en el cuerpo, con átomos de carbono atrapados en la arista de mayor longitud" },
        { id: "fcc", label: "Cúbica centrada en caras con los átomos de carbono atrapados en el centro del cubo", incorrectFeedback: "Esa es la austenita, no la martensita." },
        { id: "bcc", label: "Cúbica centrada en el cuerpo con el carbono atrapado en la arista", incorrectFeedback: "El carbono deforma la red: deja de ser cúbica y pasa a tetragonal." },
      ],
      correctChoiceId: "bct",
      shuffleChoices: true,
      explanation: "En el enfriamiento rápido el carbono no tiene tiempo de salir: las aristas se alargan y la red cúbica pasa a tetragonal (BCT).",
    },
    {
      id: "dureza-carbono",
      type: "slide",
      help: [
        {
          label: "¿Y la austenita retenida?",
          message: "Es austenita que no llega a transformarse en martensita ni con enfriamiento rápido: es más blanda y ya no aumenta la dureza.",
        },
      ],
      title: "Dureza de la martensita y contenido de carbono",
      blocks: [
        {
          kind: "text",
          text: "Cuanto más carbono atrapado, más tensión en la red y más dureza. Pero a partir de un $0{,}6\\,\\%$ de C la dureza deja de crecer.",
        },
      ],
      visual: { kind: "tool", tool: "dureza-martensita", params: { a: 0.3 } },
    },
    {
      id: "check-dureza-06",
      type: "predict",
      help: [{ label: "Austenita retenida", message: "Ni con enfriamiento rápido le da tiempo de transformarse a toda la austenita." }],
      title: "Por qué se estabiliza la dureza",
      question: "¿Por qué la dureza de la martensita no aumenta apreciablemente por encima del $0{,}6\\,\\%$ de carbono?",
      mode: "choice",
      choices: [
        { id: "retenida", label: "Porque ni con enfriamiento rápido se transforma toda la austenita: queda austenita retenida, más blanda" },
        { id: "bainita", label: "Porque aparece bainita en lugar de martensita", incorrectFeedback: "La bainita aparece con enfriamientos menos rápidos, no es la causa aquí." },
        { id: "ferrita", label: "Porque el carbono se combina con la ferrita", incorrectFeedback: "La ferrita casi no admite carbono." },
      ],
      correctChoiceId: "retenida",
      shuffleChoices: true,
      explanation: "La austenita retenida queda junto a la martensita y, al ser más blanda, ya no hay aumento de la dureza.",
    },
  ],
};
