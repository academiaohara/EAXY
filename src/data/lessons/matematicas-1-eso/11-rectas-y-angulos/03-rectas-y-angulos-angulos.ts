import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_11_SUBTITLE } from "@/data/lessons/shared";

export const rectasYAngulosAngulosLesson: InteractiveLesson = {
  slug: "rectas-y-angulos-angulos",
  title: "3. Ángulos",
  subtitle: TEMA_1ESO_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "elementos",
      type: "slide",
      help: [
        {
          label: "¿Qué es la amplitud?",
          message: "Lo que se abren los lados. No depende de lo largos que dibujes los lados: las semirrectas no tienen fin.",
        },
        {
          label: "¿Cómo nombro un ángulo?",
          message: "Con tres letras, con el vértice en medio ($\\widehat{AOB}$), o con una letra griega, como $\\alpha$.",
        },
      ],
      title: "Un ángulo y sus elementos",
      blocks: [
        {
          kind: "definition",
          text: "Un **ángulo** es la región del plano que forman dos semirrectas que tienen el mismo origen.",
        },
        {
          kind: "facts",
          items: [
            { tex: "O", label: "vértice: origen de las semirrectas" },
            { tex: "OA,\\ OB", label: "lados: las dos semirrectas" },
            { tex: "\\alpha", label: "amplitud: abertura del ángulo" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "angulo-elementos" },
    },
    {
      id: "amplitud",
      type: "slide",
      help: [
        {
          label: "¿Qué pasa en 90° y en 180°?",
          message: "En $90^\\circ$ los lados son perpendiculares (como la esquina de una hoja). En $180^\\circ$ los lados forman una recta.",
        },
        {
          label: "¿Y los de más de 180°?",
          message: "Se llaman cóncavos. En 1.º ESO te centrarás sobre todo en agudos, rectos, obtusos, llanos y completos.",
        },
      ],
      title: "Tipos de ángulos según su amplitud",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "\\alpha < 90^\\circ", label: "agudo" },
            { tex: "\\alpha = 90^\\circ", label: "recto" },
            { tex: "90^\\circ < \\alpha < 180^\\circ", label: "obtuso" },
          ],
        },
        {
          kind: "facts",
          items: [
            { tex: "\\alpha = 180^\\circ", label: "llano" },
            { tex: "\\alpha = 360^\\circ", label: "completo" },
          ],
        },
        {
          kind: "text",
          text: "Abre y cierra el ángulo y observa cómo cambia de nombre.",
        },
      ],
      visual: { kind: "tool", tool: "angulo-explorador", params: { a: 40 } },
    },
    {
      id: "reloj",
      type: "predict",
      help: [
        {
          label: "¿Cuánto vale cada hora en el reloj?",
          message: "La esfera da una vuelta completa, $360^\\circ$, repartida en $12$ horas: cada hora son $30^\\circ$.",
        },
        {
          label: "Con las 4:00",
          message: "El minutero está en las 12 y la aguja de las horas en el 4: hay $4$ horas entre las dos, es decir, $4 \\cdot 30^\\circ$.",
        },
      ],
      title: "El ángulo de un reloj",
      question:
        "Un reloj de pared marca exactamente las 4:00. Con las dos agujas como lados, ¿qué tipo de ángulo forman?",
      mode: "choice",
      choices: [
        { id: "a", label: "Obtuso ($120^\\circ$)" },
        {
          id: "b",
          label: "Agudo",
          incorrectFeedback:
            "Un ángulo agudo mide menos de $90^\\circ$, que es lo que miden las agujas a las 3:00. A las 4:00 están más separadas.",
        },
        {
          id: "c",
          label: "Recto",
          incorrectFeedback:
            "Las agujas forman un ángulo recto a las 3:00 (o a las 9:00). A las 4:00 todavía se han abierto una hora más.",
        },
        {
          id: "d",
          label: "Llano",
          incorrectFeedback:
            "El ángulo llano ($180^\\circ$) es el de las 6:00, con las agujas en línea recta. A las 4:00 aún no han llegado ahí.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "Cada hora son $360^\\circ : 12 = 30^\\circ$, así que a las 4:00 hay $4 \\cdot 30^\\circ = 120^\\circ$: un ángulo **obtuso**.",
    },
    {
      id: "complementarios-suplementarios",
      type: "slide",
      help: [
        {
          label: "¿Cómo calculo el que falta?",
          message: "Complementario de $\\alpha$: $90^\\circ - \\alpha$. Suplementario de $\\alpha$: $180^\\circ - \\alpha$.",
        },
        {
          label: "¿Pueden ser complementarios dos ángulos obtusos?",
          message: "No: dos obtusos ya suman más de $180^\\circ$, y los complementarios suman solo $90^\\circ$.",
        },
      ],
      title: "Complementarios y suplementarios",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Complementarios",
            text: "Dos ángulos que **suman $90^\\circ$**.",
            math: ["26^\\circ + 64^\\circ = 90^\\circ"],
            tone: "key",
          },
          right: {
            title: "Suplementarios",
            text: "Dos ángulos que **suman $180^\\circ$**.",
            math: ["64^\\circ + 116^\\circ = 180^\\circ"],
            tone: "ok",
          },
        },
        {
          kind: "text",
          text: "Cambia el ángulo $\\alpha$ y fíjate en cómo se ajusta el otro para completar el total.",
        },
      ],
      visual: { kind: "tool", tool: "angulos-suma", params: { a: 64, b: 90 } },
    },
    {
      id: "consecutivos-opuestos",
      type: "slide",
      help: [
        {
          label: "¿Cómo distingo consecutivos y opuestos?",
          message: "Consecutivos: están **pegados** (comparten un lado). Opuestos por el vértice: están **enfrentados** (comparten solo el vértice).",
        },
        {
          label: "¿Por qué son iguales los opuestos?",
          message: "Cada uno es el suplementario del mismo ángulo vecino, y dos ángulos con el mismo suplementario tienen que ser iguales.",
        },
      ],
      title: "Consecutivos y opuestos por el vértice",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Consecutivos",
            text: "Tienen el **vértice y un lado en común**.",
            tone: "key",
          },
          right: {
            title: "Opuestos por el vértice",
            text: "Tienen el **vértice** en común y los lados de uno prolongan los del otro. Son **iguales**.",
            tone: "ok",
          },
        },
      ],
      visual: { kind: "anim", scene: "angulos-opuestos" },
    },
    {
      id: "complementario-64",
      type: "predict",
      help: [
        {
          label: "¿Qué suma tiene cada pareja?",
          message: "Complementarios suman $90^\\circ$ y suplementarios suman $180^\\circ$. Calcula cada resta por separado.",
        },
        {
          label: "Una comprobación",
          message: "El suplementario tiene que ser mayor que el complementario: le falta llegar a $180^\\circ$ en vez de a $90^\\circ$.",
        },
      ],
      title: "Complementario y suplementario",
      question:
        "Un ángulo de una rampa mide 64°. ¿Cuánto mide su ángulo complementario y cuánto su suplementario?",
      mode: "choice",
      choices: [
        { id: "a", label: "Complementario $26^\\circ$ y suplementario $116^\\circ$" },
        {
          id: "b",
          label: "Complementario $116^\\circ$ y suplementario $26^\\circ$",
          incorrectFeedback:
            "Has cambiado los nombres. El complementario completa $90^\\circ$ ($90 - 64 = 26$) y el suplementario completa $180^\\circ$ ($180 - 64 = 116$).",
        },
        {
          id: "c",
          label: "Complementario $26^\\circ$ y suplementario $26^\\circ$",
          incorrectFeedback:
            "Los dos no pueden valer lo mismo: uno completa hasta $90^\\circ$ y el otro hasta $180^\\circ$, así que el suplementario es $90^\\circ$ mayor.",
        },
        {
          id: "d",
          label: "Complementario $154^\\circ$ y suplementario $116^\\circ$",
          incorrectFeedback:
            "$154^\\circ$ no sale de $90 - 64$. El complementario es siempre menor que $90^\\circ$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "Complementario: $90^\\circ - 64^\\circ = 26^\\circ$. Suplementario: $180^\\circ - 64^\\circ = 116^\\circ$.",
    },
    {
      id: "cruce",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué ángulo piden?",
          message: "El que está **al lado** del de $50^\\circ$: comparten un lado, así que son consecutivos y suman un llano.",
        },
        {
          label: "¿Qué operación hago?",
          message: "Resta a $180^\\circ$ el ángulo que ya conoces.",
        },
      ],
      title: "Un cruce de calles",
      question:
        "Dos calles rectas se cruzan y uno de los cuatro ángulos que forman mide 50°. ¿Cuánto mide cada ángulo que está justo a su lado? (escribe solo el número)",
      correctAnswers: ["130", "130º", "130°"],
      hint: "Dos ángulos consecutivos entre dos rectas que se cortan completan un ángulo llano.",
      explanation: "$180^\\circ - 50^\\circ = 130^\\circ$. Y el opuesto del de $50^\\circ$ también mide $50^\\circ$.",
    },
  ],
};
