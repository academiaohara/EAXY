import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESOB_7_SUBTITLE } from "@/data/lessons/shared";

export const trigTrianguloLadoAngulo4esobLesson: InteractiveLesson = {
  slug: "trig-triangulo-lado-angulo-4esob",
  title: "8. Resolver un triángulo rectángulo: un lado y un ángulo",
  subtitle: TEMA_4ESOB_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "metodo",
      type: "slide",
      help: [
        { label: "Elegir la razón", message: "Pregúntate: ¿qué lado tengo y cuál quiero? La razón que une esos dos (con el ángulo conocido) es la que sirve." },
        { label: "Despejar", message: "De $\\operatorname{sen}\\alpha = \\dfrac{\\text{op}}{\\text{hip}}$ sale op $= \\text{hip}\\cdot\\operatorname{sen}\\alpha$; de la tangente, op $= \\text{cont}\\cdot\\operatorname{tg}\\alpha$." },
      ],
      title: "Conocidos un lado y un ángulo",
      blocks: [
        { kind: "steps", items: ["El otro ángulo agudo es el **complementario**: $90° - \\alpha$.", "Para cada lado desconocido, elige la razón que lo relaciona con el lado y el ángulo conocidos.", "**Despeja** y calcula con la calculadora en modo DEG."] },
      ],
      visual: { kind: "tool", tool: "trig-resolver-explorador", params: { n: 0, a: 62, b: 36 }, hint: "Con ángulo 62° e hipotenusa 36 m: el cateto opuesto es la altura de la cometa respecto a la mano." },
    },
    {
      id: "check-cometa",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Seno", message: "El hilo es la hipotenusa ($36$ m) y la altura es el opuesto a $62°$: altura $= 36\\cdot\\operatorname{sen}62°$." }],
      title: "La cometa de Iris",
      question: "Iris suelta $36$ m de hilo y la cuerda forma $62°$ con la horizontal. ¿A qué altura **sobre su mano** está la cometa? (en m, redondea a las centésimas)",
      correctAnswers: ["31,79", "31.79"],
      explanation: "$\\operatorname{sen}62° = \\dfrac{a}{36} \\Rightarrow a = 36\\cdot\\operatorname{sen}62° \\approx 31{,}79$ m. (Si la mano está a $0{,}83$ m del suelo, la cometa está a $32{,}62$ m.)",
    },
    {
      id: "razon-segun-dato",
      type: "slide",
      help: [{ label: "Triángulo mental", message: "Antes de calcular, dibuja el triángulo y marca el ángulo, el lado que sabes y el que buscas." }],
      title: "¿Qué razón me sirve?",
      blocks: [
        {
          kind: "compare",
          left: { title: "Sé la hipotenusa", text: "Opuesto $= \\text{hip}\\cdot\\operatorname{sen}\\alpha$. Contiguo $= \\text{hip}\\cdot\\cos\\alpha$.", tone: "ok" },
          right: { title: "Sé un cateto", text: "Otro cateto con la **tangente**; la hipotenusa con seno o coseno.", tone: "info" },
        },
        { kind: "example", title: "Ángulo $37°$ y cateto opuesto $87$ m", lines: [{ math: "\\text{contiguo} = \\dfrac{87}{\\operatorname{tg}37°} \\approx 115{,}45\\text{ m}" }, { math: "\\text{hipotenusa} = \\dfrac{87}{\\operatorname{sen}37°} \\approx 144{,}56\\text{ m}" }] },
      ],
    },
    {
      id: "check-contiguo",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Tangente", message: "$\\operatorname{tg}37° = \\dfrac{87}{c} \\Rightarrow c = \\dfrac{87}{\\operatorname{tg}37°}$." }],
      title: "El otro cateto",
      question: "Un triángulo rectángulo tiene un ángulo agudo de $37°$ y el cateto opuesto mide $87$ m. ¿Cuánto mide el cateto contiguo? (en m, redondea a las centésimas)",
      correctAnswers: ["115,45", "115.45"],
      explanation: "$c = \\dfrac{87}{\\operatorname{tg}37°} \\approx \\dfrac{87}{0{,}7536} \\approx 115{,}45$ m.",
    },
    {
      id: "check-hipotenusa",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Seno", message: "$\\operatorname{sen}37° = \\dfrac{87}{a}$." }],
      title: "La hipotenusa",
      question: "En ese mismo triángulo ($37°$ y cateto opuesto de $87$ m), ¿cuánto mide la hipotenusa? (en m, redondea a las centésimas)",
      correctAnswers: ["144,56", "144.56"],
      explanation: "$a = \\dfrac{87}{\\operatorname{sen}37°} \\approx \\dfrac{87}{0{,}6018} \\approx 144{,}56$ m.",
    },
    {
      id: "check-catetos",
      type: "predict",
      mode: "choice",
      help: [{ label: "Multiplica por la hipotenusa", message: "Cateto contiguo $=$ hipotenusa $\\cdot\\cos\\alpha$, cateto opuesto $=$ hipotenusa $\\cdot\\operatorname{sen}\\alpha$." }],
      title: "Elegir bien",
      question: "Un ángulo agudo mide $27°$ y la hipotenusa $46$ m. ¿Qué cálculo da el cateto **contiguo** al ángulo?",
      choices: [
        { id: "a", label: "$46\\cdot\\cos27° \\approx 40{,}99$ m" },
        { id: "b", label: "$46\\cdot\\operatorname{sen}27° \\approx 20{,}88$ m", incorrectFeedback: "Eso da el cateto **opuesto**. El contiguo usa el coseno." },
        { id: "c", label: "$46\\,/\\,\\cos27° \\approx 51{,}63$ m", incorrectFeedback: "La hipotenusa multiplica, no divide: el cateto es más corto que ella." },
        { id: "d", label: "$46\\cdot\\operatorname{tg}27° \\approx 23{,}44$ m", incorrectFeedback: "La tangente relaciona los catetos entre sí, no con la hipotenusa." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "contiguo $=$ hip $\\cdot\\cos\\alpha = 46\\cdot\\cos27° \\approx 40{,}99$ m (y el opuesto $20{,}88$ m).",
    },
  ],
};
