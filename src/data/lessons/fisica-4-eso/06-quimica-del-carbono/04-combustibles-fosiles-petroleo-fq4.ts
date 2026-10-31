import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const combustiblesFosilesPetroleoFq4Lesson: InteractiveLesson = {
  slug: "combustibles-fosiles-petroleo-fq4",
  title: "4. Combustibles fósiles y petróleo",
  subtitle: FQ4_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Combustibles fósiles", [
      { kind: "steps", items: [
        "Los **combustibles fósiles** (**carbón**, **petróleo** y **gas natural**) proceden de restos de seres vivos transformados durante **millones de años**.",
        "Son mezclas de **hidrocarburos**, con algo de azufre y nitrógeno. El gas natural es sobre todo **metano**.",
        "Son **no renovables**: se consumen mucho más rápido de lo que se forman.",
        "Aportan alrededor de las **tres cuartas partes** de la energía mundial, pero su uso tiene consecuencias ambientales.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Destilación fraccionada", [
      { kind: "text", text: "Sube la temperatura del horno y mira qué fracciones del petróleo se vaporizan y suben por la torre." },
    ], tool("fq4-petroleo-explorador"), "visual-top"),
    slide("comb", "Combustión de hidrocarburos", [
      { kind: "steps", items: [
        "**Combustión completa**: hidrocarburo + O₂ → **CO₂ + H₂O** + energía. Ejemplo: CH₄ + 2 O₂ → CO₂ + 2 H₂O.",
        "**Combustión incompleta** (poco oxígeno): produce **CO** (monóxido de carbono, tóxico) u hollín (C) además de agua.",
        "El **CO₂** emitido es un **gas de efecto invernadero**: contribuye al **calentamiento global**.",
        "El azufre del combustible forma **SO₂** y los motores generan **NOₓ**: causan **lluvia ácida** y contaminación urbana.",
      ] },
    ], undefined, "stack"),
    slide("alt", "Alternativas", [
      { kind: "text", text: "Para reducir las emisiones se apuesta por **ahorro y eficiencia**, **energías renovables** (solar, eólica, hidráulica), **biocombustibles** (etanol, biodiésel) y por tecnologías de captura de CO₂. El gas natural emite menos CO₂ por unidad de energía que el carbón, por eso se le llama combustible de transición." },
    ]),
    calc("calc-o2", "Oxígeno necesario", "Ajusta CH₄ + ? O₂ → CO₂ + 2 H₂O. ¿Cuántas moléculas de O₂ hacen falta por cada molécula de metano?", nums(2), "Hay 4 oxígenos en los productos: 2 O₂.", "Cuenta los oxígenos de CO₂ y H₂O."),
    calc("calc-co2", "CO₂ producido", "Al quemar completamente 1 mol de propano (C₃H₈), ¿cuántos moles de CO₂ se forman?", nums(3), "Cada carbono pasa a una molécula de CO₂: 3 mol.", "Un CO₂ por carbono."),
    sort("clasifica", "Fracción del petróleo", "Asocia cada uso con su fracción.",
      [["lig", "Más ligera (sale por arriba)", "cobalt"], ["med", "Intermedia", "emerald"], ["pes", "Más pesada (sale abajo)", "rose"]],
      [["Gas butano y propano", "lig"], ["Gasolina", "lig"], ["Queroseno de aviones", "med"], ["Gasóleo", "med"], ["Aceites lubricantes", "pes"], ["Asfalto", "pes"]],
      "Las cadenas más cortas hierven antes y salen por la parte alta.",
    ),
    pick("check", "Combustión incompleta", "¿Qué gas tóxico se produce en una combustión incompleta?",
      "Monóxido de carbono (CO)",
      [["Dióxido de carbono (CO₂)", "Ese es de la combustión completa."], ["Oxígeno (O₂)", "Es el comburente."], ["Helio (He)", "No interviene."]],
      "Poco oxígeno produce CO.",
    ),
  ],
};
