import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const propiedadesMaterialesLesson: InteractiveLesson = {
  slug: "propiedades-materiales",
  title: "2. Propiedades de los materiales",
  subtitle: TECESO1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cómo se comporta un material", [
      { kind: "definition", text: "Las **propiedades** de un material describen cómo se comporta frente a la electricidad, el calor, los golpes o el agua. Conocerlas permite elegir el adecuado para cada objeto." },
      { kind: "steps", items: [
        "**Físicas**: densidad, conductividad térmica y eléctrica, punto de fusión, magnetismo.",
        "**Mecánicas**: dureza, resistencia, elasticidad, plasticidad, fragilidad, tenacidad.",
        "**Tecnológicas**: facilidad para cortarlo, soldarlo, doblarlo o moldearlo.",
        "**Ecológicas**: si se puede reciclar, si es biodegradable o si se renueva.",
      ] },
    ], undefined, "stack"),
    slide("mecanicas", "Las propiedades mecánicas, con ejemplos", [
      { kind: "compare",
        left: { title: "Frente a una fuerza", text: "**Elástico**: recupera su forma (goma, muelle). **Plástico**: queda deformado (plastilina, arcilla húmeda). **Frágil**: se rompe sin deformarse (vidrio).", tone: "info" },
        right: { title: "Frente a un golpe o un roce", text: "**Duro**: no se raya fácilmente (diamante, acero templado). **Tenaz**: aguanta golpes sin romperse (acero). **Resistente**: soporta mucha fuerza sin romperse (hormigón a compresión).", tone: "key" } },
    ]),
    slide("ensayo", "Somete los materiales a pruebas", [
      { kind: "text", text: "Elige una muestra y realiza las pruebas de golpe, calor, agua, electricidad e imán. Anota qué materiales conducen la electricidad y cuáles aíslan." },
    ], tool("ensayo-material-explorador", { n: 1 }), "visual-top"),
    slide("comparar", "Compara dos materiales", [
      { kind: "text", text: "Ninguno es el mejor en todo: compara y fíjate en qué destaca cada uno." },
    ], tool("materiales-propiedades-explorador", { a: 0, b: 3 }), "visual-top"),
    sort("clasifica-prop", "¿Conductor o aislante?", "Clasifica cada material según conduzca o no la electricidad.",
      [["con", "Conductor", "amber"], ["ais", "Aislante", "cobalt"]],
      [["Cobre", "con"], ["Aluminio", "con"], ["Acero", "con"], ["Madera seca", "ais"], ["Vidrio", "ais"], ["Plástico PVC", "ais"], ["Goma", "ais"]],
      "Los metales conducen la corriente; la madera seca, el vidrio, los plásticos y la goma son aislantes. Por eso los cables son de cobre recubiertos de plástico.",
    ),
    pick("check-fragil", "Frágil o tenaz", "Un vaso de cristal cae al suelo y se rompe en trozos sin doblarse antes. ¿Qué propiedad lo explica?",
      "Es frágil: se rompe sin deformarse",
      [["Es elástico: recupera su forma", "Si fuera elástico, volvería a su forma en lugar de romperse."], ["Es dúctil: se estira en hilos", "La ductilidad es propia de metales como el cobre."], ["Es un buen conductor", "La conducción eléctrica no tiene relación con romperse al caer."]],
      "Un material frágil se rompe sin apenas deformarse; uno tenaz absorbe el golpe antes de romperse.",
    ),
    pick("check-prop", "El material de un cable", "¿Por qué los cables eléctricos llevan un núcleo de cobre y una funda de plástico?",
      "El cobre conduce muy bien la corriente y el plástico la aísla, para no recibir descargas",
      [["Porque el plástico conduce mejor que el cobre", "El plástico es aislante, no conductor."], ["Porque el cobre es aislante", "El cobre es un excelente conductor."], ["Solo por decoración", "Cada material cumple una función distinta."]],
      "Se combinan dos propiedades opuestas: conducción en el interior, aislamiento en el exterior.",
    ),
  ],
};
