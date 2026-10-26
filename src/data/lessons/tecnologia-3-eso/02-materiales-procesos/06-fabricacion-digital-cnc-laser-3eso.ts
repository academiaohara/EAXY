import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO3_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const fabricacionDigitalCncLaser3esoLesson: InteractiveLesson = {
  slug: "fabricacion-digital-cnc-laser-3eso",
  title: "6. Fabricación digital: CNC, láser e impresión 3D",
  subtitle: TECESO3_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Del diseño a la pieza", [
      { kind: "steps", items: [
        "**CNC** (control numérico por computador): máquinas que siguen un **programa** de coordenadas (código G): fresadoras, tornos, cortadoras.",
        "**Corte láser**: un haz de luz funde o vaporiza el material siguiendo un dibujo **2D** (DXF, SVG). Cartón, madera, metacrilato, finas chapas.",
        "**Impresión 3D**: construye la pieza **capa a capa** a partir de un modelo **3D** (STL).",
        "El flujo: **diseño (CAD)** → **programa (CAM)** → **máquina** → **acabado**.",
      ] },
    ], undefined, "stack"),
    slide("laser", "Calcula un corte láser", [
      { kind: "text", text: "Cambia la placa, los agujeros y el material. El tiempo depende de la longitud total de corte." },
    ], tool("eso3-laser-explorador"), "visual-top"),
    slide("impr", "Elegir la máquina", [
      { kind: "compare",
        left: { title: "Aditiva (impresión 3D)", text: "Añade material: formas **complejas** con huecos internos, poco desperdicio; es **lenta** y con acabado de capas.", tone: "info" },
        right: { title: "Sustractiva (CNC, láser)", text: "Quita material de una plancha o un bloque: más **rápida** y **precisa**; genera **desperdicio** y tiene límites de forma.", tone: "key" } },
    ]),
    calc("calc-per", "Longitud de corte", "Un láser corta el contorno de una placa de 100 mm × 60 mm (sin agujeros). ¿Cuántos mm recorre?", nums(320), "2 · (100 + 60) = 320 mm.", "Perímetro del rectángulo."),
    calc("calc-t", "Tiempo de corte", "Con una velocidad de 8 mm/s, ¿cuántos segundos tarda en cortar esos 320 mm?", nums(40), "320 / 8 = 40 s.", "Longitud entre velocidad."),
    sort("clasifica-dig", "¿Qué máquina elijo?", "Relaciona cada trabajo con la máquina más adecuada.",
      [["las", "Corte láser", "amber"], ["cnc", "Fresadora CNC", "cobalt"], ["imp", "Impresión 3D", "emerald"]],
      [["Cortar piezas planas de contrachapado", "las"], ["Grabar un logotipo en madera", "las"], ["Mecanizar una pieza de aluminio con precisión", "cnc"], ["Tallar un molde", "cnc"], ["Un prototipo con forma orgánica", "imp"], ["Una pieza con huecos internos", "imp"]],
      "Cada tecnología es mejor para un tipo de forma y de material.",
    ),
    pick("check-cam", "El archivo", "¿Qué tipo de archivo necesita normalmente un cortador láser?",
      "Un dibujo vectorial 2D (por ejemplo DXF o SVG)",
      [["Un modelo 3D en STL", "Eso es para impresión 3D."], ["Una fotografía en JPEG", "Debe ser vectorial."], ["Un documento de texto", "No sirve."]],
      "El láser recorre las líneas del dibujo vectorial.",
    ),
  ],
};
