import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const impresion3dParametros4esoLesson: InteractiveLesson = {
  slug: "impresion-3d-parametros-4eso",
  title: "4. Impresión 3D: parámetros, tiempo y material",
  subtitle: TECESO4_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Los parámetros que importan", [
      { kind: "steps", items: [
        "**Altura de capa** (0,1–0,3 mm): menos altura = mejor acabado, pero más capas y más tiempo.",
        "**Relleno** (infill): porcentaje de volumen que se rellena; 10–30 % suele bastar para piezas normales.",
        "**Perímetros y espesor de pared**: dan la resistencia exterior.",
        "**Velocidad** y **temperatura** del filamento (PLA ≈ 200 °C, PETG ≈ 235 °C) y de la cama.",
        "**Soportes** y **adhesión** (borde, balsa) para voladizos y para que la pieza no se despegue.",
        "**Orientación**: las capas son el punto débil; la fuerza debe aplicarse a lo largo de ellas.",
      ] },
    ], undefined, "stack"),
    slide("flujo", "Tiempo y material", [
      { kind: "text", text: "Cambia la altura de capa, la velocidad y el relleno. Mira el caudal, el material y el tiempo." },
    ], tool("eso4-impresion-flujo-explorador"), "visual-top"),
    slide("basic", "La impresión básica", [
      { kind: "text", text: "Repasa el cálculo básico de una impresión (tiempo, material y coste)." },
    ], tool("eso2-impresion3d-explorador"), "visual-top"),
    slide("fallos", "Fallos típicos", [
      { kind: "steps", items: [
        "**Despegue de la base**: limpiar la cama, ajustar la altura del primer nivel, usar borde.",
        "**Hilos y rebabas (stringing)**: bajar temperatura o activar retracción.",
        "**Pandeo (warping)**: cama caliente y sin corrientes de aire.",
        "**Subextrusión**: boquilla obstruida o temperatura baja.",
        "**Voladizos que se caen**: añadir soportes o reorientar la pieza.",
      ] },
    ]),
    calc("calc-q", "Caudal", "Línea de 0,4 mm de ancho, capa de 0,2 mm y 50 mm/s. ¿Cuántos mm³/s extruye la boquilla?", nums(4), "0,4 · 0,2 · 50 = 4 mm³/s.", "Ancho por alto por velocidad."),
    calc("calc-mat", "Material", "Una pieza de 30 000 mm³ con paredes del 35 % y relleno del 20 %: volumen de material = 30 000·(0,35 + 0,65·0,2). ¿Cuántos mm³?", nums(14400), "30 000 · 0,48 = 14 400 mm³.", "Fracción de paredes más fracción de relleno."),
    calc("calc-t", "Tiempo", "Con 14 400 mm³, 4 mm³/s y una eficiencia del 60 %, ¿cuántos minutos tarda? (14 400/(4·0,6)/60, redondea a un entero)", nums(100), "14 400 / 2,4 = 6 000 s = 100 min.", "Volumen entre caudal real, en minutos."),
    sort("clasifica-par", "¿Qué efecto tiene?", "Relaciona el cambio de parámetro con su efecto.",
      [["mas", "Más tiempo", "rose"], ["men", "Menos tiempo", "emerald"]],
      [["Reducir la altura de capa a 0,1 mm", "mas"], ["Aumentar el relleno al 80 %", "mas"], ["Bajar la velocidad", "mas"], ["Subir la altura de capa a 0,3 mm", "men"], ["Reducir el relleno al 10 %", "men"], ["Aumentar la velocidad", "men"]],
      "Más calidad y más resistencia cuestan más tiempo y material.",
    ),
    pick("check-orient", "Orientación", "Una pieza debe soportar un tirón en una dirección. ¿Cómo se orienta?",
      "Con las capas alineadas con la fuerza, no perpendiculares a ella",
      [["Da igual la orientación", "Las capas son el punto débil."], ["Con las capas perpendiculares a la fuerza", "Se separarían por las capas."], ["Boca abajo siempre", "No siempre es lo mejor."]],
      "La resistencia es menor entre capas que a lo largo de ellas.",
    ),
  ],
};
