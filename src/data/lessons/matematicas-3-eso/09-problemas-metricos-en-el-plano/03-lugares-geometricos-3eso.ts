import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_9_SUBTITLE } from "@/data/lessons/shared";

export const lugaresGeometricos3esoLesson: InteractiveLesson = {
  slug: "lugares-geometricos-3eso",
  title: "3. Lugares geométricos: mediatriz, bisectriz y circunferencia",
  subtitle: TEMA_3ESO_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "concepto",
      type: "slide",
      help: [
        {
          label: "Una propiedad",
          message: "Un lugar geométrico es el conjunto de **todos** los puntos que cumplen una propiedad, y **solo** esos.",
        },
        {
          label: "Un ejemplo",
          message: "Los puntos que están a $5$ cm de un punto $O$ forman una circunferencia de radio $5$.",
        },
      ],
      title: "Qué es un lugar geométrico",
      blocks: [
        {
          kind: "definition",
          text: "Un **lugar geométrico** es el conjunto de los puntos que cumplen una cierta propiedad (y solo esos).",
        },
        {
          kind: "example",
          title: "Circunferencia",
          lines: [
            { math: "\\text{Los puntos } P \\text{ con } OP = r \\text{ forman la circunferencia de centro } O \\text{ y radio } r" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "mediatriz",
      type: "slide",
      help: [
        {
          label: "Equidistar",
          message: "Equidistar es estar a la misma distancia: $PA = PB$.",
        },
        {
          label: "Los únicos",
          message: "Un punto fuera de la mediatriz está más cerca de un extremo que del otro.",
        },
      ],
      title: "Mediatriz de un segmento",
      blocks: [
        {
          kind: "rule",
          text: "La **mediatriz** de un segmento $AB$ es la recta perpendicular a él por su punto medio. Es el **lugar geométrico** de los puntos que **equidistan** de $A$ y de $B$.",
          formula: "PA = PB",
        },
      ],
      visual: { kind: "tool", tool: "punto-mediatriz", params: { a: 0, b: 3 }, hint: "Mueve el punto $P$: solo en la mediatriz se cumple $PA = PB$." },
    },
    {
      id: "bisectriz",
      type: "slide",
      help: [
        {
          label: "Distancia a una recta",
          message: "La distancia de un punto a una recta es la del segmento perpendicular a la recta.",
        },
        {
          label: "Dos mitades",
          message: "La bisectriz divide el ángulo en dos ángulos iguales.",
        },
      ],
      title: "Bisectriz de un ángulo",
      blocks: [
        {
          kind: "rule",
          text: "La **bisectriz** de un ángulo es el **lugar geométrico** de los puntos que equidistan de sus lados.",
          formula: "\\text{dist}(P, r) = \\text{dist}(P, s)",
        },
      ],
      visual: { kind: "tool", tool: "bisectriz-explorador", params: { a: 60, b: 4 }, hint: "Cambia la amplitud y la posición de $P$: las distancias a los lados siguen siendo iguales." },
    },
    {
      id: "check-mediatriz",
      type: "predict",
      help: [
        {
          label: "Equidistancia",
          message: "Un punto de la mediatriz está a igual distancia de los dos extremos del segmento.",
        },
      ],
      title: "Mediatriz",
      question: "Un punto $P$ está en la mediatriz del segmento $AB$ y $PA = 7$ cm. ¿Cuánto vale $PB$?",
      mode: "choice",
      choices: [
        { id: "7", label: "$7$ cm" },
        { id: "14", label: "$14$ cm", incorrectFeedback: "No es el doble: equidistar significa que ambas distancias son iguales." },
        { id: "no", label: "No se puede saber", incorrectFeedback: "La propiedad de la mediatriz lo determina." },
      ],
      correctChoiceId: "7",
      shuffleChoices: true,
      explanation: "Los puntos de la mediatriz equidistan de $A$ y de $B$: $PB = PA = 7$ cm.",
    },
    {
      id: "check-paralelas",
      type: "predict",
      help: [
        {
          label: "A mitad de camino",
          message: "Piensa en una recta que quede justo en medio de las dos paralelas.",
        },
      ],
      title: "Entre dos paralelas",
      question: "¿Cuál es el lugar geométrico de los puntos que equidistan de dos rectas paralelas $r$ y $s$?",
      mode: "choice",
      choices: [
        { id: "par", label: "Otra recta paralela a ambas, a mitad de camino" },
        { id: "per", label: "Una recta perpendicular a las dos", incorrectFeedback: "Una perpendicular tiene puntos mucho más cerca de una que de otra." },
        { id: "circ", label: "Una circunferencia", incorrectFeedback: "Los puntos que equidistan forman una recta." },
      ],
      correctChoiceId: "par",
      shuffleChoices: true,
      explanation: "Es la paralela media: todos sus puntos están a la misma distancia de $r$ y de $s$.",
    },
    {
      id: "check-circunferencia",
      type: "fill_in_blank",
      help: [
        {
          label: "Un punto fijo",
          message: "La distancia al punto fijo es siempre la misma: el radio.",
        },
      ],
      title: "Circunferencia",
      question: "El lugar geométrico de los puntos cuya distancia a un punto fijo $C$ es $8$ cm es una circunferencia. ¿Cuánto mide su diámetro? (solo el número, en cm)",
      correctAnswers: ["16"],
      explanation: "El radio es $8$ cm, luego el diámetro mide $16$ cm.",
    },
  ],
};
