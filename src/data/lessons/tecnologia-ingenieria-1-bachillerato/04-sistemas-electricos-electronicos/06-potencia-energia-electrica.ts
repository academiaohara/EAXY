import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const potenciaEnergiaElectricaLesson: InteractiveLesson = {
  slug: "potencia-energia-electrica",
  title: "6. Potencia y energía eléctrica",
  subtitle: TEC1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("potencia", "Potencia eléctrica", [
      { kind: "definition", text: "La **potencia** eléctrica es la energía que un receptor consume o un generador entrega cada segundo. Se mide en **vatios** ($1\\ \\text{W} = 1\\ \\text{J/s}$)." },
      { kind: "formula", tex: "P = V\\cdot I = I^2 R = \\dfrac{V^2}{R}" },
      { kind: "text", text: "Las tres formas se obtienen de $P = VI$ combinándola con $V = IR$. Elige la que use los datos que conoces." },
      { kind: "example", title: "Plancha de 230 V y 1 200 W", lines: [
        { math: "I = P/V = 1200/230 = 5{,}2\\ \\text{A}" },
        { math: "R = V^2/P = 230^2/1200 = 44{,}1\\ \\Omega" },
      ] },
    ], undefined, "stack"),
    slide("joule", "Efecto Joule", [
      { kind: "rule", title: "Calor producido por la corriente", text: "Una resistencia atravesada por una corriente se calienta: toda la energía eléctrica se convierte en calor.", formula: "Q = I^2\\,R\\,t\\ \\ (\\text{J})" },
      { kind: "steps", items: [
        "Útil en estufas, tostadoras, planchas, fusibles.",
        "Perjudicial en cables y motores: es una pérdida de energía y un riesgo de calentamiento.",
        "Como depende de $I^2$, duplicar la intensidad **cuadruplica** el calor en los cables.",
      ] },
    ]),
    slide("sobrecarga", "¿Cuántos aparatos aguanta un circuito?", [
      { kind: "text", text: "Los aparatos de un mismo circuito están en paralelo y suman sus intensidades. Si pasa del límite del magnetotérmico, salta. Enciende aparatos y observa." },
    ], tool("sobrecarga-circuito-explorador", { a: 16 }), "visual-top"),
    slide("energia", "Energía, kWh y coste", [
      { kind: "rule", title: "Energía consumida", formula: "E = P\\cdot t\\qquad 1\\ \\text{kWh} = 1000\\ \\text{W}\\cdot 3600\\ \\text{s} = 3{,}6\\cdot 10^{6}\\ \\text{J}" },
      { kind: "text", text: "La factura eléctrica cobra por **kWh**: potencia en kW por horas de uso. Un aparato muy potente usado poco puede gastar menos que uno pequeño siempre encendido." },
      { kind: "rule", title: "Rendimiento", formula: "\\eta = \\dfrac{E_{\\text{útil}}}{E_{\\text{consumida}}}" },
    ]),
    slide("consumo", "Compara aparatos", [
      { kind: "text", text: "Ajusta las horas de uso diarias. ¿Qué dos aparatos dominan el consumo de un mes? ¿Y si cambias el precio de la electricidad?" },
    ], tool("consumo-energia-explorador"), "visual-top"),
    calc("calc-P", "Potencia de un receptor", "Un secador conectado a $230$ V consume $8{,}7$ A. ¿Qué potencia tiene, en W? (redondea a la decena)",
      nums(2000, 2001), "$P = V I = 230\\cdot 8{,}7 = 2\\,001\\ \\text{W} \\approx 2\\,000$ W.", "P = V·I."),
    calc("calc-coste", "Coste de un uso", "Un horno de $2\\,000$ W funciona $1{,}5$ h. Con la electricidad a $0{,}15$ €/kWh, ¿cuánto cuesta, en euros?",
      nums(0.45), "$E = 2\\ \\text{kW}\\cdot 1{,}5\\ \\text{h} = 3$ kWh; coste: $3\\cdot 0{,}15 = 0{,}45$ €.", "Pasa W a kW y multiplica por horas."),
    calc("calc-joule", "Calor en una resistencia", "Por una resistencia de $10\\ \\Omega$ circulan $2$ A durante $5$ s. ¿Cuánto calor se produce, en J?",
      nums(200), "$Q = I^2 R t = 4\\cdot 10\\cdot 5 = 200$ J.", "I²·R·t."),
    sort("clasifica-pot", "¿Qué fórmula usar?", "Asocia cada dato conocido con la expresión de potencia más cómoda.",
      [["vi", "P = V·I", "cobalt"], ["i2r", "P = I²·R", "amber"], ["v2r", "P = V²/R", "emerald"]],
      [["Conozco la tensión y la intensidad", "vi"], ["Conozco la intensidad y la resistencia de un cable", "i2r"], ["Conozco la tensión de red y la resistencia de una estufa", "v2r"], ["Mido con voltímetro y amperímetro", "vi"], ["Quiero el calor perdido en un cable de resistencia conocida", "i2r"], ["Resistencia y tensión constante de 230 V", "v2r"]],
      "Elige la fórmula que use directamente los datos que tienes y evita pasos intermedios.",
    ),
    pick("check-joule", "Cuadruplicar el calor", "En un cable la intensidad pasa de 5 A a 10 A (misma resistencia). ¿Qué ocurre con el calor que desprende por segundo?",
      "Se multiplica por 4",
      [["Se duplica", "Q/t = I²R: si I se duplica, I² se cuadruplica."], ["Se mantiene", "Depende de I², que ha cambiado."], ["Se divide por 2", "No hay motivo para que disminuya."]],
      "La potencia disipada en el cable es I²R: doblar I la multiplica por 4. Por eso las sobrecargas son peligrosas.",
    ),
  ],
};
