import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const instrumentosMedidaMetrologia4esoLesson: InteractiveLesson = {
  slug: "instrumentos-medida-metrologia-4eso",
  title: "1. Instrumentos de medida: micrómetro y polímetro",
  subtitle: TECESO4_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Medir bien", [
      { kind: "steps", items: [
        "Toda medida tiene **incertidumbre**: no existe una medida exacta, solo una medida con cierto error.",
        "**Resolución**: la menor variación que el instrumento distingue (0,05 mm en un pie de rey, 0,01 mm en un micrómetro).",
        "**Calibración**: comprobar el instrumento con un patrón conocido.",
        "Se elige el instrumento según la **precisión necesaria**: regla, pie de rey, micrómetro, polímetro, galga.",
        "**Repetir** la medida y promediar reduce el error aleatorio.",
      ] },
    ], undefined, "stack"),
    slide("calibre", "El pie de rey", [
      { kind: "text", text: "Practica con el pie de rey: lee el nonio con la resolución del instrumento." },
    ], tool("eso2-calibre-explorador"), "visual-top"),
    slide("micro", "El micrómetro", [
      { kind: "text", text: "Para piezas que exigen centésimas de milímetro. Cambia la medida y mira cómo se lee en el cilindro y el tambor." },
    ], tool("eso4-micrometro-explorador"), "visual-top"),
    slide("poli", "El polímetro", [
      { kind: "text", text: "Mide tensión, corriente y resistencia. Elige el rango y mira cómo cambia el error." },
    ], tool("eso4-polimetro-explorador"), "visual-top"),
    calc("calc-micro", "Lectura del micrómetro", "El cilindro marca 7,5 mm y el tambor 38 divisiones. ¿Qué medida es, en mm? (7,5 + 38·0,01)", nums(7.88), "7,5 + 0,38 = 7,88 mm.", "Suma la lectura del cilindro y la del tambor."),
    calc("calc-err", "Error del polímetro", "Un polímetro mide 1,50 V con un error de ±(0,5 % de la lectura + 2 dígitos), con una resolución de 0,001 V. ¿Cuántos mV vale el error? (0,0075 + 0,002 en V, a mV)", nums(9.5), "0,5 % de 1,5 = 0,0075 V; más 0,002 V = 0,0095 V = 9,5 mV.", "Suma el porcentaje y los dígitos."),
    sort("clasifica-inst", "¿Qué instrumento?", "Elige el instrumento adecuado.",
      [["pie", "Pie de rey", "cobalt"], ["mic", "Micrómetro", "amber"], ["pol", "Polímetro", "emerald"]],
      [["Diámetro exterior de un eje a ±0,02 mm", "pie"], ["Profundidad de un taladro", "pie"], ["Espesor de una chapa fina a 0,01 mm", "mic"], ["Diámetro de un alambre", "mic"], ["Tensión de una pila", "pol"], ["Continuidad de un cable", "pol"]],
      "Cada instrumento tiene su rango y su precisión.",
    ),
    pick("check-rango", "El rango", "Para medir 0,3 V con un polímetro, ¿qué rango conviene?",
      "El menor que no se desborde, porque el error relativo es menor",
      [["El mayor posible", "Aumenta el error relativo."], ["Cualquiera, da igual", "No da igual."], ["Uno sin escala", "No existe."]],
      "Los dígitos de error pesan más en rangos grandes.",
    ),
  ],
};
