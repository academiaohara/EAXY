import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const isomeriaAplicacionesFb1Lesson: InteractiveLesson = {
  slug: "isomeria-aplicaciones-fb1",
  title: "5. Isomería, reacciones y aplicaciones",
  subtitle: FB1_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("iso", "Isomería", [
      { kind: "steps", items: [
        "Los **isómeros** son compuestos con la **misma fórmula molecular** y **distinta estructura**.",
        "**Isomería de cadena**: distinta ramificación (butano / 2-metilpropano). **De posición**: el grupo o el enlace múltiple en distinto carbono (propan-1-ol / propan-2-ol). **De función**: distinto grupo (etanol / dimetil éter; propanal / propanona).",
        "**Estereoisomería**: **geométrica** (cis/trans en alquenos) y **óptica** (carbono quiral con cuatro sustituyentes distintos: dos enantiómeros).",
        "Distintas **propiedades**: temperatura de ebullición, solubilidad, reactividad, actividad biológica (los enantiómeros de un fármaco pueden tener efectos muy distintos).",
      ] },
    ], undefined, "stack"),
    slide("explora-iso", "Compara isómeros", [
      { kind: "text", text: "Elige una fórmula molecular y compara sus isómeros. ¿Cuál hierve más? ¿Por qué?" },
    ], tool("fb1-isomeria-explorador"), "visual-top"),
    slide("rx", "Reacciones orgánicas", [
      { kind: "text", text: "Repasa los tipos de reacciones y calcula la energía y el CO₂ de la combustión de los alcanos." },
    ], tool("fb1-reacciones-organicas-explorador"), "visual-top"),
    slide("aplic", "Combustibles y polímeros", [
      { kind: "steps", items: [
        "**Combustibles fósiles**: **petróleo**, **gas natural** (metano) y **carbón**. Se obtienen derivados por **destilación fraccionada** y **craqueo**. La combustión emite **CO₂** y contribuye al **cambio climático**.",
        "**Biocombustibles**: etanol y biodiésel (ésteres), de origen vegetal; ciclo de carbono más corto.",
        "**Polímeros**: polietileno, PVC, poliestireno (de **adición**); poliésteres y poliamidas (de **condensación**). Los plásticos tardan siglos en degradarse: **reducir, reutilizar y reciclar**.",
        "**Química orgánica en la vida diaria**: medicamentos, jabones, detergentes, tintes, fibras textiles, alimentos (glúcidos, lípidos, proteínas).",
      ] },
    ], undefined, "stack"),
    calc("calc-iso", "Número de isómeros", "¿Cuántos isómeros de cadena tiene el pentano, C₅H₁₂ (incluido el propio pentano)?", nums(3), "Pentano, 2-metilbutano y 2,2-dimetilpropano.", "Cuenta las formas de ramificar."),
    calc("calc-o2", "Combustión del propano", "En C₃H₈ + x O₂ → 3 CO₂ + 4 H₂O, ¿cuánto vale x?", nums(5), "(3·2 + 4)/2 = 5.", "Cuenta los oxígenos de los productos."),
    calc("calc-co2", "CO₂ emitido", "Al quemar completamente 1 mol de butano (C₄H₁₀) se forman 4 mol de CO₂. ¿Cuántos gramos de CO₂ son? (44 g/mol)", nums(176), "4·44 = 176 g.", "n(CO₂) = 4·n(butano)."),
    calc("calc-mj", "Energía", "El propano libera 2220 kJ/mol. ¿Cuántos kJ libera 0,5 mol de propano?", nums(1110), "0,5·2220 = 1110 kJ.", "Energía = n · ΔH."),
    sort("clasifica", "Tipo de isomería", "Clasifica cada pareja de isómeros.",
      [["cad", "De cadena", "cobalt"], ["pos", "De posición", "emerald"], ["fun", "De función", "rose"]],
      [["Butano y 2-metilpropano", "cad"], ["Propan-1-ol y propan-2-ol", "pos"], ["Etanol y dimetil éter", "fun"], ["Pentano y 2-metilbutano", "cad"], ["But-1-eno y but-2-eno", "pos"], ["Propanal y propanona", "fun"]],
      "Cambia la ramificación, la posición del grupo o el grupo mismo.",
    ),
    pick("check", "Isómeros", "¿Qué tienen en común dos isómeros?",
      "La fórmula molecular",
      [["La fórmula estructural", "Es lo que cambia."], ["Las propiedades físicas", "Suelen ser distintas."], ["El nombre", "Cada isómero tiene su nombre."]],
      "Misma fórmula molecular, distinta estructura.",
    ),
  ],
};
