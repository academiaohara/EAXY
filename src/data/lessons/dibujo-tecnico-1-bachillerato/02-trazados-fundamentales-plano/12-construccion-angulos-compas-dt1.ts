import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const construccionAngulosCompasDt1Lesson: InteractiveLesson = {
  slug: "construccion-angulos-compas-dt1",
  title: "12. Construcción de ángulos con el compás",
  subtitle: DT1_SUBTITLES[2],
  stage: { theme: "board" },
  steps: [
    slide("angulos", "Ángulos que salen sin transportador", [], bench("construccion-angulos", [
      { title: "Ángulo de 60°", text: "Con centros en $O$ y en $A$ se trazan **dos arcos iguales** que se cortan en $B$. Las rectas $a$ y $b$ forman **$60^\\circ$**: $OAB$ es un triángulo equilátero.", fact: "OA = OB = AB" },
      { title: "Ángulo de 30°", text: "Basta trazar la **bisectriz $c$** del ángulo anterior: $60^\\circ / 2 = 30^\\circ$.", fact: "60° / 2" },
      { title: "Ángulo de 15°", text: "Se traza la bisectriz $d$ del ángulo de $30^\\circ$ hallado antes: $30^\\circ / 2 = 15^\\circ$.", fact: "30° / 2" },
      { title: "Ángulo de 45°", text: "Se traza la bisectriz $d$ del ángulo recto $\\widehat{AOC}$ de $90^\\circ$: $90^\\circ / 2 = 45^\\circ$.", fact: "90° / 2" },
      { title: "Ángulo de 22° 30′", text: "Se traza la bisectriz del ángulo de $45^\\circ$ anterior: $45^\\circ / 2 = 22^\\circ 30'$.", fact: "45° / 2" },
      { title: "Ángulo de 75°", text: "Se construye el ángulo recto $\\widehat{AOB}$ y el ángulo $\\widehat{AOC}$ de $60^\\circ$. La diferencia $\\widehat{COB}$ vale $30^\\circ$; su bisectriz $d$ lo divide en $15^\\circ$, así que $a$ y $d$ forman $60^\\circ + 15^\\circ = 75^\\circ$.", fact: "60° + 15° = 75°" },
    ]), "stack"),

    benchTask("construye-angulos", "Construye 60° y 30°", "construye-angulos-practica", [
      { title: "Clava la punta en O", text: "Toca el vértice $O$." },
      { title: "Abre el compás", text: "Arrastra la mina hasta una abertura cualquiera (que quepa en la hoja) y pulsa «Fijar abertura».", fact: "Radio r" },
      { title: "Primer arco", text: "Traza un arco que **corte a la recta** a la derecha de $O$ y suba **hacia arriba**." },
      { title: "Marca A", text: "Toca el corte con la recta: es el punto $A$, con $OA = r$." },
      { title: "Clava la punta en A", text: "Toca $A$, sin cambiar la abertura." },
      { title: "Segundo arco", text: "Traza un arco que **corte al primero** por encima de la recta." },
      { title: "Marca B", text: "Toca el corte de los dos arcos: es el punto $B$." },
      { title: "Traza la recta OB", text: "Toca $O$ y $B$: la regla traza el lado del ángulo de **$60^\\circ$**.", fact: "OAB equilátero" },
      { title: "Clava la punta en A", text: "Para la bisectriz, toca $A$: se trazan arcos con la misma abertura desde $A$ y desde $B$." },
      { title: "Arco desde A", text: "Traza un arco por **encima** de $AB$, dentro del ángulo." },
      { title: "Clava la punta en B", text: "Toca $B$, sin cambiar la abertura." },
      { title: "Arco desde B", text: "Traza el arco que corta al anterior en $C$." },
      { title: "Marca C", text: "Toca el corte de los dos arcos: es el punto $C$." },
      { title: "La bisectriz", text: "La regla traza sola la recta $OC$: divide el ángulo de $60^\\circ$ en dos de **$30^\\circ$**.", fact: "60° / 2 = 30°" },
    ], {
      question: "Construye un ángulo de 60° con el compás y trázale la bisectriz para obtener 30°.",
      hint: "Haz dos arcos del mismo radio, con centros en O y en A: se cortan en B. Después arcos iguales desde A y B se cortan en C.",
      explanation: "OA = OB = AB: OAB es equilátero, así que el ángulo en O mide 60°. La bisectriz OC pasa por el cuarto vértice del rombo OACB y lo divide en dos ángulos de 30°.",
    }),
  ],
};
