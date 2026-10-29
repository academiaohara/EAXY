import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const hidrurosHidracidosFq4Lesson: InteractiveLesson = {
  slug: "hidruros-hidracidos-fq4",
  title: "3. Hidruros e hidrácidos",
  subtitle: FQ4_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Combinaciones con hidrógeno", [
      { kind: "steps", items: [
        "Los **hidruros** son compuestos binarios del **hidrógeno** con otro elemento.",
        "**Hidruros metálicos**: el hidrógeno actúa con **−1** y el metal con su nº de oxidación positivo. Fórmula **MHₙ**: NaH, CaH₂, AlH₃, FeH₃.",
        "**Hidruros no metálicos** (grupos 13–15): el H actúa con **+1**; se usan **nombres comunes** admitidos: **agua**, **amoniaco**, **metano**, **silano**, **fosfano**, **borano**.",
        "**Hidrácidos**: H con **halógenos** (F, Cl, Br, I) o **anfígenos** (S, Se): **HCl, HF, H₂S**… En **disolución acuosa** son ácidos.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Hidruros e hidrácidos", [
      { kind: "text", text: "Recorre los compuestos y compara las dos formas de nombrarlos." },
    ], tool("fq4-hidruros-explorador"), "visual-top"),
    slide("nom", "Cómo se nombran", [
      { kind: "steps", items: [
        "**Hidruro metálico**: **hidruro de (metal)** con el nº de oxidación en romanos si el metal tiene varios: **hidruro de sodio**, **hidruro de hierro(III)** o **trihidruro de hierro**.",
        "**Hidrácido** (en estado gaseoso): **(no metal)-uro de hidrógeno**: **cloruro de hidrógeno**, **sulfuro de dihidrógeno**.",
        "**Hidrácido en disolución acuosa**: **ácido (no metal)-hídrico**: **ácido clorhídrico**, **ácido sulfhídrico**.",
      ] },
    ]),
    calc("calc-h", "Número de oxidación del H", "¿Cuál es el nº de oxidación del hidrógeno en el hidruro de sodio, NaH? (con signo)", nums(-1), "Na es +1: para que la suma sea 0, el H es −1.", "El metal cede un electrón al hidrógeno."),
    calc("calc-ca", "Subíndice", "En el hidruro de calcio, CaH₂, ¿cuántos átomos de hidrógeno hay?", nums(2), "Ca²⁺ y H⁻ → CaH₂.", "Lee el subíndice."),
    calc("calc-al", "Hidruro de aluminio", "En el hidruro de aluminio, AlH₃, ¿cuántos átomos de hidrógeno hay?", nums(3), "Al³⁺ y H⁻ → AlH₃.", "Lee el subíndice."),
    calc("calc-h2s", "Hidrógenos del H₂S", "En el sulfuro de dihidrógeno, H₂S, ¿cuántos átomos de hidrógeno hay?", nums(2), "S²⁻ y H⁺ → H₂S.", "Lee el subíndice."),
    sort("clasifica", "Tipo de compuesto", "Clasifica cada compuesto.",
      [["me", "Hidruro metálico", "amber"], ["nm", "Hidruro no metálico", "cobalt"], ["ha", "Hidrácido", "rose"]],
      [["NaH", "me"], ["CaH₂", "me"], ["NH₃", "nm"], ["CH₄", "nm"], ["HCl", "ha"], ["H₂S", "ha"]],
      "Metal: hidruro metálico; N, C, Si…: no metálico; halógenos y S: hidrácidos.",
    ),
    pick("check", "Ácido clorhídrico", "¿Qué es el ácido clorhídrico?",
      "El cloruro de hidrógeno disuelto en agua",
      [["El cloro puro", "Es una disolución de HCl."], ["El HClO₄", "Ese es el ácido perclórico."], ["La sal NaCl", "Eso es cloruro de sodio."]],
      "Es el HCl gaseoso disuelto en agua (HCl(aq)).",
    ),
  ],
};
