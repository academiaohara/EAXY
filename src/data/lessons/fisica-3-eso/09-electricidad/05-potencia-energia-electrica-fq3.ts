import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const potenciaEnergiaElectricaFq3Lesson: InteractiveLesson = {
  slug: "potencia-energia-electrica-fq3",
  title: "5. Potencia y energía eléctrica",
  subtitle: FQ3_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("def", "Potencia eléctrica", [
      { kind: "steps", items: [
        "La **potencia** de un aparato es la **energía que consume por unidad de tiempo**: **P = V · I**, en **vatios (W)**.",
        "Combinando con la ley de Ohm: **P = I² · R = V² / R**.",
        "Una **resistencia** transforma casi toda la energía eléctrica en **calor** (efecto Joule): estufas, tostadoras, planchas.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Consumo de aparatos", [
      { kind: "text", text: "Elige un aparato y las horas de uso. ¿Cuánta energía consume al mes y cuánto cuesta?" },
    ], tool("fq3-consumo-electrico-explorador"), "visual-top"),
    slide("energia", "Energía eléctrica y factura", [
      { kind: "steps", items: [
        "La **energía** consumida es **E = P · t**. En la factura se mide en **kWh**: 1 kWh = 1 kW durante 1 h = **3,6 · 10⁶ J**.",
        "**Coste = kWh · precio del kWh**.",
        "Para **ahorrar**: aparatos de **clase A**, bombillas **LED**, apagar el «standby», aprovechar la luz natural.",
      ] },
    ]),
    calc("calc-p", "Potencia", "Un aparato conectado a 230 V consume 5 A. ¿Qué potencia tiene, en W?", nums(1150), "P = 230 · 5 = 1150 W.", "P = V·I."),
    calc("calc-e", "Energía", "Una estufa de 2 kW está encendida 3 h. ¿Cuántos kWh consume?", nums(6), "E = 2 · 3 = 6 kWh.", "E = P·t."),
    calc("calc-c", "Coste", "Si el kWh cuesta 0,15 €, ¿cuánto cuesta esa energía, en €? (redondea a un decimal)", nums(0.9), "6 · 0,15 = 0,90 €.", "Coste = kWh · precio."),
    calc("calc-led", "Ahorro LED", "Cambiar una bombilla de 60 W por una LED de 10 W que luce 4 h al día durante 30 días ahorra en kWh:", nums(6), "(60 − 10) W · 120 h = 6000 Wh = 6 kWh.", "Diferencia de potencia por horas."),
    sort("clasifica", "Mucho o poco consumo", "Clasifica cada aparato según su potencia típica.",
      [["al", "Alta potencia (≥ 800 W)", "rose"], ["ba", "Baja potencia (< 200 W)", "emerald"]],
      [["Lavadora (calentando)", "al"], ["Plancha", "al"], ["Microondas", "al"], ["Bombilla LED", "ba"], ["Cargador de móvil", "ba"], ["Televisión", "ba"]],
      "Los que producen calor consumen mucho.",
    ),
    pick("check", "Unidades", "¿Qué es un kWh?",
      "Una unidad de energía: 1 kW durante 1 hora",
      [["Una unidad de potencia", "Eso es el kW."], ["Una unidad de tensión", "La tensión se mide en V."], ["Una unidad de intensidad", "Eso es el A."]],
      "Es energía: potencia por tiempo.",
    ),
  ],
};
