import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const teoremaTrabajoEnergiaFq4Lesson: InteractiveLesson = {
  slug: "teorema-trabajo-energia-fq4",
  title: "3. Teorema trabajo-energía",
  subtitle: FQ4_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("teorema", "El teorema", [
      { kind: "steps", items: [
        "**Trabajo neto = variación de energía cinética**: **W_neto = ΔEc = ½·m·v² − ½·m·v₀²**.",
        "El **trabajo neto** es la **suma** de los trabajos de **todas** las fuerzas (o el trabajo de la resultante).",
        "Si W_neto > 0, el cuerpo **acelera**; si W_neto < 0, **frena**; si es 0, su rapidez **no cambia**.",
        "Es una forma de la segunda ley de Newton que **evita tiempos y aceleraciones**: útil para hallar velocidades.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Empuja un bloque con rozamiento", [
      { kind: "text", text: "Cambia la fuerza y el rozamiento. ¿Cuándo el bloque se detiene? ¿Cuándo gana velocidad?" },
    ], tool("fq4-teorema-trabajo-energia-explorador"), "visual-top"),
    slide("metodo", "Cómo se aplica", [
      { kind: "steps", items: [
        "**1.** Dibuja las fuerzas y calcula el **trabajo de cada una** (W = F·d·cos θ), con su signo.",
        "**2.** Suma los trabajos: **W_neto**.",
        "**3.** Iguala a **ΔEc**: W_neto = ½·m·v² − ½·m·v₀² y despeja la incógnita.",
        "**4.** Para **frenar** hasta parar: W_roz = −Ec₀, luego **d = Ec₀/Fr**; la distancia de frenado crece con v².",
      ] },
    ], undefined, "stack"),
    slide("ejemplo", "Un ejemplo", [
      { kind: "text", text: "Un coche de 1000 kg va a 20 m/s y frena con una fuerza de rozamiento constante de 5000 N hasta detenerse. Ec₀ = ½·1000·400 = 200 000 J. W_roz = −5000·d = −200 000 → **d = 40 m**. Se obtiene sin necesidad de calcular la aceleración ni el tiempo." },
    ]),
    calc("calc-wn", "Trabajo neto", "Sobre un cuerpo actúa una fuerza de 100 N a favor del movimiento y un rozamiento de 40 N en contra, a lo largo de 5 m. ¿Cuál es el trabajo neto, en J?", nums(300), "W = (100 − 40)·5 = 300 J.", "Suma con signo."),
    calc("calc-v", "Velocidad final", "Un cuerpo de 2 kg parte del reposo y recibe un trabajo neto de 100 J. ¿Qué velocidad alcanza, en m/s?", nums(10), "100 = ½·2·v² → v² = 100 → v = 10 m/s.", "W = ½·m·v²."),
    calc("calc-d", "Distancia de frenado", "Un coche de 1000 kg a 10 m/s frena con una fuerza constante de 5000 N. ¿Cuántos metros recorre hasta parar?", nums(10), "Ec₀ = 50 000 J; d = 50 000/5000 = 10 m.", "d = Ec₀/Fr."),
    sort("clasifica", "¿Qué le pasa a la velocidad?", "Según el trabajo neto, indica si el cuerpo gana, pierde o mantiene su rapidez.",
      [["gan", "Gana rapidez", "emerald"], ["per", "Pierde rapidez", "rose"], ["man", "La mantiene", "cobalt"]],
      [["W_neto = +50 J", "gan"], ["W_neto = −30 J", "per"], ["W_neto = 0", "man"], ["Una fuerza mayor que el rozamiento a favor del movimiento", "gan"], ["Solo actúa el rozamiento", "per"], ["MRU: fuerza resultante nula", "man"]],
      "Signo de W_neto = signo de ΔEc.",
    ),
    pick("check", "Doble velocidad", "Si un coche duplica su velocidad, ¿cómo cambia la distancia de frenado con la misma fuerza de rozamiento?",
      "Se multiplica por 4",
      [["Se duplica", "d = Ec/Fr y Ec crece con v²."], ["Se multiplica por 3", "No es el caso."], ["No cambia", "Cambia mucho."]],
      "La distancia de frenado es proporcional a v².",
    ),
  ],
};
