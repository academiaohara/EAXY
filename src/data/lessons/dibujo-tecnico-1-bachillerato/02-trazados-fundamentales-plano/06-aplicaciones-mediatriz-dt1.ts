import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchParte, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const aplicacionesMediatrizDt1Lesson: InteractiveLesson = {
  slug: "aplicaciones-mediatriz-dt1",
  title: "6. Aplicaciones de la mediatriz",
  subtitle: DT1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("def", "La mediatriz resuelve muchos problemas", [
      { kind: "steps", items: [
        "La **mediatriz** de un segmento $AB$ es la recta **perpendicular a él en su punto medio**. Es un **lugar geométrico**: todos sus puntos equidistan de $A$ y de $B$.",
        "Con centros en $A$ y $B$ y un radio **mayor que la mitad de $AB$** se trazan los arcos $1$ y $2$, que se cortan en $P$ y $Q$. La recta $PQ$ es la mediatriz.",
        "Aplicaciones: **perpendiculares** a una recta, **división de arcos y segmentos** en partes iguales y **arco por tres puntos**.",
      ] },
    ], undefined, "stack"),

    slide("perp-exterior", "Perpendicular desde un punto exterior", [], benchParte("perpendicular-compas", 0, [
      { title: "Desde un punto exterior: arco", text: "**Perpendicular a una recta $t$ por un punto exterior $P$.** Con centro en $P$ y un radio arbitrario, se traza un arco que corta a la recta $t$ en $A$ y $B$.", fact: "Arco con centro en P" },
      { title: "Desde un punto exterior: mediatriz", text: "La **mediatriz del segmento $AB$** es la solución. Se opera como en el caso anterior: arcos de igual radio desde $A$ y desde $B$.", fact: "Mediatriz de AB" },
      { title: "Desde un punto exterior: resultado", text: "La mediatriz de $AB$ pasa por $P$ y es **perpendicular a $t$**: $P$ equidista de $A$ y $B$.", fact: "P equidista de A y B" },
    ]), "stack"),

    slide("perp-recta", "Perpendicular por un punto de la recta", [], benchParte("perpendicular-compas", 3, [
      { title: "Por un punto de la recta: arco", text: "**Perpendicular a una recta $r$ por un punto $P$ de ella.** Con centro en $P$ se traza un arco de radio arbitrario que determina los puntos $A$ y $B$ sobre la recta.", fact: "PA = PB" },
      { title: "Por un punto de la recta: mediatriz", text: "La mediatriz del segmento $AB$ es la solución: se trazan los arcos 1 y 2 con centros en $A$ y $B$.", fact: "Mediatriz de AB" },
      { title: "Por un punto de la recta: resultado", text: "Como $P$ es el punto medio de $AB$, la mediatriz pasa por $P$ y es perpendicular a $r$.", fact: "P es el punto medio" },
    ]), "stack"),

    slide("perp-extremo", "Perpendicular en el extremo de una semirrecta", [], benchParte("perpendicular-compas", 6, [
      { title: "En el extremo de una semirrecta: arco", text: "**Perpendicular a una semirrecta en su extremo $O$.** Con centro en $O$ se traza un arco de radio $ON$ arbitrario, que corta a la semirrecta en $N$.", fact: "ON = radio" },
      { title: "En el extremo: arcos de igual radio", text: "Con centro en $N$ y el mismo radio se corta el arco en $M$; con centro en $M$ y el mismo radio se vuelve a cortar al primer arco en $L$.", fact: "NM = ML = ON" },
      { title: "En el extremo: resultado", text: "La mediatriz del segmento $ML$ es la recta $p$, **perpendicular a la semirrecta en $O$**.", fact: "p ⟂ semirrecta en O" },
    ]), "stack"),

    benchTask("perpendicular-punto", "Perpendicular por un punto de la recta", "perpendicular-punto-practica", [
      { title: "Clava la punta en P", text: "Toca el punto $P$ de la recta $r$." },
      { title: "Abre el compás", text: "Arrastra la mina hasta una abertura cualquiera y pulsa «Fijar abertura».", fact: "Radio arbitrario" },
      { title: "Traza el semicírculo", text: "Arrastra la mina para trazar un arco por encima de la recta que **corte a $r$ a los dos lados** de $P$." },
      { title: "Marca A", text: "Toca el corte de la **izquierda**: es el punto $A$." },
      { title: "Marca B", text: "Toca el corte de la **derecha**: es el punto $B$. Ahora $PA = PB$." },
      { title: "Clava la punta en A", text: "Para la mediatriz de $AB$, toca $A$ o $B$." },
      { title: "Abre más", text: "Abre el compás **más que antes** (más de la mitad de $AB$) y pulsa «Fijar abertura».", fact: "Radio > PA" },
      { title: "Arco desde A", text: "Traza el arco **por encima y por debajo** de la recta." },
      { title: "Clava la punta en el otro extremo", text: "Toca el otro extremo, sin cambiar la abertura." },
      { title: "Arco desde B", text: "Traza el arco que corta al anterior en **dos puntos**." },
      { title: "Traza la perpendicular", text: "Toca **los dos puntos** donde se cortan los arcos: la regla pasa por $P$ y es perpendicular a $r$.", fact: "Mediatriz de AB" },
    ], {
      question: "Traza la perpendicular a la recta r por su punto P, con compás y regla.",
      hint: "Marca A y B a la misma distancia de P y haz la mediatriz de AB con arcos de mayor radio.",
      explanation: "PA = PB, así que P es el punto medio de AB y la mediatriz de AB pasa por P y es perpendicular a r.",
    }),

    slide("arco-bisecado", "Arco bisecado", [], benchParte("arco-bisecado-tres-puntos", 0, [
      { title: "Un arco en dos partes iguales", text: "Para **dividir un arco $AB$ en dos partes iguales** se traza la cuerda $AB$ y su mediatriz.", fact: "Cuerda y mediatriz" },
      { title: "La mediatriz", text: "Se hace la mediatriz de la cuerda con arcos de igual radio desde $A$ y $B$.", fact: "Mediatriz de AB" },
      { title: "El punto medio del arco", text: "La mediatriz corta al arco en $C$: es su **punto medio**.", fact: "AC = CB" },
    ]), "stack"),

    slide("arco-tres-puntos", "Arco por tres puntos", [], benchParte("arco-bisecado-tres-puntos", 3, [
      { title: "Tres puntos", text: "**Arco que pasa por tres puntos** $A$, $B$ y $C$ no alineados. Se unen $A$ con $B$ y $B$ con $C$.", fact: "Cuerdas AB y BC" },
      { title: "Dos mediatrices", text: "Se trazan las mediatrices $n$ y $m$ de las cuerdas $AB$ y $BC$. Se cortan en el punto $O$.", fact: "Mediatrices n y m" },
      { title: "El centro", text: "El punto $O$, por pertenecer a las dos mediatrices, **equidista de los tres puntos**: es el centro del arco que pasa por $A$, $B$ y $C$.", fact: "OA = OB = OC" },
    ]), "stack"),

    slide("division", "Dividir un segmento en 2, 4, 8… partes iguales", [], bench("division-2n", [
      { title: "El segmento AB", text: "Para dividir $\\overline{AB}$ en $2, 4, 8, \\dots, 2^n$ partes iguales se usa la **mediatriz** una y otra vez.", fact: "2ⁿ partes" },
      { title: "Dos partes", text: "Se traza primero la mediatriz de $AB$: se obtiene el punto $N$ y los segmentos iguales $AN = NB$.", fact: "AN = NB" },
      { title: "Cuatro partes", text: "Se trazan las mediatrices de $AN$ y de $NB$: queda dividido en **cuatro partes iguales**.", fact: "Mediatrices de AN y NB" },
      { title: "Ocho partes", text: "Y así sucesivamente: cada mediatriz duplica el número de partes. Para dividir en un número cualquiera se usa el **teorema de Thales**.", fact: "8, 16, … partes" },
    ]), "stack"),
  ],
};
