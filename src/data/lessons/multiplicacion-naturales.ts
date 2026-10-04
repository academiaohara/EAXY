import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1_SUBTITLE } from "@/data/lessons/shared";

export const multiplicacionNaturalesLesson: InteractiveLesson = {
  slug: "multiplicacion-naturales",
  title: "4. Multiplicación",
  subtitle: TEMA_1_SUBTITLE,
  stage: { theme: "paper" },
  steps: [
    {
      id: "multiplicar-narrate",
      type: "narrate",
      title: "Multiplicar",
      definitionBox:
        "**Multiplicar** es una forma abreviada de realizar una **suma repetida** de sumandos iguales.",
      module: "mul-div-naturales",
      scene: "multiplicar-repetido",
      mulDiv: { scene: "multiplicar-repetido", a: 8, b: 5 },
    },
    {
      id: "multiplicar-predict",
      type: "predict",
      title: "Cinco entradas",
      question: "Una entrada cuesta $8$ €. ¿Cuánto valen $5$ entradas?",
      mode: "choice",
      choices: [
        { id: "32", label: "$32$ €" },
        { id: "40", label: "$40$ €" },
        { id: "56", label: "$56$ €" },
      ],
      correctChoiceId: "40",
      module: "mul-div-naturales",
      scene: "multiplicar-conteo",
      mulDiv: { scene: "multiplicar-conteo", a: 8, b: 5 },
      explanation: "$8 \\cdot 5 = 40$ €: cinco filas de ocho.",
    },
    {
      id: "conmutativa-reveal",
      type: "reveal",
      title: "Conmutativa",
      definitionBox:
        "El **producto no varía** al cambiar el orden de los factores: $a \\cdot b = b \\cdot a$.",
      module: "mul-div-naturales",
      scene: "conmutativa-producto",
      mulDiv: { scene: "conmutativa-producto", a: 8, b: 5 },
    },
    {
      id: "asociativa-reveal",
      type: "reveal",
      title: "Asociativa",
      definitionBox:
        "El resultado es **independiente** de cómo se agrupen los factores: $(a \\cdot b) \\cdot c = a \\cdot (b \\cdot c)$.",
      module: "mul-div-naturales",
      scene: "asociativa-producto",
      mulDiv: { scene: "asociativa-producto", a: 8, b: 5, c: 2 },
    },
    {
      id: "distributiva-narrate",
      type: "narrate",
      title: "Distributiva",
      definitionBox:
        "El producto de un número por una **suma** es la **suma** de los productos: $a(b + c) = ab + ac$.",
      module: "mul-div-naturales",
      scene: "distributiva-bloques",
      mulDiv: { scene: "distributiva-bloques", a: 8, b: 5, c: 2 },
    },
    {
      id: "distributiva-predict",
      type: "predict",
      title: "Mismo resultado",
      question: "¿Qué expresión tiene el mismo valor que $8 \\cdot (5 + 2)$?",
      mode: "choice",
      choices: [
        { id: "a", label: "$8 \\cdot 5 + 8 \\cdot 2$" },
        { id: "b", label: "$8 \\cdot 5 + 2$" },
        { id: "c", label: "$8 + 5 \\cdot 2$" },
      ],
      correctChoiceId: "a",
      explanation: "$8 \\cdot 7 = 56$ y $40 + 16 = 56$.",
    },
  ],
};
