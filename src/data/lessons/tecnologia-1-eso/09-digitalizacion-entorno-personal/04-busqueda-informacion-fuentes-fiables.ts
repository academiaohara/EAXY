import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const busquedaInformacionFuentesFiablesLesson: InteractiveLesson = {
  slug: "busqueda-informacion-fuentes-fiables",
  title: "4. Búsqueda de información y fuentes fiables",
  subtitle: TECESO1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("buscar", "Buscar bien", [
      { kind: "steps", items: [
        "**Piensa las palabras clave**: pocas y específicas («energía solar fotovoltaica» mejor que «cosas de energía»).",
        "**Usa operadores**: comillas para una frase exacta, el signo menos para excluir una palabra, «site:» para limitar a un sitio, «filetype:pdf» para un tipo de archivo.",
        "**Revisa varios resultados**, no solo el primero: los anuncios aparecen arriba.",
        "**Anota la fuente** de cada dato para poder citarla.",
      ] },
    ], undefined, "stack"),
    slide("operadores", "Afina una búsqueda", [
      { kind: "text", text: "Prueba a combinar palabras clave, frase exacta, exclusiones y filtros. Fíjate en cómo cambia la lista de resultados." },
    ], tool("busqueda-operadores-explorador"), "visual-top"),
    slide("fiable", "Evaluar una fuente", [
      { kind: "text", text: "Encontrar información no basta: hay que decidir si es fiable. Mira quién la publica, cuándo y qué intención tiene." },
    ], tool("fuente-fiable-explorador", { n: 0 }), "visual-top"),
    slide("bulos", "Bulos y noticias falsas", [
      { kind: "steps", items: [
        "Desconfía de titulares **alarmistas** o que provocan una reacción emocional inmediata.",
        "Comprueba si **otros medios fiables** cuentan lo mismo.",
        "Busca la **fecha** y la fuente original: muchas imágenes antiguas se presentan como actuales.",
        "No compartas lo que no hayas verificado: **reenviar un bulo también es difundirlo**.",
      ] },
    ]),
    sort("clasifica-busqueda", "¿Qué operador uso?", "Relaciona cada necesidad con el recurso de búsqueda más útil.",
      [["fra", "Frase exacta (comillas)", "cobalt"], ["exc", "Excluir una palabra (−)", "amber"], ["sit", "Limitar a un sitio o tipo de archivo", "emerald"]],
      [["Buscar exactamente «energía eólica marina»", "fra"], ["Buscar una cita literal", "fra"], ["Buscar «jaguar» pero sin resultados de coches", "exc"], ["Quitar los resultados comerciales de «paneles solares»", "exc"], ["Buscar solo informes en PDF", "sit"], ["Buscar solo en páginas de la administración", "sit"]],
      "Las comillas fijan la frase; el signo menos descarta términos; los filtros limitan el sitio o el tipo de archivo.",
    ),
    pick("check-primero", "El primer resultado", "El primer resultado de un buscador es un anuncio con «Los mejores paneles solares, ¡oferta!». ¿Qué haces?",
      "Lo identifico como publicidad y consulto también fuentes institucionales o educativas",
      [["Lo uso, porque sale el primero es el más fiable", "La posición no garantiza fiabilidad; puede ser publicidad."], ["Lo copio en el trabajo sin citar", "Hay que citar la fuente y contrastarla."], ["Dejo de buscar", "Una sola fuente comercial no basta."]],
      "El orden de los resultados depende de anuncios y algoritmos, no de la calidad de la información.",
    ),
  ],
};
