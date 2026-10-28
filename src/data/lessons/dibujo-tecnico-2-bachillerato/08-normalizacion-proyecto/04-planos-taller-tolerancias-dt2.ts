import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const planosTallerToleranciasDt2Lesson: InteractiveLesson = {
  slug: "planos-taller-tolerancias-dt2",
  title: "4. Planos de taller: tolerancias y ajustes",
  subtitle: DT2_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "El plano de taller", [
      { kind: "steps", items: [
        "El **plano de taller** (o de fabricación) define **una sola pieza** con todo lo necesario para fabricarla y **verificarla**.",
        "Contiene: las **vistas** necesarias (con cortes y secciones), la **acotación completa**, las **tolerancias**, los **acabados superficiales**, el **material** y el **cuadro de rotulación**.",
        "La acotación debe ser **funcional**: se acotan las medidas que **influyen en el montaje** y el funcionamiento, no las que sobran.",
        "Una pieza solo se puede **fabricar y medir** con una tolerancia: nadie consigue la medida exacta.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Eje y agujero", [
      { kind: "text", text: "Mueve la posición del eje respecto del agujero y observa el juego mínimo, el máximo y el tipo de ajuste." },
    ], tool("dt2-ajuste-tolerancias-explorador"), "visual-top"),
    slide("tipos", "Tipos de ajuste", [
      { kind: "steps", items: [
        "**Con juego**: el eje es siempre menor que el agujero; las piezas **giran o deslizan** (cojinetes, guías).",
        "**Con apriete**: el eje es siempre mayor; el montaje es **a presión** o con temperatura (poleas, casquillos).",
        "**Indeterminado**: según las medidas reales puede salir con juego o con apriete; para **posicionar** con precisión.",
        "Se designan con letras y cifras (el **agujero** en mayúscula y el **eje** en minúscula, más el grado de tolerancia **IT**). Un número de IT menor significa más **precisión** y más **coste**.",
      ] },
    ]),
    slide("acabado", "Acabado superficial", [
      { kind: "steps", items: [
        "La **rugosidad** (Ra, en µm) indica lo lisa que debe quedar una superficie; se marca con un **símbolo** sobre la superficie.",
        "Superficies de **ajuste** o **deslizamiento** → más lisas (Ra bajo); superficies **libres** → más rugosas, más baratas.",
        "También se indican **tratamientos** (temple, cromado, pavonado) y las tolerancias **geométricas** (planitud, perpendicularidad) cuando hacen falta.",
      ] },
    ]),
    calc("calc-jmax", "Juego máximo", "Un agujero tiene ES = +21 µm y un eje, ei = −20 µm. ¿Cuánto vale el juego máximo ES − ei, en µm?", nums(41), "21 − (−20) = 41 µm.", "Resta con signo."),
    calc("calc-jmin", "Juego mínimo", "El mismo agujero tiene EI = 0 y el eje es = −7 µm. ¿Cuánto vale el juego mínimo EI − es, en µm?", nums(7), "0 − (−7) = 7 µm.", "Resta con signo."),
    sort("clasifica", "¿Qué ajuste?", "Clasifica cada aplicación según el ajuste que pide.",
      [["jue", "Con juego", "cobalt"], ["apr", "Con apriete", "amber"], ["ind", "Indeterminado", "emerald"]],
      [["Cojinete de un eje que gira", "jue"], ["Guía de una corredera", "jue"], ["Polea calada a presión en un eje", "apr"], ["Casquillo montado en caliente", "apr"], ["Pieza centrada que se monta con golpe suave", "ind"], ["Posicionado de una tapa con clavija", "ind"]],
      "El juego permite el movimiento; el apriete fija; el indeterminado centra con precisión.",
    ),
    pick("check", "IT y coste", "¿Qué ocurre al elegir un grado de tolerancia IT más pequeño (más preciso)?",
      "Mejora la precisión pero aumenta el coste de fabricación",
      [["Disminuye el coste", "Exige procesos más precisos."], ["No cambia nada", "Cambia el coste."], ["Aumenta el juego", "Se reduce."]],
      "Tolerancias más estrechas requieren más precisión de máquina y control.",
    ),
  ],
};
