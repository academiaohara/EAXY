import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const interpretacionPlanosSimbologia2esoLesson: InteractiveLesson = {
  slug: "interpretacion-planos-simbologia-2eso",
  title: "4. Interpretación de planos y simbología técnica",
  subtitle: TECESO2_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Leer un plano", [
      { kind: "definition", text: "Un **plano** es un dibujo técnico a escala que informa de cómo es un objeto o una construcción. Interpretarlo exige **leer la escala**, las **cotas** y los **símbolos**." },
      { kind: "steps", items: [
        "Mira primero el **cajetín**: título, escala, autor, fecha.",
        "Localiza las **vistas** o la **planta** y relaciónalas.",
        "Usa las **cotas** (medida real) y la **escala** para calcular lo que no esté acotado.",
        "Consulta la **leyenda** para saber qué significa cada símbolo.",
      ] },
    ], undefined, "stack"),
    slide("croquis", "Del boceto al plano", [
      { kind: "text", text: "Mira cómo un boceto se convierte en un plano a escala." },
    ], anim("boceto-croquis-plano"), "text-top"),
    slide("vivienda", "El plano de una vivienda", [
      { kind: "text", text: "Elige una habitación y una escala; después consulta los símbolos más habituales." },
    ], tool("eso2-plano-vivienda-explorador"), "visual-top"),
    slide("simbolos", "Símbolos de instalaciones", [
      { kind: "text", text: "Los planos de electricidad, fontanería o mecanismos usan símbolos normalizados para no necesitar explicaciones. Ya has visto los eléctricos." },
    ], tool("simbolos-electricos-explorador", { n: 0 }), "visual-top"),
    calc("calc-plano", "Medida en el plano", "Un salón de 4 000 mm × 3 000 mm se dibuja a escala 1:50. ¿Cuánto mide su lado mayor en el papel, en mm?", nums(80), "4 000 / 50 = 80 mm.", "Divide entre 50."),
    calc("calc-area", "Superficie real", "En un plano a escala 1:50, una habitación mide 100 mm × 80 mm. ¿Cuál es su superficie real, en m²? (1 m² = 1 000 000 mm²)", nums(20), "Real: 5 000 mm × 4 000 mm = 20 000 000 mm² = 20 m².", "Pasa cada lado a medida real y multiplica."),
    sort("clasifica-simbolo", "Símbolo o elemento", "Relaciona cada descripción con el elemento del plano.",
      [["pue", "Puerta", "cobalt"], ["ven", "Ventana", "amber"], ["cot", "Cota", "emerald"]],
      [["Arco que indica hacia dónde abre", "pue"], ["Hoja que gira sobre una bisagra", "pue"], ["Pared interrumpida con líneas finas", "ven"], ["Representa el cristal", "ven"], ["Línea con flechas y un número", "cot"], ["Indica la medida real en mm", "cot"]],
      "Cada símbolo tiene una forma normalizada para que todos lo interpreten igual.",
    ),
    pick("check-plano", "Antes de medir", "Quieres saber cuánto mide realmente una habitación en un plano. ¿Qué haces?",
      "Medir en el papel y multiplicar por el denominador de la escala, o leer la cota",
      [["Fiarse del tamaño en el papel sin mirar la escala", "El papel no está a tamaño real."], ["Medir y sumar la escala", "Se multiplica, no se suma."], ["Es imposible saberlo", "La escala y las cotas lo permiten."]],
      "La escala permite pasar de la medida del dibujo a la real; las cotas dan la medida real directamente.",
    ),
  ],
};
