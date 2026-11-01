import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, slide } from "@/data/lessons/tec1-helpers";

export const elementosSignosGeometricosDt1Lesson: InteractiveLesson = {
  slug: "elementos-signos-geometricos-dt1",
  title: "3. Elementos geométricos y signos",
  subtitle: DT1_SUBTITLES[11],
  stage: { theme: "board" },
  steps: [
    slide("intro", "Cómo estudiar las construcciones", [
      { kind: "steps", items: [
        "Este tema reúne construcciones **sencillas y elementales**, necesarias después en construcciones de mayor dificultad.",
        "La **rapidez** y la **precisión** son las dos características principales de un dibujo técnico: a ellas hay que dedicar la mayor atención.",
        "Las construcciones **no se aprenden de memoria**: a partir de los datos y de las propiedades geométricas de cada caso se **razona el problema** y se fija bien **el porqué** de cada operación.",
        "Si se dominan estas construcciones sin consultar apuntes, se ha dado el primer paso seguro en el aprendizaje de este idioma: el dibujo.",
      ] },
    ], undefined, "stack"),

    slide("elementos", "Concepto y designación de los elementos", [], bench("elementos-geometricos", [
      { title: "Punto", text: "El **punto** es la intersección de dos rectas. Se designa con **letras mayúsculas** ($A, B, C, \\dots, P, Q, R, \\dots$) o con **números** ($1, 2, 3, \\dots$).", fact: "Mayúsculas o números" },
      { title: "Línea recta", text: "Una **línea recta** es una sucesión de puntos en una misma dirección. Las rectas se designan con **letras minúsculas**: $a, b, c, \\dots, p, q, r, \\dots$", fact: "Minúsculas" },
      { title: "Línea curva", text: "Una **línea curva** es una sucesión de puntos que **no están en la misma dirección**. Se designa con una letra minúscula: curva $c$.", fact: "Curva c" },
      { title: "Segmento", text: "Un **segmento** es una parte de recta limitada por sus extremos. Se designa con una letra minúscula (segmento $a$) o con las **dos letras mayúsculas de sus extremos** (segmento $AB$).", fact: "Segmento a o AB" },
      { title: "Semirrecta", text: "Una **semirrecta** es una recta limitada en un solo extremo: semirrecta $O$-$r$, con origen en $O$.", fact: "Un extremo" },
      { title: "Ángulo", text: "Un **ángulo** es la porción de plano comprendida entre dos semirrectas que tienen el mismo origen. Las semirrectas son los **lados** y el origen, el **vértice**. Se designan con una letra mayúscula en el vértice o con una letra griega: ángulo $A$, ángulo $\\beta$.", fact: "Lados y vértice" },
      { title: "Plano", text: "Un **plano** es la superficie formada por puntos no alineados. Queda definido por **tres puntos** no alineados, por **dos rectas** que se cortan o son paralelas, o por una **recta y un punto** exterior. Se designan con letras griegas minúsculas: $\\alpha, \\beta, \\delta, \\pi, \\dots$", fact: "Tres puntos definen un plano" },
    ]), "stack"),

    slide("signos", "Principales signos geométricos", [
      { kind: "steps", items: [
        "$\\parallel$ **paralela a**   ·   $\\perp$ **perpendicular a**.",
        "$\\widehat{COD}$ **ángulo** $COD$   ·   $\\overset{\\frown}{NM}$ **arco** $NM$   ·   $\\angle$ con punto: **ángulo recto**.",
        "$\\triangle$ **triángulo**   ·   $\\square$ **cuadrado**.",
        "$\\varnothing$ **diámetro**   ·   $R$ **radio**   ·   $d$ **diámetro**.",
        "$\\overline{RS}$ **segmento** $RS$   ·   $|\;|$ **longitud**.",
        "$<$ **menor que**   ·   $>$ **mayor que**   ·   $\\le$ **igual o menor que**   ·   $\\ge$ **igual o mayor que**.",
      ] },
    ], undefined, "stack"),
  ],
};
