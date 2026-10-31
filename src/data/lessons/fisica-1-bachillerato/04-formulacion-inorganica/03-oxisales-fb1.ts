import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const oxisalesFb1Lesson: InteractiveLesson = {
  slug: "oxisales-fb1",
  title: "3. Oxisales y sales ácidas",
  subtitle: FB1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Qué es una oxisal", [
      { kind: "steps", items: [
        "Una **oxisal** deriva de un oxoácido al **sustituir sus hidrógenos por un catión**: H₂SO₄ + 2 Na⁺ → Na₂SO₄.",
        "El **anión** se nombra con **-ato** (si el ácido era -ico) o **-ito** (si era -oso): sulfúrico → **sulfato**; sulfuroso → **sulfito**; hipocloroso → **hipoclorito**; perclórico → **perclorato**.",
        "Se formula como un binario: **se intercambian las cargas** del catión y del anión; el anión va entre **paréntesis** si hay más de uno: Fe₂(SO₄)₃.",
        "Aniones comunes: **SO₄²⁻** sulfato, **NO₃⁻** nitrato, **CO₃²⁻** carbonato, **PO₄³⁻** fosfato, **ClO₄⁻** perclorato, **MnO₄⁻** permanganato, **Cr₂O₇²⁻** dicromato.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Combina catión y anión", [
      { kind: "text", text: "Elige un catión, un oxoácido y cuántos hidrógenos pierde. Mira cómo cambian la fórmula y el nombre." },
    ], tool("fb1-oxisales-explorador"), "visual-top"),
    slide("acidas", "Sales ácidas", [
      { kind: "steps", items: [
        "Los ácidos con **varios hidrógenos** (H₂SO₄, H₂CO₃, H₃PO₄) pueden perder solo **algunos**: el anión resultante aún lleva H y forma **sales ácidas**.",
        "Se nombran con el prefijo **hidrogeno-** (con **di-** si son dos): HCO₃⁻ **hidrogenocarbonato**; HSO₄⁻ **hidrogenosulfato**; HPO₄²⁻ **hidrogenofosfato**; H₂PO₄⁻ **dihidrogenofosfato**.",
        "NaHCO₃: «hidrogenocarbonato de sodio» (bicarbonato en el uso común); Ca(HCO₃)₂: «hidrogenocarbonato de calcio»; NaHSO₄: «hidrogenosulfato de sodio».",
        "El **catión amonio NH₄⁺** actúa como un metal: (NH₄)₂SO₄ «sulfato de amonio»; NH₄NO₃ «nitrato de amonio».",
      ] },
    ], undefined, "stack"),
    slide("nomen", "Tres maneras de nombrar", [
      { kind: "steps", items: [
        "**Tradicional/Stock**: «sulfato de hierro(III)» para Fe₂(SO₄)₃ (número romano si el metal tiene varios números de oxidación).",
        "**Sistemática de composición/adición (IUPAC 2005)**: «tris(tetraoxidosulfato) de dihierro». Los multiplicadores **bis, tris, tetrakis** se usan con grupos poliatómicos.",
        "Para formular desde el nombre: identifica **catión** y **anión**, escribe sus **cargas**, **intercambia** y simplifica; comprueba que la suma de cargas es 0.",
      ] },
    ], undefined, "stack"),
    calc("calc-na", "Fórmula", "El sulfato de sodio es Na₂SO₄. ¿Cuántos átomos de sodio tiene la fórmula?", nums(2), "SO₄²⁻ necesita 2 Na⁺.", "Intercambia las cargas."),
    calc("calc-ca", "Fosfato de calcio", "El fosfato de calcio es Ca₃(PO₄)₂. ¿Cuántos átomos de oxígeno hay en total en una unidad de fórmula?", nums(8), "2·4 = 8 oxígenos.", "Multiplica el subíndice del paréntesis."),
    calc("calc-nox", "Permanganato", "¿Cuál es el número de oxidación del manganeso en el ion MnO₄⁻?", nums(7), "x + 4·(−2) = −1 → x = +7.", "La suma da la carga del ion."),
    calc("calc-fe", "Hierro en Fe₂(SO₄)₃", "¿Cuál es el número de oxidación del hierro en Fe₂(SO₄)₃?", nums(3), "2x + 3·(−2) = 0 → x = +3.", "SO₄ vale −2 y hay tres."),
    sort("clasifica", "Neutra o ácida", "Clasifica cada sal.",
      [["neu", "Sal neutra", "cobalt"], ["aci", "Sal ácida", "rose"]],
      [["Na₂SO₄", "neu"], ["CaCO₃", "neu"], ["KNO₃", "neu"], ["NaHCO₃", "aci"], ["NaHSO₄", "aci"], ["Ca(H₂PO₄)₂", "aci"]],
      "Es ácida si el anión conserva algún hidrógeno.",
    ),
    pick("check", "Nombre", "¿Cómo se llama el KMnO₄ en nomenclatura tradicional?",
      "Permanganato de potasio",
      [["Manganato de potasio", "Sería K₂MnO₄ (Mn +6)."], ["Hipomanganito de potasio", "No existe ese nombre."], ["Óxido de manganeso y potasio", "No es un óxido binario."]],
      "HMnO₄ es el ácido permangánico (Mn +7).",
    ),
  ],
};
