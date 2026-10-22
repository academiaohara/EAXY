import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_5_SUBTITLE } from "@/data/lessons/shared";

export const trabajoPlanoInclinadoLesson: InteractiveLesson = {
  slug: "trabajo-plano-inclinado",
  title: "2. Trabajo y plano inclinado",
  subtitle: TEMA_TI2_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "trabajo",
      type: "slide",
      help: [
        {
          label: "¿Y si empujo una pared?",
          message: "Por mucho esfuerzo muscular que hagas, si no hay desplazamiento, en Física no hay trabajo: $W = F\\,e = 0$.",
        },
      ],
      title: "Trabajo: fuerza por desplazamiento",
      blocks: [
        {
          kind: "text",
          text: "En Física el término «trabajo» relaciona una **fuerza** con el **espacio recorrido**: para que haya trabajo tiene que haber desplazamiento.",
        },
        {
          kind: "rule",
          title: "Fuerza constante y movimiento rectilíneo en su dirección",
          formula: "W = F\\,e",
          text: "Con $F$ en newtons y $e$ en metros, $W$ sale en **julios**: $1\\ \\text{J} = 1\\ \\text{N}\\cdot 1\\ \\text{m}$.",
        },
        {
          kind: "text",
          text: "Si la fuerza forma un ángulo $\\alpha$ con el desplazamiento, solo trabaja su componente en esa dirección: $F\\cos\\alpha$. En el Sistema Técnico: $1$ kpm $= 9{,}8$ J.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "rampa",
      type: "slide",
      help: [
        {
          label: "¿Por qué desaparece el seno?",
          message: "La longitud de la rampa es $\\ell = h/\\sin\\beta$. Al multiplicar $F = mg\\sin\\beta$ por $\\ell$, el seno se cancela y queda $W = mgh$.",
        },
      ],
      title: "Subir una carga con una rampa",
      blocks: [
        {
          kind: "text",
          text: "Un camión de mudanzas sube un mueble de $120$ kg a $0{,}8$ m con una rampa de $6$ m de base, sin rozamiento. ¿Cuánto trabajo hace falta? ¿Cambia con otra rampa?",
        },
      ],
      visual: { kind: "anim", scene: "plano-inclinado", beatMs: 4500 },
    },
    {
      id: "explora-rampa",
      type: "slide",
      help: [
        {
          label: "¿Qué es la ventaja mecánica?",
          message: "El cociente entre la fuerza por el plano inclinado y la fuerza por la vertical. Vale $\\sin\\beta$ y siempre es menor que 1: se hace menos fuerza, pero recorriendo más espacio.",
        },
      ],
      title: "Explora la rampa",
      blocks: [
        {
          kind: "rule",
          title: "Ventaja mecánica del plano inclinado",
          formula: "\\dfrac{F_{\\text{plano}}}{F_{\\text{vertical}}} = \\sin\\beta",
          text: "Es el principio de la mayoría de los mecanismos: aplicar una fuerza menor a costa de recorrer más espacio.",
        },
      ],
      visual: { kind: "tool", tool: "plano-inclinado-trabajo", params: { a: 120, b: 0.8, c: 6 } },
    },
    {
      id: "check-trabajo-rampa",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "W = m g h", message: "Para cualquier rampa sin rozamiento: $W = m\\,g\\,h = 120\\cdot 9{,}8\\cdot 0{,}8$." }],
      title: "Trabajo para subir el mueble",
      question: "¿Qué trabajo, en julios, hace falta para subir un mueble de $120$ kg a $0{,}8$ m de altura sin rozamiento? (redondea a la unidad)",
      correctAnswers: ["941", "940,8", "940.8"],
      explanation: "$W = m\\,g\\,h = 120\\cdot 9{,}8\\cdot 0{,}8 = 940{,}8 \\approx 941$ J, con cualquier rampa y también en vertical.",
    },
    {
      id: "check-fuerza-rampa",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Descompón el peso", message: "$\\tan\\beta = 0{,}8/6$ da $\\beta = 7{,}6°$. La fuerza paralela al plano es $m\\,g\\,\\sin\\beta$." }],
      title: "Fuerza por la rampa",
      question: "Con la rampa de $6$ m de base y $0{,}8$ m de altura ($\\beta \\approx 7{,}6°$), ¿qué fuerza, en newtons, hay que hacer para subir los $120$ kg sin rozamiento? (redondea a la unidad)",
      correctAnswers: ["155", "156", "155,5", "155.5"],
      explanation: "$F = m\\,g\\,\\sin\\beta = 120\\cdot 9{,}8\\cdot \\sin 7{,}6° \\approx 155$ N, frente a los $1\\,176$ N de subirlo en vertical.",
    },
    {
      id: "check-ventaja",
      type: "predict",
      help: [{ label: "Pista", message: "El trabajo no cambia, así que si disminuye la fuerza, tiene que aumentar el recorrido." }],
      title: "Rampa más larga",
      question: "Si alargamos la rampa (menor inclinación) para subir la misma carga a la misma altura, sin rozamiento:",
      mode: "choice",
      choices: [
        { id: "menos", label: "Hace falta menos fuerza, se recorre más espacio y el trabajo es el mismo" },
        { id: "menostrabajo", label: "Hace falta menos fuerza y también menos trabajo", incorrectFeedback: "El trabajo es $m\\,g\\,h$ y no depende de la inclinación." },
        { id: "mas", label: "Hace falta más fuerza, aunque el recorrido es menor", incorrectFeedback: "Es al revés: más tendida, menos fuerza." },
      ],
      correctChoiceId: "menos",
      shuffleChoices: true,
      explanation: "La ventaja mecánica es $\\sin\\beta$: con menor ángulo, menor fuerza; pero la distancia crece lo mismo y el trabajo se conserva.",
    },
    {
      id: "check-definicion-trabajo",
      type: "predict",
      help: [{ label: "Dirección", message: "La fuerza y el desplazamiento deben tener la misma dirección." }],
      title: "Trabajo en mecánica",
      question: "El trabajo en mecánica es:",
      mode: "choice",
      choices: [
        { id: "ok", label: "El producto de una fuerza por el espacio recorrido, cuando la dirección de la fuerza es la misma que la del espacio" },
        { id: "esfuerzo", label: "El esfuerzo realizado para mover algo", incorrectFeedback: "Esa es la idea cotidiana; en Física hace falta desplazamiento." },
        { id: "fuerza", label: "La fuerza realizada para mover una masa de un kilogramo", incorrectFeedback: "No: es fuerza por distancia." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "$W = F\\,e$ con $F$ y $e$ en la misma dirección.",
    },
  ],
};
