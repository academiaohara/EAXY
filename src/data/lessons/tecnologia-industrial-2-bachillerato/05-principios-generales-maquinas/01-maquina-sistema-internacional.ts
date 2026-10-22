import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_5_SUBTITLE } from "@/data/lessons/shared";

export const maquinaSistemaInternacionalLesson: InteractiveLesson = {
  slug: "maquina-sistema-internacional",
  title: "1. Concepto de máquina y Sistema Internacional",
  subtitle: TEMA_TI2_5_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "concepto",
      type: "slide",
      help: [
        {
          label: "¿Un ordenador es una máquina?",
          message: "Con la definición mecánica clásica (transformar fuerza y espacio) no lo sería. Por eso hoy se define la máquina de forma más general: transforma material, energía o información.",
        },
      ],
      title: "Qué es una máquina",
      blocks: [
        {
          kind: "text",
          text: "Reuleaux (1829–1895) la definió como un conjunto de piezas resistentes dispuestas de modo que, bajo fuerzas, solo pueden tener **movimientos determinados** y transmiten fuerza desde la fuente de energía hasta la resistencia que hay que vencer. Un resumen: aparato destinado a transformar **la fuerza y el espacio**.",
        },
        {
          kind: "definition",
          text: "**Máquina** es todo aquello destinado a transformar los factores de **material, energía e información**.",
        },
        {
          kind: "text",
          text: "A sus componentes simples (tornillo, rodamiento, rueda dentada, engranaje…) se les llama **elementos de máquinas** o **mecanismos**. Combinados en grupos y circuitos forman las máquinas.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "clasifica-elementos",
      type: "classify",
      help: [{ label: "Pista", message: "Un elemento es una pieza simple que se combina con otras; una máquina cumple una función completa." }],
      title: "Elemento o máquina",
      question: "Clasifica cada ejemplo.",
      groups: [
        { id: "elemento", label: "Elemento de máquina", tone: "cobalt" },
        { id: "maquina", label: "Máquina", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Tornillo", group: "elemento" },
        { id: "b", text: "Fresadora", group: "maquina" },
        { id: "c", text: "Rodamiento", group: "elemento" },
        { id: "d", text: "Torno", group: "maquina" },
        { id: "e", text: "Rueda dentada", group: "elemento" },
        { id: "f", text: "Motor de un automóvil", group: "maquina" },
      ],
      hint: "Una máquina herramienta necesita muchos elementos para construirse.",
      explanation: "Una fresadora o un torno son máquinas herramienta; los tornillos, rodamientos y ruedas dentadas son elementos que se ensamblan en ellas.",
    },
    {
      id: "check-maquina",
      type: "predict",
      help: [{ label: "Material, energía, información", message: "La definición moderna incluye los tres factores." }],
      title: "Definición de máquina",
      question: "Una máquina es:",
      mode: "choice",
      choices: [
        { id: "ok", label: "Aquello que transforma los factores material, energía o información" },
        { id: "aparato", label: "Un aparato cualquiera", incorrectFeedback: "Demasiado vago: no todos los aparatos transforman material, energía o información." },
        { id: "trabajo", label: "Lo que realiza trabajo", incorrectFeedback: "No es suficiente: un ordenador transforma información sin realizar trabajo mecánico." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "La definición clásica (fuerza y espacio) se queda corta: un ordenador no sería una máquina.",
    },
    {
      id: "si",
      type: "slide",
      help: [
        {
          label: "¿Por qué el SI?",
          message: "En España es de uso obligatorio por el Real Decreto 1317/1989. Todo el mundo habla el mismo idioma de unidades y se evitan errores en los cálculos.",
        },
      ],
      title: "El Sistema Internacional de Unidades",
      blocks: [
        {
          kind: "text",
          text: "**Unidades básicas**:",
        },
        {
          kind: "facts",
          items: [
            { tex: "\\text{m}", label: "longitud: metro" },
            { tex: "\\text{kg}", label: "masa: kilogramo" },
            { tex: "\\text{s}", label: "tiempo: segundo" },
            { tex: "\\text{A}", label: "intensidad: amperio" },
            { tex: "\\text{K}", label: "temperatura: kelvin" },
            { tex: "\\text{mol}", label: "cantidad de materia" },
          ],
        },
        {
          kind: "text",
          text: "**Derivadas con nombre propio**:",
        },
        {
          kind: "facts",
          items: [
            { tex: "\\text{N} = \\text{kg·m·s}^{-2}", label: "fuerza: newton" },
            { tex: "\\text{Pa} = \\text{N/m}^2", label: "presión: pascal" },
            { tex: "\\text{J} = \\text{N·m}", label: "trabajo, energía y calor: julio" },
            { tex: "\\text{W} = \\text{J/s}", label: "potencia: vatio" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "peso-masa",
      type: "slide",
      help: [
        {
          label: "¿Qué es el kilopondio?",
          message: "La unidad de fuerza del Sistema Técnico: el peso de 1 kg a nivel del mar, 9,8 N. Coincide numéricamente con la masa en kg, y de ahí la confusión.",
        },
      ],
      title: "Peso y masa no son lo mismo",
      blocks: [
        {
          kind: "rule",
          formula: "\\text{peso} = m\\,g,\\qquad g = 9{,}8\\ \\text{m/s}^2",
          text: "La masa se mide en **kg**; el peso es una **fuerza** y se mide en **newtons** (o en kilopondios: $1\\ \\text{kp} = 9{,}8$ N).",
        },
        {
          kind: "warning",
          text: "No digas «pesa 1 kg»: debería decirse que tiene **masa** de 1 kg o que su peso es 1 kp (9,8 N). En catálogos, «kg/cm²» significa en realidad kp/cm².",
        },
      ],
      visual: { kind: "tool", tool: "conversor-industrial", params: { a: 0 } },
    },
    {
      id: "check-presion",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Conversión", message: "$1$ kp/cm² $= 9{,}8$ N$/10^{-4}$ m² $= 98\\,000$ Pa." }],
      title: "Presión de un cilindro neumático",
      question: "Un cilindro neumático se alimenta con una presión de $6$ kp/cm². Exprésala en pascales (solo el número).",
      correctAnswers: ["588000", "588.000", "588 000"],
      explanation: "$6\\ \\text{kp/cm}^2 = 6\\cdot 9{,}8\\ \\text{N}/10^{-4}\\ \\text{m}^2 = 588\\,000$ Pa.",
    },
    {
      id: "check-fuerza-si",
      type: "predict",
      help: [{ label: "Pista", message: "La unidad de fuerza en el Sistema Internacional lleva el nombre de un científico inglés." }],
      title: "Unidad de fuerza",
      question: "La unidad de fuerza en el Sistema Internacional es:",
      mode: "choice",
      choices: [
        { id: "n", label: "El newton (N)" },
        { id: "kg", label: "El kilogramo (kg)", incorrectFeedback: "El kilogramo es una unidad de masa." },
        { id: "kp", label: "El kilopondio o kilogramo fuerza (kp)", incorrectFeedback: "Es la unidad del Sistema Técnico, no del SI." },
      ],
      correctChoiceId: "n",
      shuffleChoices: true,
      explanation: "$1$ N $= 1$ kg·m/s². El kilopondio vale $9{,}8$ N.",
    },
    {
      id: "check-peso",
      type: "predict",
      help: [{ label: "peso = m g", message: "Multiplica la masa por $9{,}8$ m/s²." }],
      title: "Peso de una masa",
      question: "Un cuerpo de $1$ kg de masa, ¿con qué fuerza lo atrae la Tierra en su superficie?",
      mode: "choice",
      choices: [
        { id: "98", label: "9,8 N, es decir, 1 kp" },
        { id: "1", label: "1 N", incorrectFeedback: "1 N es la fuerza que da $1$ m/s² a $1$ kg, no su peso." },
        { id: "10kg", label: "9,8 kg", incorrectFeedback: "Los kg miden masa, no fuerza." },
      ],
      correctChoiceId: "98",
      shuffleChoices: true,
      explanation: "$P = m\\,g = 1\\cdot 9{,}8 = 9{,}8$ N $= 1$ kp. Por eso se confunden masa y peso en el lenguaje cotidiano.",
    },
  ],
};
