import type { InteractiveLesson } from "@/lib/lesson/types";
import { TECESO1_SUBTITLES } from "@/data/lessons/shared";
import { anim, pick, slide, sort, tool } from "@/data/lessons/tec1-helpers";

export const diagramasFlujoEsoLesson: InteractiveLesson = {
  slug: "diagramas-flujo-eso",
  title: "3. Diagramas de flujo",
  subtitle: TECESO1_SUBTITLES[7],
  stage: { theme: "board" },
  steps: [
    slide("def", "Dibujar un algoritmo", [
      { kind: "definition", text: "Un **diagrama de flujo** es una representación gráfica de un algoritmo. Cada paso es una **figura** y las **flechas** indican el orden." },
      { kind: "text", text: "Sirve para **pensar antes de programar**: se ve de un vistazo qué hace el algoritmo y dónde hay decisiones o repeticiones." },
    ], undefined, "stack"),
    slide("simbolos", "Cuatro figuras", [
      { kind: "text", text: "Aprende las figuras básicas y su significado." },
    ], anim("diagrama-flujo-simbolos"), "text-top"),
    slide("recorre", "Recorre un diagrama", [
      { kind: "text", text: "Pulsa «Sí» o «No» en la decisión y observa por qué camino sigue el diagrama." },
    ], tool("flujo-sencillo-explorador", { n: 0 }), "visual-top"),
    slide("entrada", "Un diagrama con datos", [
      { kind: "text", text: "Este diagrama lee un número y decide si es par o impar. Cambia el número y recorre los pasos: la decisión depende del dato." },
    ], tool("flujo-sencillo-explorador", { n: 1 }), "visual-top"),
    sort("clasifica-fig", "¿Qué figura es?", "Relaciona cada paso con la figura que lo representa.",
      [["ini", "Óvalo (inicio/fin)", "amber"], ["pro", "Rectángulo (proceso)", "cobalt"], ["dec", "Rombo (decisión)", "violet"], ["es", "Paralelogramo (entrada/salida)", "emerald"]],
      [["Comienza el programa", "ini"], ["Fin", "ini"], ["Calcular el doble del número", "pro"], ["Sumar 1 a la variable", "pro"], ["¿La temperatura es mayor que 25?", "dec"], ["¿Ha acabado el tiempo?", "dec"], ["Leer un número", "es"], ["Mostrar el resultado", "es"]],
      "Las figuras estandarizan el significado: el rombo siempre es una pregunta; el rectángulo, una acción; el paralelogramo, entrada o salida de datos.",
    ),
    pick("check-rombo", "Salidas de un rombo", "¿Cuántas salidas tiene un rombo de decisión en un diagrama de flujo?",
      "Dos: una para «Sí» y otra para «No»",
      [["Una sola", "Una decisión debe tener al menos dos caminos."], ["Tantas como se quiera, sin etiquetas", "Las salidas se etiquetan y son dos (Sí/No)."], ["Ninguna, solo recibe flechas", "Un rombo reparte el camino en dos."]],
      "Cada rombo plantea una pregunta con respuesta verdadera o falsa y dos caminos.",
    ),
    pick("check-par", "Par o impar", "Con el diagrama de par o impar, ¿qué escribe el algoritmo si se lee el número 7?",
      "Escribe «es impar», porque 7 no es múltiplo de 2",
      [["Escribe «es par»", "7 no es múltiplo de 2."], ["No escribe nada", "Siempre termina escribiendo uno de los dos mensajes."], ["Escribe ambos mensajes", "Solo se sigue uno de los dos caminos."]],
      "En una decisión solo se ejecuta una de las ramas; la otra se ignora.",
    ),
  ],
};
