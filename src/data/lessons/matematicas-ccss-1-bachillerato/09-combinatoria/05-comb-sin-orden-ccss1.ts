import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS1_9_SUBTITLE } from "@/data/lessons/shared";

export const combSinOrdenCcss1Lesson: InteractiveLesson = {
  slug: "comb-sin-orden-ccss1",
  title: "5. Cuando no influye el orden",
  subtitle: TEMA_CCSS1_9_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "estrategia",
      type: "slide",
      help: [
        { label: "Estrategia", message: "Cuenta como si el orden **sí** importara y después divide entre el número de veces que se ha contado cada caso." },
        { label: "Cuántas veces", message: "Cada grupo de $n$ elementos se puede ordenar de $n!$ formas: por eso se divide entre $n!$." },
      ],
      title: "Contar de más y corregir",
      blocks: [
        { kind: "rule", title: "Estrategia", text: "Cuenta **como si importara el orden** y **divide** entre el número de veces que se repite cada caso." },
        { kind: "example", title: "Cuatro amigos juegan todos contra todos", lines: [{ math: "4 \\cdot 3 = 12\\ \\text{parejas ordenadas (AB y BA distintas)}" }, { math: "12 : 2 = 6\\ \\text{partidos}", note: "cada partido estaba contado dos veces" }] },
      ],
      visual: { kind: "anim", scene: "combinaciones-dividir" },
    },
    {
      id: "check-apretones",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Saludo mutuo", message: "Si importara el orden habría $10\\cdot9 = 90$ saludos, pero «A saluda a B» y «B saluda a A» son el mismo apretón." }],
      title: "Apretones de manos",
      question: "Diez amigos se encuentran y todos se dan la mano con todos. ¿Cuántos apretones de manos hay? (solo el número)",
      correctAnswers: ["45"],
      explanation: "$\\dfrac{10 \\cdot 9}{2} = 45$.",
    },
    {
      id: "tres-en-una-carrera",
      type: "slide",
      help: [{ label: "Veces repetido", message: "Si se eligen $3$ personas, cada grupo de $3$ aparece tantas veces como formas hay de ordenarlas: $3! = 6$." }],
      title: "Elegir un grupo",
      blocks: [
        { kind: "text", text: "En una carrera de $8$ corredores se **clasifican para la final los tres primeros**: no importa en qué orden lleguen, solo quiénes son." },
        { kind: "example", lines: [{ math: "8 \\cdot 7 \\cdot 6 = 336\\ \\text{(si importara el orden)}" }, { math: "ABC, ACB, BAC, BCA, CAB, CBA\\ \\to\\ 6\\ \\text{veces cada grupo}" }, { math: "336 : 6 = 56\\ \\text{clasificaciones posibles}" }] },
      ],
    },
    {
      id: "check-caminos",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pares de puestos", message: "Un camino une dos puestos y es el mismo en un sentido que en otro: $\\dfrac{7\\cdot6}{2}$." }],
      title: "Caminos entre puestos",
      question: "En un monte hay $7$ puestos de vigilancia y cada uno está unido a todos los demás por un camino. ¿Cuántos caminos hay en total? (solo el número)",
      correctAnswers: ["21"],
      explanation: "$\\dfrac{7 \\cdot 6}{2} = 21$.",
    },
    {
      id: "check-discos",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Elegir 3 de 10", message: "$10\\cdot9\\cdot8 = 720$ si importara el orden; cada grupo de $3$ se repite $3! = 6$ veces." }],
      title: "Tres discos de diez",
      question: "Vicente quiere regalar $3$ discos a Carlos, eligiéndolos entre los $10$ que más le gustan. ¿De cuántas formas puede hacerlo? (solo el número)",
      correctAnswers: ["120"],
      explanation: "$\\dfrac{10 \\cdot 9 \\cdot 8}{3 \\cdot 2 \\cdot 1} = \\dfrac{720}{6} = 120$.",
    },
    {
      id: "check-importa",
      type: "classify",
      help: [{ label: "¿Cambia algo si cambia el orden?", message: "Si intercambiar dos elementos da un resultado distinto, importa el orden." }],
      title: "¿Importa el orden?",
      question: "Clasifica cada situación.",
      groups: [
        { id: "si", label: "Importa el orden", tone: "cobalt" },
        { id: "no", label: "No importa el orden", tone: "emerald" },
      ],
      items: [
        { id: "a", text: "Repartir oro, plata y bronce entre tres atletas", group: "si" },
        { id: "b", text: "Elegir 3 representantes de clase entre 10", group: "no" },
        { id: "c", text: "Formar un número de 3 cifras", group: "si" },
        { id: "d", text: "Elegir 4 camisetas para la maleta entre 8", group: "no" },
        { id: "e", text: "Elegir presidente y secretario", group: "si" },
        { id: "f", text: "Formar parejas para un torneo de ajedrez", group: "no" },
      ],
      hint: "¿Se distingue «A con B» de «B con A»?",
    },
  ],
};
