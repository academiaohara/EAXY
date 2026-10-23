import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_1_SUBTITLE } from "@/data/lessons/shared";

export const durezaVickersRockwellLesson: InteractiveLesson = {
  slug: "dureza-vickers-rockwell",
  title: "14. Dureza Vickers y Rockwell",
  subtitle: TEMA_TI2_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "vickers",
      type: "slide",
      help: [
        {
          label: "¿Por qué 1,8543?",
          message: "La superficie lateral de la pirámide es $S = d^2/(2\\,\\text{sen}\\,68°)$, y $2\\,\\text{sen}\\,68° = 1{,}8543$. Por eso $HV = F/S = 1{,}8543\\,F/d^2$.",
        },
      ],
      title: "Ensayo Vickers (UNE 7-423-84)",
      blocks: [
        {
          kind: "text",
          text: "El penetrador es una **pirámide regular de base cuadrada** con caras a $136°$. Se mide la **diagonal** $d$ de la huella. Cargas de $1$ a $120$ kg; lo normal, $30$ kg.",
        },
        {
          kind: "rule",
          title: "Dureza Vickers",
          formula: "HV = \\dfrac{F}{S} = 1{,}8543\\,\\dfrac{F}{d^2}",
          text: "$F$ en kp y $d$ en mm. Se escribe, por ejemplo, **720 HV 30**: dureza 720 con $30$ kp de carga.",
        },
        {
          kind: "text",
          text: "**Ventajas** frente a Brinell: sirve para materiales duros y blandos, y para piezas de espesor de hasta $0{,}05$ mm. Se recomienda para durezas superiores a $500$ HB.",
        },
      ],
      visual: { kind: "tool", tool: "vickers-explorador", params: { a: 30, b: 0.28 } },
    },
    {
      id: "check-vickers",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Fórmula", message: "$HV = 1{,}8543\\,F/d^2$ con $F = 120$ kp y $d = 0{,}5$ mm." }],
      title: "Dureza Vickers de un acero",
      question: "Una pieza de acero, sometida a una carga de $120$ kp, deja una huella Vickers de $0{,}5$ mm de diagonal. ¿Cuál es su dureza Vickers? (redondea a la unidad)",
      correctAnswers: ["890", "890,1", "890.1", "890,06", "890.06"],
      explanation: "$HV = 1{,}8543\\cdot 120/0{,}5^2 = 222{,}5/0{,}25 \\approx 890$.",
    },
    {
      id: "check-cuando-vickers",
      type: "predict",
      help: [{ label: "Pista", message: "Piensa en las ventajas de Vickers." }],
      title: "¿Cuándo usar Vickers?",
      question: "¿En cuál de estas situaciones es más recomendable el ensayo Vickers que el Brinell?",
      mode: "choice",
      choices: [
        { id: "duro", label: "Una lámina muy delgada, o un material muy duro (más de 500 HB)" },
        { id: "grueso", label: "Una pieza gruesa de fundición blanda", incorrectFeedback: "Para materiales blandos y gruesos Brinell funciona bien." },
        { id: "rapido", label: "Cuando se necesita leer la dureza directamente en una escala sin medir la huella", incorrectFeedback: "Esa es la ventaja del ensayo Rockwell." },
      ],
      correctChoiceId: "duro",
      shuffleChoices: true,
      explanation: "La pirámide de diamante permite huellas muy pequeñas y mide con precisión desde materiales blandos hasta muy duros.",
    },
    {
      id: "rockwell",
      type: "slide",
      help: [
        {
          label: "¿Por qué no usar Brinell con aceros templados?",
          message: "Porque en los aceros templados las bolas del Brinell se deforman y el resultado no es fiable. Rockwell usa un cono de diamante.",
        },
      ],
      title: "Ensayo Rockwell (UNE 7-424-89)",
      blocks: [
        {
          kind: "text",
          text: "Se mide la **profundidad** de la huella, no su tamaño. Es muy **rápido y fácil**, aunque menos preciso. Dos penetradores:",
        },
        {
          kind: "compare",
          left: { title: "Bola — HRB", text: "Para materiales **blandos**. Precarga 10 kp, carga total $10 + 90 = 100$ kp.", math: ["HRB = 130 - e"], tone: "info" },
          right: { title: "Cono de diamante 120° — HRC", text: "Para materiales **duros**. Precarga 10 kp, carga total $10 + 140 = 150$ kp.", math: ["HRC = 100 - e"], tone: "key" },
        },
        {
          kind: "text",
          text: "Cada unidad de $e$ equivale a $0{,}002$ mm $= 2$ micras. Se resta de $100$ (o $130$) para que los materiales **más duros** den números **más altos**.",
        },
      ],
      visual: { kind: "anim", scene: "rockwell-profundidad", beatMs: 5600 },
    },
    {
      id: "explora-rockwell",
      type: "slide",
      help: [
        {
          label: "¿Por qué e es solo la parte plástica?",
          message: "Al retirar la carga adicional, el penetrador sube: se recupera la parte elástica. Lo que queda es la deformación permanente $e$, que es la que mide la dureza.",
        },
      ],
      title: "Más profundidad, menos dureza",
      blocks: [
        {
          kind: "text",
          text: "Cambia $e$ y la escala: observa cómo baja la dureza cuanto más se hunde el penetrador.",
        },
      ],
      visual: { kind: "tool", tool: "rockwell-explorador", params: { a: 40 } },
    },
    {
      id: "check-hrc",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Resta", message: "$HRC = 100 - e$." }],
      title: "Dureza Rockwell C",
      question: "Con un cono de diamante, la profundidad permanente resulta ser $0{,}08$ mm, es decir, $e = 40$ unidades de $0{,}002$ mm. ¿Cuánto vale la dureza HRC?",
      correctAnswers: ["60"],
      explanation: "$HRC = 100 - e = 100 - 40 = 60$.",
    },
    {
      id: "check-brinell-templado",
      type: "predict",
      help: [{ label: "Pista", message: "El Brinell usa una bola de acero templado." }],
      title: "El acero templado",
      question: "¿Por qué no se usa el ensayo Brinell para medir la dureza de los aceros templados?",
      mode: "choice",
      choices: [
        { id: "bolas", label: "Porque las bolas se deforman al apoyarse en un material tan duro" },
        { id: "blandos", label: "Porque el acero templado es demasiado blando", incorrectFeedback: "Es al revés: es tan duro que daña la bola." },
        { id: "pequeño", label: "Porque la huella siempre es demasiado grande", incorrectFeedback: "En un material duro la huella es pequeña; el problema es la deformación de la bola." },
      ],
      correctChoiceId: "bolas",
      shuffleChoices: true,
      explanation: "Rockwell soluciona el problema con un cono de diamante, que no se deforma.",
    },
    {
      id: "clasifica-durezas",
      type: "classify",
      help: [{ label: "Pista", message: "Brinell: bola y diámetro. Vickers: pirámide y diagonal. Rockwell: profundidad." }],
      title: "Brinell, Vickers o Rockwell",
      question: "Asigna cada característica a su ensayo.",
      groups: [
        { id: "brinell", label: "Brinell", tone: "cobalt" },
        { id: "vickers", label: "Vickers", tone: "amber" },
        { id: "rockwell", label: "Rockwell", tone: "emerald" },
      ],
      items: [
        { id: "a", text: "Bola de acero templado y huella circular", group: "brinell" },
        { id: "b", text: "Se mide el diámetro de la huella", group: "brinell" },
        { id: "c", text: "Pirámide regular con caras a 136°", group: "vickers" },
        { id: "d", text: "Se mide la diagonal de la huella", group: "vickers" },
        { id: "e", text: "Cono de diamante de 120° o bola; se lee la profundidad", group: "rockwell" },
        { id: "f", text: "Muy rápido y fácil, pero menos preciso", group: "rockwell" },
      ],
      hint: "Cada ensayo se reconoce por su penetrador y por lo que se mide.",
      explanation: "Brinell: bola y $d$. Vickers: pirámide y diagonal. Rockwell: profundidad de la huella.",
    },
  ],
};
