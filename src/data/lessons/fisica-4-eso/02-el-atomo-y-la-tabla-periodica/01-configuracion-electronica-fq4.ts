import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const configuracionElectronicaFq4Lesson: InteractiveLesson = {
  slug: "configuracion-electronica-fq4",
  title: "1. Configuración electrónica",
  subtitle: FQ4_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Niveles, subniveles y orbitales", [
      { kind: "steps", items: [
        "Los electrones de un átomo ocupan **niveles de energía** (n = 1, 2, 3…), que se dividen en **subniveles**: **s**, **p**, **d**, **f**.",
        "Cada subnivel tiene **orbitales**: **s** → 1, **p** → 3, **d** → 5, **f** → 7. Un **orbital** es una región donde es **probable** encontrar al electrón y admite **2 electrones como máximo**.",
        "El nivel n tiene **n subniveles**: n = 1 → 1s; n = 2 → 2s, 2p; n = 3 → 3s, 3p, 3d.",
        "La **configuración electrónica** indica cuántos electrones hay en cada subnivel: por ejemplo, Cl: **1s² 2s² 2p⁶ 3s² 3p⁵**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Llena los orbitales", [
      { kind: "text", text: "Recorre los 36 primeros elementos. Observa el orden de llenado y los electrones desapareados." },
    ], tool("fq4-configuracion-explorador"), "visual-top"),
    slide("reglas", "Reglas de llenado", [
      { kind: "steps", items: [
        "**Principio de mínima energía**: se ocupan primero los subniveles de menor energía. El orden es: **1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p…** (el **4s** va antes que el **3d**).",
        "**Principio de exclusión de Pauli**: en un orbital caben **2 electrones** con **espines opuestos** (↑↓).",
        "**Regla de Hund**: en orbitales del mismo subnivel, los electrones se colocan **desapareados** antes de aparearse.",
        "**Excepciones**: el **cromo** (4s¹ 3d⁵) y el **cobre** (4s¹ 3d¹⁰), por la estabilidad de d semilleno o lleno.",
      ] },
    ]),
    calc("calc-cap", "Capacidad de un subnivel", "¿Cuántos electrones caben como máximo en un subnivel 3d?", nums(10), "5 orbitales · 2 electrones = 10.", "Cada orbital admite 2."),
    calc("calc-s", "Electrones de la última capa", "¿Cuántos electrones hay en la última capa del azufre (Z = 16, 1s² 2s² 2p⁶ 3s² 3p⁴)?", nums(6), "3s² + 3p⁴ = 6 electrones.", "Suma los del nivel 3."),
    calc("calc-des", "Electrones desapareados", "El nitrógeno (Z = 7) tiene 2p³. ¿Cuántos electrones desapareados tiene?", nums(3), "Por la regla de Hund, los 3 electrones ocupan los 3 orbitales p sin aparearse.", "Un electrón por orbital."),
    calc("calc-z", "Número atómico", "Un átomo neutro tiene la configuración 1s² 2s² 2p⁶ 3s² 3p⁶ 4s². ¿Cuál es su número atómico?", nums(20), "2 + 2 + 6 + 2 + 6 + 2 = 20: es el calcio.", "Suma todos los electrones."),
    sort("clasifica", "Subnivel y orbitales", "Asocia cada subnivel con su número de orbitales.",
      [["u", "1 orbital", "cobalt"], ["tres", "3 orbitales", "amber"], ["cinco", "5 orbitales", "emerald"]],
      [["1s", "u"], ["2s", "u"], ["2p", "tres"], ["3p", "tres"], ["3d", "cinco"], ["4d", "cinco"]],
      "s: 1; p: 3; d: 5.",
    ),
    pick("check", "Orden de llenado", "¿Qué subnivel se llena antes?",
      "El 4s antes que el 3d",
      [["El 3d antes que el 4s", "El 4s tiene menor energía en los primeros elementos."], ["El 2p antes que el 2s", "El 2s se llena antes."], ["El 3p antes que el 3s", "El 3s se llena antes."]],
      "Regla de Madelung: 1s 2s 2p 3s 3p 4s 3d 4p.",
    ),
  ],
};
