import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const giroDt1Lesson: InteractiveLesson = {
  slug: "giro-dt1",
  title: "2. Giro",
  subtitle: DT1_SUBTITLES[12],
  stage: { theme: "board" },
  steps: [
    slide("giro", "Girar una figura", [], bench("giro-compas", [
      { title: "Un centro y un ángulo", text: "Un **giro** hace girar todos los puntos de una figura el **mismo ángulo** alrededor de un punto fijo, el **centro** $O$. Aquí, $60^\\circ$ en sentido **antihorario**." },
      { title: "Mide el ángulo", text: "Para girar $A$: une $O$ con $A$, apoya el transportador con su centro en $O$ y el $0^\\circ$ sobre $OA$, y marca $60^\\circ$. Traza el segundo lado.", fact: "Centro en O · 0° sobre OA" },
      { title: "Traza el arco", text: "Con la punta seca en $O$ y la mina en $A$, traza un arco hasta cortar al segundo lado: ahí está $A'$.", fact: "OA = OA′" },
      { title: "Repite con B y C", text: "Haz lo mismo con $B$ y con $C$: cada uno **conserva su distancia a $O$** y recorre un arco de $60^\\circ$." },
      { title: "La figura girada", text: "Al unir $A'$, $B'$ y $C'$ se obtiene una figura **igual** a la original, solo que girada $60^\\circ$ alrededor de $O$. Los ángulos $AOA'$, $BOB'$ y $COC'$ miden $60^\\circ$.", fact: "Mismo ángulo y misma distancia a O" },
    ], { a: 60 }), "stack"),

    benchTask("giro-construye", "Gira el triángulo", "giro-practica", [
      ...["A", "B", "C"].flatMap((n) => [
        { title: `${n} · Marca el ángulo`, text: `Arrastra el segundo lado hasta marcar **60°** en la escala del transportador que parte de $O${n}$. Cuando coincida, suelta.`, fact: "60° en sentido antihorario" },
        { title: `${n} · Toma la medida O${n}`, text: `Toca $O$ para clavar la punta y $${n}$ para colocar la mina: el compás queda con el radio $O${n}$.`, fact: `Abertura = O${n}` },
        { title: `${n} · Clava la punta en O`, text: "Toca el centro $O$." },
        { title: `${n} · Traza el arco`, text: "Arrastra la mina para trazar un arco que **corte al segundo lado** del ángulo." },
        { title: `${n} · Marca ${n}′`, text: `Toca el punto donde el arco corta al segundo lado: es $${n}'$.` },
      ]),
      { title: "Une los puntos", text: "La regla traza sola los tres lados: $A'B'$, $B'C'$ y $C'A'$. Con eso queda construida la figura transformada.", fact: "Tres pasadas de la regla" },
    ], {
      question: "Gira el triángulo ABC 60° en sentido antihorario alrededor de O con transportador y compás, y une los puntos.",
      hint: "Para cada vértice, marca 60° desde O y el vértice con el transportador y corta ese lado con un arco de radio igual a la distancia al centro.",
      explanation: "Cada vértice conserva su distancia a O y recorre el mismo ángulo, así que A′B′C′ es igual que ABC, girado 60° alrededor de O.",
      params: { a: 60 },
    }),
  ],
};
