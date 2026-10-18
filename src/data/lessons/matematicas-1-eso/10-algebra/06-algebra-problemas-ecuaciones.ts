import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_10_SUBTITLE } from "@/data/lessons/shared";

export const algebraProblemasEcuacionesLesson: InteractiveLesson = {
  slug: "algebra-problemas-ecuaciones",
  title: "6. Problemas con ecuaciones",
  subtitle: TEMA_1ESO_10_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "pasos",
      type: "slide",
      help: [
        {
          label: "¿Por dónde empiezo?",
          message: "Subraya lo que pide el problema: esa es la incógnita. Pon nombre a una sola cosa y escribe las demás en función de ella.",
        },
        {
          label: "¿Y si no sé cuál es la ecuación?",
          message: "Busca la frase que dice «es igual a», «suman», «cuesta»…: ahí hay dos cantidades que valen lo mismo.",
        },
      ],
      title: "Cuatro pasos para plantear un problema",
      blocks: [
        {
          kind: "steps",
          items: [
            "**Nombra** lo que no conoces con una letra y escribe lo demás en función de ella.",
            "**Relaciona** con una igualdad los datos conocidos y los desconocidos.",
            "**Resuelve** la ecuación.",
            "**Interpreta** la solución en el contexto y **comprueba** con el enunciado.",
          ],
        },
        {
          kind: "warning",
          text: "La solución de la ecuación no siempre responde al problema: pregúntate si el resultado tiene sentido (edades, medidas, personas…).",
        },
      ],
    },
    {
      id: "ejemplo-numero",
      type: "slide",
      help: [
        {
          label: "Frase a frase",
          message: "«Le sumas $7$» es $x + 7$. «Le restas $5$» es $x - 5$. «El triple» es $3(x - 5)$. «Obtienes» es el signo $=$.",
        },
        {
          label: "¿Por qué el triple multiplica un paréntesis?",
          message: "Porque el triple es de **todo** el resultado $x - 5$, no solo de la $x$.",
        },
      ],
      title: "Un número y su triple",
      blocks: [
        {
          kind: "text",
          text: "**Si a un número le sumas 7, obtienes el triple que si le restas 5. ¿De qué número se trata?**",
        },
        {
          kind: "example",
          title: "Nombrar",
          lines: [
            { math: "x", note: "el número" },
            { math: "x + 7", note: "el número más $7$" },
            { math: "x - 5", note: "el número menos $5$" },
          ],
        },
        {
          kind: "formula",
          tex: "x + 7 = 3 \\cdot (x - 5)",
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["x", "+", "7", "=", "3", "·", "(", "x", "−", "5", ")"], active: [4, 10], note: "Quitamos el paréntesis con la distributiva." },
            { tokens: ["x", "+", "7", "=", "3x", "−", "15"], active: [0, 6], note: "Transponemos: las $x$ juntas y los números juntos." },
            { tokens: ["7", "+", "15", "=", "3x", "−", "x"], active: [0, 6], note: "Reducimos los dos miembros." },
            { tokens: ["22", "=", "2x"], active: [2, 2], note: "Dividimos entre $2$." },
            { tokens: ["x", "=", "11"], fresh: [0, 2] },
          ],
        },
      },
    },
    {
      id: "parcela",
      type: "slide",
      help: [
        {
          label: "¿Cuántos lados hay?",
          message: "La valla rodea los cuatro lados: dos de ancho ($x$) y dos de largo ($x + 15$).",
        },
        {
          label: "Comprueba la solución",
          message: "Con $30$ de ancho y $45$ de largo: $30 + 45 + 30 + 45 = 150$ m de valla.",
        },
      ],
      title: "Una parcela y su valla",
      blocks: [
        {
          kind: "text",
          text: "**Una parcela rectangular es 15 m más larga que ancha. La valla que la rodea mide 150 m. ¿Cuáles son sus dimensiones?**",
        },
        {
          kind: "facts",
          items: [
            { tex: "x", label: "ancho" },
            { tex: "x + 15", label: "largo" },
            { tex: "150", label: "perímetro" },
          ],
        },
        {
          kind: "formula",
          tex: "x + (x + 15) + x + (x + 15) = 150",
        },
        {
          kind: "text",
          text: "Resultado: **30 m de ancho y 45 m de largo**; comprobación $30 + 45 + 30 + 45 = 150$.",
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["x", "+", "(x + 15)", "+", "x", "+", "(x + 15)", "=", "150"], active: [0, 6], note: "Sumamos los cuatro lados: reducimos los términos semejantes." },
            { tokens: ["4x", "+", "30", "=", "150"], active: [2, 2], note: "Transponemos el $30$." },
            { tokens: ["4x", "=", "150", "−", "30"], active: [2, 4], note: "Reducimos: $150 - 30 = 120$." },
            { tokens: ["4x", "=", "120"], active: [0, 0], note: "Dividimos entre $4$." },
            { tokens: ["x", "=", "30"], fresh: [0, 2] },
          ],
        },
      },
    },
    {
      id: "colegio",
      type: "predict",
      help: [
        {
          label: "¿Qué es $x$ aquí?",
          message: "Llama $x$ al número de chicos: es el dato más sencillo del que parten los demás. Las chicas son $x + 36$.",
        },
        {
          label: "¿Qué suma da $624$?",
          message: "Todos los alumnos son chicos más chicas: $x + (x + 36)$.",
          math: ["x + (x + 36) = 624"],
        },
        {
          label: "Un descarte rápido",
          message: "Si hubiera igual número de chicos y chicas serían $312$ cada uno. Como hay más chicas, los chicos deben ser **menos** de $312$.",
        },
      ],
      title: "Chicos y chicas del colegio",
      question:
        "En un colegio hay 624 alumnos entre chicos y chicas, y el número de chicas supera en 36 al de chicos. ¿Cuántos chicos hay?",
      mode: "choice",
      choices: [
        { id: "a", label: "$294$ chicos" },
        {
          id: "b",
          label: "$312$ chicos",
          incorrectFeedback:
            "Has repartido $624$ a partes iguales ($624 : 2$). Pero hay $36$ chicas más que chicos, así que no pueden ser iguales.",
        },
        {
          label: "$330$ chicos",
          id: "c",
          incorrectFeedback:
            "$330$ es el número de **chicas** ($x + 36$). La incógnita $x$ eran los chicos: $294$. Comprueba que $294 + 330 = 624$.",
        },
        {
          id: "d",
          label: "$588$ chicos",
          incorrectFeedback:
            "Has restado $624 - 36$ y has dejado ahí el resultado. Pero esa resta no distingue entre chicos y chicas: aún hay que repartirla en dos mitades.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "$x + (x + 36) = 624 \\Rightarrow 2x = 588 \\Rightarrow x = 294$ chicos y $294 + 36 = 330$ chicas.",
    },
    {
      id: "plantillas",
      type: "slide",
      help: [
        {
          label: "¿Y si piden tres números?",
          message: "Si son consecutivos, usa $x$, $x + 1$ y $x + 2$, o bien $x - 1$, $x$ y $x + 1$ si quieres centrarlos.",
        },
        {
          label: "¿Por qué $2x$ y $4x$?",
          message: "Cada vaca tiene $2$ cuernos y $4$ patas: con $x$ vacas hay $2x$ cuernos y $4x$ patas.",
        },
      ],
      title: "Plantillas que se repiten",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "x,\\ x + 1", label: "dos números consecutivos" },
            { tex: "x - 1,\\ x,\\ x + 1", label: "tres consecutivos" },
            { tex: "x,\\ x + 36", label: "uno supera en $36$ al otro" },
          ],
        },
        {
          kind: "example",
          title: "Vacas",
          lines: [
            { math: "x", note: "vacas" },
            { math: "2x", note: "cuernos" },
            { math: "4x", note: "patas" },
          ],
        },
        {
          kind: "text",
          text: "Elige como $x$ la cantidad de la que **dependen** las demás: así el resto se escribe fácil.",
        },
      ],
    },
    {
      id: "edades",
      type: "slide",
      help: [
        {
          label: "¿Quién va en función de quién?",
          message: "Marta es un año mayor que Roberta ($x + 1$) y Antonio nació cuando Roberta tenía $5$ ($x - 5$).",
        },
        {
          label: "Comprueba",
          message: "$13 + 14 + 8 = 35$. Las tres edades suman $35$.",
        },
      ],
      title: "Tres edades con una sola incógnita",
      blocks: [
        {
          kind: "text",
          text: "**Roberta tiene un año menos que Marta y ya tenía cinco cuando nació Antonio, el más pequeño. Entre los tres suman 35 años. ¿Qué edad tiene cada uno?**",
        },
        {
          kind: "facts",
          items: [
            { tex: "x", label: "Roberta" },
            { tex: "x + 1", label: "Marta" },
            { tex: "x - 5", label: "Antonio" },
          ],
        },
        {
          kind: "formula",
          tex: "x + (x + 1) + (x - 5) = 35",
        },
      ],
      visual: {
        kind: "anim",
        scene: "expr-reescritura",
        params: {
          expr: [
            { tokens: ["x", "+", "(x + 1)", "+", "(x − 5)", "=", "35"], active: [0, 4], note: "Reducimos: $3x$ y $+1 - 5 = -4$." },
            { tokens: ["3x", "−", "4", "=", "35"], active: [2, 2], note: "Transponemos el $4$." },
            { tokens: ["3x", "=", "35", "+", "4"], active: [2, 4], note: "Reducimos: $35 + 4 = 39$." },
            { tokens: ["3x", "=", "39"], active: [0, 0], note: "Dividimos entre $3$: $x = 13$." },
            { tokens: ["R = 13", ",", "M = 14", ",", "A = 8"], fresh: [0, 4] },
          ],
        },
      },
    },
    {
      id: "vacas",
      type: "predict",
      help: [
        {
          label: "¿Qué opero?",
          message: "Cada vaca aporta cuernos y patas. Hay que contar **los dos** y sumarlos.",
        },
        {
          label: "¿Cuántas cosas por vaca?",
          message: "Una vaca tiene $2$ cuernos y $4$ patas: $6$ cosas contables en total.",
          math: ["2x + 4x = 222"],
        },
        {
          label: "Estima",
          message: "Si cada vaca da $6$ cosas, el número de vacas es bastante menor que $222$: unas $222 : 6$.",
        },
      ],
      title: "Cuernos y patas en la granja",
      question:
        "Un granjero cuenta entre los cuernos y las patas de todas sus vacas 222 en total. Cada vaca tiene 2 cuernos y 4 patas. ¿Cuántas vacas tiene?",
      mode: "choice",
      choices: [
        { id: "a", label: "$37$ vacas" },
        {
          id: "b",
          label: "$111$ vacas",
          incorrectFeedback:
            "Has dividido $222 : 2$, como si cada vaca aportara solo los cuernos. Pero también hay que contar las $4$ patas.",
        },
        {
          id: "c",
          label: "$74$ vacas",
          incorrectFeedback:
            "Has dividido $222 : 3$. Cada vaca aporta $2$ cuernos **más** $4$ patas, es decir $6$, no $3$.",
        },
        {
          id: "d",
          label: "$55$ vacas",
          incorrectFeedback:
            "Con $55$ vacas habría $110$ cuernos y $220$ patas, $330$ en total. Nos pasamos de $222$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$2x + 4x = 222 \\Rightarrow 6x = 222 \\Rightarrow x = 37$ vacas.",
    },
    {
      id: "check",
      type: "fill_in_blank",
      help: [
        {
          label: "Nombra el número",
          message: "Llama $x$ al número más pequeño. Los otros dos son $x + 1$ y $x + 2$.",
        },
        {
          label: "Plantea la suma",
          message: "Los tres suman $84$: escribe la igualdad y reduce términos semejantes antes de transponer.",
          math: ["x + (x + 1) + (x + 2) = 84"],
        },
        {
          label: "Interpreta",
          message: "La ecuación te da $x$, y $x$ es el menor de los tres. Eso es justo lo que piden.",
        },
      ],
      title: "Tres números consecutivos",
      question:
        "La suma de tres números consecutivos es 84. ¿Cuál es el menor de los tres? (escribe solo el número)",
      correctAnswers: ["27", "x=27"],
      hint: "Si el menor es $x$, los otros son $x + 1$ y $x + 2$.",
      explanation:
        "$3x + 3 = 84 \\Rightarrow 3x = 81 \\Rightarrow x = 27$. Los números son $27$, $28$ y $29$, y suman $84$.",
    },
  ],
};
