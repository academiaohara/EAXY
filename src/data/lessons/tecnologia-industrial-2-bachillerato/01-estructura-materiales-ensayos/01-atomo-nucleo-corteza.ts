import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_1_SUBTITLE } from "@/data/lessons/shared";

export const atomoNucleoCortezaLesson: InteractiveLesson = {
  slug: "atomo-nucleo-corteza",
  title: "1. El átomo: núcleo, corteza e isótopos",
  subtitle: TEMA_TI2_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "atomo",
      type: "slide",
      help: [
        {
          label: "¿Y los orbitales?",
          message: "Para estudiar materiales basta un modelo sencillo: núcleo + corteza. El detalle de los orbitales solo hace falta para explicar los enlaces, y lo veremos más adelante.",
        },
      ],
      title: "Núcleo y corteza",
      blocks: [
        {
          kind: "definition",
          text: "**Átomo**: la unidad elemental básica que puede experimentar un cambio químico.",
        },
        {
          kind: "compare",
          left: {
            title: "Núcleo",
            text: "Carga **positiva** y casi toda la **masa**. Lo forman protones y neutrones (nucleones). Diámetro del orden de $10^{-14}$ m.",
            tone: "key",
          },
          right: {
            title: "Corteza",
            text: "Los **electrones**, de carga negativa y sin masa a efectos prácticos. El átomo entero mide del orden de $10^{-10}$ m.",
            tone: "info",
          },
        },
        {
          kind: "warning",
          title: "Los electrones no «giran en órbitas»",
          text: "Se mueven en una **zona de probabilidad** alrededor del núcleo. Un átomo sin excitar es **neutro**: la carga de los electrones iguala a la del núcleo.",
        },
      ],
      visual: { kind: "anim", scene: "atomo-isotopos" },
    },
    {
      id: "isotopos",
      type: "slide",
      help: [
        {
          label: "¿Por qué importan los isótopos?",
          message: "Las propiedades **químicas** de dos isótopos son casi idénticas (mismos electrones). Los isótonos y los isóbaros, en cambio, son elementos distintos y se comportan de forma diferente.",
        },
      ],
      title: "Isótopos, isótonos e isóbaros",
      blocks: [
        {
          kind: "text",
          text: "El **número atómico** $Z$ es el número de protones. El **número másico** es $A = Z + N$, con $N$ neutrones. Según qué número comparten, dos átomos son:",
        },
        {
          kind: "facts",
          items: [
            { tex: "\\text{Isótopos}", label: "mismo Z, distinto N · C-12 y C-14" },
            { tex: "\\text{Isótonos}", label: "mismo N, distinto Z · C-14 y O-16" },
            { tex: "\\text{Isóbaros}", label: "mismo A, distinto Z · C-14 y N-14" },
          ],
        },
      ],
      visual: { kind: "tool", tool: "isotopos-explorador", params: { a: 6, b: 8 } },
    },
    {
      id: "check-isotopos-cloro",
      type: "predict",
      help: [{ label: "Pista", message: "Compara primero los protones: si coinciden, ya sabes de qué relación se trata." }],
      title: "Dos átomos de cloro",
      question: "Un átomo tiene 17 protones y 18 neutrones; otro tiene 17 protones y 20 neutrones. Son:",
      mode: "choice",
      choices: [
        { id: "isotopos", label: "Isótopos" },
        { id: "isobaros", label: "Isóbaros", incorrectFeedback: "Los números másicos son 35 y 37: no coinciden." },
        { id: "isotonos", label: "Isótonos", incorrectFeedback: "Los neutrones son 18 y 20: no coinciden." },
      ],
      correctChoiceId: "isotopos",
      shuffleChoices: true,
      explanation: "Mismo $Z = 17$ y distinto $N$: son isótopos del cloro (Cl-35 y Cl-37).",
    },
    {
      id: "check-masico",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Suma de nucleones", message: "$A = Z + N$." }],
      title: "Número másico",
      question: "Un átomo de sodio tiene 11 protones y 12 neutrones. ¿Cuál es su número másico $A$?",
      correctAnswers: ["23"],
      explanation: "$A = Z + N = 11 + 12 = 23$: es el Na-23.",
    },
    {
      id: "clasifica-relaciones",
      type: "classify",
      help: [{ label: "Pista", message: "Pregunta siempre: ¿qué número se repite: protones, neutrones o nucleones?" }],
      title: "¿Qué relación hay?",
      question: "Clasifica cada pareja de átomos.",
      groups: [
        { id: "isotopos", label: "Isótopos", tone: "emerald" },
        { id: "isobaros", label: "Isóbaros", tone: "amber" },
        { id: "isotonos", label: "Isótonos", tone: "cobalt" },
      ],
      items: [
        { id: "a", text: "C-12 (6 p, 6 n) y C-14 (6 p, 8 n)", group: "isotopos" },
        { id: "b", text: "C-14 (6 p, 8 n) y N-14 (7 p, 7 n)", group: "isobaros" },
        { id: "c", text: "C-14 (6 p, 8 n) y O-16 (8 p, 8 n)", group: "isotonos" },
        { id: "d", text: "Cl-35 (17 p, 18 n) y Cl-37 (17 p, 20 n)", group: "isotopos" },
        { id: "e", text: "Ar-40 (18 p, 22 n) y Ca-40 (20 p, 20 n)", group: "isobaros" },
        { id: "f", text: "C-13 (6 p, 7 n) y N-14 (7 p, 7 n)", group: "isotonos" },
      ],
      hint: "Isótopos: mismos protones. Isóbaros: misma masa. Isótonos: mismos neutrones.",
      explanation: "Isótopos comparten $Z$; isóbaros, $A$; isótonos, $N$.",
    },
    {
      id: "escala",
      type: "slide",
      help: [
        {
          label: "¿Y la densidad del núcleo?",
          message: "Se ha comprobado que es aproximadamente constante. Por eso el volumen del núcleo es proporcional a su número másico: duplicar los nucleones duplica el volumen.",
        },
      ],
      title: "Un átomo es casi todo hueco",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "d_{\\text{átomo}} \\approx 10^{-10}\\ \\text{m}", label: "átomo" },
            { tex: "d_{\\text{núcleo}} \\approx 10^{-14}\\ \\text{m}", label: "núcleo" },
            { tex: "\\dfrac{10^{-10}}{10^{-14}} = 10\\,000", label: "el átomo es 10 000 veces mayor" },
          ],
        },
        {
          kind: "text",
          text: "Con una esfera de $10$ m de radio como átomo, el núcleo sería una bolita de $1$ mm. Sin embargo, **casi toda la masa** del átomo está en él.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-escala",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Proporción", message: "Si el átomo es $10\\,000$ veces mayor que el núcleo, el núcleo mide $10\\,000$ veces menos que el átomo." }],
      title: "Ampliamos el átomo",
      question: "Si ampliáramos un átomo hasta que midiera 100 m de diámetro, ¿cuántos milímetros mediría el núcleo?",
      correctAnswers: ["10"],
      explanation: "$100\\ \\text{m} / 10\\,000 = 0{,}01$ m $= 10$ mm.",
    },
    {
      id: "check-electrones",
      type: "predict",
      help: [{ label: "Pista", message: "Piensa en una «zona de probabilidad», no en una trayectoria." }],
      title: "El comportamiento de los electrones",
      question: "¿Cuál de las siguientes afirmaciones es cierta?",
      mode: "choice",
      choices: [
        { id: "zona", label: "Los electrones se encuentran en una zona de probabilidad en torno al núcleo" },
        { id: "orbitas", label: "Los electrones siguen órbitas localizadas e inalterables en torno al núcleo", incorrectFeedback: "Esa es la imagen clásica; hoy sabemos que no hay trayectorias definidas." },
        { id: "fijos", label: "Los electrones están fijos y no se mueven respecto del núcleo", incorrectFeedback: "Se mueven continuamente («vibran») alrededor del núcleo." },
      ],
      correctChoiceId: "zona",
      shuffleChoices: true,
      explanation: "Los electrones no tienen posición definida: es más probable encontrarlos donde la nube es más densa. Sus saltos entre niveles absorben o emiten energía (líneas espectrales).",
    },
  ],
};
