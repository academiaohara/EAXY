import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { calc, nums, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const isometricaPiezasElipsesDt1Lesson: InteractiveLesson = {
  slug: "isometrica-piezas-elipses-dt1",
  title: "3. Perspectiva isométrica de piezas",
  subtitle: DT1_SUBTITLES[14],
  stage: { theme: "board" },
  steps: [
    slide("def", "Dibujar una pieza en isométrica", [
      { kind: "steps", items: [
        "Se eligen los ejes con **Z vertical** y **X, Y a 30°** de la horizontal (120° entre ejes).",
        "Las **medidas** paralelas a los ejes se llevan **en verdadera magnitud** (coeficiente 1) o **reducidas** a 0,816.",
        "Las aristas **no paralelas a los ejes** (inclinadas) no se pueden medir directamente: se dibujan **por sus extremos** situados con coordenadas.",
        "Se empieza por el **prisma envolvente** y se **recortan** los volúmenes que faltan. Después se añaden agujeros y redondeos.",
      ] },
    ], undefined, "stack"),
    slide("explora", "Una pieza con agujero", [
      { kind: "text", text: "Cambia las dimensiones, el coeficiente y el agujero. Compara la elipse con el diámetro." },
    ], tool("dt1-isometrica-pieza-explorador"), "visual-top"),
    slide("elipses", "Las circunferencias", [
      { kind: "steps", items: [
        "Una circunferencia contenida en un **plano coordenado** se proyecta como una **elipse**.",
        "El **eje mayor** mide el **diámetro** (con coeficiente 0,816) y es **perpendicular al eje** que no pertenece al plano; el **eje menor** mide $0{,}577\\,D$ y va en la dirección de ese eje.",
        "Con coeficiente 1, ambos se multiplican por 1,22: **1,22 D** y **0,71 D**.",
        "En la práctica se **aproxima** la elipse con **cuatro arcos** (óvalo isométrico), con los centros hallados sobre las diagonales del rombo en que se inscribe.",
      ] },
    ]),
    calc("calc-mayor", "Eje mayor con coeficiente 1", "Un agujero de 40 mm de diámetro en una cara. Con coeficiente 1 el eje mayor de la elipse mide 1,22·D. ¿Cuántos mm? (un decimal)", nums(49, 48.99, 49.0), "40 · 1,2247 ≈ 49 mm.", "Multiplica por 1,2247."),
    calc("calc-menor", "Eje menor con coeficiente 1", "Con ese mismo agujero, el eje menor mide 0,707·D. ¿Cuántos mm? (un decimal)", nums(28.3, 28.28), "40 · 0,7071 ≈ 28,3 mm.", "0,707 = 1,2247 · 0,577."),
    calc("calc-red", "Coeficiente reducido", "Con coeficiente 0,816, el eje menor de la elipse de un agujero de 50 mm mide 0,577·D. ¿Cuántos mm? (un decimal)", nums(28.9, 28.87), "50 · 0,5774 ≈ 28,9 mm.", "0,577 = 1/√3."),
    sort("clasifica-iso", "¿Verdadero o falso?", "Clasifica cada afirmación sobre la isométrica.",
      [["ver", "Correcta", "cobalt"], ["fal", "Incorrecta", "amber"]],
      [["Los tres ejes forman 120°", "ver"], ["Con coeficiente 1 la pieza sale mayor que con 0,816", "ver"], ["Una circunferencia de una cara se dibuja como elipse", "ver"], ["Una circunferencia de una cara se dibuja como circunferencia", "fal"], ["Las aristas inclinadas se miden directamente", "fal"]],
      "En isométrica solo se miden directamente las aristas paralelas a los ejes.",
    ),
    pick("check-mayor", "Dirección de la elipse", "En una circunferencia de la cara superior de una pieza (plano XY), ¿cómo es el eje mayor de la elipse respecto al eje Z?",
      "Perpendicular al eje Z",
      [["Paralelo al eje Z", "Es el eje menor el que va en esa dirección."], ["A 45° del eje Z", "Es exactamente perpendicular."], ["Coincide con el eje X", "El eje mayor es horizontal."]],
      "El eje mayor es perpendicular al eje que no está en el plano de la circunferencia (en la cara superior, horizontal).",
    ),
  ],
};
