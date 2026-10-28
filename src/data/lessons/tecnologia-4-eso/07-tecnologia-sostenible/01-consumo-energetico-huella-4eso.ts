import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const consumoEnergeticoHuella4esoLesson: InteractiveLesson = {
  slug: "consumo-energetico-huella-4eso",
  title: "1. Consumo energético y huella de carbono",
  subtitle: TECESO4_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Medir para poder reducir", [
      { kind: "steps", items: [
        "El **consumo energético** se mide en **kWh** (electricidad, gas) o en litros de combustible.",
        "La **huella de carbono** suma las emisiones de gases de efecto invernadero asociadas a una actividad, en **kg o t de CO₂ equivalente**.",
        "Emisiones = **consumo × factor de emisión** (kg de CO₂ por kWh, por km, por kg de producto).",
        "Mejor se mide por **persona y año** para comparar: el objetivo para frenar el cambio climático ronda las **2 t por persona**.",
      ] },
    ], undefined, "stack"),
    slide("huella", "La huella de un hogar", [
      { kind: "text", text: "Cambia el consumo de electricidad, gas, coche y vuelos. Mira qué pesa más." },
    ], tool("eso4-huella-hogar-explorador"), "visual-top"),
    slide("factura", "Lee tu factura", [
      { kind: "text", text: "La factura de la luz separa potencia contratada y energía consumida." },
    ], tool("eso2-factura-explorador"), "visual-top"),
    slide("ahorro", "Pequeños cambios, grandes ahorros", [
      { kind: "text", text: "Estima el efecto de hábitos y equipos eficientes." },
    ], tool("ahorro-energia-explorador"), "visual-top"),
    calc("calc-co2", "Emisiones de la electricidad", "Un hogar consume 3 000 kWh al año y cada kWh emite 0,2 kg de CO₂. ¿Cuántos kg de CO₂ al año?", nums(600), "3 000 · 0,2 = 600 kg.", "Consumo por factor de emisión."),
    calc("calc-pp", "Por persona", "Las emisiones de un hogar son 6 t al año y viven 3 personas. ¿Cuántas t por persona?", nums(2), "6 / 3 = 2 t por persona.", "Emisiones entre personas."),
    calc("calc-arb", "Árboles", "Un árbol absorbe unos 22 kg de CO₂ al año. ¿Cuántos árboles absorben 660 kg?", nums(30), "660 / 22 = 30 árboles.", "Emisiones entre lo que absorbe un árbol."),
    sort("clasifica-emis", "¿Alta o baja emisión?", "Clasifica cada hábito según su impacto.",
      [["alt", "Impacto alto", "rose"], ["baj", "Impacto bajo", "emerald"]],
      [["Un vuelo transatlántico", "alt"], ["Ir al instituto en coche solo", "alt"], ["Calefacción a 25 °C", "alt"], ["Ir en bici o a pie", "baj"], ["Ir en tren o autobús", "baj"], ["Luces LED y apagar lo que no se usa", "baj"]],
      "Transporte y calefacción son las partidas que más pesan.",
    ),
    pick("check-hu", "Qué medir", "¿Para qué sirve calcular la huella de carbono?",
      "Para saber dónde están las emisiones y elegir las medidas que más reducen",
      [["Para culpar a alguien", "Es una herramienta de decisión."], ["Para pagar menos impuestos solamente", "No es su objetivo."], ["No sirve", "Permite priorizar."]],
      "Lo que no se mide no se puede mejorar.",
    ),
  ],
};
