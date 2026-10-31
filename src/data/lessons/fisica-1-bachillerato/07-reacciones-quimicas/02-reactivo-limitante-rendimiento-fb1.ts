import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const reactivoLimitanteRendimientoFb1Lesson: InteractiveLesson = {
  slug: "reactivo-limitante-rendimiento-fb1",
  title: "2. Reactivo limitante y rendimiento",
  subtitle: FB1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("lim", "El reactivo limitante", [
      { kind: "steps", items: [
        "Si los reactivos no están en **proporción estequiométrica**, uno se **agota** antes: es el **reactivo limitante**. Los demás están **en exceso** y sobran.",
        "Es el limitante el que **determina la cantidad de producto** que puede formarse: los cálculos se hacen a partir de él.",
        "**Cómo identificarlo**: pasa las masas a **moles**, divide cada uno por su **coeficiente** y el menor resultado es el del limitante.",
        "Analogía: con 10 ruedas y 3 chasis para hacer coches (4 ruedas, 1 chasis), solo se pueden fabricar 2 coches: el limitante son las ruedas.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Encuentra el limitante", [
      { kind: "text", text: "Cambia las masas de los reactivos y el rendimiento. ¿Qué reactivo se agota? ¿Cuánto sobra del otro?" },
    ], tool("fb1-limitante-explorador"), "visual-top"),
    slide("rend", "Rendimiento de una reacción", [
      { kind: "steps", items: [
        "La cantidad de producto calculada con la estequiometría es el **rendimiento teórico** (máximo). Lo que se obtiene en la práctica es el **rendimiento real** (menor).",
        "**Rendimiento (%) = (masa real / masa teórica) · 100**.",
        "Causas de rendimiento < 100 %: **reacciones secundarias**, **pérdidas** al aislar el producto, **equilibrios** que no se completan y **impurezas**.",
        "Se combina con la **pureza**: masa pura = masa de muestra · pureza/100; masa real = masa teórica · rendimiento/100.",
      ] },
    ], undefined, "stack"),
    slide("ejemplo", "Un ejemplo completo", [
      { kind: "text", text: "Se hacen reaccionar **32 g de CH₄** con **100 g de O₂** (CH₄ + 2 O₂ → CO₂ + 2 H₂O). Moles: CH₄ = 2; O₂ = 3,125. Cociente: CH₄ → 2/1 = 2; O₂ → 3,125/2 = **1,56** (menor) → el **limitante es el O₂**. Se forman 1,56 mol de CO₂ = **68,75 g**. Sobran 2 − 1,56 = **0,44 mol de CH₄** (7 g). Si el rendimiento es del 80 %, se obtienen **55 g** de CO₂." },
    ]),
    calc("calc-lim", "Moles por coeficiente", "En N₂ + 3 H₂ → 2 NH₃ hay 2 mol de N₂ y 3 mol de H₂. ¿Cuántos moles de NH₃ se pueden formar como máximo?", nums(2), "H₂ limita: 3/3 = 1 < 2/1 → 1 vez la reacción → 2 mol de NH₃.", "Divide cada reactivo por su coeficiente."),
    calc("calc-exc", "Sobrante", "Con los datos anteriores, ¿cuántos moles de N₂ sobran?", nums(1), "Se consume 1 mol de N₂: sobra 2 − 1 = 1 mol.", "Con 3 mol de H₂ reacciona 1 mol de N₂."),
    calc("calc-rend", "Rendimiento", "Se obtienen 40 g de producto cuando el rendimiento teórico es 50 g. ¿Qué rendimiento tiene la reacción, en %?", nums(80), "40/50 · 100 = 80 %.", "Rendimiento = real/teórico · 100."),
    calc("calc-real", "Masa real", "El rendimiento teórico es 200 g y el de la reacción 75 %. ¿Cuántos gramos se obtienen realmente?", nums(150), "200 · 0,75 = 150 g.", "Real = teórico · rendimiento."),
    sort("clasifica", "¿Limitante o en exceso?", "Si reaccionan 1 mol de A con 5 mol de B según A + 2 B → C, clasifica.",
      [["lim", "Reactivo limitante", "rose"], ["exc", "Reactivo en exceso", "cobalt"]],
      [["B, porque se necesitan 2 mol por cada A y hay más", "exc"], ["A, porque se agota primero", "lim"], ["El que tiene menor cociente moles/coeficiente", "lim"], ["El que tiene mayor masa", "exc"], ["El que queda sin reaccionar al final", "exc"], ["El que determina el producto formado", "lim"]],
      "Con 1 mol de A solo reaccionan 2 mol de B.",
    ),
    pick("check", "Producto máximo", "¿A partir de qué reactivo se calcula la cantidad máxima de producto?",
      "Del reactivo limitante",
      [["Del reactivo en exceso", "Sobra y no limita."], ["Del que tiene más masa", "Depende de los moles y coeficientes."], ["De cualquiera, da lo mismo", "Solo el limitante da el valor correcto."]],
      "El limitante se agota y marca el máximo.",
    ),
  ],
};
