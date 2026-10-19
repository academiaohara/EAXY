import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_15_SUBTITLE } from "@/data/lessons/shared";

export const probabilidadSucesosSeguroImposibleLesson: InteractiveLesson = {
  slug: "probabilidad-sucesos-seguro-imposible",
  title: "3. Sucesos, suceso seguro e imposible",
  subtitle: TEMA_15_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "suceso",
      type: "slide",
      help: [
        {
          label: "Un suceso es un grupo de resultados",
          message: "Puede ser uno solo («sacar un $5$») o varios («sacar un número par»).",
        },
        {
          label: "Todo o nada",
          message: "El seguro contiene todos los resultados. El imposible, ninguno.",
        },
      ],
      title: "Suceso, seguro e imposible",
      blocks: [
        {
          kind: "definition",
          text: "Un **suceso** está formado por **uno o varios sucesos elementales** del experimento.",
        },
        {
          kind: "compare",
          left: { title: "Suceso seguro", text: "Contiene **todos** los elementales de $E$. Siempre ocurre.", tone: "ok" },
          right: { title: "Suceso imposible", text: "No contiene **ninguno**. Nunca ocurre: $\\varnothing$.", tone: "warn" },
        },
      ],
      visual: { kind: "anim", scene: "sucesos-conjuntos", beatMs: 3200 },
    },
    {
      id: "cartas",
      type: "fill_in_blank",
      help: [
        {
          label: "Cómo procedo",
          message: "Recorre las cartas del $1$ al $8$ y anota cuáles cumplen la condición. Esa lista es el suceso.",
        },
        {
          label: "Múltiplos de 3",
          message: "Un múltiplo de $3$ es un número de la tabla del $3$: $3, 6, 9, \\dots$ Solo valen los que están entre $1$ y $8$.",
        },
      ],
      title: "Cartas del 1 al 8",
      question:
        "Sacamos una carta al azar de ocho cartas numeradas del 1 al 8. ¿Cuántos sucesos elementales forman el suceso «número mayor que 4»? (solo el número)",
      correctAnswers: ["4", "cuatro"],
      hint: "Escribe el suceso: $\\{5, 6, 7, 8\\}$.",
      explanation: "«Mayor que $4$» es el suceso $\\{5, 6, 7, 8\\}$: formado por $4$ sucesos elementales (el $4$ no es mayor que $4$).",
    },
    {
      id: "baraja",
      type: "slide",
      help: [
        {
          label: "Palos y números",
          message: "La baraja española tiene $4$ palos de $10$ cartas cada uno: oros, copas, espadas y bastos.",
        },
        {
          label: "Un suceso, una lista",
          message: "«Sacar figura» agrupa sotas, caballos y reyes de los cuatro palos.",
        },
      ],
      title: "Baraja española (40 cartas)",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "10", label: "«Sacar oros»: todas las de oros" },
            { tex: "4", label: "«Sacar un 5»: uno por palo" },
            { tex: "12", label: "«Sacar figura»: sota, caballo o rey de cada palo" },
          ],
        },
        {
          kind: "text",
          text: "Cada lista de cartas que cumple la condición es un suceso formado por varios sucesos elementales.",
        },
      ],
    },
    {
      id: "check",
      type: "classify",
      help: [
        {
          label: "¿Seguro, imposible o posible?",
          message: "Seguro: ocurre siempre, salga lo que salga. Imposible: no ocurre en ningún resultado. Posible: ocurre en unos sí y en otros no.",
        },
        {
          label: "Mira qué hay en la bolsa",
          message: "Antes de clasificar, repasa qué colores hay en la bolsa. Un suceso con un color que no existe nunca ocurre.",
        },
      ],
      title: "Comprueba lo aprendido",
      question:
        "En una bolsa hay $2$ bolas rojas y $3$ verdes. Sacamos una bola al azar. Clasifica cada suceso.",
      groups: [
        { id: "seguro", label: "Seguro", tone: "emerald" },
        { id: "imposible", label: "Imposible", tone: "rose" },
        { id: "posible", label: "Ni seguro ni imposible", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Sacar una bola azul", group: "imposible" },
        { id: "b", text: "Sacar una bola roja o verde", group: "seguro" },
        { id: "c", text: "Sacar una bola roja", group: "posible" },
        { id: "d", text: "Sacar una bola amarilla", group: "imposible" },
        { id: "e", text: "Sacar una bola que no sea azul", group: "seguro" },
        { id: "f", text: "Sacar una bola verde", group: "posible" },
      ],
      hint: "¿El suceso incluye **todos** los resultados posibles, **ninguno** o solo algunos?",
      explanation:
        "No hay bolas azules ni amarillas: esos sucesos no tienen ningún resultado, son imposibles. Toda bola es roja o verde (y ninguna es azul): seguro. «Roja» o «verde» pueden salir o no.",
    },
    {
      id: "dado-menor",
      type: "predict",
      help: [
        {
          label: "Escribe el suceso",
          message: "Lista las caras del dado que cumplen la condición y compáralas con todas las caras.",
        },
        {
          label: "¿Están todas o ninguna?",
          message: "Si cumplen todas las caras, el suceso es seguro; si no cumple ninguna, imposible.",
        },
      ],
      title: "Un dado y su suceso",
      question:
        "Lanzamos un dado de seis caras. ¿Cómo es el suceso «obtener un número mayor que 6»?",
      mode: "choice",
      choices: [
        { id: "a", label: "Imposible: ninguna cara lo cumple" },
        {
          id: "b",
          label: "Seguro: el $6$ siempre puede salir",
          incorrectFeedback: "El $6$ no es **mayor** que $6$, es igual. Y aunque pudiese salir, el suceso seguro necesita que se cumpla con todas las caras.",
        },
        {
          id: "c",
          label: "Posible: sale con probabilidad pequeña",
          incorrectFeedback: "Un suceso posible tiene al menos un caso favorable. Ninguna cara del dado supera el $6$.",
        },
        {
          id: "d",
          label: "Elemental: solo contiene el $6$",
          incorrectFeedback: "El $6$ no es mayor que $6$, así que el suceso no contiene ni siquiera el $6$: está vacío.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation: "Ninguna cara ($1$ a $6$) es mayor que $6$: el suceso no contiene ningún elemental, es el suceso imposible.",
    },
  ],
};
