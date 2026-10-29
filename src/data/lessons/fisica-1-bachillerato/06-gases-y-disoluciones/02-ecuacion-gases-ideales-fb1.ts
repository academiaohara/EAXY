import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const ecuacionGasesIdealesFb1Lesson: InteractiveLesson = {
  slug: "ecuacion-gases-ideales-fb1",
  title: "2. Ecuación de los gases ideales",
  subtitle: FB1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("ec", "P · V = n · R · T", [
      { kind: "steps", items: [
        "Las cuatro leyes se resumen en la **ecuación de estado del gas ideal**: **P·V = n·R·T**.",
        "**R = 0,082 atm·L/(mol·K)** (con P en atm, V en L, T en K). En unidades SI, **R = 8,314 J/(mol·K)** (P en Pa, V en m³).",
        "Un **gas ideal** supone partículas puntuales sin fuerzas entre ellas. Los gases reales se comportan casi como ideales a **baja presión y alta temperatura**.",
        "En CN (273 K, 1 atm): V = nRT/P = 0,082·273/1 ≈ **22,4 L/mol** (volumen molar).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Despeja lo que necesites", [
      { kind: "text", text: "Elige un gas y cambia T, P y V. Mira los moles, la masa y la densidad. ¿Cuántos litros ocupa un mol en cada caso?" },
    ], tool("fb1-gas-ideal-explorador"), "visual-top"),
    slide("dens", "Densidad y masa molar", [
      { kind: "steps", items: [
        "Como **n = m/M**: **P·V = (m/M)·R·T**, y la **densidad** de un gas es **d = m/V = P·M/(R·T)**.",
        "A igual P y T, el gas con **mayor M** es más denso. Por eso el **CO₂** (44 g/mol) se acumula en el fondo y el **He** (4 g/mol) asciende.",
        "Se puede **determinar la masa molar** de un gas midiendo su densidad: **M = d·R·T/P**. En CN, **M = d · 22,4**.",
        "**Masa y moles**: la masa de gas en un recipiente se obtiene como m = P·V·M/(R·T).",
      ] },
    ], undefined, "stack"),
    slide("ejemplo", "Un ejemplo", [
      { kind: "text", text: "¿Cuántos gramos de oxígeno hay en un recipiente de **5 L** a **2 atm** y **27 °C**? T = 300 K. n = PV/RT = 2·5/(0,082·300) = **0,407 mol**. m = 0,407·32 = **13,0 g**. Densidad: d = P·M/(R·T) = 2·32/(0,082·300) = **2,60 g/L**." },
    ]),
    calc("calc-n", "Moles", "¿Cuántos moles de gas hay en 22,4 L a 1 atm y 273 K? (R = 0,082; redondea)", nums(1), "n = PV/(RT) = 22,4/(0,082·273) = 1,0 mol.", "n = PV/RT."),
    calc("calc-v", "Volumen", "¿Qué volumen ocupan 2 mol de gas a 1 atm y 273 K? (L; redondea a la unidad)", nums(45, 44.8, 44.9), "V = nRT/P = 2·0,082·273/1 ≈ 44,8 L.", "V = nRT/P."),
    calc("calc-p", "Presión", "Un recipiente de 10 L contiene 1 mol de gas a 300 K. ¿Cuál es su presión, en atm? (R = 0,082; redondea a 2 decimales)", nums(2.46), "P = nRT/V = 0,082·300/10 = 2,46 atm.", "P = nRT/V."),
    calc("calc-m", "Masa molar", "Un gas tiene una densidad de 1,25 g/L en CN (22,4 L/mol). ¿Cuál es su masa molar, en g/mol?", nums(28), "M = 1,25·22,4 = 28 g/mol (N₂ o CO).", "M = d · 22,4."),
    sort("clasifica", "Más o menos denso que el aire", "Compara cada gas con el aire (M ≈ 29 g/mol).",
      [["mas", "Más denso", "rose"], ["men", "Menos denso", "cobalt"]],
      [["CO₂ (44)", "mas"], ["Cl₂ (71)", "mas"], ["O₂ (32)", "mas"], ["H₂ (2)", "men"], ["He (4)", "men"], ["CH₄ (16)", "men"]],
      "Compara la masa molar con 29 g/mol.",
    ),
    pick("check", "Gases ideales", "¿En qué condiciones un gas real se parece más a un gas ideal?",
      "A baja presión y alta temperatura",
      [["A alta presión y baja temperatura", "Allí las fuerzas intermoleculares y el volumen de las partículas importan."], ["A cualquier temperatura si es poco denso", "Depende de P y T."], ["Solo en el vacío total", "Es en bajas presiones, no en el vacío."]],
      "Cuanto más separadas están las partículas y más rápidas, menos importan las interacciones.",
    ),
  ],
};
