import type { InteractiveLesson } from "@/lib/lesson/types";
import { FQ2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const cambiosDeEstadoFq2Lesson: InteractiveLesson = {
  slug: "cambios-de-estado-fq2",
  title: "4. Los cambios de estado",
  subtitle: FQ2_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Pasar de un estado a otro", [
      { kind: "steps", items: [
        "Un **cambio de estado** es el paso de una sustancia de un estado de agregación a otro.",
        "Es un cambio **físico**: la sustancia **sigue siendo la misma** (el hielo y el vapor son agua).",
        "Ocurre al **aportar o quitar energía** (calor), o al cambiar la **presión**.",
        "Cuando se **aporta** energía las partículas se **separan**; cuando se **quita**, se **acercan**.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Los seis cambios", [
      { kind: "text", text: "Elige un cambio de estado y observa el paso y si la sustancia absorbe o desprende energía." },
    ], tool("fq2-cambios-estado-explorador"), "visual-top"),
    slide("nombres", "Cómo se llaman", [
      { kind: "steps", items: [
        "**Fusión** (sólido → líquido), **vaporización** (líquido → gas), **sublimación** (sólido → gas): **absorben** energía.",
        "**Solidificación** (líquido → sólido), **condensación** (gas → líquido), **sublimación inversa** (gas → sólido): **desprenden** energía.",
        "La **vaporización** puede ser **evaporación** (solo en la superficie, a cualquier temperatura) o **ebullición** (en todo el líquido, a la temperatura de ebullición).",
        "Ejemplos de **sublimación**: la naftalina, el hielo seco o el yodo.",
      ] },
    ]),
    calc("calc-pf", "Fusión del agua", "A la presión normal, ¿a qué temperatura funde el hielo, en °C?", nums(0), "El punto de fusión del agua es 0 °C.", "Es la temperatura a la que el hielo se convierte en agua."),
    calc("calc-pe", "Ebullición del agua", "A la presión normal, ¿a qué temperatura hierve el agua, en °C?", nums(100), "El punto de ebullición del agua es 100 °C.", "Es la temperatura de la ebullición."),
    sort("clasifica", "¿Absorbe o desprende energía?", "Clasifica cada cambio.",
      [["abs", "Absorbe energía", "cobalt"], ["des", "Desprende energía", "amber"]],
      [["Fusión del hielo", "abs"], ["Evaporación del agua", "abs"], ["Sublimación del hielo seco", "abs"], ["Congelación del agua", "des"], ["Condensación del vapor en un cristal frío", "des"], ["Formación de escarcha", "des"]],
      "Para separar partículas hace falta energía; al acercarlas se desprende.",
    ),
    pick("check", "Evaporación y ebullición", "¿Cuál es la diferencia entre evaporación y ebullición?",
      "La evaporación ocurre solo en la superficie y a cualquier temperatura",
      [["Son exactamente lo mismo", "Hay diferencias."], ["La ebullición solo ocurre en la superficie", "Ocurre en todo el líquido."], ["La evaporación necesita 100 °C", "Puede ocurrir a cualquier temperatura."]],
      "En la ebullición se forman burbujas en todo el líquido a la temperatura de ebullición.",
    ),
  ],
};
