import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const circuitosSerieParaleloEsoLesson: InteractiveLesson = {
  slug: "circuitos-serie-paralelo-eso",
  title: "5. Circuitos en serie y en paralelo",
  subtitle: TECESO1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("def", "Dos formas de conectar receptores", [
      { kind: "compare",
        left: { title: "En serie", text: "Los receptores están **uno a continuación del otro**: hay **un único camino** para la corriente. Si uno falla, todos dejan de funcionar.", tone: "info" },
        right: { title: "En paralelo", text: "Cada receptor está en **su propia rama**: hay **varios caminos**. Si uno falla, los demás siguen funcionando.", tone: "key" } },
    ], undefined, "stack"),
    slide("caminos", "Un camino o varios caminos", [
      { kind: "text", text: "Observa qué pasa cuando se quita una de las dos lámparas en cada montaje." },
    ], anim("serie-paralelo-camino"), "text-top"),
    slide("explora", "Cambia el montaje", [
      { kind: "text", text: "Elige serie o paralelo, cambia el número de lámparas y quita una. Fíjate en cuántas se mantienen encendidas y en la tensión que recibe cada una." },
    ], tool("serie-paralelo-explorador", { n: 0, a: 2 }), "visual-top"),
    slide("comparar", "Qué cambia", [
      { kind: "steps", items: [
        "**Tensión**: en serie, la de la pila se reparte entre las lámparas (cada una recibe menos y luce más débil). En paralelo, todas reciben la tensión completa.",
        "**Funcionamiento**: en serie, si una se funde se apagan todas. En paralelo, solo se apaga la que falla.",
        "**Pila**: en paralelo se gasta antes, porque alimenta varios caminos a la vez.",
        "**Uso real**: las luces de una casa y los enchufes van en paralelo; algunas guirnaldas baratas, en serie.",
      ] },
    ]),
    sort("clasifica-sp", "¿Serie o paralelo?", "Decide qué montaje corresponde a cada situación.",
      [["ser", "Serie", "amber"], ["par", "Paralelo", "cobalt"]],
      [["Si una lámpara se funde, se apagan todas", "ser"], ["La corriente tiene un único camino", "ser"], ["Las luces de una casa", "par"], ["Si una lámpara se funde, las demás siguen", "par"], ["Cada lámpara recibe la tensión completa de la pila", "par"], ["Cada lámpara luce menos al añadir otra", "ser"]],
      "En serie hay un solo camino y la tensión se reparte; en paralelo hay varias ramas y cada receptor recibe toda la tensión.",
    ),
    pick("check-casa", "Las luces de una casa", "En una casa, al fundirse la bombilla del salón las del resto de habitaciones siguen luciendo. ¿Cómo están conectadas?",
      "En paralelo",
      [["En serie", "En serie se apagarían todas a la vez."], ["Mitad en serie y mitad en paralelo con la misma pila", "No es la razón ni el esquema habitual de una instalación doméstica."], ["No están conectadas entre sí", "Comparten la instalación eléctrica, en paralelo."]],
      "Las instalaciones domésticas usan el paralelo para que cada aparato funcione de forma independiente.",
    ),
    pick("check-serie", "Dos bombillas en serie", "Conectas dos bombillas iguales en serie a una pila. ¿Cómo lucen comparadas con una sola bombilla?",
      "Cada una luce menos, porque se reparten la tensión de la pila",
      [["Lucen igual", "Con tensión repartida, lucen menos."], ["Cada una luce más", "Recibe menos tensión, no más."], ["No lucen ninguna", "Con el camino cerrado sí lucen, aunque más débiles."]],
      "En serie la tensión se divide entre los receptores: con dos iguales, cada una recibe la mitad.",
    ),
  ],
};
