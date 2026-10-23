import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_7_SUBTITLE } from "@/data/lessons/shared";

export const motorCcConstitucionLesson: InteractiveLesson = {
  slug: "motor-cc-constitucion",
  title: "6. Motor de corriente continua: partes y magnitudes",
  subtitle: TEMA_TI2_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "clasificacion",
      type: "slide",
      help: [
        {
          label: "¿Qué es un motor universal?",
          message: "Uno que sirve tanto con corriente continua como con alterna (el de una batidora o un taladro, por ejemplo).",
        },
      ],
      title: "Clasificación de los motores eléctricos",
      blocks: [
        {
          kind: "compare",
          left: { title: "Corriente continua", text: "Según la excitación: **independiente, serie, derivación, compuesta** e **imanes permanentes** (el campo lo crean imanes, no electroimanes).", tone: "key" },
          right: { title: "Corriente alterna", text: "Según velocidad (**síncronos, asíncronos**), tipo de rotor (**bobinado, jaula de ardilla**) y número de fases (**monofásicos, trifásicos**).", tone: "info" },
        },
        {
          kind: "text",
          text: "Los **universales** funcionan con los dos tipos de corriente.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "partes",
      type: "slide",
      help: [
        {
          label: "¿Por qué hay escobillas de grafito?",
          message: "El grafito conduce la electricidad y se desgasta suavemente al rozar con el colector sin dañarlo; hay que sustituirlas cuando se gastan.",
        },
      ],
      title: "Partes de una máquina de corriente continua",
      blocks: [
        {
          kind: "compare",
          left: { title: "Inductor (estator)", text: "Parte **fija**. Crea el campo magnético con **bobinas** alrededor de expansiones polares ferromagnéticas (o con imanes).", tone: "info" },
          right: { title: "Inducido (rotor)", text: "Parte **móvil**. Bobinas alojadas en ranuras de un paquete de chapas ferromagnéticas unido al eje.", tone: "key" },
        },
        {
          kind: "steps",
          title: "La corriente llega al rotor por…",
          items: [
            "El **colector de delgas**: pieza de cobre que gira con el eje, dividida en delgas aisladas entre sí.",
            "Las **escobillas**: piezas de grafito en contacto con el colector, sostenidas por las portaescobillas.",
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "clasifica-partes",
      type: "classify",
      help: [{ label: "Pista", message: "El inductor crea el campo y está fijo; el inducido gira y lleva las bobinas conectadas al colector." }],
      title: "Inductor o inducido",
      question: "Reparte cada elemento.",
      groups: [
        { id: "inductor", label: "Inductor (estator)", tone: "cobalt" },
        { id: "inducido", label: "Inducido (rotor)", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Bobinas alrededor de expansiones polares", group: "inductor" },
        { id: "b", text: "Colector de delgas", group: "inducido" },
        { id: "c", text: "Crea el campo magnético principal", group: "inductor" },
        { id: "d", text: "Conductores en ranuras de un paquete de chapas unido al eje", group: "inducido" },
        { id: "e", text: "Parte fija de la máquina", group: "inductor" },
        { id: "f", text: "Parte móvil de la máquina", group: "inducido" },
      ],
      hint: "El inducido es el que gira.",
      explanation: "El inductor (fijo) crea el campo; el inducido (móvil) crea campos que se oponen a los del inductor, y de ahí surge el par.",
    },
    {
      id: "check-inductor",
      type: "predict",
      help: [{ label: "Pista", message: "Es la parte encargada de crear el campo." }],
      title: "¿Quién crea el campo?",
      question: "En una máquina eléctrica de corriente continua, la parte encargada de crear el campo magnético se llama:",
      mode: "choice",
      choices: [
        { id: "inductor", label: "Inductor" },
        { id: "inducido", label: "Inducido", incorrectFeedback: "El inducido es el rotor, donde se induce la corriente." },
        { id: "entrehierro", label: "Entrehierro", incorrectFeedback: "El entrehierro es la separación de aire entre estator y rotor." },
        { id: "rotor", label: "Rotor", incorrectFeedback: "El rotor es la parte móvil, que en este caso es el inducido." },
      ],
      correctChoiceId: "inductor",
      shuffleChoices: true,
      explanation: "El inductor, parte fija, crea el campo.",
    },
    {
      id: "magnitudes",
      type: "slide",
      help: [
        {
          label: "¿Qué es a?",
          message: "El número de ramas en paralelo del inducido. Las escobillas conectan los conductores formando varias ramas en paralelo.",
        },
      ],
      title: "Par interno y fuerza contraelectromotriz",
      blocks: [
        {
          kind: "rule",
          title: "Par interno",
          formula: "M_i = \\dfrac{1}{2\\pi}\\,\\dfrac{p}{a}\\,\\dfrac{N}{60}\\,\\Phi\\,I_i = K\\,\\Phi\\,I_i",
          text: "Proporcional al **flujo** y a la **intensidad** del inducido.",
        },
        {
          kind: "rule",
          title: "Fuerza contraelectromotriz",
          formula: "E' = \\dfrac{p}{a}\\,\\dfrac{N}{60}\\,\\Phi\\,n = K'\\,n\\,\\Phi",
          text: "Proporcional a la **velocidad** y al **flujo**. Cuando el motor gira, se comporta también como generador y esta fuerza se **opone** a la tensión aplicada.",
        },
        {
          kind: "text",
          text: "$p$ pares de polos, $a$ ramas en paralelo, $N$ conductores, $\\Phi$ flujo (Wb), $n$ velocidad (rpm).",
        },
      ],
      visual: { kind: "anim", scene: "motor-cc-bloques", beatMs: 5800 },
    },
    {
      id: "ley",
      type: "slide",
      help: [
        {
          label: "¿Por qué el circuito equivalente tiene un generador?",
          message: "Porque el inducido en movimiento genera una fem $E'$. En serie con él está la resistencia interna $r_i$ de los conductores.",
        },
      ],
      title: "Circuito equivalente del inducido",
      blocks: [
        {
          kind: "rule",
          title: "Ecuación del motor",
          formula: "I_i = \\dfrac{U - E'}{r_i}\\qquad U = E' + r_i\\,I_i",
          text: "$r_i$ es la resistencia del inducido (muy pequeña). En el **arranque**, $E' = 0$ y $I_{arranque} = U/r_i$ es enorme.",
        },
      ],
      visual: { kind: "tool", tool: "motor-cc-explorador", params: { a: 250, b: 230 } },
    },
    {
      id: "check-ex1",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Fórmula", message: "$I_i = (U - E')/r_i$." }],
      title: "Intensidad en marcha",
      question: "Un motor de corriente continua está conectado a una red de $250$ V, gira a $1\\,500$ rpm y desarrolla una $E' = 230$ V. Con $r_i = 2\\ \\Omega$, ¿qué intensidad circula por el inducido? (en A)",
      correctAnswers: ["10"],
      explanation: "$I_i = (250 - 230)/2 = 10$ A.",
    },
    {
      id: "check-ex2",
      type: "predict",
      mode: "numeric",
      calculator: true,
      help: [{ label: "Despeja", message: "$E' = U - r_i\\,I_i$." }],
      title: "Fuerza contraelectromotriz",
      question: "Por un motor circulan $7{,}5$ A. La red es de $150$ V y $r_i = 2\\ \\Omega$. ¿Cuánto vale $E'$? (en V)",
      correctAnswers: ["135"],
      explanation: "$E' = 150 - 2\\cdot 7{,}5 = 135$ V.",
    },
    {
      id: "check-arranque",
      type: "predict",
      mode: "numeric",
      help: [{ label: "En el arranque", message: "Con el motor parado no hay giro y $E' = 0$." }],
      title: "El instante del arranque",
      question: "El motor del primer ejemplo ($250$ V, $r_i = 2\\ \\Omega$), conectado directamente a la red cuando está parado, ¿qué intensidad absorbe en el primer instante? (en A)",
      correctAnswers: ["125"],
      explanation: "$I_{arranque} = U/r_i = 250/2 = 125$ A, **12,5 veces** la intensidad nominal. Por eso se usa un reóstato de arranque.",
    },
    {
      id: "check-e",
      type: "predict",
      help: [{ label: "Pista", message: "$E' = K'\\,n\\,\\Phi$." }],
      title: "De qué depende E'",
      question: "Si en un motor de corriente continua se mantiene el flujo y se aumenta la velocidad de giro, la fuerza contraelectromotriz:",
      mode: "choice",
      choices: [
        { id: "aumenta", label: "Aumenta, porque es proporcional a la velocidad y al flujo" },
        { id: "baja", label: "Disminuye", incorrectFeedback: "$E'$ es directamente proporcional a $n$." },
        { id: "igual", label: "No cambia", incorrectFeedback: "Depende de $n$ y de $\\Phi$." },
      ],
      correctChoiceId: "aumenta",
      shuffleChoices: true,
      explanation: "$E' = K'\\,n\\,\\Phi$: a más velocidad, mayor $E'$ y menor $I_i = (U - E')/r_i$.",
    },
  ],
};
