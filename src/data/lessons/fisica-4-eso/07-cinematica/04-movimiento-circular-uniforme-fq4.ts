import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool, anim } from "@/data/lessons/tec1-helpers";

export const movimientoCircularUniformeFq4Lesson: InteractiveLesson = {
  slug: "movimiento-circular-uniforme-fq4",
  title: "4. Movimiento circular uniforme",
  subtitle: FQ4_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("anim", "Velocidad y aceleración en una curva", [
      { kind: "steps", items: [
        "En el **MCU** la trayectoria es una circunferencia y la **rapidez** es constante.",
        "La velocidad es **tangente**; su dirección cambia continuamente, y por eso hay aceleración.",
        "La aceleración apunta al **centro**: es la **aceleración centrípeta**.",
      ] },
    ], anim("fq4-mcu"), "visual-top"),
    slide("mag", "Magnitudes angulares", [
      { kind: "steps", items: [
        "**Periodo T**: tiempo de una vuelta (s). **Frecuencia f = 1/T**: vueltas por segundo (Hz).",
        "**Velocidad angular ω = Δφ/Δt = 2π/T = 2π·f** (rad/s). 1 vuelta = 2π rad = 360°.",
        "**Velocidad lineal v = ω·R**: depende del radio; dos puntos de un disco giran con la misma ω pero el exterior va más rápido.",
        "**Posición angular**: φ = φ₀ + ω·t.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Gira un móvil", [
      { kind: "text", text: "Cambia el radio y el periodo. ¿Qué le ocurre a la aceleración centrípeta si el periodo se reduce a la mitad?" },
    ], tool("fq4-mcu-explorador"), "visual-top"),
    slide("cent", "Aceleración centrípeta", [
      { kind: "steps", items: [
        "**a_c = v²/R = ω²·R**, dirigida hacia el centro.",
        "Si la velocidad se **duplica**, la aceleración se multiplica por **4**; si el radio aumenta, disminuye.",
        "Aplicaciones: **curvas** de carreteras, **peraltes**, centrifugadoras, satélites, norias.",
        "Para que haya MCU hace falta una **fuerza centrípeta** F = m·a_c (se estudia en dinámica).",
      ] },
    ], undefined, "stack"),
    calc("calc-w", "Velocidad angular", "Una rueda da una vuelta cada 2 s. ¿Cuál es su velocidad angular, en rad/s, redondeando a una cifra decimal? (π ≈ 3,14)", nums(3.1, 3.14), "ω = 2π/T = 2·3,14/2 ≈ 3,14 rad/s.", "ω = 2π/T."),
    calc("calc-v", "Velocidad lineal", "Un punto a 0,5 m del eje gira con ω = 4 rad/s. ¿Cuál es su rapidez, en m/s?", nums(2), "v = ω·R = 4·0,5 = 2 m/s.", "v = ω·R."),
    calc("calc-ac", "Aceleración centrípeta", "Un coche toma una curva de radio 50 m a 10 m/s. ¿Cuánta aceleración centrípeta tiene, en m/s²?", nums(2), "a = v²/R = 100/50 = 2 m/s².", "a = v²/R."),
    sort("clasifica", "¿Es constante en el MCU?", "Indica si cada magnitud permanece constante.",
      [["cte", "Constante", "cobalt"], ["var", "Cambia", "rose"]],
      [["El periodo", "cte"], ["La rapidez", "cte"], ["El vector velocidad", "var"], ["El módulo de la aceleración centrípeta", "cte"], ["El vector aceleración", "var"], ["La velocidad angular", "cte"]],
      "Los módulos son constantes; los vectores cambian de dirección.",
    ),
    pick("check", "Dirección", "¿Hacia dónde apunta la aceleración en un MCU?",
      "Hacia el centro de la circunferencia",
      [["Tangente a la trayectoria", "Esa es la velocidad."], ["Hacia fuera", "Eso sería la fuerza centrífuga aparente."], ["Es nula", "La velocidad cambia de dirección: hay aceleración."]],
      "Es la aceleración centrípeta.",
    ),
  ],
};
