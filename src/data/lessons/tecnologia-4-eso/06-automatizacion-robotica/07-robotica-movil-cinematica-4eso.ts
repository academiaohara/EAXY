import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const roboticaMovilCinematica4esoLesson: InteractiveLesson = {
  slug: "robotica-movil-cinematica-4eso",
  title: "7. Robótica móvil: cinemática y navegación",
  subtitle: TECESO4_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Cómo se mueve un robot", [
      { kind: "steps", items: [
        "Un robot **diferencial** tiene dos ruedas motrices independientes y una rueda loca de apoyo.",
        "Si las dos ruedas van a la misma velocidad, avanza **recto**; si van a distinta velocidad, describe un **arco**; con velocidades opuestas **gira sobre sí mismo**.",
        "**Odometría**: estimar la posición contando las vueltas de las ruedas; acumula error (deslizamientos).",
        "Los **sensores** (ultrasonidos, infrarrojos, cámara, brújula) corrigen y permiten **navegar**.",
      ] },
    ], undefined, "stack"),
    slide("cin", "Trayectoria de un robot diferencial", [
      { kind: "text", text: "Cambia la velocidad de cada rueda y mira la trayectoria y la posición final." },
    ], tool("eso4-robot-explorador"), "visual-top"),
    slide("pruebas", "Probar el robot", [
      { kind: "text", text: "Antes de ponerlo en funcionamiento se prueba por partes y se anotan los resultados." },
    ], tool("eso3-robot-pruebas-explorador"), "visual-top"),
    slide("nav", "Estrategias de navegación", [
      { kind: "steps", items: [
        "**Seguir una línea** con sensores infrarrojos.",
        "**Evitar obstáculos**: medir la distancia y girar si es menor que un umbral.",
        "**Seguir una pared** manteniendo una distancia constante (un lazo cerrado).",
        "**Mapas y rutas** (robots de almacén): el robot conoce el entorno y planifica el camino.",
        "Un **robot simulado** permite probar el algoritmo antes de construirlo.",
      ] },
    ]),
    calc("calc-v", "Velocidad del centro", "La rueda izquierda va a 0,2 m/s y la derecha a 0,4 m/s. ¿Qué velocidad tiene el centro del robot, en m/s?", nums(0.3), "(0,2 + 0,4) / 2 = 0,3 m/s.", "Media de las dos ruedas."),
    calc("calc-w", "Velocidad angular", "Con una distancia entre ruedas de 0,2 m, ¿cuántos rad/s gira? ((0,4 − 0,2) / 0,2)", nums(1), "0,2 / 0,2 = 1 rad/s.", "Diferencia de velocidades entre la separación."),
    calc("calc-r", "Radio de giro", "Con v = 0,3 m/s y ω = 1 rad/s, ¿cuál es el radio del arco, en m? (v/ω)", nums(0.3), "0,3 / 1 = 0,3 m.", "Velocidad entre velocidad angular."),
    sort("clasifica-mov", "¿Qué movimiento?", "Relaciona la velocidad de las ruedas con el movimiento.",
      [["rec", "Recto", "cobalt"], ["arc", "Arco", "amber"], ["gir", "Gira sobre sí mismo", "emerald"]],
      [["Las dos ruedas a +0,3 m/s", "rec"], ["Las dos ruedas a −0,2 m/s", "rec"], ["Izquierda 0,2 y derecha 0,4", "arc"], ["Izquierda 0,1 y derecha 0,5", "arc"], ["Izquierda −0,2 y derecha +0,2", "gir"], ["Izquierda +0,3 y derecha −0,3", "gir"]],
      "Depende de la diferencia entre las dos velocidades.",
    ),
    pick("check-odo", "Odometría", "¿Por qué la odometría acumula error con el tiempo?",
      "Porque las ruedas patinan y cada pequeño error se suma al anterior",
      [["Porque las ruedas son pequeñas", "El tamaño no es la causa."], ["Porque el motor se calienta", "No es la causa principal."], ["No acumula error", "Sí lo hace."]],
      "Por eso se corrige con sensores externos.",
    ),
  ],
};
