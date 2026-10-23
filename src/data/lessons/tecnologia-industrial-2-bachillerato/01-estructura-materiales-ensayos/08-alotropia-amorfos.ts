import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_1_SUBTITLE } from "@/data/lessons/shared";

export const alotropiaAmorfosLesson: InteractiveLesson = {
  slug: "alotropia-amorfos",
  title: "8. Alotropía y materiales amorfos",
  subtitle: TEMA_TI2_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "alotropia",
      type: "slide",
      help: [
        {
          label: "¿Por qué importa en la industria?",
          message: "Porque al cambiar la estructura cambian las propiedades del metal. Es la base de muchos tratamientos térmicos del acero, que verás en la unidad 4.",
        },
      ],
      title: "Un mismo metal, varias estructuras",
      blocks: [
        {
          kind: "definition",
          text: "**Alotropía** (o polimorfismo): según la presión y la temperatura, un mismo elemento o compuesto puede cristalizar con **estructuras distintas**.",
        },
        {
          kind: "text",
          text: "Sube y baja la temperatura del hierro y mira cuándo cambia la celda. Compara con el aluminio, que no cambia nunca.",
        },
      ],
      visual: { kind: "tool", tool: "alotropia-explorador", params: { a: 0, b: 20 } },
    },
    {
      id: "tabla-alotropia",
      type: "slide",
      help: [
        {
          label: "¿Y el sodio?",
          message: "A temperatura ambiente es BCC. Solo por debajo de $-193$ °C pasa a HCP.",
        },
      ],
      title: "Cambios de estructura en algunos metales",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "\\text{Fe}", label: "BCC → FCC a 912 °C → BCC a 1 394 °C" },
            { tex: "\\text{Ca}", label: "FCC → BCC a 447 °C" },
            { tex: "\\text{Ti}", label: "HCP → BCC a 883 °C" },
            { tex: "\\text{Na}", label: "HCP → BCC a −193 °C" },
          ],
        },
        {
          kind: "text",
          text: "El **aluminio** (FCC), el **cromo** (BCC), el **cobre** (FCC) y el **níquel** (FCC) **no cambian** a presión atmosférica.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-hierro",
      type: "predict",
      help: [{ label: "Pista", message: "Entre $912$ y $1\\,394$ °C, el hierro es FCC." }],
      title: "El hierro al rojo",
      question: "¿Qué estructura tiene el hierro a $1\\,000$ °C?",
      mode: "choice",
      choices: [
        { id: "fcc", label: "FCC" },
        { id: "bcc", label: "BCC", incorrectFeedback: "Es BCC a temperatura ambiente y por encima de $1\\,394$ °C, pero entre medias cambia." },
        { id: "hcp", label: "HCP", incorrectFeedback: "El hierro no cristaliza en HCP a presión atmosférica." },
      ],
      correctChoiceId: "fcc",
      shuffleChoices: true,
      explanation: "$912\\ \\text{°C} < 1\\,000\\ \\text{°C} < 1\\,394\\ \\text{°C}$: el hierro es FCC.",
    },
    {
      id: "check-titanio",
      type: "predict",
      help: [{ label: "Pista", message: "El titanio es HCP por debajo de $883$ °C." }],
      title: "El titanio caliente",
      question: "¿Qué estructura tiene el titanio a $900$ °C?",
      mode: "choice",
      choices: [
        { id: "bcc", label: "BCC" },
        { id: "hcp", label: "HCP", incorrectFeedback: "Esa es la estructura a temperatura ambiente, hasta los $883$ °C." },
        { id: "fcc", label: "FCC", incorrectFeedback: "El titanio no pasa por FCC." },
      ],
      correctChoiceId: "bcc",
      shuffleChoices: true,
      explanation: "A partir de $883$ °C, el titanio pasa de HCP a BCC.",
    },
    {
      id: "check-sin-cambio",
      type: "predict",
      help: [{ label: "Pista", message: "Busca el que aparece con «no cambia» en la Tabla 1.5." }],
      title: "Un metal estable",
      question: "¿Cuál de estos metales no cambia de estructura cristalina al variar la temperatura (a presión atmosférica)?",
      mode: "choice",
      choices: [
        { id: "al", label: "Aluminio" },
        { id: "fe", label: "Hierro", incorrectFeedback: "El hierro cambia dos veces: a $912$ y a $1\\,394$ °C." },
        { id: "ti", label: "Titanio", incorrectFeedback: "El titanio pasa de HCP a BCC a $883$ °C." },
      ],
      correctChoiceId: "al",
      shuffleChoices: true,
      explanation: "El aluminio es FCC a cualquier temperatura (mientras sea sólido), igual que el cobre y el níquel.",
    },
    {
      id: "amorfos",
      type: "slide",
      help: [
        {
          label: "¿Es el vidrio un cristal?",
          message: "En el lenguaje común sí, pero en Ciencia de Materiales no: el vidrio de sílice es **amorfo**. El cuarzo, que tiene la misma composición, sí es cristalino.",
        },
      ],
      title: "Cuando no hay orden",
      blocks: [
        {
          kind: "text",
          text: "Los materiales **amorfos** (o vítreos) son sólidos con átomos y enlaces pero **sin ordenación sistemática y regular**. Su estructura recuerda a la de un líquido; por eso se les llama también **líquidos subenfriados**.",
        },
        {
          kind: "compare",
          left: { title: "Cuarzo", text: "Óxido de silicio **cristalino**: átomos ordenados.", tone: "info" },
          right: { title: "Vidrio", text: "Óxido de silicio **amorfo**: átomos desordenados (mal llamado «cristal»).", tone: "warn" },
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-amorfo",
      type: "predict",
      help: [{ label: "Pista", message: "Piensa en el orden de largo alcance." }],
      title: "Cristalino frente a amorfo",
      question: "¿En qué se diferencia un sólido cristalino de uno amorfo?",
      mode: "choice",
      choices: [
        { id: "orden", label: "En el cristalino los átomos se ordenan de forma regular y repetida; en el amorfo no hay ordenación sistemática" },
        { id: "enlaces", label: "El amorfo no tiene enlaces entre sus átomos", incorrectFeedback: "Tiene los mismos enlaces; lo que falta es el orden de largo alcance." },
        { id: "peso", label: "El cristalino siempre pesa más", incorrectFeedback: "El peso no distingue ambos tipos; lo hace la ordenación de los átomos." },
      ],
      correctChoiceId: "orden",
      shuffleChoices: true,
      explanation: "Cristalino: orden de largo alcance con celda unitaria que se repite. Amorfo: sin ese orden.",
    },
  ],
};
