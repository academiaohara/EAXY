import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const potenciaEnergiaElectrica2esoLesson: InteractiveLesson = {
  slug: "potencia-energia-electrica-2eso",
  title: "3. Potencia y energía eléctrica",
  subtitle: TECESO2_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("potencia", "Potencia: qué tan deprisa se usa la energía", [
      { kind: "rule", title: "Potencia eléctrica", text: "Es la energía que consume un aparato cada segundo. Se mide en **vatios (W)**; 1 kW = 1 000 W.", formula: "P = V · I" },
      { kind: "steps", items: [
        "Una bombilla LED de 9 W consume poco; un horno de 2 000 W consume mucho.",
        "Combinando con la ley de Ohm: **P = I² · R** y **P = V² / R**.",
      ] },
    ], undefined, "stack"),
    slide("energia", "Energía: potencia durante un tiempo", [
      { kind: "rule", title: "Energía eléctrica", text: "Es la potencia multiplicada por el tiempo de uso. En casa se mide en **kilovatios-hora (kWh)**.", formula: "E = P · t" },
      { kind: "example", title: "Un ejemplo", lines: [
        { math: "P = 2\\,000\\ W = 2\\ kW" },
        { math: "t = 1,5\\ h" },
        { math: "E = 2 \\cdot 1,5 = 3\\ kWh", note: "Es lo que gasta el horno en hora y media." },
      ] },
    ]),
    slide("factura", "La factura de la luz", [
      { kind: "text", text: "La factura depende de la energía consumida (kWh) y del precio del kWh. Ajusta las horas de uso de cada aparato y mira cuál pesa más." },
    ], tool("eso2-factura-explorador"), "visual-top"),
    calc("calc-p", "Potencia de un aparato", "Un secador funciona a 230 V y consume 5 A. ¿Qué potencia tiene, en W?", nums(1150), "P = V · I = 230 · 5 = 1 150 W.", "P = V · I."),
    calc("calc-e", "Energía consumida", "Un horno de 2 000 W funciona 1,5 h. ¿Cuántos kWh consume?", nums(3), "E = 2 kW · 1,5 h = 3 kWh.", "Pasa la potencia a kW antes de multiplicar."),
    calc("calc-coste", "Coste", "Si el kWh cuesta 0,15 €, ¿cuánto cuestan 3 kWh, en €?", nums(0.45), "3 · 0,15 = 0,45 €.", "Coste = energía · precio del kWh."),
    sort("clasifica-ahorro", "Ahorrar energía", "¿Qué hábito reduce el consumo?",
      [["ah", "Ahorra", "emerald"], ["gas", "Gasta de más", "rose"]],
      [["Cambiar bombillas por LED", "ah"], ["Apagar el ordenador al terminar", "ah"], ["Desenchufar cargadores sin uso", "ah"], ["Dejar la tele encendida sin mirarla", "gas"], ["Abrir mucho la nevera sin necesidad", "gas"], ["Dejar luces encendidas en habitaciones vacías", "gas"]],
      "Menos potencia o menos tiempo de uso significa menos energía y menos coste.",
    ),
    pick("check-unid", "Unidades", "Un recibo de la luz muestra kWh. ¿Qué magnitud mide el kWh?",
      "Energía",
      [["Potencia", "La potencia se mide en W o kW."], ["Tensión", "La tensión se mide en voltios."], ["Intensidad", "La intensidad se mide en amperios."]],
      "kWh = kW · h: potencia por tiempo, es decir, energía.",
    ),
  ],
};
