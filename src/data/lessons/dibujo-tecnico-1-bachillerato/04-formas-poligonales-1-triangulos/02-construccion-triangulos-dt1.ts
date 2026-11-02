import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const construccionTriangulosDt1Lesson: InteractiveLesson = {
  slug: "construccion-triangulos-dt1",
  title: "2. Construcción de triángulos a partir de sus datos",
  subtitle: DT1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("datos", "Datos necesarios para construir un triángulo", [], bench("triangulo-datos", [
      { title: "Cuántos datos hacen falta", text: "Para construir un polígono de $n$ lados hay que conocer **$2n - 3$ datos**.", fact: "2n − 3 datos" },
      { title: "En un triángulo, tres", text: "En el triángulo son $2 \cdot 3 - 3 = 3$ datos: tres lados, o dos lados y el ángulo que forman, o un lado y los dos ángulos adyacentes.", fact: "3 datos" },
      { title: "Rectángulo e isósceles", text: "Si el triángulo es **rectángulo**, el ángulo de $90^\\circ$ ya es un dato y hacen falta otros dos. Lo mismo ocurre con el **isósceles**, donde dos lados iguales cuentan como otro dato.", fact: "Faltan otros dos datos" },
    ]), "stack"),

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
      { title: "Une C con A y con B", text: "La regla une sola $C$ con $A$ y con $B$: el triángulo queda construido.", fact: "El lado AB ya está dibujado" },
    ], {
      question: "Construye el triángulo ABC conociendo AB = 20 cm, AC = 15 cm y BC = 13 cm.",
      hint: "Toma cada lado con el compás y traza los arcos desde A y desde B; C es donde se cortan.",
      explanation: "C está a 15 cm de A y a 13 cm de B, así que es uno de los dos puntos donde se cortan los arcos de esos radios.",
    }),

    slide("ala", "Un lado y los dos ángulos adyacentes", [], bench("triangulo-ala", [
      { title: "Los datos", text: "Se conocen el lado $a = \\overline{BC}$ y los ángulos $\\hat B$ y $\\hat C$ adyacentes a ese lado.", fact: "Lado a y ángulos B y C" },
      { title: "El lado a", text: "Se traza el segmento $BC = a$.", fact: "BC = a" },
      { title: "El ángulo B", text: "En el vértice $B$ se dibuja el ángulo $\\hat B$ con ayuda del arco $1\\text{-}2$.", fact: "Arco 1-2" },
      { title: "El ángulo C", text: "En el vértice $C$ se dibuja el ángulo $\\hat C$ con ayuda del arco $3\\text{-}4$.", fact: "Arco 3-4" },
      { title: "El tercer vértice", text: "Los lados $c$ y $b$ de estos ángulos, **prolongados**, se cortan en el vértice $A$, que completa el triángulo.", fact: "A: corte de los lados" },
    ]), "stack"),

    slide("lal", "Dos lados y el ángulo comprendido", [], bench("triangulo-lal", [
      { title: "Los datos", text: "Se conocen los lados $a = \\overline{BC}$ y $c = \\overline{BA}$ y el ángulo $\\hat B$ que forman.", fact: "Lados a y c y ángulo B" },
      { title: "Uno de los lados", text: "Se coloca uno de los lados conocidos, por ejemplo $a = \\overline{BC}$.", fact: "BC = a" },
      { title: "El ángulo B", text: "En el vértice $B$ se construye el ángulo de $\\hat B$ con ayuda del arco $1\\text{-}2$.", fact: "Arco 1-2" },
      { title: "El lado c", text: "Sobre el lado obtenido de este ángulo se lleva $c = \\overline{BA}$ con el compás.", fact: "BA = c" },
      { title: "Une A con C", text: "Finalmente se une $A$ con $C$ para completar el triángulo.", fact: "Triángulo ABC" },
    ]), "stack"),
  ],
};
