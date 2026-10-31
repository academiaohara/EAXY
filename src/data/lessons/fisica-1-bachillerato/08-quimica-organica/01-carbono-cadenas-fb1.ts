import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const carbonoCadenasFb1Lesson: InteractiveLesson = {
  slug: "carbono-cadenas-fb1",
  title: "1. El átomo de carbono y las cadenas carbonadas",
  subtitle: FB1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("carbono", "Por qué existe la química orgánica", [
      { kind: "steps", items: [
        "La **química orgánica** (química del carbono) estudia los compuestos del carbono con H, O, N, S y halógenos. Se conocen **más de diez millones**.",
        "El carbono (1s² 2s² 2p²) tiene **4 electrones de valencia**: es **tetravalente** y forma **4 enlaces covalentes**.",
        "Puede **encadenarse** consigo mismo formando **cadenas** largas, ramificadas o cíclicas, y enlaces **sencillos, dobles y triples**, por eso hay tantos compuestos.",
        "Los enlaces C–C y C–H son **fuertes y poco polares**: los compuestos orgánicos son en general estables, **apolares**, **combustibles** y de temperaturas de fusión **bajas**.",
      ] },
    ], undefined, "stack"),
    slide("hib", "Hibridación y geometría", [
      { kind: "text", text: "Observa cómo cambia la geometría según los enlaces del carbono: sencillos (**sp³**, tetraédrico, 109,5°), doble (**sp²**, plano, 120°) o triple (**sp**, lineal, 180°)." },
    ], tool("fq4-carbono-enlaces-explorador"), "visual-top"),
    slide("cadenas", "Tipos de cadenas", [
      { kind: "text", text: "Mira cómo se pasa de una cadena lineal a una ramificada, a un ciclo y al benceno." },
    ], anim("fb1-cadenas-carbono"), "visual-top"),
    slide("formulas", "Formas de escribir un compuesto", [
      { kind: "steps", items: [
        "**Fórmula molecular**: solo el número de átomos de cada elemento (C₄H₁₀).",
        "**Semidesarrollada**: muestra los enlaces C–C y los grupos: CH₃–CH₂–CH₂–CH₃.",
        "**Desarrollada**: todos los enlaces, incluidos los C–H. **De esqueleto**: cada vértice o extremo es un C y se omiten los H.",
        "Un carbono es **primario**, **secundario**, **terciario** o **cuaternario** según se una a 1, 2, 3 o 4 carbonos.",
      ] },
    ], undefined, "stack"),
    calc("calc-h", "Hidrógenos", "Un alcano de 6 carbonos, ¿cuántos hidrógenos tiene? (CₙH₂ₙ₊₂)", nums(14), "2·6 + 2 = 14 → C₆H₁₄.", "CₙH₂ₙ₊₂."),
    calc("calc-eno", "Hidrógenos de un alqueno", "Un alqueno de 5 carbonos, ¿cuántos hidrógenos tiene? (CₙH₂ₙ)", nums(10), "C₅H₁₀: 2n = 10.", "CₙH₂ₙ."),
    calc("calc-ciclo", "Ciclohexano", "El ciclohexano tiene 6 C. ¿Cuántos H tiene? (un ciclo pierde 2 H respecto al alcano)", nums(12), "C₆H₁₂: 14 − 2 = 12.", "Cicloalcano: CₙH₂ₙ."),
    calc("calc-enlaces", "Enlaces del carbono", "¿Cuántos enlaces covalentes forma siempre un átomo de carbono?", nums(4), "Tetravalencia: 4 enlaces.", "4 electrones de valencia."),
    sort("clasifica", "Tipo de cadena", "Clasifica cada compuesto.",
      [["lin", "Lineal", "cobalt"], ["ram", "Ramificada", "emerald"], ["cic", "Cíclica o aromática", "rose"]],
      [["Butano", "lin"], ["Pentano", "lin"], ["2-metilbutano", "ram"], ["2,2-dimetilpropano", "ram"], ["Ciclohexano", "cic"], ["Benceno", "cic"]],
      "Fíjate en si hay ramas o un anillo.",
    ),
    pick("check", "Tetravalencia", "¿Por qué el carbono forma tantos compuestos?",
      "Porque forma 4 enlaces y puede encadenarse consigo mismo en cadenas, ramas y ciclos",
      [["Porque es el elemento más abundante", "No es la razón."], ["Porque solo forma enlaces iónicos", "Forma covalentes."], ["Porque es un metal", "Es un no metal."]],
      "Tetravalencia y capacidad de formar cadenas.",
    ),
  ],
};
