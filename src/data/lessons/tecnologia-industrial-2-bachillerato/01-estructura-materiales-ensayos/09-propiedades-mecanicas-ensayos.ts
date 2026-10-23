import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_1_SUBTITLE } from "@/data/lessons/shared";

export const propiedadesMecanicasEnsayosLesson: InteractiveLesson = {
  slug: "propiedades-mecanicas-ensayos",
  title: "9. Propiedades mecánicas y tipos de ensayos",
  subtitle: TEMA_TI2_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "elastica-plastica",
      type: "slide",
      help: [
        {
          label: "¿Y la anelasticidad?",
          message: "Es un comportamiento elástico que depende del tiempo: el material tarda en recuperar su forma tras quitar la carga.",
        },
      ],
      title: "Deformación elástica y plástica",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Elástica",
            text: "Al cesar la fuerza, el material **recupera** sus dimensiones. Los átomos se desplazan, pero sin pasar a otras posiciones.",
            tone: "ok",
          },
          right: {
            title: "Plástica",
            text: "Si se llega a un punto en que no se recuperan las medidas originales, la deformación es **permanente**.",
            tone: "warn",
          },
        },
        {
          kind: "text",
          text: "La carga que separa ambas zonas es el **límite elástico**.",
        },
      ],
      visual: { kind: "anim", scene: "elastico-plastico", beatMs: 5400 },
    },
    {
      id: "clasifica-deformacion",
      type: "classify",
      help: [{ label: "Pista", message: "¿Vuelve a su forma original al soltar? Elástica. ¿Queda deformado? Plástica." }],
      title: "¿Elástica o plástica?",
      question: "Clasifica cada situación.",
      groups: [
        { id: "elastica", label: "Deformación elástica", tone: "emerald" },
        { id: "plastica", label: "Deformación plástica", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Estiras un poco un muelle y vuelve a su longitud", group: "elastica" },
        { id: "b", text: "Un clip se abre demasiado y no recupera su forma", group: "plastica" },
        { id: "c", text: "Una chapa de aluminio queda curvada tras doblarla", group: "plastica" },
        { id: "d", text: "Una regla de acero se flexiona y recupera la recta", group: "elastica" },
        { id: "e", text: "Un alambre se estira hasta quedar más largo", group: "plastica" },
        { id: "f", text: "Los átomos regresan a sus posiciones originales", group: "elastica" },
      ],
      hint: "Fíjate en si el efecto desaparece al quitar la fuerza.",
      explanation: "Si la deformación desaparece al retirar la carga es elástica; si queda, ya se ha rebasado el límite elástico.",
    },
    {
      id: "check-muelle",
      type: "predict",
      help: [{ label: "Pista", message: "Después de estirar ligeramente un muelle, vuelve a su forma." }],
      title: "El muelle del bolígrafo",
      question: "Si después de estirar ligeramente un muelle este vuelve a su posición y forma inicial, ha experimentado:",
      mode: "choice",
      choices: [
        { id: "elastica", label: "Una deformación elástica" },
        { id: "plastica", label: "Una deformación plástica", incorrectFeedback: "La plástica deja la pieza deformada: el muelle no habría vuelto." },
        { id: "mecanica", label: "Una deformación mecánica", incorrectFeedback: "No es un tipo de deformación: ambas, elástica y plástica, son mecánicas." },
      ],
      correctChoiceId: "elastica",
      shuffleChoices: true,
      explanation: "Al volver a su forma inicial, la deformación ha sido elástica.",
    },
    {
      id: "propiedades",
      type: "slide",
      help: [
        {
          label: "¿Físicas o químicas?",
          message: "Todas las propiedades de los materiales son físicas o químicas. Las químicas afectan a la estructura y composición; las físicas son todas las demás, entre ellas las mecánicas y las tecnológicas.",
        },
      ],
      title: "Propiedades mecánicas más importantes",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "\\text{Cohesión}", label: "resistencia de los átomos a separarse" },
            { tex: "\\text{Dureza}", label: "resistencia a ser rayado o penetrado" },
            { tex: "\\text{Tenacidad}", label: "resistencia a la rotura por fuerzas exteriores" },
            { tex: "\\text{Fragilidad}", label: "lo opuesto a la tenacidad: casi no hay zona plástica" },
            { tex: "\\text{Resiliencia}", label: "energía absorbida en una rotura por impacto" },
            { tex: "\\text{Fatiga}", label: "resistencia a esfuerzos repetidos" },
          ],
        },
        {
          kind: "text",
          text: "**Plasticidad**: si se presenta en forma de láminas, se llama **maleabilidad**; en forma de filamentos, **ductilidad**.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-dureza-cohesion",
      type: "predict",
      help: [{ label: "Pista", message: "La dureza depende de la cohesión atómica." }],
      title: "Qué mide la dureza",
      question: "Mediante la determinación de la dureza estamos valorando la propiedad:",
      mode: "choice",
      choices: [
        { id: "cohesion", label: "Cohesión" },
        { id: "elasticidad", label: "Elasticidad", incorrectFeedback: "La elasticidad se estudia en el ensayo de tracción, no en el de dureza." },
        { id: "plasticidad", label: "Plasticidad", incorrectFeedback: "La plasticidad es la capacidad de deformarse permanentemente: se estudia en tracción o plegado." },
      ],
      correctChoiceId: "cohesion",
      shuffleChoices: true,
      explanation: "La dureza depende de la cohesión atómica: lo que cuesta separar o desplazar los átomos.",
    },
    {
      id: "ensayos",
      type: "slide",
      help: [
        {
          label: "¿Por qué hay tantos ensayos?",
          message: "Porque cada uno responde una pregunta distinta: cómo se rompe, cómo se deforma, qué contiene, cómo es por dentro… Se clasifican según tres criterios.",
        },
      ],
      title: "Cómo se clasifican los ensayos",
      blocks: [
        {
          kind: "compare",
          left: {
            title: "Técnicos de control",
            text: "Durante la producción: **rápidos y simples**, pero exactos, fieles y sensibles.",
            tone: "info",
          },
          right: {
            title: "Científicos",
            text: "Para investigar materiales nuevos: gran **precisión** y fidelidad; no importa la rapidez.",
            tone: "key",
          },
        },
        {
          kind: "compare",
          left: {
            title: "Destructivos",
            text: "El material **altera su forma** o presentación inicial.",
            tone: "warn",
          },
          right: {
            title: "No destructivos",
            text: "El material **conserva** su forma y presentación inicial.",
            tone: "ok",
          },
        },
        {
          kind: "steps",
          title: "Según el método",
          items: [
            "**Químicos**: composición cualitativa y cuantitativa y comportamiento frente a agentes químicos.",
            "**Metalográficos**: estructura interna con el microscopio metalográfico.",
            "**Físicos y físico-químicos**: densidad, punto de fusión, calor específico, conductividad…",
            "**Mecánicos**: tracción, compresión, cizalladura, flexión, torsión, dureza, choque, fatiga…",
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "clasifica-ensayos",
      type: "classify",
      help: [{ label: "Pista", message: "Si hay que romper la probeta o dañarla, es destructivo. Rayos X, ultrasonidos y líquidos penetrantes dejan la pieza intacta." }],
      title: "Destructivo o no",
      question: "Clasifica cada ensayo.",
      groups: [
        { id: "destructivo", label: "Destructivo", tone: "rose" },
        { id: "nodestructivo", label: "No destructivo", tone: "emerald" },
      ],
      items: [
        { id: "a", text: "Ensayo de tracción hasta romper la probeta", group: "destructivo" },
        { id: "b", text: "Líquidos penetrantes para ver grietas externas", group: "nodestructivo" },
        { id: "c", text: "Rayos X para detectar grietas internas", group: "nodestructivo" },
        { id: "d", text: "Ensayo de choque con el péndulo de Charpy", group: "destructivo" },
        { id: "e", text: "Ultrasonidos para localizar defectos", group: "nodestructivo" },
        { id: "f", text: "Ensayo de fatiga hasta la rotura", group: "destructivo" },
      ],
      hint: "¿Queda la pieza utilizable después del ensayo?",
      explanation: "Los ensayos no destructivos (END) permiten inspeccionar piezas que luego siguen en servicio.",
    },
    {
      id: "check-control",
      type: "predict",
      help: [{ label: "Pista", message: "Se hace en la fábrica, mientras se produce." }],
      title: "Ensayo en la línea de producción",
      question: "Una fábrica comprueba cada hora la dureza de piezas recién salidas del horno. Es un ensayo:",
      mode: "choice",
      choices: [
        { id: "control", label: "Técnico de control: rápido, simple y suficientemente exacto" },
        { id: "cientifico", label: "Científico: máxima precisión sin importar el tiempo", incorrectFeedback: "Los científicos se hacen para investigar materiales nuevos, no para controlar una producción." },
        { id: "quimico", label: "Químico: analiza la composición", incorrectFeedback: "La dureza es una propiedad mecánica, no una medida de composición." },
      ],
      correctChoiceId: "control",
      shuffleChoices: true,
      explanation: "Durante la producción se necesitan ensayos de control, que sean rápidos y a la vez fiables.",
    },
  ],
};
