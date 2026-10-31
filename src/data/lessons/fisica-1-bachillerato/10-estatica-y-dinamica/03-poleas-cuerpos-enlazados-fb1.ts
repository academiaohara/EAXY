import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const poleasCuerposEnlazadosFb1Lesson: InteractiveLesson = {
  slug: "poleas-cuerpos-enlazados-fb1",
  title: "3. Tensiones y cuerpos enlazados",
  subtitle: FB1_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("tens", "Tensión de una cuerda", [
      { kind: "steps", items: [
        "La **tensión T** es la fuerza que ejerce una cuerda; tira siempre **hacia la cuerda** (nunca empuja).",
        "Con **cuerda ideal** (sin masa, inextensible) y **polea ideal** (sin masa ni rozamiento): la tensión es la **misma** en toda la cuerda y los cuerpos unidos tienen el **mismo módulo de aceleración**.",
        "**Cuerpo suspendido en reposo**: T = m·g. Si **sube acelerando**: T = m·(g + a); si **baja** acelerando: T = m·(g − a).",
        "**Cuerpos en contacto o enlazados**: se puede tratar el conjunto como un solo cuerpo para hallar a, y luego un cuerpo aislado para hallar la fuerza de enlace.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Atwood y mesa con polea", [
      { kind: "text", text: "Cambia las masas y el rozamiento. ¿Cuándo es T mayor que el peso de uno de los cuerpos? ¿Cuándo no se mueve el sistema?" },
    ], tool("fb1-poleas-explorador"), "visual-top"),
    slide("metodo", "Método de resolución", [
      { kind: "steps", items: [
        "**1.** Diagrama de fuerzas de **cada** cuerpo y **sentido positivo** común (el del movimiento esperado).",
        "**2.** Escribe **ΣF = m·a** para cada cuerpo con la **misma a** y la **misma T**.",
        "**3.** Resuelve el sistema de ecuaciones (sumarlas elimina T). **4.** Si sale a < 0, el movimiento es en el sentido contrario al supuesto.",
        "**Truco**: al sumar las ecuaciones, solo quedan las fuerzas **externas**: **a = (fuerzas a favor − fuerzas en contra)/(masa total)**.",
      ] },
    ], undefined, "stack"),
    calc("calc-atw", "Máquina de Atwood", "Dos cuerpos de 2 kg y 3 kg cuelgan de una polea ideal. ¿Qué aceleración tienen, en m/s²? (g = 10 m/s²)", nums(2), "a = (3 − 2)·10/5 = 2 m/s².", "a = (m₂ − m₁)g/(m₁ + m₂)."),
    calc("calc-T", "Tensión", "En la misma máquina de Atwood, ¿cuánto vale la tensión, en N? (g = 10 m/s²)", nums(24), "T = 2·2·3·10/5 = 24 N.", "T = 2 m₁ m₂ g/(m₁ + m₂)."),
    calc("calc-mesa", "Mesa sin rozamiento", "Un bloque de 4 kg sobre una mesa lisa está unido por una cuerda a otro de 1 kg que cuelga. ¿Qué aceleración tiene, en m/s²? (g = 10 m/s²)", nums(2), "a = 1·10/5 = 2 m/s².", "Fuerza a favor: m₂g; masa total 5 kg."),
    calc("calc-contacto", "Dos cuerpos en contacto", "Se empuja con 30 N un bloque de 2 kg que toca a otro de 4 kg (sin rozamiento). ¿Qué fuerza ejerce el primero sobre el segundo, en N?", nums(20), "a = 30/6 = 5 m/s² → F = 4·5 = 20 N.", "Aísla el segundo bloque."),
    sort("clasifica", "Tensión y peso", "En una máquina de Atwood con m₂ > m₁, compara la tensión T con los pesos.",
      [["me", "T es menor que ese peso", "cobalt"], ["ma", "T es mayor que ese peso", "emerald"]],
      [["m₂ (el que baja): T respecto a m₂·g", "me"], ["m₁ (el que sube): T respecto a m₁·g", "ma"], ["Ascensor que sube acelerando: T respecto a m·g", "ma"], ["Ascensor que baja acelerando: T respecto a m·g", "me"]],
      "El que baja acelerando necesita que T < peso; el que sube, T > peso.",
    ),
    pick("check", "Aceleraciones", "Dos cuerpos unidos por una cuerda ideal inextensible, ¿qué tienen en común?",
      "El mismo módulo de aceleración y la misma tensión en los extremos",
      [["La misma fuerza resultante", "Dependen de sus masas."], ["El mismo peso", "No tienen por qué."], ["La misma energía", "No."]],
      "La cuerda inextensible une sus movimientos.",
    ),
  ],
};
