import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const acotacionEscalasNormalizadas2esoLesson: InteractiveLesson = {
  slug: "acotacion-escalas-normalizadas-2eso",
  title: "2. Acotación y escalas normalizadas",
  subtitle: TECESO2_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("anim", "Cómo se acota una pieza", [
      { kind: "text", text: "La acotación indica las medidas reales de la pieza con líneas de cota, flechas y números." },
    ], anim("acotar-pieza-pasos"), "text-top"),
    slide("reglas", "Reglas de acotación", [
      { kind: "steps", items: [
        "Cada medida se acota **una sola vez** y en la vista donde se ve mejor.",
        "Las cotas se escriben en **milímetros**, sin indicar la unidad, y se leen desde abajo o desde la derecha.",
        "Las **líneas de cota** son finas y no cruzan unas con otras; se sitúan **fuera** de la pieza.",
        "Las cotas indican siempre la **medida real**, aunque el dibujo esté a escala.",
        "Un círculo se acota con su **diámetro (Ø)** y un arco con su **radio (R)**.",
      ] },
    ], undefined, "stack"),
    slide("acota", "Acota una pieza", [
      { kind: "text", text: "Cambia las medidas y observa cómo se actualizan las cotas." },
    ], tool("acotacion-explorador", { a: 100, b: 60, c: 12 }), "visual-top"),
    slide("escala", "Escalas normalizadas", [
      { kind: "rule", title: "Escala", text: "Relación entre la medida del dibujo y la medida real del objeto.", formula: "E = dibujo / real" },
      { kind: "steps", items: [
        "**Reducción**: 1:2, 1:5, 1:10, 1:20, 1:50, 1:100… (objetos grandes: casas, piezas grandes).",
        "**Ampliación**: 2:1, 5:1, 10:1… (piezas muy pequeñas: un reloj, un microchip).",
        "**Natural**: 1:1, el dibujo mide lo mismo que el objeto.",
      ] },
    ]),
    slide("convierte", "Convierte medidas", [
      { kind: "text", text: "Elige una escala y la medida real. Comprueba si cabe en un folio A4." },
    ], tool("eso2-escala-conversion-explorador"), "visual-top"),
    calc("calc-dib", "Del objeto al papel", "Una pared de 2 400 mm se dibuja a escala 1:50. ¿Cuántos mm mide en el papel?", nums(48), "2 400 / 50 = 48 mm.", "Divide la medida real entre 50."),
    calc("calc-real", "Del papel al objeto", "En un plano a escala 1:20, una pieza mide 36 mm. ¿Cuánto mide en realidad, en mm?", nums(720), "36 · 20 = 720 mm.", "Multiplica la medida del dibujo por 20."),
    calc("calc-cabe", "Elegir la escala", "Un objeto de 2 400 mm debe dibujarse en un A4 (277 mm útiles). Entre 1:5, 1:10 y 1:20, ¿cuál es la mayor escala (1:n) que cabe? Escribe n.", nums(10), "A 1:5 mide 480 mm (no cabe); a 1:10 mide 240 mm: cabe.", "Calcula el tamaño del dibujo en cada escala."),
    sort("clasifica-cota", "¿Está bien acotado?", "Decide si cada práctica es correcta.",
      [["ok", "Correcta", "emerald"], ["mal", "Incorrecta", "rose"]],
      [["Cotar fuera de la pieza con líneas finas", "ok"], ["Poner la medida real aunque el dibujo esté a escala", "ok"], ["Acotar un círculo con su diámetro Ø", "ok"], ["Repetir la misma cota en varias vistas", "mal"], ["Medir con regla el dibujo y poner esa medida", "mal"], ["Cruzar líneas de cota", "mal"]],
      "Las cotas son medidas reales y no se repiten ni se cruzan.",
    ),
    pick("check-escala", "Piezas pequeñas", "Una pieza de 4 mm de largo se dibuja a escala 5:1. ¿Cuánto mide en el dibujo?",
      "20 mm, porque es una ampliación",
      [["0,8 mm", "Eso sería una reducción 1:5."], ["4 mm", "Eso es escala natural."], ["9 mm", "No se suma: se multiplica."]],
      "En una ampliación 5:1 el dibujo es cinco veces mayor que la pieza real.",
    ),
  ],
};
