import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_2BACH_2_SUBTITLE } from "@/data/lessons/shared";

export const propiedadesDet22bachLesson: InteractiveLesson = {
  slug: "propiedades-det-2-2bach",
  title: "3. Propiedades (II): permutar, líneas iguales y combinaciones",
  subtitle: TEMA_2BACH_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "permutar",
      type: "slide",
      help: [{ label: "Dos veces", message: "Si se permutan dos filas y luego otras dos, el signo cambia dos veces y el determinante vuelve a su valor." }],
      title: "Propiedades 5 y 6: permutar y repetir",
      blocks: [
        { kind: "rule", title: "Propiedad 5", text: "Si se **permutan dos líneas paralelas**, el determinante cambia de signo." },
        { kind: "rule", title: "Propiedad 6", text: "Si dos líneas paralelas son **iguales**, el determinante es $0$. (Si se permutan, el determinante debería cambiar de signo y no cambiar: solo puede valer $0$.)" },
        { kind: "example", lines: [
          { math: "\\begin{vmatrix} 1 & 2 & 3 \\\\ 4 & 3 & -1 \\\\ 3 & 4 & 5 \\end{vmatrix} = -6 \\qquad \\begin{vmatrix} 2 & 1 & 3 \\\\ 3 & 4 & -1 \\\\ 4 & 3 & 5 \\end{vmatrix} = 6", note: "se intercambian las columnas 1 y 2" },
        ] },
      ],
      visual: { kind: "tool", tool: "determinante-propiedades-explorador", initial: [1, 2, 2, 3, 4, 1, 3, 2, 5, 1, 6], hint: "Intercambia dos filas y comprueba que el determinante cambia de signo; después prueba «Hacer F₃ = F₁ + F₂»." },
    },
    {
      id: "check-permutar",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Se intercambian dos columnas: el signo cambia." }],
      title: "Permutar dos columnas",
      question: "Si $\\begin{vmatrix} a & b & c \\\\ d & e & f \\\\ g & h & i \\end{vmatrix} = 5$, ¿cuánto vale $\\begin{vmatrix} b & a & c \\\\ e & d & f \\\\ h & g & i \\end{vmatrix}$? (solo el número)",
      correctAnswers: ["-5", "−5"],
      explanation: "Se han intercambiado las columnas 1 y 2: el determinante cambia de signo, $-5$.",
    },
    {
      id: "proporcionales",
      type: "slide",
      help: [{ label: "Idea común", message: "Todas estas propiedades dicen lo mismo: si una línea no aporta información nueva, el determinante es $0$." }],
      title: "Propiedades 7, 8 y 9: líneas dependientes",
      blocks: [
        { kind: "steps", items: [
          "**7.** Dos líneas **proporcionales** ⟹ $|A| = 0$.",
          "**8.** Una línea **combinación lineal** de las demás ⟹ $|A| = 0$.",
          "**9.** Sumar a una línea una **combinación lineal** de las demás **no cambia** el determinante.",
        ] },
        { kind: "example", title: "La tercera columna es la suma de las dos primeras", lines: [
          { math: "\\begin{vmatrix} 4 & 3 & 7 \\\\ 3 & 1 & 4 \\\\ -2 & 7 & 5 \\end{vmatrix} = 0", note: "$C_3 = C_1 + C_2$" },
        ] },
        { kind: "text", text: "La propiedad 9 es la herramienta de trabajo: permite **hacer ceros** sin alterar el valor." },
      ],
    },
    {
      id: "check-proporcional",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "La tercera columna $(3, 6, 9)$ es $3$ veces la primera $(1, 2, 3)$." }],
      title: "Columnas proporcionales",
      question: "Calcula, sin desarrollar, $\\begin{vmatrix} 1 & 4 & 3 \\\\ 2 & 5 & 6 \\\\ 3 & 1 & 9 \\end{vmatrix}$. (solo el número)",
      correctAnswers: ["0"],
      explanation: "La tercera columna es $3\\cdot C_1$: columnas proporcionales, determinante $0$.",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Pista", message: "Busca líneas iguales, proporcionales o combinación de otras. Si no las hay, calcula el determinante." }],
      title: "¿Determinante nulo?",
      question: "Clasifica cada determinante sin desarrollarlo más de lo necesario.",
      groups: [
        { id: "cero", label: "Vale 0", tone: "rose" },
        { id: "no", label: "No vale 0", tone: "emerald" },
      ],
      items: [
        { id: "a", text: "$\\begin{vmatrix} 1 & 2 \\\\ 2 & 4 \\end{vmatrix}$", group: "cero" },
        { id: "b", text: "$\\begin{vmatrix} 1 & 1 & 3 \\\\ 4 & 4 & -1 \\\\ 3 & 3 & 5 \\end{vmatrix}$", group: "cero" },
        { id: "c", text: "$\\begin{vmatrix} 4 & 3 & 7 \\\\ 3 & 1 & 4 \\\\ -2 & 7 & 5 \\end{vmatrix}$", group: "cero" },
        { id: "d", text: "$\\begin{vmatrix} 1 & 2 \\\\ 3 & 4 \\end{vmatrix}$", group: "no" },
        { id: "e", text: "$\\begin{vmatrix} 1 & 0 & 0 \\\\ 0 & 2 & 0 \\\\ 0 & 0 & 3 \\end{vmatrix}$", group: "no" },
        { id: "f", text: "$\\begin{vmatrix} 2 & 0 & 1 \\\\ 1 & 1 & 0 \\\\ 0 & 1 & 3 \\end{vmatrix}$", group: "no" },
      ],
      hint: "En (b) las dos primeras columnas son iguales; en (c) la tercera columna es $C_1 + C_2$; en (a), la segunda fila es el doble de la primera.",
    },
    {
      id: "check-sumar",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "La tercera columna nueva es $C_3 + C_1 + 2C_2$: es la transformación de la propiedad 9, que no cambia el valor." }],
      title: "Una transformación que no cambia nada",
      question: "El determinante $\\begin{vmatrix} 6 & 1 & 5 \\\\ 7 & -2 & 1 \\\\ -4 & -3 & 0 \\end{vmatrix}$ vale $-131$. Si se cambia la tercera columna por $C_3 + C_1 + 2C_2$ y se obtiene $\\begin{vmatrix} 6 & 1 & 13 \\\\ 7 & -2 & 4 \\\\ -4 & -3 & -10 \\end{vmatrix}$, ¿cuánto vale este último? (solo el número)",
      correctAnswers: ["-131", "−131"],
      explanation: "Sumar a una columna una combinación lineal de las demás no cambia el determinante (propiedad 9): sigue valiendo $-131$.",
    },
  ],
};
