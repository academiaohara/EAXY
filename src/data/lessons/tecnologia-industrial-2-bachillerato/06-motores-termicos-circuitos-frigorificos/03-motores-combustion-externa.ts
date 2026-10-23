import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_6_SUBTITLE } from "@/data/lessons/shared";

export const motoresCombustionExternaLesson: InteractiveLesson = {
  slug: "motores-combustion-externa",
  title: "3. Clasificación de motores y combustión externa",
  subtitle: TEMA_TI2_6_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "clasificacion",
      type: "slide",
      help: [
        {
          label: "¿Qué es un combustible?",
          message: "Una sustancia que, al quemarse, libera calor. El **calor de combustión** es la cantidad de calor liberada por unidad de masa o volumen cuando se quema por completo.",
        },
      ],
      title: "Qué es un motor térmico y cómo se clasifica",
      blocks: [
        {
          kind: "definition",
          text: "**Motor térmico**: máquina cuya misión es transformar **energía térmica** en **energía mecánica** directamente utilizable para producir trabajo.",
        },
        {
          kind: "compare",
          left: { title: "Combustión externa", text: "El calor se transmite a un **fluido intermedio** (vapor) a través de paredes. Máquinas de vapor y turbinas de vapor. Límite: unos 600 °C.", tone: "info" },
          right: { title: "Combustión interna", text: "La combustión ocurre **dentro del motor**: los gases mueven los mecanismos. Otto, Diesel, turbinas de gas… Temperaturas mucho mayores.", tone: "key" },
        },
        {
          kind: "text",
          text: "Según cómo se obtiene la energía mecánica: **alternativos** (pistones con vaivén), **rotativos** (pistones rotantes o turbinas) y **de chorro** (empuje por acción y reacción).",
        },
      ],
      arrange: "stack",
    },
    {
      id: "clasifica-motores",
      type: "classify",
      help: [{ label: "Pista", message: "¿Dónde se quema el combustible: fuera o dentro del motor?" }],
      title: "¿Combustión externa o interna?",
      question: "Clasifica cada motor.",
      groups: [
        { id: "externa", label: "Combustión externa", tone: "cobalt" },
        { id: "interna", label: "Combustión interna", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Locomotora de vapor", group: "externa" },
        { id: "b", text: "Turbina de vapor de una central térmica", group: "externa" },
        { id: "c", text: "Motor de gasolina de un coche", group: "interna" },
        { id: "d", text: "Motor Diesel de un camión", group: "interna" },
        { id: "e", text: "Turbina de gas de un avión", group: "interna" },
        { id: "f", text: "Máquina de vapor de una fábrica antigua", group: "externa" },
      ],
      hint: "En los de combustión externa, el calor pasa a un fluido (agua) a través de una pared.",
      explanation: "En los de combustión externa se quema el combustible fuera y se usa un fluido intermedio; en los internos, los propios gases de la combustión mueven el motor.",
    },
    {
      id: "check-ferrocarril",
      type: "predict",
      help: [{ label: "Pista", message: "En la locomotora, el carbón arde en el hogar y calienta el agua de la caldera." }],
      title: "Locomotora de vapor",
      question: "Una máquina de vapor de ferrocarril es un motor de combustión:",
      mode: "choice",
      choices: [
        { id: "externa", label: "Externa" },
        { id: "interna", label: "Interna", incorrectFeedback: "El combustible no arde dentro del cilindro: el cilindro solo recibe vapor." },
        { id: "presion", label: "No es de combustión: es un fluido a presión", incorrectFeedback: "Sí hay combustión, aunque fuera del cilindro, para producir el vapor." },
      ],
      correctChoiceId: "externa",
      shuffleChoices: true,
      explanation: "El combustible se quema fuera del cilindro; el vapor es el fluido intermedio.",
    },
    {
      id: "maquina-vapor",
      type: "slide",
      help: [
        {
          label: "¿Para qué sirve el volante de inercia?",
          message: "Almacena energía en el tiempo útil y la devuelve en el resto, de modo que el giro sea continuo y suave.",
        },
      ],
      title: "Máquina de vapor alternativa",
      blocks: [
        {
          kind: "text",
          text: "Un cilindro con un **pistón** que lo divide en dos zonas. El vapor de la caldera entra por un lado y empuja el pistón; después entra por el otro. Un **distribuidor** (válvula corredera) comunica cada zona alternativamente con la caldera y con el condensador.",
        },
        {
          kind: "text",
          text: "El sistema **biela-manivela** transforma el movimiento lineal en giro y un **volante de inercia** regulariza el movimiento. Para evitar tantas pérdidas conviene quemar el combustible en el interior del propio motor, y de ahí nacen los de combustión interna.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "turbina-vapor",
      type: "slide",
      help: [
        {
          label: "¿Qué es la cogeneración?",
          message: "En industrias que necesitan vapor y electricidad (papel, alimentos), se produce el vapor del proceso y el resto se expande en una turbina con alternador, aprovechando la misma energía dos veces.",
        },
      ],
      title: "Turbina de vapor",
      blocks: [
        {
          kind: "text",
          text: "El vapor pasa por **toberas**, donde pierde presión y gana velocidad, y se orienta para chocar contra los **álabes** de un rodete. Por la forma del álabe, el vapor circula más rápido por una cara que por otra: aparece una **depresión** (teorema de Bernoulli) y el rodete gira.",
        },
        {
          kind: "facts",
          items: [
            { tex: "\\text{Tobera}", label: "conducto que acelera el fluido y baja su presión" },
            { tex: "\\text{Difusor}", label: "conducto que frena el fluido y sube su presión" },
            { tex: "\\text{Álabe}", label: "paleta de la turbina que recibe el impulso del fluido" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-tobera",
      type: "predict",
      help: [{ label: "Pista", message: "Por Bernoulli, si la velocidad sube, la presión baja." }],
      title: "En una tobera",
      question: "En una tobera de una turbina, el vapor:",
      mode: "choice",
      choices: [
        { id: "ok", label: "Aumenta su velocidad y disminuye su presión" },
        { id: "inverso", label: "Disminuye su velocidad y aumenta su presión", incorrectFeedback: "Eso ocurre en un difusor." },
        { id: "ambas", label: "Aumenta su velocidad y su presión", incorrectFeedback: "No pueden subir las dos: parte de la energía de presión pasa a velocidad." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "La tobera transforma energía de presión en energía cinética.",
    },
    {
      id: "rankine",
      type: "slide",
      help: [
        {
          label: "¿Qué es el estado «vapor saturado»?",
          message: "El vapor justo en el punto en que todo el líquido se ha evaporado a esa presión. Si se sigue calentando, se **sobrecalienta**.",
        },
      ],
      title: "El ciclo de un motor de combustión externa",
      blocks: [
        {
          kind: "steps",
          title: "Ciclo básico (Rankine)",
          items: [
            "La **bomba** comprime el líquido hasta la presión de la caldera.",
            "En la **caldera** se calienta, hierve y sale como vapor saturado o sobrecalentado.",
            "En la **turbina** (o cilindro) el vapor se expande adiabáticamente y cede trabajo.",
            "En el **condensador** vuelve a líquido saturado cediendo calor.",
          ],
        },
        {
          kind: "text",
          text: "Como el calor entra en **dos etapas**, el rendimiento se calcula con las temperaturas medias del foco caliente y del frío: $\\eta = 1 - T_{bm}/T_{am}$.",
        },
      ],
      visual: { kind: "anim", scene: "rankine-circuito", beatMs: 5600 },
    },
    {
      id: "mejoras",
      type: "slide",
      help: [
        {
          label: "¿Por qué subir la presión de la caldera?",
          message: "Al aumentar la presión de entrada y bajar la temperatura de salida, crece el área útil del diagrama: se obtiene más trabajo del mismo ciclo.",
        },
      ],
      title: "Cómo mejorar el ciclo",
      blocks: [
        {
          kind: "compare",
          left: { title: "Recalentamiento", text: "El vapor que sale de la turbina se vuelve a **calentar** y pasa por una segunda turbina a menor presión.", tone: "key" },
          right: { title: "Ciclo regenerativo", text: "Se **extrae vapor** en etapas de la turbina para **precalentar** el agua de entrada a la caldera.", tone: "ok" },
        },
        {
          kind: "text",
          text: "Las centrales modernas, térmicas y nucleares, combinan las dos mejoras.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-limite-600",
      type: "predict",
      help: [{ label: "Pista", message: "El calor pasa a través de paredes metálicas." }],
      title: "¿Por qué temperaturas distintas?",
      question: "¿Por qué los motores de combustión interna pueden trabajar a temperaturas mucho mayores que los de combustión externa?",
      mode: "choice",
      choices: [
        { id: "paredes", label: "Porque el calor no atraviesa las paredes: en el instante de la combustión el proceso es casi adiabático; en los externos las paredes pierden resistencia por encima de unos 600 °C" },
        { id: "mejor", label: "Porque usan mejores combustibles baratos como el carbón", incorrectFeedback: "Al contrario: queman combustibles gaseosos o líquidos más caros." },
        { id: "mas", label: "Porque son más grandes y pesados", incorrectFeedback: "Los de combustión interna son más ligeros y de menores dimensiones." },
      ],
      correctChoiceId: "paredes",
      shuffleChoices: true,
      explanation: "A mayor temperatura del foco caliente, mayor rendimiento posible. Los de combustión interna se benefician de ello.",
    },
  ],
};
