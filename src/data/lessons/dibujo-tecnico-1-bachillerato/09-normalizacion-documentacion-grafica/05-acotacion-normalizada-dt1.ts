import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const acotacionNormalizadaDt1Lesson: InteractiveLesson = {
  slug: "acotacion-normalizada-dt1",
  title: "5. Acotación normalizada",
  subtitle: DT1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("def", "Las medidas de un plano", [
      { kind: "steps", items: [
        "**Acotar** es escribir en el dibujo las **dimensiones** necesarias para fabricar la pieza. Las cotas son siempre las **reales**.",
        "Cada cota se compone de **línea de cota** (fina, con flechas o trazos), **líneas de referencia** (finas, perpendiculares), **cifra** y, a veces, un **símbolo**: $\\varnothing$ (diámetro), R (radio), □ (cuadrado).",
        "La línea de cota va **fuera** de la pieza y **paralela** a lo que se mide; las cifras se leen desde **abajo** o desde la **derecha**.",
        "Cada cota se escribe **una sola vez** y se dan **solo las necesarias**, sin redundancias ni cotas de más.",
      ] },
    ], undefined, "stack"),
    slide("sistemas", "Sistemas de acotación", [
      { kind: "text", text: "Compara la acotación en cadena y en paralelo: ¿cómo se acumulan las tolerancias?" },
    ], tool("dt1-acotacion-sistemas-explorador"), "visual-top"),
    slide("reglas", "Reglas fundamentales", [
      { kind: "steps", items: [
        "**Acotación en serie** (cadena): una cota a continuación de otra. Cómoda, pero **acumula errores**.",
        "**Acotación en paralelo**: todas las cotas parten de una **referencia común**. No acumula errores.",
        "**Acotación combinada**: mezcla de ambas según la función.",
        "Se evita acotar sobre **aristas ocultas**, se **agrupan** las cotas de un mismo elemento y no se **cruzan** líneas de cota.",
      ] },
    ]),
    calc("calc-cotas", "Cotas necesarias", "Una placa tiene 6 agujeros alineados. Para situarlos unos respecto de otros en cadena, ¿cuántas cotas se necesitan?", nums(5), "Entre 6 agujeros hay 5 distancias.", "n − 1."),
    calc("calc-acum", "Tolerancia en cadena", "Cada cota tiene una tolerancia de ± 0,1 mm. En cadena, la posición del 5.º agujero respecto del 1.º (4 cotas) varía hasta ± ¿cuántos mm?", nums(0.4), "4 · 0,1 = 0,4 mm.", "Suma las tolerancias."),
    calc("calc-par", "Tolerancia en paralelo", "Con acotación en paralelo desde el 1.er agujero, ¿hasta ± cuántos mm varía la posición del 5.º?", nums(0.1), "Solo interviene una cota: ± 0,1 mm.", "No se suman."),
    sort("clasifica-cota", "¿Qué símbolo?", "Asocia cada situación con el símbolo de la cota.",
      [["dia", "Ø", "cobalt"], ["rad", "R", "amber"], ["cua", "□", "emerald"]],
      [["Un agujero circular", "dia"], ["Un eje cilíndrico visto de frente", "dia"], ["Un redondeo de una esquina", "rad"], ["Un acuerdo entre dos líneas", "rad"], ["Un taladro de sección cuadrada", "cua"], ["Una barra de sección cuadrada", "cua"]],
      "El símbolo precisa la forma de lo que se acota.",
    ),
    pick("check-sist", "Qué sistema usar", "Dos agujeros deben quedar a una distancia muy precisa entre sí. ¿Cómo conviene acotarlos?",
      "Con una cota directa entre ellos, para que la tolerancia afecte solo a esa distancia",
      [["En cadena a través de otros elementos", "Se acumularían errores."], ["Sin tolerancia", "Hay que fijar la tolerancia."], ["Dos veces, para estar seguros", "Una cota se escribe una sola vez."]],
      "La cota debe reflejar la función: lo importante se acota directamente.",
    ),
  ],
};
