import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_9_SUBTITLE } from "@/data/lessons/shared";

export const teoremaPitagoras3esoLesson: InteractiveLesson = {
  slug: "teorema-pitagoras-3eso",
  title: "1. Teorema de Pitágoras",
  subtitle: TEMA_3ESO_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "enunciado",
      type: "slide",
      help: [
        {
          label: "Catetos e hipotenusa",
          message: "Los catetos son los dos lados que forman el ángulo recto; la hipotenusa es el lado opuesto a ese ángulo, y siempre el mayor.",
        },
        {
          label: "Es una igualdad de áreas",
          message: "$a^2$ es el área del cuadrado construido sobre la hipotenusa; $b^2$ y $c^2$, las de los cuadrados sobre los catetos.",
        },
      ],
      title: "Teorema de Pitágoras",
      blocks: [
        {
          kind: "rule",
          text: "En un triángulo rectángulo, el cuadrado de la **hipotenusa** es igual a la suma de los cuadrados de los **catetos**.",
          formula: "a^2 = b^2 + c^2",
        },
        {
          kind: "text",
          text: "Es una igualdad de **áreas**: el cuadrado grande tiene la misma área que los dos pequeños juntos.",
        },
      ],
      visual: { kind: "anim", scene: "pitagoras-cuadrados", params: { a: 3, b: 4 } },
    },
    {
      id: "demostracion",
      type: "slide",
      help: [
        {
          label: "Mismo lado",
          message: "Los dos cuadrados grandes tienen lado $b + c$, así que tienen la misma área.",
        },
        {
          label: "Quitar triángulos",
          message: "Si de dos figuras de igual área quitas cuatro triángulos iguales a cada una, lo que queda tiene la misma área.",
        },
      ],
      title: "Una demostración con áreas",
      blocks: [
        {
          kind: "steps",
          items: [
            "Se dibujan dos cuadrados iguales de lado $b + c$.",
            "En el primero: dos cuadrados de áreas $b^2$ y $c^2$ y cuatro triángulos $T$.",
            "En el segundo: un cuadrado de área $a^2$ y cuatro triángulos $T$.",
            "Al quitar los cuatro triángulos de cada uno, queda: $b^2 + c^2 = a^2$.",
          ],
        },
      ],
      visual: { kind: "anim", scene: "pitagoras-demostracion", params: { a: 3, b: 4 } },
    },
    {
      id: "lado-desconocido",
      type: "slide",
      help: [
        {
          label: "Hipotenusa o cateto",
          message: "Para la hipotenusa se suman los cuadrados; para un cateto, se resta al cuadrado de la hipotenusa el del otro cateto.",
        },
        {
          label: "Comprueba",
          message: "La hipotenusa siempre debe ser mayor que cada cateto: si no, algo falla.",
        },
      ],
      title: "Calcular el lado desconocido",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "a = \\sqrt{b^2 + c^2}", label: "hipotenusa" },
            { tex: "b = \\sqrt{a^2 - c^2}", label: "cateto" },
          ],
        },
        {
          kind: "example",
          title: "Catetos de 33 cm y 56 cm",
          lines: [
            { math: "a = \\sqrt{33^2 + 56^2} = \\sqrt{4\\,225} = 65\\ \\text{cm}" },
          ],
        },
        {
          kind: "example",
          title: "Hipotenusa de 97 cm y un cateto de 72 cm",
          lines: [
            { math: "b = \\sqrt{97^2 - 72^2} = \\sqrt{4\\,225} = 65\\ \\text{cm}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-hipotenusa",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Suma de cuadrados",
          message: "$16^2 = 256$ y $30^2 = 900$. Suma y haz la raíz.",
        },
      ],
      title: "Hipotenusa",
      question: "Los catetos de un triángulo rectángulo miden $16$ cm y $30$ cm. ¿Cuánto mide la hipotenusa? (solo el número, en cm)",
      correctAnswers: ["34"],
      explanation: "$\\sqrt{256 + 900} = \\sqrt{1\\,156} = 34$ cm.",
    },
    {
      id: "check-cateto",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Resta de cuadrados",
          message: "$39^2 = 1\\,521$ y $15^2 = 225$. Resta y haz la raíz.",
        },
      ],
      title: "Cateto",
      question: "La hipotenusa de un triángulo rectángulo mide $39$ cm y un cateto, $15$ cm. ¿Cuánto mide el otro cateto? (solo el número, en cm)",
      correctAnswers: ["36"],
      explanation: "$\\sqrt{1\\,521 - 225} = \\sqrt{1\\,296} = 36$ cm.",
    },
    {
      id: "check-error",
      type: "predict",
      help: [
        {
          label: "Cuál es el mayor",
          message: "La hipotenusa es el lado mayor. Si en la fórmula se suman $5^2$ y $13^2$, el resultado tiene que ser un lado mayor que $13$.",
        },
      ],
      title: "Detecta el error",
      question: "Un alumno calcula el cateto de un triángulo con hipotenusa $13$ y otro cateto $5$ con $\\sqrt{13^2 + 5^2}$. ¿Qué error ha cometido?",
      mode: "choice",
      choices: [
        { id: "a", label: "Ha sumado los cuadrados; para un cateto se resta: $\\sqrt{13^2 - 5^2} = 12$" },
        { id: "b", label: "Debía haber multiplicado los lados", incorrectFeedback: "El teorema relaciona cuadrados con una suma o una resta, no con un producto." },
        { id: "c", label: "No hay error", incorrectFeedback: "Daría $\\sqrt{194} \\approx 13{,}9$, más grande que la hipotenusa: imposible para un cateto." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Un cateto siempre es menor que la hipotenusa: $b = \\sqrt{a^2 - c^2} = \\sqrt{169 - 25} = 12$.",
    },
  ],
};
