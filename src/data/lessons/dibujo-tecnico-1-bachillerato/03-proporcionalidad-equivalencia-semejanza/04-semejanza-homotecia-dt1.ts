import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const semejanzaHomoteciaDt1Lesson: InteractiveLesson = {
  slug: "semejanza-homotecia-dt1",
  title: "4. Semejanza y escalas",
  subtitle: DT1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("semejanza", "Misma forma, distinto tamaño", [], bench("semejanza-razon", [
      { title: "Mismos ángulos", text: "Dos figuras son **semejantes** si tienen los **mismos ángulos** y sus **lados correspondientes** son proporcionales. Aquí $ABC$ y $A'B'C'$ tienen los mismos tres ángulos.", fact: "Ángulos iguales" },
      { title: "Razón de semejanza", text: "Cada lado de $A'B'C'$ es el **doble** del correspondiente de $ABC$: $\\dfrac{A'B'}{AB} = 2$. Ese cociente es la **razón de semejanza** $k$.", fact: "k = 2" },
      { title: "Las áreas guardan k²", text: "Si la razón de longitudes es $k$, las **áreas** están en razón $k^2$ y los **volúmenes** en razón $k^3$. Con $k = 2$, el área se multiplica por **4**.", fact: "Área × k² · Volumen × k³" },
      { title: "Escalas de los planos", text: "Una **escala** es una semejanza: $1:50$ significa $k = \\dfrac{1}{50}$. Una longitud de 4 cm en el plano son 2 m reales, y las superficies guardan la razón $k^2 = \\dfrac{1}{2\\,500}$.", fact: "Escala 1:50 → k = 1/50" },
    ]), "stack"),

    benchTask("reduce-triangulo", "Reduce el triángulo", "homotecia-cuadricula", [
      { title: "Marca A′", text: "La **homotecia** es una transformación que da figuras semejantes. Con razón $\\dfrac{1}{2}$, cada vértice queda en la recta que lo une con $O$, a la **mitad de distancia**. Toca donde queda $A'$." },
      { title: "Marca B′", text: "Cuenta los cuadros desde $O$ hasta $B$ y toma la **mitad**." },
      { title: "Marca C′ y comprueba", text: "Marca $C'$ y pulsa **Comprobar**: el triángulo obtenido es semejante al original, con la mitad de lado y **la cuarta parte de área**." },
    ], {
      question: "Marca A', B' y C' al reducir el triángulo ABC con una homotecia de centro O y razón 1/2.",
      hint: "Desde O, cada vértice se acerca a la mitad de cuadros en cada dirección.",
      explanation: "Con razón 1/2 cada vértice queda a la mitad de distancia de O; los lados se reducen a la mitad y el área, a la cuarta parte (k² = 1/4).",
      params: { a: 0.5 },
    }),
  ],
};
