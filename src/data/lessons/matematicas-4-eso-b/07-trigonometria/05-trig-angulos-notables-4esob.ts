import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESOB_7_SUBTITLE } from "@/data/lessons/shared";

export const trigAngulosNotables4esobLesson: InteractiveLesson = {
  slug: "trig-angulos-notables-4esob",
  title: "5. Razones de 30°, 45° y 60°",
  subtitle: TEMA_4ESOB_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "cuarenta-y-cinco",
      type: "slide",
      help: [
        { label: "Isósceles", message: "Un triángulo rectángulo con un ángulo de $45°$ tiene el otro también de $45°$: los dos catetos son iguales." },
        { label: "Racionalizar", message: "$\\dfrac{1}{\\sqrt2} = \\dfrac{\\sqrt2}{2}$: se multiplica arriba y abajo por $\\sqrt2$." },
      ],
      title: "Los 45°: la mitad de un cuadrado",
      blocks: [
        { kind: "text", text: "Los ángulos de $30°$, $45°$ y $60°$ aparecen constantemente en geometría. Sus razones son **exactas**, con radicales." },
        { kind: "example", lines: [{ math: "h = \\sqrt{1^2 + 1^2} = \\sqrt2" }, { math: "\\operatorname{sen} 45° = \\cos 45° = \\dfrac{1}{\\sqrt2} = \\dfrac{\\sqrt2}{2}, \\quad \\operatorname{tg} 45° = 1" }] },
      ],
      visual: { kind: "anim", scene: "trig-notables", params: { a: 45 } },
    },
    {
      id: "check-45",
      type: "predict",
      mode: "choice",
      help: [{ label: "Catetos iguales", message: "Con los catetos iguales, el cociente opuesto/contiguo vale $1$." }],
      title: "La tangente de 45°",
      question: "¿Cuánto vale $\\operatorname{tg} 45°$?",
      choices: [
        { id: "a", label: "$1$" },
        { id: "b", label: "$\\dfrac{\\sqrt2}{2}$", incorrectFeedback: "Ese es el seno (y el coseno) de $45°$. La tangente es opuesto/contiguo y ambos catetos valen lo mismo." },
        { id: "c", label: "$\\sqrt2$", incorrectFeedback: "$\\sqrt2$ es la hipotenusa del triángulo de lado $1$, no una tangente." },
        { id: "d", label: "$\\dfrac12$", incorrectFeedback: "Eso es el seno de $30°$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Los dos catetos miden $1$: $\\operatorname{tg} 45° = 1/1 = 1$.",
    },
    {
      id: "treinta-sesenta",
      type: "slide",
      help: [
        { label: "Misma figura", message: "El triángulo de $30°$–$60°$ es el mismo: lo que es opuesto para $30°$ es contiguo para $60°$." },
      ],
      title: "30° y 60°: la mitad de un triángulo equilátero",
      blocks: [
        { kind: "text", text: "Se parte un triángulo equilátero de lado $1$ por su altura. Salen un cateto de $\\frac12$, otro de $\\frac{\\sqrt3}{2}$ y la hipotenusa de $1$." },
        { kind: "example", lines: [{ math: "\\operatorname{sen} 30° = \\tfrac12,\\quad \\cos 30° = \\tfrac{\\sqrt3}{2},\\quad \\operatorname{tg} 30° = \\tfrac{\\sqrt3}{3}" }, { math: "\\operatorname{sen} 60° = \\tfrac{\\sqrt3}{2},\\quad \\cos 60° = \\tfrac12,\\quad \\operatorname{tg} 60° = \\sqrt3" }] },
      ],
      visual: { kind: "anim", scene: "trig-notables", params: { a: 30 } },
    },
    {
      id: "tabla",
      type: "slide",
      help: [{ label: "Truco", message: "El seno crece de $\\frac12$ a $\\frac{\\sqrt2}{2}$ a $\\frac{\\sqrt3}{2}$ al pasar de $30°$ a $45°$ y $60°$; el coseno hace justo lo contrario." }],
      title: "La tabla que conviene recordar",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "30°:\\ \\ \\tfrac12\\ ;\\ \\tfrac{\\sqrt3}{2}\\ ;\\ \\tfrac{\\sqrt3}{3}", label: "sen ; cos ; tg" },
            { tex: "45°:\\ \\ \\tfrac{\\sqrt2}{2}\\ ;\\ \\tfrac{\\sqrt2}{2}\\ ;\\ 1", label: "sen ; cos ; tg" },
            { tex: "60°:\\ \\ \\tfrac{\\sqrt3}{2}\\ ;\\ \\tfrac12\\ ;\\ \\sqrt3", label: "sen ; cos ; tg" },
          ],
        },
        { kind: "warning", text: "En operaciones con estos valores, trabaja con los **radicales**, no con decimales: así el resultado queda exacto." },
      ],
    },
    {
      id: "check-cociente",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Divide", message: "$\\dfrac{\\sqrt3}{\\sqrt3/3} = 3$." }],
      title: "Una relación entre tangentes",
      question: "¿Cuánto vale $\\dfrac{\\operatorname{tg} 60°}{\\operatorname{tg} 30°}$? (solo el número)",
      correctAnswers: ["3"],
      explanation: "$\\operatorname{tg} 60° = \\sqrt3$ y $\\operatorname{tg} 30° = \\dfrac{\\sqrt3}{3}$, así que el cociente es $\\sqrt3 \\cdot \\dfrac{3}{\\sqrt3} = 3$.",
    },
    {
      id: "check-escalera",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Seno de 60°", message: "El brazo es la hipotenusa y la altura, el cateto opuesto a $60°$: $\\operatorname{sen} 60° = \\dfrac{2}{L}$." }],
      title: "Escalera de tijera",
      question: "Una escalera de tijera tiene brazos iguales que, abiertos, forman $60°$ **con el suelo**. Para que alcance $2$ m de altura, ¿qué longitud debe tener cada brazo? (en metros, redondea a las centésimas)",
      correctAnswers: ["2,31", "2.31"],
      explanation: "$\\operatorname{sen} 60° = \\dfrac{2}{L} \\Rightarrow L = \\dfrac{2}{\\sqrt3/2} = \\dfrac{4}{\\sqrt3} \\approx 2{,}31$ m.",
    },
  ],
};
