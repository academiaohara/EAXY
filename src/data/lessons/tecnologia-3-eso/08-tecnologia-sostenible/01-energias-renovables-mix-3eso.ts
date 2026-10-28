import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const energiasRenovablesMix3esoLesson: InteractiveLesson = {
  slug: "energias-renovables-mix-3eso",
  title: "1. Energías renovables y mix energético",
  subtitle: TECESO3_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Renovables y no renovables", [
      { kind: "compare",
        left: { title: "Renovables", text: "Se regeneran a escala humana: **sol, viento, agua, biomasa, geotermia, mareas**. Emiten poco CO₂ al producir, pero dependen del clima y exigen redes y almacenamiento.", tone: "info" },
        right: { title: "No renovables", text: "Se agotan: **petróleo, gas, carbón, uranio**. Son fáciles de almacenar y regular, pero emiten CO₂ (salvo la nuclear) y generan residuos.", tone: "key" } },
    ]),
    slide("mix", "Tu mix energético", [
      { kind: "text", text: "El mix es el reparto de fuentes con que se produce la electricidad. Cámbialo y observa la producción y las emisiones." },
    ], tool("parque-renovable-explorador"), "visual-top"),
    slide("ahorro", "La energía más limpia", [
      { kind: "text", text: "La energía más limpia es la que no se gasta: mide cuánto ahorras con hábitos eficientes." },
    ], tool("ahorro-energia-explorador"), "visual-top"),
    slide("retos", "Ventajas y retos", [
      { kind: "steps", items: [
        "**Intermitencia**: el sol y el viento no siempre están; hace falta **almacenar** (baterías, bombeo) y **conectar** redes.",
        "**Generación distribuida**: miles de pequeñas instalaciones (autoconsumo) en vez de pocas grandes centrales.",
        "**Impacto local**: ocupación del terreno, paisaje, fauna.",
        "En **Asturias**: hidráulica y eólica, y una transición desde el carbón hacia nuevas fuentes.",
      ] },
    ]),
    calc("calc-porc", "Porcentaje renovable", "De 400 GWh producidos, 260 GWh son renovables. ¿Qué porcentaje es renovable?", nums(65), "260 / 400 = 0,65 = 65 %.", "Parte entre total por 100."),
    calc("calc-co2", "Emisiones evitadas", "Una instalación produce 50 000 kWh al año y cada kWh del mix fósil emite 0,3 kg de CO₂. ¿Cuántos kg de CO₂ evita?", nums(15000), "50 000 · 0,3 = 15 000 kg.", "Energía por emisión específica."),
    sort("clasifica-fuentes", "¿Renovable o no?", "Clasifica cada fuente.",
      [["ren", "Renovable", "emerald"], ["nor", "No renovable", "rose"]],
      [["Solar", "ren"], ["Eólica", "ren"], ["Hidráulica", "ren"], ["Biomasa", "ren"], ["Carbón", "nor"], ["Gas natural", "nor"], ["Petróleo", "nor"], ["Uranio", "nor"]],
      "Se distingue por su capacidad de regenerarse a escala humana.",
    ),
    pick("check-ren", "Un reto", "¿Por qué es un reto que la electricidad dependa mucho del sol y el viento?",
      "Porque no están siempre disponibles y hay que almacenar energía o tener otras fuentes de respaldo",
      [["Porque contaminan más", "Emiten muy poco CO₂."], ["Porque son más caras siempre", "Hoy son competitivas."], ["Porque se agotan", "Son renovables."]],
      "La intermitencia se resuelve con almacenamiento, redes y gestión de la demanda.",
    ),
  ],
};
