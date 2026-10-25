import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const esfuerzosEstructurasLesson: InteractiveLesson = {
  slug: "esfuerzos-estructuras",
  title: "3. Tipos de esfuerzos",
  subtitle: TECESO1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("def", "Los cinco esfuerzos básicos", [
      { kind: "definition", text: "Un **esfuerzo** es la reacción interna de un elemento ante las fuerzas que actúan sobre él. Según la dirección de esas fuerzas, se distinguen cinco tipos." },
      { kind: "steps", items: [
        "**Tracción**: las fuerzas estiran el elemento.",
        "**Compresión**: las fuerzas lo aplastan.",
        "**Flexión**: la carga lo dobla.",
        "**Torsión**: las fuerzas lo retuercen.",
        "**Cortadura**: las fuerzas lo cortan por una sección.",
      ] },
    ], undefined, "stack"),
    slide("anim", "Cinco esfuerzos, cinco ejemplos", [
      { kind: "text", text: "Observa cómo se deforma una barra con cada esfuerzo y qué objetos cotidianos lo soportan." },
    ], anim("esfuerzos-tipos"), "text-top"),
    slide("explora", "Aumenta la carga", [
      { kind: "text", text: "Elige un esfuerzo, aumenta la carga y observa la deformación. Con una carga excesiva el elemento falla." },
    ], tool("esfuerzos-barra-explorador", { n: 2, a: 50 }), "visual-top"),
    sort("clasifica-esf", "¿Qué esfuerzo es?", "Relaciona cada situación con el esfuerzo principal.",
      [["tra", "Tracción", "amber"], ["com", "Compresión", "cobalt"], ["fle", "Flexión", "emerald"], ["tor", "Torsión", "violet"], ["cor", "Cortadura", "rose"]],
      [["Cable de un ascensor", "tra"], ["Cuerda al tirar de un carro", "tra"], ["Pilar de un edificio", "com"], ["Patas de una mesa", "com"], ["Tabla de un trampolín", "fle"], ["Estante con libros", "fle"], ["Destornillador al apretar", "tor"], ["Tijeras al cortar papel", "cor"]],
      "Estirar: tracción. Aplastar: compresión. Doblar: flexión. Retorcer: torsión. Cortar: cortadura.",
    ),
    pick("check-flexion", "La tabla del trampolín", "Cuando alguien se sube a un trampolín, ¿qué ocurre en la parte superior y la inferior de la tabla?",
      "La parte de arriba se comprime y la de abajo se estira",
      [["Las dos partes se comprimen por igual", "Una parte se estira: la flexión provoca los dos esfuerzos a la vez."], ["Las dos partes se estiran por igual", "La parte superior se acorta."], ["No se produce ningún esfuerzo", "Toda carga provoca esfuerzos."]],
      "En la flexión, un lado de la sección se comprime y el contrario se estira; en medio hay una fibra que no cambia.",
    ),
    pick("check-cortadura", "Tornillo de una bisagra", "El tornillo que sujeta una puerta a su bisagra sufre sobre todo...",
      "Cortadura, porque el peso de la puerta intenta cizallarlo",
      [["Torsión, porque la puerta gira", "Gira la puerta alrededor de las bisagras, no el tornillo sobre sí mismo."], ["Compresión, porque está apretado", "La carga principal es lateral, perpendicular al eje."], ["Tracción, porque lo estiran", "El tornillo no se estira por el peso de la puerta."]],
      "El peso de la puerta es una fuerza perpendicular al eje del tornillo: tiende a cortarlo.",
    ),
  ],
};
