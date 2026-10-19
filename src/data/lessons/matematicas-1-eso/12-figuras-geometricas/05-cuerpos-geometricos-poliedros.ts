import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_12_SUBTITLE } from "@/data/lessons/shared";

export const cuerposGeometricosPoliedrosLesson: InteractiveLesson = {
  slug: "cuerpos-geometricos-poliedros",
  title: "5. Poliedros y poliedros regulares",
  subtitle: TEMA_1ESO_12_SUBTITLE,
  steps: [
    {
      id: "intro",
      type: "concept",
      help: [
        {
          label: "Poliedro frente a cuerpo redondo",
          message: "Si todas sus superficies son planas y poligonales, es un poliedro. Si alguna es curva, no.",
        },
        {
          label: "Cara, arista y vértice",
          message: "Cara: una superficie plana. Arista: donde se juntan dos caras. Vértice: una esquina.",
        },
        {
          label: "¿Para qué el desarrollo?",
          message: "Es el dibujo plano que, recortado y plegado, forma el cuerpo.",
        },
      ],
      title: "Qué es un poliedro",
      content: [
        "Un **poliedro** es un cuerpo geométrico limitado por **caras** en forma de polígonos.",
        "Sus **elementos** son: **caras** (polígonos que lo limitan), **aristas** (lados comunes a dos caras) y **vértices** (puntos donde se unen tres o más caras).",
        "Si **desplegamos** la superficie sobre un plano obtenemos el **desarrollo** del poliedro, útil para construirlo con cartón.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Ejemplo: cubo",
          items: [
            { title: "Caras", math: "6", caption: "Cuadrados.", tone: "cobalt" },
            { title: "Aristas", math: "12", caption: "Segmentos entre vértices.", tone: "emerald" },
            { title: "Vértices", math: "8", caption: "Esquinas del cubo.", tone: "violet" },
          ],
        },
      ],
    },
    {
      id: "regulares",
      type: "concept",
      help: [
        {
          label: "¿Qué es «regular»?",
          message: "Todas las caras son polígonos regulares iguales y en cada vértice se juntan el mismo número de caras.",
        },
        {
          label: "¿Por qué solo cinco?",
          message: "Con polígonos regulares iguales solo hay cinco formas de cerrar el espacio sin huecos ni solapes.",
        },
        {
          label: "Un ejemplo cotidiano",
          message: "Un dado normal es el hexaedro regular: seis caras cuadradas iguales.",
        },
      ],
      title: "Poliedros regulares",
      content: [
        "Un **poliedro regular** tiene caras que son **polígonos regulares iguales** y el mismo número de aristas en cada vértice.",
        "Solo existen **cinco** poliedros regulares (los sólidos platónicos).",
        "Un **dado de parchís** es un hexaedro regular (cubo): seis caras cuadradas iguales.",
      ],
      visuals: [
        {
          kind: "cards",
          title: "Los cinco poliedros regulares",
          items: [
            { title: "Tetraedro", math: "4", caption: "Triángulos equiláteros.", tone: "cobalt" },
            { title: "Hexaedro (cubo)", math: "6", caption: "Cuadrados.", tone: "emerald" },
            { title: "Octaedro", math: "8", caption: "Triángulos equiláteros.", tone: "violet" },
            { title: "Dodecaedro", math: "12", caption: "Pentágonos regulares.", tone: "amber" },
            { title: "Icosaedro", math: "20", caption: "Triángulos equiláteros.", tone: "rose" },
          ],
        },
      ],
    },
    {
      id: "euler",
      type: "concept",
      help: [
        {
          label: "¿Qué dice?",
          message: "Si cuentas caras más vértices, siempre sale $2$ más que las aristas.",
        },
        {
          label: "Compruébalo con el tetraedro",
          message: "Tiene $4$ caras, $4$ vértices y $6$ aristas: $4 + 4 = 6 + 2$.",
        },
        {
          label: "¿Para qué sirve?",
          message: "Para comprobar un conteo, o para hallar un dato que falta, por ejemplo las aristas si conoces caras y vértices.",
        },
        {
          label: "¿Cuándo no vale?",
          message: "En poliedros con agujero, como un donut, la fórmula cambia.",
        },
      ],
      title: "Fórmula de Euler",
      content: [
        "En la mayoría de los poliedros (sin agujeros) se cumple la **fórmula de Euler**:",
        "Si $C$ es el número de caras, $V$ el de vértices y $A$ el de aristas, entonces $C + V = A + 2$.",
        "Por ejemplo, en el cubo: $6 + 8 = 12 + 2 = 14$.",
      ],
      math: ["C + V = A + 2"],
    },
    {
      id: "check-cubo",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué es una arista?",
          message: "El segmento donde se juntan dos caras. No la confundas con el vértice (un punto) ni con la cara (una superficie).",
        },
        {
          label: "Otra forma de contarlas",
          message: "Cada cara es un cuadrado con $4$ aristas, pero cada arista pertenece a dos caras, así que al contar por caras la has contado dos veces.",
        },
      ],
      title: "Elementos del cubo",
      question: "¿Cuántas aristas tiene un cubo? (solo el número)",
      correctAnswers: ["12"],
      hint: "Cuenta las $4$ aristas de la cara de arriba, las $4$ de la de abajo y las que las unen.",
      explanation: "El hexaedro regular (cubo) tiene $4 + 4 + 4 = 12$ aristas.",
    },
    {
      id: "check-tetraedro",
      type: "classify",
      help: [
        {
          label: "¿Cómo los clasifico?",
          message: "Fíjate en el polígono que forma las caras: triángulos, cuadrados o pentágonos. Los nombres ayudan: tetra, hexa, octa, dodeca, icosa indican $4, 6, 8, 12, 20$ caras.",
        },
        {
          label: "Tres comparten forma",
          message: "Hay tres con caras triangulares: se distinguen por el número de caras ($4$, $8$ y $20$).",
        },
      ],
      title: "Poliedros regulares",
      question: "Clasifica cada poliedro regular según la forma de sus caras.",
      groups: [
        { id: "tri", label: "Triángulos equiláteros", tone: "cobalt" },
        { id: "cuad", label: "Cuadrados", tone: "emerald" },
        { id: "pent", label: "Pentágonos regulares", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Tetraedro ($4$ caras)", group: "tri" },
        { id: "b", text: "Hexaedro ($6$ caras)", group: "cuad" },
        { id: "c", text: "Octaedro ($8$ caras)", group: "tri" },
        { id: "d", text: "Dodecaedro ($12$ caras)", group: "pent" },
        { id: "e", text: "Icosaedro ($20$ caras)", group: "tri" },
      ],
      hint: "Solo uno tiene caras cuadradas (el dado) y solo uno pentagonales.",
      explanation:
        "Tetraedro, octaedro e icosaedro tienen caras triangulares; el cubo, cuadradas; el dodecaedro, pentagonales. El tetraedro es el que tiene exactamente $4$ caras triangulares.",
    },
    {
      id: "check-vf",
      type: "classify",
      help: [
        {
          label: "¿Cómo pruebo algo para «cualquier» poliedro?",
          message: "Basta un solo poliedro en el que falle para descartarlo: un contraejemplo.",
          branches: [
            {
              label: "¿Qué poliedro uso?",
              message: "Un prisma triangular: dos triángulos y tres rectángulos. Sus caras no son todas iguales.",
            },
          ],
        },
        {
          label: "¿Qué distingue a los regulares?",
          message: "Todas sus caras son polígonos regulares iguales y en cada vértice se juntan las mismas. Eso no se cumple en cualquier poliedro.",
        },
      ],
      title: "¿En cualquier poliedro? (act. 10)",
      question: "¿Se cumple en **cualquier** poliedro o solo en algunos?",
      groups: [
        { id: "siempre", label: "En cualquier poliedro", tone: "emerald" },
        { id: "algunos", label: "Solo en algunos", tone: "violet" },
      ],
      items: [
        { id: "a", text: "Sus caras son polígonos", group: "siempre" },
        { id: "b", text: "Cada arista es el lado común de dos caras", group: "siempre" },
        { id: "c", text: "Tiene al menos $4$ caras", group: "siempre" },
        { id: "d", text: "Todas sus caras son iguales", group: "algunos" },
        { id: "e", text: "Sus caras son polígonos regulares", group: "algunos" },
        { id: "f", text: "En cada vértice concurren las mismas aristas", group: "algunos" },
      ],
      hint: "Piensa en un prisma triangular: ¿son iguales sus triángulos y sus rectángulos?",
      explanation:
        "Todo poliedro está limitado por polígonos que comparten aristas, y el más sencillo (tetraedro) ya tiene $4$ caras. Que las caras sean iguales y regulares, con las mismas aristas en cada vértice, solo pasa en los poliedros **regulares**; un prisma triangular no tiene todas las caras iguales.",
    },
    {
      id: "euler-fill",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Para qué sirve esa fórmula?",
          message: "Euler dice que en todo poliedro convexo el número de caras más el de vértices es el de aristas más dos.",
          math: ["C + V = A + 2"],
        },
        {
          label: "Compruébalo con otro poliedro",
          message: "Cubo: $C = 6$, $V = 8$, $A = 12$. Se cumple $6 + 8 = 12 + 2$. ¿Pasa lo mismo con el octaedro?",
        },
      ],
      title: "Fórmula de Euler en el octaedro",
      question:
        "Un octaedro tiene $8$ caras, $6$ vértices y $12$ aristas. ¿Cuánto es $C + V$? (solo el número)",
      correctAnswers: ["14"],
      explanation: "$8 + 6 = 14$, y también $12 + 2 = 14$ (Euler).",
    },
    {
      id: "caras-icosaedro",
      type: "fill_in_blank",
      help: [
        {
          label: "Truco con el nombre",
          message: "El prefijo griego indica las caras: tetra, hexa, octa, dodeca… Busca el que empieza por «icosa».",
          math: ["\\text{tetra}=4,\\ \\text{hexa}=6,\\ \\text{octa}=8,\\ \\text{dodeca}=12"],
        },
        {
          label: "¿Es mucho o poco?",
          message: "Es el poliedro regular con más caras de los cinco: los demás llegan, como mucho, a $12$.",
        },
      ],
      title: "Identificar el poliedro (act. 7)",
      question: "¿Cuántas caras tiene el icosaedro regular? (solo el número)",
      correctAnswers: ["20"],
      explanation: "El icosaedro tiene $20$ caras triangulares equiláteras.",
    },
  ],
};
