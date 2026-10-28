import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const trabajoPotenciaFq3Lesson: InteractiveLesson = {
  slug: "trabajo-potencia-fq3",
  title: "1. Trabajo mecánico y potencia",
  subtitle: FQ3_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Trabajo: energía transferida", [
      { kind: "steps", items: [
        "Cuando una **fuerza** mueve un cuerpo, le **transfiere energía**. El **trabajo** mide esa energía.",
        "**W = F · d · cos α**, donde α es el ángulo entre la fuerza y el desplazamiento. Se mide en **julios (J)**: 1 J = 1 N · 1 m.",
        "Si la fuerza es **perpendicular** al desplazamiento (α = 90°), el trabajo es **cero**: por ejemplo, el peso de una maleta que llevas a nivel por un pasillo.",
        "Si **no hay desplazamiento**, tampoco hay trabajo, aunque cueste esfuerzo (sostener una mochila).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Fuerza, distancia y ángulo", [
      { kind: "text", text: "Cambia la fuerza, el desplazamiento, el ángulo y el tiempo. ¿Cuándo es máximo el trabajo?" },
    ], tool("fq3-trabajo-potencia-explorador"), "visual-top"),
    slide("pot", "Potencia", [
      { kind: "steps", items: [
        "La **potencia** es el trabajo (o energía) por unidad de tiempo: **P = W / t**.",
        "Se mide en **vatios (W)**: 1 W = 1 J/s. También en **kW** (1000 W) y en **CV** (1 CV ≈ 735 W).",
        "Una máquina es **más potente** si realiza el mismo trabajo en **menos tiempo**.",
        "La **energía** consumida por un aparato se mide en **kWh**: 1 kWh = potencia en kW · tiempo en horas = 3 600 000 J.",
      ] },
    ]),
    calc("calc-w", "Trabajo", "Una fuerza de 50 N desplaza un carro 20 m en la misma dirección. ¿Qué trabajo realiza, en J?", nums(1000), "W = 50 · 20 = 1000 J.", "W = F·d (cos 0° = 1)."),
    calc("calc-ang", "Con ángulo", "Una fuerza de 100 N forma 60° con el desplazamiento de 10 m. ¿Qué trabajo realiza, en J? (cos 60° = 0,5)", nums(500), "W = 100 · 10 · 0,5 = 500 J.", "Incluye el coseno."),
    calc("calc-p", "Potencia", "Se realiza un trabajo de 1000 J en 10 s. ¿Qué potencia se desarrolla, en W?", nums(100), "P = 1000 / 10 = 100 W.", "P = W/t."),
    calc("calc-kwh", "Energía eléctrica", "Una estufa de 2 kW funciona 3 horas. ¿Cuántos kWh consume?", nums(6), "E = 2 · 3 = 6 kWh.", "Potencia en kW por horas."),
    sort("clasifica", "¿Hay trabajo?", "Clasifica cada situación según una fuerza realice o no trabajo.",
      [["si", "Hay trabajo", "emerald"], ["no", "No hay trabajo", "rose"]],
      [["Empujar un carro que se desplaza", "si"], ["Elevar un peso con una polea", "si"], ["Frenar un coche con el rozamiento de los frenos", "si"], ["Sostener una mochila sin moverse", "no"], ["El peso de una maleta llevada a nivel (fuerza perpendicular)", "no"], ["Empujar una pared que no se mueve", "no"]],
      "Hace falta desplazamiento con componente en la dirección de la fuerza.",
    ),
    pick("check", "Potencia", "Dos motores levantan la misma carga a la misma altura, pero uno tarda la mitad. ¿Cuál es más potente?",
      "El que tarda la mitad: tiene el doble de potencia",
      [["El que tarda más", "Con más tiempo, menos potencia."], ["Los dos igual, porque el trabajo es igual", "Cambia el tiempo."], ["No se puede saber", "P = W/t: se puede."]],
      "El trabajo es el mismo, pero P = W/t.",
    ),
  ],
};
