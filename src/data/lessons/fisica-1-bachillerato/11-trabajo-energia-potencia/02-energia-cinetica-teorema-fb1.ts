import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const energiaCineticaTeoremaFb1Lesson: InteractiveLesson = {
  slug: "energia-cinetica-teorema-fb1",
  title: "2. Energía cinética y teorema trabajo-energía",
  subtitle: FB1_SUBTITLES[11],
  stage: { theme: "board" },
  steps: [
    slide("ec", "Energía cinética", [
      { kind: "steps", items: [
        "La **energía** es la capacidad de un sistema para producir cambios (realizar trabajo). Se mide en **julios**. Se **transforma** y se **transfiere**, pero no se crea ni se destruye.",
        "La **energía cinética** de un cuerpo de masa m con rapidez v es **Ec = ½·m·v²**. Es un escalar, siempre ≥ 0 y depende del **cuadrado** de v.",
        "Al **duplicar la velocidad**, la Ec se **cuadruplica**: por eso los choques a gran velocidad son tan graves.",
      ] },
    ], undefined, "stack"),
    slide("teorema", "Teorema de las fuerzas vivas", [
      { kind: "steps", items: [
        "El **trabajo de la fuerza neta** sobre un cuerpo es igual a la **variación de su energía cinética**: **W_neto = ΔEc = ½·m·v² − ½·m·v₀²**.",
        "Es válido para **fuerzas variables** y **trayectorias cualesquiera**. No hace falta conocer la aceleración ni el tiempo.",
        "**Distancia de frenado** con fuerza constante F: **d = Ec/F = m·v₀²/(2F)**. Crece con **v²**.",
        "Si W > 0 el cuerpo **gana** energía cinética (acelera); si W < 0, la **pierde** (frena).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Acelerar y frenar", [
      { kind: "text", text: "Fija una masa y una velocidad inicial y cambia la fuerza neta y la distancia. Mira la energía cinética antes y después." },
    ], tool("fb1-teorema-ec-explorador"), "visual-top"),
    calc("calc-ec", "Energía cinética", "Un coche de 1000 kg circula a 20 m/s. ¿Qué energía cinética tiene, en kJ?", nums(200), "Ec = ½·1000·400 = 200 000 J = 200 kJ.", "Ec = ½ m v²."),
    calc("calc-v", "Velocidad desde Ec", "Un cuerpo de 2 kg tiene 100 J de energía cinética. ¿Qué rapidez tiene, en m/s?", nums(10), "v = √(2·100/2) = 10 m/s.", "v = √(2Ec/m)."),
    calc("calc-w", "Teorema", "Una fuerza neta hace 600 J de trabajo sobre un cuerpo de 3 kg que parte del reposo. ¿Qué velocidad final alcanza, en m/s?", nums(20), "600 = ½·3·v² → v = 20 m/s.", "W = ΔEc."),
    calc("calc-fre", "Distancia de frenado", "Un coche de 1000 kg va a 20 m/s y frena con una fuerza constante de 4000 N. ¿Qué distancia recorre hasta pararse, en m?", nums(50), "d = 200 000/4000 = 50 m.", "d = Ec/F."),
    sort("clasifica", "Efecto de la velocidad", "Si la velocidad se multiplica por 2, ¿qué ocurre con cada magnitud?",
      [["x2", "Se duplica", "cobalt"], ["x4", "Se cuadruplica", "rose"], ["x1", "No cambia", "amber"]],
      [["La energía cinética", "x4"], ["El momento lineal", "x2"], ["La distancia de frenado (misma fuerza)", "x4"], ["La masa", "x1"], ["El tiempo de frenado (misma fuerza)", "x2"], ["La rapidez", "x2"]],
      "Ec y distancia de frenado dependen de v²; p y el tiempo, de v.",
    ),
    pick("check", "Teorema", "¿Qué dice el teorema trabajo-energía cinética?",
      "El trabajo de la fuerza neta es igual a la variación de la energía cinética",
      [["El trabajo siempre es igual a la energía potencial", "Eso solo se cumple para fuerzas conservativas."], ["La energía cinética es siempre constante", "Cambia si el trabajo neto no es nulo."], ["El trabajo es el producto de la masa por la velocidad", "Eso es el momento lineal."]],
      "W_neto = ΔEc.",
    ),
  ],
};
