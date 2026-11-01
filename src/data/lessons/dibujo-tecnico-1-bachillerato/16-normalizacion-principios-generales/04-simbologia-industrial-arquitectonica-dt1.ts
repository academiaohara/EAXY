import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const simbologiaIndustrialArquitectonicaDt1Lesson: InteractiveLesson = {
  slug: "simbologia-industrial-arquitectonica-dt1",
  title: "4. Simbología industrial y arquitectónica",
  subtitle: DT1_SUBTITLES[16],
  stage: { theme: "board" },
  steps: [
    slide("def", "Signos que todos entienden", [
      { kind: "steps", items: [
        "La **simbología** representa elementos con **signos convencionales normalizados**, en lugar de dibujarlos como son.",
        "En **electricidad y electrónica**: resistencias, lámparas, interruptores, fuentes… (UNE-EN 60617). Importa la **conexión**, no la forma.",
        "En **arquitectura**: muros, puertas, ventanas, escaleras, pilares, con **rayados** y **trazos** según el material y la escala.",
        "En **mecánica**: ejes de simetría, **roscas**, soldaduras, acabados, tolerancias y planos de corte.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Galería de símbolos", [
      { kind: "text", text: "Elige un tipo de simbología y un símbolo para ver cómo se dibuja y qué significa." },
    ], tool("dt1-simbolos-explorador"), "visual-top"),
    slide("uso", "Cómo se usan", [
      { kind: "steps", items: [
        "Todo plano con símbolos lleva una **leyenda** que los explica.",
        "En los planos de **arquitectura**, los símbolos se dibujan **a escala**: una puerta de 0,9 m a escala 1:100 mide 9 mm.",
        "En los **esquemas eléctricos** el tamaño no importa: se ordenan para que se **lean** fácilmente.",
        "Los **rayados** distinguen materiales: hormigón, ladrillo, aislante, metal…",
      ] },
    ]),
    calc("calc-puerta", "Puerta a escala", "Una puerta de 0,9 m se dibuja a escala 1:100. ¿Cuántos mm mide en el plano?", nums(9), "900 mm / 100 = 9 mm.", "Pasa a mm y divide."),
    calc("calc-ventana", "Ventana a escala", "Una ventana de 1,2 m a escala 1:50. ¿Cuántos mm mide en el plano?", nums(24), "1200 / 50 = 24 mm.", "Divide entre 50."),
    calc("calc-muro", "Muro a escala", "Un muro de 30 cm de espesor a escala 1:20. ¿Cuántos mm mide el espesor en el plano?", nums(15), "300 / 20 = 15 mm.", "Pasa 30 cm a mm."),
    sort("clasifica-simb", "¿De qué campo es?", "Asocia cada símbolo con su campo.",
      [["ele", "Eléctrico", "cobalt"], ["arq", "Arquitectónico", "amber"], ["mec", "Mecánico", "emerald"]],
      [["Resistencia", "ele"], ["Interruptor", "ele"], ["Pila", "ele"], ["Puerta con arco de apertura", "arq"], ["Ventana", "arq"], ["Escalera", "arq"], ["Eje de simetría", "mec"], ["Rosca", "mec"], ["Plano de corte", "mec"]],
      "La simbología depende del campo técnico.",
    ),
    pick("check-leyenda", "La leyenda", "¿Para qué sirve la leyenda de un plano con símbolos?",
      "Para explicar el significado de cada símbolo, sobre todo los que no son universales",
      [["Para decorar el plano", "Su función es informativa."], ["Para dar el precio", "No es una lista de precios."], ["Para indicar la escala", "La escala va en el cuadro de rotulación."]],
      "Los símbolos solo comunican si quien lee sabe lo que significan.",
    ),
  ],
};
