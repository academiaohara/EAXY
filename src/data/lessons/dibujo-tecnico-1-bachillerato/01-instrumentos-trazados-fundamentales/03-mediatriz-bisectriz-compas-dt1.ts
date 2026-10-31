import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, calc, nums, pick, slide, sort } from "@/data/lessons/tec1-helpers";

export const mediatrizBisectrizCompasDt1Lesson: InteractiveLesson = {
  slug: "mediatriz-bisectriz-compas-dt1",
  title: "3. Mediatriz y bisectriz con compás",
  subtitle: DT1_SUBTITLES[11],
  stage: { theme: "board" },
  steps: [
    slide("mediatriz", "Mediatriz de un segmento", [], bench("mediatriz-compas", [
      { title: "Arcos desde A", text: "Abre el compás **más de la mitad** de $AB$, clava la punta seca en $A$ y traza un arco por encima y otro por debajo del segmento.", fact: "Abertura mayor que AB/2" },
      { title: "Arcos desde B", text: "**Sin cambiar la abertura**, clava la punta en $B$ y traza otros dos arcos. Cortan a los anteriores en $C$ y $D$." },
      { title: "Une los cortes", text: "La recta $CD$ es la **mediatriz** de $AB$: pasa por su punto medio $M$ y forma $90^\\circ$ con él.", fact: "Perpendicular por el punto medio" },
      { title: "Equidistan de los extremos", text: "Cada punto $Q$ de la mediatriz está a **la misma distancia** de $A$ que de $B$. Arrástralo y compruébalo.", fact: "QA = QB" },
    ]), "stack"),

    pick("check-abertura", "Por qué la misma abertura", "¿Por qué hay que mantener la abertura del compás al trazar los arcos desde A y desde B?",
      "Porque así cada punto de corte está a la misma distancia de A que de B, y por tanto está en la mediatriz",
      [["Para que los arcos queden más bonitos", "No es cuestión de estética: de la abertura depende que el resultado sea correcto."], ["Porque el compás se desajusta si se cambia", "El compás se puede reabrir; lo que se rompe es la igualdad de distancias."], ["Para que la mediatriz pase por A", "La mediatriz no pasa por A ni por B, sino por el punto medio."]],
      "Los puntos de corte distan r de A y r de B: equidistan de los extremos, y eso es justo la definición de mediatriz.",
    ),

    calc("calc-qb", "Distancia a B", "Un punto Q de la mediatriz de AB está a 5 cm de A. ¿A qué distancia de B está, en cm?",
      nums(5),
      "Todo punto de la mediatriz equidista de los extremos: QB = QA = 5 cm.",
      "Equidistar es estar a la misma distancia.",
    ),

    slide("bisectriz", "Bisectriz de un ángulo", [], bench("bisectriz-compas", [
      { title: "Arco desde el vértice", text: "Con centro en el vértice $V$, traza un arco que corte a los dos lados en $P$ y $Q$." },
      { title: "Arco desde P", text: "Con una abertura **mayor que la mitad de $PQ$**, clava la punta en $P$ y traza un arco dentro del ángulo.", fact: "Abertura mayor que PQ/2" },
      { title: "Arco desde Q", text: "**Sin cambiar la abertura**, repite desde $Q$. Los dos arcos se cortan en $T$." },
      { title: "Une V con T", text: "La semirrecta $VT$ es la **bisectriz**: divide el ángulo en dos iguales, de $35^\\circ$ cada uno.", fact: "Equidista de los dos lados" },
    ], { a: 70 }), "stack"),

    calc("calc-bisectriz", "La mitad de un ángulo", "La bisectriz de un ángulo de 70° lo divide en dos ángulos iguales. ¿Cuántos grados mide cada uno?",
      nums(35),
      "La bisectriz divide el ángulo en dos partes iguales: 70° : 2 = 35°.",
      "Dos partes iguales.",
    ),

    sort("clasifica-lugar", "¿Mediatriz o bisectriz?", "Reparte cada característica según la recta a la que corresponde.",
      [["med", "Mediatriz", "cobalt"], ["bis", "Bisectriz", "amber"]],
      [["Equidista de dos puntos", "med"], ["Es perpendicular al segmento por su punto medio", "med"], ["Se empieza con arcos centrados en los extremos", "med"], ["Equidista de los dos lados de un ángulo", "bis"], ["Divide un ángulo en dos iguales", "bis"], ["Se empieza con un arco centrado en el vértice", "bis"]],
      "La mediatriz es el lugar de los puntos que equidistan de **dos puntos**; la bisectriz, de los que equidistan de **dos rectas** que se cortan.",
    ),

    pick("check-arcos", "Qué falla", "Al trazar la bisectriz abres el compás menos de la mitad de PQ. ¿Qué ocurre?",
      "Los arcos desde P y desde Q no llegan a cortarse y no se puede obtener T",
      [["Sale una bisectriz, pero un poco desviada", "Si los arcos no se cortan no hay punto T: no sale ninguna bisectriz."], ["Sale la mediatriz de PQ", "La mediatriz de PQ se obtiene con arcos que sí se cortan; con una abertura insuficiente no se obtiene nada."]],
      "Dos circunferencias de radio r con centros a distancia PQ solo se cortan si r ≥ PQ/2; por eso hay que abrir más de la mitad.",
    ),

    slide("transferencia", "Otro ángulo", [], bench("bisectriz-compas", [
      { title: "Un ángulo obtuso", text: "Ahora el ángulo es **mayor que 90°**. Empieza igual: arco con centro en $V$ que corta a los lados en $P$ y $Q$." },
      { title: "Arco desde P", text: "La abertura debe ser mayor que la mitad de $PQ$, y aquí $PQ$ es más grande: abre más el compás." },
      { title: "Arco desde Q", text: "Misma abertura, desde $Q$. Los arcos se cortan en $T$." },
      { title: "Une V con T", text: "La bisectriz divide este ángulo de $110^\\circ$ en dos de $55^\\circ$.", fact: "El procedimiento no cambia con el ángulo" },
    ], { a: 110 }), "stack"),
  ],
};
