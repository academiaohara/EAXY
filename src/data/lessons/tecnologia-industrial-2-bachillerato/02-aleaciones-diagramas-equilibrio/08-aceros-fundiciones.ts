import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_2_SUBTITLE } from "@/data/lessons/shared";

export const acerosFundicionesLesson: InteractiveLesson = {
  slug: "aceros-fundiciones",
  title: "8. Aceros y fundiciones",
  subtitle: TEMA_TI2_2_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "carbono",
      type: "slide",
      help: [
        {
          label: "¿Por qué se usan tanto las aleaciones férricas?",
          message: "Hay abundante hierro en la corteza terrestre, los aceros se fabrican con técnicas económicas y sus propiedades se pueden modificar mucho. Su principal inconveniente es la corrosión.",
        },
      ],
      title: "Hierro, acero y fundición según el carbono",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "C < 0{,}03\\,\\%", label: "Hierro: casi puro, pocas aplicaciones" },
            { tex: "0{,}10 < C < 1{,}76\\,\\%", label: "Acero: forjable" },
            { tex: "1{,}76 < C < 5\\,\\%", label: "Fundición: no forjable, se moldea" },
          ],
        },
        {
          kind: "text",
          text: "Mueve el porcentaje de carbono y mira el grupo al que pertenece la aleación.",
        },
      ],
      visual: { kind: "tool", tool: "acero-clasificador", params: { a: 0.45 } },
    },
    {
      id: "check-hiper",
      type: "predict",
      help: [{ label: "Eutectoide", message: "El punto eutectoide de los aceros al carbono está en el $0{,}89\\,\\%$ de C." }],
      title: "Un acero con 1,2 % de C",
      question: "Un acero con el $1{,}2\\,\\%$ de C es:",
      mode: "choice",
      choices: [
        { id: "hiper", label: "Hipereutectoide" },
        { id: "hipo", label: "Hipoeutectoide", incorrectFeedback: "Hipoeutectoide es menos de 0,89 % de C." },
        { id: "fund", label: "Una fundición", incorrectFeedback: "Las fundiciones empiezan en el 1,76 % de C." },
      ],
      correctChoiceId: "hiper",
      shuffleChoices: true,
      explanation: "$0{,}89 < 1{,}2 < 1{,}76$: es un acero (forjable) con más carbono que el eutectoide.",
    },
    {
      id: "clasificacion-aceros",
      type: "slide",
      help: [
        {
          label: "¿Qué es el templado?",
          message: "Se calienta hasta austenizar y se enfría; la velocidad de enfriamiento decide qué estructura queda. Lo veremos en la unidad 4.",
        },
      ],
      title: "Clasificación de los aceros",
      blocks: [
        {
          kind: "compare",
          left: { title: "Aceros al carbono", text: "Hierro y carbono; los demás elementos no deben superar los límites de las normas.", tone: "info" },
          right: { title: "Aceros aleados", text: "Llevan **elementos de aleación voluntarios** (Cr, Ni, Mo…) que cambian la templabilidad, la dureza, etc.", tone: "key" },
        },
        {
          kind: "steps",
          title: "Según su constitución interna (calentados hasta austenizar y enfriados al aire)",
          items: [
            "**Perlíticos**: perlita con ferrita o cementita. Son los aceros normales, de baja y media aleación.",
            "**Martensíticos**: formados sobre todo por martensita; templan incluso al aire (Cr-Ni, Cr-Ni-Mo).",
            "**Austeníticos**: austenita a temperatura ambiente; no los atrae un imán (Cr-Ni, inoxidables con 18 % de Cr).",
            "**Ferríticos**: ferrita a cualquier temperatura; no se pueden templar.",
            "**Con carburos**: muchos carburos de aleación; temple a 900–1 300 °C (aceros rápidos).",
          ],
        },
      ],
      arrange: "stack",
    },
    {
      id: "clasifica-constitucion",
      type: "classify",
      help: [
        { label: "Pista del imán", message: "El hierro γ de la austenita no es magnético: los aceros austeníticos no se pegan a un imán." },
      ],
      title: "Constitución interna",
      question: "Coloca cada característica en el tipo de acero al que corresponde.",
      groups: [
        { id: "perlitico", label: "Perlítico", tone: "cobalt" },
        { id: "austenitico", label: "Austenítico", tone: "emerald" },
        { id: "martensitico", label: "Martensítico", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Son los aceros normales, al carbono y de baja y media aleación", group: "perlitico" },
        { id: "b", text: "Se enfrían al aire y quedan formados sobre todo por martensita", group: "martensitico" },
        { id: "c", text: "No son atraídos por un imán, ya que el hierro γ no es magnético", group: "austenitico" },
        { id: "d", text: "Inoxidables con el 18 % de Cr y aceros al Cr-Ni", group: "austenitico" },
        { id: "e", text: "Después del enfriamiento tienen perlita y ferrita o cementita", group: "perlitico" },
        { id: "f", text: "Aceros al Cr-Ni-Mo con velocidad de temple muy lenta", group: "martensitico" },
      ],
      hint: "Fíjate en qué se forma al enfriarlos al aire.",
      explanation: "Los perlíticos son los aceros comunes; los martensíticos templan al aire por su aleación; los austeníticos conservan la austenita y no son magnéticos.",
    },
    {
      id: "fundiciones",
      type: "slide",
      help: [
        {
          label: "¿Qué es la grafitización?",
          message: "Que el carbono se separa como grafito en lugar de quedar como cementita. Se regula con la composición (silicio) y la velocidad de enfriamiento.",
        },
      ],
      title: "Fundiciones",
      blocks: [
        {
          kind: "text",
          text: "Son aleaciones férricas con más del $2{,}1\\,\\%$ de C (en la práctica, entre el $3$ y el $4{,}5\\,\\%$). **Funden a menos temperatura** que los aceros ($1\\,150$–$1\\,300$ °C) y se moldean con facilidad.",
        },
        {
          kind: "rule",
          text: "La forma del carbono decide las propiedades: **grafito en láminas** (gris), **en esferas** (esferoidal), **cementita** (blanca) o **rosetas** (maleable).",
        },
      ],
      visual: { kind: "anim", scene: "grafito-fundiciones", beatMs: 4200 },
    },
    {
      id: "clasifica-fundiciones",
      type: "classify",
      help: [
        { label: "Piensa en la propiedad", message: "Una pieza que debe amortiguar vibraciones no se parece a una que debe resistir un desgaste extremo sin ductilidad." },
      ],
      title: "Cada fundición, para su uso",
      question: "Relaciona cada aplicación con la fundición adecuada.",
      groups: [
        { id: "gris", label: "Gris", tone: "cobalt" },
        { id: "esferoidal", label: "Esferoidal", tone: "emerald" },
        { id: "blanca", label: "Blanca", tone: "rose" },
        { id: "maleable", label: "Maleable", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Bancadas de máquinas: amortigua vibraciones", group: "gris" },
        { id: "b", text: "Cuerpos de bomba, pistones y cigüeñales", group: "esferoidal" },
        { id: "c", text: "Cilindros de laminación: dureza y resistencia al desgaste, sin ductilidad", group: "blanca" },
        { id: "d", text: "Engranajes de transmisión y cajas de diferencial", group: "maleable" },
        { id: "e", text: "Muy fáciles de moldear por su fluidez y de las más baratas", group: "gris" },
        { id: "f", text: "Con magnesio: resistencia a tracción de 380 a 480 MPa", group: "esferoidal" },
      ],
      hint: "El nombre te da pistas: la blanca se llama así por el color de su fractura.",
      explanation: "Gris: amortigua y es barata. Esferoidal: más resistente y dúctil, como un acero. Blanca: muy dura y frágil. Maleable: se obtiene recociendo la blanca y gana ductilidad.",
    },
    {
      id: "check-bomba",
      type: "predict",
      help: [{ label: "Piezas con esfuerzos", message: "Un cuerpo de bomba soporta presión; necesita resistencia y cierta ductilidad." }],
      title: "Cuerpo de bomba hidráulica",
      question: "Para el cuerpo de una bomba hidráulica, ¿qué fundición elegirías?",
      mode: "choice",
      choices: [
        { id: "esf", label: "Esferoidal: más resistente y dúctil que la gris" },
        { id: "blanca", label: "Blanca", incorrectFeedback: "Es muy frágil y no se puede mecanizar." },
        { id: "gris", label: "Gris", incorrectFeedback: "Es frágil a tracción; la esferoidal se utiliza para cuerpos de bomba." },
      ],
      correctChoiceId: "esf",
      shuffleChoices: true,
      explanation: "Con pequeñas adiciones de magnesio o cesio el grafito pasa a forma de esferas y las propiedades se parecen a las del acero.",
    },
    {
      id: "check-inox",
      type: "predict",
      help: [{ label: "Elemento", message: "Es el elemento que forma una capa de óxido protectora en la superficie." }],
      title: "Aceros inoxidables",
      question: "Los aceros inoxidables contienen, además de Fe y C, al menos un:",
      mode: "choice",
      choices: [
        { id: "cr", label: "12 % de cromo" },
        { id: "ni", label: "12 % de níquel", incorrectFeedback: "El elemento clave es el cromo." },
        { id: "mo", label: "12 % de molibdeno", incorrectFeedback: "El elemento clave es el cromo." },
      ],
      correctChoiceId: "cr",
      shuffleChoices: true,
      explanation: "Los aceros inoxidables son los que contienen un 12 % de cromo o más, lo que les da una extraordinaria resistencia a la corrosión.",
    },
  ],
};
