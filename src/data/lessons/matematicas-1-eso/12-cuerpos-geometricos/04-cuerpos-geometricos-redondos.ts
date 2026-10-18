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
      help: [
        {
          label: "Curvo frente a plano",
          message: "Un cuerpo redondo tiene al menos una superficie curva: una lata, un cucurucho, una pelota.",
        },
        {
          label: "Cuerpo de revolución",
          message: "Se genera girando una figura plana alrededor de una recta, el eje.",
        },
      ],
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
      help: [
        {
          label: "Dos objetos de referencia",
          message: "Cilindro: una lata. Cono: un cucurucho de helado.",
        },
        {
          label: "¿Cómo se generan?",
          message: "Un rectángulo girando sobre un lado forma un cilindro. Un triángulo rectángulo girando sobre un cateto forma un cono.",
        },
        {
          label: "Los desarrollos",
          message: "Cilindro: dos círculos y un rectángulo. Cono: un círculo y un sector circular.",
        },
      ],
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
      help: [
        {
          label: "Una sola superficie",
          message: "Piensa en una pelota: no tiene caras planas ni aristas.",
        },
        {
          label: "¿Por qué no tiene desarrollo?",
          message: "Una superficie esférica no se puede aplanar sin estirarla. Por eso los mapas del mundo deforman.",
        },
        {
          label: "La circunferencia máxima",
          message: "Es el corte por el centro, como partir una naranja por la mitad: la mayor circunferencia que cabe en la esfera.",
        },
      ],
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
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué es una base?",
          message: "Una cara plana sobre la que el cuerpo puede apoyarse, igual y paralela a otra. Fíjate en cuántas hay.",
        },
        {
          label: "Piénsalo como un cuerpo de revolución",
          message: "Un cilindro sale de girar un rectángulo sobre uno de sus lados. Los lados perpendiculares al eje dibujan círculos: ¿cuántos hay?",
        },
      ],
      title: "El cilindro",
      question: "¿Cuántas bases tiene un cilindro? (solo el número)",
      correctAnswers: ["2", "dos"],
      hint: "Piensa en una lata de conservas: ¿cuántas tapas circulares tiene?",
      explanation: "El cilindro tiene dos bases circulares iguales y paralelas.",
    },
    {
      id: "check-revolucion",
      type: "classify",
      help: [
        {
          label: "¿Qué silueta dibuja?",
          message: "Cada punto de la figura que está lejos del eje dibuja un círculo al girar. La figura entera genera una superficie.",
        },
        {
          label: "Mira figura y eje a la vez",
          message: "Los lados paralelos al eje forman las paredes; los perpendiculares forman bases circulares. Cuenta cuántos hay de cada tipo.",
        },
      ],
      title: "Cuerpos de revolución (act. 4)",
      question: "¿Qué cuerpo se obtiene al hacer girar cada figura plana alrededor del eje indicado?",
      groups: [
        { id: "cilindro", label: "Cilindro", tone: "cobalt" },
        { id: "cono", label: "Cono", tone: "emerald" },
        { id: "esfera", label: "Esfera", tone: "violet" },
      ],
      items: [
        { id: "a", text: "Rectángulo alrededor de uno de sus lados", group: "cilindro" },
        { id: "b", text: "Cuadrado alrededor de uno de sus lados", group: "cilindro" },
        { id: "c", text: "Triángulo rectángulo alrededor de un cateto", group: "cono" },
        { id: "d", text: "Semicírculo alrededor de su diámetro", group: "esfera" },
        { id: "e", text: "Círculo alrededor de un diámetro", group: "esfera" },
      ],
      hint: "Imagina la figura girando muy deprisa: ¿qué silueta dibuja en el aire?",
      explanation:
        "Un rectángulo (o un cuadrado, que es un rectángulo) que gira sobre un lado genera un cilindro; un triángulo rectángulo sobre un cateto, un cono; un semicírculo (o un círculo) sobre su diámetro, una esfera.",
    },
    {
      id: "check-esfera-desarrollo",
      type: "classify",
      help: [
        {
          label: "¿Qué es un desarrollo?",
          message: "Lo que sale al cortar el cuerpo y aplastarlo sobre una mesa sin estirar ni romper. Piensa en las piezas planas que lo forman.",
        },
        {
          label: "Hazte dos preguntas",
          message: "Para cada cuerpo: ¿tiene caras planas? ¿Tiene una punta? Las respuestas separan al cilindro, al cono y a la esfera.",
        },
      ],
      title: "Bases y desarrollo",
      question: "¿A qué cuerpo redondo corresponde cada característica?",
      groups: [
        { id: "cilindro", label: "Cilindro", tone: "cobalt" },
        { id: "cono", label: "Cono", tone: "emerald" },
        { id: "esfera", label: "Esfera", tone: "violet" },
      ],
      items: [
        { id: "a", text: "Dos bases circulares iguales y paralelas", group: "cilindro" },
        { id: "b", text: "Desarrollo: dos círculos y un rectángulo", group: "cilindro" },
        { id: "c", text: "Una base circular y un vértice", group: "cono" },
        { id: "d", text: "Desarrollo: un círculo y un sector circular", group: "cono" },
        { id: "e", text: "No tiene desarrollo plano sin deformar la superficie", group: "esfera" },
        { id: "f", text: "Una sola superficie curva, sin bases", group: "esfera" },
      ],
      hint: "Solo uno de los tres no se puede desplegar sobre un plano: piensa en pelar una naranja.",
      explanation:
        "El cilindro tiene dos bases y se despliega en dos círculos y un rectángulo; el cono, una base y un vértice, y se despliega en un círculo y un sector circular. La esfera no tiene bases ni desarrollo plano sin deformarla.",
    },
  ],
};
