import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_1_SUBTITLE } from "@/data/lessons/shared";

export const estructuraCristalinaLesson: InteractiveLesson = {
  slug: "estructura-cristalina",
  title: "7. Estructura cristalina y celdas unitarias",
  subtitle: TEMA_TI2_1_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "cristal",
      type: "slide",
      help: [
        {
          label: "¿Qué materiales son cristalinos?",
          message: "Los metales, las aleaciones y determinados materiales cerámicos. El vidrio, en cambio, es amorfo.",
        },
      ],
      title: "Un orden que se repite",
      blocks: [
        {
          kind: "definition",
          text: "**Cristal**: sólido formado por átomos, iones o moléculas ordenados de una manera determinada que se **repite tridimensionalmente**.",
        },
        {
          kind: "text",
          text: "Si colocamos un átomo en cada nudo de una red tridimensional, obtenemos el **retículo espacial**. Cada punto tiene un entorno idéntico. Para describirlo basta una pieza mínima: la **celda unitaria**.",
        },
      ],
      visual: { kind: "anim", scene: "cristal-amorfo", beatMs: 5000 },
    },
    {
      id: "celda-constantes",
      type: "slide",
      help: [
        {
          label: "¿Qué son las redes de Bravais?",
          message: "Según los vectores y ángulos de la celda, hay $7$ sistemas cristalinos y $14$ redes espaciales distintas, llamadas redes de Bravais.",
        },
      ],
      title: "La celda unitaria se define con seis números",
      blocks: [
        {
          kind: "text",
          text: "Una celda queda definida por tres **vectores** $a$, $b$ y $c$ que parten de un mismo vértice y por tres **ángulos** $\\alpha$, $\\beta$ y $\\gamma$ entre ellos.",
        },
        {
          kind: "facts",
          items: [
            { tex: "a,\\ b,\\ c", label: "vectores reticulares (aristas)" },
            { tex: "\\alpha,\\ \\beta,\\ \\gamma", label: "ángulos interaxiales" },
            { tex: "7\\ \\text{sistemas}\\ \\cdot\\ 14\\ \\text{redes}", label: "sistemas cristalinos y redes de Bravais" },
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "metales",
      type: "slide",
      help: [
        {
          label: "¿Cómo se cuentan los átomos?",
          message: "Un átomo del vértice lo comparten $8$ celdas (cuenta $1/8$); uno del centro de una cara lo comparten $2$ celdas (cuenta $1/2$); uno interior cuenta entero.",
        },
      ],
      title: "Tres estructuras metálicas",
      blocks: [
        {
          kind: "text",
          text: "Casi todos los metales cristalizan en una de estas tres estructuras:",
        },
        {
          kind: "facts",
          items: [
            { tex: "\\text{BCC}", label: "cúbica centrada en el cuerpo (CC)" },
            { tex: "\\text{FCC}", label: "cúbica centrada en las caras (CCC)" },
            { tex: "\\text{HCP}", label: "hexagonal compacta" },
          ],
        },
        {
          kind: "text",
          text: "Gira la celda para ver los átomos de delante y de detrás, y compara cuántos átomos «propios» tiene cada una.",
        },
      ],
      visual: { kind: "tool", tool: "celda-explorador", params: { a: 0 } },
    },
    {
      id: "check-bcc",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Recuento", message: "Ocho vértices de $1/8$ cada uno, más el átomo central." }],
      title: "Átomos en la celda BCC",
      question: "¿Cuántos átomos pertenecen realmente a una celda BCC? (8 en los vértices y 1 en el centro)",
      correctAnswers: ["2"],
      explanation: "$8\\cdot \\tfrac18 + 1 = 2$ átomos por celda.",
    },
    {
      id: "check-fcc",
      type: "predict",
      mode: "numeric",
      help: [{ label: "Recuento", message: "Seis caras con medio átomo cada una, más los ocho vértices." }],
      title: "Átomos en la celda FCC",
      question: "¿Cuántos átomos pertenecen realmente a una celda FCC? (8 en los vértices y 6 en los centros de las caras)",
      correctAnswers: ["4"],
      explanation: "$8\\cdot \\tfrac18 + 6\\cdot \\tfrac12 = 1 + 3 = 4$ átomos por celda.",
    },
    {
      id: "check-tres",
      type: "predict",
      help: [{ label: "Pista", message: "Están en la figura 1.14 del libro: dos cúbicas y una hexagonal." }],
      title: "Las estructuras metálicas más comunes",
      question: "¿Cuáles son las tres estructuras cristalinas más comunes en los metales?",
      mode: "choice",
      choices: [
        { id: "ok", label: "BCC, FCC y HCP" },
        { id: "sc", label: "Cúbica simple, tetragonal y ortorrómbica", incorrectFeedback: "Existen, pero casi ningún metal cristaliza así." },
        { id: "amorfa", label: "Cristalina, amorfa y vítrea", incorrectFeedback: "Eso es otra clasificación: según haya orden o no." },
      ],
      correctChoiceId: "ok",
      shuffleChoices: true,
      explanation: "Cúbica centrada en el cuerpo (BCC), cúbica centrada en las caras (FCC) y hexagonal compacta (HCP).",
    },
    {
      id: "clasifica-metales",
      type: "classify",
      help: [{ label: "Pista", message: "Mira la Tabla 1.5 del libro: columna «a temperatura ambiente»." }],
      title: "¿Qué estructura tiene cada metal?",
      question: "Clasifica cada metal según su estructura a temperatura ambiente.",
      groups: [
        { id: "bcc", label: "BCC", tone: "cobalt" },
        { id: "fcc", label: "FCC", tone: "emerald" },
        { id: "hcp", label: "HCP", tone: "violet" },
      ],
      items: [
        { id: "a", text: "Hierro (Fe)", group: "bcc" },
        { id: "b", text: "Cromo (Cr)", group: "bcc" },
        { id: "c", text: "Aluminio (Al)", group: "fcc" },
        { id: "d", text: "Cobre (Cu)", group: "fcc" },
        { id: "e", text: "Níquel (Ni)", group: "fcc" },
        { id: "f", text: "Titanio (Ti)", group: "hcp" },
        { id: "g", text: "Cobalto (Co)", group: "hcp" },
      ],
      hint: "El Fe y el Cr son BCC; Al, Cu y Ni, FCC; Ti y Co, HCP.",
      explanation: "Es una propiedad de cada metal y, como veremos, puede cambiar con la temperatura.",
    },
  ],
};
