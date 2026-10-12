import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1_SUBTITLE } from "@/data/lessons/shared";

export const multiplicacionDivisionNaturalesLesson: InteractiveLesson = {
  slug: "multiplicacion-division-naturales",
  title: "3. Multiplicación y división",
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
        "**Propiedad conmutativa:** el **producto no varía** al cambiar el orden de los factores. Ejemplo: $8 \\cdot 5 = 5 \\cdot 8 = 40$.",
      module: "mul-div-naturales",
      scene: "conmutativa-producto",
      mulDiv: { scene: "conmutativa-producto", a: 3, b: 5 },
    },
    {
      id: "asociativa-reveal",
      type: "reveal",
      title: "Cómo agrupar los factores",
      definitionBox:
        "**Propiedad asociativa:** el resultado **no depende** de cómo agrupes los factores: $(a \\cdot b) \\cdot c = a \\cdot (b \\cdot c)$. Ejemplo: $(8 \\cdot 5) \\cdot 2 = 8 \\cdot (5 \\cdot 2) = 80$.",
      module: "mul-div-naturales",
      scene: "asociativa-huevos",
      mulDiv: { scene: "asociativa-huevos", a: 8, b: 5, c: 2 },
    },
    {
      id: "distributiva-predict",
      type: "predict",
      title: "Dos formas de calcularlo",
      definitionBox:
        "**Propiedad distributiva:** multiplicar un número por una **suma** es lo mismo que sumar los productos: $a \\cdot (b + c) = a \\cdot b + a \\cdot c$.",
      question:
        "Compras $8$ menús. Cada menú cuesta $5$ € el bocadillo y $2$ € la bebida. ¿Cuánto pagas en total?",
      mode: "choice",
      choices: [
        {
          id: "40",
          label: "$40$ €",
          incorrectFeedback: "Ese solo cuenta los bocadillos. Falta la bebida.",
        },
        { id: "56", label: "$56$ €" },
        {
          id: "80",
          label: "$80$ €",
          incorrectFeedback:
            "Has multiplicado $8 \\cdot 10$; recuerda que cada menú cuesta $5 + 2 = 7$ €.",
        },
      ],
      correctChoiceId: "56",
      hint: "Suma lo que cuesta un menú completo: bocadillo más bebida.",
      explanation:
        "Puedes pensar: cada menú cuesta $5 + 2 = 7$ €, así que $8 \\cdot 7 = 56$ €. O también: $8 \\cdot 5 = 40$ € de bocadillos y $8 \\cdot 2 = 16$ € de bebidas, $40 + 16 = 56$ €. ¡Salen igual!",
      module: "mul-div-naturales",
      scene: "distributiva-bloques",
      mulDiv: { scene: "distributiva-bloques", a: 8, b: 5, c: 2 },
    },
    {
      id: "dividir-narrate",
      type: "narrate",
      title: "Dividir es repartir",
      definitionBox:
        "**Dividir** reparte un total en partes iguales; es el camino de vuelta de **multiplicar**. Ejemplo: $150$ bombones en $6$ cajas iguales → $25$ en cada caja.",
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
      mulDiv: { scene: "division-mano", dividend: 150, divisor: 6 },
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
