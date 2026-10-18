import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_7_SUBTITLE } from "@/data/lessons/shared";

export const fraccionesEquivalentesLesson: InteractiveLesson = {
  slug: "fracciones-equivalentes",
  title: "4. Fracciones equivalentes",
  subtitle: TEMA_1ESO_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "mismo-valor",
      type: "slide",
      help: [
        {
          label: "Una misma tarta",
          message: "Parte una tarta en $4$ y toma una porción; parte otra igual en $12$ y toma $3$: comes lo mismo.",
        },
        {
          label: "¿Cómo lo compruebo?",
          message: "Pasa las dos a decimal: si dan el mismo número, son equivalentes.",
        },
      ],
      title: "Misma porción, distinta escritura",
      blocks: [
        {
          kind: "definition",
          text: "Dos fracciones son **equivalentes** si representan la **misma porción** de la unidad, es decir, si tienen el mismo valor.",
        },
        {
          kind: "example",
          title: "Comprobación con decimales",
          lines: [
            { math: "\\frac{1}{4} = 1 : 4 = 0{,}25" },
            { math: "\\frac{3}{12} = 3 : 12 = 0{,}25", note: "mismo valor: $\\frac{1}{4} = \\frac{3}{12}$" },
          ],
        },
      ],
      visual: { kind: "anim", scene: "fraccion-equivalente", params: { a: 1, b: 2, c: 3 } },
    },
    {
      id: "marca-equivalente",
      type: "fraction_pick",
      help: [
        {
          label: "¿Qué quiere decir «equivalente»?",
          message: "Que representa la misma porción de la barra, aunque se escriba con otros números.",
        },
        {
          label: "Cambia de denominador",
          message: "La barra tiene $8$ partes. Multiplica numerador y denominador por el mismo número hasta que el denominador sea $8$.",
          math: ["\\frac{3}{4} = \\frac{3 \\cdot ?}{4 \\cdot ?}"],
        },
      ],
      title: "Colorea una fracción equivalente",
      question:
        "La barra está partida en $8$ partes iguales. Colorea $\\frac{3}{4}$ de la barra.",
      shape: "bar",
      numerator: 3,
      denominator: 4,
      parts: 8,
      hint: "Cada cuarto de la barra son $2$ octavos. ¿Cuántos octavos son $3$ cuartos?",
      explanation:
        "$\\frac{3}{4} = \\frac{3 \\cdot 2}{4 \\cdot 2} = \\frac{6}{8}$: hay que colorear $6$ de las $8$ partes.",
    },
    {
      id: "propiedad",
      type: "slide",
      help: [
        {
          label: "¿Por qué no cambia el valor?",
          message: "Multiplicar numerador y denominador por $5$ es partir cada trozo en $5$: hay $5$ veces más trozos, pero $5$ veces más pequeños.",
        },
        {
          label: "¿Y por qué dividir?",
          message: "Es lo mismo al revés: agrupas trozos y la porción no cambia.",
        },
        {
          label: "Cuidado",
          message: "Solo vale multiplicar o dividir **los dos** números por lo mismo. Sumarles el mismo número no mantiene el valor.",
        },
      ],
      title: "Propiedad fundamental: multiplicar o dividir los dos términos",
      blocks: [
        {
          kind: "rule",
          title: "Propiedad fundamental",
          text: "Si multiplicas o divides numerador y denominador por el **mismo número** (distinto de $0$), obtienes una fracción equivalente.",
          formula: "\\frac{3}{4} = \\frac{3\\cdot 5}{4\\cdot 5} = \\frac{15}{20} \\qquad \\frac{12}{18} = \\frac{12 : 6}{18 : 6} = \\frac{2}{3}",
        },
        {
          kind: "warning",
          text: "Tiene que ser **multiplicar o dividir**, y en los **dos** términos. Sumar el mismo número no vale: $\\frac{1}{2} \\neq \\frac{1+2}{2+2} = \\frac{3}{4}$.",
        },
      ],
      visual: { kind: "tool", tool: "fraccion-equivalentes", params: { n: 2, d: 5, k: 2 } },
    },
    {
      id: "check-chocolate",
      type: "predict",
      help: [
        {
          label: "¿Qué comparo?",
          message: "Cada uno come una parte de una tableta idéntica. Si las dos partes son la misma cantidad de tableta, comen igual.",
        },
        {
          label: "Una forma de comprobarlo",
          message: "Simplifica la fracción de Carmen, o amplía la de Francisco, hasta que tengan el mismo denominador.",
        },
      ],
      title: "¿Quién comió más?",
      question:
        "Francisco y Carmen compran una tableta de chocolate cada uno. Francisco come $\\frac{1}{4}$ de la suya y Carmen $\\frac{2}{8}$ de la suya. ¿Quién ha comido más chocolate?",
      mode: "choice",
      choices: [
        { id: "a", label: "Los dos lo mismo: $\\frac{2}{8} = \\frac{1}{4}$" },
        {
          id: "b",
          label: "Carmen, porque $\\frac{2}{8}$ tiene números más grandes",
          incorrectFeedback:
            "Los números más grandes no dan una fracción mayor: Carmen tiene el doble de trozos, pero cada uno es la mitad de grande.",
        },
        {
          id: "c",
          label: "Francisco, porque $4$ es menor que $8$ y sus trozos son más grandes",
          incorrectFeedback:
            "Sus trozos son mayores, sí, pero Carmen coge $2$. Dos octavos juntos hacen justo un cuarto.",
        },
        {
          id: "d",
          label: "No se puede saber sin conocer el peso de las tabletas",
          incorrectFeedback:
            "Las tabletas son iguales: la fracción compara partes de una misma unidad, y dos fracciones equivalentes son la misma parte.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$\\frac{2}{8} = \\frac{2 : 2}{8 : 2} = \\frac{1}{4}$: han comido la misma cantidad.",
    },
    {
      id: "simplificar",
      type: "slide",
      help: [
        {
          label: "¿Qué busco?",
          message: "Una fracción con números más pequeños que valga lo mismo.",
        },
        {
          label: "¿Cómo no equivocarme?",
          message: "Divide por un divisor común y repite hasta que no quede ninguno (salvo el $1$). Los criterios de divisibilidad ayudan.",
        },
        {
          label: "Un atajo",
          message: "Si divides entre el m.c.d. llegas a la irreducible en un solo paso.",
        },
      ],
      title: "Simplificar hasta la fracción irreducible",
      arrange: "stack",
      blocks: [
        {
          kind: "definition",
          text: "**Simplificar** es sustituir una fracción por otra equivalente con términos más pequeños, dividiendo numerador y denominador entre un divisor común. Si ya no se puede simplificar más, es **irreducible**.",
        },
        {
          kind: "example",
          title: "Simplificar $\\frac{12}{30}$",
          lines: [
            { math: "\\frac{12}{30} = \\frac{12 : 2}{30 : 2} = \\frac{6}{15}", note: "entre $2$" },
            { math: "\\frac{6}{15} = \\frac{6 : 3}{15 : 3} = \\frac{2}{5}", note: "entre $3$; $2$ y $5$ ya no comparten divisores: irreducible" },
            { math: "\\frac{12}{30} = \\frac{12 : 6}{30 : 6} = \\frac{2}{5}", note: "o directamente entre el m.c.d., $6$" },
          ],
        },
        {
          kind: "warning",
          text: "Hay que dividir **los dos** términos por el mismo número. Y la fracción no cambia de valor: $\\frac{12}{30}$ y $\\frac{2}{5}$ son la misma cantidad.",
        },
      ],
    },
    {
      id: "check-simpl",
      type: "predict",
      help: [
        {
          label: "¿Qué es una fracción irreducible?",
          message: "La que ya no se puede simplificar: numerador y denominador no tienen más divisor común que el $1$.",
        },
        {
          label: "No veo el divisor común mayor",
          message: "Divide entre cualquier divisor común, aunque no sea el mayor, y repite hasta que no puedas más.",
        },
      ],
      title: "Fracción simplificada",
      question:
        "En una biblioteca hay 1 575 libros y 630 están prestados. La fracción prestada es $\\frac{630}{1575}$. ¿Cuál es su forma irreducible?",
      mode: "choice",
      calculator: true,
      choices: [
        { id: "a", label: "$\\frac{2}{5}$" },
        {
          id: "b",
          label: "$\\frac{14}{35}$",
          incorrectFeedback:
            "Esa fracción es equivalente, pero todavía se puede simplificar: $14$ y $35$ son múltiplos de $7$.",
        },
        {
          id: "c",
          label: "$\\frac{210}{525}$",
          incorrectFeedback:
            "Solo has dividido entre $3$ una vez. Ambos términos siguen teniendo divisores comunes ($3$, $5$, $7$…).",
        },
        {
          id: "d",
          label: "$\\frac{5}{2}$",
          incorrectFeedback:
            "Has dado la vuelta a la fracción: no es equivalente (vale más que $1$), y los libros prestados son menos de la mitad.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$\\frac{630}{1575} = \\frac{210}{525} = \\frac{70}{175} = \\frac{14}{35} = \\frac{2}{5}$ (dividiendo entre $3$, $3$, $5$ y $7$; o entre $315$ de golpe).",
    },
    {
      id: "check-equiv",
      type: "classify",
      help: [
        {
          label: "¿Cuándo son equivalentes dos fracciones?",
          message: "Cuando valen lo mismo. Puedes pasarlas a decimal o ampliar y simplificar para compararlas.",
        },
        {
          label: "Producto cruzado",
          message: "$\\frac{a}{b} = \\frac{c}{d}$ si $a \\cdot d = b \\cdot c$. Pruébalo con cada tarjeta.",
          math: [
            "\\frac{3}{5} \\overset{?}{=} \\frac{6}{10}: \\quad 3 \\cdot 10 \\ \\text{y}\\ 5 \\cdot 6",
          ],
        },
      ],
      title: "¿Equivalentes?",
      question: "Clasifica cada fracción según sea o no equivalente a $\\frac{3}{5}$.",
      groups: [
        { id: "si", label: "Equivalente a $\\frac{3}{5}$", tone: "emerald" },
        { id: "no", label: "No equivalente", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$\\frac{6}{10}$", group: "si" },
        { id: "b", text: "$\\frac{9}{15}$", group: "si" },
        { id: "c", text: "$\\frac{12}{20}$", group: "si" },
        { id: "d", text: "$\\frac{3}{10}$", group: "no" },
        { id: "e", text: "$\\frac{5}{3}$", group: "no" },
        { id: "f", text: "$\\frac{4}{6}$", group: "no" },
      ],
      hint: "Busca si numerador y denominador se obtienen multiplicando $3$ y $5$ por el mismo número.",
      explanation:
        "$\\frac{6}{10}$, $\\frac{9}{15}$ y $\\frac{12}{20}$ salen de multiplicar por $2$, $3$ y $4$: valen $0{,}6$. $\\frac{3}{10}$, $\\frac{5}{3}$ y $\\frac{4}{6}$ tienen otro valor.",
    },
    {
      id: "divide-equivalente",
      type: "fraction_pick",
      help: [
        {
          label: "¿En cuántas partes divido?",
          message: "Cualquier múltiplo de $5$ sirve ($5$, $10$, $15$…), porque así cada quinto se reparte en partes enteras.",
        },
        {
          label: "¿Cuántas coloreo?",
          message: "Si divides cada quinto en $k$ partes, $\\frac{2}{5}$ son $2k$ partes de las $5k$ que hay.",
          math: ["\\frac{2}{5} = \\frac{2k}{5k}"],
        },
      ],
      title: "Elige tú la división",
      question:
        "Divide la barra en el número de partes que quieras (por ejemplo $10$) y colorea una fracción equivalente a $\\frac{2}{5}$.",
      shape: "bar",
      numerator: 2,
      denominator: 5,
      adjustableParts: true,
      hint: "Si divides en $10$ partes, cada quinto son $2$ décimos.",
      explanation:
        "Vale cualquier marcado equivalente: $\\frac{2}{5} = \\frac{4}{10} = \\frac{6}{15} = \\frac{8}{20}$.",
    },
    {
      id: "check-completa",
      type: "predict",
      help: [
        {
          label: "¿Por cuánto se ha multiplicado?",
          message: "Mira los dos denominadores: ¿por qué número hay que multiplicar $4$ para llegar a $20$?",
        },
        {
          label: "Y el numerador",
          message: "Lo que hagas abajo hay que hacerlo también arriba, con el mismo número.",
        },
      ],
      title: "Completar una equivalencia",
      question:
        "Un tablero de 4 filas iguales tiene 3 pintadas, o sea, $\\frac{3}{4}$. Se vuelve a dividir en 20 filas más estrechas, todas iguales. ¿Cuántas hay que pintar para cubrir la misma parte?",
      mode: "choice",
      choices: [
        { id: "a", label: "$15$ filas" },
        {
          id: "b",
          label: "$7$ filas",
          incorrectFeedback:
            "Has sumado: de $4$ a $20$ hay $16$ más, y $3 + 16$ no da $7$. Para mantener la parte hay que **multiplicar** por $5$ en los dos términos.",
        },
        {
          id: "c",
          label: "$19$ filas",
          incorrectFeedback:
            "Has hecho $20 - 1$ (porque en $\\frac{3}{4}$ falta una fila). Pintar casi todo es otra parte, mucho mayor que tres cuartos.",
        },
        {
          id: "d",
          label: "$3$ filas",
          incorrectFeedback:
            "Con $20$ filas, cada una es mucho más estrecha. Tres filas serían solo $\\frac{3}{20}$ del tablero.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$\\frac{3}{4} = \\frac{3\\cdot 5}{4\\cdot 5} = \\frac{15}{20}$: hay que pintar $15$ filas.",
    },
  ],
};
