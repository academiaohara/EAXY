import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide } from "@/data/lessons/tec1-helpers";

export const elipseDt1Lesson: InteractiveLesson = {
  slug: "elipse-dt1",
  title: "1. La elipse",
  subtitle: DT1_SUBTITLES[10],
  stage: { theme: "board" },
  steps: [
    slide("conicas", "Las curvas cónicas", [
      { kind: "definition", text: "Reciben el nombre de **cónicas** las curvas que resultan de la intersección de una superficie cónica por un plano. La superficie cónica de revolución está engendrada por una recta, la **generatriz**, que gira alrededor de otra a la que corta, el **eje**; el punto de corte es el **vértice** $V$." },
      { kind: "compare",
        left: { title: "Plano que no pasa por el vértice", math: ["\\text{perpendicular al eje} \\Rightarrow \\text{circunferencia}", "\\text{oblicuo, corta a todas las generatrices} \\Rightarrow \\text{elipse}", "\\text{paralelo a una generatriz} \\Rightarrow \\text{parábola}", "\\text{paralelo al eje o a dos generatrices} \\Rightarrow \\text{hipérbola}"] },
        right: { title: "Plano que pasa por el vértice", text: "La sección es una **cónica degenerada**: un punto, una recta o un par de rectas que se cortan, según la inclinación del plano respecto de las generatrices." } },
    ]),
    slide("elipse", "La elipse: definición y elementos", [
      { kind: "definition", text: "La **elipse** es una curva plana y cerrada cuyos puntos cumplen que la **suma de distancias** de cada uno a otros dos fijos, los **focos** $F$ y $F'$, es constante e igual a $2a$, la longitud del eje mayor $AB$." },
      { kind: "facts", items: [
        { tex: "r + r' = 2a", label: "Radios vectores" },
        { tex: "a^2 = b^2 + c^2", label: "Semiejes y semidistancia focal" },
        { tex: "AB = 2a,\\; CD = 2b,\\; FF' = 2c", label: "Eje real, eje menor y distancia focal" },
      ] },
      { kind: "text", text: "Tiene dos **ejes** perpendiculares que se cortan en el centro $O$, y es simétrica respecto de ellos. La **circunferencia principal** ($O$, radio $a$) es el lugar geométrico de los pies de las perpendiculares trazadas por los focos a las tangentes; las **circunferencias focales** tienen por centro un foco y radio $2a$. Dos diámetros son **conjugados** si cada uno es el lugar de los puntos medios de las cuerdas paralelas al otro." },
    ]),
    ...construccionPasos("elipse-puntos", "elipse-haces", "elipse-envolventes", "elipse-circunferencias"),
  ],
};
