import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const graficasAjusteInformeFq3Lesson: InteractiveLesson = {
  slug: "graficas-ajuste-informe-fq3",
  title: "4. Gráficas, ajuste e informe",
  subtitle: FQ3_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Del dato a la conclusión", [
      { kind: "steps", items: [
        "Los datos se organizan en una **tabla** con magnitud y **unidad** en cada columna.",
        "En una **gráfica**, la variable independiente va en el **eje horizontal** y la dependiente en el **vertical**, con **escala** y **unidades**.",
        "Los puntos no caen exactamente en una línea por el **error de medida**: se traza la **línea que mejor los ajusta** (no une punto con punto).",
        "Si es una **recta que pasa por el origen**, las magnitudes son **directamente proporcionales**; su **pendiente** es la constante.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Ajusta la recta", [
      { kind: "text", text: "Mueve la pendiente hasta acercarte a todos los puntos. Compara con el mejor ajuste." },
    ], tool("fq3-grafica-ajuste-explorador"), "visual-top"),
    slide("informe", "El informe de laboratorio", [
      { kind: "steps", items: [
        "**Objetivo** e **hipótesis**: qué se quiere averiguar.",
        "**Material** y **procedimiento**: cómo se hizo, para que otra persona pueda repetirlo.",
        "**Datos** y **gráficas**, con unidades y resultados **bien redondeados**.",
        "**Conclusiones**: si se cumple la hipótesis y qué **fuentes de error** pueden haber influido.",
      ] },
    ]),
    calc("calc-pend", "Pendiente", "Una recta pasa por el origen y por el punto (L = 0,5 m; T² = 2 s²). ¿Cuánto vale su pendiente, en s²/m?", nums(4), "k = 2 / 0,5 = 4 s²/m.", "Divide la ordenada entre la abscisa."),
    calc("calc-pred", "Predicción", "Con T² = 4·L, ¿cuánto valdrá T² para L = 0,75 m, en s²?", nums(3), "4 · 0,75 = 3 s².", "Sustituye en la recta."),
    calc("calc-prop", "Proporcionalidad", "Un muelle se alarga 2 cm con 100 g. Si es proporcional, ¿cuánto se alargará con 350 g, en cm?", nums(7), "2 · 3,5 = 7 cm.", "350 g son 3,5 veces 100 g."),
    sort("clasifica", "Partes del informe", "Coloca cada elemento en su apartado del informe.",
      [["pre", "Antes de experimentar", "cobalt"], ["des", "Durante", "amber"], ["des2", "Después", "emerald"]],
      [["Hipótesis", "pre"], ["Objetivo", "pre"], ["Material", "des"], ["Tabla de datos", "des"], ["Gráfica y ajuste", "des2"], ["Conclusiones", "des2"]],
      "Planificar, medir y analizar.",
    ),
    pick("check", "Gráfica", "¿Cómo debe ser la línea de una gráfica experimental?",
      "La que mejor se ajusta al conjunto de puntos",
      [["Debe unir todos los puntos con segmentos", "Los puntos tienen error."], ["Debe pasar por el primer punto", "No hay motivo."], ["No hace falta dibujar ninguna", "La tendencia se ve mejor con ella."]],
      "Se traza la línea de tendencia.",
    ),
  ],
};
