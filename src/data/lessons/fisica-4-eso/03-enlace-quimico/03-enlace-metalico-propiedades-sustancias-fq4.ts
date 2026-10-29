import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const enlaceMetalicoPropiedadesSustanciasFq4Lesson: InteractiveLesson = {
  slug: "enlace-metalico-propiedades-sustancias-fq4",
  title: "3. Enlace metálico y propiedades de las sustancias",
  subtitle: FQ4_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "El enlace metálico", [
      { kind: "steps", items: [
        "En un **metal**, los átomos tienen **pocos electrones de valencia** y **baja electronegatividad**: ceden sus electrones externos a un conjunto común.",
        "**Modelo del mar de electrones**: una red de **cationes** fijos inmersos en electrones **deslocalizados** que se mueven por todo el cristal.",
        "Explica sus propiedades: **conducen** la electricidad y el calor (los electrones se mueven), son **dúctiles y maleables** (los planos de cationes deslizan sin romper el enlace), tienen **brillo** y puntos de fusión **variables** (Hg líquido; W, 3400 °C).",
      ] },
    ], undefined, "stack"),
    slide("explora", "¿Qué sustancia es?", [
      { kind: "text", text: "Cambia los resultados de los ensayos y deduce el tipo de enlace. Prueba también los ejemplos." },
    ], tool("fq4-clasifica-sustancia-explorador"), "visual-top"),
    slide("tipos", "Cuatro tipos de sustancias", [
      { kind: "steps", items: [
        "**Iónicas** (NaCl): sólidos duros y frágiles, fusión **alta**, **no conducen en sólido** y **sí disueltas o fundidas**, suelen disolverse en agua.",
        "**Metálicas** (Cu, Fe): **conducen en sólido**, dúctiles, maleables, brillantes; no se disuelven en agua.",
        "**Covalentes moleculares** (H₂O, CO₂, azúcar): fusión y ebullición **bajas**, **no conducen**; solubilidad variable.",
        "**Covalentes reticulares** (diamante, SiO₂): **muy duras**, fusión **altísima**, **no conducen** (excepto el grafito) e insolubles.",
      ] },
    ]),
    sort("clasifica", "Tipo de sustancia", "Asocia cada sustancia con su tipo de enlace.",
      [["io", "Iónica", "amber"], ["me", "Metálica", "emerald"], ["mo", "Covalente molecular", "cobalt"], ["re", "Covalente reticular", "rose"]],
      [["Cloruro de sodio", "io"], ["Óxido de magnesio", "io"], ["Cobre", "me"], ["Hierro", "me"], ["Agua", "mo"], ["Dióxido de carbono", "mo"], ["Diamante", "re"], ["Cuarzo (SiO₂)", "re"]],
      "El tipo de enlace determina las propiedades.",
    ),
    calc("calc-gra", "Ensayos", "Una sustancia no conduce en estado sólido, sí conduce disuelta y funde a 800 °C. Escribe 1 si es iónica y 2 si es metálica.", nums(1), "Conduce solo cuando los iones se mueven: iónica.", "Los metales conducen también en sólido."),
    calc("calc-hg", "Dúctil o frágil", "Un cristal iónico se golpea y se rompe: los planos de iones se desplazan y se enfrentan cargas iguales, que se repelen. ¿Cómo es: dúctil (1) o frágil (2)?", nums(2), "Es frágil: se rompe en lugar de deformarse.", "Contrasta con los metales."),
    pick("check", "Metales y electricidad", "¿Por qué los metales conducen la electricidad en estado sólido?",
      "Porque tienen electrones deslocalizados que se mueven",
      [["Porque tienen iones libres", "Los cationes están fijos."], ["Porque son moléculas", "Forman redes."], ["Porque están fundidos", "Conducen en sólido."]],
      "El mar de electrones permite el paso de corriente.",
    ),
    pick("check2", "Diamante y grafito", "El diamante y el grafito son carbono puro. ¿Por qué el diamante no conduce y el grafito sí?",
      "Porque en el grafito hay electrones deslocalizados entre las capas",
      [["Porque el grafito es metálico", "Es covalente, con electrones deslocalizados."], ["Porque el diamante es líquido", "Es sólido."], ["Porque tienen distintos átomos", "Los dos son carbono."]],
      "La estructura determina las propiedades.",
    ),
  ],
};
