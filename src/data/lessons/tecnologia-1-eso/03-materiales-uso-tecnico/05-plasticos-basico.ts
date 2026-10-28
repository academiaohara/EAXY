import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const plasticosBasicoLesson: InteractiveLesson = {
  slug: "plasticos-basico",
  title: "5. Los plásticos",
  subtitle: TECESO1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Materiales hechos de cadenas", [
      { kind: "definition", text: "Los **plásticos** son materiales formados por cadenas muy largas de moléculas (**polímeros**). La mayoría se obtienen del **petróleo**, un recurso fósil y limitado." },
      { kind: "steps", items: [
        "**Ligeros**, baratos y fáciles de moldear en cualquier forma.",
        "**Aislantes** de la electricidad y del calor.",
        "**Impermeables** y resistentes a la corrosión.",
        "**Problema**: tardan cientos de años en degradarse y contaminan si acaban en el medio ambiente.",
      ] },
    ], undefined, "stack"),
    slide("tipos", "Tres familias de plásticos", [
      { kind: "steps", items: [
        "**Termoplásticos**: se reblandecen con calor y se pueden **moldear de nuevo**; se reciclan por fusión. PET, polietileno, PVC.",
        "**Termoestables**: una vez moldeados no se ablandan: al calentarlos se **queman**. Baquelita, resina epoxi.",
        "**Elastómeros**: se **estiran** y recuperan su forma. Caucho, silicona, neopreno.",
      ] },
      { kind: "text", text: "La diferencia está en cómo se unen sus cadenas: en el termoplástico están libres y deslizan; en el termoestable están enlazadas en una red." },
    ]),
    slide("cadenas", "Qué ocurre dentro del plástico", [
      { kind: "text", text: "Compara qué hace el calor sobre un termoplástico y sobre un termoestable." },
    ], anim("polimero-cadenas"), "split"),
    slide("calor", "Sube la temperatura", [
      { kind: "text", text: "Elige un tipo de plástico, sube la temperatura y observa si se puede volver a moldear." },
    ], tool("plastico-calor-explorador", { n: 0 }), "visual-top"),
    sort("clasifica-plastico", "¿Qué tipo de plástico es?", "Relaciona cada objeto con el tipo de plástico más probable.",
      [["tp", "Termoplástico", "cobalt"], ["te", "Termoestable", "amber"], ["el", "Elastómero", "emerald"]],
      [["Botella de agua (PET)", "tp"], ["Tubería de PVC", "tp"], ["Mango de una sartén (baquelita)", "te"], ["Enchufe antiguo", "te"], ["Suela de goma", "el"], ["Neumático", "el"]],
      "La botella y la tubería se pueden fundir y reciclar; la baquelita, no; la goma y el caucho se estiran y recuperan su forma.",
    ),
    pick("check-reciclar", "Plástico reciclable por fusión", "¿Qué tipo de plástico se puede fundir y reutilizar fácilmente?",
      "El termoplástico, porque se ablanda al calentarlo",
      [["El termoestable, porque se funde bien", "No se funde: al calentarlo se quema."], ["Ninguno puede reciclarse", "Los termoplásticos se reciclan en gran medida."], ["Solo los elastómeros", "Los elastómeros recuperan su forma, pero no se funden de nuevo con facilidad."]],
      "Al calentar un termoplástico sus cadenas deslizan: se puede fundir y volver a moldear.",
    ),
    pick("check-uso", "Un plástico para un asa de cacerola", "El asa de una cacerola debe aguantar el calor del fuego sin ablandarse. ¿Qué tipo de plástico conviene?",
      "Termoestable, porque no se ablanda con el calor",
      [["Termoplástico de bajo punto de fusión", "Se ablandaría y deformaría con el calor."], ["Elastómero muy elástico", "Una asa debe ser rígida, no elástica."], ["Cualquiera, da igual", "El comportamiento ante el calor es clave en este objeto."]],
      "Cada familia de plásticos resuelve necesidades distintas; las asas de cocina suelen ser termoestables.",
    ),
  ],
};
