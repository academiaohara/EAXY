import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const construccionPoligonosRegularesDt1Lesson: InteractiveLesson = {
  slug: "construccion-poligonos-regulares-dt1",
  title: "5. Construcción de polígonos regulares inscritos",
  subtitle: DT1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Construcciones exactas y método general", [
      { kind: "steps", items: [
        "Con regla y compás hay construcciones **exactas** para $n = 3, 4, 5, 6, 8, 10, 12$ y sus dobles.",
        "**Hexágono**: se lleva el radio seis veces sobre la circunferencia. **Triángulo**: se unen vértices alternos del hexágono. **Dodecágono**: se bisecan los arcos del hexágono.",
        "**Cuadrado**: dos diámetros perpendiculares. **Octógono**: se bisecan los arcos del cuadrado.",
        "**Pentágono y decágono**: se construyen con el **lado áureo** (ver la animación).",
        "Para **cualquier** $n$ existe el **método general**, que es **aproximado**.",
      ] },
    ], undefined, "stack"),
    slide("pentagono", "Pentágono regular", [
      { kind: "text", text: "Construcción de Euclides: el lado del pentágono es la distancia desde C hasta N." },
    ], anim("dt1-pentagono-euclides"), "visual-top"),
    slide("general", "Método general", [
      { kind: "text", text: "Prueba distintos n y compara el lado obtenido con el exacto." },
    ], tool("dt1-metodo-general-explorador"), "visual-top"),
    calc("calc-lado5", "Lado del pentágono", "En una circunferencia de radio 10 cm, ¿cuánto mide el lado del pentágono regular? (2R sen 36°, un decimal)", nums(11.8, 11.76), "2 · 10 · 0,5878 ≈ 11,8 cm.", "Usa sen 36° ≈ 0,5878."),
    calc("calc-lado10", "Lado del decágono", "En una circunferencia de radio 10 cm, el lado del decágono es la parte áurea del radio: R/φ. ¿Cuánto mide, en cm? (un decimal)", nums(6.2, 6.18), "10 / 1,618 ≈ 6,2 cm.", "Divide entre φ ≈ 1,618."),
    calc("calc-error", "Error del método general", "Para n = 7, el lado exacto vale 0,8678 R y el método general da 0,8692 R. ¿Cuál es el error relativo, en %? (dos decimales)", nums(0.16), "(0,8692 − 0,8678)/0,8678 ≈ 0,0016 → 0,16 %.", "Diferencia entre el exacto."),
    sort("clasifica-constr", "¿Cómo se construye?", "Clasifica cada polígono según su construcción.",
      [["exa", "Exacta con regla y compás", "cobalt"], ["aprox", "Solo aproximada (método general)", "amber"]],
      [["Hexágono", "exa"], ["Pentágono", "exa"], ["Octógono", "exa"], ["Decágono", "exa"], ["Heptágono", "aprox"], ["Eneágono", "aprox"], ["Endecágono", "aprox"]],
      "Los polígonos de 7, 9 y 11 lados no se pueden construir exactamente con regla y compás.",
    ),
    pick("check-hex", "Construcción del hexágono", "¿Cómo se inscribe un hexágono regular con el compás?",
      "Llevando seis veces el radio sobre la circunferencia",
      [["Llevando seis veces el diámetro", "El diámetro es demasiado largo."], ["Dividiendo la circunferencia con el transportador", "No es construcción con compás."], ["Trazando seis mediatrices", "Basta el radio."]],
      "El lado del hexágono es igual al radio: seis cuerdas cierran la circunferencia.",
    ),
  ],
};
