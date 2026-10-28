import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const repasoVelocidadMruFq3Lesson: InteractiveLesson = {
  slug: "repaso-velocidad-mru-fq3",
  title: "1. Rapidez, velocidad y MRU: repaso",
  subtitle: FQ3_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Describir un movimiento", [
      { kind: "steps", items: [
        "Un cuerpo está en **movimiento** si cambia de **posición** respecto de un **sistema de referencia**. Toda descripción necesita fijar ese punto de referencia.",
        "La **trayectoria** es la línea que recorre; la **distancia recorrida** (**espacio**) es su longitud; el **desplazamiento** es el segmento entre la posición inicial y la final.",
        "La **rapidez** es la distancia recorrida por unidad de tiempo; la **velocidad** además indica la **dirección y el sentido** (es una magnitud **vectorial**).",
        "**Velocidad media** = distancia / tiempo. Se mide en **m/s** (SI) o **km/h**: 1 m/s = 3,6 km/h.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Movimiento uniforme", [
      { kind: "text", text: "En un movimiento rectilíneo uniforme (MRU) la velocidad es constante. Cambia la velocidad y el tiempo." },
    ], tool("fq2-mru-explorador"), "visual-top"),
    slide("mru", "El MRU", [
      { kind: "steps", items: [
        "En el **MRU** la trayectoria es **recta** y la velocidad **constante**: recorre **distancias iguales en tiempos iguales**.",
        "**x = x₀ + v · t**: posición = posición inicial + velocidad · tiempo.",
        "Su gráfica **posición–tiempo** es una **recta**; su **velocidad–tiempo**, una **recta horizontal**. La pendiente de la recta x–t es la velocidad.",
        "Dos móviles **se encuentran** cuando tienen la misma posición en el mismo instante.",
      ] },
    ]),
    calc("calc-kmh", "Unidades", "Un coche circula a 72 km/h. ¿Cuántos m/s son?", nums(20), "72 / 3,6 = 20 m/s.", "Divide entre 3,6."),
    calc("calc-d", "Distancia", "A 20 m/s constantes, ¿cuántos metros recorre en 30 s?", nums(600), "x = 20 · 30 = 600 m.", "Distancia = velocidad · tiempo."),
    calc("calc-t", "Tiempo", "Un ciclista va a 6 m/s y debe recorrer 1,8 km. ¿Cuántos segundos tarda?", nums(300), "1800 / 6 = 300 s.", "Pasa los km a m."),
    calc("calc-enc", "Encuentro", "Dos coches parten a la vez de dos ciudades separadas 300 km y van uno hacia el otro a 70 y 80 km/h. ¿Cuántas horas tardan en cruzarse?", nums(2), "Se acercan a 150 km/h: 300 / 150 = 2 h.", "Suma las velocidades."),
    sort("clasifica", "Distancia o desplazamiento", "Clasifica cada afirmación.",
      [["di", "Distancia recorrida", "cobalt"], ["de", "Desplazamiento", "amber"]],
      [["Longitud de la trayectoria", "di"], ["Siempre es positiva y no tiene sentido", "di"], ["Lo que marca el cuentakilómetros", "di"], ["Segmento entre el punto de salida y el de llegada", "de"], ["Es cero si vuelves al punto de partida", "de"], ["Tiene dirección y sentido", "de"]],
      "Espacio recorrido: lo que recorres; desplazamiento: de dónde a dónde.",
    ),
    pick("check", "Velocidad constante", "¿Qué significa que un móvil lleva velocidad constante?",
      "Que recorre distancias iguales en tiempos iguales en línea recta",
      [["Que su rapidez aumenta uniformemente", "Eso es aceleración."], ["Que está parado", "Está en reposo."], ["Que gira a rapidez constante", "Al girar cambia la dirección, luego cambia la velocidad."]],
      "Misma rapidez, misma dirección y sentido.",
    ),
  ],
};
