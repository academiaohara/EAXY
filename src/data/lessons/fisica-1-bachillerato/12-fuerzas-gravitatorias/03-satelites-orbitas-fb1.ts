import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const satelitesOrbitasFb1Lesson: InteractiveLesson = {
  slug: "satelites-orbitas-fb1",
  title: "3. Satélites y órbitas",
  subtitle: FB1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("orb", "Órbita circular", [
      { kind: "steps", items: [
        "En una órbita circular la gravedad es la **fuerza centrípeta**: **G·M·m/r² = m·v²/r** → **v = √(G·M/r)**. No depende de la masa del satélite.",
        "**Periodo**: T = 2π·r/v → **T² = 4π²·r³/(G·M)**, que es la **3.ª ley de Kepler** con k = 4π²/GM.",
        "Cuanto **más alta** la órbita, **menor** la velocidad y **mayor** el periodo. La **Estación Espacial** (≈ 400 km) da una vuelta cada ≈ 92 min.",
        "En órbita hay **ingravidez aparente**: el satélite y sus ocupantes están en **caída libre** continua alrededor del astro.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Pon un satélite en órbita", [
      { kind: "text", text: "Cambia la altura de la órbita. ¿Cuál es el periodo de un satélite rasante? ¿A qué altura es geoestacionario?" },
    ], tool("fb1-satelite-explorador"), "visual-top"),
    slide("tipos", "Tipos de satélites", [
      { kind: "steps", items: [
        "**LEO** (baja, 200–2000 km): observación de la Tierra, ISS. **MEO** (≈ 20 000 km): **GPS/Galileo**. **GEO** (**35 786 km**, T = 24 h): comunicaciones y meteorología, quedan **fijos sobre el ecuador**.",
        "**Satélite geoestacionario**: órbita circular ecuatorial, mismo sentido y periodo que la rotación terrestre (r ≈ 42 164 km).",
        "**Órbitas polares**: pasan sobre los polos y observan toda la Tierra.",
        "**Velocidad de escape**: v_e = √(2·G·M/R) (≈ 11,2 km/s en la Tierra): la mínima para alejarse hasta el infinito.",
      ] },
    ], undefined, "stack"),
    calc("calc-v", "Velocidad orbital", "Un satélite orbita a r = 7·10⁶ m del centro de la Tierra (GM = 4·10¹⁴ m³/s²). ¿Cuál es su velocidad, en km/s?", nums(7.56, 7.6, 7.55), "v = √(4·10¹⁴/7·10⁶) ≈ 7560 m/s.", "v = √(GM/r)."),
    calc("calc-T", "Periodo", "Con ese radio y esa velocidad (v ≈ 7560 m/s), ¿cuál es el periodo, en minutos? (T = 2πr/v)", nums(97, 97.1, 96.9), "T = 2π·7·10⁶/7560 ≈ 5818 s ≈ 97 min.", "T = 2πr/v."),
    calc("calc-kepler", "Tercera ley", "Un satélite A orbita a r y otro B a 4r de un mismo astro. Si A tarda 3 h, ¿cuánto tarda B, en h?", nums(24), "T_B = 3·4^1,5 = 24 h.", "T² ∝ r³."),
    calc("calc-vesc", "Velocidad de escape", "Si la velocidad orbital rasante de un planeta es 5 km/s, ¿cuál es su velocidad de escape, en km/s? (√2 ≈ 1,41)", nums(7.07, 7.1, 7.05), "v_e = √2·v_orb ≈ 7,07 km/s.", "v_e = √2·v_orbital rasante."),
    sort("clasifica", "A mayor altitud…", "Al subir un satélite a una órbita circular más alta, ¿qué ocurre con…?",
      [["au", "Aumenta", "emerald"], ["di", "Disminuye", "rose"]],
      [["El periodo", "au"], ["La velocidad orbital", "di"], ["La energía mecánica (menos negativa)", "au"], ["La energía cinética", "di"], ["La energía potencial (menos negativa)", "au"], ["La intensidad del campo en su posición", "di"]],
      "Más lejos: más lento y con más energía mecánica.",
    ),
    pick("check", "Geoestacionario", "¿Qué caracteriza a un satélite geoestacionario?",
      "Su periodo es de 24 h y está sobre el ecuador, por lo que parece fijo en el cielo",
      [["Su velocidad es nula", "Se mueve a ≈ 3 km/s."], ["Está a 400 km de altura", "Eso es la ISS."], ["No está sometido a la gravedad", "Es la gravedad la que lo mantiene."]],
      "T = 24 h → r ≈ 42 164 km.",
    ),
  ],
};
