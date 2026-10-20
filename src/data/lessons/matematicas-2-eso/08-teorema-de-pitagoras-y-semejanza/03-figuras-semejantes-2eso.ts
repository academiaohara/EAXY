import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2ESO_8_SUBTITLE } from "@/data/lessons/shared";

export const figurasSemejantes2esoLesson: InteractiveLesson = {
  slug: "figuras-semejantes-2eso",
  title: "3. Figuras semejantes",
  subtitle: TEMA_2ESO_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "semejantes",
      type: "slide",
      help: [
        {
          label: "Misma forma",
          message: "Una fotocopia ampliada o una maqueta son semejantes al original: igual en todo salvo en el tamaño.",
        },
        {
          label: "No basta con parecerse",
          message: "Para ser semejantes, **todos** los segmentos correspondientes deben cumplir la misma razón.",
        },
      ],
      title: "Figuras semejantes",
      blocks: [
        {
          kind: "definition",
          text: "Dos figuras son **semejantes** cuando solo difieren en el **tamaño**. Sus segmentos correspondientes son **proporcionales**.",
        },
        {
          kind: "rule",
          title: "Razón de semejanza",
          text: "Cada longitud de una figura se obtiene **multiplicando** la correspondiente de la otra por un número fijo: la **razón de semejanza**.",
        },
      ],
      visual: { kind: "anim", scene: "semejanza-figuras", params: { a: 3, b: 4, c: 2 } },
    },
    {
      id: "escala",
      type: "slide",
      help: [
        {
          label: "Unidades iguales",
          message: "Para calcular la razón, pon las dos longitudes en la **misma unidad**: $700$ km $= 70\\,000\\,000$ cm.",
        },
        {
          label: "Cómo se lee",
          message: "$1 : 2\\,000\\,000$ significa que $1$ cm en el mapa son $2\\,000\\,000$ cm en la realidad.",
        },
      ],
      title: "Escalas: planos y mapas",
      blocks: [
        {
          kind: "text",
          text: "Un mapa es semejante al terreno real. Su **escala** es la razón de semejanza, escrita como $1 : n$.",
        },
        {
          kind: "example",
          title: "35 cm en el mapa son 700 km reales",
          lines: [
            { math: "700\\,\\text{km} = 70\\,000\\,000\\,\\text{cm}" },
            { math: "\\dfrac{70\\,000\\,000}{35} = 2\\,000\\,000 \\ \\Rightarrow\\  \\text{escala } 1 : 2\\,000\\,000" },
          ],
        },
        {
          kind: "example",
          title: "Una maqueta 1:10",
          lines: [{ math: "1\\,\\text{dm en la maqueta} \\to 10\\,\\text{dm} = 1\\,\\text{m en la moto real}" }],
        },
      ],
      arrange: "stack",
    },
    {
      id: "proporciones",
      type: "slide",
      help: [
        {
          label: "Una regla de tres",
          message: "Si $30$ cm de altura corresponden a $10$ cm de base, la torre real con base $108$ m tendrá una altura proporcional.",
        },
        {
          label: "Con la razón",
          message: "Otra forma: la razón entre la torre real y la maqueta es $108 : 10 = 10{,}8$; la altura real es $30 \\cdot 10{,}8$ cm... en metros, $324$ m.",
        },
      ],
      title: "Calcular longitudes en figuras semejantes",
      blocks: [
        {
          kind: "text",
          text: "Dos reproducciones de la Torre Eiffel miden $30$ cm y $12$ cm de altura. La mayor tiene base de $10$ cm de lado.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\text{razón} = \\dfrac{30}{12} = 2{,}5" },
            { math: "\\text{base de la pequeña} = 10 : 2{,}5 = 4\\,\\text{cm}" },
            { math: "\\text{torre real (base } 108\\,\\text{m)}: \\ \\dfrac{\\text{altura}}{108} = \\dfrac{30}{10} \\Rightarrow 324\\,\\text{m}" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "areas",
      type: "slide",
      help: [
        {
          label: "Mira los cuadrados",
          message: "Un cuadrado de lado $2$ tiene área $4$; si el lado se duplica ($4$), el área es $16$: se multiplica por $4$, no por $2$.",
        },
      ],
      title: "Ojo: las áreas no se multiplican por k",
      blocks: [
        {
          kind: "text",
          text: "Si la razón de semejanza es $k$, las **longitudes** se multiplican por $k$, pero las **áreas** se multiplican por $k^2$.",
        },
        {
          kind: "example",
          lines: [
            { math: "\\text{triángulo } 3,4,5: \\ A = \\dfrac{3 \\cdot 4}{2} = 6" },
            { math: "\\text{triángulo } 6,8,10 \\ (k = 2): \\ A = \\dfrac{6 \\cdot 8}{2} = 24 = 6 \\cdot 2^2" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-razon",
      type: "classify",
      help: [
        {
          label: "Comprueba las dos medidas",
          message: "Divide el lado mayor entre el mayor y el menor entre el menor: si salen iguales, son semejantes.",
        },
      ],
      title: "Rectángulos semejantes",
      question: "Decide si cada rectángulo es semejante a uno de $2 \\times 3$ cm.",
      groups: [
        { id: "si", label: "Semejante", tone: "emerald" },
        { id: "no", label: "No semejante", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$4 \\times 6$", group: "si" },
        { id: "b", text: "$6 \\times 9$", group: "si" },
        { id: "c", text: "$3 \\times 4$", group: "no" },
        { id: "d", text: "$5 \\times 8$", group: "no" },
      ],
      explanation: "$4 : 2 = 6 : 3 = 2$ y $6 : 2 = 9 : 3 = 3$. En $3 \\times 4$ y $5 \\times 8$ las razones no coinciden ($1{,}5 \\ne 1{,}33$ y $2{,}5 \\ne 2{,}67$).",
    },
    {
      id: "check-escala",
      type: "fill_in_blank",
      help: [
        {
          label: "A la misma unidad",
          message: "$1$ cm del plano son $20$ m $= 2\\,000$ cm reales. Una distancia de $6$ cm en el plano son $6 \\cdot 2\\,000$ cm.",
        },
      ],
      title: "Distancia real",
      question: "El plano de un circuito tiene escala $1 : 2\\,000$. Una recta mide $6$ cm en el plano. ¿Cuántos metros mide en la realidad? (solo el número)",
      correctAnswers: ["120"],
      explanation: "$6 \\cdot 2\\,000 = 12\\,000$ cm $= 120$ m.",
    },
    {
      id: "check-fotocopia",
      type: "predict",
      help: [
        {
          label: "Una razón del 75 %",
          message: "$75\\,\\% = 0{,}75$: cada longitud se multiplica por $0{,}75$.",
        },
      ],
      title: "Una fotocopia reducida",
      question: "Una fotocopiadora reduce al $75\\,\\%$. ¿Cuánto mide en la copia un segmento de $20$ cm del original?",
      mode: "choice",
      choices: [
        { id: "15", label: "$15$ cm" },
        { id: "26.7", label: "$26{,}7$ cm", incorrectFeedback: "Has dividido entre $0{,}75$: eso es una ampliación, no una reducción." },
        { id: "5", label: "$5$ cm", incorrectFeedback: "Has restado el $75\\,\\%$; la copia mide el $75\\,\\%$ del original, no el $25\\,\\%$." },
        { id: "95", label: "$95$ cm", incorrectFeedback: "Has sumado; la copia reducida es más corta que el original." },
      ],
      correctChoiceId: "15",
      shuffleChoices: true,
      explanation: "$20 \\cdot 0{,}75 = 15$ cm.",
    },
  ],
};
