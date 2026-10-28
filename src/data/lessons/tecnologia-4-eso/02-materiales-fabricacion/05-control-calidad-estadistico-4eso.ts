import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const controlCalidadEstadistico4esoLesson: InteractiveLesson = {
  slug: "control-calidad-estadistico-4eso",
  title: "5. Control de calidad: la dispersión del proceso",
  subtitle: TECESO4_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Calidad es conformidad", [
      { kind: "steps", items: [
        "**Control de calidad**: comprobar que los productos cumplen sus **especificaciones**.",
        "Se mide una **muestra** (no todas las piezas) y se calculan la **media** y la **desviación típica**.",
        "Se comparan con los **límites de tolerancia**: las piezas fuera de ellos son **defectuosas**.",
        "Se distingue **control** (detectar fallos) de **aseguramiento** (evitar que ocurran): mejora continua, normas ISO 9001.",
      ] },
    ], undefined, "stack"),
    slide("cp", "Capacidad del proceso", [
      { kind: "text", text: "Mueve la media y la dispersión de un proceso y mira cuántas piezas salen fuera de tolerancia." },
    ], tool("eso4-calidad-explorador"), "visual-top"),
    slide("causas", "Por qué hay dispersión", [
      { kind: "steps", items: [
        "**Máquina**: holguras, desgaste, vibraciones.",
        "**Material**: variaciones del lote.",
        "**Método**: ajustes distintos entre turnos.",
        "**Medio**: temperatura, humedad.",
        "**Persona**: la forma de medir o de montar.",
        "Reducir la dispersión suele ser mejor que **seleccionar** piezas al final.",
      ] },
    ]),
    calc("calc-media", "Media de la muestra", "Se miden cinco ejes: 19,98; 20,02; 20,01; 19,99; 20,00 mm. ¿Cuál es la media, en mm?", nums(20), "Suman 100,00; entre 5 da 20,00 mm.", "Suma entre cinco."),
    calc("calc-cp", "Índice Cp", "La tolerancia es 19,9–20,1 mm y la desviación típica es 0,05 mm. ¿Cuánto vale Cp = (USL − LSL) / (6σ)? (dos decimales)", nums(0.67, 0.66), "0,2 / 0,3 ≈ 0,67.", "Tolerancia total entre seis sigmas."),
    calc("calc-defec", "Piezas defectuosas", "En un lote de 2 000 piezas el 1,5 % es defectuosa. ¿Cuántas piezas hay que desechar?", nums(30), "2 000 · 0,015 = 30 piezas.", "Aplica el porcentaje al lote."),
    sort("clasifica-cal", "Mejorar el proceso", "Decide qué mejora actúa sobre la media y cuál sobre la dispersión.",
      [["med", "Centrar la media", "cobalt"], ["dis", "Reducir la dispersión", "amber"]],
      [["Reajustar la máquina al valor nominal", "med"], ["Corregir el punto cero de un tope", "med"], ["Compensar el desgaste de una herramienta", "med"], ["Cambiar los rodamientos con holgura", "dis"], ["Mantener la temperatura estable", "dis"], ["Usar material de un único lote", "dis"]],
      "Centrar mueve la campana; reducir la dispersión la estrecha.",
    ),
    pick("check-cpk", "Capaz", "Un proceso tiene Cpk = 0,8. ¿Es capaz de cumplir la tolerancia?",
      "No: se necesita al menos 1,33 para que sea fiable",
      [["Sí, con cualquier valor mayor que 0", "Es insuficiente."], ["Sí, siempre que sea positivo", "No basta."], ["No se puede saber", "Con Cpk sí se puede."]],
      "Un Cpk bajo implica muchas piezas fuera de tolerancia.",
    ),
  ],
};
