import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_13_SUBTITLE } from "@/data/lessons/shared";

export const areasCirculoLesson: InteractiveLesson = {
  slug: "areas-circulo",
  title: "4. Medidas en el círculo",
  subtitle: TEMA_1ESO_13_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "pi",
      type: "slide",
      help: [
        {
          label: "¿Qué es $\\pi$?",
          message: "La razón entre la longitud de cualquier circunferencia y su diámetro. Es la misma sea grande o pequeña.",
        },
        {
          label: "Compruébalo con un hilo",
          message: "Rodea una lata con un hilo y mide el hilo y el diámetro: el hilo mide algo más de tres diámetros.",
        },
        {
          label: "¿Qué aproximación uso?",
          message: "$3{,}14$ basta para casi todos los ejercicios. El enunciado suele indicar cuál usar.",
        },
      ],
      title: "El número $\\pi$",
      blocks: [
        {
          kind: "definition",
          text: "El **perímetro** de un círculo es la longitud de su circunferencia: algo más de **tres veces** su diámetro.",
        },
        {
          kind: "rule",
          formula: "l = \\pi d = 2\\pi r \\qquad \\pi \\approx 3{,}14",
        },
        {
          kind: "text",
          text: "Los egipcios usaron $3{,}16$, los babilonios $3{,}125$ y Arquímedes lo acotó cerca de $3{,}141$. La letra $\\pi$ viene de *perifereia*, «circunferencia» en griego.",
        },
      ],
      visual: { kind: "anim", scene: "longitud-pi", beatMs: 3200 },
    },
    {
      id: "explora-circulo",
      type: "slide",
      help: [
        {
          label: "¿Qué debo observar?",
          message: "Al duplicar el radio, la longitud se multiplica por $2$, pero el área se multiplica por $4$: lleva $r^2$.",
        },
      ],
      title: "Explora: radio, longitud y área",
      blocks: [
        {
          kind: "text",
          text: "Cambia el radio. Si lo duplicas, ¿cuánto se multiplica la longitud? ¿Y el área?",
        },
      ],
      visual: { kind: "tool", tool: "circulo-explorador", params: { a: 4 } },
    },
    {
      id: "area",
      type: "slide",
      help: [
        {
          label: "¿De dónde sale $\\pi r^2$?",
          message: "Si cortas el círculo en muchos sectores finos, son casi triángulos de altura $r$ y la suma de sus bases es la circunferencia $2\\pi r$.",
          math: ["A = \\dfrac{2\\pi r \\cdot r}{2} = \\pi r^2"],
        },
        {
          label: "¿Qué es $r^2$?",
          message: "Es $r \\cdot r$, no $2 \\cdot r$. Con $r = 3$: $r^2 = 9$, no $6$.",
        },
      ],
      title: "Área del círculo",
      blocks: [
        {
          kind: "definition",
          text: "Descomponemos el círculo en **muchos triángulos** muy finos, como un polígono regular de muchos lados: su altura es $r$ y sus bases suman $2\\pi r$.",
        },
        {
          kind: "rule",
          formula: "A = \\pi r^2",
        },
      ],
      visual: { kind: "anim", scene: "area-circulo", beatMs: 3500 },
    },
    {
      id: "check-area",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Área o longitud?",
          message: "El área es la superficie que ocupa el círculo y se mide en unidades cuadradas; la longitud es el contorno. Te piden $\\mathrm{dm}^2$: es una superficie.",
        },
        {
          label: "¿Qué es $r^2$?",
          message: "Es $r \\cdot r$, no $2 \\cdot r$. Con $r = 3$: $r^2 = 9$, no $6$.",
          math: ["3^2 = 3 \\cdot 3"],
        },
        {
          label: "Quiero saber si es razonable",
          message: "El círculo cabe en un cuadrado de lado $8\\,\\mathrm{dm}$ (área $64$) y contiene un cuadrado de lado $4\\,\\mathrm{dm}$ (área $16$). Tu resultado debe quedar entre esos dos.",
        },
      ],
      title: "Área con el radio",
      question:
        "Un círculo tiene radio $4\\,\\mathrm{dm}$. Usando $\\pi \\approx 3{,}14$, ¿cuál es su área aproximada en $\\mathrm{dm}^2$?",
      correctAnswers: ["50,24", "50.24", "50,2", "50.2"],
      explanation: "$A = \\pi r^2 = 3{,}14 \\cdot 16 = 50{,}24\\,\\mathrm{dm}^2$.",
    },
    {
      id: "check-longitud",
      type: "classify",
      help: [
        {
          label: "¿Cómo distingo longitud y área?",
          message: "Mira las unidades: metros es contorno y metros cuadrados es superficie. Y la fórmula: si lleva $r^2$ es área; si lleva solo $r$ o $d$, es longitud.",
        },
        {
          label: "Tengo el diámetro, no el radio",
          message: "El radio es la mitad del diámetro. La longitud puede calcularse con cualquiera de los dos; el área necesita el radio.",
          math: ["r = \\frac{d}{2}"],
        },
      ],
      title: "Longitud o área",
      question:
        "Un círculo tiene diámetro $10\\,\\mathrm{m}$ (radio $5\\,\\mathrm{m}$). ¿Cada tarjeta corresponde a su longitud o a su área? Usa $\\pi \\approx 3{,}14$.",
      groups: [
        { id: "longitud", label: "Longitud de la circunferencia", tone: "cobalt" },
        { id: "area", label: "Área del círculo", tone: "emerald" },
      ],
      items: [
        { id: "a", text: "$\\pi d$", group: "longitud" },
        { id: "b", text: "$\\pi r^2$", group: "area" },
        { id: "c", text: "$3{,}14 \\cdot 10 = 31{,}4\\,\\mathrm{m}$", group: "longitud" },
        { id: "d", text: "$3{,}14 \\cdot 5^2 = 78{,}5\\,\\mathrm{m}^2$", group: "area" },
        { id: "e", text: "$2\\pi r$", group: "longitud" },
        { id: "f", text: "Se mide en $\\mathrm{m}^2$", group: "area" },
      ],
      hint: "La longitud es un contorno (se mide en metros); el área es una superficie (en metros cuadrados) y lleva $r^2$.",
      explanation:
        "Longitud: $l = \\pi d = 2\\pi r = 3{,}14 \\cdot 10 = 31{,}4\\,\\mathrm{m}$. Área: $A = \\pi r^2 = 3{,}14 \\cdot 25 = 78{,}5\\,\\mathrm{m}^2$.",
    },
    {
      id: "pizza",
      type: "predict",
      help: [
        {
          label: "¿Qué cambia al duplicar?",
          message: "Prueba con números: un radio $r = 1$ y otro $r = 2$. Calcula $\\pi r^2$ en cada caso y compara.",
        },
        {
          label: "Recuerda el exponente",
          message: "El área lleva $r^2$: si $r$ se multiplica por $2$, $r^2$ se multiplica por $2^2$.",
        },
      ],
      title: "Dos pizzas",
      question:
        "Una pizzería vende una pizza de 15 cm de radio y otra de 30 cm de radio. ¿Cuántas veces más pizza (superficie) hay en la grande que en la pequeña?",
      mode: "choice",
      choices: [
        { id: "a", label: "$4$ veces más" },
        {
          id: "b",
          label: "$2$ veces más",
          incorrectFeedback: "El radio se duplica, pero el área lleva $r^2$: se multiplica por $2 \\cdot 2 = 4$, no por $2$.",
        },
        {
          id: "c",
          label: "$3{,}14$ veces más",
          incorrectFeedback: "$\\pi$ aparece en las dos pizzas y se cancela al compararlas. Fíjate solo en cómo cambia $r^2$.",
        },
        {
          id: "d",
          label: "$8$ veces más",
          incorrectFeedback: "$8$ sería si el área llevara $r^3$ (como un volumen). El área lleva $r^2$: $2^2 = 4$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\dfrac{\\pi \\cdot 30^2}{\\pi \\cdot 15^2} = \\dfrac{900}{225} = 4$: al duplicar el radio, el área se cuadruplica.",
    },
    {
      id: "corona",
      type: "slide",
      help: [
        {
          label: "¿Por qué resto áreas?",
          message: "El círculo grande incluye el hueco, así que le quitas el área del círculo pequeño.",
        },
        {
          label: "¿Y el perímetro?",
          message: "La corona tiene dos bordes, el exterior y el interior, así que se suman las dos circunferencias.",
        },
        {
          label: "Un atajo",
          message: "Saca $\\pi$ factor común antes de aproximar.",
          math: ["25\\pi - 9\\pi = 16\\pi"],
        },
      ],
      title: "Corona circular",
      blocks: [
        {
          kind: "definition",
          text: "Dos circunferencias **concéntricas** (con el mismo centro) limitan una **corona circular**. Su área es la diferencia de las áreas de los dos círculos.",
        },
        {
          kind: "rule",
          formula: "A = \\pi R^2 - \\pi r^2",
        },
      ],
      visual: { kind: "anim", scene: "corona-circular", beatMs: 3500 },
    },
    {
      id: "check-corona",
      type: "fill_in_blank",
      help: [
        {
          label: "Resta de áreas",
          message: "Calcula el área del círculo de radio $6$ y réstale la del círculo de radio $4$.",
        },
        {
          label: "Saca factor común",
          message: "$\\pi \\cdot 36 - \\pi \\cdot 16 = \\pi \\cdot 20$. Después aproxima con $3{,}14$.",
        },
      ],
      title: "Una corona",
      question:
        "Una corona circular está limitada por dos circunferencias concéntricas de radios 6 cm y 4 cm. Usando $\\pi \\approx 3{,}14$, ¿cuál es su área en cm²? (escribe solo el número)",
      correctAnswers: ["62,8", "62.8", "62,80"],
      hint: "$A = \\pi \\cdot 6^2 - \\pi \\cdot 4^2$.",
      explanation: "$A = \\pi \\cdot (36 - 16) = 20\\pi \\approx 20 \\cdot 3{,}14 = 62{,}8\\,\\mathrm{cm}^2$.",
    },
  ],
};
