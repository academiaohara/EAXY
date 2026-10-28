import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const tratamientoDatos4esoLesson: InteractiveLesson = {
  slug: "tratamiento-datos-4eso",
  title: "7. Tratamiento de datos: recoger, filtrar y resumir",
  subtitle: TECESO4_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "De los datos a la decisión", [
      { kind: "steps", items: [
        "Sensores, formularios y redes generan **datos**. Por sí solos no dicen nada.",
        "**Recoger** (medir y guardar), **limpiar** (quitar errores y valores imposibles), **filtrar** y **resumir** (media, máximo, mínimo, recuentos).",
        "**Visualizar** con gráficos ayuda a ver patrones y valores anómalos.",
        "Un dato fuera de rango suele ser un **fallo del sensor**, no una medida real.",
      ] },
    ], undefined, "stack"),
    slide("datos", "Analiza una serie", [
      { kind: "text", text: "Temperaturas medias mensuales de una ciudad. Mueve el umbral y mira qué meses lo superan." },
    ], tool("eso4-datos-explorador"), "visual-top"),
    slide("prog", "El programa de análisis", [
      { kind: "text", text: "El mismo análisis en Python: una lista, un bucle y una condición." },
    ], tool("python-traza-explorador", { n: 13 }), "visual-top"),
    slide("etica", "Datos y personas", [
      { kind: "steps", items: [
        "Los datos personales (ubicación, hábitos, imágenes) están protegidos por ley (**RGPD**).",
        "Hay que pedir **consentimiento**, guardar solo lo **necesario** y **proteger** los datos.",
        "Un análisis puede ser **sesgado** si los datos no representan a todo el mundo.",
        "Hay que **citar la fuente** y no manipular los gráficos para engañar.",
      ] },
    ]),
    calc("calc-media", "Media", "Los datos son 12, 14, 9 y 17. ¿Cuál es la media?", nums(13), "52 / 4 = 13.", "Suma entre cuatro."),
    calc("calc-rango", "Rango", "Con datos 8 y 21 como mínimo y máximo, ¿cuál es el rango (máximo − mínimo)?", nums(13), "21 − 8 = 13.", "Diferencia entre máximo y mínimo."),
    calc("calc-cuenta", "Recuento", "En la serie 8, 9, 11, 12, 15, 18, 20, 21, 19, 15, 11, 9, ¿cuántos valores superan 15?", nums(4), "Son 18, 20, 21 y 19: 4.", "Cuenta los mayores que 15."),
    sort("clasifica-dato", "¿Dato válido o error?", "Un sensor de temperatura ambiente en una casa. Clasifica cada lectura.",
      [["val", "Lectura plausible", "emerald"], ["err", "Posible fallo del sensor", "rose"]],
      [["21,5 °C", "val"], ["18,0 °C", "val"], ["24,3 °C", "val"], ["−120 °C", "err"], ["999 °C", "err"], ["Sin lectura (vacío)", "err"]],
      "Antes de analizar hay que limpiar los valores imposibles.",
    ),
    pick("check-sesgo", "Sesgo", "Una encuesta sobre movilidad solo se hace a quienes van en coche. ¿Qué problema tiene?",
      "Está sesgada: la muestra no representa a toda la población",
      [["Ninguno, hay muchos datos", "La cantidad no corrige el sesgo."], ["Es demasiado larga", "No es el problema."], ["Usa Python", "Es irrelevante."]],
      "Más datos no arreglan una muestra mal elegida.",
    ),
  ],
};
