import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1_SUBTITLE } from "@/data/lessons/shared";

export const multiplicacionDivisionNaturalesLesson: InteractiveLesson = {
  slug: "multiplicacion-division-naturales",
  title: "4. Multiplicación y división",
  subtitle: TEMA_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "multiplicar-narrate",
      type: "narrate",
      title:
        'Multiplicar es <span class="lesson-step-title-accent">repetir grupos</span>',
      definitionBox:
        '<mark>Multiplicar</mark> es una forma abreviada de <mark class="suma">sumar varias veces el mismo número</mark>.',
      module: "mul-div-naturales",
      scene: "multiplicar-repetido",
      mulDiv: { scene: "multiplicar-repetido", a: 8, b: 5 },
    },
    {
      id: "conmutativa-reveal",
      type: "reveal",
      title: "El orden de los factores",
      definitionBox:
        "El **producto no varía** al cambiar el orden de los factores: $a \\cdot b = b \\cdot a$.",
      module: "mul-div-naturales",
      scene: "conmutativa-producto",
      mulDiv: { scene: "conmutativa-producto", a: 3, b: 5 },
    },
    {
      id: "distributiva-predict",
      type: "predict",
      title: "La distributiva separa un grupo",
      question:
        "Para calcular el precio de $8$ menús de $5$ € y $2$ € de bebida, ¿qué expresión muestra la distributiva?",
      mode: "choice",
      choices: [
        {
          id: "solo-bocadillos",
          label: "$8 \\cdot 5$",
          incorrectFeedback: "Esa expresión deja fuera los $2$ € de bebida.",
        },
        { id: "desarrollada", label: "$8 \\cdot 5 + 8 \\cdot 2$" },
        {
          id: "sin-repartir",
          label: "$8 \\cdot (5 + 2)$",
          incorrectFeedback:
            "Es una expresión equivalente, pero aquí buscamos la forma desarrollada que enseña cómo se reparte el factor.",
        },
      ],
      correctChoiceId: "desarrollada",
      hintHiddenUntilRequested: true,
      hint: "En la forma desarrollada, el 8 multiplica por separado al bocadillo y a la bebida.",
      explanation:
        "La forma desarrollada es $8 \\cdot 5 + 8 \\cdot 2$. Es equivalente a $8 \\cdot (5 + 2)$ y muestra que el factor se reparte.",
      module: "mul-div-naturales",
      scene: "distributiva-bloques",
      mulDiv: { scene: "distributiva-bloques", a: 8, b: 5, c: 2 },
    },
    {
      id: "dividir-narrate",
      type: "narrate",
      title: "Dividir es repartir",
      definitionBox:
        "**Dividir** reparte un total en partes iguales; es el camino de vuelta de **multiplicar**.",
      module: "mul-div-naturales",
      scene: "reparto-igual",
      mulDiv: { scene: "reparto-igual", dividend: 150, divisor: 6 },
    },
    {
      id: "division-mano-narrate",
      type: "narrate",
      title: "La división escrita",
      definitionBox:
        "En la división **cifra a cifra**: escribe el cociente, multiplica, resta y **baja** la siguiente cifra del dividendo.",
      module: "mul-div-naturales",
      scene: "division-mano",
      mulDiv: { scene: "division-mano", dividend: 156, divisor: 6 },
    },
    {
      id: "tipos-narrate",
      type: "narrate",
      title: "Cuando sobra algo",
      definitionBox:
        "Si no sobra nada, la división es **exacta**. Si quedan elementos sueltos, es **con resto**: total = divisor · cociente + resto, y **el resto es menor que el divisor**.",
      module: "mul-div-naturales",
      scene: "exacta-entera",
      mulDiv: { scene: "exacta-entera" },
    },
  ],
};
