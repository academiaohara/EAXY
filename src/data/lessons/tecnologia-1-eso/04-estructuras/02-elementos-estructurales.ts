import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort } from "@/data/lessons/tec1-helpers";

export const elementosEstructuralesLesson: InteractiveLesson = {
  slug: "elementos-estructurales",
  title: "2. Elementos estructurales: vigas, pilares, tirantes y arcos",
  subtitle: TECESO1_SUBTITLES[4],
  stage: { theme: "board" },
  steps: [
    slide("elementos", "Piezas con una función", [
      { kind: "steps", items: [
        "**Pilar o columna**: elemento vertical que soporta cargas hacia abajo y las lleva al cimiento.",
        "**Viga**: elemento horizontal apoyado en sus extremos que soporta cargas y las reparte a los pilares.",
        "**Tirante**: cable o barra que trabaja estirándose; sujeta o cuelga una carga.",
        "**Arco**: elemento curvo que lleva la carga a los apoyos por compresión.",
        "**Cimientos o zapatas**: base que reparte el peso de la estructura sobre el terreno.",
        "**Perfiles**: forma de la sección de una barra (en T, en I o doble T, en U, tubo), pensada para resistir más con menos material.",
      ] },
    ], undefined, "stack"),
    slide("camino", "El camino de las cargas", [
      { kind: "text", text: "Cada elemento recibe cargas y las pasa al siguiente. Sigue el recorrido en un edificio, de la cubierta al terreno." },
    ], anim("camino-cargas"), "split"),
    slide("arco", "Por qué un arco aguanta tanto", [
      { kind: "text", text: "Compara cómo se comporta una viga larga con un arco de la misma luz." },
    ], anim("arco-descarga"), "split"),
    sort("clasifica-elem", "¿Qué elemento es?", "Relaciona cada descripción con el elemento estructural.",
      [["pil", "Pilar", "emerald"], ["vig", "Viga", "amber"], ["tir", "Tirante", "cobalt"], ["arc", "Arco", "violet"]],
      [["Barra vertical que sostiene el forjado", "pil"], ["Columna de un templo griego", "pil"], ["Tablón horizontal apoyado en dos muros", "vig"], ["Elemento de un forjado que soporta el suelo de un piso", "vig"], ["Cable que sujeta el tablero de un puente atirantado", "tir"], ["Cuerda de una tienda de campaña", "tir"], ["Acueducto romano", "arc"], ["Puerta con forma de medio punto", "arc"]],
      "El pilar es vertical; la viga, horizontal; el tirante trabaja a tracción; el arco es curvo y trabaja a compresión.",
    ),
    pick("check-perfil", "El perfil de una viga", "¿Por qué muchas vigas metálicas tienen forma de doble T (I) en lugar de ser macizas?",
      "Porque el material situado lejos del centro resiste mejor la flexión y se ahorra peso y coste",
      [["Porque es más fácil de pintar", "No es la razón de su forma."], ["Porque pesa más y por eso aguanta más", "Al contrario: se busca la máxima resistencia con el mínimo peso."], ["Porque la I es el símbolo del Instituto de Ingeniería", "No tiene nada que ver con la forma."]],
      "En una viga a flexión, la parte de arriba se comprime y la de abajo se estira; el centro trabaja poco. El perfil en I coloca el material donde más hace falta.",
    ),
    pick("check-tirante", "Qué es un tirante", "Un cable sostiene un cartel colgado de una pared. ¿Qué elemento estructural es?",
      "Un tirante, porque trabaja estirándose",
      [["Un pilar, porque sostiene el cartel", "Los pilares trabajan a compresión, el cable a tracción."], ["Un arco, porque tiene forma curva", "Un cable recto no es un arco."], ["Una viga, porque es horizontal", "El cable cuelga en sentido vertical e inclinado."]],
      "Los tirantes soportan solo tracción: no pueden empujar, solo tirar.",
    ),
  ],
};
