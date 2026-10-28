import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const circuitoIntegradoTemporizador5554esoLesson: InteractiveLesson = {
  slug: "circuito-integrado-temporizador-555-4eso",
  title: "6. Circuitos integrados: el temporizador 555",
  subtitle: TECESO4_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Muchos componentes en un chip", [
      { kind: "steps", items: [
        "Un **circuito integrado (CI)** reúne miles o millones de transistores en un trozo de silicio.",
        "Se identifica por su **encapsulado**, la **muesca** que marca el pin 1 y la **hoja de características** (datasheet).",
        "Hay CI **analógicos** (amplificadores operacionales, reguladores), **digitales** (puertas lógicas, contadores) y **mixtos** (convertidores ADC, microcontroladores).",
        "El **555** es un temporizador muy usado: genera pulsos o retardos con unos pocos componentes.",
      ] },
    ], undefined, "stack"),
    slide("astable", "El 555 como oscilador", [
      { kind: "text", text: "En modo astable da una onda cuadrada continua. Elige R₁, R₂ y C y mira la frecuencia." },
    ], tool("eso4-555-explorador"), "visual-top"),
    slide("mono", "Modo monoestable", [
      { kind: "steps", items: [
        "En modo **monoestable** da **un solo pulso** de duración fija al recibir un disparo.",
        "La duración es **t = 1,1 · R · C**.",
        "Aplicaciones: luz de escalera con temporizador, antirrebote, retardo de un motor.",
      ] },
    ]),
    slide("rc", "Carga del condensador", [
      { kind: "text", text: "El 555 se basa en la carga y descarga de un condensador. Compruébalo." },
    ], tool("eso3-condensador-explorador"), "visual-top"),
    calc("calc-f", "Frecuencia", "Con R₁ = 1 kΩ, R₂ = 10 kΩ y C = 10 µF, ¿cuántos Hz? (1,44 / ((R₁+2R₂)·C), un decimal)", nums(6.9, 6.86), "1,44 / (21 000 · 0,00001) ≈ 6,86 Hz.", "Pasa kΩ a Ω y µF a F."),
    calc("calc-mono", "Pulso monoestable", "R = 100 kΩ y C = 10 µF. ¿Cuántos segundos dura el pulso? (1,1·R·C)", nums(1.1), "1,1 · 100 000 · 0,00001 = 1,1 s.", "Aplica t = 1,1·R·C."),
    sort("clasifica-ci", "¿Qué tipo de CI?", "Clasifica cada circuito integrado.",
      [["ana", "Analógico", "cobalt"], ["dig", "Digital", "amber"], ["mix", "Mixto", "emerald"]],
      [["Regulador de tensión 7805", "ana"], ["Amplificador operacional", "ana"], ["Puertas NAND 7400", "dig"], ["Contador", "dig"], ["Convertidor analógico-digital", "mix"], ["Microcontrolador", "mix"]],
      "Los mixtos combinan ambas partes.",
    ),
    pick("check-555", "Ciclo de trabajo", "En el 555 astable, ¿por qué el ciclo de trabajo es siempre mayor del 50 %?",
      "Porque el condensador se carga por R1+R2 y se descarga solo por R2",
      [["Porque el chip está estropeado", "Es normal."], ["Porque usa una pila grande", "No depende de la pila."], ["Porque C es muy grande", "Es una propiedad del circuito."]],
      "Con R1 muy pequeño se acerca al 50 %.",
    ),
  ],
};
