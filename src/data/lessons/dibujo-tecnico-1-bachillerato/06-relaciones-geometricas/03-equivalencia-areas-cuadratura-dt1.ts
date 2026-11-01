import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const equivalenciaAreasCuadraturaDt1Lesson: InteractiveLesson = {
  slug: "equivalencia-areas-cuadratura-dt1",
  title: "3. Equivalencia de figuras y cuadratura",
  subtitle: DT1_SUBTITLES[6],
  stage: { theme: "board" },
  steps: [
    slide("equivalencia", "Distinta forma, misma área", [], bench("equivalencia-triangulos", [
      { title: "Triángulo y base", text: "Dos figuras son **equivalentes** si tienen la **misma área**, aunque su forma sea distinta. Parte de un triángulo $ABC$ con base $AB$ y altura $h$.", fact: "Equivalente = igual área" },
      { title: "Paralela por C", text: "Traza por $C$ la **paralela** $r$ a la base. Todos los puntos de $r$ están a la misma altura $h$ de $AB$." },
      { title: "Desliza el vértice", text: "Al mover $C$ por la paralela, el triángulo cambia de forma, pero **base y altura no cambian**: el área $\\dfrac{b \\cdot h}{2}$ es siempre la misma.", fact: "Misma base y misma altura" },
      { title: "Del triángulo al rectángulo", text: "El triángulo es equivalente a un **rectángulo** de la misma base y **mitad de altura**. Halla con la mediatriz el punto medio de la altura: sobre él se apoya el lado superior. De un **paralelogramo** se pasa a un rectángulo con la misma base y la misma altura.", fact: "Rectángulo: base b, altura h/2" },
    ]), "stack"),

    slide("cuadratura", "Cuadratura de un rectángulo", [], bench("cuadratura-compas", [
      { title: "Rectángulo ABCD", text: "La **cuadratura** de una figura es hallar el **cuadrado equivalente**. Para un rectángulo de base $b$ y altura $h$, el lado del cuadrado es la **media proporcional**: $x = \\sqrt{b \\cdot h}$.", fact: "x = √(b · h)" },
      { title: "Lleva la altura sobre la base", text: "Con centro en $B$ y radio $BC$, traza un arco que corte a la prolongación de $AB$ en $H$: ahora $AH = b + h$.", fact: "BH = h" },
      { title: "Semicircunferencia", text: "Halla el punto medio $O$ de $AH$ y traza la **semicircunferencia** de diámetro $AH$." },
      { title: "Perpendicular por B", text: "Levanta por $B$ la perpendicular: corta a la semicircunferencia en $E$. $BE = x$ es la media proporcional de $b$ y $h$." },
      { title: "El cuadrado sobre el rectángulo", text: "Toma $BE$ con el compás, clava la punta en $B$ y llévala **hacia la izquierda** hasta cortar a $AB$ en $F$: $BF = BE$. El cuadrado de lado $BE$ queda sobre el rectángulo y tiene **la misma área**: $x^2 = b \\cdot h$.", fact: "x² = b · h" },
    ]), "stack"),

    benchTask("cuadratura-construye", "Haz la cuadratura del rectángulo", "cuadratura-practica", [
      { title: "Toma la medida BC", text: "Toca $B$ para clavar la punta y $C$ para colocar la mina: el compás queda con la altura del rectángulo.", fact: "Abertura = BC" },
      { title: "Clava la punta en B", text: "Toca el vértice $B$." },
      { title: "Prolonga la base", text: "Arrastra la mina para trazar un arco que **corte a la prolongación de $AB$**: ese corte es $H$." },
      { title: "Toma la medida OH", text: "Ahora toca $O$ (el punto medio de $AH$) y luego $H$ para tomar el radio de la semicircunferencia.", fact: "Abertura = OH" },
      { title: "Clava la punta en O", text: "Toca el punto $O$." },
      { title: "Traza la semicircunferencia", text: "Arrastra la mina para trazar el arco **desde $H$ hasta $A$**, por encima de la base." },
      { title: "Perpendicular por B", text: "Toca **dos puntos**: $B$ y el punto de la semicircunferencia que está justo encima. La regla traza la perpendicular y marca el lado $BE$ del cuadrado." },
      { title: "Toma la medida BE", text: "Toca $B$ y después $E$: el compás queda con el lado del cuadrado.", fact: "Abertura = BE" },
      { title: "Clava la punta en B", text: "Toca el vértice $B$." },
      { title: "Llévala a la izquierda", text: "Arrastra la mina hacia la izquierda, girando desde $E$, hasta **cortar a $AB$**." },
      { title: "Marca F", text: "Toca el corte con $AB$: es $F$, y $BF = BE$ es la base del cuadrado." },
      { title: "El cuadrado", text: "La regla completa sola el cuadrado de lado $BE$ sobre el rectángulo.", fact: "Misma área que ABCD" },
    ], {
      question: "Halla el lado del cuadrado de igual área que el rectángulo ABCD con compás y regla.",
      hint: "Lleva la altura sobre la prolongación de la base, traza la semicircunferencia de diámetro AH y levanta la perpendicular por B.",
      explanation: "BE es la altura del triángulo rectángulo inscrito en la semicircunferencia, así que BE² = AB · BH = b · h.",
    }),
  ],
};
