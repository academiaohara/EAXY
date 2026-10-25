import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const polimerosPlasticosTecnicosLesson: InteractiveLesson = {
  slug: "polimeros-plasticos-tecnicos",
  title: "7. Polímeros y plásticos",
  subtitle: TEC1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("intro", "Moléculas muy largas", [
      { kind: "definition", text: "Un **polímero** es un material formado por cadenas muy largas (macromoléculas) que resultan de unir muchas unidades pequeñas, los **monómeros**." },
      { kind: "steps", title: "Tres grandes grupos", items: [
        "**Termoplásticos**: cadenas independientes; se reblandecen con el calor y se pueden reciclar (PE, PP, PVC, PET).",
        "**Termoestables**: red de enlaces cruzados; no se funden de nuevo (epoxi, baquelita, poliéster).",
        "**Elastómeros**: pocos enlaces cruzados y cadenas enrolladas; se estiran mucho y recuperan la forma (caucho, silicona).",
      ] },
    ], anim("polimero-cadenas"), "split"),
    slide("explora", "Un polímero frente a la temperatura", [
      { kind: "text", text: "Cambia el tipo y sube la temperatura: observa cuándo se reblandece, cuándo se degrada y cuál se puede reciclar por fusión." },
    ], tool("polimero-temperatura-explorador", { n: 0 }), "visual-top"),
    slide("procesado", "Cómo se procesan", [
      { kind: "steps", items: [
        "**Inyección**: plástico fundido a presión en un molde (tapones, carcasas, juguetes).",
        "**Extrusión**: se empuja por una boquilla para obtener tubos, perfiles y láminas.",
        "**Soplado**: se infla un tubo caliente dentro de un molde (botellas).",
        "**Termoconformado**: se calienta una lámina y se adapta a un molde con vacío (envases).",
        "**Moldeo por compresión**: típico de termoestables, que curan en el molde.",
      ] },
    ]),
    slide("reciclaje", "Reutilización y reciclaje", [
      { kind: "compare",
        left: { title: "Termoplástico", text: "Se funde y se vuelve a moldear. Cada ciclo puede degradar algo las cadenas y limitar usos.", tone: "ok" },
        right: { title: "Termoestable", text: "No se funde: se tritura como carga, se valoriza energéticamente o se reutiliza. Reciclar es difícil.", tone: "warn" } },
      { kind: "text", text: "Los **códigos de reciclaje** (1 PET, 2 HDPE, 3 PVC, 4 LDPE, 5 PP, 6 PS) identifican el polímero para separarlos correctamente." },
    ]),
    sort("clasifica-pol", "Tipo de polímero", "Clasifica cada material.",
      [["tp", "Termoplástico", "cobalt"], ["te", "Termoestable", "amber"], ["el", "Elastómero", "emerald"]],
      [["Polietileno", "tp"], ["PVC", "tp"], ["Resina epoxi", "te"], ["Baquelita", "te"], ["Caucho natural", "el"], ["Silicona", "el"]],
      "Los termoplásticos se reblandecen; los termoestables se endurecen de forma irreversible; los elastómeros se estiran y recuperan.",
    ),
    pick("check-uso", "Plástico para el uso", "Una carcasa de enchufe debe aguantar calor sin deformarse y no se va a reciclar por fusión. ¿Qué tipo de polímero encaja mejor?",
      "Un termoestable, como la baquelita",
      [["Un termoplástico de bajo punto de fusión", "Se reblandecería con el calor."], ["Un elastómero", "Su elasticidad no es lo que se busca en una carcasa rígida."], ["Cualquier plástico: todos son iguales", "Las propiedades térmicas dependen del tipo de polímero."]],
      "La red de enlaces cruzados mantiene la rigidez y la forma con el calor, a costa de no poder refundirse.",
    ),
    pick("check-reciclaje", "Reciclar o no", "¿Por qué una botella de PET se recicla con más facilidad que un mango de baquelita?",
      "Porque el PET es termoplástico y se puede fundir de nuevo",
      [["Porque es más barato", "El motivo es estructural, no económico."], ["Porque es de color transparente", "El color influye en el valor del reciclado, no en que se pueda fundir."], ["Porque la baquelita no es un plástico", "La baquelita es un polímero termoestable."]],
      "Los termoplásticos se reblandecen al calentarse, por lo que se pueden remoldear. Los termoestables no.",
    ),
  ],
};
