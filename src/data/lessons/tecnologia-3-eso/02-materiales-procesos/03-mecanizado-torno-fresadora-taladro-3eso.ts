import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const mecanizadoTornoFresadoraTaladro3esoLesson: InteractiveLesson = {
  slug: "mecanizado-torno-fresadora-taladro-3eso",
  title: "3. Mecanizado: torno, fresadora y taladro",
  subtitle: TECESO3_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Arrancar material con precisión", [
      { kind: "steps", items: [
        "**Torno**: la **pieza gira** y la herramienta se desplaza: cilindros, roscas, conos.",
        "**Fresadora**: la **herramienta gira** y la pieza se desplaza: superficies planas, ranuras, formas.",
        "**Taladro**: la broca gira y avanza: agujeros.",
        "Cada operación elimina material en forma de **viruta**.",
        "Hoy muchas máquinas son de **control numérico (CNC)**: siguen un programa.",
      ] },
    ], undefined, "stack"),
    slide("corte", "Velocidad de corte", [
      { kind: "rule", title: "Velocidad de corte", text: "Es la velocidad con la que el filo de la herramienta (o de la pieza) pasa por el material. Cada material tiene una Vc recomendada.", formula: "Vc = π · D · n / 1000" },
      { kind: "text", text: "Elige el material y el diámetro: calcula las revoluciones y el tiempo de una pasada." },
    ], tool("eso3-corte-explorador"), "visual-top"),
    slide("refrig", "Buenas prácticas", [
      { kind: "steps", items: [
        "**Sujeta** la pieza con firmeza; nunca la sostengas con la mano.",
        "**Refrigera** y lubrica (taladrina) para alargar la vida de la herramienta y mejorar el acabado.",
        "**Pelo recogido**, sin anillos ni mangas sueltas y con **gafas**.",
        "**Retira la llave** del plato antes de arrancar.",
        "Las máquinas se usan **solo con permiso** y supervisión.",
      ] },
    ]),
    calc("calc-rpm", "Revoluciones del taladro", "Para taladrar acero dulce (Vc = 60 m/min) con una broca de 20 mm, ¿a cuántas rpm hay que girar? (n = 1000 · Vc / (π · D), redondea a un entero)", nums(955), "1 000 · 60 / (π · 20) ≈ 955 rpm.", "Despeja n de Vc = π · D · n / 1000."),
    calc("calc-vc", "Velocidad de corte", "Una pieza de 50 mm de diámetro gira a 400 rpm en un torno. ¿Cuál es la velocidad de corte, en m/min? (redondea a un entero)", nums(63, 62.8), "π · 50 · 400 / 1 000 ≈ 62,8 m/min.", "Vc = π · D · n / 1000."),
    calc("calc-t", "Tiempo de una pasada", "Una pasada de 100 mm con un avance de 0,2 mm por vuelta a 500 rpm, ¿cuántos minutos tarda? (L / (f · n))", nums(1), "100 / (0,2 · 500) = 1 min.", "Longitud entre avance por revoluciones."),
    sort("clasifica-maq", "Torno o fresadora", "Relaciona cada característica con la máquina.",
      [["tor", "Torno", "cobalt"], ["fre", "Fresadora", "amber"]],
      [["La pieza gira", "tor"], ["Se usa para hacer ejes y cilindros", "tor"], ["Hace roscas en piezas redondas", "tor"], ["La herramienta gira", "fre"], ["Se usa para planos, ranuras y huecos", "fre"], ["La pieza se mueve en una mesa", "fre"]],
      "En el torno gira la pieza; en la fresadora, la herramienta.",
    ),
    pick("check-vc", "Más diámetro", "Al aumentar el diámetro de la pieza manteniendo la velocidad de corte, ¿qué debe pasar con las rpm?",
      "Deben disminuir",
      [["Aumentar", "Con más diámetro, el borde va más rápido a igual rpm."], ["Mantenerse", "Cambian con D."], ["Ser cero", "No tiene sentido."]],
      "n = 1000 · Vc / (π · D): a mayor diámetro, menos rpm.",
    ),
  ],
};
