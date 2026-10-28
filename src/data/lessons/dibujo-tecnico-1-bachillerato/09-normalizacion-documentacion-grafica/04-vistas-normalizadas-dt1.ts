import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const vistasNormalizadasDt1Lesson: InteractiveLesson = {
  slug: "vistas-normalizadas-dt1",
  title: "4. Vistas de una pieza: elección y disposición",
  subtitle: DT1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("def", "Describir un objeto con proyecciones", [
      { kind: "steps", items: [
        "Las **vistas** son proyecciones ortogonales de la pieza sobre planos perpendiculares entre sí. Se pueden dibujar **hasta seis**: **alzado, planta, perfil izquierdo, perfil derecho, alzado posterior y vista inferior**.",
        "En el **sistema europeo (método E)**, la planta se sitúa **debajo** del alzado y el perfil izquierdo a su **derecha**. En el **método A (americano)** es al revés.",
        "Se elige como **alzado** la cara que **mejor define** la pieza, con la posición de **uso** o de **fabricación**.",
        "Se dibujan **solo las vistas necesarias**, las mínimas que definen la pieza sin ambigüedad.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Cómo se disponen", [
      { kind: "text", text: "Alzado, planta y perfil izquierdo de una pieza en L, con sus alineaciones." },
    ], anim("dt1-vistas-pieza"), "visual-top"),
    slide("explora", "Cambia la pieza", [
      { kind: "text", text: "Modifica las dimensiones y observa cómo cambian las tres vistas. Fíjate en la arista oculta del perfil." },
    ], tool("dt1-vistas-explorador"), "visual-top"),
    slide("reglas", "Reglas básicas", [
      { kind: "steps", items: [
        "Las vistas están **alineadas**: el alzado y la planta comparten el ancho; el alzado y el perfil comparten la altura.",
        "Las **aristas ocultas** se dibujan **discontinuas**, pero solo las que **aclaran** la forma.",
        "Las piezas **de revolución** (ejes, bujes) suelen necesitar **una sola vista**, con el símbolo **Ø**.",
        "Cuando la forma interior es compleja se recurre a **cortes y secciones** (en Dibujo Técnico II).",
      ] },
    ]),
    calc("calc-alt", "Altura del alzado", "Una pieza en L con base de 20 mm y bloque superior de 30 mm. ¿Qué altura total tiene en el alzado, en mm?", nums(50), "20 + 30 = 50 mm.", "Suma las dos alturas."),
    calc("calc-area", "Superficie del alzado", "La pieza mide 80 mm de largo; el bloque superior tiene 40 mm de largo. Superficie del alzado = 80·20 + 40·30. ¿Cuántos mm²?", nums(2800), "1600 + 1200 = 2800 mm².", "Dos rectángulos."),
    calc("calc-vol", "Volumen", "Con 50 mm de ancho, el volumen es 50 × 2800 mm³. ¿Cuántos cm³?", nums(140), "140 000 mm³ = 140 cm³.", "1 cm³ = 1000 mm³."),
    sort("clasifica-vista", "¿Qué vista es?", "Asocia cada descripción con la vista.",
      [["alz", "Alzado", "cobalt"], ["pla", "Planta", "amber"], ["per", "Perfil izquierdo", "emerald"]],
      [["Vista frontal de la pieza", "alz"], ["La que mejor define la forma", "alz"], ["Vista desde arriba", "pla"], ["Se coloca debajo del alzado", "pla"], ["Vista desde la izquierda", "per"], ["Se coloca a la derecha del alzado", "per"]],
      "Cada vista tiene su posición en el sistema europeo.",
    ),
    pick("check-oculta", "Aristas ocultas", "En el perfil izquierdo, la arista de la base que no se ve se dibuja…",
      "Con línea discontinua fina, porque es una arista oculta",
      [["Continua gruesa, como las demás", "Solo las visibles."], ["No se dibuja nunca", "Se dibuja si ayuda a entender la pieza."], ["Mixta de trazo y punto", "Eso es un eje."]],
      "Las aristas ocultas se representan discontinuas.",
    ),
  ],
};
