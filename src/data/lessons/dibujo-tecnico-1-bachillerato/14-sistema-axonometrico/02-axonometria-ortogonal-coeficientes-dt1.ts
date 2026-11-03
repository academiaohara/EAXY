import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { construccionPasos } from "@/data/lessons/construcciones-helpers";
import { slide, diagrama } from "@/data/lessons/tec1-helpers";

export const axonometriaOrtogonalCoeficientesDt1Lesson: InteractiveLesson = {
  slug: "axonometria-ortogonal-coeficientes-dt1",
  title: "2. Sistema isométrico y escala isométrica",
  subtitle: DT1_SUBTITLES[14],
  stage: { theme: "board" },
  steps: [
    slide("isometrico", "Sistema axonométrico isométrico", [
      { kind: "steps", items: [
        "Si los tres ejes forman el **mismo ángulo con el plano del cuadro**, se proyectan formando ángulos de **120°** entre sí. El triángulo fundamental $ABC$ es equilátero y el sistema se llama **isométrico** (igual medida): el coeficiente de reducción es el mismo para los tres ejes.",
        "Si **dos ejes** forman el mismo ángulo con el cuadro, el sistema es **dimétrico** (dos medidas).",
        "Si los ejes forman ángulos **diferentes**, es **trimétrico** (tres medidas): hay un coeficiente de reducción para cada eje.",
      ] },
      { kind: "text", text: "En este estudio se trata el isométrico por ser el más sencillo y rápido." },
    ], diagrama("d14-isometrico"), "visual-top"),
    slide("escala", "Escala isométrica", [
      { kind: "text", text: "En el sistema isométrico, toda recta paralela a un eje del sistema se **reduce en la misma proporción** al proyectarse sobre el cuadro: su proyección se obtiene multiplicando la longitud real por el coseno de $35°16'$, el ángulo que forma cualquier eje isométrico con el plano de proyección." },
      { kind: "rule", title: "Escala de reducción isométrica", text: "Común a los tres ejes: $0{,}816:1$, siendo $0{,}816 = \\cos 35°16'$." },
    ], diagrama("d14-escala"), "visual-top"),
    ...construccionPasos("axo-escala-isometrica"),
    slide("construccion-escala", "Cómo se obtiene la escala sobre los ejes", [
      { kind: "text", text: "En la figura 5 se dibuja la misma construcción sobre los ejes: se traza una recta $\\pi_1$ perpendicular al eje $Z$, que corta a $X$ e $Y$ en $A$ y $B$. El triángulo $AOB$ es rectángulo en $O$, así que, abatido sobre el cuadro, da $AO_0B$ con $O_0$ en la prolongación de $Z$ y sobre la circunferencia de diámetro $AB$. Sobre uno de los catetos se construye la escala natural y se refiere sobre el eje correspondiente: se ven los centímetros reducidos." },
      { kind: "warning", title: "En la práctica", text: "Aplicado a la perspectiva de piezas en el dibujo industrial, se puede **no considerar el acortamiento** que sufren las rectas isométricas y representarlas con su medida real, obteniendo una perspectiva de forma semejante, pero mayor." },
    ], diagrama("d14-escala"), "visual-top"),
    slide("sin-reducir", "Perspectivas sin reducir", [
      { kind: "text", text: "Consiste en **no reducir ninguna cota**: si la cota es 70, se coloca 70 sobre el eje $X$, el $Y$ o el $Z$. Se aplica la escala $1:0{,}816 = 1{,}22$ y la perspectiva resulta semejante, pero un **22 % mayor**." },
    ], diagrama("d14-sin-reducir"), "visual-top"),
  ],
};
