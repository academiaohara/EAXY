import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const presionFq3Lesson: InteractiveLesson = {
  slug: "presion-fq3",
  title: "4. La presión",
  subtitle: FQ3_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Fuerza y superficie", [
      { kind: "steps", items: [
        "La **presión** es la **fuerza** que actúa **perpendicularmente** sobre cada unidad de **superficie**: **P = F / S**.",
        "En el SI se mide en **pascales (Pa)**: 1 Pa = 1 N/m². Es una unidad pequeña, por lo que se usan múltiplos (**kPa**) y otras como la **atmósfera** (1 atm ≈ 101 300 Pa) o el **bar** (1 bar = 100 000 Pa).",
        "Con la **misma fuerza**, cuanta **menos superficie**, **más presión**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Misma fuerza, distinta superficie", [
      { kind: "text", text: "Compara situaciones cotidianas y cambia la superficie de apoyo." },
    ], tool("fq3-presion-explorador"), "visual-top"),
    slide("apl", "Aplicaciones", [
      { kind: "steps", items: [
        "**Aumentar la presión**: reducir la superficie. Un **cuchillo afilado**, una **aguja**, un **clavo** con punta.",
        "**Reducir la presión**: aumentar la superficie. **Raquetas de nieve**, **esquís**, las **orugas** de un tractor, los cimientos anchos de un edificio.",
        "La fuerza que se usa es la **perpendicular a la superficie**: a menudo es el **peso** del cuerpo.",
      ] },
    ]),
    calc("calc-p", "Calcular la presión", "Una caja ejerce una fuerza de 600 N sobre una superficie de 0,03 m². ¿Qué presión ejerce, en Pa?", nums(20000), "P = 600 / 0,03 = 20 000 Pa.", "Divide la fuerza entre la superficie."),
    calc("calc-s", "Calcular la superficie", "Una fuerza de 1000 N produce una presión de 50 000 Pa. ¿Cuál es la superficie, en m²?", nums(0.02), "S = F/P = 1000 / 50 000 = 0,02 m².", "Despeja S."),
    calc("calc-f", "Calcular la fuerza", "Una presión de 200 000 Pa sobre un émbolo de 0,01 m². ¿Qué fuerza se ejerce, en N?", nums(2000), "F = P·S = 200 000 · 0,01 = 2000 N.", "Despeja F."),
    calc("calc-atm", "Atmósfera", "¿Cuántos Pa son 2 atm? (1 atm ≈ 100 000 Pa para simplificar)", nums(200000), "2 · 100 000 = 200 000 Pa.", "Multiplica por la equivalencia."),
    sort("clasifica", "Más presión o menos", "Clasifica cada situación según busque aumentar o reducir la presión.",
      [["au", "Aumentar la presión", "rose"], ["re", "Reducir la presión", "emerald"]],
      [["Afilar un cuchillo", "au"], ["Clavar un clavo con la punta", "au"], ["Aguja de coser", "au"], ["Esquís sobre la nieve", "re"], ["Raquetas de nieve", "re"], ["Neumáticos anchos de un tractor", "re"]],
      "Superficie pequeña: presión grande; superficie grande: presión pequeña.",
    ),
    pick("check", "Misma fuerza", "Aplicas la misma fuerza con un dedo sobre una chincheta, primero por la cabeza y luego por la punta. ¿Dónde es mayor la presión?",
      "En la punta, porque su superficie es menor",
      [["En la cabeza, porque es más grande", "A más superficie, menos presión."], ["Es igual en las dos", "La fuerza es igual, pero la presión no."], ["En ninguna", "Hay presión en las dos."]],
      "A igual fuerza, P = F/S es mayor si S es menor.",
    ),
  ],
};
