import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const metalesAleacionesBasicoLesson: InteractiveLesson = {
  slug: "metales-aleaciones-basico",
  title: "4. Metales y aleaciones",
  subtitle: TECESO1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Los metales: propiedades y clasificación", [
      { kind: "definition", text: "Los **metales** se extraen de minerales. Tienen brillo, son buenos conductores del calor y la electricidad y, en general, son resistentes, dúctiles (se estiran en hilos) y maleables (se hacen láminas)." },
      { kind: "compare",
        left: { title: "Metales férricos", text: "Contienen **hierro**. Los atrae el imán y se oxidan con facilidad. Hierro, **acero** y **fundición**.", tone: "key" },
        right: { title: "No férricos", text: "No contienen hierro: **cobre**, **aluminio**, **estaño**, zinc, plomo, titanio. El imán no los atrae y suelen resistir mejor la corrosión.", tone: "info" } },
    ], undefined, "stack"),
    slide("explora", "Pruebas con metales", [
      { kind: "text", text: "Acerca el imán a cada metal y mira cómo se oxida con el paso de los días en un ambiente húmedo." },
    ], tool("metales-prueba-explorador", { n: 1 }), "visual-top"),
    slide("aleacion", "Aleaciones: mezclar para mejorar", [
      { kind: "definition", text: "Una **aleación** es la mezcla de un metal con otros elementos, que mejora sus propiedades: más dureza, menos oxidación o menor punto de fusión." },
      { kind: "text", text: "Mira cómo se forma el bronce y por qué es más duro que sus componentes." },
    ], anim("aleacion-mezcla"), "split"),
    slide("ejemplos", "Aleaciones comunes", [
      { kind: "steps", items: [
        "**Acero**: hierro con menos de un 2 % de carbono. Estructuras, herramientas, tornillos.",
        "**Latón**: cobre y zinc. Grifos, tornillería, instrumentos musicales.",
        "**Bronce**: cobre y estaño. Estatuas, campanas, cojinetes.",
        "**Duraluminio**: aluminio con cobre y magnesio. Estructuras de aviones y bicicletas.",
      ] },
      { kind: "warning", title: "Ojo", text: "El acero inoxidable lleva además cromo, que forma una capa que lo protege de la corrosión: por eso no se oxida como el acero normal." },
    ]),
    sort("clasifica-metal", "¿Férrico o no férrico?", "Clasifica cada metal o aleación.",
      [["fer", "Férrico", "amber"], ["nof", "No férrico", "cobalt"]],
      [["Acero", "fer"], ["Hierro", "fer"], ["Fundición", "fer"], ["Cobre", "nof"], ["Aluminio", "nof"], ["Estaño", "nof"], ["Bronce", "nof"], ["Latón", "nof"]],
      "Los férricos contienen hierro como elemento principal; el resto, como el cobre y sus aleaciones (bronce y latón), el aluminio o el estaño, son no férricos.",
    ),
    pick("check-iman", "La prueba del imán", "Tienes dos tornillos iguales: uno de acero y otro de latón. ¿Cómo los distingues rápidamente?",
      "Con un imán: atrae al de acero y no al de latón",
      [["Con un imán: atrae al de latón y no al de acero", "Es al revés: el acero contiene hierro."], ["Midiendo su longitud", "Miden lo mismo; no sirve para distinguirlos."], ["Calentándolos al fuego", "Es peligroso y no distingue por sí solo."]],
      "El acero es ferromagnético y el latón (cobre y zinc), no.",
    ),
    pick("check-aleacion", "Para qué se alea", "¿Por qué se fabrican aleaciones en lugar de usar siempre metales puros?",
      "Porque la mezcla mejora propiedades como la dureza o la resistencia a la corrosión",
      [["Porque es más barato fabricar siempre mezclas", "No siempre es más barato; se busca mejorar propiedades."], ["Porque los metales puros no existen", "Existen, como el cobre o el aluminio puros."], ["Porque así se vuelven más ligeros siempre", "Algunas aleaciones son más ligeras, pero no es la regla general."]],
      "Las aleaciones se diseñan para lograr propiedades que ningún metal puro ofrece por sí solo.",
    ),
  ],
};
