import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const nomenclaturasComposicionStockFb1Lesson: InteractiveLesson = {
  slug: "nomenclaturas-composicion-stock-fb1",
  title: "4. Nomenclaturas de composición y de Stock",
  subtitle: FB1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("aspa", "De los números de oxidación a la fórmula", [
      { kind: "text", text: "Para formular, se escriben las **cargas** de cada parte, se **intercambian** como subíndices (regla del aspa) y se **simplifica**. Después se **comprueba** que la suma de cargas es cero." },
    ], anim("fb1-regla-aspa"), "visual-top"),
    slide("sist", "Nomenclatura sistemática (de composición)", [
      { kind: "steps", items: [
        "Indica **el número de átomos** de cada elemento con **prefijos griegos**: mono-, di-, tri-, tetra-, penta-, hexa-, hepta-, octa-…",
        "**Mono-** se omite en el primer elemento. Para grupos poliatómicos se usan **bis-, tris-, tetrakis-** con paréntesis.",
        "Ejemplos: Fe₂O₃ «trióxido de dihierro»; CO «monóxido de carbono»; SF₆ «hexafluoruro de azufre»; Fe₂(SO₄)₃ «tris(tetraoxidosulfato) de dihierro».",
      ] },
    ], undefined, "stack"),
    slide("stock", "Nomenclatura de Stock", [
      { kind: "steps", items: [
        "Se nombra el compuesto y se indica el **número de oxidación** del elemento **entre paréntesis y en números romanos**, **solo si tiene más de uno**.",
        "Ejemplos: FeCl₂ «cloruro de hierro(II)»; FeCl₃ «cloruro de hierro(III)»; CuO «óxido de cobre(II)»; **NaCl** «cloruro de sodio» (el Na solo tiene +1).",
        "Para no metales: SO₂ «óxido de azufre(IV)»; SO₃ «óxido de azufre(VI)».",
        "La nomenclatura **tradicional** (-oso/-ico) se acepta en ácidos y sales: «ácido sulfúrico», «sulfato de sodio».",
      ] },
    ], undefined, "stack"),
    slide("explora", "Entrena la formulación", [
      { kind: "text", text: "Elige un ejercicio, responde y comprueba la solución con sus tres nombres. Alterna entre «nombre → fórmula» y «fórmula → nombre»." },
    ], tool("fb1-entrenador-explorador"), "visual-top"),
    slide("interp", "Interpretar fórmulas", [
      { kind: "steps", items: [
        "De una fórmula se deduce la **composición**: Al₂(SO₄)₃ tiene 2 Al, 3 S y **12 O** (3·4) por unidad de fórmula.",
        "Se calcula el **número de oxidación** de un elemento con la neutralidad: en K₂Cr₂O₇, 2·(+1) + 2x + 7·(−2) = 0 → **x = +6**.",
        "Se identifica la **familia** y, con ella, el nombre: metal + O → óxido; con OH → hidróxido; H + no metal + O → oxoácido; metal + anión con O → oxisal.",
      ] },
    ], undefined, "stack"),
    calc("calc-atomos", "Átomos totales", "¿Cuántos átomos de oxígeno hay en una unidad de fórmula de Al₂(SO₄)₃?", nums(12), "3·4 = 12 átomos de oxígeno.", "Multiplica el subíndice del paréntesis."),
    calc("calc-nox", "Dicromato", "¿Cuál es el número de oxidación del cromo en K₂Cr₂O₇?", nums(6), "2 + 2x − 14 = 0 → x = +6.", "K = +1, O = −2."),
    calc("calc-stock", "Stock", "En el óxido de cobre(II), ¿cuántos átomos de oxígeno hay por cada átomo de cobre?", nums(1), "CuO: Cu²⁺ y O²⁻ se combinan 1:1.", "Las cargas coinciden."),
    calc("calc-sulf", "Prefijo", "El SO₃ se llama «trióxido de azufre». ¿Cuántos átomos de oxígeno indica el prefijo tri-?", nums(3), "Tri- significa tres.", "Prefijo griego."),
    sort("clasifica", "Nombre y nomenclatura", "Clasifica cada nombre según la nomenclatura usada.",
      [["sis", "Sistemática (prefijos)", "cobalt"], ["sto", "Stock (romanos)", "emerald"]],
      [["Trióxido de dihierro", "sis"], ["Óxido de hierro(III)", "sto"], ["Dicloruro de calcio", "sis"], ["Cloruro de cobre(II)", "sto"], ["Hexafluoruro de azufre", "sis"], ["Óxido de azufre(VI)", "sto"]],
      "Prefijos: sistemática. Romanos entre paréntesis: Stock.",
    ),
    pick("check", "Fórmula desde el nombre", "¿Cuál es la fórmula del sulfato de hierro(III)?",
      "Fe₂(SO₄)₃",
      [["FeSO₄", "Esa es del hierro(II)."], ["Fe₃(SO₄)₂", "Los subíndices están intercambiados al revés."], ["Fe(SO₄)₃", "No equilibra las cargas."]],
      "2·(+3) + 3·(−2) = 0.",
    ),
  ],
};
