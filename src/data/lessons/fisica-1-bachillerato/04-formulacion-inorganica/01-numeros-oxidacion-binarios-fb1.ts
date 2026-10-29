import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const numerosOxidacionBinariosFb1Lesson: InteractiveLesson = {
  slug: "numeros-oxidacion-binarios-fb1",
  title: "1. Números de oxidación y compuestos binarios",
  subtitle: FB1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("nox", "Número de oxidación", [
      { kind: "steps", items: [
        "El **número de oxidación** es la carga que tendría un átomo si todos sus enlaces fueran iónicos (los electrones compartidos se asignan al átomo más electronegativo).",
        "Reglas: **elementos libres** 0; **H** +1 (−1 en hidruros metálicos); **O** −2 (−1 en peróxidos); **alcalinos** +1; **alcalinotérreos** +2; **Al** +3; **F** −1; halógenos −1 en haluros.",
        "En un compuesto neutro la **suma** de los números de oxidación es **0**; en un ion, es su **carga**.",
        "Ejemplo: H₂SO₄ → 2·(+1) + x + 4·(−2) = 0 → **x = +6**.",
      ] },
    ], undefined, "stack"),
    slide("explora-nox", "Calcula el número de oxidación", [
      { kind: "text", text: "Elige un compuesto y observa la ecuación de neutralidad que da el número de oxidación del elemento desconocido." },
    ], tool("fq4-oxidacion-explorador"), "visual-top"),
    slide("explora", "Compuestos binarios", [
      { kind: "text", text: "Combina un elemento positivo con uno negativo y mira la fórmula y los dos nombres. ¿Cuándo se simplifica? ¿Cuándo hace falta el número romano?" },
    ], tool("fb1-binarios-explorador"), "visual-top"),
    slide("fam", "Familias de binarios", [
      { kind: "steps", items: [
        "**Óxidos** (X + O²⁻): Fe₂O₃ «trióxido de dihierro» / «óxido de hierro(III)». **Peróxidos** (O₂²⁻): Na₂O₂, H₂O₂ («peróxido de hidrógeno»).",
        "**Hidruros metálicos** (M + H⁻): CaH₂ «dihidruro de calcio». **Hidruros no metálicos**: NH₃ («azano», amoniaco), CH₄ («metano»), H₂O (agua), SiH₄, PH₃ («fosfano»).",
        "**Haluros de hidrógeno** (HF, HCl, HBr, HI) y H₂S: en gas, «cloruro de hidrógeno»; disueltos en agua son los **ácidos hidrácidos** («ácido clorhídrico»).",
        "**Sales binarias** (metal + no metal): NaCl «cloruro de sodio», FeCl₃ «cloruro de hierro(III)», Al₂S₃ «sulfuro de aluminio». Entre dos no metales: SF₆, CCl₄, PCl₅ (el más electronegativo, con **-uro**).",
      ] },
    ], undefined, "stack"),
    calc("calc-nox", "Número de oxidación", "¿Cuál es el número de oxidación del manganeso en KMnO₄?", nums(7), "1 + x + 4·(−2) = 0 → x = +7.", "K = +1, O = −2."),
    calc("calc-fe", "Estequiometría de cargas", "El hierro(III) se une al cloruro Cl⁻. ¿Cuántos átomos de cloro tiene la fórmula del cloruro de hierro(III)?", nums(3), "FeCl₃: 1·(+3) + 3·(−1) = 0.", "Intercambia las cargas."),
    calc("calc-o", "Óxido de nitrógeno", "El nitrógeno actúa con número de oxidación +5 y forma un óxido. ¿Cuántos átomos de oxígeno hay en su fórmula (N₂Oₓ)?", nums(5), "N₂O₅: 2·(+5) + 5·(−2) = 0.", "Intercambia y no se simplifica."),
    calc("calc-simplifica", "Simplificar", "El calcio (+2) y el oxígeno (−2) darían Ca₂O₂. ¿Cuál es el subíndice del oxígeno en la fórmula simplificada?", nums(1), "CaO: la proporción es 1:1.", "Divide por el máximo común divisor."),
    sort("clasifica", "Familia", "Clasifica cada compuesto.",
      [["oxi", "Óxido o peróxido", "cobalt"], ["hid", "Hidruro", "emerald"], ["sal", "Sal binaria", "rose"]],
      [["Fe₂O₃", "oxi"], ["Na₂O₂", "oxi"], ["CaH₂", "hid"], ["NH₃", "hid"], ["NaCl", "sal"], ["Al₂S₃", "sal"]],
      "Mira el elemento que acompaña: O, H o un halógeno/calcógeno.",
    ),
    pick("check", "Stock", "¿Cómo se llama FeCl₂ en nomenclatura de Stock?",
      "Cloruro de hierro(II)",
      [["Cloruro de hierro(III)", "Con Fe³⁺ sería FeCl₃."], ["Dicloruro de hierro(II)", "Stock no usa prefijos."], ["Cloruro ferroso de hierro", "No es un nombre correcto."]],
      "Fe tiene +2 porque hay dos Cl⁻.",
    ),
  ],
};
