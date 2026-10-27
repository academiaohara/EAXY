import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const transistorGananciaConmutacion4esoLesson: InteractiveLesson = {
  slug: "transistor-ganancia-conmutacion-4eso",
  title: "5. El transistor: ganancia y conmutación",
  subtitle: TECESO4_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Una corriente pequeña controla una grande", [
      { kind: "steps", items: [
        "El **transistor bipolar** (NPN) tiene tres terminales: **base (B)**, **colector (C)** y **emisor (E)**.",
        "Una pequeña corriente de base **Ib** controla una corriente mayor de colector: **Ic = β · Ib**.",
        "**Zona activa**: amplifica. **Corte**: Ib = 0, no pasa corriente. **Saturación**: conduce a tope, como un interruptor cerrado.",
        "Para conmutar cargas (relés, motores, LED potentes) se **satura** el transistor con una resistencia de base adecuada.",
      ] },
    ], undefined, "stack"),
    slide("rb", "Calcula la resistencia de base", [
      { kind: "text", text: "Elige la corriente que necesita la carga y la ganancia del transistor." },
    ], tool("eso4-transistor-explorador"), "visual-top"),
    slide("llave", "Transistor como llave", [
      { kind: "text", text: "Comprueba cómo conduce el transistor al aplicar tensión a la base." },
    ], tool("eso3-transistor-explorador"), "visual-top"),
    slide("diodo", "El diodo de rueda libre", [
      { kind: "steps", items: [
        "Una carga **inductiva** (relé, motor) genera un pico de tensión al cortarse la corriente.",
        "Ese pico puede **destruir** el transistor.",
        "Se coloca un **diodo en antiparalelo** con la bobina para disipar la energía.",
      ] },
    ]),
    calc("calc-ib", "Corriente de base", "Un transistor con β = 100 debe manejar 200 mA. ¿Qué corriente de base mínima necesita, en mA? (Ic/β)", nums(2), "200 / 100 = 2 mA.", "Divide la corriente de colector entre β."),
    calc("calc-rb", "Resistencia de base", "Con una señal de 5 V, Vbe = 0,7 V y una corriente de base de 10 mA (con margen de saturación), ¿cuántos Ω debe valer RB? ((5−0,7)/0,010)", nums(430), "4,3 / 0,010 = 430 Ω.", "Ley de Ohm en la base."),
    sort("clasifica-zona", "Zona del transistor", "Relaciona cada situación con la zona.",
      [["cor", "Corte", "rose"], ["act", "Activa", "amber"], ["sat", "Saturación", "emerald"]],
      [["Ib = 0, no pasa corriente", "cor"], ["Interruptor abierto", "cor"], ["Ic proporcional a Ib: amplificador", "act"], ["Señal de audio amplificada", "act"], ["Interruptor cerrado, Vce ≈ 0,2 V", "sat"], ["Relé activado a tope", "sat"]],
      "En digital se usa solo corte y saturación.",
    ),
    pick("check-sat", "Saturar", "¿Por qué se da más corriente de base de la mínima al usar el transistor como interruptor?",
      "Para asegurar que quede saturado aunque β varíe entre unidades",
      [["Para que se caliente más", "Se busca lo contrario."], ["Porque la base es de alta tensión", "No es la razón."], ["Para ahorrar energía", "Consume más."]],
      "β depende del ejemplar y de la temperatura.",
    ),
  ],
};
