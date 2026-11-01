import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, slide } from "@/data/lessons/tec1-helpers";

export const sumaDiferenciaAngulosDt1Lesson: InteractiveLesson = {
  slug: "suma-diferencia-angulos-dt1",
  title: "10. Suma y diferencia de ángulos",
  subtitle: DT1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("suma", "Suma de ángulos", [], bench("suma-angulos-compas", [
      { title: "Dos ángulos", text: "Se trata de construir un ángulo que sea **suma de otros dos conocidos**, $\\hat{A}$ y $\\hat{B}$.", fact: "C = A + B" },
      { title: "Se copia A", text: "Se construye el ángulo $\\hat{A}$ como en el ejercicio de trasladar un ángulo: un arco con centro en el vértice $V$.", fact: "Arco de radio arbitrario" },
      { title: "Cuerda 1-2", text: "Se lleva la cuerda $\\overline{1\\text{-}2}$ del ángulo $\\hat{A}$ sobre el arco desde el primer lado.", fact: "Cuerda de A" },
      { title: "Cuerda 3-4", text: "A continuación, **a partir del segundo lado** de $\\hat{A}$, se lleva la cuerda $\\overline{3\\text{-}4}$ del ángulo $\\hat{B}$.", fact: "Cuerda de B" },
      { title: "El resultado", text: "El ángulo $\\hat{C}$ es la **suma** de los ángulos dados: $\\hat{C} = \\hat{A} + \\hat{B}$.", fact: "C = A + B" },
    ]), "stack"),

    slide("diferencia", "Diferencia de ángulos", [], bench("diferencia-angulos-compas", [
      { title: "Dos ángulos", text: "Se dan los ángulos $\\hat{A}$ y $\\hat{B}$ y hay que hallar el ángulo que sea su **diferencia** (con $\\hat{A} > \\hat{B}$).", fact: "C = A − B" },
      { title: "Primero el mayor", text: "Se dibuja primero el ángulo **mayor** $\\hat{A}$, con ayuda de la cuerda $\\overline{1\\text{-}2}$.", fact: "Ángulo mayor" },
      { title: "Se resta B", text: "Luego, a partir de $2$, se toma la cuerda $\\overline{3\\text{-}4}$ del ángulo $\\hat{B}$, **hacia dentro** del ángulo $\\hat{A}$.", fact: "Cuerda de B hacia dentro" },
      { title: "El resultado", text: "El ángulo $\\hat{C}$ comprendido entre el primer lado y el rayo obtenido es la **diferencia**: $\\hat{C} = \\hat{A} - \\hat{B}$.", fact: "C = A − B" },
    ]), "stack"),
  ],
};
