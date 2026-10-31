import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const construccionTriangulosDt1Lesson: InteractiveLesson = {
  slug: "construccion-triangulos-dt1",
  title: "2. Clasificación y construcción de triángulos",
  subtitle: DT1_SUBTITLES[3],
  stage: { theme: "board" },
  steps: [
    slide("def", "Triángulos y datos para construirlos", [
      { kind: "steps", items: [
        "Por sus **lados**: **equilátero** (3 iguales), **isósceles** (2 iguales) y **escaleno** (ninguno igual). Por sus **ángulos**: **acutángulo**, **rectángulo** (uno recto) y **obtusángulo** (uno obtuso).",
        "Los ángulos interiores suman **180°**, el lado mayor se opone al ángulo mayor y cada lado es **menor que la suma** de los otros dos (desigualdad triangular).",
        "**Tres lados** (LLL): se traza uno y se cortan arcos con los radios de los otros dos. **Dos lados y el ángulo comprendido** (LAL): se traza el ángulo y se llevan los lados sobre sus brazos.",
        "**Un lado y dos ángulos** (ALA): se traza el lado y desde sus extremos los dos ángulos (si falta uno, se calcula con 180°). Con **tres ángulos** no basta: hay infinitos triángulos **semejantes**.",
        "**Dos lados y el ángulo opuesto al mayor** (LLA) tiene **una** solución; si es opuesto al menor puede haber **dos, una o ninguna**.",
      ] },
    ], undefined, "stack"),

    slide("lll", "Construcción con los tres lados", [], bench("triangulo-lll-compas", [
      { title: "Los tres lados", text: "Tienes tres segmentos: $a = 13$ cm, $b = 15$ cm y $c = 20$ cm. Existe el triángulo porque **cada lado es menor que la suma de los otros dos**.", fact: "20 < 13 + 15" },
      { title: "Traza uno de ellos", text: "Con la regla traza el lado mayor $c$ como base $AB$.", fact: "AB = c" },
      { title: "Arco de radio b desde A", text: "Toma $b$ con el compás, clava la punta en $A$ y traza un arco: $C$ está a distancia $b$ de $A$.", fact: "AC = b" },
      { title: "Arco de radio a desde B", text: "Con la medida $a$ y la punta en $B$, traza otro arco: $C$ está a distancia $a$ de $B$. Donde se cortan los arcos está $C$.", fact: "BC = a" },
      { title: "Une los puntos", text: "Une $C$ con $A$ y con $B$. El triángulo $ABC$ tiene los tres lados dados.", fact: "Tres lados: LLL" },
    ]), "stack"),

    benchTask("triangulo-lll-construye", "Construye el triángulo", "triangulo-lll-practica", [
      { title: "Toma la medida b", text: "Toca los dos extremos del segmento $b$: el compás queda con esa abertura.", fact: "Abertura = b" },
      { title: "Clava la punta en A", text: "Toca el vértice $A$ de la base." },
      { title: "Arco desde A", text: "Arrastra la mina para trazar el arco por la zona donde estará $C$." },
      { title: "Toma la medida a", text: "Toca los dos extremos del segmento $a$.", fact: "Abertura = a" },
      { title: "Clava la punta en B", text: "Toca el vértice $B$." },
      { title: "Arco desde B", text: "Traza el arco que corta al anterior: ahí está $C$." },
      { title: "Une C con A y con B", text: "Toca los extremos de cada lado: $C$ y $A$, y después $C$ y $B$.", fact: "El lado AB ya está dibujado" },
    ], {
      question: "Construye el triángulo ABC conociendo AB = 20 cm, AC = 15 cm y BC = 13 cm.",
      hint: "Toma cada lado con el compás y traza los arcos desde A y desde B; C es donde se cortan.",
      explanation: "C está a 15 cm de A y a 13 cm de B, así que es uno de los dos puntos donde se cortan los arcos de esos radios.",
    }),
  ],
};
