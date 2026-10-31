import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const mruMruaGraficasFb1Lesson: InteractiveLesson = {
  slug: "mru-mrua-graficas-fb1",
  title: "2. MRU y MRUA",
  subtitle: FB1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("mru", "Movimiento rectilíneo uniforme", [
      { kind: "steps", items: [
        "**Trayectoria recta** y **velocidad constante** (a = 0): **x = x₀ + v·t**.",
        "Gráfica **x–t**: recta de pendiente v. Gráfica **v–t**: recta horizontal. El **área** bajo v–t es el desplazamiento.",
        "El signo de v indica el **sentido**: v < 0 es un movimiento hacia el origen (si x > 0).",
        "Para un **encuentro**, se igualan las posiciones x₁(t) = x₂(t) y se resuelve para t.",
      ] },
    ], undefined, "stack"),
    slide("mrua", "Movimiento uniformemente acelerado", [
      { kind: "steps", items: [
        "**Trayectoria recta** y **aceleración constante**: **v = v₀ + a·t**; **x = x₀ + v₀·t + ½·a·t²**; **v² = v₀² + 2·a·Δx**.",
        "Gráfica **x–t**: **parábola**; **v–t**: recta de **pendiente a**; **a–t**: recta horizontal.",
        "**Frenada**: a < 0 con v₀ > 0. Se detiene en t = −v₀/a y la **distancia de frenado** es v₀²/(2|a|). Si sigue la ecuación más allá, **da marcha atrás** (solo es válido mientras actúe la aceleración).",
        "**Relación con el cálculo**: v = dx/dt y a = dv/dt; el desplazamiento es la integral de v.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Gráficas del movimiento", [
      { kind: "text", text: "Cambia x₀, v₀ y a. Observa las tres gráficas a la vez, el instante en que se detiene y la diferencia entre desplazamiento y distancia recorrida." },
    ], tool("fb1-graficas-mrua-explorador"), "visual-top"),
    slide("enc", "Encuentros y persecuciones", [
      { kind: "text", text: "Prueba con dos móviles: elige sus posiciones, velocidades y aceleraciones y mira cuándo y dónde se encuentran." },
    ], tool("fq4-encuentro-explorador"), "visual-top"),
    slide("metodo", "Método para problemas", [
      { kind: "steps", items: [
        "**1.** Elige **origen** y **sentido positivo**; anota el **signo** de cada dato (x₀, v₀, a).",
        "**2.** Escribe las **ecuaciones** de cada móvil. **3.** Impón la condición: **encuentro** (x₁ = x₂), **parada** (v = 0), **alcance** de cierta velocidad…",
        "**4.** Resuelve (en el MRUA aparece una ecuación de 2.º grado: elige la solución con t ≥ 0). **5.** **Comprueba** unidades y que el resultado tenga sentido.",
      ] },
    ], undefined, "stack"),
    calc("calc-mru", "Encuentro MRU", "A sale de x = 0 a 20 m/s y B sale de x = 300 m hacia A a 10 m/s. ¿En qué instante se encuentran, en s?", nums(10), "20t = 300 − 10t → t = 10 s.", "Iguala posiciones."),
    calc("calc-v", "Velocidad en MRUA", "Un coche parte del reposo con a = 3 m/s². ¿Qué velocidad tiene a los 6 s, en m/s?", nums(18), "v = 3·6 = 18 m/s.", "v = v₀ + a·t."),
    calc("calc-x", "Distancia de frenado", "Un coche a 20 m/s frena con a = −4 m/s². ¿Cuántos metros recorre hasta pararse?", nums(50), "Δx = v₀²/(2|a|) = 400/8 = 50 m.", "v² = v₀² + 2aΔx con v = 0."),
    calc("calc-t", "Tiempo de parada", "El mismo coche (20 m/s, a = −4 m/s²), ¿cuánto tarda en pararse, en s?", nums(5), "t = −v₀/a = 20/4 = 5 s.", "v = 0."),
    sort("clasifica", "Forma de la gráfica", "¿Qué forma tiene cada gráfica en un MRUA con a > 0 y v₀ > 0?",
      [["rec", "Recta inclinada", "cobalt"], ["par", "Parábola", "emerald"], ["hor", "Recta horizontal", "rose"]],
      [["x–t", "par"], ["v–t", "rec"], ["a–t", "hor"], ["x–t de un MRU", "rec"], ["v–t de un MRU", "hor"], ["a–t de un MRU (a = 0)", "hor"]],
      "x es cuadrática; v, lineal; a, constante.",
    ),
    pick("check", "Área", "¿Qué representa el área bajo una gráfica v–t?",
      "El desplazamiento",
      [["La aceleración", "Esa es la pendiente."], ["La velocidad media", "No es el área."], ["El tiempo", "Es el eje horizontal."]],
      "Δx = ∫ v dt.",
    ),
  ],
};
