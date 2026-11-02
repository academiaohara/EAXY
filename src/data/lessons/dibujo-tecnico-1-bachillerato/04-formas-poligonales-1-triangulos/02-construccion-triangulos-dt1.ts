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
      { title: "Los datos", text: "Se conocen el lado $a = BC$ y los ángulos $\\hat B = 65^\\circ$ y $\\hat C = 50^\\circ$ adyacentes a ese lado.", fact: "Lado a y ángulos B y C" },
      { title: "Se toma la medida a", text: "Se **abre el compás** hasta que la punta seca esté en un extremo del segmento $a$ y la mina en el otro: la abertura del compás es ahora $a$.", fact: "Abertura = a" },
      { title: "Se lleva a la recta: BC = a", text: "Se marca el punto $B$ en la recta, se **clava la punta seca en $B$** sin cambiar la abertura y se traza un pequeño arco que corta a la recta: ese corte es $C$. Así queda el lado $BC = a$.", fact: "BC = a" },
      { title: "El ángulo B con el transportador", text: "Se coloca el **transportador** con su centro en $B$ y su base sobre $BC$. Se busca la marca de $65^\\circ$ en la escala que empieza en $C$ y se señala con el lápiz.", fact: "B = 65°" },
      { title: "Se traza el lado desde B", text: "Se apoya la **regla** en $B$ y en la marca y se traza la recta: es el lado del ángulo $\\hat B$.", fact: "Regla por B y la marca" },
      { title: "El ángulo C con el transportador", text: "Se pasa el transportador a $C$ con su base sobre $CB$. Ahora se lee la escala que empieza en $B$ (la roja) hasta $50^\\circ$ y se marca.", fact: "C = 50°" },
      { title: "Se traza el lado desde C", text: "Se apoya la regla en $C$ y en la nueva marca y se traza el otro lado.", fact: "Regla por C y la marca" },
      { title: "El vértice A", text: "Los dos lados, **prolongados**, se cortan en el vértice $A$: queda construido el triángulo $ABC$.", fact: "A: corte de los lados" },
    ]), "stack"),

    benchTask("ala-practica", "Construye el triángulo con un lado y dos ángulos", "triangulo-ala-practica", [
      { title: "Ángulo B", text: "Marca con el transportador el ángulo $\\hat B = 65^\\circ$ en el vértice $B$: arrastra el segundo lado hasta ese valor.", fact: "65° en B" },
      { title: "Ángulo C", text: "Ahora el ángulo $\\hat C = 50^\\circ$ en $C$, midiéndolo desde $CB$ con la escala roja del transportador.", fact: "50° en C" },
      { title: "Marca A", text: "Toca el punto $A$ donde se cortan los dos lados.", fact: "A = corte" },
      { title: "Cierra el triángulo", text: "La regla traza sola los lados $BA$ y $CA$." },
    ], {
      question: "Construye el triángulo ABC conociendo el lado a = BC y los ángulos B = 65° y C = 50°.",
      hint: "Con el transportador en B marca 65° y con el transportador en C marca 50° hacia el mismo lado.",
      explanation: "Los lados de los ángulos B y C se cortan en A, que es el único punto desde el que se ven BC con esos dos ángulos.",
    }),

    slide("lal", "Dos lados y el ángulo comprendido", [], bench("triangulo-lal", [
      { title: "Los datos", text: "Se conocen los lados $a = BC$ y $c = BA$ y el ángulo $\\hat B = 55^\\circ$ que forman.", fact: "Lados a y c y ángulo B" },
      { title: "Se toma la medida a", text: "Se **abre el compás** hasta que la punta seca esté en un extremo del segmento $a$ y la mina en el otro: la abertura del compás es ahora $a$.", fact: "Abertura = a" },
      { title: "Se lleva a la recta: BC = a", text: "Se marca el punto $B$ en la recta, se **clava la punta seca en $B$** sin cambiar la abertura y se traza un pequeño arco que corta a la recta: ese corte es $C$. Así queda el lado $BC = a$.", fact: "BC = a" },
      { title: "El ángulo B con el transportador", text: "Con el transportador centrado en $B$ y su base sobre $BC$ se marca el ángulo de $55^\\circ$.", fact: "B = 55°" },
      { title: "Se traza el lado desde B", text: "Se apoya la regla en $B$ y en la marca y se traza el lado que sale de $B$, **más largo que $c$**.", fact: "Lado del ángulo B" },
      { title: "Se toma la medida c", text: "Se **abre el compás** hasta que la punta seca esté en un extremo del segmento $c$ y la mina en el otro: la abertura del compás es ahora $c$.", fact: "Abertura = c" },
      { title: "Se lleva c sobre el lado: A", text: "Se clava la punta seca en $B$ y, con la abertura $c$, se traza un arco que **corta al lado del ángulo**: ese corte es $A$.", fact: "BA = c" },
      { title: "Se une A con C", text: "Se une $A$ con $C$ con la regla para completar el triángulo.", fact: "Triángulo ABC" },
    ]), "stack"),

    benchTask("lal-practica", "Construye el triángulo con dos lados y el ángulo", "triangulo-lal-practica", [
      { title: "Ángulo B", text: "Marca con el transportador el ángulo $\\hat B = 55^\\circ$ en el vértice $B$.", fact: "55° en B" },
      { title: "Toma c", text: "Toca los dos extremos del segmento $c$ para tomar su medida con el compás.", fact: "Abertura = c" },
      { title: "Clava en B", text: "Toca $B$ para clavar la punta seca del compás." },
      { title: "Arco", text: "Traza el arco que corta al lado del ángulo: ahí está $A$." },
      { title: "Cierra el triángulo", text: "La regla traza sola los lados $BA$ y $AC$." },
    ], {
      question: "Construye el triángulo ABC conociendo a = BC, c = BA y el ángulo B = 55°.",
      hint: "Marca el ángulo en B, toma c con el compás y corta el lado del ángulo con un arco desde B.",
      explanation: "A está sobre el lado del ángulo B y a la distancia c de B.",
    }),
  ],
};
