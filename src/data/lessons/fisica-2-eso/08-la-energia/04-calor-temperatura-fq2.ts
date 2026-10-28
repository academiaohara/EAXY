import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const calorTemperaturaFq2Lesson: InteractiveLesson = {
  slug: "calor-temperatura-fq2",
  title: "4. Calor y temperatura",
  subtitle: FQ2_SUBTITLES[8],
  stage: { theme: "board" },
  steps: [
    slide("def", "No son lo mismo", [
      { kind: "steps", items: [
        "La **temperatura** mide el **grado de agitación** (energía cinética media) de las partículas de un cuerpo. Se mide con un **termómetro** en **°C** o **K**.",
        "El **calor** es la **energía que se transfiere** de un cuerpo a otro por tener **distinta temperatura**. Se mide en **julios**.",
        "El calor **siempre fluye del cuerpo caliente al frío**, hasta que alcanzan el **equilibrio térmico** (la misma temperatura).",
        "Un cuerpo **no «tiene calor»**: tiene **energía interna**, y el calor es la energía que **pasa** de uno a otro.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Mezclar agua", [
      { kind: "text", text: "Mezcla agua caliente con agua fría. Cambia las masas y las temperaturas y mira la temperatura final." },
    ], tool("fq2-calor-temperatura-explorador"), "visual-top"),
    slide("transm", "Cómo se transmite el calor", [
      { kind: "steps", items: [
        "**Conducción**: el calor pasa por **contacto** a través de un sólido (una cuchara en una sopa caliente). Los **metales** son buenos conductores.",
        "**Convección**: se transmite por el **movimiento de un fluido** (líquido o gas): el aire caliente sube.",
        "**Radiación**: se transmite por **ondas electromagnéticas**, incluso en el vacío (el calor del Sol).",
        "Los **aislantes térmicos** (corcho, lana, poliestireno) dificultan el paso del calor.",
      ] },
    ]),
    slide("efectos", "Efectos del calor", [
      { kind: "steps", items: [
        "Aumenta la **temperatura** de un cuerpo.",
        "Provoca **cambios de estado** (fusión, vaporización).",
        "Produce **dilatación**: los cuerpos aumentan de tamaño al calentarse (por eso los puentes tienen juntas).",
      ] },
    ]),
    calc("calc-tf", "Temperatura final", "Se mezclan 200 g de agua a 80 °C con 300 g de agua a 20 °C. ¿Cuál es la temperatura final, en °C? (Tf = (m₁T₁ + m₂T₂) / (m₁ + m₂))", nums(44), "(200·80 + 300·20) / 500 = 22 000 / 500 = 44 °C.", "Haz la media ponderada por las masas."),
    calc("calc-k", "A kelvin", "Un cuerpo está a 25 °C. ¿Cuántos kelvin son?", nums(298), "K = 25 + 273 = 298 K.", "Suma 273."),
    calc("calc-ig", "Misma masa", "Se mezclan 100 g de agua a 60 °C con 100 g de agua a 20 °C. ¿Qué temperatura final resulta, en °C?", nums(40), "Misma masa: la media simple, 40 °C.", "Media de 60 y 20."),
    sort("clasifica", "Conducción, convección o radiación", "Clasifica cada situación según cómo se transmite el calor.",
      [["cond", "Conducción", "cobalt"], ["conv", "Convección", "amber"], ["rad", "Radiación", "emerald"]],
      [["Una cuchara metálica se calienta en la olla", "cond"], ["Tocar un radiador caliente", "cond"], ["El aire caliente sube sobre una estufa", "conv"], ["Las corrientes en el agua de una olla", "conv"], ["El calor que llega del Sol", "rad"], ["El calor de una hoguera a distancia", "rad"]],
      "Contacto: conducción; fluido en movimiento: convección; ondas: radiación.",
    ),
    pick("check", "Sentido del calor", "Tocas un trozo de metal frío. ¿Qué ocurre?",
      "El calor pasa de tu mano al metal",
      [["El frío pasa del metal a tu mano", "No hay «frío» que se transfiera: es la ausencia de calor."], ["No hay ninguna transferencia", "Sí la hay."], ["El calor pasa del metal a tu mano", "Es al revés."]],
      "El calor siempre fluye del cuerpo más caliente (tu mano) al más frío.",
    ),
  ],
};
