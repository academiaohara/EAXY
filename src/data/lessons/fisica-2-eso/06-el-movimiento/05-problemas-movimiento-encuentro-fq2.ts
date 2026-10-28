import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const problemasMovimientoEncuentroFq2Lesson: InteractiveLesson = {
  slug: "problemas-movimiento-encuentro-fq2",
  title: "5. Problemas de movimiento y encuentro",
  subtitle: FQ2_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Estrategia", [
      { kind: "steps", items: [
        "**1.** Dibuja un **esquema** y elige el **sistema de referencia** (origen y sentido positivo).",
        "**2.** Pasa los datos a **unidades coherentes** (m y s, o km y h).",
        "**3.** Escribe la **ecuación de cada móvil**: x = x₀ + v · t.",
        "**4.** Resuelve y **comprueba** que el resultado tiene sentido (unidades, signo, orden de magnitud).",
      ] },
    ], undefined, "stack"),
    slide("explora", "Dos móviles", [
      { kind: "text", text: "Cambia las velocidades y la distancia inicial. Mira cuándo y dónde se cruzan las rectas en la gráfica." },
    ], tool("fq2-encuentro-moviles-explorador"), "visual-top"),
    slide("enc", "Encuentro y alcance", [
      { kind: "steps", items: [
        "**Encuentro**: los móviles van **uno hacia el otro**. Se igualan las posiciones: x₁ = x₂.",
        "**Alcance**: los dos van en el **mismo sentido** y el de atrás es **más rápido**.",
        "El **tiempo de encuentro** es t = (x₀₂ − x₀₁) / (v₁ − v₂).",
        "En la gráfica x–t, el **encuentro** es el punto en que se **cruzan** las dos rectas.",
      ] },
    ]),
    calc("calc-t", "Se cruzan", "Dos coches están a 300 m. El primero sale hacia el segundo a 20 m/s y el segundo hacia el primero a 10 m/s. ¿En qué instante se cruzan, en s? (t = 300 / (20 + 10))", nums(10), "Se acercan a 30 m/s: 300 / 30 = 10 s.", "Suma las velocidades."),
    calc("calc-x", "Dónde se cruzan", "Con los datos anteriores, ¿a qué distancia del primer coche se cruzan, en m?", nums(200), "20 · 10 = 200 m.", "Recorrido del primero."),
    calc("calc-alc", "Alcance", "Un coche a 30 m/s persigue a otro que va 100 m por delante a 20 m/s. ¿Cuántos segundos tarda en alcanzarlo? (t = 100 / (30 − 20))", nums(10), "La diferencia de velocidades es 10 m/s: 100 / 10 = 10 s.", "Resta las velocidades."),
    sort("clasifica", "Encuentro o alcance", "Clasifica cada situación.",
      [["enc", "Encuentro (sentidos opuestos)", "cobalt"], ["alc", "Alcance (mismo sentido)", "amber"]],
      [["Dos trenes que se acercan por la misma vía", "enc"], ["Dos ciclistas que salen de extremos opuestos", "enc"], ["Se suman las velocidades", "enc"], ["Un coche adelanta a un camión", "alc"], ["Una moto persigue a un coche", "alc"], ["Se restan las velocidades", "alc"]],
      "En el encuentro se suman las rapideces; en el alcance se restan.",
    ),
    pick("check", "Nunca se encuentran", "Dos móviles van en el mismo sentido con la misma velocidad. ¿Se encontrarán?",
      "No, mantienen siempre la misma distancia",
      [["Sí, siempre", "La distancia no cambia."], ["Sí, tras mucho tiempo", "Seguirán igual."], ["Depende del tiempo", "Si las velocidades son iguales, no."]],
      "Las rectas x–t son paralelas y no se cortan.",
    ),
  ],
};
