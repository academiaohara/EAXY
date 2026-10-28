import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const cambiosFisicosQuimicosFq2Lesson: InteractiveLesson = {
  slug: "cambios-fisicos-quimicos-fq2",
  title: "1. Cambios físicos y cambios químicos",
  subtitle: FQ2_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Dos tipos de cambios", [
      { kind: "steps", items: [
        "La materia **cambia** continuamente a nuestro alrededor: el hielo se funde, la madera arde, el hierro se oxida…",
        "En un **cambio físico** la sustancia **no cambia su naturaleza**: solo su forma, su estado o su aspecto.",
        "En un **cambio químico** aparecen **sustancias nuevas** con propiedades diferentes a las originales.",
        "Un cambio químico es una **reacción química**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "¿Físico o químico?", [
      { kind: "text", text: "Elige un fenómeno y mira si es un cambio físico o químico y por qué." },
    ], tool("fq2-cambio-fisico-quimico-explorador"), "visual-top"),
    slide("evid", "Evidencias de una reacción", [
      { kind: "steps", items: [
        "Se **desprende un gas** (burbujas, humo).",
        "**Cambia el color** de la sustancia.",
        "Se **desprende o absorbe calor o luz** (una llama, un recipiente que se calienta o se enfría).",
        "Se forma un **sólido** en un líquido (**precipitado**) o **cambia el olor**.",
        "Ninguna es una prueba definitiva por sí sola: lo importante es que **aparecen sustancias nuevas**.",
      ] },
    ]),
    pick("check1", "Hielo", "Un cubito de hielo se funde. ¿Qué tipo de cambio es?",
      "Físico, porque sigue siendo agua",
      [["Químico, porque desaparece el hielo", "El agua sigue siendo la misma sustancia."], ["Químico, porque hay agua nueva", "No aparece una sustancia distinta."], ["Ninguno", "Es un cambio de estado."]],
      "Un cambio de estado es un cambio físico: no se forman sustancias nuevas.",
    ),
    pick("check2", "Clavo oxidado", "¿Por qué la oxidación de un clavo de hierro es un cambio químico?",
      "Porque se forma óxido, una sustancia distinta del hierro",
      [["Porque cambia de forma", "La forma no es el criterio."], ["Porque se calienta", "No siempre se nota calor."], ["Porque se puede doblar", "No tiene que ver."]],
      "El hierro reacciona con el oxígeno y se transforma en óxido de hierro.",
    ),
    sort("clasifica", "Clasifica los cambios", "Clasifica cada fenómeno.",
      [["fis", "Cambio físico", "cobalt"], ["qui", "Cambio químico", "amber"]],
      [["Disolver azúcar en agua", "fis"], ["Romper un vaso", "fis"], ["Hervir agua", "fis"], ["Quemar papel", "qui"], ["Pudrirse una fruta", "qui"], ["Cocinar un huevo", "qui"]],
      "Si aparecen sustancias nuevas es químico; si no, es físico.",
    ),
  ],
};
