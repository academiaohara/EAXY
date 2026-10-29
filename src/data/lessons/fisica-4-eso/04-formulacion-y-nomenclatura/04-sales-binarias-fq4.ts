import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const salesBinariasFq4Lesson: InteractiveLesson = {
  slug: "sales-binarias-fq4",
  title: "4. Sales binarias",
  subtitle: FQ4_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Metal + no metal", [
      { kind: "steps", items: [
        "Una **sal binaria** (o **sal neutra**) es un compuesto de un **metal** y un **no metal**. El no metal actúa con su nº de oxidación **negativo**: **F, Cl, Br, I: −1**; **S, Se: −2**; **N, P: −3**.",
        "**Fórmula**: se escribe primero el **metal**, luego el no metal, y se **intercambian** las cargas, simplificando.",
        "Ejemplos: Na⁺ y Cl⁻ → NaCl; Al³⁺ y S²⁻ → **Al₂S₃**; Mg²⁺ y N³⁻ → **Mg₃N₂**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Combina metal y no metal", [
      { kind: "text", text: "Elige un metal con su nº de oxidación y un no metal. Mira la fórmula y los nombres." },
    ], tool("fq4-sales-binarias-explorador"), "visual-top"),
    slide("nom", "Nomenclatura", [
      { kind: "steps", items: [
        "El no metal se nombra con la terminación **-uro**: **cloruro, bromuro, yoduro, fluoruro, sulfuro, seleniuro, nitruro, fosfuro**.",
        "**Stock**: **(no metal)uro de (metal)** y el nº de oxidación en romanos si el metal tiene varios: **cloruro de hierro(III)**, **sulfuro de cobre(I)**.",
        "**Sistemática**: con prefijos: **tricloruro de hierro**, **trisulfuro de dihierro**.",
      ] },
    ]),
    calc("calc-alcl", "AlCl₃", "En el AlCl₃, ¿cuántos átomos de cloro hay por cada átomo de aluminio?", nums(3), "Al³⁺ y Cl⁻ → AlCl₃.", "Lee el subíndice."),
    calc("calc-mgn", "Mg₃N₂", "En el nitruro de magnesio, Mg₃N₂, ¿cuántos átomos de nitrógeno hay?", nums(2), "Mg²⁺ y N³⁻: 3·(+2) = 6 = 2·(+3).", "Lee el subíndice."),
    calc("calc-fe", "Hierro", "En el FeCl₂, ¿cuál es el nº de oxidación del hierro?", nums(2), "2 cloruros (−2 en total): Fe es +2.", "Suma cargas."),
    calc("calc-cu", "Cobre", "En el Cu₂S, ¿cuál es el nº de oxidación del cobre?", nums(1), "S²⁻ (−2): 2 Cu → +1 cada uno.", "Reparte la carga entre dos átomos."),
    sort("clasifica", "Tipo de anión", "Clasifica cada sal según su anión.",
      [["ha", "Halogenuro (X⁻)", "amber"], ["su", "Sulfuro (S²⁻)", "cobalt"], ["tr", "Nitruro o fosfuro (X³⁻)", "rose"]],
      [["NaCl", "ha"], ["KBr", "ha"], ["CaS", "su"], ["Ag₂S", "su"], ["Mg₃N₂", "tr"], ["AlP", "tr"]],
      "El anión determina la terminación del nombre.",
    ),
    pick("check", "FeCl₃", "¿Cómo se llama el FeCl₃ en nomenclatura de Stock?",
      "Cloruro de hierro(III)",
      [["Cloruro de hierro(II)", "Ese es el FeCl₂."], ["Cloruro de hierro", "Hay que indicar el nº de oxidación."], ["Trihierro de cloro", "Se nombra primero el no metal."]],
      "Fe³⁺ y Cl⁻.",
    ),
    pick("check2", "Sal binaria", "¿Cuál es la fórmula del sulfuro de aluminio?",
      "Al₂S₃",
      [["AlS", "No queda neutra."], ["Al₃S₂", "Subíndices invertidos."], ["AlS₃", "Falta un aluminio."]],
      "Al³⁺ y S²⁻: 2·3 = 3·2.",
    ),
  ],
};
