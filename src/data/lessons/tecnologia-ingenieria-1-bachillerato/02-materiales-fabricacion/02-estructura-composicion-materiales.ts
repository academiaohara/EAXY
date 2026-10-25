import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEC1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const estructuraComposicionMaterialesLesson: InteractiveLesson = {
  slug: "estructura-composicion-materiales",
  title: "2. Estructura y composición de los materiales",
  subtitle: TEC1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("zoom", "De la pieza a los átomos", [
      { kind: "text", text: "Las propiedades que mides en una pieza (cuánto pesa, si se dobla, si conduce) se explican por lo que ocurre a escala microscópica." },
      { kind: "steps", items: [
        "**Átomos y enlaces**: metálico, iónico, covalente y fuerzas débiles entre moléculas.",
        "**Estructura**: cómo se colocan los átomos (red ordenada o desordenada).",
        "**Microestructura**: tamaño y forma de los granos y fases.",
        "**Propiedades macroscópicas**: lo que ves y mides en la pieza.",
      ] },
    ], anim("escala-material-zoom"), "split"),
    slide("cristal", "Cristalino frente a amorfo", [
      { kind: "compare",
        left: { title: "Cristalino", text: "Los átomos forman una **red regular** que se repite en las tres direcciones. Los metales y muchos cerámicos lo son. Tienen punto de fusión definido.", tone: "key" },
        right: { title: "Amorfo", text: "Los átomos están **desordenados**, sin red de largo alcance (vidrio, muchos plásticos). Se reblandecen gradualmente al calentar.", tone: "info" } },
      { kind: "text", text: "Compara las dos estructuras y mira qué ocurre al añadir átomos de otro elemento." },
    ], tool("estructura-atomica-explorador", { n: 0 }), "visual-top"),
    slide("aleacion", "Aleaciones: mezclar metales", [
      { kind: "definition", text: "Una **aleación** es una mezcla de un metal con otros elementos (metales o no) que mantiene carácter metálico y mejora alguna propiedad." },
      { kind: "compare",
        left: { title: "Sustitucional", text: "Átomos de tamaño parecido ocupan puestos de la red. Latón: Cu + Zn.", tone: "info" },
        right: { title: "Intersticial", text: "Átomos pequeños se meten en los huecos y deforman la red, dificultando el deslizamiento. Acero: Fe + C.", tone: "key" } },
      { kind: "text", text: "Los átomos distintos **bloquean** el movimiento de los planos atómicos, por lo que la aleación suele ser **más dura y resistente** que el metal puro, aunque menos dúctil." },
    ]),
    slide("micro", "Granos y microestructura", [
      { kind: "steps", items: [
        "Un metal solidificado es un conjunto de **granos** unidos por **bordes de grano**.",
        "Los bordes frenan la deformación: **grano fino ⇒ más resistente** (y más tenaz).",
        "El grano se afina con **enfriamiento rápido** o con tratamientos térmicos; se agranda con calentamientos largos.",
        "La **microestructura** (fases presentes, forma y tamaño de grano) explica por qué un mismo acero puede ser blando o duro.",
      ] },
      { kind: "warning", title: "Misma composición, distinto comportamiento", text: "Dos piezas del mismo acero pueden comportarse muy distinto según cómo se hayan enfriado. La composición no lo dice todo." },
    ]),
    sort("clasifica-estructura", "Cristalino o amorfo", "Clasifica cada material según su estructura interna típica.",
      [["cri", "Cristalino", "cobalt"], ["amo", "Amorfo", "amber"]],
      [["Cobre", "cri"], ["Aluminio", "cri"], ["Sal común (NaCl)", "cri"], ["Vidrio de ventana", "amo"], ["Poliestireno (vaso transparente)", "amo"], ["Cera", "amo"]],
      "Los metales y la sal forman redes ordenadas. El vidrio y muchos polímeros son amorfos: carecen de orden de largo alcance.",
    ),
    pick("check-aleacion", "Aleación y dureza", "¿Por qué una aleación suele ser más dura que el metal puro?",
      "Los átomos distintos deforman la red y dificultan el deslizamiento de los planos atómicos",
      [["Porque los átomos añadidos son más pesados", "El peso no es la causa; lo es el bloqueo del deslizamiento."], ["Porque desaparecen los granos", "Los granos siguen existiendo."], ["Porque pasa a ser amorfa", "Las aleaciones metálicas siguen siendo cristalinas."]],
      "Al deformar la red, los planos atómicos deslizan peor: hay que aplicar más fuerza para deformar el material.",
    ),
    pick("check-grano", "Tamaño de grano", "Dos barras del mismo acero tienen distinto tamaño de grano. ¿Cuál será normalmente más resistente?",
      "La de grano fino, porque hay más bordes que frenan la deformación",
      [["La de grano grueso, porque tiene cristales más grandes", "Los cristales grandes dejan deslizar los planos más lejos antes de encontrar un borde."], ["Las dos igual, porque la composición es la misma", "La microestructura también cuenta."], ["Depende solo del color", "El color no es un indicador del tamaño de grano."]],
      "Más bordes de grano significan más obstáculos al movimiento de los planos atómicos.",
    ),
  ],
};
