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
      title: "Multiplicar",
      definitionBox:
        "**Multiplicar** es una forma abreviada de **sumar varias veces el mismo número**.",
      module: "mul-div-naturales",
      scene: "multiplicar-repetido",
      mulDiv: { scene: "multiplicar-repetido", a: 8, b: 5 },
    },
    {
      id: "multiplicar-sexta-predict",
      type: "predict",
      title: "Multiplicar",
      question: "Ahora con $6$ entradas, ¿cuánto cuestan?",
      mode: "choice",
      choices: [
        { id: "40", label: "$40$ €" },
        { id: "48", label: "$48$ €" },
        { id: "56", label: "$56$ €" },
      ],
      correctChoiceId: "48",
      module: "mul-div-naturales",
      scene: "multiplicar-sexta-entrada",
      mulDiv: { scene: "multiplicar-sexta-entrada", a: 8, b: 5, c: 6 },
      explanation: "$8 \\cdot 6 = 8 \\cdot 5 + 8 = 48$ €.",
    },
    {
      id: "conmutativa-reveal",
      type: "reveal",
      title: "Conmutativa",
      definitionBox:
        "El **producto no varía** al cambiar el orden de los factores: $a \\cdot b = b \\cdot a$.",
      module: "mul-div-naturales",
      scene: "conmutativa-producto",
      mulDiv: { scene: "conmutativa-producto", a: 3, b: 5 },
    },
    {
      id: "asociativa-descubrir",
      type: "reveal",
      title: "Asociativa",
      definitionBox:
        "¿Cuántos **huevos** hay? Agrupa $8$, $5$ y $2$ como prefieras: $(a \\cdot b) \\cdot c = a \\cdot (b \\cdot c)$.",
      module: "mul-div-naturales",
      scene: "asociativa-huevos",
      mulDiv: { scene: "asociativa-huevos", a: 8, b: 5, c: 2 },
    },
    {
      id: "asociativa-truco-narrate",
      type: "narrate",
      title: "Un truco para calcular",
      definitionBox:
        "La asociativa no es solo teoría: te ayuda a **calcular más rápido** en la cabeza.",
      module: "mul-div-naturales",
      scene: "asociativa-truco",
      mulDiv: { scene: "asociativa-truco", a: 25, b: 7, c: 4 },
    },
    {
      id: "asociativa-practice-predict",
      type: "predict",
      title: "Elige la agrupación",
      question: "¿Qué agrupación hace **más fácil** $5 \\cdot 9 \\cdot 2$?",
      mode: "choice",
      choices: [
        {
          id: "5-9-first",
          label: "Primero $(5 \\cdot 9) \\cdot 2$",
          incorrectFeedback:
            "Da $90$, pero $5 \\cdot 9 = 45$ cuesta más. Busca un producto intermedio redondo.",
        },
        { id: "5-2-first", label: "Primero $(5 \\cdot 2) \\cdot 9$" },
        {
          id: "9-2-first",
          label: "Primero $5 \\cdot (9 \\cdot 2)$",
          incorrectFeedback:
            "También vale $90$, pero $9 \\cdot 2 = 18$ no es tan cómodo como $5 \\cdot 2 = 10$.",
        },
      ],
      correctChoiceId: "5-2-first",
      explanation: "$(5 \\cdot 2) \\cdot 9 = 10 \\cdot 9 = 90$. Multiplicar por $10$ es más rápido.",
    },
    {
      id: "distributiva-predict",
      type: "predict",
      title: "Dos formas de calcularlo",
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
        "Multiplicar una **suma** es multiplicar **cada sumando** y volver a sumar: $8 \\cdot (5 + 2) = 8 \\cdot 5 + 8 \\cdot 2 = 56$ €.",
      module: "mul-div-naturales",
      scene: "distributiva-bloques",
      mulDiv: { scene: "distributiva-bloques", a: 8, b: 5, c: 2 },
    },
    {
      id: "distributiva-equivalencia",
      type: "predict",
      title: "Reparte el factor",
      question: "¿Qué expresión tiene el mismo valor que $6 \\cdot (4 + 3)$?",
      mode: "choice",
      shuffleChoices: true,
      hintHiddenUntilRequested: true,
      hint: "El número de fuera multiplica a **cada sumando** del paréntesis.",
      choices: [
        {
          id: "distribuye-ambos",
          label: "$6 \\cdot 4 + 6 \\cdot 3$",
        },
        {
          id: "solo-primero",
          label: "$6 \\cdot 4 + 3$",
          incorrectFeedback:
            "El $6$ tiene que multiplicar a los dos sumandos, no solo al primero. Aquí vale $24 + 3 = 27$, y $6 \\cdot 7 = 42$.",
        },
        {
          id: "factores-cruzados",
          label: "$6 \\cdot 4 + 4 \\cdot 3$",
          incorrectFeedback:
            "Cada sumando se multiplica por el mismo número de fuera: el $6$. Aquí vale $24 + 12 = 36$, y no $42$.",
        },
      ],
      correctChoiceId: "distribuye-ambos",
      explanation:
        "Correcto. $6 \\cdot (4 + 3) = 6 \\cdot 7 = 42$ y $6 \\cdot 4 + 6 \\cdot 3 = 24 + 18 = 42$. Salen igual.",
    },
    {
      id: "multiplicacion-mano-narrate",
      type: "narrate",
      title: "Multiplicar a mano",
      definitionBox:
        "Con **varias cifras**, multiplica por cada cifra del segundo factor y **suma** las filas (desplazando cuando corresponda).",
      module: "mul-div-naturales",
      scene: "multiplicacion-mano",
      mulDiv: { scene: "multiplicacion-mano", a: 34, b: 12 },
    },
    {
      id: "dividir-explore",
      type: "explore",
      title: "Reparte tú",
      optional: true,
      question: "Reparte 60 bombones en 4 cajas **iguales** hasta vaciar el montón.",
      module: "mul-div-naturales",
      scene: "reparto-manual",
      mulDiv: { scene: "reparto-manual", total: 60, boxes: 4, perBox: 15 },
      goal: { kind: "boxes-equal", total: 60, boxes: 4, perBox: 15 },
      suppressTutorBubble: true,
      hint: "Reparte de forma que todas las cajas queden iguales.",
      explanation: "$60 : 4 = 15$. Comprobación: $4 \\cdot 15 = 60$.",
    },
    {
      id: "dividir-narrate",
      type: "narrate",
      title: "Dividir",
      definitionBox:
        "**Dividir** reparte un total en partes iguales; es el camino de vuelta de **multiplicar**.",
      module: "mul-div-naturales",
      scene: "reparto-igual",
      mulDiv: { scene: "reparto-igual", dividend: 150, divisor: 6 },
    },
    {
      id: "division-mano-narrate",
      type: "narrate",
      title: "Dividir a mano",
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
        "Si no sobra nada, la división es **exacta**. Si quedan bombones sueltos, es **con resto**: total = cajas · cada caja + sobrantes, y **el resto es menor que el divisor**.",
      module: "mul-div-naturales",
      scene: "exacta-entera",
      mulDiv: { scene: "exacta-entera" },
    },
    {
      id: "tipos-predict-exacta",
      type: "predict",
      title: "Práctica",
      question:
        "48 bombones se reparten en cajas de 6. ¿Cuántas cajas llenas y cuántos sobran?",
      mode: "choice",
      shuffleChoices: true,
      choices: [
        { id: "8-0", label: "8 cajas, sobran 0" },
        {
          id: "7-6",
          label: "7 cajas, sobran 6",
          incorrectFeedback: "Mira el dibujo: si sobran 6 y cada caja lleva 6, cabe otra caja.",
        },
        {
          id: "9-0",
          label: "9 cajas, sobran 0",
          incorrectFeedback: "9 · 6 = 54; son demasiadas cajas para 48 bombones.",
        },
      ],
      correctChoiceId: "8-0",
      explanation: "48 = 6 · 8. División exacta: cociente 8, resto 0.",
      module: "mul-div-naturales",
      scene: "cociente-resto-feedback",
      mulDiv: { scene: "cociente-resto-feedback", dividend: 48, divisor: 6, practiceVariant: "divide" },
    },
    {
      id: "tipos-predict-resto",
      type: "predict",
      title: "Práctica",
      question:
        "47 bombones se reparten en cajas de 6. ¿Cuántas cajas llenas y cuántos sobran?",
      mode: "choice",
      shuffleChoices: true,
      choices: [
        { id: "7-5", label: "7 cajas, sobran 5" },
        {
          id: "6-11",
          label: "6 cajas, sobran 11",
          incorrectFeedback: "Las cuentas pueden cuadrar, pero el resto no puede ser mayor que 6.",
        },
        {
          id: "8-1",
          label: "8 cajas, sobran 1",
          incorrectFeedback: "Comprueba: 8 · 6 + 1 no da 47.",
        },
      ],
      correctChoiceId: "7-5",
      explanation: "47 = 6 · 7 + 5. Cociente 7, resto 5.",
      module: "mul-div-naturales",
      scene: "cociente-resto-feedback",
      mulDiv: { scene: "cociente-resto-feedback", dividend: 47, divisor: 6, practiceVariant: "divide" },
    },
    {
      id: "tipos-predict-inversa",
      type: "predict",
      title: "Práctica",
      question:
        "Hay 5 cajas con 8 bombones en cada una y sobran 3 sueltos. ¿Cuántos bombones había en total?",
      mode: "choice",
      shuffleChoices: true,
      choices: [
        { id: "43", label: "43 bombones" },
        {
          id: "40",
          label: "40 bombones",
          incorrectFeedback: "No olvides los 3 bombones sueltos.",
        },
        {
          id: "46",
          label: "46 bombones",
          incorrectFeedback: "5 · 8 + 3 no es 46; comprueba la suma.",
        },
      ],
      correctChoiceId: "43",
      explanation: "5 · 8 + 3 = 43 bombones.",
      module: "mul-div-naturales",
      scene: "cociente-resto-feedback",
      mulDiv: {
        scene: "cociente-resto-feedback",
        total: 43,
        boxes: 5,
        perBox: 8,
        practiceVariant: "inverse",
      },
    },
    {
      id: "mul-div-cierre",
      type: "narrate",
      title: "Lo que has aprendido",
      module: "mul-div-naturales",
      scene: "mul-div-cierre",
      mulDiv: { scene: "mul-div-cierre" },
    },
  ],
};
