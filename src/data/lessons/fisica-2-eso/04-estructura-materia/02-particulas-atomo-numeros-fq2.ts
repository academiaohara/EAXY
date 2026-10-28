import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const particulasAtomoNumerosFq2Lesson: InteractiveLesson = {
  slug: "particulas-atomo-numeros-fq2",
  title: "2. Partículas del átomo y números atómico y másico",
  subtitle: FQ2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Las partículas subatómicas", [
      { kind: "steps", items: [
        "El **protón** tiene carga **positiva (+)** y está en el **núcleo**.",
        "El **neutrón** **no tiene carga** y también está en el núcleo; su masa es casi igual a la del protón.",
        "El **electrón** tiene carga **negativa (−)** y gira en la **corteza**; su masa es unas **1836 veces menor** que la del protón.",
        "Un átomo es **eléctricamente neutro**: tiene tantos electrones como protones.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Construye un átomo", [
      { kind: "text", text: "Cambia el número de protones, neutrones y electrones. Mira qué elemento resulta y cuál es su carga." },
    ], tool("fq2-construir-atomo-explorador"), "visual-top"),
    slide("numeros", "Número atómico y número másico", [
      { kind: "steps", items: [
        "El **número atómico Z** es el número de **protones**. **Identifica el elemento**: todos los átomos de carbono tienen Z = 6.",
        "El **número másico A** es la suma de **protones y neutrones**: **A = Z + N**.",
        "Se escribe así: **ᴬ₂X**, con A arriba y Z abajo a la izquierda del símbolo (por ejemplo, ¹²₆C).",
        "Los **electrones** se distribuyen en **capas**: 2 en la primera, 8 en la segunda y 8 en la tercera.",
      ] },
    ]),
    calc("calc-a", "Número másico", "Un átomo tiene 11 protones y 12 neutrones. ¿Cuál es su número másico?", nums(23), "A = Z + N = 11 + 12 = 23.", "Suma protones y neutrones."),
    calc("calc-n", "Neutrones", "Un átomo de carbono tiene Z = 6 y A = 14. ¿Cuántos neutrones tiene?", nums(8), "N = A − Z = 14 − 6 = 8.", "Resta el número atómico al másico."),
    calc("calc-e", "Electrones", "Un átomo neutro de oxígeno tiene Z = 8. ¿Cuántos electrones tiene?", nums(8), "Es neutro: tantos electrones como protones, 8.", "Igual que Z."),
    sort("clasifica", "Partícula y carga", "Asocia cada partícula con su carga.",
      [["pos", "Carga positiva", "cobalt"], ["neu", "Sin carga", "amber"], ["neg", "Carga negativa", "emerald"]],
      [["Protón", "pos"], ["Se encuentra en el núcleo y es positivo", "pos"], ["Neutrón", "neu"], ["Núcleo, sin carga", "neu"], ["Electrón", "neg"], ["Gira en la corteza", "neg"]],
      "Protón +, neutrón 0, electrón −.",
    ),
    pick("check", "Identificar el elemento", "¿Qué número identifica un elemento químico?",
      "El número atómico (protones)",
      [["El número másico", "Varía entre isótopos."], ["El número de electrones", "Puede cambiar en los iones."], ["El número de neutrones", "Varía entre isótopos."]],
      "Todos los átomos con el mismo número de protones son del mismo elemento.",
    ),
  ],
};
