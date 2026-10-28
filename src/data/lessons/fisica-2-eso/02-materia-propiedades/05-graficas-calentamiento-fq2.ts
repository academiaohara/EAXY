import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const graficasCalentamientoFq2Lesson: InteractiveLesson = {
  slug: "graficas-calentamiento-fq2",
  title: "5. Gráficas de calentamiento y enfriamiento",
  subtitle: FQ2_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Temperatura frente a tiempo", [
      { kind: "steps", items: [
        "Si calentamos una sustancia con una fuente de potencia constante y anotamos su temperatura cada minuto, obtenemos una **gráfica de calentamiento**.",
        "En el eje horizontal va el **tiempo** y en el vertical la **temperatura**.",
        "Mientras la sustancia está en **un solo estado**, la temperatura **sube**.",
        "Durante un **cambio de estado** la temperatura **no cambia**: aparece un **tramo horizontal**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Calienta una sustancia", [
      { kind: "text", text: "Elige una sustancia y avanza en el tiempo. Mira en qué momentos la temperatura se queda constante." },
    ], tool("fq2-curva-calentamiento-explorador"), "visual-top"),
    slide("puntos", "Puntos de fusión y de ebullición", [
      { kind: "steps", items: [
        "La temperatura del primer tramo horizontal es el **punto de fusión**; la del segundo, el **punto de ebullición**.",
        "Son **propiedades características**: cada sustancia pura tiene las suyas (agua: 0 °C y 100 °C).",
        "Se pueden usar para **identificar** una sustancia y comprobar si es **pura**: en una **mezcla**, la temperatura **no** se mantiene constante.",
        "En el **enfriamiento** ocurre al revés: la temperatura baja y se detiene en la **condensación** y la **solidificación**.",
      ] },
    ]),
    slide("energia", "¿A dónde va la energía?", [
      { kind: "text", text: "Durante el tramo horizontal sigues aportando calor, pero la temperatura no sube. Esa energía se emplea en **separar las partículas** y vencer las fuerzas que las mantienen juntas, no en hacer que se muevan más deprisa." },
    ]),
    calc("calc-est", "¿En qué estado está?", "El agua está a −10 °C. ¿Qué estado tiene? Escribe 1 si es sólido, 2 si es líquido y 3 si es gas.", nums(1), "Por debajo de 0 °C el agua es hielo (sólido): 1.", "Compara con el punto de fusión."),
    calc("calc-est2", "A 50 °C", "El agua está a 50 °C. ¿Qué estado tiene? (1 sólido, 2 líquido, 3 gas)", nums(2), "Entre 0 °C y 100 °C el agua es líquida: 2.", "Está entre el punto de fusión y el de ebullición."),
    sort("clasifica", "¿Qué tramo es?", "Clasifica cada parte de la gráfica de calentamiento.",
      [["sub", "La temperatura sube", "cobalt"], ["con", "La temperatura es constante", "amber"]],
      [["Calentamiento del hielo antes de fundir", "sub"], ["Calentamiento del agua líquida", "sub"], ["Calentamiento del vapor", "sub"], ["Durante la fusión", "con"], ["Durante la ebullición", "con"], ["Mientras coexisten hielo y agua", "con"]],
      "Los cambios de estado de una sustancia pura se hacen a temperatura constante.",
    ),
    pick("check", "Sustancia pura", "Si en un calentamiento la temperatura se mantiene constante durante la ebullición, ¿qué indica?",
      "Probablemente se trata de una sustancia pura",
      [["Que se ha parado el calentador", "Se sigue aportando calor."], ["Que es siempre una mezcla", "En una mezcla no se mantiene constante."], ["Que no hay cambio de estado", "Sí lo hay."]],
      "Una sustancia pura hierve a una temperatura fija; una mezcla, no.",
    ),
  ],
};
