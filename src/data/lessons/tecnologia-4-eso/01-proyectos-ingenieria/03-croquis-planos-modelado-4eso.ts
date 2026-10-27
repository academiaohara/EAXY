import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const croquisPlanosModelado4esoLesson: InteractiveLesson = {
  slug: "croquis-planos-modelado-4eso",
  title: "3. Croquis, planos y modelado digital",
  subtitle: TECESO4_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "De la idea al plano", [
      { kind: "steps", items: [
        "**Croquis**: dibujo a mano alzada, rápido, para pensar y comunicar ideas.",
        "**Plano**: dibujo técnico normalizado con **vistas**, **acotación** y **escala**, que permite fabricar la pieza.",
        "**Modelo 3D (CAD)**: se construye en el ordenador y de él se obtienen **planos**, **simulaciones** y archivos para la **fabricación**.",
        "**Vistas principales**: **alzado** (frente), **planta** (desde arriba) y **perfil** (de lado).",
        "**Acotar**: indicar las **medidas reales**, aunque el dibujo esté a escala.",
      ] },
    ], undefined, "stack"),
    slide("vistas", "Las tres vistas", [
      { kind: "text", text: "Cambia las medidas de un prisma y mira cómo son sus vistas en el papel a cada escala." },
    ], tool("eso4-vistas-explorador"), "visual-top"),
    slide("escala", "Cambiar de escala", [
      { kind: "text", text: "Convierte medidas del dibujo a medidas reales y al revés." },
    ], tool("eso2-escala-conversion-explorador"), "visual-top"),
    slide("cad", "Del modelo a la fabricación", [
      { kind: "steps", items: [
        "En CAD se modela con **sólidos básicos**, **extrusiones**, **vaciados** y **redondeos**.",
        "Un **ensamblaje** une varias piezas con **restricciones** y permite comprobar encajes.",
        "El modelo se exporta a **STL** (impresión 3D), **DXF/SVG** (corte láser) o **código G** (CNC).",
        "Se guardan **versiones** y se documenta cada cambio.",
      ] },
    ]),
    calc("calc-real", "Medida real", "En un plano a escala 1:5, una pieza mide 24 mm en el papel. ¿Cuánto mide en la realidad, en mm?", nums(120), "24 · 5 = 120 mm.", "Multiplica por el denominador de la escala."),
    calc("calc-papel", "Medida en el papel", "Una pieza real de 150 mm se dibuja a escala 1:2. ¿Cuánto mide en el papel, en mm?", nums(75), "150 / 2 = 75 mm.", "Divide entre el denominador."),
    calc("calc-vol", "Volumen", "Un prisma de 80 × 50 × 60 mm, ¿cuántos cm³ de volumen tiene?", nums(240), "80·50·60 = 240 000 mm³ = 240 cm³.", "Multiplica y pasa a cm³ dividiendo entre 1 000."),
    sort("clasifica-vista", "¿Qué vista?", "Relaciona cada información con la vista.",
      [["alz", "Alzado", "cobalt"], ["pla", "Planta", "amber"], ["per", "Perfil", "emerald"]],
      [["Ancho y alto del objeto", "alz"], ["La fachada de una casa", "alz"], ["Ancho y fondo del objeto", "pla"], ["El objeto visto desde arriba", "pla"], ["Fondo y alto del objeto", "per"], ["La silueta lateral", "per"]],
      "Cada vista muestra dos de las tres dimensiones.",
    ),
    pick("check-acot", "Acotación", "En un plano a escala 1:2, ¿qué medida se escribe en la cota de una pieza que mide 40 mm en el papel?",
      "80 mm: se anota siempre la medida real",
      [["40 mm", "Sería la medida dibujada."], ["20 mm", "No es la real."], ["Ninguna, no se acota", "Sin cotas no se puede fabricar."]],
      "Las cotas dicen la medida real, sea cual sea la escala.",
    ),
  ],
};
