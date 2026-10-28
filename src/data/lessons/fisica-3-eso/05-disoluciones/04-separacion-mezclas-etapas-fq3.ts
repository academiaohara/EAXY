import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const separacionMezclasEtapasFq3Lesson: InteractiveLesson = {
  slug: "separacion-mezclas-etapas-fq3",
  title: "4. Separación de mezclas en varias etapas",
  subtitle: FQ3_SUBTITLES[5],
  stage: { theme: "board" },
  steps: [
    slide("def", "Una técnica para cada propiedad", [
      { kind: "steps", items: [
        "Para separar los componentes de una mezcla se aprovecha una **propiedad que los distinga**: tamaño, solubilidad, densidad, punto de ebullición, magnetismo…",
        "**Filtración**: sólido insoluble de un líquido. **Decantación**: líquidos no miscibles (aceite y agua) o sólido que sedimenta.",
        "**Evaporación / cristalización**: soluto sólido de una disolución. **Destilación**: líquidos miscibles con distinto punto de ebullición.",
        "**Separación magnética**: materiales atraídos por un imán. **Cromatografía**: sustancias que avanzan a distinta velocidad sobre un soporte.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Mezclas por etapas", [
      { kind: "text", text: "Elige una mezcla y avanza etapa a etapa. ¿Qué técnica se usa en cada paso?" },
    ], tool("fq3-separacion-etapas-explorador"), "visual-top"),
    slide("orden", "El orden importa", [
      { kind: "steps", items: [
        "Arena + sal + agua: primero **filtrar** (retiene la arena) y luego **evaporar** el agua (queda la sal). Al revés no se puede.",
        "Limaduras de hierro + aceite + agua: primero el **imán** y luego la **decantación**.",
        "En general se empieza por las técnicas **más sencillas** que separan componentes **sólidos** y se termina con las que separan disoluciones.",
      ] },
    ]),
    sort("clasifica", "Técnica adecuada", "Elige la técnica para cada caso.",
      [["fil", "Filtración", "cobalt"], ["dec", "Decantación", "amber"], ["eva", "Evaporación", "emerald"], ["des", "Destilación", "rose"]],
      [["Separar la arena del agua", "fil"], ["Separar los posos del café del líquido", "fil"], ["Separar aceite y agua", "dec"], ["Separar agua y arena que ha sedimentado", "dec"], ["Obtener la sal del agua de mar", "eva"], ["Obtener alcohol de vino", "des"]],
      "Cada técnica aprovecha una propiedad diferente.",
    ),
    calc("calc-pasos", "Etapas", "Para separar los tres componentes de la mezcla de arena, sal y agua se usan dos técnicas: filtración y evaporación. ¿Cuántas etapas son?", nums(2), "Una filtración y una evaporación: 2 etapas.", "Cuenta las técnicas aplicadas."),
    calc("calc-cant", "Cuánta sal queda", "Una disolución de 500 g contiene 8 % en masa de sal. Si se evapora toda el agua, ¿cuántos g de sal quedan?", nums(40), "500 · 0,08 = 40 g.", "El porcentaje de la masa total."),
    pick("check", "Agua y alcohol", "¿Por qué se puede separar el alcohol del agua por destilación?",
      "Porque hierven a temperaturas distintas",
      [["Porque no se mezclan", "Se mezclan bien."], ["Porque tienen distinto color", "No es la propiedad usada."], ["Porque uno es sólido", "Ambos son líquidos."]],
      "El alcohol hierve a unos 78 °C y el agua a 100 °C.",
    ),
    pick("check2", "Orden", "En la mezcla arena, sal y agua, ¿qué se hace primero?",
      "Filtrar para retirar la arena",
      [["Evaporar el agua", "La arena quedaría mezclada con la sal."], ["Destilar", "No hace falta."], ["Atraer con un imán", "La arena y la sal no son magnéticas."]],
      "Primero se separa el sólido insoluble.",
    ),
  ],
};
