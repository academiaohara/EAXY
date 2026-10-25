import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_CCSS2_1_SUBTITLE } from "@/data/lessons/shared";

export const grafosMatricesCcss2Lesson: InteractiveLesson = {
  slug: "grafos-matrices-ccss2",
  title: "12. Grafos y matrices",
  subtitle: TEMA_CCSS2_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "grafo",
      type: "slide",
      help: [{ label: "Idea", message: "Un grafo representa relaciones (carreteras, vuelos, amistades). La matriz de adyacencia guarda esa información en una tabla." }],
      title: "De un grafo a una matriz",
      blocks: [
        { kind: "definition", text: "Un **grafo** está formado por **nodos** (vértices) unidos por **aristas**. Es **dirigido** si las aristas tienen sentido." },
        { kind: "rule", title: "Matriz de adyacencia", text: "Es la matriz cuadrada con un $1$ en la fila $i$, columna $j$ si hay arista de $i$ a $j$ (y $0$ si no):", formula: "a_{ij} = \\begin{cases} 1 & \\text{hay arista } i \\to j \\\\ 0 & \\text{no hay} \\end{cases}" },
        { kind: "text", text: "En un grafo **no dirigido** la matriz es **simétrica**. Un $1$ en la diagonal es un **bucle**." },
      ],
      visual: { kind: "anim", scene: "grafo-adyacencia" },
    },
    {
      id: "check-simetrica",
      type: "predict",
      mode: "choice",
      help: [{ label: "Pista", message: "Si hay arista de $i$ a $j$ y también de $j$ a $i$, entonces $a_{ij} = a_{ji}$." }],
      title: "Grafos no dirigidos",
      question: "La matriz de adyacencia de un grafo **no dirigido** es siempre…",
      choices: [
        { id: "a", label: "simétrica" },
        { id: "b", label: "antisimétrica", incorrectFeedback: "Una antisimétrica tendría elementos opuestos ($-1$), que no tienen sentido aquí." },
        { id: "c", label: "triangular superior", incorrectFeedback: "Una arista $i - j$ pone un $1$ por encima y otro por debajo de la diagonal." },
        { id: "d", label: "la matriz identidad", incorrectFeedback: "La identidad tiene solo bucles, un caso muy particular." },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "En un grafo no dirigido la arista $i - j$ se recorre en ambos sentidos, luego $a_{ij} = a_{ji}$.",
    },
    {
      id: "caminos",
      type: "slide",
      help: [{ label: "Por qué", message: "$(A^2)_{ij} = \\sum_k a_{ik}a_{kj}$ cuenta los nodos intermedios $k$ con arista $i\\to k$ y $k\\to j$." }],
      title: "Las potencias cuentan caminos",
      blocks: [
        { kind: "rule", title: "Caminos de longitud $n$", text: "El elemento $(i, j)$ de $A^n$ es el **número de caminos de longitud $n$** que van del nodo $i$ al nodo $j$." },
        { kind: "text", text: "Un camino de longitud $2$ recorre dos aristas. El producto fila por columna suma, para cada nodo intermedio $k$, el producto $a_{ik}\\cdot a_{kj}$, que vale $1$ solo si existen las dos aristas." },
      ],
      visual: { kind: "tool", tool: "grafo-caminos-explorador", hint: "Añade o quita aristas pulsando la matriz y cambia k: el elemento resaltado cuenta los caminos de esa longitud." },
    },
    {
      id: "check-triangulo",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Los caminos de longitud 2 de A a A pasan por un vecino de A y vuelven: A–B–A y A–C–A." }],
      title: "Caminos en un triángulo",
      question: "En el grafo **no dirigido** con aristas A–B, A–C y B–C, ¿cuántos caminos de longitud $2$ hay de A a A? (solo el número)",
      correctAnswers: ["2"],
      explanation: "$A$ tiene dos vecinos ($B$ y $C$): A–B–A y A–C–A. En la matriz, el elemento $(A, A)$ de $A^2$ es el **grado** del nodo: $2$.",
    },
    {
      id: "vuelos",
      type: "slide",
      help: [{ label: "Aplicación", message: "Con matrices se combinan tablas: vuelos A→B, vuelos B→C, y el producto da los de A→C con escala." }],
      title: "Vuelos con trasbordo",
      blocks: [
        { kind: "text", text: "Hay tres aeropuertos en el país A, cuatro en el B y dos en el C. Los vuelos de A a B forman $X_1$ ($3\\times 4$); de B a C, $X_2$ ($4\\times 2$, dos vuelos de cada uno a cada destino); y de A a C hay un vuelo directo A$_1$→C$_1$ ($X_3$)." },
        { kind: "example", title: "Vuelos de A a C con o sin trasbordo", lines: [
          { math: "X_1 = \\begin{pmatrix} 1 & 1 & 0 & 2 \\\\ 0 & 1 & 1 & 2 \\\\ 0 & 0 & 1 & 0 \\end{pmatrix},\\quad X_2 = \\begin{pmatrix} 2 & 2 \\\\ 2 & 2 \\\\ 2 & 2 \\\\ 2 & 2 \\end{pmatrix},\\quad X_3 = \\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\end{pmatrix}" },
          { math: "X_1X_2 + X_3 = \\begin{pmatrix} 8 & 8 \\\\ 8 & 8 \\\\ 2 & 2 \\end{pmatrix} + \\begin{pmatrix} 1 & 0 \\\\ 0 & 0 \\\\ 0 & 0 \\end{pmatrix} = \\begin{pmatrix} 9 & 8 \\\\ 8 & 8 \\\\ 2 & 2 \\end{pmatrix}" },
        ] },
      ],
    },
    {
      id: "check-vuelos",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Pista", message: "Fila $1$ de $X_1$ por columna $1$ de $X_2$: $(1+1+0+2)\\cdot 2 = 8$; añade el vuelo directo." }],
      title: "De A₁ a C₁",
      question: "¿Cuántos vuelos hay de A$_1$ a C$_1$, con o sin trasbordo en B? (solo el número)",
      correctAnswers: ["9"],
      explanation: "Con trasbordo: $(1 + 1 + 0 + 2)\\cdot 2 = 8$. Directo: $1$. Total: $9$.",
    },
  ],
};
