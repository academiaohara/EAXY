import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_3_SUBTITLE } from "@/data/lessons/shared";

export const sistemasClasificacion2bachLesson: InteractiveLesson = {
  slug: "sistemas-clasificacion-2bach",
  title: "1. Sistemas lineales: tipos y significado geométrico",
  subtitle: TEMA_2BACH_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "definicion",
      type: "slide",
      help: [{ label: "Lineal", message: "Las incógnitas solo aparecen sumadas, con exponente $1$ y multiplicadas por un número: nada de $x^2$, $xy$ ni $\\sqrt{x}$." }],
      title: "Sistema de m ecuaciones con n incógnitas",
      blocks: [
        { kind: "definition", text: "Un **sistema de $m$ ecuaciones lineales con $n$ incógnitas** es un conjunto de relaciones $a_{i1}x_1 + a_{i2}x_2 + \\dots + a_{in}x_n = b_i$. Los $a_{ij}$ son los **coeficientes** y los $b_i$ los **términos independientes**." },
        { kind: "text", text: "Una **solución** es un conjunto ordenado $(\\alpha_1, \\dots, \\alpha_n)$ que cumple **todas** las ecuaciones a la vez." },
        { kind: "text", text: "Geométricamente, una ecuación lineal con $2$ incógnitas es una **recta**; con $3$, un **plano**. Resolver el sistema es buscar los puntos comunes a todas ellas." },
      ],
      visual: { kind: "anim", scene: "sistema-rectas", params: { sys: "unica" } },
    },
    {
      id: "tipos",
      type: "slide",
      help: [{ label: "Esquema", message: "Compatible: tiene solución. Incompatible: no la tiene. Si es compatible, determinado (una) o indeterminado (infinitas)." }],
      title: "Compatible determinado, indeterminado o incompatible",
      blocks: [
        { kind: "steps", items: [
          "**Compatible determinado (S.C.D.)**: una única solución. Las rectas se cortan en un punto.",
          "**Compatible indeterminado (S.C.I.)**: infinitas soluciones. Las rectas (o planos) coinciden o comparten una recta.",
          "**Incompatible (S.I.)**: ninguna solución. Hay ecuaciones que se contradicen: por ejemplo, rectas paralelas.",
        ] },
        { kind: "warning", text: "Un sistema lineal **nunca tiene exactamente dos soluciones**: o tiene una, o infinitas, o ninguna." },
      ],
      visual: { kind: "anim", scene: "sistema-rectas", params: { sys: "incompatible" } },
    },
    {
      id: "check-solucion",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Suma las dos ecuaciones: $2x = 4$." }],
      title: "Una solución única",
      question: "El sistema $x + y = 3$, $x - y = 1$ es compatible determinado. ¿Cuánto vale $x$? (solo el número)",
      correctAnswers: ["2"],
      explanation: "Sumando: $2x = 4 \\Rightarrow x = 2$, y entonces $y = 1$. Las dos rectas se cortan en $(2, 1)$.",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Compara los coeficientes: si una ecuación es múltiplo de la otra, o coinciden (S.C.I.) o son paralelas (S.I.)." }],
      title: "Clasifica el sistema",
      question: "Clasifica cada sistema de dos ecuaciones.",
      groups: [
        { id: "scd", label: "Compatible determinado", tone: "emerald" },
        { id: "sci", label: "Compatible indeterminado", tone: "amber" },
        { id: "si", label: "Incompatible", tone: "rose" },
      ],
      items: [
        { id: "a", text: "$x + y = 3$, $\\ x - y = 1$", group: "scd" },
        { id: "b", text: "$x + y = 3$, $\\ 2x + 2y = 6$", group: "sci" },
        { id: "c", text: "$x + y = 3$, $\\ 2x + 2y = 5$", group: "si" },
        { id: "d", text: "$x + 2y = 3$, $\\ 2x + 3y = 3$", group: "scd" },
        { id: "e", text: "$3x - y = 6$, $\\ 6x - 2y = 12$", group: "sci" },
        { id: "f", text: "$3x - y = 6$, $\\ 3x - y = 7$", group: "si" },
      ],
      hint: "En (b) y (e) la segunda ecuación es el doble de la primera: coinciden. En (c) y (f) los coeficientes son proporcionales pero los términos independientes no: paralelas.",
    },
    {
      id: "check-tres",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Mira la primera y la tercera ecuación: tienen los mismos coeficientes." }],
      title: "Con tres incógnitas",
      question: "En el sistema $x + y + z = 3$, $\\ 2x - y + z = 2$, $\\ x + y + z = 4$, ¿qué ocurre?",
      choices: [
        { id: "a", label: "Es incompatible: la 1.ª y la 3.ª ecuación se contradicen" },
        { id: "b", label: "Tiene una única solución", incorrectFeedback: "Las ecuaciones 1 y 3 tienen la misma parte izquierda y distinto término independiente: no pueden cumplirse a la vez." },
        { id: "c", label: "Tiene infinitas soluciones", incorrectFeedback: "Solo habría infinitas si la 3.ª ecuación fuera consecuencia de las otras." },
        { id: "d", label: "No se puede saber sin resolverlo", incorrectFeedback: "Sí se puede: $x + y + z$ no puede valer $3$ y $4$ a la vez." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "$x + y + z$ no puede valer $3$ y $4$ a la vez: sistema incompatible. Geométricamente, dos planos paralelos y distintos.",
    },
  ],
};
