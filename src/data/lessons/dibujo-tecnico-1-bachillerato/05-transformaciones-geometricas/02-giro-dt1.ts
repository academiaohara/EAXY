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

    benchTask("giro-practica", "Gira el punto A", "giro-practica", [
      { title: "Marca el ángulo", text: "Arrastra el segundo lado hasta marcar **60°** en la escala del transportador que parte de $OA$. Cuando coincida, suelta.", fact: "60° en sentido antihorario" },
      { title: "Toma la medida OA", text: "Toca $O$ para clavar la punta y $A$ para colocar la mina: el compás queda con el radio $OA$.", fact: "Abertura = OA" },
      { title: "Clava la punta en O", text: "Toca el centro $O$." },
      { title: "Traza el arco", text: "Arrastra la mina para trazar un arco que **corte al segundo lado** del ángulo." },
      { title: "Marca A′", text: "Toca el punto donde el arco corta al segundo lado: es $A'$. Después pulsa **Comprobar**." },
    ], {
      question: "Gira el punto A 60° en sentido antihorario alrededor de O con transportador y compás.",
      hint: "Marca 60° desde OA con el transportador y corta ese lado con un arco de radio OA.",
      explanation: "El punto girado conserva su distancia al centro (OA′ = OA) y forma con OA el ángulo del giro; por eso está donde el arco de radio OA corta al segundo lado.",
      params: { a: 60 },
    }),

    benchTask("giro-cuadricula", "Gira el triángulo", "giro-cuadricula", [
      { title: "Marca A′", text: "Cada vértice gira **90°** en sentido **antihorario** alrededor de $O$ y conserva su distancia a $O$. Toca la intersección donde queda $A'$." },
      { title: "Marca B′", text: "Gira $B$ igual: su segmento $OB$ también gira $90^\\circ$." },
      { title: "Marca C′ y comprueba", text: "Marca $C'$ y pulsa **Comprobar**: la figura girada debe ser igual que la original." },
    ], {
      question: "Marca A', B' y C' al girar el triángulo ABC 90° en sentido antihorario alrededor de O.",
      hint: "Un giro de 90° convierte un segmento horizontal desde O en uno vertical de la misma longitud.",
      explanation: "En un giro de 90° antihorario, un punto situado a la derecha de O pasa a estar encima, y uno situado encima pasa a estar a la izquierda, manteniendo la distancia a O.",
      params: { a: 90 },
    }),
  ],
};
