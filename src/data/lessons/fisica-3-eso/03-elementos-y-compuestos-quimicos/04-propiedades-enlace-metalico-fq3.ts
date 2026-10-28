import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const propiedadesEnlaceMetalicoFq3Lesson: InteractiveLesson = {
  slug: "propiedades-enlace-metalico-fq3",
  title: "4. Enlace metálico y propiedades de las sustancias",
  subtitle: FQ3_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "El enlace metálico", [
      { kind: "steps", items: [
        "En un **metal**, los átomos ceden sus electrones de valencia, que quedan **libres** formando un «**mar de electrones**».",
        "Los **cationes** metálicos se colocan en una red y los electrones circulan entre ellos: ese conjunto es el **enlace metálico**.",
        "Por eso los metales son buenos **conductores** del calor y de la electricidad, **brillantes**, **dúctiles** y **maleables**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "El enlace decide las propiedades", [
      { kind: "text", text: "Compara los cuatro tipos de sustancia: punto de fusión, conductividad y aspecto." },
    ], tool("fq3-propiedades-enlace-explorador"), "visual-top"),
    slide("resumen", "Resumen", [
      { kind: "steps", items: [
        "**Iónicas**: sólidas, puntos de fusión **altos**; conducen **disueltas o fundidas**; suelen ser solubles en agua.",
        "**Covalentes moleculares**: puntos de fusión **bajos**; **no conducen**.",
        "**Covalentes reticulares** (diamante, cuarzo): **durísimas**, fusión **muy alta**, no conducen.",
        "**Metálicas**: conducen en estado **sólido**; son dúctiles, maleables e insolubles en agua.",
      ] },
    ]),
    sort("clasifica", "Tipo de sustancia", "Asocia cada propiedad con la sustancia más probable.",
      [["io", "Iónica", "amber"], ["mo", "Molecular", "cobalt"], ["me", "Metálica", "emerald"]],
      [["Sólido quebradizo que conduce disuelto", "io"], ["Alto punto de fusión y soluble en agua", "io"], ["Gas a temperatura ambiente", "mo"], ["No conduce y funde a baja temperatura", "mo"], ["Conduce en estado sólido", "me"], ["Dúctil y maleable", "me"]],
      "Las propiedades revelan el tipo de enlace.",
    ),
    pick("check", "Conductividad", "¿Por qué el NaCl sólido no conduce pero sí lo hace disuelto en agua?",
      "Porque al disolverse sus iones pueden moverse",
      [["Porque al disolverse crea electrones", "Los electrones no se crean."], ["Porque el agua es un metal", "El agua no es un metal."], ["Porque se vuelve molecular", "Sigue siendo iónico, pero con iones libres."]],
      "La corriente en una disolución es un movimiento de iones.",
    ),
    pick("check2", "Metales", "¿Por qué los metales conducen la electricidad en estado sólido?",
      "Porque tienen electrones libres que se mueven por la red",
      [["Porque tienen iones libres", "Los iones están fijos en la red."], ["Porque son moléculas", "Forman redes."], ["Porque tienen enlaces dobles", "Eso es covalente."]],
      "El «mar de electrones» permite el paso de corriente.",
    ),
  ],
};
