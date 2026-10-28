import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const bielaManivelaCremallera4esoLesson: InteractiveLesson = {
  slug: "biela-manivela-cremallera-4eso",
  title: "3. Transformar el movimiento: biela-manivela, cremallera y levas",
  subtitle: TECESO4_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "De giro a vaivén", [
      { kind: "steps", items: [
        "**Piñón y cremallera**: el giro del piñón mueve la cremallera en línea recta (dirección de un coche, puertas). Avance = perímetro primitivo × vueltas.",
        "**Biela-manivela**: transforma giro en vaivén y al revés (motor de combustión, compresor). **Carrera = 2 × radio** de la manivela.",
        "**Leva y seguidor**: el perfil de la leva fija el movimiento del seguidor (válvulas de motor).",
        "**Tornillo-tuerca**: el giro produce un avance muy pequeño y una fuerza muy grande (gato, prensa).",
      ] },
    ], undefined, "stack"),
    slide("biela", "Posición del émbolo", [
      { kind: "text", text: "Gira la manivela y observa la posición del émbolo y el valor de la carrera." },
    ], tool("eso4-biela-explorador"), "visual-top"),
    slide("leva", "Una leva", [
      { kind: "text", text: "Observa cómo el perfil de la leva decide el movimiento del seguidor." },
    ], tool("eso3-leva-explorador"), "visual-top"),
    slide("tt", "Tornillo-tuerca", [
      { kind: "steps", items: [
        "Cada vuelta del tornillo hace avanzar la tuerca un **paso** (la distancia entre filetes).",
        "Avance = paso × número de vueltas. Con un paso de 2 mm, 10 vueltas dan 20 mm.",
        "Es **irreversible** si el paso es pequeño: la tuerca no mueve el tornillo (por eso sostiene la carga).",
      ] },
    ]),
    calc("calc-carrera", "Carrera", "La manivela de un compresor tiene un radio de 30 mm. ¿Cuál es la carrera del émbolo, en mm?", nums(60), "2 · 30 = 60 mm.", "El doble del radio."),
    calc("calc-cremallera", "Avance", "Un piñón de 20 mm de diámetro primitivo da 3 vueltas sobre una cremallera. ¿Cuántos mm avanza? (π·20·3, redondea a un entero)", nums(188, 188.5), "π · 20 · 3 ≈ 188,5 mm.", "Perímetro por vueltas."),
    calc("calc-tt", "Tornillo", "Un tornillo de paso 2 mm da 15 vueltas. ¿Cuántos mm avanza la tuerca?", nums(30), "2 · 15 = 30 mm.", "Paso por vueltas."),
    sort("clasifica-mec", "¿Qué mecanismo?", "Relaciona cada aplicación con el mecanismo.",
      [["bm", "Biela-manivela", "cobalt"], ["cr", "Piñón-cremallera", "amber"], ["tt", "Tornillo-tuerca", "emerald"], ["lev", "Leva", "rose"]],
      [["Motor de un coche", "bm"], ["Compresor de aire", "bm"], ["Dirección de un coche", "cr"], ["Puerta corredera", "cr"], ["Gato de coche", "tt"], ["Prensa de banco", "tt"], ["Apertura de válvulas", "lev"], ["Juguete con movimiento programado", "lev"]],
      "Cada mecanismo resuelve un tipo de transformación.",
    ),
    pick("check-pm", "Punto muerto", "En un motor, ¿qué ocurre con el émbolo en los extremos de su recorrido (puntos muertos)?",
      "Su velocidad es cero un instante, porque cambia de sentido",
      [["Alcanza su máxima velocidad", "Es el instante en que se detiene."], ["No cambia de sentido", "Sí lo cambia."], ["Se desprende de la biela", "No es así."]],
      "La velocidad máxima ocurre hacia la mitad de la carrera.",
    ),
  ],
};
