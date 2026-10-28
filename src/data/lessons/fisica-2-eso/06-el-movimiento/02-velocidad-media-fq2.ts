import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const velocidadMediaFq2Lesson: InteractiveLesson = {
  slug: "velocidad-media-fq2",
  title: "2. La velocidad media",
  subtitle: FQ2_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Qué tan deprisa", [
      { kind: "steps", items: [
        "La **velocidad media** dice cuánto espacio recorre un cuerpo **por unidad de tiempo**.",
        "Se calcula dividiendo el **espacio recorrido** entre el **tiempo empleado**: **v = d / t**.",
        "En el **SI** se mide en **m/s**; en la vida diaria se usa también el **km/h**.",
        "La **rapidez** es el valor de la velocidad; la **velocidad** completa incluye además la **dirección y el sentido**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Distancia entre tiempo", [
      { kind: "text", text: "Cambia la distancia y el tiempo de un viaje. Mira la velocidad en km/h y en m/s y compárala con situaciones cotidianas." },
    ], tool("fq2-velocidad-media-explorador"), "visual-top"),
    slide("unid", "Cambiar de unidades", [
      { kind: "steps", items: [
        "**De m/s a km/h**: se multiplica por **3,6** (porque 1 m/s = 3,6 km/h).",
        "**De km/h a m/s**: se divide entre **3,6**.",
        "Ejemplo: 72 km/h = 72 / 3,6 = **20 m/s**; 10 m/s = 36 km/h.",
        "Hay que **pasar todo a las mismas unidades** antes de calcular: metros con segundos, kilómetros con horas.",
      ] },
    ]),
    calc("calc-v", "Velocidad de un coche", "Un coche recorre 150 km en 2 h. ¿Cuál es su velocidad media, en km/h?", nums(75), "150 / 2 = 75 km/h.", "Divide la distancia entre el tiempo."),
    calc("calc-ms", "A metros por segundo", "Un coche va a 90 km/h. ¿Cuántos m/s son?", nums(25), "90 / 3,6 = 25 m/s.", "Divide entre 3,6."),
    calc("calc-kmh", "A kilómetros por hora", "Un atleta corre a 10 m/s. ¿Cuántos km/h son?", nums(36), "10 · 3,6 = 36 km/h.", "Multiplica por 3,6."),
    calc("calc-t", "Tiempo de viaje", "Un tren a 200 km/h recorre 500 km. ¿Cuántas horas tarda? (t = d / v)", nums(2.5), "500 / 200 = 2,5 h.", "Divide la distancia entre la velocidad."),
    sort("clasifica", "Unidad o magnitud", "Clasifica cada término.",
      [["mag", "Magnitud", "cobalt"], ["uni", "Unidad", "amber"]],
      [["Velocidad", "mag"], ["Tiempo", "mag"], ["Distancia", "mag"], ["m/s", "uni"], ["km/h", "uni"], ["Segundo", "uni"]],
      "La magnitud es lo que se mide; la unidad, con lo que se mide.",
    ),
    pick("check", "Cuál es más rápido", "¿Cuál es más rápido: 20 m/s o 60 km/h?",
      "20 m/s (72 km/h)",
      [["60 km/h", "Son 16,7 m/s."], ["Son iguales", "No lo son: 20 m/s son 72 km/h."], ["No se pueden comparar", "Se comparan pasando a la misma unidad."]],
      "20 m/s · 3,6 = 72 km/h, mayor que 60 km/h.",
    ),
  ],
};
