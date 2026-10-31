import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const potenciaRendimientoFb1Lesson: InteractiveLesson = {
  slug: "potencia-rendimiento-fb1",
  title: "5. Potencia y rendimiento",
  subtitle: FB1_SUBTITLES[11],
  stage: { theme: "board" },
  steps: [
    slide("pot", "Potencia", [
      { kind: "steps", items: [
        "La **potencia** es el trabajo (o energía transferida) por unidad de tiempo: **P = W/t**. Unidad: **vatio** (1 W = 1 J/s).",
        "Con fuerza constante y velocidad v: **P = F·v** (potencia instantánea P = F·v·cos α).",
        "Otras unidades: **1 CV = 735,5 W**; **1 kW = 1000 W**. La energía se mide también en **kWh**: **1 kWh = 3,6·10⁶ J**.",
        "Potencia grande = realizar el mismo trabajo **más rápido**. Un coche y un ciclista suben la misma cuesta con la misma energía útil, pero con potencias distintas.",
      ] },
    ], undefined, "stack"),
    slide("rend", "Rendimiento", [
      { kind: "steps", items: [
        "**Rendimiento** de una máquina: **η = W_útil/W_consumido = P_útil/P_consumida** (0 ≤ η ≤ 1; se suele dar en %).",
        "Siempre es **menor que 1**: parte de la energía se **disipa** (calor por rozamiento, efecto Joule…), pero no se destruye.",
        "En una **cadena de máquinas**, los rendimientos **se multiplican**: η_total = η₁·η₂·…",
        "Ejemplos: motor de gasolina ≈ 25–35 %; eléctrico ≈ 90 %; bombilla LED ≈ 30 %; incandescente ≈ 5 %.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Elevar una carga", [
      { kind: "text", text: "Cambia la carga, la altura, el tiempo y el rendimiento del motor. Mira la potencia útil y consumida, y el coste de la energía." },
    ], tool("fb1-potencia-rendimiento-explorador"), "visual-top"),
    calc("calc-p", "Potencia", "Un motor realiza 12 000 J de trabajo en 4 s. ¿Qué potencia desarrolla, en W?", nums(3000), "P = 12 000/4 = 3000 W.", "P = W/t."),
    calc("calc-fv", "P = F·v", "Un coche mantiene 25 m/s contra una resistencia de 800 N. ¿Qué potencia útil entrega el motor, en kW?", nums(20), "P = 800·25 = 20 000 W = 20 kW.", "P = F·v."),
    calc("calc-rend", "Rendimiento", "Un motor consume 5000 J y realiza 3500 J de trabajo útil. ¿Cuál es su rendimiento, en %?", nums(70), "η = 3500/5000 = 0,70 = 70 %.", "η = útil/consumido."),
    calc("calc-kwh", "Energía en kWh", "Un radiador de 2 kW funciona 3 h. ¿Cuántos kWh consume?", nums(6), "E = 2·3 = 6 kWh.", "E = P·t."),
    calc("calc-cad", "Cadena de rendimientos", "Una central tiene η = 0,4 y la línea eléctrica η = 0,9. ¿Cuál es el rendimiento global, en %?", nums(36), "0,4·0,9 = 0,36 = 36 %.", "Se multiplican."),
    sort("clasifica", "Unidad de…", "¿Es unidad de potencia o de energía?",
      [["pot", "Potencia", "cobalt"], ["ene", "Energía", "emerald"]],
      [["Vatio (W)", "pot"], ["Julio (J)", "ene"], ["kWh", "ene"], ["Caballo de vapor (CV)", "pot"], ["kW", "pot"], ["N·m", "ene"]],
      "Potencia = energía/tiempo.",
    ),
    pick("check", "Rendimiento", "¿Puede una máquina tener un rendimiento del 120 %?",
      "No: se estaría creando energía, lo que contradice la conservación",
      [["Sí, si es muy eficiente", "Siempre η < 1."], ["Sí, con rozamiento", "Con rozamiento se pierde más."], ["Solo si es eléctrica", "Ninguna máquina real lo logra."]],
      "Útil ≤ consumida.",
    ),
  ],
};
