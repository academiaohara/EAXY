import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const temperaturaEquilibrioTermicoFq4Lesson: InteractiveLesson = {
  slug: "temperatura-equilibrio-termico-fq4",
  title: "1. Temperatura y equilibrio térmico",
  subtitle: FQ4_SUBTITLES[11],
  stage: { theme: "board" },
  steps: [
    slide("def", "Temperatura y calor", [
      { kind: "steps", items: [
        "La **temperatura** es una medida de la **energía cinética media** de las partículas de un cuerpo: cuanto más rápido se agitan, mayor temperatura.",
        "El **calor** es la **energía que se transfiere** de un cuerpo a otro por tener distinta temperatura. Siempre va del **caliente al frío**. No es lo mismo que temperatura: un cuerpo no «contiene» calor.",
        "La **energía interna** es la suma de las energías de todas las partículas del cuerpo.",
        "El calor se mide en **julios (J)**; también en **calorías**: 1 cal = 4,18 J.",
      ] },
    ], undefined, "stack"),
    slide("escalas", "Escalas de temperatura", [
      { kind: "steps", items: [
        "**Celsius (°C)**: 0 °C congelación del agua, 100 °C ebullición (a 1 atm).",
        "**Kelvin (K)**: escala absoluta del SI. **T(K) = T(°C) + 273,15**. El **cero absoluto** (0 K = −273,15 °C) es el mínimo posible.",
        "**Fahrenheit (°F)**: °F = 1,8·°C + 32. Se usa en países anglosajones.",
        "Una variación de 1 °C equivale a una de 1 K.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Mezcla un cuerpo caliente con agua", [
      { kind: "text", text: "Cambia el material, las masas y las temperaturas. ¿Cómo influye el calor específico del material en la temperatura final?" },
    ], tool("fq4-equilibrio-termico-explorador"), "visual-top"),
    slide("eq", "Equilibrio térmico", [
      { kind: "steps", items: [
        "Si dos cuerpos a distinta temperatura se ponen en contacto, intercambian calor hasta alcanzar la **misma temperatura**: el **equilibrio térmico**.",
        "Sin pérdidas: **Q cedido = Q absorbido** → m₁·c₁·(T₁ − T_e) = m₂·c₂·(T_e − T₂).",
        "De ahí: **T_e = (m₁c₁T₁ + m₂c₂T₂)/(m₁c₁ + m₂c₂)**. Siempre queda **entre** las dos temperaturas iniciales.",
        "Con el mismo calor, un material de **c pequeño** (metal) cambia mucho su temperatura; el **agua**, de c alto, cambia poco.",
      ] },
    ], undefined, "stack"),
    calc("calc-k", "A kelvin", "¿Cuántos kelvin son 27 °C?", nums(300, 300.15), "T = 27 + 273,15 ≈ 300 K.", "K = °C + 273,15."),
    calc("calc-f", "A Celsius", "Una temperatura de 77 K, ¿cuántos °C son? (redondea a unidades)", nums(-196), "77 − 273,15 ≈ −196 °C.", "°C = K − 273,15."),
    calc("calc-te", "Misma masa de agua", "Se mezclan 1 kg de agua a 80 °C con 1 kg de agua a 20 °C. ¿Cuál es la temperatura final, en °C?", nums(50), "T_e = (80 + 20)/2 = 50 °C.", "Mismas masas y mismo c: la media."),
    calc("calc-te2", "Dos masas distintas", "Se mezclan 2 kg de agua a 10 °C con 1 kg de agua a 40 °C. ¿Cuál es la temperatura final, en °C?", nums(20), "T_e = (2·10 + 1·40)/3 = 20 °C.", "Media ponderada por la masa."),
    sort("clasifica", "Calor o temperatura", "Clasifica cada afirmación.",
      [["cal", "Se refiere al calor", "rose"], ["tem", "Se refiere a la temperatura", "cobalt"]],
      [["Se mide con un termómetro", "tem"], ["Se mide en julios", "cal"], ["Fluye del cuerpo caliente al frío", "cal"], ["Mide la agitación media de las partículas", "tem"], ["Se transfiere entre cuerpos", "cal"], ["Es 100 °C en el agua que hierve", "tem"]],
      "La temperatura es una propiedad del cuerpo; el calor, una transferencia de energía.",
    ),
    pick("check", "Sentido del calor", "Una taza de café caliente se deja en la mesa de la cocina. ¿Qué ocurre?",
      "El café cede calor al ambiente hasta igualar la temperatura",
      [["El frío pasa del ambiente al café", "No existe el flujo de frío: es calor del caliente al frío."], ["El café sigue caliente indefinidamente", "Cede calor hasta el equilibrio."], ["El ambiente cede calor al café", "El café está más caliente."]],
      "El calor va siempre del cuerpo más caliente al más frío.",
    ),
  ],
};
