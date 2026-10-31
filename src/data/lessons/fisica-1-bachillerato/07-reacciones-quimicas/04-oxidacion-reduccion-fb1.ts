import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const oxidacionReduccionFb1Lesson: InteractiveLesson = {
  slug: "oxidacion-reduccion-fb1",
  title: "4. Oxidación-reducción y pilas",
  subtitle: FB1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("conceptos", "Oxidación y reducción", [
      { kind: "steps", items: [
        "Una reacción **redox** es una transferencia de **electrones**. **Oxidación**: **pérdida** de electrones (el nº de oxidación **aumenta**). **Reducción**: **ganancia** de electrones (el nº de oxidación **disminuye**).",
        "El que se **oxida** es el **agente reductor** (reduce al otro); el que se **reduce** es el **agente oxidante**. Siempre ocurren **a la vez**.",
        "Se detecta con los **números de oxidación**: Zn + Cu²⁺ → Zn²⁺ + Cu: el Zn pasa de 0 a +2 (se oxida) y el Cu, de +2 a 0 (se reduce).",
        "Ejemplos: combustión, oxidación de metales (corrosión), respiración, fotosíntesis, baterías.",
      ] },
    ], undefined, "stack"),
    slide("ajuste", "Método ion-electrón", [
      { kind: "steps", items: [
        "**1.** Escribe las dos **semirreacciones** (oxidación y reducción) con las especies que cambian.",
        "**2.** Ajusta los **átomos** (en **medio ácido**: O con H₂O y H con H⁺) y las **cargas** con electrones.",
        "**3.** **Multiplica** cada una para igualar los electrones y **suma**.",
        "Ejemplo: Fe²⁺ → Fe³⁺ + e⁻ (×5) y MnO₄⁻ + 8 H⁺ + 5 e⁻ → Mn²⁺ + 4 H₂O → **MnO₄⁻ + 5 Fe²⁺ + 8 H⁺ → Mn²⁺ + 5 Fe³⁺ + 4 H₂O**.",
      ] },
    ], undefined, "stack"),
    slide("pila", "La pila Daniell", [
      { kind: "text", text: "Una pila aprovecha una redox espontánea separando las semirreacciones. Observa cómo fluyen los electrones y los iones." },
    ], anim("fb1-pila-daniell"), "visual-top"),
    slide("explora", "Construye tu pila", [
      { kind: "text", text: "Elige dos metales. ¿Cuál se oxida? ¿Qué f.e.m. da la pila? ¿Cuántos electrones se intercambian?" },
    ], tool("fb1-redox-pila-explorador"), "visual-top"),
    slide("pot", "Potenciales de reducción", [
      { kind: "steps", items: [
        "El **potencial estándar de reducción E°** mide la tendencia a reducirse (1 mol/L, 25 °C), referido al electrodo de hidrógeno (0 V).",
        "**Mayor E°**: más tendencia a **reducirse** (mejor oxidante). Los metales con **E° negativo** se oxidan fácilmente (buenos reductores).",
        "En una pila: **cátodo** = mayor E° (reducción); **ánodo** = menor E° (oxidación). **E°pila = E°cátodo − E°ánodo**; si es **> 0**, la reacción es espontánea.",
        "**Un metal desplaza de sus disoluciones a otro con mayor E°**: Zn desplaza al Cu²⁺, pero el Cu no desplaza al Zn²⁺.",
      ] },
    ], undefined, "stack"),
    calc("calc-nox", "Número de oxidación", "¿Cuál es el número de oxidación del manganeso en el ion MnO₄⁻?", nums(7), "x + 4·(−2) = −1 → x = +7.", "El ion tiene carga −1."),
    calc("calc-ne", "Electrones", "En Zn → Zn²⁺ + 2 e⁻, ¿cuántos electrones pierde cada átomo de Zn?", nums(2), "Pasa de 0 a +2: pierde 2 e⁻.", "Variación del número de oxidación."),
    calc("calc-fem", "f.e.m.", "E°(Cu²⁺/Cu) = +0,34 V y E°(Zn²⁺/Zn) = −0,76 V. ¿Cuánto vale la f.e.m. de la pila Zn/Cu, en V?", nums(1.1), "E° = 0,34 − (−0,76) = 1,10 V.", "E°cátodo − E°ánodo."),
    calc("calc-masa", "Masa de cobre", "En la pila, por cada mol de Zn que se oxida se deposita 1 mol de Cu. ¿Cuántos gramos de Cu se depositan cuando se consumen 0,5 mol de Zn? (Cu 63,5)", nums(31.75), "0,5 mol · 63,5 = 31,75 g.", "Relación 1:1."),
    sort("clasifica", "Oxidación o reducción", "Clasifica cada proceso.",
      [["oxi", "Oxidación", "rose"], ["red", "Reducción", "cobalt"]],
      [["Zn → Zn²⁺ + 2 e⁻", "oxi"], ["Cu²⁺ + 2 e⁻ → Cu", "red"], ["Fe²⁺ → Fe³⁺ + e⁻", "oxi"], ["Cl₂ + 2 e⁻ → 2 Cl⁻", "red"], ["Pérdida de electrones", "oxi"], ["Disminución del nº de oxidación", "red"]],
      "Oxidación: pierde electrones; reducción: los gana.",
    ),
    pick("check", "Ánodo", "En una pila, ¿en qué electrodo ocurre la oxidación?",
      "En el ánodo",
      [["En el cátodo", "Allí ocurre la reducción."], ["En el puente salino", "Solo mueve iones."], ["En el hilo conductor", "Solo pasan electrones."]],
      "Ánodo: oxidación; cátodo: reducción.",
    ),
  ],
};
