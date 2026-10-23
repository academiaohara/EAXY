import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_8_SUBTITLE } from "@/data/lessons/shared";

export const simbologiaCilindrosLesson: InteractiveLesson = {
  slug: "simbologia-cilindros",
  title: "5. Simbología y cilindros neumáticos",
  subtitle: TEMA_TI2_8_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "simbologia",
      type: "slide",
      help: [{ label: "¿Quién fija los símbolos?", message: "La organización ISO (norma ISO 1219) y, en España, AENOR con la norma UNE 101 149-86, que equivalen exactamente." }],
      title: "Símbolos normalizados",
      blocks: [
        { kind: "text", text: "Los circuitos neumáticos se dibujan con **símbolos normalizados** (ISO 1219 / UNE 101 149-86), para que cualquier técnico los interprete igual. Un símbolo da una idea del **funcionamiento**, no de la forma constructiva." },
        { kind: "steps", items: [
          "**Cilindros**: transforman la energía neumática en movimiento rectilíneo (simple o doble efecto).",
          "**Válvulas**: cuadrados con vías y flechas que indican cómo se conectan los orificios.",
          "**Antirretorno**: deja pasar el aire en un solo sentido (con o sin muelle, pilotada o con estrangulador).",
          "**Instrumentos de medida**: manómetro, termómetro, caudalímetro y presostato.",
        ] },
      ],
      arrange: "stack",
    },
    {
      id: "cilindros",
      type: "slide",
      help: [{ label: "¿Para qué se amortigua?", message: "Si la velocidad al final de la carrera es muy alta, un dispositivo de amortiguación interna frena el émbolo para evitar golpes." }],
      title: "Cilindro de simple y de doble efecto",
      blocks: [
        { kind: "compare",
          left: { title: "Simple efecto", text: "**Una toma** de aire; el retroceso lo hace un **muelle**. Solo trabaja en un sentido y gasta la mitad de aire. Sujetar, expulsar, apretar, levantar.", tone: "info" },
          right: { title: "Doble efecto", text: "**Dos tomas**, una a cada lado del émbolo: fuerza útil en avance **y** retroceso. La carrera puede ser larga (cuidado con el pandeo del vástago).", tone: "key" } },
      ],
      visual: { kind: "anim", scene: "cilindros-efecto", beatMs: 5800 },
    },
    {
      id: "clasifica-cilindros",
      type: "classify",
      help: [{ label: "Pista", message: "¿Cuántas tomas de aire tiene y quién hace el retroceso?" }],
      title: "¿Qué cilindro es?",
      question: "Asigna cada característica.",
      groups: [
        { id: "simple", label: "Simple efecto", tone: "cobalt" },
        { id: "doble", label: "Doble efecto", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Solo puede ejercer esfuerzo en un sentido", group: "simple" },
        { id: "b", text: "Dos conexiones de aire, una a cada lado del émbolo", group: "doble" },
        { id: "c", text: "El retroceso lo hace un muelle", group: "simple" },
        { id: "d", text: "Fuerza útil en el avance y en el retroceso", group: "doble" },
        { id: "e", text: "Gasta aproximadamente la mitad de aire", group: "simple" },
      ],
      hint: "Piensa en el aire que hace falta para cada movimiento.",
      explanation: "El simple efecto solo necesita aire en un sentido; el doble, en los dos.",
    },
    {
      id: "check-simple",
      type: "predict",
      help: [{ label: "Pista", message: "Mira el retorno." }],
      title: "El cilindro de simple efecto",
      question: "El cilindro de simple efecto se caracteriza por:",
      mode: "choice",
      choices: [
        { id: "uno", label: "Solo puede ejercer esfuerzo en un sentido" },
        { id: "dos", label: "El aire entra simplemente por los dos lados", incorrectFeedback: "Eso es el doble efecto." },
        { id: "robusto", label: "Ser más robusto que el de doble efecto", incorrectFeedback: "No es más robusto." },
        { id: "carga", label: "Poder soportar más carga que el de doble efecto", incorrectFeedback: "Una parte de la fuerza se gasta en vencer el muelle." },
      ],
      correctChoiceId: "uno",
      shuffleChoices: true,
      explanation: "Su retroceso depende del muelle, no del aire.",
    },
    {
      id: "partes",
      type: "slide",
      help: [{ label: "¿Qué es el pandeo?", message: "Una flexión que aparece en piezas delgadas sometidas a compresión: el vástago se dobla y el cilindro no avanza o retrocede linealmente. Por eso se sobredimensiona el vástago." }],
      title: "Partes y esfuerzos del vástago",
      blocks: [
        { kind: "steps", items: [
          "**Émbolo o pistón**: parte móvil que transforma la presión en fuerza; lleva juntas estáticas y dinámicas.",
          "**Camisa o cuerpo**, **tapas** (fondo y delantera), **vástago** y **anillo rascador**.",
          "**Cámara anular**: la cara del émbolo del lado del vástago (área menor).",
        ] },
        { kind: "warning", title: "El vástago sufre tracción, compresión y pandeo", text: "Los fabricantes lo sobredimensionan para que no se deforme. El **pandeo** es el esfuerzo que el libro destaca además de la tracción y la compresión." },
      ],
      arrange: "stack",
    },
    {
      id: "check-pandeo",
      type: "predict",
      help: [{ label: "Pista", message: "Aparece en piezas delgadas comprimidas." }],
      title: "Otro esfuerzo del vástago",
      question: "Aparte de tracción y compresión, ¿qué otro esfuerzo soporta el vástago de un cilindro?",
      mode: "choice",
      choices: [
        { id: "pandeo", label: "De pandeo" },
        { id: "rotura", label: "De rotura", incorrectFeedback: "La rotura es un fallo, no un tipo de esfuerzo." },
        { id: "flexion", label: "De flexión", incorrectFeedback: "El pandeo es una flexión por compresión, y es el término que se usa." },
        { id: "estir", label: "De estiramiento", incorrectFeedback: "Estirar es tracción." },
      ],
      correctChoiceId: "pandeo",
      shuffleChoices: true,
      explanation: "El pandeo es la deformación de una pieza delgada sometida a compresión.",
    },
  ],
};
