import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const analisisDatosAjusteLinealFq4Lesson: InteractiveLesson = {
  slug: "analisis-datos-ajuste-lineal-fq4",
  title: "3. Análisis de datos y ajuste lineal",
  subtitle: FQ4_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "De los datos a la ley", [
      { kind: "steps", items: [
        "Un experimento produce una **tabla de datos** (x, y). Para interpretarlos se hace una **gráfica**: cada dato es un punto.",
        "Si los puntos siguen una **tendencia lineal**, se ajusta una **recta y = a·x + b**.",
        "La **pendiente a** y la **ordenada b** suelen tener **significado físico**: la constante de un muelle, la aceleración de la gravedad, la densidad…",
        "El ajuste permite **interpolar** (valores dentro del rango de datos) y **extrapolar** con cuidado (fuera de él).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Ajusta una recta", [
      { kind: "text", text: "Prueba a ajustar tú la recta y compara con el mejor ajuste de mínimos cuadrados." },
    ], tool("fq4-ajuste-lineal-explorador"), "visual-top"),
    slide("mc", "Mínimos cuadrados", [
      { kind: "steps", items: [
        "Para cada dato, el **residuo** es la diferencia entre el valor medido y el que da la recta.",
        "El **mejor ajuste** minimiza la **suma de los cuadrados de los residuos**.",
        "El coeficiente de determinación **r²** (entre 0 y 1) indica lo bien que la recta explica los datos: cerca de **1**, muy buen ajuste.",
        "**No hay que unir los puntos**: hay que trazar la **línea de tendencia**, porque cada punto tiene un error.",
      ] },
    ]),
    calc("calc-pend", "Pendiente", "Una recta pasa por (0, 0) y (10 cm, 5 N). ¿Cuánto vale su pendiente, en N/cm?", nums(0.5), "a = 5 / 10 = 0,5 N/cm.", "Variación de y entre variación de x."),
    calc("calc-pred", "Predicción", "Con F = 0,49 · x (N, con x en cm), ¿qué fuerza corresponde a un alargamiento de 8 cm, en N? (redondea a un decimal)", nums(3.9, 3.92), "F = 0,49 · 8 = 3,92 ≈ 3,9 N.", "Sustituye x en la recta."),
    calc("calc-g", "Caída libre", "Con v = 9,8 · t, ¿qué velocidad tiene a los 3 s, en m/s?", nums(29.4), "9,8 · 3 = 29,4 m/s.", "Pendiente por tiempo."),
    calc("calc-dens", "Densidad", "La pendiente de la gráfica masa–volumen es 2,7 g/cm³. ¿Cuántos g tiene un volumen de 40 cm³?", nums(108), "m = 2,7 · 40 = 108 g.", "m = ρ·V."),
    sort("clasifica", "Significado de la pendiente", "Asocia cada gráfica con lo que representa su pendiente.",
      [["k", "Constante elástica", "amber"], ["g", "Aceleración", "cobalt"], ["ro", "Densidad", "emerald"]],
      [["Fuerza frente a alargamiento de un muelle", "k"], ["Ley de Hooke", "k"], ["Velocidad frente a tiempo en caída libre", "g"], ["Velocidad frente a tiempo con aceleración constante", "g"], ["Masa frente a volumen de un sólido", "ro"], ["Masa frente a volumen de un líquido", "ro"]],
      "La pendiente es la constante que relaciona las dos magnitudes.",
    ),
    pick("check", "Coeficiente r²", "Un ajuste lineal da r² = 0,998. ¿Qué indica?",
      "Que la recta describe muy bien los datos",
      [["Que los datos son aleatorios", "Eso daría un valor cercano a 0."], ["Que la pendiente es 0,998", "r² no es la pendiente."], ["Que hay un error del 99,8 %", "Es lo contrario."]],
      "Cuanto más cerca de 1, mejor ajuste.",
    ),
  ],
};
