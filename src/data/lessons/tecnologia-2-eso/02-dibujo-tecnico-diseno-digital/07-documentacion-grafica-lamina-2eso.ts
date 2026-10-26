import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO2_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const documentacionGraficaLamina2esoLesson: InteractiveLesson = {
  slug: "documentacion-grafica-lamina-2eso",
  title: "7. Documentación gráfica de un proyecto",
  subtitle: TECESO2_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "Que otra persona pueda fabricarlo", [
      { kind: "definition", text: "La **documentación gráfica** de un proyecto reúne los dibujos necesarios para que otra persona pueda **entenderlo, fabricarlo y montarlo** sin preguntarte nada." },
      { kind: "steps", items: [
        "**Planos de conjunto**: cómo se ve el objeto montado.",
        "**Planos de despiece** (de cada pieza): vistas, cotas y material.",
        "**Lista de piezas** con cantidad, nombre y material.",
        "**Esquemas** de instalaciones (por ejemplo, eléctrico).",
      ] },
    ], undefined, "stack"),
    slide("lamina", "Una lámina completa", [
      { kind: "text", text: "Activa los elementos de una lámina y comprueba qué le falta para estar completa." },
    ], tool("eso2-lamina-explorador"), "visual-top"),
    slide("cajetin", "El cajetín", [
      { kind: "steps", items: [
        "Va en la **esquina inferior derecha** de la lámina.",
        "Incluye **título**, **nombre** de la persona autora, **fecha**, **escala** y **número de plano**.",
        "También las **unidades** (mm) y el **formato** de papel (A4, A3).",
      ] },
    ]),
    calc("calc-escala", "Escala en el cajetín", "Una pieza de 150 mm se dibuja a escala 1:5. ¿Cuántos mm mide en el papel?", nums(30), "150 / 5 = 30 mm.", "Divide entre 5."),
    sort("clasifica-lamina", "¿Dónde va?", "Decide dónde se indica cada dato.",
      [["caj", "En el cajetín", "amber"], ["dib", "En el dibujo", "cobalt"]],
      [["Título del plano", "caj"], ["Nombre del autor", "caj"], ["Escala y fecha", "caj"], ["Cotas de la pieza", "dib"], ["Vistas de la pieza", "dib"], ["Ejes y centros de agujeros", "dib"]],
      "El cajetín identifica el plano; el dibujo describe la pieza.",
    ),
    pick("check-doc", "Entregar un proyecto", "Vas a entregar los planos de tu proyecto. ¿Qué incluirías para que otra persona pueda fabricarlo?",
      "Vistas acotadas de cada pieza, escala, cajetín y lista de piezas",
      [["Solo una fotografía del resultado", "No permite conocer medidas ni piezas."], ["Solo un boceto sin cotas", "Faltan medidas."], ["Solo la lista de materiales", "Falta el dibujo."]],
      "Una documentación completa combina dibujos acotados, cajetín y lista de piezas.",
    ),
  ],
};
