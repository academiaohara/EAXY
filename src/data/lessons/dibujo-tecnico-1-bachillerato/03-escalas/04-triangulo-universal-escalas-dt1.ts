import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, calc, nums, pick, slide } from "@/data/lessons/tec1-helpers";

export const trianguloUniversalEscalasDt1Lesson: InteractiveLesson = {
  slug: "triangulo-universal-escalas-dt1",
  title: "4. Triángulo universal de escalas",
  subtitle: DT1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Una escala cualquiera, con una sola figura", [
      { kind: "steps", items: [
        "Con un **triángulo universal de escalas** se pueden obtener las escalas más sencillas, tanto normalizadas como sin normalizar: por ejemplo 1:10, 1:5, 1:2, 1:1, 2:5, 3:10, 3:5, 7:10, 4:5, 11:10, 6:5…",
        "Puede ser **equilátero** de 10 cm de lado o **rectángulo isósceles** cuyos catetos midan 10 cm.",
        "La **base** está dividida en centímetros, por lo que representa la escala natural E 1:1. Las paralelas a la base dan **escalas de reducción** cuando están por **encima**, y **de ampliación** cuando están por **debajo**.",
      ] },
    ], undefined, "stack"),

    slide("construccion", "Construcción del triángulo universal", [], bench("triangulo-universal-escalas", [
      { title: "El triángulo", text: "Se dibuja un triángulo equilátero cuyo lado mide **10 cm**. Su **base**, dividida en centímetros, es la escala natural **E 1:1**.", fact: "Lado: 10 cm" },
      { title: "Las divisiones", text: "La base se divide en **10 partes iguales** (los centímetros) y uno de los lados también en 10 partes, numeradas del vértice a la base.", fact: "Base y lado en 10 partes" },
      { title: "Los radios", text: "Se unen el **vértice** superior con los puntos de división de la base.", fact: "Radios desde el vértice" },
      { title: "Las paralelas", text: "Por las divisiones del lado se trazan **paralelas a la base**. La paralela número $k$ mide $k/10$ de la base: es la escala $E\;k\\!:\\!10$ (por ejemplo, $E\\,5\\!:\\!10 = 1\\!:\\!2$).", fact: "Fila k: E k:10" },
      { title: "Ampliaciones", text: "Si se prolongan los lados y se siguen tomando divisiones **por debajo de la base**, las paralelas dan escalas de **ampliación**: $E\\,11\\!:\\!10$, $E\\,12\\!:\\!10 = 6\\!:\\!5$.", fact: "Por debajo: ampliación" },
      { title: "Cómo se usa", text: "Una medida real de 8 cm es el tramo $0\\text{-}8$ de la base. En la fila $5$ ($E\\,1\\!:\\!2$) el mismo tramo entre radios mide **4 cm**: es el tamaño del dibujo a escala 1:2.", fact: "8 cm reales → 4 cm a 1:2" },
    ]), "stack"),

    calc("tu-1", "Una fila", "Con el triángulo universal se toma la fila 4 (E 4:10 = 2:5). ¿Cuántos cm mide en el dibujo una medida real de 15 cm?", nums(6), "15 · 2/5 = 6 cm.", "Multiplica por 4/10."),
    calc("tu-2", "Una ampliación", "Con la fila 12 (E 12:10 = 6:5), ¿cuántos mm mide en el dibujo una medida real de 50 mm?", nums(60), "50 · 6/5 = 60 mm.", "Multiplica por 12/10."),
    pick("tu-3", "Reducción o ampliación", "En el triángulo universal, las paralelas a la base que quedan por encima de ella dan escalas…",
      "de reducción",
      [["de ampliación", "Esas quedan por debajo de la base."], ["normalizadas solamente", "Se pueden obtener también escalas no normalizadas."]],
      "Por encima de la base E < 1; por debajo, E > 1.",
    ),
    pick("tu-4", "Qué es la base", "¿Qué escala representa la base del triángulo universal, dividida en centímetros?",
      "La natural, E 1:1",
      [["E 1:10", "Esa es la primera fila."], ["E 2:1", "Sería de ampliación."]],
      "La base mide 10 cm y se divide en 10 partes de 1 cm.",
    ),
  ],
};
