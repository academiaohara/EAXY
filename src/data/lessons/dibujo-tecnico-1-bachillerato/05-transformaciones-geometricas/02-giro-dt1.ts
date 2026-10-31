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

    ...["A", "B", "C"].map((n, i) =>
      benchTask(`giro-${n.toLowerCase()}`, `Gira el punto ${n}`, "giro-practica", [
        { title: "Marca el ángulo", text: `Arrastra el segundo lado hasta marcar **60°** en la escala del transportador que parte de $O${n}$. Cuando coincida, suelta.`, fact: "60° en sentido antihorario" },
        { title: `Toma la medida O${n}`, text: `Toca $O$ para clavar la punta y $${n}$ para colocar la mina: el compás queda con el radio $O${n}$.`, fact: `Abertura = O${n}` },
        { title: "Clava la punta en O", text: "Toca el centro $O$." },
        { title: "Traza el arco", text: "Arrastra la mina para trazar un arco que **corte al segundo lado** del ángulo." },
        { title: `Marca ${n}′`, text: `Toca el punto donde el arco corta al segundo lado: es $${n}'$. Después pulsa **Comprobar**.${i > 0 ? " Los puntos anteriores ya están girados." : ""}` },
      ], {
        question: `Gira el punto ${n} 60° en sentido antihorario alrededor de O con transportador y compás.`,
        hint: `Marca 60° desde O${n} con el transportador y corta ese lado con un arco de radio O${n}.`,
        explanation: `El punto girado conserva su distancia al centro (O${n}′ = O${n}) y forma con O${n} el ángulo del giro; por eso está donde el arco de radio O${n} corta al segundo lado.`,
        params: { a: 60, b: i },
      }),
    ),

    benchTask("giro-union", "Une A′, B′ y C′", "union-imagen", [
      { title: "Une los puntos", text: "Pasa la regla por **dos puntos** cada vez: primero $A'$ y $B'$, luego $B'$ y $C'$ y por último $C'$ y $A'$. Toca los dos extremos de cada lado. Después pulsa **Comprobar**.", fact: "Tres pasadas de la regla" },
    ], {
      question: "Une con la regla los puntos A', B' y C' para obtener el triángulo girado.",
      hint: "Hay tres lados: A′B′, B′C′ y C′A′.",
      explanation: "El triángulo A′B′C′ es igual que ABC, girado 60° alrededor de O.",
      params: { a: 1 },
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
