import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_7_SUBTITLE } from "@/data/lessons/shared";

export const fraccionesEquivalentesLesson: InteractiveLesson = {
  slug: "fracciones-equivalentes",
  title: "4. Fracciones equivalentes",
  subtitle: TEMA_1ESO_7_SUBTITLE,
  steps: [
    {
      id: "mismo-valor",
      type: "concept",
      title: "Misma porción, distinta escritura",
      content: [
        "Dos fracciones son **equivalentes** si representan la **misma porción** de la unidad (mismo valor numérico).",
        "Por ejemplo $\\frac{1}{4}$ y $\\frac{3}{12}$ valen lo mismo: $1 : 4 = 0{,}25$ y $3 : 12 = 0{,}25$.",
        "Fíjate en las dos barras: son iguales y la parte coloreada ocupa lo mismo, aunque una esté partida en $4$ y la otra en $12$.",
      ],
      visuals: [
        {
          kind: "fraction-figure",
          title: "$\\frac{1}{4}$",
          shape: "bar",
          parts: 4,
          shaded: 1,
          tone: "cobalt",
        },
        {
          kind: "fraction-figure",
          title: "$\\frac{3}{12}$",
          shape: "bar",
          parts: 12,
          shaded: 3,
          tone: "emerald",
          caption: "Misma porción de la unidad.",
        },
      ],
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
      type: "concept",
      title: "Propiedad fundamental",
      content: [
        "Si **multiplicas o divides** numerador y denominador por el **mismo número** (distinto de cero), obtienes una fracción equivalente.",
        "$$\\frac{3}{4} = \\frac{3 \\cdot 5}{4 \\cdot 5} = \\frac{15}{20}$$",
        "$$\\frac{12}{18} = \\frac{12 : 6}{18 : 6} = \\frac{2}{3}$$",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Cadena de equivalencias",
          items: [
            { title: "Amplificar", math: "\\frac{1}{2} = \\frac{6}{12}", tone: "cobalt" },
            { title: "Simplificar", math: "\\frac{3}{6} = \\frac{1}{2}", tone: "emerald" },
          ],
        },
      ],
    },
    {
      id: "simplificar",
      type: "concept",
      title: "Simplificación",
      content: [
        "**Simplificar** es buscar una fracción equivalente con términos más pequeños, dividiendo por divisores comunes.",
        "Ejemplo: $\\frac{12}{30} = \\frac{6}{15} = \\frac{2}{5}$.",
        "Si no puedes simplificar más, la fracción es **irreducible** (como $\\frac{2}{5}$).",
      ],
      visuals: [
        {
          kind: "stack",
          title: "Simplificar $\\frac{12}{30}$",
          rows: ["12 : 2", "30 : 2", "→ 6 : 3", "15 : 3"],
          operator: "",
          result: "\\frac{2}{5}",
          caption: "También puedes dividir directamente entre $6$.",
        },
      ],
    },
    {
      id: "chocolate",
      type: "animated_solution",
      title: "Problema — ¿quién comió más?",
      content: [
        "Francisco come $\\frac{1}{4}$ de una tableta y Carmen $\\frac{2}{8}$ de otra igual. ¿Quién comió un trozo mayor?",
      ],
      frames: [
        {
          caption: "Simplifica la fracción de Carmen:",
          math: "\\frac{2}{8} = \\frac{2 : 2}{8 : 2} = \\frac{1}{4}",
        },
        {
          caption: "Conclusión:",
          math: "\\frac{1}{4} = \\frac{2}{8} \\Rightarrow \\text{ comieron la misma cantidad}",
        },
      ],
    },
    {
      id: "anim-biblio",
      type: "animated_solution",
      title: "Ejemplo — fracción de libros prestados",
      content: [
        "De $1575$ libros, $630$ están prestados. ¿Qué fracción está prestada? (simplifica).",
      ],
      frames: [
        { caption: "Fracción:", math: "\\frac{630}{1575}" },
        { caption: "Simplificando:", math: "\\frac{630}{1575} = \\frac{210}{525} = \\frac{70}{175} = \\frac{14}{35} = \\frac{2}{5}" },
      ],
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
      id: "check-simpl",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué es una fracción irreducible?",
          message: "La que ya no se puede simplificar: numerador y denominador no tienen más divisor común que el $1$.",
        },
        {
          label: "No veo el divisor común mayor",
          message: "Divide entre cualquier divisor común, aunque no sea el mayor, y repite hasta que no puedas más.",
        },
        {
          label: "¿Cómo sé que ya he terminado?",
          message: "Mira si el numerador y el denominador comparten algún divisor distinto de $1$. Si no, es irreducible.",
        },
      ],
      title: "Simplifica",
      question: "La fracción irreducible equivalente a $\\frac{15}{20}$ es $\\frac{?}{?}$. Escribe solo el numerador.",
      correctAnswers: ["3"],
      hint: "Divide numerador y denominador entre $5$.",
      explanation: "$\\frac{15}{20} = \\frac{3}{4}$.",
    },
  ],
};
