import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const ovaloOvoideDt1Lesson: InteractiveLesson = {
  slug: "ovalo-ovoide-dt1",
  title: "1. Curvas técnicas: óvalo y ovoide",
  subtitle: DT1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("def", "Curvas hechas con arcos", [
      { kind: "steps", items: [
        "Las **curvas técnicas** se trazan con **arcos de circunferencia** tangentes entre sí, por lo que se pueden construir con compás y mecanizar fácilmente.",
        "**Óvalo**: curva cerrada de **4 arcos** con **dos ejes de simetría** (mayor y menor). Se usa en trazados de pistas, arcos escarzanos, contornos de piezas y bridas.",
        "**Ovoide**: curva cerrada de **4 arcos** con **un solo eje de simetría**, con forma de huevo.",
        "En todos, los **puntos de enlace** están sobre las **rectas que unen los centros** de los arcos consecutivos.",
        "No son **elipses**: la elipse es una cónica (curva de curvatura continua) que se estudia en 2.º.",
      ] },
    ], undefined, "stack"),

    slide("traza", "Óvalo dado el eje mayor", [], bench("ovalo-compas", [
      { title: "Eje mayor en tres partes", text: "Se conoce el **eje mayor** $AB$. Divídelo en **tres partes iguales** de longitud $d$: los puntos de división son $O_1$ y $O_2$, centros de los arcos pequeños.", fact: "AB = 3d" },
      { title: "Los otros dos centros", text: "Con radio $d$ traza circunferencias con centros en $O_1$ y en $O_2$: se cortan en $O_3$ y $O_4$, centros de los arcos grandes.", fact: "O₃ y O₄ en el corte" },
      { title: "Rectas de enlace", text: "Traza las rectas $O_3O_1$, $O_3O_2$, $O_4O_1$ y $O_4O_2$ y prolóngalas: los **puntos de enlace** están sobre ellas.", fact: "Enlaces sobre rectas de centros" },
      { title: "Arcos grandes", text: "Con centro en $O_3$ y radio $2d$ traza el arco inferior entre las dos rectas; con $O_4$, el superior.", fact: "Radio 2d" },
      { title: "Arcos pequeños", text: "Con centro en $O_1$ y radio $d$ cierra el óvalo por la izquierda; con $O_2$, por la derecha.", fact: "Radio d" },
      { title: "El óvalo", text: "Los cuatro arcos son **tangentes** entre sí. El óvalo tiene dos ejes de simetría y **no es una elipse**.", fact: "Cuatro arcos tangentes" },
    ]), "stack"),

    slide("ovoide", "El ovoide", [
      { kind: "steps", items: [
        "**Ovoide**: un **semicírculo** de radio $r$ en la parte inferior, dos **arcos laterales** de radio $2r$ con centros en los extremos del diámetro y un **arco superior** más pequeño que cierra la curva, tangente a los dos laterales.",
        "En su construcción se emplean **triángulos equiláteros** o **ángulos de 60°** que fijan las posiciones de los centros.",
        "La forma resultante es **simétrica respecto a un solo eje**, lo que la hace útil para **perfiles de levas y huevos de diseño**.",
      ] },
    ], undefined, "stack"),

    benchTask("ovalo-construye", "Dibuja el óvalo", "ovalo-practica", [
      { title: "Toma la medida d", text: "Toca $O_1$ y $O_2$: el compás queda con la abertura $d$.", fact: "Abertura = d" },
      { title: "Clava la punta en O₁", text: "Toca $O_1$." },
      { title: "Circunferencia de O₁", text: "Arrastra la mina para trazar el arco **por encima y por debajo** del eje." },
      { title: "Clava la punta en O₂", text: "Toca $O_2$, con la misma abertura." },
      { title: "Circunferencia de O₂", text: "Traza el arco que corta al anterior en dos puntos." },
      { title: "Marca O₃", text: "Toca el corte de **arriba**: es el centro $O_3$." },
      { title: "Marca O₄", text: "Toca el corte de **abajo**: es $O_4$." },
      { title: "Recta O₃O₁", text: "Pasa la regla por $O_3$ y $O_1$ y prolóngala." },
      { title: "Recta O₃O₂", text: "Ahora por $O_3$ y $O_2$." },
      { title: "Recta O₄O₁", text: "Por $O_4$ y $O_1$." },
      { title: "Recta O₄O₂", text: "Y por $O_4$ y $O_2$." },
      { title: "Toma el radio grande", text: "Toca los extremos de la tira $2d$: el compás se abre al radio de los arcos grandes.", fact: "Radio 2d" },
      { title: "Clava la punta en O₃", text: "Toca $O_3$." },
      { title: "Arco inferior", text: "Traza el arco **por debajo** entre las dos rectas que salen de $O_3$." },
      { title: "Clava la punta en O₄", text: "Toca $O_4$." },
      { title: "Arco superior", text: "Traza el arco **por arriba**, entre las dos rectas que salen de $O_4$." },
      { title: "Toma el radio pequeño", text: "Toca $O_1$ y $O_2$ otra vez: abertura $d$.", fact: "Radio d" },
      { title: "Clava la punta en O₁", text: "Toca $O_1$." },
      { title: "Cierra por la izquierda", text: "Traza el arco que une los dos arcos grandes por el extremo $A$." },
      { title: "Clava la punta en O₂", text: "Toca $O_2$." },
      { title: "Cierra por la derecha", text: "Traza el último arco por el extremo $B$: el óvalo queda cerrado.", fact: "Dos ejes de simetría" },
    ], {
      question: "Dibuja el óvalo de eje mayor AB con los cuatro arcos tangentes, a partir de los centros O₁ y O₂.",
      hint: "Traza circunferencias de radio d desde O₁ y O₂: se cortan en O₃ y O₄. Prolonga las rectas de los centros y cierra con arcos de radio 2d y d.",
      explanation: "Cada punto de enlace está sobre la recta que une los centros de los dos arcos que enlaza, así que los arcos son tangentes: no hay esquinas. Los arcos grandes tienen radio 2d y los pequeños, d.",
    }),
  ],
};
