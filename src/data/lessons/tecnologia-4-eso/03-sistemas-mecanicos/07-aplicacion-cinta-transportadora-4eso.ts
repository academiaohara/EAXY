import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const aplicacionCintaTransportadora4esoLesson: InteractiveLesson = {
  slug: "aplicacion-cinta-transportadora-4eso",
  title: "7. Aplicación: una cinta transportadora",
  subtitle: TECESO4_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Una máquina completa", [
      { kind: "steps", items: [
        "Una cinta transportadora lleva piezas de un punto a otro: **motor → reductora → tambor → cinta**.",
        "Hay que decidir la **velocidad de la cinta**, la **fuerza** que debe vencer y la **potencia** del motor.",
        "Cada elemento tiene un **rendimiento**; el del conjunto es el **producto** de todos.",
        "El control (sensores y PLC) arranca, para y sincroniza la cinta con otras máquinas, como vimos en automatización.",
      ] },
    ], undefined, "stack"),
    slide("calc", "Dimensiona la cinta", [
      { kind: "text", text: "Cambia el motor, la reductora y el tambor. Calcula la velocidad y la potencia del motor." },
    ], tool("eso4-cinta-explorador"), "visual-top"),
    slide("trans", "Etapa de transmisión", [
      { kind: "text", text: "Comprueba el reparto de velocidad y par en una etapa de la reductora." },
    ], tool("eso4-transmision-explorador"), "visual-top"),
    slide("seg", "Seguridad", [
      { kind: "steps", items: [
        "**Resguardos** en tambores, correas y engranajes: evitan atrapamientos.",
        "**Parada de emergencia** accesible a lo largo de toda la cinta.",
        "**Protección** contra el arranque inesperado durante el mantenimiento.",
        "**Ruido y vibración**: revisar rodamientos y alineación.",
      ] },
    ]),
    calc("calc-n", "Velocidad del tambor", "Un motor a 1 400 rpm con una reductora 20:1. ¿A cuántas rpm gira el tambor?", nums(70), "1 400 / 20 = 70 rpm.", "Velocidad entre relación."),
    calc("calc-v", "Velocidad de la cinta", "El tambor de 100 mm de diámetro gira a 70 rpm. ¿Cuántos m/s avanza la cinta? (π·0,1·70/60, redondea a un decimal)", nums(0.4, 0.37), "π · 0,1 · 1,167 ≈ 0,37 m/s.", "Perímetro por vueltas por segundo."),
    calc("calc-pu", "Potencia útil", "Con una fuerza de 80 N y 0,37 m/s, ¿qué potencia útil hace falta, en W? (redondea a un entero)", nums(29, 29.3), "80 · 0,366 ≈ 29,3 W.", "Fuerza por velocidad."),
    sort("clasifica-cinta", "¿Qué elemento?", "Relaciona cada magnitud con el elemento donde se determina.",
      [["mot", "Motor", "cobalt"], ["red", "Reductora", "amber"], ["tam", "Tambor y cinta", "emerald"]],
      [["Potencia disponible", "mot"], ["Velocidad nominal", "mot"], ["Relación de transmisión", "red"], ["Par a la salida", "red"], ["Velocidad lineal de la cinta", "tam"], ["Fuerza de arrastre sobre la carga", "tam"]],
      "Cada bloque aporta una parte de las prestaciones.",
    ),
    pick("check-cinta", "Una cinta más lenta", "Se quiere que la cinta vaya más despacio con el mismo motor y tambor. ¿Qué se cambia?",
      "La relación de la reductora: se aumenta",
      [["Se reduce la relación", "Iría más deprisa."], ["Se aumenta el diámetro del tambor", "Iría más deprisa."], ["Se quita el tambor", "Dejaría de funcionar."]],
      "Más relación significa menos velocidad de salida.",
    ),
  ],
};
