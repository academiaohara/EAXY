import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const movimientoCircularFb1Lesson: InteractiveLesson = {
  slug: "movimiento-circular-fb1",
  title: "4. Movimiento circular",
  subtitle: FB1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("mag", "Magnitudes angulares", [
      { kind: "steps", items: [
        "**Posición angular φ** (rad): arco recorrido entre el radio. **1 vuelta = 2π rad = 360°**.",
        "**Velocidad angular ω = dφ/dt** (rad/s). **Aceleración angular α = dω/dt** (rad/s²). **Periodo T** (s por vuelta) y **frecuencia f = 1/T** (Hz). **1 rpm = 2π/60 rad/s**.",
        "**Relación con las magnitudes lineales**: **s = φ·R**; **v = ω·R**; **aₜ = α·R**; **aₙ = v²/R = ω²·R**.",
        "Puntos de un disco: misma **ω**, pero **v** mayor cuanto más lejos del eje.",
      ] },
    ], undefined, "stack"),
    slide("mcu", "MCU y MCUA", [
      { kind: "steps", items: [
        "**MCU** (ω constante, α = 0): **φ = φ₀ + ω·t**; **ω = 2π/T = 2π·f**. La aceleración es solo **normal** (centrípeta): aₙ = ω²·R.",
        "**MCUA** (α constante): **ω = ω₀ + α·t**; **φ = φ₀ + ω₀·t + ½·α·t²**; **ω² = ω₀² + 2·α·Δφ**. Aparece **aceleración tangencial** aₜ = α·R.",
        "Aceleración total: **a = √(aₜ² + aₙ²)**; forma un ángulo con la velocidad dado por tg β = aₙ/aₜ.",
        "Un **disco que arranca** o una **rueda que frena** son MCUA; el nº de vueltas = φ/2π.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Un móvil en una circunferencia", [
      { kind: "text", text: "Cambia el radio, la velocidad angular inicial y la aceleración angular. Mira qué ocurre con aₜ, aₙ y con las vueltas dadas." },
    ], tool("fb1-circular-explorador"), "visual-top"),
    slide("aplic", "Aplicaciones", [
      { kind: "steps", items: [
        "**Satélites y planetas**: MCU con aₙ = g del lugar (la gravedad hace de fuerza centrípeta).",
        "**Poleas, engranajes y ruedas**: dos puntos unidos por una correa tienen la **misma v lineal**; en un mismo eje, la misma ω. Relación de transmisión: ω₁·R₁ = ω₂·R₂.",
        "**Curvas con peralte**, centrifugadoras, atracciones de feria, discos y CD (a velocidad angular constante o lineal constante según el sistema).",
      ] },
    ], undefined, "stack"),
    calc("calc-w", "Velocidad angular", "Una rueda gira a 120 rpm. ¿Cuál es su velocidad angular, en rad/s? (usa π = 3,14; redondea a 1 decimal)", nums(12.6, 12.56, 12.57), "ω = 120·2π/60 = 4π ≈ 12,6 rad/s.", "ω = 2π·f."),
    calc("calc-v", "Rapidez lineal", "Un punto a 0,5 m del eje gira con ω = 8 rad/s. ¿Cuál es su rapidez, en m/s?", nums(4), "v = ω·R = 8·0,5 = 4 m/s.", "v = ω·R."),
    calc("calc-an", "Aceleración centrípeta", "Con ω = 4 rad/s y R = 2 m, ¿cuánto vale aₙ, en m/s²?", nums(32), "aₙ = ω²R = 16·2 = 32 m/s².", "aₙ = ω²·R."),
    calc("calc-mcua", "Velocidad angular final", "Un disco parte del reposo con α = 2 rad/s². ¿Qué ω tiene a los 5 s, en rad/s?", nums(10), "ω = 2·5 = 10 rad/s.", "ω = ω₀ + α·t."),
    calc("calc-vueltas", "Vueltas", "El disco anterior, ¿cuántos radianes recorre en esos 5 s? (φ = ½αt²)", nums(25), "φ = ½·2·25 = 25 rad.", "φ = ½·α·t²."),
    sort("clasifica", "MCU o MCUA", "Clasifica cada situación.",
      [["mcu", "MCU (ω constante)", "cobalt"], ["mcua", "MCUA (α ≠ 0)", "rose"]],
      [["La aguja de un reloj", "mcu"], ["Una lavadora que acelera al empezar a centrifugar", "mcua"], ["Un satélite en órbita circular", "mcu"], ["Un disco que frena hasta detenerse", "mcua"], ["La Tierra girando sobre su eje", "mcu"], ["Una noria que arranca", "mcua"]],
      "Si ω cambia, hay aceleración angular.",
    ),
    pick("check", "Misma ω", "Dos puntos de un disco rígido están a distancias R y 2R del eje. ¿Qué relación hay entre sus velocidades lineales?",
      "El más lejano tiene el doble de rapidez lineal; la ω es la misma",
      [["Tienen la misma rapidez lineal", "v = ωR crece con R."], ["El más lejano tiene menor ω", "Todos los puntos del sólido rígido tienen la misma ω."], ["El más cercano va más rápido", "Va más lento."]],
      "v = ω·R con la misma ω.",
    ),
  ],
};
