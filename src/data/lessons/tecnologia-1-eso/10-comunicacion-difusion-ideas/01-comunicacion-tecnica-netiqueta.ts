import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const comunicacionTecnicaNetiquetaLesson: InteractiveLesson = {
  slug: "comunicacion-tecnica-netiqueta",
  title: "1. Comunicación técnica y etiqueta digital",
  subtitle: TECESO1_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("tecnico", "Hablar y escribir con precisión", [
      { kind: "definition", text: "La **comunicación técnica** transmite ideas, medidas e instrucciones de forma clara y sin ambigüedades para que otras personas puedan entenderlas, fabricar o reproducir lo que se explica." },
      { kind: "steps", items: [
        "Usa el **vocabulario técnico** adecuado: «atornillar» no es lo mismo que «clavar»; «resistencia» no es lo mismo que «dureza».",
        "Incluye **datos concretos** (medidas, cantidades, unidades).",
        "Ordena la información: objetivo, materiales, pasos, resultado.",
        "Acompaña el texto de **dibujos, esquemas o fotos**.",
      ] },
    ], undefined, "stack"),
    slide("netiqueta", "La etiqueta digital (netiqueta)", [
      { kind: "steps", items: [
        "**Respeto**: se debate con argumentos, sin insultos ni burlas.",
        "**Claridad**: asunto explícito en el correo, saludo y despedida, sin MAYÚSCULAS continuas.",
        "**Privacidad**: pide permiso antes de compartir fotos o datos de otras personas.",
        "**Verificación**: comprueba lo que reenvías.",
        "**Tiempo y lugar**: respeta los horarios y los canales de la clase.",
      ] },
    ]),
    slide("practica", "¿Adecuado o inadecuado?", [
      { kind: "text", text: "Decide si cada comportamiento en línea respeta la etiqueta digital." },
    ], tool("situaciones-digitales-explorador", { n: 2 }), "visual-top"),
    sort("clasifica-mensaje", "Mensaje claro o confuso", "Clasifica cada texto de un grupo de trabajo.",
      [["cla", "Claro y técnico", "emerald"], ["con", "Confuso", "rose"]],
      [["«Cortar 4 listones de 50 cm de pino de 2 × 5 cm».", "cla"], ["«Montar la estructura con tornillos de 4 × 40 mm».", "cla"], ["«Pon eso ahí, como lo otro».", "con"], ["«Haz la cosa con un poco de madera».", "con"]],
      "Un mensaje técnico indica qué, cuánto y cómo; la imprecisión provoca errores en el taller.",
    ),
    pick("check-correo", "Un correo al profesor", "Quieres preguntar una duda a tu profesor por correo. ¿Cuál es la mejor forma de empezar?",
      "Con un asunto claro, un saludo educado y la pregunta concreta",
      [["Sin asunto y con el mensaje «ayuda»", "Un mensaje sin contexto no se puede responder bien."], ["Todo en mayúsculas para que se note", "Se lee como un grito."], ["Con un chat de varios compañeros a las 3 de la madrugada", "Hay que respetar canales y horarios."]],
      "Un asunto claro, un saludo y una pregunta concreta facilitan la respuesta.",
    ),
  ],
};
