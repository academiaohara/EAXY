import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const paralelismoDiedricoDt1Lesson: InteractiveLesson = {
  slug: "paralelismo-diedrico-dt1",
  title: "7. Paralelismo entre rectas y planos",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("def", "Condiciones de paralelismo", [
      { kind: "steps", items: [
        "**Rectas paralelas**: sus proyecciones **homónimas** son paralelas (**ab ∥ cd** y **a′b′ ∥ c′d′**). Las rectas **de perfil** necesitan una tercera proyección.",
        "**Planos paralelos**: sus **trazas homónimas** son paralelas ($\\alpha_1 \\parallel \\beta_1$ y $\\alpha_2 \\parallel \\beta_2$).",
        "**Recta paralela a un plano**: es paralela a **una recta del plano**.",
        "Por un punto exterior pasa **un único plano paralelo** a uno dado: se traza con una **recta horizontal** paralela a α₁ y se usan sus trazas.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Planos paralelos", [
      { kind: "text", text: "α está fijo. Cambia las trazas de β: solo son paralelos cuando coinciden los dos ángulos." },
    ], tool("dt1-planos-paralelos-explorador"), "visual-top"),
    slide("pasos", "Plano paralelo por un punto", [
      { kind: "steps", items: [
        "Por la proyección **a′** se traza una **recta horizontal** con **h′ ∥ LT**.",
        "Su proyección **h** pasa por a y es **paralela a α₁**.",
        "Se halla la **traza vertical** de esa recta; por ella pasa la **traza vertical del nuevo plano**, paralela a α₂.",
        "La **traza horizontal** del plano se obtiene paralela a α₁ por el punto de corte con la LT.",
      ] },
    ]),
    calc("calc-ang", "Ángulo de la traza", "La traza horizontal de α forma 135° con la LT. ¿Cuántos grados debe formar la traza horizontal de un plano paralelo a α?", nums(135), "Las trazas homónimas de planos paralelos son paralelas: 135°.", "Tienen la misma dirección."),
    calc("calc-dist", "Distancia entre planos", "Dos planos paralelos con trazas a 135° y 45° cortan la LT en puntos separados 3 cm. ¿Qué distancia hay entre ellos, en cm? (d = Δm · 0,5/√0,75, dos decimales)", nums(1.73, 1.732), "3 · 0,5 / 0,866 ≈ 1,73 cm.", "El factor es 0,577."),
    calc("calc-corte", "Ángulo entre planos paralelos", "Dos planos paralelos, ¿qué ángulo forman entre sí, en grados?", nums(0), "Si son paralelos, no se cortan y su ángulo es 0°.", "Tienen la misma inclinación."),
    sort("clasifica-paral", "¿Paralelos?", "Clasifica cada caso.",
      [["si", "Paralelos", "cobalt"], ["no", "No paralelos", "amber"]],
      [["Trazas horizontales y verticales paralelas entre sí", "si"], ["Planos que cortan la LT en puntos distintos con las mismas trazas inclinadas", "si"], ["Dos rectas con ab ∥ cd y a′b′ ∥ c′d′ (no de perfil)", "si"], ["Trazas horizontales paralelas pero verticales distintas", "no"], ["Dos rectas con solo una pareja de proyecciones paralelas", "no"]],
      "Hay que cumplir la condición para las dos proyecciones o las dos trazas.",
    ),
    pick("check-una", "Una sola traza paralela", "Dos planos tienen las trazas horizontales paralelas pero las verticales no. ¿Qué se puede decir?",
      "Se cortan en una recta horizontal, paralela al PH",
      [["Son paralelos", "Necesitan las dos."], ["Son perpendiculares", "No lo indica."], ["No se cortan", "Se cortan en una recta."]],
      "La recta intersección no tiene traza horizontal propia: es paralela a ella, es decir, horizontal.",
    ),
  ],
};
