import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";
export const tecnicasSeparacionMezclasFq2Lesson: InteractiveLesson = {
  slug: "tecnicas-separacion-mezclas-fq2",
  title: "4. Técnicas de separación de mezclas",
  subtitle: FQ2_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Separar lo mezclado", [
      { kind: "steps", items: [
        "Las mezclas se pueden **separar** con procedimientos **físicos**, porque cada componente **conserva sus propiedades**.",
        "La técnica se elige según la **propiedad** en la que se diferencian los componentes: tamaño de partícula, densidad, solubilidad, punto de ebullición, magnetismo…",
        "Muchas veces hay que **combinar** varias técnicas.",
      ] },
    ], undefined, "stack"),
    slide("explora", "¿Qué técnica uso?", [
      { kind: "text", text: "Elige una mezcla y una técnica. Comprueba si es la adecuada y por qué." },
    ], tool("fq2-separacion-mezclas-explorador"), "visual-top"),
    slide("anim", "La destilación", [
      { kind: "text", text: "Mira cómo se separan dos líquidos con distinto punto de ebullición, como el alcohol y el agua." },
    ], anim("fq2-destilacion"), "visual-top"),
    slide("lista", "Las técnicas", [
      { kind: "steps", items: [
        "**Filtración**: un sólido insoluble de un líquido, con papel de filtro.",
        "**Decantación**: dos líquidos inmiscibles (con un embudo de decantación) o un sólido que se ha depositado.",
        "**Evaporación y cristalización**: un sólido disuelto en un líquido; el líquido se evapora.",
        "**Destilación**: líquidos miscibles con distinto **punto de ebullición**.",
        "**Cromatografía**: sustancias disueltas que avanzan a distinta velocidad. **Imán**: materiales magnéticos.",
      ] },
    ]),
    sort("clasifica", "Mezcla y técnica", "Asocia cada mezcla con la técnica más adecuada.",
      [["fil", "Filtración", "cobalt"], ["dec", "Decantación", "amber"], ["eva", "Evaporación", "emerald"], ["des", "Destilación", "rose"]],
      [["Arena y agua", "fil"], ["Café molido y agua", "fil"], ["Aceite y agua", "dec"], ["Agua y gasolina", "dec"], ["Sal disuelta en agua", "eva"], ["Obtener sal en una salina", "eva"], ["Alcohol y agua", "des"], ["Obtener agua potable del agua del mar", "des"]],
      "Cada técnica aprovecha una propiedad distinta.",
    ),
    pick("check1", "Imán", "¿Qué mezcla se separa con un imán?",
      "Limaduras de hierro y arena",
      [["Sal y agua", "Se separa por evaporación."], ["Aceite y agua", "Se separa por decantación."], ["Alcohol y agua", "Se separa por destilación."]],
      "El hierro es atraído por el imán y la arena no.",
    ),
    pick("check2", "Destilación", "¿En qué propiedad se basa la destilación?",
      "En la diferencia de puntos de ebullición",
      [["En la diferencia de densidad", "Eso es la decantación."], ["En el tamaño de las partículas", "Eso es la filtración."], ["En el color", "No."]],
      "El componente de menor punto de ebullición pasa antes a vapor y se condensa aparte.",
    ),
  ],
};
