import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const magnitudesElectricas2esoLesson: InteractiveLesson = {
  slug: "magnitudes-electricas-2eso",
  title: "1. Magnitudes eléctricas: tensión, intensidad y resistencia",
  subtitle: TECESO2_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Las tres magnitudes básicas", [
      { kind: "definition", text: "Para describir un circuito se usan tres magnitudes: la **tensión** (lo que empuja las cargas), la **intensidad** (cuántas cargas pasan cada segundo) y la **resistencia** (lo que frena su paso)." },
      { kind: "steps", items: [
        "**Tensión o voltaje (V)**: se mide en **voltios (V)** con un voltímetro.",
        "**Intensidad de corriente (I)**: se mide en **amperios (A)** con un amperímetro.",
        "**Resistencia (R)**: se mide en **ohmios (Ω)** con un óhmetro.",
        "Los submúltiplos y múltiplos más usados: **1 mA = 0,001 A**, **1 kΩ = 1 000 Ω**, **1 MΩ = 1 000 000 Ω**.",
      ] },
    ], undefined, "stack"),
    slide("agua", "Una analogía: el circuito hidráulico", [
      { kind: "text", text: "La electricidad no se ve, pero se parece a un circuito de agua: la **pila** es la bomba, los **cables** son las tuberías y la **resistencia** es un estrechamiento. Cambia la tensión y la resistencia y mira el efecto." },
    ], tool("eso2-analogia-agua-explorador"), "visual-top"),
    slide("tipos", "Corriente continua y corriente alterna", [
      { kind: "compare",
        left: { title: "Continua (CC)", text: "Las cargas circulan siempre en el **mismo sentido**. La dan las pilas y las baterías: móviles, linternas, juguetes.", tone: "info" },
        right: { title: "Alterna (CA)", text: "El sentido **cambia** muchas veces por segundo (50 veces por segundo en España). Es la de los enchufes de casa, a **230 V**.", tone: "key" } },
    ]),
    calc("calc-ma", "Cambio de unidades", "Un LED consume 20 mA. ¿Cuántos amperios son? (1 mA = 0,001 A)", nums(0.02), "20 mA = 20 · 0,001 A = 0,02 A.", "Multiplica los miliamperios por 0,001."),
    sort("clasifica-magnitud", "Magnitud, unidad e instrumento", "Relaciona cada dato con la magnitud a la que pertenece.",
      [["ten", "Tensión", "emerald"], ["int", "Intensidad", "cobalt"], ["res", "Resistencia", "amber"]],
      [["Se mide en voltios", "ten"], ["Se mide con voltímetro", "ten"], ["Se mide en amperios", "int"], ["Se mide con amperímetro", "int"], ["Se mide en ohmios", "res"], ["Un filamento fino la aumenta", "res"]],
      "Voltios para la tensión, amperios para la intensidad y ohmios para la resistencia.",
    ),
    pick("check-hidraulica", "Con la analogía del agua", "En la analogía del agua, ¿qué corresponde a la resistencia eléctrica?",
      "Un estrechamiento del tubo que frena el paso del agua",
      [["La altura del depósito", "La altura es la tensión: lo que empuja el agua."], ["La cantidad de agua que pasa por segundo", "Eso es la intensidad."], ["El agua del depósito", "El agua representa la carga eléctrica."]],
      "Tensión = altura, intensidad = caudal, resistencia = estrechamiento.",
    ),
  ],
};
