import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";
export const modelosAtomicosFq2Lesson: InteractiveLesson = {
  slug: "modelos-atomicos-fq2",
  title: "1. Los modelos atómicos",
  subtitle: FQ2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "¿De qué está hecha la materia?", [
      { kind: "steps", items: [
        "Los filósofos griegos (Demócrito) propusieron que la materia está formada por **átomos**, «sin división». Era solo una idea.",
        "La ciencia fue construyendo **modelos** del átomo que se mejoran cuando aparecen **nuevos hechos** que el anterior no explica.",
        "Un **modelo** no es una fotografía de la realidad: es una **representación** útil para explicar y predecir.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Cuatro modelos", [
      { kind: "text", text: "Recorre los modelos de Dalton, Thomson, Rutherford y Bohr y compara sus ideas y sus limitaciones." },
    ], tool("fq2-modelos-atomicos-explorador"), "visual-top"),
    slide("anim", "El experimento de Rutherford", [
      { kind: "text", text: "Mira cómo la lámina de oro permitió descubrir el núcleo del átomo." },
    ], anim("fq2-rutherford"), "visual-top"),
    slide("hist", "Los descubrimientos", [
      { kind: "steps", items: [
        "**Dalton** (1803): átomos como esferas macizas, distintos para cada elemento.",
        "**Thomson** (1897–1904): descubre el **electrón** (carga −) y propone el modelo del «pudin de pasas».",
        "**Rutherford** (1911): descubre el **núcleo** (positivo, pequeño y masivo); el átomo es casi vacío.",
        "**Bohr** (1913): los electrones giran en **órbitas** con energía definida. El modelo actual (cuántico) usa probabilidades.",
      ] },
    ]),
    pick("check1", "Descubrir el núcleo", "¿Qué científico descubrió el núcleo atómico?",
      "Rutherford",
      [["Dalton", "Propuso átomos macizos."], ["Thomson", "Descubrió el electrón."], ["Bohr", "Propuso las órbitas."]],
      "El experimento de la lámina de oro de Rutherford reveló que la carga positiva está concentrada en un núcleo.",
    ),
    pick("check2", "Partículas que rebotan", "En el experimento de Rutherford, ¿qué indica que unas pocas partículas rebotaran?",
      "Que hay una zona muy pequeña, densa y positiva en el átomo",
      [["Que el átomo es una esfera maciza", "Entonces no atravesarían la lámina."], ["Que los electrones son muy pesados", "Son muy ligeros."], ["Que el oro es radiactivo", "No tiene que ver."]],
      "Solo una zona pequeña y positiva (el núcleo) puede repeler y devolver las partículas alfa.",
    ),
    sort("clasifica", "¿Quién propuso qué?", "Asocia cada idea con el modelo.",
      [["dal", "Dalton", "cobalt"], ["tho", "Thomson", "amber"], ["rut", "Rutherford", "emerald"], ["boh", "Bohr", "rose"]],
      [["Átomo macizo e indivisible", "dal"], ["Esfera sólida distinta para cada elemento", "dal"], ["Electrones incrustados en una esfera positiva", "tho"], ["Modelo del pudin de pasas", "tho"], ["Núcleo pequeño y electrones alrededor", "rut"], ["Átomo casi vacío", "rut"], ["Electrones en órbitas con energía definida", "boh"], ["Capas electrónicas", "boh"]],
      "Cada modelo añade una idea nueva sobre el átomo.",
    ),
  ],
};
