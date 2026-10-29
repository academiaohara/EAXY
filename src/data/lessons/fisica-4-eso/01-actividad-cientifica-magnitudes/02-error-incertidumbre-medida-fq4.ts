import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const errorIncertidumbreMedidaFq4Lesson: InteractiveLesson = {
  slug: "error-incertidumbre-medida-fq4",
  title: "2. Error e incertidumbre de una medida",
  subtitle: FQ4_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Toda medida tiene error", [
      { kind: "steps", items: [
        "Ninguna medida es **exacta**: siempre hay una diferencia entre el valor medido y el **valor verdadero**.",
        "**Error sistemático**: se repite siempre en el mismo sentido (instrumento mal calibrado, cero mal ajustado). Se corrige.",
        "**Error aleatorio**: varía de una medida a otra (pulso al cronometrar, lectura de escala). Se reduce **repitiendo** la medida.",
        "La **sensibilidad** o **resolución** del instrumento es la menor división que distingue; fija la **incertidumbre mínima**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Repetir y promediar", [
      { kind: "text", text: "Aumenta el número de medidas de g con un péndulo y mira cómo cambian la media, la desviación y el error." },
    ], tool("fq4-error-medida-explorador"), "visual-top"),
    slide("formulas", "Fórmulas", [
      { kind: "steps", items: [
        "**Error absoluto**: E = |medida − valor verdadero|. Tiene las unidades de la magnitud.",
        "**Error relativo**: Eᵣ = E / valor verdadero (· 100 si se da en %). No tiene unidades.",
        "**Media** de n medidas: x̄ = Σxᵢ / n. **Desviación típica**: s = √(Σ(xᵢ − x̄)² / (n − 1)).",
        "**Incertidumbre de la media**: s / √n. Se escribe **x = x̄ ± incertidumbre**, con **1 o 2 cifras significativas** en la incertidumbre.",
      ] },
    ]),
    calc("calc-abs", "Error absoluto", "Se mide una longitud de 49 cm y el valor verdadero es 50 cm. ¿Cuánto vale el error absoluto, en cm?", nums(1), "|49 − 50| = 1 cm.", "Diferencia en valor absoluto."),
    calc("calc-rel", "Error relativo", "En ese caso, ¿cuánto vale el error relativo, en %?", nums(2), "1 / 50 · 100 = 2 %.", "Error absoluto entre el valor verdadero."),
    calc("calc-media", "Media", "Tres medidas de tiempo: 9,6 s, 9,8 s y 10,0 s. ¿Cuál es la media, en s?", nums(9.8), "(9,6 + 9,8 + 10,0) / 3 = 9,8 s.", "Suma y divide entre 3."),
    calc("calc-cs", "Cifras significativas", "¿Cuántas cifras significativas tiene el número 0,00340?", nums(3), "Cuentan 3, 4 y el cero final: 3 cifras.", "Los ceros a la izquierda no cuentan; el cero final sí."),
    sort("clasifica", "Tipo de error", "Clasifica cada fuente de error.",
      [["si", "Sistemático", "rose"], ["al", "Aleatorio", "cobalt"]],
      [["Una balanza que marca 2 g con el plato vacío", "si"], ["Un cronómetro que va adelantado", "si"], ["Una regla dilatada por el calor", "si"], ["El pulso al detener el cronómetro", "al"], ["La lectura de una escala entre dos marcas", "al"], ["Pequeñas corrientes de aire al pesar", "al"]],
      "Sistemático: siempre igual; aleatorio: varía.",
    ),
    pick("check", "Más medidas", "¿Qué ocurre con la incertidumbre de la media al aumentar el número de medidas?",
      "Disminuye, porque se divide entre √n",
      [["Aumenta", "Al promediar se reduce."], ["No cambia", "Depende de n."], ["Desaparece", "Nunca llega a cero."]],
      "Incertidumbre = s / √n.",
    ),
  ],
};
