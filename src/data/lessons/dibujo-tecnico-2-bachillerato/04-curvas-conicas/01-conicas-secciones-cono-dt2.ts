import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const conicasSeccionesConoDt2Lesson: InteractiveLesson = {
  slug: "conicas-secciones-cono-dt2",
  title: "1. Las cónicas como secciones de un cono",
  subtitle: DT2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cuatro curvas, un solo cono", [
      { kind: "steps", items: [
        "Un **cono de revolución** tiene un **eje**, un **vértice** y **generatrices** que forman con el eje un ángulo **α** (el semiángulo del cono).",
        "Al cortarlo con un **plano**, la forma de la sección depende solo del ángulo **β** que el plano forma con el eje.",
        "Las curvas resultantes se llaman **cónicas**: **circunferencia, elipse, parábola e hipérbola**.",
        "Apolonio de Perge las estudió sistemáticamente hacia el siglo III a. C.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Inclina el plano", [
      { kind: "text", text: "Cambia el ángulo del plano y el del cono. Observa a la derecha la curva que se obtiene y su excentricidad." },
    ], tool("dt2-corte-cono-explorador"), "visual-top"),
    slide("casos", "Clasificación", [
      { kind: "steps", items: [
        "**β = 90°**: el plano es perpendicular al eje → **circunferencia** (e = 0).",
        "**β > α**: el plano corta todas las generatrices de una misma hoja → **elipse** (0 < e < 1).",
        "**β = α**: el plano es paralelo a una generatriz → **parábola** (e = 1).",
        "**β < α**: el plano corta las dos hojas del cono → **hipérbola** (e > 1).",
        "Si el plano pasa por el **vértice** se obtienen las formas degeneradas: un punto, una recta o dos rectas.",
      ] },
    ]),
    slide("excentricidad", "La excentricidad", [
      { kind: "text", text: "La **excentricidad** mide cuánto se aleja la curva de una circunferencia. Para la sección de un cono vale $e = \\dfrac{\\cos\\beta}{\\cos\\alpha}$. También se define como el cociente entre la distancia de un punto de la curva a un foco y su distancia a la directriz." },
    ]),
    calc("calc-e", "Calcula e", "Un cono tiene semiángulo α = 30°. Un plano que forma β = 60° con el eje lo corta. ¿Cuánto vale la excentricidad e = cos β / cos α? (dos decimales)", nums(0.58, 0.577), "cos 60° / cos 30° = 0,5 / 0,866 ≈ 0,58.", "cos 60° = 0,5 y cos 30° ≈ 0,866."),
    calc("calc-par", "El caso de la parábola", "En un cono de α = 35°, ¿qué ángulo β con el eje debe formar el plano para que la sección sea una parábola, en grados?", nums(35), "La parábola aparece cuando el plano es paralelo a una generatriz: β = α = 35°.", "Es paralelo a la generatriz."),
    sort("clasifica", "¿Qué curva?", "Clasifica cada plano de corte según la curva que produce.",
      [["cir", "Circunferencia", "cobalt"], ["eli", "Elipse", "amber"], ["par", "Parábola", "emerald"], ["hip", "Hipérbola", "rose"]],
      [["Plano perpendicular al eje", "cir"], ["β = 90°", "cir"], ["β mayor que α", "eli"], ["Corta todas las generatrices de una hoja", "eli"], ["Plano paralelo a una generatriz", "par"], ["β = α", "par"], ["Corta las dos hojas del cono", "hip"], ["β menor que α", "hip"]],
      "El valor de β frente a α decide la curva.",
    ),
    pick("check", "Excentricidad", "Una cónica tiene excentricidad e = 1. ¿Cuál es?",
      "Una parábola",
      [["Una circunferencia", "Esa tiene e = 0."], ["Una elipse", "La elipse tiene e entre 0 y 1."], ["Una hipérbola", "La hipérbola tiene e mayor que 1."]],
      "La parábola es el caso límite entre la elipse y la hipérbola.",
    ),
  ],
};
