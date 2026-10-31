import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const mediaProporcionalSeccionAureaDt1Lesson: InteractiveLesson = {
  slug: "media-proporcional-seccion-aurea-dt1",
  title: "2. Tercera y media proporcional. Sección áurea",
  subtitle: DT1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("media", "Media proporcional: teorema de la altura", [], bench("media-compas", [
      { title: "Dos segmentos consecutivos", text: "La **media proporcional** de $a$ y $b$ es el $x$ tal que $\\dfrac{a}{x} = \\dfrac{x}{b}$, es decir, $x = \\sqrt{a\\,b}$. Para construirla se ponen $a$ y $b$ **uno a continuación del otro**: $AH = a$ y $HB = b$.", fact: "x = √(a · b)" },
      { title: "Punto medio y radio", text: "Halla el punto medio $O$ de $AB$ (con la mediatriz) y toma con el compás la distancia $OB$." },
      { title: "Semicircunferencia", text: "Con centro en $O$, traza la **semicircunferencia** de diámetro $AB$.", fact: "Diámetro AB" },
      { title: "Perpendicular por H", text: "Levanta por $H$ la perpendicular a $AB$: corta a la semicircunferencia en $C$. El segmento $CH$ es la **altura**." },
      { title: "Teorema de la altura", text: "En el triángulo rectángulo $ABC$, la altura sobre la hipotenusa cumple $h^2 = a \\cdot b$: $h$ es la **media proporcional**. La **tercera proporcional** $x = \\dfrac{b^2}{a}$ se halla como una cuarta proporcional con Thales.", fact: "h² = a · b" },
    ]), "stack"),

    benchTask("media-construye", "Traza la media proporcional", "media-practica", [
      { title: "Toma la medida OB", text: "Toca $O$ para clavar la punta y $B$ para colocar la mina: el compás queda con el radio de la semicircunferencia.", fact: "Abertura = OB" },
      { title: "Clava la punta en O", text: "Toca el punto medio $O$ del segmento." },
      { title: "Traza la semicircunferencia", text: "Arrastra la mina para trazar el arco **desde $B$ hasta $A$**, por encima del segmento." },
      { title: "Perpendicular por H", text: "Toca **dos puntos**: $H$ y el punto de la semicircunferencia que está justo encima. La regla trazará la altura." },
    ], {
      question: "Traza la media proporcional de a y b con la semicircunferencia de diámetro AB y la perpendicular por H.",
      hint: "La perpendicular pasa por H y corta a la semicircunferencia.",
      explanation: "CH es la altura sobre la hipotenusa del triángulo rectángulo ABC, y por el teorema de la altura CH² = AH · HB.",
    }),

    slide("aurea", "La sección áurea", [], bench("aurea-compas", [
      { title: "Perpendicular de longitud AB/2", text: "Un segmento se divide en **media y extrema razón** si el total es a la parte mayor como la mayor es a la menor. En $B$ levanta una perpendicular $BC$ de longitud **$AB/2$**.", fact: "BC = AB / 2" },
      { title: "Une A con C", text: "Con la regla, traza la hipotenusa $AC$." },
      { title: "Arco desde C", text: "Con centro en $C$ y radio $CB$, traza un arco que corta a $AC$ en $D$." },
      { title: "Arco desde A", text: "Con centro en $A$ y radio $AD$, traza un arco que corta a $AB$ en $E$." },
      { title: "El número áureo", text: "$E$ divide $AB$ en media y extrema razón: $\\dfrac{AB}{AE} = \\dfrac{AE}{EB} = \\varphi = \\dfrac{1+\\sqrt{5}}{2} \\approx 1{,}618$. Aparece en la arquitectura clásica, el diseño y la naturaleza.", fact: "φ ≈ 1,618" },
    ]), "stack"),

    benchTask("aurea-construye", "Construye la sección áurea", "aurea-practica", [
      { title: "Toma la medida CB", text: "Toca $C$ para clavar la punta y $B$ para colocar la mina.", fact: "Abertura = CB" },
      { title: "Clava la punta en C", text: "Toca el vértice $C$." },
      { title: "Corta la hipotenusa", text: "Arrastra la mina para trazar un arco que **corte a $AC$**: ese corte es $D$." },
      { title: "Toma la medida AD", text: "Toca $A$ y luego $D$ para tomar la distancia $AD$.", fact: "Abertura = AD" },
      { title: "Clava la punta en A", text: "Toca el vértice $A$." },
      { title: "Corta el segmento", text: "Arrastra la mina para trazar un arco que **corte a $AB$**." },
      { title: "Marca E", text: "Toca el punto donde el arco corta a $AB$: es $E$." },
    ], {
      question: "Divide el segmento AB en media y extrema razón (sección áurea) con regla y compás.",
      hint: "Arco de centro C y radio CB hasta AC; arco de centro A y radio AD hasta AB.",
      explanation: "La construcción da AE = AB/φ ≈ 0,618 · AB: el punto E divide AB en media y extrema razón.",
    }),
  ],
};
