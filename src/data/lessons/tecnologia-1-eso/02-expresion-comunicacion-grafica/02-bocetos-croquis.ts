import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort } from "@/data/lessons/tec1-helpers";

export const bocetosCroquisLesson: InteractiveLesson = {
  slug: "bocetos-croquis",
  title: "2. Bocetos y croquis",
  subtitle: TECESO1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("tres", "De la idea al documento de fabricación", [
      { kind: "text", text: "Un objeto se dibuja de formas distintas según el momento del proyecto. Las tres más habituales son el boceto, el croquis y el plano." },
    ], anim("boceto-croquis-plano"), "text-top"),
    slide("comparar", "Boceto y croquis", [
      { kind: "compare",
        left: { title: "Boceto", text: "Dibujo **rápido y a mano alzada**. Sirve para **pensar**: se prueban varias ideas, sin medidas y sin borrar demasiado.", tone: "info" },
        right: { title: "Croquis", text: "Dibujo a mano alzada, pero **proporcionado y acotado**. Sirve para **comunicar** o tomar los datos de un objeto real.", tone: "key" } },
      { kind: "warning", title: "Ojo", text: "A mano alzada no significa mal hecho: las proporciones deben ser razonables y las líneas, claras. Un boceto confuso no ayuda a nadie." },
    ]),
    slide("croquis-pasos", "Cómo se hace un croquis", [
      { kind: "steps", items: [
        "**Observa** el objeto y decide desde qué lado se ve mejor.",
        "**Encaja**: dibuja primero el rectángulo que lo contiene, con líneas muy finas.",
        "**Divide** en partes y sitúa los detalles (agujeros, salientes) manteniendo las proporciones.",
        "**Define** el contorno con trazo más firme.",
        "**Acota**: mide con regla o calibre y escribe las cotas.",
      ] },
      { kind: "text", text: "Para controlar las proporciones, dibuja sobre papel cuadriculado: cada cuadrado es una unidad de medida." },
    ]),
    sort("clasifica-dibujo", "¿Boceto, croquis o plano?", "Relaciona cada situación con el tipo de dibujo más adecuado.",
      [["boc", "Boceto", "amber"], ["cro", "Croquis", "emerald"], ["pla", "Plano", "cobalt"]],
      [["Probar cuatro formas distintas para un soporte de móvil", "boc"], ["Anotar ideas rápidas durante una lluvia de ideas", "boc"], ["Medir una pieza rota para encargar una igual", "cro"], ["Explicar una idea con medidas aproximadas", "cro"], ["Entregar a un taller el diseño definitivo a escala", "pla"], ["Fabricar en serie una pieza con tolerancias", "pla"]],
      "El boceto explora ideas; el croquis comunica con medidas a mano; el plano es el documento final, hecho con instrumentos y normas.",
    ),
    pick("check-boceto", "Qué debe tener un boceto", "Estás en la fase de diseño y todavía no sabes qué forma tendrá el soporte. ¿Qué haces?",
      "Dibujar varios bocetos rápidos a mano alzada, sin medidas, y elegir el mejor",
      [["Hacer un plano a escala con todas las cotas", "Es demasiado pronto: aún no sabes qué diseño elegir."], ["Empezar a cortar la madera", "Falta diseñar y planificar antes de construir."], ["Esperar a que alguien lo dibuje", "El boceto es una herramienta personal para pensar."]],
      "En la fase de diseño se exploran ideas con bocetos; el plano llega cuando el diseño ya está decidido.",
    ),
    pick("check-croquis", "Tomar datos de una pieza", "Se te ha roto la tapa de una caja y quieres encargar otra igual. ¿Qué dibujo haces primero?",
      "Un croquis acotado de la tapa, con las medidas tomadas con una regla",
      [["Un boceto sin medidas", "Sin medidas no se puede fabricar una igual."], ["Un plano con instrumentos y escala", "Primero necesitas tomar las medidas; el plano se hace después a partir del croquis."], ["Ninguno: basta una foto", "Una foto no da las medidas reales."]],
      "El croquis recoge las medidas de un objeto real para poder reproducirlo.",
    ),
  ],
};
