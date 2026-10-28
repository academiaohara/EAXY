import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const maderaDerivadosLesson: InteractiveLesson = {
  slug: "madera-derivados",
  title: "3. La madera y sus derivados",
  subtitle: TECESO1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("madera", "La madera: un material renovable", [
      { kind: "definition", text: "La **madera** es el material que se obtiene del tronco de los árboles. Es **renovable** si se gestiona bien el bosque: se plantan árboles para sustituir a los talados." },
      { kind: "steps", items: [
        "**Maderas blandas** (pino, abeto): crecen rápido, son ligeras y baratas. Para construcción y carpintería.",
        "**Maderas duras** (roble, nogal, haya): crecen despacio, son más densas y caras. Para muebles y suelos.",
        "**Propiedades**: ligera, buena aislante térmica y eléctrica, fácil de trabajar. **Inconvenientes**: absorbe humedad, arde y puede pudrirse o ser atacada por insectos.",
      ] },
    ], undefined, "stack"),
    slide("obtencion", "Del bosque al taller", [
      { kind: "steps", items: [
        "**Tala** de los árboles seleccionados.",
        "**Descortezado** y troceado del tronco.",
        "**Aserrado** en tablones y tablas.",
        "**Secado** (natural o en horno): sin él, la madera se deforma al perder humedad.",
        "**Cepillado** y acabado superficial.",
      ] },
    ]),
    slide("contrachapado", "Por qué el contrachapado es más estable", [
      { kind: "text", text: "La madera maciza tiene fibras en una sola dirección. Los derivados corrigen sus defectos. Mira cómo se fabrica el contrachapado." },
    ], anim("contrachapado-capas"), "split"),
    slide("derivados", "Compara los tableros", [
      { kind: "text", text: "Los derivados se hacen con láminas, virutas o fibras de madera pegadas. Elige uno y mira sus ventajas." },
    ], tool("madera-derivados-explorador", { n: 1 }), "visual-top"),
    sort("clasifica-derivado", "¿Qué tablero es?", "Relaciona cada descripción con el material.",
      [["con", "Contrachapado", "amber"], ["agl", "Aglomerado", "cobalt"], ["mdf", "MDF", "emerald"]],
      [["Láminas finas con las fibras cruzadas", "con"], ["Muy estable ante la humedad (el marino)", "con"], ["Virutas prensadas con cola", "agl"], ["El más barato para muebles", "agl"], ["Fibras finísimas, superficie lisa para lacar", "mdf"], ["Se corta con limpieza, sin vetas", "mdf"]],
      "Contrachapado: capas cruzadas; aglomerado: virutas; MDF: fibras muy finas y superficie lisa.",
    ),
    pick("check-capa", "Capas cruzadas", "¿Por qué las capas del contrachapado se pegan con las fibras en direcciones perpendiculares?",
      "Para que cada capa limite la deformación de las vecinas y el tablero sea resistente en todas las direcciones",
      [["Solo para que quede más bonito", "No es una cuestión estética, sino de resistencia."], ["Para que sea más ligero", "No cambia el peso; sí cambia su estabilidad."], ["Para ahorrar cola", "La cola se gasta igual."]],
      "La madera se hincha y se encoge sobre todo en el sentido perpendicular a las fibras; al cruzar las capas, se compensan unas con otras.",
    ),
  ],
};
