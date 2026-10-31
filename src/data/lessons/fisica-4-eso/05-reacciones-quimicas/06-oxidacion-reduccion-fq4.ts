import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const oxidacionReduccionFq4Lesson: InteractiveLesson = {
  slug: "oxidacion-reduccion-fq4",
  title: "6. Oxidación y reducción",
  subtitle: FQ4_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Transferencia de electrones", [
      { kind: "steps", items: [
        "En una reacción **redox** se **transfieren electrones** de una sustancia a otra.",
        "**Oxidación**: **pérdida** de electrones; el nº de oxidación **aumenta**. **Reducción**: **ganancia** de electrones; el nº de oxidación **disminuye**.",
        "La sustancia que **se oxida** es el **agente reductor** (cede electrones); la que **se reduce**, el **agente oxidante**.",
        "Oxidación y reducción ocurren **siempre a la vez**. Ejemplo: **Zn + Cu²⁺ → Zn²⁺ + Cu** (Zn: 0 → +2; Cu: +2 → 0).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Serie de actividad", [
      { kind: "text", text: "Introduce un metal en una disolución con otro catión. ¿Se produce reacción?" },
    ], tool("fq4-redox-explorador"), "visual-top"),
    slide("apl", "Aplicaciones", [
      { kind: "steps", items: [
        "Un metal **desplaza** de su sal a otro que esté **por debajo** en la **serie de actividad**: Zn desplaza al Cu²⁺, pero el Cu no desplaza al Zn²⁺.",
        "**Corrosión**: el hierro se oxida y forma herrumbre (óxido de hierro). Se evita con **pintura**, **galvanizado** (capa de cinc) o **aleaciones**.",
        "**Pilas y baterías**: reacciones redox que generan **corriente eléctrica**. **Electrólisis**: la corriente provoca una redox no espontánea.",
        "**Combustión** y **respiración** también son procesos redox.",
      ] },
    ]),
    calc("calc-e", "Electrones del Zn", "En Zn → Zn²⁺ + ¿?e⁻. ¿Cuántos electrones pierde cada átomo de cinc?", nums(2), "Pasa de 0 a +2: pierde 2 e⁻.", "El número de oxidación sube en 2."),
    calc("calc-al", "Electrones del Al", "En Al → Al³⁺ + ¿?e⁻. ¿Cuántos electrones pierde cada átomo de aluminio?", nums(3), "Pasa de 0 a +3: pierde 3 e⁻.", "El número de oxidación sube en 3."),
    calc("calc-ag", "Electrones intercambiados", "En Zn + 2 Ag⁺ → Zn²⁺ + 2 Ag, ¿cuántos electrones se intercambian en total?", nums(2), "Cada Zn cede 2 e⁻ y cada Ag⁺ gana 1: 2 en total.", "El cinc cede 2."),
    calc("calc-nox", "Variación del número de oxidación", "En la reducción Cu²⁺ → Cu, ¿cuánto vale el nº de oxidación del cobre al final? (número)", nums(0), "El cobre metálico es un elemento libre: nº de oxidación 0.", "Un elemento libre vale 0."),
    sort("clasifica", "Oxidación o reducción", "Clasifica cada proceso.",
      [["ox", "Oxidación", "rose"], ["re", "Reducción", "cobalt"]],
      [["Zn → Zn²⁺ + 2 e⁻", "ox"], ["Fe → Fe³⁺ + 3 e⁻", "ox"], ["Pérdida de electrones", "ox"], ["Cu²⁺ + 2 e⁻ → Cu", "re"], ["Ag⁺ + e⁻ → Ag", "re"], ["Ganancia de electrones", "re"]],
      "Oxidación: pierde e⁻; reducción: gana e⁻.",
    ),
    pick("check", "Agente reductor", "En Zn + Cu²⁺ → Zn²⁺ + Cu, ¿cuál es el agente reductor?",
      "El cinc, porque cede electrones",
      [["El cobre(II), porque se reduce", "El Cu²⁺ es el agente oxidante."], ["El agua", "No participa como reactivo."], ["Ninguno", "Hay un reductor y un oxidante."]],
      "El agente reductor es el que se oxida.",
    ),
  ],
};
