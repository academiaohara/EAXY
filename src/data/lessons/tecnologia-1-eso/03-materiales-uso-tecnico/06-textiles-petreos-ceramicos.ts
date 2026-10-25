import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const textilesPetreosCeramicosLesson: InteractiveLesson = {
  slug: "textiles-petreos-ceramicos",
  title: "6. Materiales textiles, pétreos y cerámicos",
  subtitle: TECESO1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("textiles", "Textiles: de la fibra al tejido", [
      { kind: "definition", text: "Los materiales **textiles** se fabrican con **fibras** que se **hilan** para obtener hilos y después se **tejen** (o se trenzan o se pegan) para formar telas." },
      { kind: "compare",
        left: { title: "Fibras naturales", text: "**Algodón** y lino (vegetales), **lana** (animal), **seda** (animal). Transpirables, pero se arrugan o encogen.", tone: "key" },
        right: { title: "Fibras sintéticas", text: "**Poliéster**, nailon y elastano, fabricados con derivados del petróleo. Resistentes y baratas, pero poco transpirables y contaminantes.", tone: "info" } },
    ], undefined, "stack"),
    slide("petreos", "Pétreos: la piedra y sus derivados", [
      { kind: "steps", items: [
        "**Piedra natural**: granito, mármol, pizarra, caliza. Se corta y se pule. Muy duras y duraderas, pero pesadas y caras.",
        "**Cemento**: polvo que se obtiene de caliza y arcilla cocidas. Mezclado con agua, **fragua** y se endurece.",
        "**Mortero**: cemento, arena y agua. Une ladrillos y revoca paredes.",
        "**Hormigón**: cemento, arena, grava y agua. Resiste mucho a la **compresión**. Con varillas de acero en su interior se llama **hormigón armado**.",
      ] },
    ]),
    slide("ceramicos", "Cerámicos y vidrio", [
      { kind: "steps", items: [
        "**Cerámicas**: se amasa arcilla con agua, se **moldea** y se **cuece** en un horno. Ladrillos, tejas, azulejos, porcelana.",
        "**Vidrio**: se obtiene al fundir arena de sílice con sosa y cal. Es transparente, duro, aislante y reciclable, pero frágil.",
      ] },
      { kind: "warning", title: "Ojo", text: "Los materiales cerámicos y el vidrio resisten muy bien el calor y la compresión, pero son **frágiles**: no soportan bien los golpes ni la tracción." },
    ]),
    slide("ensayo", "Prueba los materiales", [
      { kind: "text", text: "Compara cómo se comportan el vidrio, el ladrillo, el granito y la tela de algodón ante las cinco pruebas." },
    ], tool("ensayo-material-explorador", { n: 4 }), "visual-top"),
    sort("clasifica-mat", "¿De qué grupo es?", "Clasifica cada material en su familia.",
      [["tex", "Textil", "emerald"], ["pet", "Pétreo", "cobalt"], ["cer", "Cerámico y vidrio", "amber"]],
      [["Algodón", "tex"], ["Lana", "tex"], ["Poliéster", "tex"], ["Granito", "pet"], ["Mármol", "pet"], ["Hormigón", "pet"], ["Ladrillo", "cer"], ["Porcelana", "cer"], ["Vidrio", "cer"]],
      "Los textiles se hilan y tejen; los pétreos son piedra o derivados como el hormigón; los cerámicos y el vidrio se cuecen o funden a altas temperaturas.",
    ),
    pick("check-hormigon", "Hormigón armado", "¿Por qué se mete una malla de acero dentro del hormigón?",
      "Porque el hormigón resiste muy bien la compresión pero poco la tracción, y el acero la compensa",
      [["Para que sea más ligero", "El acero es más pesado que el hormigón."], ["Para que sea más bonito", "La malla queda oculta; su función es resistente."], ["Para que fragüe antes", "No tiene relación con el fraguado."]],
      "El acero aguanta la tracción que el hormigón no soporta; juntos forman un material muy resistente.",
    ),
    pick("check-fibra", "Fibra natural o sintética", "Una camiseta de verano se quiere transpirable y fabricada con una fibra de origen vegetal. ¿Qué eliges?",
      "Algodón",
      [["Poliéster", "Es sintético y poco transpirable."], ["Lana", "Es de origen animal y muy cálida."], ["Nailon", "Es sintético, derivado del petróleo."]],
      "El algodón es una fibra vegetal, fresca y transpirable.",
    ),
  ],
};
