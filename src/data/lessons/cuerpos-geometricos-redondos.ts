import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_12_SUBTITLE } from "@/data/lessons/shared";

export const cuerposGeometricosRedondosLesson: InteractiveLesson = {
  slug: "cuerpos-geometricos-redondos",
  title: "4. Cuerpos redondos",
  subtitle: TEMA_1ESO_12_SUBTITLE,
  steps: [
    {
      id: "intro",
      type: "concept",
      title: "Cuerpos redondos",
      content: [
        "Los **cuerpos redondos** tienen superficies **curvas** (a diferencia de los poliedros).",
        "Estudiaremos el **cilindro**, el **cono** y la **esfera**.",
        "También son **cuerpos de revolución**: se obtienen girando una figura plana alrededor de un eje.",
      ],
    },
    {
      id: "cilindro-cono",
      type: "concept",
      title: "Cilindro y cono",
      content: [
        "**Cilindro**: $2$ bases circulares iguales y paralelas; superficie lateral curva. Se obtiene girando un **rectángulo** sobre un eje.",
        "**Cono**: $1$ base circular; superficie lateral curva que termina en un **vértice**. Se obtiene girando un **triángulo rectángulo** sobre un cateto.",
        "Ambos admiten **desarrollo**: dos círculos (cilindro) o un círculo y un sector circular (cono).",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Elementos",
          items: [
            { title: "Cilindro", caption: "Bases, eje, superficie lateral.", tone: "cobalt" },
            { title: "Cono", caption: "Base, vértice, generatrices.", tone: "emerald" },
          ],
        },
      ],
    },
    {
      id: "esfera",
      type: "concept",
      title: "Esfera",
      content: [
        "La **esfera** es un cuerpo redondo con una única **superficie curva**; no tiene caras planas ni aristas.",
        "Se obtiene girando un **semicírculo** alrededor de su **diámetro**.",
        "Elementos: **centro**, **radio**, **diámetro** y **circunferencia máxima** (corte por un plano que pasa por el centro).",
        "A diferencia del cilindro y el cono, **no tiene desarrollo plano** que permita reconstruirla sin deformar.",
      ],
    },
    {
      id: "check-cilindro",
      type: "multiple_choice",
      title: "El cilindro",
      question: "¿Cuántas bases tiene un cilindro?",
      options: [
        { id: "a", text: "Ninguna" },
        { id: "b", text: "Una" },
        { id: "c", text: "Dos" },
      ],
      correctOptionId: "c",
      explanation: "El cilindro tiene dos bases circulares iguales y paralelas.",
    },
    {
      id: "check-revolucion",
      type: "multiple_choice",
      title: "Cuerpos de revolución (act. 4)",
      question: "Al girar un semicírculo sobre su diámetro se obtiene…",
      options: [
        { id: "a", text: "Un cilindro" },
        { id: "b", text: "Un cono" },
        { id: "c", text: "Una esfera" },
      ],
      correctOptionId: "c",
      explanation: "La esfera es el cuerpo de revolución del semicírculo.",
    },
    {
      id: "check-cono-figura",
      type: "multiple_choice",
      title: "Origen del cono",
      question: "¿Qué figura plana se hace girar para obtener un cono (eje en un cateto)?",
      options: [
        { id: "a", text: "Rectángulo" },
        { id: "b", text: "Triángulo rectángulo" },
        { id: "c", text: "Semicírculo" },
      ],
      correctOptionId: "b",
      explanation: "Girando un triángulo rectángulo alrededor de un cateto se genera un cono.",
    },
    {
      id: "check-esfera-desarrollo",
      type: "multiple_choice",
      title: "Desarrollo de la esfera",
      question: "¿Cuál de estas afirmaciones es correcta?",
      options: [
        { id: "a", text: "La esfera tiene un desarrollo plano como el cilindro." },
        { id: "b", text: "La esfera no tiene desarrollo plano sin deformar la superficie." },
        { id: "c", text: "La esfera tiene dos bases circulares." },
      ],
      correctOptionId: "b",
      explanation: "Solo cilindro y cono se despliegan en el plano de forma habitual en el temario.",
    },
  ],
};
