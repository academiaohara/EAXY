import type { InteractiveLesson } from "@/lib/lesson/types";
import { DT1_SUBTITLES } from "@/data/lessons/shared";
import { bench, benchTask, slide } from "@/data/lessons/tec1-helpers";

export const espiralesEvolventeDt1Lesson: InteractiveLesson = {
  slug: "espirales-evolvente-dt1",
  title: "2. Espirales, volutas y evolvente",
  subtitle: DT1_SUBTITLES[9],
  stage: { theme: "board" },
  steps: [
    slide("def", "Curvas abiertas de curvatura creciente", [
      { kind: "steps", items: [
        "Una **espiral** es una curva abierta que se aleja de un punto con radio creciente. Las **espirales técnicas** se trazan con **arcos de circunferencia** tangentes.",
        "**Espiral de tres centros**: igual que la de dos, centrando en los tres vértices de un **triángulo equilátero**; los arcos son de 120° y los radios crecen $d, 2d, 3d, \\dots$",
        "La **voluta** es una espiral decorativa usada en los capiteles jónicos.",
        "**Aplicaciones**: levas, muelles planos, volutas de bombas centrífugas y caracoles de turbinas.",
      ] },
    ], undefined, "stack"),

    slide("espiral", "Espiral de dos centros", [], bench("espiral-compas", [
      { title: "Dos centros", text: "Se parte de dos puntos $A$ y $B$ a distancia $d$. Los arcos son **semicircunferencias** que se apoyan alternativamente en $A$ y en $B$, con radios $d, 2d, 3d, \\dots$", fact: "d = AB" },
      { title: "Primer semicírculo", text: "Con centro en $A$ y radio $d$ traza una semicircunferencia **por encima** del eje, de $B$ hasta el otro lado de $A$.", fact: "Radio d" },
      { title: "Segundo semicírculo", text: "Con centro en $B$ y radio $2d$ continúa **por debajo**, desde donde acabó el anterior. Los arcos son **tangentes**.", fact: "Radio 2d" },
      { title: "Tercer semicírculo", text: "De nuevo con centro en $A$, ahora radio $3d$, **por encima**.", fact: "Radio 3d" },
      { title: "Cuarto semicírculo", text: "Con centro en $B$ y radio $4d$, por debajo. Cada vuelta completa crece el radio $2d$.", fact: "Paso por vuelta: 2d" },
    ]), "stack"),

    slide("evolvente", "La evolvente de la circunferencia", [], bench("evolvente-hilo", [
      { title: "Un hilo enrollado", text: "La **evolvente de la circunferencia** es la curva que traza el extremo de un hilo tenso que se **desenrolla** de ella.", fact: "No es una espiral de arcos" },
      { title: "Empieza a desenrollar", text: "Al desenrollar un cuarto de vuelta, el hilo tenso es **tangente a la circunferencia** y su extremo se aleja del punto de partida." },
      { title: "La curva", text: "El hilo mide siempre lo que el arco que ya se ha desenrollado, así que la curva se abre cada vez más." },
      { title: "El hilo es la normal", text: "El hilo es **tangente a la circunferencia** y **perpendicular a la evolvente**. Por eso el perfil de los **dientes de engranaje** usa esta curva: engranan con relación de velocidades constante.", fact: "Perfil de los engranajes" },
    ]), "stack"),

    benchTask("espiral-construye", "Traza la espiral", "espiral-practica", [
      ...[1, 2, 3, 4].flatMap((k) => [
        { title: `Toma el radio ${k}d`, text: k === 1 ? "Toca el centro $A$ y después $B$: el compás queda con la abertura $d$." : `Toca el centro del arco y el extremo donde acabó el anterior: la abertura es $${k}d$.`, fact: `Radio ${k}d` },
        { title: `Clava la punta en ${k % 2 === 1 ? "A" : "B"}`, text: `Toca el punto $${k % 2 === 1 ? "A" : "B"}$.` },
        { title: `Semicircunferencia ${k}`, text: `Arrastra la mina para trazar la semicircunferencia ${k % 2 === 1 ? "**por encima**" : "**por debajo**"} del eje, hasta el otro lado.` },
      ]),
    ], {
      question: "Traza una espiral de dos centros de cuatro semicircunferencias a partir de los puntos A y B.",
      hint: "Alterna los centros A y B: cada semicircunferencia empieza donde acabó la anterior y su radio es la distancia del centro a ese punto.",
      explanation: "Cada semicircunferencia empieza en el extremo de la anterior sobre el eje, y su radio es la distancia al centro que toca: crece d en cada arco (d, 2d, 3d, 4d). Los arcos son tangentes porque el centro y el punto de enlace están alineados.",
    }),
  ],
};
