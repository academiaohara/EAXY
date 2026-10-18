import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_7_SUBTITLE } from "@/data/lessons/shared";

export const problemasConSistemasLesson: InteractiveLesson = {
  slug: "problemas-con-sistemas",
  title: "5. Problemas con sistemas de ecuaciones",
  subtitle: TEMA_7_SUBTITLE,
  steps: [
    {
      id: "intro",
      type: "concept",
      title: "Del enunciado al sistema",
      content: [
        "Muchos problemas se resuelven traduciendo el enunciado al lenguaje algebraico.",
        "Lo habitual es definir **dos incógnitas**, plantear **dos ecuaciones** con los datos del problema y resolver el sistema.",
      ],
      visuals: [
        {
          kind: "translate",
          title: "Del enunciado al álgebra",
          rows: [
            { text: "Lo que cuesta un bocadillo", math: "x" },
            { text: "Lo que cuesta un refresco", math: "y" },
            { text: "4 bocadillos y 5 refrescos cuestan 14 €", math: "4x + 5y = 14" },
            { text: "3 bocadillos y 2 refrescos cuestan 8,40 €", math: "3x + 2y = 8{,}40" },
          ],
        },
      ],
    },
    {
      id: "bocadillos",
      type: "animated_solution",
      title: "Problema resuelto — Bocadillos y refrescos",
      content: [
        "Elvira pagó 14 € por 4 bocadillos y 5 refrescos. Lorena pagó 8,40 € por 3 bocadillos y 2 refrescos. Vamos paso a paso.",
      ],
      frames: [
        {
          caption: "Definimos las incógnitas:",
          math: "x = \\text{precio de un bocadillo},\\quad y = \\text{precio de un refresco}",
        },
        {
          caption: "Traducimos los datos de Elvira y Lorena:",
          math: "\\begin{cases} 4x + 5y = 14 \\\\ 3x + 2y = 8{,}40 \\end{cases}",
        },
        {
          caption: "Resolvemos (por reducción, por ejemplo):",
          math: "x = 2,\\quad y = 1{,}20",
        },
        {
          caption: "Respuesta al problema:",
          math: "\\text{Un bocadillo cuesta } 2\\text{ € y un refresco } 1{,}20\\text{ €}",
        },
      ],
    },
    {
      id: "inversion",
      type: "concept",
      title: "Otro tipo de problemas: porcentajes",
      content: [
        "En problemas de inversión repartimos un capital entre dos opciones con distinto interés.",
        "Una ecuación relaciona las cantidades ($x + y = \\text{total}$) y otra, los intereses ($0{,}04x + 0{,}05y = \\text{ganancia}$).",
      ],
      visuals: [
        {
          kind: "translate",
          title: "Ejemplo: reparto 10 000 € y gano 460 €",
          rows: [
            { text: "Lo que pongo en la cuenta al 4 %", math: "x" },
            { text: "Lo que pongo en la cuenta al 5 %", math: "y" },
            { text: "Entre las dos suman 10 000 €", math: "x + y = 10\\,000" },
            { text: "Los intereses suman 460 €", math: "0{,}04x + 0{,}05y = 460" },
          ],
        },
      ],
    },
    {
      id: "check",
      type: "classify",
      help: [
        {
          label: "Traduce frase a frase",
          message: "Cada frase del enunciado da una ecuación. Empieza por la de la suma y después busca la otra relación.",
        },
        {
          label: "Mira «el doble del menor»",
          message: "El doble de $y$ es $2y$. «Al mayor le sumamos $1$» es $x + 1$. «Obtenemos» es el signo igual.",
          math: [
            "\\underbrace{x + 1}_{\\text{al mayor le sumamos 1}} = \\underbrace{\\;?\\;}_{\\text{el doble del menor}}",
          ],
        },
        {
          label: "Pon a prueba una ecuación",
          message: "Prueba con dos números que sumen $14$, por ejemplo $10$ y $4$: ¿cumplen la segunda condición? Así ves si una ecuación está mal planteada.",
        },
      ],
      title: "Practica",
      question:
        "La suma de dos números es 14. Si al mayor le sumamos 1 obtenemos el doble del menor. Llamamos $x$ al mayor e $y$ al menor: ¿qué ecuaciones traducen el enunciado?",
      groups: [
        { id: "si", label: "Forma parte del sistema", tone: "emerald" },
        { id: "no", label: "No traduce el enunciado", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$x + y = 14$", group: "si" },
        { id: "b", text: "$x + 1 = 2y$", group: "si" },
        { id: "c", text: "$x = y + 1$", group: "no" },
        { id: "d", text: "$xy = 14$", group: "no" },
        { id: "e", text: "$x = 2y$", group: "no" },
        { id: "f", text: "$2(x + 1) = y$", group: "no" },
      ],
      hint: "Traduce frase a frase: «la suma es 14» y «el mayor más 1 es el doble del menor».",
      explanation:
        "La suma da $x + y = 14$ y la condición del enunciado es $x + 1 = 2y$. Resolviendo: $x = 9$, $y = 5$ ($9 + 1 = 10 = 2 \\cdot 5$).",
    },
  ],
};
