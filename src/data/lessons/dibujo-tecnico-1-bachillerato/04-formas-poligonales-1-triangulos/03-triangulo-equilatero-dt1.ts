import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, slide } from "@/data/lessons/tec1-helpers";

export const trianguloEquilateroDt1Lesson: InteractiveLesson = {
  slug: "triangulo-equilatero-dt1",
  title: "3. Construcción del triángulo equilátero",
  subtitle: DT1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("lado", "Equilátero a partir del lado", [], bench("equilatero-lado", [
      { title: "El dato es el lado", text: "Un equilátero tiene **los tres lados iguales**, así que conocer el lado $a$ es conocer los tres. El problema se resuelve como el de los tres lados.", fact: "a = b = c" },
      { title: "Dos arcos de radio a", text: "Con centros en $B$ y $C$ y **radio $a$** se trazan dos arcos. Se cortan en el tercer vértice $A$.", fact: "AB = AC = a" },
      { title: "Une los vértices", text: "Al unir $A$ con $B$ y con $C$ queda el triángulo equilátero $ABC$, con los tres lados iguales a $a$.", fact: "Equilátero ABC" },
    ]), "stack"),

    slide("altura", "Equilátero a partir de la altura", [], bench("equilatero-altura", [
      { title: "El dato es la altura", text: "Se conoce la altura $h$. **Todos los triángulos equiláteros son semejantes**, así que basta construir uno cualquiera y ampliarlo hasta que su altura valga $h$.", fact: "Todos los equiláteros son semejantes" },
      { title: "Un equilátero cualquiera", text: "Sobre una recta se construye un equilátero $1\\text{-}2\\text{-}3$ de lado cualquiera, con dos arcos del mismo radio.", fact: "Lado cualquiera" },
      { title: "Su altura N-3", text: "La altura de ese triángulo es $\\overline{N3}$, con $N$ el pie sobre la base. Se **prolonga** esa recta más allá del vértice $3$.", fact: "Altura = N-3" },
      { title: "Se lleva la altura h", text: "Con el compás se lleva la altura dada $h$ **a partir de $N$** sobre la prolongación de $N\\text{-}3$. El extremo es el vértice $A$.", fact: "NA = h" },
      { title: "Paralelas hasta la base", text: "Por $A$ se trazan **paralelas** a los otros dos lados del triángulo $1\\text{-}2\\text{-}3$. Cortan a la base en $C$ y $B$: el triángulo $ABC$ es equilátero y su altura vale $h$.", fact: "ABC: altura h" },
    ]), "stack"),
  ],
};
