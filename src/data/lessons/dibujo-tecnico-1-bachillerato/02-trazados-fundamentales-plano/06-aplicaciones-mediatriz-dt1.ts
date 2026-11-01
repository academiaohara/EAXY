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
      { title: "Arco con centro en P", text: "**Perpendicular a una recta $t$ por un punto exterior $P$.** Con centro en $P$ y un radio arbitrario $r$ se traza un arco que **corta a la recta $t$** en los puntos $A$ y $B$.", fact: "PA = PB = r" },
      { title: "Arco con centro en A", text: "Se busca la **mediatriz del segmento $AB$**. Con el compás en $A$ y una abertura **mayor que la mitad de $AB$** se trazan arcos por encima y por debajo de la recta (arco 1).", fact: "Radio > AB/2" },
      { title: "Arco con centro en B", text: "Sin cambiar la abertura, con el compás en $B$ se trazan los arcos 2: cortan a los anteriores en $M$ (arriba) y en $N$ (abajo).", fact: "Mismo radio desde B" },
      { title: "La perpendicular", text: "Con la regla se une $M$ con $N$: la recta pasa por $P$ y es **perpendicular a $t$**, porque $P$ equidista de $A$ y de $B$.", fact: "MN ⟂ t por P" },
    ]), "stack"),

    benchTask("perpendicular-exterior", "Perpendicular por un punto exterior", "perpendicular-exterior-practica", [
      { title: "Clava la punta en P", text: "Toca el punto exterior $P$." },
      { title: "Abre el compás", text: "Elige una abertura **mayor que la distancia de $P$ a la recta** y pulsa «Fijar abertura».", fact: "Radio arbitrario, mayor que la distancia" },
      { title: "Traza el arco", text: "Arrastra la mina para trazar un arco que **corte a la recta $t$ a los dos lados** (hasta pasar la recta por los dos cortes)." },
      { title: "Marca A", text: "Toca el corte de la **izquierda**: es el punto $A$." },
      { title: "Marca B", text: "Toca el corte de la **derecha**: es el punto $B$. Ahora $PA = PB$." },
      { title: "Clava la punta en A", text: "Para la mediatriz de $AB$, toca $A$ o $B$." },
      { title: "Abre más", text: "Abre el compás **más que la mitad de $AB$** y pulsa «Fijar abertura».", fact: "Radio > AB/2" },
      { title: "Arco desde A", text: "Traza el arco **por encima y por debajo** de la recta." },
      { title: "Clava la punta en el otro extremo", text: "Toca el otro extremo, sin cambiar la abertura." },
      { title: "Arco desde B", text: "Traza el arco que corta al anterior en **dos puntos**." },
      { title: "Traza la perpendicular", text: "Toca **los dos puntos** donde se cortan los arcos: la regla pasa por $P$ y es perpendicular a $t$.", fact: "Mediatriz de AB" },
    ], {
      question: "Traza la perpendicular a la recta t por el punto exterior P, con compás y regla.",
      hint: "Corta la recta con un arco con centro en P para obtener A y B, y traza la mediatriz de AB.",
      explanation: "PA = PB, así que P pertenece a la mediatriz de AB; esta es perpendicular a t y pasa por P.",
    }),

    slide("perp-recta", "Perpendicular por un punto de la recta", [], benchParte("perpendicular-compas", 4, [
      { title: "Arco con centro en P", text: "**Perpendicular a una recta $r$ por un punto $P$ de ella.** Con centro en $P$ y radio arbitrario se traza un arco que **corta a la recta** en $A$ y $B$.", fact: "PA = PB" },
      { title: "Arco con centro en A", text: "Se busca la mediatriz de $AB$. Con el compás en $A$ y una abertura **mayor que $PA$** se trazan los arcos 1, por encima y por debajo de la recta.", fact: "Radio > PA" },
      { title: "Arco con centro en B", text: "Con la misma abertura y el compás en $B$ se trazan los arcos 2, que cortan a los anteriores en $M$ y $N$.", fact: "Mismo radio desde B" },
      { title: "La perpendicular", text: "Como $P$ es el punto medio de $AB$, la recta $MN$ pasa por $P$ y es **perpendicular a $r$**.", fact: "P es el punto medio" },
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

    slide("perp-extremo", "Perpendicular en el extremo de una semirrecta", [], benchParte("perpendicular-compas", 8, [
      { title: "Arco con centro en O", text: "**Perpendicular a una semirrecta en su extremo $O$.** Con centro en $O$ se traza un arco de radio $ON$ arbitrario, que corta a la semirrecta en $N$.", fact: "ON = radio" },
      { title: "Arco con centro en N", text: "Con centro en $N$ y el **mismo radio** se corta al primer arco en $M$ (arco 1).", fact: "NM = ON" },
      { title: "Arco con centro en M", text: "Con centro en $M$ y el mismo radio se vuelve a cortar al primer arco, ahora en $L$ (arco 2).", fact: "ML = ON" },
      { title: "Mediatriz de ML", text: "Se hace la **mediatriz del segmento $ML$**: arcos de igual radio con centros en $M$ y en $L$.", fact: "Radio > ML/2" },
      { title: "La perpendicular", text: "La recta $p$ que une los cortes de esos arcos es la mediatriz de $ML$: pasa por $O$ y es **perpendicular a la semirrecta**.", fact: "p ⟂ semirrecta en O" },
    ]), "stack"),

    benchTask("perpendicular-extremo", "Perpendicular en el extremo de una semirrecta", "perpendicular-extremo-practica", [
      { title: "Clava la punta en O", text: "Toca el extremo $O$ de la semirrecta." },
      { title: "Abre el compás", text: "Elige una abertura cualquiera y pulsa «Fijar abertura». Se usará **la misma** para los tres arcos siguientes.", fact: "Radio arbitrario" },
      { title: "Traza el arco", text: "Arrastra la mina: el arco debe **cortar a la semirrecta** a la izquierda y subir hasta pasar por encima de $O$." },
      { title: "Marca N", text: "Toca el corte del arco con la semirrecta: es el punto $N$." },
      { title: "Clava la punta en N", text: "Toca $N$, sin cambiar la abertura." },
      { title: "Arco desde N", text: "Traza un arco que **corte al primero**." },
      { title: "Marca M", text: "Toca el corte: es el punto $M$. Ahora $NM = ON$." },
      { title: "Clava la punta en M", text: "Toca $M$, con la misma abertura." },
      { title: "Arco desde M", text: "Traza un arco que **vuelva a cortar al primero**, a la derecha." },
      { title: "Marca L", text: "Toca el corte: es el punto $L$. Ahora $ML = ON$." },
      { title: "Clava la punta en M o en L", text: "Vas a hacer la mediatriz de $ML$: toca $M$ o $L$." },
      { title: "Abre más", text: "Abre el compás **más que la mitad de $ML$** y pulsa «Fijar abertura».", fact: "Radio > ML/2" },
      { title: "Arco desde M", text: "Traza el arco por encima y por debajo de $ML$." },
      { title: "Clava la punta en el otro extremo", text: "Toca el otro punto, sin cambiar la abertura." },
      { title: "Arco desde L", text: "Traza el arco que corta al anterior en **dos puntos**." },
      { title: "Traza la perpendicular", text: "Toca **los dos puntos** donde se cortan los arcos: la regla pasa por $O$ y es perpendicular a la semirrecta.", fact: "Mediatriz de ML" },
    ], {
      question: "Traza la perpendicular a la semirrecta en su extremo O, con compás y regla.",
      hint: "Con el mismo radio desde O, N y M obtienes M y L; la mediatriz de ML pasa por O.",
      explanation: "ON = NM = ML = OM = OL: los triángulos ONM y OML son equiláteros, así que el ángulo MOL mide 60° y su lado OM forma 60° con la semirrecta. La mediatriz de ML es la bisectriz de ese ángulo y forma 90° con la semirrecta.",
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
