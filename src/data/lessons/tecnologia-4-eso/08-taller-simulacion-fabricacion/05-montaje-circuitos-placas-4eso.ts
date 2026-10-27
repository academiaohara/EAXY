import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const montajeCircuitosPlacas4esoLesson: InteractiveLesson = {
  slug: "montaje-circuitos-placas-4eso",
  title: "5. Montaje de circuitos: soldadura y placas",
  subtitle: TECESO4_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "De la protoboard a la placa", [
      { kind: "steps", items: [
        "La **protoboard** sirve para probar sin soldar.",
        "Una **placa de circuito impreso (PCB)** tiene **pistas de cobre** que conectan los componentes y se fabrica a partir de un diseño en un programa EDA (KiCad).",
        "**Montaje**: se colocan los componentes por orden de altura (resistencias, diodos, zócalos, condensadores) y se sueldan.",
        "**Polaridad** de diodos, LED, condensadores electrolíticos y circuitos integrados: se comprueba antes de soldar.",
        "**Pruebas**: primero sin alimentar (continuidad, cortocircuitos) y después con la fuente de baja tensión.",
      ] },
    ], undefined, "stack"),
    slide("pista", "El ancho de una pista", [
      { kind: "text", text: "Una pista demasiado fina para la corriente se calienta. Calcula el ancho necesario." },
    ], tool("eso4-pista-explorador"), "visual-top"),
    slide("proto", "Probar antes de soldar", [
      { kind: "text", text: "Monta el circuito en una protoboard y comprueba las conexiones." },
    ], tool("eso3-protoboard-explorador"), "visual-top"),
    slide("sold", "Soldar bien", [
      { kind: "steps", items: [
        "Soldador de **30–40 W**, punta limpia y estaño con **flux**.",
        "**Calentar la pista y el terminal** a la vez durante 2–3 s y aplicar el estaño; la soldadura debe quedar **brillante y en forma de cono**.",
        "Una soldadura **fría** (mate, con bola) falla; una con demasiado estaño puede crear **cortocircuitos**.",
        "**Seguridad**: soporte para el soldador, ventilación (el humo del flux es irritante) y no tocar la punta (≈ 350 °C).",
      ] },
    ]),
    calc("calc-ancho", "Pista", "Una pista de 0,3 mm de ancho y 35 µm de espesor, con ρ = 1,72·10⁻⁵ Ω·mm, mide 50 mm. ¿Cuántos mΩ tiene? (ρ·L/(w·t) con t en mm, redondea a un entero)", nums(82), "1,72·10⁻⁵ · 50 / (0,3 · 0,035) ≈ 0,082 Ω = 82 mΩ.", "Resistividad por longitud entre sección."),
    calc("calc-caida", "Caída de tensión", "Por esa pista de 82 mΩ circula 1 A. ¿Cuántos mV se pierden?", nums(82), "1 · 0,082 = 0,082 V = 82 mV.", "V = I · R."),
    sort("clasifica-pol", "¿Importa la polaridad?", "Clasifica cada componente.",
      [["si", "Tiene polaridad", "rose"], ["no", "No tiene polaridad", "emerald"]],
      [["LED", "si"], ["Diodo", "si"], ["Condensador electrolítico", "si"], ["Circuito integrado", "si"], ["Resistencia", "no"], ["Condensador cerámico", "no"]],
      "Si se monta al revés, un componente polarizado puede dañarse.",
    ),
    pick("check-fria", "Soldadura fría", "¿Cómo se reconoce una soldadura fría?",
      "Es mate, rugosa o forma una bola sin mojar el terminal",
      [["Es brillante y en cono", "Es una buena soldadura."], ["Tiene mucho estaño", "Puede ser un exceso, no necesariamente fría."], ["Es de color azul", "No es un criterio."]],
      "Una buena soldadura moja la pista y el terminal.",
    ),
  ],
};
