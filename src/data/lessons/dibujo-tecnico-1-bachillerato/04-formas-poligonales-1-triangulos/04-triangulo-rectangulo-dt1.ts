import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, slide } from "@/data/lessons/tec1-helpers";

export const trianguloRectanguloDt1Lesson: InteractiveLesson = {
  slug: "triangulo-rectangulo-dt1",
  title: "4. Construcción del triángulo rectángulo",
  subtitle: DT1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("catetos", "Dados los dos catetos", [], bench("rectangulo-catetos", [
      { title: "Los datos", text: "Se conocen los **catetos** $b$ y $c$. Como el ángulo recto ya es un dato, con estos dos tenemos los tres que hacen falta.", fact: "Catetos b y c" },
      { title: "Un cateto sobre la recta", text: "Se sitúa uno de ellos, por ejemplo $c = \\overline{AB}$.", fact: "c = AB" },
      { title: "Perpendicular por A", text: "Por el extremo $A$ se traza la **perpendicular** a $AB$: los catetos forman $90^\\circ$.", fact: "90° en A" },
      { title: "El otro cateto", text: "Sobre la perpendicular se lleva el otro cateto $b$ con el compás desde $A$. Al unir $C$ con $B$ se completa el triángulo.", fact: "AC = b" },
    ]), "stack"),

    slide("cateto-angulo", "Dados un cateto y un ángulo agudo", [], bench("rectangulo-cateto-angulo", [
      { title: "Los datos", text: "Se conocen un **cateto** $b$ y un **ángulo agudo** $\\hat C$. El ángulo recto completa los tres datos.", fact: "Cateto b y ángulo C" },
      { title: "El cateto sobre la recta", text: "Se sitúa el lado $b = \\overline{AC}$.", fact: "b = AC" },
      { title: "El ángulo en C", text: "En el vértice $C$ se construye el ángulo $\\hat C$ con ayuda de un arco: el lado queda marcado desde $C$.", fact: "Ángulo C en C" },
      { title: "Perpendicular por A", text: "Por $A$ se traza la **perpendicular** al lado $b$ hasta que corte al lado del ángulo $\\hat C$. El corte es el vértice $B$.", fact: "Perpendicular hasta B" },
    ]), "stack"),

    slide("hipotenusa", "Dados un cateto y la hipotenusa", [], bench("rectangulo-hipotenusa", [
      { title: "Los datos", text: "Se conocen el **cateto** $b$ y la **hipotenusa** $a$.", fact: "Hipotenusa a y cateto b" },
      { title: "La hipotenusa", text: "Se sitúa la hipotenusa $a = \\overline{BC}$.", fact: "a = BC" },
      { title: "La semicircunferencia", text: "Se traza la semicircunferencia de **diámetro $BC$**. Por la teoría del **arco capaz**, el ángulo $\\hat A = 90^\\circ$ si $A$ está en ella: el segmento $\\overline{BC}$ es un diámetro y abarca un ángulo central de $180^\\circ$.", fact: "Ángulo inscrito en el diámetro = 90°" },
      { title: "El cateto desde C", text: "Con centro en $C$ y **radio $b$** se corta la semicircunferencia: el punto es el vértice $A$.", fact: "CA = b" },
      { title: "Ángulo recto en A", text: "Al unir $A$ con $B$ y con $C$ queda el triángulo rectángulo, con el ángulo recto en $A$.", fact: "A = 90°" },
    ]), "stack"),
  ],
};
