import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";
export const movimientoRectilineoUniformeFq2Lesson: InteractiveLesson = {
  slug: "movimiento-rectilineo-uniforme-fq2",
  title: "3. El movimiento rectilíneo uniforme",
  subtitle: FQ2_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Velocidad constante", [
      { kind: "steps", items: [
        "Un **movimiento rectilíneo uniforme (MRU)** tiene **trayectoria recta** y **velocidad constante**.",
        "En **tiempos iguales** recorre **espacios iguales**.",
        "No hay cambios de rapidez ni de dirección: es el movimiento más sencillo.",
        "Casi ningún movimiento real es uniforme del todo, pero muchos lo son **aproximadamente** durante un tramo.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Espacios iguales en tiempos iguales", [
      { kind: "text", text: "Mira un coche con velocidad constante: cada segundo avanza lo mismo." },
    ], anim("fq2-mru-estroboscopica"), "visual-top"),
    slide("explora", "Cambia la velocidad", [
      { kind: "text", text: "Cambia la posición inicial, la velocidad y el tiempo. Observa dónde está el móvil y qué pasa con velocidad negativa." },
    ], tool("fq2-mru-explorador"), "visual-top"),
    slide("ecua", "La ecuación del MRU", [
      { kind: "steps", items: [
        "**x = x₀ + v · t**: la posición en un instante es la inicial más lo recorrido (v · t).",
        "**x₀** es la **posición inicial**, **v** la **velocidad** y **t** el **tiempo**.",
        "Si **v > 0**, el móvil avanza en el sentido positivo; si **v < 0**, retrocede; si **v = 0**, está parado.",
        "Si sale del origen (x₀ = 0), la ecuación es **x = v · t**.",
      ] },
    ]),
    calc("calc-x", "Posición", "Un ciclista sale del origen a 5 m/s. ¿En qué posición está a los 12 s, en m?", nums(60), "x = 5 · 12 = 60 m.", "Multiplica velocidad por tiempo."),
    calc("calc-x0", "Con posición inicial", "Un coche parte de x₀ = 100 m con v = 20 m/s. ¿Dónde está a los 5 s, en m?", nums(200), "x = 100 + 20 · 5 = 200 m.", "Suma la posición inicial."),
    calc("calc-tt", "Tiempo", "Un tren a 30 m/s ha de recorrer 900 m. ¿Cuántos segundos tarda?", nums(30), "t = 900 / 30 = 30 s.", "t = d / v."),
    calc("calc-neg", "Velocidad negativa", "Un móvil parte de 80 m con v = −10 m/s. ¿Dónde está a los 5 s, en m?", nums(30), "x = 80 − 10 · 5 = 30 m (se acerca al origen).", "Resta lo recorrido."),
    sort("clasifica", "¿Es un MRU?", "Clasifica cada movimiento.",
      [["si", "MRU (aproximadamente)", "cobalt"], ["no", "No es MRU", "amber"]],
      [["Un tren a 100 km/h constantes en una vía recta", "si"], ["Una cinta transportadora", "si"], ["La luz en el vacío", "si"], ["Un coche que frena en un semáforo", "no"], ["Un ciclista en una curva", "no"], ["Una piedra al caer", "no"]],
      "MRU: línea recta y velocidad constante.",
    ),
    pick("check", "Espacios iguales", "En un MRU, ¿qué se cumple?",
      "En tiempos iguales recorre espacios iguales",
      [["La velocidad aumenta con el tiempo", "Es constante."], ["La trayectoria es una curva", "Es recta."], ["La posición no cambia", "Cambia con el tiempo."]],
      "Es la definición del movimiento uniforme.",
    ),
  ],
};
