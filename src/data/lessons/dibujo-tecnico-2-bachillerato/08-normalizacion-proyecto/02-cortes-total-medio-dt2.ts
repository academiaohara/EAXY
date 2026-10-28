import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const cortesTotalMedioDt2Lesson: InteractiveLesson = {
  slug: "cortes-total-medio-dt2",
  title: "2. Cortes: total, medio corte y rayado",
  subtitle: DT2_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Ver el interior", [
      { kind: "steps", items: [
        "Una pieza con muchos huecos genera muchas **líneas ocultas**, que dificultan la lectura. Un **corte** las evita.",
        "Se imagina la pieza **cortada por un plano** y se retira la parte entre el plano y el observador.",
        "Lo que toca el plano (la **sección**) se **raya**; lo que queda más allá se dibuja en vista.",
        "El plano de corte se señala en otra vista con una **línea de trazo y punto** gruesa en los extremos y **letras** (A-A).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Sin corte, corte total y medio corte", [
      { kind: "text", text: "Cambia la representación y el diámetro del taladro. Mira cómo cambian las líneas y el rayado." },
    ], tool("dt2-cortes-pieza-explorador"), "visual-top"),
    slide("tipos", "Tipos de corte", [
      { kind: "steps", items: [
        "**Corte total**: el plano atraviesa toda la pieza.",
        "**Medio corte**: solo en piezas **simétricas**; una mitad en corte y la otra en vista, separadas por el **eje**.",
        "**Corte por planos paralelos** (quebrado): se necesita para llegar a elementos que no están en un mismo plano.",
        "**Corte parcial**: se abre solo una zona con una línea de **rotura** a mano alzada.",
      ] },
    ]),
    slide("rayado", "Reglas del rayado", [
      { kind: "steps", items: [
        "Líneas **finas, continuas** y a **45°** respecto del contorno o del eje de la pieza.",
        "**Separación uniforme** (según el tamaño de la superficie) y **mismo sentido** en toda la pieza.",
        "En un **conjunto**, las piezas contiguas se rayan con **distinta inclinación** o separación.",
        "No se rayan los **nervios**, los **ejes**, los **tornillos** ni las **chavetas** cortados por un plano longitudinal: se dibujan enteros.",
      ] },
    ]),
    calc("calc-pared", "Espesor de pared", "Un bloque de 100 mm de ancho tiene un taladro pasante de 30 mm centrado. ¿Qué espesor tiene cada pared, en mm?", nums(35), "(100 − 30) / 2 = 35 mm.", "Resta el taladro y divide entre dos."),
    calc("calc-ang", "Ángulo del rayado", "¿Con qué ángulo respecto del contorno se traza el rayado de una sección, en grados?", nums(45), "El rayado normalizado va a 45°.", "Es el estándar."),
    sort("clasifica", "¿Se raya o no?", "Clasifica cada elemento según se raye o no en un corte.",
      [["si", "Se raya", "cobalt"], ["no", "No se raya", "amber"]],
      [["La pared de una pieza cortada", "si"], ["La sección de un eje macizo cortado transversalmente", "si"], ["El material cortado por el plano", "si"], ["El interior de un taladro hueco", "no"], ["Un tornillo cortado longitudinalmente", "no"], ["Un nervio cortado longitudinalmente", "no"]],
      "Se raya el material cortado; no el hueco ni los elementos que no se cortan.",
    ),
    pick("check", "Medio corte", "¿Cuándo se puede usar un medio corte?",
      "En piezas simétricas respecto de un eje",
      [["En cualquier pieza", "Exige simetría."], ["Solo en piezas pequeñas", "El tamaño no importa."], ["Cuando la pieza no tiene huecos", "Entonces no hace falta."]],
      "Una mitad en corte y la otra en vista solo tiene sentido si ambas son iguales.",
    ),
  ],
};
