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
        "**Propiedad asociativa:** el resultado **no depende** de cómo agrupes los factores: $(a \\cdot b) \\cdot c = a \\cdot (b \\cdot c)$. Con $8$ estantes, $5$ cajas y $2$ huevos por caja: $(8 \\cdot 5) \\cdot 2$ cuenta primero $40$ cajas y luego $80$ huevos; $8 \\cdot (5 \\cdot 2)$ cuenta $10$ huevos por fila y luego $80$ en total.",
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
      id: "distributiva-areas",
      type: "slide",
      title: "La distributiva como atajo de cálculo",
      blocks: [
        {
          kind: "story",
          text: "Un fontanero trabaja **4 h** por la mañana y **3 h** por la tarde, a **15 €** la hora. ¿Cuánto gana en el día?",
          src: "/lesson/mul-div-naturales/fontanero.png",
          alt: "Fontanero arreglando el desagüe de un lavabo",
        },
        {
          kind: "rule",
          title: "Propiedad distributiva",
          text: "Multiplicar por una **suma** (o una **resta**) es multiplicar por cada término y sumar (o restar).",
          formula:
            "\\begin{gathered} a \\cdot (b + c) = a \\cdot b + a \\cdot c \\\\ a \\cdot (b - c) = a \\cdot b - a \\cdot c \\end{gathered}",
        },
        {
          kind: "example",
          title: "Por 9 y por 11, de cabeza",
          lines: [
            { math: "23 \\cdot 9 = 23 \\cdot (10 - 1) = 230 - 23 = 207" },
            { math: "23 \\cdot 11 = 23 \\cdot (10 + 1) = 230 + 23 = 253" },
          ],
        },
      ],
      visual: {
        kind: "anim",
        scene: "area-distributiva",
        params: { a: 15, b: 4, c: 3 },
        captions: [
          "Euros del día = **15 €/h** por **(4 h + 3 h)**. El área del rectángulo es lo que gana.",
          "Separamos la **mañana** (4 h) de la **tarde** (3 h).",
          "Mañana: $15 \\cdot 4 = 60$ €. Tarde: $15 \\cdot 3 = 45$ €.",
          "Las dos formas dan lo mismo: $15 \\cdot (4 + 3) = 15 \\cdot 4 + 15 \\cdot 3 = 105$ €.",
        ],
      },
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
      id: "dividir-dos-sentidos",
      type: "slide",
      title: "Una cuenta, dos preguntas",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Repartir",
            text: "$150$ bombones en $6$ cajas iguales. ¿Cuántos en cada caja?",
            math: ["150 : 6 = 25"],
            tone: "info",
          },
          right: {
            title: "Agrupar",
            text: "$150$ bombones en cajas de $25$. ¿Cuántas cajas se llenan?",
            math: ["150 : 25 = 6"],
            tone: "ok",
          },
        },
        {
          kind: "text",
          text: "Dividir deshace multiplicar: en los dos casos, $6 \\cdot 25 = 150$. Así **compruebas** cualquier división.",
        },
      ],
      visual: { kind: "anim", scene: "reparto-agrupar", params: { a: 150, b: 6 } },
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
    {
      id: "resto-predict",
      type: "predict",
      title: "Interpretar el resto",
      question:
        "Una excursión de $345$ personas se reparte en autobuses de $52$ plazas. Al dividir sale cociente $6$ y resto $33$. ¿Cuántos autobuses hacen falta?",
      mode: "choice",
      choices: [
        {
          id: "6",
          label: "$6$ autobuses",
          incorrectFeedback: "Con $6$ autobuses solo viajan $312$ personas; sobran $33$ en tierra.",
        },
        { id: "7", label: "$7$ autobuses" },
        {
          id: "8",
          label: "$8$ autobuses",
          incorrectFeedback: "Las $33$ personas que sobran caben en un solo autobús más.",
        },
      ],
      correctChoiceId: "7",
      explanation:
        "$345 = 52 \\cdot 6 + 33$. Los $6$ autobuses llenos no bastan: las $33$ personas del resto necesitan otro. En total, $7$.",
    },
  ],
};
