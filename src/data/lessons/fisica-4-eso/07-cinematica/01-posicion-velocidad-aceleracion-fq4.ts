import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const posicionVelocidadAceleracionFq4Lesson: InteractiveLesson = {
  slug: "posicion-velocidad-aceleracion-fq4",
  title: "1. Posición, velocidad y aceleración",
  subtitle: FQ4_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Describir el movimiento", [
      { kind: "steps", items: [
        "La **cinemática** describe el movimiento sin preguntarse por sus causas. Siempre hace falta un **sistema de referencia**: un origen y unos ejes.",
        "El **vector de posición r** va del origen al móvil. La **trayectoria** es la línea que describe.",
        "El **desplazamiento** Δr = r₂ − r₁ es un vector; la **distancia recorrida** es un escalar que mide la longitud del camino: **s ≥ |Δr|**.",
        "El movimiento es **relativo**: depende del sistema de referencia desde el que se observa.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Desplazamiento y distancia", [
      { kind: "text", text: "Mueve el punto final y curva el camino. ¿Cuándo coinciden el módulo del desplazamiento y la distancia recorrida?" },
    ], tool("fq4-vectores-movimiento-explorador"), "visual-top"),
    slide("vel", "Velocidad y aceleración", [
      { kind: "steps", items: [
        "**Velocidad media**: vₘ = Δr/Δt (vector). **Rapidez media** = distancia/Δt (escalar).",
        "**Velocidad instantánea**: la de cada instante; es **tangente** a la trayectoria.",
        "**Aceleración media**: aₘ = Δv/Δt, en m/s². Hay aceleración siempre que cambie la velocidad: su **módulo**, su **dirección** o ambos.",
        "Un coche que toma una curva con rapidez constante **sí acelera**, porque su dirección cambia.",
      ] },
    ], undefined, "stack"),
    slide("comp", "Componentes de la aceleración", [
      { kind: "text", text: "La aceleración se descompone en dos partes: la **tangencial** (cambia el **módulo** de la velocidad; acelerar o frenar) y la **normal o centrípeta** (cambia la **dirección**; tomar una curva). En un movimiento rectilíneo solo hay aceleración tangencial; en un circular uniforme solo normal." },
    ]),
    calc("calc-vm", "Rapidez media", "Un ciclista recorre 1200 m en 4 minutos. ¿Cuál es su rapidez media en m/s?", nums(5), "1200 m / 240 s = 5 m/s.", "Pasa 4 min a segundos."),
    calc("calc-a", "Aceleración media", "Un coche pasa de 10 m/s a 30 m/s en 5 s. ¿Cuál es su aceleración media en m/s²?", nums(4), "a = (30 − 10)/5 = 4 m/s².", "a = Δv/Δt."),
    sort("clasifica", "¿Cambia la velocidad?", "¿Hay aceleración en estos movimientos?",
      [["si", "Hay aceleración", "rose"], ["no", "No hay aceleración", "cobalt"]],
      [["Un coche frena", "si"], ["Un tren en recta a 100 km/h constantes", "no"], ["Un coche toma una curva a rapidez constante", "si"], ["Una piedra que cae", "si"], ["Un ascensor que sube con velocidad constante", "no"]],
      "Hay aceleración si cambia el módulo o la dirección de la velocidad.",
    ),
    pick("check", "Desplazamiento", "Un corredor da una vuelta completa a una pista y vuelve al punto de partida. ¿Cuánto vale su desplazamiento?",
      "Cero",
      [["La longitud de la pista", "Esa es la distancia recorrida."], ["La mitad de la pista", "No tiene sentido."], ["Depende de la velocidad", "No depende de ella."]],
      "Posición final igual a la inicial: Δr = 0.",
    ),
  ],
};
