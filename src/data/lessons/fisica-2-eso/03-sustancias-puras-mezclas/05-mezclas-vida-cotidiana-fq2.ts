import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const mezclasVidaCotidianaFq2Lesson: InteractiveLesson = {
  slug: "mezclas-vida-cotidiana-fq2",
  title: "5. Mezclas en la vida cotidiana y la industria",
  subtitle: FQ2_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Mezclas por todas partes", [
      { kind: "steps", items: [
        "Casi todo lo que nos rodea son **mezclas**: el aire, el agua del grifo, la leche, las rocas, las aleaciones de las joyas…",
        "En la industria se **fabrican mezclas** con propiedades útiles: las **aleaciones** (acero, bronce, latón), el hormigón, las pinturas…",
        "También se **separan** mezclas para obtener productos: la sal del mar, el petróleo refinado, el agua potable.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Composición de una mezcla", [
      { kind: "text", text: "Elige una mezcla y la masa de la muestra. Mira cuántos gramos hay de cada componente." },
    ], tool("fq2-composicion-mezclas-explorador"), "visual-top"),
    slide("ejemplos", "Ejemplos importantes", [
      { kind: "steps", items: [
        "**Aire**: mezcla de gases, aproximadamente un 78 % de nitrógeno y un 21 % de oxígeno.",
        "**Aleaciones**: mezclas homogéneas de metales; el **bronce** (cobre y estaño) es más duro que el cobre solo.",
        "**Potabilización del agua**: filtración, decantación, desinfección con cloro…",
        "**Reciclaje**: se separan los materiales (vidrio, papel, metales, plásticos) para volver a usarlos y **ahorrar recursos**.",
      ] },
    ]),
    calc("calc-aire", "Oxígeno en el aire", "En 200 L de aire hay un 21 % de oxígeno. ¿Cuántos litros de oxígeno hay?", nums(42), "200 · 21 / 100 = 42 L.", "Calcula el 21 % de 200."),
    calc("calc-bronce", "Cobre del bronce", "Una estatua de bronce de 500 g tiene un 88 % de cobre. ¿Cuántos gramos de cobre contiene?", nums(440), "500 · 88 / 100 = 440 g.", "Calcula el 88 % de 500."),
    calc("calc-oro", "Oro de 18 quilates", "El oro de 18 quilates tiene 18 partes de 24 de oro. ¿Qué % de oro es?", nums(75), "18 / 24 · 100 = 75 %.", "Divide 18 entre 24."),
    sort("clasifica", "¿Qué mezcla es?", "Clasifica cada mezcla.",
      [["hom", "Homogénea", "cobalt"], ["het", "Heterogénea", "amber"]],
      [["Aire", "hom"], ["Bronce", "hom"], ["Agua de mar", "hom"], ["Hormigón", "het"], ["Una pizza", "het"], ["Agua con aceite", "het"]],
      "En las homogéneas no se distinguen los componentes.",
    ),
    pick("check", "Por qué reciclar", "¿Qué ventaja tiene separar y reciclar los materiales de los residuos?",
      "Se ahorran materias primas y energía y se reduce la basura",
      [["Ninguna, es más caro siempre", "El reciclaje ahorra recursos."], ["Solo se obtiene más espacio en casa", "Hay beneficios ambientales."], ["Se crean nuevos elementos químicos", "No se crean elementos."]],
      "Reutilizar los materiales reduce la extracción de recursos y los residuos.",
    ),
  ],
};
