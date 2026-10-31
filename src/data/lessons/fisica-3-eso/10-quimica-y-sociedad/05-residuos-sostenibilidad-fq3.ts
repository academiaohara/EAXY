import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const residuosSostenibilidadFq3Lesson: InteractiveLesson = {
  slug: "residuos-sostenibilidad-fq3",
  title: "5. Residuos, reciclaje y sostenibilidad",
  subtitle: FQ3_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("def", "Residuos y las tres R", [
      { kind: "steps", items: [
        "Un **residuo** es cualquier material que se desecha. Se acumulan en **vertederos** o se **incineran**, con impacto sobre el suelo, el agua y el aire.",
        "**Reducir**: consumir menos y evitar envases innecesarios.",
        "**Reutilizar**: dar un segundo uso (bolsas, botes, ropa).",
        "**Reciclar**: convertir el residuo en **nueva materia prima**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "¿Cuánto se recicla?", [
      { kind: "text", text: "Elige un material y el porcentaje de reciclaje. ¿Cuánto tarda en degradarse y cuánta energía se ahorra?" },
    ], tool("fq3-reciclaje-explorador"), "visual-top"),
    slide("cont", "Contenedores y materias primas", [
      { kind: "steps", items: [
        "**Amarillo**: envases de plástico, latas y briks. **Azul**: papel y cartón. **Verde**: vidrio. **Marrón u orgánico**: restos de comida. **Punto limpio**: pilas, aceites, pinturas, electrónica.",
        "**Reciclar** ahorra **materias primas** (mineral, petróleo, madera), **energía** y **agua**, y reduce las **emisiones** y los residuos.",
        "El **uso sostenible** busca satisfacer las necesidades actuales sin comprometer las de las **generaciones futuras**: **economía circular**, **energías renovables**, consumo responsable.",
      ] },
    ]),
    calc("calc-kg", "Papel reciclado", "Una persona genera 70 kg de papel y cartón al año y recicla el 40 %. ¿Cuántos kg recicla?", nums(28), "70 · 0,4 = 28 kg.", "Aplica el porcentaje."),
    calc("calc-vert", "Al vertedero", "Y, de esos 70 kg, ¿cuántos kg acaban en el vertedero?", nums(42), "70 − 28 = 42 kg.", "El resto no reciclado."),
    calc("calc-alu", "Ahorro con aluminio", "Fabricar aluminio reciclado ahorra un 95 % de la energía. Si hacer una lata nueva necesita 100 unidades de energía, ¿cuántas necesita una reciclada?", nums(5), "100 · 0,05 = 5 unidades.", "Queda el 5 %."),
    sort("clasifica", "¿A dónde va?", "Clasifica cada residuo en su contenedor.",
      [["am", "Amarillo (envases)", "amber"], ["az", "Azul (papel)", "cobalt"], ["ve", "Verde (vidrio)", "emerald"], ["pl", "Punto limpio", "rose"]],
      [["Botella de plástico", "am"], ["Lata de refresco", "am"], ["Caja de cartón", "az"], ["Periódico", "az"], ["Botella de vidrio", "ve"], ["Pilas usadas", "pl"]],
      "Cada residuo tiene su contenedor.",
    ),
    pick("check", "Orden de prioridad", "En la jerarquía de las tres R, ¿qué es lo más recomendable?",
      "Reducir el consumo de residuos",
      [["Reciclar siempre antes que reducir", "Lo mejor es no generar el residuo."], ["Tirar todo junto", "No es sostenible."], ["Incinerarlo todo", "No es la mejor opción."]],
      "Reducir > reutilizar > reciclar.",
    ),
  ],
};
