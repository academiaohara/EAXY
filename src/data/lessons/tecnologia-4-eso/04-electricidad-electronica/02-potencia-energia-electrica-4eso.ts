import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const potenciaEnergiaElectrica4esoLesson: InteractiveLesson = {
  slug: "potencia-energia-electrica-4eso",
  title: "2. Potencia y energía eléctricas",
  subtitle: TECESO4_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cuánto trabaja y cuánto gasta", [
      { kind: "rule", title: "Potencia eléctrica", text: "La potencia es la energía que un aparato transforma cada segundo. Se mide en vatios (W).", formula: "P = V · I" },
      { kind: "rule", title: "Energía", text: "La energía es la potencia por el tiempo de funcionamiento. En la factura se mide en kWh.", formula: "E = P · t" },
      { kind: "text", text: "Combinando con la ley de Ohm: **P = I²·R = V²/R**." },
    ], undefined, "stack"),
    slide("tool", "Potencia, energía y coste", [
      { kind: "text", text: "Cambia la tensión, la corriente y las horas de uso. Mira la potencia, la energía al mes y el coste." },
    ], tool("eso4-potencia-explorador"), "visual-top"),
    slide("efecto", "Efecto Joule y rendimiento", [
      { kind: "steps", items: [
        "Cuando la corriente pasa por un conductor se **calienta**: es el **efecto Joule**, con potencia perdida P = I²·R.",
        "Por eso los cables delgados con mucha corriente se calientan y se protegen con **fusibles** y **magnetotérmicos**.",
        "El rendimiento compara la energía útil con la consumida: η = $P_{\\mathrm{útil}}$ / $P_{\\mathrm{consumida}}$.",
        "Una bombilla LED convierte en luz mucho más energía que una incandescente, que pierde casi todo en calor.",
      ] },
    ]),
    calc("calc-p", "Potencia", "Un aparato funciona a 230 V y consume 5 A. ¿Qué potencia tiene, en W?", nums(1150), "230 · 5 = 1 150 W.", "Multiplica tensión y corriente."),
    calc("calc-e", "Energía", "Ese aparato de 1 150 W está encendido 2 horas. ¿Cuántos kWh gasta?", nums(2.3), "1,15 kW · 2 h = 2,3 kWh.", "Pasa a kW y multiplica por las horas."),
    calc("calc-joule", "Calor en un cable", "Por un cable de 0,5 Ω circulan 10 A. ¿Qué potencia se pierde en calor, en W? (I²·R)", nums(50), "10² · 0,5 = 50 W.", "Corriente al cuadrado por resistencia."),
    sort("clasifica-pot", "¿Qué fórmula?", "Elige la expresión más cómoda según los datos.",
      [["vi", "P = V · I", "cobalt"], ["ir", "P = I² · R", "amber"], ["vr", "P = V² / R", "emerald"]],
      [["Conozco tensión y corriente", "vi"], ["Conozco tensión y corriente de un motor", "vi"], ["Conozco corriente y resistencia del cable", "ir"], ["Calor en un conductor", "ir"], ["Conozco tensión y resistencia de una estufa", "vr"], ["Potencia de una resistencia conectada a 12 V", "vr"]],
      "Las tres son la misma ley escrita con la ley de Ohm.",
    ),
    pick("check-rend", "Rendimiento", "Una bombilla consume 60 W y da 6 W de luz. ¿Cuál es su rendimiento?",
      "10 %: el resto se pierde en calor",
      [["90 %", "Es al revés."], ["100 %", "Siempre hay pérdidas."], ["6 %", "6 de 60 es el 10 %."]],
      "η = 6 / 60 = 0,10.",
    ),
  ],
};
