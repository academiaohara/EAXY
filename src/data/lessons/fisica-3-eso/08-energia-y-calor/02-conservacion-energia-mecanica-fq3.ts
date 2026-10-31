import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const conservacionEnergiaMecanicaFq3Lesson: InteractiveLesson = {
  slug: "conservacion-energia-mecanica-fq3",
  title: "2. Energía mecánica y su conservación",
  subtitle: FQ3_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "Energía mecánica", [
      { kind: "steps", items: [
        "La **energía cinética** es la de un cuerpo en movimiento: **Ec = ½ · m · v²**.",
        "La **energía potencial gravitatoria** es la de un cuerpo a cierta altura: **Ep = m · g · h**.",
        "La **energía mecánica** es la suma de ambas: **Em = Ec + Ep**.",
        "Si solo actúan fuerzas **conservativas** (como el peso) y no hay rozamiento, **Em se conserva**: **Ec₁ + Ep₁ = Ec₂ + Ep₂**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Una montaña rusa", [
      { kind: "text", text: "Mueve el vagón por la pista. Después añade rozamiento y observa el calor que se disipa." },
    ], tool("fq3-montana-rusa-explorador"), "visual-top"),
    slide("roz", "Con rozamiento", [
      { kind: "steps", items: [
        "La fuerza de **rozamiento** realiza un **trabajo negativo**: transforma energía mecánica en **calor** (energía térmica), que se disipa.",
        "La energía **mecánica disminuye**, pero la **energía total** (mecánica + calor) se conserva.",
        "Por eso un péndulo o una montaña rusa **no alcanzan** la altura inicial en la siguiente subida.",
      ] },
    ]),
    calc("calc-v", "Velocidad abajo", "Un vagón se suelta desde 20 m de altura sin rozamiento. ¿Con qué velocidad llega a la altura 0, en m/s? (g = 10 m/s²; v = √(2·g·h))", nums(20), "v = √(2 · 10 · 20) = √400 = 20 m/s.", "Conservación de la energía mecánica."),
    calc("calc-ec", "Energía cinética", "El vagón anterior tiene 500 kg y 20 m/s en el punto más bajo. ¿Cuál es su energía cinética, en kJ?", nums(100), "Ec = ½ · 500 · 20² = 100 000 J = 100 kJ.", "Ec = ½·m·v²."),
    calc("calc-ep", "Energía potencial", "El mismo vagón de 500 kg a 20 m de altura (g = 10 m/s²) tiene una energía potencial de, en kJ:", nums(100), "Ep = 500 · 10 · 20 = 100 000 J = 100 kJ.", "Ep = m·g·h."),
    calc("calc-calor", "Calor disipado", "Si por el rozamiento se pierde el 20 % de esa energía de 100 kJ, ¿cuántos kJ llegan como cinética abajo?", nums(80), "100 · 0,8 = 80 kJ (los otros 20 kJ se disipan como calor).", "Aplica el 80 %."),
    sort("clasifica", "Se conserva o no", "Clasifica cada situación según se conserve o no la energía mecánica.",
      [["co", "Se conserva", "emerald"], ["no", "No se conserva", "rose"]],
      [["Una piedra que cae en el vacío", "co"], ["Un péndulo ideal sin rozamiento", "co"], ["Un satélite en órbita sin rozamiento", "co"], ["Un coche que frena", "no"], ["Una bola que rueda y se detiene", "no"], ["Un esquiador con rozamiento", "no"]],
      "Con rozamiento se transforma en calor.",
    ),
    pick("check", "Energía total", "Cuando una bola rueda y se detiene, ¿qué ha pasado con su energía?",
      "Se ha transformado en calor, no ha desaparecido",
      [["Ha desaparecido", "La energía no se destruye."], ["Se ha convertido en masa", "No es ese caso."], ["Se ha guardado como potencial", "No ha cambiado de altura."]],
      "La energía total se conserva.",
    ),
  ],
};
