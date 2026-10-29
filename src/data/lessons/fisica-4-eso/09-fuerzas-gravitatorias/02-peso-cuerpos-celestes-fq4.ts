import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const pesoCuerposCelestesFq4Lesson: InteractiveLesson = {
  slug: "peso-cuerpos-celestes-fq4",
  title: "2. Peso en cuerpos celestes",
  subtitle: FQ4_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("g", "La gravedad de un astro", [
      { kind: "steps", items: [
        "El **peso** de un cuerpo es la fuerza gravitatoria del astro sobre él: **P = m·g**.",
        "Al igualar con la ley de gravitación, **g = G·M/R²** en la superficie (M: masa del astro; R: su radio).",
        "A una altura h sobre la superficie: **g = G·M/(R + h)²**. Disminuye al alejarse, pero muy poco a las alturas habituales: a 400 km (ISS) sigue siendo ≈ 8,7 m/s².",
        "**g no depende de la masa del cuerpo**: todos caen con la misma aceleración.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Tu peso en otros mundos", [
      { kind: "text", text: "Elige un astro y tu masa. ¿Dónde pesarías más? ¿Y menos? ¿Y tu masa, cambia?" },
    ], tool("fq4-gravedad-planetas-explorador"), "visual-top"),
    slide("masapeso", "Masa y peso", [
      { kind: "steps", items: [
        "La **masa** mide la **cantidad de materia** y la inercia: se mide en **kg** y **no cambia** de un lugar a otro.",
        "El **peso** es una **fuerza**: se mide en **N** (o con un dinamómetro) y **depende del lugar**.",
        "En la **Luna** (g ≈ 1,6 m/s²) pesas unas **6 veces menos**; en **Júpiter** (g ≈ 25 m/s²) unas **2,5 veces más**.",
        "En una **órbita** (ISS) la gravedad sigue siendo casi la misma, pero hay **ingravidez aparente**: al estar en caída libre, nada empuja a los astronautas.",
      ] },
    ], undefined, "stack"),
    slide("escape", "Velocidad de escape", [
      { kind: "text", text: "La **velocidad de escape** es la mínima necesaria para alejarse de un astro sin volver: **v = √(2·G·M/R)**. En la Tierra, ≈ **11,2 km/s**; en la Luna, ≈ **2,4 km/s**; en Júpiter, ≈ **60 km/s**. Por eso la Luna no retiene atmósfera y Júpiter sí." },
    ]),
    calc("calc-peso", "Peso", "Un astronauta de 80 kg está en la Luna, donde g = 1,6 m/s². ¿Cuánto pesa, en N?", nums(128), "P = m·g = 80·1,6 = 128 N.", "P = m·g."),
    calc("calc-g", "Gravedad en un planeta", "Un planeta tiene g = 4 m/s². Un objeto de 5 kg, ¿cuánto pesa allí, en N?", nums(20), "P = 5·4 = 20 N.", "P = m·g."),
    calc("calc-dobler", "Radio doble", "Si un planeta tiene el doble de radio con la misma masa, su gravedad se divide por… (factor)", nums(4), "g ∝ 1/R²: 2² = 4.", "g = G·M/R²."),
    sort("clasifica", "¿Cambia o no?", "Al viajar de la Tierra a la Luna, indica qué ocurre.",
      [["cam", "Cambia", "rose"], ["nocam", "No cambia", "cobalt"]],
      [["Tu peso", "cam"], ["Tu masa", "nocam"], ["La gravedad g", "cam"], ["El número de átomos de tu cuerpo", "nocam"], ["La fuerza que ejerce la Tierra sobre ti", "cam"], ["La densidad de tu cuerpo", "nocam"]],
      "La masa es una propiedad del cuerpo; el peso, del lugar.",
    ),
    pick("check", "Ingravidez", "¿Por qué flotan los astronautas dentro de la ISS?",
      "Porque están en caída libre continua junto con la nave",
      [["Porque allí no hay gravedad", "La gravedad allí es casi igual que en la superficie."], ["Porque su masa es cero", "Su masa no cambia."], ["Porque están fuera de la atracción de la Tierra", "Siguen ligados a ella."]],
      "Caen a la vez que la nave: no hay fuerza de apoyo.",
    ),
  ],
};
