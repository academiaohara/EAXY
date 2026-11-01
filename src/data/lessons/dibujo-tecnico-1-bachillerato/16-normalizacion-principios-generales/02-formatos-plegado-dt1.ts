import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const formatosPlegadoDt1Lesson: InteractiveLesson = {
  slug: "formatos-plegado-dt1",
  title: "2. Formatos y doblado de planos",
  subtitle: DT1_SUBTITLES[16],
  stage: { theme: "board" },
  steps: [
    slide("def", "La serie A", [
      { kind: "steps", items: [
        "El formato **A0** tiene **1 m²** de superficie y lados **841 × 1189 mm**. Cada formato siguiente (A1, A2…) es la **mitad** del anterior cortada por su lado **mayor**.",
        "Todos los formatos son **semejantes**: la relación entre sus lados es $\\sqrt{2} \\approx 1{,}414$.",
        "Los más usados: **A4** (210 × 297 mm), **A3** (297 × 420) y **A2** (420 × 594) para dibujos; A1 y A0 para planos grandes.",
        "El dibujo se encuadra en un **recuadro** y se coloca el **cuadro de rotulación** en la esquina inferior derecha.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Compara los formatos", [
      { kind: "text", text: "Cambia el formato y observa las dimensiones, la superficie y cuántas hojas A4 caben." },
    ], tool("dt1-formatos-explorador"), "visual-top"),
    slide("plegado", "Doblado de planos", [
      { kind: "steps", items: [
        "Los planos grandes se **pliegan** para archivarlos hasta el tamaño **A4** (210 × 297 mm).",
        "Se pliega de modo que el **cuadro de rotulación** quede **visible** en la parte exterior, abajo a la derecha.",
        "Para el **archivo** se deja un margen de **20 mm a la izquierda** (en el A4, para perforar o encuadernar).",
        "En planos A3 o mayores, el plegado se hace primero en **acordeón** en el sentido horizontal y luego en el vertical.",
      ] },
    ]),
    calc("calc-a3", "Lado largo de A3", "¿Cuánto mide el lado largo de un A3, en mm?", nums(420), "A3 = 297 × 420 mm.", "El lado largo de A3 coincide con el lado corto de A2."),
    calc("calc-hojas", "Hojas A4 en un A1", "¿Cuántas hojas A4 caben en un formato A1?", nums(8), "De A1 a A4 hay tres divisiones por la mitad: 2³ = 8.", "Cada formato tiene el doble de superficie que el siguiente."),
    calc("calc-a2", "Superficie de A2", "¿Qué superficie tiene un formato A2, en m²?", nums(0.25), "A0 = 1 m²; A1 = 0,5; A2 = 0,25 m².", "Cada formato es la mitad."),
    calc("calc-raiz", "Relación entre lados", "¿Cuánto vale la relación entre el lado largo y el corto de cualquier formato A? (dos decimales)", nums(1.41, 1.414), "La razón es √2, aproximadamente 1,41.", "Es la razón que mantiene la semejanza."),
    sort("clasifica-formato", "¿Qué formato es?", "Asocia cada medida con su formato.",
      [["a4", "A4", "cobalt"], ["a3", "A3", "amber"], ["a2", "A2", "emerald"]],
      [["210 × 297 mm", "a4"], ["Una hoja de cuaderno o folio", "a4"], ["297 × 420 mm", "a3"], ["Dos A4 pegados por su lado largo", "a3"], ["420 × 594 mm", "a2"], ["Dos A3 pegados por su lado largo", "a2"]],
      "Cada formato duplica la superficie del siguiente.",
    ),
    pick("check-sqrt2", "Por qué √2", "¿Por qué la relación √2 entre los lados permite que cada formato sea la mitad del anterior y semejante a él?",
      "Porque al cortar por la mitad del lado largo se obtienen dos rectángulos de la misma forma que el original",
      [["Porque √2 es racional", "√2 es irracional."], ["Porque todos los lados son iguales", "No son cuadrados."], ["Porque se redondean los lados", "El redondeo no es la razón."]],
      "Si l/c = √2, la mitad es c × l/2, con c/(l/2) = 2c/l = √2: la misma proporción.",
    ),
  ],
};
