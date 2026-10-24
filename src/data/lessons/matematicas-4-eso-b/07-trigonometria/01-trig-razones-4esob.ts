import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_4ESOB_7_SUBTITLE } from "@/data/lessons/shared";

export const trigRazones4esobLesson: InteractiveLesson = {
  slug: "trig-razones-4esob",
  title: "1. Razones trigonométricas de un ángulo agudo",
  subtitle: TEMA_4ESOB_7_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "lados",
      type: "slide",
      help: [
        { label: "Depende del ángulo", message: "«Opuesto» y «contiguo» se definen **respecto del ángulo $\\alpha$** que has elegido. Si eliges el otro ángulo agudo, los dos catetos intercambian su papel." },
        { label: "Hipotenusa", message: "La hipotenusa no cambia de papel: siempre es el lado enfrente del ángulo recto." },
      ],
      title: "Los lados de un triángulo rectángulo",
      blocks: [
        { kind: "facts", items: [{ tex: "\\text{Hipotenusa}", label: "opuesta al ángulo recto; el lado más largo" }, { tex: "\\text{Cateto opuesto a } \\alpha", label: "el que está enfrente de $\\alpha$" }, { tex: "\\text{Cateto contiguo a } \\alpha", label: "el que forma $\\alpha$ con la hipotenusa" }] },
        { kind: "warning", text: "Opuesto y contiguo **dependen del ángulo** que tomes como referencia. Para el otro ángulo agudo se intercambian." },
      ],
      visual: { kind: "anim", scene: "trig-triangulo-razones", params: { a: 35 } },
    },
    {
      id: "check-lados",
      type: "predict",
      mode: "choice",
      help: [{ label: "Frente a frente", message: "El opuesto no toca el vértice de $\\alpha$. El contiguo sí." }],
      title: "¿Cuál es cuál?",
      question: "En un triángulo rectángulo con catetos de $3$ y $4$ cm e hipotenusa de $5$ cm, $\\alpha$ es el ángulo agudo que está **entre** el cateto de $4$ cm y la hipotenusa. ¿Cuál es el cateto opuesto a $\\alpha$?",
      choices: [
        { id: "a", label: "El de $3$ cm" },
        { id: "b", label: "El de $4$ cm", incorrectFeedback: "El de $4$ cm forma el ángulo $\\alpha$ con la hipotenusa: es el contiguo." },
        { id: "c", label: "La hipotenusa de $5$ cm", incorrectFeedback: "La hipotenusa nunca es cateto: es el lado enfrente del ángulo recto." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "El cateto de $4$ cm toca a $\\alpha$ (contiguo); el de $3$ cm queda enfrente (opuesto).",
    },
    {
      id: "razones",
      type: "slide",
      help: [
        { label: "Siempre menor que 1", message: "Seno y coseno de un ángulo agudo son menores que $1$ porque el cateto es más corto que la hipotenusa. La tangente puede ser mayor que $1$." },
        { label: "Regla de memoria", message: "SOH CAH TOA: Seno = Opuesto/Hipotenusa, Coseno = Adyacente (contiguo)/Hipotenusa, Tangente = Opuesto/Adyacente." },
      ],
      title: "Seno, coseno y tangente",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "\\operatorname{sen}\\alpha = \\dfrac{\\text{opuesto}}{\\text{hipotenusa}}" },
            { tex: "\\cos\\alpha = \\dfrac{\\text{contiguo}}{\\text{hipotenusa}}" },
            { tex: "\\operatorname{tg}\\alpha = \\dfrac{\\text{opuesto}}{\\text{contiguo}}" },
          ],
        },
        { kind: "text", text: "Son **razones**: cocientes entre dos lados. Se llaman razones trigonométricas de $\\alpha$." },
      ],
      visual: { kind: "tool", tool: "trig-explorador", params: { a: 35, b: 6 }, hint: "Mueve el ángulo y mira cómo cambian las tres razones." },
    },
    {
      id: "check-tg",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Opuesto entre contiguo", message: "Si $\\alpha$ es el ángulo opuesto al cateto de $3$, el contiguo es el de $4$." }],
      title: "Una tangente",
      question: "Un triángulo rectángulo tiene catetos $3$ y $4$ e hipotenusa $5$. Si $\\alpha$ es el ángulo opuesto al cateto de $3$, ¿cuánto vale $\\operatorname{tg}\\alpha$? (decimal con coma)",
      correctAnswers: ["0,75", "0.75", "3/4"],
      explanation: "$\\operatorname{tg}\\alpha = \\dfrac{\\text{opuesto}}{\\text{contiguo}} = \\dfrac{3}{4} = 0{,}75$.",
    },
    {
      id: "check-seno",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Hipotenusa", message: "El triángulo tiene hipotenusa $25$ y catetos $7$ y $24$. El seno usa el cateto opuesto." }],
      title: "Un seno",
      question: "En un triángulo rectángulo de hipotenusa $25$ y catetos $7$ y $24$, $\\alpha$ es el ángulo opuesto al cateto de $7$. ¿Cuánto vale $\\operatorname{sen}\\alpha$? (decimal con coma)",
      correctAnswers: ["0,28", "0.28", "7/25"],
      explanation: "$\\operatorname{sen}\\alpha = \\dfrac{7}{25} = 0{,}28$.",
    },
    {
      id: "check-clasifica",
      type: "classify",
      help: [{ label: "Numerador y denominador", message: "Mira qué lados aparecen: opuesto/hipotenusa es el seno; contiguo/hipotenusa, el coseno; opuesto/contiguo, la tangente." }],
      title: "Cada cociente, su razón",
      question: "Relaciona cada cociente con su razón trigonométrica.",
      groups: [
        { id: "sen", label: "Seno", tone: "cobalt" },
        { id: "cos", label: "Coseno", tone: "emerald" },
        { id: "tg", label: "Tangente", tone: "amber" },
      ],
      items: [
        { id: "a", text: "cateto opuesto / hipotenusa", group: "sen" },
        { id: "b", text: "cateto contiguo / hipotenusa", group: "cos" },
        { id: "c", text: "cateto opuesto / cateto contiguo", group: "tg" },
        { id: "d", text: "cateto enfrente de $\\alpha$ entre la hipotenusa", group: "sen" },
        { id: "e", text: "cateto que toca a $\\alpha$ entre la hipotenusa", group: "cos" },
        { id: "f", text: "cuánto «sube» por cada unidad que «avanza»", group: "tg" },
      ],
      hint: "La tangente es la única que no lleva la hipotenusa.",
    },
  ],
};
