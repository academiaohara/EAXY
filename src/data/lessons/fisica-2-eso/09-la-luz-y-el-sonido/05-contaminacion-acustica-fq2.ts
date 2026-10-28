import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const contaminacionAcusticaFq2Lesson: InteractiveLesson = {
  slug: "contaminacion-acustica-fq2",
  title: "5. Contaminación acústica",
  subtitle: FQ2_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("def", "Sonido, ruido y contaminación", [
      { kind: "steps", items: [
        "El **ruido** es un sonido **no deseado** o molesto. La **contaminación acústica** es el exceso de ruido en el ambiente.",
        "Se origina sobre todo por el **tráfico**, las **obras**, la **industria** y el **ocio** (música alta, locales).",
        "El nivel de intensidad se mide en **decibelios (dB)** con un **sonómetro**.",
        "La escala es **logarítmica**: **+10 dB** supone una intensidad **10 veces mayor**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Decibelios y distancia", [
      { kind: "text", text: "Cambia el nivel de la fuente y la distancia al oyente. ¿Cuándo es peligroso el ruido?" },
    ], tool("fq2-decibelios-explorador"), "visual-top"),
    slide("efectos", "Efectos sobre la salud", [
      { kind: "steps", items: [
        "Por encima de unos **55 dB** de día (**45 dB** de noche) el ruido empieza a ser molesto: **estrés**, **falta de concentración**, **alteraciones del sueño**.",
        "A partir de unos **85 dB** mantenidos mucho tiempo, puede causar **daños en el oído** (pérdida de audición irreversible).",
        "Más de **120 dB** (avión, petardos cerca) llega al **umbral del dolor** y puede dañar el oído al instante.",
        "Los umbrales son **orientativos**: dependen del tiempo de exposición y de cada persona.",
      ] },
    ]),
    slide("sol", "Cómo reducir el ruido", [
      { kind: "steps", items: [
        "**En la fuente**: motores más silenciosos, maquinaria revisada, limitar la velocidad.",
        "**En el camino**: **pantallas acústicas**, ventanas con doble cristal, materiales **absorbentes** (corcho, espuma), **alejarse** de la fuente.",
        "**En el receptor**: **tapones** o **cascos** protectores; bajar el volumen de los auriculares.",
        "Cada vez que se **duplica la distancia**, el nivel baja unos **6 dB**.",
      ] },
    ]),
    calc("calc-dif", "Diferencia de nivel", "Una discoteca llega a 100 dB y una conversación a 60 dB. ¿Cuántos dB de diferencia hay?", nums(40), "100 − 60 = 40 dB.", "Resta los dos niveles."),
    calc("calc-dist", "Alejarse", "Una fuente produce 90 dB a 1 m. Cada vez que se duplica la distancia, el nivel baja 6 dB. ¿Cuántos dB hay a 4 m (dos duplicaciones)?", nums(78), "90 − 6 − 6 = 78 dB.", "Aplica la bajada dos veces."),
    calc("calc-int", "Intensidad", "Si el nivel sube 20 dB, ¿cuántas veces aumenta la intensidad? (+10 dB = ×10)", nums(100), "+20 dB son dos saltos de ×10: 10 · 10 = 100.", "Cada 10 dB multiplican por 10."),
    sort("clasifica", "Medidas", "Clasifica cada medida según dónde actúa.",
      [["fu", "En la fuente", "cobalt"], ["ca", "En el camino", "amber"], ["re", "En el receptor", "emerald"]],
      [["Motores silenciosos", "fu"], ["Limitar la velocidad", "fu"], ["Pantallas acústicas", "ca"], ["Ventanas de doble cristal", "ca"], ["Tapones para los oídos", "re"], ["Bajar el volumen de los auriculares", "re"]],
      "Se puede actuar en el origen, en la propagación o en quien escucha.",
    ),
    pick("check", "Decibelios", "Si el ruido pasa de 60 dB a 70 dB, ¿qué ocurre con su intensidad?",
      "Se multiplica por 10",
      [["Aumenta un 10 %", "La escala es logarítmica."], ["Se duplica", "Cada 10 dB multiplica por 10."], ["No cambia", "Sí cambia."]],
      "+10 dB equivale a ×10 en intensidad.",
    ),
  ],
};
