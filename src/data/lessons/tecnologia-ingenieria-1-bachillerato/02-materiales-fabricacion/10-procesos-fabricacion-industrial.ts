import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const procesosFabricacionIndustrialLesson: InteractiveLesson = {
  slug: "procesos-fabricacion-industrial",
  title: "10. Procesos de fabricación industrial",
  subtitle: TEC1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("mapa", "Dar forma: tres estrategias", [
      { kind: "steps", items: [
        "**Conformado sin pérdida de material**: fundición y moldeo, forja, laminación, extrusión, estampación, doblado.",
        "**Mecanizado por arranque de viruta**: torneado, fresado, taladrado, rectificado. Se parte de un bloque y se quita material.",
        "**Unión**: soldadura, remachado, atornillado, pegado. Se ensamblan piezas ya fabricadas.",
      ] },
      { kind: "text", text: "Cada proceso es adecuado para ciertas **geometrías**, **materiales** y **volúmenes** de producción." },
    ], anim("conformado-procesos"), "split"),
    slide("mecanizado", "Mecanizado", [
      { kind: "compare",
        left: { title: "Ventajas", text: "Alta precisión y buen acabado. Sin molde: sirve para series pequeñas y prototipos.", tone: "ok" },
        right: { title: "Inconvenientes", text: "Desperdicia material en forma de viruta, tarda más y cuesta más por pieza en series grandes.", tone: "warn" } },
      { kind: "steps", title: "Operaciones típicas", items: [
        "**Torneado**: la pieza gira y la herramienta avanza (ejes, casquillos).",
        "**Fresado**: la herramienta gira y la pieza avanza (ranuras, planos, formas).",
        "**Taladrado**: agujeros con broca.",
        "**Rectificado**: abrasión para tolerancias muy finas.",
      ] },
    ]),
    slide("seleccion", "Elegir el proceso según la tirada", [
      { kind: "text", text: "Los procesos con molde caro tienen un coste por pieza muy bajo, pero solo salen rentables si se fabrican muchas piezas. Mueve la tirada y mira dónde cambia el proceso más barato." },
    ], tool("proceso-coste-explorador", { a: 2 }), "visual-top"),
    slide("union", "Procesos de unión", [
      { kind: "compare",
        left: { title: "Permanentes", text: "Soldadura, remachado, pegado: no se pueden desmontar sin dañar las piezas.", tone: "warn" },
        right: { title: "Desmontables", text: "Tornillos, pasadores, ajuste a presión: permiten mantenimiento y reparación.", tone: "ok" } },
      { kind: "text", text: "Para economía circular conviene **diseñar para desmontar**: favorecer uniones desmontables y reducir la variedad de materiales." },
    ]),
    calc("calc-coste", "Coste por pieza", "Un molde de fundición cuesta $2\\,500$ € y cada pieza cuesta $6$ € de material y trabajo. Si se fabrican $500$ piezas, ¿cuánto cuesta cada una, en euros?",
      nums(11), "$2500/500 = 5$ € de molde por pieza, más $6$ € variables: $11$ € por pieza.", "Reparte el coste fijo entre el número de piezas."),
    sort("clasifica-proceso", "Familia de proceso", "Clasifica cada operación.",
      [["conf", "Conformado", "cobalt"], ["mec", "Mecanizado", "amber"], ["uni", "Unión", "emerald"]],
      [["Laminación de una chapa", "conf"], ["Forja de una biela", "conf"], ["Fundición en molde", "conf"], ["Torneado de un eje", "mec"], ["Fresado de una ranura", "mec"], ["Taladrado", "mec"], ["Soldadura", "uni"], ["Remachado", "uni"]],
      "El conformado da forma sin arrancar material; el mecanizado lo arranca en forma de viruta; la unión combina piezas ya hechas.",
    ),
    pick("check-orden", "Orden de fabricación", "Quieres fabricar un eje de acero con rosca. ¿Qué secuencia es lógica?",
      "Corte de barra, torneado, roscado y tratamiento térmico final",
      [["Tratamiento térmico, torneado y corte de barra", "Mecanizar después de templar es mucho más difícil y a veces imposible."], ["Roscado, corte de barra y torneado", "No se rosca antes de dar la forma básica."], ["Pintura, torneado y roscado", "La pintura es lo último; se estropearía al mecanizar."]],
      "Se prepara el material, se da forma, se mecanizan los detalles y se hacen los tratamientos y acabados finales.",
    ),
    pick("check-proceso", "Elegir un proceso", "Necesitas 5 piezas metálicas de geometría muy compleja para una exposición. ¿Qué es más razonable?",
      "Mecanizado CNC o impresión 3D metálica, porque no compensan un molde para tan pocas piezas",
      [["Fundición a presión con molde de acero", "El molde costaría mucho más que el resto del proyecto."], ["Forja con matriz especial", "También exige utillaje caro."], ["Laminación", "Produce chapas o perfiles, no piezas complejas."]],
      "Con pocas unidades el coste fijo del utillaje domina; los procesos flexibles ganan.",
    ),
  ],
};
