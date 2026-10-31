import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const rendimientoFq4Lesson: InteractiveLesson = {
  slug: "rendimiento-fq4",
  title: "5. Rendimiento y ahorro de energía",
  subtitle: FQ4_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("def", "Qué es el rendimiento", [
      { kind: "steps", items: [
        "Toda máquina **transforma** energía: recibe energía **total** y entrega energía **útil**; el resto se **disipa**, normalmente como calor.",
        "**Rendimiento: η = E_útil/E_total**, o con potencias, **η = P_útil/P_total**. Se expresa en % y es siempre **menor que 100 %**.",
        "Un rendimiento bajo no significa que se «pierda» energía: se **degrada** en una forma menos aprovechable.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Compara aparatos", [
      { kind: "text", text: "Elige un aparato y mira cuánta energía se aprovecha y cuánta se disipa. ¿Cuánto cuesta mantenerlo encendido?" },
    ], tool("fq4-rendimiento-explorador"), "visual-top"),
    slide("kwh", "Energía eléctrica y coste", [
      { kind: "steps", items: [
        "La energía eléctrica se factura en **kilovatios hora (kWh)**: **E = P·t** con P en kW y t en horas.",
        "**1 kWh = 3,6·10⁶ J.** El coste es E (kWh) · precio (€/kWh).",
        "Una bombilla incandescente de 60 W encendida 5 h gasta 0,3 kWh; una LED que da la misma luz (≈ 8 W), 0,04 kWh.",
        "La **etiqueta energética** (A–G) clasifica los electrodomésticos según su consumo.",
      ] },
    ], undefined, "stack"),
    slide("ahorro", "Ahorrar energía", [
      { kind: "steps", items: [
        "**Eficiencia**: usar aparatos de mayor rendimiento (LED, clase A, bombas de calor).",
        "**Hábitos**: apagar lo que no se usa, aprovechar la luz natural, regular la calefacción, aislar la vivienda.",
        "**Fuentes**: las **renovables** (solar, eólica, hidráulica) reducen las emisiones de CO₂ frente a los combustibles fósiles.",
        "Ahorrar energía reduce el **gasto**, las **emisiones** y la dependencia de recursos **no renovables**.",
      ] },
    ], undefined, "stack"),
    calc("calc-eta", "Rendimiento", "Un motor consume 500 J y realiza 400 J de trabajo útil. ¿Qué rendimiento tiene, en %?", nums(80), "η = 400/500 = 0,8 = 80 %.", "η = útil/total."),
    calc("calc-util", "Energía útil", "Una máquina de rendimiento 40 % consume 2000 J. ¿Cuántos julios útiles entrega?", nums(800), "E útil = 0,4·2000 = 800 J.", "E útil = η·E total."),
    calc("calc-kwh", "Consumo", "Un televisor de 150 W está encendido 4 h. ¿Cuántos kWh consume?", nums(0.6), "E = 0,15 kW·4 h = 0,6 kWh.", "E = P·t."),
    calc("calc-coste", "Coste", "Un consumo de 20 kWh con un precio de 0,15 €/kWh cuesta… (en €)", nums(3), "20·0,15 = 3 €.", "Coste = E·precio."),
    sort("clasifica", "Útil o disipada", "En una bombilla incandescente, ¿qué energía es útil y cuál se disipa?",
      [["uti", "Útil", "emerald"], ["dis", "Disipada", "rose"]],
      [["La luz emitida", "uti"], ["El calor que desprende", "dis"], ["En un motor, el movimiento del eje", "uti"], ["En un motor, el calor y el ruido", "dis"], ["En un panel solar, la electricidad", "uti"], ["En un panel solar, el calor del panel", "dis"]],
      "Útil es lo que buscas; el resto, pérdida.",
    ),
    pick("check", "Rendimiento imposible", "¿Puede una máquina real tener un rendimiento del 110 %?",
      "No: siempre hay pérdidas, y la energía útil no puede superar a la total",
      [["Sí, si es muy eficiente", "Violaría la conservación de la energía."], ["Sí, con energías renovables", "El rendimiento nunca supera el 100 %."], ["Sí, si se enfría", "No es posible."]],
      "η ≤ 100 %: la energía no se crea.",
    ),
  ],
};
