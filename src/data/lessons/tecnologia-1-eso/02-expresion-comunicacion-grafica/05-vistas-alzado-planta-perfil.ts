import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const vistasAlzadoPlantaPerfilLesson: InteractiveLesson = {
  slug: "vistas-alzado-planta-perfil",
  title: "5. Vistas de un objeto: alzado, planta y perfil",
  subtitle: TECESO1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Un objeto 3D en papel plano", [
      { kind: "definition", text: "Las **vistas** son las proyecciones de un objeto sobre planos, como si lo miráramos de frente, desde arriba o desde un lado. Cada vista es un dibujo plano que muestra dos de sus tres dimensiones." },
      { kind: "steps", items: [
        "**Alzado**: vista **frontal**. Muestra el ancho y el alto.",
        "**Planta**: vista **desde arriba**. Muestra el ancho y el fondo.",
        "**Perfil** (izquierdo): vista **lateral**. Muestra el alto y el fondo.",
      ] },
    ], undefined, "stack"),
    slide("proy", "Cómo se disponen las tres vistas", [
      { kind: "text", text: "Se dibujan **alineadas**: la planta debajo del alzado, y el perfil a su derecha. Así se pueden trasladar medidas de una vista a otra con una línea." },
    ], anim("vistas-proyeccion"), "text-top"),
    slide("explora", "Construye una pieza y mira sus vistas", [
      { kind: "text", text: "Pulsa las casillas para añadir cubos. Observa cómo cada vista **pierde** información: no basta una sola para saber cómo es la pieza." },
    ], tool("vistas-pieza-explorador", { n: 0 }), "visual-top"),
    slide("convenios", "Convenios de las vistas", [
      { kind: "steps", items: [
        "Las **aristas visibles** se dibujan con trazo continuo grueso.",
        "Las **aristas ocultas** se dibujan con trazo discontinuo.",
        "Se eligen como **alzado** la vista que **más información** da de la pieza.",
        "Se dibujan solo las vistas necesarias: una pieza simple puede quedar definida con dos vistas.",
      ] },
    ]),
    calc("calc-cubos", "Cuántos cubos hay", "Una pieza ocupa tres casillas en planta, con 3, 1 y 1 cubos de altura respectivamente. ¿Cuántos cubos tiene en total?",
      nums(5), "3 + 1 + 1 = 5 cubos.", "Suma las alturas de las tres casillas."),
    sort("clasifica-vista", "¿Qué vista muestra qué?", "Relaciona cada dato con la vista donde se ve.",
      [["alz", "Alzado", "emerald"], ["pla", "Planta", "cobalt"], ["per", "Perfil", "amber"]],
      [["La altura y el ancho de la pieza", "alz"], ["El fondo y el ancho, vistos desde arriba", "pla"], ["Un agujero vertical visto como un círculo", "pla"], ["La altura y el fondo, vistos desde un lado", "per"], ["Un escalón visto de lado", "per"], ["La forma de la pieza vista de frente", "alz"]],
      "Alzado: ancho × alto. Planta: ancho × fondo. Perfil: alto × fondo.",
    ),
    pick("check-vistas", "Alineación de vistas", "El alzado de una pieza mide 40 mm de ancho. ¿Cuánto debe medir de ancho su planta, dibujada debajo?",
      "40 mm, porque comparten la misma dimensión de ancho",
      [["20 mm", "El ancho no cambia al cambiar de vista."], ["Depende del fondo", "El fondo afecta al alto de la planta, no a su ancho."], ["80 mm", "No hay ninguna razón para duplicar una medida."]],
      "Alzado y planta comparten el ancho; alzado y perfil comparten el alto; planta y perfil comparten el fondo.",
    ),
  ],
};
