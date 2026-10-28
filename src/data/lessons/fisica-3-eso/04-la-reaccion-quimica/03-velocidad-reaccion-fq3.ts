import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";
export const velocidadReaccionFq3Lesson: InteractiveLesson = {
  slug: "velocidad-reaccion-fq3",
  title: "3. Velocidad de reacción",
  subtitle: FQ3_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Rápidas y lentas", [
      { kind: "steps", items: [
        "Hay reacciones **muy rápidas** (una explosión) y otras **muy lentas** (la oxidación de un clavo, la formación del petróleo).",
        "La **velocidad de reacción** indica **cuánto reactivo se consume** (o cuánto producto se forma) **por unidad de tiempo**.",
        "La **teoría de colisiones** explica por qué: para reaccionar, las partículas tienen que **chocar** con la **energía suficiente** y con la orientación adecuada.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Choques entre partículas", [
      { kind: "text", text: "Observa qué cambia cuando se modifica cada factor." },
    ], anim("fq3-colisiones"), "visual-top"),
    slide("explora", "Factores que aceleran", [
      { kind: "text", text: "Modifica la temperatura, la concentración, la superficie y el catalizador, y compara con las condiciones de referencia." },
    ], tool("fq3-velocidad-reaccion-explorador"), "visual-top"),
    slide("factores", "Resumen de factores", [
      { kind: "steps", items: [
        "**Temperatura**: al subir, las partículas se mueven más rápido y chocan con más energía. Por eso los alimentos se conservan en la **nevera**.",
        "**Concentración**: más partículas por volumen, más choques.",
        "**Superficie de contacto**: un sólido en **polvo** reacciona más rápido que en trozo.",
        "**Catalizador**: acelera la reacción sin gastarse (las **enzimas** son catalizadores biológicos; los **catalizadores** de un coche eliminan gases tóxicos).",
      ] },
    ]),
    sort("clasifica", "Más rápida o más lenta", "Clasifica cada cambio según su efecto sobre la velocidad de reacción.",
      [["ac", "La acelera", "emerald"], ["fr", "La frena", "rose"]],
      [["Subir la temperatura", "ac"], ["Triturar el sólido", "ac"], ["Añadir un catalizador", "ac"], ["Enfriar la mezcla", "fr"], ["Diluir los reactivos", "fr"], ["Usar un trozo grande en lugar de polvo", "fr"]],
      "Más choques y más energéticos, más velocidad.",
    ),
    calc("calc-temp", "Regla de los 10 °C", "En un modelo sencillo la velocidad se duplica cada 10 °C. Si pasa de 20 °C a 40 °C, ¿por cuánto se multiplica?", nums(4), "Son dos saltos de 10 °C: 2 · 2 = 4.", "Cuenta cuántos saltos de 10 °C hay."),
    calc("calc-tiempo", "Tiempo", "Una reacción tarda 12 min a 20 °C. Con el modelo de «el doble de velocidad cada 10 °C», ¿cuántos minutos tardará a 30 °C?", nums(6), "Va el doble de rápido: 12 / 2 = 6 min.", "Si la velocidad se duplica, el tiempo se reduce a la mitad."),
    pick("check", "Pastilla efervescente", "¿Por qué una pastilla efervescente triturada se disuelve antes que una entera?",
      "Porque tiene más superficie de contacto",
      [["Porque tiene más masa", "Tiene la misma."], ["Porque está más caliente", "No cambia la temperatura."], ["Porque no reacciona", "Sí reacciona, pero más rápido."]],
      "Más superficie expuesta, más choques.",
    ),
    pick("check2", "Catalizador", "¿Qué hace un catalizador?",
      "Acelera la reacción sin consumirse",
      [["Aumenta la cantidad de producto", "No cambia el producto final."], ["Se gasta al reaccionar", "No se consume."], ["Siempre frena la reacción", "Acelera (los que frenan se llaman inhibidores)."]],
      "Ofrece un camino con menor energía de activación.",
    ),
  ],
};
