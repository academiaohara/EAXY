import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const enlaceCovalenteFq3Lesson: InteractiveLesson = {
  slug: "enlace-covalente-fq3",
  title: "3. El enlace covalente",
  subtitle: FQ3_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Compartir electrones", [
      { kind: "steps", items: [
        "Entre **no metales** no hay un átomo que ceda y otro que gane: **comparten pares de electrones**.",
        "Cada **par compartido** cuenta para los dos átomos y se dibuja como una **raya**: **enlace covalente**.",
        "Se forman **moléculas**: grupos definidos de átomos unidos (H₂O, CO₂, NH₃, CH₄).",
        "El enlace puede ser **simple**, **doble** o **triple** según los pares compartidos.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Moléculas sencillas", [
      { kind: "text", text: "Elige una molécula y cuenta los enlaces de cada átomo." },
    ], tool("fq3-enlace-covalente-explorador"), "visual-top"),
    slide("valencia", "Cuántos enlaces forma cada átomo", [
      { kind: "steps", items: [
        "Cada átomo forma tantos enlaces como electrones le **faltan** para completar su capa (**8**, o **2** en el H).",
        "**H**: 1 enlace · **O**: 2 · **N**: 3 · **C**: 4 · **F** y **Cl**: 1.",
        "En el **CO₂**, el C forma 4 enlaces: **dos dobles** con los dos O (O=C=O). En el **N₂**, un **triple** (N≡N).",
        "Los compuestos covalentes moleculares suelen ser **gases, líquidos o sólidos blandos** de **bajo punto de fusión**.",
      ] },
    ]),
    calc("calc-enl", "Enlaces del metano", "En el metano (CH₄), ¿cuántos enlaces forma el carbono?", nums(4), "Uno con cada H: 4.", "Cuenta los H."),
    calc("calc-pares", "Pares compartidos", "En el CO₂ hay dos enlaces dobles. ¿Cuántos pares de electrones se comparten en total?", nums(4), "2 · 2 = 4 pares.", "Cada doble enlace son 2 pares."),
    calc("calc-faltan", "Electrones que faltan", "El nitrógeno tiene 5 electrones de valencia. ¿Cuántos enlaces forma para llegar a 8?", nums(3), "8 − 5 = 3 enlaces.", "Resta de 8."),
    sort("clasifica", "Iónico o covalente", "Clasifica cada compuesto según su enlace principal.",
      [["io", "Iónico", "amber"], ["co", "Covalente", "cobalt"]],
      [["NaCl", "io"], ["MgO", "io"], ["CaCl₂", "io"], ["H₂O", "co"], ["CO₂", "co"], ["NH₃", "co"]],
      "Metal + no metal: iónico; no metal + no metal: covalente.",
    ),
    pick("check", "Moléculas", "¿Cuántos enlaces forma el oxígeno en el agua (H₂O)?",
      "Dos enlaces simples, uno con cada hidrógeno",
      [["Un enlace doble con un hidrógeno", "El H solo forma 1 enlace."], ["Cuatro enlaces", "El oxígeno forma 2."], ["Ninguno", "Los comparte con los H."]],
      "El O necesita 2 electrones más.",
    ),
  ],
};
