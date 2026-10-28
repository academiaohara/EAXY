import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const esfuerzosTensionResistencia2esoLesson: InteractiveLesson = {
  slug: "esfuerzos-tension-resistencia-2eso",
  title: "1. Esfuerzos y resistencia de una estructura",
  subtitle: TECESO2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("repaso", "Los cinco esfuerzos", [
      { kind: "text", text: "Una estructura soporta cargas que producen **esfuerzos** en sus elementos. Repasa cómo trabaja una barra." },
    ], anim("esfuerzos-tipos"), "text-top"),
    slide("tension", "La tensión: fuerza por unidad de sección", [
      { kind: "rule", title: "Tensión", text: "No basta con conocer la fuerza: importa cómo se reparte en la sección del elemento. Se mide en **MPa** (1 MPa = 1 N/mm²).", formula: "σ = F / A" },
      { kind: "steps", items: [
        "Una sección **mayor** reparte la fuerza y **baja la tensión**.",
        "Cada material aguanta una tensión máxima distinta (acero > aluminio > madera).",
        "En ingeniería se exige un **coeficiente de seguridad** (resistencia ÷ tensión) bastante mayor que 1.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Tira de una barra hasta que ceda", [
      { kind: "text", text: "Cambia el material, la fuerza y la sección. Observa el coeficiente de seguridad." },
    ], tool("eso2-tension-explorador"), "visual-top"),
    calc("calc-sigma", "Calcula la tensión", "Un tirante de sección 100 mm² soporta 3 000 N de tracción. ¿Qué tensión soporta, en MPa?", nums(30), "σ = F / A = 3 000 / 100 = 30 MPa.", "σ = F / A, con A en mm² y F en N."),
    calc("calc-area", "Dimensiona la sección", "Para soportar 6 000 N sin superar una tensión de 20 MPa, ¿qué sección mínima hace falta, en mm²?", nums(300), "A = F / σ = 6 000 / 20 = 300 mm².", "Despeja A de σ = F / A."),
    sort("clasifica-esfuerzo", "¿Qué esfuerzo es?", "Relaciona cada situación con el esfuerzo principal.",
      [["tra", "Tracción", "cobalt"], ["com", "Compresión", "amber"], ["fle", "Flexión", "emerald"], ["tor", "Torsión", "violet"]],
      [["El cable de un ascensor", "tra"], ["Un tirante de tienda de campaña", "tra"], ["La columna de un edificio", "com"], ["La pata de una mesa", "com"], ["Una estantería cargada de libros", "fle"], ["El puente de un río bajo un camión", "fle"], ["Un destornillador al apretar", "tor"], ["El eje de una rueda al girar", "tor"]],
      "La tracción estira, la compresión aplasta, la flexión curva y la torsión retuerce.",
    ),
    pick("check-doble", "Doblar la sección", "Si se duplica la sección de una barra manteniendo la fuerza, ¿qué le pasa a la tensión?",
      "Se reduce a la mitad",
      [["Se duplica", "Al revés: la fuerza se reparte en más superficie."], ["No cambia", "Depende de la sección: σ = F / A."], ["Se hace cero", "Sigue habiendo fuerza, aunque repartida."]],
      "σ = F / A: con el doble de área, la tensión es la mitad.",
    ),
  ],
};
