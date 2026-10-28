import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const combustionOxidacionFq2Lesson: InteractiveLesson = {
  slug: "combustion-oxidacion-fq2",
  title: "4. Combustión, oxidación y reacciones cotidianas",
  subtitle: FQ2_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Reacciones que conocemos", [
      { kind: "steps", items: [
        "La **combustión** es una reacción rápida de un **combustible** con **oxígeno** que desprende **calor y luz**.",
        "Ejemplo: metano + oxígeno → dióxido de carbono + agua (+ energía).",
        "La **oxidación** es la reacción de una sustancia con el oxígeno de forma **lenta**: el hierro se oxida y forma **óxido**.",
        "Otras reacciones cotidianas: la **respiración**, la **fotosíntesis**, la **digestión**, la **fermentación** o el **horneado**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "El triángulo del fuego", [
      { kind: "text", text: "Retira uno de los tres elementos y comprueba si el fuego se mantiene." },
    ], tool("fq2-triangulo-fuego-explorador"), "visual-top"),
    slide("impacto", "Impacto de las reacciones", [
      { kind: "steps", items: [
        "La **combustión** de combustibles fósiles libera **CO₂**, un gas de **efecto invernadero** que contribuye al **cambio climático**.",
        "Si la combustión es **incompleta** (poco oxígeno) se produce **monóxido de carbono (CO)**, un gas **tóxico**.",
        "El **dióxido de azufre** y los **óxidos de nitrógeno** causan la **lluvia ácida**.",
        "Las reacciones también son **útiles**: fabrican medicinas, materiales, fertilizantes y alimentos. Conviene hacerlas de forma **sostenible**.",
      ] },
    ]),
    calc("calc-ox", "Oxidación del hierro", "Un clavo de hierro de 5 g se oxida y se convierte en 7 g de óxido. ¿Cuántos gramos de oxígeno han reaccionado?", nums(2), "7 − 5 = 2 g de oxígeno.", "Resta la masa inicial de la final."),
    calc("calc-ele", "Elementos del triángulo", "¿Cuántos elementos forman el triángulo del fuego?", nums(3), "Combustible, comburente y energía de activación: tres.", "Cuenta los vértices."),
    sort("clasifica", "Combustión u oxidación lenta", "Clasifica cada proceso.",
      [["com", "Combustión (rápida, con llama)", "cobalt"], ["lent", "Oxidación lenta", "amber"]],
      [["Arde una vela", "com"], ["Se quema gas en la cocina", "com"], ["Arde la gasolina en un motor", "com"], ["Un clavo se oxida con el tiempo", "lent"], ["Una bicicleta se llena de óxido", "lent"], ["Una manzana cortada se oscurece", "lent"]],
      "La combustión es rápida y desprende luz; la oxidación lenta no.",
    ),
    pick("check", "Apagar un fuego", "¿Por qué se apaga una vela al taparla con un vaso?",
      "Porque se agota el oxígeno (comburente)",
      [["Porque falta combustible", "La cera sigue estando."], ["Porque disminuye la energía", "Lo que falta es el oxígeno."], ["Porque aumenta el CO₂ y no hay cera", "El efecto principal es la falta de oxígeno."]],
      "Sin oxígeno no se cumple el triángulo del fuego y la combustión se detiene.",
    ),
  ],
};
