import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const elipseFocosEjesDt2Lesson: InteractiveLesson = {
  slug: "elipse-focos-ejes-dt2",
  title: "2. La elipse: focos y ejes",
  subtitle: DT2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Definición", [
      { kind: "steps", items: [
        "La **elipse** es el lugar geométrico de los puntos del plano cuya **suma de distancias a dos puntos fijos** F y F′ (los **focos**) es **constante**.",
        "Esa constante es la longitud del **eje mayor**: **PF + PF′ = 2a**.",
        "Elementos: **centro O**, **ejes** (mayor 2a y menor 2b), **vértices**, **focos** y **distancia focal 2c**.",
        "Relación fundamental: **a² = b² + c²**. La **excentricidad** es **e = c/a**, siempre entre 0 y 1.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Suma constante", [
      { kind: "text", text: "Mueve el punto P por la elipse y cambia los semiejes. La suma de las dos distancias no varía." },
    ], tool("dt2-elipse-focos-explorador"), "visual-top"),
    slide("traza-anim", "Trazado por afinidad", [
      { kind: "text", text: "Mira cómo se obtiene la elipse punto a punto con las dos circunferencias de diámetros 2a y 2b." },
    ], anim("dt2-elipse-circunferencias"), "visual-top"),
    slide("trazado", "Cómo se traza", [
      { kind: "steps", items: [
        "**Método del jardinero**: una cuerda de longitud 2a, con los extremos fijos en los focos, se tensa con un lápiz. Al moverlo traza la elipse.",
        "Con los **ejes**: se dibujan dos circunferencias concéntricas de diámetros 2a y 2b. Por un radio cualquiera, se baja una vertical desde su corte con la grande y una horizontal desde su corte con la pequeña; su intersección es un punto de la elipse.",
        "Los **focos** se hallan con un arco de radio **a** centrado en un extremo del eje menor.",
      ] },
    ]),
    calc("calc-c", "Distancia focal", "Una elipse tiene a = 5 cm y b = 3 cm. ¿Cuánto vale c, en cm?", nums(4), "c = √(a² − b²) = √(25 − 9) = 4 cm.", "Es un triángulo 3-4-5."),
    calc("calc-e", "Excentricidad", "Con esa misma elipse, ¿cuánto vale la excentricidad e = c/a?", nums(0.8), "e = 4/5 = 0,8.", "Divide c entre a."),
    calc("calc-suma", "Suma de distancias", "En esa elipse, un punto P está a 3 cm del foco F. ¿A qué distancia está del otro foco F′, en cm?", nums(7), "PF + PF′ = 2a = 10, luego PF′ = 10 − 3 = 7 cm.", "La suma total es el eje mayor."),
    sort("clasifica", "Elementos", "Asocia cada dato con el elemento de la elipse.",
      [["a", "Semieje mayor a", "cobalt"], ["b", "Semieje menor b", "amber"], ["c", "Semidistancia focal c", "emerald"]],
      [["Mitad de la suma constante PF + PF′", "a"], ["Distancia del centro a un vértice del eje mayor", "a"], ["Distancia del centro a un vértice del eje menor", "b"], ["Es el menor de los dos semiejes", "b"], ["Distancia del centro a un foco", "c"], ["c = √(a² − b²)", "c"]],
      "a: eje mayor; b: eje menor; c: foco.",
    ),
    pick("check", "Excentricidad", "Si los dos focos de una elipse coinciden con el centro, ¿qué curva se obtiene?",
      "Una circunferencia",
      [["Una parábola", "No hay directriz."], ["Un segmento", "Eso ocurre con focos muy alejados."], ["Una hipérbola", "No es el caso."]],
      "Con c = 0 resulta a = b: circunferencia (e = 0).",
    ),
  ],
};
