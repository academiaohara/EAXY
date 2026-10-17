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
      type: "narrate",
      title: "Base y exponente",
      definitionBox:
        'Una <mark>potencia</mark> es una forma abreviada de multiplicar el mismo número varias veces. El factor repetido es la <mark>base</mark> y cuántas veces se repite, el <mark class="suma">exponente</mark>.',
      module: "potencias",
      scene: "base-exponente",
      potencias: { scene: "base-exponente", base: 6, exponent: 4 },
    },
    {
      id: "cuadrado-cubo",
      type: "narrate",
      title: "Cuadrado y cubo",
      definitionBox:
        "El **cuadrado** es exponente $2$ (área de un cuadrado). El **cubo** es exponente $3$ (volumen de un cubo).",
      module: "potencias",
      scene: "cuadrado-cubo",
      potencias: { scene: "cuadrado-cubo", base: 6 },
    },
    {
      id: "calcular-potencia",
      type: "narrate",
      title: "Calcular una potencia",
      definitionBox:
        "Salvo casos sencillos, las potencias dan números grandes; conviene ir agrupando multiplicaciones paso a paso.",
      module: "potencias",
      scene: "calcular-potencia",
      potencias: { scene: "calcular-potencia", base: 8, exponent: 5 },
    },
    {
      id: "calculadora-potencia",
      type: "narrate",
      title: "Potencias en la calculadora",
      definitionBox:
        'En la calculadora científica usa la tecla de <mark>potencia</mark> ($x^y$): base, exponente y $=$.',
      module: "potencias",
      scene: "calculadora",
      potencias: { scene: "calculadora", base: 8, exponent: 5 },
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
