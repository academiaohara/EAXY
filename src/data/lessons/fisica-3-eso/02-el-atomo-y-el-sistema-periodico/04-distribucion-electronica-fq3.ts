import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const distribucionElectronicaFq3Lesson: InteractiveLesson = {
  slug: "distribucion-electronica-fq3",
  title: "4. Distribución electrónica",
  subtitle: FQ3_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Los electrones por capas", [
      { kind: "steps", items: [
        "Los electrones se colocan en **capas** (niveles) alrededor del núcleo, empezando por la **más cercana**.",
        "La **1.ª capa** admite hasta **2** electrones; la **2.ª**, hasta **8**; la **3.ª**, en los primeros elementos, también **8** antes de pasar a la 4.ª.",
        "Ejemplo: el sodio (Z = 11) se escribe **2 – 8 – 1**; el cloro (Z = 17), **2 – 8 – 7**.",
        "Los electrones de la **última capa** son los de **valencia**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Llena las capas", [
      { kind: "text", text: "Recorre los 20 primeros elementos y mira cómo se completan las capas." },
    ], tool("fq3-configuracion-electronica-explorador"), "visual-top"),
    slide("octeto", "Regla del octeto", [
      { kind: "steps", items: [
        "Los **gases nobles** tienen la última capa **completa** (8 electrones, 2 el helio): son muy **estables** y casi no reaccionan.",
        "Los demás átomos tienden a **alcanzar esa configuración**: es la **regla del octeto**.",
        "Con **1, 2 o 3** electrones de valencia, les resulta más fácil **perderlos** (metales → cationes).",
        "Con **5, 6 o 7**, les resulta más fácil **ganar** los que faltan hasta 8 (no metales → aniones).",
      ] },
    ]),
    calc("calc-val", "Valencia", "Un átomo tiene 15 electrones. ¿Cuántos tiene en la última capa? (2 – 8 – …)", nums(5), "2 + 8 = 10; quedan 15 − 10 = 5.", "Resta los electrones de las capas llenas."),
    calc("calc-gana", "Electrones que gana", "El azufre (2 – 8 – 6) quiere completar su octeto. ¿Cuántos electrones gana?", nums(2), "8 − 6 = 2: forma S²⁻.", "Calcula cuántos faltan hasta 8."),
    calc("calc-ion", "Capas de un ion", "El Na (2 – 8 – 1) pierde un electrón y forma Na⁺. ¿Cuántos electrones tiene el Na⁺?", nums(10), "11 − 1 = 10: 2 – 8, como el neón.", "Resta uno a los 11 electrones."),
    sort("clasifica", "Pierde o gana", "Clasifica cada elemento según el ion que tiende a formar.",
      [["pi", "Forma catión (pierde)", "amber"], ["ga", "Forma anión (gana)", "cobalt"], ["no", "Casi no forma iones", "emerald"]],
      [["Na (2 – 8 – 1)", "pi"], ["Mg (2 – 8 – 2)", "pi"], ["O (2 – 6)", "ga"], ["Cl (2 – 8 – 7)", "ga"], ["Ne (2 – 8)", "no"], ["Ar (2 – 8 – 8)", "no"]],
      "Pocos electrones de valencia: pierde; casi 8: gana; capa completa: estable.",
    ),
    pick("check", "Gases nobles", "¿Por qué los gases nobles casi no reaccionan?",
      "Porque tienen la última capa completa",
      [["Porque no tienen electrones", "Sí los tienen."], ["Porque tienen un solo electrón de valencia", "Tienen la capa llena."], ["Porque son muy pesados", "No es por su masa."]],
      "Configuración muy estable.",
    ),
  ],
};
