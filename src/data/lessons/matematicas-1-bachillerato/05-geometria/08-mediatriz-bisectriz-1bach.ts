import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1BACH_5_SUBTITLE } from "@/data/lessons/shared";

export const mediatrizBisectriz1bachLesson: InteractiveLesson = {
  slug: "mediatriz-bisectriz-1bach",
  title: "8. Traslaciones, mediatriz y bisectriz",
  subtitle: TEMA_1BACH_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "traslacion",
      type: "slide",
      help: [{ label: "Isometría", message: "Una traslación conserva distancias y ángulos: la figura trasladada es idéntica, solo cambia de posición." }],
      title: "Traslaciones",
      blocks: [
        { kind: "definition", text: "La **traslación** de vector $\\vec{t} = (a, b)$ lleva cada punto $P(x, y)$ a $P'(x + a,\\ y + b)$." },
        { kind: "rule", title: "Recta trasladada", text: "Si $Ax + By + C = 0$ se traslada con $\\vec{t} = (a, b)$, su imagen cumple:", formula: "A\\,(x - a) + B\\,(y - b) + C = 0" },
        { kind: "example", title: "2x − y + 1 = 0 con t = (3, 1)", lines: [
          { math: "2(x - 3) - (y - 1) + 1 = 0 \\Rightarrow 2x - y - 4 = 0" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-traslacion",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "$2(x - 3) - (y - 1) + 1 = 2x - 6 - y + 1 + 1$." }],
      title: "Término independiente",
      question: "Al trasladar la recta $2x - y + 1 = 0$ con el vector $(3, 1)$ resulta $2x - y + C = 0$. ¿Cuánto vale $C$? (solo el número)",
      correctAnswers: ["-4", "−4"],
      explanation: "$2(x - 3) - (y - 1) + 1 = 2x - y - 4$: $C = -4$. La pendiente no cambia: la recta trasladada es paralela a la original.",
    },
    {
      id: "mediatriz",
      type: "slide",
      help: [{ label: "Lugar geométrico", message: "La mediatriz es el lugar geométrico de los puntos equidistantes de dos puntos. Es la perpendicular al segmento por su punto medio." }],
      title: "Mediatriz de un segmento",
      blocks: [
        { kind: "steps", items: [
          "Se halla el **punto medio** $M$ de $AB$.",
          "Se toma $\\vec{AB}$ como vector **normal**: la mediatriz es perpendicular a $AB$.",
          "Se escribe $\\vec{AB}\\cdot(\\vec{x} - M) = 0$, o bien se impone $d(X, A) = d(X, B)$.",
        ] },
        { kind: "example", title: "A(0, 0) y B(4, 2)", lines: [
          { math: "M = (2, 1),\\quad \\vec{AB} = (4, 2) \\Rightarrow 4(x - 2) + 2(y - 1) = 0 \\Rightarrow 2x + y - 5 = 0" },
        ] },
      ],
      visual: { kind: "tool", tool: "mediatriz-explorador", initial: [0, 0, 4, 2, 2, 1], hint: "Coloca T en distintos puntos: solo sobre la mediatriz las dos distancias coinciden." },
    },
    {
      id: "check-mediatriz",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Punto medio $(2, 3)$ y normal $\\vec{AB} = (2, 4)$: $2(x - 2) + 4(y - 3) = 0$." }],
      title: "Mediatriz de A(1, 1) y B(3, 5)",
      question: "¿Cuál es la mediatriz del segmento de extremos $A(1, 1)$ y $B(3, 5)$?",
      choices: [
        { id: "a", label: "$x + 2y - 8 = 0$" },
        { id: "b", label: "$2x - y - 1 = 0$", incorrectFeedback: "Esa es la recta $AB$, no su mediatriz (que es perpendicular)." },
        { id: "c", label: "$x + 2y - 4 = 0$", incorrectFeedback: "Tiene la dirección correcta pero no pasa por el punto medio $(2, 3)$: $2 + 6 - 4 \\neq 0$." },
        { id: "d", label: "$2x + y - 8 = 0$", incorrectFeedback: "No es perpendicular a $AB$ (el normal debería ser $(1, 2)$)." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$M = (2, 3)$ y $\\vec{AB} = (2, 4)$: $2(x - 2) + 4(y - 3) = 0 \\Rightarrow x + 2y - 8 = 0$.",
    },
    {
      id: "bisectriz",
      type: "slide",
      help: [{ label: "Dos bisectrices", message: "Dos rectas secantes tienen dos bisectrices, perpendiculares entre sí: una por cada par de ángulos opuestos." }],
      title: "Bisectriz de dos rectas",
      blocks: [
        { kind: "definition", text: "La **bisectriz** es el lugar geométrico de los puntos que equidistan de dos rectas. Se obtiene igualando las distancias:" },
        { kind: "formula", tex: "\\dfrac{|A_1x + B_1y + C_1|}{\\sqrt{A_1^2 + B_1^2}} = \\dfrac{|A_2x + B_2y + C_2|}{\\sqrt{A_2^2 + B_2^2}}" },
        { kind: "example", title: "Los ejes: y = 0 y x = 0", lines: [
          { math: "|y| = |x| \\Rightarrow y = x\\ \\text{ e }\\ y = -x" },
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "check-bisectriz",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Punto equidistante de las dos rectas: sus distancias son iguales." }],
      title: "¿Cuántas bisectrices?",
      question: "Dos rectas secantes tienen…",
      choices: [
        { id: "a", label: "dos bisectrices, perpendiculares entre sí" },
        { id: "b", label: "una única bisectriz", incorrectFeedback: "Hay dos: una divide el ángulo agudo y la otra el obtuso." },
        { id: "c", label: "infinitas bisectrices", incorrectFeedback: "Solo dos lugares geométricos cumplen que equidisten de ambas." },
        { id: "d", label: "ninguna si no son perpendiculares", incorrectFeedback: "Siempre existen dos bisectrices, sean como sean las rectas secantes." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Al quitar los valores absolutos de la igualdad hay dos signos posibles: dos rectas, perpendiculares entre sí.",
    },
  ],
};
