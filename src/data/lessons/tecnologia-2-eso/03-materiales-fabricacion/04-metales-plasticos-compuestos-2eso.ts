import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const metalesPlasticosCompuestos2esoLesson: InteractiveLesson = {
  slug: "metales-plasticos-compuestos-2eso",
  title: "4. Metales, plásticos y materiales compuestos",
  subtitle: TECESO2_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("metales", "Metales y aleaciones", [
      { kind: "steps", items: [
        "**Férricos** (con hierro): **acero** (hierro con poco carbono; resistente) y **fundición** (más carbono; frágil, se moldea).",
        "**No férricos**: **aluminio** (ligero), **cobre** (conductor), **zinc**, **estaño**.",
        "**Aleaciones**: mezclas de metales que mejoran las propiedades: **latón** (cobre + zinc), **bronce** (cobre + estaño).",
      ] },
    ], undefined, "stack"),
    slide("alea", "Por qué se mezclan", [
      { kind: "text", text: "Los átomos distintos dificultan el deslizamiento de las capas: la aleación es más dura que los metales por separado." },
    ], anim("aleacion-mezcla"), "text-top"),
    slide("plasticos", "Plásticos", [
      { kind: "steps", items: [
        "**Termoplásticos** (PET, PVC, PE, PLA): se **ablandan con calor** y se pueden volver a moldear; reciclables.",
        "**Termoestables** (baquelita, melamina, resinas epoxi): se endurecen al calentar y **ya no se funden**.",
        "**Elastómeros** (caucho, silicona): recuperan su forma tras estirarse.",
      ] },
    ]),
    slide("calor", "El plástico y el calor", [
      { kind: "text", text: "Mira cómo cambia el estado de cada tipo de plástico con la temperatura." },
    ], tool("plastico-calor-explorador"), "visual-top"),
    slide("comp", "Materiales compuestos", [
      { kind: "definition", text: "Un **material compuesto** combina dos o más materiales para sumar sus ventajas: una **matriz** (resina) y un **refuerzo** (fibras). La **fibra de vidrio** y la **fibra de carbono** son ligeros y muy resistentes; el **hormigón armado** une hormigón y acero." },
    ]),
    calc("calc-latón", "Composición de una aleación", "Una pieza de latón de 500 g tiene un 60 % de cobre. ¿Cuántos gramos de cobre contiene?", nums(300), "500 · 0,60 = 300 g.", "Porcentaje por masa total."),
    sort("clasifica-metal", "Férrico o no férrico", "Clasifica cada material metálico.",
      [["fer", "Férrico", "cobalt"], ["nof", "No férrico", "amber"]],
      [["Acero", "fer"], ["Fundición", "fer"], ["Aluminio", "nof"], ["Cobre", "nof"], ["Latón", "nof"], ["Bronce", "nof"]],
      "Los férricos contienen hierro como elemento principal.",
    ),
    sort("clasifica-plastico", "Termoplástico o termoestable", "Clasifica cada plástico.",
      [["tpl", "Termoplástico", "emerald"], ["tes", "Termoestable", "rose"]],
      [["PET de una botella", "tpl"], ["PVC de una tubería", "tpl"], ["PLA de la impresión 3D", "tpl"], ["Baquelita", "tes"], ["Melamina de una encimera", "tes"], ["Resina epoxi endurecida", "tes"]],
      "Los termoplásticos se pueden fundir de nuevo; los termoestables no.",
    ),
    pick("check-compuesto", "Por qué un compuesto", "¿Por qué se fabrican piezas de fibra de carbono para bicicletas de competición?",
      "Porque combinan ligereza y gran resistencia",
      [["Porque es el material más barato", "Es caro."], ["Porque es más pesado que el acero", "Es mucho más ligero."], ["Porque se funde fácilmente", "Es termoestable y no se funde de nuevo."]],
      "La resina aporta forma y las fibras aportan resistencia: así se obtiene un material ligero y fuerte.",
    ),
  ],
};
