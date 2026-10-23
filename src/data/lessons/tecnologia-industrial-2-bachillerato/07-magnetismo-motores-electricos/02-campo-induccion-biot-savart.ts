import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_7_SUBTITLE } from "@/data/lessons/shared";

export const campoInduccionBiotSavartLesson: InteractiveLesson = {
  slug: "campo-induccion-biot-savart",
  title: "2. Inducción magnética y fuerza entre corrientes",
  subtitle: TEMA_TI2_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "hilos",
      type: "slide",
      help: [
        {
          label: "¿Por qué no hay cuadrado en la distancia?",
          message: "Porque un hilo largo no es una carga puntual: el campo se reparte en círculos alrededor de una línea y no en una esfera. Por eso depende de $1/a$.",
        },
      ],
      title: "Dos hilos con corriente se atraen o se repelen",
      blocks: [
        {
          kind: "steps",
          title: "Lo que se observa",
          items: [
            "Corrientes del **mismo sentido**: los hilos se **atraen**. De sentido contrario: se **repelen**.",
            "Al duplicar una intensidad, **se duplica la fuerza**.",
            "Al duplicar la distancia, la fuerza **se reduce a la mitad**.",
            "La fuerza es proporcional a la **longitud** del hilo y depende del medio.",
          ],
        },
        {
          kind: "rule",
          title: "Fuerza por unidad de longitud",
          formula: "\\dfrac{F}{l} = \\dfrac{\\mu_0}{2\\pi}\\,\\dfrac{I_1\\,I_2}{a}\\qquad \\mu_0 = 4\\pi\\cdot 10^{-7}\\ \\text{T·m/A}",
        },
      ],
      visual: { kind: "anim", scene: "hilos-paralelos-fuerza", beatMs: 5600 },
    },
    {
      id: "induccion",
      type: "slide",
      help: [
        {
          label: "¿Qué es el tesla?",
          message: "La unidad de inducción magnética. Es una unidad muy grande: la Tierra crea unos $0{,}5\\cdot 10^{-4}$ T en su superficie y un imán de laboratorio, unos $2{,}5$ T. También se usa el gauss: $1\\ \\text{G} = 10^{-4}$ T.",
        },
      ],
      title: "Inducción magnética de un hilo",
      blocks: [
        {
          kind: "definition",
          text: "**Inducción magnética** $\\mathbf{B}$ (o campo magnético): lo que mide la intensidad del campo. Se mide en **teslas** (T). Es un **vector**.",
        },
        {
          kind: "rule",
          title: "Ley de Biot y Savart (hilo largo)",
          formula: "B = \\dfrac{\\mu_0}{2\\pi}\\,\\dfrac{I}{a}",
          text: "$\\mathbf{B}$ es perpendicular al hilo y rodea a la corriente en círculos. Sentido: **regla de la mano derecha**.",
        },
        {
          kind: "text",
          text: "Cambia las corrientes y la distancia y comprueba cómo varían el campo y la fuerza entre dos hilos.",
        },
      ],
      visual: { kind: "tool", tool: "campo-hilo-explorador", params: { a: 20, b: 20, c: 10 } },
    },
    {
      id: "check-campo",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Fórmula", message: "$B = 2\\cdot 10^{-7}\\,I/a$ con $a = 0{,}1$ m. Pásalo a µT (1 T $= 10^6$ µT)." }],
      title: "Campo de un hilo",
      question: "¿Qué inducción crea, a $10$ cm de él, un hilo largo por el que pasan $50$ A? (en µT)",
      correctAnswers: ["100", "100 µT"],
      explanation: "$B = 2\\cdot 10^{-7}\\cdot 50/0{,}1 = 10^{-4}$ T $= 100$ µT, el doble que el campo terrestre.",
    },
    {
      id: "check-trenza",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Fórmula", message: "$F = \\dfrac{\\mu_0}{2\\pi}\\dfrac{I_1 I_2}{a}\\,l$ con $a = 1$ mm $= 0{,}001$ m." }],
      title: "Dos conductores de una trenza",
      question: "Dos conductores rectos de $1{,}5$ m, con $20$ A cada uno y una separación de $1$ mm (diámetro de un hilo de la trenza). ¿Qué fuerza actúa sobre ellos, en newtons?",
      correctAnswers: ["0,12", "0.12"],
      explanation: "$F = 2\\cdot 10^{-7}\\cdot 20\\cdot 20\\cdot 1{,}5/0{,}001 = 0{,}12$ N. Atracción si las corrientes tienen el mismo sentido.",
    },
    {
      id: "check-cortocircuito",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Pasos", message: "$a = 40$ mm $= 0{,}04$ m; $I = 10\\,000$ A; $l = 2$ m. Las dos pistas llevan la corriente en sentidos contrarios." }],
      title: "Cortocircuito en un cuadro eléctrico",
      question: "Dos pistas de cobre de $2$ m, a $40$ mm de distancia, soportan brevemente $10\\,000$ A (ida y vuelta). ¿Qué fuerza se produce, en newtons?",
      correctAnswers: ["1000", "1 000"],
      explanation: "$F = 2\\cdot 10^{-7}\\cdot 10^4\\cdot 10^4\\cdot 2/0{,}04 = 1\\,000$ N. Como las corrientes van en sentidos contrarios, es **repulsión**: por eso las pistas se refuerzan.",
    },
    {
      id: "check-distancia",
      type: "predict",
      help: [{ label: "Pista", message: "$F \\propto 1/a$, no a $1/a^2$." }],
      title: "El doble de distancia",
      question: "Si se duplica la distancia entre dos hilos paralelos con corriente, la fuerza entre ellos:",
      mode: "choice",
      choices: [
        { id: "mitad", label: "Se reduce a la mitad" },
        { id: "cuarto", label: "Se reduce a la cuarta parte", incorrectFeedback: "Eso ocurriría con una ley de $1/a^2$; aquí es $1/a$." },
        { id: "doble", label: "Se duplica", incorrectFeedback: "Al alejarse, la fuerza disminuye." },
      ],
      correctChoiceId: "mitad",
      shuffleChoices: true,
      explanation: "$F/l = \\mu_0 I_1 I_2/(2\\pi a)$ es inversamente proporcional a $a$.",
    },
    {
      id: "check-tesla",
      type: "predict",
      help: [{ label: "Pista", message: "Piensa en $F = q\\,v\\,B$." }],
      title: "Definición del tesla",
      question: "Un tesla es la inducción de un campo magnético que hace que:",
      mode: "choice",
      choices: [
        { id: "ok", label: "Una carga de 1 C que se mueve perpendicularmente al campo a 1 m/s sufra una fuerza de 1 N" },
        { id: "par", label: "Una carga de 1 C que se mueve en la dirección del campo sufra una fuerza de 1 N", incorrectFeedback: "En la dirección del campo no hay fuerza." },
        { id: "diez", label: "Una carga de 1 C perpendicular al campo a 1 m/s sufra una fuerza de 10 N", incorrectFeedback: "Esa fuerza sería $B = 10$ T." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "$1\\ \\text{T} = \\dfrac{1\\ \\text{N}}{1\\ \\text{C}\\cdot 1\\ \\text{m/s}} = \\dfrac{1\\ \\text{N}}{1\\ \\text{A}\\cdot 1\\ \\text{m}}$.",
    },
  ],
};
