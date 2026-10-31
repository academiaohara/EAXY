import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const aceleracionFq3Lesson: InteractiveLesson = {
  slug: "aceleracion-fq3",
  title: "2. La aceleración",
  subtitle: FQ3_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cuando la velocidad cambia", [
      { kind: "steps", items: [
        "Casi ningún movimiento real es a velocidad constante: los coches **arrancan**, **frenan** y **giran**.",
        "La **aceleración** mide **cuánto cambia la velocidad por unidad de tiempo**: **a = (v − v₀) / t**. Se mide en **m/s²**.",
        "Una aceleración de 3 m/s² significa que **cada segundo** la velocidad aumenta **3 m/s**.",
        "Hay aceleración siempre que cambie el **módulo** de la velocidad (acelerar o frenar) o su **dirección** (tomar una curva).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Acelerar y frenar", [
      { kind: "text", text: "Cambia la velocidad inicial y la aceleración. ¿Cómo evoluciona la velocidad con el tiempo?" },
    ], tool("fq3-aceleracion-explorador"), "visual-top"),
    slide("signo", "El signo de la aceleración", [
      { kind: "steps", items: [
        "**a > 0**: la velocidad **aumenta**, el móvil acelera.",
        "**a < 0**: la velocidad **disminuye**, el móvil **frena** (también se llama **deceleración**).",
        "**a = 0**: velocidad constante (MRU).",
        "La **velocidad en cualquier instante** es **v = v₀ + a · t**.",
      ] },
    ]),
    calc("calc-a", "Aceleración media", "Un coche pasa de 0 a 20 m/s en 5 s. ¿Cuál es su aceleración, en m/s²?", nums(4), "a = 20 / 5 = 4 m/s².", "Divide la variación de velocidad entre el tiempo."),
    calc("calc-v", "Velocidad final", "Una moto lleva 10 m/s y acelera a 3 m/s² durante 4 s. ¿Qué velocidad tiene al final, en m/s?", nums(22), "v = 10 + 3 · 4 = 22 m/s.", "Aplica v = v₀ + a·t."),
    calc("calc-f", "Frenada", "Un coche que va a 25 m/s frena con a = −5 m/s². ¿Cuántos segundos tarda en pararse?", nums(5), "0 = 25 − 5·t → t = 5 s.", "Despeja t."),
    calc("calc-ms", "Unidades", "Un tren pasa de 36 km/h a 72 km/h en 10 s. ¿Cuál es su aceleración, en m/s²?", nums(1), "Pasa a m/s: de 10 a 20 m/s; a = 10 / 10 = 1 m/s².", "Convierte las velocidades a m/s primero."),
    sort("clasifica", "¿Hay aceleración?", "Clasifica cada situación.",
      [["si", "Hay aceleración", "amber"], ["no", "No hay aceleración", "cobalt"]],
      [["Un coche que arranca", "si"], ["Un coche que frena", "si"], ["Un coche que toma una curva a rapidez constante", "si"], ["Un coche en autopista a 120 km/h constantes en línea recta", "no"], ["Un ciclista parado", "no"], ["Una cinta transportadora a velocidad constante", "no"]],
      "Hay aceleración si cambia el módulo o la dirección de la velocidad.",
    ),
    pick("check", "Frenar", "Un coche tiene a = −2 m/s². ¿Qué significa?",
      "Que su velocidad disminuye 2 m/s cada segundo",
      [["Que va marcha atrás", "El signo de a no indica el sentido de la marcha."], ["Que va a 2 m/s", "Eso es su velocidad, no su aceleración."], ["Que está parado", "Está frenando."]],
      "Aceleración negativa en el mismo sentido del movimiento: frena.",
    ),
  ],
};
