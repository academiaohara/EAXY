import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";
export const mruaFq3Lesson: InteractiveLesson = {
  slug: "mrua-fq3",
  title: "3. Movimiento rectilíneo uniformemente acelerado",
  subtitle: FQ3_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "El MRUA", [
      { kind: "steps", items: [
        "El **MRUA** es un movimiento de trayectoria **recta** con **aceleración constante**.",
        "La velocidad cambia **lo mismo en cada segundo**: **v = v₀ + a · t**.",
        "La posición cumple **x = x₀ + v₀ · t + ½ · a · t²**.",
        "Si no se conoce el tiempo: **v² = v₀² + 2 · a · Δx**.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Marcas de un MRU y un MRUA", [
      { kind: "text", text: "Compara las posiciones y las velocidades de un movimiento uniforme y de uno acelerado." },
    ], anim("fq3-mrua"), "visual-top"),
    slide("explora", "Posición y velocidad", [
      { kind: "text", text: "Cambia la velocidad inicial y la aceleración. Observa la gráfica posición–tiempo." },
    ], tool("fq3-mrua-explorador"), "visual-top"),
    slide("graf", "Las gráficas del MRUA", [
      { kind: "steps", items: [
        "**x–t**: una **parábola** (la posición crece cada vez más deprisa si acelera).",
        "**v–t**: una **recta inclinada** cuya **pendiente** es la aceleración.",
        "**a–t**: una **recta horizontal** (a constante).",
        "Desde el reposo, las distancias en segundos consecutivos están en proporción **1 : 3 : 5 : 7 …**",
      ] },
    ]),
    calc("calc-x", "Posición", "Un coche parte del reposo con a = 2 m/s². ¿Qué distancia recorre en 5 s, en m?", nums(25), "x = ½ · 2 · 5² = 25 m.", "Con v₀ = 0: x = ½·a·t²."),
    calc("calc-xv", "Con velocidad inicial", "Una moto que lleva 10 m/s acelera a 2 m/s² durante 4 s. ¿Qué distancia recorre, en m?", nums(56), "x = 10·4 + ½·2·4² = 40 + 16 = 56 m.", "Suma los dos términos."),
    calc("calc-vsin", "Sin el tiempo", "Un móvil parte del reposo con a = 2 m/s² y recorre 25 m. ¿Qué velocidad alcanza, en m/s?", nums(10), "v² = 2 · 2 · 25 = 100 → v = 10 m/s.", "Usa v² = v₀² + 2·a·Δx."),
    calc("calc-dob", "Doble de tiempo", "Desde el reposo, un móvil recorre 10 m en 2 s. ¿Cuántos metros recorrerá en 4 s?", nums(40), "Al doble de tiempo, cuatro veces la distancia: 40 m.", "x depende de t²."),
    sort("clasifica", "Tipo de gráfica", "Asocia cada gráfica con el movimiento que representa.",
      [["rec", "MRU", "cobalt"], ["par", "MRUA", "amber"]],
      [["x–t es una recta inclinada", "rec"], ["v–t es una recta horizontal", "rec"], ["a = 0", "rec"], ["x–t es una parábola", "par"], ["v–t es una recta inclinada", "par"], ["a es constante y distinta de cero", "par"]],
      "En el MRUA, v–t es inclinada y x–t es curva.",
    ),
    pick("check", "Distancias", "Un móvil parte del reposo con aceleración constante. Si en el primer segundo recorre 1 m, ¿cuánto recorre en el segundo siguiente?",
      "3 m",
      [["1 m", "Su velocidad aumenta, así que recorre más."], ["2 m", "No es proporcional al tiempo."], ["4 m", "Eso sería el total acumulado a los 2 s."]],
      "Proporción 1 : 3 : 5 …",
    ),
  ],
};
