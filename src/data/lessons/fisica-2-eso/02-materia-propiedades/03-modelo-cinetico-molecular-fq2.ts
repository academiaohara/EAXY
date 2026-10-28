import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const modeloCineticoMolecularFq2Lesson: InteractiveLesson = {
  slug: "modelo-cinetico-molecular-fq2",
  title: "3. El modelo cinético-molecular",
  subtitle: FQ2_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Un modelo para explicar la materia", [
      { kind: "steps", items: [
        "Un **modelo** es una representación simplificada que **explica** lo que observamos.",
        "El **modelo cinético-molecular** dice que la materia está formada por **partículas** muy pequeñas.",
        "Entre las partículas hay **espacio vacío** y entre ellas actúan **fuerzas de atracción**.",
        "Las partículas están en **continuo movimiento**: cuanto mayor es la **temperatura**, más rápido se mueven.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Las partículas en cada estado", [
      { kind: "text", text: "Mira cómo se colocan y cómo se mueven las partículas en un sólido, un líquido y un gas." },
    ], anim("fq2-particulas-estados"), "visual-top"),
    slide("explora", "Temperatura, volumen y presión", [
      { kind: "text", text: "Sube la temperatura y reduce el volumen de un gas. Observa la velocidad de las partículas y la presión." },
    ], tool("fq2-modelo-cinetico-explorador"), "visual-top"),
    slide("presion", "La presión de un gas", [
      { kind: "steps", items: [
        "La **presión** de un gas se debe a los **choques** de sus partículas con las paredes del recipiente.",
        "Si **sube la temperatura**, las partículas van más deprisa y chocan **con más fuerza**: aumenta la presión.",
        "Si **disminuye el volumen**, las partículas chocan con las paredes **más a menudo**: aumenta la presión.",
        "La **escala kelvin** parte del cero absoluto: **K = °C + 273**.",
      ] },
    ]),
    calc("calc-k", "A kelvin", "Un gas está a 27 °C. ¿Cuántos kelvin son?", nums(300), "K = 27 + 273 = 300 K.", "Suma 273."),
    calc("calc-c", "A grados Celsius", "Un gas está a 373 K. ¿Cuántos grados Celsius son?", nums(100), "°C = 373 − 273 = 100 °C.", "Resta 273."),
    sort("clasifica", "¿Qué le pasa a la presión?", "Clasifica cada cambio de un gas encerrado según su efecto sobre la presión.",
      [["sub", "La presión sube", "cobalt"], ["baj", "La presión baja", "amber"]],
      [["Se calienta el gas", "sub"], ["Se comprime el gas con el émbolo", "sub"], ["Se reduce el volumen a la mitad", "sub"], ["Se enfría el gas", "baj"], ["Se deja expandir el gas", "baj"], ["Se aumenta el volumen del recipiente", "baj"]],
      "Más choques o más fuertes, más presión.",
    ),
    pick("check", "Temperatura", "Según el modelo cinético, ¿qué mide la temperatura?",
      "La agitación media de las partículas",
      [["El tamaño de las partículas", "No cambia con la temperatura."], ["El número de partículas", "No es eso."], ["El color de la sustancia", "No tiene relación."]],
      "A mayor temperatura, las partículas se mueven, en promedio, más deprisa.",
    ),
  ],
};
