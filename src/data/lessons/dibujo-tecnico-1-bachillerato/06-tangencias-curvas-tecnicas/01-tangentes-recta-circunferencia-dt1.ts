import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const tangentesRectaCircunferenciaDt1Lesson: InteractiveLesson = {
  slug: "tangentes-recta-circunferencia-dt1",
  title: "1. Tangentes a una circunferencia",
  subtitle: DT1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Tocar sin cortar", [
      { kind: "steps", items: [
        "Una recta es **tangente** a una circunferencia si tiene **un solo punto en común**, el **punto de tangencia** T.",
        "La tangente es **perpendicular al radio** en T: $OT \\perp t$.",
        "Desde un punto **exterior** P se pueden trazar **dos tangentes**, y **PT₁ = PT₂**. Desde un punto de la circunferencia, **una**; desde un punto interior, **ninguna**.",
        "La longitud de la tangente es $PT = \\sqrt{OP^2 - R^2}$ (Pitágoras).",
      ] },
    ], undefined, "stack"),
    slide("traza", "Tangentes desde un punto exterior", [
      { kind: "text", text: "Sigue la construcción: la circunferencia de diámetro OP corta a la dada en los puntos de tangencia." },
    ], anim("dt1-tangentes-punto"), "visual-top"),
    slide("explora", "Longitud y ángulo", [
      { kind: "text", text: "Cambia el radio y la distancia. Mira cómo varían la longitud de la tangente y el ángulo que forman." },
    ], tool("dt1-tangente-punto-explorador"), "visual-top"),
    slide("otras", "Otras tangentes sencillas", [
      { kind: "steps", items: [
        "**Tangente en un punto T de la circunferencia**: perpendicular al radio OT por T.",
        "**Tangente paralela a una recta dada**: se traza el diámetro perpendicular a esa dirección; las tangentes por sus extremos son las pedidas (son dos).",
        "**Tangente que forma un ángulo dado con una recta**: se traza el radio con la dirección perpendicular y se levanta la tangente en su extremo.",
      ] },
    ]),
    calc("calc-long", "Longitud de la tangente", "Una circunferencia de radio 3 cm y un punto P a 5 cm del centro. ¿Cuánto mide cada tangente, en cm?", nums(4), "√(5² − 3²) = √16 = 4 cm.", "Pitágoras con OP como hipotenusa."),
    calc("calc-op", "Distancia al centro", "Una tangente mide 12 cm y el radio es 5 cm. ¿A qué distancia del centro está P, en cm?", nums(13), "OP = √(12² + 5²) = 13 cm.", "La terna 5-12-13."),
    calc("calc-ang", "Ángulo entre tangentes", "Si OP = 2R, las dos tangentes forman un ángulo 2·arcsen(R/OP). ¿Cuántos grados mide?", nums(60), "arcsen(1/2) = 30°, y 2 · 30° = 60°.", "sen 30° = 0,5."),
    sort("clasifica-punto", "¿Cuántas tangentes?", "Según la posición del punto respecto de la circunferencia.",
      [["dos", "Dos tangentes", "cobalt"], ["una", "Una tangente", "amber"], ["cero", "Ninguna tangente", "emerald"]],
      [["Un punto a 8 cm de una circunferencia de radio 3", "dos"], ["Un punto a 2 cm del borde, fuera", "dos"], ["Un punto sobre la circunferencia", "una"], ["El extremo de un diámetro", "una"], ["Un punto a 1 cm del centro (R = 3)", "cero"], ["El propio centro", "cero"]],
      "Exterior: dos; sobre la curva: una; interior: ninguna.",
    ),
    pick("check-thales", "Por qué funciona", "¿Por qué la circunferencia de diámetro OP da los puntos de tangencia?",
      "Porque el ángulo inscrito en una semicircunferencia es recto, así que OT ⟂ TP",
      [["Porque OP es la bisectriz", "No interviene la bisectriz."], ["Porque M es el centro de gravedad", "No tiene relación."], ["Porque OT es igual a OP", "OT es el radio, menor que OP."]],
      "El ángulo OTP es recto: justo la condición de la tangente.",
    ),
  ],
};
