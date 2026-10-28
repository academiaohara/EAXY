import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const transistorInterruptor3esoLesson: InteractiveLesson = {
  slug: "transistor-interruptor-3eso",
  title: "4. El transistor como interruptor",
  subtitle: TECESO3_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("anim", "Un interruptor controlado por electricidad", [
      { kind: "text", text: "Mira cómo una corriente pequeña en la base controla una corriente mucho mayor." },
    ], anim("eso3-transistor-llave"), "text-top"),
    slide("def", "Qué es un transistor", [
      { kind: "steps", items: [
        "Tiene tres terminales: **base (B)**, **colector (C)** y **emisor (E)**.",
        "El **NPN** conduce cuando la base está unos **0,7 V** por encima del emisor.",
        "Corriente de colector: **Ic = β · Ib** (β = ganancia, típicamente 100).",
        "Se usa como **interruptor** (corte o saturación) o como **amplificador**.",
        "Sirve para que un sensor o un microcontrolador, que dan poca corriente, activen un **motor, relé o lámpara**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Controla una carga", [
      { kind: "text", text: "Varía la tensión de entrada, la resistencia de base y la carga. Observa cuándo satura." },
    ], tool("eso3-transistor-explorador"), "visual-top"),
    calc("calc-ib", "Corriente de base", "Se aplica 5 V a una resistencia de base de 10 kΩ. La unión base-emisor consume 0,7 V. ¿Cuántos mA circulan por la base? (I = (5 − 0,7) / 10 000)", nums(0.43), "(5 − 0,7) / 10 000 = 0,00043 A = 0,43 mA.", "Resta 0,7 V y divide entre la resistencia."),
    calc("calc-ic", "Corriente máxima de colector", "Con β = 100 y una corriente de base de 0,43 mA, ¿cuántos mA puede dar el colector como máximo?", nums(43), "Ic = β · Ib = 100 · 0,43 = 43 mA.", "Ic = β · Ib."),
    sort("clasifica-estado", "¿En qué estado está?", "Clasifica cada situación.",
      [["cor", "Corte (apagado)", "rose"], ["sat", "Saturación (encendido)", "emerald"]],
      [["Tensión de base de 0 V", "cor"], ["Base por debajo de 0,7 V", "cor"], ["La carga no recibe corriente", "cor"], ["Base con corriente suficiente para la carga", "sat"], ["La lámpara luce a pleno brillo", "sat"], ["Ic igual a la corriente que pide la carga", "sat"]],
      "En corte el transistor es un interruptor abierto; en saturación, cerrado.",
    ),
    pick("check-satura", "No satura", "Una lámpara pide 200 mA y la base del transistor solo permite un máximo de 43 mA. ¿Qué ocurre?",
      "La lámpara luce muy débil porque el transistor no satura",
      [["La lámpara luce a pleno brillo", "No hay corriente suficiente."], ["Se funde el transistor", "Limita la corriente, no se funde."], ["Se enciende el doble", "No puede."]],
      "Hay que bajar la resistencia de base (más Ib) o usar un transistor con más ganancia.",
    ),
  ],
};
