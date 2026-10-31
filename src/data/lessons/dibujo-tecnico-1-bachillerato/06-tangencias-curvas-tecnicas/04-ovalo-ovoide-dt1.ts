import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { anim, calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const ovaloOvoideDt1Lesson: InteractiveLesson = {
  slug: "ovalo-ovoide-dt1",
  title: "4. Curvas técnicas: óvalo y ovoide",
  subtitle: DT1_SUBTITLES[4],
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
    slide("traza", "Óvalo dados los ejes", [
      { kind: "text", text: "Construcción con regla y compás cuando se conocen el eje mayor y el eje menor." },
    ], anim("dt1-trazado-ovalo"), "visual-top"),
    slide("explora", "Un óvalo a tu medida", [
      { kind: "text", text: "Para los mismos ejes hay infinitos óvalos: depende del radio elegido para los arcos pequeños." },
    ], tool("dt1-ovalo-explorador"), "visual-top"),
    slide("ovoide", "El ovoide", [
      { kind: "steps", items: [
        "**Ovoide**: un **semicírculo** de radio $r$ en la parte inferior, dos **arcos laterales** de radio $2r$ con centros en los extremos del diámetro y un **arco superior** más pequeño que cierra la curva, tangente a los dos laterales.",
        "En su construcción se emplean **triángulos equiláteros** o **ángulos de 60°** que fijan las posiciones de los centros.",
        "La forma resultante es **simétrica respecto a un solo eje**, lo que la hace útil para **perfiles de levas y huevos de diseño**.",
      ] },
    ]),
    calc("calc-r", "Radio de los arcos grandes", "Un óvalo con semiejes a = 5 y b = 3 cm y arcos pequeños de radio r = 1,5 cm. Aplica R = (a² + b² − 2ar)/(2(b − r)). ¿Cuánto vale R, en cm? (dos decimales)", nums(6.33, 6.333), "(25 + 9 − 15)/(2 · 1,5) = 19/3 ≈ 6,33 cm.", "Sustituye los datos."),
    calc("calc-yc", "Posición de los centros grandes", "Con R = 6,33 cm y b = 3 cm, los centros de los arcos grandes están sobre el eje menor a una distancia R − b del centro O. ¿A cuántos cm? (dos decimales)", nums(3.33, 3.333), "6,333 − 3 = 3,33 cm.", "Resta b al radio grande."),
    calc("calc-xc", "Posición de los centros pequeños", "En ese óvalo, los centros de los arcos pequeños están sobre el eje mayor a una distancia a − r de O. ¿A cuántos cm?", nums(3.5), "5 − 1,5 = 3,5 cm.", "Resta r a a."),
    sort("clasifica-curva", "¿Qué curva es?", "Clasifica según las propiedades.",
      [["ova", "Óvalo", "cobalt"], ["ovo", "Ovoide", "amber"], ["eli", "Elipse", "emerald"]],
      [["Cuatro arcos con dos ejes de simetría", "ova"], ["Perfil de un arco apainelado de puente", "ova"], ["Cuatro arcos con un solo eje de simetría", "ovo"], ["Forma de huevo", "ovo"], ["Suma constante de distancias a dos focos", "eli"], ["Curvatura que varía de forma continua", "eli"]],
      "Óvalo y ovoide se hacen con arcos; la elipse es una cónica.",
    ),
    pick("check-enlaces", "Puntos de enlace", "¿Dónde están los puntos de enlace entre dos arcos tangentes de un óvalo?",
      "Sobre la recta que une los centros de los dos arcos",
      [["En los extremos de los ejes", "Solo los extremos están en los vértices."], ["En el centro del óvalo", "El centro no pertenece a la curva."], ["En la mediatriz de los ejes", "Los puntos de enlace están en las rectas de los centros."]],
      "Dos circunferencias tangentes tienen el punto de tangencia alineado con sus centros.",
    ),
  ],
};
