import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const metodoCientificoFq2Lesson: InteractiveLesson = {
  slug: "metodo-cientifico-fq2",
  title: "1. El método científico",
  subtitle: FQ2_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Preguntar y comprobar", [
      { kind: "steps", items: [
        "La **ciencia** busca **explicar** los fenómenos naturales con ideas que se puedan **comprobar**.",
        "El **método científico** es el camino ordenado que se sigue: **observar**, **plantear una hipótesis**, **experimentar**, **analizar los datos** y **sacar conclusiones**.",
        "No es una receta rígida: los científicos **vuelven atrás**, corrigen y repiten.",
        "Una idea que no se puede comprobar con observaciones o experimentos no es una hipótesis científica.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Las etapas del método", [
      { kind: "text", text: "Sigue cada etapa y fíjate en que, si la hipótesis no se confirma, el proceso vuelve a empezar." },
    ], anim("fq2-metodo-cientifico"), "visual-top"),
    slide("variables", "Experimentar con control", [
      { kind: "text", text: "Cambia la masa de agua y la potencia del fogón y observa cuánto tarda en hervir. ¿Qué pasa si cambias las dos a la vez?" },
    ], tool("fq2-experimento-variables-explorador"), "visual-top"),
    slide("tipos", "Las variables", [
      { kind: "steps", items: [
        "**Variable independiente**: la que **tú cambias** a propósito (por ejemplo, la masa de agua).",
        "**Variable dependiente**: la que **mides** como resultado (por ejemplo, el tiempo que tarda en hervir).",
        "**Variables controladas**: las que **mantienes iguales** para que no alteren el resultado (la temperatura inicial, el recipiente…).",
        "Un buen experimento se **repite** varias veces para comprobar que el resultado no es casualidad.",
      ] },
    ]),
    pick("hip", "¿Es una hipótesis?", "¿Cuál de estas frases es una hipótesis científica?",
      "Si aumento la masa de agua, tardará más en hervir",
      [["El agua hirviendo es bonita", "Es una opinión, no se puede comprobar."], ["¿Cuánto tarda en hervir el agua?", "Es una pregunta, no una explicación."], ["El agua siempre hierve a la hora de comer", "No se puede comprobar de forma objetiva."]],
      "Una hipótesis es una explicación o predicción que se puede comprobar con un experimento.",
    ),
    sort("clasifica", "Tipo de variable", "En un experimento se estudia cómo influye la cantidad de luz en el crecimiento de una planta. Clasifica cada elemento.",
      [["ind", "Independiente", "cobalt"], ["dep", "Dependiente", "amber"], ["con", "Controlada", "emerald"]],
      [["Horas de luz al día", "ind"], ["Altura de la planta", "dep"], ["Cantidad de agua", "con"], ["Tipo de tierra", "con"], ["Número de hojas", "dep"], ["Cambiar la lámpara por una más potente", "ind"]],
      "La independiente es la que cambias; la dependiente, la que mides; las controladas, las que no cambian.",
    ),
    pick("check", "Orden de las etapas", "¿Qué etapa va justo después de plantear una hipótesis?",
      "Diseñar un experimento para comprobarla",
      [["Sacar la conclusión", "Todavía no hay datos."], ["Observar el fenómeno", "Eso va antes de la hipótesis."], ["Comunicar los resultados", "Eso se hace al final."]],
      "Tras la hipótesis se diseña un experimento que permita comprobarla o rechazarla.",
    ),
  ],
};
