import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort } from "@/data/lessons/tec1-helpers";

export const fundamentosAxonometriaDt1Lesson: InteractiveLesson = {
  slug: "fundamentos-axonometria-dt1",
  title: "1. Fundamentos del sistema axonométrico",
  subtitle: DT1_SUBTITLES[14],
  stage: { theme: "board" },
  steps: [
    slide("def", "Una sola imagen del objeto", [
      { kind: "steps", items: [
        "En el sistema **axonométrico** el objeto se refiere a un **triedro trirrectángulo** de ejes **X, Y, Z** y se proyecta **con rayos paralelos** sobre **un solo plano**, el **cuadro**.",
        "Se ve el objeto en **tres dimensiones** a la vez, con una única proyección. Se conserva el **paralelismo**.",
        "Las longitudes sobre los ejes se ven **reducidas**; la razón es el **coeficiente de reducción** de cada eje.",
        "Según los rayos sean **perpendiculares** u **oblicuos** al cuadro: **axonometría ortogonal** u **oblicua**.",
      ] },
    ], undefined, "stack"),
    slide("iso", "El cubo isométrico", [
      { kind: "text", text: "Sigue la construcción de un cubo en isométrica y fíjate en cómo quedan las circunferencias de sus caras." },
    ], anim("dt1-cubo-isometrico"), "visual-top"),
    slide("clases", "Clases de axonometría", [
      { kind: "steps", items: [
        "**Ortogonal**: los rayos son **perpendiculares** al cuadro. Los tres ejes se ven reducidos. Puede ser **isométrica**, **dimétrica** o **trimétrica**.",
        "**Oblicua**: los rayos son **oblicuos**. Un plano coordenado puede ser **paralelo al cuadro** y verse **en verdadera forma**: **caballera** (plano frontal XZ) y **militar** (plano horizontal XY).",
        "En la práctica se dibujan con ángulos y **coeficientes simplificados** para trazar rápido.",
        "La elección depende de **qué caras** del objeto tengan más detalle y de la **claridad** de la imagen.",
      ] },
    ]),
    calc("calc-120", "Ejes de la isométrica", "En la perspectiva isométrica, ¿qué ángulo forman entre sí los ejes, en grados?", nums(120), "Los tres ángulos son iguales y suman 360°: 360/3 = 120°.", "Reparte 360° en tres."),
    calc("calc-k", "Coeficiente isométrico", "En una isométrica los tres coeficientes de reducción son iguales y cumplen kx² + ky² + kz² = 2. ¿Cuánto vale cada uno? (dos decimales)", nums(0.82, 0.8165), "3k² = 2 ⇒ k = √(2/3) ≈ 0,82.", "k² = 2/3."),
    calc("calc-kz", "Dimétrica", "En una dimétrica con kx = ky = 0,9, ¿cuánto vale kz? (dos decimales; kz² = 2 − 2·0,81)", nums(0.62, 0.6164), "kz = √0,38 ≈ 0,62.", "Resta del 2."),
    sort("clasifica-axo", "¿Qué tipo es?", "Clasifica cada descripción.",
      [["ort", "Axonometría ortogonal", "cobalt"], ["obl", "Axonometría oblicua", "amber"]],
      [["Rayos perpendiculares al cuadro", "ort"], ["Isométrica, dimétrica y trimétrica", "ort"], ["Los tres ejes se ven reducidos", "ort"], ["Perspectiva caballera", "obl"], ["Perspectiva militar", "obl"], ["Una cara paralela al cuadro en verdadera forma", "obl"]],
      "Solo en la oblicua puede una cara quedar en verdadera forma.",
    ),
    pick("check-paralelo", "Qué se conserva", "En un sistema axonométrico, ¿qué ocurre con dos aristas paralelas del objeto?",
      "Se dibujan paralelas",
      [["Se dibujan convergentes en un punto de fuga", "Eso ocurre en el sistema cónico."], ["Se dibujan perpendiculares", "No cambia su dirección relativa."], ["Se dibujan con la misma longitud sin importar el eje", "Su longitud depende del coeficiente del eje."]],
      "La proyección cilíndrica conserva el paralelismo.",
    ),
  ],
};
