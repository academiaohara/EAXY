import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_8_SUBTITLE } from "@/data/lessons/shared";

/** Todo el LaTeX lleva DOBLE barra (`\\sqrt`). */
export const teoremaPitagoras2esoLesson: InteractiveLesson = {
  slug: "teorema-pitagoras-2eso",
  title: "1. Teorema de Pitágoras",
  subtitle: TEMA_2ESO_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "lados",
      type: "slide",
      help: [
        {
          label: "Cómo distinguirlos",
          message: "La hipotenusa es siempre el lado **opuesto al ángulo recto**, y es el más largo. Los catetos son los dos que forman el ángulo recto.",
        },
        {
          label: "Un triángulo rectángulo",
          message: "Es el que tiene un ángulo de $90^\\circ$. Los otros dos ángulos son agudos y suman $90^\\circ$.",
        },
      ],
      title: "Catetos e hipotenusa",
      blocks: [
        {
          kind: "definition",
          text: "En un **triángulo rectángulo**, los lados que forman el ángulo recto se llaman **catetos**. El lado mayor, opuesto al ángulo recto, es la **hipotenusa**.",
        },
        {
          kind: "text",
          text: "El teorema de Pitágoras relaciona las áreas de los cuadrados construidos sobre los tres lados.",
        },
      ],
      visual: { kind: "anim", scene: "pitagoras-cuadrados", params: { a: 3, b: 4 } },
    },
    {
      id: "teorema",
      type: "slide",
      help: [
        {
          label: "No es solo una fórmula",
          message: "Habla de áreas: si recortas los cuadrados de los catetos, su material cubre exactamente el cuadrado de la hipotenusa.",
        },
        {
          label: "Solo vale con ángulo recto",
          message: "En un triángulo que no es rectángulo, $a^2 + b^2$ no coincide con el cuadrado del tercer lado.",
        },
      ],
      title: "El teorema",
      blocks: [
        {
          kind: "rule",
          title: "Teorema de Pitágoras",
          text: "En un triángulo rectángulo, el **cuadrado de la hipotenusa** es igual a la **suma de los cuadrados de los catetos**.",
          formula: "a^2 = b^2 + c^2",
        },
        {
          kind: "example",
          lines: [
            { math: "3^2 + 4^2 = 9 + 16 = 25 = 5^2", note: "catetos $3$ y $4$, hipotenusa $5$" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "hipotenusa",
      type: "slide",
      help: [
        {
          label: "Suma y raíz",
          message: "Eleva cada cateto al cuadrado, suma y calcula la raíz cuadrada: es la operación inversa del cuadrado.",
        },
        {
          label: "Aproxima",
          message: "$\\sqrt{9{,}01} = 3{,}002\\dots$ Para una cuerda no hace falta tanta precisión: $3$ m.",
        },
      ],
      title: "Calcular la hipotenusa",
      blocks: [
        {
          kind: "rule",
          text: "Conociendo los dos catetos, la hipotenusa es la raíz de la suma de sus cuadrados.",
          formula: "a = \\sqrt{b^2 + c^2}",
        },
        {
          kind: "example",
          title: "Un poste de 1,5 m sujeto por una cuerda a 2,6 m de su base",
          lines: [
            { math: "l^2 = 1{,}5^2 + 2{,}6^2 = 2{,}25 + 6{,}76 = 9{,}01" },
            { math: "l = \\sqrt{9{,}01} = 3{,}002\\dots \\approx 3\\,\\text{m}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "cateto",
      type: "slide",
      help: [
        {
          label: "Resta, no suma",
          message: "La hipotenusa es la mayor: si conoces ese lado y un cateto, el otro cateto se obtiene **restando** los cuadrados.",
        },
        {
          label: "Un cateto siempre es menor",
          message: "El resultado debe ser menor que la hipotenusa. Si te sale mayor, has sumado en vez de restar.",
        },
      ],
      title: "Calcular un cateto",
      blocks: [
        {
          kind: "rule",
          text: "Conociendo la hipotenusa y un cateto, el otro cateto es la raíz de la **diferencia** de cuadrados.",
          formula: "c = \\sqrt{a^2 - b^2}",
        },
        {
          kind: "example",
          title: "Una cometa con 85 m de cuerda sobre una caseta a 63 m",
          lines: [
            { math: "h^2 + 63^2 = 85^2" },
            { math: "h^2 = 7\\,225 - 3\\,969 = 3\\,256" },
            { math: "h = \\sqrt{3\\,256} \\approx 57\\,\\text{m}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-hipotenusa",
      type: "fill_in_blank",
      help: [
        {
          label: "Suma de cuadrados",
          message: "$6^2 + 8^2 = 36 + 64 = 100$. ¿Qué número elevado al cuadrado da $100$?",
        },
      ],
      title: "Hipotenusa",
      question: "Los catetos de un triángulo rectángulo miden $6$ cm y $8$ cm. ¿Cuánto mide la hipotenusa en cm? (solo el número)",
      correctAnswers: ["10"],
      explanation: "$a^2 = 6^2 + 8^2 = 100 \\Rightarrow a = \\sqrt{100} = 10$ cm.",
    },
    {
      id: "check-cateto",
      type: "predict",
      help: [
        {
          label: "Resta de cuadrados",
          message: "$13^2 - 5^2 = 169 - 25 = 144$.",
        },
      ],
      title: "El otro cateto",
      question: "La hipotenusa de un triángulo rectángulo mide $13$ cm y un cateto $5$ cm. ¿Cuánto mide el otro cateto?",
      mode: "choice",
      choices: [
        { id: "12", label: "$12$ cm" },
        { id: "18", label: "$18$ cm", incorrectFeedback: "Has sumado $13 + 5$. Un cateto no puede ser mayor que la hipotenusa." },
        { id: "8", label: "$8$ cm", incorrectFeedback: "Has restado las longitudes ($13 - 5$) en vez de los cuadrados." },
        { id: "13.9", label: "$13{,}9$ cm", incorrectFeedback: "Has hecho $\\sqrt{13^2 + 5^2}$: la suma sirve para la hipotenusa, no para un cateto." },
      ],
      correctChoiceId: "12",
      shuffleChoices: true,
      explanation: "$c^2 = 13^2 - 5^2 = 169 - 25 = 144 \\Rightarrow c = 12$ cm.",
    },
    {
      id: "reciproco",
      type: "slide",
      help: [
        {
          label: "Una comprobación",
          message: "Calcula el cuadrado del lado mayor y compáralo con la suma de los cuadrados de los otros dos.",
        },
        {
          label: "Ternas pitagóricas",
          message: "Tres números naturales que cumplen $a^2 = b^2 + c^2$ forman una terna pitagórica: $3,4,5$; $5,12,13$; $6,8,10$…",
        },
      ],
      title: "¿Es rectángulo este triángulo?",
      blocks: [
        {
          kind: "text",
          text: "El teorema también funciona al revés: si los lados cumplen $a^2 = b^2 + c^2$, el triángulo es **rectángulo**.",
        },
        {
          kind: "compare",
          left: {
            title: "6, 8 y 10",
            text: "$6^2 + 8^2 = 100 = 10^2$",
            math: ["\\text{rectángulo}"],
            tone: "ok",
          },
          right: {
            title: "5, 6 y 7",
            text: "$5^2 + 6^2 = 61 \\ne 49 = 7^2$",
            math: ["\\text{no es rectángulo}"],
            tone: "warn",
          },
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-rectangulo",
      type: "classify",
      help: [
        {
          label: "El mayor al cuadrado",
          message: "Compara el cuadrado del lado mayor con la suma de los cuadrados de los otros dos.",
        },
      ],
      title: "¿Rectángulo o no?",
      question: "Clasifica los triángulos según sus lados.",
      groups: [
        { id: "si", label: "Es rectángulo", tone: "emerald" },
        { id: "no", label: "No es rectángulo", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$3,\\ 4,\\ 5$", group: "si" },
        { id: "b", text: "$5,\\ 12,\\ 13$", group: "si" },
        { id: "c", text: "$6,\\ 8,\\ 11$", group: "no" },
        { id: "d", text: "$7,\\ 9,\\ 12$", group: "no" },
        { id: "e", text: "$9,\\ 12,\\ 15$", group: "si" },
      ],
      explanation: "$5^2 + 12^2 = 169 = 13^2$ y $9^2 + 12^2 = 225 = 15^2$ cumplen el teorema. $6^2 + 8^2 = 100 \\ne 121$ y $7^2 + 9^2 = 130 \\ne 144$.",
    },
  ],
};
