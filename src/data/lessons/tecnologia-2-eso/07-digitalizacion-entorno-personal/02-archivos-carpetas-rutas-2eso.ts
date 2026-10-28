import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const archivosCarpetasRutas2esoLesson: InteractiveLesson = {
  slug: "archivos-carpetas-rutas-2eso",
  title: "2. Archivos, carpetas y rutas",
  subtitle: TECESO2_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Organizar la información", [
      { kind: "steps", items: [
        "Un **archivo** guarda información con un **nombre** y una **extensión** (.docx, .jpg, .pdf…) que indica su formato.",
        "Una **carpeta** agrupa archivos y otras carpetas formando un **árbol**.",
        "La **ruta** es el camino hasta un archivo: **absoluta** (desde la raíz) o **relativa** (desde la carpeta en la que estás).",
        "Un buen sistema: carpetas por asignatura o proyecto, nombres claros y **fechas** o versiones (memoria_v2).",
      ] },
    ], undefined, "stack"),
    slide("rutas", "Absoluta y relativa", [
      { kind: "text", text: "Elige un archivo y la carpeta de trabajo. Observa cómo cambia la ruta relativa («..» significa subir una carpeta)." },
    ], tool("eso2-rutas-explorador"), "visual-top"),
    slide("buenas", "Buenas prácticas con los nombres", [
      { kind: "steps", items: [
        "Evita espacios y símbolos raros: usa guion bajo (**plano_soporte_v2.dxf**).",
        "Pon la **fecha al revés** (2025-03-14) para que se ordenen bien.",
        "No cambies la extensión a mano: no convierte el archivo.",
        "Haz **copia de seguridad** de las carpetas importantes.",
      ] },
    ]),
    calc("calc-kb", "De MB a KB", "Una foto ocupa 2,5 MB. ¿Cuántos KB son? (1 MB = 1 024 KB)", nums(2560), "2,5 · 1 024 = 2 560 KB.", "Multiplica por 1 024."),
    sort("clasifica-ext", "¿Qué tipo de archivo es?", "Clasifica cada extensión.",
      [["doc", "Texto y documentos", "cobalt"], ["img", "Imagen", "amber"], ["cal", "Hoja de cálculo", "emerald"]],
      [["memoria.docx", "doc"], ["apuntes.odt", "doc"], ["informe.pdf", "doc"], ["foto.jpg", "img"], ["logo.png", "img"], ["presupuesto.xlsx", "cal"]],
      "La extensión indica el formato y, con ello, el programa que lo abre.",
    ),
    pick("check-ruta", "Ruta relativa", "Estás en la carpeta Documentos/Tecnologia y quieres indicar la ruta relativa de Descargas/instalador.exe. ¿Cuál es?",
      "../../Descargas/instalador.exe",
      [["Descargas/instalador.exe", "Desde Tecnologia habría que subir primero."], ["../Descargas/instalador.exe", "Hay que subir dos niveles: Tecnologia y Documentos."], ["Tecnologia/Descargas/instalador.exe", "Esa carpeta no existe."]],
      "«..» sube un nivel: de Tecnologia a Documentos y de ahí a la raíz, donde está Descargas.",
    ),
  ],
};
