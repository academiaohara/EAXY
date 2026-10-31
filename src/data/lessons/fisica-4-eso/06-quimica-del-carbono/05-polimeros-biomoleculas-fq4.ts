import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool, anim } from "@/data/lessons/tec1-helpers";

export const polimerosBiomoleculasFq4Lesson: InteractiveLesson = {
  slug: "polimeros-biomoleculas-fq4",
  title: "5. Polímeros y biomoléculas",
  subtitle: FQ4_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Qué es un polímero", [
      { kind: "steps", items: [
        "Un **polímero** es una **macromolécula** formada por la unión de muchas unidades pequeñas repetidas, los **monómeros**.",
        "Su masa molecular es enorme: **n · masa del monómero**, con n de cientos o miles.",
        "Hay polímeros **naturales** (almidón, celulosa, proteínas, ADN) y **sintéticos** (plásticos, nailon).",
      ] },
    ], anim("fq4-polimerizacion"), "visual-top"),
    slide("explora", "Polímeros comunes", [
      { kind: "text", text: "Elige un polímero, mira su monómero y calcula la masa de la cadena." },
    ], tool("fq4-polimeros-explorador"), "visual-top"),
    slide("tipos", "Cómo se forman", [
      { kind: "steps", items: [
        "**Adición**: monómeros con **doble enlace** se unen sin perder nada. Eteno → polietileno (PE); cloroeteno → PVC; propeno → polipropileno (PP).",
        "**Condensación**: los monómeros se unen **liberando una molécula pequeña** (agua). Dan poliésteres (PET) y poliamidas (nailon).",
        "Propiedades de los plásticos: ligeros, aislantes, resistentes a la corrosión y baratos. Pero **tardan siglos en degradarse**.",
        "Gestión: **reducir, reutilizar y reciclar**; los **bioplásticos** (de almidón) son una alternativa.",
      ] },
    ], undefined, "stack"),
    slide("bio", "Biomoléculas", [
      { kind: "steps", items: [
        "**Glúcidos** (azúcares): energía rápida. Monómero: **glucosa**. Polímeros: **almidón** (reserva en plantas) y **celulosa** (estructura vegetal).",
        "**Lípidos** (grasas y aceites): reserva de energía y membranas. Son ésteres de glicerina con ácidos grasos; no son polímeros verdaderos.",
        "**Proteínas**: función estructural, enzimática y de transporte. Monómeros: **aminoácidos**, unidos por enlaces peptídicos.",
        "**Ácidos nucleicos** (ADN, ARN): información genética. Monómeros: **nucleótidos**.",
      ] },
    ], undefined, "stack"),
    calc("calc-masa", "Masa de un polímero", "El eteno tiene masa molecular 28 u. ¿Cuál es la masa, en u, de una cadena de polietileno de 100 monómeros?", nums(2800), "100 · 28 = 2800 u.", "Multiplica n por la masa del monómero."),
    calc("calc-n", "Número de monómeros", "Una cadena de PVC tiene masa 6250 u y su monómero 62,5 u. ¿Cuántos monómeros contiene?", nums(100), "6250 / 62,5 = 100.", "Divide la masa total entre la del monómero."),
    sort("clasifica", "Natural o sintético", "Clasifica cada polímero.",
      [["nat", "Natural", "emerald"], ["sin", "Sintético", "cobalt"]],
      [["Almidón", "nat"], ["Celulosa", "nat"], ["ADN", "nat"], ["PVC", "sin"], ["Polietileno", "sin"], ["Nailon", "sin"]],
      "Los naturales los fabrican los seres vivos.",
    ),
    pick("check", "Monómero", "¿Cuál es el monómero del almidón y de la celulosa?",
      "La glucosa",
      [["El eteno", "Es el monómero del polietileno."], ["Un aminoácido", "Lo es de las proteínas."], ["El etanol", "No es monómero de estos."]],
      "Ambos son polímeros de glucosa.",
    ),
  ],
};
