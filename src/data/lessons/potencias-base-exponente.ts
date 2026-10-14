import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2_SUBTITLE } from "@/data/lessons/shared";

export const potenciasBaseExponenteLesson: InteractiveLesson = {
  slug: "potencias-base-exponente",
  title: "1. Potencias",
  subtitle: TEMA_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "potencia-definicion",
      type: "interactive_tool",
      tool: "potencias-raices",
      scene: "potencia-definicion",
      title: "Base y exponente",
      definitionBox:
        "Una **potencia** es una forma abreviada de multiplicar el mismo número varias veces. El factor repetido es la **base** y cuántas veces se repite, el **exponente**.",
      layout: "stack",
    },
    {
      id: "cuadrado-cubo",
      type: "interactive_tool",
      tool: "potencias-raices",
      scene: "cuadrado-cubo",
      title: "Cuadrado y cubo",
      definitionBox:
        "El **cuadrado** es exponente $2$ (área de un cuadrado). El **cubo** es exponente $3$ (volumen de un cubo).",
      layout: "stack",
    },
    {
      id: "calcular-potencia",
      type: "interactive_tool",
      tool: "potencias-raices",
      scene: "calcular-potencia",
      title: "Calcular una potencia",
      definitionBox:
        "Salvo casos sencillos, las potencias dan números grandes; conviene ir agrupando multiplicaciones paso a paso.",
      layout: "stack",
    },
    {
      id: "calculadora-potencia",
      type: "interactive_tool",
      tool: "potencias-raices",
      scene: "calculadora-potencia",
      title: "Potencias en la calculadora",
      definitionBox:
        "En la calculadora científica usa la tecla de **potencia** ($x^y$): base, exponente y $=$.",
      layout: "stack",
    },
    {
      id: "check-potencia",
      type: "predict",
      title: "Partes de una potencia",
      definitionBox: "En $a^n$, la base se multiplica por sí misma $n$ veces.",
      question:
        "En la potencia $7^4$, ¿qué papel tiene el número $4$?",
      mode: "choice",
      choices: [
        { id: "base", label: "Es la base (el factor que se repite)" },
        { id: "exp", label: "Es el exponente (cuántas veces se repite la base)" },
        {
          id: "resultado",
          label: "Es el resultado de la potencia",
          incorrectFeedback: "El resultado sería $7 \\cdot 7 \\cdot 7 \\cdot 7 = 2401$.",
        },
      ],
      correctChoiceId: "exp",
      hint: "Piensa en «$7$ elevado a la cuarta».",
      explanation:
        "El $7$ es la **base** y el $4$ el **exponente**: hay que multiplicar siete por sí mismo cuatro veces.",
    },
  ],
};
