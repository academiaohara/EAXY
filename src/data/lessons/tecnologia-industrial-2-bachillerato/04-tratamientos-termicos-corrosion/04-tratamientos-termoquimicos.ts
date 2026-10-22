import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_4_SUBTITLE } from "@/data/lessons/shared";

export const tratamientosTermoquimicosLesson: InteractiveLesson = {
  slug: "tratamientos-termoquimicos",
  title: "4. Tratamientos termoquímicos",
  subtitle: TEMA_TI2_4_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "idea",
      type: "slide",
      help: [
        {
          label: "¿Por qué endurecer solo la superficie?",
          message: "Piezas como los dientes de un engranaje necesitan una superficie muy dura (para resistir el desgaste y los golpes) y un interior blando y tenaz (para no romperse).",
        },
      ],
      title: "Cambiar la composición de la superficie",
      blocks: [
        {
          kind: "text",
          text: "Los tratamientos **termoquímicos** varían la composición química superficial de los aceros añadiendo otros elementos para mejorar la **dureza**, la resistencia al **desgaste** o a la **corrosión**.",
        },
        {
          kind: "facts",
          items: [
            { tex: "\\text{Cementación}", label: "añade carbono" },
            { tex: "\\text{Nitruración}", label: "añade nitrógeno" },
            { tex: "\\text{Carbonitruración}", label: "añade carbono y nitrógeno" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "cementacion",
      type: "slide",
      help: [
        {
          label: "¿Por qué es reversible la reacción?",
          message: "Un acero carburado sometido a alta temperatura se descarbura en presencia de $CO_2$ del aire y pierde dureza. Por eso se controla la atmósfera.",
        },
      ],
      title: "Cementación",
      blocks: [
        {
          kind: "definition",
          text: "La **cementación** aumenta la cantidad de **carbono** de la capa exterior de aceros de bajo carbono (por ejemplo $0{,}2\\,\\%$ C). Se aplica a piezas que deben resistir el desgaste y los golpes: **dureza superficial y resiliencia interior**.",
        },
        {
          kind: "rule",
          title: "Cementante gaseoso, por encima de A₃",
          formula: "Fe_\\gamma + 2CO \\rightarrow (Fe_\\gamma + C) + CO_2",
          text: "El espesor de la capa depende del tiempo de permanencia y de la temperatura.",
        },
      ],
      visual: { kind: "anim", scene: "cementacion-difusion", beatMs: 4200 },
    },
    {
      id: "perfil",
      type: "slide",
      help: [
        {
          label: "¿Y el núcleo?",
          message: "Tiene poco carbono: tras el temple queda con una estructura mucho más blanda y tenaz que la de la capa. Esa combinación evita que la pieza se parta.",
        },
      ],
      title: "Dureza según la profundidad",
      blocks: [
        {
          kind: "text",
          text: "Compara la pieza cementada con otra templada entera. ¿Qué ventaja tiene el núcleo blando?",
        },
      ],
      visual: { kind: "tool", tool: "perfil-dureza", params: { a: 1 } },
    },
    {
      id: "check-cementacion",
      type: "predict",
      help: [{ label: "Qué se añade", message: "La palabra lo dice: cementar es enriquecer con carbono." }],
      title: "Objeto de la cementación",
      question: "La cementación tiene por objeto:",
      mode: "choice",
      choices: [
        { id: "carbono", label: "Aumentar la cantidad de carbono en la superficie del acero para endurecerla" },
        { id: "hormigon", label: "Recubrir el acero con hormigón para uso en construcción", incorrectFeedback: "Nada que ver: es un tratamiento termoquímico." },
        { id: "austenita", label: "Mantener la austenita a temperatura ambiente", incorrectFeedback: "Eso no es el objetivo de la cementación." },
      ],
      correctChoiceId: "carbono",
      shuffleChoices: true,
      explanation: "Es un tratamiento termoquímico: se difunde carbono hacia el interior de la pieza para poder templar después una capa muy dura.",
    },
    {
      id: "nitruracion",
      type: "slide",
      help: [
        {
          label: "¿Por qué no hace falta temple posterior?",
          message: "Con aceros aleados con Al y Cr el nitruro formado ya es muy duro, y el tratamiento se hace a temperaturas bajas (500–525 °C), sin cambiar la estructura del núcleo.",
        },
      ],
      title: "Nitruración y carbonitruración",
      blocks: [
        {
          kind: "compare",
          left: { title: "Nitruración", text: "Se expone la pieza a una corriente de **amoníaco** entre $500$ y $525$ °C: $2NH_3 \\rightarrow 2N + 3H_2$. El nitrógeno forma nitruro de hierro $Fe_4N$. Durezas del orden de $1\\,200$ HB; capa de solo $5$–$20$ µm.", tone: "ok" },
          right: { title: "Carbonitruración", text: "Cementante líquido: **cianuro sódico fundido**. Aporta carbono y también nitrógeno, que forma nitruros de hierro muy duros.", tone: "key" },
        },
        {
          kind: "text",
          text: "Aplicaciones de la nitruración: camisas de cilindros, árboles de levas, ejes de cardán, piñones y aparatos de medida.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "clasifica-termoquimicos",
      type: "classify",
      help: [{ label: "Elemento que se añade", message: "Cementación: carbono; nitruración: nitrógeno; carbonitruración: los dos." }],
      title: "Cada característica, a su tratamiento",
      question: "Asigna cada afirmación al tratamiento correspondiente.",
      groups: [
        { id: "cementacion", label: "Cementación", tone: "cobalt" },
        { id: "nitruracion", label: "Nitruración", tone: "emerald" },
        { id: "carbonitruracion", label: "Carbonitruración", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Se aumenta el carbono de la capa exterior con CO por encima de A₃", group: "cementacion" },
        { id: "b", text: "Corriente de amoníaco a 500–525 °C", group: "nitruracion" },
        { id: "c", text: "Cianuro sódico fundido como cementante líquido", group: "carbonitruracion" },
        { id: "d", text: "Se forma el nitruro Fe₄N muy duro; capa de 5–20 µm", group: "nitruracion" },
        { id: "e", text: "Pieza con dureza superficial y resiliencia interior; se templa después", group: "cementacion" },
        { id: "f", text: "Aporta a la vez carbono y nitrógeno", group: "carbonitruracion" },
      ],
      hint: "Fíjate en el elemento que se difunde en la superficie.",
      explanation: "Cementación: carbono; nitruración: nitrógeno (amoníaco, Fe₄N); carbonitruración: cianuro fundido que aporta los dos.",
    },
    {
      id: "check-nitruracion",
      type: "predict",
      help: [{ label: "Compuesto de inserción", message: "El nitrógeno difunde en el hierro α y forma un compuesto de inserción." }],
      title: "Dureza de la capa nitrurada",
      question: "La elevada dureza de la capa superficial obtenida en la nitruración se debe a:",
      mode: "choice",
      choices: [
        { id: "nitruro", label: "El nitruro de hierro $Fe_4N$ que se forma" },
        { id: "martensita", label: "La martensita del temple posterior", incorrectFeedback: "En aceros aleados con Al y Cr no hace falta temple posterior." },
        { id: "perlita", label: "La perlita que se forma al enfriar", incorrectFeedback: "No hay austenización ni cambio de la estructura del núcleo." },
      ],
      correctChoiceId: "nitruro",
      shuffleChoices: true,
      explanation: "El nitrógeno atómico se difunde en el hierro y forma un nitruro muy duro, especialmente en aceros aleados con Al y Cr.",
    },
  ],
};
