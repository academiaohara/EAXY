import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const espectrosModeloBohrFb1Lesson: InteractiveLesson = {
  slug: "espectros-modelo-bohr-fb1",
  title: "2. Espectros atómicos y modelo de Bohr",
  subtitle: FB1_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("esp", "Los espectros atómicos", [
      { kind: "steps", items: [
        "Al descomponer la luz de una lámpara de incandescencia se obtiene un espectro **continuo**. Si lo emite un gas atómico excitado, el **espectro de emisión** es **discontinuo**: solo unas **rayas** de ciertas longitudes de onda.",
        "Cada elemento tiene su espectro, una especie de **huella dactilar**: permite identificar elementos en laboratorios y en **estrellas**.",
        "En el **espectro de absorción**, las rayas oscuras aparecen en las mismas longitudes de onda que las de emisión.",
        "Los espectros indican que la energía del electrón en el átomo está **cuantizada**.",
      ] },
    ], undefined, "stack"),
    slide("bohr", "Postulados de Bohr (1913)", [
      { kind: "steps", items: [
        "El electrón gira en **órbitas circulares estacionarias** sin emitir energía; solo son posibles las de **momento angular cuantizado**: m·v·r = n·h/2π.",
        "Cada órbita tiene una energía fija. Para el hidrógeno: **E_n = −13,6 eV / n²** (n = 1, 2, 3…). El estado de menor energía es el **fundamental** (n = 1).",
        "Emite o absorbe energía **solo al saltar** de un nivel a otro: **ΔE = |E_f − E_i| = h·f = h·c/λ**.",
        "La **energía de ionización** del H es la necesaria para llevar el electrón desde n = 1 hasta n = ∞: **13,6 eV**.",
      ] },
    ], anim("fq3-bohr-salto"), "visual-top"),
    slide("explora", "Transiciones del hidrógeno", [
      { kind: "text", text: "Elige los niveles inicial y final. ¿Qué series están en el visible? ¿Y en el ultravioleta?" },
    ], tool("fb1-bohr-espectro-explorador"), "visual-top"),
    slide("ryd", "La fórmula de Rydberg y las series", [
      { kind: "steps", items: [
        "**1/λ = R_H·(1/n_f² − 1/n_i²)**, con **R_H = 1,097·10⁷ m⁻¹**. Reproduce con exactitud las rayas del hidrógeno.",
        "**Lyman**: n_f = 1 → **ultravioleta**. **Balmer**: n_f = 2 → **visible** (656 nm roja, 486 nm azul-verdosa…). **Paschen**: n_f = 3 → **infrarrojo**.",
        "**Limitaciones** del modelo de Bohr: solo vale para el H y iones con un electrón (He⁺, Li²⁺), no explica la estructura fina ni los átomos polielectrónicos. Lo sustituyó el modelo mecanocuántico.",
      ] },
    ], undefined, "stack"),
    calc("calc-en", "Energía de un nivel", "¿Cuánto vale la energía del nivel n = 2 del hidrógeno, en eV? (E = −13,6/n²)", nums(-3.4), "E₂ = −13,6/4 = −3,4 eV.", "E_n = −13,6/n²."),
    calc("calc-de", "Salto de energía", "Un electrón del H cae de n = 3 a n = 2. ¿Cuál es la energía del fotón emitido, en eV? (redondea a 2 decimales)", nums(1.89), "ΔE = 3,4 − 1,51 = 1,89 eV.", "ΔE = E₃ − E₂ en valor absoluto."),
    calc("calc-lam", "Longitud de onda", "Un fotón de 2,48 eV, ¿qué longitud de onda tiene, en nm? (λ = 1240/E, E en eV)", nums(500, 500.0), "λ = 1240/2,48 = 500 nm (luz verde).", "λ = h·c/E ≈ 1240 eV·nm / E."),
    sort("clasifica", "Serie del hidrógeno", "Clasifica cada transición según su serie.",
      [["lym", "Lyman (UV)", "cobalt"], ["bal", "Balmer (visible)", "emerald"], ["pas", "Paschen (IR)", "rose"]],
      [["n = 2 → n = 1", "lym"], ["n = 4 → n = 1", "lym"], ["n = 3 → n = 2", "bal"], ["n = 5 → n = 2", "bal"], ["n = 4 → n = 3", "pas"], ["n = 6 → n = 3", "pas"]],
      "La serie la marca el nivel final: 1, 2 o 3.",
    ),
    pick("check", "Emisión o absorción", "¿Qué ocurre cuando un electrón pasa de n = 4 a n = 2?",
      "Emite un fotón",
      [["Absorbe un fotón", "Eso ocurre al subir de nivel."], ["No intercambia energía", "Hay un salto de energía."], ["Se escapa del átomo", "Seguiría ligado."]],
      "Baja de nivel: emite la energía sobrante como fotón.",
    ),
  ],
};
