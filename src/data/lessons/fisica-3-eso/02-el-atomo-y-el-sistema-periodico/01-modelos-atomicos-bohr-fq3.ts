import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ3_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";
export const modelosAtomicosBohrFq3Lesson: InteractiveLesson = {
  slug: "modelos-atomicos-bohr-fq3",
  title: "1. De Dalton a Bohr: los modelos atómicos",
  subtitle: FQ3_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("hist", "Cuatro modelos, cuatro ideas", [
      { kind: "steps", items: [
        "**Dalton (1803)**: el átomo es una **esfera maciza e indivisible**. Cada elemento tiene átomos propios.",
        "**Thomson (1904)**: descubre el **electrón**. El átomo es una esfera **positiva** con electrones incrustados («pudin de pasas»).",
        "**Rutherford (1911)**: al bombardear una lámina de oro con partículas alfa, casi todas la atraviesan: el átomo es **casi vacío** y tiene un **núcleo** pequeño, denso y positivo, con los electrones alrededor.",
        "**Bohr (1913)**: los electrones giran en **niveles de energía** concretos. Es el modelo que se usa para explicar los espectros.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Los saltos de Bohr", [
      { kind: "text", text: "Observa cómo un electrón cambia de nivel y qué ocurre con la energía." },
    ], anim("fq3-bohr-salto"), "visual-top"),
    slide("explora", "Niveles y fotones", [
      { kind: "text", text: "Elige un nivel inicial y uno final. ¿Qué energía y qué color tiene la luz emitida?" },
    ], tool("fq3-niveles-bohr-explorador"), "visual-top"),
    slide("actual", "Y hoy…", [
      { kind: "steps", items: [
        "El **modelo actual** (mecánica cuántica) no habla de órbitas, sino de **orbitales**: zonas donde es **probable** encontrar al electrón (**nube electrónica**).",
        "A este nivel, el **modelo de Bohr** sigue siendo muy útil para entender las **capas**, los **electrones de valencia** y la **tabla periódica**.",
        "Un modelo científico **no es la realidad**: es una explicación que se **mejora** cuando aparecen nuevos datos.",
      ] },
    ]),
    sort("clasifica", "Modelo y científico", "Asocia cada aportación con el modelo al que corresponde.",
      [["tho", "Thomson", "cobalt"], ["rut", "Rutherford", "amber"], ["boh", "Bohr", "emerald"]],
      [["Descubre el electrón", "tho"], ["Pudin de pasas", "tho"], ["Núcleo pequeño y denso", "rut"], ["Experimento de la lámina de oro", "rut"], ["Niveles de energía", "boh"], ["Explica los espectros de líneas", "boh"]],
      "Cada modelo añade una idea nueva.",
    ),
    pick("check", "Lámina de oro", "En el experimento de Rutherford casi todas las partículas alfa atravesaban la lámina. ¿Qué indica?",
      "Que el átomo está casi vacío",
      [["Que el átomo es macizo", "Entonces rebotarían."], ["Que los electrones son muy pesados", "Son muy ligeros."], ["Que no hay carga positiva", "Algunas rebotan: hay un núcleo positivo."]],
      "Solo unas pocas rebotan: hay un núcleo pequeño y concentrado.",
    ),
    pick("check2", "Emisión de luz", "¿Cuándo emite luz un átomo según Bohr?",
      "Cuando un electrón baja a un nivel de menor energía",
      [["Cuando un electrón sube de nivel", "Al subir absorbe energía."], ["Cuando el núcleo se mueve", "No es la causa."], ["Cuando gira en su nivel sin cambiar", "En su nivel no emite."]],
      "El fotón lleva la diferencia de energía entre los dos niveles.",
    ),
  ],
};
