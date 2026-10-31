import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const hidroxidosOxoacidosFq4Lesson: InteractiveLesson = {
  slug: "hidroxidos-oxoacidos-fq4",
  title: "5. Hidróxidos y oxoácidos",
  subtitle: FQ4_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("hid", "Hidróxidos", [
      { kind: "steps", items: [
        "Un **hidróxido** es un compuesto de un **metal** con el ion **hidróxido OH⁻** (el O con −2 y el H con +1).",
        "**Fórmula**: **M(OH)ₙ**, donde n es el nº de oxidación del metal. El OH va **entre paréntesis** si n > 1: **NaOH**, **Ca(OH)₂**, **Fe(OH)₃**.",
        "**Nombres**: **hidróxido de (metal)** (con romanos si hace falta): **hidróxido de sodio**, **hidróxido de hierro(III)**; **sistemática**: **trihidróxido de hierro**.",
        "Son **bases**: en agua liberan iones OH⁻ (pH > 7).",
      ] },
    ], undefined, "stack"),
    slide("oxo", "Oxoácidos", [
      { kind: "steps", items: [
        "Un **oxoácido** tiene **H, un no metal y O**: fórmula general **HₐXᵦO𝒸**. Se obtiene sumando **agua** al óxido ácido: **SO₃ + H₂O → H₂SO₄**.",
        "En **disolución acuosa** liberan **H⁺** (pH < 7).",
        "Nombres **tradicionales admitidos** (según el nº de oxidación del no metal, en orden creciente): **hipo…oso**, **-oso**, **-ico**, **per…ico**: HClO (ácido hipocloroso), HClO₂ (cloroso), HClO₃ (clórico), HClO₄ (perclórico).",
        "Otros: **H₂SO₄** ácido sulfúrico, **H₂SO₃** sulfuroso, **HNO₃** nítrico, **HNO₂** nitroso, **H₂CO₃** carbónico, **H₃PO₄** fosfórico.",
      ] },
    ]),
    slide("explora", "Hidróxidos y oxoácidos", [
      { kind: "text", text: "Alterna entre hidróxidos y oxoácidos y observa las fórmulas y los nombres." },
    ], tool("fq4-hidroxidos-oxoacidos-explorador"), "visual-top"),
    calc("calc-oh", "Fe(OH)₃", "En el Fe(OH)₃, ¿cuántos grupos OH hay?", nums(3), "Fe³⁺ necesita tres OH⁻.", "Lee el subíndice del paréntesis."),
    calc("calc-ca", "Ca(OH)₂", "En el Ca(OH)₂, ¿cuántos átomos de oxígeno hay?", nums(2), "Dos grupos OH: dos O.", "Un O por cada OH."),
    calc("calc-s", "Azufre en el H₂SO₃", "¿Cuál es el nº de oxidación del S en el ácido sulfuroso, H₂SO₃?", nums(4), "2·(+1) + x + 3·(−2) = 0 → x = +4.", "Suma cargas."),
    calc("calc-cl", "Cloro en el HClO₃", "¿Cuál es el nº de oxidación del Cl en el ácido clórico, HClO₃?", nums(5), "(+1) + x + 3·(−2) = 0 → x = +5.", "Suma cargas."),
    sort("clasifica", "Hidróxido u oxoácido", "Clasifica cada compuesto.",
      [["hi", "Hidróxido", "cobalt"], ["ox", "Oxoácido", "rose"]],
      [["NaOH", "hi"], ["Ca(OH)₂", "hi"], ["Fe(OH)₃", "hi"], ["HNO₃", "ox"], ["H₂SO₄", "ox"], ["HClO₄", "ox"]],
      "Los hidróxidos tienen un metal y OH; los oxoácidos, H, un no metal y O.",
    ),
    pick("check", "Ácido nítrico", "¿Cuál es la fórmula del ácido nítrico?",
      "HNO₃",
      [["HNO₂", "Ese es el ácido nitroso."], ["H₂NO₃", "Los subíndices no son correctos."], ["NHO₃", "Se escribe primero el H."]],
      "Nítrico: N con +5.",
    ),
  ],
};
