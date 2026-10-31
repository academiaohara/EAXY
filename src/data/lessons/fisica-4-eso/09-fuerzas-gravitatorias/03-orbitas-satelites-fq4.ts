import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const orbitasSatelitesFq4Lesson: InteractiveLesson = {
  slug: "orbitas-satelites-fq4",
  title: "3. Órbitas y satélites",
  subtitle: FQ4_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("canon", "Por qué un satélite no cae", [
      { kind: "steps", items: [
        "Un **satélite** es un cuerpo que órbita otro, natural (la Luna) o artificial (la ISS).",
        "Newton lo explicó con su **cañón**: si la velocidad horizontal es suficiente, el proyectil cae… pero la Tierra se curva y **nunca llega al suelo**.",
        "Una órbita es una **caída libre continua**: la gravedad actúa de **fuerza centrípeta**.",
      ] },
    ], anim("fq4-canon-newton"), "visual-top"),
    slide("v", "Velocidad y periodo", [
      { kind: "steps", items: [
        "En una **órbita circular** de radio r: **G·M·m/r² = m·v²/r**, de donde **v = √(G·M/r)**.",
        "No depende de la masa del satélite. **Cuanto más alta**, **menos velocidad** y **más periodo**.",
        "El **periodo** es T = 2π·r/v (tiempo de una vuelta). Cerca de la Tierra, ≈ 7,7 km/s y ≈ 1,5 h.",
        "**r es la distancia al centro**: r = R_Tierra + altura.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Sube o baja un satélite", [
      { kind: "text", text: "Cambia la altura. ¿A qué altura el periodo es de 24 horas?" },
    ], tool("fq4-orbitas-explorador"), "visual-top"),
    slide("usos", "Satélites artificiales", [
      { kind: "steps", items: [
        "**Órbita baja** (200–2000 km): observación de la Tierra, ISS, telescopio espacial.",
        "**Órbita media** (≈ 20 000 km): **GPS** y otros sistemas de navegación.",
        "**Geoestacionaria** (≈ 35 800 km sobre el ecuador): T = 24 h; parecen **fijos** en el cielo. Telecomunicaciones y meteorología.",
        "Los **residuos espaciales** (basura orbital) son un riesgo creciente para los satélites.",
      ] },
    ], undefined, "stack"),
    calc("calc-escape", "Altura geoestacionaria", "¿Con qué periodo, en horas, orbita un satélite geoestacionario?", nums(24), "Debe seguir la rotación de la Tierra: T ≈ 24 h.", "Parece fijo en el cielo."),
    calc("calc-v", "Velocidad orbital", "Un satélite orbita a 7,7 km/s a 6800 km del centro de la Tierra. ¿Cuántos km recorre en una vuelta, aproximadamente? (2π·r, redondea a las centenas)", nums(42700, 42725, 42726), "L = 2π·6800 ≈ 42 725 km.", "Longitud de la circunferencia."),
    calc("calc-masa", "Masa del satélite", "Si el satélite tuviera el doble de masa a la misma altura, su velocidad orbital se multiplicaría por… (factor)", nums(1), "v = √(G·M/r) no depende de la masa del satélite.", "No aparece m."),
    sort("clasifica", "Órbita alta o baja", "Compara una órbita alta con una baja.",
      [["alta", "Es mayor en la órbita alta", "cobalt"], ["baja", "Es mayor en la órbita baja", "rose"]],
      [["El periodo", "alta"], ["La velocidad orbital", "baja"], ["El radio de la órbita", "alta"], ["La fuerza gravitatoria sobre el satélite", "baja"], ["La longitud de la trayectoria", "alta"], ["La aceleración centrípeta", "baja"]],
      "Más alto: más lento, más periodo, menos gravedad.",
    ),
    pick("check", "Geoestacionario", "¿Qué tiene de especial un satélite geoestacionario?",
      "Está siempre sobre el mismo punto del ecuador",
      [["No tiene velocidad", "Se mueve a ≈ 3 km/s."], ["Está sobre el polo norte", "Debe estar sobre el ecuador."], ["No siente la gravedad", "Siente la gravedad: es su fuerza centrípeta."]],
      "T = 24 h, igual que la rotación terrestre.",
    ),
  ],
};
