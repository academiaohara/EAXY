import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const enlaceCovalenteLewisGeometriaFq4Lesson: InteractiveLesson = {
  slug: "enlace-covalente-lewis-geometria-fq4",
  title: "2. Enlace covalente, estructuras de Lewis y geometría",
  subtitle: FQ4_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Compartir electrones", [
      { kind: "steps", items: [
        "El **enlace covalente** se da entre átomos de **electronegatividad parecida y alta** (no metales): **comparten** pares de electrones para completar su capa.",
        "**Enlace sencillo** (1 par), **doble** (2 pares) y **triple** (3 pares). Los **pares no compartidos** se llaman **pares solitarios**.",
        "Si la diferencia de electronegatividad es **< 0,4**, el enlace es **covalente apolar**; entre **0,4 y 1,7**, **covalente polar** (el átomo más electronegativo atrae más a los electrones: carga parcial δ−).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Estructuras de Lewis", [
      { kind: "text", text: "Elige una molécula. Observa los pares enlazantes y solitarios, la geometría y la polaridad." },
    ], tool("fq4-lewis-explorador"), "visual-top"),
    slide("metodo", "Cómo se dibuja una estructura de Lewis", [
      { kind: "steps", items: [
        "**1.** Suma los **electrones de valencia** de todos los átomos.",
        "**2.** Coloca el átomo **central** (el menos electronegativo, no el H) y únelo a los demás con enlaces sencillos.",
        "**3.** Reparte el resto de electrones en **pares solitarios**, empezando por los átomos periféricos, hasta completar el **octeto**.",
        "**4.** Si falta un octeto, convierte pares solitarios en **enlaces dobles o triples**.",
      ] },
    ]),
    slide("rpecv", "Geometría y polaridad", [
      { kind: "steps", items: [
        "**Modelo RPECV**: los pares de electrones alrededor del átomo central se **repelen** y se sitúan lo más **lejos** posible.",
        "**4 pares**: **tetraédrica** (CH₄); con **1 par solitario**, **piramidal** (NH₃); con **2**, **angular** (H₂O). **2 pares enlazantes sin solitarios**: **lineal** (CO₂).",
        "Una molécula es **polar** si tiene enlaces polares y su geometría es **asimétrica** (los dipolos no se anulan). El **CO₂** y el **CH₄** son **apolares** por su simetría.",
      ] },
    ]),
    calc("calc-ele", "Electrones de valencia", "¿Cuántos electrones de valencia tiene en total la molécula de NH₃? (N: 5; H: 1)", nums(8), "5 + 3·1 = 8 electrones.", "Suma los de cada átomo."),
    calc("calc-co2", "Electrones en el CO₂", "¿Cuántos electrones de valencia suman los átomos de CO₂? (C: 4; O: 6)", nums(16), "4 + 2·6 = 16.", "Suma."),
    calc("calc-par", "Pares solitarios", "En la molécula de agua, ¿cuántos pares de electrones solitarios tiene el átomo de oxígeno?", nums(2), "6 electrones de valencia − 2 en enlaces = 4 → 2 pares solitarios.", "El O tiene 6 electrones de valencia y forma 2 enlaces."),
    calc("calc-den", "Diferencia de electronegatividad", "Si el H tiene 2,20 y el Cl 3,16, ¿cuánto vale la diferencia en el HCl? (dos decimales)", nums(0.96), "3,16 − 2,20 = 0,96: enlace covalente polar.", "Resta."),
    sort("clasifica", "Polar o apolar", "Clasifica cada molécula.",
      [["po", "Polar", "rose"], ["ap", "Apolar", "cobalt"]],
      [["H₂O", "po"], ["NH₃", "po"], ["HCl", "po"], ["CO₂", "ap"], ["CH₄", "ap"], ["O₂", "ap"]],
      "Depende de la polaridad de los enlaces y de la geometría.",
    ),
    pick("check", "Geometría del agua", "¿Por qué la molécula de agua es angular y no lineal?",
      "Porque el oxígeno tiene dos pares solitarios que repelen a los enlaces",
      [["Porque el H es muy pequeño", "No es la razón."], ["Porque el enlace es iónico", "Es covalente polar."], ["Porque tiene un enlace doble", "Tiene dos enlaces sencillos."]],
      "Cuatro pares alrededor del O: tetraédrica, con 2 pares solitarios.",
    ),
  ],
};
