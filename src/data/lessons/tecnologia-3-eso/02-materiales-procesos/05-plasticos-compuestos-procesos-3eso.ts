import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const plasticosCompuestosProcesos3esoLesson: InteractiveLesson = {
  slug: "plasticos-compuestos-procesos-3eso",
  title: "5. Plásticos y materiales compuestos: cómo se transforman",
  subtitle: TECESO3_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Procesos con plásticos", [
      { kind: "steps", items: [
        "**Inyección**: se inyecta plástico fundido en un molde metálico (tapones, juguetes, carcasas). Es muy **rápido** y adecuado para **series grandes**.",
        "**Extrusión**: el plástico fundido sale por una boquilla con la forma de la sección: tuberías, perfiles, hilo para impresión 3D.",
        "**Soplado**: se infla un tubo de plástico dentro de un molde: botellas y envases.",
        "**Termoconformado**: se calienta una lámina y se adapta a un molde con vacío: bandejas, vasos.",
        "**Impresión 3D**: se añade material capa a capa: prototipos y piezas únicas.",
      ] },
    ], undefined, "stack"),
    slide("calor", "Termoplásticos y termoestables", [
      { kind: "text", text: "Los plásticos se comportan de forma distinta al calentarse. Compruébalo." },
    ], tool("plastico-calor-explorador"), "visual-top"),
    slide("comp", "Materiales compuestos", [
      { kind: "steps", items: [
        "**Matriz** (resina epoxi o poliéster) + **refuerzo** (fibras de vidrio, carbono o aramida).",
        "Se fabrican en **capas**: en un molde se colocan tejidos de fibra y se impregnan de resina; después **curan**.",
        "Ventajas: muy **ligeros y resistentes**; formas complejas. Inconvenientes: **caros** y **difíciles de reciclar**.",
        "Se usan en **aeronáutica**, **palas de aerogenerador**, **bicicletas**, **embarcaciones**.",
      ] },
    ]),
    slide("print", "Impresión 3D", [
      { kind: "text", text: "La impresión 3D es ideal para prototipos: cambia el tamaño, las capas y el relleno." },
    ], tool("eso2-impresion3d-explorador"), "visual-top"),
    calc("calc-inyec", "Producción", "Un molde de inyección produce una pieza cada 30 segundos. ¿Cuántas piezas produce en una hora?", nums(120), "3 600 s / 30 s = 120 piezas.", "Segundos de una hora entre el ciclo."),
    sort("clasifica-pl", "¿Qué proceso se usa?", "Relaciona cada producto con su proceso.",
      [["iny", "Inyección", "amber"], ["ext", "Extrusión", "cobalt"], ["sop", "Soplado", "emerald"]],
      [["Tapones y piezas de juguete", "iny"], ["Carcasas de aparatos", "iny"], ["Tuberías de PVC", "ext"], ["Perfiles de ventanas", "ext"], ["Botellas de plástico", "sop"], ["Garrafas", "sop"]],
      "Cada proceso se elige según la forma, el volumen y el coste.",
    ),
    pick("check-compuesto", "Un compuesto", "¿Qué función tiene la resina en un material compuesto?",
      "Mantener unidas las fibras, repartir la carga y dar forma a la pieza",
      [["Aportar toda la resistencia", "La resistencia viene sobre todo de las fibras."], ["Sustituir a las fibras", "Son complementarias."], ["Servir solo de adorno", "Es la matriz estructural."]],
      "La matriz une y protege las fibras, que son las que soportan el esfuerzo.",
    ),
  ],
};
