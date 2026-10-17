import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1_SUBTITLE } from "@/data/lessons/shared";

export const sistemasNumeracionNaturalesLesson: InteractiveLesson = {
  slug: "sistemas-numeracion-naturales",
  title: "1. Origen de los números y aproximación por redondeo",
  subtitle: TEMA_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "origen-contar",
      type: "slide",
      title: "Los números nacieron para contar",
      blocks: [
        {
          kind: "definition",
          text: "Un **sistema de numeración** son los **símbolos** que usa una cultura más las **reglas** para combinarlos.",
        },
        {
          kind: "story",
          text: "Primero fueron muescas en un cayado o semillas en un collar: una marca por cada cabra del rebaño. Con el comercio llegaron las cantidades grandes y contar de uno en uno dejó de ser práctico. Había que **inventar símbolos**.",
          src: "/lesson/numeracion/origen/pastor-cabras.png",
          alt: "Pastor prehistórico contando sus cabras con un cayado de muescas",
        },
        {
          kind: "example",
          title: "Un sistema de ejemplo",
          lines: [
            { math: "\\text{mano} = 5 \\qquad \\text{persona} = 20" },
            {
              math: "47 = 20 + 20 + 5 + 1 + 1",
              note: "dos personas, una mano y dos muescas",
            },
          ],
        },
      ],
      visual: {
        kind: "figure",
        src: "/lesson/numeracion/historia/primitivo.png",
        alt: "Hueso con muescas de conteo",
        caption: "Hueso con muescas: la forma más antigua de llevar la cuenta.",
      },
    },
    {
      id: "sistema-egipcio",
      type: "slide",
      title: "Egipto: un sistema aditivo",
      blocks: [
        {
          kind: "definition",
          text: "En un sistema **aditivo**, el valor del número es la **suma** de los valores de sus símbolos.",
        },
        {
          kind: "text",
          text: "Los egipcios tenían un símbolo para el $1$, otro para el $10$, el $100$, el $1\\,000$… y repetían cada uno las veces necesarias.",
        },
        {
          kind: "warning",
          title: "El precio de sumar símbolos",
          text: "Aquí solo cuenta **cuántos** símbolos hay de cada clase, no su lugar. Por eso escribir $999$ exige **27** símbolos ($9 + 9 + 9$).",
        },
      ],
      visual: { kind: "anim", scene: "egipcio-aditivo", params: { n: 1435 } },
    },
    {
      id: "sistema-romano",
      type: "slide",
      title: "Roma: sumar… y a veces restar",
      blocks: [
        {
          kind: "text",
          text: "Siete letras con valor fijo. Se **suman** de izquierda a derecha, salvo cuando una letra menor va **delante** de otra mayor: entonces se **resta**.",
        },
        {
          kind: "rule",
          title: "Solo restan I, X y C",
          text: "I delante de V o X · X delante de L o C · C delante de D o M. Ningún símbolo se repite más de **tres** veces seguidas.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\mathrm{XIV} = 10 + (5 - 1) = 14" },
            { math: "\\mathrm{XC} = 100 - 10 = 90" },
            { math: "\\mathrm{MCCLXXX} = 1000 + 200 + 50 + 30 = 1\\,280" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "romano-resta" },
    },
    {
      id: "sistemas-historia-juego",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "sistemas-historia-juego",
      title: "Escribe el mismo número de tres formas",
      definitionBox:
        "Mismo número, tres reglas: **marcas** que se cuentan, símbolos que se **suman** y letras que **suman o restan**.",
      layout: "stack",
    },
    {
      id: "decimal-canje",
      type: "slide",
      title: "El sistema decimal: base 10",
      blocks: [
        {
          kind: "text",
          text: "Nació en la India (siglo VII) y llegó a Europa por medio de los árabes. Usa **solo diez cifras**:",
        },
        {
          kind: "facts",
          items: Array.from({ length: 10 }, (_, d) => ({ tex: String(d) })),
        },
        {
          kind: "rule",
          title: "La regla que lo sostiene",
          text: "**Diez unidades** de un orden forman **una unidad** del orden siguiente: 10 unidades = 1 decena, 10 decenas = 1 centena…",
        },
        {
          kind: "text",
          text: "Con tan pocas cifras se escribe cualquier cantidad porque cada cifra **cambia de valor según el lugar** que ocupa.",
        },
      ],
      visual: { kind: "anim", scene: "decimal-canje" },
    },
    {
      id: "decimal-posicion",
      type: "slide",
      title: "Sistema posicional: el valor lo da el lugar",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Aditivo (romano)",
            text: "Cada símbolo **siempre** vale lo mismo.",
            math: ["\\mathrm{XXX} = 10 + 10 + 10"],
            tone: "info",
          },
          right: {
            title: "Posicional (decimal)",
            text: "Cada cifra vale según su **posición**.",
            math: ["333 = 300 + 30 + 3"],
            tone: "ok",
          },
        },
        {
          kind: "text",
          text: "En $35\\,318$, un $3$ vale $30\\,000$ y el otro, solo $300$.",
        },
        {
          kind: "rule",
          title: "La importancia del 0",
          text: "El **0** es lo que hace posible el sistema posicional: ocupa los órdenes **vacíos** y mantiene cada cifra en su sitio. Sin él, $305$, $35$ y $3\\,050$ se escribirían igual: $35$.",
        },
      ],
      visual: { kind: "anim", scene: "decimal-posicion", params: { n: 35_318, a: 4, b: 2 } },
    },
    {
      id: "check-millares",
      type: "predict",
      title: "Cambiar de orden",
      question:
        "Una papelería tiene $40$ paquetes de $100$ folios. Si los reagrupa en cajas de $1\\,000$ folios, ¿cuántas cajas completa?",
      mode: "choice",
      choices: [
        { id: "4", label: "$4$ cajas" },
        {
          id: "40",
          label: "$40$ cajas",
          incorrectFeedback:
            "Cada caja de $1\\,000$ folios lleva $10$ paquetes de $100$, no uno solo.",
        },
        {
          id: "400",
          label: "$400$ cajas",
          incorrectFeedback:
            "Hay $4\\,000$ folios en total; entre $1\\,000$ por caja salen muchas menos cajas.",
        },
      ],
      correctChoiceId: "4",
      explanation:
        "$40$ centenas son $4\\,000$ unidades, y $4\\,000$ entre $1\\,000$ son $4$ millares. Diez centenas hacen un millar.",
    },
    {
      id: "redondeo-regla",
      type: "slide",
      title: "Redondear: ganar claridad, perder precisión",
      blocks: [
        {
          kind: "story",
          text: "Nadie dice «la casa cuesta doscientos sesenta y ocho mil doscientos cincuenta y un euros». Se dice **270\u00a0000\u00a0€**: un número más manejable, terminado en ceros.",
          src: "/lesson/numeracion/origen/casa-en-venta.png",
          alt: "Casa con un cartel de «se vende»",
        },
        {
          kind: "steps",
          title: "Para redondear a un orden",
          items: [
            "Sustituye por **ceros** todas las cifras a la derecha de ese orden.",
            "Si la primera cifra sustituida es **5 o más**, suma **1** a la cifra anterior.",
          ],
        },
        {
          kind: "example",
          title: "293 518 según el orden",
          lines: [
            { math: "\\to 290\\,000", note: "decenas de millar: quitamos un $3$, no sube" },
            { math: "\\to 300\\,000", note: "centenas de millar: quitamos un $9$, el $2$ pasa a $3$" },
            { math: "\\to 294\\,000", note: "millares: quitamos un $5$, el $3$ pasa a $4$" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "redondeo-recta", params: { n: 293_518, power: 3 } },
    },
    {
      id: "redondeo-practica-24963",
      type: "interactive_tool",
      tool: "naturales-numeracion",
      scene: "redondeo-corte",
      title: "Practica el corte",
      definitionBox:
        "Localiza el **último dígito que conservas**; todo lo que queda a la derecha pasa a ceros según la regla.",
      roundingExercise: { n: 24_963, orderId: "millares" },
      layout: "stack",
    },
    {
      id: "check-acarreo",
      type: "predict",
      title: "Cuando el redondeo «se lleva una»",
      question:
        "Una web registra $39\\,785$ visitas y quieres ponerlo en un titular redondeado a los millares. ¿Qué cifra escribes?",
      mode: "choice",
      choices: [
        { id: "40000", label: "$40\\,000$" },
        {
          id: "39000",
          label: "$39\\,000$",
          incorrectFeedback:
            "La primera cifra que quitas es un $7$ ($\\geq 5$), así que el $39$ tiene que subir.",
        },
        {
          id: "30000",
          label: "$30\\,000$",
          incorrectFeedback:
            "Esa es una aproximación a las decenas de millar y baja demasiado: $39\\,785$ está muy cerca de $40\\,000$.",
        },
      ],
      correctChoiceId: "40000",
      explanation:
        "Quitamos $785$: la primera cifra es $7 \\geq 5$, así que suma $1$ a los millares: $39 + 1 = 40$. El acarreo hace cambiar también la decena de millar: $40\\,000$.",
    },
  ],
};
