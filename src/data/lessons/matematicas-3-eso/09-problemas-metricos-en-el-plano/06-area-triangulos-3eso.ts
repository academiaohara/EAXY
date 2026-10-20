import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_3ESO_9_SUBTITLE } from "@/data/lessons/shared";

export const areaTriangulos3esoLesson: InteractiveLesson = {
  slug: "area-triangulos-3eso",
  title: "6. Área de los triángulos",
  subtitle: TEMA_3ESO_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "mitad",
      type: "slide",
      help: [
        {
          label: "Dos triángulos",
          message: "Dos triángulos iguales, uno girado, forman un paralelogramo de la misma base y altura.",
        },
        {
          label: "Altura",
          message: "La altura es perpendicular a la base (o a su prolongación); no es un lado salvo en el triángulo rectángulo.",
        },
      ],
      title: "Un triángulo es medio paralelogramo",
      blocks: [
        {
          kind: "rule",
          text: "Si a un triángulo le juntamos otro igual, se obtiene un paralelogramo. El área del triángulo es la **mitad** que la del paralelogramo.",
          formula: "A = \\dfrac{b \\cdot a}{2}",
        },
        {
          kind: "text",
          text: "El área no depende de dónde esté el vértice, mientras sean iguales la **base** y la **altura**.",
        },
      ],
      visual: { kind: "tool", tool: "triangulo-area", params: { a: 6, b: 4, c: 1 }, hint: "Mueve el vértice superior: el área no cambia." },
    },
    {
      id: "heron",
      type: "slide",
      help: [
        {
          label: "Semiperímetro",
          message: "Es la mitad del perímetro: $s = \\frac{a + b + c}{2}$.",
        },
        {
          label: "Cuándo usarla",
          message: "Cuando conoces los tres lados y no la altura, la fórmula de Herón te da el área directamente.",
        },
      ],
      title: "Área conociendo los tres lados: fórmula de Herón",
      blocks: [
        {
          kind: "rule",
          text: "Con el semiperímetro $s = \\frac{a + b + c}{2}$:",
          formula: "A = \\sqrt{s(s - a)(s - b)(s - c)}",
        },
        {
          kind: "example",
          title: "Lados 11, 13 y 20 cm",
          lines: [
            { math: "s = \\dfrac{11 + 13 + 20}{2} = 22" },
            { math: "A = \\sqrt{22 \\cdot 11 \\cdot 9 \\cdot 2} = \\sqrt{4\\,356} = 66\\ \\text{cm}^2" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "rectangulo",
      type: "slide",
      help: [
        {
          label: "Catetos",
          message: "En un triángulo rectángulo, un cateto sirve de base y el otro de altura.",
        },
        {
          label: "Pitágoras",
          message: "Si falta un cateto, calcúlalo con el teorema de Pitágoras antes de hallar el área.",
        },
      ],
      title: "Triángulo rectángulo e isósceles",
      blocks: [
        {
          kind: "example",
          title: "Rectángulo de hipotenusa 13 cm y cateto 5 cm",
          lines: [
            { math: "\\text{otro cateto} = \\sqrt{13^2 - 5^2} = 12" },
            { math: "A = \\dfrac{5 \\cdot 12}{2} = 30\\ \\text{cm}^2" },
          ],
        },
        {
          kind: "example",
          title: "Isósceles de base 10 cm y lados iguales de 13 cm",
          lines: [
            { math: "h = \\sqrt{13^2 - 5^2} = 12" },
            { math: "A = \\dfrac{10 \\cdot 12}{2} = 60\\ \\text{cm}^2" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-area",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Mitad",
          message: "$\\frac{b \\cdot a}{2}$ con $b = 14$ y $a = 9$.",
        },
      ],
      title: "Área de un triángulo",
      question: "Un triángulo tiene base $14$ cm y altura $9$ cm. ¿Cuál es su área? (solo el número, en cm²)",
      correctAnswers: ["63"],
      explanation: "$A = \\frac{14 \\cdot 9}{2} = 63$ cm².",
    },
    {
      id: "check-heron",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Semiperímetro",
          message: "$s = \\frac{10 + 17 + 21}{2} = 24$. Los factores son $24$, $14$, $7$ y $3$.",
        },
      ],
      title: "Fórmula de Herón",
      question: "Halla el área de un triángulo de lados $10$ m, $17$ m y $21$ m con la fórmula de Herón. (solo el número, en m²)",
      correctAnswers: ["84"],
      explanation: "$s = 24$ y $A = \\sqrt{24 \\cdot 14 \\cdot 7 \\cdot 3} = \\sqrt{7\\,056} = 84$ m².",
    },
    {
      id: "check-isosceles",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Altura",
          message: "La altura cae en el punto medio de la base: forma un triángulo rectángulo con hipotenusa $13$ y cateto $5$.",
        },
      ],
      title: "Triángulo isósceles",
      question: "Un triángulo isósceles tiene base $10$ cm y lados iguales de $13$ cm. ¿Cuál es su área? (solo el número, en cm²)",
      correctAnswers: ["60"],
      explanation: "$h = \\sqrt{169 - 25} = 12$ y $A = \\frac{10 \\cdot 12}{2} = 60$ cm².",
    },
  ],
};
