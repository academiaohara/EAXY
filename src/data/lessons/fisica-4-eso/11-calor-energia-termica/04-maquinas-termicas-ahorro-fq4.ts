import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const maquinasTermicasAhorroFq4Lesson: InteractiveLesson = {
  slug: "maquinas-termicas-ahorro-fq4",
  title: "4. Máquinas térmicas y ahorro energético",
  subtitle: FQ4_SUBTITLES[11],
  stage: { theme: "board" },
  steps: [
    slide("def", "Calor y trabajo", [
      { kind: "steps", items: [
        "El **calor** y el **trabajo** son dos formas de **transferir energía**. Joule demostró que son equivalentes: el trabajo puede transformarse en calor (rozamiento) y el calor, parcialmente, en trabajo.",
        "Una **máquina térmica** convierte calor en **trabajo mecánico** de forma continua: motores de combustión, turbinas de vapor, centrales térmicas.",
        "Funciona con dos focos: toma **Q_h** de un **foco caliente**, produce **W** y cede **Q_c** a un **foco frío**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Una máquina térmica", [
      { kind: "text", text: "Cambia el rendimiento y las temperaturas de los focos. ¿Qué rendimiento máximo permite la naturaleza?" },
    ], tool("fq4-maquinas-termicas-explorador"), "visual-top"),
    slide("rend", "Rendimiento y límites", [
      { kind: "steps", items: [
        "**Conservación de la energía**: **Q_h = W + Q_c**. **Rendimiento**: **η = W/Q_h = 1 − Q_c/Q_h**.",
        "**Segundo principio**: no existe una máquina que convierta **todo** el calor en trabajo: **Q_c > 0** siempre, así que **η < 1**.",
        "**Límite de Carnot**: **η_máx = 1 − T_f/T_h** (temperaturas en kelvin). Para mejorarlo: más caliente el foco caliente o más frío el frío.",
        "Un motor de gasolina ≈ 25–30 %; diésel ≈ 35–40 %; central térmica ≈ 35–45 %; ciclo combinado ≈ 55–60 %.",
      ] },
    ], undefined, "stack"),
    slide("ahorro", "Impacto y ahorro", [
      { kind: "steps", items: [
        "El calor residual (Q_c) **calienta el ambiente**; los gases de combustión emiten **CO₂** y contaminantes.",
        "Medidas: **vehículos eficientes y eléctricos**, **transporte público**, **cogeneración** (aprovechar el calor residual), **aislamiento** de viviendas y **energías renovables**.",
        "El **efecto invernadero** potenciado por la actividad humana provoca el **calentamiento global**; reducir el consumo de combustibles fósiles es clave.",
      ] },
    ], undefined, "stack"),
    calc("calc-w", "Trabajo producido", "Una máquina absorbe 500 kJ y tiene un rendimiento del 30 %. ¿Cuántos kJ de trabajo produce?", nums(150), "W = 0,30·500 = 150 kJ.", "W = η·Q_h."),
    calc("calc-qc", "Calor cedido", "Con los mismos datos (500 kJ y 30 %), ¿cuántos kJ cede al foco frío?", nums(350), "Q_c = 500 − 150 = 350 kJ.", "Q_c = Q_h − W."),
    calc("calc-carnot", "Rendimiento máximo", "Entre un foco a 600 K y otro a 300 K, ¿qué rendimiento máximo (Carnot) es posible, en %?", nums(50), "η = 1 − 300/600 = 0,5 = 50 %.", "η = 1 − T_f/T_h."),
    sort("clasifica", "¿Posible o imposible?", "Indica si una máquina así es posible.",
      [["pos", "Posible", "emerald"], ["imp", "Imposible", "rose"]],
      [["Un motor con η = 30 %", "pos"], ["Una máquina que convierte todo el calor en trabajo (η = 100 %)", "imp"], ["Una central con η = 40 %", "pos"], ["Una máquina que no cede calor a ningún foco frío", "imp"], ["Un motor con η = 25 % entre 800 K y 300 K", "pos"], ["Una máquina con η = 90 % entre 400 K y 300 K", "imp"]],
      "Debe cumplir η < 1 y, además, η ≤ 1 − T_f/T_h.",
    ),
    pick("check", "Rendimiento", "¿Por qué ninguna máquina térmica puede tener rendimiento del 100 %?",
      "Porque siempre hay que ceder calor a un foco frío",
      [["Porque la energía se destruye", "La energía se conserva."], ["Por falta de tecnología", "Es un límite fundamental (segundo principio)."], ["Porque el trabajo no existe", "El trabajo es real."]],
      "Segundo principio: parte del calor debe cederse al foco frío.",
    ),
  ],
};
