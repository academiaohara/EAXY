import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_7_SUBTITLE } from "@/data/lessons/shared";

export const espiraMomentoMotorLesson: InteractiveLesson = {
  slug: "espira-momento-motor",
  title: "4. Momento sobre una espira: el principio del motor",
  subtitle: TEMA_TI2_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "espira",
      type: "slide",
      help: [
        {
          label: "¿Por qué una espira y no un hilo suelto?",
          message: "Un hilo abierto no existe en una máquina: los conductores forman circuitos cerrados. Las fuerzas sobre la espira se anulan en conjunto, pero forman un par.",
        },
      ],
      title: "Una espira en un campo",
      blocks: [
        {
          kind: "text",
          text: "En una espira rectangular de lados $a$ y $b$ por la que circula $I$, los lados opuestos reciben fuerzas **iguales y de sentido contrario**. La resultante es **nula**, pero las dos fuerzas $F_1 = I\\,a\\,B$ forman un **par** (momento).",
        },
        {
          kind: "rule",
          title: "Momento sobre la espira",
          formula: "M = I\\,S\\,B\\,\\operatorname{sen}\\varphi\\qquad \\mathbf{M} = I\\,\\mathbf{S}\\times\\mathbf{B}",
          text: "$S = a\\,b$ es la superficie y $\\varphi$ el ángulo entre el vector superficie $\\mathbf{S}$ y $\\mathbf{B}$. Con $N$ espiras: $M = N\\,I\\,S\\,B\\,\\operatorname{sen}\\varphi$.",
        },
      ],
      visual: { kind: "anim", scene: "espira-momento", beatMs: 5800 },
    },
    {
      id: "explora-espira",
      type: "slide",
      help: [
        {
          label: "¿Qué es el vector superficie?",
          message: "Un vector perpendicular a la espira cuyo módulo es el área. Su sentido es el de avance de un tornillo de rosca derecha que gira en el sentido de la corriente.",
        },
      ],
      title: "Cuándo es máximo el momento",
      blocks: [
        {
          kind: "text",
          text: "El momento hace girar la espira hasta que $\\mathbf{S}$ queda paralelo a $\\mathbf{B}$ ($\\varphi = 0$), donde $M = 0$.",
        },
      ],
      visual: { kind: "tool", tool: "espira-par-explorador", params: { a: 100, b: 2, c: 90 } },
    },
    {
      id: "check-momento",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Unidades", message: "$S = 100\\ \\text{cm}^2 = 0{,}01$ m². $M = N\\,I\\,S\\,B\\,\\operatorname{sen}\\varphi$." }],
      title: "Bobina de 100 espiras",
      question: "Una bobina de $100$ espiras de $10\\times 10$ cm, con $2$ A, está en un campo de $0{,}5$ T con $\\varphi = 90°$. ¿Qué momento recibe, en N·m?",
      correctAnswers: ["1"],
      explanation: "$M = 100\\cdot 2\\cdot 0{,}01\\cdot 0{,}5\\cdot 1 = 1$ N·m.",
    },
    {
      id: "check-30",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Seno", message: "$\\operatorname{sen}30° = 0{,}5$." }],
      title: "Cuando ha girado",
      question: "Con la misma bobina, ¿qué momento recibe cuando $\\varphi = 30°$? (en N·m)",
      correctAnswers: ["0,5", "0.5"],
      explanation: "$M = 1\\cdot\\operatorname{sen}30° = 0{,}5$ N·m. A medida que gira, el momento disminuye.",
    },
    {
      id: "check-equilibrio",
      type: "predict",
      help: [{ label: "Pista", message: "El momento es proporcional a sen φ." }],
      title: "Posición de equilibrio",
      question: "¿Cuándo se detiene una espira libre en un campo magnético uniforme?",
      mode: "choice",
      choices: [
        { id: "paralelo", label: "Cuando su vector superficie queda paralelo al campo ($\\varphi = 0$) y el momento se anula" },
        { id: "perp", label: "Cuando el vector superficie queda perpendicular al campo", incorrectFeedback: "Esa es la posición de momento máximo, no de equilibrio." },
        { id: "nunca", label: "Nunca: sigue girando", incorrectFeedback: "Una vez alcanzado el equilibrio, el mecanismo se detendría." },
      ],
      correctChoiceId: "paralelo",
      shuffleChoices: true,
      explanation: "Por eso un motor necesita varias espiras y un colector: siempre debe haber alguna con par.",
    },
    {
      id: "motor",
      type: "slide",
      help: [
        {
          label: "¿Por qué siempre un número par de polos?",
          message: "Porque los polos van por parejas norte-sur. En la figura del libro hay un par de polos; un motor puede tener varios pares.",
        },
      ],
      title: "De la espira al motor",
      blocks: [
        {
          kind: "steps",
          items: [
            "Se colocan **varias espiras** (una bobina de $N$ espiras) distribuidas en el rotor, de manera que siempre haya alguna en posición de recibir par.",
            "Un **colector** de delgas y las **escobillas** invierten la corriente en cada espira cuando pasa por el equilibrio.",
            "El momento resultante mantiene el giro: es el **principio de funcionamiento de los motores eléctricos**.",
          ],
        },
        {
          kind: "text",
          text: "Este mismo principio sirve para los instrumentos de medida (galvanómetros, voltímetros y amperímetros).",
        },
      ],
      arrange: "stack",
    },
  ],
};
