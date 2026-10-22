import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_3_SUBTITLE } from "@/data/lessons/shared";

export const residuosReciclajeLesson: InteractiveLesson = {
  slug: "residuos-reciclaje",
  title: "6. Residuos y reciclaje",
  subtitle: TEMA_TI2_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "tipos-residuos",
      type: "slide",
      help: [
        {
          label: "¿Por qué los RTP son más problemáticos?",
          message: "Por su volumen y composición no se pueden devolver a la naturaleza y dañan el medio ambiente y la salud de las personas. Proceden sobre todo de actividades industriales.",
        },
      ],
      title: "Dos grandes grupos de residuos",
      blocks: [
        {
          kind: "compare",
          left: { title: "RSU", text: "**Residuos sólidos urbanos**: los producen las grandes concentraciones humanas. Domésticos, industriales asimilables a urbanos, restos de construcción, objetos grandes.", tone: "info" },
          right: { title: "RTP", text: "**Residuos tóxicos y peligrosos**: de actividades industriales. Su tratamiento es mucho más problemático. Incluyen asimilables a urbanos, inertes y tóxicos y peligrosos.", tone: "warn" },
        },
        {
          kind: "text",
          text: "La civilización ha roto el ciclo natural de reciclaje: toma materias primas de un lugar y las traslada a otro, transformándolas en productos sintéticos para los que no existen microorganismos de descomposición.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "clasifica-residuos",
      type: "classify",
      help: [{ label: "Pista", message: "Los residuos urbanos vienen de hogares y comercios; los tóxicos y peligrosos, de procesos industriales." }],
      title: "RSU o RTP",
      question: "Clasifica cada residuo.",
      groups: [
        { id: "rsu", label: "RSU", tone: "cobalt" },
        { id: "rtp", label: "RTP", tone: "rose" },
      ],
      items: [
        { id: "a", text: "Restos de comida y envases domésticos", group: "rsu" },
        { id: "b", text: "Baños de cromatos de una industria de galvanizado", group: "rtp" },
        { id: "c", text: "Electrodomésticos y muebles desechados", group: "rsu" },
        { id: "d", text: "Aceites de engrase y aceites de limpieza de motores", group: "rtp" },
        { id: "e", text: "Baterías y pilas eléctricas industriales", group: "rtp" },
        { id: "f", text: "Restos de materiales de construcción", group: "rsu" },
      ],
      hint: "El origen manda: hogar y ciudad frente a industria.",
      explanation: "Los RSU son de origen doméstico y urbano; los RTP, industriales y peligrosos (disolventes, sales cianuradas, baterías…).",
    },
    {
      id: "tratamientos-rsu",
      type: "slide",
      help: [
        {
          label: "¿Qué tiene de malo incinerar plásticos?",
          message: "Los plásticos clorados producen ácido clorhídrico, que puede causar graves efectos de corrosión si la incineradora no está bien diseñada.",
        },
      ],
      title: "Tratamientos de los RSU",
      blocks: [
        {
          kind: "steps",
          items: [
            "**Vertedero controlado** compacta los residuos por capas, con drenaje de lixiviados y salida de gases.",
            "**Incineración** reduce al máximo el volumen, pero es cara y emite gases nocivos.",
            "**Compostaje** convierte la materia orgánica en humus, el «compost».",
            "**Metano** se recupera de la fermentación anaerobia para quemar o producir electricidad.",
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-metano",
      type: "predict",
      help: [{ label: "Fermentación anaerobia", message: "Se produce sin oxígeno, en un vertedero cerrado con materia orgánica." }],
      title: "Producción de metano",
      question: "La producción de metano es posible en el tratamiento de los residuos:",
      mode: "choice",
      choices: [
        { id: "org", label: "De materia orgánica por fermentación anaerobia" },
        { id: "plasticos", label: "De todo tipo de plásticos al realizar una combustión incompleta", incorrectFeedback: "La combustión de plásticos produce gases nocivos, no biogás." },
        { id: "solidos", label: "Sólidos cualesquiera, siempre que sea en un vertedero controlado", incorrectFeedback: "Solo se genera metano con materia orgánica que fermenta." },
      ],
      correctChoiceId: "org",
      shuffleChoices: true,
      explanation: "La descomposición anaerobia de la materia orgánica produce un gas rico en metano y CO₂ en proporciones parecidas.",
    },
    {
      id: "reciclado",
      type: "slide",
      help: [
        {
          label: "¿Por qué reciclar aluminio aunque sea el 1 %?",
          message: "Porque su valor es alto y reciclarlo ahorra mucha energía: producir aluminio nuevo cuesta mucha más que fundirlo de nuevo.",
        },
      ],
      title: "Reciclado de materiales",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "25\\,\\%", label: "papel: el más rentable para reciclar" },
            { tex: "5\\,\\%", label: "vidrio: ahorro energético" },
            { tex: "< 1\\,\\%", label: "aluminio: pero de gran valor" },
            { tex: "8\\text{–}10\\,\\%", label: "plásticos de los RSU" },
          ],
        },
        {
          kind: "warning",
          text: "El principal problema del reciclaje de plásticos es la **heterogeneidad** de su composición. Solo son reciclables mecánicamente los termoestables, una vez triturados, como relleno en pavimentación.",
        },
        {
          kind: "text",
          text: "La **recogida selectiva** en los hogares es mucho más racional que separar los materiales después en plantas, que es caro y presenta muchos problemas.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "rtp-tratamientos",
      type: "slide",
      help: [
        {
          label: "¿Qué es el PCI?",
          message: "El poder calorífico inferior: lo que da un residuo al quemarse. Si es comparable al de un combustible convencional, se incinera directamente; si es bajo, hace falta un combustible de apoyo (fuel).",
        },
      ],
      title: "Gestión de los RTP",
      blocks: [
        {
          kind: "steps",
          title: "Tres sistemas básicos",
          items: [
            "**Incineración**: por encima de $900$ °C en medio oxidante; se recupera el calor de los humos. Lleva cámaras de poscombustión y lavadores de gases.",
            "**Tratamiento físico-químico**: neutralización de baños ácidos y alcalinos, que deja lodos.",
            "**Depósito de seguridad**: vertedero impermeabilizado para residuos que ya no se pueden tratar.",
          ],
        },
        {
          kind: "text",
          text: "Elige una comunidad autónoma y compara cómo reparte sus RTP entre los cuatro métodos con la media nacional.",
        },
      ],
      visual: { kind: "tool", tool: "rtp-comunidades", params: { a: 8 } },
    },
    {
      id: "check-deposito-mayor",
      type: "predict",
      help: [{ label: "Mira la barra nacional", message: "En la segunda barra, la del total, el color naranja es el depósito de seguridad." }],
      title: "El método más usado",
      question: "A escala nacional, ¿qué método recibe más RTP?",
      mode: "choice",
      choices: [
        { id: "deposito", label: "Depósito de seguridad (949 258 t/año)" },
        { id: "fisquim", label: "Tratamiento físico-químico (544 015 t/año)", incorrectFeedback: "Es el segundo, pero queda por debajo del depósito." },
        { id: "inc", label: "Incineración (245 187 t/año)", incorrectFeedback: "Es el tercero, muy por debajo." },
      ],
      correctChoiceId: "deposito",
      shuffleChoices: true,
      explanation: "El depósito de seguridad se lleva más de la mitad ($949\\,258/1\\,807\\,573 = 52{,}5\\,\\%$) del total.",
    },
    {
      id: "deposito",
      type: "slide",
      help: [
        {
          label: "¿Qué es un lixiviado?",
          message: "El líquido que se forma al atravesar el agua de lluvia los residuos y arrastrar sustancias contaminantes.",
        },
      ],
      title: "El depósito de seguridad por dentro",
      blocks: [
        {
          kind: "definition",
          text: "Un **depósito de seguridad** es un vertedero emplazado sobre terrenos geológicos estables, destinado a almacenar RTP de modo que sus propiedades nocivas **no afecten al medio natural ni a la salud** durante muchos años.",
        },
        {
          kind: "text",
          text: "Su función es **impermeabilizar** los residuos durante extensos periodos de tiempo, dada la toxicidad y la persistencia que tienen.",
        },
      ],
      visual: { kind: "anim", scene: "deposito-seguridad", beatMs: 4200 },
    },
    {
      id: "check-deposito",
      type: "predict",
      help: [{ label: "Impermeabilidad", message: "La finalidad es que los residuos y sus lixiviados no lleguen al suelo ni al agua subterránea." }],
      title: "Qué es un depósito de seguridad",
      question: "Un depósito de seguridad para el tratamiento de residuos tóxicos y peligrosos es:",
      mode: "choice",
      choices: [
        { id: "imper", label: "Una instalación impermeabilizada y emplazada sobre terrenos geológicamente estables" },
        { id: "acero", label: "Un contenedor de acero revestido de plástico para que no se oxide", incorrectFeedback: "No es un contenedor: es un vertedero con capas de arcilla, drenaje y geomembrana." },
        { id: "hormigon", label: "Un contenedor de hormigón armado revestido de plomo", incorrectFeedback: "Esa no es la solución habitual para RTP." },
      ],
      correctChoiceId: "imper",
      shuffleChoices: true,
      explanation: "Se compacta el fondo, se colocan $50$ cm de arcilla de permeabilidad inferior a $10^{-9}$ m/s, una capa filtrante, la geomembrana de polietileno y las redes de drenaje de lixiviados.",
    },
  ],
};
