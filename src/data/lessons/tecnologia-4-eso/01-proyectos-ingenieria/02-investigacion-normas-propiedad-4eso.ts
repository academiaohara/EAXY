import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO4_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const investigacionNormasPropiedad4esoLesson: InteractiveLesson = {
  slug: "investigacion-normas-propiedad-4eso",
  title: "2. Investigar soluciones: normas, patentes y licencias",
  subtitle: TECESO4_SUBTITLES[1],
  stage: { theme: "board" },
  steps: [
    slide("def", "Antes de diseñar, investigar", [
      { kind: "steps", items: [
        "**Estado del arte**: qué soluciones ya existen y qué ventajas e inconvenientes tienen.",
        "**Benchmarking**: comparar productos de la competencia con criterios medibles.",
        "**Normas** (UNE, ISO, EN): establecen requisitos mínimos de seguridad, calidad y compatibilidad.",
        "**Fuentes fiables**: catálogos técnicos, normas, artículos, hojas de características, patentes.",
      ] },
    ], undefined, "stack"),
    slide("matriz", "Compara soluciones", [
      { kind: "text", text: "Una matriz de decisión puntúa cada solución con criterios ponderados." },
    ], tool("eso2-matriz-decision-explorador"), "visual-top"),
    slide("pi", "Propiedad intelectual", [
      { kind: "steps", items: [
        "**Patente**: protege una **invención** nueva y útil durante unos 20 años; a cambio, se hace pública.",
        "**Modelo de utilidad**: para mejoras técnicas menores, con menos requisitos.",
        "**Diseño industrial**: protege la **apariencia** de un producto.",
        "**Marca**: protege el **nombre y el logotipo**.",
        "**Derechos de autor**: protegen obras (textos, planos, software) sin necesidad de registro.",
      ] },
    ]),
    slide("lic", "Licencias abiertas", [
      { kind: "steps", items: [
        "Una **licencia abierta** permite usar, modificar y compartir con ciertas condiciones.",
        "**Creative Commons** (CC BY, CC BY-SA, CC BY-NC) para textos, imágenes y diseños.",
        "**Hardware abierto** (Arduino, RepRap) y **software libre** (GPL, MIT).",
        "Siempre hay que **reconocer al autor** y respetar la licencia al reutilizar material.",
      ] },
    ]),
    calc("calc-pat", "Duración de una patente", "Una patente dura 20 años desde que se solicita. Si se solicitó en 2015, ¿en qué año caduca?", nums(2035), "2015 + 20 = 2035.", "Suma 20 años."),
    calc("calc-punt", "Puntuación", "Una solución puntúa 4 en coste (peso 3) y 5 en seguridad (peso 2). ¿Cuál es su puntuación total? (4·3 + 5·2)", nums(22), "12 + 10 = 22.", "Suma puntuación por peso."),
    sort("clasifica-pi", "¿Qué protege?", "Relaciona cada elemento con la protección adecuada.",
      [["pat", "Patente", "cobalt"], ["mar", "Marca", "amber"], ["dis", "Diseño industrial", "emerald"], ["aut", "Derechos de autor", "rose"]],
      [["Un mecanismo nuevo de cierre", "pat"], ["Un procedimiento de fabricación original", "pat"], ["El logotipo de una empresa", "mar"], ["El nombre de un producto", "mar"], ["La forma exterior de una silla", "dis"], ["El aspecto de un envase", "dis"], ["Un programa de ordenador", "aut"], ["Los planos y un manual", "aut"]],
      "Cada figura protege un aspecto distinto.",
    ),
    pick("check-lic", "Reutilizar", "Quieres usar un modelo 3D que alguien publicó con licencia CC BY. ¿Qué debes hacer?",
      "Puedes usarlo y modificarlo, pero debes reconocer al autor",
      [["Nada: es de todos", "Hay que citar al autor."], ["No se puede usar nunca", "La licencia lo permite."], ["Venderlo como propio", "No es lícito."]],
      "Las licencias abiertas establecen condiciones, no prohibiciones totales.",
    ),
  ],
};
