import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESO_5_SUBTITLE } from "@/data/lessons/shared";

export const expresionesSegundoGrado4esoLesson: InteractiveLesson = {
  slug: "expresiones-segundo-grado-4eso",
  title: "8. Expresiones de segundo grado",
  subtitle: TEMA_4ESO_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "simplificar",
      type: "slide",
      help: [
        {
          label: "El cuadrado de una suma",
          message: "$(x + 5)^2 = (x + 5)(x + 5) = x^2 + 10x + 25$. No es $x^2 + 25$: falta el **doble producto** $2 \\cdot x \\cdot 5$.",
        },
        {
          label: "Cuidado con el signo",
          message: "En $-2(x^2 - 2x - 3)$ el $-2$ multiplica a **todos** los términos: $-2x^2 + 4x + 6$.",
        },
      ],
      title: "Efectuar productos y reducir",
      blocks: [
        {
          kind: "steps",
          title: "Orden",
          items: [
            "Efectúa las multiplicaciones (incluidos los cuadrados).",
            "Quita paréntesis (cuidado con los signos).",
            "Reduce los términos semejantes.",
          ],
        },
        {
          kind: "warning",
          text: "$(x + 5)^2 \\neq x^2 + 25$. Hay que desarrollar: $(x + 5)(x + 5)$.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["(x+5)²", "−", "2(x+1)(x−3)"], active: [0, 2], note: "primero los productos." },
            { tokens: ["x²+10x+25", "−", "2(x²−2x−3)"], active: [2, 2], note: "$(x+1)(x-3) = x^2 - 2x - 3$." },
            { tokens: ["x²+10x+25", "−", "2x²+4x+6"], active: [0, 2], note: "el $-2$ reparte y cambia todos los signos." },
            { tokens: ["−x²+14x+31"], fresh: [0, 0], note: "reducimos los semejantes." },
          ],
        },
      },
      arrange: "text-top",
    },
    {
      id: "check-desarrollo",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Los tres términos",
          message: "$(x - 2)^2 = x^2 - 4x + 4$.",
        },
      ],
      title: "Un cuadrado",
      question: "Desarrolla $(x - 2)^2$.",
      choices: [
        { id: "a", label: "$x^2 - 4x + 4$" },
        { id: "b", label: "$x^2 + 4$", incorrectFeedback: "Se ha olvidado el doble producto: $-2 \\cdot x \\cdot 2 = -4x$." },
        { id: "c", label: "$x^2 - 4$", incorrectFeedback: "Eso es el producto $(x + 2)(x - 2)$, no el cuadrado." },
        { id: "d", label: "$x^2 - 2x + 4$", incorrectFeedback: "El doble producto es $2 \\cdot x \\cdot (-2) = -4x$, no $-2x$." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$(x - 2)(x - 2) = x^2 - 2x - 2x + 4 = x^2 - 4x + 4$.",
    },
    {
      id: "check-simplificar",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Productos",
          message: "$(x - 1)(x + 1) = x^2 - 1$ y $(x - 2)^2 = x^2 - 4x + 4$. Suma y resta $3$.",
        },
      ],
      title: "Reducir",
      question: "Simplifica $(x - 1)(x + 1) + (x - 2)^2 - 3$. ¿Cuánto vale el coeficiente de $x^2$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$x^2 - 1 + x^2 - 4x + 4 - 3 = 2x^2 - 4x$. El coeficiente de $x^2$ es $2$.",
    },
    {
      id: "check-mas-complicada",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Cada parte",
          message: "$(x + 1)^2 = x^2 + 2x + 1$; $-2x(x + 2) = -2x^2 - 4x$. Al final suma $14$.",
        },
      ],
      title: "Con paréntesis y un cuadrado",
      question: "Simplifica $(x + 1)^2 - 2x(x + 2) + 14$. El resultado es $-x^2 - 2x + k$. ¿Cuánto vale $k$? (solo el número)",
      correctAnswers: ["15"],
      explanation: "$x^2 + 2x + 1 - 2x^2 - 4x + 14 = -x^2 - 2x + 15$.",
    },
    {
      id: "denominadores",
      type: "slide",
      help: [
        {
          label: "Igual que en primer grado",
          message: "Se multiplica por el m.c.m. de los denominadores y cada denominador se simplifica. Después se desarrolla y se reduce.",
        },
      ],
      title: "Con denominadores",
      blocks: [
        {
          kind: "example",
          title: "Multiplicar por 4 y simplificar",
          lines: [
            { math: "4\\left[\\dfrac{(x - 1)^2}{2} - \\dfrac{(x + 2)(x - 2)}{4} - \\dfrac{3}{4}\\right]" },
            { math: "= 2(x - 1)^2 - (x + 2)(x - 2) - 3" },
            { math: "= 2x^2 - 4x + 2 - x^2 + 4 - 3 = x^2 - 4x + 3" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "traducir",
      type: "slide",
      help: [
        {
          label: "Un par cualquiera",
          message: "Un número par cualquiera se escribe $2x$ (con $x$ entero). El siguiente número par es $2x + 2$ (no $2x + 1$).",
        },
        {
          label: "Una letra",
          message: "Expresa todas las cantidades en función de **una sola letra**: si la suma de las dos medidas es $11$ y una es $x$, la otra es $11 - x$.",
        },
      ],
      title: "Traducir problemas a expresiones de segundo grado",
      blocks: [
        {
          kind: "example",
          lines: [
            { math: "\\text{Dos números pares consecutivos: } 2x \\text{ y } 2x + 2 \\Rightarrow \\text{producto } 4x^2 + 4x" },
            { math: "\\text{Cilindro de 15 cm de altura: } A = 2\\pi r^2 + 2\\pi r \\cdot 15 = 2\\pi r^2 + 30\\pi r" },
            { math: "\\text{Rectángulo con largo + ancho = 11: } A = x(11 - x) = 11x - x^2" },
          ],
        },
      ],
      visual: { kind: "tool", tool: "rectangulo-explorador", params: { a: 6, b: 4, c: 1 }, hint: "Activa «Perímetro fijo»: el área es x·(12 − x). ¿Cuándo es máxima?" },
    },
    {
      id: "check-pares",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Consecutivos pares",
          message: "Un par: $2x$. El siguiente par: $2x + 2$. Su producto: $2x(2x + 2) = 4x^2 + 4x$.",
        },
      ],
      title: "Dos pares consecutivos",
      question: "Expresa el producto de dos números pares consecutivos.",
      choices: [
        { id: "a", label: "$4x^2 + 4x$" },
        { id: "b", label: "$4x^2 + 2x$", incorrectFeedback: "Si el par es $2x$, el siguiente es $2x + 2$ (no $2x + 1$, que sería impar)." },
        { id: "c", label: "$2x^2 + 2x$", incorrectFeedback: "$2x \\cdot 2x = 4x^2$, no $2x^2$: el coeficiente también se eleva al cuadrado." },
        { id: "d", label: "$4x + 2$", incorrectFeedback: "Eso es la **suma** de los dos pares, no el producto." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$2x \\cdot (2x + 2) = 4x^2 + 4x$.",
    },
    {
      id: "check-hipotenusa",
      type: "predict",
      mode: "choice",
      help: [
        {
          label: "Pitágoras",
          message: "$h^2 = x^2 + (x + 5)^2 = x^2 + x^2 + 10x + 25$.",
        },
      ],
      title: "Cuadrado de la hipotenusa",
      question: "Un triángulo rectángulo tiene catetos $x$ y $x + 5$. ¿Cuánto vale el cuadrado de la hipotenusa?",
      choices: [
        { id: "a", label: "$2x^2 + 10x + 25$" },
        { id: "b", label: "$2x^2 + 25$", incorrectFeedback: "$(x + 5)^2 = x^2 + 10x + 25$: falta el doble producto $10x$." },
        { id: "c", label: "$x^2 + 10x + 25$", incorrectFeedback: "Falta sumar el $x^2$ del primer cateto." },
        { id: "d", label: "$4x + 10$", incorrectFeedback: "Eso es el doble de la suma de los catetos; Pitágoras suma sus **cuadrados**." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$x^2 + (x + 5)^2 = x^2 + x^2 + 10x + 25 = 2x^2 + 10x + 25$.",
    },
    {
      id: "check-diferencia",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "x y x + 20",
          message: "Si el menor es $x$, el mayor es $x + 20$. La suma de sus cuadrados: $x^2 + (x + 20)^2 = x^2 + x^2 + 40x + 400$.",
        },
      ],
      title: "Diferencia 20",
      question: "La diferencia de dos números es $20$. Si el menor es $x$, la suma de sus cuadrados es $2x^2 + kx + 400$. ¿Cuánto vale $k$? (solo el número)",
      correctAnswers: ["40"],
      explanation: "$x^2 + (x + 20)^2 = x^2 + x^2 + 40x + 400 = 2x^2 + 40x + 400$.",
    },
    {
      id: "check-areas",
      type: "predict",
      mode: "numeric",
      help: [
        {
          label: "Resta de áreas",
          message: "$(x + 3)^2 - x^2 = x^2 + 6x + 9 - x^2 = 6x + 9$.",
        },
      ],
      title: "Diferencia de áreas",
      question: "Dos cuadrados tienen lados $x$ y $x + 3$. Su diferencia de áreas es $kx + 9$. ¿Cuánto vale $k$? (solo el número)",
      correctAnswers: ["6"],
      explanation: "$(x + 3)^2 - x^2 = x^2 + 6x + 9 - x^2 = 6x + 9$.",
    },
  ],
};
