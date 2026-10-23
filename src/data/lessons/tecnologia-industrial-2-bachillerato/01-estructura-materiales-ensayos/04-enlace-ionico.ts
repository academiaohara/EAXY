import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_1_SUBTITLE } from "@/data/lessons/shared";

export const enlaceIonicoLesson: InteractiveLesson = {
  slug: "enlace-ionico",
  title: "4. Enlace iónico",
  subtitle: TEMA_TI2_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "formacion",
      type: "slide",
      help: [
        {
          label: "¿Primarios y secundarios?",
          message: "Los enlaces **primarios** (iónico, covalente y metálico) son fuertes; los **secundarios** (Van der Waals, puente de hidrógeno) son débiles. Los veremos todos en esta unidad.",
        },
      ],
      title: "Un electrón cambia de dueño",
      blocks: [
        {
          kind: "definition",
          text: "**Enlace iónico**: se forma entre átomos muy **electropositivos** (metálicos) y muy **electronegativos** (no metálicos). Uno **transfiere** electrones al otro.",
        },
        {
          kind: "steps",
          title: "Cloruro de sodio, NaCl",
          items: [
            "El sodio cede su único electrón externo ($3s^1$).",
            "El cloro lo acepta y completa su capa ($3p^5 \\to 3p^6$).",
            "Quedan los iones $Na^+$ y $Cl^-$, con gas noble como configuración.",
            "Se atraen por fuerzas **electrostáticas** (de Coulomb): baja la energía y se forma el enlace.",
          ],
        },
      ],
      visual: { kind: "anim", scene: "ion-nacl", beatMs: 5200 },
    },
    {
      id: "tamano",
      type: "slide",
      help: [
        {
          label: "¿Por qué el catión se encoge?",
          message: "Al perder la capa externa baja la relación electrón/protón: el núcleo, más positivo en proporción, atrae más fuerte a la nube. El anión hace lo contrario: gana un electrón y se repelen más entre sí.",
        },
      ],
      title: "Los iones cambian de tamaño",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Catión (Na⁺)",
            text: "**Menor** que su átomo: pierde electrones y el núcleo atrae más fuerte la nube restante.",
            tone: "key",
          },
          right: {
            title: "Anión (Cl⁻)",
            text: "**Mayor** que su átomo: gana un electrón y aumenta la repulsión entre electrones.",
            tone: "info",
          },
        },
        {
          kind: "text",
          text: "En el cristal, la atracción actúa en **todas las direcciones**: el enlace iónico es **no direccional**. Cada ion se rodea de iones de signo contrario y la red se extiende.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-tamano",
      type: "predict",
      help: [{ label: "Pista", message: "El sodio pierde su capa más externa." }],
      title: "El ion sodio",
      question: "Cuando un átomo de sodio se convierte en el ion $Na^+$, su tamaño:",
      mode: "choice",
      choices: [
        { id: "menor", label: "Se reduce, porque pierde su capa externa y el núcleo atrae más a la nube" },
        { id: "mayor", label: "Aumenta, porque tiene más carga", incorrectFeedback: "Tiene más carga neta positiva, pero ha perdido una capa: se encoge." },
        { id: "igual", label: "No cambia", incorrectFeedback: "El radio cambia mucho: es el ion más pequeño." },
      ],
      correctChoiceId: "menor",
      shuffleChoices: true,
      explanation: "En la ionización el átomo se reduce al formar cationes y crece al formar aniones.",
    },
    {
      id: "propiedades",
      type: "slide",
      help: [
        {
          label: "Energías típicas",
          message: "Entre $145$ y $370$ kcal/mol (Tabla 1.3). Algunos óxidos, como el CaO ($846$ kcal/mol), superan ese intervalo por tener iones con doble carga.",
        },
      ],
      title: "Propiedades de los cristales iónicos",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "En estado sólido",
            text: "Duros y frágiles, con temperatura de fusión alta. **Aislantes** eléctricos y térmicos: los iones están fijos en la red.",
            tone: "info",
          },
          right: {
            title: "Fundidos o en disolución",
            text: "**Conducen** la electricidad: los iones quedan libres y pueden moverse.",
            tone: "ok",
          },
        },
        {
          kind: "facts",
          items: [
            { tex: "\\text{NaCl}:\\ 153\\ \\text{kcal/mol}", label: "fusión a 801 °C" },
            { tex: "\\text{MgO}:\\ 239\\ \\text{kcal/mol}", label: "fusión a 2 800 °C" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-conduccion",
      type: "predict",
      help: [{ label: "Pista", message: "Para conducir la corriente hacen falta cargas que se puedan mover." }],
      title: "¿Conduce un cristal de sal?",
      question: "Los cristales iónicos, en condiciones ordinarias de presión y temperatura, ¿conducen la corriente eléctrica?",
      mode: "choice",
      choices: [
        { id: "no", label: "No, porque los iones están empaquetados y es imposible su movimiento" },
        { id: "si", label: "Sí, porque existe una gran movilidad en los iones que componen el cristal", incorrectFeedback: "En el sólido los iones ocupan posiciones fijas." },
        { id: "exceso", label: "Sí, porque tienen exceso de cargas eléctricas negativas", incorrectFeedback: "El cristal es neutro: hay tantas cargas positivas como negativas." },
      ],
      correctChoiceId: "no",
      shuffleChoices: true,
      explanation: "En estado sólido los iones no se mueven y el cristal es aislante. Fundido o disuelto, sí conduce.",
    },
    {
      id: "clasifica-estado",
      type: "classify",
      help: [{ label: "Pista", message: "¿Se pueden mover los iones? Si no, es aislante." }],
      title: "Sólido o disuelto",
      question: "Reparte las frases sobre un compuesto iónico.",
      groups: [
        { id: "solido", label: "Cristal sólido", tone: "cobalt" },
        { id: "disuelto", label: "Fundido o disuelto", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Aislante eléctrico", group: "solido" },
        { id: "b", text: "Conduce la corriente", group: "disuelto" },
        { id: "c", text: "Los iones ocupan posiciones fijas en la red", group: "solido" },
        { id: "d", text: "Los iones pueden desplazarse libremente", group: "disuelto" },
        { id: "e", text: "Duro y frágil", group: "solido" },
        { id: "f", text: "Transporta la carga con los iones", group: "disuelto" },
      ],
      hint: "La conducción iónica necesita iones móviles.",
      explanation: "En el sólido, los iones están atrapados en la red; al fundir o disolver, se liberan.",
    },
    {
      id: "check-fusion-ionica",
      type: "predict",
      help: [{ label: "Pista", message: "Compara las energías de enlace: $153$ y $239$ kcal/mol." }],
      title: "NaCl o MgO",
      question: "El MgO tiene mayor energía de enlace que el NaCl. ¿Cuál de los dos sólidos se funde a mayor temperatura?",
      mode: "choice",
      choices: [
        { id: "mgo", label: "El MgO (2 800 °C)" },
        { id: "nacl", label: "El NaCl (801 °C)", incorrectFeedback: "Tiene la menor energía de enlace y, por tanto, la menor temperatura de fusión." },
        { id: "igual", label: "Los dos igual", incorrectFeedback: "Distinta energía de enlace da distinta temperatura de fusión." },
      ],
      correctChoiceId: "mgo",
      shuffleChoices: true,
      explanation: "Más energía de enlace, más calor para romper la red: $T_f$(MgO) = $2\\,800$ °C frente a $801$ °C del NaCl.",
    },
  ],
};
