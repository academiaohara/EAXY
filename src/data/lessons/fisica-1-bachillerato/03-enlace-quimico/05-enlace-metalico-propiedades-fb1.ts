import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const enlaceMetalicoPropiedadesFb1Lesson: InteractiveLesson = {
  slug: "enlace-metalico-propiedades-fb1",
  title: "5. Enlace metálico y propiedades de las sustancias",
  subtitle: FB1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("modelo", "El modelo del mar de electrones", [
      { kind: "steps", items: [
        "Los **metales** tienen pocos electrones de valencia y baja energía de ionización: los ceden a un **mar de electrones deslocalizados**.",
        "El enlace es la atracción entre los **cationes** de la red y el **mar de electrones**; no es direccional.",
        "La **teoría de bandas** lo refina: los orbitales atómicos se combinan en **bandas** de energía casi continuas; en los metales la banda de valencia está parcialmente llena o solapa con la de conducción.",
      ] },
    ], anim("fb1-mar-electrones"), "visual-top"),
    slide("prop", "Propiedades de los metales", [
      { kind: "steps", items: [
        "**Conductividad** eléctrica y térmica altas, por la movilidad de los electrones. En los metales, **disminuye al subir la temperatura**; en los semiconductores, aumenta.",
        "**Maleables y dúctiles**: se pueden laminar y estirar en hilos sin romperse.",
        "**Brillo metálico** y opacos: los electrones libres interaccionan con la luz.",
        "**Temperaturas de fusión** muy variables: baja en los alcalinos (Na 98 °C), alta en los de transición (W 3422 °C): a más electrones de valencia y menor radio, más fuerte es el enlace.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Compara los cuatro tipos de sólidos", [
      { kind: "text", text: "Elige distintas sustancias y relaciona su tipo de enlace con la conductividad, la dureza y la temperatura de fusión." },
    ], tool("fb1-sustancias-explorador"), "visual-top"),
    slide("resumen", "Resumen: de la fórmula a las propiedades", [
      { kind: "steps", items: [
        "**Metal + no metal** → sólido **iónico**. **Metal + metal** (o solo metal) → **metálico**. **No metal + no metal** → **covalente**: **molecular** si forma moléculas discretas, **reticular** si forma una red (C, Si, SiO₂).",
        "Las **temperaturas de fusión**, de menor a mayor: moleculares apolares < moleculares polares < moleculares con enlace de H < metálicos (blandos) < iónicos < metálicos de transición < reticulares.",
        "**Conductividad**: solo los metales (y el grafito) conducen en estado sólido; los iónicos, fundidos o disueltos.",
        "**Solubilidad**: iónicos y polares, en agua; apolares, en disolventes apolares; metales y reticulares, en ninguno.",
      ] },
    ], undefined, "stack"),
    calc("calc-cuantos", "Tipos de sólidos", "¿Cuántos tipos de sólidos se distinguen según el tipo de enlace? (iónico, metálico, covalente reticular y covalente molecular)", nums(4), "Son cuatro tipos.", "Cuéntalos."),
    calc("calc-cond", "Conducción", "Un sólido no conduce la electricidad en estado sólido pero sí fundido. ¿Qué tipo de enlace tiene? Escribe 1 si es iónico, 2 si metálico, 3 si covalente molecular.", nums(1), "Iones fijos en el sólido y móviles al fundir: iónico.", "Solo los iónicos."),
    calc("calc-fu", "Tf comparada", "El NaCl funde a 801 °C y el Na a 98 °C. ¿Cuántos grados más alta es la temperatura de fusión del NaCl?", nums(703), "801 − 98 = 703 °C.", "Resta."),
    sort("clasifica", "Tipo de sustancia", "Clasifica según su tipo de enlace.",
      [["ion", "Iónica", "rose"], ["met", "Metálica", "cobalt"], ["ret", "Covalente reticular", "emerald"], ["mol", "Covalente molecular", "amber"]],
      [["KBr", "ion"], ["Fe", "met"], ["SiO₂", "ret"], ["H₂O", "mol"], ["Diamante", "ret"], ["I₂", "mol"], ["Cu", "met"], ["MgO", "ion"]],
      "Metal + no metal: iónica; solo metales: metálica; redes de no metales: reticular; moléculas: molecular.",
    ),
    pick("check", "Maleabilidad", "¿Por qué un metal se puede laminar sin romperse y un cristal iónico no?",
      "En el metal, el mar de electrones mantiene la cohesión al deslizarse las capas; en el iónico se enfrentan cargas iguales",
      [["Porque el metal tiene enlaces covalentes", "Tiene enlace metálico."], ["Porque el cristal iónico es líquido", "Es sólido."], ["Porque el metal es menos denso", "No tiene relación."]],
      "El enlace metálico no es direccional y se mantiene al desplazar las capas.",
    ),
  ],
};
