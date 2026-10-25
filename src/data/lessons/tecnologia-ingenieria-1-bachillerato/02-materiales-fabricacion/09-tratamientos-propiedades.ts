import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const tratamientosPropiedadesLesson: InteractiveLesson = {
  slug: "tratamientos-propiedades",
  title: "9. Tratamientos y modificación de propiedades",
  subtitle: TEC1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("intro", "Mismo acero, otras propiedades", [
      { kind: "definition", text: "Un **tratamiento térmico** es un ciclo de calentamiento, mantenimiento y enfriamiento que cambia la **microestructura** de un metal sin cambiar su forma ni su composición." },
      { kind: "steps", title: "Cuatro tratamientos básicos del acero", items: [
        "**Recocido**: calentar y enfriar muy despacio (en el horno). Ablanda, elimina tensiones y facilita el mecanizado.",
        "**Normalizado**: calentar y enfriar al aire. Afina el grano y uniformiza.",
        "**Temple**: calentar por encima de la temperatura crítica y enfriar rápido (agua o aceite). Endurece mucho; la pieza queda frágil.",
        "**Revenido**: recalentar una pieza templada a una temperatura intermedia. Reduce fragilidad y dureza, aumenta la tenacidad.",
      ] },
    ], undefined, "stack"),
    slide("simulador", "Comparar el ciclo y el resultado", [
      { kind: "text", text: "Cambia de tratamiento y observa la curva temperatura-tiempo. En el revenido, sube la temperatura y verás caer la dureza. Los valores son **ilustrativos**." },
    ], tool("tratamiento-curva-explorador", { n: 2 }), "visual-top"),
    slide("superficiales", "Tratamientos superficiales y recubrimientos", [
      { kind: "steps", items: [
        "**Cementación y nitruración**: se enriquece la superficie en carbono o nitrógeno para endurecerla y dejar el núcleo tenaz (engranajes, ejes).",
        "**Temple superficial**: solo se calienta y templa la capa externa.",
        "**Galvanizado**: recubrimiento de zinc que protege el acero de la corrosión.",
        "**Anodizado**: capa de óxido de aluminio, dura y decorativa.",
        "**Pintura y cromado**: barrera frente al ambiente y acabado.",
      ] },
      { kind: "text", text: "El objetivo suele ser combinar un **núcleo tenaz** con una **superficie dura** y resistente a la corrosión." },
    ]),
    slide("relacion", "Qué buscas, qué tratamiento", [
      { kind: "compare",
        left: { title: "Quiero ablandar", text: "Recocido (o normalizado, si basta con afinar el grano). Útil antes de mecanizar o conformar.", tone: "info" },
        right: { title: "Quiero endurecer", text: "Temple, seguido de revenido para ganar tenacidad. Cementación si solo la superficie debe ser dura.", tone: "key" } },
      { kind: "warning", title: "Temple sin revenido", text: "Una pieza templada sin revenir es muy dura pero quebradiza: una herramienta puede astillarse en el primer golpe." },
    ]),
    sort("clasifica-trat", "Qué tratamiento aplicar", "Asigna a cada necesidad el tratamiento más adecuado.",
      [["rec", "Recocido", "cobalt"], ["tem", "Temple", "amber"], ["rev", "Revenido", "emerald"], ["gal", "Galvanizado", "violet"]],
      [["Ablandar una chapa antes de embutirla", "rec"], ["Eliminar tensiones de una pieza soldada", "rec"], ["Endurecer una broca", "tem"], ["Hacer muy dura la zona de corte de una cuchilla", "tem"], ["Reducir la fragilidad de una pieza ya templada", "rev"], ["Proteger de la corrosión una valla de acero", "gal"]],
      "El recocido ablanda; el temple endurece; el revenido recupera tenacidad; el galvanizado protege de la corrosión con zinc.",
    ),
    pick("check-temple", "Velocidad de enfriamiento", "¿Qué diferencia hay entre templar y recocer un acero?",
      "La velocidad de enfriamiento: rápida en el temple (martensita dura) y muy lenta en el recocido (estructura blanda)",
      [["La temperatura de partida, que es completamente distinta", "En ambos se calienta por encima de la temperatura crítica; cambia el enfriamiento."], ["Que el temple cambia la composición", "Ningún tratamiento térmico cambia la composición."], ["Que el recocido endurece más", "El recocido ablanda."]],
      "La microestructura final depende de cuánto tiempo se da a los átomos para reordenarse al enfriar.",
    ),
    pick("check-rev", "Después del temple", "Una lima se ha templado y es muy dura, pero se rompe al caerse al suelo. ¿Qué conviene hacerle?",
      "Un revenido a baja temperatura para ganar algo de tenacidad",
      [["Un segundo temple igual", "Seguiría igual de frágil."], ["Pintarla", "La pintura no cambia el comportamiento mecánico."], ["Un recocido completo", "Perdería la dureza que necesita para limar."]],
      "El revenido sacrifica algo de dureza para reducir la fragilidad. En herramientas se usa un revenido suave.",
    ),
  ],
};
