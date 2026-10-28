import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const documentacionMultimediaDifusionLesson: InteractiveLesson = {
  slug: "documentacion-multimedia-difusion",
  title: "4. Documentar y difundir un proyecto con herramientas digitales",
  subtitle: TECESO1_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("doc", "La documentación de un proyecto", [
      { kind: "steps", items: [
        "**Memoria técnica**: problema, solución elegida, planos, lista de materiales, presupuesto, pasos y conclusiones.",
        "**Presentación**: resume el proyecto para explicarlo ante un público.",
        "**Vídeo o galería de fotos** que muestran el proceso y el resultado.",
        "**Sitio web o blog del proyecto**: para publicarlo y compartirlo.",
      ] },
    ], undefined, "stack"),
    slide("herramientas", "Herramientas digitales", [
      { kind: "compare",
        left: { title: "Para crear", text: "**Procesador de textos**, **hoja de cálculo** (presupuestos y tablas), **presentaciones**, **editor de imagen y vídeo**, **CAD** para planos.", tone: "info" },
        right: { title: "Para publicar y colaborar", text: "**Documentos compartidos** en la nube, **plataformas del centro**, **blogs** y **repositorios** de archivos. Con permisos de edición o solo lectura.", tone: "key" } },
    ]),
    slide("diapositiva", "Una diapositiva que se lea bien", [
      { kind: "text", text: "Ajusta colores, tamaño de letra y cantidad de texto hasta que la diapositiva sea legible y accesible." },
    ], tool("diapositiva-legible-explorador", { n: 2, a: 14 }), "visual-top"),
    slide("accesible", "Documentos accesibles", [
      { kind: "steps", items: [
        "**Contraste alto** entre texto y fondo.",
        "**Letra grande** y tipografía sencilla.",
        "**Texto alternativo** en las imágenes, para quien no puede verlas.",
        "**Subtítulos** en los vídeos.",
        "**Títulos y listas reales** (no solo negrita) para que los lectores de pantalla entiendan la estructura.",
      ] },
    ]),
    sort("clasifica-doc", "¿Qué herramienta uso?", "Elige la herramienta adecuada para cada tarea.",
      [["tex", "Procesador de textos", "cobalt"], ["cal", "Hoja de cálculo", "amber"], ["pre", "Presentación", "emerald"], ["vid", "Editor de vídeo", "violet"]],
      [["Redactar la memoria técnica", "tex"], ["Escribir un informe con apartados", "tex"], ["Calcular el presupuesto con fórmulas", "cal"], ["Hacer una tabla de gastos", "cal"], ["Exponer el proyecto ante la clase", "pre"], ["Resumir las ideas principales en diapositivas", "pre"], ["Montar el vídeo del proceso", "vid"], ["Añadir subtítulos a una grabación", "vid"]],
      "Cada herramienta resuelve un tipo de tarea: textos, cálculo, exposición o vídeo.",
    ),
    pick("check-legible", "Presentación ilegible", "Una diapositiva tiene letra gris clara de 12 puntos sobre fondo blanco y 150 palabras. ¿Qué cambias primero?",
      "Aumentar la letra y el contraste, y reducir el texto a las ideas clave",
      [["Nada: el público lo leerá en su casa", "Una diapositiva se proyecta y debe leerse desde lejos."], ["Poner el texto aún más pequeño para que quepa", "Empeora la legibilidad."], ["Cambiar el fondo por una imagen con detalles", "Reduce más el contraste."]],
      "Una diapositiva con pocas palabras, letra grande y buen contraste es más clara y accesible.",
    ),
  ],
};
