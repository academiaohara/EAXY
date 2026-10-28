import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const triangulacionPerfilesRefuerzos2esoLesson: InteractiveLesson = {
  slug: "triangulacion-perfiles-refuerzos-2eso",
  title: "2. Triangulación, perfiles y refuerzos",
  subtitle: TECESO2_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("tri", "El triángulo es indeformable", [
      { kind: "text", text: "Un marco de cuatro barras se deforma como un paralelogramo; con una diagonal se convierte en dos triángulos y se vuelve rígido." },
    ], anim("triangulo-rigido"), "text-top"),
    slide("prueba", "Empuja un marco", [
      { kind: "text", text: "Compara el marco sin diagonal, con una y con dos (en cruz)." },
    ], tool("triangulacion-explorador", { n: 0, a: 60 }), "visual-top"),
    slide("perfil", "La forma del perfil importa", [
      { kind: "definition", text: "Una viga resiste más a flexión si su material está **lejos del centro** y en la **dirección de la carga**. Por eso se usan perfiles **en doble T**, tubulares o con la sección «de canto»." },
      { kind: "text", text: "Gira un listón rectangular y compara su rigidez." },
    ], tool("eso2-perfil-canto-explorador"), "visual-top"),
    slide("refuerzos", "Refuerzos habituales", [
      { kind: "steps", items: [
        "**Escuadras y cartelas** en las esquinas, para evitar que se abran.",
        "**Diagonales y tirantes** que triangulan marcos y torres.",
        "**Nervios y costillas** en piezas de plástico y chapa.",
        "**Perfiles** (L, U, T, doble T, tubo) en lugar de barras macizas: igual resistencia con menos material.",
      ] },
    ]),
    calc("calc-canto", "Cuántas veces más rígido", "Un listón de 10 × 30 mm se coloca de canto (altura 30 mm) en lugar de tumbado. ¿Cuántas veces mayor es su inercia? (I = b · h³ / 12)", nums(9), "De canto: 10 · 30³ / 12 = 22 500 mm⁴. Tumbado: 30 · 10³ / 12 = 2 500 mm⁴. Relación: 22 500 / 2 500 = 9.", "Calcula la inercia en cada posición y divide."),
    sort("clasifica-refuerzo", "¿Qué hace cada refuerzo?", "Relaciona cada refuerzo con su función.",
      [["rig", "Evita deformación del marco", "cobalt"], ["flex", "Aumenta la rigidez a flexión", "emerald"]],
      [["Diagonal en un marco de ventana", "rig"], ["Cartela en una esquina", "rig"], ["Tirante cruzado en una torre", "rig"], ["Perfil en doble T", "flex"], ["Viga colocada de canto", "flex"], ["Tubo en lugar de barra maciza", "flex"]],
      "Las diagonales y cartelas impiden que el marco cambie de forma; los perfiles y la colocación de canto aumentan la rigidez a flexión.",
    ),
    pick("check-tri", "Un marco que se mueve", "Una estantería de cuatro barras se «tuerce» al empujarla de lado. ¿Cómo se arregla?",
      "Añadiendo una diagonal que triangule el marco",
      [["Poniendo más peso encima", "No evita que se deforme."], ["Quitando una barra", "Se volvería aún más inestable."], ["Pintándola", "No cambia su forma de trabajar."]],
      "Una diagonal convierte el cuadrilátero en dos triángulos, que son indeformables.",
    ),
  ],
};
