import type { InteractiveLesson } from "@/lib/lesson/types";
import { FB1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const reactividadEstructuraElectronicaFb1Lesson: InteractiveLesson = {
  slug: "reactividad-estructura-electronica-fb1",
  title: "3. Reactividad y estructura electrónica",
  subtitle: FB1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("octeto", "Estabilidad y octeto", [
      { kind: "steps", items: [
        "Los **gases nobles** (ns² np⁶; el He, 1s²) son muy estables y poco reactivos: tienen la **capa de valencia completa**.",
        "Los demás elementos **reaccionan** para alcanzar una configuración de gas noble: **regla del octeto** (8 electrones en la última capa; 2 para el H, Li y Be).",
        "Los **metales** lo logran **perdiendo** electrones (cationes); los **no metales**, **ganando** o **compartiendo** electrones.",
        "El **número de electrones de valencia** determina la carga del ion y los enlaces que forma.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Del átomo al ion", [
      { kind: "text", text: "Elige un elemento. ¿Qué ion forma? ¿Cómo es su óxido? Relaciónalo con su posición en la tabla." },
    ], tool("fb1-reactividad-explorador"), "visual-top"),
    slide("iones", "Iones y óxidos", [
      { kind: "steps", items: [
        "Cargas típicas: grupo 1 → **+1**; grupo 2 → **+2**; grupo 13 → **+3**; grupo 15 → **−3**; grupo 16 → **−2**; grupo 17 → **−1**. (Metales de transición: varias cargas.)",
        "Los **óxidos de metales** son **básicos** (con agua dan hidróxidos); los de **no metales**, **ácidos** (dan oxoácidos); los del **Al** y algunos semimetales, **anfóteros**.",
        "Ejemplos: Na₂O + H₂O → 2 NaOH (básico); CO₂ + H₂O → H₂CO₃ (ácido); Al₂O₃ reacciona con ácidos y con bases.",
        "En un grupo, los óxidos son **más básicos** al bajar.",
      ] },
    ], undefined, "stack"),
    slide("reac", "Reactividad en grupos", [
      { kind: "steps", items: [
        "**Alcalinos** (Li, Na, K, Rb, Cs): reaccionan violentamente con el agua, y **más** cuanto más abajo, porque la **energía de ionización disminuye**.",
        "**Halógenos** (F, Cl, Br, I): oxidantes fuertes; reaccionan **menos** cuanto más abajo, porque la **electronegatividad y la afinidad disminuyen**. Un halógeno desplaza al de abajo: Cl₂ + 2 NaBr → 2 NaCl + Br₂.",
        "**Alcalinotérreos**: menos reactivos que los alcalinos del mismo periodo, y más reactivos al bajar (Mg < Ca < Ba).",
      ] },
    ], undefined, "stack"),
    calc("calc-ion", "Carga del ion", "El azufre (grupo 16) forma un anión. ¿Cuál es su carga? (escribe el número con signo)", nums(-2), "Gana 2 electrones para tener 8 en la capa de valencia: S²⁻.", "Le faltan 2 para el octeto."),
    calc("calc-ve", "Electrones de valencia", "¿Cuántos electrones de valencia tiene un elemento del grupo 15?", nums(5), "Grupo 15 → ns² np³: 5 electrones.", "Grupo 12 + e⁻ en p → p = 3."),
    calc("calc-cat", "Catión de un metal", "El aluminio (grupo 13) forma un catión. ¿Cuál es su carga?", nums(3), "Pierde 3 electrones: Al³⁺.", "Tiene 3 electrones de valencia."),
    sort("clasifica", "Metal o no metal", "Clasifica según el carácter del óxido que forma.",
      [["bas", "Óxido básico (metal)", "cobalt"], ["aci", "Óxido ácido (no metal)", "rose"]],
      [["Na₂O", "bas"], ["CaO", "bas"], ["MgO", "bas"], ["CO₂", "aci"], ["SO₃", "aci"], ["N₂O₅", "aci"]],
      "Los metales dan óxidos básicos; los no metales, ácidos.",
    ),
    pick("check", "Reactividad de los alcalinos", "¿Por qué el potasio reacciona con el agua más violentamente que el sodio?",
      "Porque tiene menor energía de ionización: pierde el electrón con más facilidad",
      [["Porque tiene más electrones de valencia", "Ambos tienen un electrón de valencia."], ["Porque su radio es menor", "Su radio es mayor."], ["Porque es más electronegativo", "Es menos electronegativo."]],
      "El electrón externo está más lejos del núcleo y se arranca antes.",
    ),
  ],
};
