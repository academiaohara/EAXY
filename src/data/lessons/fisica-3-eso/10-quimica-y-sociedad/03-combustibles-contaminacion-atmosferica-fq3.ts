import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const combustiblesContaminacionAtmosfericaFq3Lesson: InteractiveLesson = {
  slug: "combustibles-contaminacion-atmosferica-fq3",
  title: "3. Combustibles y contaminación atmosférica",
  subtitle: FQ3_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("comb", "Combustibles", [
      { kind: "steps", items: [
        "Un **combustible** es una sustancia que, al reaccionar con el oxígeno, **desprende energía** en forma de calor y luz.",
        "**Combustibles fósiles**: **carbón**, **petróleo** y **gas natural**. Se formaron durante millones de años, son **no renovables** y al quemarse emiten **CO₂**.",
        "**Biocombustibles** (biodiésel, bioetanol) y **biomasa**: proceden de materia orgánica reciente, y su balance de CO₂ puede ser menor.",
        "El **hidrógeno** produce solo agua al arder, pero hay que fabricarlo con energía.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Contaminantes del aire", [
      { kind: "text", text: "Elige un contaminante y mira su origen, su efecto y cómo reducirlo." },
    ], tool("fq3-contaminantes-explorador"), "visual-top"),
    slide("lluvia", "La lluvia ácida", [
      { kind: "steps", items: [
        "El **SO₂** y los **NOₓ** reaccionan con el vapor de agua y el oxígeno del aire y forman **ácido sulfúrico** y **ácido nítrico**, que caen con la **lluvia**.",
        "Efectos: **acidifica lagos y suelos**, daña **bosques** y **corroe** edificios y monumentos de piedra caliza o mármol.",
        "Se reduce con **filtros** en las chimeneas, combustibles **sin azufre** y **catalizadores** en los coches.",
      ] },
    ]),
    calc("calc-co2", "CO₂ de un coche", "Un coche gasta 1000 litros de gasolina al año y cada litro emite unos 2,3 kg de CO₂. ¿Cuántos kg de CO₂ emite al año?", nums(2300), "1000 · 2,3 = 2300 kg.", "Litros por kg de CO₂ por litro."),
    calc("calc-ahorro", "Ahorro", "Si ese coche reduce su consumo un 20 % (menos 200 L), ¿cuántos kg de CO₂ deja de emitir al año?", nums(460), "200 · 2,3 = 460 kg.", "Litros ahorrados por 2,3."),
    calc("calc-tren", "Transporte", "Una persona en coche emite unos 120 g de CO₂ por km y en tren unos 30 g/km. ¿Cuántos kg de CO₂ se evitan en un viaje de 400 km en tren?", nums(36), "(120 − 30) · 400 = 36 000 g = 36 kg.", "Diferencia por km por distancia."),
    sort("clasifica", "Contaminante y problema", "Une cada contaminante con su problema principal.",
      [["inv", "Efecto invernadero", "amber"], ["llu", "Lluvia ácida", "cobalt"], ["tox", "Toxicidad directa", "rose"]],
      [["CO₂", "inv"], ["Metano (CH₄)", "inv"], ["SO₂", "llu"], ["NOₓ", "llu"], ["CO", "tox"], ["Partículas finas", "tox"]],
      "Cada contaminante tiene un efecto característico.",
    ),
    pick("check", "Combustión incompleta", "¿Cuándo se forma monóxido de carbono (CO) en lugar de CO₂?",
      "Cuando la combustión es incompleta, por falta de oxígeno",
      [["Cuando sobra oxígeno", "Con oxígeno suficiente se forma CO₂."], ["Cuando el combustible es agua", "El agua no arde."], ["Cuando hace frío", "La temperatura no es la causa principal."]],
      "Sin suficiente oxígeno, el carbono no se oxida del todo.",
    ),
  ],
};
