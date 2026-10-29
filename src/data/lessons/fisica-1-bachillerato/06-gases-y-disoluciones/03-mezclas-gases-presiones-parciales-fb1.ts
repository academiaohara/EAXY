import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const mezclasGasesPresionesParcialesFb1Lesson: InteractiveLesson = {
  slug: "mezclas-gases-presiones-parciales-fb1",
  title: "3. Mezclas de gases y presiones parciales",
  subtitle: FB1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("dalton", "Ley de Dalton", [
      { kind: "steps", items: [
        "En una **mezcla de gases ideales** que no reaccionan, cada gas se comporta como si estuviera **solo** en todo el recipiente.",
        "La **presión parcial** Pᵢ de un gas es la que ejercería si ocupara él solo el volumen total a la misma T: **Pᵢ·V = nᵢ·R·T**.",
        "**Ley de Dalton**: la presión total es la suma de las parciales: **P = P₁ + P₂ + …**, y **P·V = nₜ·R·T**.",
        "El aire es una mezcla de ≈ 78 % N₂, 21 % O₂ y 1 % Ar: a 1 atm, P(O₂) ≈ 0,21 atm.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Mezcla gases", [
      { kind: "text", text: "Elige una mezcla o crea la tuya. Mira la fracción molar y la presión parcial de cada gas. ¿Cómo cambia al subir la temperatura?" },
    ], tool("fb1-mezcla-gases-explorador"), "visual-top"),
    slide("fraccion", "Fracción molar", [
      { kind: "steps", items: [
        "**Fracción molar** de un gas: **xᵢ = nᵢ/nₜ**. La suma de todas las fracciones molares es **1**.",
        "**Presión parcial**: **Pᵢ = xᵢ·P**. Es proporcional a la fracción molar.",
        "Para gases, la fracción molar es igual a la **fracción en volumen** (Avogadro): un gas que es el 21 % del volumen de aire es el 21 % de los moles.",
        "**No** coincide con el **porcentaje en masa**, porque las masas molares son distintas. La **masa molar media** del aire: M = Σ xᵢ·Mᵢ ≈ 29 g/mol.",
      ] },
    ], undefined, "stack"),
    slide("aplic", "Aplicaciones", [
      { kind: "steps", items: [
        "**Buceo**: a mayor profundidad aumenta la presión y con ella la presión parcial del O₂ y del N₂: demasiado O₂ es tóxico y el N₂ produce narcosis. Se usan mezclas como el **nitrox** o el **trimix**.",
        "**Altitud**: a 5000 m la presión es ≈ 0,5 atm y P(O₂) ≈ 0,1 atm: el alpinista nota la falta de oxígeno.",
        "**Gas recogido sobre agua**: la presión total es la del gas seco más la **presión de vapor del agua** a esa temperatura.",
      ] },
    ], undefined, "stack"),
    calc("calc-x", "Fracción molar", "Una mezcla tiene 3 mol de N₂ y 1 mol de O₂. ¿Cuál es la fracción molar del N₂?", nums(0.75), "x = 3/4 = 0,75.", "x = n_i/n_total."),
    calc("calc-pp", "Presión parcial", "Una mezcla a 2 atm tiene un 25 % en moles de O₂. ¿Cuál es la presión parcial del O₂, en atm?", nums(0.5), "P = 0,25·2 = 0,5 atm.", "Pᵢ = xᵢ·P."),
    calc("calc-total", "Presión total", "En un recipiente hay N₂ a 0,6 atm y O₂ a 0,3 atm (presiones parciales). ¿Cuál es la presión total, en atm?", nums(0.9), "0,6 + 0,3 = 0,9 atm.", "Ley de Dalton."),
    calc("calc-mezcla", "Moles totales", "Una mezcla ocupa 10 L a 300 K y 2 atm. ¿Cuántos moles totales hay? (R = 0,082; redondea a 2 decimales)", nums(0.81), "n = PV/RT = 20/(0,082·300) = 0,81 mol.", "n = PV/RT."),
    sort("clasifica", "Magnitud", "¿Es una fracción molar (suma 1) o una presión parcial (suma la presión total)?",
      [["fm", "Fracción molar", "cobalt"], ["pp", "Presión parcial", "rose"]],
      [["x(N₂) = 0,78", "fm"], ["P(O₂) = 0,21 atm", "pp"], ["x(CO₂) = 0,0004", "fm"], ["P(Ar) = 0,0093 atm", "pp"], ["Suma = 1", "fm"], ["Suma = P total", "pp"]],
      "Las fracciones molares son adimensionales; las presiones parciales, en atm.",
    ),
    pick("check", "Dalton", "Se mezclan dos gases en un recipiente de 10 L a la misma T. ¿Qué dice la ley de Dalton?",
      "La presión total es la suma de las presiones que cada gas ejercería solo",
      [["La presión total es la media de las presiones", "Se suman, no se promedian."], ["El gas más pesado ejerce toda la presión", "Todos contribuyen."], ["Los gases reaccionan entre sí", "Se supone que no reaccionan."]],
      "La presión total es la suma de las parciales: P = ΣPᵢ.",
    ),
  ],
};
