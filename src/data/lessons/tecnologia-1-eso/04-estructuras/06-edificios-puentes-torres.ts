import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const edificiosPuentesTorresLesson: InteractiveLesson = {
  slug: "edificios-puentes-torres",
  title: "6. Estructuras de edificios, puentes y torres",
  subtitle: TECESO1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("edificio", "Un edificio por dentro", [
      { kind: "steps", items: [
        "**Cimentación**: zapatas o losa que reparten el peso sobre el terreno.",
        "**Pilares y vigas**: el esqueleto del edificio, que lleva las cargas hacia abajo.",
        "**Forjados**: suelos de cada planta, apoyados en vigas.",
        "**Cubierta**: techo que protege de la lluvia y la nieve.",
        "**Muros y cerramientos**: separan los espacios; pueden ser portantes o solo cierres.",
      ] },
      { kind: "text", text: "Los rascacielos usan además **núcleos rígidos** (ascensores y escaleras de hormigón) y estructuras triangulares para resistir el viento." },
    ], undefined, "stack"),
    slide("puentes", "Tipos de puentes", [
      { kind: "text", text: "Cada puente soporta las cargas de una forma. Activa los esfuerzos para ver qué se estira (rojo) y qué se comprime (azul)." },
    ], tool("puentes-tipos-explorador", { n: 0 }), "visual-top"),
    slide("arco", "El arco del puente", [
      { kind: "text", text: "Los arcos funcionan **por compresión**, por eso el puente de piedra se mantiene de pie sin cemento." },
    ], anim("arco-descarga"), "split"),
    slide("torres", "Torres: altas, estrechas y arriostradas", [
      { kind: "steps", items: [
        "**Base ancha** y centro de gravedad bajo para evitar el vuelco.",
        "**Triangulación** (celosías) para resistir el viento sin deformarse.",
        "**Perfiles ligeros y huecos** (tubos, ángulos) para ahorrar material.",
        "**Tirantes** (vientos) que sujetan antenas altas desde el suelo.",
      ] },
    ]),
    sort("clasifica-puente", "¿Qué puente es?", "Relaciona cada descripción con el tipo de puente.",
      [["vig", "De vigas", "amber"], ["arc", "De arco", "cobalt"], ["col", "Colgante", "emerald"], ["ati", "Atirantado", "violet"]],
      [["Un tablero apoyado en pilares, sin más", "vig"], ["Paso elevado de una autovía", "vig"], ["Acueducto romano de Segovia", "arc"], ["Puente de piedra medieval", "arc"], ["El tablero cuelga de grandes cables entre dos torres", "col"], ["Cables rectos que van de la torre al tablero", "ati"]],
      "Cada tipo reparte la carga a su manera: flexión (vigas), compresión (arco), tracción en cables (colgante y atirantado).",
    ),
    pick("check-torre", "Torre eléctrica", "¿Por qué las torres de alta tensión son estructuras de barras metálicas en forma de celosía triangulada?",
      "Porque con poco material resisten el peso y el viento sin deformarse",
      [["Porque son más bonitas", "La razón principal es de resistencia y ahorro de material."], ["Porque así se oyen mejor", "No tiene relación con el sonido."], ["Porque las barras no se oxidan", "Al contrario: el acero se oxida si no se galvaniza."]],
      "Las celosías trianguladas dan gran resistencia con poco peso y poca superficie contra el viento.",
    ),
    pick("check-colgante", "Cables en un puente colgante", "En un puente colgante, ¿qué esfuerzo soportan los cables principales?",
      "Tracción",
      [["Compresión", "Los cables solo pueden tirar; empujados se doblan."], ["Torsión", "No se retuercen."], ["Cortadura", "El cable no se corta si la carga es de tracción."]],
      "Los cables trabajan a tracción y las torres, a compresión.",
    ),
  ],
};
