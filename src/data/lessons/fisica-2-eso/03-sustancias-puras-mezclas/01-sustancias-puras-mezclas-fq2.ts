import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const sustanciasPurasMezclasFq2Lesson: InteractiveLesson = {
  slug: "sustancias-puras-mezclas-fq2",
  title: "1. Sustancias puras y mezclas",
  subtitle: FQ2_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Clasificar la materia", [
      { kind: "steps", items: [
        "Toda la materia se puede clasificar en **sustancias puras** y **mezclas**.",
        "Una **sustancia pura** tiene **composición fija** y propiedades características (punto de fusión, de ebullición, densidad…).",
        "Una **mezcla** está formada por **varias sustancias** en **proporción variable**, y cada una conserva sus propiedades.",
        "Las sustancias puras pueden ser **elementos** o **compuestos**; las mezclas, **homogéneas** o **heterogéneas**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "¿Qué es cada material?", [
      { kind: "text", text: "Elige un material y sigue su camino en el esquema de clasificación." },
    ], tool("fq2-clasificacion-materia-explorador"), "visual-top"),
    slide("tipos", "Cuatro tipos", [
      { kind: "steps", items: [
        "**Elemento**: un solo tipo de átomo (oxígeno, hierro, oro). No se descompone en otras sustancias.",
        "**Compuesto**: varios elementos **unidos en proporción fija** (agua, sal común). Solo se separa por **reacciones químicas**.",
        "**Mezcla homogénea** (o **disolución**): se ve **una sola fase**; no se distinguen los componentes (aire, agua con sal).",
        "**Mezcla heterogénea**: se **distinguen** los componentes, en fases distintas (granito, arena en agua).",
      ] },
    ]),
    pick("check1", "Agua y mezcla", "¿Es el agua del mar una sustancia pura?",
      "No, es una mezcla homogénea de agua y sales",
      [["Sí, porque es transparente", "Que sea transparente no la hace pura."], ["Sí, porque es agua", "Lleva sales disueltas."], ["No, es una mezcla heterogénea", "No se distinguen sus componentes."]],
      "Tiene varias sustancias disueltas en proporción variable: es una disolución.",
    ),
    pick("check2", "Compuesto o mezcla", "¿En qué se diferencia un compuesto de una mezcla?",
      "El compuesto tiene composición fija y solo se separa por reacciones químicas",
      [["El compuesto se separa filtrando", "La filtración separa mezclas."], ["La mezcla tiene siempre la misma proporción", "Es al revés."], ["No hay diferencia", "Sí la hay."]],
      "En un compuesto los elementos están unidos químicamente en proporción fija.",
    ),
    sort("clasifica", "Clasifica los materiales", "Clasifica cada material.",
      [["pur", "Sustancia pura", "cobalt"], ["hom", "Mezcla homogénea", "amber"], ["het", "Mezcla heterogénea", "emerald"]],
      [["Oxígeno", "pur"], ["Agua destilada", "pur"], ["Aire", "hom"], ["Agua con sal disuelta", "hom"], ["Granito", "het"], ["Arena en agua", "het"]],
      "Una sustancia pura tiene un solo componente; las mezclas tienen varios.",
    ),
  ],
};
