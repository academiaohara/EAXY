import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const energiaSolarFotovoltaica3esoLesson: InteractiveLesson = {
  slug: "energia-solar-fotovoltaica-3eso",
  title: "2. Energía solar fotovoltaica y térmica",
  subtitle: TECESO3_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Dos formas de usar el sol", [
      { kind: "compare",
        left: { title: "Fotovoltaica", text: "Las **células de silicio** transforman la luz en **electricidad** (efecto fotovoltaico). Se conecta a la red o a baterías.", tone: "info" },
        right: { title: "Térmica", text: "Un **colector** calienta un fluido y produce **agua caliente** (ACS) o calefacción. Es más eficiente para producir calor.", tone: "key" } },
    ]),
    slide("calc", "Dimensiona una instalación", [
      { kind: "text", text: "Cambia la superficie, las horas de sol y el precio de la electricidad. Mira la energía producida y la amortización." },
    ], tool("eso3-solar-explorador"), "visual-top"),
    slide("autoc", "Autoconsumo", [
      { kind: "steps", items: [
        "**Autoconsumo**: produces tu propia electricidad y la gastas en casa.",
        "Los **excedentes** se pueden verter a la red y compensar en la factura.",
        "Una **batería** almacena para la noche, pero encarece la instalación.",
        "Los paneles rinden más **orientados al sur** y con una inclinación adecuada (≈ la latitud).",
      ] },
    ]),
    slide("consumo", "Cuánto consumes", [
      { kind: "text", text: "Para dimensionar hace falta saber cuánta energía gastas. Estima el consumo de tus aparatos." },
    ], tool("consumo-energia-explorador"), "visual-top"),
    calc("calc-wp", "Potencia pico", "Un campo de 10 m² con paneles de un 20 % de rendimiento, ¿cuántos W pico tiene? (10 · 1 000 · 0,20)", nums(2000), "10 · 1 000 · 0,20 = 2 000 W.", "Superficie por 1 000 W/m² por rendimiento."),
    calc("calc-kwh", "Energía diaria", "Con 2 kW pico, 5 horas de sol pico y un rendimiento de la instalación del 80 %, ¿cuántos kWh produce al día?", nums(8), "2 · 5 · 0,8 = 8 kWh.", "Potencia pico por horas por 0,8."),
    calc("calc-amort", "Amortización", "La instalación cuesta 6 000 € y ahorra 600 € al año. ¿En cuántos años se amortiza?", nums(10), "6 000 / 600 = 10 años.", "Inversión entre ahorro anual."),
    sort("clasifica-solar", "¿Fotovoltaica o térmica?", "Relaciona cada uso con el tipo.",
      [["fv", "Fotovoltaica", "amber"], ["te", "Térmica", "rose"]],
      [["Cargar la batería de una caravana", "fv"], ["Alimentar los electrodomésticos", "fv"], ["Verter excedentes a la red", "fv"], ["Calentar el agua de la ducha", "te"], ["Calentar una piscina", "te"], ["Apoyar la calefacción", "te"]],
      "La fotovoltaica produce electricidad; la térmica, calor.",
    ),
    pick("check-fv", "Horas de sol", "¿Por qué una instalación fotovoltaica produce menos en Asturias que en el sur de España?",
      "Porque hay menos horas de sol pico al día de media",
      [["Porque los paneles son distintos", "Son los mismos."], ["Porque el silicio no funciona con nubes", "Funciona, pero rinde menos."], ["Porque en el norte no hay luz", "Hay, pero menos horas de sol directo."]],
      "La producción depende de la radiación que recibe la zona.",
    ),
  ],
};
