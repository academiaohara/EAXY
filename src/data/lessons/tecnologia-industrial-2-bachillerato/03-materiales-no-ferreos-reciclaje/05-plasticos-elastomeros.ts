import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_TI2_3_SUBTITLE } from "@/data/lessons/shared";

export const plasticosElastomerosLesson: InteractiveLesson = {
  slug: "plasticos-elastomeros",
  title: "5. Termoplásticos, termoestables y elastómeros",
  subtitle: TEMA_TI2_3_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "tres-familias",
      type: "slide",
      help: [
        {
          label: "¿Por qué el termoestable no se puede reprocesar?",
          message: "Parte de las moléculas de la reacción de condensación ha salido del material y las cadenas quedan unidas en una red tridimensional: calentar no las separa.",
        },
      ],
      title: "Tres comportamientos frente al calor",
      blocks: [
        {
          kind: "text",
          text: "Mira qué ocurre con cada familia al calentar, enfriar y estirar.",
        },
        {
          kind: "compare",
          left: { title: "Termoplásticos", text: "Estructura **lineal**. Se pueden conformar en caliente, enfriar y volver a calentar sin cambiar su comportamiento.", tone: "ok" },
          right: { title: "Termoestables", text: "Estructura en **red**. No se pueden reprocesar una vez conformados.", tone: "warn" },
        },
        {
          kind: "text",
          text: "Los **elastómeros** (caucho) tienen un comportamiento intermedio: su propiedad característica es deformarse elásticamente sin cambiar de forma de manera permanente.",
        },
      ],
      visual: { kind: "anim", scene: "polimeros-calor", beatMs: 4000 },
    },
    {
      id: "check-descompone",
      type: "predict",
      help: [{ label: "Red de enlaces", message: "Si calentar no puede separar las cadenas, el único resultado posible es que se descompongan." }],
      title: "Se descompone con el calor",
      question: "Un polímero que se descompone por acción del calor y no puede ser reprocesado es:",
      mode: "choice",
      choices: [
        { id: "termoestable", label: "Un termoestable" },
        { id: "termoplastico", label: "Un termoplástico", incorrectFeedback: "El termoplástico se ablanda y se puede reprocesar." },
        { id: "elastomero", label: "Un elastómero", incorrectFeedback: "Los elastómeros se deforman de forma elástica; es la red de un termoestable la que se descompone con el calor." },
      ],
      correctChoiceId: "termoestable",
      shuffleChoices: true,
      explanation: "Los termoestables forman una red tridimensional: no funden ni se pueden volver a conformar.",
    },
    {
      id: "conformado",
      type: "slide",
      help: [
        {
          label: "¿Por qué hay menos técnicas para los termoestables?",
          message: "Una vez polimerizados, con la estructura reticulada definida, no se pueden volver a conformar. Por eso se moldean antes de que termine de polimerizar.",
        },
      ],
      title: "Técnicas de conformado de termoplásticos",
      blocks: [
        {
          kind: "steps",
          items: [
            "**Extrusión** fuerza el plástico caliente por una boquilla: tubos, películas, cables.",
            "**Soplado** expande un globo caliente contra el molde con gas: botellas.",
            "**Inyección** empuja el polímero fundido dentro de un molde cerrado con un émbolo.",
            "**Vacío** tira de una lámina caliente contra el molde con vacío.",
          ],
        },
        {
          kind: "text",
          text: "También: **calandrado** (rodillos que hacen láminas, como las de PVC) e **hilado** (extrusión por una boquilla con muchos agujeros para hacer fibras).",
        },
      ],
      visual: { kind: "anim", scene: "extrusion-tornillo", beatMs: 4200 },
    },
    {
      id: "check-tecnicas",
      type: "predict",
      help: [{ label: "Termoplásticos", message: "La extrusión y el soplado exigen que el material se pueda ablandar y volver a endurecer." }],
      title: "Para qué polímeros valen",
      question: "La extrusión y el moldeo por soplado son técnicas de conformado de:",
      mode: "choice",
      choices: [
        { id: "termoplasticos", label: "Polímeros termoplásticos" },
        { id: "termoestables", label: "Polímeros termoestables", incorrectFeedback: "Para estos se usan el moldeo por compresión y por transferencia." },
        { id: "elastomeros", label: "Polímeros elastómeros", incorrectFeedback: "Tras la vulcanización no se pueden volver a conformar." },
      ],
      correctChoiceId: "termoplasticos",
      shuffleChoices: true,
      explanation: "Se calienta el polímero cerca de su punto de fusión para que sea plástico o líquido y se le da forma.",
    },
    {
      id: "termoplasticos-comunes",
      type: "slide",
      help: [
        {
          label: "¿LDPE o HDPE?",
          message: "LDPE es de baja densidad (películas, bolsas, flexible). HDPE es de alta densidad (más rígido: botellas, tubos).",
        },
      ],
      title: "Los termoplásticos más comunes",
      blocks: [
        {
          kind: "facts",
          items: [
            { tex: "\\text{PE}", label: "polietileno: el más usado; películas, botellas, aislantes" },
            { tex: "\\text{PVC}", label: "2.º más empleado: tuberías, ventanas, cableado" },
            { tex: "\\text{PP}", label: "3.º más vendido: hogar, envases, sacos" },
            { tex: "\\text{PMMA}", label: "plexiglás: rígido y transparente" },
          ],
        },
        {
          kind: "text",
          text: "Las poliamidas (**náilones**) soportan carga a temperaturas altas, con baja fricción: cojinetes sin lubricar. Los **policarbonatos** son tenaces y transparentes: cascos, lentes. Los **poliésteres** aíslan y absorben poca humedad.",
        },
      ],
      arrange: "stack",
    },
    {
      id: "clasifica-usos",
      type: "classify",
      help: [{ label: "Piensa en el uso", message: "Transparente y rígido → acristalar; muchos aditivos → cables y tuberías; barato y ligero → envases." }],
      title: "Cada plástico, a su uso",
      question: "Relaciona cada aplicación con el termoplástico adecuado.",
      groups: [
        { id: "pe", label: "Polietileno", tone: "cobalt" },
        { id: "pvc", label: "PVC", tone: "emerald" },
        { id: "pmma", label: "PMMA", tone: "amber" },
      ],
      items: [
        { id: "a", text: "Bolsas y películas para empaquetar", group: "pe" },
        { id: "b", text: "Tuberías y ventanas", group: "pvc" },
        { id: "c", text: "Acristalar aviones y señales publicitarias", group: "pmma" },
        { id: "d", text: "Botellas moldeadas y aislantes eléctricos", group: "pe" },
        { id: "e", text: "Cableado eléctrico y suelos plastificados", group: "pvc" },
        { id: "f", text: "Gafas de seguridad y lunetas traseras de automóviles", group: "pmma" },
      ],
      hint: "El PMMA es duro, rígido y transparente.",
      explanation: "PE: más usado y barato. PVC: gran resistencia química y fácil de mezclar con aditivos. PMMA («plexiglás»): rígido, transparente y resistente a la intemperie.",
    },
    {
      id: "elastomeros-termoestables",
      type: "slide",
      help: [
        {
          label: "¿Qué es vulcanizar?",
          message: "Someter el caucho natural (látex) a un proceso químico que une las moléculas de polímero entre sí para dar moléculas más voluminosas.",
        },
      ],
      title: "Elastómeros y termoestables",
      blocks: [
        {
          kind: "compare",
          left: { title: "Elastómeros", text: "**Caucho natural** (látex vulcanizado): baja resistencia a la tracción, elongaciones muy altas. **Neopreno**: sintético, resiste gasolina y aceites. **Silicona**: de $-100$ a $250$ °C; sellos y juntas.", tone: "info" },
          right: { title: "Termoestables", text: "**Fenólicos** (bakelita): aislante, duros, color negro o marrón. **Epoxi**: adhesivo y recubrimiento, gran resistencia dieléctrica. **Poliésteres insaturados**: con fibra de vidrio, cascos de botes y tuberías.", tone: "key" },
        },
      ],
      arrange: "stack",
    },
    {
      id: "check-sellador",
      type: "predict",
      help: [{ label: "Temperaturas", message: "Un sellador de juntas debe aguantar un rango amplio de temperaturas, de $-100$ a $250$ °C." }],
      title: "Sellador de juntas",
      question: "Para un sellador de juntas, ¿qué tipo de elastómero se utiliza?",
      mode: "choice",
      choices: [
        { id: "silicona", label: "Caucho de silicona: sellos, juntas y aislantes" },
        { id: "latex", label: "Látex sin vulcanizar", incorrectFeedback: "El látex sin vulcanizar no tiene propiedades estables; el caucho natural se vulcaniza." },
        { id: "bakelita", label: "Bakelita (fenólico)", incorrectFeedback: "Es un termoestable duro, no un elastómero." },
      ],
      correctChoiceId: "silicona",
      shuffleChoices: true,
      explanation: "Las siliconas se usan entre $-100$ y $250$ °C como selladores, juntas, aislantes eléctricos y cables de encendido.",
    },
  ],
};
