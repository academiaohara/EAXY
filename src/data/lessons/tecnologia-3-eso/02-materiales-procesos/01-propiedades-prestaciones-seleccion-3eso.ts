import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const propiedadesPrestacionesSeleccion3esoLesson: InteractiveLesson = {
  slug: "propiedades-prestaciones-seleccion-3eso",
  title: "1. Propiedades, prestaciones y selección de materiales",
  subtitle: TECESO3_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("prop", "De la propiedad a la prestación", [
      { kind: "steps", items: [
        "Una **propiedad** es una característica del material (densidad, resistencia, dureza, conductividad).",
        "Una **prestación** es lo que se le exige a una pieza (ser ligera y rígida, soportar 200 °C, no oxidarse).",
        "Para elegir se **traducen** las prestaciones en propiedades y se **comparan** los materiales.",
        "Los **índices de selección** combinan propiedades: por ejemplo, **resistencia específica = σ / ρ**.",
      ] },
    ], undefined, "stack"),
    slide("indices", "Compara por criterios", [
      { kind: "text", text: "Cambia el criterio de selección y mira qué material gana. Los datos son orientativos." },
    ], tool("eso3-prestaciones-explorador"), "visual-top"),
    slide("matriz", "Combina varios criterios", [
      { kind: "text", text: "Cuando hay varios criterios, se pondera cada uno con una matriz de decisión." },
    ], tool("eso2-matriz-decision-explorador"), "visual-top"),
    slide("clases", "Metálicos y no metálicos", [
      { kind: "steps", items: [
        "**Metálicos**: férricos (aceros, fundiciones) y no férricos (aluminio, cobre, titanio). Conducen bien y resisten.",
        "**Plásticos**: ligeros, aislantes, fáciles de moldear; menos resistentes al calor.",
        "**Cerámicos y vidrios**: duros, resisten el calor, pero son frágiles.",
        "**Compuestos**: combinan materiales (fibra de vidrio o carbono con resina) para sumar ventajas.",
        "**Madera y derivados**: renovables y fáciles de trabajar.",
      ] },
    ]),
    calc("calc-alu", "Resistencia específica del aluminio", "El aluminio 6061 tiene σ = 275 MPa y densidad 2,7 g/cm³. ¿Cuál es su resistencia específica σ/ρ? (redondea a un entero)", nums(102), "275 / 2,7 ≈ 101,9 ≈ 102.", "Resistencia entre densidad."),
    calc("calc-pino", "Resistencia específica de la madera", "El pino tiene σ = 40 MPa y densidad 0,5 g/cm³. ¿Cuál es su σ/ρ?", nums(80), "40 / 0,5 = 80.", "Resistencia entre densidad."),
    sort("clasifica-mat", "¿A qué familia pertenece?", "Clasifica cada material.",
      [["met", "Metálico", "cobalt"], ["pla", "Plástico", "amber"], ["cer", "Cerámico o vidrio", "rose"], ["com", "Compuesto", "emerald"]],
      [["Acero", "met"], ["Aluminio", "met"], ["PVC", "pla"], ["Polietileno", "pla"], ["Porcelana", "cer"], ["Vidrio", "cer"], ["Fibra de carbono con resina", "com"], ["Hormigón armado", "com"]],
      "Cada familia agrupa materiales con propiedades parecidas.",
    ),
    pick("check-sel", "Una bici de competición", "Para el cuadro de una bicicleta de competición, ¿qué índice de selección prima?",
      "La resistencia específica, es decir, ser muy resistente y ligero",
      [["El menor precio posible", "Importa en una bici barata, no en competición."], ["La mayor densidad", "Sería más pesada."], ["El color", "No es una prestación mecánica."]],
      "Por eso se usan aluminio, titanio o fibra de carbono.",
    ),
  ],
};
