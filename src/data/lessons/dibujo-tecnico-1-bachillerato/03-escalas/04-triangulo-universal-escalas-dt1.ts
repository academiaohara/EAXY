import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, slide } from "@/data/lessons/tec1-helpers";

export const trianguloUniversalEscalasDt1Lesson: InteractiveLesson = {
  slug: "triangulo-universal-escalas-dt1",
  title: "4. Triángulo universal de escalas",
  subtitle: DT1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("construccion", "Construcción del triángulo universal", [], bench("triangulo-universal-escalas", [
      { title: "El triángulo", text: "El **triángulo universal de escalas** da las escalas más sencillas, normalizadas o no (1:10, 1:2, 3:5, 6:5…). Es un triángulo **equilátero** de **10 cm** de lado (o rectángulo isósceles de catetos 10 cm). Su **base**, dividida en centímetros, es la escala natural **E 1:1**.", fact: "Lado: 10 cm" },
      { title: "Las divisiones", text: "La base se divide en **10 partes iguales** (los centímetros) y uno de los lados también en 10 partes, numeradas del vértice a la base.", fact: "Base y lado en 10 partes" },
      { title: "Los radios", text: "Se unen el **vértice** superior con los puntos de división de la base.", fact: "Radios desde el vértice" },
      { title: "Las paralelas", text: "Por las divisiones del lado se trazan **paralelas a la base**. La paralela número $k$ mide $k/10$ de la base: es la escala $E\;k\\!:\\!10$ (por ejemplo, $E\\,5\\!:\\!10 = 1\\!:\\!2$).", fact: "Fila k: E k:10" },
      { title: "Ampliaciones", text: "Si se prolongan los lados y se siguen tomando divisiones **por debajo de la base**, las paralelas dan escalas de **ampliación**: $E\\,11\\!:\\!10$, $E\\,12\\!:\\!10 = 6\\!:\\!5$.", fact: "Por debajo: ampliación" },
      { title: "Cómo se usa", text: "Una medida real de 8 cm es el tramo $0\\text{-}8$ de la base. En la fila $5$ ($E\\,1\\!:\\!2$) el mismo tramo entre radios mide **4 cm**: es el tamaño del dibujo a escala 1:2.", fact: "8 cm reales → 4 cm a 1:2" },
    ]), "stack"),
  ],
};
