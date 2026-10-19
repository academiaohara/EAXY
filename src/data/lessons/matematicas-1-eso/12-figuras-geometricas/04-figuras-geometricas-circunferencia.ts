import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_12_SUBTITLE } from "@/data/lessons/shared";

export const figurasGeometricasCircunferenciaLesson: InteractiveLesson = {
  slug: "figuras-geometricas-circunferencia",
  title: "4. Circunferencia",
  subtitle: TEMA_1ESO_12_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "elementos",
      type: "slide",
      help: [
        {
          label: "¿Circunferencia y círculo son lo mismo?",
          message: "No. La circunferencia es solo la **línea** (el contorno). El círculo es la **superficie** que hay dentro, contorno incluido.",
        },
        {
          label: "¿Por qué $d = 2r$?",
          message: "El diámetro es una cuerda que pasa por el centro: se compone de dos radios, uno a cada lado.",
        },
      ],
      title: "Circunferencia y círculo",
      blocks: [
        {
          kind: "compare",
          left: { title: "Circunferencia", text: "La línea que rodea al círculo.", tone: "info" },
          right: { title: "Círculo", text: "La superficie que queda dentro.", tone: "ok" },
        },
        {
          kind: "facts",
          items: [
            { tex: "d = 2r", label: "diámetro" },
            { tex: "r", label: "radio: centro → circunferencia" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "circunferencia-elementos", beatMs: 3000 },
    },
    {
      id: "recta",
      type: "slide",
      help: [
        {
          label: "¿Por qué el radio es perpendicular a la tangente?",
          message: "La tangente toca en un solo punto, que es el más cercano al centro. La distancia más corta a una recta siempre es la perpendicular.",
        },
      ],
      title: "Una recta y una circunferencia",
      blocks: [
        {
          kind: "rule",
          title: "Posiciones según la distancia d del centro a la recta",
          text: "Se compara $d$ con el radio $r$.",
        },
        {
          kind: "relations",
          items: [
            { left: "$d$", relation: "es mayor que", right: "$r$", tone: "ok" },
            { left: "$d$", relation: "es igual a", right: "$r$", tone: "key" },
            { left: "$d$", relation: "es menor que", right: "$r$", tone: "info" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "circunferencia-recta", beatMs: 3500 },
    },
    {
      id: "explora-recta",
      type: "slide",
      help: [
        {
          label: "¿Qué debo observar?",
          message: "La tangente solo aparece cuando $d$ coincide con el radio. Al cambiar el radio, la distancia necesaria cambia con él.",
        },
      ],
      title: "Explora: acerca la recta",
      blocks: [
        {
          kind: "text",
          text: "Mueve la recta hacia el centro. ¿Cuántos puntos comunes hay en cada posición? ¿Qué longitud tiene la cuerda que se forma?",
        },
      ],
      visual: { kind: "tool", tool: "circ-recta-explorador", params: { a: 6, b: 3 } },
    },
    {
      id: "cobertura",
      type: "predict",
      help: [
        {
          label: "Compara dos números",
          message: "Compara la distancia del centro a la carretera con el radio de cobertura.",
        },
        {
          label: "Si hay dudas, dibújalo",
          message: "Dibuja un círculo de radio $4$ y una recta a $5$ unidades del centro. ¿Llega la recta al círculo?",
        },
      ],
      title: "Cobertura de una antena",
      question:
        "Una antena de wifi cubre un círculo de 4 km de radio. Una carretera recta pasa a 5 km del centro de la antena. ¿Cómo son la carretera y la circunferencia que limita la cobertura?",
      mode: "choice",
      choices: [
        { id: "a", label: "Exteriores: la carretera no entra en la zona de cobertura" },
        {
          id: "b",
          label: "Tangentes: la carretera roza el límite de cobertura",
          incorrectFeedback: "Serían tangentes si la distancia fuera igual al radio, es decir, $4$ km. Aquí son $5$ km, más lejos.",
        },
        {
          id: "c",
          label: "Secantes: la carretera atraviesa la cobertura",
          incorrectFeedback: "Una recta secante está a menos distancia que el radio ($d < r$). La carretera está a $5 > 4$ km.",
        },
        {
          id: "d",
          label: "Concéntricas: comparten el centro",
          incorrectFeedback: "Concéntricas se dice de dos circunferencias con el mismo centro. Una recta y una circunferencia no pueden serlo.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "La distancia del centro a la recta, $d = 5$ km, es mayor que el radio, $r = 4$ km: son **exteriores** y no tienen puntos comunes.",
    },
    {
      id: "dos-circunferencias",
      type: "slide",
      help: [
        {
          label: "¿Cuál es el radio grande y cuál el pequeño?",
          message: "Llamamos $R$ al mayor y $r$ al menor. Así $R - r$ nunca es negativo.",
        },
        {
          label: "¿Qué son circunferencias concéntricas?",
          message: "Las que tienen el mismo centro y distinto radio, como las ondas al lanzar una piedra al agua.",
        },
      ],
      title: "Dos circunferencias",
      blocks: [
        {
          kind: "text",
          text: "La posición depende de la distancia $d$ entre los centros y de los radios $R$ (el mayor) y $r$ (el menor).",
        },
        {
          kind: "steps",
          title: "De lejos a cerca",
          items: [
            "$d > R + r$: **exteriores**.",
            "$d = R + r$: **tangentes exteriores**.",
            "$R - r < d < R + r$: **secantes**.",
            "$d = R - r$: **tangentes interiores**.",
            "$0 < d < R - r$: **interiores**; $d = 0$: **concéntricas**.",
          ],
        },
      ],
      visual: { kind: "anim", scene: "circunferencias-posiciones", beatMs: 3500 },
    },
    {
      id: "explora-dos",
      type: "slide",
      help: [
        {
          label: "¿Qué debo observar?",
          message: "Los casos de tangencia ocurren justo cuando $d$ vale $R + r$ o $R - r$. Prueba con distintos radios y busca esas dos distancias.",
        },
      ],
      title: "Explora: mueve la segunda circunferencia",
      blocks: [
        {
          kind: "text",
          text: "Cambia los radios y la distancia entre centros. ¿Para qué valores de $d$ son las circunferencias secantes?",
        },
      ],
      visual: { kind: "tool", tool: "circ-circ-explorador", params: { a: 4, b: 2, c: 5 } },
    },
    {
      id: "clasificar-posiciones",
      type: "classify",
      help: [
        {
          label: "Calcula dos números",
          message: "Para cada caso calcula $R + r$ y $R - r$ y compara la distancia $d$ con ellos.",
        },
        {
          label: "Igual o distinta",
          message: "Si $d$ es **igual** a $R + r$ o a $R - r$, son tangentes. Si es mayor que $R + r$, exteriores. Si queda entre los dos números, secantes. Si es menor que $R - r$, interiores.",
        },
      ],
      title: "Posición relativa",
      question: "Dos circunferencias tienen radios $R$ y $r$, y sus centros están a una distancia $d$. ¿Cómo son?",
      groups: [
        { id: "exteriores", label: "Exteriores", tone: "emerald" },
        { id: "tangentes", label: "Tangentes", tone: "amber" },
        { id: "secantes", label: "Secantes", tone: "cobalt" },
        { id: "interiores", label: "Interiores", tone: "violet" },
      ],
      items: [
        { id: "a", text: "$R = 5$, $r = 3$, $d = 10$", group: "exteriores" },
        { id: "b", text: "$R = 6$, $r = 2$, $d = 9$", group: "exteriores" },
        { id: "c", text: "$R = 5$, $r = 3$, $d = 8$", group: "tangentes" },
        { id: "d", text: "$R = 7$, $r = 4$, $d = 3$", group: "tangentes" },
        { id: "e", text: "$R = 5$, $r = 3$, $d = 4$", group: "secantes" },
        { id: "f", text: "$R = 6$, $r = 4$, $d = 7$", group: "secantes" },
        { id: "g", text: "$R = 8$, $r = 2$, $d = 3$", group: "interiores" },
        { id: "h", text: "$R = 9$, $r = 3$, $d = 2$", group: "interiores" },
      ],
      hint: "Compara $d$ con $R + r$ y con $R - r$.",
      explanation:
        "$d$ mayor que $R + r$: exteriores. $d = R + r$ o $d = R - r$: tangentes (exterior o interior). $d$ entre los dos valores: secantes. $d$ menor que $R - r$: una está dentro de la otra, sin tocarse (interiores).",
    },
    {
      id: "distancia-centros",
      type: "fill_in_blank",
      help: [
        {
          label: "Tangentes exteriores",
          message: "Se tocan por fuera: la distancia entre los centros es la suma de los dos radios.",
        },
        {
          label: "Hazte un dibujo",
          message: "Dibuja las dos circunferencias tocándose en un punto, y une los centros con un segmento. Ese segmento atraviesa los dos radios.",
        },
      ],
      title: "Dos monedas en contacto",
      question:
        "Dos ruedas dentadas de radios 7 cm y 4 cm se apoyan una en otra por fuera y son tangentes. ¿A qué distancia están sus centros? (escribe solo el número, en cm)",
      correctAnswers: ["11", "11 cm"],
      hint: "En tangentes exteriores, $d = R + r$.",
      explanation: "Al tocarse por fuera, el segmento que une los centros contiene un radio de cada una: $d = 7 + 4 = 11$ cm.",
    },
  ],
};
