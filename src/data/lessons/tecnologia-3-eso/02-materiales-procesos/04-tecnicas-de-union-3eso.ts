import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const tecnicasDeUnion3esoLesson: InteractiveLesson = {
  slug: "tecnicas-de-union-3eso",
  title: "4. Técnicas de unión: tornillos, remaches, soldadura y adhesivos",
  subtitle: TECESO3_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Unir piezas", [
      { kind: "compare",
        left: { title: "Uniones desmontables", text: "**Tornillos y tuercas**, pasadores, encajes, abrazaderas. Permiten **montar y desmontar** sin dañar las piezas.", tone: "info" },
        right: { title: "Uniones permanentes", text: "**Remaches**, **soldadura**, **adhesivos**. Para separarlas hay que romperlas.", tone: "key" } },
    ]),
    slide("elige", "Elige la unión adecuada", [
      { kind: "text", text: "Activa los requisitos de tu proyecto y mira qué uniones los cumplen." },
    ], tool("eso3-union-explorador"), "visual-top"),
    slide("sold", "La soldadura", [
      { kind: "steps", items: [
        "**Soldadura blanda** (estaño): une componentes electrónicos a baja temperatura.",
        "**Soldadura fuerte** (latón, plata): une metales con aportación de otro metal.",
        "**Soldadura por arco** y **por puntos**: funden los bordes de las piezas; se usan en estructuras y carrocerías.",
        "Exige **protección** ocular y respiratoria, ventilación y trabajar con **supervisión**.",
      ] },
    ]),
    calc("calc-rem", "Cuántos remaches", "Quieres unir una chapa de 300 mm con un remache cada 50 mm, contando el primero y el último. ¿Cuántos remaches necesitas?", nums(7), "300 / 50 = 6 intervalos, y hay 7 remaches (los dos extremos incluidos).", "Intervalos más uno."),
    sort("clasifica-union", "¿Desmontable o permanente?", "Clasifica cada unión.",
      [["des", "Desmontable", "emerald"], ["per", "Permanente", "rose"]],
      [["Tornillo y tuerca", "des"], ["Encaje por ranuras", "des"], ["Abrazadera", "des"], ["Remache", "per"], ["Soldadura", "per"], ["Pegado con adhesivo", "per"]],
      "Las desmontables se pueden deshacer sin romper; las permanentes, no.",
    ),
    pick("check-uniones", "Un mueble", "Un mueble que se vende en piezas y se monta en casa, ¿qué unión debería usar?",
      "Tornillos, tarugos o encajes, para poder montarlo y desmontarlo",
      [["Soldadura", "No se puede en madera ni en casa."], ["Remaches ciegos", "No son desmontables."], ["Pegamento de contacto", "Es permanente."]],
      "La unión debe adaptarse al uso: aquí hace falta desmontar.",
    ),
  ],
};
